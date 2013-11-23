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
        d3:'../components/d3/d3.min',
        apicalls:'/apicalls?extension='
    },
    shim: {
         bootstrap: ["jquery"],
         highcharts: ["jquery"],
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

    window.number_format = function(number, decimals, dec_point, thousands_sep) {
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
    }


});