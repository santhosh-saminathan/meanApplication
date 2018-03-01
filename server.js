'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 3000));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected")
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

app.post('/login',function(req,res){
    console.log(req.body);
    // Actual process: query to mongo and get data.
    if(req.body.username==='test' && req.body.password==='test')
    res.json(200,"user found");
    else
    res.json(404,"not found");
})

app.post('/signup',function(req,res){
    console.log(req.body);
    // Actual process: query to mongo and get data.
    res.send(200,"success")
})


app.listen(app.get('port'), () => {
    console.log('Express server started');
});

module.exports = app
