const pollHTML = document.querySelector(".poll");

function responseURL(method, url, params="") {
    return new Promise((resolve, reject) => {
        const requests = new XMLHttpRequest();
        requests.open(method, url)
        requests.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        requests.send(params);
        requests.addEventListener("load", () => {
            if(Math.floor(requests.status / 100) === 2) {
                resolve(JSON.parse(requests.response));
            } else {
                reject({status: requests.status});
            }
        });
    });
};


class Button {
    constructor(text, id) {
        this._id = id;
        this._HTML = document.createElement("button");
        this._HTML.classList.add("poll__answer");
        this._HTML.textContent = text;
    }

    get HTML() {
        return this._HTML;
    }

    get id() {
        return this._id;
    }
}

class Poll {
    constructor(elementHTML, data) {
        this._HTML = elementHTML;
        this._buttonsList = [];
        this._id = -1
        this._data = data;

        if(!data) {
            return;      
        }
        this._id = data["id"];
        this._createHTML(data);
        this._addEventGetStat();

    }

    _outState(data) {
        this._HTML.querySelector(".poll__answers").remove();
        const sumVotes = data["stat"].reduce((sum, object) => sum + object["votes"], 0);

        for(const el of data["stat"]) {
            const stat = document.createElement("div");
            stat.innerHTML = `${el["answer"]}: <span class="bold">${(el["votes"] / sumVotes).toFixed(4)}%</span>`
            this._HTML.insertAdjacentElement("beforeEnd", stat);
        }
    }

    _addEventGetStat() {  
        for(const el of this._buttonsList) {
            el.HTML.addEventListener("click", async (event) => {
                const params = `vote=${this._id}&answer=${el.id}`
                alert("Спасибо, ваш голос засчитан!");
    
                responseURL("POST", "https://netology-slow-rest.herokuapp.com/poll.php", params).then((value) => {
                    this._outState(value);
                });
            });
        }
    }

    _createHTML(data) {
        this._buttonsList = this._createButtonsList(data);
        this._HTML.querySelector(".poll__title").textContent = data["data"]["title"]
        const answers = this._HTML.querySelector(".poll__answers");

        for(const el of this._buttonsList) {
            answers.insertAdjacentElement("beforeEnd", el.HTML);
        }

    }

    _createButtonsList(data) {
        const list = [];

        for(const [index, el] of data["data"]["answers"].entries()) {
            list.push(new Button(el, index));
        }

        return list;
    }
}

async function main() {
    const response = await responseURL("GET", "https://netology-slow-rest.herokuapp.com/poll.php");
    const poll = new Poll(pollHTML, response);
}
main()