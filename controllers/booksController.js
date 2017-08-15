var Book = require('../models/book');

// Get data with pagination
exports.getBooksPagination = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 4;
  const skip = (page * limit) - limit;

  const booksPromise = Book.find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Book.count();

  const [stores, count] = await Promise.all([booksPromise, countPromise]);

  const pages = Math.ceil(count / limit);
  if (!stores.length && skip) {
    res.redirect(`/stores/page/${pages}`);
    return;
  }

  res.render('stores', { title: 'Stores', stores, page, pages, count });
};

exports.getBooksOldStyle = (req, res) => {
  Book.find({})
    .exec(function (err, books) {
      if (err) {
        console.log(err);
        res.send('error occurred')
      } else {
        console.log(books);
        res.json(books);
      }
    });
}


exports.getBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
}
