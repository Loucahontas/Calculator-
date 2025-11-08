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
  if (b === 0) return "ERR /0";
  return a / b; 
}

function operate(op, a, b) {
  if (op === '+') return add(a, b);
  if (op === '-') return subtract(a, b);
  if (op === '*') return multiply(a, b);
  if (op === '/') return divide(a, b);
  return "ERR op";
}
