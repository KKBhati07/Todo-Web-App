{
    //INTERFACES
    //creating interface for the task object
    interface Task {
        id: string;
        text: string;
        isCompleted: boolean;
    }

    interface Theme {
        backgroundColor: string;
        fontColor: string;
    }

    //array to store tasks
    let tasksArray: Task[] = new Array();

    //getting home elements by IDs
    const todoInput = document.getElementById("input-todo");
    const itemsList = document.getElementById("item-list");
    const menu = document.getElementById("menu-container");

    // getting menu elements by IDs
    const completedTasks = document.getElementById("completed-tasks");
    const totalTasks = document.getElementById("total-tasks");

    //getting alert box elements by IDs
    const alertBox = document.getElementById("alert-container");
    const alertMessage = document.getElementById("alert-message");

    //calling functions on app start
    renderFromLocalStorage();
    setTheme();
    renderItems();


    //function to take input from the user
    function onEnterPress(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            const target = event.target as HTMLInputElement;

            const text: string = target.value;
            const textUp = toCapitalize(text);
            if (!textUp) return showAlert("Enter a Task");
            const task: Task = {
                text: textUp,
                id: Date.now().toString(),
                isCompleted: false
            };
            target.value = "";
            //to add the task in list
            addTask(task);
        }
    }

    //adding event listener for key down event
    if (todoInput) todoInput.addEventListener("keydown", onEnterPress);


    function addTask(task: Task): void {
        if (task) {
            tasksArray.push(task);
            renderItems();
            addToLocalStorage(task);
            return;
        }
        //alert for task could not be added
        showAlert("Unable to add task");
    }

    //to capitalize the first letter
    function toCapitalize(text: string): string {
        let char = text.charAt(0);
        let charUpperCase = char.toUpperCase();
        return charUpperCase + text.slice(1);
    }

    //function to delete a task
    function deleteTask(taskId: string | undefined): void {
        tasksArray = tasksArray.filter(task => task.id !== taskId);
        if (tasksArray) {
            deleteFromLocalStorage(taskId);
            renderItems();
            return;
        }
        //alert for task could not be deleted
        showAlert("Unable to delete task");
    }


    //function to toggle the tasks
    function toggleTask(taskId: string | undefined): void {
        const task = tasksArray.find(task => task.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            const element: HTMLElement | null = document.querySelector(`[data-id="${taskId}"]`);
            if (element) {
                if (task.isCompleted) {
                    element.style.opacity = "0.4";
                    element.style.textDecoration = "line-through";
                } else {
                    element.style.opacity = "1";
                    element.style.textDecoration = "none";
                }
            }
            updateLocalStorage(taskId);
            setPendingTaskCount(); //to get the pending task count
        }
        //alert
        else showAlert("Unable to Toggle Task");
    }

    //function to render items to DOM
    function renderItems(): void {
        setPendingTaskCount(); //to get the pending task count
        setTotalTaskCount(); //to get total tasks
        if (itemsList) {
            itemsList.innerHTML = "";
            for (let currentTask of tasksArray) {
                let onCompleteClass = "";
                if (currentTask.isCompleted) onCompleteClass = "toggle-on-complete";
                let div = document.createElement("div");
                div.id = `task-container-${currentTask.id}`;
                div.innerHTML = `<li id="todo-list" class="todo-list on-hover-items">
            <h2 class="todo-item ${onCompleteClass} " data-id=${currentTask.id} id="todo-item">${currentTask.text}</h2>
            <div id="delete-todo" class="delete-todo" data-id=${currentTask.id}></div>
        </li>`
                itemsList.append(div);
            }
        }
    }

    // ==================MENU FUNCTIONS=====================

    //functions to get number of pending tasks
    function setPendingTaskCount(): void {
        let count = 0;
        tasksArray.forEach(element => {
            if (!element.isCompleted) count++;
        });
        if (completedTasks) completedTasks.textContent = `Pending: ${count}`;
    }
    //function to get total tasks
    function setTotalTaskCount(): void {
        if (totalTasks) totalTasks.textContent = `Total Tasks: ${tasksArray.length}`;
    }

    // ==================ALERT BOX==============

    function showAlert(text: string) {
        //to make sure these are not null
        if (alertBox && alertMessage) {
            alertBox.style.display = "flex";
            alertMessage.textContent = text;
        }
    }

    // ============GLOBAL EVENT LISTENER=================
    //theme Object
    let theme: Theme = {
        backgroundColor: "rgb(0, 43, 43)",
        fontColor: "rgb(255, 255, 255)"
    };

    //adding event listener to whole document
    document.addEventListener("click", (event: MouseEvent): void => {
        if (!event || !event.target || !menu || !alertBox) return;
        const target = event.target as HTMLInputElement
        const eventId = target.id

        // let eventId = event.target.id;
        if (eventId === "todo-item") {
            toggleTask(target.dataset.id);
        }

        else if (eventId === "delete-todo") deleteTask(target.dataset.id);
        else if (eventId === "menu-button") menu.style.display = "flex";
        //for buttons in menu
        else if (eventId === "close-btn") menu.style.display = "none";

        //to change themes
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
            theme.fontColor = "rgb(255, 255, 255)"
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }
        else if (eventId === "5") {
            theme.backgroundColor = "rgb(226, 93, 93)";
            theme.fontColor = "rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor, theme.fontColor);
            addThemeToLocalStorage(theme);
        }

        //to close the menu when clicked outside the menu box
        else if (eventId === "menu-container") menu.style.display = "none";

        //for Alert box
        else if (eventId === "alert-close-btn") alertBox.style.display = "none";


        //to close the menu when clicked outside the alert box
        else if (eventId === "alert-container") alertBox.style.display = "none";



    });
    //to set theme properties
    function setThemeProperties(backgroundColor: string, fontColor: string): void {
        document.documentElement.style.setProperty("--backgroundColor", backgroundColor);
        document.documentElement.style.setProperty("--fontColor", fontColor);
    }

    // =================LOCAL STORAGE==============

    //function for adding tasks to the local storage
    function addToLocalStorage(task: Task): void {
        const storedTasks = localStorage.getItem("tasks");
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    //function to delete tasks to the local storage
    function deleteFromLocalStorage(taskId: string | undefined): void {
        const storedTasks = localStorage.getItem("tasks");
        if (!storedTasks) return;
        let tasks: Task[] = JSON.parse(storedTasks);

        tasks = tasks.filter((task: Task) => task.id !== taskId)
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    //to update local storage
    function updateLocalStorage(taskId: string | undefined): void {
        const storedTasks = localStorage.getItem("tasks");
        if (!storedTasks) return;
        const tasks: Task[] = JSON.parse(storedTasks);
        const task = tasks.find(task => task.id == taskId);
        if (task) task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    //function to render task to DOM when page app reloads
    function renderFromLocalStorage(): void {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            if (tasks !== null) tasksArray.push(...tasks);
        }
    }

    //to add theme to local storage
    function addThemeToLocalStorage(values: Theme): void {
        localStorage.setItem("todoAppTheme", JSON.stringify(values));
    }

    //to set the theme when app reloads or restarts
    function setTheme() {
        const appTheme = localStorage.getItem("todoAppTheme")
        if (appTheme) {

            const theme: Theme = JSON.parse(appTheme);

            if (theme !== null) {
                document.documentElement.style.setProperty("--backgroundColor", theme.backgroundColor);
                document.documentElement.style.setProperty("--fontColor", theme.fontColor);
            }
        }
    }
}