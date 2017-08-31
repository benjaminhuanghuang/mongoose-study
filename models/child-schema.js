const mongoose = require("mongoose");
// child address schema
var addressSchema = new mongoose.Schema({
  type: String,
  street: String,
  city: String,
  postalCode: Number
});

// parent schema
var customerSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  address: [addressSchema],
  createdOn: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});
