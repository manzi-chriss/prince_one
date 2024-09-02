const router = require('express').Router();
const { Message, validateMessage } = require('../../models/Message');
require('dotenv').config();


router.post('/us', async (req, res) => {
    try {
        const { error } = await validateMessage(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const message = new Message(req.body);
        // Save the message
        await message.save();
        return res.status(201).json({ message: "Message Sent!" });
    } catch (error) {
        console.error('Error posting message:', error); // Log the error
        return res.status(500).json({ message: error.message });
    }
});

router.get('/us', async (req, res) => {
    try {
        const messages = await Message.find();
        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'Currently no messages' });
        }
        return res.status(200).json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err); // Log the error
        return res.status(500).json({ message: err.message });
    }
});

router.delete('/us/:id', async (req, res) => {
    console.log('Deleting message with ID:', req.params.id); // Check this log output
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'ID parameter is missing' });
        }
        
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


module.exports = router;
