export async function genererGalerie() {
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
    buttonAll.setAttribute("class", "active");

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
        document.querySelector(".active").setAttribute("class", "");
        buttonAll.setAttribute("class", "active");
        genererProjets(projets);
    });

    buttonObjects.addEventListener("click", function () {
        const projetsObjets = projets.filter(function (projet) {
            return projet.categoryId == 1;
        });
        document.querySelector(".active").setAttribute("class", "");
        buttonObjects.setAttribute("class", "active");
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsObjets);
    });

    buttonAppartments.addEventListener("click", function () {
        const projetsAppartements = projets.filter(function (projet) {
            return projet.categoryId == 2;
        });
        document.querySelector(".active").setAttribute("class", "");
        buttonAppartments.setAttribute("class", "active");
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsAppartements);
    });

    buttonHotRes.addEventListener("click", function () {
        const projetsHotRes = projets.filter(function (projet) {
            return projet.categoryId == 3;
        });
        document.querySelector(".active").setAttribute("class", "");
        buttonHotRes.setAttribute("class", "active");
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsHotRes);
    });

    genererProjets(projets);


}

