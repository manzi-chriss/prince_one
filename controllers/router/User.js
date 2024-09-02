const { User } = require('../../models/User');
const { verifyToken } = require('../middlewares/Token_verification');
const router = require('express').Router();
const bcrypt= require('bcryptjs')



router.post('/', async (req, res) => {
    try {
        const hashedPassword= await bcrypt.hash(req.body.password, 8)
        const user = await User.create({email: req.body.email, password: hashedPassword,username: req.body.username});
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})


router.get('/',verifyToken, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})


router.get('/:id',verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.put('/:id',verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.delete('/:id',verifyToken, async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router