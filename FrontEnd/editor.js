
export async function modeEditor() {

    const headerDiv = document.querySelector("header");
    const parentDiv = headerDiv.parentNode;

    const bandeauEditor = document.createElement("div");
    bandeauEditor.setAttribute("class", "bandeau");

    const logoEditor = document.createElement("i");
    logoEditor.setAttribute("class", "fa-regular fa-pen-to-square");

    const textEditor = document.createElement("p");
    textEditor.innerText = "Mode édition";

    parentDiv.insertBefore(bandeauEditor, headerDiv);
    bandeauEditor.appendChild(logoEditor);
    bandeauEditor.appendChild(textEditor);

    const divMesprojets = document.createElement("div");
    divMesprojets.setAttribute("class", "div-mes-projets");

    const divModifications = document.createElement("div");
    divModifications.setAttribute("class", "div-modif");

    const logoEditorDeux = document.createElement("i");
    logoEditorDeux.setAttribute("class", "fa-regular fa-pen-to-square");

    const textEditorDeux = document.createElement("p");
    textEditorDeux.innerText = "Mode édition";

    const gallery = document.querySelector(".gallery");
    const galleryParent = gallery.parentNode;

    const portfolio = document.querySelector("#portfolio");
    const titreH2 = document.querySelector("#portfolio h2");

    portfolio.appendChild(divMesprojets)
    galleryParent.insertBefore(divMesprojets, titreH2);
    divMesprojets.appendChild(titreH2);
    divMesprojets.appendChild(divModifications);
    divModifications.appendChild(logoEditorDeux);
    divModifications.appendChild(textEditorDeux);

    const divButtons = document.querySelector(".buttons-filter").style.display = "none";

};