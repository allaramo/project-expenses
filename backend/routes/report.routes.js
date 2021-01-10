const express = require("express");
const router = express.Router();
const controller = require('../controllers/report.controller');

//retrieves the report
router.get('', controller.getReport);

module.exports = router;
