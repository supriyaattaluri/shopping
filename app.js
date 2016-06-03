var express=require('express');
var bodyparser=require('body-parser');
var cors = require('cors');
var app = express();

var path =  require("path");
var cons = require('consolidate');
var nodemailer = require("nodemailer");
/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain); */


app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

var mongoose = require('mongoose');
require('./model/user')(mongoose);

mongoose.connect('mongodb://localhost:27017/socket', function(err, db){
    if(err){
        console.log("db not connected properly");
    }else{
    console.log("connected to server");}
    
});

var user = require('./server/user');
app.use('/user', user);


app.listen(2016);
console.log("running at 2016");

