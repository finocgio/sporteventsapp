// Importiere alle Datenbankfunktionen aus db.js (hier z.B. getRaces)
import * as db from '$lib/server/db.js';

/** 
 * Serverseitige Load-Funktion für die Seite /races.
 * Lädt alle Rennen aus der Datenbank und stellt sie der Seite zur Verfügung.
 */
/** @type {import('./$types').PageServerLoad} */
export async function load() {

	// Hole alle Rennen aus der Datenbank
	const races = await db.getRaces();

	// Übergib die Rennen als props.data an die +page.svelte-Komponente
	return { races };
}
