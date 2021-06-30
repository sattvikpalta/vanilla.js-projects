// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const tasksList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
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
        // Add delete icon in html (fa fa-remove for delete btn)
        link.innerHTML = '<i class="material-icons">clear</i>'
        // Append the delete icon link to li
        li.appendChild(link);
        // Append the li to the ul
        tasksList.appendChild(li);
        // Clear input field for next task
        taskInput.value = '';
    }

    e.preventDefault();
}