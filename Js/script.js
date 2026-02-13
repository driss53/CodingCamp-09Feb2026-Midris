
let user = prompt("Enter your name:");
if (user && user.trim() !== "") {
  document.getElementById("username").textContent = user;
}


function scrollToMessage() {
  document.getElementById("message").scrollIntoView({ behavior: "smooth" });
}


const form = document.getElementById("messageForm");
const tableBody = document.querySelector("#messageTable tbody");

document.addEventListener("DOMContentLoaded", loadMessages);

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const message = document.getElementById("messageInput").value.trim();

  if (!name || !dob || !gender || !message) {
    alert("Please fill all fields!");
    return;
  }

  const data = {
    id: Date.now(),
    name,
    dob,
    gender: gender.value,
    message
  };

  saveMessage(data);
  addRow(data);
  form.reset();
});

function saveMessage(data) {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(data);
  localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.forEach(addRow);
}

function addRow(data) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${data.name}</td>
    <td>${data.dob}</td>
    <td>${data.gender}</td>
    <td>${data.message}</td>
    <td><button onclick="deleteMessage(${data.id})">🗑</button></td>
  `;

  tableBody.appendChild(row);
}

function deleteMessage(id) {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages = messages.filter(msg => msg.id !== id);
  localStorage.setItem("messages", JSON.stringify(messages));
  location.reload();
}
