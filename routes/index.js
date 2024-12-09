#!/usr/bin/node


// import the express app server
const express = require('express');

// get the router object
const router = express.Router();

// get the controller functions
const control = require('../controllers/AppControllers');

router.get('/status', control.getStatus);

router.get('/stat', control.getStats);

module.exports = router;
