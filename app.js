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
require('./model/reqlog')(mongoose);
var reqlog = mongoose.model('reqlog');



mongoose.connect('mongodb://localhost:27017/socket', function(err, db){
    if(err){
        console.log("db not connected properly");
    }else{
    console.log("connected to server");}
    
});


var reqLog= function(req,res,next){
	var method = req.method;
	var url = req.url;
		var ip_add =req.connection.remoteAddress;
	console.log(ip_add+" "+url+" "+ method);
	//console.log(req);
	var req_log = new reqlog({"ip":ip_add,"body":req.body,"url":url,"method":method,"useremail":req.body.useremail});
 req_log.save( function(err, doc){
 	console.log(doc);
 	next();	
 });
};
var user = require('./server/user');
app.use('/user',reqLog, user);


app.get('/', function(req,res){
res.render("../client/index.html");
});

app.listen(2016);
console.log("running at 2016");

