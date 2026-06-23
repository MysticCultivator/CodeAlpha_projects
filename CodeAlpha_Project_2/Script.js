const previousText = document.getElementById('previous-operand');
const currentText = document.getElementById('current-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currentText.innerText = currentOperand;
    if (operation != null) {
        previousText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousText.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function clearScreen() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '−':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Can't divide by zero!");
                clearScreen();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    // Fix floating point issues (e.g., 0.1 + 0.2 = 0.3)
    currentOperand = Math.round(computation * 1e12) / 1e12;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// --- Keyboard Support ---
window.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendNumber(e.key);
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('−');
    if (e.key === '*') appendOperator('×');
    if (e.key === '/') {
        e.preventDefault(); // Prevents quick find menu in browsers
        appendOperator('÷');
    }
    if (e.key === '%') appendOperator('%');
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        compute();
    }
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearScreen();
});