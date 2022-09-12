const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visaSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    visa: {
        type: String,
        required: false,
    },
    opt_receipt: {
        type: Object,
    },
    opt_ead: {
        type: Object,
    },
    i20: {
        type: Object,
    },
    i983: {
        type: Object,
    }
});

const VisaModel = mongoose.model("Visa", visaSchema, "visa");
module.exports = VisaModel;