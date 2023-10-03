export async function modeEditor() {
    console.log("modif activer");
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
};