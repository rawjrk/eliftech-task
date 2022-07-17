if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

const store = MongoStore.create({
  mongoUrl,
  touchAfter: 24 * 3600,
});

store.on('error', function(err) {
  console.log('Session Store Error', err);
});

const secret = process.env.SECRET || 'fsafahah';
const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 3600 * 1000,
    maxAge: 7 * 24 * 3600 * 1000,
  },
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessionConfig.cookie.secure = true;
}
app.use(session(sessionConfig));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.isShopPage = req.path === '/shops';
  res.locals.isCartPage = req.path === '/shopping-cart';
  res.locals.orderSize = req.session?.order?.length || 0;
  next();
});

app.use('/order', orderRoutes);
app.use('/', shopRoutes);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
