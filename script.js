var quesSec = document.getElementById('question')
var mixQues, currentQI;
var loginDiv = document.getElementById('login')
var ansBtn = document.getElementById('answer-btn')
var score = 0;
var quesDiv = document.getElementById('quesAns-div')
var loginBtn = document.getElementById('login-btn')
var nextBtn = document.getElementById('next-btn')
var submitBtn = document.getElementById("submit-btn")
var resultSec = document.getElementById("result")
var scoreDiv = document.getElementById("score-div")
var headingDiv = document.getElementById("heading")
var min = 0
var sec = 0
var msec = 0
var minutes = document.getElementById('min')
var seconds = document.getElementById('sec')
var miliseconds = document.getElementById('msec')
var userInfo = document.getElementById('userInfo')
var timmer = document.getElementById('timmer')
var database = firebase.database().ref("user")
var getUser = document.getElementById("getUser")


loginBtn.addEventListener('click', login);
nextBtn.addEventListener('click', () => {
    currentQI++
    nextQues()
})
submitBtn.addEventListener('click', showResult)

let userEmail;
var userId;

function login() {
    // var enterUser = (email.value).toLowerCase()
    // var userPass = (pass.value).toLowerCase()
    var email = document.getElementById('email').value
    var password = document.getElementById('Password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert('Login Sucessfull')
            quesDiv.classList.remove('hide')
            mixQues = questions.sort(() => Math.random() - .5)
            currentQI = 0
            userEmail = user.email
            userId = user.uid
            localStorage.setItem('email', userEmail)
            localStorage.setItem("userID", userId)
            start();
            nextQues();
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage)
        });
}

function start() {
    interval = setInterval(function() {
        msec++
        miliseconds.innerHTML = msec
        if (msec >= 100) {
            sec++
            seconds.innerHTML = sec
            msec = 0

        } else
        if (sec >= 60) {
            min++
            minutes.innerHTML = min
            sec = 0
        }
    }, 10)
}


function pause() {
    clearInterval(interval)

}

function nextQues() {
    hideNextBtn()
    headingDiv.classList.remove('hide')
    quesSec.classList.remove('hide')
    ansBtn.classList.remove('hide')
    showQues(mixQues[currentQI])
}

function showQues(question) {
    quesSec.innerText = question.question
    getUser.innerHTML = localStorage.getItem("email")
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAns)
        ansBtn.appendChild(button)
    })
}

function selectAns(e) {
    var selectedAns = e.target
    var correct = selectedAns.dataset.correct
    setClass(document.body, correct)
    Array.from(ansBtn.children).forEach(button => {
        button,
        button.dataset.correct
        ansBtn.classList.add('hide')


    })
    if (mixQues.length > currentQI + 1) {
        nextBtn.classList.remove('hide')
    } else {
        submitBtn.classList.remove('hide')
        headingDiv.classList.add('hide')
        quesSec.classList.add('hide')
        pause()
    }
}

function showResult() {
    scoreDiv.classList.remove('hide')
    submitBtn.classList.add('hide')
    resultSec.innerHTML = (`Your JavaScript Score : ${score} out of ${questions.length}.<br/>
    Time Expand : ${min} Minutes  ${sec} Seconds.`)
    console.log(score);
    var userID = localStorage.getItem('userID')
    var firebaseData = firebase.database().ref("Data")
    var key = userID
    var email = localStorage.getItem("email")
    let obj = {
        email: email,
        result: score
    }
    firebaseData.child(key).set(obj)
}


function hideNextBtn() {
    loginDiv.classList.add('hide')
    nextBtn.classList.add('hide')
    while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild)
    }
}

function setClass(element, correct) {
    clearClass(element)
    if (correct) {
        element.classList.add('correct')
        score++
    } else {
        element.classList.add('wrong')
    }
}

function clearClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var fbEmail;
let loginfb = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var user = result.user;
            alert('Login Sucessfull')
            quesDiv.classList.remove('hide')
            mixQues = questions.sort(() => Math.random() - .5)
            currentQI = 0
            start();
            nextQues();
            fbEmail = user.email
            userId = user.uid
            localStorage.setItem("userID", userId)
            localStorage.setItem("fbEmail", fbEmail)
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)

        });
}

let googleEmail;
let logingoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var user = result.user;
            alert('Login Sucessfull')
            quesDiv.classList.remove('hide')
            mixQues = questions.sort(() => Math.random() - .5)
            currentQI = 0
            start();
            nextQues();
            googleEmail = user.email
            userId = user.uid
            localStorage.setItem("GoogleEmail", googleEmail)
            localStorage.setItem("userID", userId)


        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });


}





//Question Section //
var questions = [{
        question: "Hyper Text Markup Language Stand For?",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "XHTML", correct: false },
            { text: "CSS", correct: false },
            { text: "HTML", correct: true },
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "JQuery", correct: false },
            { text: "CSS", correct: true },
            { text: "XML", correct: false },
        ]
    },
    {
        question: "The hardest natural substance found on earth is",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Platinum", correct: false },
        ]
    },
    {
        question: "Who invented JavaScript?",
        answers: [
            { text: "Douglas Crockford", correct: false },
            { text: "Sheryl Sandberg", correct: false },
            { text: "Brendan Eich", correct: true },
            { text: "Dr Tariq", correct: false },
        ]
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            { text: "Node.js", correct: false },
            { text: "TypeScript", correct: false },
            { text: "Script.js", correct: false },
            { text: "npm", correct: true },
        ]
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            { text: "Angular", correct: false },
            { text: "ESLint", correct: true },
            { text: "jQuery", correct: false },
            { text: "RequireJS", correct: false },
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: '4', correct: true },
            { text: '12', correct: false },
            { text: '18', correct: false },
            { text: '22', correct: false },
        ]
    },
    {
        question: "What is 2 x 4?",
        answers: [
            { text: '4', correct: false },
            { text: '12', correct: false },
            { text: '8', correct: true },
            { text: '22', correct: false },
        ]
    }, {
        question: "What is 2 / 2?",
        answers: [
            { text: '4', correct: false },
            { text: '1', correct: true },
            { text: '18', correct: false },
            { text: '22', correct: false },
        ]
    }, {
        question: "What is 5 - 2?",
        answers: [
            { text: '4', correct: false },
            { text: '12', correct: false },
            { text: '18', correct: false },
            { text: '3', correct: true },
        ]
    },
]