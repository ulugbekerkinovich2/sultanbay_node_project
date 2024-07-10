const {Router} = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const { rentBook, returnBook, getAllRentedBooks } = require("../controllers/rent.controller");

const router = Router();

router.post('/', isAuth, rentBook);
router.post('/return', isAuth, returnBook);
router.get('/list', getAllRentedBooks);

module.exports = router;