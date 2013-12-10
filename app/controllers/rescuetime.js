var Logins = require('../models/logins');
var RescueTime = require('../models/rescuetime');
var $ = require('jquery');

module.exports = {
    
    setCredentials: function(req, res) {        
        var data = {
            name:'rescuetime',
            connectedAt:new Date()
        };
        var creds = {token:req.param('rescuetime-token')};
        var params = $.extend(data, Logins.encryptData(creds));

        Logins.update({name:'rescuetime'}, params, {upsert: true}, function(error, rowsAffected) {
            if(error) {
                throw error;
                return;
            }
            res.redirect('/admin');
        });        
    }
    
    , get:function(req, res) {
        RescueTime.findOne({}, null, {sort:'-date'}, function(error, result) {
            var output = {
                news: 1,
                working:1,
                email: 1,
                social: 1,
                miscellaneous: 1            
            };
            
            if(error) {
                console.log(error);
                res.send(output);
                return;
            } 
            
            output.news = result.news;
            output.working = result.working;
            output.email = result.email;
            output.social = result.social;
            output.miscellaneous = result.miscellaneous;
            res.send(output);            
            
        });
    }
}