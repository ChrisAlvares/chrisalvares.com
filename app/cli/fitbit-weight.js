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
      .command('fitbitweight')
      .option('-d, --date [MM/DD/YYYY]', 'the start date in format MM/DD/YYYY')
      .option('-t, --type [string]', 'what time of data to get, "weight" or "activity" defaults to "weight"')
      .description('gets fitbit data')
      .action(function(options) {
            var type = options.type || "weight";
            if(options.date) that.date = new Date(options.date);
            that.execWeight(options);
      });
}

FitbitCommand.prototype.execWeight = function(options)
{
    var that = this;
    var url = 'http://api.fitbit.com/1/user/-/body/log/weight/date/'+this.getCurrentDate()+'/1m.json';
    this.getAuthRequest(url, function(error, data) {
        if(error) {
            console.log(error);
            process.exit(code=0);
        }
        
        var weightData = data.weight;
        that.insertWeightData(weightData, 0, $.proxy(that.insertWeightData, that));
    });
}

FitbitCommand.prototype.insertWeightData = function(weightData, index, next)
{
    if(index >= weightData.length) {
        console.log("Finished");
        process.exit(code=0);
    }
    var data = weightData[index];
    var date = new Date(data.date);
    
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    FitbitActivity.update({date:date}, {
        date: date,
        weight:data.weight,
        bmi: data.bmi,
        rawWeightOutput: JSON.stringify(data)
    }, {upsert:true}, function(error) {
        if(error) {
            console.log(error);
        }
        next(weightData, index+1, next);
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


FitbitCommand.prototype.getCurrentDate = function()
{
    var date = this.date;
    var day = (String(date.getDate()).length == 1)?"0"+date.getDate():""+date.getDate();
    var month = (String(date.getMonth()+1).length == 1)?"0"+(date.getMonth()+1):""+(date.getMonth()+1);
    return date.getFullYear() + "-" + month + "-" + day;

}


module.exports = FitbitCommand;