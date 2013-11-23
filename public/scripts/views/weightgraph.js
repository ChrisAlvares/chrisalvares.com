/*
 * This is the finance graph which has my assets, debt and net incomes
 * @since 1.0
 */

define(['jquery', 'highcharts', 'jqueryui'], function($) {
    
    var WeightGraph = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    WeightGraph.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    WeightGraph.prototype.renderWithData = function(event, dataobj, data)
    {
        this.data = data;
        this.fillSeries();
        
        this.fillData(data.weight, 0);
        this.fillData(data.bmi, 1);
        this.render();
    }
    
    WeightGraph.prototype.fillData = function(data, seriesIndex)
    {
        this.dates = [];
        for(var dateStr in data)
        {
            var value = data[dateStr];
            var date = new Date(dateStr);
            this.dates.push(date);
            this.series[seriesIndex].data.push([date, value]);
        }
    }
    
    WeightGraph.prototype.fillSeries = function()
    {
        this.series = [];
        
        var series = {
            name:"",
            data:[],
            marker: {
               enabled: false
            },
            type: 'spline',
            color:"black",
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 4
                }
            }
        }
        this.series.push($.extend(true, {}, series, {name:'Weight', color:'#d3d3d3', yAxis:0}));
        this.series.push($.extend(true, {}, series, {name:'BMI', color:'#999999', yAxis:1}));
    }
    
    WeightGraph.prototype.render = function()
    {
        var that = this;
        this.container.highcharts({
            chart: {
                type: 'spline',
                height: 260,
                backgroundColor:'white',
                borderWidth: 0,
                borderRadius: 4,
                borderColor:'#CCCCCC',
                plotBackgroundColor: 'white',
                plotBorderWidth: 1                                
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
                    labels: {
                        formatter:function() {
                            return "";
                        }
                    }
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
                    if(this.x >= 2) {
                        var val = this.y;
                        var backVal = this.series.data[this.x-1].y;
                        var change = ((val - backVal) / backVal) * 100;
                        var color = (change > 0)?'red':'green';
                        return '<span style="color:'+color+'">' + number_format(change, 2) + '% change</span>';
                    }
                    return '0% change';
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
    
    WeightGraph.prototype.defaultOptions = {
        dataObj:null
    }
    
    $.fn.weightGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("weightGraph", new WeightGraph(this, options));
        });
    }
    
    return WeightGraph;
    
});