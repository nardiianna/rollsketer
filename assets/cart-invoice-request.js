// Updates the "Richiedi fattura" cart attribute when the checkbox changes.
// Using type="module" ensures this runs only once even if the snippet is
// rendered in both the cart page and the cart drawer.
document.addEventListener('change', (event) => {
  const checkbox = event.target.closest('[data-cart-invoice-request]');
  if (!checkbox) return;

  fetch('/cart/update.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attributes: { 'Richiedi fattura': checkbox.checked ? 'true' : '' },
    }),
  }).catch((e) => console.error('[CartInvoiceRequest] update failed:', e));
});
