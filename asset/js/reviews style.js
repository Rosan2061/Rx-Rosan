    document.addEventListener('DOMContentLoaded', function() {
        const reviewCards = document.querySelectorAll('.review-card');
        let currentIndex = 0;
        let rotationInterval;
        let isPaused = false;

        // Initialize cards
        function initializeCards() {
            reviewCards.forEach((card, index) => {
                card.style.display = index === 0 ? 'flex' : 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Set background image for active state
                const imageUrl = card.getAttribute('data-image');
                card.style.setProperty('--bg-image', `url(${imageUrl})`);
            });

            // Show first card with animation
            setTimeout(() => {
                if (reviewCards[0]) {
                    reviewCards[0].style.opacity = '1';
                    reviewCards[0].style.transform = 'translateY(0)';
                    reviewCards[0].classList.add('current');
                }
            }, 100);
        }

        // Rotate to next review
        function rotateReviews() {
            if (isPaused) return;
            
            const currentCard = reviewCards[currentIndex];
            
            // Hide current card
            currentCard.style.opacity = '0';
            currentCard.style.transform = 'translateY(-20px)';
            currentCard.classList.remove('current');
            
            setTimeout(() => {
                currentCard.style.display = 'none';
                
                // Move to next card
                currentIndex = (currentIndex + 1) % reviewCards.length;
                const nextCard = reviewCards[currentIndex];
                
                // Show next card
                nextCard.style.display = 'flex';
                
                setTimeout(() => {
                    nextCard.style.opacity = '1';
                    nextCard.style.transform = 'translateY(0)';
                    nextCard.classList.add('current');
                }, 50);
                
            }, 500); // Wait for fade-out to complete
        }

        // Start auto-rotation
        function startRotation() {
            clearInterval(rotationInterval);
            rotationInterval = setInterval(rotateReviews, 5000);
        }

        // Toggle image background
        function toggleReviewImage(card) {
            // First close all other active cards
            document.querySelectorAll('.review-card').forEach(el => {
                if (el !== card) {
                    el.classList.remove('active');
                    el.style.backgroundImage = 'none';
                    el.style.backgroundColor = '#6a0dad';
                }
            });
            
            // Toggle the clicked card
            card.classList.toggle('active');
            
            // If active, set the background image
            if (card.classList.contains('active')) {
                const imageUrl = card.getAttribute('data-image');
                card.style.backgroundImage = `linear-gradient(rgba(106, 13, 173, 0.7), rgba(106, 13, 173, 0.7)), url(${imageUrl})`;
                
                // Pause rotation temporarily
                isPaused = true;
                clearInterval(rotationInterval);
                
                // Resume rotation after 5 seconds
                setTimeout(() => {
                    isPaused = false;
                    card.classList.remove('active');
                    card.style.backgroundImage = 'none';
                    card.style.backgroundColor = '#6a0dad';
                    startRotation();
                }, 5000);
            } else {
                card.style.backgroundImage = 'none';
                card.style.backgroundColor = '#6a0dad';
                isPaused = false;
                startRotation();
            }
        }

        // Initialize
        initializeCards();
        startRotation();

        // Pause rotation on hover
        const reviewsContainer = document.querySelector('.reviews-container');
        reviewsContainer.addEventListener('mouseenter', () => {
            isPaused = true;
            clearInterval(rotationInterval);
        });
        
        // Resume rotation when mouse leaves
        reviewsContainer.addEventListener('mouseleave', () => {
            isPaused = false;
            startRotation();
        });

        // Attach click handlers
        reviewCards.forEach(card => {
            card.addEventListener('click', function() {
                toggleReviewImage(this);
            });
        });
    });