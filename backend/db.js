const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_KEY } = process.env;

mongoose.connect(
    MONGO_KEY,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err, data) => {
        if(err){
            return console.log(err);
        }
        console.log('connted to db successfully');
    }
);

module.exports = mongoose.connection;