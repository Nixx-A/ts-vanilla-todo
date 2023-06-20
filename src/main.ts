import "toastify-js/src/toastify.css"
import './style.css'
import { v4 } from 'uuid'
import Toastify from 'toastify-js'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const taskList = document.querySelector<HTMLDivElement>('#taskList')

interface Task {
  id: string
  title: string
  description: string
}

let tasks: Task[] = []
taskForm?.addEventListener('submit', e => {
  e.preventDefault()

  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement

  if (title.value === '' || description.value === '') {
    Toastify({
      text: "You can' add empty todos",
      style: {
        background: '#c22'
      }
    }).showToast()
    return
  }

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

  Toastify({
    text: 'Task added',
  }).showToast()

  renderTasks(tasks)
  taskForm.reset()
  title.focus()
})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  console.log(tasks)
  renderTasks(tasks)
})

function renderTasks(tasks: Task[]) {
  taskList!.innerHTML = ''
  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className =
      'bg-zinc-800 mb-1 rounded-lg hover:bg-zinc-700 hover:cursor-pointer p-4 overflow-x-auto'

    const header = document.createElement('header')
    header.className = 'flex justify-between'
    const title = document.createElement('span')

    const description = document.createElement('p')
    const id = document.createElement('p')
    id.innerText = task.id
    id.className = 'text-gray-400 text-xs'


    const btnDelete = document.createElement('button')
    btnDelete.className =
      'bg-red-500 px-2 py-1 rounded-md hover:bg-red-400 duration-200'
    btnDelete.innerText = 'Delete'

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTasks(tasks)
      Toastify({
        text: 'Todo deleted',
        style: {
          background: '#f44'
        }
      }).showToast()
    })



    description.innerText = task.description
    title.innerText = task.title

    header.append(title)
    header.append(btnDelete)
    taskElement.append(header)
    taskElement.append(description)
//    taskElement.append(id)
    taskList?.append(taskElement)
  })
}

/*
import { handleForm, setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Random cat</h1>
    <input id="input-cat" name="query" value="nico">
  </div>
  <button id="counter" type="button"></button>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
handleForm(document.getElementById('input-cat'))
 */
