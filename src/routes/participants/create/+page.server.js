// Importiere DB-Funktionen und Redirect-Hilfe von SvelteKit
import * as db from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

// Server-Load-Funktion: Bereitet Daten für das Formular vor
export async function load() {

	// Hole alle verfügbaren Rennen
	const races = await db.getRaces();

	// Definiere feste Kategorien
	const kategorien = ['Jugend', 'Erwachsen', 'Senioren'];

	// Übergib Rennen und Kategorien an die Page
	return { races, kategorien };
}

// Server-Action: Verarbeitet das POST-Formular zum Erstellen eines Teilnehmers
export const actions = {
	default: async ({ request }) => {
		// Lese Formulardaten aus dem Request-Body
		const data = Object.fromEntries(await request.formData());

		// Erstelle ein neues Teilnehmer-Objekt
		const newParticipant = {
			name: data.name,
			email: data.email,
			age: Number(data.age),
			category: data.category
		};

		// Füge Teilnehmer in die Datenbank ein
		const inserted = await db.insertParticipant(newParticipant);

		// Wenn ein Rennen und eine Zeit angegeben sind, speichere auch ein Ergebnis
		if (data.raceId && data.time) {
			await db.insertResult({
				participantId: inserted._id,
				raceId: data.raceId,
				time: data.time
			});
		}

		// Weiterleitung nach erfolgreichem Eintrag zur Teilnehmerliste
		throw redirect(303, '/participants');
	}
};
