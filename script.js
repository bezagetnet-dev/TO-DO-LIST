const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Load tasks when page opens
window.onload = function () {
  list.innerHTML = localStorage.getItem("tasks") || "";
  addEventListeners();
};

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");

  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">X</button>
  `;

  list.appendChild(li);

  input.value = "";

  addEventListeners();
  saveTasks();
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", list.innerHTML);
}

// Add click events to tasks
function addEventListeners() {
  const tasks = document.querySelectorAll("li");

  tasks.forEach(task => {
    task.onclick = function () {
      task.classList.toggle("completed");
      saveTasks();
    };

    const deleteBtn = task.querySelector(".delete-btn");
    deleteBtn.onclick = function (e) {
      e.stopPropagation(); // prevent triggering complete
      task.remove();
      saveTasks();
    };
  });
}