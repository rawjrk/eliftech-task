import { disableButtonsExceptShopId } from '/javascripts/buttonControl.js';
import {
  addToCart, removeFromCart, renderCart,
  changeQuantity, submitOrder,
} from '/javascripts/cartUtils.js';

if (window.location.pathname === '/shopping-cart') {
  const container = document.querySelector('#shopping-cart');
  const total = document.querySelector('#total-price');
  renderCart(container, total)
      .then(() => {
        const qtyChange = document.querySelectorAll('.quantity-change button');
        for (const btn of qtyChange) {
          btn.addEventListener('click', () => {
            const [, operation, productId] = btn.id.split('-');
            const currentQty = document.querySelector(`#quantity-display-${productId}`);

            if (operation === 'minus' && currentQty.value <= 1) {
              const cartElem = document.querySelector(`#cart-elem-${productId}`);
              removeFromCart(productId, total, cartElem);
            } else {
              changeQuantity(productId, operation, total, currentQty);
            }
          });
        }
      });

  const submitButton = document.querySelector('#submit-order');
  submitButton.addEventListener('click', () => {
    const userDataForm = document.querySelector('#user-data');

    userDataForm.classList.add('was-validated');
    if (!userDataForm.checkValidity()) return;

    const userEntries = ['name', 'email', 'phone', 'address'].map((elem) => {
      const inputElem = userDataForm.querySelector(`[name="${elem}"]`);
      return [inputElem.name, inputElem.value];
    });

    const userData = Object.fromEntries(userEntries);
    submitOrder(userData).then(() => location.reload());
  });
}

if (window.location.pathname === '/shops') {
  if (localStorage.getItem('shop')) {
    disableButtonsExceptShopId(localStorage.getItem('shop'));
  }

  const cartForms = document.querySelectorAll('.add-to-cart');
  for (const form of cartForms) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formInputs = form.querySelectorAll('input');
      const product = Object.fromEntries(
          [].map.call(formInputs, (elem) => [elem.name, elem.value]),
      );

      addToCart(product);
      disableButtonsExceptShopId(product.shop);
    });
  }
}
