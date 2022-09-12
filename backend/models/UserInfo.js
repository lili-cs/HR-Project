const User  = require('../models/Users');
const OnboardingApplication = require('../models/OnboardingApplication');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personNameSchema = Schema({
    firstName: String,
    lastName: String,
    middleName: {
        type: String,
        default: ''
    },
    preferredName: {
        type: String,
        default: ''
    }
});

const addressSchema = Schema(
    {
        aptNum: String,
        streetName: String,
        city: String,
        state: String,
        zip: String
    }
);

const phoneNumSchema = Schema({
    cellPhone: String,
    workPhone: {
        type: String,
        default: ''
    },
});

const visaSchema = Schema({
    visaType: {
        type: String,
        // enum: {
        //     values: ['Green Card', 'Citizen','H1-B','L2', 'F1','H4','Other'],
        //     // message: '{VALUE} is not supported'
        // }
        default: ''
    },
    startDate: {
        type: String,
        default: ''
    },
    endDate: {
        type: String,
        default: ''
    }
});

const emergencyContactSchema = Schema ({
    name: personNameSchema,
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    relationship: {
        type: String,
        default: ''
    },
});

const userInfoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            // ref: 'User'
        },
        userName: personNameSchema,
        // profilePicture: {
        //     data: Buffer,
        //     contentType: String
        // },
        profilePicture: {
            type: String,
            default: ''
        },
        SSN: {
            type: String,
            required: true
        },
        DOB: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female', 'Do not wish to answer'],
                // message: '{VALUE} is not supported'
            },
            default: ''
            // required: true
        },
        address: {
            type: addressSchema,
            // required: true
        },
        phone: phoneNumSchema,
        visa: visaSchema,
        emergencyContact: emergencyContactSchema,
        documents: [String],
        house: Schema.Types.ObjectId,
        // onboardingApplication: {
        //     type: Schema.Types.ObjectId,
        //     ref: OnboardingApplication
        // }
    }
);

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;