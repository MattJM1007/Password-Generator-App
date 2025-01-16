//-----Updating the Slider-----
const slider = document.getElementById("password-slider");
const sliderOutput = document.getElementById("current-length");
sliderOutput.innerHTML = slider.value; 

slider.oninput = function() {
  sliderOutput.innerHTML = slider.value;
}

function updateSliderTrack() {
  const min = slider.min || 0;
  const max = slider.max || 100;
  const value = slider.value;

  const percentage = ((value - min) / (max - min)) * 100 + "%";

  slider.style.setProperty("--progress", percentage);
}

slider.addEventListener("input", updateSliderTrack);

updateSliderTrack();


//-----Password Generation------
const generatedPassword = document.getElementById('generated-password');
const generateButton = document.getElementById('generate-button');
const uppercaseInput = document.getElementById('uppercase-checkbox');
const lowercaseInput = document.getElementById('lowercase-checkbox');
const numbersInput = document.getElementById('numbers-checkbox');
const symbolsInput = document.getElementById('symbols-checkbox');
const copyButton = document.getElementById('copy-button');
const message = document.getElementById('copied-text');


const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "~!@#$%^&*()_-+={[}]|:;<,>.?/";

let userCheckedBoxes = [];
let strength = 0;
let userPassword = "";


generateButton.addEventListener("click", () => {
  const characters = slider.value;
  userCheckedBoxes = [];
  strength = 0;
  userPassword ="";
  message.classList.add('hidden');

  addSelections();

  for (let i = 0; i < characters; i++) {
    const firstRandomNumber = Math.floor(Math.random() * userCheckedBoxes.length);
    const randomIndex = userCheckedBoxes[firstRandomNumber];
    
    const secondRandomNumber = Math.floor(Math.random() * randomIndex.length)
    const randomCharacter = randomIndex.charAt(secondRandomNumber);
    
    userPassword += randomCharacter;  
  }
  
  updatePasswordDOM(userPassword);

  resetStrength();
  
  if(characters >= 8){
    showStrength(strength);
  };

  console.log(userPassword);
});

copyButton.addEventListener('click',copyPasswordText);

//---Functions---
function addSelections () {
  if(uppercaseInput.checked){
    userCheckedBoxes.push(uppercaseLetters);
    strength++;
  } 

  if(lowercaseInput.checked){
    userCheckedBoxes.push(lowercaseLetters);
    strength++;
  } 

  if(numbersInput.checked){
    userCheckedBoxes.push(numbers);
    strength++;
  } 

  if(symbolsInput.checked){
    userCheckedBoxes.push(symbols);
    strength++;
  } 
}

function updatePasswordDOM (password) {
  generatedPassword.innerText = password;
  generatedPassword.style.opacity = '1';
}

function showStrength(value){
  const strengthBars = Array.from(document.querySelectorAll('.strength-bars'));
  const text = document.getElementById('password-strength-text');
  const strengthClasses = ['too-weak', 'weak', 'medium', 'strong'];
  const strengthTexts = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG"];
  
  strengthBars.forEach((bar, i) => {
    bar.classList.add(i < value ? strengthClasses[value - 1] : 'bar');
  });

  text.innerText = `${strengthTexts[strength - 1]}`;
}

function resetStrength(){
  const strengthBars = Array.from(document.querySelectorAll('.strength-bars'));
  strengthBars.forEach((bar) => bar.classList.remove('too-weak', 'weak', 'medium', 'strong', 'bar'));
}

function copyPasswordText() {
  const copyText = generatedPassword.innerText;
  
  navigator.clipboard.writeText(copyText);

  message.classList.remove('hidden');

  console.log("Copied Password: " + copyText);
}
