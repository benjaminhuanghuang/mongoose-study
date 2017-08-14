var Book = require('../models/book');

// Get data with pagination
exports.getBooks = async(req, res) => {
  const page = req.params.page || 1;
  const limit = 4;
  const skip = (page * limit) - limit;

  const booksPromise = Book.find()
      .skip(skip)
      .limit(limit)
      .sort({created: 'desc'});

  const countPromise = Book.count();

  const [stores, count] = await Promise.all([booksPromise, countPromise]);

  const pages = Math.ceil(count / limit);
  if (!stores.length && skip) {
      res.redirect(`/stores/page/${pages}`);
      return;
  }

  res.render('stores', { title: 'Stores', stores, page, pages, count });
};