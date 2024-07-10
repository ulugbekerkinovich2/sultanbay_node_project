const Author = require("../models/author.model");

const createAuthor = async (req, res) => {
  try {  
    const author = new Author(req.body);
    await author.save();
    res.send(author);
  } catch (err) {
    res.status(400).json({ message: "Internal Server Error" });
  };
};

const findAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  };
};

const findByIdAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.send(author);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); 
  };
};

const updateAuthors = async (req, res) => {
  try {
    const {id} = req.params;
    const {fullname, biography} = req.body;

    const author = await Author.findByIdAndUpdate(id, 
      {
        $set: {
          fullname,
          biography
        },
    }, 
    {new: true});
    res.send(author);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); 
  };
};

const removeAuthors = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Author successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); 
  };
};

module.exports = {
  createAuthor,
  findAllAuthors,
  findByIdAuthor,
  updateAuthors,
  removeAuthors
};