const { catchAsync } = require('../utils');
const { totalPrice } = require('../utils/order');
const Order = require('../models/orders');

module.exports.addProduct = catchAsync(async (req, res) => {
  const { productId } = req.body;
  if (!req.session.order) req.session.order = [];
  const currentProduct = req.session.order
      .find((elem) => elem.productId === productId);

  if (!currentProduct) req.session.order.push({ productId, quantity: 1 });
  else currentProduct.quantity += 1;
  res.send({
    orderSize: req.session.order.length,
  });
});

module.exports.changeQuantity = catchAsync(async (req, res) => {
  const { productId, operation } = req.body;
  const currentProduct = req.session.order
      .find((elem) => elem.productId === productId);

  if (!currentProduct) {
    res.send({ error: 'no such product on the order' });
    return;
  }

  if (operation === 'minus') currentProduct.quantity -= 1;
  if (operation === 'plus') currentProduct.quantity += 1;

  res.send({
    quantity: currentProduct.quantity,
    totalPrice: totalPrice(req.session.order),
  });
});

module.exports.removeProduct = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const currentProduct = req.session.order
      .find((elem) => elem.productId === productId);

  if (!currentProduct) {
    res.send({ error: 'no such product on the order' });
    return;
  }

  req.session.order = req.session.order
      .filter((elem) => elem.productId !== productId);

  res.send({
    orderSize: req.session.order.length,
    totalPrice: totalPrice(req.session.order),
  });
});

module.exports.submitOrder = catchAsync(async (req, res) => {
  const { order } = req.session;
  const { submittedOn, userData } = req.body;

  const newOrder = new Order({
    formSubmittedData: order,
    submittedOn: new Date(submittedOn),
    userData,
  });
  newOrder.totalPrice = totalPrice(order);
  newOrder.delivered = false;
  await newOrder.save();

  req.session.order = [];

  res.send({
    referenceId: newOrder._id,
    totalPrice: newOrder.totalPrice,
  });
});
