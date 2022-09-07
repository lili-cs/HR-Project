const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visaSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    visa: {
        type: String,
        required: true,
    },
    opt_receipt: {
        type: String,
    },
    opt_ead: {
        type: String,
    },
    i20: {
        type: String,
    },
    i983: {
        type: String,
    }
});

const VisaModel = mongoose.model("Visa", visaSchema, "visa");
module.exports = VisaModel;