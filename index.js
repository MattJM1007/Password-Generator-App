"use strict";

const passwordEl = document.querySelector(".result-container .password");
const copyButton = document.querySelector(".result-container .copy-button");
const copiedText = copyButton.querySelector("span");
const form = document.querySelector("form");
const slider = document.querySelector('.form-group.length input[type="range"]');
const errorEl = form.querySelector(".error");

const characters = {
  uppercase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  lowercase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  symbols: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "<", ",", ">", ".", "?", "/"],
};

//----Update Slider----

function updateSlider() {
  const lengthDisplay = document.querySelector(".form-group.length .length-count");
  const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100 || 0;
  lengthDisplay.textContent = slider.value;
  slider.style.setProperty("--progress", `${percentage}%`);
}

function initializeSlider() {
  const defaultLength = 8;
  slider.value = defaultLength;
  updateSlider();
}

initializeSlider();

//----Generate Password----

function getStrength(numberOfOptions) {
  const strengthText = document.querySelector(".password-strength .text");
  const strengthBars = document.querySelectorAll(".password-strength .bar");
  const strengthCriteria = {
    1: "too-weak",
    2: "weak",
    3: "medium",
    4: "strong",
  };

  let passwordStrength;

  if (slider.value < 8) {
    passwordStrength = strengthCriteria[1];
  } else {
    passwordStrength = strengthCriteria[numberOfOptions];
  }

  strengthBars.forEach((bar) => bar.classList.remove("too-weak", "weak", "medium", "strong"));
  strengthText.textContent = "";

  const selectedStrengthBar = document.querySelector(`[data-strength=${passwordStrength}]`);
  selectedStrengthBar.classList.add(passwordStrength);
  strengthText.textContent = selectedStrengthBar.dataset.text;

  return passwordStrength;
}

function generatePassword(e) {
  e.preventDefault();

  const checkedBoxes = document.querySelectorAll(".checkboxes input:checked");

  if (!checkedBoxes.length) {
    errorEl.textContent = "Please select at least one option...";
    return;
  }

  let chosenCharacters = [];
  let newPassword = "";

  checkedBoxes.forEach((box) => chosenCharacters.push(...characters[box.name]));

  for (let i = 0; i < slider.value; i++) {
    const randomIndex = Math.floor(Math.random() * chosenCharacters.length);

    newPassword += chosenCharacters[randomIndex];
  }

  passwordEl.textContent = newPassword;
  passwordEl.classList.remove("text-light");
  getStrength(checkedBoxes.length);
  copiedText.classList.add("hidden");
  errorEl.textContent = "";
}

//----Enable Copy Button----

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied!");
    copiedText.classList.remove("hidden");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

//----Event Listeners----

slider.addEventListener("input", updateSlider);
form.addEventListener("submit", generatePassword);
copyButton.addEventListener("click", () => copyToClipboard(passwordEl.textContent));
