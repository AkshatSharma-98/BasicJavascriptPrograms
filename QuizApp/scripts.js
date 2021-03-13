const startButton = document.getElementById('start_btn')
const nextButton = document.getElementById('next_btn')
const questionBarElement = document.getElementById('ques_bar')
let currQuesIndex;
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('option_btn')

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currQuesIndex++
    setNextQues()
})

// TIMER ------
var timeCnt = 30
const countdown = document.getElementById('count_down')
function setTimer() {
    var timer = setInterval(function () {
        console.log(currQuesIndex)
        countdown.innerText = timeCnt + " SECONDS LEFT !"
        timeCnt--
        if (currQuesIndex == questions.length - 1) {
            answerButtonsElement.addEventListener('click', () => {
                countdown.innerText = "COMPLETED IN " + (30 - timeCnt) + " SECONDS!"
                clearInterval(timer)
            })
        }
        if (timeCnt == 0) {
            countdown.innerText = "YOUR TIME IS UP!"
            countdown.style.color = "red";
            clearInterval(timer)
        }
    }, 1000)
}
startButton.addEventListener('click', setTimer)

function startGame() {
    startButton.classList.add('questionBar')
    questionBarElement.classList.remove('questionBar')
    currQuesIndex = 0
    setNextQues()
}

function setNextQues() {
    resetState()
    showQuestion(questions[currQuesIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(ans => {
        const button = document.createElement('button')
        button.innerText = ans.text
        button.classList.add('btn')
        if (ans.correct) {
            button.dataset.correct = ans.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    nextButton.classList.add('questionBar')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(ans) {
    const selectedButton = ans.target
    const correct = selectedButton.dataset.target
    setStatus(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (questions.length > currQuesIndex + 1) {
        nextButton.classList.remove('questionBar')
    }
}

function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: 'What was the first movie in the Marvel Cinematic Universe?',
        answers: [
            { text: 'Iron-Man', correct: true },
            { text: 'Spider-Man', correct: false },
            { text: 'Batman', correct: false },
            { text: 'Shaktimaan', correct: false }
        ]
    },
    {
        question: 'In how many Marvel Studios films does Agent Coulson appear?',
        answers: [
            { text: 'Four', correct: false },
            { text: 'Seven', correct: false },
            { text: 'Six', correct: false },
            { text: 'Five', correct: true }
        ]
    },
    {
        question: 'What name did Black Widow use when first introduced to Tony Stark in Iron Man 2?',
        answers: [
            { text: 'Natalie Rushman', correct: true },
            { text: 'Natalia Romanoff', correct: false },
            { text: 'Natalia Roman', correct: false },
            { text: 'Savita Bhabhi', correct: false }
        ]
    },
    {
        question: 'When did Hank Pym resign from S.H.I.E.L.D.?',
        answers: [
            { text: '1992', correct: false },
            { text: '1989', correct: true },
            { text: '1981', correct: false },
            { text: '1976', correct: false }
        ]
    },
    {
        question: 'True or False: Phillip J. Coulson was an established Marvel Comics character before his cinematic debut in Iron Man. ',
        answers: [
            { text: 'TRUE', correct: false },
            { text: 'FALSE', correct: true },
        ]
    }
]