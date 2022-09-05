require('dotenv').config()
var express = require('express');
var router = express.Router();
const UserModel = require("../model/users")     // db model(schema)
const bcrypt = require('bcryptjs');             // password hash
const EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// login
router.post('/Login', async (req,res)=>{
  // check email and hashedPassword in db
  console.log("in Login")
  // await UserModel.findOne({email:req.body.email})
  // .then(async (dbRecord) => {
  //     if (dbRecord == null){res.write("Invalid username or password")}
  //     else{
  //         // check pswd
  //         let check =await bcrypt.compare(req.body.password, dbRecord.hashedPassword)
  //         if(!check){res.write("Invalid username or password")}
  //         else{
  //             res.write("Successfully logged in")
  //         }
  //     }
  // })
  // .catch(err=>console.log("err: ",err))

  res.send(200)
})

// register
router.post('/Signup', async (req,res)=>{
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

module.exports = router;
