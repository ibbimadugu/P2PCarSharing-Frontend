export const loadPayPalScript = (clientId) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("paypal-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.id = "paypal-script";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
