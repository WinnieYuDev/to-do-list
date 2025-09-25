// Auto-load and update date and time. Referenced from youtube, https://www.youtube.com/watch?v=_L6vpV_3SaE, and stack overflow
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  const ampm = h < 12 ? "AM" : "PM";
  const h12 = h % 12 || 12;

  timeEl.textContent = (h12 < 10 ? "0" : "") + h12 + ":" + (m < 10 ? "0" : "") + m + " " + ampm;

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  dateEl.textContent = days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + " " + now.getFullYear();
}

setInterval(updateClock, 1000);
updateClock(); // Run once on load

//help and reference from youtube tutorial, https://www.youtube.com/watch?v=G0jO8kUrg-I and Google AI overview on how to add and remove tasks
//Add tasks with on click and enter button
const ul = document.querySelector("ul");
const input = document.querySelector("input");
const addButton = document.querySelector(".addTask");
const clearButton = document.querySelector(".clearCompleted");
const clearAll = document.querySelector(".clearAll");

function addTask() {
  if (input.value === '') {
    alert("Please enter a task.");
  } else {
    let li = document.createElement("li");
    li.innerHTML = input.value;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    ul.appendChild(li);
  }
  input.value = "";
  saveData();
}

//reference from stack overflow and Google AI overview on how to trigger button click on enter key press

function handleEnterKey(e) {
  if (e.key === "Enter") {
    addTask();
  }
}
input.addEventListener("keydown", handleEnterKey);

function toggleTaskCompletion(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
}
ul.addEventListener("click", toggleTaskCompletion);

//reference from stack overflow, https://stackoverflow.com/questions/72576249/to-do-list-clear-button and Google AI overview clear all tasks button and clear only completed button

function clearCompletedTasks() {
  const items = ul.querySelectorAll("li.checked");
  for (let i = 0; i < items.length; i++) {
    items[i].remove(); // Remove only completed tasks, removes an element from its parent node
  }
  saveData();
}

clearButton.addEventListener("click", clearCompletedTasks);

function clearAllTasks() {
  const allItems = ul.querySelectorAll("li");
  for (let i = 0; i < allItems.length; i++) {
    allItems[i].remove(); // Remove all tasks, removes an element from its parent node
  }
  saveData();
}
clearAll.addEventListener("click", clearAllTasks);

//reference from stack overflow, how to save data and show
function saveData() {
  localStorage.setItem("data", ul.innerHTML);
}

function showData() {
  const saved = localStorage.getItem("data");
  if (saved) {
    ul.innerHTML = saved;
  }
}
showData();
