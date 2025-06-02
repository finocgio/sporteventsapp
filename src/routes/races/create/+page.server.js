// Importiere Hilfsfunktionen für Datenbankzugriffe
import * as db from '$lib/server/db.js';

// Importiere Redirect- und Fehler-Utilities von SvelteKit
import { redirect, fail } from '@sveltejs/kit';

// Definiere eine Default-Action für das Formular
export const actions = {
	default: async ({ request }) => {

		// Extrahiere Formulardaten aus dem POST-Request
		const data = Object.fromEntries(await request.formData());

		// Konvertiere die Distanz in eine Zahl und prüfe auf Gültigkeit
		const distanceValue = Number(data.distance);
		if (isNaN(distanceValue)) {
			// Rückgabe mit Fehlerstatus und Nachricht bei ungültiger Eingabe
			return fail(400, { message: 'Distanz ist ungültig.' });
		}

		// Erstelle ein Rennen-Objekt aus den Formulardaten
		const race = {
			name: data.name,
			location: data.location,
			date: data.date,
			distance: distanceValue,
			description: data.description
		};

		// Speichere das Rennen in der Datenbank
		const inserted = await db.insertRace(race);

		// Umleiten zur Detailseite des neu erstellten Rennens
		throw redirect(303, `/races/${inserted._id}`);
	}
};
