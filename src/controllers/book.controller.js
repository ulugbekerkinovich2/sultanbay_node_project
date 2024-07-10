const Book = require("../models/book.model");

const createBook = async (req, res) => {
  try {  
    const book = new Book (req.body);
    await book.save();
    res.send(book);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Internal Server Error" });
  };
};

const findAllBooks = async (req, res) => {
  try {
    const books = await Book.find({existence: true}).populate("author");
    res.send(books);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  };
};

const findByIdBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    res.send(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); 
  };
};

const updateBooks = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, author, ISBN} = req.body;
    const book = await Book.findByIdAndUpdate(id, 
      {
        $set: {
          title,
          author,
          ISBN,
        },
    }, 
    {new: true});
    res.send(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); 
  };
};

const removeBooks = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Book successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); 
  };
};

module.exports = {
  createBook,
  findAllBooks,
  findByIdBook,
  updateBooks,
  removeBooks
};