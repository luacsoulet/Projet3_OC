
export function modeEditor() {
    //Sélection du header
    const headerDiv = document.querySelector("header");
    const parentDiv = headerDiv.parentNode;

    //Création du bandeau apparaîssant lors de lu mode de modification activé
    const bandeauEditor = document.createElement("div");
    bandeauEditor.setAttribute("class", "bandeau");
    bandeauEditor.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Mode édition</p>`

    // Insertion du bandeau avant le header de la page
    parentDiv.insertBefore(bandeauEditor, headerDiv);

    //Création de div-mes-projets pout y mettre le titre Mes projets et la div contenant le bouton pour ouvrir la fenêtre de dialog
    const divMesprojets = document.createElement("div");
    divMesprojets.setAttribute("class", "div-mes-projets");

    //Création de la div conetenant le bouton d'ouverture de la fenêtre de dialog
    const divModifications = document.createElement("div");
    divModifications.setAttribute("class", "div-modif");
    divModifications.setAttribute("class", "open-button");
    divModifications.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <button class="button" id="open-button">modifier</button>
    `
    // Sélection de la div gallery
    const gallery = document.querySelector(".gallery");
    const galleryParent = gallery.parentNode;

    //Sélection de la div portfolio et du titre Mes projets
    const portfolio = document.querySelector("#portfolio");
    const titreH2 = document.querySelector("#portfolio h2");

    //div-mes-projets est inserer dans #portfolio
    portfolio.appendChild(divMesprojets)

    //ajout de la div-mes-projets avant le titreH2
    galleryParent.insertBefore(divMesprojets, titreH2);

    //titreH2 devient enfant de divMesProjets
    divMesprojets.appendChild(titreH2);

    //divModifications devient enfant de divMesProjets
    divMesprojets.appendChild(divModifications);

    //Disparition des boutons de filtres par catégories
    const divButtons = document.querySelector(".buttons-filter").style.display = "none";

    //Création de la balise dialog ayant pour class et id modal
    const dialogModal = document.createElement("dialog");
    dialogModal.setAttribute("class", "modal");
    dialogModal.setAttribute("id", "modal");

    //Création de la modal Gallery affichant tout les projets et le boutton pour ajouter des projets
    const galleryModal = document.createElement("div");
    galleryModal.setAttribute("class", "modal-wrapper");
    galleryModal.classList.add("gallery-modal");
    galleryModal.innerHTML = `
            <button class="close-button fa-solid fa-xmark"></button>
            <h3 id="modal-title">Galerie photo</h3>
            <div id="modal-gallery"></div>
            <button id="ajoutphoto">Ajouter une photo</button>`

    //insertion de la dialog avant le header
    parentDiv.insertBefore(dialogModal, headerDiv);

    //modal gallery devient enfant de la balise dialog
    dialogModal.appendChild(galleryModal);

    //Selection de la balise dialog
    const modal = document.querySelector('#modal');

    //Sélection du bouton qui vas servir à ouvrir les modals
    const openModal = document.querySelector('.open-button');

    modalAjoutPhoto();

    //Sélection du bouton pour fermer les modals
    const closeModal = document.querySelectorAll('#modal .close-button');

    //Sélection du bouton ajout de photo pour ouvrir la modal .add-project
    const addProjectModal = document.querySelector(".add-project");

    //Lors du click sur bouton .open-button la fenêtre dialog s'ouvre et appelle des fonctions nécéssaire aux beoisn de la modal gallery
    openModal.addEventListener("click", () => {
        modal.showModal();
        deleteWorks();
    })

    //Pour chaques boutons de fermeture lors du click la dialog se ferme 
    for (let i = 0; i < closeModal.length; i++) {
        closeModal[i].addEventListener("click", () => {
            modal.close();
            //La modal gallery apparaît et la modal d'ajout de project disparaît
            galleryModal.style.display = "flex";
            addProjectModal.style.display = "none";
        })
    }

    //Lors d'un click en dehors des modals elles se ferment 
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.close();
            //Remise à la gallery en premier lors de l'ouverture de la modal
            galleryModal.style.display = "flex";
            addProjectModal.style.display = "none";
        }
    }
    getWorks();
    postWork();

}

function modalAjoutPhoto() {
    //Sélection du boutton servant à faire apparaître la fenêtre de diagol
    const btnAddWorks = document.querySelector('#ajoutphoto');
    //Sélection de la balise dialog et de la modal à cacher
    const galleryModal = document.querySelector(".gallery-modal");
    const dialogModal = document.querySelector("dialog");

    //Cacher la modal galerie
    galleryModal.style.display = "none";
    //Création de la modal d'ajout de projet
    const addProjectModal = document.createElement("div");
    addProjectModal.setAttribute("class", "modal-wrapper");
    addProjectModal.classList.add("add-project");
    addProjectModal.innerHTML = `
            <div class="nav-button">
                <button class="return-button fa-solid fa-arrow-left"></button>
                <button class="close-button fa-solid fa-xmark"></button>
            </div>
            <form id="add-form" method="post">
                <h3 id="modal-title">Ajout photo</h3>
                <div id="add-work">
                    <div class="add-photo">
                        <i class="fa-regular fa-image"></i>
                        <label for="image">+ Ajout photo</label>
                        <input type="file" id="image" name="image" accept=".jpg, .jpeg, .png" required="true"/>
                        <p>jpg, png : 4mo max</p>
                    </div>
                    <div class="input-div">
                        <label for="title">Titre</label>
                        <input type="text" id="title" name="title" required="true"></input>
                    </div>
                    <div class="option-div">
                        <label for="category">Catégorie</label>
                        <div class="select">
                            <select id="category" required="true">
                                <option value=""></option>
                                <option value="1">Objets</option>
                                <option value="2">Appartements</option>
                                <option value="3">Hotels & restaurants</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" id="valider">Valider</button>
            </form>`

    //Ajout de la modal d'ajour de projet a la balise dialog
    dialogModal.appendChild(addProjectModal);

    // initialisation de la valeur de display pour afficher en premier la modal galerie et faire disparaître la modal d'ajout
    galleryModal.style.display = "flex";
    addProjectModal.style.display = "none";

    // Si le bouton de retout est clicker alors la modal gallery apparaît et la modal d'ajout disparraît et la function deleteWorks est appeler
    const returnModal = document.querySelector('.return-button');
    returnModal.addEventListener("click", () => {
        addProjectModal.style.display = "none";
        galleryModal.style.display = "flex";
        deleteWorks();
    })

    // Si le bouton #ajoutphoto est clicker alors la modal gallery disparaît et la modal d'ajout apparaît
    btnAddWorks.addEventListener("click", () => {
        galleryModal.style.display = "none";
        addProjectModal.style.display = "flex";
    });

    //Selection de la balise dialog
    const modal = document.querySelector('#modal');

    //Sélection du bouton submit du formulaire d'ajout de photo
    const submitBtn = document.querySelector('#valider');

    //Lors du click sur bouton sublit la fenêtre dialog se ferme
    submitBtn.addEventListener("click", () => {
        modal.close();
    });


    //Ajout du code pour faire apparaître la photo mise dans le input file
    const input = document.querySelector(".add-photo input");
    const preview = document.querySelector(".add-photo");
    const label = document.querySelector(".add-photo label");
    const img = document.querySelector(".add-photo i");
    const text = document.querySelector(".add-photo p");


    input.addEventListener("change", () => {
        //Lors du click mise en transparence des balise i, label et text
        label.style.opacity = 0;
        img.style.opacity = 0;
        text.style.opacity = 0;

        let imgWork = input.files;
        for (let i = 0; i < imgWork.length; i++) {
            //création d'une balise img avec pour class .imageWork
            let image = document.createElement("img");
            //définition de ça largeur et hauteur
            image.height = 193;
            image.width = 129;
            //création d'un aperçu pour l'affichage de l'image grâce l'input 
            image.src = window.URL.createObjectURL(imgWork[i]);
            image.classList.add("imageWork");
            //ajout de la balise image .imageWork dans le preview
            preview.appendChild(image);
        }

        //lors du click sur le bouton valider les balise label,img et texte pour l'input de l'image sont a nouveau visible
        submitBtn.addEventListener("click", () => {
            label.style.opacity = 1;
            img.style.opacity = 1;
            text.style.opacity = 1;
            //suppression de la balise image ou était affiché l'image mise dans l'input file
            let image = document.querySelector(".imageWork");
            image.remove();
            //remise de la vue sur la page de la galerie en faisant disparaître la modal d'ajout de projet
            galleryModal.style.display = "flex";
            addProjectModal.style.display = "none";
        })

    })

    //récupération du formulaire
    const formulairePostWork = document.getElementById("add-form");

    //récupération de toutes les input du formulaire
    const selectInputs = document.querySelector('#add-form select');
    const titleInputs = document.querySelector('.input-div input');
    const imageInputs = document.querySelector('.add-photo input');

    //vérification que tout les inputs sont remplie si oui alors le bouton valider passe au vert sinon il reste gris
    formulairePostWork.addEventListener("change", () => {
        if (selectInputs.value != "" && titleInputs.value != "" && imageInputs.value != "") {
            submitBtn.style.backgroundColor = "#1d6154";
        } else {
            submitBtn.style.backgroundColor = "#A7A7A7";
        }
    })
}



async function getWorks() {
    //récupération des projets dans le localStorage
    let projets = window.localStorage.getItem('projets')

    if (projets === null) {
        // Récupération des projets depuis l'API
        const reponse = await fetch("http://localhost:5678/api/works/");
        projets = await reponse.json();
        // Transformation des projets en JSON
        const valeurProjets = JSON.stringify(projets);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem("projets", valeurProjets);
    } else {
        projets = JSON.parse(projets);
    }

    //génération des projets dans la galerie de la modal de suppression
    for (let i = 0; i < projets.length; i++) {
        const work = projets[i];
        const modalWorks = document.querySelector("#modal-gallery").innerHTML += `
            <div class="projet-selection" id="${work.id}">
                <img class="work-img" src=${work.imageUrl} alt="${work.title}">
                <button class="delete-work" id="${work.id}"><i id="${work.id}" class="fa-solid fa-trash-can"></i></button>
            </div>
        `
    }
}

function deleteWorks() {
    //récupération du token
    let token = window.localStorage.getItem('token');
    token = JSON.parse(token);
    token = token.token;

    //récupération dans une constante des boutons de suppression des projets
    const worksElements = document.querySelectorAll("#modal-gallery .projet-selection button");

    //Boucle pour appliquer sur chaques boutons la requête de suppression du projet en question lors du clic
    for (let i = 0; i < worksElements.length; i++) {
        worksElements[i].addEventListener("click", async function (event) {
            const id = event.target.id;

            //requête de suppression à l'API
            fetch("http://localhost:5678/api/works/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `BearerAuth ${token}`
                }
            });

            //suppression du projet en question dans la modal #modal-gallery
            const selectedWorksModal = document.querySelector(`#modal-gallery [id='${id}']`).style.display = "none";

            //suppression du projet en question dans la div .gallery
            const selectedWorksGallery = document.querySelector(`.gallery [id='${id}']`).style.display = "none";

            //suppression du projet en question dans le localStorage
            let deleteWork = window.localStorage.removeItem("projets", `[id='${id}]`);
        });
    }

}

async function postWork() {
    //récupération du token
    let token = window.localStorage.getItem('token');
    token = JSON.parse(token);
    token = token.token;

    //récupération du formulaire
    let form = document.getElementById("add-form")

    //lors du submit du formulaire
    form.addEventListener("submit", async (e) => {

        // désactivation du comportement par défaut
        e.preventDefault();

        //récupération des différents champs du formulaire
        const imageInput = document.getElementById("image");
        const titleInput = document.getElementById("title");
        const categorySelect = document.getElementById("category");

        //sélection des values et de l'image pour chaque input
        const image = imageInput.files[0];
        const title = titleInput.value;
        const category = categorySelect.value;

        // Créez un objet FormData pour envoyer les données
        const formData = new FormData();

        //ajout des différentes données à formData
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);

        //requête à l'API pour ajouter les données du formulaire pour l'ajouté aux projets
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData
        });

        //récupération des projets dans le localStorage
        const projetsExistantsString = localStorage.getItem('projets');

        // mise dans un tableau des projets du localStorage en enlevant les stringify
        let projetsExistants = [];

        if (projetsExistantsString) {
            projetsExistants = JSON.parse(projetsExistantsString);
        }
        const data = await response.json();

        //ajout des données du nouveau projet venant de l'API aux données de projets déjà existants
        projetsExistants.push(data);

        //Ajout au local storage des projets avec le nouveau projets dans l'item projets du localStorage
        localStorage.setItem("projets", JSON.stringify(projetsExistants));

        //Ajout à la galerie du modal du nouveau projet en l'affichant
        const modalWorks = document.querySelector("#modal-gallery").innerHTML += `
            <div class="projet-selection" id="${data.id}">
                <img class="work-img" src=${data.imageUrl} alt="${data.title}">
                <button class="delete-work" id="${data.id}"><i id="${data.id}" class="fa-solid fa-trash-can"></i></button>
            </div>
        `
        //Ajout à la galerie de la page de modification du nouveau projet en l'affichant
        const sectionGallery = document.querySelector(".gallery").innerHTML += `
                    <figure id="${data.id}">
                        <img src=${data.imageUrl} alt="${data.title}">
                        <figcaption>${data.title}</figcaption>
                    </figure>`

        //suppression des valeurs dans les champs titre et categorie
        titleInput.value = "";
        categorySelect.value = "";
    });

}