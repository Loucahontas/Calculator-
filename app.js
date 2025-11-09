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