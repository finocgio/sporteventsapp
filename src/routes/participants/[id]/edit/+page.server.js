import * as db from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

/** Holt Teilnehmerdaten für das Bearbeitungsformular */
export async function load({ params }) {
	const participant = await db.getParticipantById(params.id);
	if (!participant) throw error(404, 'Teilnehmer nicht gefunden');
	return { participant };
}

/** Speichert Änderungen */
export const actions = {
	default: async ({ request, params }) => {
		const data = Object.fromEntries(await request.formData());

		await db.updateParticipant(params.id, {
			name: data.name,
			email: data.email,
			age: Number(data.age),
			category: data.category
		});

		throw redirect(303, `/participants/${params.id}`);
	}
};
