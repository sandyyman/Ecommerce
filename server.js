const dotenv = require("dotenv");
dotenv.config();
require("./config/db");
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const app = express();
const session = require("express-session");
const port = process.env.PORT;
const userRoutes = require("./routes/userRoute");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

// *session
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

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("Server running");
});
