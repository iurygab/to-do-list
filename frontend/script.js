const API_URL = "http://localhost:3000/api";

// Elementos do DOM
const taskTitleInput = document.getElementById("task-title");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Função para buscar tarefas do back-end
async function fetchTasks() {
    const response = await fetch(`${API_URL}/pesquisar`, { method: "POST" });
    const tasks = await response.json();
    renderTasks(tasks);
}

// Função para adicionar uma nova tarefa
async function addTask() {
    const title = taskTitleInput.value.trim();
    if (!title) return alert("Por favor, digite um título para a tarefa.");

    const response = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: title })
    });

    if (response.ok) {
        taskTitleInput.value = "";
        fetchTasks();
    }
}

// Função para editar uma tarefa
async function editTask(id, newTitle) {
    await fetch(`${API_URL}/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: newTitle })
    });
    fetchTasks();
}

// Função para excluir uma tarefa
async function deleteTask(id) {
    await fetch(`${API_URL}/tarefas/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Função para renderizar a lista de tarefas
function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        const titleSpan = document.createElement("span");
        titleSpan.className = "task-title";
        titleSpan.textContent = task.titulo;

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Editar";
        editBtn.onclick = () => {
            const newTitle = prompt("Digite o novo título:", task.titulo);
            if (newTitle) editTask(task.id, newTitle);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Excluir";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(titleSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Eventos
addTaskBtn.onclick = addTask;

// Buscar tarefas ao carregar a página
fetchTasks();
