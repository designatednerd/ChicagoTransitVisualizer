function DataDisplay(loads, rides) {
  var monthsInPlay;
  
  
  /*********
   * SETUP *
   *********/
   
  function sortByDate(stuffWithDates) {
    if (stuffWithDates.length == 0) {
      return stuffWithDates;
    } else {
      var sorted = stuffWithDates.sort(function(leftSide, rightSide) {
        if (leftSide.date > rightSide.date) {
          return 1;
        } else if (leftSide.date < rightSide.date) {
           return -1;
        } else {
          return 0;
        }
      });
      
      return sorted;
    }
  }
  
  //Sort by date before assigning to members. 
  this.loads = sortByDate(loads);
  this.rides = sortByDate(rides)

  /**************
   * LOADS INFO *
   **************/
  
  function loadDates() {
    var loadDates = [];
    for (load in this.loads) {
      loadDates.push(load.date);
    }
    
    return loadDates;
  }
  
  function totalLoadAmount() {
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
  
  function spendAmountForRides(rides) {
    var total = 0;
    for (ride in rides) {
      total += parseFloat(ride.amount);
    }
    
    return total;
  }
  
  function totalSpend() {
    return this.spendAmountForRides(this.rides);
  }
  
  //DATE
  
  function rideDates() {
    var rideDates = [];
    for (ride in this.rides) {
      rideDates.push(ride.date);
    }
    
    return rideDates;
  }

  function oldestRideDate() {
    return this.rideDates()[0];
  }
  
  function newestRideDate() {
    var rideDates = this.rideDates();
    var lastIndex = rideDates.length - 1;
    return rideDates[lastIndex];
  }
  
  //TYPE 
  
  function rideTypesForRides(rides) {
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
  
  function overallRideTypeCounts() {
    return this.rideTypeCountsForRides(this.rides);
  }

  //TIME & DATE
  
  //Month
  
  function allMonthLabels() {
    //If we've already figured this out, just return it. 
    if (monthsInPlay != null) {
      return monthsInPlay;
    }
    
    this.monthsInPlay = [];
    
    var firstMonth = oldestRideDate().month()
    var lastMonth = newestRideDate().month();
    
    if (firstMonth > lastMonth) {
      lastMonth += 12; //
    }
    
    for (var i = firstMonth; i < lastMonth; i++) {
      var monthIndex = i % 12; 
      
      switch (monthIndex) {
        case 0:
          this.monthsInPlay.push("Jan");
          break;
        case 1;
          this.monthsInPlay.push("Feb");
          break;
        case 2;
          this.monthsInPlay.push("Mar");
          break;
        case 3:
          this.monthsInPlay.push("Apr");
          break;
        case 4:
          this.monthsInPlay.push("May");
          break;
        case 5:
          this.monthsInPlay.push("Jun");
          break;
        case 6:
          this.monthsInPlay.push("Jul");
          break;
        case 7:
          this.monthsInPlay.push("Aug");
          break;
        case 8:
          this.monthsInPlay.push("Sep");
          break;
        case 9:
          this.monthsInPlay.push("Oct");
          break;
        case 10:
          this.monthsInPlay.push("Nov");
          break;
        case 11;
          this.monthsInPlay.push("Dec");
          break;
        default;
          this.monthsInPlay.push("Smarch");
          break;  
      }
    }
    
    return monthsInPlay;    
  }
  
  //NOTE: Month is zero-indexed! 0 = january, 11 = december
  function ridesForMonth(month) {
    var monthRides = [];
    for (ride in this.rides) {
      if (ride.date.month() == month) {
        monthRides.push(ride);
      }
    }
    
    return monthRides;    
  }
  
  function spendAmountForMonth(month) {
    return this.spendAmountForRides(this.ridesForMonth(month));
  }
  
  function rideTypeCountsForMonth(month) {    
    return this.rideTypeCountsForRides(this.ridesForMonth(month));
  }
  
  
  //Day
  
  function allDayLabels() {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  
  //1 = monday 7 = sunday
  function ridesForDay(dayOfWeek) {
    var dayRides = [];
    for (ride in this.rides) {
      if(ride.date.isoWeekday() == dayOfWeek) {
        dayRides.push(ride);
      }
    }
    
    return dayRides;
  }
  
  function spendAmountForDay(dayOfWeek) {
    return this.rideTypeCountsForRides(this.ridesForDayOfWeek(dayOfWeek))
  }
   
  function rideTypeCountsForDay(dayOfWeek) {
    return this.rideTypeCountsForRides(this.ridesForDayOfWeek(dayOfWeek))
  }
}