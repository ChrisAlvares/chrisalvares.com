var express = require('express');

/*
# *    *    *    *    *  command to execute
# ┬    ┬    ┬    ┬    ┬
# │    │    │    │    │
# │    │    │    │    │
# │    │    │    │    └───── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names)
# │    │    │    └────────── month (1 - 12)
# │    │    └─────────────── day of month (1 - 31)
# │    └──────────────────── hour (0 - 23)
# └───────────────────────── min (0 - 59)
*/


var Cronjobs = function(app) {
    this.app = app;
    this.github = null;
}

Cronjobs.prototype.addProgram = function(program) {
    var that = this;
    program
      .command('cron')
      .description('creates a cron tab')
      .action(function(options) {
            that.exec(options);
      });
}

Cronjobs.prototype.exec = function(options) {
    console.log('1 15 * * * "' + __dirname + '/index.js" mint  >> "'+__dirname+'/../log/cron.txt"');
    console.log('1 */3 * * * node "' + __dirname + '/index.js" github >> "'+__dirname+'/../log/cron.txt"');
    console.log('1 12 * * * node "' + __dirname + '/index.js" fitbit >> "'+__dirname+'/../log/cron.txt"');
    console.log('30 13 * * * node "' + __dirname + '/index.js" productivitydata >> "'+__dirname+'/../log/cron.txt"');
    process.exit(code=0);
}

module.exports = Cronjobs;