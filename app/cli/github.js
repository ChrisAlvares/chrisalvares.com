/*
 * cli interface for fetching data in the background
 */
 
var express = require('express');
var app = express();
var provider = require('../provider/');
provider.setConfigVariables(app);

var AppCache = require('../models/appcache');
var dir = __dirname.replace(/ /gi,"\\ ");

//get the github information
var GitHubApi = require("github");
var github = new GitHubApi({
    version: "3.0.0",
    timeout: 6000
});

github.authenticate({
    type: "basic",
    username: app.get("github").username,
    password: app.get("github").token
});

github.issues.getAll({
    filter:"assigned",    
}, function(error, data) {
    if(error != null) {
      console.log(error);
    }
    var issues = data;
  
    var cache = new AppCache({
        name:'github-issues',
        cache:issues.length,
        lastUpdate:new Date()
    });

    cache.save(function(error){
        if(error) 
            console.log(error);
        else 
            console.log("Update Successful");
        process.exit(code=0);
    });
})





