
let YEAR_TRACKER_STATE = {
    year: undefined,
    category: undefined,
};

// init state
const stateStr = localStorage.getItem('state');

try {
    const data = JSON.parse(stateStr);

    if (data != null) {
        YEAR_TRACKER_STATE = data;
    }
} catch (e) {
    // use default
}

function saveState() {
    localStorage.setItem('state', JSON.stringify(YEAR_TRACKER_STATE));
}

function getYear() {
    if (YEAR_TRACKER_STATE.year == null) {
        YEAR_TRACKER_STATE.year = new Date().getFullYear().toString();
    }

    return YEAR_TRACKER_STATE.year;
}

function setYear(year) {
    YEAR_TRACKER_STATE.year = year;

    saveState();
}
