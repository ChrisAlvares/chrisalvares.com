({
    baseUrl: ".",
    name: "main",
    out: "main-build-dev.js",
    paths: {
        component: '../components',
        async: 'empty:',
        jquery:'empty:',
        jqueryui:'empty:', 
        bootstrap:'empty:',
        underscore:'empty:',
        text:'empty:',
        highcharts:'empty:',
        d3:'empty:',
        apicalls:'empty:'
    },
    optimize: 'closure',
    include:'../components/requirejs/require.js'
})