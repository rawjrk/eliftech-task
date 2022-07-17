const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userData: {
    name: { type: String, required: true, },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  formSubmittedData: { type: Array, required: true },
  submittedOn: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  delivered: { type: Boolean, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
