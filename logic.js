// questions and options array of objects.
let questionArray = [

    {
        question: "What is 17 * 7 ?",
        options: {
            a: "119",
            b: "235",
            c: "108",
            d: "144"
        },
        correct: {
            a: "119"
        }
    },
    {
        question: " How many consonants are there in the English alphabet?",
        options: {
            a: "21",
            b: "5",
            c: "20",
            d: "14"
        },
        correct: {
            a: "21"
        }
    },
    {
        question: "Which of these are not programming languages ?",
        options: {
            a: "science",
            b: "java",
            c: "python",
            d: "php"
        },
        correct: {
            a: "science"
        }
    },
    {
        question: "who is the fastest animal on earth ?",
        options: {
            a: "panda",
            b: "tiger",
            c: "kangaroo",
            d: "lion"
        },
        correct: {
            a: "kangaroo"
        }
    },
    {
        question: "Which of these are not scripting languages ?",
        options: {
            a: "php",
            b: "javascript",
            c: "kotlin",
            d: "java"
        },
        correct: {
            a: "java"
        }
    },

];

// Selecting DOM elements.
const firstContainerElement = document.getElementById('first-container');
const secondContainerElement = document.getElementById('second-container');
const thirdContainerElement = document.getElementById('third-container');
const startGameButton = document.getElementById('start-button');
const countDown = document.getElementById('countdown');
const question = document.getElementById('question');
const optionsButtonElement = document.getElementById('option-button');
const resultContainer = document.getElementById('result-container');
const time = document.getElementById('time');
const circle = document.getElementById('circle');

// current question index variable we need for new question.
let questionIndex = 0;
let userScore = 0;
let totalTime = 4;
let setTime;

// Event of start game button.
startGameButton.addEventListener('click', startGame);

// start game function().
function startGame() {
    secondContainerElement.classList.remove('hide');
    firstContainerElement.classList.add('hide');
    counterToReadyQuiz();
}

// counter to ready the game in 3 seconds.
let counterToReadyQuiz = () => {
    let countdown = 3;
    let setCountDown = setInterval(() => {
        if (countdown >= 1) {
            countDown.innerText = countdown;
            countdown--;
        } else {
            clearInterval(setCountDown);
            secondContainerElement.classList.add('hide');
            thirdContainerElement.classList.remove('hide');
            circle.classList.add('animate');
            questionArray = questionArray.sort(() => Math.random() - .5);
            timer();
            randomQuestion(questionArray);
        }
    }, 800);
}

// timer() to show the questions while time is running.
let timer = () => {
    setTime = setInterval(() => {
            if (totalTime >= 0) {
                time.textContent = totalTime;
                totalTime--;
            } else {
                time.textContent = 5;
                totalTime = 4;
                previousQuestionCheck();
                questionIndex++;
                randomQuestion();
            }
        },
        1000);
}

// randomQuestion() to pass random question each time.
let randomQuestion = () => {
    if (questionIndex < questionArray.length) {
        setQuestion(questionArray[questionIndex]);
    } else {
        clearInterval(setTime);
        showScore();
    }
}

// setQuestion() to set the question in DOM.
let setQuestion = (quest) => {
    const correctAnswer = Object.values(quest.correct);
    question.innerText = quest.question;
    for (let opt in quest.options) {
        const button = document.createElement('button');
        button.innerText = quest.options[opt];
        button.classList.add('opt-btn');
        optionsButtonElement.appendChild(button);
        if (button.textContent == correctAnswer) {
            button.classList.add('correct');
        }
        button.addEventListener('click', (e) => {
            selectedAnswer(e.target, correctAnswer);
        });
    }
}

// selectAnswer() to check if the user has selected correct answer.
let selectedAnswer = (userSelectedOption, correct) => {
    if (correct.includes(userSelectedOption.textContent)) {
        userSelectedOption.style.background = '#24bf63';
        userScore++;
        clearInterval(setTime);
        setTimeout(() => {
            time.textContent = 5;
            totalTime = 4;
            timer();
            previousQuestionCheck();
            questionIndex++;
            randomQuestion();
        }, 500);
    } else {
        userSelectedOption.style.background = '#f22432';
        const data = document.getElementsByClassName('correct')[0];
        data.style.backgroundColor = '#24bf63';
        clearInterval(setTime);
        setTimeout(() => {
            time.textContent = 5;
            totalTime = 4;
            timer();
            previousQuestionCheck();
            questionIndex++;
            randomQuestion();
        }, 500);
    }
}

// previousQuestionCheck() to check for previous question, if it exist then remove it to move to the new question.
let previousQuestionCheck = () => {
    while (optionsButtonElement.firstChild) {
        optionsButtonElement.removeChild(optionsButtonElement.firstChild);
    }
}

// showScore() method shows the score of the player.
let showScore = () => {
    thirdContainerElement.classList.add('hide');
    let html = ``;
    if (userScore < 3) {
        html += ` 
        <div class="loser">
            <i class="fas fa-thumbs-down icon-2"></i>
            <h1 class="head-1">You lose!</h1>
        </div>
        <div class="result">
        <p class="para-1">Your Score is :&nbsp &nbsp<span class="para">${userScore} out of 5</span></p>
        </div>
        <div class="restart-button">
            <button type="button" class="btn btn-primary button-1" id="restart">Restart</button>
        </div>`;
    } else {
        html += `
        <div class="winner">
        <i class="fas fa-trophy icon-2"></i>
        <h1 class="head-2">You win!</h1>
        </div>
        <div class="result">
        <p class="para-2">Your Score is :&nbsp &nbsp<span class="para">${userScore} out of 5</span></p>
        </div>
        <div class="restart-button">
        <button type="button" class="btn btn-primary button-1" id="restart">Restart</button>
        </div>
        `;
    }
    resultContainer.innerHTML = html;
    const restart = document.getElementById('restart');
    restart.addEventListener('click', () => {
        window.location.reload();
    });
}