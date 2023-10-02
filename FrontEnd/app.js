import { genererGalerie } from './gallery.js';
import { modeEditor } from './editor.js';

genererGalerie();

let token = window.sessionStorage.getItem('token');

if (token != null) {
    token = JSON.parse(token);
    modeEditor();
}