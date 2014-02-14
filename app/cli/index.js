#!/usr/bin/env node

/**
 * Module dependencies.
 */
 
var express = require('express');
var app = express();
require('../config')(app);
module.exports = app;

var program = require('commander');


var includes = ['mint', 'github', 'cron', 'fitbit-weight', 'fitbit-activity', 'rescuetime', 'electricity'];

for(var index in includes) {
    var CommandClass = require('./' + includes[index]);
    var obj = new CommandClass(app);
    obj.addProgram(program);
}

/*
var MintCommandClass = require('./mint');
var GithubCommandClass = require('./github');
var CronjobsCommandClass = require('./cron');
var FitbitCommandClass = require('./fitbit');

var mintCommand = new MintCommandClass(app);
var githubCommand = new GithubCommandClass(app);
var cronCommand = new CronjobsCommandClass(app);
var fitbitCommand = new FitbitCommandClass(app);

githubCommand.addProgram(program);
mintCommand.addProgram(program);
cronCommand.addProgram(program);
*/

program.parse(process.argv);

if (process.argv.length <= 2) {
    console.log(program.helpInformation());
    process.exit(code=0);
}