
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var httpProxy = require('http-proxy');

var app = express();


require('./app/config')(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
if(app.get('debug')) app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: "www.chrisalvares.com" }));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

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


// development only
if ('development' == app.get('debug')) {
  app.use(express.errorHandler());
}

require('./app/routes')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
