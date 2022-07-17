const { catchAsync } = require('../utils');
const { totalPrice } = require('../utils/order');
const Shop = require('../models/shops');
const Product = require('../models/products');

module.exports.index = catchAsync(async (req, res) => {
  const shops = await Shop.find({});
  if (req.query.title) {
    const { title } = req.query;
    const shop = await Shop.findOne({ title });
    const products = await Product.find({ shop: shop._id });
    res.render('shops/index', { shops, products, title });
    return;
  }
  const products = await Product.find({});
  res.render('shops/index', { shops, products, title: 'all' });
});

module.exports.cart = catchAsync(async (req, res) => {
  const { order } = req.session;
  for (const product of order) {
    product.details = await Product.findById(product.productId);
  }
  res.render('shops/cart', { order, totalPrice });
});
