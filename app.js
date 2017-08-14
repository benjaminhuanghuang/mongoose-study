var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const booksRoutes = require('./routes/booksRoutes');

var port = 8080;
var db = 'mongodb://localhost/example';

mongoose.createConnection(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.send('happy to be here');
});

app.use('/books', booksRoutes);

app.listen(port, function () {
  console.log('app listening on port ' + port);
});