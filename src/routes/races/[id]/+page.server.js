import * as db from '$lib/server/db.js';
import { redirect, error } from '@sveltejs/kit';

export async function load({ params }) {
	const race = await db.getRaceById(params.id);
	if (!race) throw error(404, 'Rennen nicht gefunden');
	return { race };
}

export const actions = {
	delete: async ({ params }) => {
		await db.deleteRace(params.id);
		throw redirect(303, '/races');
	}
};
