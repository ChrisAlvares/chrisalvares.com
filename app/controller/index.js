/*
 * Routes for the Homepage
 * @author Chris Alvares<mail@chrisalvares.com>
 * @since 1.0
 */
 
 
/*
 * The homepage!
 * @since 1.0
*/
exports.index = function(req, res){
    res.render('index', {});
};

exports.portfolio = function(req, res) {
    res.render('portfolio', {});  
};

/*
 * Function to get api calls to the javascript variables
 * @since 1.0
 */
exports.apicalls = function(req, res) {
    res.set('Content-Type', 'application/json');
    var apicalls = {
        finance:"/finance/",
        github:"/github/",
        fitbit:"/fitbit/",
        productivity:"/productivity/"
    }
   res.send(200, 'define([], function(){return '+JSON.stringify(apicalls)+';})');
    
    
}