// Button sounds
document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');
    const soundLinks = document.querySelectorAll('.sound');

    soundLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
                console.log('Hover sound played');
            });

        link.addEventListener('click', function(event) {
            const actualLink = this.tagName === 'A' ? this : this.querySelector('a');
            const destination = actualLink ? actualLink.getAttribute('href') : null;
            if (!destination) return;

            event.preventDefault();
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});

            const navigate = () => {
                window.location.href = destination
            }

            clickSound.onended = navigate;
            setTimeout(navigate, 250)
        });
    });
});