var container = document.getElementById('chart-area');
var data = {
    categories: ['18.09.2020'],
    series: [
        {
        name: 'Pi-0001',
        data: [25]
        },
        {
        name: 'Pi-0002',
        data: [27]
        }
    ]
};
var options = {
    chart: {
        width: 1200,
        height: 400,
        title: 'Humidity'
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
        suffix: '°C'
    },
    plot: {
        bands: [
            {
                range: ['17/09/2020', '18/09/2020'],
                color: 'white',
                opacity: 0.2
            }
        ],
    }
};
var theme = {
    series: {
        colors: [
            '#34bf49'
        ]
    }
};
// For apply theme
tui.chart.registerTheme('myTheme', theme);
options.theme = 'myTheme';

function loadDataDefault () {
    fetch("/measurement").then((result) =>
        result.json().then(function (fetch_result) {
            console.log(fetch_result);
            
            var data = {
                categories: fetch_result.arraydate,
                series: [
                    {
                    name: fetch_result.arrayId[0].toString(),
                    data: fetch_result.arrayhumidity
                    },
                ]
            };

            var container = document.getElementById('chart-area')
            tui.chart.lineChart(container, data, options);
        })
    );
}
loadDataDefault();