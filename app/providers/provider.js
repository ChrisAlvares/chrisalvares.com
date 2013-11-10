
var provider = {};

provider.getRoutes = function(app) {

	var routes = require('../routes');
	var user = require('../routes/user');

	app.get('/', routes.index);
	app.get('/users', user.list);
};

provider.setConfigVariables = function(app) {

	var config = require('../config/config.js');
	var $ = require('jquery');
	
	try {
		var local = require('../config/local.js');
		config = $.extend(config, local);
	} catch(e) {
		console.log("No local file found, you should have a local file for security reasons, do not edit the config.js file:\n" + e);
	}

	for(var key in config) {
		app.set(key, config[key]);
	}	
}

module.exports = provider;