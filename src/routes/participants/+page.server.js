import { getParticipants } from '$lib/server/db.js';

export async function load() {
	return {
		participants: await getParticipants()
	};
}
