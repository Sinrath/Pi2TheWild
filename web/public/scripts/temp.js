var container = document.getElementById('chart-area');
var data = {
    categories: ['08/09/2020', '09/09/2020', '10/09/2020', '11/09/2020', '12/09/2020', '13/09/2020', '14/09/2020'],
    series: [
        {
        name: 'Pi-0001',
        data: [25.3, 23.4, 26.8, 29.3, 21.3, 19.9, 23.9]
        },
        {
        name: 'Pi-0002',
        data: [22.9, 20.2, 24.0, 22.1, 27.4, 26.3, 22.5]
        }
    ]
};
var options = {
    chart: {
        width: 1200,
        height: 400,
        title: 'Average Temperature each Day'
    },
    yAxis: {
        title: 'Temperature (°C)',
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
        suffix: '°C'
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