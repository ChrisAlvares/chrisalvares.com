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

console.log('1 15 * * * node "' + __dirname + '/mintdata.js" > "'+__dirname+'/../log/cron.txt"');
console.log('1 */3 * * * node "' + __dirname + '/githubdata.js" > "'+__dirname+'/../log/cron.txt"');
console.log('1 12 * * * node "' + __dirname + '/fitbitdata.js" > "'+__dirname+'/../log/cron.txt"');
console.log('30 13 * * * node "' + __dirname + '/productivitydata.js" > "'+__dirname+'/../log/cron.txt"');