function save_length() {
  var input = document.getElementById("length");
  localStorage.setItem("com.crackyOS.pwgen_length", input.value);
}
var savedLength = localStorage.getItem("com.crackyOS.pwgen_length");
if (savedLength !== null) document.getElementById("length").value = savedLength;

function save_uppercase() {
  var checkbox = document.getElementById("uppercase");
  localStorage.setItem("com.crackyOS.pwgen_uppercase", checkbox.checked);
  navigator.vibrate(15);
}
var checked = JSON.parse(localStorage.getItem("com.crackyOS.pwgen_uppercase"));
document.getElementById("uppercase").checked = checked;

function save_lowercase() {
  var checkbox = document.getElementById("lowercase");
  localStorage.setItem("com.crackyOS.pwgen_lowercase", checkbox.checked);
  navigator.vibrate(15);
}
var checked = JSON.parse(localStorage.getItem("com.crackyOS.pwgen_lowercase"));
document.getElementById("lowercase").checked = checked;

function save_numbers() {
  var checkbox = document.getElementById("numbers");
  localStorage.setItem("com.crackyOS.pwgen_numbers", checkbox.checked);
  navigator.vibrate(15);
}
var checked = JSON.parse(localStorage.getItem("com.crackyOS.pwgen_numbers"));
document.getElementById("numbers").checked = checked;

function save_symbols() {
  var checkbox = document.getElementById("symbols");
  localStorage.setItem("com.crackyOS.pwgen_symbols", checkbox.checked);
  navigator.vibrate(15);
}
var checked = JSON.parse(localStorage.getItem("com.crackyOS.pwgen_symbols"));
document.getElementById("symbols").checked = checked;

function save_readability() {
  var checkbox = document.getElementById("readability");
  localStorage.setItem("com.crackyOS.pwgen_readability", checkbox.checked);
  navigator.vibrate(15);
}
var checked = JSON.parse(localStorage.getItem("com.crackyOS.pwgen_readability"));
document.getElementById("readability").checked = checked;

function reset_length() {
  document.getElementById("length").value = 16;
  save_length();
  navigator.vibrate(15);
}

("use strict");
const resultEl = document.getElementById("result"),
  lengthEl = document.getElementById("length"),
  uppercaseEl = document.getElementById("uppercase"),
  lowercaseEl = document.getElementById("lowercase"),
  numbersEl = document.getElementById("numbers"),
  symbolsEl = document.getElementById("symbols"),
  readabilityEl = document.getElementById("readability"),
  generateEl = document.getElementById("generate"),
  clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea"),
    password = resultEl.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  navigator.vibrate(15);
  textarea.remove();
});

generateEl.addEventListener("click", () => {
  navigator.vibrate(15);
  const length = +lengthEl.value,
    hasLower = lowercaseEl.checked,
    hasUpper = uppercaseEl.checked,
    hasNumber = numbersEl.checked,
    hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol,
    typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  const readability = readabilityEl.checked;
  const excluded = readability ? ['l'] : [];
  let char;
  do {
    char = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  } while (excluded.includes(char));
  return char;
}

function getRandomUpper() {
  const readability = readabilityEl.checked;
  const excluded = readability ? ['I', 'O'] : [];
  let char;
  do {
    char = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  } while (excluded.includes(char));
  return char;
}

function getRandomNumber() {
  const readability = readabilityEl.checked;
  const excluded = readability ? ['0'] : [];
  let char;
  do {
    char = String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  } while (excluded.includes(char));
  return char;
}

function getRandomSymbol() {
  const symbols = "!$%&?+#@";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getConf() {
  length = localStorage.getItem("com.crackyOS.pwgen_length");
  uppercase = localStorage.getItem("com.crackyOS.pwgen_uppercase");
  lowercase = localStorage.getItem("com.crackyOS.pwgen_lowercase");
  numbers = localStorage.getItem("com.crackyOS.pwgen_numbers");
  symbols = localStorage.getItem("com.crackyOS.pwgen_symbols");
  readability = localStorage.getItem("com.crackyOS.pwgen_readability");
}