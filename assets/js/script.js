//page elemnts
//timer
var timerEl = document.querySelector("#timer");
var timeLeft = 80;

//intro screen
var introEl = document.querySelector("#intro");

//buttons
var viewHighscores = document.querySelector("#view-hiscore");
var startBtn = document.querySelector("#start");
var asw1Btn = document.querySelector("#asw1");
var asw2Btn = document.querySelector("#asw2");
var asw3Btn = document.querySelector("#asw3");
var asw4Btn = document.querySelector("#asw4");
var submitBtn = document.querySelector("#score-submit");
var restartBtn = document.querySelector("#play-again");

//q&a section
var questionsEl = document.querySelector("#questions");
// <h2> that holds the question for user
var questionEl = document.querySelector("#question");
// for div providing feedback if answer is right/wrong
var correctWrong = document.querySelector("#correct-wrong");
// question index counter
var quizQuestions = 0
var userAnswer


//post quiz section
var scoreEl = document.querySelector("#final-score");
var playerScore = document.querySelector("#player-score");
var playerInitials = document.querySelector("#initials-input");

//displays scores after user input inititals
var viewHighscoresEl = document.querySelector("#hiscores");
var highscoreListEl = document.querySelector("#hiscore-list");
var highscoreList = [];

var questions = [ 
    
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?",
        answers: ["1. #demo.innerHTML = 'Hello World!';", 
                "2. document.getElement('p').innerHTML = 'Hello World!';", 
                "3. document.getElementById('demo').innerHTML = 'Hello World!';", 
                "4. document.getElementByName('p').innerHTML = 'Hello World!';"],
        correctAnswer: "3. document.getElementById('demo').innerHTML = 'Hello World!';" 
    },  
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: ["1. The <body> section", 
                  "2. Both the <head> section and the <body> sections",
                  "3. The <head> section",
                  "4. The <footer> section"],
        correctAnswer: "2. Both the <head> section and the <body> sections"        
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["1. msg('Hello World');",
                  "2. alertBox('Hello World');",
                  "3. alert('Hello World');",
                  "4. msgBox('Hello World');"],
        correctAnswer: "3. alert('Hello World');"
    },  
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: ["1. var colors = 'red', 'green', 'blue'",
                  "2. var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
                  "3. var colors = (1:'red', 2:'green', 3:'blue')",
                  "4. var colors = ['red', 'green', 'blue']"],
        correctAnswer: "4. var colors = ['red', 'green', 'blue']"
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: ["1. ceil(x, y)",
                  "2. Math.max(x, y)",
                  "3. top(x, y)",
                  "4. Math.ceil(x, y)"],
        correctAnswer: "2. Math.max(x, y)"
    }
];


/////////////////starts the quiz/////////////////////////////
function startQuiz() {
    introEl.style.display = "none"; //removes intro screen and start button
    questionsEl.style.display = "block" // reveals the questions html

    secondsLeft = 60; //starting time when quiz start

        var timerInterval = setInterval(function() {
            secondsLeft--;
            timerEl.textContent = "Time: " + secondsLeft + "s";
            
            if (secondsLeft === 0) {
                clearInterval(timerInterval);

            }
        },1000);

        displayQuestions()
}

///////////////////////function for displaying the questions to tha page////////////
function displayQuestions() {
    questionEl.innerHTML = questions[quizQuestions].question;
    asw1Btn.innerHTML = questions[quizQuestions].answers[0];
    asw2Btn.innerHTML = questions[quizQuestions].answers[1];
    asw3Btn.innerHTML = questions[quizQuestions].answers[2];
    asw4Btn.innerHTML = questions[quizQuestions].answers[3];

    asw1Btn.onclick = function(event){
        quizQuestions ++;
        displayQuestions()
        checkAnswer(event)
        
        
    };
    asw2Btn.onclick = function(event){
        quizQuestions ++;
        displayQuestions()
        checkAnswer(event)

    };
    asw3Btn.onclick = function(event){
        quizQuestions ++;
        displayQuestions()
        checkAnswer(event)
    };
    asw4Btn.onclick = function(event){
        quizQuestions ++;
        displayQuestions()
        checkAnswer(event)
    };
    
    if (questions[quizQuestions] === undefined) {
        window.alert("quiz over");
    }

}

////check if answer is correct
function checkAnswer(event) {
    
   userAnswer = event.target.innerHTML
   console.log(userAnswer);

    if (userAnswer === questions[quizQuestions]["correctAnswer"]) {
        secondsLeft += 5
    }else {
        secondsLeft -= 10
    }
    
    console.log(secondsLeft);
}







////////////////////////event listeners//////////////////////
startBtn.addEventListener("click", function(){
    startQuiz()
})

