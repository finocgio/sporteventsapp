import * as db from '$lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const races = await db.getRaces();
	return { races };
}
