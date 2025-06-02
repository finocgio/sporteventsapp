import * as db from '$lib/server/db.js';
import { redirect, error, fail } from '@sveltejs/kit';

export async function load({ params }) {
	const race = await db.getRaceById(params.id);
	if (!race) throw error(404, 'Rennen nicht gefunden');
	return { race };
}

export const actions = {
	update: async ({ request, params }) => {
		const data = Object.fromEntries(await request.formData());

		const distanceValue = Number(data.distance);
		if (isNaN(distanceValue)) {
			return fail(400, { message: 'Ungültige Distanz.' });
		}

		await db.updateRace(params.id, {
			name: data.name,
			location: data.location,
			date: data.date,
			distance: distanceValue,
			description: data.description
		});

		throw redirect(303, `/races/${params.id}`);
	},

	delete: async ({ params }) => {
		await db.deleteRace(params.id);
		throw redirect(303, '/races');
	}
};
