
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
    dialogModal.innerHTML = `
        <div class="modal-wrapper">
            <button class="close-button fa-solid fa-xmark"></button>
            <h3 id="modal-title">Galerie photo</h3>
            <div id="modal-gallery"></div>
            <button id="ajoutphoto">Ajouter une photo</button>
        </div>`
    parentDiv.insertBefore(dialogModal, headerDiv);

    const modal = document.querySelector('#modal');
    const openModal = document.querySelector('.open-button');
    const closeModal = document.querySelector('.close-button');

    openModal.addEventListener("click", () => {
        modal.showModal();
    })

    closeModal.addEventListener("click", () => {
        modal.close();
    })

    window.onclick = function (e) {
        if (e.target == modal) {
            modal.close();
        } else {

        }
    }
}
