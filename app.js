
const display = document.getElementById('display');


let firstNumber = null;
let currentOp = null;
let lastWasOp = false;
let shouldClearOnNextDigit = false;


const digitButtons = document.querySelectorAll('[data-digit]');
digitButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    lastWasOp = false;
    const digit = btn.dataset.digit;

    if (shouldClearOnNextDigit) {
      display.textContent = digit;    
      shouldClearOnNextDigit = false;  
      return;
    }

    const isZero = display.textContent === '0';
    display.textContent = isZero ? digit : display.textContent + digit;
  });
});


const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
  display.textContent = '0';
  firstNumber = null;
  currentOp = null;
  lastWasOp = false;
});


const opButtons = document.querySelectorAll('[data-op]');
opButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (lastWasOp) {
      currentOp = btn.dataset.op; 
      return;
    }
    firstNumber = Number(display.textContent);
    currentOp = btn.dataset.op;
    display.textContent = '0';
    lastWasOp = true;
  });
});

const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', () => {
  lastWasOp = false;
  const secondNumber = Number(display.textContent);
  if (currentOp && firstNumber !== null) {
    const result = operate(currentOp, firstNumber, secondNumber);
    display.textContent = String(result);
firstNumber = null;
currentOp = null;
shouldClearOnNextDigit = true; 
  }
});