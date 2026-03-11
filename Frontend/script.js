const apiUrl = 'http://localhost:3000/tasks';

// 1. Load tasks automatically when the page opens
window.onload = loadTasks;

// 2. Fetch and Display Tasks (Combined function)
async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    
    let listHTML = ''; // Build the HTML as a single string
    
    tasks.forEach(task => {
        // Check if task is completed to add the CSS class
        const statusClass = task.completed ? 'class="completed"' : '';
        
        listHTML += `
            <li ${statusClass}>
                <span onclick="toggleTask('${task._id}')" style="cursor:pointer; flex:1;">
                    ${task.title}
                </span>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </li>
        `;
    });
    
    // Inject all the built HTML at once
    document.getElementById('taskList').innerHTML = listHTML;
}

// 3. Add a new task
async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return; // Stop if the input is empty

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });

    input.value = ''; // Clear the input box
    loadTasks();      // Refresh the list immediately
}

// 4. Toggle completion status
async function toggleTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'PUT' });
    loadTasks();
}

// 5. Delete a task
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadTasks();
}