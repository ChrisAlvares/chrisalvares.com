/**
 * This is the finance graph which has my assets, debt and net incomes
 * @since 1.0
 */

define(['jquery', 'highcharts', 'jqueryui'], function($) {
    
    var FinanceGraph = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    FinanceGraph.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    FinanceGraph.prototype.renderWithData = function(event, dataobj, data)
    {
        this.data = data;
        this.fillSeries();
        
        this.fillData(data.assets, 0);
        this.fillData(data.debt, 1);
        this.fillData(data.net, 2);
        this.render();
    }
    
    FinanceGraph.prototype.fillData = function(data, seriesIndex)
    {
        this.dates = [];
        for(var millidate in data)
        {
            var value = data[millidate];
            var date = new Date(Number(millidate));
            this.dates.push(date);
            this.series[seriesIndex].data.push([date, value]);
        }
    }
    
    FinanceGraph.prototype.fillSeries = function()
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
        this.series.push($.extend(true, {}, series, {name:'Cash', color:'#C6E9B5', yAxis:0}));
        this.series.push($.extend(true, {}, series, {name:'Liabilities', color:'#c65959', yAxis:1}));
        this.series.push($.extend(true, {}, series, {name:'Net Income', color:'#556aba', yAxis:0, lineWidth:6}));

    }
    
    FinanceGraph.prototype.render = function()
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
                text: ''
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
                        return number_format(change, 2) + '% change';
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
    
    FinanceGraph.prototype.defaultOptions = {
        dataObj:null
    }
    
    $.fn.financeGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("financeGraph", new FinanceGraph(this, options));
        });
    }
    
    return FinanceGraph;
    
});