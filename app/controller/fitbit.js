var AppCache = require('../models/appcache');


exports.data = function(req, res) {
    res.set('Content-Type', 'application/json');

    AppCache.find({name:/^fibit-data/}).sort({lastUpdate: 'desc'}).exec(function(error, results)
    {  
        var bmi = {};
        var weight = {};
        var activity = {};
        var multiplier = 1000 + Math.random() * 1000;
        
        for(var index in results) {
            var data = JSON.parse(results[index].cache);
            var name = results[index].name;
            
            if(typeof data.weight !== 'undefined') {
                for(var index in data.weight) {
                    var weights = data.weight[index];
                    var date = weights.date;
                    bmi[date] = weights.bmi * multiplier;
                    weight[date] = weights.weight * multiplier;
                }
            } else if(typeof data.activities !== 'undefined') {
                activity = data;
            }
        }

        var dict = {
            bmi:bmi,
            weight:weight,
            activity:activity
        }
        res.send(JSON.stringify(dict));
    });
};