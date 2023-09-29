//Récupération des projets eventuellement stockées dans le localStorage
let projets = window.localStorage.getItem('projets');

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

// Récupération de l'élément du DOM qui accueillera les projets
const sectionGallery = document.querySelector(".gallery");

function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {

        const card = projets[i];
        sectionGallery.innerHTML += `
            <figure id="${card.id}">
                <img src=${card.imageUrl} alt=${card.title}>
                <figcaption>${card.title}</figcaption>
            </figure>`
    }
}

async function genererButtons() {
    const response = await fetch("http://localhost:5678/api/categories");
    const buttons = await response.json();

    const divButtons = document.querySelector(".buttons-filter");
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.setAttribute("id", "0");
    divButtons.appendChild(allButton);
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        divButtons.innerHTML += `
            <button id="${button.id}">${button.name}</button>
        `
    }
}



genererProjets(projets);
genererButtons();

