({
    baseUrl: ".",
    name: "main",
    out: "main-built.js",
    paths: {
        component: '../components',
        async: '../components/requirejs-plugins/src/async',
        jquery:'../components/jquery/jquery.min',
        jqueryui:'../components/jquery-ui/ui/minified/jquery-ui.min', 
        bootstrap:'../components/bootstrap/dist/js/bootstrap.min',
        underscore:'../components/underscore/underscore-min',
        text:'../components/requirejs-text/text',
        highcharts:'../components/highcharts.com/js/highcharts',
        d3:'../components/d3/d3.min',
        apicalls:'empty:'
    },
    optimize: 'none'
})