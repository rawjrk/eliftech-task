if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const Shop = require('../models/shops');
const Product = require('../models/products');
const fakeShop = require('./faker/fakeShop');
const fakeProduct = require('./faker/fakeProduct');
const { randNum, randElem, capitalize } = require('./helpers');

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Shop.deleteMany({});
  await Product.deleteMany({});

  // seeding shops
  for (let i = 0; i < 5; i++) {
    const shopTitle = [
      randElem(fakeShop['adj']),
      randElem(fakeShop['nouns']),
    ].join(' ');

    const shop = new Shop({
      title: capitalize(shopTitle),
    });
    await shop.save();

    // seeding products
    for (let j = 0; j < randNum(4)+1; j++) {
      const productTitle = [
        randElem(fakeProduct['mainAdj']),
        randElem(fakeProduct['secAdj']),
        'Burger',
      ].join(' ');

      const product = new Product({
        title: capitalize(productTitle),
        price: randNum(10) + 10,
        shop: shop._id,
      });
      await product.save();
    }
  }
};


seedDB().then(() => {
  db.close();
  console.log('Seeded successfully');
});
