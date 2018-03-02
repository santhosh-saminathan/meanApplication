'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserCollection  = mongoose.model('User');


const createUser = (req,res) =>{
    let userId;
   
    UserCollection.find().sort({ field: 'asc', _id: -1 }).limit(1).exec(function(err, user) { 
        if(user.length === 0){
            userId = "U001"
        }else{
            userId = "U00"+(parseInt(user[0].userId.substring(3))+1)
        }

        let userObj = {
            'userId': userId,
            'userName':req.body.userName,
            'userEmail':req.body.email,
            'password':req.body.password,
            'createdDate':new Date(Date.now()),
            'updated': new Date(Date.now()),
            'phone':req.body.phoneNumber,
            'zipCode':req.body.zipCode
        }

        let UserNewCollection = new UserCollection(userObj);

        UserNewCollection.save((error, userCreated) => {
            if (error) {
                console.log("Crating erroe",error);
                res.json(400, { 'status': 'error', 'data': 'Failed to create user' });
            }
            else {
                res.json(201, userCreated);
            }
        })
    
    }); 

} 

const loginUser = (req,res) =>{
    
    UserCollection.findOne({'userEmail': req.body.userEmail,'password':req.body.password}, function(err,user) { 
       if(err || user == null){
            res.status(400).json( {'status': 'error', 'data': 'Invalid User/Password' });
        }else{
                res.status(200).json(user.userId);
        }
     });

} 

module.exports = {
    createUser: createUser,
    loginUser:loginUser
}