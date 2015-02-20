var dataDisplay;
var taxPercentage;

function loadCharts(parsedData) {
  dataDisplay = new DataDisplay(parsedData.loads, parsedData.rides);
  taxPercentage = 0;
  
  loadMonthlyPassAnalysis()
}

function barChartOptions() {
  return {
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : false,
    //Boolean - If there is a stroke on each bar
    barShowStroke : false,
    scaleFontFamily: "'Montserrat', sans-serif",

  }
}

function loadMonthlyPassAnalysis() {  
  //Calculate pass cost when accounting for percentage of taxes. 
  var monthlyPassDollars = 100;
  var incomePercentage = 100 - taxPercentage;
  var multiplier = incomePercentage / 100;  
  var passDollarsAdjustedForTaxPercentage = monthlyPassDollars * multiplier;
  
  var monthlyData = {
    labels : dataDisplay.allMonthLabels(),
    datasets : [ 
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: dataDisplay.costByMonth()
        },
    ]
  };

 
  // Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.
  var monthlyPassBars = new Chart(ctx).Bar(monthlyData, barChartOptions());  
}

function adjustTaxPercentage(percentage) {
  taxPercentage = parseFloat(percentage);
  loadMonthlyPassAnalysis()
}