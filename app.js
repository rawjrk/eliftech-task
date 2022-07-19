if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const shopRoutes = require('./routes/shops');
const orderRoutes = require('./routes/orders');

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.isShopPage = req.path === '/shops';
  res.locals.isCartPage = req.path === '/shopping-cart';
  next();
});

app.use('/order', orderRoutes);
app.use('/', shopRoutes);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
