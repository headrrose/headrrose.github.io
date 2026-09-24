const music = document.getElementById('background-music');
document.addEventListener('click', () =>{
    music.play();
}, {once: true});

function checkQuestion(answer){
    if (answer == 'correct'){
        document.getElementById('answer1').innerHTML = "You're correct!"
    } else if (answer == 'incorrect'){
        document.getElementById('answer1').innerHTML = "Wrong :P"
    }
}