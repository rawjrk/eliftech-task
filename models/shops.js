const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Shop', ShopSchema);
