const mongoose = require("mongoose");

const model = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const userModel = new mongoose.model('User', model);

module.exports = userModel;