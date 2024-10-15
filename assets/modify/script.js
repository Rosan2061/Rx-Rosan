// Function to check the password
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const errorMessage = document.getElementById("errorMessage");
    const welcomePopup = document.getElementById("welcomePopup");

    if (password === "Rosan123") {
        document.getElementById("passwordSection").style.display = "none";
        welcomePopup.style.display = "block";
        errorMessage.textContent = "";

        // Redirect to index.html after a short delay (optional)
        setTimeout(() => {
            window.location.href = 'image.html'; // Redirect to index.html
        }, 1000); // Adjust the delay (in milliseconds) if needed
    } else {
        errorMessage.textContent = "Incorrect password. Try again!";
    }
}

// Event listener for "Enter" key press to submit password
document.getElementById("passwordInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkPassword();  // Call the function when Enter is pressed
    }
});

