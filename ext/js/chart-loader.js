var dataDisplay;

chrome.runtime.onMessage.addListener(function(parsedData) {
    console.log("LOADED DATA!!!!!!!");
    dataDisplay = new DataDisplay(parsedData.loads, parsedData.rides);
});


$(function() {  
  //Setup chart prefs
  Chart.defaults.global.responsive = true;  
});


//Move everything into one page
//wrap divs
//display: none when hidden
//display: block when not
//cram all the scripts into one HTML file