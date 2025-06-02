<script>
	let { data } = $props();
	const { participant, race, result } = data;
</script>

<h1>Teilnehmer: {participant.name}</h1>

<ul class="list-group">
	<li class="list-group-item"><strong>Email:</strong> {participant.email}</li>
	<li class="list-group-item"><strong>Alter:</strong> {participant.age}</li>
	<li class="list-group-item"><strong>Kategorie:</strong> {participant.category}</li>

	{#if race && result}
		<li class="list-group-item">
			<strong>Rennen:</strong> {race.name} in {race.location} am {race.date.split('T')[0]}<br>
			<strong>Zeit:</strong> {result.time}, <strong>Platz:</strong> {result.position}
		</li>
	{:else}
		<li class="list-group-item text-muted">Kein Ergebnis vorhanden</li>
	{/if}
</ul>

<div class="mt-3 d-flex gap-2">
	<a class="btn btn-primary" href={`/participants/${participant._id}/edit`}>Bearbeiten</a>
	<form method="POST">
		<button class="btn btn-danger" name="delete" formaction="?/delete">Löschen</button>
	</form>
</div>
