module.exports.totalPrice = (order) => {
  return order
      .reduce((prev, elem) => prev + elem.quantity * elem.details.price, 0);
};
