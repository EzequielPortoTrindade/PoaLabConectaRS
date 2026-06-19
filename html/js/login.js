function login(){

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = JSON.parse(localStorage.getItem(email));

    if(usuario && usuario.senha === senha){
        alert("Login realizado com sucesso!");
        window.location.href = "../dashboard/dashboard.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}
    const usuario = {
        nome,
        email,
        senha
    };

    localStorage.setItem(email, JSON.stringify(usuario));

    alert("Usuário cadastrado com sucesso!");