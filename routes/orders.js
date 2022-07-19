const express = require('express');
const router = express.Router();
const order = require('../controllers/orders');

router.post('/', order.submitOrder);

module.exports = router;
