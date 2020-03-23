const { User } = require('../models/user.models')
const bcrypt = require('bcrypt')
//****npm install jsonwebtoken */
const jwt = require('jsonwebtoken')

module.exports = {

    register(req, res) {
        User.create(req.body)
            .then((user) => {
                
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, process.env.SECRET_KEY);
        
                res.cookie('token', token, {
                    //***httpOnly stops client side from having access to this code***/
                    httpOnly: true
                })
                res.json({status:"Success", token});
            })
            .catch(err=>res.status(400).json(err));
    },

    // ****login using try catch*****
//    async login(req, res){
//         const { email, password } = req.body;
//         const errorMessage = 'Please check your email and password.'
//         try {
//             const user = await User.findOne({ email })
//             if (user === null ){
//                 throw new Error(errorMessage)
//             }  

//             const result = await bcrypt.compare(password, user.password);
//             if (result === false ){
//                 throw new Error(errorMessage)
//             }
 
//             const token = jwt.sign({
//                 id: user._id,
//                 email: user.email
//             }, process.env.SECRET_KEY);

//             res.cookie('token', token, {
//                 //***httpOnly stops client side from having access to this code***/
//                 httpOnly: true
//             })
//             res.json({status:"Success", token});


//         } catch (e) {
//             res.status(400).json({ message: errorMessage });
//         }
//         //find user by email
//         //confirm the password is a match
//         //somehow store some info about the user

//     },

    async login(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (user === null ){
            return res.sendStatus(400);
        }  

        const result = await bcrypt.compare(password, user.password);
        if (result === false ){
            return res.sendStatus(400);
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.SECRET_KEY);

        res.cookie('token', token, {
            //***httpOnly stops client side from having access to this code***/
            httpOnly: true
        })
        res.json({status:"Success", token});

        //find user by email
        //confirm the password is a match
        //somehow store some info about the user
    },

    logout (_,res){
        res.clearCookie('token');
        res.json({status:"Success"});
    }
} 