const { UploadImg } = require('../../models/UploadImg');
const router = require('express').Router();

router.post('/', async (req, res) => {
    const upload = new UploadImg(req.body);
    try {
        await upload.save();
        res.send({ message: 'Image uploaded successfully', image: upload.url });
    } catch (error) {
        res.status(500).send({ message: 'Error uploading image', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const image = await UploadImg.findById(req.params.id);
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }
        res.send({ image: image.url });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching image', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const image = await UploadImg.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }
        res.send({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting image', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const image = await UploadImg.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }
        res.send({ message: 'Image updated successfully', image: image.url });
    } catch (error) {
        res.status(500).send({ message: 'Error updating image', error });
    }
});

router.delete('/', async (req, res) => {
    try {
        await UploadImg.deleteMany({
            created_at: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } // delete images older than 30 days
        });
        res.send({ message: 'Old images deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting images', error });
    }
});

module.exports = router;
