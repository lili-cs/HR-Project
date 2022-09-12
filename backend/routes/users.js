require('dotenv').config()
var express = require('express');
var router = express.Router();
const UserModel = require("../models/Users");     // db model(schema)
const OnboardingApplicationModel = require('../models/OnboardingApplication');
const EmailInvitationModel = require('../models/EmailInvitation');
const bcrypt = require('bcryptjs');             // password hash
const jwt = require("jsonwebtoken");
const EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const {adminPage,nonAdminPage} = {  // define redirect for admin and non-admin users
  adminPage:"/visaHR",
  nonAdminPage:"/PersonalInfo"
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



async function getApplicationStatus(userName){ //added by Li Li
  const userId = await UserModel.findOne({username: userName});
  const application =  await OnboardingApplicationModel.findOne({userId: userId});
  if (!application){
    return 'NeverSubmitted';
  }
  return application.status;
}

// login
router.post('/login', async (req,res)=>{
  console.log("req.headers: ", req.headers)
  const {password,username} = req.body
  console.log("in Login")
  console.log("password: ", password)
  console.log("username: ", username)
  try{
    // find username in db
    let dbResp = await UserModel.findOne({username:username})
    console.log("dbResp: ", dbResp)
    // if not found, throw error
    if (dbResp == null) res.send({errorMsg:'Username not found, please enter a correct one.'})
    // username found
    else{
      // username in db
      let hashedPswd = dbResp.password
      console.log("hashedPswd: ", hashedPswd)
      // check password match
      let equal = await bcrypt.compare(password,hashedPswd)
      console.log("equal: ", equal)
      // if not match
      if (!equal) {
        res.send({errorMsg:'Password not match.'})
        return
      }
      // if passwords match, sign a JWT token and return to 
      const signed_jwt = jwt.sign({
        username:username,
        email:dbResp.email,
        admin:dbResp.admin,
      }, process.env.JWT_SECRET_KEY);
      console.log("signed_jwt: ", signed_jwt)

      const applicationStatus = await getApplicationStatus(username); //added by Li Li
      // redirect to proper page (admin or not)
      
      const redirectURL = dbResp.admin? adminPage:nonAdminPage
      console.log("redirectURL: ", redirectURL)
      // send jwt token to front end
      res.send(
        {
          token:signed_jwt,
          success:true,
          // redirect:redirectURL,
          isHR: dbResp.admin,
          applicationStatus: applicationStatus
        })
    }
  }catch(e){  // username not in db
    console.log("e: ", e)
    // error response
    res.send({errorMsg:e})
  }
})

// register
router.post('/signup/', async (req,res)=>{
  const {email,password,username} = req.body
  console.log(email)
  console.log(password)
  console.log(username)
  try{
    // double check if email is valid
    if (!EMAIL_VALIDATION.test(email)){
      console.log('Email Invalid')
      res.send({errorMsg:'Email Invalid'})
      return
      // throw new Error("Email Invalid")
    } 
    else{ // valid email
      // find email in db
      let dbResp = await UserModel.findOne({email:email})
      console.log(dbResp)
      if (dbResp == null){  // no email in db
        // bcrypt hashedPswd
        let hashedPswd = await bcrypt.hash(String(password),Number(process.env.SALT_ROUNDS))
        console.log("hashedPswd: ", hashedPswd)
        // create new record
        let newUserRecord = new UserModel({
          username: username,
          password:hashedPswd,
          email:email,
          admin:false,
        })
        console.log("new record: ",newUserRecord)
        // save record in db
        await newUserRecord.save()
        // success response
        console.log('Register Successfully')
        res.send({success:"Register Successfully"})
      }else{  // email in db
        console.log('Email exist, please login.')
        res.send({errorMsg:'Email exist, please login.'})
        // throw new Error('Email exist, please login.')
      }
    }
  }
  catch(e){  // email already in db
    console.log("e: ", e)
    // error response
    res.send({errorMsg:e})
  }
})

router.post('/check_admin', async(req, res, next) => {
  var ObjectId = require('mongodb').ObjectId;
  const jwtToken = req.body.jwtToken;
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findOne({email: decode.email});
  console.log(user)
  res.status(200).send(user);
})

module.exports = router;
