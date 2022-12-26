const addBtn = document.querySelector(".add");
const listTextInLS = JSON.parse(localStorage.getItem('notes'));


if (listTextInLS) {
    listTextInLS.forEach( e => {
        console.log(typeof e);
       addUpdateNote(e);
    })
}



addBtn.addEventListener("click", () => {
    //   console.log(addBtn);
      addNewNote();
    });


 function addUpdateNote(text) {
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
      <div class="tools">
          <button class="edit"><i class="fa-solid fa-pen-nib"></i></button>
          <button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="main hidden">${marked(text)}</div>
      <textarea class="textarea">${text}</textarea>
      `;
    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
   const areaText = note.querySelector(".textarea");
   const main = note.querySelector(".main");

  
    editBtn.addEventListener("click", () => {
      areaText.classList.toggle("hidden");
      main.classList.toggle("hidden");
    });
  
   areaText.addEventListener('input', (e) => {
      const { value } = e.target;
      main.innerHTML = marked(value);
      updateLs();
   })
  
   deleteBtn.addEventListener('click', () => {
      deleteBtn.parentElement.parentElement.remove();
    //   let deleteItem = [];
    //   deleteItem.push(areaText.value);
    //   console.log(deleteItem);
      updateLs();
    //   localStorage.setItem('notes', JSON.stringify
    //  (listTextInLS.filter(id => id !== deleteItem[0])));
   })
  
  
    document.body.appendChild(note);
  }


function addNewNote() {
    console.log("3");
  const note = document.createElement("div");
  note.classList.add("notes");
  note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fa-solid fa-pen-nib"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="main hidden"></div>
    <textarea class="textarea"></textarea>
    `;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
 const areaText = note.querySelector(".textarea");
 const main = note.querySelector(".main");


  editBtn.addEventListener("click", () => {
    areaText.classList.toggle("hidden");
    main.classList.toggle("hidden");
  });

 areaText.addEventListener('input', (e) => {
    const { value } = e.target;
    console.log({value});
    main.innerHTML = marked(value);
    updateLs();
 })

 deleteBtn.addEventListener('click', () => {
      deleteBtn.parentElement.parentElement.remove();
    //   let deleteItem = [];
    //   deleteItem.push(areaText.value);
    //   console.log(deleteItem);
    //   localStorage.setItem('notes', JSON.stringify
    //  (listTextInLS.filter(id => id !== deleteItem[0])));
    updateLs();
 })


  document.body.appendChild(note);
}

function updateLs() {
    const text = document.querySelectorAll(".textarea");
    // console.log(text);
    let arrText = [];
    text.forEach((e) => {
        arrText.push(e.value);
    })
    console.log(arrText);
    localStorage.setItem('notes', JSON.stringify(arrText));
}
