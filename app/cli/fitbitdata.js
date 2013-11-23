var express = require('express');
var app = express();
var provider = require('../provider/');
provider.setConfigVariables(app);

var OAuth = require('OAuth');
var AppCache = require('../models/appcache');

var oauth = new OAuth.OAuth(
      'http://api.fitbit.com/oauth/request_token',
      'http://api.fitbit.com/oauth/access_token',
      app.get('fitbit').consumer.key,
      app.get('fitbit').consumer.secret,
      '1.0',
      null,
      'HMAC-SHA1'
    );

var FitbitData = function() 
{
    this.token = '';
}


FitbitData.prototype.login = function(callback)
{
    var fitbitData = this;
    AppCache.find({name:'fitbit-oauth_access_token'}).sort({lastUpdate: 'desc'}).limit(1).exec(function(error, results)
    {
        if(results.length > 0) {
            callback();
            return;
        }
    
    
        AppCache.find({name:'fitbit-oauth_token'}).sort({lastUpdate: 'desc'}).limit(1).exec(function(error, results) {
            if(results.length == 0) {
                oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
                    if(error) {
                        console.log('error: ' + error);
                    }

                    AppCache.update({name:'fitbit-oauth_token'}, {
                        name:'fitbit-oauth_token',
                        cache:oauth_token,
                        lastUpdate:new Date()
                    }, {upsert: true}, fitbitData.databaseSave);
                    
                    AppCache.update({name:'fitbit-oauth_token_secret'}, {
                        name:'fitbit-oauth_token_secret',
                        cache:oauth_token_secret,
                        lastUpdate:new Date()
                    }, {upsert: true}, fitbitData.databaseSave);

                    
                    console.log("Go to: http://www.fitbit.com/oauth/authorize?oauth_token="+oauth_token);
                    setTimeout(function() {
                        process.exit(code=0);     
                    }, 5000);
                });
            } else {
                fitbitData.getAccessToken(callback);
            }
        });
    });
}

FitbitData.prototype.databaseSave = function(error, data) {
    if(error == null) return;
    console.log("Error inserting data: " + error);
}

FitbitData.prototype.getAccessToken = function(callback)
{
    var fitbitData = this;
   AppCache.find({name:/^fitbit/}).sort({lastUpdate:'asc'}).exec(function(error, results) {
      var cache = {};
      for(var index in results) {
          cache[results[index].name] = results[index].cache;
      }
      if(typeof cache["fitbit-oauth_token"] === 'undefined' ||
        typeof cache["fitbit-oauth_token_secret"] === 'undefined') {
            console.log("Could not find oauth tokens");
            return;
      }
      oauth.getOAuthAccessToken(cache["fitbit-oauth_token"], cache["fitbit-oauth_token_secret"], app.get('fitbit').token, function(error, oauth_access_token, oauth_access_token_secret, results) {
        
        if(error) {
            console.log(error);
        }

        AppCache.update({name:'fitbit-oauth_access_token'}, {
            name:'fitbit-oauth_access_token',
            cache:oauth_access_token,
            lastUpdate:new Date()
        }, {upsert: true}, fitbitData.databaseSave);
        
        AppCache.update({name:'fitbit-oauth_access_token_secret'}, {
            name:'fitbit-oauth_access_token_secret',
            cache:oauth_access_token_secret,
            lastUpdate:new Date()
        }, {upsert: true}, fitbitData.databaseSave);
        callback();  
     });       
   });
}

FitbitData.prototype.getWeightData = function(callback)
{
    var fit = this;
    this.getCurrentTokens(function(cache) {
        oauth.get(
            'http://api.fitbit.com/1/user/-/body/log/weight/date/'+fit.getCurrentDate()+'/1m.json',
            cache["fitbit-oauth_access_token"],
            cache["fitbit-oauth_access_token_secret"],
            function(error, data, req) {
                AppCache.update({name:'fibit-data-weight'}, {
                    name:'fibit-data-weight',
                    cache:data,
                    lastUpdate:new Date()
                }, {upsert: true}, function(error) {
                    if(error) {
                        console.log(error);
                    }
                    callback(data);
                });
            }
        );          
    }); 
}

FitbitData.prototype.getActivityData = function(callback)
{
    var fit = this;
    this.getCurrentTokens(function(cache) {
    
        oauth.get(
            'http://api.fitbit.com/1/user/-/activities/date/'+fit.getCurrentDate()+'.json',
            cache["fitbit-oauth_access_token"],
            cache["fitbit-oauth_access_token_secret"],
            function(error, data, req) {

                AppCache.update({name:'fibit-data-activity'}, {
                    name:'fibit-data-activity',
                    cache:data,
                    lastUpdate:new Date()
                }, {upsert: true}, function(error) {
                    if(error) {
                        console.log(error);
                    }
                    callback(data);
                });
                
                
            }
        );          
    }); 
}

FitbitData.prototype.getCurrentTokens = function(callback)
{
    var fit = this;
    AppCache.find({name:/^fitbit/}).sort({lastUpdate:'asc'}).exec(function(error, results) {
        var cache = {};
        for(var index in results) {
            cache[results[index].name] = results[index].cache;
        }
        
        if(typeof cache["fitbit-oauth_access_token"] === 'undefined' ||
        typeof cache["fitbit-oauth_access_token_secret"] === 'undefined') {
            console.log("Could not find oauth tokens");
            process.exit(code=0);
            return;
        }
        callback(cache);
    });
}

FitbitData.prototype.getCurrentDate = function()
{
    var date = new Date();
    var day = (String(date.getDate()).length == 1)?"0"+date.getDate():""+date.getDate();
    var month = (String(date.getMonth()+1).length == 1)?"0"+(date.getMonth()+1):""+(date.getMonth()+1);
    return date.getFullYear() + "-" + month + "-" + day;

}


var f = new FitbitData();
f.login(function() {
   f.getWeightData(function(data){
        console.log("Saved Weight Data" + data);
       f.getActivityData(function(data) {
          //callback hell haha
          console.log("Saved Activity Data" + data);
          process.exit(code=0); 
       });
   });
});

    
