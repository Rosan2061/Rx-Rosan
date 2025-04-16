function evaluateAnswers() {
  let score = 0;
  const userAnswers = {};

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const userAnswer = selected ? selected.value : null;
    userAnswers[`q${index}`] = userAnswer;

    if (userAnswer === q.answer) {
      score++;
    }
  });

  document.getElementById('resultText').textContent = `You scored ${score} out of ${questions.length}.`;
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

function showDetailedResult() {
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
  
  let correctCount = 0;
  let detailsHTML = '';
  
  questions.forEach((q, index) => {
    const userAnswer = userAnswers[`q${index}`];
    const isCorrect = userAnswer === q.answer;
    
    if (isCorrect) correctCount++;
    
    detailsHTML += `
      <div class="question">
        <p><strong>${q.question}</strong></p>
        <p>Your Answer: <span class="${isCorrect ? 'correct' : 'wrong'}">${
          userAnswer ? q.options[userAnswer] : 'No answer'
        }</span></p>
        <p>Correct Answer: <strong>${q.options[q.answer]}</strong></p>
        <p class="explanation">${q.explanation}</p>
      </div>
    `;
  });
  
  document.getElementById('summaryStats').innerHTML = `
    <p><strong>Total Questions:</strong> ${questions.length}</p>
    <p><strong>Correct Answers:</strong> ${correctCount}</p>
    <p><strong>Score:</strong> ${correctCount}/${questions.length}</p>
  `;
  
  document.getElementById('detailedAnswers').innerHTML = detailsHTML;
  showScreen('detailScreen');
}