
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { debug: req.debug });
};


/*
 * Function to get api calls to the javascript variables
 * @since 1.0
 */
exports.apicalls = function(req, res) {
    res.set('Content-Type', 'application/json');
    var apicalls = {
        finance:      '/finance',
        github:       '/github',
        fitbit:       '/fitbit',
        productivity: '/productivity',
        energy:       '/energy',
    }
   res.send(200, 'define([], function(){return '+JSON.stringify(apicalls)+';})');
    
    
}