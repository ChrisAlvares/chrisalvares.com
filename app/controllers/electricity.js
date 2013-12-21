var Logins = require('../models/logins');
var $ = require('jquery');

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
        
        Github.findOne({}, null, {sort:'-date'}, function(error, result) {
            var output = {issues:0};
            if(error || result == null) {
                console.log(error);
                res.send(output);
                return;
            }
            output.issues = result.issues;
            res.send(output);
        });
        
    }
}