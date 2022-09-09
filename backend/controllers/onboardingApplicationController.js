const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const UserInfo = require('../models/UserInfo');
const OnboardingApplication = require('../models/OnboardingApplication');

router.post('/onboarding-application/add/:userId', async(req, res, next) => {
    // const user_id = mongoose.Types.ObjectId(req.params.userId);
    const user_id = req.params.userId;

    try{
        // const user_name = await User.findById(user_id); 

        const newUserInfo = new UserInfo({
            // userId: Schema.Types.ObjectId(req.params.userId),
            userNames: req.body.userNames,
            profilePicture: req.body.profilePicture,
            SSN: req.body.SSN,
            DOB: req.body.DOB,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            visa: req.body.visa,
            emergencyContact: req.body.emergencyContact,
            documents: req.body.documents
        });

        const result = await newUserInfo.save();
        const userInfoId = result._id;

        const newApplication = new OnboardingApplication({
            userId: user_id,
            userInfoId: userInfoId,
            status: 'Pending',
            car: req.body.car,
            driverLicense: req.body.driverLicense,
            reference: req.body. reference
        });
        
        await newApplication.save();
        console.log('create user applicaiton successfully');
    }
    catch(err){
        console.log(err);
        res.send('save new userInfo or onboarding applicaton failed');
    }
});

module.exports = { OnboardingApplicationController: router }