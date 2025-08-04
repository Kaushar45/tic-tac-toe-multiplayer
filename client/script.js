const socket = io("ws://localhost:5000");

const userId = prompt("enter ID");
if (userId) {
  socket.emit("info", userId);
}

let boxes = document.querySelectorAll(".box");
let restartBtn = document.getElementById("restart");
let turnElement = document.getElementById("turn");
let winElement = document.getElementById("win");
winElement.style.display = "none";
turnElement.style.display = "none";

socket.on("data", ({ data, turn }) => {
  if (turn == userId) {
    turnElement.style.display = "block";
  } else {
    turnElement.style.display = "none";
  }
  boxes.forEach((box, i) => {
    box.innerHTML = data[i];
  });
});
socket.on("win", (win) => {
  turnElement.style.display = "none";
  winElement.innerHTML = win;
  winElement.style.display = "block";
  console.log(win);
});
socket.on("restart", () => {
  turnElement.style.display = "none";
  winElement.style.display = "none";
});

boxes.forEach((box, i) => {
  box.addEventListener("click", function () {
    socket.emit("input", i);
  });
});

restartBtn.addEventListener("click", () => {
  socket.emit("restart", userId);
});
