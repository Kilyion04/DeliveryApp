const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: Number,
    required: true
  },
  restaurant_name: {
    type: String,
    required: true
  },
  restaurant_address: {
    type: String,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  order_status: {
    type: String,
    required: true
  },
  order_items: {
    type: String,
    required: true
  },
  order_total_amount: {
    type: Number,
    required: true
  },
  delivery_status: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  delivery_person_name: {
    type: String,
    default: ''
  },
  delivery_person_id: {
    type: Number,
    default: 0
  },
  delivery_person_ids_refuse: {
    type: String,
    default: ''
  },
  delivery_date: {
    type: Date,
    default: null
  },
  qr_code: {
    type: String,
    default: ''
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
