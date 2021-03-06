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
var clearBtn = document.querySelector("#clear-scores");

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
var playerInitials = document.querySelector("#initial-input");

//displays scores after user input inititals
var viewHighscoresEl = document.querySelector("#hiscores");
var highscoreListEl = document.querySelector("#hiscore-list");
var highScoreArray = [];
var storedHighScores = []; //coming from localstorage

var timerInterval; //declared here so i can stop it later in stopTimer()

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

         timerInterval = setInterval(function() {
            secondsLeft--;
            timerEl.textContent = "Time: " + secondsLeft + "s";
            
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                UserHighScore();
            }
        },1000);

        displayQuestions(quizQuestions) //displays questions after timer begins
}

///////////////////////function for displaying the questions to tha page////////////
function displayQuestions() {
    
     if (questions[quizQuestions] === undefined) {
         UserHighScore()
        
     }

    questionEl.textContent = questions[quizQuestions].question;
    asw1Btn.textContent = questions[quizQuestions].answers[0];
    asw2Btn.textContent = questions[quizQuestions].answers[1];
    asw3Btn.textContent = questions[quizQuestions].answers[2];
    asw4Btn.textContent = questions[quizQuestions].answers[3];

    asw1Btn.onclick = function(event){
        checkAnswer(event)
    };
    asw2Btn.onclick = function(event){
        checkAnswer(event)
     };
    asw3Btn.onclick = function(event){
        checkAnswer(event)
    };
    asw4Btn.onclick = function(event){
        checkAnswer(event)
    };
    
    

}

////check if answer is correct
function checkAnswer(event) {
    
   userAnswer = event.target.textContent
   console.log(userAnswer);
   event.preventDefault();

   correctWrong.style.display = "block";  //displayed user notif div and appands a <p> to it
   var p = document.createElement("p");
   correctWrong.appendChild(p);

   setTimeout(function () {
    p.style.display = 'none';
   }, 1300);

    if (questions[quizQuestions].correctAnswer === userAnswer) {
        secondsLeft += 5;     //add 5s & notify user
        p.textContent = "Correct 👍 +5s"

    }else if (questions[quizQuestions].correctAnswer !== userAnswer) {
        secondsLeft -= 10;    //deduct 10s & notify user
        p.style.color = "red";
        p.textContent = "Wrong 👎 -10s"
    }
    
    if (quizQuestions < questions.length) {
        quizQuestions++;
        
    }

    
    setTimeout(displayQuestions, 2000); //adds 2s between questions so user can see right or wrong
    

}
//high score submit function
function UserHighScore() {
    
    playerScore.textContent = secondsLeft; //displays user score

    scoreEl.style.display = "block";
    viewHighscoresEl.style.display = "block";
    questionsEl.style.display = "none";

    stopTimer();
    getStorage();
    
}
    
    function savingScore() {
    
    
    var userInitials = playerInitials.value.toUpperCase(); //captures users initials and forces uperrcase
    console.log(userInitials);

    //  if (!playerInitials) { 
    //      alert("Please enter your initials")
    //  }

 highScoreArray.push({ initials: userInitials, score: secondsLeft });
    console.log (highScoreArray);

    highscoreListEl.innerHTML = "";
    for (var i = 0; i < highScoreArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = "Initials: " + highScoreArray[i].initials + " ------------ " + " Score: " + highScoreArray[i].score;
        highscoreListEl.appendChild(li);

    }
    //add or get stored highscores from storage
    addToStorage();
    
}

//stores the highScoreArray as a string to local storage
function addToStorage() {
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
}

function getStorage() {
    //grab the high scores from local storage & parse into an object again
    var storedHighScores = JSON.parse(localStorage.getItem("highScoreArray"));
    console.log(storedHighScores);

    if (storedHighScores !== null) {
        highScoreArray = storedHighScores;
        console.log(highScoreArray);
    }
}

function stopTimer() {
    clearInterval(timerInterval); 
}







////////////////////////event listeners//////////////////////
startBtn.addEventListener("click", startQuiz)

submitBtn.addEventListener("click", savingScore)

restartBtn.addEventListener("click", function () {
    window.location.href="../index.html"
});

viewHighscores.addEventListener("click", function() {
    introEl.style.display = "none"
    viewHighscoresEl.style.display = "block";
    getStorage();

} )

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    clearBtn.innerHTML = "<b>Highscores Cleared!</b>";
    setTimeout(function () {
        clearBtn.textContent = "Clear Highscores";
       }, 1700);
    

})








