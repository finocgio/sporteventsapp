import * as db from '$lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [rawResults, participants, races] = await Promise.all([
		db.getResults(),
		db.getParticipants(),
		db.getRaces()
	]);

	const participantMap = Object.fromEntries(participants.map(p => [p._id, p]));
	const raceMap = Object.fromEntries(races.map(r => [r._id, r]));

	const results = rawResults
		.filter(result =>
			participantMap[result.participantId] &&
			raceMap[result.raceId]
		)
		.map(result => ({
			...result,
			participant: participantMap[result.participantId],
			race: raceMap[result.raceId]
		}));

	return { results };
}
