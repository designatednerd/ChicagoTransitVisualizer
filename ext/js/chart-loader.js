$(function() {  
  //Setup chart prefs
  Chart.defaults.global.responsive = true;

  function loadDataFromLocalStorage() {
    var loads = window.localStorage.getItem("loads");
    var rides = window.localStorage.getItem("rides");
    console.log("LOADED DATA!!!!!!!");
    return new DataDisplay(loads, rides);
  }
  
  var dataDisplay = loadDataFromLocalStorage();
});


window.onunload = function nukeLocalStorage() {
  window.localStorage.clear()
}