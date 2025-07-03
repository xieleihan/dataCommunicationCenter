/**
 * 获取浏览器类型和版本
 * @returns {Object} 返回浏览器类型和版本
 */
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let version = "Unknown";

    if (ua.indexOf("Chrome") > -1) {
        browserName = "Chrome";
        const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
        version = chromeMatch ? chromeMatch[1] : "Unknown";
    } else if (ua.indexOf("Firefox") > -1) {
        browserName = "Firefox";
        const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
        version = firefoxMatch ? firefoxMatch[1] : "Unknown";
    } else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
        const safariMatch = ua.match(/Version\/([\d.]+)/);
        version = safariMatch ? safariMatch[1] : "Unknown";
    } else if (ua.indexOf("Edge") > -1) {
        browserName = "Edge";
        const edgeMatch = ua.match(/Edge\/([\d.]+)/);
        version = edgeMatch ? edgeMatch[1] : "Unknown";
    } else if (ua.indexOf("MSIE") > -1) {
        browserName = "Internet Explorer";
        const ieMatch = ua.match(/MSIE ([\d.]+)/);
        version = ieMatch ? ieMatch[1] : "Unknown";
    }

    return { browserName, version };
}

/**
 * 获取用户操作系统信息
 * @returns {string} 返回操作系统
 */
function getOperatingSystem() {
    const platform = navigator.platform;
    let os = "Unknown";

    if (platform.indexOf("Win") > -1) {
        os = "Windows";
    } else if (platform.indexOf("Mac") > -1) {
        os = "MacOS";
    } else if (platform.indexOf("Linux") > -1) {
        os = "Linux";
    } else if (platform.indexOf("Android") > -1) {
        os = "Android";
    } else if (platform.indexOf("iOS") > -1) {
        os = "iOS";
    }

    return os;
}

/**
 * 获取用户屏幕分辨率
 * @returns {Object} 返回屏幕信息
 */
function getScreenInfo() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const colorDepth = window.screen.colorDepth;

    return { screenWidth, screenHeight, colorDepth };
}

/**
 * 获取用户的视口大小
 * @returns {Object} 返回视口信息
 */
function getViewportSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return { width, height };
}

/**
 * 获取用户是否是移动端
 * @returns {Object} 返回用户的设备信息
 */
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/.test(userAgent)) {
        return "Mobile";
    } else {
        return "Desktop";
    }
}

/**
 * 获取用户语言
 * @returns {string} 返回用户的语言
 */
function getLanguage() {
    return navigator.language;
}

/**
 * 整体返回设备信息
 * @returns {Object} 返回设备信息
 */
function getDeviceInfo() {
    return {
        browserInfo: getBrowserInfo(),
        operatingSystem: getOperatingSystem(),
        screenInfo: getScreenInfo(),
        viewportSize: getViewportSize(),
        deviceType: getDeviceType(),
        language: getLanguage()
    }
}

/**
 * 获取指定名称的 cookie 值
 * @param name cookie 名称
 * @returns cookie 的值，如果没有则返回空字符串
 */
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
}

export {
    getBrowserInfo,
    getOperatingSystem,
    getScreenInfo,
    getViewportSize,
    getDeviceType,
    getLanguage,
    getDeviceInfo,
    getCookie
}