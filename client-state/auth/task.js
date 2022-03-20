const storage = window.localStorage; 

function responseURL(method, url, formData) {
    return new Promise((resolve, reject) => {
        const requests = new XMLHttpRequest();
        requests.open(method, url)
        requests.send(formData);
        requests.addEventListener("load", () => {
            if(Math.floor(requests.status / 100) === 2) {
                resolve(JSON.parse(requests.response));
            } else {
                reject({status: requests.status});
            }
        });
    });
};

class UserWelcomeBlock {
    constructor(elementHTML, userId) {
        this._HTML = elementHTML;
        this._userId = userId;
    }

    show() {
        this._HTML.querySelector("#user_id").textContent = this._userId;
        this._HTML.classList.add("welcome_active");
    }
};

class AuthForm {
    constructor(elementHTML) {
        this._HTML = elementHTML;
        this._formHTML = elementHTML.querySelector("#signin__form");
        this._loginHTML = elementHTML.querySelector('input[name="login"]');
        this._passwordHTML = elementHTML.querySelector('input[name="password"]');
        this._userId = null;
        this.addAuthEvent(storage);
        this.loadState(storage);
    }

    get login() {
        return this._loginHTML.value.trim();
    }

    get password() {
        return this._passwordHTML.value.trim();
    }

    changeShow() {
        if(this._userId == null) {
            this._HTML.classList.add("signin_active");
        } else {
            this._HTML.classList.remove("signin_active");
        }
        
    }

    showWelcomeBlock() {
        const welcomeBlock = new UserWelcomeBlock(this._HTML.closest(".card").querySelector(".welcome"), this._userId);
        welcomeBlock.show();
    }

    addAuthEvent(storage) {
        const button = this._HTML.querySelector(".btn");
        button.addEventListener("click", event => {
            event.preventDefault();
            
            if(this.login === "" || this.password === "") {
                this._formHTML.reset();
                return;
            }

            const formData = new FormData(this._formHTML);
            const response = responseURL("POST", this._formHTML.getAttribute("action"), formData);

            response.then(data => {
                this._formHTML.reset();
                if(!data["success"]) {
                    alert("Неверный логи/пароль");
                    return;
                }

                this._userId = data["user_id"];
                this.changeShow();
                this.showWelcomeBlock();
                this.saveState(storage);
            });
        });
    }

    saveState(storage) {
        storage.setItem("userId", this._userId);
    }

    loadState(storage) {
        this._userId = storage.getItem("userId");
        this.changeShow();

        if(this._userId != null) {
            this.showWelcomeBlock();
        }
    }
};


const formHTML = document.querySelector(".signin");
const form = new AuthForm(formHTML);