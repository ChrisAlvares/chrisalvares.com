/*
 * routes file
 * @author Chris Alvares <chris.alvares@pmg.co>
 * @since 0.1
 */
var mainRoute = require('../controllers');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var _ = require('underscore');
var crypto = require('crypto');

var github = require('../controllers/github');
var mint = require('../controllers/mint');
var rescuetime = require('../controllers/rescuetime');
var electricity = require('../controllers/electricity');

module.exports = function(app)
{
    var admin = require('../controllers/admin')(app);
    var fitbit = require('../controllers/fitbit')(app);

    passport.use(new GoogleStrategy({
        returnURL: app.get('url') + '/auth/google/return',
        realm: app.get('url') + '/'
      },
      function(identifier, profile, done) {
        var email = _.find(profile.emails, function(dict) {
            return crypto.createHash('md5').update(dict.value).digest('hex') == app.get('admin').email;
        });
        
        if(typeof email === 'undefined')
            return done("Invalid Address, it probably means you are not the admin of this site", null);

        done(null, email.value);
      }
    ));

    function ensureAuthenticated(req, res, next) {
        /* just for when I am testing this stuff out*/
        if(app.get('debug') == true) {
            req.user = '123123123@123123123';
            return next();
        } 
        
        if (req.isAuthenticated()) {       
            return next();
        }

        res.redirect('/login')
    }

    app.get('/login', passport.authenticate('google'));
    app.get('/auth/google/return', 
        passport.authenticate('google', { successRedirect: '/admin',
                                    failureRedirect: '/' }));
    app.get('/', mainRoute.index);
    app.get('/apicalls', mainRoute.apicalls);
    app.get('/finance', mint.get);
    app.get('/github', github.get);
    app.get('/fitbit', fitbit.get);
    app.get('/productivity', rescuetime.get);   


    app.get('/admin', ensureAuthenticated, admin.home);
    app.post('/admin/github/set', ensureAuthenticated, github.setCredentials);
    app.post('/admin/mint/set', ensureAuthenticated, mint.setCredentials);
    app.post('/admin/rescuetime/set', ensureAuthenticated, rescuetime.setCredentials);
    app.post('/admin/electricity/set', ensureAuthenticated, electricity.setCredentials);
    app.get('/admin/fitbit/login', ensureAuthenticated, fitbit.login);
    app.get('/admin/fitbit/set', ensureAuthenticated, fitbit.save);
    
}