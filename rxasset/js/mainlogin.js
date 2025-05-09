// Enhanced Question Portal with improved session management
class QuestionPortal {
    constructor() {
        // DOM elements
        this.loginForm = document.getElementById('loginForm');
        this.loginError = document.getElementById('loginError');
        this.mainContent = document.getElementById('mainContent');
        this.questionCardsContainer = document.getElementById('questionCards');
        this.loggedInUserSpan = document.getElementById('loggedInUser');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.noResults = document.getElementById('noResults');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.sessionTimeSpan = document.getElementById('sessionTime');
        this.sessionTimeoutModal = new bootstrap.Modal(document.getElementById('sessionTimeoutModal'));
        this.countdownSpan = document.getElementById('countdown');
        this.extendSessionBtn = document.getElementById('extendSession');
        
        // Configuration
        this.sessionTimeoutMinutes = 30; // Session timeout in minutes
        this.sessionWarningMinutes = 2; // Show warning X minutes before timeout
        this.checkSessionInterval = 60000; // Check session every minute
        
        // Valid credentials (in a real app, this would be server-side with proper hashing)
        this.validCredentials = {
            username: "Rosan",
            password: this.hashPassword("Rosan2061") // Store hashed password
        };
        
        // Questions data
        this.questions = [
            {
                id: 1,
                title: "Question Model 1",
                description: "This is the QUESTION MODEL 1 of korean language exam",
                category: "Korean Language Exam QUESTION SET MODEL - 1",
                fileLink: "QSM1.html"
            },
            {
                id: 2,
                title: "PDF Model 1",
                description: "This is the PDF File Of Korean Basice.",
                category: "PDF",
                fileLink: "rxasset/file/한국 Basic RX' PASS = Rosan2061.pdf"
            },
            {
                id: 3,
                title: "Question Model 2",
                description: "This is the QUESTION MODEL 2 of korean language exam",
                category: "Korean Language Exam QUESTION SET MODEL - 1",
                fileLink: "QSM2.html"
            },
        ];
        
        // Initialize
        this.init();
    }
    
    init() {
        // Event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.checkExistingSession();
            this.setCurrentYear();
            this.setupPasswordToggle();
            this.setupBeforeUnload();
        });
        
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
        this.searchInput.addEventListener('input', () => this.filterQuestions());
        this.searchButton.addEventListener('click', () => this.filterQuestions());
        this.categoryFilter.addEventListener('change', () => this.filterQuestions());
        this.darkModeToggle.addEventListener('change', () => this.toggleDarkMode());
        this.extendSessionBtn.addEventListener('click', () => this.extendSession());
        
        // Session monitoring
        setInterval(() => this.checkSessionTimeout(), this.checkSessionInterval);
    }
    
    // Set up beforeunload event to detect window closing
    setupBeforeUnload() {
        window.addEventListener('beforeunload', (e) => {
            const savedSession = localStorage.getItem('questionPortalSession');
            if (savedSession) {
                // Set a flag to indicate the window is closing
                sessionStorage.setItem('isWindowClosing', 'true');
            }
        });
        
        // Check if the page is being refreshed or closed
        window.addEventListener('load', () => {
            const isWindowClosing = sessionStorage.getItem('isWindowClosing');
            if (isWindowClosing === 'true') {
                sessionStorage.removeItem('isWindowClosing');
                this.clearSession();
            }
        });
    }
    
    // Simulate password hashing
    hashPassword(password) {
        // This is a simple simulation - in production use bcrypt or similar
        return password.split('').reverse().join('') + password.length;
    }
    
    setCurrentYear() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }
    
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
    
    handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value.trim() || username;
        
        // Show loading state
        const submitBtn = this.loginForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Simulate network delay
        setTimeout(() => {
            if (username === this.validCredentials.username && 
                this.hashPassword(password) === this.validCredentials.password) {
                this.loginError.classList.add('d-none');
                
                const sessionData = {
                    username,
                    name,
                    timestamp: new Date().getTime()
                };
                
                this.startSession(sessionData);
                this.loginForm.reset();
            } else {
                this.loginError.textContent = "Invalid username or password";
                this.loginError.classList.remove('d-none');
            }
            
            submitBtn.classList.remove('loading');
        }, 800);
    }
    
    startSession(sessionData) {
        localStorage.setItem('questionPortalSession', JSON.stringify(sessionData));
        
        document.querySelector('.login-container').classList.add('d-none');
        this.mainContent.classList.remove('d-none');
        this.loggedInUserSpan.textContent = sessionData.name || sessionData.username;
        
        this.updateSessionTime();
        this.renderQuestionCards();
        
        // Set up periodic session time updates
        this.sessionTimeInterval = setInterval(() => this.updateSessionTime(), 60000);
    }
    
    handleLogout() {
        this.clearSession();
        this.mainContent.classList.add('d-none');
        document.querySelector('.login-container').classList.remove('d-none');
        this.loggedInUserSpan.textContent = '';
        this.questionCardsContainer.innerHTML = '';
        
        // Clear session time interval
        if (this.sessionTimeInterval) {
            clearInterval(this.sessionTimeInterval);
        }
    }
    
    clearSession() {
        localStorage.removeItem('questionPortalSession');
    }
    
    updateSessionTime() {
        const savedSession = localStorage.getItem('questionPortalSession');
        if (savedSession) {
            const sessionData = JSON.parse(savedSession);
            const elapsedMinutes = Math.floor((new Date().getTime() - sessionData.timestamp) / 60000);
            this.sessionTimeSpan.textContent = `${elapsedMinutes} minute${elapsedMinutes !== 1 ? 's' : ''} ago`;
        }
    }
    
    checkSessionTimeout() {
        const savedSession = localStorage.getItem('questionPortalSession');
        if (savedSession) {
            const sessionData = JSON.parse(savedSession);
            const elapsedMinutes = Math.floor((new Date().getTime() - sessionData.timestamp) / 60000);
            const remainingMinutes = this.sessionTimeoutMinutes - elapsedMinutes;
            
            if (remainingMinutes <= 0) {
                this.handleLogout();
            } else if (remainingMinutes <= this.sessionWarningMinutes && !this.sessionTimeoutModal._isShown) {
                this.showSessionWarning(remainingMinutes);
            }
        }
    }
    
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
    
    extendSession() {
        clearInterval(this.countdownInterval);
        this.sessionTimeoutModal.hide();
        
        const savedSession = localStorage.getItem('questionPortalSession');
        if (savedSession) {
            const sessionData = JSON.parse(savedSession);
            sessionData.timestamp = new Date().getTime();
            localStorage.setItem('questionPortalSession', JSON.stringify(sessionData));
            this.updateSessionTime();
        }
    }
    
    renderQuestionCards(questions = this.questions) {
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
                    <div class="text-muted">Category: ${question.category}</div>
                    <div class="mt-3 text-end">
                        <button class="btn btn-outline-primary view-details" data-id="${question.id}">
                            <i class="bi bi-eye me-1"></i>View Details
                        </button>
                    </div>
                </div>
            `;
            this.questionCardsContainer.appendChild(card);
            
            // Add animation
            setTimeout(() => {
                card.querySelector('.question-card').style.animation = 'cardEntrance 0.5s ease-out forwards';
            }, 10);
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const questionId = e.currentTarget.getAttribute('data-id');
                this.viewQuestionDetails(questionId);
            });
        });
    }
    
    filterQuestions() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const categoryFilter = this.categoryFilter.value;
        
        const filteredQuestions = this.questions.filter(question => {
            const matchesSearch = question.title.toLowerCase().includes(searchTerm) || 
                                question.description.toLowerCase().includes(searchTerm) ||
                                question.category.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || question.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        this.renderQuestionCards(filteredQuestions);
    }
    
    viewQuestionDetails(questionId) {
        const question = this.questions.find(q => q.id == questionId);
        if (question) {
            this.showQuestionModal(question);
        }
    }
    
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
                                <small class="text-muted">ID: ${question.id}</small>
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
    
    toggleDarkMode() {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
        
        // Save preference
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkMode', isDark);
    }
}

// Initialize the portal when the script loads
const portal = new QuestionPortal();

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'false') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.getElementById('darkModeToggle').checked = false;
}