const {Router} = require("express");
const isAdmin = require("../middlewares/isAdmin");
const { createAuthor, findAllAuthors, updateAuthors, removeAuthors, findByIdAuthor } = require("../controllers/author.controller");
const router = Router();

router.post('/', isAdmin, createAuthor);
router.get('/', findAllAuthors);
router.get('/:id', findByIdAuthor);
router.put('/:id', isAdmin, updateAuthors);
router.delete('/:id', isAdmin, removeAuthors);

module.exports = router;