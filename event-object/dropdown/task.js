const dropdown = document.querySelector('.dropdown');
const dropValue = dropdown.querySelector('.dropdown__value');
const dropList = dropdown.querySelector('.dropdown__list');
const links = dropdown.querySelectorAll('.dropdown__link');


function clickDropValue(event) {
    dropList.classList.toggle('dropdown__list_active')
}

function selectNewValue(event) {
    event.preventDefault();
    dropValue.textContent = event.target.textContent;
    dropList.classList.toggle('dropdown__list_active')
}


function main() {
    dropValue.addEventListener('click', clickDropValue);

    for(let el of links) {
        el.addEventListener('click', selectNewValue);
    }
}

main();