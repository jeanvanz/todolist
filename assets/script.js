const tasks = []
const taskListElement = document.getElementById("taskListElement");
const emptyTaskListElement = document.getElementById("emptyTaskListElement");


function newId(){
    return Math.floor(Math.random()*1000);
}

function createTask(taskTitle, taskDescription = "") {
    let id = newId();

    let task = {
        id,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
    }

    tasks.push(task);
    return task;
}

function renderTask(listElement = taskListElement, emptyMessage = emptyTaskListElement) {
    let finalHtml = "";

    if (tasks.length == 0) {
        emptyMessage.style.display = 'block';
        listElement.style.display = 'none';
        return;
    }

    emptyMessage.style.display = 'none';
    listElement.style.display = 'flex';
}

renderTask();   