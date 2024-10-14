const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res) => {
    const contact = await Contact.find();
    res.status(200).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req,res) => {
    const {name,mail,phone} = req.body;
    if(!name || !mail || !phone){
        res.status(400);
        throw new Error("All fields are required!");
    };

    const postData = await Contact.create({
        name,
        mail,
        phone
    });
    //console.log(req.body);
    res.status(201).json(postData);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res) => {
    res.status(200).json({message:`Contact updated for ${req.params.id}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res) => {
    const deletedData = await Contact.findByIdAndDelete(req.params.id);
    const id = req.params.id;
    res.status(200).json({message:`Contact deleted for`,id});
});

module.exports = {getContacts,getContact,createContact,updateContact,deleteContact};