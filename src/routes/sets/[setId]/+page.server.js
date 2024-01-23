import { error } from '@sveltejs/kit';
import { fetchSetWithParts, fetchUserSetParts, buildUrl } from '$lib/api.js';

export async function load({ params, cookies }) {

    const parts = await fetchSetWithParts(params.setId);
    const userId = cookies.get('UserId');
    const mySets = await fetchUserSetParts(userId);
    const data = {
        combinedParts: mySets,
        parts: parts
    };
    return data
    error(404, 'Not found');
}

