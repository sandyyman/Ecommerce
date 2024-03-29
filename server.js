const dotenv = require('dotenv');
dotenv.config();
require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const port = process.env.PORT
const userRoutes = require('./routes/userRoute');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

const sessionSecret = process.env.SESSION_SECRET;
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log("Server running");
})