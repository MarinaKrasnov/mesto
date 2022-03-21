import {
    Popup
} from "./Popup.js";

import {
    overlayImage,
    overlayImageCapture
} from "./../pages/index.js";

export class PopupWithImage extends Popup {
    open(data) {
        super.open();
        overlayImage.alt = `Виды на ${data.name}`;
        overlayImageCapture.textContent = data.name;
        overlayImage.src = data.link;
    }
}