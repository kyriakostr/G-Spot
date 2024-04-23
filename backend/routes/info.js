const express = require('express');

const router = express.Router();

const infocontrollers = require('../controllers/infocontrollers')

router.post('/purchase',infocontrollers.purchase)

router.post('/:id',infocontrollers.getinfo)



module.exports = router