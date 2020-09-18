var container = document.getElementById('chart-area');
var data = {
    categories: ['08/09/2020', '09/09/2020', '10/09/2020', '11/09/2020', '12/09/2020', '13/09/2020', '14/09/2020'],
    series: [
        {
        name: 'Pi-0001',
        data: [1021.3, 1021.8, 1022.1, 1022.3, 1022.7, 1021.6, 1021.1]
        },
        {
        name: 'Pi-0002',
        data: [1020.7, 1019.8, 1021.3, 1022.3, 1022.9, 1022.6, 1021.9]
        }
    ]
};
var options = {
    chart: {
        width: 1200,
        height: 400,
        title: 'Average Air Pressure each Day'
    },
    yAxis: {
        title: 'Air Pressure (hPa)',
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
        suffix: 'hPa'
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