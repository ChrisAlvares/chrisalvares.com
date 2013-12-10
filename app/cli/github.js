/*
 * This class will get the github data and return the the available issues.
 */


var Github = require('../models/github');
var Logins = require('../models/logins');
var GitHubApi = require("github");
var $ = require('jquery');

var GithubCommand = function(app) {
    this.app = app;
    this.github = null;
}

GithubCommand.prototype.addProgram = function(program) {
    var that = this;
    program
      .command('github')
      .description('fetches github issues data')
      .action(function(options) {
            that.exec(options);
      });
}

GithubCommand.prototype.exec = function(options) {
    this.github = new GitHubApi({
        version: "3.0.0",
        timeout: 6000
    });

    this.signin($.proxy(this.getIssues, this));
}

GithubCommand.prototype.signin = function(callback)
{
    var that = this;
    Logins.getLoginDataForKey("github", function(error, loginData) {
        if(error) {
            callback(error);
            return;
        }
        
        that.github.authenticate({
            type: "basic",
            username: loginData.username,
            password: loginData.token
        });
        callback(null);
    });
}


GithubCommand.prototype.getIssues = function(error) {
    if(error) {
        console.log(error);
        process.exit(code=0);
    }
    
    this.github.issues.getAll({
        filter:"assigned",    
    }, function(error, data) {
        if(error != null) {
          console.log(error);
          process.exit(code=0);
        }
        var issues = data;
        
        var date = new Date();
        date.setHours(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        
        Github.update({date:date}, {
            date:date,
            issues:issues.length
        }, {upsert:true}, function(error) {
            if(error) {
                console.log(error);
            } else {
                console.log("Update Successful");
            }
            process.exit(code=0);
        });
    });
}

module.exports = GithubCommand;