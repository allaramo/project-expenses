const express = require("express");
const router = express.Router();
const controller = require('../controllers/report.controller');
const auth = require('../middleware/auth');
const access = require('../middleware/access');

//retrieves the report
router.get('', auth, access, controller.getReport);

module.exports = router;
