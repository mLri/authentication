const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/APIauth', { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

// Midlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Router
app.use('/users', require('./routes/user'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`Server is running to port : ${port}`);
});