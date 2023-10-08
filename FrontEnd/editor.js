
export async function modeEditor() {

    const headerDiv = document.querySelector("header");
    const parentDiv = headerDiv.parentNode;

    const bandeauEditor = document.createElement("div");
    bandeauEditor.setAttribute("class", "bandeau");
    bandeauEditor.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Mode édition</p>
    `

    parentDiv.insertBefore(bandeauEditor, headerDiv);

    const divMesprojets = document.createElement("div");
    divMesprojets.setAttribute("class", "div-mes-projets");

    const divModifications = document.createElement("div");
    divModifications.setAttribute("class", "div-modif");
    divModifications.setAttribute("class", "open-button");
    divModifications.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <button class="button" id="open-button">modifier</button>
    `

    const gallery = document.querySelector(".gallery");
    const galleryParent = gallery.parentNode;

    const portfolio = document.querySelector("#portfolio");
    const titreH2 = document.querySelector("#portfolio h2");

    portfolio.appendChild(divMesprojets)
    galleryParent.insertBefore(divMesprojets, titreH2);
    divMesprojets.appendChild(titreH2);
    divMesprojets.appendChild(divModifications);

    const divButtons = document.querySelector(".buttons-filter").style.display = "none";

    const dialogModal = document.createElement("dialog");
    dialogModal.setAttribute("class", "modal");
    dialogModal.setAttribute("id", "modal");

    const galleryModal = document.createElement("div");
    galleryModal.setAttribute("class", "modal-wrapper");
    galleryModal.classList.add("gallery-modal");
    galleryModal.innerHTML = `
            <button class="close-button fa-solid fa-xmark"></button>
            <h3 id="modal-title">Galerie photo</h3>
            <div id="modal-gallery"></div>
            <button id="ajoutphoto">Ajouter une photo</button>`

    parentDiv.insertBefore(dialogModal, headerDiv);
    dialogModal.appendChild(galleryModal);

    // const addProjectModal = document.querySelector(".add-project");
    // addProjectModal.style.display = "none";

    const modal = document.querySelector('#modal');
    const openModal = document.querySelector('.open-button');
    modalAjoutPhoto();
    const closeModal = document.querySelectorAll('#modal .close-button');

    openModal.addEventListener("click", () => {
        modal.showModal();
    })

    for (let i = 0; i < closeModal.length; i++) {
        closeModal[i].addEventListener("click", () => {
            modal.close();
        })
    }

    window.onclick = function (e) {
        if (e.target == modal) {
            modal.close();
        } else {

        }
    }
    getWorks();
    deleteWorks();

}

function modalAjoutPhoto() {

    const btnAddWorks = document.querySelector('#ajoutphoto');

    const galleryModal = document.querySelector(".gallery-modal");
    const dialogModal = document.querySelector("dialog");
    galleryModal.style.display = "none";
    const addProjectModal = document.createElement("div");
    addProjectModal.setAttribute("class", "modal-wrapper");
    addProjectModal.classList.add("add-project");
    addProjectModal.innerHTML = `
            <div class="nav-button">
                <button class="return-button fa-solid fa-arrow-left"></button>
                <button class="close-button fa-solid fa-xmark"></button>
            </div>
            <form id="add-form" enctype="multipart/form-data" method="post">
                <h3 id="modal-title">Ajout photo</h3>
                <div id="add-work">
                    <div class="add-photo">
                        <i class="fa-regular fa-image"></i>
                        <label for="img-input">+ Ajout photo</label>
                        <input type="file" id="img-input" name="img-input" accept=".jpg, .jpeg, .png" required="true"/>
                        <p>jpg, png : 4mo max</p>
                    </div>
                    <div class="input-div">
                        <label for="add-title">Titre</label>
                        <input type="text" id="add-title" name="add-title" required="true"></input>
                    </div>
                    <div class="option-div">
                        <label for="add-categorie">Catégorie</label>
                        <div class="select">
                            <select id="add-categorie" required="true">
                                <option value=""></option>
                                <option value="objets">Objets</option>
                                <option value="appartements">Appartements</option>
                                <option value="hot-and-res">Hotels & restaurants</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" id="valider">Valider</button>
            </form>`

    dialogModal.appendChild(addProjectModal);


    const returnModal = document.querySelector('.return-button');
    returnModal.addEventListener("click", () => {
        addProjectModal.style.display = "none";
        galleryModal.style.display = "flex";
    })

    btnAddWorks.addEventListener("click", () => {
        galleryModal.style.display = "none";
        addProjectModal.style.display = "flex";
    });

    //Ajout du code pour faire apparaître la photo mise dans le input file
    let input = document.querySelector(".add-photo input");
    let preview = document.querySelector(".add-photo");
    let label = document.querySelector(".add-photo label");

    input.addEventListener("change", () => {

        label.style.opacity = 0;

        let imgWork = input.files;
        for (let i = 0; i < imgWork.length; i++) {
            let image = document.createElement("img");
            image.height = 193;
            image.width = 129;
            image.src = window.URL.createObjectURL(imgWork[i]);
            image.classList.add("imageWork");
            preview.appendChild(image);
        }
    })

    //récupération de toutes les données du formulaire
    let formulairePostWork = document.getElementById("add-form");
    formulairePostWork.addEventListener("submit", async function (event) {
        event.preventDefault();
        const work = {
            img: event.target.querySelector('.add-photo input').value,
            title: event.target.querySelector("[name=add-title]").value,
            category: event.target.querySelector("#add-categorie").value
        };
        console.log(work);
        var formData = new FormData(formulairePostWork);
        console.log(formData);
    })
}



async function getWorks() {
    let projets = window.localStorage.getItem('projets')

    if (projets == null) {
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

async function deleteWorks() {
    let token = window.localStorage.getItem('token');
    token = JSON.parse(token);
    token = token.token;
    let projets = window.localStorage.getItem('projets');

    const worksElements = document.querySelectorAll("#modal-gallery .projet-selection button");

    for (let i = 0; i < worksElements.length; i++) {
        worksElements[i].addEventListener("click", async function (event) {
            const id = event.target.id;

            fetch("http://localhost:5678/api/works/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `BearerAuth ${token}`
                }
            });

            const selectedWorksModal = document.querySelector(`#modal-gallery [id='${id}']`).style.display = "none";
            const selectedWorksGallery = document.querySelector(`.gallery [id='${id}']`).style.display = "none";
            let deleteWork = window.localStorage.removeItem("projets", `[id='${id}]`);
        });
    }

}