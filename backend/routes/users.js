var express = require('express');
var router = express.Router();
const UserModel = require("../model/users")     // db model(schema)
const bcrypt = require('bcryptjs');             // password hash


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// login
router.post('/Login', async (req,res)=>{
  // check email and hashedPassword in db
  await UserModel.findOne({email:req.body.email})
  .then(async (dbRecord) => {
      if (dbRecord == null){res.write("Invalid username or password")}
      else{
          // check pswd
          let check =await bcrypt.compare(req.body.password, dbRecord.hashedPassword)
          if(!check){res.write("Invalid username or password")}
          else{
              res.write("Successfully logged in")
          }
      }
  })
  .catch(err=>console.log("err: ",err))

  res.end()
})

// register
router.post('/Signup', async (req,res)=>{
  // // check email and hashedPassword in db
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

  // res.end()
  res.send(200)
})

module.exports = router;
