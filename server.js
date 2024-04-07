const dotenv = require("dotenv");
dotenv.config();
require("./config/db");
const express = require("express");
const MongoStore = require("connect-mongo");
const app = express();
const session = require("express-session");
const globalErrHandler = require("./middlewares/globalHandler");
const port = process.env.PORT;
const userRoutes = require("./routes/userRoute");
const reviewRoutes = require("./routes/reviews");
const productRoutes = require("./routes/product");
const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cartRoute");

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
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);

// *Error handler middleware
app.use(globalErrHandler);

app.listen(port, () => {
  console.log("Server running");
});
