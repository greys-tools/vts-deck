<script>
	export let data;
</script>

<form class="box" on:click style={data?.color ? `background-color: ${data.color}` : ''}>
	{#each data?.hotkeys ?? [] as hk (hk)}
		<input name="id" value={hk} type="hidden" />
	{/each}
	<button>
		<h1 class="text-3xl font-bold">{data?.name ?? 'button'}</h1>
	</button>
</form>

<style lang="postcss">

</style>