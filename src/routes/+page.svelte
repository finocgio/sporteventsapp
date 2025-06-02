<script>
	// Props aus dem Server-Load verwenden
	let { data: pageData } = $props();
	const { events } = pageData;
</script>

<!-- Einleitungsbereich mit kompakterem Abstand -->
<section class="intro-section text-center py-3">
	<div class="intro-text container my-3">
		<h1 class="display-5 mb-2">Willkommen zur Sportevents App</h1>
		<p class="lead text-muted mb-3">
			Verwalte deine Sportveranstaltungen: Teilnehmer erfassen, Rennen anlegen
			und Resultate anzeigen.
		</p>

		<!-- Buttons direkt unter dem Text, zentriert -->
		<div class="d-flex justify-content-center gap-3 mt-2">
			<a href="/participants" class="btn btn-outline-primary">Teilnehmer verwalten</a>
			<a href="/races" class="btn btn-outline-primary">Rennen verwalten</a>
			<a href="/results" class="btn btn-outline-primary">Resultate anzeigen</a>
		</div>
	</div>
</section>

<!-- Bootstrap-Karussell -->
<section class="container mb-5">
	<div
		id="carouselAutoplaying"
		class="carousel slide"
		data-bs-ride="carousel"
		data-bs-interval="3000"
	>
		<div class="carousel-inner rounded shadow">
			<div class="carousel-item active">
				<img src="/lugano.jpg" class="d-block w-100" alt="Bild 1" />
			</div>
			<div class="carousel-item">
				<img src="/bern.jpg" class="d-block w-100" alt="Bild 2" />
			</div>
			<div class="carousel-item">
				<img src="/lausanne.jpg" class="d-block w-100" alt="Bild 3" />
			</div>
			<div class="carousel-item">
				<img src="/luzern.jpg" class="d-block w-100" alt="Bild 4" />
			</div>
			<div class="carousel-item">
				<img src="/zuerich.jpg" class="d-block w-100" alt="Bild 5" />
			</div>
		</div>
	</div>
</section>
