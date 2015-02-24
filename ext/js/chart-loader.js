var dataDisplay;
var taxPercentage;

function loadCharts(parsedData) {
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.maintainAspectRatio = false;
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
  
  var labels = dataDisplay.allMonthLabels();
  var cost = dataDisplay.costByMonth();
  
  var monthlyData = {
    labels: labels,
    datasets: [ 
        {
            label: "My First dataset",
            fillColor: "rgba(41,165,165,1)",
//             strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(41,165,165,0.75)",
//             highlightStroke: "rgba(220,220,220,1)",
            data: cost
        },
    ]
  };
 
  renderBar(monthlyData, "monthly-pass-chart", 800, 400);
  // Get context with jQuery - using jQuery's .get() method.
/*
  var ctx = $("#monthly-pass-chart").get(0).getContext('2d');
  
  var chartInstance = new Chart(ctx);
  
  // This will get the first returned node in the jQuery collection.
  new chartInstance.Bar(monthlyData, barChartOptions());  
*/
  
  
}

/**
 * Renders the charts in specified Divs
 * @param data
 * @param idOfCanvas
 */
function renderBar(data, idOfCanvas, width, height) {
    var $canvas = $('#' + idOfCanvas);
    var $parent = $canvas.parent(); 
    /** 
    *   Canvas needs to be removed and re-rendered before we draw the chart
    *   Reason: When Chart is rendered and Window is Zoomed Out, On hovering the chart produces
    *   glitch in the chart
    */
    $canvas.remove();
    $parent.prepend("<canvas width='" + width + "' height='" + height + "' id='" + idOfCanvas + "'>");
    
    var ctx = $parent.find('#' + idOfCanvas).get(0).getContext("2d");
    var chart = new Chart(ctx).Bar(data, barChartOptions());
    var legend = chart.generateLegend();
    $('#' + idOfCanvas + '-legend').html(legend);
}

function adjustTaxPercentage(percentage) {
  taxPercentage = parseFloat(percentage);
  loadMonthlyPassAnalysis()
}