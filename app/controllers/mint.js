var Logins = require('../models/logins');
var Mint = require('../models/mint');
var $ = require('jquery');

module.exports = {
    
    setCredentials: function(req, res) {        
        var data = {
            name:'mint',
            connectedAt:new Date()
        };
        var creds = {username:req.param('mint-username'),password:req.param('mint-password')};
        var params = $.extend(data, Logins.encryptData(creds));

        Logins.update({name:'mint'}, params, {upsert: true}, function(error, rowsAffected) {
            if(error) {
                throw error;
                return;
            }
            res.redirect('/admin');
        });        
    }
    
    , get:function(req, res) {
        var output = {
            assets: {},
            debt: {},
            net: {}
        };
        
        var randomizer = Math.random() * 3000;
        
        var date = new Date();
        date.setDate(date.getDate()-60); //get the last 60 days worth of data
        Mint.where('date').gte(date).exec(function(error, data) {
            if(error) {
                console.log(error);
                res.send(output);
                return;
            }
            for(var index in data) {
                var d = data[index];
                var time = (new Date(d.date)).getTime();
                output.assets[time] = d.cash * randomizer;
                output.debt[time] = d.debt * randomizer;
                output.net[time] = d.netIncome * randomizer;
            }
            res.send(output);
        });
        
    }    
}