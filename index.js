"use strict";

//-----Updating Slider Progress-----
const slider = document.querySelector('.form-group.length input[type="range"]');
const lengthDisplay = document.querySelector(".form-group.length .length-count");

function updateSlider() {
  const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  lengthDisplay.textContent = slider.value;
  slider.style.setProperty("--progress", `${percentage}%`);
}

updateSlider();

slider.addEventListener("input", updateSlider);

//-----Generating the Password-----
function getStrength() {
  //get all the checked inputs with queryselectorall
  //check length and number of checked boxes vs criteria
  //return the strength as a string that matches the data attributes
}
