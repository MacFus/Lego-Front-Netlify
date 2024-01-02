export function saveCookies(response) {
    setCookie("AuthToken", response.token, 1);
    setCookie("UserId", response.userId, 1);
}

export function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

export function clearCookies() {
    deleteCookie("AuthToken");
    deleteCookie("UserId");
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}

function setCookie(name, value, hoursToLive) {
    let cookieValue = encodeURIComponent(value);

    let expires = "";
    if (hoursToLive) {
        const date = new Date();
        date.setTime(date.getTime() + (hoursToLive * 3600 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + cookieValue + expires + "; path=/";
}


