require("dotenv").config();
const mongoose = require('mongoose');

//  Establishes connection to Mongo and Specific database both from .env
mongoose.connect( process.env.MONGODB_URI, {dbName: process.env.DB_NAME, useNewUrlParser: true }, (err) => {
    if(err) throw err;
    console.log(`Connected to Database: ${process.env.DB_NAME}`);
});