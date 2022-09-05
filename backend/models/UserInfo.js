const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personNameSchema = Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    preferredName: String
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
    workPhone: String
});

const visaSchema = Schema({
    visaType: {
        type: String,
        enum: {
            values: ['Green Card', 'Citizen','H1-B','L2', 'F1(CPT/OPT)','H4','Other'],
            // message: '{VALUE} is not supported'
        }
    },
    startDate: String,
    endDate: String
});

const emergencyContactSchema = Schema ({
    name: personNameSchema,
    phone: String,
    email: String,
    relationship: String
});

const userInfoSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        userName: personNameSchema,
        profilePicture: {
            data: Buffer,
            contentType: String
        },
        SSN: String,
        DOB: String,
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female', 'Do not wish to answer'],
                // message: '{VALUE} is not supported'
            }
        },
        address: addressSchema,
        phone: phoneNumSchema,
        visa: visaSchema,
        emergencyContact: emergencyContactSchema,
        documents: [String],
        house: Schema.Types.ObjectId,
        onboardingApplication: Schema.Types.ObjectId
    }
);

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;