// Importiere Datenbankfunktionen und Tools für Fehlerbehandlung und Umleitung
import * as db from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

// Serverseitige Datenbeschaffung für die Teilnehmer-Detailseite
export async function load({ params }) {

	// Lade Teilnehmerdaten anhand der URL-Parameter-ID
	const participant = await db.getParticipantById(params.id);
	if (!participant) throw error(404, 'Teilnehmer nicht gefunden');

	// Lade alle Ergebnisse und finde das passende für diesen Teilnehmer
	const allResults = await db.getResults();
	const result = allResults.find((r) => r.participantId === participant._id);

	// Falls ein Rennen zum Ergebnis existiert, lade auch dieses
	let race = null;
	if (result?.raceId) {
		race = await db.getRaceById(result.raceId);
	}

	// Gib die Daten an die Seite zurück
	return { participant, race, result };
}

// Aktionen, z. B. Löschen eines Teilnehmers
export const actions = {
	delete: async ({ params }) => {
		// Teilnehmer anhand der ID löschen
		await db.deleteParticipant(params.id);

		// Nach dem Löschen zur Übersichtsseite weiterleiten
		throw redirect(303, '/participants');
	}
};
