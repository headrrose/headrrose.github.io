const music = document.getElementById('background-music');
document.addEventListener('click', () =>{
    music.play();
}, {once: true});

//List of questions
const quizData = [
    {
        question: "What's the first principle of animation?",
        options: ["Staging", "Anticipation", "Squash and stretch", "Ease in, Ease out"],
        answer: "Squash and stretch",
    },
    {
        question: "Which animation technique was first introduced?",
        options: ["Stop motion", "Frame-by-frame", "Tweening", "Rotoscoping"],
        answer: "Frame-by-frame",
    },
    {
        question: "What is the term for the process of creating smooth transitions between keyframes?",
        options: ["In-betweening", "Keyframing", "Timing", "Exaggeration"],
        answer: "In-betweening"
    },
    {
        question: "What is the term for the process of drawing each frame individually?",
        options: ["In-betweening", "Keyframing", "Timing", "Frame-by-frame"],
        answer: "Frame-by-frame"
    }
]

//Elements
const correctButton = document.getElementById("correct");
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const counterElement = document.getElementById('question-counter');

//Variables
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function showQuestion () {
    counterElement.innerText = `Question ${currentQuestion + 1} !!`;
    const question = quizData[currentQuestion]; 
    questionElement.innerText = question.question;

    optionsElement.innerHTML = '';
    selectedOption = null;

    nextButton.style.display = 'none';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        optionsElement.appendChild(button);
        button.addEventListener('click', (e) => selectAnswer(e, option));
    });
}



function selectAnswer(e, optionText) {

    // Prevent multiple selections
    if (selectedOption !== null) return;

    selectedOption = optionText;
    const selectedButton = e.target;
    const correctAnswer = quizData[currentQuestion].answer;
    
    // Dimming unselected buttons
    const buttons = optionsElement.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button !== selectedButton) {
            button.classList.add('dimmed');
            button.style.opacity = '0.8';
        }
    });

    if (optionText === correctAnswer) {
        score++;
        selectedButton.classList.add('correct');
        selectedButton.style.background = 'green';
        selectedButton.style.color = 'white';
        selectedButton.style.border = '3.5px solid #0c472f';
    } else {
        selectedButton.classList.add('incorrect');
        highlightCorrectAnswer(correctAnswer);
        selectedButton.style.background = 'red';
        selectedButton.style.color = 'white';
        selectedButton.style.border = '3.5px solid #711515';
    }

    nextButton.style.display = 'block';
    nextButton.innerText = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question';
}

function highlightCorrectAnswer(correctAnswer) {
    const buttons = optionsElement.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
            button.style.background = 'green';
            button.style.color = 'white';
            button.style.border = '3.5px solid #0c472f';
        }
    });
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});

showQuestion();

function showResults() {
    counterElement.innerText = '';
    quizContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${quizData.length}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}