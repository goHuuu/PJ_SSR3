const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model("Users", UsersSchema);