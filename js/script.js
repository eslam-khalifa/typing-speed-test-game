const typingText = document.querySelector('.wrapper .content-box .typing-text p');
const inputField = document.querySelector('.wrapper .input-field');
const mistakeTag = document.querySelector('.mistake span');
const timeTag = document.querySelector('.time span b');
const wpmTag = document.querySelector('.WPM span b');
const cpmTag = document.querySelector('.CPM span b');
const tryAgainButton = document.querySelector('.wrapper .content-box .content button')

let characterIndex = mistakes = isTyping = 0;
let timer, maxTime = 60, timeLeft = maxTime;

function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randomIndex].split('').forEach(
        span => {
            let spanTag = `<span>${span}</span>`;
            typingText.innerHTML += spanTag;
        }
    );
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    let typedChar = inputField.value.split('')[characterIndex];
    if(isTyping == 0) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    if(typedChar == null) {
        characterIndex--;
        if(characters[characterIndex].classList.contains('incorrect')) mistakes--;
        characters[characterIndex].classList.remove('correct', 'incorrect');
    }else {
        if(characters[characterIndex].innerText === typedChar) {
            characters[characterIndex].classList.add('correct');
        }else {
            mistakes++;
            characters[characterIndex].classList.add('incorrect');
        }
        characterIndex++;
    }
    characters.forEach(span => span.classList.remove('active'));
    characters[characterIndex].classList.add('active');

    let wpm = Math.round(((characterIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm = (wpm < 0 || !wpm || wpm == Infinity) ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = characterIndex - mistakes;
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else {
        clearInterval(timer);
        inputField.disabled = true;
    }
}

function resetGame() {
    typingText.innerHTML = '';
    randomParagraph();
    inputField.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    characterIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    inputField.disabled = false;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainButton.addEventListener("click", resetGame);