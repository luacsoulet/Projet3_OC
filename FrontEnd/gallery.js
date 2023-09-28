//Récupération des projets eventuellement stockées dans le localStorage
let projets = window.localStorage.getItem('projets');

if (projets == null) {
    // Récupération des projets depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    projets = await reponse.json();
    // Transformation des projets en JSON
    const valeurProjets = JSON.stringify(projets);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("projets", valeurProjets);
} else {
    projets = JSON.parse(projets);
}

function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {

        const card = projets[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet 
        const projetElement = document.createElement("figure");
        projetElement.dataset.id = projets[i].id
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = card.imageUrl;
        imageElement.alt = card.title;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = card.title;
        // Rattachement à la balise article a la section gallery
        sectionGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(figcaptionElement);
    }
}

genererProjets(projets);
