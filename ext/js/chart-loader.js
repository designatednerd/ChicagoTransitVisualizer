var dataDisplay;

function loadCharts(parsedData) {
  dataDisplay = new DataDisplay(parsedData.loads, parsedData.rides);
}