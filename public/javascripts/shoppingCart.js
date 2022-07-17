const qtyChange = document.querySelectorAll('.quantity-change button');
const totalPrice = document.querySelector('#total-price');
const orderBadge = document.querySelector('#order-badge');
const userDataForm = document.querySelector('#user-data');
const submitButton = document.querySelector('#submit-order');

for (const btn of qtyChange) {
  btn.addEventListener('click', () => {
    const [, operation, productId] = btn.id.split('-');
    const currentQty = document.querySelector(`#quantity-display-${productId}`);

    if (operation === 'minus' && currentQty.value <= 1) {
      removeProduct(productId)
          .then((response) => {
            const currentCard = document.querySelector(`#product-card-${productId}`);
            currentCard.remove();
            totalPrice.innerText = response.totalPrice;
            orderBadge.innerText = response.orderSize;

            const isRedBadge = orderBadge.classList.contains('text-bg-danger');
            if (response.totalPrice < 1 && isRedBadge) {
              orderBadge.classList.remove('text-bg-danger');
              orderBadge.classList.add('text-bg-secondary');
            }
          });
      return;
    }

    changeQuantity(productId, operation)
        .then((response) => {
          currentQty.value = response.quantity;
          totalPrice.innerText = response.totalPrice;
        });
  });
}

submitButton.addEventListener('click', () => {
  userDataForm.classList.add('was-validated');
  if (!userDataForm.checkValidity()) return;

  const userDataRaw = ['name', 'email', 'phone', 'address'].map((elem) => {
    return [elem, document.querySelector(`#user-${elem}`).value]
  });

  const userData = Object.fromEntries(userDataRaw);
  submitOrder(userData)
      .then(response => {
        console.log('order submitted!');
        console.log(response);
      });
});

const changeQuantity = async (productId, operation) => {
  const response = await fetch('/order', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, operation }),
  });

  return await response.json();
};

const removeProduct = async (productId) => {
  const response = await fetch('/order', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  return await response.json();
};

const submitOrder = async (userData) => {
  const response = await fetch('/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userData, submittedOn: new Date() }),
  });

  return await response.json();
};
