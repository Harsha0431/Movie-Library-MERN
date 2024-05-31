const express = require("express");
const router = express.Router();
const controller = require('../controller/Library/controller');

router.post('/create', controller.createLibrary);
router.get('/list', controller.getLibraryList);

module.exports = router;