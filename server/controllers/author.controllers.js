const { Author } = require('../models/author.models');
const GroupController  = require('../controllers/group.controllers')

module.exports.create = (request, response) => {
    Author.create(request.body)
        .then(newAuth => response.json(newAuth))
        .catch(err=>response.status(400).json(err));
}

module.exports.getAll = (_, res) => {
    Author.find().sort({name:'asc'})
        .then(list=>res.json(list))
        .catch(err=>res.json(err));
}

module.exports.deleteOne = (req,res) => {
    Author.deleteOne({_id:req.params.id})
        .then(confirmation=>res.json(confirmation))
        .catch(err=>res.json({message:err.message}))
}

module.exports.updateOne = (req,res) => {
    Author.updateOne({_id:req.params.id}, req.body, {new:true,runValidators:true} )
        .then(updatedAuth => res.json(updatedAuth))
        .catch(err=>res.status(400).json(err));
}

module.exports.getOne = (req,res) => {
    Author.findOne({_id:req.params.id})
        .then(auth => res.json(auth))
        .catch(err=>res.status(400).json(err))
}

module.exports.updateStatus = (req,res)=>{
    Author.updateOne({_id:req.params.id}, {$set:{status:req.body.status}},
        {new:true, runValidators:true})
        .then(updatedAuth=>res.json(updatedAuth))
        .catch(err=>res.status(400).json(err))
}