function connexionFormulaire() {
    //Récupération du formulaire de connexion
    const formulaireConnexion = document.querySelector("#connexion-form");
    formulaireConnexion.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Création de l’objet du nouvel utilisateur.
        const user = {
            email: event.target.querySelector("[name=user_email]").value,
            password: event.target.querySelector("[name=user_password]").value
        };

        //Envoie des valeurs des champs du formulaire sous forme de requête a l'API pour obtenir en réponse le token
        const userLogIn = JSON.stringify(user);

        //Requête Api fait dans un try catch block pour voir si la requête renvoie une erreur ou pas.
        try{
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: userLogIn
            });

            //Si la réponse de l'api n'est pas ok alors cela vas envoyer une erreur au catch block
            if(!response.ok){
                throw new Error("E-mail et/ou mot de passe incorrect");
            }

            const token = await response.json();
            const valeurToken = JSON.stringify(token);
            //Stockage du token dans le localStorage
            window.localStorage.setItem("token", valeurToken);
            //Redirection sur la page principale
            document.location.href = "./index.html";

        }catch{
            //Si les deux champs n'ont pas exactement la même valeur qu'attendu alors alerte incorrect
            window.alert("E-mail et/ou mot de passe incorrect");
        }


    })
}

connexionFormulaire();