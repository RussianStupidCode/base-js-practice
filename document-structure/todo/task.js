const storage = window.localStorage;

function createTask(taskText, taskId) {
    const task = document.createElement("div");
    task.classList.add("task");

    task.insertAdjacentHTML("afterBegin", `<div class="task__title">${taskText}</div><a href="#" class="task__remove">&times;</a>`)

    const removeBtn = task.querySelector(".task__remove");
    removeBtn.addEventListener("click", event => {
        event.preventDefault();
        task.remove();

        storage.removeItem(taskId.toString());
    })

    return task;
}


function addTask(taskList, taskText, storage, taskId) {
    if(storage.getItem(taskId)) {
        taskList.insertAdjacentElement("beforeEnd", createTask(taskText, taskId));
        return;
    }

   
    let currentTaskId = storage.getItem("startId");
    taskList.insertAdjacentElement("beforeEnd", createTask(taskText, currentTaskId));

    storage.setItem(currentTaskId.toString(), taskText);
    currentTaskId ++;
    storage.setItem("startId", currentTaskId);
    
}

const tasks = document.querySelector(".tasks");
const addButton = tasks.querySelector(".tasks__add");
const taskInput = tasks.querySelector(".tasks__input");
const taskList = tasks.querySelector(".tasks__list");
let currentTaskId = storage.getItem("startId")? storage.getItem("startId"): 0; 
storage.setItem("startId", currentTaskId);

addButton.addEventListener("click", event => {
    event.preventDefault();

    const taskText = taskInput.value;
    if(taskText === "") {
        return;
    }
 
    taskInput.value = "";

    addTask(taskList, taskText, storage);    
    
});

function clearAllTask() {
    for(const btn of document.querySelectorAll(".task__remove")) {
        btn.click();
    }
}

function createSaveTask(taskList, storage) {
    // т.к. ключи строки, то надо отсортировать как числа, чтобы сохранить порядок
    const taskIdList = Object.keys(localStorage).filter(el => !isNaN(+el)).sort((a, b) => (+a) - (+b))
    for(const key of taskIdList) {
        addTask(taskList, storage.getItem(key), storage, key);
    }
}

clearAllTask();
createSaveTask(taskList, storage);
