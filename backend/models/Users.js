const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase:true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin:{
        type: Boolean,
        required: true,
        default: false,
    }
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;


    // house:{
    //     type: mongoose.Types.ObjectId,
    //     required: false,
    //     default: undefined,
    // },
    // onBoardApplication:{
    //     type: mongoose.Types.ObjectId,
    //     required: false,
    //     default: undefined,
    // },