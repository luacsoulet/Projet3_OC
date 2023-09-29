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
                <img src=${card.imageUrl} alt="${card.title}">
                <figcaption>${card.title}</figcaption>
            </figure>`
    }
}

const divButtons = document.querySelector(".buttons-filter");

const buttonAll = document.createElement("button");
buttonAll.innerText = "Tous";
buttonAll.setAttribute("id", "un");

const buttonObjects = document.createElement("button");
buttonObjects.innerText = "Objects";
buttonObjects.setAttribute("id", "deux");

const buttonAppartments = document.createElement("button");
buttonAppartments.innerText = "Appartements";
buttonAppartments.setAttribute("id", "trois");

const buttonHotRes = document.createElement("button");
buttonHotRes.innerText = "Hôtels & restaurants";
buttonHotRes.setAttribute("id", "quatre");

divButtons.appendChild(buttonAll);
divButtons.appendChild(buttonObjects);
divButtons.appendChild(buttonAppartments);
divButtons.appendChild(buttonHotRes);

buttonAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);
});

genererProjets(projets);

