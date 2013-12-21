/*
 * To use, run phantomjs mint.js <mint_email_address> <mint_password> <start_date format:MM/DD/YYYY> <end_date format:MM/DD/YYYY>
 * @author Chris Alvares <github.mint@chrisalvares.com>
 * @license MIT
 */

phantom.injectJs('lib/jquery.js');
phantom.injectJs('src/login.js');
phantom.injectJs('src/datagrabber.js');

if(phantom.args.length < 4)
{
	console.log('{"error":"not correct amount of args"}');
	phantom.exit();
}

var type = jQuery.trim(phantom.args[0]);
var username = jQuery.trim(phantom.args[1]).toUpperCase();
var password = jQuery.trim(phantom.args[2]);
var startdate = jQuery.trim(phantom.args[3]); //in mm/dd/YYYY format
var enddate = jQuery.trim(phantom.args[4]); //in mm/dd/YYYY format


window.setTimeout(function(){
	phantom.exit();
}, 120000);


var page = require('webpage').create(),
    system = require('system');    
    
page.settings.loadImages = false;

page.onConsoleMessage = function(msg) {
   // console.log(msg);
};

var login = new window.Login(page);

login.login(username, password, function() {
    console.log("logged in");
	var data = new DataGrabber(page);
	if(type == "monthly") {
    	data.getMonthlyData(startdate, enddate);
	} else {
    	data.getDailyData(startdate);
	}	
});
