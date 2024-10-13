const express = require("express");
const router = express.Router();

router.route("/").get((req,res) => {
    res.status(200).json({message:"Get contacts"});
});

router.route("/").post((req,res) => {
    res.status(200).json({message:"Contact created"});
});

router.route("/:id").get((req,res) => {
    res.status(200).json({message:`Get contact for ${req.params.id}`});
});

router.route("/:id").put((req,res) => {
    res.status(200).json({message:`Contact updated for ${req.params.id}`});
});

router.route("/:id").delete((req,res) => {
    res.status(200).json({message:`Contact deleted for ${req.params.id}`});
});

module.exports = router;