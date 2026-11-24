const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(function(todo) {

        const li = document.createElement("li");
        li.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = todo.task;

        if (todo.completed) {
            span.classList.add("completed");
        }

        checkbox.addEventListener("change", function() {

            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();

        });

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function() {
            const newTask = prompt("Edit your task:", todo.task);
            if (newTask !== null && newTask.trim() !== "") {
                todo.task = newTask.trim();
                saveTodos();
                renderTodos();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            todos = todos.filter(function(item) {
                return item.id !== todo.id;
            });

            saveTodos();
            renderTodos();

        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        todoList.appendChild(li);
    });

    totalTasks.textContent = "Total Tasks: " + todos.length;

    const completedCount = todos.filter(function(todo) {
        return todo.completed;
    }).length;

    completedTasks.textContent = "Completed: " + completedCount;

    emptyMessage.style.display =
        todos.length === 0 ? "block" : "none";

}


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const newTodo = {
        id: Date.now(),
        task: taskText,
        completed: false
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    taskInput.value = "";
    taskInput.focus();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTodos();
