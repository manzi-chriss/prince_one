const { User } = require('../../models/User');
const { verifyToken } = require('../middlewares/Token_verification');
const {extractUserIdFromToken}=require('../Utils/extracters')
const router = require('express').Router();




router.get('/',verifyToken, async (req, res) => {
    try {
        const user_ID =extractUserIdFromToken(req);
        const users = await User.findById(user_ID);
        res.status(200).json({users,message:"profile"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router