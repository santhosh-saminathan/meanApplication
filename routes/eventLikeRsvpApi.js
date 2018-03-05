
'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const EventDetailsCollection = mongoose.model('EventDetails');



const likeEvent = (req, res) => {

    EventDetailsCollection.findOne({ 'eventId': req.body.eventId }, function (err, event) {
        if (event === null) {
            let eventDetailsObj = {
                'eventId': req.body.eventId,
                'userId': req.body.userId,
                'likes': req.body.likedUserId,
                'rsvp': []
            }
            let EventDetailsNewCollection = new EventDetailsCollection(eventDetailsObj);
            EventDetailsNewCollection.save((error, likeAdded) => {
                if (error) {
                    res.json(400, { 'status': 'error', 'data': 'Failed to like event' });
                }
                else {
                    res.json(201, likeAdded);
                }
            })
        } else {
            EventDetailsCollection.findOneAndUpdate({
                'eventId': req.body.eventId
            }, { $addToSet: { 'likes': req.body.likedUserId } }, { new: true })
                .exec((error, updatedDetails) => {
                    console.log("update event", error, updatedDetails);
                    if (error) {
                        res.json(400, { 'status': 'error', 'data': 'Failed to update likes' });
                    }
                    else {
                        res.json(200, updatedDetails);
                    }
                })
        }
    });
}

const unlikeEvent = (req, res) => {
    EventDetailsCollection.findOneAndUpdate({
        'eventId': req.body.eventId
    }, { $pull: { 'likes': req.body.unlikedUserId } }, { new: true })
        .exec((error, updatedDetails) => {
            if (error) {
                res.json(400, { 'status': 'error', 'data': 'Failed to unlike event' });
            }
            else {
                res.json(200, updatedDetails);
            }
        })
}


const rsvpEvent = (req, res) => {

    EventDetailsCollection.findOne({ 'eventId': req.body.eventId }, function (err, event) {
        if (event == null) {
            let eventDetailsObj = {
                'eventId': req.body.eventId,
                'userId': req.body.userId,
                'likes': [],
                'rsvp': req.body.rsvpUserId
            }
            let EventDetailsNewCollection = new EventDetailsCollection(eventDetailsObj);
            EventDetailsNewCollection.save((error, rsvpAdded) => {
                if (error) {
                    res.json(400, { 'status': 'error', 'data': 'Failed to rsvp event' });
                }
                else {
                    res.json(201, rsvpAdded);
                }
            })
        } else {
            EventDetailsCollection.findOneAndUpdate({
                'eventId': req.body.eventId
            }, { $addToSet: { 'rsvp': req.body.rsvpUserId } }, { new: true })
                .exec((error, updatedDetails) => {
                    if (error) {
                        res.json(400, { 'status': 'error', 'data': 'Failed to update likes' });
                    }
                    else {
                        res.json(200, updatedDetails);
                    }
                })
        }
    });
}

const uncheckRsvp = (req, res) => {
    console.log("uncheck rsvp0");
    EventDetailsCollection.findOneAndUpdate({
        'eventId': req.body.eventId
    }, { $pull: { 'rsvp': req.body.uncheckedRsvpUserId } }, { new: true })
        .exec((error, updatedDetails) => {
            console.log("uncehck",error,updatedDetails);
            if (error) {
                res.json(400, { 'status': 'error', 'data': 'Failed to unlike event' });
            }
            else {
                res.json(200, updatedDetails);
            }
        })
}

module.exports = {
    likeEvent: likeEvent,
    rsvpEvent: rsvpEvent,
    unlikeEvent: unlikeEvent,
    uncheckRsvp: uncheckRsvp
}