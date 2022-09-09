const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const UserInfo = require('../models/UserInfo');
const Visa = require('../models/Visa');

router.get('/visa', async(req, res, next) => {
    // find all user from database
    const visa = await Visa.find();
    res.status(200).send(visa);
})

router.get('/visa_user/:userId', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    // console.log(visa);
    res.status(200).send(visa);
})

router.post('/visa', async(req, res, next) => {
    console.log(req.body);
});

//handle post(`${localHost}/visa_user/${this.state.userId}/opt_receipt`
router.post('/visa_user/:userId/opt_receipt', async(req, res, next) => {
    id = req.params.userId
    const visa = await Visa.findOne({userId: id});
    const opt_receipt = req.body;
    // console.log(opt_receipt);
    visa.opt_receipt = opt_receipt;
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
    const visa = await Visa.findOne({email: req.body.email});
    const opt_receipt = req.body.receipt;
    // console.log(opt_receipt);
    visa.opt_receipt = opt_receipt;
    await visa.save();
    res.status(200).send(visa);
});

router.post('/visa_ead_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({email: req.body.email});
    const opt_ead = req.body.ead;
    // console.log(opt_receipt);
    visa.opt_ead = opt_ead;
    await visa.save();
    res.status(200).send(visa);
});

router.post('/visa_i983_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({email: req.body.email});
    const i983 = req.body.i983;
    // console.log(opt_receipt);
    visa.i983 = i983;
    await visa.save();
    res.status(200).send(visa);
});

router.post('/visa_i20_status', async(req, res, next) => {
    // console.log(req.body);
    const visa = await Visa.findOne({email: req.body.email});
    const i20 = req.body.i20;
    // console.log(opt_receipt);
    visa.i20 = i20;
    await visa.save();
    res.status(200).send(visa);
});

module.exports = { VisaController: router }