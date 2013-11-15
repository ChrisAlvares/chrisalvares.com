/*
 * The main dashboard controller.
 * @since 1.0
 */


define(['jquery', 'views/financegraph'], function($) {
   
   var DashboardController = function() {
       
   } 
   
   DashboardController.prototype.load = function() {
       this.reload();
   }
   
   DashboardController.prototype.reload = function() {
       $(".finance-graph").financeGraph();
   }
   
   DashboardController.prototype.clear = function() {
       $(".finance-graph").html("").data("financeGraph", null);
   }
   
   return DashboardController;
   
});