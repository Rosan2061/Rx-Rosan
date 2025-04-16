let time = 1500;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  time = 1500;
  updateTimerDisplay();
  
  timerInterval = setInterval(() => {
    time--;
    updateTimerDisplay();
    
    if (time <= 0) {
      submitExam();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  document.getElementById('timer').textContent = `Time left: ${time}s`;
}