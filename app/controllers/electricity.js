var Logins = require('../models/logins');
var $ = require('jquery');
var Energy = require('../models/energy');

module.exports = {
    
    setCredentials: function(req, res) {        
        var data = {
            name:'electricity',
            connectedAt:new Date()
        };
        var creds = {username:req.param('electricity-username'),password:req.param('electricity-password')};
        var params = $.extend(data, Logins.encryptData(creds));

        Logins.update({name:'electricity'}, params, {upsert: true}, function(error, rowsAffected) {
            if(error) {
                throw error;
                return;
            }
            res.redirect('/admin');
        });        
    }
    
    , get:function(req, res) {
        
        Energy.find({}, null, {sort:'-date', limit:60}, function(error, result) {
            var output = [];
            if(error || result == null) {
                console.log(error);
                res.send(output);
                return;
            }
            res.send(result);
        });
        
    }
}