import { getYear, getCategory, setYear, setCategory } from "./state.mjs";
import { saveColors, saveCategory, loadCategories, loadColors } from "./datasource.mjs";
import { CATEGORY_SUGGESTIONS } from "./constants.mjs";

window.save = function save() {
    const colors = Array.prototype.slice.call(document.body.getElementsByTagName("i")).map(function (e) {
        return e.getAttribute('data-color')
    }).join('');

    saveColors(getYear(), getCategory(), colors);
}

function calcDayOfYear(year, month, day) {
    // https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    const now = new Date(year, month, day);
    const start = new Date(year, 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

window.changeYear = function changeYear(d) {
    setYear((Number(getYear()) + d).toString());
    render();
}

window.changeCategory = function changeCategory(d) {
    setCategory(getCategory() + d);
    render();
}

window.updateCategory = function updateCategory(text) {
    saveCategory(getYear(), getCategory(), text);
    render();
}

let initialRender = true;

function render() {
    const year = getYear();
    const category = getCategory();
    const colors = loadColors(year, category);

    const pixelWrapperElement = document.getElementById("pixels");

    // clear wrapper
    pixelWrapperElement.innerHTML = '';

    // Render calendar.
    const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    [...Array(12)].forEach((_, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthPixels = [...Array(daysInMonth)].map((_, day) => {
            const dayOfYear = calcDayOfYear(year, month, day);
            const color = colors[dayOfYear] || 0;
            return `<div _='install Pixel'><i class='clickable icon overflow-hidden bg-blend-multiply color-${color}' data-color='${color}'></i></div>`
        }).join("");
        const title = `<div class="text-center">${monthNames[month]}</div>`;
        pixelWrapperElement.insertAdjacentHTML('beforeend', `<div class='d-flex flex-column'>${title}${monthPixels}</div>`);
    });

    document.getElementById("title").innerText = `${year}`;
    let positiveCategory = category;
    while (positiveCategory < 0) { positiveCategory += CATEGORY_SUGGESTIONS.length; }
    document.getElementById("category").innerText = loadCategories(year)[category] ?? `${CATEGORY_SUGGESTIONS[positiveCategory % CATEGORY_SUGGESTIONS.length]}?`;
    document.getElementById("category").dataset.category = category;

    if (!initialRender) {
        // reinstall behaviors
        _hyperscript.processNode(pixelWrapperElement);
    }

    initialRender = false;
}

render();

window.render = render;