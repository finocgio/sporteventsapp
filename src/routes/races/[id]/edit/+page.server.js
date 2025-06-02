// Importiere Datenbankfunktionen und Hilfsfunktionen von SvelteKit
import * as db from '$lib/server/db.js';
import { error, fail, redirect } from '@sveltejs/kit';

/**
 * Lädt ein einzelnes Rennen anhand der ID aus den URL-Parametern.
 * Gibt einen 404-Fehler zurück, wenn das Rennen nicht gefunden wird.
 */
export async function load({ params }) {
	const race = await db.getRaceById(params.id);
	if (!race) throw error(404, 'Rennen nicht gefunden');
	return { race };
}

/**
 * Aktionen, die auf dieser Seite ausgeführt werden können:
 * - update: aktualisiert ein bestehendes Rennen
 * - delete: löscht das Rennen
 */
export const actions = {
	// Aktion zum Aktualisieren eines Rennens
	update: async ({ request, params }) => {
		// Formulardaten auslesen
		const data = Object.fromEntries(await request.formData());

		// Distanz validieren
		const distanceValue = Number(data.distance);
		if (isNaN(distanceValue)) {
			return fail(400, { message: 'Ungültige Distanz.' });
		}

		// Rennen mit neuen Daten aktualisieren
		await db.updateRace(params.id, {
			name: data.name,
			location: data.location,
			date: data.date,
			distance: distanceValue,
			description: data.description
		});

		// Nach dem Speichern zur Detailseite weiterleiten
		throw redirect(303, `/races/${params.id}`);
	},

	// Aktion zum Löschen des Rennens
	delete: async ({ params }) => {
		await db.deleteRace(params.id);
		throw redirect(303, '/races');
	}
};
