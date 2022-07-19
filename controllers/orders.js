const { catchAsync } = require('../utils');
const Order = require('../models/orders');

module.exports.submitOrder = catchAsync(async (req, res) => {
  const { order, userData, totalPrice, submittedOn } = req.body;

  const newOrder = new Order({
    submittedFormData: order,
    submittedOn: new Date(submittedOn),
    userData,
    totalPrice,
  });
  newOrder.delivered = false;
  await newOrder.save();

  res.send({ orderId: newOrder._id, totalPrice });
});
