<script>
	import MyButton from '$lib/components/createbutton.svelte';
	let { data } = $props();
	const races = data?.races ?? [];

	let searchQuery = $state("");

	function filterRaces(array, query) {
		const queryTrimmed = query.trim().toLowerCase();

		// Falls es eine Zahl ist, versuche mit Distanz zu matchen
		const queryNumber = Number(queryTrimmed);
		const isNumber = !isNaN(queryNumber) && queryTrimmed !== "";

		return array.filter((r) => {
			const matchesText = ['name', 'location', 'date', 'description']
				.some((key) => String(r[key] ?? '').toLowerCase().includes(queryTrimmed));

			const matchesDistance = isNumber && r.distance === queryNumber;

			return matchesText || matchesDistance;
		});
	}
</script>

<h1 class="mb-4">Übersicht aller Rennen</h1>
<MyButton
	href="/races/create"
	label="➕ Neues Rennen erfassen"
	class="btn-lightblue mb-4"
/>

<div class="mb-4">
	<input
		type="text"
		class="form-control"
		placeholder="Suche nach Name, Ort, Datum oder km-Zahl …"
		bind:value={searchQuery}
	/>
</div>

{#if races.length > 0}
	<ul class="list-group">
		{#each filterRaces(races, searchQuery) as r}
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<div>
					<a href={`/races/${r._id}`} class="fw-bold">{r.name}</a><br />
					<small class="text-muted">
						{r.location} | {r.date.split('T')[0]} | {r.distance} km
					</small>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-muted">Keine Rennen vorhanden.</p>
{/if}
