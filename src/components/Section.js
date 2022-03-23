export default class Section {
    constructor({
        items,
        renderer
    }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this.renderer = renderer;
        this._items = items;
    }
    renderItems() {
        this._items.forEach(item => {
            this.renderer(item);

        });
    }
    addItem(card) {
        this._container.prepend(card)
    }
}