const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    'userId': String,
    'userName':String,
    'userEmail':String,
    'userType':String,
    'password':String,
    'createdDate':Date,
    'updated': Date,
    'phone':Number,
    'image':String,
    'category': [],
    'distance':Number,
    'description':String,
    'zipCode':String
}, { collection: 'User' });

module.exports = mongoose.model('User',user);