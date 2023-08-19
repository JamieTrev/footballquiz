const questions = [{
    "question": "Which Country won the first-ever FIFA World Cup in 1930?",
    "answers": ["A. Brazil", "B. Germany", "C. Uruguay", "D. France"],
    "correctIndex": 2
}, {
    "question": "What is the name of the FC Barcelona stadium?",
    "answers": ["A. Santiago Bernabeu", "B. Camp Nou", "C. Allianz Arena", "D. San Siro"],
    "correctIndex": 1
}];

let currentQuestionIndex = 0;
let score = 0;

const nextButton = document.querySelector(".next-button");
const startButton = document.querySelector(".start-button");
const resultDiv = document.getElementById("result");
const scoreText = document.getElementById("score");
const quizContainers = document.querySelectorAll(".quiz-container");

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll(".quiz-button");

        const questionElement = document.querySelector(".quiz-question");
        questionElement.textContent = currentQuestion.question;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = currentQuestion.answers[i];
            buttons[i].classList.remove("correct", "wrong");
            buttons[i].disabled = false;
        }

        nextButton.style.display = "none";
        startButton.textContent = "Start over";
    } else {
        showResults();
    }
}

function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswerIndex = questions[currentQuestionIndex].correctIndex;
    const buttons = document.querySelectorAll(".quiz-button");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === questions[currentQuestionIndex].answers[correctAnswerIndex]) {
            button.classList.add("correct");
        }
        if (button.textContent === selectedAnswer && button.textContent !== questions[currentQuestionIndex].answers[correctAnswerIndex]) {
            button.classList.add("wrong");
        }
    });

    if (selectedAnswer === questions[currentQuestionIndex].answers[correctAnswerIndex]) {
        score++;
    }

    nextButton.style.display = "block";
}

function showResults() {
    for (let i = 0; i < quizContainers.length; i++) {
        quizContainers[i].style.display = "none";
    }
    resultDiv.style.display = "block";
    nextButton.style.display = "none";
    startButton.style.display = "block";

    scoreText.innerHTML = `You answered <strong>${score}</strong> out of <strong>${questions.length}</strong> questions correctly`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        for (let i = 0; i < quizContainers.length; i++) {
            quizContainers[i].style.display = "block";
        }
        resultDiv.style.display = "none";
        showQuestion();
    } else {
        showResults();
    }
});

startButton.addEventListener("click", () => {
    resetQuiz();
});

const answerButtons = document.querySelectorAll(".quiz-button");
answerButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
});

const quizContainer = document.getElementById("quiz");
const aboutContainer = document.getElementById("about");

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    for (let i = 0; i < quizContainers.length; i++) {
        quizContainers[i].style.display = "block";
    }
    resultDiv.style.display = "none";

    quizContainer.style.display = "block";
    aboutContainer.style.display = "none";
    startButton.textContent = "Start the Quiz";

    showQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    const homeLink = document.getElementById("home-link");
    const aboutLink = document.getElementById("about-link");

    homeLink.addEventListener("click", (event) => {
        event.preventDefault();
        resetQuiz();
    });

    aboutLink.addEventListener("click", (event) => {
        event.preventDefault();
        quizContainer.style.display = "none";
        aboutContainer.style.display = "block";
        startButton.textContent = "Start the Quiz";
    });
});
