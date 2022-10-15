module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      author: String,
      release: Date
    },
    { timestamps: true }
  );

  const Book = mongoose.model("book", schema);
  return Book;
};
