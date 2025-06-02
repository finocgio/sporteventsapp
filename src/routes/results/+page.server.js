// Zugriff auf die Datenbankfunktionen (getResults, getParticipants, getRaces)
import * as db from '$lib/server/db.js';

/** 
 * Serverseitige Load-Funktion für die Ergebnisseite.
 * Lädt alle notwendigen Daten gleichzeitig und bereitet sie auf.
 */
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// Paralleles Laden von Resultaten, Teilnehmern und Rennen
	const [rawResults, participants, races] = await Promise.all([
		db.getResults(),
		db.getParticipants(),
		db.getRaces()
	]);

	// Teilnehmer- und Renn-Daten in schnell zugängliche Lookup-Maps umwandeln
	const participantMap = Object.fromEntries(participants.map(p => [p._id, p]));
	const raceMap = Object.fromEntries(races.map(r => [r._id, r]));

	// Resultate filtern und mit den passenden Teilnehmer- und Renn-Daten anreichern
	const results = rawResults
		.filter(result =>
			participantMap[result.participantId] &&
			raceMap[result.raceId]
		)
		.map(result => ({
			...result,
			participant: participantMap[result.participantId],
			race: raceMap[result.raceId]
		}));

	// Rückgabe an die Seite als props.data.results
	return { results };
}
