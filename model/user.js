
module.exports = function(mongoose) {
 
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
   
    var userSchema = new Schema({

    useremail: String,
    username: String,
    password: String,
    resetBy: {
        type: String,
        enum: ['server', 'user']
      }


    });

   

    var User = mongoose.model('User', userSchema);
    return User;
}
