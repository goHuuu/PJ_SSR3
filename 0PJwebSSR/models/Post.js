const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recette: {
        type: String
    },
    ingredients: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Posts", PostSchema);

