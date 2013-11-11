
define(['jquery', 'views/financegraph'], function($) {
   
   var DashboardController = function() {
       
   } 
   
   DashboardController.prototype.load = function() {
       this.reload();
   }
   
   DashboardController.prototype.reload = function() {
       $(".finance-graph").financeGraph();
       
       
   }
   
   
   return DashboardController;
   
});