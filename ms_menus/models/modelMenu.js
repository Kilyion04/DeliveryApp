const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  restaurant_id: {
    type: Number,
    required: true
  },
  menu_name: {
    type: String,
    required: true
  },
  menu_description: {
    type: String,
    required: true
  },
  menu_price: {
    type: Number,
    required: true
  },
  article_list: {
    type: [String],
    required: true
  }
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
