function checkQuestion(answer){
    if (answer == 'correct'){
        document.getElementById('answer1').innerHTML = "You're correct!"
    } else if (answer == 'incorrect'){
        document.getElementById('answer1').innerHTML = "Wrong :P"
    }
}