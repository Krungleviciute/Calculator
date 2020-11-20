const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second value depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = (number) => {
    // Replace current dislplay value if first value is entered;
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If curr display value is 0 we want to display if not keep adding up
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
};

const addDecimal = () => {
    // If operator pressed - don't add decimal
    if (awaitingNextValue) return;
    
    // if no decimal, add one
    !calculatorDisplay.textContent.includes('.') && (calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`)
}

const useOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);
    // To prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return
    };
    
    if(!firstValue) {
        firstValue = currentValue
    } else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    } 
    
    // Ready for the nextr value, store operator
    awaitingNextValue = true
    operatorValue = operator;
}

// Reset all values and Display
const resetAll = () => {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputButton) => {
    if(inputButton.classList.length === 0){
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value))
    } else if(inputButton.classList.contains('operator')){
        inputButton.addEventListener('click', () => useOperator(inputButton.value))
    }else if(inputButton.classList.contains('decimal')){
        inputButton.addEventListener('click', addDecimal)
    }
});
clearBtn.addEventListener('click', resetAll)


