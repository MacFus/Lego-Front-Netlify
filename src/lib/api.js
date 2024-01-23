import { BASE_URL } from "./config.js";
import { saveCookies, getCookie, clearCookies } from "./cookie.js";
import { isLoggedIn, isLoading } from '$lib/store.js';

export function buildUrl(endpoint) {
    return `${BASE_URL}${endpoint}`;
}

export function buildUrlWithParams(endpoint, params) {
    let url = new URL(buildUrl(endpoint));
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
}

export async function fetchThemes() {

    const url = buildUrl(`/theme`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    const data = await response.json();
    let themes = data.map(t => t.name);
    return themes;
}

export async function fetchSetsWithCriteria(params, offset, pageSize) {
    isLoading.set(true);
    try {
        const url = buildUrlWithParams(`/sets/${offset}/${pageSize}`, params);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log('Error: ', error);
    } finally {
        isLoading.set(false);
    }
}

export async function fetchMinifigsWithCriteria(params, offset, pageSize) {
    isLoading.set(true);
    try {
        const url = buildUrlWithParams(`/minifigs/${offset}/${pageSize}`, params);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        return await response.json();

    } catch (error) {
        console.log('Error: ', error);
    } finally {
        isLoading.set(false);
    }
}

export async function fetchUserDetails() {
    const userId = getCookie('UserId');
    const url = buildUrl(`/user/${userId}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('HTTP Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function fetchUserSetParts(userId) {
    // const userId = getCookie('UserId');
    const url = buildUrl(`/mySets/${userId}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('HTTP Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function fetchSetWithParts(setNum) {
    const url = buildUrl(`/sets/${setNum}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('HTTP Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function getMinifigByFigNum(minifigId) {
    const url = buildUrl(`/minifigs/${minifigId}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('HTTP Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
export async function addSet(setNum) {
    const url = buildUrl('/add');
    const userId = getCookie('UserId');
    const body = { setNum, userId };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            let string = '';
            data.forEach(response =>{
                string += 'Pomyślnie dodano zestaw: ' +  response.setNum + '\n';
            })
        } else {
            console.error('HTTP Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function removeSets(selectedSets, deleteAll) {
    const url = buildUrl('/delete');
    const userId = getCookie('UserId');
    const body = { setNum: selectedSets, userId, all: deleteAll };
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const data = await response.json();
            let string = '';
            data.forEach(response =>{
                string += response + '\n';
            })
        } else {
            console.error('HTTP Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


