function fetchData() {
  fetch('https://ebtisam-project.onrender.com/openapi.json')
     .then(response => response.json())
     .then(data => {
        console.log('Received data:', data);
        // Optionally, display the data on your webpage
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
     })
     .catch(error => console.error('Error:', error));
}





//----------------------------------------------POMODORO JS START --------------------------------------------------------------------------
var pomodoroSkin,
  displayStatus,
  displayTime,
  displayToggle,
  timer,
  minutes,
  seconds,
  timeSession = 25,
  timeBreak = 5,
  timeOn = false,
  time = 1500,
  status = 'session';

function changeDisplay() {
  minutes = parseInt(time / 60, 10);
  seconds = parseInt(time % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  displayTime.textContent = minutes + ":" + seconds;
}

function setTime(newTime) {
  time = newTime * 60;
  changeDisplay();
}

function resetTimer() {
  if (status === 'session') {
    setTime(timeSession);
  } else {
    setTime(timeBreak);
  }
}

function switchMode() {
  if (status !== 'break') {
    status = 'break';
    setTime(timeBreak);
    pomodoroSkin.classList.remove("session");
    pomodoroSkin.classList.add("break");
  } else {
    status = 'session';
    setTime(timeSession);
    pomodoroSkin.classList.remove("break");
    pomodoroSkin.classList.add("session");
  }
  displayStatus.innerHTML = status;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(function() {
    changeDisplay();
    if (time !== 0) {
      time--;
    } else {
      switchMode();
    }
  }, 1000);
  displayToggle.innerHTML = '<i class="fa fa-pause"></i>';
}

function toggleTimer() {
  if (timeOn) {
    timeOn = false;
    displayToggle.innerHTML = '<i class="fa fa-play"></i>';
    clearInterval(timer);
  } else {
    timeOn = true;
    displayToggle.innerHTML = '<i class="fa fa-pause"></i>';
    startTimer();
  }
}

(function() {
  pomodoroSkin = document.getElementsByClassName('pomodoro')[0];
  displayStatus = document.getElementsByClassName('status')[0];
  displayTime = document.getElementsByClassName('timer')[0];
  displayToggle = document.getElementById('toggle');

  document.getElementById('switch').onclick = switchMode;
  document.getElementById('reset').onclick = resetTimer;
  document.getElementById('toggle').onclick = toggleTimer;

  var displaySession = document.getElementById('session');
  var displayBreak = document.getElementById('break');

  document.getElementById('session-minus').onclick = function() {
    if (timeSession > 1) {
      timeSession--;
      displaySession.innerHTML = timeSession;
    }
  };
  document.getElementById('session-plus').onclick = function() {
    if (timeSession < 60) {
      timeSession++;
      displaySession.innerHTML = timeSession;
    }
  };
  document.getElementById('break-minus').onclick = function() {
    if (timeBreak > 1) {
      timeBreak--;
      displayBreak.innerHTML = timeBreak;
    }
  };
  document.getElementById('break-plus').onclick = function() {
    if (timeBreak < 60) {
      timeBreak++;
      displayBreak.innerHTML = timeBreak;
    }
  };

  resetTimer();

})(); // <-- Add this closing parenthesis to close the IIFE

// Get the Pomodoro timer element
var pomodoroTimer = document.querySelector('.pomodoro');

// Get the control clearfix element
var controlClearfix = document.querySelector('.control.clearfix');

// Function to toggle the Pomodoro timer's visibility along with the control clearfix
function togglePomodoro() {
  var isVisible = getComputedStyle(pomodoroTimer).display === 'block';
  pomodoroTimer.style.display = isVisible ? 'none' : 'block';
  controlClearfix.style.display = isVisible ? 'none' : 'block';
}

// Add an event listener to the clock gadget button on the taskbar
var clockGadget = document.querySelector('.taskbar .clock-gadget');
clockGadget.addEventListener('click', function() {
  togglePomodoro();
});

//----------------------------------------------POMODORO JS END --------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function() {
  var burghyIcon = document.getElementById("burghy-icon");
  var dropdownContent = document.getElementById("dropdown-content");

  burghyIcon.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent the click event from propagating to the body

      // Toggle the visibility of the dropdown content
      if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
      } else {
          dropdownContent.style.display = "block";
      }
  });

  // Close the dropdown when clicking anywhere outside of it
  document.addEventListener("click", function(event) {
      if (event.target !== burghyIcon) {
          dropdownContent.style.display = "none";
      }
  });
});
