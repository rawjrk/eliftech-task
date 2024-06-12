const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
  },
});

module.exports = mongoose.model('Product', ProductSchema);
