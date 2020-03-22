const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema({
    name : {   
        type: String,
        required:[true,"Name is required"],
        minlength: [2, "Author name must be at least 2 characters"]
    },
    genre : {
        type: String
    },
    status : {
        type:String,
        enum : ['writing', 'not writing', 'on break'],
        default: 'writing'
    }
}, { timestamps: true});

module.exports = AuthorSchema;
module.exports.Author = mongoose.model("Author", AuthorSchema)
