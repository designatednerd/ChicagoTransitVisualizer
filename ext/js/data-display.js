function DataDisplay(loads, rides) {
  
  /*********
   * SETUP *
   *********/
   
  function sortByDate(stuffWithDates) {
    if (stuffWithDates.length == 0) {
      return stuffWithDates;
    } else {
      return stuffWithDates.sort(function(leftSide, rightSide) {
        return leftSide.date.getTime() - rightSide.date.getTime();
      });
    }
  }
  
  //Sort by date before assigning to members. 
  this.loads = sortByDate(loads);
  this.rides = sortByDate(rides)

  /**************
   * LOADS INFO *
   **************/
  
  this.loadDates = function loadDates() {
    var loadDates = [];
    for (load in this.loads) {
      loadDates.push(load.date);
    }
    
    return loadDates;
  }
  
  this.totalLoadAmount = function totalLoadAmount() {
    var total = 0;
    for (load in this.loads) {
      total += parseFloat(load.amount);
    }
    
    return total;
  }
  
  /**************
   * RIDES INFO *
   **************/
  
  //AMOUNT
  
  this.spendAmountForRides(rides) = function spendAmountForRides(rides) {
    var total = 0;
    for (ride in rides) {
      total += parseFloat(ride.amount);
    }
    
    return total;
  }
  
  this.totalSpendAmount = function totalSpend() {
    return this.spendAmountForRides(this.rides);
  }
  
  //DATE
  
  this.rideDates = function rideDates() {
    var rideDates = [];
    for (ride in this.rides) {
      rideDates.push(ride.date);
    }
    
    return rideDates;
  }

  this.oldestRideDate = function oldestRideDate() {
    return this.rideDates[0];
  }
  
  this.newestRideDate = function newestRideDate() {
    var lastIndex = this.rideDates.length - 1;
    return this.rideDates[lastIndex];
  }
  
  //TYPE 
  
  this.rideTypeCountsForRides(rides) = function rideTypesForRides(rides) {
    var busRides = 0;
    var trainRides = 0;
    var unknownRides = 0;
    
    for (ride in rides) {
      if (ride.isBusRide()) {
        busRides++;
      } else if (ride.isTrainRide()) {
        trainRides++;
      } else {
        unknownRides++;
      }
    }
    
    return { bus: busRides, train: trainRides, unknown: unknownRides }
  }
  
  this.overallRideTypeCounts = function overallRideTypeCounts() {
    return this.rideTypeCountsForRides(this.rides);
  }

  //TIME & DATE
  
  
  //NOTE: Month is zero-indexed! 0 = january, 11 = december
  this.ridesForMonth(month) = function ridesForMonth(month) {
    var monthRides = [];
    for (ride in this.rides) {
      if (moment(ride.date).month() == month) {
        monthRides.push(ride);
      }
    }
    
    return monthRides;    
  }
  
  this.spendAmountForMonth(month) = function spendAmountForMonth(month) {
    return this.spendAmountForRides(this.ridesForMonth(month));
  }
  
  this.rideTypeCountsForMonth(month) = function rideTypeCountsForMonth(month) {    
    return this.rideTypeCountsForRides(this.ridesForMonth(month));
  }
  
  //1 = monday 7 = sunday
  this.ridesForDayOfWeek(dayOfWeek) = function ridesForDay(dayOfWeek) {
    var dayRides = [];
    for (ride in this.rides) {
      if(moment(ride.date).isoWeekday() == dayOfWeek) {
        dayRides.push(ride);
      }
    }
    
    return dayRides;
  }
  
  this.spendAmountForDayOfWeek(dayOfWeek) = function spendAmountForDay(dayOfWeek) {
    return this.rideTypeCountsForRides(this.ridesForDayOfWeek(dayOfWeek))
  }
   
  this.rideTypeCountsForDay(dayOfWeek) = function rideTypeCountsForDay(dayOfWeek) {
    return this.rideTypeCountsForRides(this.ridesForDayOfWeek(dayOfWeek))
  }
}