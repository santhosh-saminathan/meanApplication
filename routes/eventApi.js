'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const EventCollection = mongoose.model('Event');
const EventDetailsCollection = mongoose.model('EventDetails');
const UserCollection = mongoose.model('User');
var _ = require('lodash');
var async = require('async');

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCA4T-nbBt9fN_rO6Au3EB7XTil_P-cqVI'
});

var distance = require('google-distance-matrix');
distance.key('AIzaSyCA4T-nbBt9fN_rO6Au3EB7XTil_P-cqVI');


// var origins = ['Coimbatore'];
// var destinations = ['Chennai'];

// distance.matrix(origins, destinations, function (err, distances) {
//     if (!err)
//         console.log(distances.rows[0].elements[0].distance.text);
// })

//   googleMapsClient.geocode({
//     address: 'Coimbatore, india'
//   }, function(err, response) {
//     if (!err) {
//     let lat =  response.json.results['0'].geometry.location.lat.toString();
//     let lng = response.json.results['0'].geometry.location.lng.toString();
//       console.log(response.json.results,lat,lng);
//     }
//   });

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
    let userCategory = [];
    let userDistance;
    let userLocation;
    let newCategoryArray = [];
    let userFilterArray = [];

    let userDistanceFilter = (events) => {

        let count = 0;
        async.forEach(events, function (data) {
            distance.matrix([userLocation], [data.location], function (err, distances) {
                if (!err) {
                    count++;
                    let eventDis = distances.rows[0].elements[0].distance.text.replace(",", "")
                    if (userDistance > (parseInt(eventDis.split(" ")[0]))*0.621371) {
                        userFilterArray.push(data);
                    }
                    if (count === events.length) {
                        res.status(200).json(userFilterArray);
                    }
                } else {
                    console.log("google distance error", err);
                }
            })
        });
    }

    let userCategoryFilter = (events) => {
        UserCollection.findOne({ 'userId': req.body.userId }).exec(function (err, user) {
            if (user.userType === 'admin') {
                res.status(200).json(events);
            } else {
                userCategory = user.category;
                userDistance = user.distance;
                userLocation = user.zipCode;
                let count = 0;
                events.forEach(function (event) {
                    count++;
                    if (_.intersectionWith(userCategory, event.categoryId, _.isEqual).length > 0) {
                        newCategoryArray.push(event);
                    }
                    if (events.length === count) {
                        userDistanceFilter(newCategoryArray)
                    }
                });
            }
        });
    }

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
                        userCategoryFilter(allEvents);
                    }
                });
            });
        }
    });
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
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Failed to approve event' });
        }
        else {
            res.json(200, updatedDetails);
        }
    });

}

const removeEvent = (req, res) => {
    EventDetailsCollection.remove({ 'eventId': req.body.eventId }, function (err, removedEvent) {
        EventCollection.findOneAndRemove({ 'eventId': req.body.eventId }, function (err, removedEvent) {
            if (err) {
                res.json(400, { 'status': 'error', 'data': 'Failed to update event' });
            }
            else {
                res.json(200, removedEvent);
            }
        });
    });


}

const getEventDetails = (req, res) => {
    let getCreatorDetails = (event) => {
        UserCollection.findOne({ 'userId': event.userId }, function (err, userDetails) {
            if (userDetails) {
                event.creatorDetails = userDetails;
                googleMapsClient.geocode({
                    address: event.location
                }, function (err, response) {
                    if (!err) {
                        let lat = response.json.results['0'].geometry.location.lat.toString();
                        let lng = response.json.results['0'].geometry.location.lng.toString();
                        event.latitude = lat;
                        event.longitude = lng;
                        res.json(200, event);
                    } else {
                        res.json(200, event);
                    }
                });
            }
            else {
                res.json(404);
            }
        })
    }
    EventCollection.findOne({ 'eventId': req.body.eventId }).lean().exec(function (err, event) {
        if (err || event === null) {

        } else {
            EventDetailsCollection.findOne({ 'eventId': event.eventId }, function (err, eventDetails) {
                if (eventDetails) {
                    event.likes = eventDetails.likes;
                    event.rsvp = eventDetails.rsvp;
                    getCreatorDetails(event)
                } else {
                    getCreatorDetails(event)
                }
            })
        }
    })
}



module.exports = {
    createEvent: createEvent,
    allEvents: allApprovedEvents,
    updateEvent: updateEvent,
    removeEvent: removeEvent,
    newEvents: newEvents,
    approveEvent: approveEvent,
    getEventDetails: getEventDetails
}