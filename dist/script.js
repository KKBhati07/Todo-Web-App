"use strict";
{
    let tasksArray = new Array();
    const todoInput = document.getElementById("input-todo");
    const itemsList = document.getElementById("item-list");
    const menu = document.getElementById("menu-container");
    const completedTasks = document.getElementById("completed-tasks");
    const totalTasks = document.getElementById("total-tasks");
    const alertBox = document.getElementById("alert-container");
    const alertMessage = document.getElementById("alert-message");
    renderFromLocalStorage();
    setTheme();
    renderItems();
    function onEnterPress(event) {
        if (event.key === "Enter") {
            const target = event.target;
            const text = target.value;
            const textUp = toCapitalize(text);
            if (!textUp)
                return showAlert("Enter a Task");
            const task = {
                text: textUp,
                id: Date.now().toString(),
                isCompleted: false
            };
            target.value = "";
            addTask(task);
        }
    }
    if (todoInput)
        todoInput.addEventListener("keydown", onEnterPress);
    function addTask(task) {
        if (task) {
            tasksArray.push(task);
            renderItems();
            addToLocalStorage(task);
            return;
        }
        showAlert("Unable to add task");
    }
    function toCapitalize(text) {
        let char = text.charAt(0);
        let charUpperCase = char.toUpperCase();
        return charUpperCase + text.slice(1);
    }
    function deleteTask(taskId) {
        tasksArray = tasksArray.filter(task => task.id !== taskId);
        if (tasksArray) {
            deleteFromLocalStorage(taskId);
            renderItems();
            return;
        }
        showAlert("Unable to delete task");
    }
    function toggleTask(taskId) {
        const task = tasksArray.find(task => task.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            const element = document.querySelector(`[data-id="${taskId}"]`);
            if (element) {
                if (task.isCompleted) {
                    element.style.opacity = "0.4";
                    element.style.textDecoration = "line-through";
                }
                else {
                    element.style.opacity = "1";
                    element.style.textDecoration = "none";
                }
            }
            updateLocalStorage(taskId);
            setPendingTaskCount();
        }
        else
            showAlert("Unable to Toggle Task");
    }
    function renderItems() {
        setPendingTaskCount();
        setTotalTaskCount();
        if (itemsList) {
            itemsList.innerHTML = "";
            for (let currentTask of tasksArray) {
                let onCompleteClass = "";
                if (currentTask.isCompleted)
                    onCompleteClass = "toggle-on-complete";
                let div = document.createElement("div");
                div.id = `task-container-${currentTask.id}`;
                div.innerHTML = `<li id="todo-list" class="todo-list on-hover-items">
            <h2 class="todo-item ${onCompleteClass} " data-id=${currentTask.id} id="todo-item">${currentTask.text}</h2>
            <div id="delete-todo" class="delete-todo" data-id=${currentTask.id}></div>
        </li>`;
                itemsList.append(div);
            }
        }
    }
    function setPendingTaskCount() {
        let count = 0;
        tasksArray.forEach(element => {
            if (!element.isCompleted)
                count++;
        });
        if (completedTasks)
            completedTasks.textContent = `Pending: ${count}`;
    }
    function setTotalTaskCount() {
        if (totalTasks)
            totalTasks.textContent = `Total Tasks: ${tasksArray.length}`;
    }
    function showAlert(text) {
        if (alertBox && alertMessage) {
            alertBox.style.display = "flex";
            alertMessage.textContent = text;
        }
    }
    let theme = {
        backgroundColor: "rgb(0, 43, 43)",
        fontColor: "rgb(255, 255, 255)"
    };
    document.addEventListener("click", (event) => {
        if (!event || !event.target || !menu || !alertBox)
            return;
        const target = event.target;
        const eventId = target.id;
        if (eventId === "todo-item") {
            toggleTask(target.dataset.id);
        }
        else if (eventId === "delete-todo")
            deleteTask(target.dataset.id);
        else if (eventId === "menu-button")
            menu.style.display = "flex";
        else if (eventId === "close-btn")
            menu.style.display = "none";
        else if (eventId === "0") {
            theme.backgroundColor = "rgb(24, 21, 21)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "1") {
            theme.backgroundColor = "rgb(87, 8, 2)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "2") {
            theme.backgroundColor = "rgb(0, 1, 58)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "3") {
            theme.backgroundColor = "rgb(0, 63, 8)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "4") {
            theme.backgroundColor = "rgb(0, 43, 43)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "5") {
            theme.backgroundColor = "rgb(226, 93, 93)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "menu-container")
            menu.style.display = "none";
        else if (eventId === "alert-close-btn")
            alertBox.style.display = "none";
        else if (eventId === "alert-container")
            alertBox.style.display = "none";
    });
    function setThemeProperties(backgroundColor, fontColor) {
        document.documentElement.style.setProperty("--backgroundColor", backgroundColor);
        document.documentElement.style.setProperty("--fontColor", fontColor);
    }
    function addToLocalStorage(task) {
        const storedTasks = localStorage.getItem("tasks");
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function deleteFromLocalStorage(taskId) {
        const storedTasks = localStorage.getItem("tasks");
        if (!storedTasks)
            return;
        let tasks = JSON.parse(storedTasks);
        tasks = tasks.filter((task) => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function updateLocalStorage(taskId) {
        const storedTasks = localStorage.getItem("tasks");
        if (!storedTasks)
            return;
        const tasks = JSON.parse(storedTasks);
        const task = tasks.find(task => task.id == taskId);
        if (task)
            task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function renderFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            if (tasks !== null)
                tasksArray.push(...tasks);
        }
    }
    function addThemeToLocalStorage(values) {
        localStorage.setItem("todoAppTheme", JSON.stringify(values));
    }
    function setTheme() {
        const appTheme = localStorage.getItem("todoAppTheme");
        if (appTheme) {
            const theme = JSON.parse(appTheme);
            if (theme !== null) {
                document.documentElement.style.setProperty("--backgroundColor", theme.backgroundColor);
                document.documentElement.style.setProperty("--fontColor", theme.fontColor);
            }
        }
    }
}
