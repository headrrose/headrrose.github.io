// Button sounds
document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');
    const soundLinks = document.querySelectorAll('.sound');

    soundLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
                console.log('Hover sound played');
            });

        link.addEventListener('click', function(event) {
            event.preventDefault();
            const destination = this.href;
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {

            });

            clickSound.onended = () => {
                window.location.href = destination;
            }
        setTimeout(() => {
            window.location.href = destination;
         },250);
        });
    });
});

const music = document.getElementById('background-music');
document.addEventListener('click', () =>{
    music.play();
}, {once: true});


// List of questions
const quizData = [
    {
        question: "What's the first principle of animation?",
        options: ["Staging", "Anticipation", "Squash and stretch", "Ease in, Ease out"],
        answer: "Squash and stretch"
    },   
    {
        question: "What is the term for the process of creating smooth transitions between keyframes?",
        options: ["In-betweening", "Keyframing", "Timing", "Exaggeration"],
        answer: "In-betweening"
    },
    {
        question: "What's the name of the 3D skeleton used to move a character?",
        options: ["Rendering", "Rigging", "Texturing", "Modelling"],
        answer: "Rigging"        
    },
    {
        question: "Which type of animation is flat in appearance?",
        options: ['Computer animation', '3d animation', '2d animation', '1d animation'],
        answer: "2d animation"
    },
    {
        question: "Digital animation can be used to make which of the following?",
        options: ["Interactive advertisements", "Games", "Clickable tutorials", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What's the traditional speed of frames in a 2D animated motion picture?",
        options: ["It varies depending on the number of drawings", "24 frames per second", "12 frames per second", "48 frames per second"],
        answer: "24 frames per second"
    },
    {
        question: "Who discovered the 12 principles of animation?",
        options: ["Frank Thomas and Ollie Johnston", "Muri Mytton and Jasper Jacinto", "Reynold Dwight and Connor McMurphy", "A team of unnamed animators"],
        answer: "Frank Thomas and Ollie Johnston"
    },
    {
        question: "Which principle defines how long an action takes from start to finish?",
        options: ["Anticipation", "Longitudinal motion", "Secondary action", "Timing"],
        answer: "Timing"
    },
    {
        question: "What's the purpose of using 'Anticipation' before a major action? ",
        options: ["To increase the frame-rate of the scene", "To create a motion lag in accessories", "So the character maintains a constant volume", "To prepare the audience for an action"],
        answer: "To prepare the audience for an action"
    },
    {
        question: "What is the term for the exaggeration of movement or expression in animation?",
        options: ["Exaggeration", "Anticipation", "Follow-through", "Secondary action"],
        answer: "Exaggeration"
    },    
    {
        question: "A simple 20 second animation can take months to produce.",
        options: ["True", "False"],
        answer: "True"
    },    
    {
        question: "Frame-based animation is like a \"flipbook\"",
        options: ["True", "False"],
        answer: "True"
    },
    {
        question: "\"Steamboat Willie\" was the first ever animation with synchronized sound.",
        options: ["True", "False",],
        answer: "False"
    },    
    {
        question: "Which one of these isn't a principle of animation?",
        options: ["Anticipation", "Follow-through", "Ease-in-Ease-Out", "Preservation"],
        answer: "Preservation"
    },
    {
        question: "A keyframe is:",
        options: ["A software", "An animation technique", "A still image", "An audio file"],
        answer: "A still image"        
    },
    {
        question: "Which animation technique was first introduced?",
        options: ["Stop motion", "Frame-by-frame", "Tweening", "Rotoscoping"],
        answer: "Frame-by-frame",
    },
    {
        question: "What core technique defines stop-motion animation across forms like claymation and puppet animation?",
        options: ["Using Keyframes automatically with computer algorithms", "Drawing frames one by one", "Manipulating objects and photographing them", "Tracing over continuous live footage"],
        answer: "Manipulating objects and photographing them"       
    },
    {
        question:"Why do so many natural movements in animation follow an arc rather than a straight line?",
        options: ["Joints rotate on a pivot, making curved paths seem natural","Straight lines require too many immediate keyframes, and slow down the process", "Arcs prevent the backrounds from moving out of sync", "Straight lines violate the rule of volume conservation established by squash and stretch"],
        answer: "Joints rotate on a pivot, making curved paths seem natural",
    },
    {
        question: "Is tracing animation allowed?",
        options: ["Always", "As long as it's for practice/Rotoscope", "Only if it isn't posted", "Never"],
        answer: "As long as it's for practice/Rotoscope"
    },
    {
        question: "What does FPS mean?",
        options: ["Frames per scene", "Figures per second","Frames per second","Figures per scene"],
        answer: "Frames per second"
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
    //Change background colour to make results pop out
    document.body.style.backgroundImage = 'radial-gradient(transparent 5%, #fef8e6ff), url(https://i.pinimg.com/236x/4e/df/14/4edf14c48c80a555bc4566a681965121.jpg)';

    counterElement.innerText = '';
    nextButton.style.display = 'none';

    music.pause();

    let customMessage = '';
    let resultMusicSrc = '';

    if (score === quizData.length) {
        customMessage = "Perfect score! You're an expert!";
        imgSrc = "images/Hapy-James.gif";
        resultMusicSrc = "sounds/Celebrate.mp3";
    } else if (score === quizData.length - 1) {
        customMessage = "Almost perfect! Great job!";
        imgSrc = "images/Happy-James.gif";
        resultMusicSrc = "sounds/Celebrate.mp3";
    } else if (score >= (quizData.length / 2) + 1) {
        customMessage = "Good job! You have a solid understanding.";
        imgSrc = "images/Relieved-James.gif";
        resultMusicSrc = "sounds/Normal.mp3";
    } else if (score <= 2) {
        customMessage = "Don't worry, everyone starts somewhere.";
        imgSrc = "images/Sad-James.gif";
        resultMusicSrc = "sounds/Fail.mp3";
    } else {
        customMessage = "Keep practicing! You'll get better!";
        imgSrc = "images/Normal-James.gif";
        resultMusicSrc = "sounds/Normal.mp3";
    }

    music.src = resultMusicSrc;
    music.load();
    music.play().catch(error => {
        console.log("audio autoplay restriction..", error)
    });

    quizContainer.innerHTML = `
        <div class="results">
            <h1 id="customMessage">${customMessage}</h1>
            <p id="score">Your score: ${score}/${quizData.length}</p>
            <div id="finish-btns">
                <button class="sound" id="restart-btn" onclick="location.reload()">Restart Quiz</button>
                <button class="sound" id="home-btn" onclick="window.location.href='index.html'">Go home</button>
            </div>
            <img id="James" src="${imgSrc}" alt="Image of James">
        </div>
    `;
}