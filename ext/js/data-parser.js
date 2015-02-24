Dropzone.autoDiscover = false;

$(function() {
  // Now that the DOM is fully loaded, create the dropzone, and setup the
  // event listeners
  var myDropzone = new Dropzone("div#dropzone", { url: "/file/post"});
  myDropzone.acceptedFiles=".csv";
  myDropzone.clickable=true;
  myDropzone.previewTemplate="";
  myDropzone.on("addedfile", function(file) {
    handleFileSelect(file, function dataParsed(error) { 
      $("div#instructions-section").hide();
      $("div#display-section").show();
    });
  });
  
  //Hide the data display. 
  $("div#display-section").hide();
})

function handleFileSelect(file, callback) {
  var reader = new FileReader();
  
  reader.addEventListener("loadend", function fileLoaded(error) {
    var text = reader.result;
    parseCSV(text, function fileParsed(error, parsedStuff) {   
          callback(null)   
          loadCharts(parsedStuff)
    });  
  });
    
  // Read in the text.
  reader.readAsText(file);
}

/**
 * OBJECTS
 */

function Ride(date, type, operator, route, description, amount) {
  this.operator = operator;
  this.description = description;  
  this.route = route;
  this.date = date;
  this.amount = amount;
  
  this.isBusRide = function isBusRide() {
    return this.operator == "CTA Bus";
  }
  
  this.isTrainRide = function isTrainRide() {
    return this.operator == "CTA Rail";
  }
  
  this.isCTARide = function isCTARide() {
    return (this.operator == "CTA Rail" || this.operator == "CTA Bus");
  }
  
  this.isPaceRide = function isPaceRide() {
    return !this.isPaceRide();
  }
  
  this.trainLine = function trainLine() {
    var splits = this.route.split("-")
    return splits[0]
  }
}

function Load(date, operator, description, amount) {
  this.date = date;
  this.operator = operator;
  this.description = description;
  this.amount = amount;  
}

function parseCSV(csvString, callback) {
  
  var lineArrays = $.csv.toArrays(csvString);
  var loads = [];
  var rides = [];
  
  //Skip first line
  for (var i = 1; i < lineArrays.length; i++) {
    var lineArray = lineArrays[i];
    
    // 0 "Transaction Date/Time",
    // 1 "Transaction Type",
    // 2 "Operator",
    // 3 "Location / Route",
    // 4 "Description",
    // 5 "Amount"

    var dateString = lineArray[0];
    var type = lineArray[1];
    var operator = lineArray[2];
    var route = lineArray[3];
    var description = lineArray[4];
    var amount = lineArray[5];
    
    //Make string a datetime - dates are in format 02/03/2015  9:33:29 AM
    var dateFormat = "MM/DD/YYYY  H:mm:ss A"
    var date = moment(dateString, dateFormat);
    
    //Strip out $ from amount.
    var amountBits = amount.split("$");
    var strippedAmount = amountBits.join("");
    
    if (type === "Sale") {
      var load = new Load(date, operator, description, strippedAmount)
      loads.push(load)
    } else {
      var ride = new Ride(date, type, operator, route, description, strippedAmount);
      rides.push(ride)
    }
  }
  
  callback(null, { loads: loads, rides: rides });
}
