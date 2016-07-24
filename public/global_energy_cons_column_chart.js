var GlobalEnergyConsColumnChart = function(globalEnergyConsumptionData) {

  var container = document.getElementById('globalEnergyColumnChart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'column',
      renderTo: container
    },

    title: {
      text: "Total global energy consumption"
    },

    series: globalEnergyConsumptionData,

    xAxis: {
      categories: []
    }

  })

};