import * as db from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const participant = await db.getParticipantById(params.id);
	if (!participant) throw error(404, 'Teilnehmer nicht gefunden');

	// 🟡 Suche das Resultat für diesen Teilnehmer
	const allResults = await db.getResults();
	const result = allResults.find((r) => r.participantId === participant._id);

	let race = null;
	if (result?.raceId) {
		race = await db.getRaceById(result.raceId);
	}

	return { participant, race, result };
}

export const actions = {
	delete: async ({ params }) => {
		await db.deleteParticipant(params.id);
		throw redirect(303, '/participants');
	}
};
