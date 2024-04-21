const dotenv = require('dotenv');
dotenv.config();
require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const globalErrHandler = require("./middlewares/globalHandler");
const app = express();
const session = require('express-session');
const port = process.env.PORT
const userRoutes = require('./routes/userRoute');
const cartRoutes = require('./routes/cartRoute');
// const reviewRoutes = require("./routes/reviews");
const productRoutes = require("./routes/product");
const bodyParser = require('body-parser');
const stripe = require('stripe')('');
const paymentRoutes = require("./routes/paymentRoutes")

app.use(bodyParser.json());
app.use(express.json());


const sessionSecret = process.env.SESSION_SECRET;
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URL,
            ttl: 24 * 60 * 60,
        }),
    })
);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use("/products", productRoutes);
app.use("/payment", paymentRoutes);
// app.use("/reviews", reviewRoutes);

app.use(globalErrHandler);

app.listen(port, () => {
    console.log("Server running");
})