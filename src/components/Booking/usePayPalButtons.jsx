import { useEffect } from "react";
import toast from "react-hot-toast";

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

const usePayPalButtons = (booking, buttonRef, handlePaymentSuccess) => {
  useEffect(() => {
    if (!booking || !buttonRef?.current || booking.paid) return;

    const token = localStorage.getItem("token");
    let paypalButtons = null;

    const renderButtons = async () => {
      try {
        const res = await fetch("/api/config/paypal");
        if (!res.ok) throw new Error("Failed to fetch PayPal config");

        const { clientId } = await res.json();
        await loadPayPalScript(clientId);

        buttonRef.current.innerHTML = "";

        paypalButtons = window.paypal.Buttons({
          createOrder: () =>
            fetch("/api/payments/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ bookingId: booking._id }),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to create order");
                return res.json();
              })
              .then((data) => data.orderID),

          onApprove: (data) =>
            fetch("/api/payments/capture-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
                bookingId: booking._id,
              }),
            }).then((res) => {
              if (!res.ok) throw new Error("Payment capture failed");
              toast.success("Payment successful!");

              if (handlePaymentSuccess) {
                handlePaymentSuccess(booking._id); // 💡 Remove from UI
              }
            }),
        });

        if (buttonRef.current) {
          paypalButtons.render(buttonRef.current);
        }
      } catch (error) {
        console.error("PayPal integration error:", error);
        toast.error("Something went wrong with PayPal.");
      }
    };

    renderButtons();

    return () => {
      if (paypalButtons?.close) {
        paypalButtons
          .close()
          .catch(() => console.warn("Failed to close PayPal buttons"));
      }
    };
  }, [booking, buttonRef, handlePaymentSuccess]);
};

export default usePayPalButtons;
