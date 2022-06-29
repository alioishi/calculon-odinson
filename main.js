// stores values while waiting for a second operand
const displayStorage = {
    storedValue: "0", 
    storedOperator: "",
    isBinaryOperatorLastPressed: false
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

    if(buttonPress >= "0" && buttonPress <= "9" || buttonPress == "." || buttonPress == "%" ||buttonPress == "±"){
        modifyCurrentValue(display, buttonPress);
    }
    else if(buttonPress == "AC"){
        clearAll(display);
    }
    else if(buttonPress == "C"){
        clearCurrentDisplay(display);
    }
    else{
        processOperator(display, buttonPress);
    }
}

function modifyCurrentValue(display, buttonPress) {
    document.querySelector("#clear").textContent = "C"; // allows for edits of current value
    
    if(buttonPress == "%"){ // percent is placed first because it isnt affect by 0's edge cases
        display.textContent = String(display.textContent / 100);
    }
    else if(displayStorage.isBinaryOperatorLastPressed){ // replacement of display value after an operator, followed by a value is pressed
        display.textContent = (buttonPress == ".") ? "0." : // addresses edge cases for 0
                                (buttonPress == "±") ? "-0" : 
                                buttonPress;
    }
    else if(buttonPress == "±"){
        display.textContent = display.textContent.includes("-") ? display.textContent.replace("-", "") : "-" + display.textContent;
    }
    else if(buttonPress == "."){
        if(!display.textContent.includes(".")){ // prevents multiple decimals. placed inside else if so that a decimal does not fall into the else
            display.textContent += buttonPress; 
        }   
    }
    else if(display.textContent == 0 && !display.textContent.includes(".")){ // replacement when the displayed value is "0" or "-0"
            display.textContent = display.textContent.replace("0", buttonPress)
    }
    else{
        display.textContent += buttonPress;
    }

    displayStorage.isBinaryOperatorLastPressed = false;
}

function clearAll(display){
    display.textContent = "0";
    displayStorage.storedValue = 0;
    displayStorage.storedOperator = "";
    displayStorage.isBinaryOperatorLastPressed = false;
}

function clearCurrentDisplay(display){
    display.textContent = "0";
    document.querySelector("#clear").textContent = "AC"; // provides option to clear everything

    displayStorage.isBinaryOperatorLastPressed = false;
}

function processOperator(display, buttonPress){
    document.querySelector("#clear").textContent = "C"; // allows for edits of current value
    
    // allows for performing multiple operations without pressing = each time
    // also allows for changing a chosen operation
    if(determineBinaryOperator(displayStorage.storedOperator) && !displayStorage.isBinaryOperatorLastPressed){ 
        display.textContent = String(operate(determineBinaryOperator(displayStorage.storedOperator), 
                                        displayStorage.storedValue, display.textContent));
        
    }
    displayStorage.storedValue = display.textContent;
    // prevents repeatedly pressing = from causing an operation to evaluate repeatedly without pressing other operators
    displayStorage.storedOperator = (buttonPress == "=") ? "" : buttonPress; 
    displayStorage.isBinaryOperatorLastPressed = (buttonPress != "="); 
}

function add(a, b) {
    const intA = Number(a);
    const intB = Number(b);
    return String(intA + intB);
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

function determineBinaryOperator(buttonPress) {
    switch(buttonPress) {
        case "+":
            return add;
        case "-":
            return subtract;
        case "×":
            return multiply;
        case "÷":
            return divide;
    }
}

function operate(operator, a, b) {
    return operator(a, b);
}