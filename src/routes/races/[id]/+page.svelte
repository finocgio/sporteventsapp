<script>
	let { data } = $props();
	const race = data.race;
</script>

<h1>{race.name}</h1>

<ul class="list-group">
	<li class="list-group-item"><strong>Ort:</strong> {race.location}</li>
	<li class="list-group-item"><strong>Datum:</strong> {race.date.split('T')[0]}</li>
	<li class="list-group-item"><strong>Distanz:</strong> {race.distance} km</li>
	<li class="list-group-item"><strong>Beschreibung:</strong> {race.description}</li>
</ul>

<div class="mt-3 d-flex gap-2">
	<a class="btn btn-primary" href={`/races/${race._id}/edit`}>Bearbeiten</a>
	<form method="POST">
		<button class="btn btn-danger" name="delete" formaction="?/delete">Löschen</button>
	</form>
</div>

<a class="btn btn-outline-secondary mt-4" href="/races">← Zurück</a>
