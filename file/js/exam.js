function startExam() {
  showScreen('examScreen');
  loadQuestions();
  startTimer();
}

function loadQuestions() {
  const form = document.getElementById('examForm');
  form.innerHTML = '';
  
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p>${q.question}</p>`;
    
    if (q.image) {
      const img = document.createElement('img');
      img.src = q.image;
      img.alt = "Question Image";
      img.style.maxWidth = "300px";
      div.appendChild(img);
    }
    
    if (q.audio) {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = q.audio;
      div.appendChild(audio);
    }

    const options = document.createElement('div');
    options.className = 'options';
    
    for (const key in q.options) {
      options.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${key}">
          ${q.options[key]}
        </label>
      `;
    }
    
    div.appendChild(options);
    form.appendChild(div);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit Exam';
  form.appendChild(submitBtn);

  form.onsubmit = function(e) {
    e.preventDefault();
    submitExam();
  };
}

function submitExam() {
  stopTimer();
  evaluateAnswers();
  showScreen('resultScreen');
}