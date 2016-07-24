var PieChart = function(globalEnergyConsumptionData) {

  var container = document.getElementById('pieChart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'pie',
      renderTo: container
    },

    title: {
      text: "Total global energy consumption"
    },

    series: [

      {

      name: "test",
      data: globalEnergyConsumptionData

      }

    ]

  })

};