const express = require('express');
const booksRouter = express.Router();

const booksController = require('../controllers/booksController');


booksRouter.get('/', booksController.getBooks);

module.exports = booksRouter;