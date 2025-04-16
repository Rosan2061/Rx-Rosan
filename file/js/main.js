function showScreen(screenId) {
  const screens = ['startScreen', 'examScreen', 'resultScreen', 'detailScreen'];
  screens.forEach(id => {
    document.getElementById(id).style.display = (id === screenId) ? 'block' : 'none';
  });
}

// Initialize the start screen
showScreen('startScreen');