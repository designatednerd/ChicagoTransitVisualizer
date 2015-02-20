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
          displayData(parsedStuff)
          callback(null)
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
  this.date = dateString;
  this.operator = operator;
  this.description = description;
  this.amount = amount;  
}

function parseCSV(csvString, callback) {
  var lines = csvString.split("\n");  
  var loads = [];
  var rides = [];
  
  //Skip first line
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i];
    
    // 0 "Transaction Date/Time",
    // 1 "Transaction Type",
    // 2 "Operator",
    // 3 "Location / Route",
    // 4 "Description",
    // 5 "Amount"

    var items = line.split(",")
    var dateString = items[0];
    var type = items[1];
    var operator = items[2];
    var route = items[3];
    var description = items[4];
    var amount = items[5];
    
    //Make string a datetime - dates are in format 02/03/2015  9:33:29 AM
    var dateFormat = "MM/dd/yyyy  h:mm:ss a"
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
