
```
mongoose.Promise = global.Promise;

exports.getBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
}
```