<script>
	// Props von aussen mit Standardwerten entgegennehmen:
	// - href: Ziel-URL des Buttons
	// - label: Textinhalt des Buttons
	// - customClass: zusätzliche CSS-Klassen (z. B. btn-outline-primary)
	let { href = "", label = "", class: customClass = "" } = $props();
</script>

<!-- Button-Link mit Bootstrap-Button-Klasse und optionalen Zusatzklassen -->
<a class={`btn ${customClass}`} {href}>
	{label}
</a>
