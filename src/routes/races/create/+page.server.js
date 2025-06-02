import * as db from '$lib/server/db.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		const distanceValue = Number(data.distance);
		if (isNaN(distanceValue)) {
			return fail(400, { message: 'Distanz ist ungültig.' });
		}

		const race = {
			name: data.name,
			location: data.location,
			date: data.date,
			distance: distanceValue,
			description: data.description
		};

		console.log('📡 insertRace aufgerufen mit:', race);

		const inserted = await db.insertRace(race);

		console.log('✅ Neues Rennen gespeichert:', inserted);

		throw redirect(303, `/races/${inserted._id}`);
	}
};
