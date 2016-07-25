var PieChart = function(globalEnergyConsumptionData) {

  var container = document.getElementById('pieChart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'pie',
      renderTo: container
    },

    title: {
      text: "total global energy consumption - quadrillion btu"
    },

    series: [{

      name: "total annual energy consumption (Quadrillion Btu)",
      data: globalEnergyConsumptionData

    }],

    credits: {
      enabled: false
    }
  })

  Highcharts.setOptions({
      chart: {
          style: {
              fontFamily: 'Quantico'
          }
      }
  });

};