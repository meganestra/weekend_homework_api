// -----------------------
// load window and invoke global energy data and countries data functions.
// -----------------------

window.onload = function () {

    getGlobalEnergyData();
    getCountriesData();

};

// -----------------------
// get the global energy data child series ids and invoke the country level energy data function.
// -----------------------

var getGlobalEnergyData = function() {

    var globalEnergyDataUrl = 'http://api.eia.gov/category/?api_key=A3C1692494277DA639124A9E622A29A4&category_id=2123040';
    var globalEnergyDataRequest = new XMLHttpRequest();
    globalEnergyDataRequest.open("GET", globalEnergyDataUrl);
    globalEnergyDataRequest.onload = function() {
        if (globalEnergyDataRequest.status === 200) {
            var jsonStringGlobalEnergyData = globalEnergyDataRequest.responseText;
            var globalEnergyData = JSON.parse(jsonStringGlobalEnergyData);
            var globalEnergyDataRef = globalEnergyData.category.childseries;
            getCountryEnergyData(globalEnergyDataRef);

        };
    };
    globalEnergyDataRequest.send();
};

// -----------------------
// get the country level energy data.
// -----------------------

var getCountryEnergyData = function(globalEnergyDataRef) {

    var allCountryEnergyData = [];

    globalEnergyDataRef.forEach(function(element, index){

        if (index < 100) {

            var countryEnergyDataUrl = 'http://api.eia.gov/series/?api_key=A3C1692494277DA639124A9E622A29A4&series_id=' + element.series_id;
            var countryEnergyDataRequest = new XMLHttpRequest();
            countryEnergyDataRequest.open("GET", countryEnergyDataUrl);
            countryEnergyDataRequest.onload = function() {
                if (countryEnergyDataRequest.status === 200) {

                    var jsonStringCountryEnergyData = countryEnergyDataRequest.responseText;
                    
                    countryEnergyData = JSON.parse(jsonStringCountryEnergyData);

                    allCountryEnergyData.push(countryEnergyData);

                };

                new PieChart(createPieChartData(allCountryEnergyData));

                // main(allCountryEnergyData);

                updateDisplay(countryEnergyData);

            };

            countryEnergyDataRequest.send(null);

        };
    });
    return allCountryEnergyData
};

// -----------------------
// get the countries data.
// -----------------------

var getCountriesData = function() {

    var countryDataUrl = 'https://restcountries.eu/rest/v1';
    var countryDataRequest = new XMLHttpRequest();
    countryDataRequest.open("GET", countryDataUrl);
    countryDataRequest.onload = function() {
        if (countryDataRequest.status === 200) {
            var jsonStringCountryData = countryDataRequest.responseText;
            var countries = JSON.parse(jsonStringCountryData);
        };
    };
    countryDataRequest.send(null);
};

// -----------------------
// -----------------------

var updateDisplay = function(countryEnergyData) {

    // console.log("Table data", countryEnergyData);

    // -----------------------
    // global energy cons table for all countries
    // -----------------------

    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var nameData = countryEnergyData.series[0].name.replace("Total Primary Energy Consumption, ", "");
    var formattedNameData = nameData.replace(", Annual", "");
    cell1.innerHTML = formattedNameData;
    cell2.innerHTML = countryEnergyData.series[0].data[0][1].toFixed(3);

    // -----------------------
    // select dropdown
    // -----------------------

    var select = document.getElementById('mySelect');
    var option = document.createElement('option');
    option.innerText = formattedNameData;
    select.appendChild(option);

};

// -----------------------
// -----------------------

var createPieChartData = function(allCountryEnergyData) {

    // console.log("Chart Data", countryEnergyData);

    var data = [];

    allCountryEnergyData.forEach(function(country) {

        var yData = country.series[0].data[0][1].toFixed(3);
        var yDataToNumber = parseFloat(yData);

        var nameData = country.series[0].name.replace("Total Primary Energy Consumption, ", "");
        var formattedNameData = nameData.replace(", Annual", "");

        result = {name: formattedNameData, y: yDataToNumber};

        data.push(result);

    });

    return data;

};

// -----------------------
// -----------------------

// var createLineChartData = function(selectedCountry) {

//     var seriesData = [];
//     var data = [];

//     selectedCountry.series[0].data.forEach(function(year) {

//         data.push(year[1]);

//     });

//     return data;

//     var nameData = country.series[0].name.replace("Total Primary Energy Consumption, ", "");
//     var formattedNameData = nameData.replace(", Annual", "");

//     result = {name: formattedNameData, data: data};

//     seriesData.push(result);

//     return seriesData;

// };

// -----------------------
// -----------------------

// var main = function (allCountryEnergyData) {
//     populateSelect(allCountryEnergyData);
//     console.log("main function", allCountryEnergyData);
//     var cached = localStorage.getItem("selectedCountry");
//     var selected = allCountryEnergyData[0];
//     if(cached){
//         selected = JSON.parse(cached);
//         document.querySelector('#mySelect').selectedIndex = selected.index;
//     };
//     createLineChartData(selected);
// };

// -----------------------
// -----------------------

// var populateSelect = function (allCountryEnergyData) {
//     var parent = document.querySelector('#mySelect');
//     allCountryEnergyData.forEach(function (country, index) {
//         country.index = index;
//         var option = document.createElement("option");
//         option.value = index.toString();

//         var nameData = country.series[0].name.replace("Total Primary Energy Consumption, ", "");
//         var formattedNameData = nameData.replace(", Annual", "");

//         option.text = formattedNameData;
//         parent.appendChild(option);
//     });
//     parent.style.display = 'block';
//     parent.addEventListener('change', function (event) {
//         var index = this.value;
//         var country = allCountryEnergyData[index];
//         updateDisplay(country);
//         localStorage.setItem("selectedCountry",JSON.stringify(country));
//     });
// };























