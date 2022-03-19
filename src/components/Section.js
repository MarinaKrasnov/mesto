import Card from './Card.js';
import {
    cardsTemplate
} from './../pages/index.js';
import {
    initialCards
} from './initial_cards.js';
export default class Section {
    constructor({
        items,
        renderer
    }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
        this._items = items;
    }
    renderItems() {
        this._items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element)
        });
    }
    addItem(i) {
        this._container.prepend(i)
    }
}