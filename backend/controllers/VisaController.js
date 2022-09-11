const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const UserInfo = require('../models/UserInfo');
const Visa = require('../models/Visa');
require('dotenv').config()
const jwt = require("jsonwebtoken");

router.get('/visa', async(req, res, next) => {
    // console.log(req)
    // const visa = await Visa.find();
    res.status(200).send('visa');
})

router.get('/visaHR', async(req, res, next) => {
    var ObjectId = require('mongodb').ObjectId;
    const visa = await Visa.find();
    let userInfos = [];
    for (let i = 0; i < visa.length; i++) {
        let id = visa[i].userId;
        let userInfo = await UserInfo.findOne({userId: ObjectId({id})});
        console.log(userInfo);
        if (userInfo) {
            // visa[i]._doc = {...visa[i]._doc, username: userInfo.userName};
            // visa[i].visa = userInfo.visa.visaType;
            const username = {
                firstName: 'firstName',
                lastName: 'lastName',
                middleName: 'middleName',
                preferredName: 'preferredName',
            }
            visa[i]._doc = {...visa[i]._doc, username: username};
            visa[i].visa = "OPT";
        } else {
            const username = {
                firstName: 'firstName',
                lastName: 'lastName',
                middleName: 'middleName',
                preferredName: 'preferredName',
            }
            visa[i]._doc = {...visa[i]._doc, username: username};
            visa[i].visa = "OPT";
        }
        userInfos.push(visa[i]);
    }
    // console.log(visa);
    res.status(200).send({visa, userInfos});
})

router.post('/visa', async(req, res, next) => {
    var ObjectId = require('mongodb').ObjectId;
    const jwtToken = req.body.jwtToken;
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({email: decode.email});
    console.log(user._id);
    if (user) {
        const visa = await Visa.findOne({userId: user._id});
        if (visa) {
            res.status(200).send(visa);
        } else {
            // create new visa
            const newVisa = new Visa({
                userId: user._id,
                visa: 'OPT',
                opt_receipt: {
                    status: 'null',
                    link: 'null',
                    name: 'null',
                },
                opt_ead: {
                    status: 'null',
                    link: 'null',
                    name: 'null',
                },
                i983: {
                    status: 'null',
                    link: 'null',
                    name: 'null',
                },
                i20: {
                    status: 'null',
                    link: 'null',
                    name: 'null',
                },
            });
            const visa = await newVisa.save();
            res.status(200).send(visa);
        }
    } else {
        res.status(200).send('no user');
    }
});

router.get('/visa_user/:userId', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    res.status(200).send(visa);
})

router.post('/visa_user/:userId/opt_receipt', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    const opt_receipt = req.body;
    visa.opt_receipt = opt_receipt;
    // console.log(visa);
    await visa.save();
    res.status(200).send(visa);
})

router.post('/visa_user/:userId/opt_ead', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    const opt_ead = req.body;
    visa.opt_ead = opt_ead;
    await visa.save();
    res.status(200).send(visa);
})

router.post('/visa_user/:userId/i983', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    const i983 = req.body;
    visa.i983 = i983;
    await visa.save();
    res.status(200).send(visa);
})

router.post('/visa_user/:userId/i20', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    const i20 = req.body;
    visa.i20 = i20;
    await visa.save();
    res.status(200).send(visa);
})

router.post('/visa_receipt_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({userId: req.body.userId});
    const opt_receipt = req.body.receipt;
    // console.log(opt_receipt);
    visa.opt_receipt = opt_receipt;
    await visa.save();
    // res.status(200).send(visa);
    const visaAll = await Visa.find();
    res.status(200).send(visaAll);
});

router.post('/visa_ead_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({userId: req.body.userId});
    const opt_ead = req.body.ead;
    // console.log(opt_receipt);
    visa.opt_ead = opt_ead;
    await visa.save();
    // res.status(200).send(visa);
    const visaAll = await Visa.find();
    res.status(200).send(visaAll);
});

router.post('/visa_i983_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({userId: req.body.userId});
    const i983 = req.body.i983;
    // console.log(opt_receipt);
    visa.i983 = i983;
    await visa.save();
    // res.status(200).send(visa);
    const visaAll = await Visa.find();
    res.status(200).send(visaAll);
});

router.post('/visa_i20_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({userId: req.body.userId});
    const i20 = req.body.i20;
    // console.log(opt_receipt);
    visa.i20 = i20;
    await visa.save();
    // res.status(200).send(visa);
    const visaAll = await Visa.find();
    res.status(200).send(visaAll);
});

router.post('/visaHR_search', async(req, res, next) => {
    var ObjectId = require('mongodb').ObjectId;
    const search = req.body.search;
    const visa = await Visa.find();
    let userInfos = [];
    let newVisa = [];
    for (let i = 0; i < visa.length; i++) {
        let id = visa[i].userId;
        let userInfo = await UserInfo.findOne({userId: ObjectId({id})});
        // if (userInfo) {
        //     if (userInfo.userName.firstName.includes(search) || userInfo.userName.lastName.includes(search) || userInfo.userName.middleName.includes(search) || userInfo.userName.preferredName.includes(search)) {
        //         newVisa.push(visa[i]);
        //         visa[i]._doc = {...visa[i]._doc, username: userInfo.userName};
        //         visa[i].visa = userInfo.visa.visaType;
        //         userInfos.push(visa[i]);
        //     }
        // } else {
        //     const username = {
        //         firstName: 'firstName',
        //         lastName: 'lastName',
        //         middleName: 'middleName',
        //         preferredName: 'preferredName',
        //     }
        //     if (username.firstName.includes(search) || username.lastName.includes(search) || username.middleName.includes(search) || username.preferredName.includes(search)) {
        //         newVisa.push(visa[i]);
        //         visa[i]._doc = {...visa[i]._doc, username: username};
        //         visa[i].visa = "OPT";
        //         userInfos.push(visa[i]);
        //     }   
        // }
        const username = {
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName',
            preferredName: 'preferredName',
        }
        if (username.firstName.includes(search) || username.lastName.includes(search) || username.middleName.includes(search) || username.preferredName.includes(search)) {
            newVisa.push(visa[i]);
            visa[i]._doc = {...visa[i]._doc, username: username};
            visa[i].visa = "OPT";
            userInfos.push(visa[i]);
        }  
    }
    res.status(200).send({newVisa, userInfos});
})

module.exports = { VisaController: router }