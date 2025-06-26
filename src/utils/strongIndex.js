export function setSessionStronge(key,value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStronge(key) {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}
