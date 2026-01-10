/* data structure:
{
    "2025": {
        "categories": {
            0: "Cat 1",
        },
        "colors": {
            0: "colors012345",
        }
    }
    "2026": {},
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


export function loadColors(year, category) {
    return ((loadAll()[year] ?? {})["colors"] ?? {})[category] ?? [];
}

export function saveColors(year, category, colors) {
    const data = loadAll();

    data[year] ??= {};
    data[year]["colors"] ??= {};
    data[year]["colors"][category] = colors;

    saveAll(data);
}

export function loadCategories(year) {
    return (loadAll()[year] ?? [])["categories"] ?? {
        0: "Default"
    };
}

export function saveCategory(year, category, categoryName) {
    const data = loadAll();

    data[year] ??= {};
    data[year]["categories"] ??= {
        0: "Default"
    };
    data[year]["categories"][category] = categoryName;

    saveAll(data);
}