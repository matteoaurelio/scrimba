const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

const generatePasswordEl = document.getElementById("generate-btn");

const passwordBox1 = document.getElementById("password-box-1");
const passwordBox2 = document.getElementById("password-box-2");

const passwordText1 = document.getElementById("password-text-1");
const passwordText2 = document.getElementById("password-text-2");

const toggle1 = document.getElementById("toggle-1");
const toggle2 = document.getElementById("toggle-2");

const selectedLength = document.getElementById("length-select");

let realPassword1 = "";
let realPassword2 = "";

let password1Visible = false;
let password2Visible = false;

passwordBox1.addEventListener("click", function () {
  copyPassword(passwordBox1, passwordText1, realPassword1);
});

passwordBox2.addEventListener("click", function () {
  copyPassword(passwordBox2, passwordText2, realPassword2);
});

toggle1.addEventListener("click", function (event) {
  event.stopPropagation();

  const selectedOption = selectedLength.value;

  password1Visible = !password1Visible;

  if (password1Visible) {
    passwordText1.textContent = realPassword1;
  } else {
    passwordText1.textContent = hidePassword(realPassword1);
  }
});

toggle2.addEventListener("click", function (event) {
  event.stopPropagation();

  const selectedOption = selectedLength.value;

  password2Visible = !password2Visible;

  if (password2Visible) {
    passwordText2.textContent = realPassword2;
  } else {
    passwordText2.textContent = hidePassword(realPassword2);
  }
});

generatePasswordEl.addEventListener("click", function () {
  const selectedOption = selectedLength.value;

  let passwordLength;

  if (selectedOption === "standard") {
    passwordLength = randomNumber(8, 12);
  } else if (selectedOption === "ultra-safe") {
    passwordLength = randomNumber(15, 20);
  }

  realPassword1 = generateRandomPassword(passwordLength);
  realPassword2 = generateRandomPassword(passwordLength);
  passwordText1.textContent = hidePassword(realPassword1);
  passwordText2.textContent = hidePassword(realPassword2);

  password1Visible = false;
  password2Visible = false;
});

function generateRandomPassword(length) {
  let password = "";

  for (let idx = 0; idx < length; idx++) {
    let selector = Math.floor(Math.random() * characters.length);
    let randomChar = characters[selector];
    password += randomChar;
  }

  return password;
}

function randomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function copyPassword(boxElement, textElement, realPassword) {
  if (realPassword === "") return;

  navigator.clipboard.writeText(realPassword);

  boxElement.classList.add("copied");

  const originalText = textElement.textContent;

  textElement.textContent = "✓ Copied!";

  setTimeout(function () {
    boxElement.classList.remove("copied");
    textElement.textContent = originalText;
  }, 1000);
}

function hidePassword(password) {
  return "•".repeat(password.length);
}
