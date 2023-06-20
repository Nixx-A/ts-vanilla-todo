export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function handleForm(element: HTMLInputElement) {
  console.log(element.value)
let todos = []
  const addTodo = () => {
    todos.push(element)
  }

}