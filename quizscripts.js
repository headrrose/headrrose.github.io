const music = document.getElementById('background-music');
document.addEventListener('click', () =>{
    music.play();
}, {once: true});

// List of questions
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

// Elements
const correctButton = document.getElementById("correct");
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const counterElement = document.getElementById('question-counter');

// Variables
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function showQuestion () {

    // Increase question number
    counterElement.innerText = `Question ${currentQuestion + 1} !!`;

    // Show question, and assign question using [currentQuestion]
    const question = quizData[currentQuestion]; 
    questionElement.innerText = question.question;

    //If nothing is selected, no action is taken
    optionsElement.innerHTML = '';
    selectedOption = null;

    //Next button is hidden until an option is selected
    nextButton.style.display = 'none';

    // Create buttons for each option
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
    
    // Check if the selected option is correct and update score
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

    // Highlighting the buttons based on correct or incorrrect selection
    // + updating correct score
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

    // Displays next button + change text to "Finish Quiz" if it's the last question
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

// When next button is clicked, current question increases by 1 + next question is displayed. 
// If there are no more questions, the results are shown.
nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});

showQuestion();

// Displays final score + restart button
function showResults() {
    counterElement.innerText = '';
    nextButton.style.display = 'none';

    let customMessage = '';
    if (score === quizData.length) {
        customMessage = "Perfect score! You're an expert!";
    } else if (score >= quizData.length / 2) {
        customMessage = "Good job! You have a solid understanding.";
    } else {
        customMessage = "Keep practicing! You'll get better!";
    }

    quizContainer.innerHTML = `
        <div class="results">
            <h1 style="text-align: center; color: #c79a52">${customMessage}</h1>
            <p>Your score: ${score}/${quizData.length}</p>
            <button onclick="location.reload()">Restart Quiz</button>
        </div>
    `;
}