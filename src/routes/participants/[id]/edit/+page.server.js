// Importiere die benötigten Funktionen aus der Datenbank und von SvelteKit
import * as db from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

/** 
 * Serverseitiger Load-Handler:
 * Holt die Teilnehmerdaten anhand der ID aus den URL-Parametern,
 * um das Bearbeitungsformular mit vorhandenen Daten zu füllen.
 */
export async function load({ params }) {
	const participant = await db.getParticipantById(params.id);
	if (!participant) throw error(404, 'Teilnehmer nicht gefunden');
	return { participant };
}

/**
 * Serverseitige Action:
 * Verarbeitet das abgeschickte Bearbeitungsformular und aktualisiert den Datensatz.
 */
export const actions = {
	default: async ({ request, params }) => {
		// Formulardaten in ein einfaches JS-Objekt umwandeln
		const data = Object.fromEntries(await request.formData());

		// Teilnehmerdaten in der Datenbank aktualisieren
		await db.updateParticipant(params.id, {
			name: data.name,
			email: data.email,
			age: Number(data.age),
			category: data.category
		});

		// Nach erfolgreichem Speichern zur Detailansicht weiterleiten
		throw redirect(303, `/participants/${params.id}`);
	}
};
