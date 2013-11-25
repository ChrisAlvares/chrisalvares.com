/*
 * The main dashboard controller.
 * @since 1.0
 */


define([
      'jquery'
    , 'data/genericdata'
    , 'apicalls'
    , 'views/financegraph'
    , 'views/githubgraph'
    , 'views/caloriecounter',
    , 'views/weightgraph'
    , 'views/productivitygraph'
], function($, DataGetter, apicalls) {
   
   var DashboardController = function() {
       this.data = {
           finance:null,
           github:null,
           fitbit:null,
           productivity:null
       };
   } 
   
   DashboardController.prototype.load = function() {

       this.data.finance = new DataGetter({url:apicalls.finance}); 
       this.data.github = new DataGetter({url:apicalls.github}); 
       this.data.fitbit = new DataGetter({url:apicalls.fitbit}); 
       this.data.productivity = new DataGetter({url:apicalls.productivity});
       this.render();


       this.reload();
   }
   
   DashboardController.prototype.render = function() {
       $(".finance-graph").financeGraph({dataObj:this.data.finance});
       $(".github-issues").githubIssuesGraph({dataObj:this.data.github});
       $(".calorie-counter").calorieCounterGraph({dataObj:this.data.fitbit});
       $(".weight-graph").weightGraph({dataObj:this.data.fitbit});
       $(".productivity-graph").productivityGraph({dataObj:this.data.productivity});
   }   
   
   DashboardController.prototype.reload = function() {
       for(var key in this.data) {
           this.data[key].get();
       }
       
       
   }
   
   DashboardController.prototype.clear = function() {
       $(".finance-graph").html("").data("financeGraph", null);
   }
   
   return DashboardController;
   
});