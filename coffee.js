"use strict";

//this - возвращает объект к которому обращено свойство или обращён метод.
//<div class="coffee-item" onclick="buyCoffee('Американо', 50, this)">  ---см. 20.04.20 в 13:55

function buyCoffee(name, price, element) {
  let balanceInput = document.querySelector("input[placeholder='Баланс']");
  
  if ( +balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.border = "2px double red";
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = "";
    cookCoffee(name, element);
  }
}
function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовится");
  let progressBar = document.querySelector(".progress-bar");
  console.log(progressBar);
}

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text;
}

























