const express = require('express');
const router = express.Router();

const controller = require('../controller/Auth/controller');

router.post('/login', controller.handleLogin);
router.post('/signup', controller.handleSignup);

module.exports = router