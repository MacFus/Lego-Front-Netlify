import { error } from '@sveltejs/kit';
import { readable } from 'svelte/store';
import { hasEmbedded, needLoading, mySetsParts, setParts } from '$lib/store.js';
import { fetchSetWithParts, fetchUserSetParts, buildUrl } from '$lib/api.js';

export async function load({ params, cookies }) {

    const parts = await fetchSetWithParts(params.setId);
    const userId = cookies.get('UserId');
    const mySets = await fetchUserSetParts(userId);
    // const combinedParts = combinePartsFromSets(mySets);
    // mySetsParts.set(JSON.parse(JSON.stringify(mySets)))
    const data = {
        combinedParts: mySets,
        parts: parts
    };
    return data

    error(404, 'Not found');
}

