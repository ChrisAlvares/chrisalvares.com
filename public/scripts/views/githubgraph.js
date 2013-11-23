/*
 * This is the finance graph which has my assets, debt and net incomes
 * @since 1.0
 */

define(['jquery'], function($) {
    
    var GithubIssuesGraph = function(container, opts) 
    {
        this.container = $(container);
        this.options = $.extend(true, this.defaultOptions, opts);
        
        this.options.dataObj == null || this.registerDataObj(this.options.dataObj);
    }
    
    GithubIssuesGraph.prototype.registerDataObj = function(dataObj) {
        $(dataObj).on('didRecieveResponse', $.proxy(this.renderWithData, this));    
    }
        
    GithubIssuesGraph.prototype.renderWithData = function(event, dataObj, data)
    {
        this.data = data;
        var issues = (typeof data.issues !== 'undefined')?data.issues:0;
        $(this.container).html(issues);
    }
    
    GithubIssuesGraph.prototype.defaultOptions = {
        dataObj:null
    }

    $.fn.githubIssuesGraph = function(options)
    {
        return $(this).each(function() {
            $(this).data("githubIssuesGraph", new GithubIssuesGraph(this, options));
        });
    }
    
    return GithubIssuesGraph;
    
});