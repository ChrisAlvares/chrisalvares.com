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

/*
 * Function to get api calls to the javascript variables
 * @since 1.0
 */
exports.apicalls = function(req, res) {
    var apicalls = {
        finance:"/finance/",
        bmi:"/bmi/",
        weight:"/weight/"
    }
   res.send(200, JSON.stringify(apicalls));
    
    
}