
/**
 * Module dependencies.
 */

var express = require('express');
var provider = require('./app/provider/');

var http = require('http');
var path = require('path');
var httpProxy = require('http-proxy')

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//var blogProxy = httpProxy.createServer(80, 'chrisalvares.com');
var blogProxy = httpProxy.createServer(function (req, res, proxy) {
     req.url = "/blog" + req.url;
     proxy.proxyRequest(req, res, {
         host: 'chrisalvares.com',
         port: 80
    });
});

app.configure(function () {
    app.use('/blog/', blogProxy);
});


provider.setConfigVariables(app);
provider.getRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
