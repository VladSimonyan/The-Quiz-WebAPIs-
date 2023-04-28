var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var timeInterval = 0;
var secondsLeft = 75
var penalty = 10;
var score = 0;
var questionsDiv = document.querySelector("#questionsDiv");
var questionIndex = 0;
var unorderedList = document.querySelector("#unorderedList");
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");


var questions = [
    {
        title: "Which of the following do not include commonly used data types?:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Where is the correct place to insert JavaScript?",
        choices: ["the <head>", "the bottom of the <body>", "anywhere in the HTML", "anywhere in the stylesheet"],
        answer: "the bottom of the <body>"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World)", "alertBox('Hello World')", "alert('Hello World')", "msg('Hello World)"],
        answer: "alert('Hello World')"
    },
    {
        title: "Which is the correct way to call a function called myFunction?",
        choices: ["myFunction()", "call myFunction()", "call function myFunction", "call select myFunction"],
        answer: "myFunction()"
    },
    {
        title: "How do you write an IF statement in JavaScript?",
        choices: ["if i = 5 or else", "if i = 5 then", "if i == 5 then", "if(i == 5)"],
        answer: "if(i == 5)"
    },
    {
        title: "How does a FOR loop start?",
        choices: ["for (i=0; i <= 5; i++)", "for (i <= 5; i++)", "for i= 1 to 5", "for (i = 0; i <= 5)"],
        answer: "for (i=0; i <= 5; i++)"
    }
]



startButton.addEventListener("click", function () {

    // a timer starts
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft + " seconds";

            if (secondsLeft <= 0) {
                clearInterval(timeInterval);
                finished();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
})


function render(questionIndex) {
    questionsDiv.innerHTML = "";
    unorderedList.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(unorderedList);
        unorderedList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
    startButton.style.visibility = "hidden";
}


function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
       
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
            
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    
    questionIndex++;

    if (questionIndex >= questions.length) {
        
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}


function allDone() {
    questionsDiv.innerHTML = "";
    startButton.style.visibility = "hidden";

   
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Finish!"
    questionsDiv.appendChild(createH1);

    
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

   
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(timeInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

   
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

  
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

   
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

 
    createSubmit.addEventListener("click", function (event) {
      

        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
           
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            window.location.href = "highScores.html"
            
           
        }
    });
}
