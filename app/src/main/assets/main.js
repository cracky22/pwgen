import '@material/web/all';


const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const checkboxIds = ['uppercase', 'lowercase', 'numbers', 'symbols'];

window.addEventListener('DOMContentLoaded', () => {
  checkboxIds.forEach(id => {
    const savedValue = localStorage.getItem(id);
    if (savedValue !== null) {
      document.getElementById(id).checked = savedValue === 'true';
    }
  });
  
  const savedLength = localStorage.getItem('pw-length');
  if (savedLength) lengthEl.value = savedLength;
});

[...checkboxIds, 'length'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('change', () => {
    const value = id === 'length' ? el.value : el.checked;
    localStorage.setItem(id === 'length' ? 'pw-length' : id, value);
  });
});

const randomFunc = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbol: () => "!$%&?+#@"[
    Math.floor(Math.random() * 8)
  ]
};

generateEl.addEventListener('click', () => {
  const length = Number(lengthEl.value);
  
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  const password = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
  
  resultEl.textContent = password;
});

clipboardEl.addEventListener('click', async () => {
  if (!resultEl.textContent) return;
  await navigator.clipboard.writeText(resultEl.textContent);
});

function generatePassword(lower, upper, number, symbol, length) {
  const types = [{ lower }, { upper }, { number }, { symbol }]
    .filter(t => Object.values(t)[0]);

  if (!types.length) return '';

  let password = '';
  while (password.length < length) {
    for (const type of types) {
      const key = Object.keys(type)[0];
      password += randomFunc[key]();
    }
  }

  return password.slice(0, length);
}
