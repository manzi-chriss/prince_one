const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config()

router.post('/', async (req, res) => {
    try{
        const user= await User.findOne({email:req.body.email});
        if(!user) return res.status(201).json({message:"Invalid credentials",user});
        const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordValid) return res.status(201).json({message:"Invalid credentials",user}); 
        const token = jwt.sign({ _id: user._id, username:user.username, email:user.email, password:"NULL" }, process.env.SECRET);
        return res.status(201).json({message:"success Login",user,token});

    }
    catch(error){
        res.status(500).json({error: error.message});
        res.send('user not found');
    }
})

module.exports = router