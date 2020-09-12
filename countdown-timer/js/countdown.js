// Set the earliest date on the calendar to today's date
// You don't want to "countdown" to dates in the past
datefield.min = new Date().toISOString().split("T")[0];
var existingIntervalId = 0;

/*---------Submit Button--------*/
const submitButton = document.getElementById("submit")

submitButton.addEventListener("click", function() {

let endDate = new Date(datefield.value).getTime();

function timer() {
  let now = new Date().getTime();
  
  let timeRemaining = endDate - now;
  
  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
  document.getElementById("timerDays").innerHTML = formatTime(days) + " days"
  document.getElementById("timerHours").innerHTML = formatTime(hours) + " hours"
  document.getElementById("timerMinutes").innerHTML = formatTime(minutes) + " minutes"
  document.getElementById("timerSeconds").innerHTML = formatTime(seconds) + " seconds"

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  
  if (timeRemaining < 0) {
    clearInterval(timerFunction);
  }
}

timer()
existingIntervalId = setInterval(timer,1000)
})

/*--------Reset Button--------*/
const resetButton = document.getElementById("reset")

resetButton.addEventListener("click", function() {
  clearInterval(existingIntervalId);
  document.getElementById("timerDays").innerHTML = ""
  document.getElementById("timerHours").innerHTML = ""
  document.getElementById("timerMinutes").innerHTML = ""
  document.getElementById("timerSeconds").innerHTML = ""
})