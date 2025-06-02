<script>
	// Props aus dem Load-Handler entgegennehmen
	let { data } = $props();

	// Teilnehmerdaten aus den geladenen Daten extrahieren
	const participant = data.participant;

	// Initialisiere das Formular mit den bestehenden Teilnehmerdaten
	let form = {
		name: participant.name,
		email: participant.email,
		age: participant.age,
		category: participant.category,
	};
</script>

<h1>Teilnehmer bearbeiten</h1>

<!-- Formular zur Bearbeitung eines bestehenden Teilnehmers -->
<form method="POST">
	<div class="mb-3">
		<label class="form-label" for="name">Name</label>
		<input
			class="form-control"
			id="name"
			name="name"
			bind:value={form.name}
			required
		/>
	</div>

	<!-- E-Mail-Adresse -->
	<div class="mb-3">
		<label class="form-label" for="email">E-Mail</label>
		<input
			class="form-control"
			id="email"
			name="email"
			bind:value={form.email}
			type="email"
			required
		/>
	</div>

	<!-- Alter -->
	<div class="mb-3">
		<label class="form-label" for="age">Alter</label>
		<input
			class="form-control"
			id="age"
			name="age"
			type="number"
			bind:value={form.age}
			required
		/>
	</div>

	<!-- Kategorie-Auswahl -->
	<div class="mb-3">
		<label class="form-label" for="category">Kategorie</label>
		<select
			class="form-select"
			id="category"
			name="category"
			bind:value={form.category}
			required
		>
			<option disabled value="">Bitte wählen</option>
			<option value="Junior">Junior</option>
			<option value="Erwachsen">Erwachsen</option>
			<option value="Senior">Senior</option>
		</select>
	</div>

	<!-- Aktionen: Speichern oder Abbrechen -->
	<button class="btn btn-primary" type="submit">Änderungen speichern</button>
	<a class="btn btn-secondary ms-2" href={`/participants/${participant._id}`}
		>Abbrechen</a
	>
</form>
