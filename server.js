'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 3000));

var userSchema = require(path.resolve('./schema/userSchema.js'));
var eventSchema = require(path.resolve('./schema/eventSchema.js'));
var eventDetails = require(path.resolve('./schema/eventDetailsSchema.js'))



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected to database");
});

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,webToken');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/test',function(req,res){
    res.send("Hello world");
})

app.post('/login',require('./routes/userApi').loginUser);
app.post('/signup',require('./routes/userApi').createUser);
app.post('/event/create',require('./routes/eventApi').createEvent);
app.post('/all/events',require('./routes/eventApi').allEvents);
app.post('/event/like',require('./routes/eventLikeRsvpApi').likeEvent);
app.post('/event/rsvp',require('./routes/eventLikeRsvpApi').rsvpEvent);

app.listen(app.get('port'), () => {
    console.log('Express server started');
});

module.exports = app
