const mongoose = require('mongoose');

const uploadImgSchema= new mongoose.Schema({
    description: { type: String, required: true },
    img: { type: String, required: true}
 
},{
    timestamps: true,
})

const UploadImg = mongoose.model('UploadImg', uploadImgSchema);


module.exports = {UploadImg};