var OAuth = require('oauth');
var Logins = require('../models/logins');
var AppCache = require('../models/cache');
var FitbitWeight = require('../models/fitbit-weight');
var $ = require('jquery');

module.exports = function(app) {
    

    var oauth = new OAuth.OAuth(
        'http://api.fitbit.com/oauth/request_token',
        'http://api.fitbit.com/oauth/access_token',
        app.get('fitbit').key,
        app.get('fitbit').secret,
        '1.0',
        app.get('url') + '/admin/fitbit/set',
        'HMAC-SHA1'
    );

    return {
        
        login: function(req, res) {
            oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
                if(error) {
                    throw error;
                }
                req.session.fitbitAuthToken = oauth_token;
                req.session.fitbitAuthSecret = oauth_token_secret;
                res.redirect('http://www.fitbit.com/oauth/authorize?oauth_token='+oauth_token);
            });
            
        }
        
        , save: function(req, res) {
        
            oauth.getOAuthAccessToken(
                req.session.fitbitAuthToken, 
                req.session.fitbitAuthSecret, 
                req.param('oauth_verifier'), function(error, oauth_access_token, oauth_access_token_secret, results) {
                    if(error) {
                        res.send(error);
                        return;
                    }
                
                    var loginData = {
                        access_token:oauth_access_token,
                        acesss_token_secret:oauth_access_token_secret
                    };
                    var data = {
                        name:'fitbit',
                        connectedAt:new Date()
                    };
                    var params = $.extend(data, Logins.encryptData(loginData));

                    Logins.update({name:'fitbit'}, params, {upsert: true}, function(error, rowsAffected) {
                        if(error) {
                            throw error;
                            return;
                        }
                        res.redirect('/admin');
                    });        
             });
        }
        
        , get: function(req, res) {
            var output = {
                bmi:{},
                weight:{},
                activity: {}
            };
            
            var randomizer = Math.random() * 3000;
            
            var date = new Date();;
            date.setDate(date.getDate()-60);
            
            FitbitWeight.find({date:{$gte: date}}, null, {sort:'date'}).exec(function(error, results) {

                if(error) {
                    console.log(error);
                    res.send(output);
                    return;
                }
                
                for(var index in results) {
                    var data = results[index];
                    var time = (new Date(data.date)).getTime();
                    output.bmi[time] = data.bmi * randomizer;
                    output.weight[time] = data.weight * randomizer;
                }
                
                //now get the fitbit activity data
                AppCache.findOne({name:'fibit-data-activity'}, function(error, result) {
                    if(error) {
                        console.log(error);
                        res.send(output);
                        return;
                    }
                    output.activity = JSON.parse(result.cache);
                    res.send(output);                     
                });
                
            });
                
            
            
            
        }
        
        
        
    }
    
    
}