'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserCollection = mongoose.model('User');
const EventCollection = mongoose.model('Event');
const EventDetailsCollection = mongoose.model('EventDetails');

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');


// var encryptedString = cryptr.encrypt('bacon'),
//     decryptedString = cryptr.decrypt(encryptedString);

// console.log(encryptedString);  
// console.log(decryptedString);  


const createUser = (req, res) => {
    let userId;
    UserCollection.findOne({ 'userEmail': req.body.email }, function (err, user) {
        if (err || user == null) {

            UserCollection.find().sort({ field: 'asc', _id: -1 }).limit(1).exec(function (err, user) {
                if (user.length === 0) {
                    userId = "U001"
                } else {
                    userId = "U00" + (parseInt(user[0].userId.substring(3)) + 1)
                }
                let userObj = {
                    'userId': userId,
                    'userName': req.body.userName,
                    'userEmail': req.body.email,
                    'password': cryptr.encrypt(req.body.password),
                    'createdDate': new Date(Date.now()),
                    'updated': new Date(Date.now()),
                    'phone': req.body.phoneNumber,
                    'zipCode': req.body.zipCode,
                    'userType': req.body.userType
                }
                let UserNewCollection = new UserCollection(userObj);
                UserNewCollection.save((error, userCreated) => {
                    if (error) {
                        console.log("Crating erroe", error);
                        res.json(400, { 'status': 'error', 'data': 'Failed to create user' });
                    }
                    else {
                        res.json(201, userCreated);
                    }
                })
            });
        } else {
            res.status(400).json({ 'status': 'error', 'data': "User Already Found" });
        }
    });
}

// function to create admin for test purpose
const createAdmin = (req, res) => {

    UserCollection.findOne({ 'userEmail': req.body.userEmail }, function (err, user) {
        if (err || user == null) {

            let userObj = {
                'userId': "A001",
                'userName': "admin",
                'userEmail': req.body.userEmail,
                'password': cryptr.encrypt(req.body.password),
                'createdDate': new Date(Date.now()),
                'updated': new Date(Date.now()),
                'phone': "1111111111",
                'zipCode': "12345",
                'userType': "admin"
            }
            let UserNewCollection = new UserCollection(userObj);
            UserNewCollection.save((error, userCreated) => {
                if (error) {
                    console.log("Crating erroe", error);
                    res.json(400, { 'status': 'error', 'data': 'Failed to create user' });
                }
                else {
                    res.json(201, userCreated);
                }
            })

        } else {
            res.status(400).json({ 'status': 'error', 'data': "Admin Already Exists" });
        }
    });
}

const loginUser = (req, res) => {

    UserCollection.findOne({ 'userEmail': req.body.userEmail, 'password': cryptr.encrypt(req.body.password) }, function (err, user) {
        if (err || user == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid User/Password' });
        } else {
            res.status(200).json(user.userId);
        }
    });

}

const userType = (req, res) => {
    UserCollection.findOne({ 'userId': req.body.userId }, function (err, user) {
        if (err || user == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid UserId' });
        } else {
            res.status(200).json(user.userType);
        }
    });
}

const allUsers = (req, res) => {
    UserCollection.find(function (err, user) {
        if (err || user == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Cant get data' });
        } else {
            res.status(200).json(user);
        }
    });
}

const deleteUser = (req, res) => {
    console.log(req.body.userId);
    EventDetailsCollection.remove({ 'userId': req.body.userId }, function (err, success) {
        EventCollection.remove({ 'userId': req.body.userId }, function (err, success) {
            UserCollection.findOneAndRemove({ 'userId': req.body.userId }, function (err, removedUser) {
                console.log(err, removedUser);
                if (err) {
                    res.json(400, { 'status': 'error', 'data': 'Failed to delete user' });
                }
                else {
                    console.log("final");
                    res.json(200, removedUser);
                }
            });
        });
    });



}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    userType: userType,
    allUsers: allUsers,
    deleteUser: deleteUser,
    createAdmin: createAdmin
}