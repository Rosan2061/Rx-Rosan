// Valid credentials (in a real app, this would be server-side)
const validCredentials = {
    username: "Rosan",
    password: "Rosan2061"
};

// Updated questions data with file links
const questions = [
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

// DOM elements
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const mainContent = document.getElementById('mainContent');
const questionCardsContainer = document.getElementById('questionCards');
const loggedInUserSpan = document.getElementById('loggedInUser');
const logoutBtn = document.getElementById('logoutBtn');

// Check for existing session on page load
document.addEventListener('DOMContentLoaded', function () {
    checkExistingSession();
    checkSessionTimeout();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

function checkExistingSession() {
    const savedSession = localStorage.getItem('questionPortalSession');

    if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        document.querySelector('.login-container').classList.add('d-none');
        mainContent.classList.remove('d-none');
        loggedInUserSpan.textContent = sessionData.name || sessionData.username;
        renderQuestionCards();
    }
}

// Login form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value || username;

    if (username === validCredentials.username && password === validCredentials.password) {
        loginError.classList.add('d-none');
        loginForm.reset();

        const sessionData = {
            username,
            name,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('questionPortalSession', JSON.stringify(sessionData));

        document.querySelector('.login-container').classList.add('d-none');
        mainContent.classList.remove('d-none');
        loggedInUserSpan.textContent = name;
        renderQuestionCards();
    } else {
        loginError.textContent = "Invalid username or password";
        loginError.classList.remove('d-none');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('questionPortalSession');
    mainContent.classList.add('d-none');
    document.querySelector('.login-container').classList.remove('d-none');
    loggedInUserSpan.textContent = '';
    questionCardsContainer.innerHTML = '';
});

// Render question cards (without download button)
function renderQuestionCards() {
    questionCardsContainer.innerHTML = '';

    questions.forEach(question => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="question-card h-100">
                <div class="card-icon">Q${question.id}</div>
                <h3>${question.title}</h3>
                <p>${question.description}</p>
                <div class="text-muted">Category: ${question.category}</div>
                <div class="mt-3 text-end">
                    <button class="btn btn-outline-primary view-details" data-id="${question.id}">
                        View Details
                    </button>
                </div>
            </div>
        `;
        questionCardsContainer.appendChild(card);
    });

    // View details functionality
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            const questionId = this.getAttribute('data-id');
            viewQuestionDetails(questionId);
        });
    });
}

// View question details (modal)
function viewQuestionDetails(questionId) {
    const question = questions.find(q => q.id == questionId);
    if (question) {
        showQuestionModal(question);
    }
}

function showQuestionModal(question) {
    const modalId = 'questionModal';

    // Remove old modal if exists
    const existingModal = document.getElementById(modalId);
    if (existingModal) existingModal.remove();

    const modalHtml = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- modal-dialog-centered added here -->
                <div class="modal-content dark-theme">
                    <div class="modal-header">
                        <h5 class="modal-title">${question.title}</h5>
                        
                    </div>
                    <div class="modal-body">
                        <p><strong>Category:</strong> ${question.category}</p>
                        <p><strong>Description:</strong> ${question.description}</p>
                        <div class="text-center mt-3">
                            <a href="${question.fileLink}" class="btn btn-primary" target="_blank">
                                Open
                            </a>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
}

// Optional: Add session timeout (e.g., 24 hours)
function checkSessionTimeout() {
    const savedSession = localStorage.getItem('questionPortalSession');
    if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

        if (new Date().getTime() - sessionData.timestamp > TWENTY_FOUR_HOURS) {
            localStorage.removeItem('questionPortalSession');
            logoutBtn.click(); // Trigger logout
        }
    }
}
