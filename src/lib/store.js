import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const isLoading = writable(false);
export const minifigSearch = writable(false);

export const hasNext = writable(false);
export const hasPrevious = writable(false);

export const pageNumber = writable(0);
export const mySetsParts = writable([]);

export const hasEmbedded = writable(false);

export const loadedSets = writable(false);
export const loadedMinifigs = writable(false);
export const needLoading = writable(true);

export const setParts = writable(0);

export function localStorageStore(key, initialValue) {
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    let data = initialValue;
    if (storedValue){
        data = JSON.parse(storedValue);
    }

    const store = writable(data);

    store.subscribe(value => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
}

export function clearLocalStorage(key) {
    if (typeof window !== 'undefined') {
        localStorage.clear();
        // localStorage.removeItem(key);
    }
}


