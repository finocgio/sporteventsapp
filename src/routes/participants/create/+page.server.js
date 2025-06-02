import * as db from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const races = await db.getRaces();
	const kategorien = ['Jugend', 'Erwachsen', 'Senioren'];
	return { races, kategorien };
}

export const actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		const newParticipant = {
			name: data.name,
			email: data.email,
			age: Number(data.age),
			category: data.category
		};

		const inserted = await db.insertParticipant(newParticipant);

		if (data.raceId && data.time) {
			await db.insertResult({
				participantId: inserted._id,
				raceId: data.raceId,
				time: data.time
			});
		}

		throw redirect(303, '/participants');
	}
};
