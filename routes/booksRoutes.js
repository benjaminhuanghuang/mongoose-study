const express = require('express');
const booksRouter = express.Router();

const booksController = require('../controllers/booksController');


booksRouter.get('/', booksController.getBooks);
booksRouter.post('/add', booksController.addBook);

module.exports = booksRouter;