"use strict";
let state = "waiting";

let cupImg = document.querySelector(".coffee-cup img");
let progressBar = document.querySelector(".progress-bar");
cupImg.onclick = takeCoffee;


//this - возвращает объект к которому обращено свойство или обращён метод.
//<div class="coffee-item" onclick="buyCoffee('Американо', 50, this)">  ---см. 20.04.20 в 13:55

function buyCoffee(name, price, element) {
  if (state != "waiting") { // ожидание - пока не приготовится кофе, новую кружку заказать нельзя!
    return;
  }
  let balanceInput = document.querySelector("input[placeholder='Баланс']");
  
  if ( +balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.border = "2px double red";
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = "";
    state = "cooking"; // готовка - кофе, новый нельзя выбрать, пока не приготовится заказанный
    cookCoffee(name, element);
  }
}
function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовится");
/*  let progressBar = document.querySelector(".progress-bar"); //сделали переменную глобальной, перенесли наверх*/
  let buttonImg = buttonElement.querySelector("img");
  let cupSrc = buttonImg.getAttribute('src');
  let cupImg = document.querySelector(".coffee-cup img"); // можно удалить функцию, т.к. перенесли её наверх и она стала глобальной
  
  cupImg.setAttribute('src', cupSrc);
  cupImg.classList.remove('d-none');
  
  
  
  let i = 0;
  let interval = setInterval(function () {
    i++;
    progressBar.style.width = i + "%" //width: 10%
    cupImg.style.opacity = i + "%"    // проявление чашки по мере готовности кофе
    if (i == 110) { // прогрессбар длинна
      clearInterval(interval); 
      changeDisplayText("Ваш " + name + " готов!");
      cupImg.style.cursor = "pointer"; //изменится курсор, когда кофе будет готов
      state = "ready";
    }
  }, 50)// время за которое заполнится прогрессбар
}

function takeCoffee() {
  if (state != "ready") { // чашку под прогрессбаром можно забрать когда будет готов
    return;  
  }
  state = "waiting";
  cupImg.style.opacity = 0; 
  cupImg.style.cursor = "";
  cupImg.classList.add("d-none");
  changeDisplayText("Выберите кофе");
  progressBar.style.width = 0; //обнуление прогрессбара, когда забираем кофе
}

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text;
}

























