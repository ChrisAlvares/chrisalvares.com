var Logins = require('../models/logins');
var $ = require('jquery');
var Github = require('../models/github');
module.exports = {
    
    setCredentials: function(req, res) {        
        var data = {
            name:'github',
            connectedAt:new Date()
        };
        var creds = {username:req.param('github-username'),token:req.param('github-password')};
        var params = $.extend(data, Logins.encryptData(creds));

        Logins.update({name:'github'}, params, {upsert: true}, function(error, rowsAffected) {
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