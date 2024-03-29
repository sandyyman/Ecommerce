const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch(() => {
        console.log("Error while connecting");
    })