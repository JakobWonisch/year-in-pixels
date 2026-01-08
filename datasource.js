/* data structure:
{
    "2025": "colors012345",
    "2026": "colors012345",
}
*/

function loadAll() {
    const str = localStorage.getItem('pixels');

    try {
        return JSON.parse(str) ?? {};
    } catch (e) {
        return {};
    }
}

function saveAll(data) {
    localStorage.setItem('pixels', JSON.stringify(data));
}


function loadColors(year) {
    return loadAll()[year] ?? [];
}

function saveColors(year, colors) {
    const data = loadAll();

    data[year] = colors;

    saveAll(data);
}