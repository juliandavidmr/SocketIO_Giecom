
console.log("Datos2: " + data.length);
socket.on('l', function(data) {
  console.log("Datos: " + data.length);
  l = data;
});

socket.on('sensores', function(data) {
  sensores = data;
});


var data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  series: [
    {
      data: [1, 2, 3, 5, 8, 13]
    },
    {
      data: [0, 3, 5, 4, 3, 11]
    },
    {
      data: [3, 5, 9, 7, 4, 2]
    }
  ]
};

var options = {
  chartPadding: 5,
  axisX: {
    offset: 10,
    labelInterpolationFnc: function(value) {
      return 'Week ' + value;
    }
  },
  axisY: {
    offset: 10
  }
};

var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    showPoint: false,
    lineSmooth: false
  }],
  ['screen and (max-width: 640px)', {
    showLine: false,
    axisX: {
      labelInterpolationFnc: function(value) {
        return 'W' + value;
      }
    }
  }]
];

var chart = Chartist('#chartist-chart', data, options, responsiveOptions);

$(window).on('resize', function() {
  chart.update();
});
