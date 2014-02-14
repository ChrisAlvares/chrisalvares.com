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
    console.log('1 */4 * * * node "' + __dirname + '/index.js" mint  >> "'+__dirname+'/../log/mint.txt"');
    console.log('1 */3 * * * node "' + __dirname + '/index.js" github >> "'+__dirname+'/../log/github.txt"');
    console.log('15 * * * * node "' + __dirname + '/index.js" fitbitweight >> "'+__dirname+'/../log/fitbit-weight.txt"');
    console.log('15 * * * * node "' + __dirname + '/index.js" fitbitactivity >> "'+__dirname+'/../log/fitbit-activity.txt"');
    console.log('30 13 * * * node "' + __dirname + '/index.js" rescuetime >> "'+__dirname+'/../log/rescuetime.txt"');
    console.log('30 */2 * * * node "' + __dirname + '/index.js" electricity >> "'+__dirname+'/../log/electricity.txt"');

    process.exit(code=0);
}

module.exports = Cronjobs;