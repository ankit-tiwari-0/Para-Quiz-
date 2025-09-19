const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which festival marks the end of Ramadan in Islam?",
    answers: [
      { text: "Eid al-Fitr", correct: true },
      { text: "Bakrid", correct: false },
      { text: "Muharram", correct: false },
      { text: "Milad-un-Nabi", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
    question: "What type of architecture is the Qutub Minar known for?",
    answers: [
      { text: "Buddhist", correct: false },
      { text: "Hindu Temple", correct: false },
      { text: "Indo-Islamic", correct: true },
      { text: "Colonial", correct: false },
    ],
  },
  {
    question: "Which freedom fighter was hanged at the age of 23?",
    answers: [
      { text: "Lala Lajpat Rai", correct: false },
      { text: "Bhagat Singh", correct: true },
      { text: "Sukhdev", correct: false },
      { text: "Chandrashekhar Azad", correct: false },
    ],
  },
  {
    question: "Which song includes the lyrics: 'Main phir bhi tumko chahunga...'",
    answers: [
      { text: "Ae Dil Hai Mushkil", correct: false },
      { text: "Half Girlfriend", correct: true },
      { text: "Kabir Singh", correct: false },
      { text: "Kal Ho Naa Ho", correct: false },
    ],
  },
  {
    question: "Which political group currently governs the Gaza Strip?",
    answers: [
      { text: "Hamas", correct: true },
      { text: "Fatah", correct: false },
      { text: "Palestinian Authority", correct: false },
      { text: "Islamic Jihad", correct: false },
    ],
  },
  {
    question: "Which spice was once so valuable it was used as currency in ancient India?",
    answers: [
      { text: "Saffron", correct: false },
      { text: "Black pepper", correct: true },
      { text: "Cardamom", correct: false },
      { text: "Cinnamon", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

// Initialize scores
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

// Display the current question
function showQuestion() {
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

// Show final result
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "You nailed it perfectly!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Almost nailed it, superstar! 🌟";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Thik hai, pass ho gaya😂";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Abey anpad hi reh jaoge 😏";
  } else {
    resultMessage.textContent = "Abey ja ja! Padhai kar🤡";
  }
}

// Restart the quiz
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
