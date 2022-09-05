const express = require('express');
const router = express.Router();
const UserInfo = require('../models/UserInfo');

router.post('/onboarding-application/add', async(req, res, next) => {

    const userInfo = new UserInfo(req.body);
    try{
        await userInfo.save();
        res.send('successful');
    }
    catch(err){
        console.log('create new userInfo failed');
        res.send('fail');
    }
});

module.exports = { userInfoController: router }