<script>
	// Props vom Serverload entgegennehmen
	let { data } = $props();

	// Aktuelles Rennen aus den geladenen Daten extrahieren
	const race = data.race;
</script>

<!-- Überschrift mit dem Namen des Rennens -->
<h1>{race.name}</h1>

<!-- Auflistung der Renndetails -->
<ul class="list-group">
	<li class="list-group-item"><strong>Ort:</strong> {race.location}</li>
	<li class="list-group-item">
		<strong>Datum:</strong>
		{race.date.split("T")[0]}
	</li>
	<li class="list-group-item">
		<strong>Distanz:</strong>
		{race.distance} km
	</li>
	<li class="list-group-item">
		<strong>Beschreibung:</strong>
		{race.description}
	</li>
</ul>

<!-- Buttons für Bearbeiten und Löschen des Rennens -->
<div class="mt-3 d-flex gap-2">
	<a class="btn btn-primary" href={`/races/${race._id}/edit`}>Bearbeiten</a>
	<form method="POST">
		<!-- Formularbutton mit spezieller Form-Action für das Löschen -->
		<button class="btn btn-danger" name="delete" formaction="?/delete"
			>Löschen</button
		>
	</form>
</div>

<!-- Zurück-Link zur Übersicht -->
<a class="btn btn-outline-secondary mt-4" href="/races">← Zurück</a>
