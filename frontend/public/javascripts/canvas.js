google.charts.load("current", {packages:["corechart"], callback:init});
google.charts.setOnLoadCallback(drawChart);


function init() {
    const socket = io();
    let coordY = 0;
    let coordX = 0;
    let coordinates = [coordY, coordX];
    drawChart(coordinates);
    socket.on('coords', (message, channel) => {
        switch (channel) {
            case "coordsX":
                console.log(message, channel);
                coordinates[1] = message;
                console.log(message, channel);
                break;
            case "coordsY":
                coordinates[0] = message;
                console.log(message, channel);
                break;
            default:
                coordY = 0;
                coordX = 0;
        }
                console.log(coordinates);
        drawChart(coordinates);
    });
}

function drawChart(coords) {
    // if(messageX === null || messageY === null) {
    //     messageY = 0;
    //     messageX = 0;
    // }
    var data = google.visualization.arrayToDataTable([
        [{label: 'Y', type: 'number'},
         {label: 'X', type: 'number'}],
        [coords[0], coords[1]]
    ]);

    var options = {
        hAxis: {title: 'X', minValue: -100, maxValue: 100},
        vAxis: {title: 'Y', minValue: -100, maxValue: 100},
        legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(data, options);
    }

// function drawChart() {
//     var data = new google.visualization.DataTable();
//     data.addColumn('number');
//     data.addColumn('number');
//
//     var radius = 100;
//     // for (var i = 0; i < 6.28; i += 0.1) {
//     //     data.addRow([radius * Math.cos(i), radius * Math.sin(i)]);
//     // }
//
//     // Our central point, which will jiggle.
//     // data.addRow([100, 100]);
//     // data.addRow([100, -100]);
//     // data.addRow([-100, 100]);
//     // data.addRow([-100, -100]);
//     data.addRow([-30, -30]);
//     data.addRow([50, -50]);
//     data.addRow([50, 50]);
//
//     var options = {
//         hAxis: {title: 'X', minValue: -100, maxValue: 100},
//         vAxis: {title: 'Y', minValue: -100, maxValue: 100},
//         legend: 'none',
//         colors: ['#087037'],
//         pointShape: 'square',
//         pointSize: 5,
//         animation: {
//             duration: 200,
//             easing: 'inAndOut',
//         }
//     };
//
//     var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
//
//     // // Start the animation by listening to the first 'ready' event.
//     // google.visualization.events.addOneTimeListener(chart, 'ready', randomWalk);
//     //
//     // // Control all other animations by listening to the 'animationfinish' event.
//     // google.visualization.events.addListener(chart, 'animationfinish', randomWalk);
//
//     chart.draw(data, options);
//
//     // function randomWalk() {
//     //     var x = data.getValue(data.getNumberOfRows() - 1, 0);
//     //     var y = data.getValue(data.getNumberOfRows() - 1, 1);
//     //     x += 5 * (Math.random() - 0.5);
//     //     y += 5 * (Math.random() - 0.5);
//     //     if (x * x + y * y > radius * radius) {
//     //         // Out of bounds. Bump toward center.
//     //         x += Math.random() * ((x < 0) ? 5 : -5);
//     //         y += Math.random() * ((y < 0) ? 5 : -5);
//     //     }
//     //     data.setValue(data.getNumberOfRows() - 1, 0, x);
//     //     data.setValue(data.getNumberOfRows() - 1, 1, y);
//     //     chart.draw(data, options);
//     // }
// }
