const storage = window.localStorage;
const cardHTML = document.querySelector(".card");

class Card {
    constructor(cardHTML) {
        this._HTML = cardHTML;
        this._storage = storage;
        this._textAreaHTML = cardHTML.querySelector("#editor")

        this.loadState(storage);
        this.addEvents();
    }

    saveState(storage) {
        storage.setItem("editorText", this._textAreaHTML.value);
    }

    loadState(storage) {
        const value = storage.getItem("editorText");
        if(!value) {
            return;
        }

        this._textAreaHTML.value = value;
    }

    addEvents() {
        this._textAreaHTML.addEventListener("input", event => {
            this.saveState(storage);
        });

        const clearButton = this._HTML.querySelector(".clear");
        clearButton.addEventListener("click", event=> {
            this._textAreaHTML.value = "";
            storage.removeItem("editorText");
        });
    }
};


const card = new Card(cardHTML, storage);