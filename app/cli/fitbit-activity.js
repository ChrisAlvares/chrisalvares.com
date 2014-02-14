/*
 * a Fitbit data integration class
 */
var $ = require('jquery');
var OAuth = require('oauth');
var Logins = require('../models/logins');
var FitbitActivity = require('../models/fitbit-activity');
var AppCache = require('../models/cache');

var FitbitCommand = function(app)
{
    this.app = app;
    this.date = new Date();
    this.date.setDate(this.date.getDate()-30);
    this.oauth = new OAuth.OAuth(
      'http://api.fitbit.com/oauth/request_token',
      'http://api.fitbit.com/oauth/access_token',
      app.get('fitbit').key,
      app.get('fitbit').secret,
      '1.0',
      null,
      'HMAC-SHA1'
    );

}

FitbitCommand.prototype.addProgram = function(program)
{
    var that = this;
    
    program
      .command('fitbitactivity')
      .option('-d, --date [MM/DD/YYYY]', 'the start date in format MM/DD/YYYY, will go up until todays date')
      .option('-t, --type [string]', 'what time of data to get, "weight" or "activity" defaults to "weight"')
      .description('gets fitbit data')
      .action(function(options) {
            if(options.date) that.date = new Date(options.date);
            that.execActivity(options);
      });
}

FitbitCommand.prototype.execActivity = function(options)
{
    var that = this;
    var url = 'http://api.fitbit.com/1/user/-/activities/date/'+this.getCurrentDate()+'.json';
    this.getAuthRequest(url, function(error, data) {
        if(error) {
            console.log(error);
            process.exit(code=0);
        }        
        
        if(typeof data.summary === 'undefined') {
            console.log('No Summary provided for date');
            process.exit(code=0);
        }
        
        FitbitActivity.update({date:that.getFreshDate()}, {
            date:that.getFreshDate(),
            veryActiveMinutes: data.summary.veryActiveMinutes,
            fairlyActiveMinutes:  data.summary.fairlyActiveMinutes,
            steps: data.summary.steps,
            activityCalories: data.summary.activityCalories,
            rawActivityOutput: JSON.stringify(data)
        }, {upsert: true}, function(error) {
            if(error) {
                console.log(error);
            }
            //move on to the next day
            that.date.setDate(that.date.getDate()+1);
            if(that.date.getTime() > Date.now()) {
                console.log('Finished');
                process.exit(code=0);
                return;
            }
            that.execActivity(options);
        });
    });
}


FitbitCommand.prototype.getAuthRequest = function(url, callback)
{
    var that = this;
    Logins.getLoginDataForKey('fitbit', function(error, auth_info) {
        if(error) {
            callback(error, null);
            return;
        }
        
        that.oauth.get(url, auth_info.access_token, auth_info.acesss_token_secret, function(error, data, req) {
            
            try {
                var data = JSON.parse(data);
            } catch(e) {
                callback(e, null);
                return;
            }
            
            callback(null, data); 
        });
    });
}

FitbitCommand.prototype.getFreshDate = function(date)
{
    if(typeof date === 'undefined') {
        date = this.date;
    }
    
    var date = new Date(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

FitbitCommand.prototype.getCurrentDate = function()
{
    var date = this.date;
    var day = (String(date.getDate()).length == 1)?"0"+date.getDate():""+date.getDate();
    var month = (String(date.getMonth()+1).length == 1)?"0"+(date.getMonth()+1):""+(date.getMonth()+1);
    return date.getFullYear() + "-" + month + "-" + day;

}


module.exports = FitbitCommand;