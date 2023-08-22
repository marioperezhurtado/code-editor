<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
    <title>Code Editor</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
	/>
	<link rel="icon" href="favicon.svg" type="image/svg+xml" />
	<style>
		body {
			font-family: 'Roboto', sans-serif;
			margin: 0;
			padding: 0;
		}
	</style>
</svelte:head>

<slot />
