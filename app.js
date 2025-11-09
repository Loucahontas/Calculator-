const display = document.getElementById('display');


const digitButtons = document.querySelectorAll('[data-digit]');

// when any digit is clicked, append that digit to the display
digitButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const digit = btn.dataset.digit;          // '7', '3', etc.
    const isZero = display.textContent === '0';
    display.textContent = isZero ? digit : display.textContent + digit;
  });
});

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
  display.textContent = '0';
});

let firstNumber = null;
let currentOp = null;

const opButtons = document.querySelectorAll('[data-op]');
opButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    firstNumber = Number(display.textContent);
    currentOp = btn.dataset.op;
    display.textContent = '0';  // ready for second number
  });
});

const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', () => {
  const secondNumber = Number(display.textContent);
  if (currentOp && firstNumber !== null) {
    const result = operate(currentOp, firstNumber, secondNumber);
    display.textContent = String(result);
    // optional: reset state so next digit starts new entry
    firstNumber = null;
    currentOp = null;
  }
});