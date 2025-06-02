<script>
	// children enthält die dynamisch geladene Seitenkomponente (über den Layout-Slot)
	let { children } = $props();

	// Zustand für das Burger-Menü in der Navigation (mobile Ansicht)
	let open = $state(false);
</script>

<!-- Navigationsleiste -->
<header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
		<a class="navbar-brand" href="/">Sportevents</a>

		<!-- Logo/Icon rechts vom Titel -->
		<img src="/icon.jpg" alt="Icon" class="icon" />

		<!-- Burger-Menü-Button (nur sichtbar bei kleiner Bildschirmbreite) -->
		<button
			class="navbar-toggler"
			type="button"
			onclick={() => (open = !open)}
			aria-controls="nav"
			aria-expanded={open}
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<!-- Navigationslinks (werden im Burger-Menü ein-/ausgeklappt) -->
		<div class={`collapse navbar-collapse ${open ? "show" : ""}`} id="nav">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item"><a class="nav-link" href="/">Home</a></li>
				<li class="nav-item">
					<a class="nav-link" href="/participants">Teilnehmer</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/races">Rennen</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/results">Resultate</a>
				</li>
			</ul>
		</div>
	</nav>
</header>

<!-- Hauptinhalt der jeweiligen Seite wird hier gerendert -->
<main class="container my-4">
	{@render children()}
</main>

<!-- Fusszeile -->
<footer class="bg-dark text-light text-center py-3 mt-auto">
	<small>
		Kontakt: <a href="mailto:info@sportevents.ch" class="text-info"
			>info@sportevents.ch</a
		>
		| © {new Date().getFullYear()} Sportevents App
	</small>
</footer>
