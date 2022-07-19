export const getOrder = () => {
  return JSON.parse(localStorage.getItem('order'));
};

export const setOrder = (data) => {
  localStorage.setItem('order', JSON.stringify(data));
};

export const removeOrder = () => {
  localStorage.removeItem('order');
  localStorage.removeItem('shop');
};

export const savePedningOrder = (orderId, totalPrice) => {
  const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
  pendingOrders.push({ orderId, totalPrice });
  localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
};

export const findProductById = (productId, order) => {
  return order.find((elem) => elem._id === productId);
};

export const removeProductById = (productId, order) => {
  return [].filter.call(order, (elem) => elem._id !== productId);
};

export const totalPrice = (order) => {
  return [].reduce.call(order,
      (prev, elem) => prev + elem.quantity * elem.price, 0);
};
