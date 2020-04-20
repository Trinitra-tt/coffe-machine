"use strict" //- необходимо писать при подключении к index.php






/*window.document.documentElement.body  //- полное написание ДОМа */

/*console.log(document.body);  //сокращённое написание ДОМа  */

//-----------------------УСТАРЕВШИЕ МЕТОДЫ -------------------------------

/*let coffeeMachine = document.getElementById("coffee"); //поиск по ID
console.log(coffeeMachine);

let images = document.getElementsByTagName("img"); //поиск по тэгу
console.log(images);

let coffeeItems = document.getElementsByClassName("coffee-item"); //поиск по классу
console.log(coffeeItems);

let firstImage = coffeeItems[0].getElementsByTagName("img");
console.log(firstImage[0]);*/
//------------------------------------------------------------------------

/*//-------------------------------Современные методы-------------------------
let coffeeMachine = document.querySelector("#coffee"); //поиск по тегу - поэтому ставим # 
console.log(coffeeMachine);

let image = document.querySelector("img"); //ищет первый элемент
console.log(image);

let coffeeItems = document.querySelectorAll(".coffee-item") //поиск всех элементов с классом (поэтому ставим точку перед элементом)
console.log(coffeeItems);

let itemImages = document.querySelectorAll(".coffee-item img")
console.log(itemImages);

let cupImages = document.querySelectorAll(".coffee-item img, .coffee-cup img");
console.log(cupImages);
//----------------------------------------------------------------
*/

/*let coffeeMachine = document.querySelector(".coffee-machine")
coffeeMachine.style.border = "4px double red"; //style -свойство (т.к. без круглых скобок, в скобках прописывается метод)
coffeeMachine.style.borderRadius = "15px"; //если свойство в коде писалось через тире, то необходимо использовать верблюжью нотацию, т.к. JS считает тире минусом.
//-------------
coffeeMachine.style.position = "absolute"; // положение контейнера на странице
coffeeMachine.style.top = "15px";
coffeeMachine.style.left = "150px";
//------------
let coffeeMachinetop = coffeeMachine.style.top; // забрать свойство  переменной (отрезали px от 15px ) чтоб потом можно было считать корректно
console.log( parseInt(coffeeMachinetop) );*/

//--------------------ИЗМЕНЕНИЕ АТРИБУТОВ-------------------------

/*let balance = document.querySelector("input[type='text']");
/*let balanceType = balance.getAttribute("type");
console.log(balanceType);
balance.setAttribute("type", "date"); // в панельке с балансом поменяли текст на дату 


console.log(balance.hasAttribute("placeholder") ); // определение есть ли вообще элемент в коде (в консоли будет либо true или false)
balance.removeAttribute("aria-label"); //удаление элементов


balance.value = 500; //balance.setAttribute("value", 500); //изменили надпись в панели с балансом
console.log(balance.value); // == balance.getAttribute('value');


*/

//----------------------ИЗМЕНЕНИЕ КЛАССОВ --------------------------

/*let changeButton = document.querySelector(".btn");
console.log(changeButton.classList);
changeButton.classList.remove("btn-primary"); //убрали цвет у кнопки "сдача"
changeButton.classList.add("btn-success"); //добавили цвет кнопке
//changeButton.classList.toggle("") //вкл./выкл.

*/


//-----------------ИЗМЕНЕНИЕ содержимого элементов --------------------------

/*let displayText = document.querySelector(".display-text"); //получаем внутренне содержимое текстовое (содержимое тега Р - в данном случае)
console.log( displayText.innerHTML ); 
console.log( displayText.innerText ); 
displayText.innerHTML = "<b> Готовим кофе</b>";
//displayText.innerText = "<b> Готовим кофе</b>";


*/


//-----------------События и слушатели событий--------------------------

// мышь - click, mouserover, mouseup, mousedown, mousemove
//для Input - focus, change
// 1. С помощью атрибута



//-----------------ПЛАНИРОВАНИЕ--------------------------

/*let timeout = setTimeout(paintBody, 5000, 'aqua'); //время задаём в милисекундах, поэтому 5 сек = 5000 м/с -- окрасится задний фон
let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearTimeout(timeout); //отменит действие таймаута при нажатии на кнопку "сдача"
}

function paintBody (color) {
  document.body.style.background = color;
}

*/


/*setInterval(trashConsole, 1000); // каждую секунду будет появляться сообщение в консоли
function trashConsole() {
  console.log( Math.random() );
}
*/


let interval = setInterval(trashConsole, 1000);
let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearInterval(interval);
}
function trashConsole() {
  console.log( Math.random() );
}













