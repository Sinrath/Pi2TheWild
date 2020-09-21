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
        title: 'Air Pressure'
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
            '#2f89fc'
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
            
            //for(var index in fetch_result.arraydate) {
              //  chart.addData(fetch_result.arraydate[index], [fetch_result.arraytemp[index]]);    
            //}

            var data = {
                categories: fetch_result.arraydate,
                series: [
                    {
                    name: fetch_result.arrayId[0].toString(),
                    data: fetch_result.arraypressure
                    },
                ]
            };

            var container = document.getElementById('chart-area')
            tui.chart.lineChart(container, data, options);
        })
    );
}
loadDataDefault();