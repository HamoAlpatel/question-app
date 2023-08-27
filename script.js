// refrences
// let quizDisplay = document.getElementById('display');
let timeLeft = document.querySelector('.timeLeft');
let quizContainer = document.getElementById('container');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let countOfQuestion = document.querySelector('.NumberOfQuestion');
let displayContainer = document.getElementById('displayContainer');
let scoreContainer = document.querySelector('.scoreContainer');
let restart = document.getElementById('restart');
let userScore = document.getElementById('userScore');
let startScreen = document.querySelector('.startScreen');
let startButton = document.getElementById('startButton');
let prog = document.querySelector('.prog .progs');
let imags = document.querySelectorAll('.imags img')
let scr = document.querySelector('header h2 span')
let hih = 0;
let questionCount;
let score = 0;
let count = 21;
let countdown;
let timr;
let time = 21;
let checkprev = 0;
// Questions and options array 
let quizArray = [
    {
        id: "0",
        question: "true = ..?",
        options: ['1', '3', '2', '8'],
        correct: '1',
        scor: 150
    },
    {
        id: "1",
        question: "scripting language",
        options: ['JavaScript', 'HTML', 'C++', 'Java'],
        correct: 'JavaScript',
        scor: 180
    },
    {
        id: "2",
        question: "whats RWD",
        options: ['responsive web design',
         'responsive', 'media query', 'There is no correct answer'],
        correct: 'responsive web design',
        scor: 100
    },
    {
        id: "3",
        question: "It is not a programming language",
        options: ['HTML', 'JavaScript', 'C#', 'C'],
        correct: 'HTML',
        scor: 80
    },
    {
        id: "4",
        question: "what's RDMS",
        options: ['relational database management system', 'management system', 'database', 'There is no correct answer'],
        correct: 'relational database management system',
        scor: 90
    }
];

// restart quiz
restart.addEventListener('click', () => {
    // time = 21;
    // count=21;
    scr.innerHTML = '0';
    initial();
    displayContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    imags.forEach(img => {
        img.classList.remove('active')
    });
    imags[0].classList.add('active');
    prev.disabled = true;
});
// next button 
next.addEventListener('click', (displayNext = () => {

    let quetion = document.getElementsByClassName('containerMid')[questionCount];
    let option = quetion.querySelectorAll('.optionDiv');
    option.forEach((elm) => {
        elm.disabled = true
    })
    // increment questionCount
    questionCount += 1;
    prev.disabled = false;
    // if last question
    if (questionCount == quizArray.length) {
        clearInterval(timr);
        // hide question container and display score
        displayContainer.classList.add('hide');
        scoreContainer.classList.remove('hide');
        // userScore
        userScore.innerHTML = `Your Score is ${score} out of 600`
        if (score >= '305') {
            imags.forEach(img => {
                img.classList.remove('active')
            });
            imags[1].classList.add('active')
            imags[2].classList.add('active')
        }
        else {
            imags.forEach(img => {
                img.classList.remove('active')
            });
            imags[3].classList.add('active')
        }
    } else {
        countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Que`;
        // display quiz
        quizDisplay(questionCount);
        clearInterval(countdown);
        timerDisplay();
        if (checkprev != 0) {
            checkprev--
        }
        else {
            time = 22;
            count = 21;
        }
    }
}))
prev.addEventListener('click', function () {

    if (questionCount > 0) {
        checkprev++
        questionCount--;
        countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Que`;
        quizDisplay(questionCount);
        clearInterval(countdown);
        timerDisplay()
        // time=21;

    }
    else {
        prev.disabled = true;
    }
})
// Timer


// display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll('.containerMid');
    // hide other cards
    quizCards.forEach((card) => {
        card.classList.add('hide');
    });
    // display current question card
    quizCards[questionCount].classList.remove('hide');
}
// quiz creation
function quizCreator() {
    // timer()
    quizArray.sort(() => Math.random() - 0.5);
    // genrate quiz
    for (let i of quizArray) {
        // randomly sort optoins
        i.options.sort(() => Math.random() - 0.5);
        // quiz card
        let div = document.createElement('div');
        div.classList.add('containerMid', "hide");
        // question number
        countOfQuestion.innerHTML = `1 of ${quizArray.length} Que`;
        // question
        let question_div = document.createElement('p');
        question_div.classList.add('question');
        question_div.innerHTML = i.question;
        div.appendChild(question_div);
        // options
        div.innerHTML += `
        <button class="optionDiv" onclick="checker(this)">${i.options[0]}</button>
        <button class="optionDiv" onclick="checker(this)">${i.options[1]}</button>
        <button class="optionDiv" onclick="checker(this)">${i.options[2]}</button>
        <button class="optionDiv" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div)
    }
}
// checker function to check if option true or false
function checker(userOption) {
    // timer()
    let userSolution = userOption.innerText;
    let quetion = document.getElementsByClassName('containerMid')[questionCount];
    let option = quetion.querySelectorAll('.optionDiv');
    // if user clicked true     
    if (userSolution == quizArray[questionCount].correct) {
        userOption.classList.add('correct');
        score += quizArray[questionCount].scor;
        scr.innerHTML = score;
        hih += 20;
        if (hih == 100) {
            prog.style.borderRadius = '50px'
        }
        prog.style.height = `${hih}%`
        
    } else {
        userOption.classList.add('incorrect');
        // for marking correct option
        option.forEach((elm) => {
            if (elm.innerText == quizArray[questionCount].correct) {
                elm.classList.add('correct')
            }
        })
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    // disable all options
    option.forEach((elm) => {
        elm.disabled = true;
    })

}
// initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    score = 0;
    count = 21;
    time = 21;
    hih = 0;
    prog.style.height = `${hih}%`
    prog.style.borderRadius = '0px 0px 50px 50px'
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
    timer()
}
// when user click on start button
startButton.addEventListener('click', () => {
    startScreen.classList.add('hide');
    displayContainer.classList.remove('hide');
    initial();
})



// hide quiz and display start screen
window.onload = () => {
    prev.disabled = true
    startScreen.classList.remove('hide');
    displayContainer.classList.add('hide');
}
let timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            setTimeout(function () {
                clearInterval(countdown);
                displayNext();
            }, 1000);
            count = 21;
        }
    }, 1000);
};


function timer() {
    // let option = document.querySelectorAll('.optionDiv');
    timr = setInterval(function () {
        let quetion = document.getElementsByClassName('containerMid')[questionCount];
        let option = quetion.querySelectorAll('.optionDiv');
        time--
        // console.log(time);
        if (time == 0) {
            option.forEach((elm) => {
                if (elm.innerHTML == quizArray[questionCount].correct) {
                    elm.classList.add('correct')
                } else {
                    elm.classList.add('incorrect')
                }
                elm.disabled = true
            })
            // clearInterval(timr);
            time = 21;
        }
    }, 1000);
}