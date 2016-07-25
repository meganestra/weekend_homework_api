var LineChart = function(countrydata) {

  var container = document.getElementById('lineChart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'line',
      renderTo: container
    },

    title: {
      text: ""
    },

    xAxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34']
    },

    yAxis: {
      title: {
        text: 'annual energy consumption (quadrillion btu)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },

    series: countrydata,

  });

};