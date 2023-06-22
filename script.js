let todoTasks=new Array();

//getting home elements by IDs
const todoInput=document.getElementById("input-todo");
const itemsList=document.getElementById("item-list");
const tasksTotal=document.getElementById("total-tasks");
const menu=document.getElementById("menu-container");

// getting menu elements by IDs
const completedTasks=document.getElementById("completed-tasks");
const totalTasks=document.getElementById("total-tasks");

//getting alert box elements by IDs
const alertBox=document.getElementById("alert-container");
const alertMessage=document.getElementById("alert-message");

//calling functions on app start
renderFromLocalStorage();
setTheme();
renderItems();  


// ===========MAIN==================

//creating a function to take the input when user presses enter
function onEnterPress(event){
    if(event.key==="Enter"){
        const text=event.target.value;
        const textUp=toCapitalize(text);
        if(!textUp) return showAlert("Enter a Task");
        const task={
            text:textUp,
            id:Date.now().toString(),
            isCompleted:false
        };
        event.target.value="";
        //to add the task in list
        addTask(task);
    }   
    
}
//adding event listener for key down event
todoInput.addEventListener("keydown",onEnterPress);



//function to add the task in the tasks array
function addTask(task){
    if(task){
        todoTasks.push(task);
        renderItems();
        addToLocalStorage(task);
        return;
    }
    //alert for task could not be added
    showAlert("Unable to add task");
}

//function to delete a task
function deleteTask(taskId){    
    let taskIndex=todoTasks.findIndex((task)=>{
        return task.id===taskId;
    })
    if(taskIndex!==-1){
        todoTasks.splice(taskIndex,1);
        deleteFromLocalStorage(taskId);
        renderItems();
        return;
    }
    //alert for task could not be deleted
    showAlert("Unable to delete task");
}


//function to toggle the tasks
function toggleTask(taskId){
    const taskIndex=todoTasks.findIndex((task)=>{
        return task.id===taskId;
    });
    if(taskIndex!==-1){
        todoTasks[taskIndex].isCompleted= !todoTasks[taskIndex].isCompleted;
        updateLocalStorage(taskId);
        renderItems();
        return;
    }
    //alert
    showAlert("Unable to Toggle Task");
}

//function to render items to DOM
function renderItems(){
    setPendingTaskCount(); //to get the pending task count
    setTotalTaskCount(); //to get total tasks
    itemsList.innerHTML="";

    for(let i=0;i<todoTasks.length;i++){
        let onCompleteClass="";
        if(todoTasks[i].isCompleted) onCompleteClass= "toggle-on-complete";
        let currentTask=todoTasks[i];
        let div=document.createElement("div");
        div.innerHTML=`<li id="todo-list" class="todo-list on-hover-items">
        <h2 class="todo-item ${onCompleteClass}" data-id=${currentTask.id} id="todo-item">${currentTask.text}</h2>
        <div id="delete-todo" class="delete-todo" data-id=${currentTask.id}></div>
    </li>`
        itemsList.append(div);
    }
}

function toCapitalize(text){
    let char=text.charAt(0);
    let charUpperCase=char.toUpperCase();
    return charUpperCase+text.slice(1);
}
// ==================MENU FUNCTIONS=====================

//functions to get number of pending tasks
function setPendingTaskCount(){
    let count=0;
    todoTasks.forEach(element => {
        if(!element.isCompleted) count++;
    });
    completedTasks.textContent=`Pending: ${count}`;

}
//function to get total tasks
function setTotalTaskCount(){
    totalTasks.textContent=`Total Tasks: ${todoTasks.length}`;
}

// ==================ALERT BOX==============

function showAlert(text){
    alertBox.style.display="flex";
    alertMessage.textContent=text;
}
// ============GLOBAL EVENT LISTENER=================
//theme Object
let theme={
    backgroundColor:"rgb(0, 43, 43)",
    fontColor:"rgb(255, 255, 255)"
};  


//adding event listener to whole document
document.addEventListener("click",(event)=>{
        let eventId=event.target.id;
        if(eventId==="todo-item") toggleTask(event.target.dataset.id);
        else if(eventId==="delete-todo") deleteTask(event.target.dataset.id);
        else if(eventId==="menu-button") menu.style.display="flex";
        //for buttons in menu
        else if(eventId==="close-btn") menu.style.display="none";

        //to change themes
        else if(eventId==="0"){
            theme.backgroundColor="rgb(24, 21, 21)";
            theme.fontColor="rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor,theme.fontColor);
            addThemeToLocalStorage(theme);

        } 
        else if(eventId==="1") {
            theme.backgroundColor="rgb(87, 8, 2)";
            theme.fontColor="rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor,theme.fontColor);
            addThemeToLocalStorage(theme);

        }
        else if(eventId==="2"){
            theme.backgroundColor="rgb(0, 1, 58)";
            theme.fontColor="rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor,theme.fontColor);
            addThemeToLocalStorage(theme);

        } 
        else if(eventId==="3"){
            theme.backgroundColor="rgb(0, 63, 8)";
            theme.fontColor="rgb(255, 255, 255)";
            setThemeProperties(theme.backgroundColor,theme.fontColor);
            addThemeToLocalStorage(theme);

        }
        else if(eventId==="4"){
            theme.backgroundColor="rgb(0, 43, 43)";
            theme.fontColor="rgb(255, 255, 255)"
            setThemeProperties(theme.backgroundColor,theme.fontColor);
            addThemeToLocalStorage(theme);
        } 
        else if(eventId==="5"){
            theme.backgroundColor="rgb(226, 93, 93)";
            theme.fontColor="rgb(255, 255, 255)"; 
            setThemeProperties(theme.backgroundColor,theme.fontColor);
            addThemeToLocalStorage(theme);
        } 

        //to close the menu when clicked outside the menu box
        else if(eventId==="menu-container") menu.style.display="none";
        
        //for Alert box
        else if(eventId==="alert-close-btn") alertBox.style.display="none";

        
        //to close the menu when clicked outside the alert box
        else if(eventId==="alert-container") alertBox.style.display="none";
        
        

})

//to set theme properties
function setThemeProperties(backgroundColor,fontColor){
    document.documentElement.style.setProperty("--backgroundColor",backgroundColor);
    document.documentElement.style.setProperty("--fontColor",fontColor);
}

// =================LOCAL STORAGE==============

//function for adding tasks to the local storage
function addToLocalStorage(task){
    const tasks=JSON.parse(localStorage.getItem("tasks")) ||[];
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
//function to delete tasks to the local storage
function deleteFromLocalStorage(taskId){
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    let taskIndex=tasks.findIndex((task)=>{
        return task.id===taskId;
    })
    if(taskIndex!==-1) tasks.splice(taskIndex,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
//to update local storage
function updateLocalStorage(taskId){
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    let taskIndex=tasks.findIndex((task)=>{
        return task.id==taskId;
    });
    if(taskIndex!==-1) tasks[taskIndex].isCompleted=!tasks[taskIndex].isCompleted;
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

//function to render task to DOM when page app reloads
function renderFromLocalStorage(){
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    if(tasks!==null) todoTasks.push(...tasks);
}

//to add theme to local storage
function addThemeToLocalStorage(values){
    localStorage.setItem("todoAppTheme",JSON.stringify(values));
}

//to set the theme when app reloads or restarts
function setTheme(){
    const theme=JSON.parse(localStorage.getItem("todoAppTheme"));

    if(theme!==null){
        document.documentElement.style.setProperty("--backgroundColor",theme.backgroundColor); 
        document.documentElement.style.setProperty("--fontColor",theme.fontColor); 
    }
    }

