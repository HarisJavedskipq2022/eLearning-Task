module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      age: Number,
      books: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
    },
    { timestamps: true }
  );

  const Reader = mongoose.model("reader", schema);
  return Reader;
};
