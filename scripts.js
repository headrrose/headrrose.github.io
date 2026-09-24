const popupOverlay = document.getElementById('exitPopupOverlay');
const closePopupBtn = document.getElementById('closePopupBtn');
let popupShown = false;

// Trigger popup on exit intent
document.addEventListener('mouseleave', (e) => {
  // e.clientY < 0 checks if the cursor has moved above the top edge of the window
  if (e.clientY < 0 && !popupShown) {
    popupOverlay.classList.add('show');
    popupShown = true; // Prevents the popup from firing repeatedly
  }
});

// Close popup when clicking the button
closePopupBtn.addEventListener('click', () => {
  popupOverlay.classList.remove('show');
});

// Close popup when clicking outside the box (on the overlay)
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('show');
  }
});
