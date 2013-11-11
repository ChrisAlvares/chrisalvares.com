var AppCache = require('../models/appcache');


exports.data = function(req, res) {
    res.set('Content-Type', 'application/json');
    
    AppCache.find({name:'mint'}).sort({lastUpdate: 'desc'}).limit(1).exec(function(error, result)
    {  
        var assets = {};
        var debt = {};
        var net = {};

        if(result.length > 0) {
            var data = JSON.parse(result[0].cache);
            var multiplier = 1000 + Math.random() * 1000;
            
            if(typeof data.trendList !== 'undefined') {
                for(var index in data.trendList) {
                    var pairs = data.trendList[index];
                    
                    for(var d in pairs) {
                        var dict = pairs[d];
                        var time = dict.date;
                        var type = dict.type;
                        var value = dict.value * multiplier;

                        if(type == 'ASSET')
                            assets[time] = (assets[time]||0) + value;
                        else if(type == 'DEBT')
                            debt[time] = (debt[time]||0) + value;
                        net[time] = (net[time]||0) + value;
                    }
                }
            }
        }

        var dict = {
            assets:assets,
            debt:debt,
            net:net
        }
        res.send(JSON.stringify(dict));
    });
};