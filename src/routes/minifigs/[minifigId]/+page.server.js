import { error } from '@sveltejs/kit';
import { getMinifigByFigNum } from '$lib/api.js';

export async function load({ params }) {
    const response = await getMinifigByFigNum(params.minifigId);
    const data = {
        minifig: response.minifig,
        parts: response.parts,
        sets: response.sets
    };
    return data

    error(404, 'Not found');
}

