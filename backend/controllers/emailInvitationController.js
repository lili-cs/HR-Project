const express = require('express');
const router = express.Router();
const EmailInvitation = require('../models/EmailInvitation');
const User = require('../models/Users');
const OnboardingApplication = require('../models/OnboardingApplication');

router.get('/email-invitations', async (req, res) => {
    let returnObj = [];
    const emailInvitations = await EmailInvitation.find({});
    for(let item of emailInvitations){
        const email = item.email;
        const userId = await User.find({email:email}).userId;
        let status = '';
        if(!userId){
            status = 'Not Submitted ';
        }
        else{
            status = await OnboardingApplication.findOne({userId:userId}, 'status');
        }
        returnObj.push({
            email: item.email,
            name: item.name,
            link: item.link,
            status: status
        });
    }

    res.send(returnObj);
});

router.get('/validate-token/:token', async (req, res) => {
    const token = req.params.token;
    const invitation = await EmailInvitation.findOne({token:token});
    if(!invitation){
      return res.send(false);
    }
    // if(Date.now() - invitation.sentTime){
    //   return res.send('Token expired.');
    // }
    return res.send(true);
});

router.post('/email-invitations', async (req, res) => {
    const newInvitation = new EmailInvitation(req.body);
    try{
        await newInvitation.save();
    }
    catch(err){
        console.log(err);
    }
});



module.exports = { EmailInvitationController: router }