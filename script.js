const questions = [{
    "question": "Which Country won the first-ever FIFA World Cup in 1930?",
    "answers": ["A. Brazil", "B. Germany", "C. Uruguay", "D. France"],
    "correctIndex": 2
}];

let currentQuestionIndex = 0;
let score = 0;

const nextButton = document.getElementById("next-button");

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
    } else {
        showResults();
    }
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

showQuestion();
