<script>
	let { href = '', label = '', class: customClass = '' } = $props();
</script>

<a class={`btn ${customClass}`} href={href}>
	{label}
</a>
