// Button sounds
document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');
    const soundLinks = document.querySelectorAll('.sound');

    // Plays sound whenever user hovers over selected buttons
    soundLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
                console.log('Hover sound played');
            });

    // Plays sound whenever user clicks over selected buttons
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const destination = this.href;
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {

            });

            // Click sound activates then redirects user to href attached
            clickSound.onended = () => {
                window.location.href = destination;
            }
        setTimeout(() => {
            window.location.href = destination;
         },250);
        });
    });
});