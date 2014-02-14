/*
 * This is the github graph which handles github issues
 * @since 1.0
 */

define(['jquery'], function($) {
    
    var CalorieGraph = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    CalorieGraph.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    CalorieGraph.prototype.renderWithData = function(event, dataObj, data)
    {
        this.data = data;
        var activityCalories = (typeof data.activityCalories !== 'undefined')?data.activityCalories:[];
        var d = false;
        _.each(activityCalories, function(calorie) {
            d = calorie;
        });
        $(this.container).html(d?d:0);
    }
    
    CalorieGraph.prototype.defaultOptions = {
        dataObj:null
    }

    $.fn.calorieGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("calorieGraph", new CalorieGraph(this, options));
        });
    }
    
    return CalorieGraph;
    
});