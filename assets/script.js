const tasks = loadLocalData('savedTasks') || [];
const taskListElement = document.getElementById("taskListElement");
const emptyTaskListElement = document.getElementById("emptyTaskListElement");
const frmTask = document.getElementById('frmTask');

function newId() {
    return Math.floor(Math.random() * 1000);
}

function getTasks() {
    return tasks;
}

function getTaskById(taskId) {
    const taskIndex = getIndexByTaskId(taskId);

    return tasks[taskIndex] || undefined;
}

function getIndexByTaskId(taskId) {
    return tasks.findIndex((task) => task.id == taskId);
}

function createTask(taskTitle, taskDescription = "") {
    let id = newId();

    let task = {
        id,
        taskTitle,
        taskDescription,
    }

    tasks.push(task);

    saveLocalData('savedTasks', tasks);

    renderTasks();

    return task;
}

function deleteTask(taskId) {
    const taskIndex = getIndexByTaskId(taskId);
    tasks.splice(taskIndex, 1);

    saveLocalData('savedTasks', tasks);

    renderTasks();
}

function updateTask(task = {}) {
    try {
        const taskIndex = getIndexByTaskId(task.id);

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...task,
        };

        frmTask.frmAction.value = 'NEW_TASK';

        saveLocalData('savedTasks', tasks);

        renderTasks();
        return tasks[taskIndex];
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

function renderFormUpdate(taskId = -1) {
    try {
        const taskIndex = getIndexByTaskId(taskId);
        const task = tasks[taskIndex];

        frmTask.frmTaskId.value = task.id;
        frmTask.txtTaskTitle.value = task.taskTitle;
        frmTask.txtTaskDescription.value = task.taskDescription;
        frmTask.frmAction.value = 'UPDATE_TASK';
        frmTask.txtTaskTitle.focus();

    } catch (e) {
        console.log(e);
        alert("Erro ao editar task");
    }
}

function renderTasks(listElement = taskListElement, emptyMessage = emptyTaskListElement) {
    let finalHtml = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        listElement.style.display = 'none';
        return;
    }

    emptyMessage.style.display = 'none';
    listElement.style.display = 'flex';

    tasks.forEach(function (item) {
        finalHtml += `
            <details class="taskItem">
                <summary class="taskTitle">
                    ${item.taskTitle}
                </summary>
                ${item.taskDescription}
                <div>
                    <button
                        class="btn"
                        onclick="if (confirm('Tem certeza')) deleteTask(${item.id})"
                    >
                        Pronto
                    </button>
                    <button
                        class="btn btn-info"
                        onclick="renderFormUpdate(${item.id})"
                    >
                        Alterar
                    </button>
                </div>
            </details>
        `;
    });

    listElement.innerHTML = finalHtml;
}

frmTask.addEventListener('submit', function (event) {
    event.preventDefault();

    if (frmTask.frmAction.value === "NEW_TASK") {
        createTask(frmTask.txtTaskTitle.value, frmTask.txtTaskDescription.value);
        frmTask.reset();
        return;
    }

    updateTask({
        id: frmTask.frmTaskId.value,
        taskTitle: frmTask.txtTaskTitle.value,
        taskDescription: frmTask.txtTaskDescription.value
    });

    frmTask.reset();
})

function saveLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadLocalData(key) {
    const dataString = localStorage.getItem(key);
    return JSON.parse(dataString);
}

renderTasks();