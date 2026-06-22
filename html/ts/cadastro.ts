export interface User {
  name: string;
  email: string;
  password: string;
}

const form = document.getElementById("registerForm") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  const user: User = { name, email, password };

  // pega usuários existentes
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

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
