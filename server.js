'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.set('port', (process.env.PORT || 3000));


var userSchema = require(path.resolve('./schema/userSchema.js'));
var eventSchema = require(path.resolve('./schema/eventSchema.js'));
var eventDetails = require(path.resolve('./schema/eventDetailsSchema.js'));



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
app.post('/event/update',require('./routes/eventApi').updateEvent);
app.post('/event/unlike',require('./routes/eventLikeRsvpApi').unlikeEvent);
app.post('/event/uncheck/rsvp',require('./routes/eventLikeRsvpApi').uncheckRsvp);
app.post('/event/remove',require('./routes/eventApi').removeEvent);
app.post('/user/type',require('./routes/userApi').userType);
app.get('/admin/new/events',require('./routes/eventApi').newEvents);
app.post('/admin/approve/event',require('./routes/eventApi').approveEvent);
app.get('/admin/all/users',require('./routes/userApi').allUsers);
app.post('/admin/delete/user',require('./routes/userApi').deleteUser);
app.post('/event/details',require('./routes/eventApi').getEventDetails)
app.post('/user/details',require('./routes/userApi').getUserDetails)
app.post('/user/update',require('./routes/userApi').updateUserDetails)


app.post('/create/admin',require('./routes/userApi').createAdmin) // for testing purpose

app.listen(app.get('port'), () => {
    console.log('Express server started');
});

module.exports = app
