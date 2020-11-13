const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        unique: true,
        type: String

    },
    password: String
})

//user collection is where the user schema will be located whenever we do save the new instance of a user
const User = mongoose.model('User', userSchema);
module.exports = User;