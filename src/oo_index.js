let taskNumber = 0
let tasks = []


document.addEventListener("DOMContentLoaded", () => {
  const taskList = new TaskList();

  submitListener()
  completedListener()
  prioritizeListener()

});

function submitListener() {
  let formSubmit = document.getElementById('create-task-form')

  formSubmit.addEventListener('submit', e => {
    e.preventDefault()
    let newTask = document.getElementById('tasks')
    newTask.innerHTML += addLi({task: e.target.description.value, class: e.target.priority.value})
    tasks.push({task: e.target.description.value, class: e.target.priority.value})
  })
}

function completedListener() {
  let ulItemComplete = document.getElementById('tasks')

  ulItemComplete.addEventListener('click', e => {
    let task = document.getElementById('tasks')
    tasks.splice(e.target.dataset.completeId, 1)
    task.innerHTML = renderAllItems(tasks)

  })
}

function prioritizeListener() {
  let prioritize = document.getElementById('prioritize')

  prioritize.addEventListener('click', e => {
    let task = document.getElementById('tasks')
    task.innerHTML = renderAllItems(prioritizeTasks(tasks))
  })
}

function addLi(item) {
  return `<li style="margin: 1px;" class="${item["class"]}" data-list-id="${taskNumber}"> ${item["task"]} <button type="button" data-complete-id="${taskNumber++}"> Delete </button> </li>`
}

function renderAllItems(items) {
  return items.map( item => {
    return `<li style="margin: 1px;" class="${item["class"]}" data-list-id="${items.indexOf(item)}"> ${item["task"]} <button type="button" data-complete-id="${items.indexOf(item)}"> Delete </button> </li>`
  }).join("")
}

function prioritizeTasks(items) {
  return items.sort(function(a, b) {
    let classA = a.class
    let classB = b.class
    if (classA < classB) {
      return -1;
    }
    if (classA > classB) {
      return 1;
    }
    // names must be equal
    return 0;
    })
}
