"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById("registerForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { name, email, password };
    // pega usuários existentes
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // verifica se email já existe
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("Usuário já existe!");
        return;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Conta criada com sucesso!");
    window.location.href = "index.html";
});
//# sourceMappingURL=cadastro.js.map