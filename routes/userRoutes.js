const express = require("express");
const { registerUser, loginUser, userInfo } = require("../controllers/userController");

const router =  express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/info",userInfo);

module.exports = router;