/*
 * This is the finance graph which has my assets, debt and net incomes
 * @since 1.0
 */

define(['jquery', 'highcharts', 'jqueryui'], function($) {
    
    var EnergyGraph = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    EnergyGraph.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    EnergyGraph.prototype.renderWithData = function(event, dataobj, data)
    {
        this.data = data;
        this.fillSeries();
        if(data instanceof Array) this.fillData(data, 0);
        this.render();
    }
    
    EnergyGraph.prototype.fillData = function(data, seriesIndex)
    {
        this.dates = [];
        data = data.reverse();
        for(var index in data) {
            var date = new Date(data[index].date);
            var value = data[index].wattage;
            this.dates.push(date);
            this.series[seriesIndex].data.push(value);
        }
    }
    
    EnergyGraph.prototype.fillSeries = function()
    {
        this.series = [];
        
        var series = {
            name:"",
            data:[],
            marker: {
               enabled: false
            },
            type: 'column',
            color:"black",
        }
        this.series.push($.extend(true, {}, series, {name:'Wattage', color:'#C6E9B5', yAxis:0}));
    }
    
    EnergyGraph.prototype.render = function()
    {
        var that = this;
        this.container.highcharts({
            chart: {
                type: 'column',
                backgroundColor:'white',
                borderWidth: 0,
                borderRadius: 4,
                borderColor:'#CCCCCC',
                plotBackgroundColor: 'white',
                plotBorderWidth: 1,
                height: 260
            },
            title: {
                text: '',
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function() {
                        return $.datepicker.formatDate('M d', that.dates[this.value]);
                    },
                    style: {
                        color:"white"
                    }
                },
                title: {
                    text: ''
                }
            },
            yAxis: [
                {
                    title: '',
                    gridLineColor:'black',
                }, {
                    gridLineWidth: 1,
                    gridLineColor:'black',
                    title: '',
                    opposite: true,
                    labels: {
                        formatter:function() {
                            return "";
                        }
                    }

                }
            ],
            tooltip: {
                enabled:true,
                formatter: function() {
                    return this.y + ' killowatts';
                }
            },
            legend: {
                    layout: 'horizontal',
                    align: 'bottom',
                    verticalAlign: 'top',
                    borderWidth: 0,
                    margin:20,
                    style: {
                        color:'white'
                    }
            },
            series: this.series
        });
    }
    
    EnergyGraph.prototype.defaultOptions = {
        dataObj:null
    }
    
    $.fn.energyGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("energyGraph", new EnergyGraph(this, options));
        });
    }
    
    return EnergyGraph;
    
});