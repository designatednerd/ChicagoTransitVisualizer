function DataDisplay(loads, rides) {
  var monthsPlay;
  var monthNamesInPlay;
  var ridesByMonth;
  var amountByMonth;

  /*********
   * SETUP *
   *********/

  function sortByDate(stuffWithDates) {
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
  this.loads = sortByDate(loads);
  this.rides = sortByDate(rides);
  
  /**************
   * LOADS INFO *
   **************/

  function loadDates() {
    var transactionDates = [];
    for (var i = 0; i < this.loads.length; i++) {
      var load = this.loads[i];
      transactionDates.push(load.date);
    }
    
    return transactionDates;
  }
  
  function totalLoadAmount() {
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

  function spendAmountForRides(rides) {
    var total = 0;
    for (var i = 0; i < rides.length; i++) {
      var ride = rides[i];
      total += parseFloat(ride.amount);
    }
    
    return total;
  }

  function totalSpend() {
    return this.spendAmountForRides(this.rides);
  }

  //DATE
  
  function rideDates() {
    var dates = [];
    for (var i = 0; i < rides.length; i++) {
      var ride = rides[i];
      dates.push(ride.date);
    }
    
    return dates;
  }

  function oldestRideDate() {
    return rideDates()[0];
  }
  
  function newestRideDate() {
    var allDates = rideDates();
    var lastIndex = allDates.length - 1;
    return allDates[lastIndex];
  }
  
  //TYPE 
  
  function rideTypesForRides(rides) {
    var busRides = 0;
    var trainRides = 0;
    var unknownRides = 0;
    
    for (var i = 0; i < rides.length; i++) {
      var ride = rides[i];      
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
  
  function monthsInPlay() {
    if (this.monthsPlay != null) {
      return this.monthsPlay;
    }
    
    this.monthsPlay = [];
    
    var firstMonth = oldestRideDate().month()
    var lastMonth = newestRideDate().month();
    
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
    
    var months = monthsInPlay();
    this.monthNamesInPlay = [];
    
    for (var i = 0; i < months.length; i++) {
      var month = months[i];      
      var monthIndex = month % 12; 
      
      switch (monthIndex) {
        case 0:
          this.monthNamesInPlay.push("Jan");
          break;
        case 1:
          this.monthNamesInPlay.push("Feb");
          break;
        case 2:
          this.monthNamesInPlay.push("Mar");
          break;
        case 3:
          this.monthNamesInPlay.push("Apr");
          break;
        case 4:
          this.monthNamesInPlay.push("May");
          break;
        case 5:
          this.monthNamesInPlay.push("Jun");
          break;
        case 6:
          this.monthNamesInPlay.push("Jul");
          break;
        case 7:
          this.monthNamesInPlay.push("Aug");
          break;
        case 8:
          this.monthNamesInPlay.push("Sep");
          break;
        case 9:
          this.monthNamesInPlay.push("Oct");
          break;
        case 10:
          this.monthNamesInPlay.push("Nov");
          break;
        case 11:
          this.monthNamesInPlay.push("Dec");
          break;
        default:
          this.monthNamesInPlay.push("Smarch");
          break;  
      }
    }
    
    return this.monthNamesInPlay;    
  }
  
  function ridesByMonth() {
    if (this.ridesByMonth != null) {
      return this.ridesByMonth;
    }
    
    var months = monthsInPlay();
    this.ridesByMonth = [];
    for (var i = 0; i < months.count; i++) {
      var month = months[i];
      var actualMonth = month % 12;
      var rides = ridesForMonth(actualMonth);
      this.ridesByMonth.push(rides);
    }
    
    return this.ridesByMonth;
  }
  
  this.costByMonth = function() {
    if (this.amountByMonth != null) {
      return this.amountByMonth;
    }
    
    var months = monthsInPlay();
    this.amountByMonth = [];
    for (var i = 0; i < months.count; i++) {
      var month = months[i];
      var actualMonth = month % 12;
      var amount = spendAmountForMonth(actualMonth);
      this.amountByMonth.push(amount);
    }
    
    return this.amountByMonth;
  } 
  
  //NOTE: Month is zero-indexed! 0 = january, 11 = december
  function ridesForMonth(month) {
    var monthRides = [];
    for (var i = 0; i < this.rides.length; i++) {
      var ride = this.rides[i];
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
  
  this.allDayLabels = function() {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  
  //1 = monday 7 = sunday
  function ridesForDay(dayOfWeek) {
    var dayRides = [];
    for (var i = 0; i < this.rides.length; i++) {
      var ride = this.rides[i];      
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