import User = require("./cadastro");
const loginForm = document.getElementById("loginForm") as HTMLFormElement;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Email ou senha incorretos!");
    return;
  }

  localStorage.setItem("loggedUser", JSON.stringify(user));

  alert("Login realizado!");
  window.location.href = "home.html";
});