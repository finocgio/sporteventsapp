<script>
	// Komponente für den Button-Shortcut
	import MyButton from "$lib/components/createbutton.svelte";

	// Daten vom Serverload (races wird über +page.server.js geliefert)
	let { data } = $props();
	const races = data?.races ?? [];

	// Suchbegriff als Zustand
	let searchQuery = $state("");

	/**
	 * Filtert die Rennen nach einem Text oder einer Kilometerangabe.
	 * @param {Array} array - Liste aller Rennen
	 * @param {string} query - Suchtext (Name, Ort, Datum oder km-Zahl)
	 * @returns {Array} Gefilterte Rennen
	 */
	function filterRaces(array, query) {
		const queryTrimmed = query.trim().toLowerCase();

		// Umwandeln zu Zahl, falls möglich (für Distanzfilter)
		const queryNumber = Number(queryTrimmed);
		const isNumber = !isNaN(queryNumber) && queryTrimmed !== "";

		return array.filter((r) => {
			// Suchtext gegen name, location, date, description prüfen
			const matchesText = [
				"name",
				"location",
				"date",
				"description",
			].some((key) =>
				String(r[key] ?? "")
					.toLowerCase()
					.includes(queryTrimmed),
			);

			// Falls Eingabe eine Zahl ist, mit Distanz vergleichen
			const matchesDistance = isNumber && r.distance === queryNumber;

			return matchesText || matchesDistance;
		});
	}
</script>

<!-- Seitentitel -->
<h1 class="mb-4">Übersicht aller Rennen</h1>

<!-- Button zum Anlegen eines neuen Rennens -->
<MyButton
	href="/races/create"
	label="➕ Neues Rennen erfassen"
	class="btn-lightblue mb-4"
/>

<!-- Suchfeld -->
<div class="mb-4">
	<input
		type="text"
		class="form-control"
		placeholder="Suche nach Name, Ort, Datum oder km-Zahl …"
		bind:value={searchQuery}
	/>
</div>

<!-- Ergebnisliste -->
{#if races.length > 0}
	<ul class="list-group">
		{#each filterRaces(races, searchQuery) as r}
			<li
				class="list-group-item d-flex justify-content-between align-items-center"
			>
				<div>
					<a href={`/races/${r._id}`} class="fw-bold">{r.name}</a><br
					/>
					<small class="text-muted">
						{r.location} | {r.date.split("T")[0]} | {r.distance} km
					</small>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-muted">Keine Rennen vorhanden.</p>
{/if}
