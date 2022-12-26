// const form = document.getElementById("form");

const input = document.getElementById("input");
const saveBtn = document.querySelector(".save");
const todoList = document.getElementById("todoList");
const list = JSON.parse(localStorage.getItem('todoList'));


if (list) {
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    loadDataOnStart(list[i]);
  }
}

function loadDataOnStart(data) {
  let todoElement = document.createElement("li");
  todoElement.innerHTML = `
      <span class="spanToDoList">${data.todo}</span>
      <button class="deleteBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>`;
      const spanTodoList = todoElement.querySelector(".spanToDoList");
    if (data.status) {
      spanTodoList.classList.add('line-through');
    }
    spanTodoList.addEventListener("click", () => {
      spanTodoList.classList.toggle("line-through");
      updateLS();
      });
      const deleteBtn = todoElement.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => {
                    deleteBtn.parentElement.remove();
                    updateLS();
                  });
                  todoList.appendChild(todoElement);

}

input.addEventListener('input', () => {
  if (input.value) {
    saveBtn.classList.add("active");
  } else {
    saveBtn.classList.remove("active");

  }
})

saveBtn.addEventListener('click', () => {
  const todoText = input.value;
  let todoElement = document.createElement("li");
  if (todoText) {
        todoElement.innerHTML = `
                <span class="spanToDoList">${todoText}</span>
                <button class="deleteBtn">
                   <i class="fa-solid fa-xmark"></i>
                </button>`;
      todoList.appendChild(todoElement);
  }
      const spanTodoList = todoElement.querySelector(".spanToDoList");
      spanTodoList.addEventListener("click", () => {
            spanTodoList.classList.toggle("line-through");
            updateLS();
            });
            const deleteBtn = todoElement.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => {
                    deleteBtn.parentElement.remove();
                    updateLS();
                  });
                  input.value = "";
    saveBtn.classList.remove("active");
    updateLS();
    });

function updateLS() {
  const todoList = document.querySelectorAll('li span');
  const arrToDoList = [];
  console.log(todoList);
  todoList.forEach(e => {
    console.log(e);
    arrToDoList.push({'todo': e.innerText,
                      'status': e.classList.contains('line-through')});
  })
  localStorage.setItem('todoList', JSON.stringify(arrToDoList));
}








