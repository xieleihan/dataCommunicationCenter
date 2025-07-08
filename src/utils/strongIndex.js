/**
 * 设置SessionStorage中的值
 * @param {*} key 键
 * @param {*} value 值
 */
export function setSessionStronge(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * 获取SessionStorage中的值
 * @param {String} key 键 
 * @returns {any} 返回存储的值，如果不存在则返回null
 */
export function getSessionStronge(key) {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}
