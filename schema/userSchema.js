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
    'zipCode':String
}, { collection: 'User' });

module.exports = mongoose.model('User',user);