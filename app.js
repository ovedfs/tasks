const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const selectColor = document.getElementById('select-color');
const taskList = document.getElementById('task-list');
const btnDelete = document.querySelectorAll('.btn-delete');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// let tasks = [
//   {text: 'Ir al super', color: '#77DD77'},
//   {text: 'Pasear al perro', color: '#99c5c4'},
//   {text: 'Comprar despensa', color: '#ffb7ce'},
// ];

window.addEventListener('load', showTasks);

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();

  if(taskInput.value == '' || selectColor.value == '') {
    alert('Debes ingresar una tarea y elegir un color');
    taskInput.focus();
    return;
  }

  addTask(taskInput.value, selectColor.value);
  taskInput.value = '';
  taskInput.focus();
});

document.addEventListener('click', function(e){
  if(e.target.classList.contains('btn-delete')) {
    e.preventDefault();

    deleteTask(e.target.parentNode.dataset.id);
  }
});

function addTask(text, color) {
  tasks.push({text,color});
  localStorage.setItem('tasks', JSON.stringify(tasks));
  showTasks();
}

function showTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function(task, index){
    taskList.innerHTML += makeTask(task, index);
  });
}

function makeTask(task, index) {
  const html = `
    <div class="task" data-id="${index}" style="background-color: ${task.color};">
      ${task.text}
      <i class="fa-solid fa-trash btn-delete" role="button"></i>
      <small class="task-date">
        <i class="fa-regular fa-calendar"></i>
        ${(new Date()).toLocaleDateString()}
      </small>
    </div>
  `;

  return html;
}

function deleteTask(id) {
  tasks = tasks.filter((task, index) => index != id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  showTasks();
}