const express = require('express');
const router = express.Router();
const shops = require('../controllers/shops');

router.get('/shops', shops.index);

router.get('/shopping-cart', shops.cart);

router.get('/', (req, res) => {
  res.redirect('/shops');
});

module.exports = router;
