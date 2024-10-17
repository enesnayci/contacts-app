const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    
    const {username,mail,password} = req.body;

    if(!username || !mail || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    };

    
    if (await userModel.findOne({mail})){
        res.status(400);
        throw new Error("User already exists!");
    }
    
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed password is=",hashedPassword);

    const userCheck = await userModel.create({
        username,
        mail,
        password: hashedPassword
    });

    //console.log(`User created ${createdUser}`);
    if(userCheck){
        res.status(201).json({_id: userCheck. id, email: userCheck.email});
    }
    else{
        res.status(400).json({Status:"Registeration failed!"});
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const{mail,password} = req.body;

    if(!mail || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const verifyUser = await userModel.findOne({mail});

    if(verifyUser && (await bcrypt.compare(password,verifyUser.password))){
        const accessToken = jwt.sign(
            {
                User : {
                    username:verifyUser.username,
                    mail: verifyUser.mail,
                    password: verifyUser.password
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Login failed!");
    }
});

//@desc User info
//@route GET /api/users/info
//@access private
const userInfo = asyncHandler(async (req,res) => {
    const allUsers = await userModel.find().select("username").select("mail")
    res.status(200).json(allUsers);
});

module.exports = {registerUser,loginUser,userInfo};