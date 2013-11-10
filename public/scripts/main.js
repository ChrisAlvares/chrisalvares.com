requirejs.config({
    //By default load any module IDs from js
    baseUrl: 'scripts',
    paths: {
        component: '../components',
        async: '../components/requirejs-plugins/src/async',
        jquery:'../components/jquery/jquery',
        jqueryui:'../components/jquery-ui/ui/minified/jquery-ui.min', 
        bootstrap:'../components/bootstrap/dist/js/bootstrap.min',
        underscore:'../components/underscore/underscore-min',
        text:'../components/requirejs-text/text',
        highcharts:'../components/highcharts.com/js/highcharts.src',
        d3:'../components/d3/d3.min'
        apicalls:'/apicalls?extension='
    },
    shim: {
         bootstrap: ["jquery"],
         underscore:{
             exports:"_"
         },
         d3:{
             exports:"d3"
         }
    }
});

// Start the main app logic.
requirejs(['jquery', 'underscore', 'bootstrap', 'controller/dashboardcontroller'],
function($, _, bootstrap, DashboardController) {
    $(document).ready(function() {
        var d = new DashboardController();
        d.load();
    });
});