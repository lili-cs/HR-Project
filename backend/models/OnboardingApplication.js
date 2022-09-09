const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = Schema({
    make: String,
    model: String,
    color: String
});

const driverLicenseSchema = Schema({
    number: String,
    expirationDate: String,
    copyDoc: String  //the path to the uploaded copy of the license
});

const referenceSchema = Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String
});

const onboardingApplicationSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        userInfoId: Schema.Types.ObjectId,
        status: {
            type: String,
            enum: {
                values: ['Pending', 'Rejected', 'Submitted'],
            }
        },
        car: carSchema,
        driverLicense: driverLicenseSchema,
        reference: referenceSchema
    }
);

const OnboardingApplication = mongoose.model('OnboardingApplication', onboardingApplicationSchema);
module.exports = OnboardingApplication;