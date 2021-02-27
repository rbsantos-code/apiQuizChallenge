let gameTime = document.getElementById("timer");
let startButton = document.querySelector(".start-btn");
let quizBoxEl = document.querySelector(".quizBox");
let questionEl = document.querySelector(".question");
let choiceButtons = document.querySelector("#btn");
let answerEl = document.querySelector("#answer");
let gamerTagEl = document.querySelector("#gamerTag");
let enterBtn = document.querySelector("#enter");

let timeClock;
var score = 0;

// QUESTIONS script start

var quizQuestions = [
    {
        question: "How many neighbors does Spongebob have?",
        choices: ["2 neighbors", "3 neighbors", "4 neighbors", "no neighbors"],
        answer: "2 neighbors"
    },
    {
        question: "What is Spongebob made of?",
        choices: ["Cheese!", "A block of wood!", "A Sponge!", "Chooocolate!"],
        answer: "A Sponge!"
    },
    {
        question: "Who is not part of the International Justice League of Super Acquaintances?",
        choices: ["Mermaid Man", "Barnacle Boy", "Captain Magma", "Bubble Bass"],
        answer: "Bubble Bass"
    },
    {
        question: "What does gary say in episode 22 to Spongebob?",
        choices: ["Meow", "meow?", "meow..", "MEOW!"],
        answer: "MEOW!"
    }
];

var time = quizQuestions.length * 10

var randomQuest;

var currentQuest = 0;



// BEGIN QUIZ section

function quizStart() {
    var gameStartEl = document.getElementById("game-start");
    gameStartEl.setAttribute("class", "start");

    // time length for game
    timeClock = setInterval(timeSecond, 1000);

    gameTime.textContent = time;

    htmlQuestion();
}



// QUESTIONS sections javascript

function htmlQuestion() {
    var showQuestion = quizQuestions[currentQuest];

    // Show question on html page
    var topQuest = document.getElementById("top-question");
    topQuest.textContent = showQuestion.question;

    // make previous questions not show
    answerEl.innerHTML = "";

    // function loop for the questions
    showQuestion.choices.forEach(function (choice) {
        // create buttons for each answer
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("value", choice);

        answerBtn.textContent = " " + choice;


        answerBtn.addEventListener("click", function (event) {
            questionEvent(event.target.textContent.trim());
        })

        // show on the page
        answerEl.appendChild(answerBtn);
    });

}

// FUNCTIONALITY SECTION -------

function questionEvent(incomingAnswer) {
    // player chooses wrong answer
    if (incomingAnswer !== quizQuestions[currentQuest].answer) {
        console.log('wrong');
        // reduce time
        time -= 5;

        if (time < 0) {
            time = 0;
        }
        // time section
        gameTime.textContent = time;

        // add feed back
        // when player choose right or wrong answer
    } 

    // next question
    currentQuest++;

    if (currentQuest === quizQuestions.length) {
        quizEnd();
        alert("Thanks for Playing! Type in your GamerTag to save!");
    } 
    if (time === 0) {
        quizEnd();
    }
    else {
        htmlQuestion();
    }
}



// STOP QUIZ SECTION

function quizEnd() {
    // stop game clock
    clearInterval(timeClock);
    if (time === 0) {
        alert("Game Over!");
    }

    // show game score
    var gameScoreEl = document.getElementById("game-score");
    gameScoreEl.textContent = time;

}


// This is the TIME function

function timeSecond() {
    time--;
    gameTime.textContent = time;

    if (time === 0) {
        quizEnd();
    }
}


// High Scores Section

function saveScore() {
    var gameTag = gamerTagEl.value.trim();

    if (gameTag !== "") {
        // retrieve scores from storage
        var highScore = JSON.parse(window.localStorage.getItem("highScore")) || [];


        var krabbyPatty = {
            score: time,
            gameTag: gameTag
        };


        //save 
        highScore.push(krabbyPatty);
        window.localStorage.setItem("highScore", JSON.stringify(highScore));
    }

}

function refreshPage() {
    window.location.reload();
}

// SHOW HIGHSCORE SECTION --------
function showScores() {

    var highScore = JSON.parse(window.localStorage.getItem("highScore")) || [];

    highScore.sort(function (a, b) {
        return a.gameTag - b.score;
    });

    highScore.forEach(function (score) {
        var scoreList = document.createElement("li");
        scoreList.textContent = score.gameTag + " | " + score.score;

        var listEl = document.getElementById("nameAndScore");
        listEl.appendChild(scoreList);
    });

}

// enter name
enterBtn.addEventListener("click", saveScore);
enterBtn.addEventListener("click", refreshPage);

// save Name and Info
showScores();

// intiate game

startButton.addEventListener("click", quizStart);



