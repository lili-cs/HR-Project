const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const UserInfo = require('../models/UserInfo');
const OnboardingApplication = require('../models/OnboardingApplication');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits:{fieldSize: 10 * 1024 * 1024} });

router.get('/onboarding-applications', async (req, res) => {
    try{
        const applications = await OnboardingApplication.find()
            .populate({path: 'userId', select: 'email'})
            .populate({path: 'userInfoId'});
            // .exec();      

        // pendingApplications = await OnboardingApplication.find({status: 'Pending'});
        // const isPopulated1 = applications.populated('onboardingApplication');
        // const isPopulated2 = applications.populated('uerId');
        res.send(applications);
    }
    catch(err){
        console.log(err);
    }
});

router.get('/onboarding-applications/application/:applicationId', async (req, res) => {
    const applicationId = req.params.applicationId;

    try{
        const application = await OnboardingApplication.findById(applicationId)
        .populate({path: 'userId', select: 'email'})
        .populate({path: 'userInfoId'});

        res.send(application);
    }
    catch(err){
        console.log(err);
    }
});

router.get('/onboarding-applications/:userName', async (req, res) => {
    const userName = req.params.userName;

    try{
        const user = await User.findOne({username:userName});
        const application = await OnboardingApplication.findOne({userId: user._id})
        .populate({path: 'userId', select: 'email'})
        .populate({path: 'userInfoId'});

        res.send(application);
    }
    catch(err){
        console.log(err);
    }
});

// router.get('/onboarding-applications/rejected', async (req, res) => {
//     rejectedApplications = await OnboardingApplication.find({status: 'Rejected'});
//     res.send(rejectedApplications);
// });

// router.get('/onboarding-applications/approved', async (req, res) => {
//     approvedApplications = await OnboardingApplication.find({status: 'Approved'});
//     res.send(approvedApplications);
// });

router.put('/onboarding-applications/:applicationId', async (req, res) => {
    const applicationId = req.params.applicationId;

    try{
        const application = await OnboardingApplication.findById(applicationId);
        application.status = req.body.status;
        if(req.body.feedback){
            application.feedback = req.body.feedback;
        }

        application.save();
    }
    catch(err){
        console.log(err);
    }
});



router.post('/onboarding-application/add/:userName', upload.single('profilePicture'), async(req, res, next) => {
    // const user_id = mongoose.Types.ObjectId(req.params.userId);
    const user_name = req.params.userName;
    // const user_id = req.params.userId;
    // console.log(req.file);

    try{
        const user_id = await User.findOne({username: user_name}, '_id'); 

        const newUserInfo = new UserInfo({
            // userId: Schema.Types.ObjectId(req.params.userId),
            userId: user_id,
            userName: req.body.userNames,
            profilePicture: req.file ? {
                data: req.file.buffer.toString('base64'),
                contentType: 'image/png'
            } : null,
            SSN: req.body.SSN,
            DOB: req.body.DOB,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            visa: req.body.visa,
            emergencyContact: !req.body.emergencyContact ? null : req.body.emergencyContact,
            documents: !req.body.documents ? [] : req.body.documents
        });

        const result = await newUserInfo.save();
        const userInfoId = result._id;

        const newApplication = new OnboardingApplication({
            userId: user_id,
            userInfoId: userInfoId,
            status: 'Pending',
            car: !req.body.car ? null : req.body.car ,
            driverLicense: !req.body.driverLicense ? null : req.body.driverLicense,
            reference: !req.body.reference ? null : req.body.reference
        });
        
        await newApplication.save();
        res.status(200).send('create user applicaiton successfully');
        console.log('create user applicaiton successfully');
    }
    catch(err){
        console.log(err);
        res.status(501).send('save new userInfo or onboarding applicaton failed');
    }
});

module.exports = { OnboardingApplicationController: router }