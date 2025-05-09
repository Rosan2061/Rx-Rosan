class QuestionPortal {
    constructor() {
        // DOM elements
        this.loginForm = document.getElementById('loginForm');
        this.loginError = document.getElementById('loginError');
        this.mainContent = document.getElementById('mainContent');
        this.loggedInUserSpan = document.getElementById('loggedInUser');
        this.userInitials = document.getElementById('userInitials');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        // Questions elements
        this.questionCardsContainer = document.getElementById('questionCards');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.noResults = document.getElementById('noResults');
        this.addQuestionBtn = document.getElementById('addQuestionBtn');
        this.addQuestionEmptyBtn = document.getElementById('addQuestionEmptyBtn');
        this.backToQuestionsBtn = document.getElementById('backToQuestionsBtn');
        this.filterToggle = document.getElementById('filterToggle');
        this.advancedFilters = document.getElementById('advancedFilters');
        
        // Question form elements
        this.questionForm = document.getElementById('questionForm');
        this.questionTitle = document.getElementById('questionTitle');
        this.questionText = document.getElementById('questionText');
        this.questionCategory = document.getElementById('questionCategory');
        this.questionDifficulty = document.getElementById('questionDifficulty');
        this.questionTags = document.getElementById('questionTags');
        this.questionPoints = document.getElementById('questionPoints');
        this.questionShuffle = document.getElementById('questionShuffle');
        this.questionStatus = document.getElementById('questionStatus');
        this.addOptionBtn = document.getElementById('addOptionBtn');
        this.previewQuestionBtn = document.getElementById('previewQuestionBtn');
        
        // Section elements
        this.sections = {
            questions: document.getElementById('questionsSection'),
            create: document.getElementById('createSection')
        };
        
        // Modals
        this.sessionTimeoutModal = new bootstrap.Modal(document.getElementById('sessionTimeoutModal'));
        this.questionPreviewModal = new bootstrap.Modal(document.getElementById('questionPreviewModal'));
        this.countdownSpan = document.getElementById('countdown');
        this.extendSessionBtn = document.getElementById('extendSession');
        
        // Configuration
        this.config = {
            sessionTimeoutMinutes: 30,
            sessionWarningMinutes: 2,
            checkSessionInterval: 60000
        };
        
        // State management
        this.state = {
            currentUser: null,
            currentSection: 'questions',
            questions: [],
            isOnline: navigator.onLine
        };
        
        // Initialize
        this.init();
    }
    
    init() {
        // Event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.checkExistingSession();
            this.setupPasswordToggle();
            this.setupOnlineStatus();
            this.loadInitialData();
        });
        
        // Auth events
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
        this.extendSessionBtn.addEventListener('click', () => this.extendSession());
        
        // Question events
        this.searchInput.addEventListener('input', () => this.filterQuestions());
        this.searchButton.addEventListener('click', () => this.filterQuestions());
        this.categoryFilter.addEventListener('change', () => this.filterQuestions());
        this.filterToggle.addEventListener('click', () => this.toggleAdvancedFilters());
        this.addQuestionBtn.addEventListener('click', () => this.showCreateQuestion());
        this.addQuestionEmptyBtn.addEventListener('click', () => this.showCreateQuestion());
        this.backToQuestionsBtn.addEventListener('click', () => this.showQuestionsSection());
        this.addOptionBtn.addEventListener('click', () => this.addAnswerOption());
        this.previewQuestionBtn.addEventListener('click', () => this.previewQuestion());
        this.questionForm.addEventListener('submit', (e) => this.saveQuestion(e));
        
        // Session monitoring
        setInterval(() => this.checkSessionTimeout(), this.config.checkSessionInterval);
    }
    
    // Initial data loading
    async loadInitialData() {
        try {
            this.state.questions = [
                {
                    id: 1,
                    title: "Question Model 1",
                    description: "This is the QUESTION MODEL 1 of korean language exam",
                    category: "Korean Language Exam QUESTION SET MODEL - 1",
                    fileLink: "QSM1.html",
                    difficulty: "medium",
                    type: "multiple",
                    status: "published",
                    points: 5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    title: "PDF Model 1",
                    description: "This is the PDF File Of Korean Basice.",
                    category: "PDF",
                    fileLink: "rxasset/file/한국 Basic RX' PASS = Rosan2061.pdf",
                    difficulty: "easy",
                    type: "pdf",
                    status: "published",
                    points: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    title: "Question Model 2",
                    description: "This is the QUESTION MODEL 2 of korean language exam",
                    category: "Korean Language Exam QUESTION SET MODEL - 1",
                    fileLink: "QSM2.html",
                    difficulty: "hard",
                    type: "multiple",
                    status: "published",
                    points: 8,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            
            // Update UI with loaded data
            if (this.state.currentUser) {
                this.renderQuestionCards();
                this.showSection('questions');
            }
            
        } catch (error) {
            console.error("Error loading initial data:", error);
            this.showToast("Error loading data. Please refresh the page.", "error");
        }
    }
    
    // Setup online/offline detection
    setupOnlineStatus() {
        window.addEventListener('online', () => {
            this.state.isOnline = true;
            this.showToast("You are back online", "success");
        });
        
        window.addEventListener('offline', () => {
            this.state.isOnline = false;
            this.showToast("You are offline. Some features may not work.", "warning");
        });
    }
    
    // Simulate password hashing
    hashPassword(password) {
        return password.split('').reverse().join('') + password.length;
    }
    
    // Setup password visibility toggle
    setupPasswordToggle() {
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => {
                const input = button.closest('.input-group').querySelector('input');
                const icon = button.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('bi-eye');
                    icon.classList.add('bi-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('bi-eye-slash');
                    icon.classList.add('bi-eye');
                }
            });
        });
    }
    
    // Check for existing session
    checkExistingSession() {
        const savedSession = localStorage.getItem('questionPortalSession');
        
        if (savedSession) {
            try {
                const sessionData = JSON.parse(savedSession);
                this.startSession(sessionData);
            } catch (e) {
                console.error('Error parsing session data:', e);
                this.clearSession();
            }
        }
    }
    
    // Handle login
    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value.trim() || username;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validate form
        if (!username || !password) {
            this.loginForm.classList.add('was-validated');
            return;
        }
        
        // Show loading state
        const submitBtn = this.loginForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // In a real app, this would be a proper authentication flow with server-side validation
            const validCredentials = {
                username: "Rosan",
                password: this.hashPassword("Rosan2061")
            };
            
            if (username === validCredentials.username && 
                this.hashPassword(password) === validCredentials.password) {
                this.loginError.classList.add('d-none');
                
                const sessionData = {
                    username,
                    name,
                    isAdmin: true,
                    timestamp: new Date().getTime(),
                    rememberMe
                };
                
                this.startSession(sessionData);
                this.loginForm.reset();
                this.loginForm.classList.remove('was-validated');
                
                // Show welcome message
                this.showToast(`Welcome back, ${name}!`, "success");
            } else {
                this.loginError.textContent = "Invalid username or password";
                this.loginError.classList.remove('d-none');
                this.showToast("Login failed. Please check your credentials.", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            this.loginError.textContent = "An error occurred during login";
            this.loginError.classList.remove('d-none');
            this.showToast("Login error. Please try again.", "error");
        } finally {
            submitBtn.classList.remove('loading');
        }
    }
    
    // Start new session
    startSession(sessionData) {
        localStorage.setItem('questionPortalSession', JSON.stringify(sessionData));
        
        // Update state
        this.state.currentUser = {
            username: sessionData.username,
            name: sessionData.name,
            isAdmin: sessionData.isAdmin || false
        };
        
        // Update UI
        document.querySelector('.login-container').classList.add('d-none');
        this.mainContent.classList.remove('d-none');
        this.loggedInUserSpan.textContent = sessionData.name || sessionData.username;
        
        // Set user initials for avatar
        if (sessionData.name) {
            const initials = sessionData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            this.userInitials.textContent = initials.substring(0, 2);
        }
        
        this.renderQuestionCards();
        this.showSection('questions');
    }
    
    // Handle logout
    handleLogout() {
        this.clearSession();
        this.mainContent.classList.add('d-none');
        document.querySelector('.login-container').classList.remove('d-none');
        this.loggedInUserSpan.textContent = '';
        this.questionCardsContainer.innerHTML = '';
        
        this.showToast("You have been logged out", "info");
    }
    
    // Clear session data
    clearSession() {
        localStorage.removeItem('questionPortalSession');
        this.state.currentUser = null;
    }
    
    // Check for session timeout
    checkSessionTimeout() {
        const savedSession = localStorage.getItem('questionPortalSession');
        if (savedSession) {
            const sessionData = JSON.parse(savedSession);
            const elapsedMinutes = Math.floor((new Date().getTime() - sessionData.timestamp) / 60000);
            const remainingMinutes = this.config.sessionTimeoutMinutes - elapsedMinutes;
            
            if (remainingMinutes <= 0) {
                this.handleLogout();
            } else if (remainingMinutes <= this.config.sessionWarningMinutes && !this.sessionTimeoutModal._isShown) {
                this.showSessionWarning(remainingMinutes);
            }
        }
    }
    
    // Show session timeout warning
    showSessionWarning(minutes) {
        let seconds = Math.floor(minutes * 60);
        this.countdownSpan.textContent = Math.ceil(seconds / 60);
        
        this.countdownInterval = setInterval(() => {
            seconds--;
            this.countdownSpan.textContent = Math.ceil(seconds / 60);
            
            if (seconds <= 0) {
                clearInterval(this.countdownInterval);
                this.sessionTimeoutModal.hide();
                this.handleLogout();
            }
        }, 1000);
        
        this.sessionTimeoutModal.show();
    }
    
    // Extend session
    extendSession() {
        clearInterval(this.countdownInterval);
        this.sessionTimeoutModal.hide();
        
        const savedSession = localStorage.getItem('questionPortalSession');
        if (savedSession) {
            const sessionData = JSON.parse(savedSession);
            sessionData.timestamp = new Date().getTime();
            localStorage.setItem('questionPortalSession', JSON.stringify(sessionData));
            
            this.showToast("Session extended", "success");
        }
    }
    
    // Show specific section
    showSection(section) {
        // Hide all sections first
        Object.values(this.sections).forEach(sec => {
            sec?.classList.add('d-none');
        });
        
        // Show requested section
        if (this.sections[section]) {
            this.sections[section].classList.remove('d-none');
            this.state.currentSection = section;
        }
    }
    
    // Show questions section
    showQuestionsSection() {
        this.showSection('questions');
    }
    
    // Show create question form
    showCreateQuestion() {
        this.showSection('create');
        document.getElementById('questionFormTitle').textContent = "Create New Question";
        this.questionForm.reset();
        this.questionText.innerHTML = '';
    }
    
    // Toggle advanced filters
    toggleAdvancedFilters() {
        this.advancedFilters.classList.toggle('active');
        this.filterToggle.classList.toggle('active');
        
        const icon = this.filterToggle.querySelector('i');
        if (this.advancedFilters.classList.contains('active')) {
            icon.classList.remove('bi-funnel');
            icon.classList.add('bi-funnel-fill');
        } else {
            icon.classList.remove('bi-funnel-fill');
            icon.classList.add('bi-funnel');
        }
    }
    
    // Render question cards
    renderQuestionCards(questions = this.state.questions) {
        this.questionCardsContainer.innerHTML = '';
        
        if (questions.length === 0) {
            this.noResults.classList.remove('d-none');
            return;
        }
        
        this.noResults.classList.add('d-none');
        
        questions.forEach((question, index) => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="question-card" style="animation-delay: ${index * 0.1}s">
                    <div class="card-icon">Q${question.id}</div>
                    <h3>${question.title}</h3>
                    <p>${question.description}</p>
                    <div class="d-flex gap-2 mb-2">
                        <span class="badge">${question.category}</span>
                        <span class="badge ${this.getDifficultyBadgeClass(question.difficulty)}">
                            ${this.capitalizeFirstLetter(question.difficulty)}
                        </span>
                        <span class="badge ${this.getStatusBadgeClass(question.status)}">
                            ${this.capitalizeFirstLetter(question.status)}
                        </span>
                    </div>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${this.formatDate(question.updatedAt)}</small>
                            <span class="badge bg-primary">${question.points} pts</span>
                        </div>
                        <div class="d-flex gap-2 mt-3">
                            <button class="btn btn-sm btn-outline-primary view-details" data-id="${question.id}">
                                <i class="bi bi-eye me-1"></i>View
                            </button>
                            <button class="btn btn-sm btn-outline-secondary edit-question" data-id="${question.id}" ${!this.state.currentUser?.isAdmin ? 'disabled' : ''}>
                                <i class="bi bi-pencil me-1"></i>Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-question" data-id="${question.id}" ${!this.state.currentUser?.isAdmin ? 'disabled' : ''}>
                                <i class="bi bi-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
            this.questionCardsContainer.appendChild(card);
            
            // Add animation
            setTimeout(() => {
                card.querySelector('.question-card').style.animation = 'cardEntrance 0.5s ease-out forwards';
            }, 10);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const questionId = e.currentTarget.getAttribute('data-id');
                this.viewQuestionDetails(questionId);
            });
        });
        
        document.querySelectorAll('.edit-question').forEach(button => {
            button.addEventListener('click', (e) => {
                const questionId = e.currentTarget.getAttribute('data-id');
                this.editQuestion(questionId);
            });
        });
        
        document.querySelectorAll('.delete-question').forEach(button => {
            button.addEventListener('click', (e) => {
                const questionId = e.currentTarget.getAttribute('data-id');
                this.confirmDeleteQuestion(questionId);
            });
        });
    }
    
    // Filter questions based on search and filters
    filterQuestions() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const categoryFilter = this.categoryFilter.value;
        const dateFilter = document.getElementById('dateFilter')?.value || '';
        const difficultyFilter = document.getElementById('difficultyFilter')?.value || '';
        const typeFilter = document.getElementById('typeFilter')?.value || '';
        const statusFilter = document.getElementById('statusFilter')?.value || '';
        
        const filteredQuestions = this.state.questions.filter(question => {
            // Search term matching
            const matchesSearch = searchTerm === '' || 
                question.title.toLowerCase().includes(searchTerm) || 
                question.description.toLowerCase().includes(searchTerm) ||
                question.category.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = !categoryFilter || question.category === categoryFilter;
            
            // Date filter (simplified for demo)
            const matchesDate = !dateFilter || this.checkDateFilter(question.createdAt, dateFilter);
            
            // Difficulty filter
            const matchesDifficulty = !difficultyFilter || question.difficulty === difficultyFilter;
            
            // Type filter
            const matchesType = !typeFilter || question.type === typeFilter;
            
            // Status filter
            const matchesStatus = !statusFilter || question.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesDate && 
                   matchesDifficulty && matchesType && matchesStatus;
        });
        
        this.renderQuestionCards(filteredQuestions);
    }
    
    // Check if question matches date filter
    checkDateFilter(questionDate, filter) {
        const now = new Date();
        const qDate = new Date(questionDate);
        
        switch (filter) {
            case 'today':
                return qDate.toDateString() === now.toDateString();
            case 'week':
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                return qDate >= weekStart;
            case 'month':
                return qDate.getMonth() === now.getMonth() && 
                       qDate.getFullYear() === now.getFullYear();
            case 'year':
                return qDate.getFullYear() === now.getFullYear();
            default:
                return true;
        }
    }
    
    // View question details
    viewQuestionDetails(questionId) {
        const question = this.state.questions.find(q => q.id == questionId);
        if (question) {
            this.showQuestionModal(question);
        }
    }
    
    // Edit question
    editQuestion(questionId) {
        const question = this.state.questions.find(q => q.id == questionId);
        if (question) {
            this.showSection('create');
            document.getElementById('questionFormTitle').textContent = "Edit Question";
            
            // Populate form fields
            this.questionTitle.value = question.title;
            this.questionText.innerHTML = question.description;
            this.questionCategory.value = question.category;
            this.questionDifficulty.value = question.difficulty;
            this.questionTags.value = question.tags?.join(', ') || '';
            this.questionPoints.value = question.points;
            this.questionShuffle.checked = question.shuffle || false;
            this.questionStatus.value = question.status;
            
            // Set question type
            document.querySelector(`input[name="questionType"][value="${question.type}"]`).checked = true;
        }
    }
    
    // Confirm question deletion
    confirmDeleteQuestion(questionId) {
        if (confirm("Are you sure you want to delete this question?")) {
            this.deleteQuestion(questionId);
        }
    }
    
    // Delete question
    deleteQuestion(questionId) {
        this.state.questions = this.state.questions.filter(q => q.id != questionId);
        this.renderQuestionCards();
        
        this.showToast("Question deleted successfully", "success");
    }
    
    // Show question modal
    showQuestionModal(question) {
        const modalId = 'questionModal';
        
        // Remove old modal if exists
        const existingModal = document.getElementById(modalId);
        if (existingModal) existingModal.remove();
        
        const modalHtml = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content dark-theme">
                        <div class="modal-header">
                            <h5 class="modal-title">${question.title}</h5>
                            <span class="badge bg-primary">${question.category}</span>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${question.description}</p>
                            <div class="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    <small class="text-muted me-3">ID: ${question.id}</small>
                                    <small class="text-muted">Last updated: ${this.formatDate(question.updatedAt)}</small>
                                </div>
                                <a href="${question.fileLink}" class="btn btn-primary" target="_blank">
                                    <i class="bi bi-box-arrow-up-right me-1"></i>Open
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                <i class="bi bi-x-lg me-1"></i>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
        
        // Remove modal from DOM when hidden
        document.getElementById(modalId).addEventListener('hidden.bs.modal', () => {
            document.getElementById(modalId).remove();
        });
    }
    
    // Add answer option to question form
    addAnswerOption() {
        const optionsContainer = document.querySelector('.answer-options');
        const optionCount = optionsContainer.children.length + 1;
        
        const optionHtml = `
            <div class="input-group mb-2">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="radio" name="correctAnswer" value="${optionCount}">
                </div>
                <input type="text" class="form-control dark-input" placeholder="Option ${optionCount}" required>
                <button class="btn btn-outline-danger remove-option" type="button">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        
        optionsContainer.insertAdjacentHTML('beforeend', optionHtml);
        
        // Add event listener to remove button
        optionsContainer.lastElementChild.querySelector('.remove-option').addEventListener('click', (e) => {
            e.currentTarget.closest('.input-group').remove();
        });
    }
    
    // Preview question
    previewQuestion() {
        // Get form values
        const title = this.questionTitle.value || "Question Preview";
        const content = this.questionText.innerHTML || "<p>Question content goes here</p>";
        const type = document.querySelector('input[name="questionType"]:checked').value;
        
        // Set preview content
        document.getElementById('previewQuestionTitle').textContent = title;
        document.getElementById('previewQuestionText').innerHTML = content;
        
        // Handle different question types
        const optionsContainer = document.getElementById('previewOptionsContainer');
        optionsContainer.innerHTML = '';
        
        if (type === 'multiple') {
            // Get options from form (simplified for demo)
            const options = Array.from(document.querySelectorAll('.answer-options .form-control'))
                .map(input => input.value || `Option ${input.placeholder}`);
            
            options.forEach((option, index) => {
                const optionHtml = `
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="previewOptions" id="previewOption${index + 1}">
                        <label class="form-check-label" for="previewOption${index + 1}">
                            ${option}
                        </label>
                    </div>
                `;
                optionsContainer.insertAdjacentHTML('beforeend', optionHtml);
            });
        } else if (type === 'truefalse') {
            optionsContainer.innerHTML = `
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="previewOptions" id="previewTrue">
                    <label class="form-check-label" for="previewTrue">
                        True
                    </label>
                </div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="previewOptions" id="previewFalse">
                    <label class="form-check-label" for="previewFalse">
                        False
                    </label>
                </div>
            `;
        } else if (type === 'short') {
            optionsContainer.innerHTML = `
                <div class="mb-3">
                    <label for="previewShortAnswer" class="form-label">Your answer:</label>
                    <input type="text" class="form-control dark-input" id="previewShortAnswer">
                </div>
            `;
        } else if (type === 'essay') {
            optionsContainer.innerHTML = `
                <div class="mb-3">
                    <label for="previewEssayAnswer" class="form-label">Your answer:</label>
                    <textarea class="form-control dark-input" id="previewEssayAnswer" rows="5"></textarea>
                </div>
            `;
        }
        
        // Show preview modal
        this.questionPreviewModal.show();
    }
    
    // Save question
    saveQuestion(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.questionForm.checkValidity()) {
            this.questionForm.classList.add('was-validated');
            return;
        }
        
        // Get form values
        const title = this.questionTitle.value;
        const content = this.questionText.innerHTML;
        const category = this.questionCategory.value;
        const difficulty = this.questionDifficulty.value;
        const tags = this.questionTags.value.split(',').map(tag => tag.trim());
        const points = parseInt(this.questionPoints.value) || 1;
        const shuffle = this.questionShuffle.checked;
        const status = this.questionStatus.value;
        const type = document.querySelector('input[name="questionType"]:checked').value;
        
        // In a real app, this would be an API call to save the question
        const newQuestion = {
            id: Date.now(), // Temporary ID
            title,
            description: content,
            category,
            difficulty,
            tags,
            points,
            shuffle,
            status,
            type,
            createdAt: new Date(),
            updatedAt: new Date(),
            fileLink: "#" // Placeholder for demo
        };
        
        // Add to questions array
        this.state.questions.unshift(newQuestion);
        
        // Update UI
        this.renderQuestionCards();
        this.showQuestionsSection();
        
        this.showToast("Question saved successfully", "success");
    }
    
    // Show toast notification
    showToast(message, type = 'info') {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: `toast-${type}`,
            style: {
                background: "var(--bg-secondary)",
                borderLeft: `4px solid var(--${type}-color)`,
                color: "var(--text-primary)"
            }
        }).showToast();
    }
    
    // Helper: Format date
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    
    // Helper: Capitalize first letter
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Helper: Get difficulty badge class
    getDifficultyBadgeClass(difficulty) {
        switch (difficulty) {
            case 'easy': return 'bg-success';
            case 'medium': return 'bg-warning';
            case 'hard': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }
    
    // Helper: Get status badge class
    getStatusBadgeClass(status) {
        switch (status) {
            case 'published': return 'bg-success';
            case 'draft': return 'bg-secondary';
            case 'archived': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }
}

// Initialize the portal when the script loads
const portal = new QuestionPortal();