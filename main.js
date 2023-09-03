// Select elements
const inputMinus = document.querySelector(".input-minus");
const inputPlus = document.querySelector(".input-plus");
const minus = document.querySelector(".btn-minus");
const plus = document.querySelector(".btn-plus");
const balanceText = document.querySelector(".blc-text");
const divPlus = document.querySelector(".plus");
const divMinus = document.querySelector(".minus");
const saveHistoryButton = document.getElementById('save-history-btn');
const regLink = document.querySelector(".reg-link");
// Initialize balance and history array
let balance = 0;
let history = [];

minus.addEventListener("click", function() {
    let textMinus = document.createElement('p');
    textMinus.className = "alert";
    divMinus.appendChild(textMinus);
    const value = -Number(inputMinus.value.replace(/\D/g, '')); // Negative value for subtraction
    balance += value;
    balanceText.textContent = balance;
    textMinus.textContent = "-" + inputMinus.value;
    inputMinus.value = '';

    // Save history entry
    history.push({ operation: 'minus', value: value, balance: balance });

    // Save history to server
    saveHistoryToServer(history);
});

plus.addEventListener("click", function() {
    let textPlus = document.createElement('p');
    textPlus.className = "alert";
    divPlus.appendChild(textPlus);
    const value = Number(inputPlus.value.replace(/\D/g, ''));
    balance += value;
    balanceText.textContent = balance;
    textPlus.textContent = "+" + inputPlus.value;
    inputPlus.value = '';

    // Save history entry
    history.push({ operation: 'plus', value: value, balance: balance });

    // Save history to server
    saveHistoryToServer(history);
});

saveHistoryButton.addEventListener('click', () => {
    saveHistoryToServer(history);
});

function saveHistoryToServer(historyData) {
    fetch('/save-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(historyData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error saving history:', error);
    });
}

    //modal windows

function modalOpen(){
    const modal = document.querySelector("#authorize");
    modal.style = 'display: flex;';
}
function modalClose(){
    const modal = document.querySelector("#authorize");
    modal.style = 'display: none;';
    const modalReg = document.querySelector(".registration");
    modalReg.style = 'display: none;';
}
function regOpen(){
    modalClose();
    const modalReg = document.querySelector(".registration");
    modalReg.style = 'display: flex;';
}
