const express = require('express');
const router = express.Router();
const UserInfo = require('../models/UserInfo');
const User = require('../models/Users');


// router.get('/userInfo/:userId', async(req, res, next) => {
//     const userId = req.params.userId;

//     try{
//         const result = await UserInfo.findById(userId);
//         const emails = await User.find({_id: userId}, 'email');

//         const userInfo = {
//             userDetails: result,
//             email: emails[0],
//         };

//         res.send(userInfo);
//     }
//     catch(err){
//         console.log(err);
//     }
// });



// router.post('/userInfo/add', async(req, res, next) => {

//     const userInfo = new UserInfo(req.body);
//     try{
//         await userInfo.save();
//         res.send('successful');
//     }
//     catch(err){
//         console.log('create new userInfo failed');
//         res.send('fail');
//     }
// });

module.exports = { userInfoController: router }