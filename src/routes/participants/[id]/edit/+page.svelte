<script>
	let { data } = $props();
	const participant = data.participant;

	let form = {
		name: participant.name,
		email: participant.email,
		age: participant.age,
		category: participant.category
	};
</script>

<h1>Teilnehmer bearbeiten</h1>

<form method="POST">
	<div class="mb-3">
		<label class="form-label" for="name">Name</label>
		<input class="form-control" id="name" name="name" bind:value={form.name} required />
	</div>

	<div class="mb-3">
		<label class="form-label" for="email">E-Mail</label>
		<input class="form-control" id="email" name="email" bind:value={form.email} type="email" required />
	</div>

	<div class="mb-3">
		<label class="form-label" for="age">Alter</label>
		<input class="form-control" id="age" name="age" type="number" bind:value={form.age} required />
	</div>

	<div class="mb-3">
	<label class="form-label" for="category">Kategorie</label>
	<select class="form-select" id="category" name="category" bind:value={form.category} required>
		<option disabled value="">Bitte wählen</option>
		<option value="Junior">Junior</option>
		<option value="Erwachsen">Erwachsen</option>
		<option value="Senior">Senior</option>
	</select>
</div>

	<button class="btn btn-primary" type="submit">Änderungen speichern</button>
	<a class="btn btn-secondary ms-2" href={`/participants/${participant._id}`}>Abbrechen</a>
</form>

