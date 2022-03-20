const modalHTML = document.querySelector(".modal");
const storage = window.localStorage;
const cookie = document.cookie;

// интерфейс как у storage, чтобы можно было и туда и туда сохранять
class CookieWrapper {
    constructor(cookie) {
        this._cookie = cookie;
    }

    setItem(key, value) {
        this._cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }

    getItem(key) {
        const pairs = this._cookie.split("; ");
        const pair = pairs.find(p => p.startsWith(key+"="));

        if(pair === undefined) {
            return undefined;
        }

        return pair.substr(key.length + 1);
    }
}

class Modal {
    constructor(elementHTML) {
        this._HTML = elementHTML;
        this._isClose = false;

        this.loadState(storage);
        this.changeShow();

        const closeButton = this._HTML.querySelector(".modal__close");
        closeButton.addEventListener("click", event => {
            this._isClose = true;
            this.saveState(storage);
            this.changeShow();
        });

    }

    changeShow() {
        if(!this._isClose) {
            this._HTML.classList.add("modal_active");
        } else {
            this._HTML.classList.remove("modal_active");
        }
    }

    loadState(storage) {
        const value = storage.getItem("modalClose");

        if(!value) {
            return;
        }

        this._isClose = value;
    }

    saveState(storage) {
        storage.setItem("modalClose", this._isClose);
    }
}

const modal = new Modal(modalHTML, new CookieWrapper(cookie));