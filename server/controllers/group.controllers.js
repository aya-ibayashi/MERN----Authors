const { Group } = require('../models/group.models')
const { Author } = require('../models/author.models')
const AuthorController = require('../controllers/author.controllers')

module.exports.getOne = (req, res) => {
    Group.findOne({number:req.params.num})
        .populate('authors')
        .then(group=>res.json(group))
        .catch(err=>res.status(400).json(err))
}

module.exports.getAll = (_,res) => {
    Group.find().populate('authors')
        .then(allGroups=>res.json(allGroups))
        .catch(err=>res.json(err))
}

module.exports.create = (req, res) => {
    Group.create(req.body)
        .then(group=>res.json(group))
        .catch(err=>res.status(400).json(err))
}

//**********ADDING AUTHOR TO GROUP WITHOUT POPULATE*********
// module.exports.addAuthor = (req, res)=>{
//     let author;
//     //find author that is getting added to the group instance
//     Author.findOne({_id:req.body.id})
//         .then(a => {
//             author = a
//             console.log("found author")
//             //find group and add author to array
//             Group.updateOne({number:req.params.num}, {$push:{authors:author}}, {new:true})  
//                 .then(group=> res.json(group))
//             .catch(err=>{
//                 console.log(err)
//                 res.status(400).json(err)
//                 })
//         })
//         .catch(err=>{
//             console.log("did not find author"); 
//             res.json(err)})
// }

//*********ADDING AUTHOR TO GROUP WHILE USING POPULATE******* */
module.exports.addAuthor = (req, res)=>{
    Group.updateOne({number:req.params.num}, {$push:{authors:req.body.id}}, {new:true})  
        .then(group=>res.json(group))
        .catch(err=>{
        console.log(err)
        res.status(400).json(err)
        })
}
// ********method to update author when not using populate******
// module.exports.updateAuthor = (req, res) => {
//     Group.updateOne(
//         {
//             number : req.params.num,
//             'authors._id':req.params.authorId
//         },
//         {
//             $set: {
//                 'authors.$.status':req.body.status}
//         },
//         {
//             new:true,
//             runValidators:true
//         }
//     )
//         .then(group=>
//             AuthorController.updateStatus(req,res)
//             // { Author.updateOne(
//             //     {_id:req.params.authorId},
//             //     {$set:{status:req.body.status}},
//             //     {new:true, runValidators:true}
//             // )
//             //     .then(result=>res.json(result))
//             //     .catch(err=>res.status(400).json(err))
//             // }
//         )
//         .catch(err=>res.status(400).json(err))
// }


//*****method to remove author from group when not using populate****/
// module.exports.removeAuthor = (req,res) => {
//     Group.updateOne(
//         {
//             number : req.params.num,
//             'authors._id':req.params.authorId
//         },
//         {
//             $pull:{authors : {$in: [author]}}
//         },
//         {
//             new:true,
//             runValidators:true
//         }
//     )
//         .then(group=> res.json(group))
//         .catch(err=>res.status(400).json(err))
// }

//****removing author using populate******** */
module.exports.removeAuthor = (req,res)=>{
    Group.updateOne(
        {number:req.params.num},
        {$pull:{authors: req.params.authorId}},
        {new:true, runValidators:true}
    )
        .then(group=>{res.json(group);
                        console.log("author has been removed")})
        .catch(err=>res.status(400).json(err))
}
