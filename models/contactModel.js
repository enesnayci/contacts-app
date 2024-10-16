const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true,"Please add the name"]
    },
    mail: {
        type:String,
        required: [true,"Please add the email"]
    },
    phone: {
        type:String,
        required: [true,"Please add the phone"]
    }
},
{
    timestamps : true,
});

module.exports = mongoose.model('Contact',contactSchema);