const {Router} = require("express");
const isAdmin= require("../middlewares/isAdmin");
const { createBook, findAllBooks, findByIdBook, updateBooks, removeBooks  } = require("../controllers/book.controller");

const router = Router();

router.post('/', isAdmin, createBook);
router.get('/', findAllBooks);
router.get('/:id', findByIdBook);
router.put('/:id', isAdmin, updateBooks);
router.delete('/:id', isAdmin, removeBooks);

module.exports = router;