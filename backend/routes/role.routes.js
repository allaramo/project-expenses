const express = require("express");
const router = express.Router();
const controller = require('../controllers/role.controller');
const auth = require('../middleware/auth');
const access = require('../middleware/access');

//retrieves all data
router.get('', auth, access, controller.getAll);

//retrieves a single item by its id
router.get('/:id', auth, access, controller.getOne);

//adds a new item
router.post('', auth, access, controller.add);

//updates an item by its id
router.put('/:id', auth, access, controller.update);

//deletes an item by its id
router.delete('/:id', auth, access, controller.delete);

module.exports = router;
