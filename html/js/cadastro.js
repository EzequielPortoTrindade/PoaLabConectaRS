function cadastrar(){

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = {
        nome,
        email,
        senha
    };

    localStorage.setItem(email, JSON.stringify(usuario));

    alert("Usuário cadastrado com sucesso!");

    window.location.href = "../login/login.html";
}