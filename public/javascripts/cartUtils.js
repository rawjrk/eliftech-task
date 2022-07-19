import {
  getOrder, setOrder, removeOrder,
  savePedningOrder, findProductById,
  removeProductById, totalPrice,
} from '/javascripts/orderUtils.js';

export const addToCart = (product) => {
  const order = getOrder() || [];
  if (!localStorage.getItem('shop')) {
    localStorage.setItem('shop', product.shop);
  }

  const currentShop = localStorage.getItem('shop');
  if (currentShop !== product.shop) return;

  const currentProduct = findProductById(product._id, order);
  if (!currentProduct) order.push({ ...product, quantity: 1 });
  else currentProduct.quantity += 1;

  setOrder(order);
};

export const renderCart = async (container, totalElem) => {
  const template = await fetch('/templates/cartElem.ejs')
      .then((response) => response.text())
      .then((data) => data);

  const order = getOrder() || [];
  for (const product of order) {
    const html = ejs.render(template, { product });
    container.insertAdjacentHTML('beforeend', html);
  }

  totalElem.innerText = totalPrice(order);
};

export const changeQuantity = (productId, operation, totalElem, displayElem) => {
  const order = getOrder();
  const currentProduct = findProductById(productId, order);

  if (operation === 'minus') currentProduct.quantity--;
  if (operation === 'plus') currentProduct.quantity++;

  setOrder(order);
  totalElem.innerText = totalPrice(order);
  displayElem.value = currentProduct.quantity;
};

export const removeFromCart = (productId, totalElem, cartElem) => {
  const order = removeProductById(productId, getOrder());
  if (order.length < 1) localStorage.removeItem('shop');
  setOrder(order);

  totalElem.innerText = totalPrice(order);
  cartElem.remove();
};

export const submitOrder = async (userData) => {
  const order = getOrder();
  const body = {
    order,
    userData,
    totalPrice: totalPrice(order),
    submittedOn: new Date(),
  };
  const response = await fetchJsonRequest('/order', 'POST', body);

  removeOrder();
  savePedningOrder(response.orderId, response.totalPrice);
};

const fetchJsonRequest = async (path, method, body) => {
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
