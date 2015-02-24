function DataDisplay(aLoads, aRides) {
  var loads;
  var rides;
  var monthsPlay;
  var monthNamesInPlay;
  var ridesMonth;
  var amountByMonth;

  /*********
   * SETUP *
   *********/

  this.sortByDate = function(stuffWithDates) {
    if (stuffWithDates.length === 0) {
      return stuffWithDates;
    } else {
      var sorted = stuffWithDates.sort(function (leftSide, rightSide) {
        if (leftSide.date.isAfter(rightSide.date)) {
          return 1;
        } else if (leftSide.date.isBefore(rightSide.date)) {
           return -1;
        } else {
          return 0;
        }
      }); 
      
      return sorted;
    }
  }

  //Sort by date before assigning to members. 
  this.loads = this.sortByDate(aLoads);
  this.rides = this.sortByDate(aRides);
  
  console.log(this.rides);
  
  /**************
   * LOADS INFO *
   **************/

  this.loadDates = function() {
    var transactionDates = [];
    for (var i = 0; i < this.loads.length; i++) {
      var load = this.loads[i];
      transactionDates.push(load.date);
    }
    
    return transactionDates;
  }
  
  this.totalLoadAmount = function() {
    var total = 0;
    for (var i = 0; i < this.loads.length; i++) {
      load = this.loads[i];
      total += parseFloat(load.amount);
    }
    
    return total;
  }

  /**************
   * RIDES INFO *
   **************/

  //AMOUNT

  this.spendAmountForRides = function(ridesForSpending) {
    var total = 0;
    for (var i = 0; i < ridesForSpending.length; i++) {
      var ride = ridesForSpending[i];
      var cost = parseFloat(ride.amount);
      total -= cost;
    }
    
    return total;
  }

  this.totalSpend = function() {
    return this.spendAmountForRides(this.rides);
  }

  //DATE
  
  this.rideDates = function() {
    var dates = [];
    for (var i = 0; i < this.rides.length; i++) {
      var ride = this.rides[i];
      dates.push(ride.date);
    }
    
    return dates;
  }

  this.oldestRideDate = function() {
    var allRideDates = this.rideDates();
    return allRideDates[0];
  }
  
  this.newestRideDate = function() {
    var allDates = this.rideDates();
    var lastIndex = allDates.length - 1;
    return allDates[lastIndex];
  }
  
  //TYPE 
  
  function rideTypesForRides(ridesForTyping) {
    var busRides = 0;
    var trainRides = 0;
    var unknownRides = 0;
    
    for (var i = 0; i < ridesForTyping.length; i++) {
      var ride = ridesForTyping[i];      
      if (ride.isBusRide()) {
        busRides++;
      } else if (ride.isTrainRide()) {
        trainRides++;
      } else {
        unknownRides++;
      }
    }
    
    return { bus: busRides, train: trainRides, unknown: unknownRides };
  }
  
  this.overallRideTypeCounts = function() {
    return this.rideTypeCountsForRides(this.rides);
  }

  //TIME & DATE
  
  //Month
  
  this.monthsInPlay = function() {
    if (this.monthsPlay != null) {
      return this.monthsPlay;
    }
    
    this.monthsPlay = [];
    
    var firstMonth = this.oldestRideDate().month()
    var lastMonth = this.newestRideDate().month();
    
    if (firstMonth > lastMonth) {
      lastMonth += 12; //
    }
    
    for (var i = firstMonth; i < lastMonth; i++) {
      this.monthsPlay.push(i);
    }
    
    return this.monthsPlay;
  }
  
  this.allMonthLabels = function() {
    //If we've already figured this out, just return it. 
    if (this.monthNamesInPlay != null) {
      return this.monthNamesInPlay
    }
    
    var months = this.monthsInPlay();
    this.monthNamesInPlay = [];
    
    var monthNamesRaw = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    for (var i = 0; i < months.length; i++) {
      var month = months[i];      
      var monthIndex = month % 12; 
      var selectedMonthName = monthNamesRaw[month];
      if (selectedMonthName != null) {
	      this.monthNamesInPlay.push(selectedMonthName);
      }  
    }
    
    return this.monthNamesInPlay;    
  }
  
  this.ridesByMonth = function() {
    if (this.ridesMonth != null) {
      return this.ridesMonth;
    }
    
    var months = this.monthsInPlay();
    this.ridesMonth = [];
    for (var i = 0; i < months.length; i++) {
      var month = months[i];
      var actualMonth = month % 12;
      var ridesForActualMonth = this.ridesForMonth(actualMonth);
      this.ridesMonth.push(ridesForActualMonth);
    }
    
    return this.ridesMonth;
  }
  
  this.costByMonth = function() {
    if (this.amountByMonth != null) {
      return this.amountByMonth;
    }
    
    var months = this.monthsInPlay();
    this.amountByMonth = [];
    for (var i = 0; i < months.length; i++) {
      var month = months[i];
      var actualMonth = month % 12;
      var amount = this.spendAmountForMonth(actualMonth);
      this.amountByMonth.push(amount);
    }
    
    return this.amountByMonth;
  } 
  
  //NOTE: Month is zero-indexed! 0 = january, 11 = december
  this.ridesForMonth = function(month) {
    var monthRides = [];
    for (var i = 0; i < this.rides.length; i++) {
      var ride = this.rides[i];
      if (ride.date.month() == month) {
        monthRides.push(ride);
      }
    }
    
    return monthRides;    
  }
  
  this.spendAmountForMonth = function(spendMonth) {
    var ridesForSpendAmount = this.ridesForMonth(spendMonth);
    
    return this.spendAmountForRides(ridesForSpendAmount);
  }
  
  this.rideTypeCountsForMonth = function(typeMonth) {    
    var ridesForTypeCount = this.ridesByMonth(typeMonth);
    return this.rideTypeCountsForRides(ridesForTypeCount);
  }
  
  
  //Day
  
  this.allDayLabels = function() {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  
  //1 = monday 7 = sunday
  this.ridesForDayOfWeek = function(dayOfWeek) {
    var dayRides = [];
    for (var i = 0; i < this.rides.length; i++) {
      var ride = this.rides[i];      
      if(ride.date.isoWeekday() == dayOfWeek) {
        dayRides.push(ride);
      }
    }
    
    return dayRides;
  }
  
  this.spendAmountForDay = function(dayOfWeek) {
    return this.rideTypeCountsForRides(this.ridesForDayOfWeek(dayOfWeek))
  }
   
  this.rideTypeCountsForDay = function(dayOfWeek) {
    return this.rideTypeCountsForRides(this.ridesForDayOfWeek(dayOfWeek))
  }
}