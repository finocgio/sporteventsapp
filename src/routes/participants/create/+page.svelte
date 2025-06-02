<script>
	// Hole die geladenen Daten (Rennen + Kategorien) aus dem Server-Load
	let { data } = $props();
	const { races, kategorien } = data;

	// Lokaler Zustand für die Formulareingaben
	let name = $state("");
	let email = $state("");
	let age = $state("");
	let category = $state("");
	let raceId = $state("");
	let time = $state("");
</script>

<h1>Neuen Teilnehmer erfassen</h1>

<!-- Teilnehmerformular -->
<form method="POST">
	<!-- Eingabefeld: Name -->
	<div class="mb-3">
		<label class="form-label" for="name">Name</label>
		<input
			class="form-control"
			id="name"
			name="name"
			bind:value={name}
			required
		/>
	</div>

	<!-- Eingabefeld: E-Mail -->
	<div class="mb-3">
		<label class="form-label" for="email">E-Mail</label>
		<input
			class="form-control"
			id="email"
			name="email"
			type="email"
			bind:value={email}
			required
		/>
	</div>

	<!-- Eingabefeld: Alter -->
	<div class="mb-3">
		<label class="form-label" for="age">Alter</label>
		<input
			class="form-control"
			id="age"
			name="age"
			type="number"
			bind:value={age}
			required
		/>
	</div>

	<!-- Dropdown: Kategorie auswählen -->
	<div class="mb-3">
		<label class="form-label" for="category">Kategorie</label>
		<select
			class="form-select"
			id="category"
			name="category"
			bind:value={category}
			required
		>
			<option disabled value="">Bitte wählen</option>
			{#each kategorien as k}
				<option value={k}>{k}</option>
			{/each}
		</select>
	</div>

	<!-- Dropdown: Rennen auswählen (optional) -->
	<div class="mb-3">
		<label class="form-label" for="raceId">Rennen</label>
		<select
			class="form-select"
			id="raceId"
			name="raceId"
			bind:value={raceId}
		>
			<option value="">–</option>
			{#each races as r}
				<option value={r._id}>{r.name}</option>
			{/each}
		</select>
	</div>

	<!-- Eingabefeld: Zeit -->
	<div class="mb-3">
		<label class="form-label" for="time">Zeit (Format z.B. 00:32:45)</label>
		<input class="form-control" id="time" name="time" bind:value={time} />
	</div>

	<!-- Formularabsende-Button -->
	<button class="btn btn-primary">Speichern</button>
</form>
