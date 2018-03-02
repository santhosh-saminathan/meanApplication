const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    'eventId': String,
    'eventName':String,
    'userId':String,
    'createdDate':Date,
    'updated': Date,
    'categoryId':Array,
    'description':String,
    'image':String,
    'location':String,
    'approved':String
}, { collection: 'Event' });

module.exports = mongoose.model('Event',event);