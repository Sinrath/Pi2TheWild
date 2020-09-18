var container = document.getElementById('chart-area');
var data = {
    categories: ['08/09/2020', '09/09/2020', '10/09/2020', '11/09/2020', '12/09/2020', '13/09/2020', '14/09/2020'],
    series: [
        {
        name: 'Pi-0001',
        data: [45, 50.3, 55.8, 45.3, 65.3, 23.9, 56.9]
        },
        {
        name: 'Pi-0002',
        data: [50.9, 60.2, 64.0, 62.1, 57.4, 56.3, 62.5]
        }
    ]
};
var options = {
    chart: {
        width: 1200,
        height: 400,
        title: 'Average Humidity each Day'
    },
    yAxis: {
        title: 'Humidity (%)',
    },
    xAxis: {
        title: 'Time',
        pointOnColumn: true,
        dateFormat: 'MMM',
        tickInterval: 'auto'
    },
    series: {
        zoomable: true,
        showDot: true,
        zoomable: true
    },
    tooltip: {
        suffix: '%'
    },
    plot: {
        bands: [
            {
                range: ['08/09/2020', '14/09/2020'],
                color: 'white',
                opacity: 0.2
            }
        ],
    }
};
var theme = {
    series: {
        colors: [
            '#ffd460', 
            '#f07b3f'
        ]
    }
};
// For apply theme
tui.chart.registerTheme('myTheme', theme);
options.theme = 'myTheme';
var chart = tui.chart.lineChart(container, data, options);