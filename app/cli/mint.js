/*
 * This class will get the mint data and return the correct values.
 */

var exec = require('child_process').exec;
var Mint = require('../models/mint');
var Logins = require('../models/logins');
var $ = require('jquery');

var MintCommand = function(app) {
    this.app = app;
    
}

MintCommand.prototype.addProgram = function(program) {
    var that = this;
    program
      .command('mint')
      .description('fetches mint data')
      .option("-n, --numberofdays [number]", "number of days to fetch data for. Default: 30")
      .option("-d --lastdate [MM/DD/YYYY]", "date to end with")
      .action(function(options) {
            that.exec(options);
      });
}

MintCommand.prototype.exec = function(options) {
    var days = options.numberofdays || 30;
    var endDate = new Date();
    if(options.lastdate) endDate = new Date(options.lastdate);
    
    this.buildCommand(Number(days), endDate);
}

MintCommand.prototype.buildCommand = function(numberOfDays, endDate) {
    var mData = this;
    
    var dir = __dirname.replace(/ /gi,"\\ ");
    var startDate = new Date(endDate);
    startDate.setDate(startDate.getDate()-numberOfDays);

    Logins.getLoginDataForKey("mint", function(error, loginData) {
        if(error || loginData == null) {
            mData.errorOut(error || "Could not find any mint login data");
            return;
        }

        var command = dir + "/mintdataextractor/phantomjs/bin/phantomjs "
        command += dir + "/mintdataextractor/mint.js ";        
        command += '"'+loginData.username+'" ';
        command += '"'+loginData.password+'" ';
        command += '"'+mData.outputDate(startDate)+'" ';
        command += '"'+mData.outputDate(endDate)+'"';

        exec(command, $.proxy(mData.didExecuteCommand, mData));

    });
}

MintCommand.prototype.didExecuteCommand = function(error, stdout, stderr) {
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
                
        if(typeof data.trendList !== 'undefined') {       
            var dbData = {};
            for(var index in data.trendList) {
                var pairs = data.trendList[index];
                for(var d in pairs) {
                    var dict = pairs[d];
                    var time = dict.date;
                    var type = dict.type;
                    var value = dict.value;

                    dbData[time] = dbData[time] || {time:time};
                
                    if(type == 'ASSET')
                        dbData[time]['assets'] = (dbData[time]['assets']||0) + value;
                    else if(type == 'DEBT')
                         dbData[time]['debt'] = (dbData[time]['debt']||0) + (-value);
                    dbData[time]['net'] = (dbData[time]['net']||0) + value; 
                }
            }
            this.insertIntoDB(dbData);
        }
    } else {
        this.errorOut("Could not get data");
    }    

}

MintCommand.prototype.insertIntoDB = function(dbData) {
    //put all of these in a array
    var arr = [];
    for(var key in dbData) {
        arr.push(dbData[key]);
    }

    this.insert(arr, 0, this.insert);
}

MintCommand.prototype.insert = function(insertData, index, next) {

    if(index >= insertData.length) {
        console.log("Finished");
        process.exit(code=0);
        return;
    }

    var data = insertData[index];
    var date = new Date(data.time);
    
    Mint.update({date:date}, {
        date:date,
        netIncome:data.net,
        debt:data.debt,
        cash:data.assets
    }, {upsert:true}, function(error) {
        if(error) {
            console.log(error);
        }
        next(insertData, index+1, next);
    });    
}


MintCommand.prototype.errorOut = function(error) {
    console.log(error);
    process.exit(code=0);
    
}


MintCommand.prototype.outputDate = function(date)
{
    var m = date.getMonth()+1;
    if(String(m).length < 2) m = "0" + m;
    var d = date.getDate();
    if(String(d).length < 2) d = "0" + d;
    return m + "/" + d + "/" + date.getFullYear();
}

module.exports = MintCommand;
