/*
 * cli interface for fetching data in the background
 */
var jQuery = require('jquery');
var express = require('express');
var app = express();
var provider = require('../provider/');
var request = require('request');
var AppCache = require('../models/appcache');
var moment = require('moment');
var _ = require('underscore');

provider.setConfigVariables(app);

var date = new Date();
var pastDate = new Date();
pastDate.setDate(pastDate.getDate()-7);



var parameters = {
    key:app.get('rescuetime').key,
    format:'json',
    restrict_begin:moment(pastDate).format('YYYY-MM-DD'),
    restrict_end:moment(date).format('YYYY-MM-DD')
};

var url = 'https://www.rescuetime.com/anapi/data?' + jQuery.param(parameters);

request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = jQuery.parseJSON(body);
        if(data) {
            parseData(data);
        }
      


    } else {
      console.log("Error: " + error);
    }
});

function parseData(data)
{
    var time = {
        news:0,
        working:0,
        email:0,
        social:0
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
        
        var type = getType(row[indexes.name], row[indexes.category]);
        if(typeof type !== 'undefined') {
            time[type] = (time[type]||0) + row[indexes.time];
        }
    }
    
    
    AppCache.update({name:'productivity-time'}, {
        name:'productivity-time',
        cache:JSON.stringify(time),
        lastUpdate:new Date()
    }, {upsert: true}, function(error){
        console.log(time);
        if(error) 
            console.log(error);
        else 
            console.log("Update Successful");
        process.exit(code=0);
    });
}

function getType(name, category) {
    name = name.toLowerCase();

    category = category.toLowerCase();
    var keys = {
        news: ['news.ycombinator.com', 'reddit.com', 'General News'],
        working:['Adobe Photoshop', 'coda', 'Xcode', 'console.aws.amazon.com', 'Terminal', 'localhost', 'github.com', 'Software Development', 'developer.', 'api.'],
        email:['gmail'],
        social:['twitter.com', 'facebook.com', 'amazon.com', 'Social Networking', 'General Shopping']
    };
    for(var key in keys) {
        for(var index in keys[key]) {
            if(keys[key][index].toLowerCase() == name) return key;
            if(category == 'uncategorized' && name.indexOf(keys[key][index]) != -1) return key;
            if(category.indexOf(keys[key][index].toLowerCase()) != -1) return key;
        }
    }
}