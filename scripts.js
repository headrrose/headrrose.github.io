const music = document.getElementById('background-music');
document.addEventListener('click', () =>{
    music.play();
}, {once: true});

const correctButton = document.getElementById("correct");

const allButtons = document.querySelectorAll('.options button');
const nextButton = document.getElementById('next-button');

allButtons.forEach(button => {
    button.addEventListener('click', function() {
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn !== button) {
                btn.classList.add("dimmed");
                btn.style.opacity = "0.8";
            }
        });

        if (button === correctButton) {
            correctButton.style.background = 'green';
            correctButton.style.color = 'white';
            correctButton.style.border = '3.5px solid #0c472f';
        } else {
            button.style.background = 'red';
            button.style.color = 'white';
            button.style.border = '3.5px solid #711515';
        }
    });
});
