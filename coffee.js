"use strict";
let state = "waiting";

let cupImg = document.querySelector(".coffee-cup img");
let progressBar = document.querySelector(".progress-bar");
let balanceInput = document.querySelector("input[placeholder='Баланс']");

cupImg.onclick = takeCoffee;


//this - возвращает объект к которому обращено свойство или обращён метод.
//<div class="coffee-item" onclick="buyCoffee('Американо', 50, this)">  ---см. 20.04.20 в 13:55

function buyCoffee(name, price, element) {
  if (state != "waiting") { // ожидание - пока не приготовится кофе, новую кружку заказать нельзя!
    return;
  }
  
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

//--------------КУПЮРЫ------------------------------------
let bills = document.querySelectorAll('.bills img');
for (let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney; // выбирать купюру мышкой и тащить в купюроприёмник
/*  bills[i].onmousedown = function (event) {
    takeMoney(event);  ---- можно сделать выбор купюры так же через функцию обёртку, но не рекомендуется
  }*/
}
function takeMoney(event) {
  event.preventDefault(); //отключить браузерные события которые были назначены по умолчанию (default == по умолчанию. Сброс значений по умолчанию.)
  let bill = event.target;
  
  bill.style.position = "absolute";
  bill.style.transform = "rotate(90deg)"//перевернули купюры на 90 градусов
  bill.style.margin = 0;
  
  let billCoords = bill.getBoundingClientRect(); // getBoundingClientRect - позволяет получить координаты и ширину-высоту объекта
  let billWidth = billCoords.width;
  let billHeight = billCoords.height;
/*  console.log(event.clientX, event.clientY); //отображает положение курсора по оси х и по оси у.
*/   
  
  bill.style.top = event.clientY - billWidth/2 + "px"; 
  bill.style.left = event.clientX - billHeight/2 + "px";
  
  window.onmousemove = function(event) {
    bill.style.top = event.clientY - billWidth/2 + "px"; 
    bill.style.left = event.clientX - billHeight/2 + "px";
  }
  
  bill.onmouseup = function() {  //отжать мышь от купюры
    window.onmousemove = null;
    if ( inAtm(bill) ) {
      let billCost = +bill.getAttribute('cost');
      balanceInput.value = + balanceInput.value + billCost;
      bill.remove();
    }
  }
  
}

function inAtm(bill) {
  let atm = document.querySelector('.atm img'); // попадает ли курюра в АТМ
  
  let atmCoords = atm.getBoundingClientRect(); // 
  let billCoords = bill.getBoundingClientRect();
  
  let billLeftTopCorner = {"x" : billCoords.x, "y" : billCoords.y};
  let billRightTopCorner = {"x" : billCoords.x + billCoords.width, "y" : billCoords.y };
  
  let atmLeftTopCorner = {"x" : atmCoords.x, "y" : atmCoords.y};
  let atmRightTopCorner = {"x" : atmCoords.x + atmCoords.width, "y" : atmCoords.y};
  let atmLeftBottomCorner = {"x" : atmCoords.x, "y" : atmCoords.y + atmCoords.height/3 };
  
  if (billLeftTopCorner.x > atmLeftTopCorner.x
      && billRightTopCorner.x < atmRightTopCorner.x
      && billLeftTopCorner.y > atmLeftTopCorner.y
      && billLeftTopCorner.y < atmLeftBottomCorner.y
  ) {
    return true;
  } else {
    return false;
  }
}
 
  // -------------СДАЧА -----------------------
  let changeButton = document.querySelector(".change-btn");
/*  changeButton.onclick = function () {
    takeChange();   --- как вариант через обертку
  }*/ 

changeButton.onclick = function () { //кнопь для забора сдачи
  let changeBox = document.querySelector(".change-box");
  let coins = changeBox.querySelectorAll("img");
  if (coins.length == 0) {
    if (balanceInput.value == 0) { 
    return;
    }
    changeButton.innerHTML = "Забрать сдачу";
    takeChange();
  } else {
    changeButton.innerHTML = "Сдача";
    for (let i = 0; i < coins.length; i++) {
      coins [i].remove();
    }
  }
}  

function takeChange() {
  if (balanceInput.value == 0) { // получение сдачи при нажатии на кнопку
    return;
  }
  if (balanceInput.value >= 10) {
    balanceInput.value -= 10;
    tossCoin("10"); 
    takeChange();
  } else if (balanceInput.value >= 5) {
    balanceInput.value -= 5;
    tossCoin("5"); 
    takeChange();
  } else if (balanceInput.value >= 2) {
    balanceInput.value -= 2;
    tossCoin("2"); 
    takeChange();
  } else {
    balanceInput.value -= 1;
    tossCoin("1"); 
    takeChange();
    }
  }


function tossCoin(cost) {
  let imgSrc = "";
  switch (cost) {
    case "10":
      imgSrc = "img/10rub.png";
      break;
    case "5":
      imgSrc = "img/5rub.png";
      break;
    case "2":
      imgSrc = "img/2rub.png";
      break;
    case "1":
      imgSrc = "img/1rub.png";
      break;
  }
  
  
  let changeBox = document.querySelector(".change-box"); 
  changeBox.style.position = "relative";
  let changeBoxCoords = changeBox.getBoundingClientRect();
  let randomWidth = getRandomInt(0, changeBoxCoords.width - 50); // - 50 добавили, чтоб монетки не выходили за границы лотка для монет
  let randomHeight = getRandomInt(0, changeBoxCoords.height - 50);
  console.log(randomWidth, randomHeight);
  
  let coin = document.createElement("img");
  coin.setAttribute('src', imgSrc);
  coin.style.width = "50px";
  coin.style.height = "50px";
  coin.style.cursor = "pointer";
  coin.style.position = "absolute";
  coin.style.top = randomHeight + "px";
  coin.style.left = randomWidth + "px";
  changeBox.append(coin); //append - прикрепить в конце элемента*/ 
  
  coin.onclick = function() { // проверить сколько монеток остается в контейнере
    coin.remove();
  }
  //changeBox.prepend(coin); //prepend - прикрепить в начале элемента
 // changeBox.before(coin); //прикрепить перед элементом
 // changeBox.after(coin); //прикрепить после элемента
 // changeBox.replaceWith(coin); // заменяет  элемент
 
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

















