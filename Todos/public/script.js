document.addEventListener('DOMContentLoaded', () => {
    fetchTasks(); // Fetch tasks when the page loads
});

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        fetch('/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTask }),
        })
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
            taskInput.value = ''; // Clear the input field
        })
        .catch(error => console.error('Error adding task:', error));
    }
}
