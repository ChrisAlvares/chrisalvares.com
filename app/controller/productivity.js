var AppCache = require('../models/appcache');

exports.data = function(req, res) {
    res.set('Content-Type', 'application/json');
    
    AppCache.find({name:'productivity-time'}).sort({lastUpdate: 'desc'}).limit(1).exec(function(error, result)
    {  
        var time = {
            news:0,
            working:0,
            email:0,
            social:0
        };        
        if(result.length > 0) {
            var data = result[0].cache;
            time = JSON.parse(data);
        }
        res.send(time);
    });
};