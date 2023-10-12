import { genererGalerie } from './gallery.js';
import { modeEditor } from './editor.js';

//Géneration de la galerie
genererGalerie();

//Récupération du token dans le localStorage
let token = window.localStorage.getItem('token');

//Si le token est existant alors la fonction modeEditor est appeler
if (token != null) {
    modeEditor();
}