var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');
var mailTransport = require('./mailsending');
var crypto = require('crypto');


router.post('/add', function(req, res) {
    var User = new user(req.body);
    User.save(function(err, user) {
        if (err) res.json(err);
        mailTransport.mailer(user.useremail,'Welcome to Shopping cart','Welcome Message'); 
        res.json({"msg": "success"});

    });
});
            
router.post('/login', function(req,res){
    user.find({ 'useremail': req.body.useremail}, function (err, Userdata) {
    	//console.log(Userdata);
    if(err){console.log( err.stack());}
       if(Userdata[0].password === req.body.password){
       	//res.json({"msg":"success"});
           res.json(Userdata);
        }else{
            res.json({"msg":"password doesnot match"});
        }
    });  
});

router.get('/listall', function(req,res){
 user.find({}, function(err, users){
    res.json(users);
  });
});

router.put('/editprofile/:id',function(req,res){
	console.log(req.body);
    user.update({_id:req.params.id}, {$set:{username :req.body.username }}, function(err, result) {
                if(err){
                console.log(err.stack);
              }
             res.json({ "msg": "success" });
        });
});


router.post('/changepwd/:id', function(req,res){
    user.update({_id:req.params.id},{$set:{password:req.body.password}}, function(err,doc){
        if(err){res.json(err.stack);}
        res.json(doc);
    });

});

router.post('/forgotpwd', function(req,res){
	console.log(req.body);
    user.find({ 'useremail': req.body.useremail}, function (err, Userdata) {
    	//console.log(Userdata);
       if(err){console.log( err.stack());}
       console.log(Userdata);
       var pass = randomValueHex(6);
	     function randomValueHex(len) {
			    return crypto.randomBytes(Math.ceil(len/2))
			        .toString('hex') 
			        .slice(0,len);   
			}
			console.log(pass);
			user.update({_id:Userdata[0]._id}, {$set:{password:pass}}, function(err, result) {
				console.log(Userdata[0]._id);
                if(err){
                console.log(err.stack);
              }
              console.log(result);
               mailTransport.mailer(Userdata[0].useremail,'your updated password for shoppingCart','Password is:'+pass);
             res.json({ "msg": "success" });
        });//update
    });//find  
});




module.exports = router;