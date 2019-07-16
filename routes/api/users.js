const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

//api route: 
// routes/api/users/register
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({ msg: "Email already taken by someone." })
    }


    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    user = await newUser.save();
    return res.status("23")
});


module.exports = router;