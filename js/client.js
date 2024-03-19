// const socket = io("http://localhost:8000");
var socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);
var audio = new Audio("ding.mp3");


const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};


socket.on("user-joined", (name) => {
  append(`${name} joined the chat `, "right");
});


socket.on("receive", (data) => {
  append(`${data.name}:${data.message}`, "left");
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents reload
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = ""; // empty the input box
  });