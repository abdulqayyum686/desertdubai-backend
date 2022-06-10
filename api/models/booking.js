const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  info: {
    type: Object,
    // required: true
  },
  tour: {
    type: Object,
    // required: true
  },
  hotel: {
    type: Object,
    // required: true
  },
  safari: {
    type: Object,
    // required: true
  },
  cruise: {
    type: Object,
    // required: true
  },
  yacht: {
    type: Object,
    // required: true
  },
  ticket: {
    type: Object,
    // required: true
  },
  car: {
    type: Object,
    // required: true
  },
  eat: {
    type: Object,
    // required: true
  },
  visa: {
    type: Object,
    // required: true
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
