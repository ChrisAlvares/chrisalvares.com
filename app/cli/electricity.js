/*
 * This class will get the mint data and return the correct values.
 */

var exec = require('child_process').exec;
var Energy = require('../models/energy');
var Logins = require('../models/logins');
var $ = require('jquery');
var _ = require('underscore');

var ElectricityCommand = function(app) {
    this.app = app;
    
}

ElectricityCommand.prototype.addProgram = function(program) {
    var that = this;
    program
      .command('electricity')
      .description('fetches electricity information from texas smart meter')
      .option("-n, --numberofdays [number]", "number of days to fetch data for. Default: 30")
      .option("-d --lastdate [MM/DD/YYYY]", "date to end with")
      .action(function(options) {
            that.exec(options);
      });
}

ElectricityCommand.prototype.exec = function(options) {
    var days = options.numberofdays || 30;
    var endDate = new Date();
    if(options.lastdate) endDate = new Date(options.lastdate);
    
    this.buildCommand(Number(days), endDate);
}

ElectricityCommand.prototype.buildCommand = function(numberOfDays, endDate) {
    var eData = this;
    
    var dir = __dirname.replace(/ /gi,"\\ ");
    var startDate = new Date(endDate);
    startDate.setDate(startDate.getDate()-numberOfDays);

    Logins.getLoginDataForKey("electricity", function(error, loginData) {
        if(error || loginData == null) {
            eData.errorOut(error || "Could not find any electricity login data");
            return;
        }

        var command = dir + "/mintdataextractor/phantomjs/bin/phantomjs "; //use the mint.com phantomjs, this should be changed to use a centralized phantomjs @todo!
        command += dir + "/smartmeterdataextractor/smartmeter.js ";     
        command += '"monthly" ';
        command += '"'+loginData.username+'" ';
        command += '"'+loginData.password+'" ';
        command += '"'+eData.outputDate(startDate)+'" ';
        command += '"'+eData.outputDate(endDate)+'"';

        exec(command, _.bind(eData.didExecuteCommand, eData));

    });
}

ElectricityCommand.prototype.didExecuteCommand = function(error, stdout, stderr) {
    if(error) {
        this.errorOut(error);
        return;
    }

    var s = String(stdout).replace(/\n/gi, '').match(/\-\-\-start payload\-\-\-(.*)\-\-\-end payload\-\-\-/);
    if(s == null) {
        this.errorOut("Could not login: " + stdout);
        return;
    }
    
    if(s != null && s.length > 1) {
        var data = JSON.parse(s[1]);
               
        if(data instanceof Array) {       
            this.insertIntoDB(data);
        }
    } else {
        this.errorOut("Could not get data");
    }    

}

ElectricityCommand.prototype.insertIntoDB = function(dbData) {
    //put all of these in a array
    this.insert(dbData, 0, this.insert);
}

ElectricityCommand.prototype.insert = function(insertData, index, next) {

    if(index >= insertData.length) {
        console.log("Finished");
        process.exit(code=0);
        return;
    }

    var data = insertData[index];
    var date = new Date(data.date);
    
    Energy.update({date:date}, {
        date:date,
        endreading:data.endreading,
        startreading:data.startreading,
        wattage:data.wattage
    }, {upsert:true}, function(error) {
        if(error) {
            console.log(error);
        }
        next(insertData, index+1, next);
    });    
}


ElectricityCommand.prototype.errorOut = function(error) {
    console.log(error);
    process.exit(code=0);
    
}


ElectricityCommand.prototype.outputDate = function(date)
{
    var m = date.getMonth()+1;
    if(String(m).length < 2) m = "0" + m;
    var d = date.getDate();
    if(String(d).length < 2) d = "0" + d;
    return m + "/" + d + "/" + date.getFullYear();
}

module.exports = ElectricityCommand;
