const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    'eventId': String,
    'eventName': String,
    'eventDate': Date,
    'userId': String,
    'createdDate': Date,
    'updated': Date,
    'categoryId': [],
    'description': String,
    'image': String,
    'location': String,
    'approved': Boolean
}, { collection: 'Event' });

module.exports = mongoose.model('Event', event);