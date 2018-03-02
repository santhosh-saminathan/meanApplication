const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventDetails = new Schema({
    'eventId':String,
    'userId':String,
    'likes':Array,
    'rsvp':Array
}, { collection: 'EventDetails' });

module.exports = mongoose.model('EventDetails',eventDetails);