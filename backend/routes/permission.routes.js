const express = require("express");
const router = express.Router();
const controller = require('../controllers/permission.controller');

//retrieves all data
router.get('', controller.getAll);

//retrieves a single item by its id
router.get('/:id', controller.getOne);

//adds a new item
router.post('', controller.add);

//updates an item by its id
router.put('/:id', controller.update);

//deletes an item by its id
router.delete('/:id', controller.delete);

module.exports = router;
