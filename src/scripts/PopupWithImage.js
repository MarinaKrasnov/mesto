import {
    Popup
} from "./Popup.js";

import {
    overlayImage,
    overlayImageCapture
} from "./index.js";

export class PopupWithImage extends Popup {
    open(data) {
        super.open();
        overlayImage.src = data.link;
        overlayImage.alt = `Виды на ${data.name}`;
        overlayImageCapture.textContent = data.name;
    }
}