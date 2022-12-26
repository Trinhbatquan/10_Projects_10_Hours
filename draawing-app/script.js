const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const increaseBtn = document.querySelector(".increase");
const decreaseBtn = document.querySelector(".decrease");
const sizeCanVas = document.querySelector(".sizeCanVas");
const input = document.getElementById("color");
const clearBtn = document.querySelector(".clear");

input.value = "#000000";
let isPressed = false;

let size = 30;
let color = "";
updateSize();
updateColor();

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x1 = e.offsetX;
    const y1 = e.offsetY;
    draw(x1, y1);
  }
});

function draw(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

increaseBtn.addEventListener("click", () => {
  size += 2;
  if (size > 50) {
    size = 50;
  }
  updateSize();
});

decreaseBtn.addEventListener("click", () => {
  size -= 2;
  if (size < 5) {
    size = 5;
  }
  updateSize();
});

function updateSize() {
  sizeCanVas.innerText = size;
}

function updateColor() {
  color = "#000000";
}

input.addEventListener("change", (e) => {
  let colorCanVas = e.target.value;
  console.log(e.target);
  console.log(colorCanVas);
  color = colorCanVas;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  input.value = "#000000";
  size = 30;
  sizeCanVas.innerHTML = size;
  color = "#000000";
});
