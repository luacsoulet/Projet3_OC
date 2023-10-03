function connexionFormulaire() {
    const formulaireConnexion = document.querySelector("#connexion-form");
    formulaireConnexion.addEventListener("submit", async function (event) {
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const user = {
            email: event.target.querySelector("[name=user_email]").value,
            password: event.target.querySelector("[name=user_password]").value
        };
        if (user.email != "sophie.bluel@test.tld" || user.password != "S0phie") {
            window.alert("E-mail et/ou mot de passe incorrect");
        } else {
            const userLogIn = JSON.stringify(user);
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: userLogIn
            });

            const token = await response.json();
            const valeurToken = JSON.stringify(token);
            window.sessionStorage.setItem("token", valeurToken);

            document.location.href = "./index.html";
        }
    })
}

connexionFormulaire();