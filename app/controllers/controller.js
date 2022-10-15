const db = require("../models");
const Book = db.book;
const Reader = db.reader;

exports.createBook = async (req, res) => {
  const {body} = req;
  if (!body.name || !body.author || !body.release) {
    return res
          .status(400)
          .send({ status:'error', message: "Data missing to create book!" });
  }

  let book = await Book.findOne({name: body.bookName});
  if(book) {
    return res.status(409).send({status:"error", message:"Book is already present"});
  }

  const books = new Book({
    name: body.name,
    author: body.author,
    release: new Date(body.release)
  });

  const ret = await books.save(books);
  return res.status(200).send({status:'success', data: ret});
};

exports.createReader = async (req, res) => {
  const {body} = req;

  if (!body.name || !body.age) {
    return res
          .status(400)
          .send({ status:'error', message: "Data missing to create reader!" });
  }

  let reader = await Reader.findOne({name: body.readerName});
  if(reader) {
    return res.status(404).send({status:"error", message:"Reader not found, Please add it first"});
  }

  const readers = new Reader({
    name: body.name,
    age: body.age
  });

  const ret =await readers.save(readers);
  return res.status(200).send({status:'success', data: ret});
};

exports.buyBook = async (req, res) => {
  const {body} = req;

  if (!body.readerName || !body.bookName) {
    res.status(400).send({ message: "Data missing for book purchase by reader!" });
    return;
  }

  let book = await Book.findOne({name: body.bookName});
  if(!book) {
    return res.status(404).send({status:"error", message:"Book not found for purchase, Please add it first"});
  }
  
  let reader = await Reader.findOne({name: body.readerName});
  if(!reader) {
    return res.status(404).send({status:"error", message:"Reader not found, Please add it first"});
  }

  let recordExist = reader.books.find((id)=>(JSON.stringify(id) === JSON.stringify(book.id)));
  if(recordExist) {
    return res.status(409).send({status:"error", message:"Reader already purchased this book"});
  }

  let allBooks = reader.books;
  allBooks.push(book);
  await Reader.findOneAndUpdate({name: body.readerName},{books: allBooks});
  const ret = await Reader.findOne({name: body.readerName}).populate({ path: "books"})
  return res.status(200).send({status:"success",data:ret});
};


exports.getAll = async (req, res) => {
  const allData = await Reader.find({}).populate({ path: "books"});
  return res.status(200).send({status:"success", data: allData})
};
