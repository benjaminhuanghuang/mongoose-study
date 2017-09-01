const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  toppings: {
    type: [string],
    // must have at least one topping
    validate: {
      validator: function(val) {
        return val.length > 1;
      }
    }
  }
});


