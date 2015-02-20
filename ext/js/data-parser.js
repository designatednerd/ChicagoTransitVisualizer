//TODO: Store result of this in local storage.
//Clear local storage on page close on other thing. 
function handleFileSelect(evt, callback) {
  var file = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  
  // Read in the text.
  var text = reader.readAsText(file);
  callback(null, parseCSV(text))
}

/**
 * OBJECTS
 */

function Ride(date, type, operator, route, description, amount) {
  this.operator = operator;
  this.description = description;  
  this.route = route;
  this.date = date;

  //TODO: Strip out $.
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
    
  }
  
  this.trainLine = function trainLine() {
    var splits = this.route.split("-")
    return splits[0]
  }
}

function Load(date, operator, description, amount) {
  this.date = dateString;
  this.operator = description;
  
}

function parseCSV(csvString) {
  var lines = csvString.split("\n");  
  var loads = [];
  var rides = [];
  for (line in lines) {
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
    
    //TODO: Convert dateString to date
    var date = dateString;
    
    if (type == "Sale") {
      var load = new Load(date, operator, description, amount)
      loads.push(load)
    } else {
      var ride = new Ride(date, type, operator, route, description, amount);
      rides.push(ride)
    }
  }
  
  return { loads: loads, rides: rides }
}
