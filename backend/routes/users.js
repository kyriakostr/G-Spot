const express = require('express');

const router = express.Router();

const authcontrollers = require('../controllers/authcontrollers');

router.post('/Signup',authcontrollers.authsignup)
router.post('/Login',authcontrollers.authlogin)

module.exports =router;