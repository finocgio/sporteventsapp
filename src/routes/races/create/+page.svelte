<script>
	let name = $state('');
	let location = $state('');
	let date = $state('');
	let distance = $state('');
	let description = $state('');
</script>

<h1>Neues Rennen erfassen</h1>

<form method="POST">
	<div class="mb-3">
		<label class="form-label" for="name">Name</label>
		<input class="form-control" id="name" name="name" bind:value={name} required />
	</div>

	<div class="mb-3">
		<label class="form-label" for="location">Ort</label>
		<input class="form-control" id="location" name="location" bind:value={location} required />
	</div>

	<div class="mb-3">
		<label class="form-label" for="date">Datum</label>
		<input class="form-control" id="date" name="date" type="date" bind:value={date} required />
	</div>

	<div class="mb-3">
		<label class="form-label" for="distance">Distanz (in km)</label>
		<select class="form-select" id="distance" name="distance" bind:value={distance} required>
			<option disabled value="">Bitte wählen</option>
			<option value="5">5 km</option>
			<option value="10">10 km</option>
			<option value="15">15 km</option>
			<option value="21">Halbmarathon (21 km)</option>
			<option value="42">Marathon (42 km)</option>
		</select>
	</div>

	<div class="mb-3">
		<label class="form-label" for="description">Beschreibung</label>
		<textarea class="form-control" id="description" name="description" rows="3" bind:value={description}></textarea>
	</div>

	<button class="btn btn-primary">Speichern</button>
</form>
