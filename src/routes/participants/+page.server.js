// Importiere die Funktion zum Abrufen der Teilnehmerdaten aus der Datenbank
import { getParticipants } from '$lib/server/db.js';

/**
 * Lädt alle Teilnehmer vom Server und stellt sie der Page-Komponente als Props zur Verfügung.
 * Diese Daten können dann in +page.svelte über `data.participants` verwendet werden.
 */
export async function load() {
	return {
		participants: await getParticipants()
	};
}
