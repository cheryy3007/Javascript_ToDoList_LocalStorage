const button = document.getElementById("send");
const btn = document.getElementById("daynight");
const input = document.getElementById("input");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTaskToList(task.text, task.completed));
});
function saveTasks() {
    const tasks = Array.from(taskList.children).map((li) => ({
        text: li.querySelector(".task-text").textContent,
        completed: li.classList.contains("completed"),
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTaskToList(taskText, completed = false) {
    const li = document.createElement("li");
    li.className = "li-element";
    if (completed) li.classList.add("completed");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.className = "task-text";
    li.appendChild(taskTextElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const editBtn = document.createElement("button");
    editBtn.textContent = "🖊";
    editBtn.className = "edit-btn";
    buttonContainer.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete-btn";
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(buttonContainer);
    taskList.appendChild(li);

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    editBtn.addEventListener("click", () => {
        const newTaskText = prompt("Измените текст:", taskTextElement.textContent);
        if (newTaskText) {
            taskTextElement.textContent = newTaskText.trim();
            saveTasks();
        }
    });

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });
}

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

button.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (!taskText) {
        alert("Введите текст!");
        return;
    }
    addTaskToList(taskText);
    saveTasks();
    input.value = "";
});
