<script>
	import { enhance } from '$app/forms';
	export let data;
</script>

<div class="container">
	{#if data.hotkeys}
		{#each data.hotkeys as hk (hk.id)}
			<form class="box" action="?/send" method="POST" use:enhance>
				<input type="hidden" name="name" value={hk.name} />
				<input type="hidden" name="id" value={hk.id} />
				<button>
					<span><b>Name:</b> {hk.name}</span>
					<br/>
					<span><b>Type:</b> {hk.type}</span>
				</button>
			</form>
		{/each}
	{/if}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.box {
		background-color: #aaa;
		color: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 200px;
		margin: .5rem;
		padding: .5rem;
		border-radius: .5rem;
	}

	.box button {
		width: 100%;
		height: 100%;
	}
</style>