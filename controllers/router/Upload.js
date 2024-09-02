const {Upload}= require('../../models/Upload')
const router = require ('express').Router();

function extractVideoIDFromUrl(filePath){
    return filePath.split('v=')[1];
}
router.post('/', async (req, res) => {
    try{
        const {description,filePath} = req.body; 
        const  videoId =  extractVideoIDFromUrl(filePath);
        const upload =  await new Upload({description,filePath,videoId});
        await upload.save()
        res.status(201).json({data:upload,message:"Video uploaded successfully"})
    }catch(error){
        console.log(error.message)
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try{
        const uploads = await Upload.find({})
        res.status(200).json({videos:uploads})
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const upload = await Upload.findById(req.params.id)
        if(!upload) return res.status(404).send()
        res.send(upload)
    }catch(error){
        res.status(500).send(error)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const upload = await Upload.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!upload) return res.status(404).send()
        res.send(upload)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const upload = await Upload.findByIdAndDelete(req.params.id)
        if(!upload) return res.status(404).send()
        res.send('deleted successfully')
    }catch(error){
        res.status(500).send(error)
    }
})





module.exports = router;