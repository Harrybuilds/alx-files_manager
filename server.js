#!/usr/bin/node

// working with CommonJs module


const express = require('express');
require('dotenv').config();
const routes = require('./routes/index');

// create the express server app
const app = express();

// use middleware to parse json data
app.use(express.json());
// use middleware to access all routes
app.use('/', routes);


//set port the server app would listen to
const port = process.env.PORT || 5000



// set app to listen and serve files
app.listen(port,(req, res) => {
    console.log(`server is running on "http://localhost:${port}"`);
});
