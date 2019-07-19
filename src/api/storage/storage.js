function setMemorySes(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data))
}

function getMemorySes(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

function setMemoryPmt(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
function getMemoryPmt(key) {
    return JSON.parse(localStorage.getItem(key))
}

function clearMemorySes() {
    sessionStorage.clear()
}

function clearMemoryPmt() {
    localStorage.clear()
}

export default {
    setMemorySes,
    getMemorySes,
    setMemoryPmt,
    getMemoryPmt,
    clearMemorySes,
    clearMemoryPmt
}