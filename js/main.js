// Auto-load and update date and time. Referenced from youtube and stack overflow
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

// Add tasks with on click and enter button
const ul = document.querySelector("ul");
const input = document.querySelector("input");
const addButton = document.querySelector(".addTask");
const clearButton = document.querySelector(".clearCompleted");
const clearAll = document.querySelector(".clearAll");

function addTask() {
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}
addButton.addEventListener("click", addTask);

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

//Clear all tasks button and clear only completed button

function clearCompletedTasks() {
  const items = ul.querySelectorAll("li.checked");
  for (let i = 0; i < items.length; i++) {
    items[i].remove();
  }
  saveData();
}

clearButton.addEventListener("click", clearCompletedTasks);

function clearAllTasks() {
  const allItems = ul.querySelectorAll("li");
  for (let i = 0; i < allItems.length; i++) {
    allItems[i].remove();
  }
  saveData();
}
clearAll.addEventListener("click", clearAllTasks);

// Saves data and shows
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
