import { useEffect } from "react";

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

const usePayPalButtons = (booking, buttonRef) => {
  useEffect(() => {
    let paypalButtons = null;

    const renderButtons = async () => {
      if (booking.paid || !buttonRef.current) return; // Check if booking is paid or buttonRef is null

      try {
        const res = await fetch("/api/config/paypal");
        if (!res.ok) {
          throw new Error("Failed to fetch PayPal config");
        }

        const { clientId } = await res.json();
        await loadPayPalScript(clientId);

        buttonRef.current.innerHTML = ""; // Clear previous PayPal buttons to avoid duplicates

        paypalButtons = window.paypal.Buttons({
          createOrder: () =>
            fetch("/api/payments/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              Authorization: `Bearer ${token}`,
              body: JSON.stringify({ bookingId: booking._id }),
            })
              .then((res) => res.json())
              .then((data) => data.orderID),

          onApprove: (data) =>
            fetch("/api/payments/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderID: data.orderID,
                bookingId: booking._id,
              }),
            }).then(() => {
              alert("Payment successful!");
            }),
        });

        // Only render the PayPal button if the container is still available
        if (buttonRef.current) {
          paypalButtons.render(buttonRef.current);
        }
      } catch (error) {
        console.error("Failed to load PayPal buttons:", error);
      }
    };

    renderButtons();

    // Cleanup on component unmount or when `booking` or `buttonRef` changes
    return () => {
      if (paypalButtons?.close) {
        paypalButtons.close().catch(() => {
          console.warn("PayPal button close failed.");
        });
      }
    };
  }, [booking, buttonRef]);
};

export default usePayPalButtons;
