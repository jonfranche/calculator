function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operationSelector(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
            return 1;
            break;
    }
}

function operate(operator, num) {
    let result = operationSelector(operator[0], num[0], num[1]);
    if (operator[1] != undefined) {
        for(let i = 1; i < operator.length; i++){
            result = operationSelector(operator[i], result, num[i + 1]);
        }
    }
    return result;
}

function writeToDisplay(input) {
    let displayText = display.textContent;

    if (displayText == 0) {
        displayText = '';
    }

    if (input == '.' && displayText.search(/[.]/g) != -1)
        displayText += '';
    else
        displayText += input;

    if (displayText.length > 11) {
        displayText = displayText.substring(0, 11);
    }

    display.textContent = displayText;
}

function clearStack() {
    num = [];
    oprtr = [];
}

function writeNumber(num) {
    (display.textContent.length <= 11) ? writeToDisplay(element.textContent) : writeToDisplay('');
}

const display = document.querySelector("#input");
const bttn = document.querySelectorAll("#bttn");
const clr = document.querySelector("#clr");
const opBttn = document.querySelectorAll("#op");
const equalsBtn = document.querySelector("#eql");
const decimal = document.querySelector("#deci");
const del = document.querySelector("#del");

let num = [];
let oprtr = [];

let bttnArr = Array.from(bttn);
let opBttnArr = Array.from(opBttn);

bttnArr.forEach(element => {
    element.addEventListener('click', () => (display.textContent.length <= 11) ?
        writeToDisplay(element.textContent) : writeToDisplay(''));
});

opBttnArr.forEach(element => {
    element.addEventListener('click', () => {
        num.push(Number(display.textContent));
        oprtr.push(element.textContent);
        display.textContent = 0;
    });
});

clr.addEventListener('click', () => {
    clearStack();
    display.textContent = 0;
});

equalsBtn.addEventListener('click', () => {
    if (num[0] != undefined && oprtr != undefined) {
        num.push(Number(display.textContent));
        let result = Number(operate(oprtr, num));
        display.textContent = '';
        writeToDisplay(result);
        clearStack();
    }
});

decimal.addEventListener('click', () => (display.textContent.length <= 11) ?
    writeToDisplay('.') : writeToDisplay(''));

del.addEventListener('click', () => {
    let removeOne = display.textContent;
    display.textContent = removeOne.substring(0, removeOne.length - 1);
});