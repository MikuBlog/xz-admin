function setMemory(key, data, isPermanent = false) {
    (typeof data === "object" && isPermanent == false)
    ? sessionStorage.setItem(key, JSON.stringify(data))
    : isPermanent == false 
    && sessionStorage.setItem(key, data)
    typeof data === "object" && isPermanent
    ? localStorage.setItem(key, JSON.stringify(data))
    : isPermanent 
    && localStorage.setItem(key, data)
}

function getMemory(key, isObject = false, isPermanent = false) {
    if(isObject && isPermanent == false) {
        return JSON.parse(sessionStorage.getItem(key))
    }else if(isPermanent == false) {
        return sessionStorage.getItem(key)
    }
    if(isObject && isPermanent) {
        return JSON.parse(localStorage.getItem(key))
    }else if(isPermanen) {
        return localStorage.getItem(key)
    }
}

export default {
    setMemory,
    getMemory
}