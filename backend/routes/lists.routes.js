const express = require("express");
const router = express.Router();
const controller = require('../controllers/lists.controller');
const auth = require('../middleware/auth');

//retrieves all data of projects
router.get('/project', auth, controller.getProjects);

//retrieves all data of phases
router.get('/projectphase', auth, controller.getProjectPhases);

//retrieves all data of categories
router.get('/category', auth, controller.getCategories);

//retrieves all data of subcategories
router.get('/subcategory', auth, controller.getSubcategories);

//retrieves all data of users
router.get('/user', auth, controller.getUsers);

module.exports = router;
