/*
 * This is the finance graph which has my assets, debt and net incomes
 * @since 1.0
 */

define(['jquery'], function($) {
    
    var CalorieCounter = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    CalorieCounter.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    CalorieCounter.prototype.renderWithData = function(event, dataObj, data)
    {
        this.data = data;
        var calories = 0;
        
        try {
            calories = this.data.activity.summary.caloriesOut
        } catch(e) {
            console.log(this.data);
            console.log(e);
        }

        $(this.container).html(calories);
    }
    
    CalorieCounter.prototype.defaultOptions = {
        dataObj:null
    }

    $.fn.calorieCounterGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("calorieCounterGraph", new CalorieCounter(this, options));
        });
    }
    
    return CalorieCounter;
    
});