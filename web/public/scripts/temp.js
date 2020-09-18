var container = document.getElementById('chart-area');
var data = {
    categories: [],
    series: [
        {
        name: 'Pi-0001',
        data: [25]
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
                    name: 'Pi-0001',
                    data: fetch_result.arraytemp
                    }
                ]
            };

            var container = document.getElementById('chart-area')
            tui.chart.lineChart(container, data, options);
        })
    );
}
loadDataDefault();