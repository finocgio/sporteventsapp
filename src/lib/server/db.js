// Importiere den MongoDB-Client und das ObjectId-Utility zur Arbeit mit Dokument-IDs
import { MongoClient, ObjectId } from 'mongodb';

// Zugriff auf die MongoDB-Verbindungs-URI aus der .env-Datei (private Umgebungskonstante)
import { MONGODB_URI } from '$env/static/private';

// MongoDB Verbindung
const client = new MongoClient(MONGODB_URI);
await client.connect();
const db = client.db('Sportevents');

// Hilfsfunktion zur Konvertierung von ObjectId zu String
function toClientId(doc) {
	if (!doc) return null;
	return { ...doc, _id: doc._id.toString() };
}

// RACES
export async function getRaces() {
	const result = await db.collection('races').find().toArray();
	return result.map(toClientId);
}

export async function getRaceById(id) {
	const race = await db.collection('races').findOne({ _id: new ObjectId(id) });
	return race ? { ...race, _id: race._id.toString() } : null;
}


export async function insertRace(race) {
	const result = await db.collection('races').insertOne(race);
	return { ...race, _id: result.insertedId.toString() };
}


export async function updateRace(id, data) {
	await db.collection('races').updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function deleteRace(id) {
	await db.collection('races').deleteOne({ _id: new ObjectId(id) });
}

// RESULTS
export async function getResults() {
	const result = await db.collection('results').find().toArray();
	return result.map(toClientId);
}

export async function insertResult(result) {
	await db.collection('results').insertOne(result);
}

// PARTICIPANTS
export async function getParticipants() {
	const result = await db.collection('participants').find().toArray();
	return result.map(toClientId);
}

export async function getParticipantById(id) {
	const participant = await db.collection('participants').findOne({ _id: new ObjectId(id) });
	return toClientId(participant);
}

export async function insertParticipant(participant) {
	const result = await db.collection('participants').insertOne(participant);
	return { ...participant, _id: result.insertedId.toString() };
}

export async function updateParticipant(id, data) {
	await db.collection('participants').updateOne(
		{ _id: new ObjectId(id) },
		{ $set: data }
	);
}

export async function deleteParticipant(id) {
	await db.collection('participants').deleteOne({ _id: new ObjectId(id) });
}
