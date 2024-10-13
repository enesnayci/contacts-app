const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.get("/api/contacts",(req,res) => {
    //res.send("Contacts api basariyla cagrildi");
    res.status(200).json({message:"Api basariyla cagrildi"});
});

app.listen(port,() => {
    console.log("Server is running on port",port);
});