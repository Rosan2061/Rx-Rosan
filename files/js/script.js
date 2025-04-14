class TestApp {
  constructor() {
    this.currentQuestion = 0;
    this.selectedAnswers = new Array(questions.length).fill(null);
    this.markedQuestions = new Array(questions.length).fill(false);
    this.testDuration = 20 * 60; // 20 minutes in seconds
    this.timeLeft = this.testDuration;
    this.timeSpent = new Array(questions.length).fill(0);
    this.currentQuestionStartTime = Date.now();
    this.timerInterval = null;
    this.questionTimerInterval = null;
    this.progressInterval = null;
    this.testSubmitted = false;
    this.settings = {
      autoNext: true,
      highlightAnswers: false,
      showExplanations: true
    };
    this.savedTime = null;
    this.savedTimestamp = null;

    // DOM Elements
    this.elements = {
      questionNumber: document.getElementById('question-number'),
      questionText: document.getElementById('question-text'),
      optionsList: document.getElementById('options'),
      timeDisplay: document.getElementById('time'),
      timeWarning: document.getElementById('time-warning'),
      timeSpent: document.getElementById('time-spent'),
      progressFill: document.getElementById('progress-fill'),
      questionStatus: document.getElementById('question-status'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      markReviewBtn: document.getElementById('markReviewBtn'),
      completeBtn: document.getElementById('completeBtn'),
      fullscreenBtn: document.getElementById('fullscreenBtn'),
      settingsBtn: document.getElementById('settingsBtn'),
      settingsModal: document.getElementById('settingsModal'),
      confirmModal: document.getElementById('confirmModal'),
      answeredCount: document.getElementById('answeredCount'),
      markedCount: document.getElementById('markedCount'),
      scoreCount: document.getElementById('scoreCount'),
      percentage: document.getElementById('percentage'),
      confirmMessage: document.getElementById('confirmMessage'),
      autoNextSetting: document.getElementById('autoNext'),
      highlightAnswersSetting: document.getElementById('highlightAnswers'),
      showExplanationsSetting: document.getElementById('showExplanations'),
      resetBtn: document.getElementById('resetBtn'),
      savingProgress: document.getElementById('savingProgress'),
      explanation: document.getElementById('explanation')
    };

    this.init();
    this.loadProgress();
    this.startAutoSave();
  }

  init() {
    this.createQuestionButtons();
    this.loadQuestion();
    this.updateNavButtons();
    this.startTimers();
    this.setupEventListeners();
    this.loadSettings();
  }

  startTimers() {
    // Main test timer
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.timeLeft <= 0 || this.testSubmitted) {
        clearInterval(this.timerInterval);
        if (!this.testSubmitted) {
          this.submitTest();
        }
        return;
      }

      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft === 300) { // 5 minutes remaining
        this.elements.timeWarning.style.display = 'inline';
      }
    }, 1000);

    // Question time tracker
    clearInterval(this.questionTimerInterval);
    this.currentQuestionStartTime = Date.now();
    this.questionTimerInterval = setInterval(() => {
      const now = Date.now();
      const timeSpent = Math.floor((now - this.currentQuestionStartTime) / 1000);
      this.timeSpent[this.currentQuestion] = timeSpent;
      this.elements.timeSpent.textContent = `Time spent: ${timeSpent}s`;
    }, 1000);
  }

  startAutoSave() {
    this.progressInterval = setInterval(() => {
      this.showSavingProgress();
      this.saveProgress();
      setTimeout(() => this.hideSavingProgress(), 1000);
    }, 1);
  }

  showSavingProgress() {
    if (this.elements.savingProgress) { // Check if the element exists
      this.elements.savingProgress.style.display = 'block';
    } else {
      console.error("Saving progress element not found!");
    }
  }

  hideSavingProgress() {
    if (this.elements.savingProgress) { // Check if the element exists
      this.elements.savingProgress.style.display = 'none';
    }
  }

  saveProgress() {
    if (!this.testSubmitted) {
      const progress = {
        currentQuestion: this.currentQuestion,
        selectedAnswers: this.selectedAnswers,
        markedQuestions: this.markedQuestions,
        timeLeft: this.timeLeft,
        timeSpent: this.timeSpent,
        timestamp: Date.now(),
        settings: this.settings
      };
      localStorage.setItem('testProgress', JSON.stringify(progress));
    }
  }

  loadProgress() {
    const savedProgress = localStorage.getItem('testProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.currentQuestion = progress.currentQuestion || 0;
      this.selectedAnswers = progress.selectedAnswers || new Array(questions.length).fill(null);
      this.markedQuestions = progress.markedQuestions || new Array(questions.length).fill(false);
      this.timeSpent = progress.timeSpent || new Array(questions.length).fill(0);
      this.settings = progress.settings || this.settings;
      
      if (progress.timeLeft && progress.timestamp) {
        const timeElapsed = Math.floor((Date.now() - progress.timestamp) / 1000);
        this.timeLeft = Math.max(0, progress.timeLeft - timeElapsed);
      } else {
        this.timeLeft = this.testDuration;
      }
      
      this.updateTimerDisplay();
      this.updateQuestionButtons();
    }
  }

  clearProgress() {
    localStorage.removeItem('testProgress');
  }

  resetTest() {
    if (confirm("Are you sure you want to reset the test? All your progress will be lost.")) {
      this.currentQuestion = 0;
      this.selectedAnswers = new Array(questions.length).fill(null);
      this.markedQuestions = new Array(questions.length).fill(false);
      this.timeSpent = new Array(questions.length).fill(0);
      this.timeLeft = this.testDuration;
      this.testSubmitted = false;
      
      this.clearProgress();
      this.loadQuestion();
      this.updateNavButtons();
      this.updateQuestionButtons();
      this.updateTimerDisplay();
      this.startTimers();
      
      this.hideModal('confirmModal');
      this.elements.completeBtn.disabled = false;
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.elements.timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const progressPercentage = (this.timeLeft / this.testDuration) * 100;
    this.elements.progressFill.style.width = `${progressPercentage}%`;
    
    if (this.timeLeft < 300) { // Less than 5 minutes
      this.elements.progressFill.style.backgroundColor = 'var(--danger)';
    }
  }

  createQuestionButtons() {
    const learningDiv = document.getElementById('learning-questions');
    const readingDiv = document.getElementById('reading-questions');

    learningDiv.innerHTML = '';
    readingDiv.innerHTML = '';

    questions.forEach((_, index) => {
      const btn = document.createElement('button');
      btn.textContent = index + 1;
      btn.className = 'question-btn';
      btn.dataset.index = index;
      btn.setAttribute('aria-label', `Question ${index + 1}`);
      
      btn.addEventListener('click', () => {
        this.navigateToQuestion(index);
      });

      if (index < 20) {
        learningDiv.appendChild(btn);
      } else {
        readingDiv.appendChild(btn);
      }
    });
  }

  loadQuestion() {
    if (this.currentQuestion < 0 || this.currentQuestion >= questions.length) return;

    // Update question timer
    clearInterval(this.questionTimerInterval);
    this.currentQuestionStartTime = Date.now();
    this.questionTimerInterval = setInterval(() => {
      const now = Date.now();
      const timeSpent = Math.floor((now - this.currentQuestionStartTime) / 1000);
      this.timeSpent[this.currentQuestion] = timeSpent;
      this.elements.timeSpent.textContent = `Time spent: ${timeSpent}s`;
    }, 1000);

    const q = questions[this.currentQuestion];
    this.elements.questionNumber.textContent = `Question ${this.currentQuestion + 1}`;
    this.elements.questionText.textContent = q.question;
    this.elements.optionsList.innerHTML = "";
    this.elements.explanation.style.display = 'none';

    this.updateQuestionStatus();

    q.options.forEach((opt, idx) => {
      const li = document.createElement('li');
      li.textContent = opt;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', this.selectedAnswers[this.currentQuestion] === idx ? 'true' : 'false');
      
      if (this.selectedAnswers[this.currentQuestion] === idx) {
        li.classList.add('selected');
      }
      
      if (this.testSubmitted) {
        if (this.settings.highlightAnswers && idx === q.answer) {
          li.classList.add('correct-answer');
        }
        if (this.selectedAnswers[this.currentQuestion] === idx && idx !== q.answer) {
          li.classList.add('incorrect-answer');
        }
      }

      li.addEventListener('click', () => {
        this.selectAnswer(idx);
      });
      
      this.elements.optionsList.appendChild(li);
    });

    // Show explanation if test is submitted and setting is enabled
    if (this.testSubmitted && this.settings.showExplanations) {
      this.elements.explanation.textContent = q.explanation;
      this.elements.explanation.style.display = 'block';
    }

    this.updateQuestionButtons();
  }

  selectAnswer(index) {
    this.selectedAnswers[this.currentQuestion] = index;
    this.updateQuestionButtons();
    this.loadQuestion();
    
    if (this.settings.autoNext && this.currentQuestion < questions.length - 1) {
      setTimeout(() => {
        this.navigateToQuestion(this.currentQuestion + 1);
      }, 300);
    }
  }

  navigateToQuestion(index) {
    if (index >= 0 && index < questions.length) {
      this.currentQuestion = index;
      this.loadQuestion();
      this.updateNavButtons();
    }
  }

  updateNavButtons() {
    this.elements.prevBtn.disabled = this.currentQuestion === 0;
    this.elements.nextBtn.disabled = this.currentQuestion === questions.length - 1;
    
    document.querySelectorAll('.question-btn').forEach(btn => {
      const index = parseInt(btn.dataset.index);
      btn.classList.toggle('selected', index === this.currentQuestion);
    });
  }

  updateQuestionButtons() {
    document.querySelectorAll('.question-btn').forEach(btn => {
      const index = parseInt(btn.dataset.index);
      btn.classList.toggle('answered', this.selectedAnswers[index] !== null);
      btn.classList.toggle('marked', this.markedQuestions[index]);
      
      if (this.testSubmitted) {
        btn.classList.toggle('correct', this.selectedAnswers[index] === questions[index].answer);
        btn.classList.toggle('incorrect', 
          this.selectedAnswers[index] !== null && 
          this.selectedAnswers[index] !== questions[index].answer
        );
      }
    });
  }

  updateQuestionStatus() {
    let status = '';
    if (this.selectedAnswers[this.currentQuestion] !== null) {
      status = 'Answered';
    }
    if (this.markedQuestions[this.currentQuestion]) {
      status = status ? status + ' • Marked' : 'Marked';
    }
    this.elements.questionStatus.textContent = status;
  }

  toggleMarkForReview() {
    this.markedQuestions[this.currentQuestion] = !this.markedQuestions[this.currentQuestion];
    this.updateQuestionButtons();
    this.updateQuestionStatus();
  }

  submitTest() {
    this.testSubmitted = true;
    clearInterval(this.timerInterval);
    clearInterval(this.questionTimerInterval);
    clearInterval(this.progressInterval);
    this.clearProgress();
    
    const answeredCount = this.selectedAnswers.filter(answer => answer !== null).length;
    const markedCount = this.markedQuestions.filter(marked => marked).length;
    const correctAnswers = questions.reduce((count, q, index) => {
      return count + (this.selectedAnswers[index] === q.answer ? 1 : 0);
    }, 0);
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    this.elements.confirmMessage.textContent = `You scored ${correctAnswers} out of ${questions.length} questions.`;
    this.elements.answeredCount.textContent = answeredCount;
    this.elements.markedCount.textContent = markedCount;
    this.elements.scoreCount.textContent = correctAnswers;
    this.elements.percentage.textContent = percentage;
    
    this.elements.completeBtn.disabled = true;
    this.loadQuestion(); // Reload to show correct answers
  }

  showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.getElementById(modalId).setAttribute('aria-hidden', 'false');
  }

  hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.getElementById(modalId).setAttribute('aria-hidden', 'true');
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('testSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
      this.elements.autoNextSetting.checked = this.settings.autoNext;
      this.elements.highlightAnswersSetting.checked = this.settings.highlightAnswers;
      this.elements.showExplanationsSetting.checked = this.settings.showExplanations;
    }
  }

  saveSettings() {
    this.settings.autoNext = this.elements.autoNextSetting.checked;
    this.settings.highlightAnswers = this.elements.highlightAnswersSetting.checked;
    this.settings.showExplanations = this.elements.showExplanationsSetting.checked;
    localStorage.setItem('testSettings', JSON.stringify(this.settings));
    this.hideModal('settingsModal');
    
    if (this.testSubmitted) {
      this.loadQuestion(); // Reload to reflect new settings
    }
  }

  setupEventListeners() {
    // Navigation buttons
    this.elements.prevBtn.addEventListener('click', () => this.navigateToQuestion(this.currentQuestion - 1));
    this.elements.nextBtn.addEventListener('click', () => this.navigateToQuestion(this.currentQuestion + 1));
    this.elements.markReviewBtn.addEventListener('click', () => this.toggleMarkForReview());
    this.elements.completeBtn.addEventListener('click', () => this.showModal('confirmModal'));
    
    // Quick navigation buttons
    document.querySelectorAll('.quick-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch(action) {
          case 'first':
            this.navigateToQuestion(0);
            break;
          case 'last':
            this.navigateToQuestion(questions.length - 1);
            break;
          case 'prev-unanswered':
            this.navigateToUnanswered(-1);
            break;
          case 'next-unanswered':
            this.navigateToUnanswered(1);
            break;
        }
      });
    });
    
    // Control buttons
    this.elements.settingsBtn.addEventListener('click', () => this.showModal('settingsModal'));
    this.elements.fullscreenBtn.addEventListener('click', this.toggleFullscreen);
    
    // Modal buttons
    document.querySelector('#settingsModal .confirm').addEventListener('click', () => this.saveSettings());
    document.querySelector('#settingsModal .cancel').addEventListener('click', () => this.hideModal('settingsModal'));
    document.querySelector('#confirmModal .confirm').addEventListener('click', () => this.submitTest());
    this.elements.resetBtn.addEventListener('click', () => this.resetTest());
    document.querySelector('#confirmModal .cancel').addEventListener('click', () => this.hideModal('confirmModal'));
    
    // Modal backdrop clicks
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideModal(modal.id);
        }
      });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && !this.elements.prevBtn.disabled) {
        this.navigateToQuestion(this.currentQuestion - 1);
      } else if (e.key === 'ArrowRight' && !this.elements.nextBtn.disabled) {
        this.navigateToQuestion(this.currentQuestion + 1);
      } else if (e.key === 'm' || e.key === 'M') {
        this.toggleMarkForReview();
      } else if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < questions[this.currentQuestion].options.length) {
          this.selectAnswer(optionIndex);
        }
      }
    });
  }

  navigateToUnanswered(direction) {
    let index = this.currentQuestion;
    do {
      index += direction;
      if (index < 0) index = questions.length - 1;
      if (index >= questions.length) index = 0;
      
      if (this.selectedAnswers[index] === null) {
        this.navigateToQuestion(index);
        return;
      }
    } while (index !== this.currentQuestion);
    
    alert(direction > 0 ? 'No more unanswered questions' : 'No previous unanswered questions');
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TestApp();
});