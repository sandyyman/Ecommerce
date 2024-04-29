const express = require("express");
const router = express.Router();
const protected = require("../middlewares/protected");
const { addItem, deleteItem, getCart } = require('../controllers/cartController');

router.post('/add',protected, addItem);
router.post('/delete',protected, deleteItem);
router.get('/:userId',protected, getCart);

module.exports = router;
