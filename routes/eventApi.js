'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const EventCollection = mongoose.model('Event');
const EventDetailsCollection = mongoose.model('EventDetails');


const createEvent = (req, res) => {
    let eventId;
    EventCollection.find().sort({ field: 'asc', _id: -1 }).limit(1).exec(function (err, event) {
        if (event.length === 0) {
            eventId = "E001"
        } else {
            eventId = "E00" + (parseInt(event[0].eventId.substring(3)) + 1);
        }

        let eventObj = {
            'userId': req.body.userId,
            'eventId': eventId,
            'eventDate': new Date(req.body.eventDate),
            'createdDate': new Date(Date.now()),
            'updated': new Date(Date.now()),
            'eventName': req.body.eventName,
            'categoryId': req.body.categoryId,
            'description': req.body.description,
            'image': req.body.image,
            'location': req.body.location,
            'approved': false
        }

        let EventNewCollection = new EventCollection(eventObj);

        EventNewCollection.save((error, eventCreated) => {
            if (error) {
                res.json(400, { 'status': 'error', 'data': error });
            }
            else {
                res.json(201, eventCreated);
            }
        })

    });
}

const allApprovedEvents = (req, res) => {
    let allEvents = [];
    EventCollection.find().lean().exec(function (error, events) {
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to retrive events' });
        }
        else {
            let count = 0;
            events.forEach(function (data) {
                EventDetailsCollection.findOne({ 'eventId': data.eventId }, function (err, eventDetails) {
                    count++;
                    if (eventDetails) {
                        data.likes = eventDetails.likes;
                        data.rsvp = eventDetails.rsvp;
                    }
                    if (data.approved) {
                        allEvents.push(data);
                    }

                    if (events.length === count) {
                        res.status(200).json(allEvents);
                    }
                });
            })
        }
    })
}

const newEvents = (req, res) => {
    let allEvents = [];
    EventCollection.find().lean().exec(function (error, events) {
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to retrive events' });
        }
        else {
            let count = 0;
            events.forEach(function (data) {
                EventDetailsCollection.findOne({ 'eventId': data.eventId }, function (err, eventDetails) {
                    count++;
                    if (eventDetails) {
                        data.likes = eventDetails.likes;
                        data.rsvp = eventDetails.rsvp;
                    }
                    if (!data.approved) {
                        allEvents.push(data);
                    }

                    if (events.length === count) {
                        res.status(200).json(allEvents);
                    }
                });
            })
        }
    })
}

const updateEvent = (req, res) => {
    let updatedEvent = {
        'eventName': req.body.eventName,
        'eventDate': new Date(req.body.eventDate),
        'updated': new Date(Date.now()),
        'categoryId': req.body.categoryId,
        'description': req.body.description,
        'location': req.body.location
    }

    EventCollection.findOneAndUpdate({ 'eventId': req.body.eventId }, { $set: updatedEvent }, { new: true }, function (err, updatedDetails) {
        console.log(err, updatedDetails);
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Failed to update event' });
        }
        else {
            res.json(200, updatedDetails);
        }
    });

}

const approveEvent = (req, res) => {
    EventCollection.findOneAndUpdate({ 'eventId': req.body.eventId }, { $set: { 'approved': true } }, { new: true }, function (err, updatedDetails) {
        console.log(err, updatedDetails);
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Failed to approve event' });
        }
        else {
            res.json(200, updatedDetails);
        }
    });

}

const removeEvent = (req, res) => {
    console.log(req.body);
    EventCollection.findOneAndRemove({ 'eventId': req.body.eventId }, function (err, removedEvent) {
        console.log(err, removedEvent);
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Failed to update event' });
        }
        else {
            EventDetailsCollection.findOneAndRemove({ 'eventId': req.body.eventId });

            res.json(200, removedEvent);
        }
    });

}


module.exports = {
    createEvent: createEvent,
    allEvents: allApprovedEvents,
    updateEvent: updateEvent,
    removeEvent: removeEvent,
    newEvents: newEvents,
    approveEvent: approveEvent
}