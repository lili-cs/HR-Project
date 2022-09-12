const mongoose = require("mongoose");
// const OnboardingApplication = require('../models/OnboardingApplication');
// const User = require('../models/Users');

const EmailInvitationSchema = new mongoose.Schema({    
    email: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        required: true
    }
});

const EmailInvitation = mongoose.model('EmailInvitation', EmailInvitationSchema);
module.exports = EmailInvitation;