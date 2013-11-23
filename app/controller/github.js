var AppCache = require('../models/appcache');


exports.data = function(req, res) {
    res.set('Content-Type', 'application/json');
    
    AppCache.find({name:'github-issues'}).sort({lastUpdate: 'desc'}).limit(1).exec(function(error, result)
    {  
        var github = {issues:0};
        if(result.length > 0) {
            var data = result[0].cache;
            github.issues = Number(data);
        }
        res.send(github);
    });
};