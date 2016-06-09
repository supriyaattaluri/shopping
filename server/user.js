var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

var mailTransport = require('./mailsending');
var crypto = require('crypto');

var  rand=Math.floor((Math.random() * 100) + 54);
   
    link="http://localhost:2016/user/verify?id="+rand;

router.post('/add', function(req, res) {
    var User = new user(req.body);
    User.save(function(err, user) {
        if (err) res.json(err);
        mailTransport.mailer(user.useremail,'Please confirm your Email account','Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>'); 
        res.json({"msg": "success"});

    });
});
 
router.get('/verify',function(req,res){
  host=req.get('host');
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email is been Successfully verified</h1>");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});   

router.post('/login', function(req,res){
     user.find({ 'useremail': req.body.useremail}, function (err, Userdata) {
      console.log(Userdata);
    	    if(err){
            console.log( err.stack());
          }
          console.log(Userdata.password);
       if(Userdata[0].password === req.body.password){
        
        console.log(req.body.password);
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
    user.update({_id:req.params.id},{$set:{password:req.body.password,resetBy:"user"}}, function(err,doc){
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
       
       // generating hexadecimal random number.
       var pass = randomValueHex(6);
	     function randomValueHex(len) {
			    return crypto.randomBytes(Math.ceil(len/2))
			        .toString('hex') 
			        .slice(0,len);   
			}
			//console.log(pass);
			user.update({_id:Userdata[0]._id}, {$set:{password:pass, resetBy:"server"}}, function(err, result) {
				console.log(Userdata[0]._id);
                if(err){
                console.log(err.stack);
              }
              mailTransport.mailer(Userdata[0].useremail,'your updated password for shoppingCart','Password is :'+pass);
             res.json(Userdata);
        });//update
    });//find  
});




module.exports = router;