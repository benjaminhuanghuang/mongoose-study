var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocSchema = new DocSchema({
  title: String,
  published: {
    type: Data,
    default: Date.now
  },
  keywords: Array,
  // Reference
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  //Embedded sub-document
  detail: {
    modelNumber: Number,
    hardcover: Boolean,
    reviews: Number,
    rank: Number,
  }
})
module.exports = mongoose.model('Doc', DocSchema)