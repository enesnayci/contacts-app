const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type :     String,
        required : [true,"Please provide user name"]
    },
    mail : {
        type :     String,
        required : [true,"Please provide mail"],
        unique :   [true,"Mail adress already taken"]
    },
    password : {
        type :     String,
        required : [true,"Please provide password"]
    }
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("User",userSchema);