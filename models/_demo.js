const mongoose = require('mongoose');

// Start with the schema
var personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

// Build a model from the schema
var Person = mongoose.model('Person', personSchema);

// Create a document from the model
var bob = new Person({
  firstName:'Bob',
  lastName:'Doe'
})