const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const fileModel = mongoose.model('Image', fileSchema)
module.exports = { fileModel }