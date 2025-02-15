// Handle Popup Window Display
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");

// Show the popup window every time the website is opened
window.onload = () => {
    popup.classList.add("show");
};

// Close the popup window
closePopupButton.addEventListener("click", () => {
    popup.classList.remove("show");
});