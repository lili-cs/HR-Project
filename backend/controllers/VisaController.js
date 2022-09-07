const express = require('express');
const router = express.Router();
const User = require('../model/users');
const UserInfo = require('../models/UserInfo');
const Visa = require('../models/Visa');

router.get('/visa', async(req, res, next) => {
    // find all user from database
    const visa = await Visa.find();
    res.status(200).send(visa);
})

router.post('/visa', async(req, res, next) => {
    console.log(req.body);
});


module.exports = { VisaController: router }