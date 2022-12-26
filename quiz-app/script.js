const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "JavaScript Object Notation",
    c: "Cascading Style Sheet",
    d: "Helicopters Terminals Motorboats Lamboginis",
    correct: "ans-a",
  },
  {
    question: "What is the most popular language of programming?",
    a: "Java",
    b: "C++",
    c: "JavaScript",
    d: "Python",
    correct: "ans-c",
  },
  {
    question: "What is the most delicious dish which you have ever eaten?",
    a: "roasted meat",
    b: "tofu in tomato sauce",
    c: "beef noodle soup",
    d: "roasted sesame fish",
    correct: "ans-b",
  },
  {
    question: "Who is the President of Vietnam?",
    a: "Nguyen Phu Trong",
    b: "Vuong Dinh Hue",
    c: "Pham Minh Chinh",
    d: "Nguyen Xuan Phuc",
    correct: "ans-d",
  },
  {
    question: "How many ethnic groups does Vietnam have?",
    a: "56",
    b: "55",
    c: "54",
    d: "50",
    correct: "ans-c",
  },
  {
    question: "Which province does the northernmost point of VietNam belong to?",
    a: "Lào Cai",
    b: "Hà Giang",
    c: "Bắc Cạn",
    d: "Tuyên Quang",
    correct: "ans-b",
  },
  {
    question: "what is the thing I want to do with lover?",
    a: "Go to the camping",
    b: "Kiss",
    c: "Hug",
    d: "visit family of bold side",
    correct: "ans-b",
  },
];

const question = document.getElementById("question-item");

const answerA = document.getElementById("answer-a");

const answerB = document.getElementById("answer-b");

const answerC = document.getElementById("answer-c");

const answerD = document.getElementById("answer-d");

const submit = document.getElementById("submit");

const backgroundContent = document.getElementById('background-content');

const radioList = document.getElementsByTagName("input");
console.log(radioList);
let currentQuestion = 0;
let score = 0;
loadData();

submit.addEventListener("click", () => {
  let result = check_checkBox();
  console.log(result);

  if (result) {
    if (result === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadData();
    } else {
      backgroundContent.innerHTML = 
      `<h2>You finished with ${score} / ${quizData.length} scores.</h2>
      <button onclick='location.reload()' class='Reload'>Reload</button>
      `
    }
  } else {
    alert("You have to tick the box to answer next question.");
  }
});

function loadData() {
  disableCheckBox();
  question.innerHTML = quizData[currentQuestion].question;
  answerA.innerHTML = quizData[currentQuestion].a;
  answerB.innerHTML = quizData[currentQuestion].b;
  answerC.innerHTML = quizData[currentQuestion].c;
  answerD.innerHTML = quizData[currentQuestion].d;
}

function check_checkBox() {
  let answer = undefined;
  for (let i = 0; i < radioList.length; i++) {
    if (radioList[i].checked) {
      answer = radioList[i].id;
    }
  }
  return answer;
}

function disableCheckBox() {
  for (let i = 0; i < radioList.length; i++) {
    radioList[i].checked = false;
  }
}
