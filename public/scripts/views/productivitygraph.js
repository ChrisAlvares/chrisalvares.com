/*
 * This is the productivity graph which has my time doing stuff on a computer
 * @since 1.0
 */

define(['jquery', 'underscore'], function($, _) {
    
    var ProductivityGraph = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    ProductivityGraph.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    ProductivityGraph.prototype.renderWithData = function(event, dataObj, data)
    {
        this.data = data;
        
        var activityPercentage = {};
        var totalTime = this.getTotalTime();
        var series = {
            type: 'pie',
            name: 'Productivity',
            innerSize: '50%',
            data: []
        };
        
        _.each(this.data, function(time, key) {
           series.data.push([key, time/totalTime*100]);
        });
        this.renderGraph(series);
    }
    
    ProductivityGraph.prototype.renderGraph = function(series)
    {
        this.container.html("")
        .highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Productivity',
                align: 'center',
                verticalAlign: 'middle',
                y: 50
            },
            colors: ['#C6E9B5', '#556aba', '#299734', '#c65959', '#DDDDDD'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black'
                        }
                    },
                    center: ['50%', '50%']
                }
            },
            series: [series]
        }); 
    }
    
    ProductivityGraph.prototype.getTotalTime = function()
    {
        var time = 0;
        _.each(this.data, function(t) {
            time += t;
        });
        return time;
    }
    
    ProductivityGraph.prototype.defaultOptions = {
        dataObj:null
    }

    $.fn.productivityGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("productivityGraph", new ProductivityGraph(this, options));
        });
    }
    
    return ProductivityGraph;
    
});