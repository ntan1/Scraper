/* ----------------------------------------------------------
    DEPENDENCIES
---------------------------------------------------------- */

//  Installed
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
require("dotenv").config();

//  Routing
const routes = require('./controller/routes');


/* ----------------------------------------------------------
    EXPRESS DEPLOYMENT
---------------------------------------------------------- */

//  Initialization
const app = express();

//  Port selection
app.set('port', process.env.PORT || 3000);

//  Body Parser setup
app.use(bodyParser.urlencoded({extended: true}));

/* ----------------------------------------------------------
    ROUTING - EXPRESS
---------------------------------------------------------- */

//  Public Resources
app.use(express.static(path.join(__dirname, 'public')));

//  Routes
routes(app);


/* ----------------------------------------------------------
    VIEWS ENGINE - HANDLEBARS
---------------------------------------------------------- */

// Handlebars as extension '.hbs'
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));


/* ----------------------------------------------------------
    PORT LISTENER
---------------------------------------------------------- */

app.listen(app.get('port'), () => {
    console.log(`Listening on port: ${app.get('port')}`);
});


/* ----------------------------------------------------------
    DATABASE SETUP
---------------------------------------------------------- */
  
require('./controller/db_connect');                         