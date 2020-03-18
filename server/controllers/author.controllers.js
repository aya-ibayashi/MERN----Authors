const { Author } = require('../models/author.models');

module.exports.create = (request, response) => {
    Author.create(request.body)
        .then(newAuth => response.json(newAuth))
        .catch(err=>response.json(err));
}

module.exports.getAll = (_, res) => {
    Author.find()
        .then(list=>res.json(list))
        .catch(err=>res.json(err));
}

module.exports.deleteOne = (req,res) => {
    Author.deleteOne({_id:req.params.id})
        .then(confirmation=>res.json(confirmation))
        .catch(err=>res.json({message:err.message}))
}

module.exports.updateOne = (req,res) => {
    Author.updateOne({_id:req.params.id}, req.body)
        .then(updatedAuth => res.json(updatedAuth))
        .catch(err=>res.json({message:err.message}))
}

module.exports.getOne = (req,res) => {
    Author.findOne({_id:req.params.id})
        .then(auth => res.json(auth))
        .catch(err=>res.json({message:err.message}))
}
