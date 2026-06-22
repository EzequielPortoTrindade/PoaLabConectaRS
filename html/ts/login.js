"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Email ou senha incorretos!");
        return;
    }
    localStorage.setItem("loggedUser", JSON.stringify(user));
    alert("Login realizado!");
    window.location.href = "home.html";
});
//# sourceMappingURL=login.js.map