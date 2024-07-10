const Book = require("../models/book.model");
const Rent = require("../models/rent.model");

const rentBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send("Book not found");
    if (!book.existence) return res.status(400).send("Book is not available");

    book.existence = false;
    await book.save();

    const rent = new Rent({
      user: userId,
      book: bookId,
      rentDate: new Date(),
      isRented: true
    });

    const savedRent = await rent.save();
    res.send(savedRent);
  } catch (err) {
    res.status(400).json({ message: "Internal Server Error" });
  };
};

const returnBook = async (req, res) => {
  try {
    const { rentId, bookId } = req.body;
    const rent = await Rent.findById(rentId).populate("user").populate("book");
    if (!rent) return res.status(404).json({ message: "Rent record not found" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.existence = true;
    await book.save();

    await Rent.findByIdAndDelete(rentId);

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(400).json({ message: "Internal Server Error" });
  };
};

const getAllRentedBooks = async (req, res) => {
  try {
    const rents = await Rent.find({ isRented: true }).populate("user").populate("book");
    rents.map(rent => ({
      id: rent._id,
      user: {
        id: rent.user._id,
        name: rent.user.username
      },
      book: {
        id: rent.book._id,
        title: rent.book.title
      },
      rentDate: rent.rentDate,
      returnDate: rent.returnDate
    }));
    res.send(rents);
  } catch (err) {
    res.status(400).json({ message: "Internal Server Error" });
  };
};

module.exports = {
  rentBook,
  returnBook,
  getAllRentedBooks
};