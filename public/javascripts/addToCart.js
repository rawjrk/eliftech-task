const cartForms = document.querySelectorAll('.add-to-cart');
const orderBadge = document.querySelector('#order-badge');

for (const form of cartForms) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const productId = event.target.querySelector('[name="productId"]').value;
    addToCart(productId)
        .then((response) => {
          orderBadge.innerText = response.orderSize;

          const isRedBadge = orderBadge.classList.contains('text-bg-danger');
          if (!isRedBadge) {
            orderBadge.classList.remove('text-bg-secondary');
            orderBadge.classList.add('text-bg-danger');
          }
        });
  });
}

const addToCart = async (productId) => {
  const response = await fetch('/order', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  return await response.json();
};
