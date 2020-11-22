const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilesSchema = new Schema({
    filePath: String,
},{
    timestamps: true,
}
)


const Files = mongoose.model('Files', FilesSchema);

module.exports = Files;