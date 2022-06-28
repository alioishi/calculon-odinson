// stores values while waiting for a second operand
const displayStorage = {
    storedValue: 0, 
    operatorPress: ""
};

initButtons();

function initButtons() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            changeDisplay(button.textContent)
        })
    });

}

/*
    if digit
        add to display
    else if operator
        store current display value
        determine which operator press
    else if clear
        clear display and stored display values
*/
function changeDisplay(buttonPress) {
    const display = document.querySelector("#display");

    if(buttonPress >= "0" && buttonPress <= "9"){
        addDigitToDisplay(display, buttonPress);
    }
    else if(buttonPress == "AC"){
        clearDisplay(display);
    }
}

function addDigitToDisplay(display, buttonPress) {
    if(display.textContent == "0"){
        display.textContent = buttonPress;
    }
    else{
        display.textContent += buttonPress;
    }
}

function clearDisplay(display){
    display.textContent = "0";
    displayStorage.storedValue = 0;
    displayStorage.operatorPress = "";
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}