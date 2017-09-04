var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/temp-db", {
  useMongoClient: true
});

// create a mongoose model
var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    require: true,
    minlength:3,
    trim:true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: "Homework"
});

newTodo
  .save()
  .then(doc => {
    console.log("Save todo", doc);
  })
  .catch(err => {
    console.log("Unable to save todo", err);
  });
