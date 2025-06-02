// Importiere Datenbankfunktionen und Hilfsfunktionen von SvelteKit
import * as db from '$lib/server/db.js';
import { redirect, error } from '@sveltejs/kit';

/**
 * Lädt ein einzelnes Rennen anhand der URL-Parameter-ID.
 * Wenn das Rennen nicht gefunden wird, wird ein 404-Fehler ausgelöst.
 */
export async function load({ params }) {
	const race = await db.getRaceById(params.id);
	if (!race) throw error(404, 'Rennen nicht gefunden');
	return { race };
}

/**
 * Aktionen, die auf dieser Seite ausgeführt werden können.
 * In diesem Fall nur die Lösch-Aktion (z.B. durch einen Button).
 */
export const actions = {
	delete: async ({ params }) => {
		await db.deleteRace(params.id);
		throw redirect(303, '/races');
	}
};
