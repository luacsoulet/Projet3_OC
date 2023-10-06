import { genererGalerie } from './gallery.js';
import { modeEditor } from './editor.js';

genererGalerie();

let token = window.localStorage.getItem('token');

if (token != null) {
    modeEditor();
}