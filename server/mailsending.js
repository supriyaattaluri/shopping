var nodemailer = require("nodemailer");

module.exports = {
    mailer : function(to,subj,text){
        var smtpTransport = nodemailer.createTransport("SMTP",{
                service: "Gmail",
                auth: {
                    user: "supriyacse506@gmail.com",
                    pass: "supriya@6"
                }
            });
            var mailOptions={
                to : to,
                subject : subj,
                text : text
            };
            smtpTransport.sendMail(mailOptions, function(error, response){
            	if(error){
                console.log(error);
                }else{
                console.log("Mail sent");
                }
                return true;
            });
    }
};