// display
const display = document.getElementById('display');

// state
let firstNumber = null;
let currentOp = null;
let lastWasOp = false;
let shouldClearOnNextDigit = false;

// formatting: round to 10 dp and trim trailing zeros
function formatNumber(n) {
  if (typeof n === 'string') return n;          // pass through error messages
  if (!Number.isFinite(n)) return n;            // Infinity/NaN
  const rounded = Math.round(n * 1e10) / 1e10;  // 10 decimal places
  return String(rounded).replace(/\.0+$|(\.\d*[1-9])0+$/, '$1');
}

// digits
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

// clear
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
  display.textContent = '0';
  firstNumber = null;
  currentOp = null;
  lastWasOp = false;
  shouldClearOnNextDigit = false;
});

// operators (with consecutive-op block and chaining)
const opButtons = document.querySelectorAll('[data-op]');
opButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const nextOp = btn.dataset.op;
    const currentValue = Number(display.textContent);

    // consecutive operator: just update operator
    if (lastWasOp) {
      currentOp = nextOp;
      return;
    }

    // chaining: compute immediately if we already have a first number + op
    if (currentOp && firstNumber !== null) {
      const result = operate(currentOp, firstNumber, currentValue);

      // guard error / non-finite (e.g. divide by zero)
      if (typeof result === 'string' || !Number.isFinite(result)) {
        display.textContent = 'Nope (÷0)';
        firstNumber = null;
        currentOp = null;
        shouldClearOnNextDigit = true;
        lastWasOp = false;
        return;
      }

      display.textContent = formatNumber(result);
      firstNumber = Number(display.textContent); // carry forward rounded value
      currentOp = nextOp;
      shouldClearOnNextDigit = true;
      lastWasOp = true;
      return;
    }

    // first operator press
    firstNumber = currentValue;
    currentOp = nextOp;
    display.textContent = '0';
    lastWasOp = true;
  });
});

// equals
const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', () => {
  lastWasOp = false;
  const secondNumber = Number(display.textContent);

  if (currentOp && firstNumber !== null) {
    const result = operate(currentOp, firstNumber, secondNumber);

    // guard error / non-finite (e.g. divide by zero)
    if (typeof result === 'string' || !Number.isFinite(result)) {
      display.textContent = 'Nope (÷0)';
      firstNumber = null;
      currentOp = null;
      shouldClearOnNextDigit = true;
      return;
    }

    display.textContent = formatNumber(result);
    firstNumber = null;
    currentOp = null;
    shouldClearOnNextDigit = true; // next digit starts fresh
  }
});