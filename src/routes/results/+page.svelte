<script>
	// Props vom Server-Load holen (enthält die Resultate)
	let { data } = $props();

	// Fallback: falls keine Daten vorhanden sind → leeres Array verwenden
	const results = data?.results ?? [];

	// Ergebnisse nach Rennname gruppieren
	const groupedByRace = results.reduce((acc, result) => {
		const raceName = result.race?.name ?? "Unbekanntes Rennen";
		if (!acc[raceName]) acc[raceName] = [];
		acc[raceName].push(result);
		return acc;
	}, {});

	// Innerhalb jedes Rennens die Ergebnisse nach Zeit aufsteigend sortieren
	for (const race in groupedByRace) {
		groupedByRace[race].sort((a, b) => a.time.localeCompare(b.time));
	}
</script>

<h1>Ergebnisübersicht</h1>

<!-- Ergebnisse pro Rennen anzeigen -->
{#each Object.entries(groupedByRace) as [raceName, raceResults]}
	<h2 class="mt-4">🏁 {raceName}</h2>

	<!-- Sortierte Ergebnisliste -->
	<ol class="list-group mb-4">
		{#each raceResults as r}
			<li class="list-group-item d-flex justify-content-between">
				<!-- Name des Teilnehmers (Fallback: Unbekannt) -->
				<span>{r.participant?.name ?? "Unbekannt"}</span>

				<!-- Zeit + ggf. Kategorie in Klammern -->
				<span
					>{r.time}
					{r.participant?.category &&
						`(${r.participant.category})`}</span
				>
			</li>
		{/each}
	</ol>
{/each}
