<script>
	let { data } = $props();
	const results = data?.results ?? [];

	// Gruppieren nach Rennen
	const groupedByRace = results.reduce((acc, result) => {
		const raceName = result.race?.name ?? 'Unbekanntes Rennen';
		if (!acc[raceName]) acc[raceName] = [];
		acc[raceName].push(result);
		return acc;
	}, {});

	// Ergebnisse pro Rennen nach Zeit sortieren
	for (const race in groupedByRace) {
		groupedByRace[race].sort((a, b) =>
			a.time.localeCompare(b.time)
		);
	}
</script>

<h1>Ergebnisübersicht</h1>

{#each Object.entries(groupedByRace) as [raceName, raceResults]}
	<h2 class="mt-4">🏁 {raceName}</h2>
	<ol class="list-group mb-4">
		{#each raceResults as r}
			<li class="list-group-item d-flex justify-content-between">
				<span>{r.participant?.name ?? 'Unbekannt'}</span>
				<span>{r.time} {r.participant?.category && `(${r.participant.category})`}</span>
			</li>
		{/each}
	</ol>
{/each}
