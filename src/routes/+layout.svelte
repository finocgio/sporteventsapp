<script>
	let { children } = $props();
	let open = $state(false);
</script>

<!-- Navigationsleiste -->
<header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
		<a class="navbar-brand" href="/">Sportevents</a>
		<img src="/icon.jpg" alt="Icon" class="icon" />

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

		<div class={`collapse navbar-collapse ${open ? "show" : ""}`} id="nav">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item"><a class="nav-link" href="/">Home</a></li>
				<li class="nav-item"><a class="nav-link" href="/participants">Teilnehmer</a></li>
				<li class="nav-item"><a class="nav-link" href="/races">Rennen</a></li>
				<li class="nav-item"><a class="nav-link" href="/results">Resultate</a></li>
			</ul>
		</div>
	</nav>
</header>

<!-- Hauptinhalt -->
<main class="container my-4">
	{@render children()}
</main>

<!-- Fusszeile -->
<footer class="bg-dark text-light text-center py-3 mt-auto">
	<small>
		Kontakt: <a href="mailto:info@sportevents.ch" class="text-info">info@sportevents.ch</a>
		| © {new Date().getFullYear()} Sportevents App
	</small>
</footer>
