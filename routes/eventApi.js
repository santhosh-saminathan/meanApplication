'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const EventCollection  = mongoose.model('Event');

const createEvent = (req,res) =>{
    let eventId;

    EventCollection.find().sort({ field: 'asc', _id: -1 }).limit(1).exec(function(err, event) {
        if(event.length === 0){
            eventId = "E001"
        }else{
            eventId = "E00"+(parseInt(event[0].eventId.substring(3))+1);
        }

        let eventObj = {
            'userId': req.body.userId,
            'eventId': eventId,
            'createdDate':new Date(Date.now()),
            'updated': new Date(Date.now()),
            'eventName':req.body.eventName,
            'categoryId':req.body.categoryId,
            'description':req.body.description,
            'image':'http://www.gstatic.com/webp/gallery/2.jpg',
            'location':req.body.location,
            'approved':'true'
        }

        let EventNewCollection = new EventCollection(eventObj);

        EventNewCollection.save((error, eventCreated) => {
            if (error) {
                res.json(400, { 'status': 'error', 'data': 'Failed to create event' });
            }
            else {
                res.json(201, eventCreated);
            }
        })
    
    }); 

} 

const allEvents = (req,res)=>{
    //let allEvents = [];
    EventCollection.find((error, events) => {
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to retrive events' });
        }
        else {
            res.status(200).json(events);
            // let count=0;
            // events.forEach(function(data){
            //     //console.log(data);
            //     count++;
            //     if(data.userId === req.body.userId){
            //         data.editable = true;
            //         allEvents.push(data);
            //         console.log(data);
            //     }else{
            //         data.editable = false;
            //         allEvents.push(data);
            //         console.log(data);
            //     }
            //     if(events.length === count){
            //         console.log(allEvents);
            //         res.status(200).json(allEvents);
            //     }
            // })
            
        }
    })
}


module.exports = {
    createEvent: createEvent,
    allEvents : allEvents
}