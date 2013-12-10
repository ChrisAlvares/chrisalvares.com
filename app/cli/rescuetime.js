/*
 * This class will get the github data and return the the available issues.
 */


var RescueTime = require('../models/rescuetime');
var Logins = require('../models/logins');
var moment = require('moment');
var request = require('request');
var $ = require('jquery');

var RescueTimeCommand = function(app) {
    this.app = app;
    this.github = null;
}

RescueTimeCommand.prototype.addProgram = function(program) {
    var that = this;
    program
      .command('rescuetime')
      .description('fetches rescuetime productivity data')
      .action(function(options) {
            that.exec(options);
      });
}

RescueTimeCommand.prototype.exec = function(options) {
    var that = this;
    Logins.getLoginDataForKey('rescuetime', function(error, loginData) {
        if(error) {
            console.log(error);
            process.exit(code=0);
        }

        //get the weekly data
        var date = new Date();
        var pastDate = new Date();
        pastDate.setDate(pastDate.getDate()-7);
        
        var parameters = {
            key:loginData.token,
            format:'json',
            restrict_begin:moment(pastDate).format('YYYY-MM-DD'),
            restrict_end:moment(date).format('YYYY-MM-DD')
        };
        var url = 'https://www.rescuetime.com/anapi/data?' + $.param(parameters);
        
        request(url, $.proxy(that.parseRequest, that));
    });
}

RescueTimeCommand.prototype.parseRequest = function(error, response, body) {
    if(error || response.statusCode != 200) {
        console.log(error || response.statusCode);
        process.exit(code=0);
    }
    
    var data = $.parseJSON(body);
    this.parseData(data);
    
}

RescueTimeCommand.prototype.parseData = function(data)
{
    var time = {
        news:0,
        working:0,
        email:0,
        social:0,
        miscellaneous:0
    };
    
    var indexes = {
        rank:0,
        time:1,
        people:2,
        name:3,
        category:4,
        productivityRank:5
    };
    
    for(var index in data.rows) {
        var row = data.rows[index];
        
        var type = this.getType(row[indexes.name], row[indexes.category]);
        if(typeof type !== 'undefined') {
            time[type] = (time[type]||0) + row[indexes.time];
        }
    }
    
    time.date = new Date();
    time.date.setHours(0);
    time.date.setMinutes(0);
    time.date.setSeconds(0);
    time.date.setMilliseconds(0);
    
    this.insertData(time);
}

RescueTimeCommand.prototype.insertData = function(data)
{
    RescueTime.update({date:data.date}, data, {upsert:true}, function(error) {
        if(error) {
            console.log(error);
        } else {
            console.log("Finished");
        }

        process.exit(code=0);        
    });
}

RescueTimeCommand.prototype.getType = function(name, category) {
    name = name.toLowerCase();

    category = category.toLowerCase();
    var keys = {
        working:['Adobe Photoshop', 'coda', 'Xcode', 'console.aws.amazon.com', 'Terminal', 'localhost', 'github.com', 'Software Development', 'developer.', 'api.'],
        email:['gmail', 'mail.pmg.co', 'mail.google.com'],
        social:['twitter.com', 'facebook.com', 'amazon.com', 'Social Networking', 'General Shopping'],
        news: ['news.ycombinator.com', 'reddit.com', 'News'],
        miscellaneous: ['.com', '.net'],
    };
    for(var key in keys) {
        for(var index in keys[key]) {
            if(keys[key][index].toLowerCase() == name) return key;
            if(category == 'uncategorized' && name.indexOf(keys[key][index]) != -1) return key;
            if(category.indexOf(keys[key][index].toLowerCase()) != -1) return key;
        }
    }
}


module.exports = RescueTimeCommand;