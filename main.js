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

function changeDisplay(buttonPress) {
    const display = document.querySelector("#display");

    if(buttonPress >= "0" && buttonPress <= "9" || buttonPress == "."){
        addToDisplay(display, buttonPress);
    }
    else if(buttonPress == "AC"){
        clearDisplay(display);
    }
    else{
        processOperator(display, buttonPress);
    }
}

function addToDisplay(display, buttonPress) {
    if(display.textContent == "0" && buttonPress != "."){
        display.textContent = buttonPress;
    }
    else if(display.textContent == "-0" && buttonPress != "."){
        display.textContent = "-" + buttonPress;
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

function processOperator(display, buttonPress){
    if(buttonPress == "%"){
        display.textContent = String(display.textContent / 100);
    }
    else if(buttonPress == "±"){
        display.textContent = (display.textContent == "0") ? "-0" : String(-display.textContent);
    }
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