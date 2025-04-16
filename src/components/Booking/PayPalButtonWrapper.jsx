import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

const loadPayPalScript = (clientId) => {
  return new Promise((resolve, reject) => {
    if (window.paypal) return resolve();

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const token = localStorage.getItem("token");

const PayPalButtonWrapper = ({ booking }) => {
  const paypalRef = useRef(null);

  useEffect(() => {
    const renderPayPalButtons = async () => {
      if (!paypalRef.current || booking.paid) return;

      try {
        const res = await fetch("/api/config/paypal");
        const { clientId } = await res.json();

        await loadPayPalScript(clientId);

        window.paypal
          .Buttons({
            createOrder: async () => {
              const response = await fetch("/api/payments/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                Authorization: `Bearer ${token}`,
                body: JSON.stringify({
                  bookingId: booking._id,
                  totalPrice: booking.totalPrice,
                }),
              });

              const orderData = await response.json();
              return orderData.id; // Return the order ID received from your server
            },

            onApprove: async (_data, actions) => {
              const details = await actions.order.capture();
              toast.success(
                "Transaction completed by " + details.payer.name.given_name
              );
            },
          })
          .render(paypalRef.current);
      } catch (err) {
        console.error("Failed to load PayPal script or render buttons:", err);
      }
    };

    renderPayPalButtons();
  }, [booking]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButtonWrapper;
