
module.exports = function(mongoose) {
 
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
   
    var reqLog = new Schema({

    useremail: String,
   ip:String,
   url:String,
   method:String,
   body:Object

    });

   

    var reqlog = mongoose.model('reqlog', reqLog);
    return reqlog;
}
