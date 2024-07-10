const cors = require("cors");
const fileUpload = require("express-fileupload")
const authRoutes = require("../routes/auth.route");
const adminRoutes = require("../routes/admin.route");
const booksRoutes = require("../routes/book.route");
const authorsRoutes = require("../routes/author.route");
const rentRoutes = require("../routes/rent.route");

const modules = (app, express) => {
  app.use(cors());
  app.use(express.json());
  app.use(fileUpload());

  app.use('/api/auth', authRoutes);
  app.use(`/api/admin`, adminRoutes);
  app.use('/api/books', booksRoutes);
  app.use('/api/authors', authorsRoutes);
  app.use('/api/rent', rentRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
};

module.exports = modules;