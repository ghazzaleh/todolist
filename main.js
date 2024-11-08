const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todosList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
let currentTodo;

const updateTime = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    document.getElementById("date").innerText = dateStr;
    document.getElementById("hour").innerText = timeStr;
};

// به روزرسانی زمان و تاریخ هر ثانیه
setInterval(updateTime, 1000);
updateTime(); // یک بار هم زمان را به‌روز کنیم

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    if (inputValue) {
        saveTodo(inputValue); // save Function
    }
});

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<img src="./image/tick.png" alt="Finish Task" />';
    todo.appendChild(doneBtn);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<img src="./image/edit.png" alt="Edit Task" />';
    todo.appendChild(editBtn);
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<img src="./image/remove.png" alt="Remove Task" />';
    todo.appendChild(removeBtn);

    todosList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".todo");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        currentTodo = parentEl; // ذخیره عنصر جاری برای ویرایش
    }
});

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todosList.classList.toggle("hide");
}

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue); // update value function
    }
    toggleForms();
});

const updateTodo = (text) => {
    if (currentTodo) {
        const todoTitle = currentTodo.querySelector("h3");
        todoTitle.innerText = text; // به روز رسانی متن
    }
}