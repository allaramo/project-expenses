const express = require("express");
const router = express.Router();
const controller = require('../controllers/expense.controller');
const auth = require('../middleware/auth');

//retrieves all data
router.get('', auth, controller.getAll);

//retrieves a single item by its id
router.get('/:id', auth, controller.getOne);

//adds a new item
router.post('', auth, controller.add);

//updates an item by its id
router.put('/:id', auth, controller.update);

//deletes an item by its id
router.delete('/:id', auth, controller.delete);

module.exports = router;
