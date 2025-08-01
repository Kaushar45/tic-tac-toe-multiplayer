const socket = io("ws://localhost:5000");

const userId = prompt("enter ID");
if (userId) {
  socket.emit("info", userId);
}

let boxes = document.querySelectorAll(".box");

socket.on("data", (data) => {
  boxes.forEach((box, i) => {
    box.innerHTML = data[i];
  });
});
socket.on("win", (win) => {
  console.log(win);
});

boxes.forEach((box, i) => {
  box.addEventListener("click", function () {
    socket.emit("input", i);
  });
});
