// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all the event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event -> keyup event occurs when a key is released
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from Local Storage
function getTasks() {
    let tasks;
    // If local storage is empty, make an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // Local storage only stores strings, so it needs to be parsed
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create a task as an 'li' element
        const li = document.createElement('li');
        // Add class (all li's in materialize should have this class and ul's should have collection class)
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        // Create new link element to delete the added task
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add delete icon in html 
        link.innerHTML = '<i class="material-icons">clear</i>';
        // Append the delete icon link to li
        li.appendChild(link);
        // Append the li to the ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // Create a task as an 'li' element
        const li = document.createElement('li');
        // Add class (all li's in materialize should have this class and ul's should have collection class)
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element to delete the added task
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add delete icon in html 
        link.innerHTML = '<i class="material-icons">clear</i>';
        // Append the delete icon link to li
        li.appendChild(link);
        // Append the li to the ul
        taskList.appendChild(li);

        // Store task in local storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear input field for next task
        taskInput.value = '';
    }

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    // If local storage is empty, make an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // Local storage only stores strings, so it needs to be parsed
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    // classList property returns the class name of an element as a dom token list
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            // target property is used to find out which element triggered a specific event
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    // taskItem.textContent = 'somethingclear'. clear is the icon name included and needs to be removed.
    tskItm = taskItem.textContent.replace('clear', '');

    let tasks;
    // If local storage is empty, make an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // Local storage only stores strings, so it needs to be parsed
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // task -> all items of object tasks and index -> their indices
    tasks.forEach(function (task, index) {
        if (tskItm === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    // One way
    // taskList.innerHTML = '';

    // Faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    // Storing everything a user types in variable text
    const text = e.target.value.toLowerCase();
    // Select everything in li
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        // item value in lowercase if not equal to text being input by user will return -1
        if (item.toLowerCase().indexOf(text) != -1) {
            // If matches then show task
            task.style.display = 'block';
        } else {
            // If no match then display nothing
            task.style.display = 'none';
        }
    });
}