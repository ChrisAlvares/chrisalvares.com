/*
 * cli interface for fetching data in the background
 */
 
var express = require('express');
var exec = require('child_process').exec;


var app = express();
var provider = require('../provider/');
provider.setConfigVariables(app);

var AppCache = require('../models/appcache');
var dir = __dirname.replace(/ /gi,"\\ ");
var date = new Date();
var secondDate = new Date();
secondDate.setDate(secondDate.getDate()-30);

var command = dir + "/mintdataextractor/phantomjs/bin/phantomjs "
command += dir + "/mintdataextractor/mint.js ";
command += '"'+app.get('mint').username+'" ';
command += '"'+app.get('mint').password+'" ';
command += '"'+outputDate(secondDate)+'" ';
command += '"'+outputDate(date)+'" ';

exec(command, function(error, stdout, stderr) {
    var s = String(stdout).replace(/\n/gi, '').match(/\-\-\-start payload\-\-\-(.*)\-\-\-end payload\-\-\-/);

    if(s != null && s.length > 1) {
        var cache = new AppCache({
            name:'mint',
            cache:s[1],
            lastUpdate:new Date()
        });
        cache.save(function(error){
            if(error) 
                console.log(error);
            else 
                console.log("Update Successful");
            process.exit(code=0);
                        
        });
    } else {
        console.log("An error occured");
        console.log("Could not find: " + stdout);
        process.exit(code=0)
    }
});

setTimeout(function() {
    process.exit(code=0);
}, 36000); //make sure htis script does not run forever

function outputDate(date)
{
    var m = date.getMonth()+1;
    if(String(m).length < 2) m = "0" + m;
    var d = date.getDate();
    if(String(d).length < 2) d = "0" + d;
    return m + "/" + d + "/" + date.getFullYear();
}


