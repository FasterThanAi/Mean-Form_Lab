const apiUrl = 'http://127.0.0.1:3000/tasks';

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);

// Fetch tasks from the backend
async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    renderTasks(tasks);
}

// Render tasks to the screen
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span onclick="toggleTask('${task._id}')" style="cursor:pointer; flex:1;">
                ${task.title}
            </span>
            <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (!title) return;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    fetchTasks(); // Refresh the list
}

// Toggle completion status
async function toggleTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'PUT' });
    fetchTasks();
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchTasks();
}