const mongoose = require('mongoose');
const AuthorSchema = require('../models/author.models')
const Author = require('../models/author.models')

const GroupSchema = new mongoose.Schema({
    number : {
        type: Number,
        enum: [1,2,3],
        default: 1 },
    authors:[{type: mongoose.Schema.Types.ObjectId, ref: "Author"}],
    //*******ref:"Author" is referring to the model Author***** */
})
module.exports.Group = mongoose.model("Group", GroupSchema)