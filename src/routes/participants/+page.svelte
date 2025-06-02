<script>
	// Importiere wiederverwendbare Button-Komponente
	import MyButton from "$lib/components/createbutton.svelte";

	// Hole Daten aus den Server-Props
	let { data } = $props();
	const participants = data?.participants ?? [];

	// Lokaler Zustand für Suchbegriff und ausgewählte Kategorie
	let searchQuery = $state("");
	let selectedCategory = $state("");

	// Definierte Kategorien für Filter-Buttons
	const kategorien = ["Alle", "Junior", "Erwachsen", "Senior"];

	/**
	 * Filtert die Teilnehmerliste nach Suchbegriff und Kategorie.
	 * - Textsuche: prüft alle Eigenschaften eines Teilnehmers
	 * - Kategorie: optional, nur wenn spezifisch ausgewählt
	 */
	function filterParticipants(array, query, category) {
		return array.filter((p) => {
			const matchesQuery = Object.values(p).some((value) =>
				String(value).toLowerCase().includes(query.toLowerCase()),
			);
			const matchesCategory =
				!category || category === "Alle"
					? true
					: p.category === category;
			return matchesQuery && matchesCategory;
		});
	}

	// Wenn Kategorie erneut geklickt wird, wird sie abgewählt
	function selectCategory(cat) {
		selectedCategory = cat === selectedCategory ? "" : cat;
	}
</script>

<h1 class="mb-4">Teilnehmerübersicht</h1>

<!-- Button zum Hinzufügen eines neuen Teilnehmers -->
<MyButton
	href="/participants/create"
	label="➕ Neuen Teilnehmer erfassen"
	class="btn-lightblue mb-4"
/>

<!-- Eingabefeld für die Textsuche -->
<div class="mb-3">
	<input
		type="text"
		class="form-control"
		placeholder="Suche nach Name, E-Mail,…"
		bind:value={searchQuery}
	/>
</div>

<!-- Kategorie-Auswahl als Buttons -->
<div class="mb-4 d-flex flex-wrap gap-2">
	{#each kategorien as k}
		<button
			type="button"
			class="btn btn-outline-primary {selectedCategory === k
				? 'active'
				: ''}"
			onclick={() => selectCategory(k)}
		>
			{k}
		</button>
	{/each}
</div>

<!-- Gefilterte Teilnehmerliste -->
{#if participants.length > 0}
	<ul class="list-group">
		{#each filterParticipants(participants, searchQuery, selectedCategory) as p}
			<li class="list-group-item">
				<a href={`/participants/${p._id}`}>{p.name}</a>
				<span class="ms-2 text-muted">{p.category}</span>
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-muted">Keine Teilnehmer gefunden.</p>
{/if}
