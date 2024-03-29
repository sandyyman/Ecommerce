const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    user_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

}
    ,
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;