const express = require("express");
const router = express.Router();
const UserInfo = require("../models/UserInfo");

router.post("/onboarding-application/add", async (req, res, next) => {
  const userInfo = new UserInfo(req.body);
  try {
    await userInfo.save();
    res.send("successful");
  } catch (err) {
    console.log("create new userInfo failed");
    res.send("fail");
  }
});

router.get("/personalInfo", async function (req, res, next) {
  let data = await UserInfo.find({});
  res.send(data[0]);
});

router.get("/personalInfoAll", async function (req, res, next) {
  let data = await UserInfo.find({});
  res.send(data);
});

module.exports = { userInfoController: router };
