const express = require('express');
const router = express.Router();
const order = require('../controllers/orders');

router.post('/', order.submitOrder);
router.put('/', order.addProduct);
router.patch('/', order.changeQuantity);
router.delete('/', order.removeProduct);

module.exports = router;
