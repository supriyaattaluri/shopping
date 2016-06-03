
module.exports = function(mongoose) {
 
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
   
    var userSchema = new Schema({

    useremail: String,
    username: String,
    password: String,
    confirmpassword: String

    });

   

    var User = mongoose.model('User', userSchema);
    return User;
}
