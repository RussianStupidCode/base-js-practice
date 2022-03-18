class CurrencyItem {
    constructor(name, value, measure="руб.") {
        this._name = name;
        this._value = value;
        this._measure = measure;

        this._HTML = this._createHTML(name, value, measure);
    }

    _createHTML(name, value, measure) {
        const HTML = document.createElement("div");
        HTML.classList.add("item");

        HTML.innerHTML = `
            <div class="item__code">
                ${name}
            </div>
            <div class="item__value">
                ${value}
            </div>
            <div class="item__currency">
                ${measure}
            </div>
        `
        return HTML;
    }

    get HTML() {
        return this._HTML;
    }
}

class CurrencyList {
    constructor(elementHTML, loader, data=null) {
        this._HTML = elementHTML;
        this._data = data;
        this._loader = loader;
        this._list = [];
        this._initHTML();

    }

    refresh(data) {
        if(data == null) {
            return;
        }

        this._data = data;
        this._resetHTML();
        this._initHTML();
    }

    _resetHTML() {
        const parent = this._HTML.parentElement;
        this._HTML.remove();
        this._HTML = document.createElement("div");
        this._HTML.setAttribute("id", "items");
        parent.insertAdjacentElement("beforeEnd", this._HTML);
    }

    _initHTML() {
        if(this._data == null) {
            return;
        }

        this._list = this._createListItem(this._data);

        for(const el of this._list) {
            this._HTML.insertAdjacentElement("afterBegin", el.HTML);
        }

        this._hideLoader();
    }

    _hideLoader() {
        this._loader.classList.remove("loader_active");
    }

    _createListItem(data) {
        const list = []

        for(const [key, value] of Object.entries(data["response"]["Valute"])) {
            list.push(new CurrencyItem(key, value["Value"]))
        }

        return list;
    }

    saveStorage(storage) {
        storage["data"] = JSON.stringify(this._data);
    }

    loadStorage(storage) {
        if(!storage["data"]) {
            return;
        }

        this._data = JSON.parse(storage["data"]);

        this._initHTML();
    }
}

const itemsHTML = document.querySelector("#items");
const loaderHTML = document.querySelector(".loader");
const currencyList = new CurrencyList(itemsHTML, loaderHTML);

currencyList.loadStorage(window.localStorage)

const request = new XMLHttpRequest();
request.open("GET", "https://netology-slow-rest.herokuapp.com");
request.send();

request.addEventListener("load", () => {
    if(request.status === 200) {
        const data = JSON.parse(request.response);
        currencyList.refresh(data);
        currencyList.saveStorage(window.localStorage);
    }
});


