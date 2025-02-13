<script>
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import { buttons, update } from '$lib/stores/buttons';
	import { settings } from '$lib/stores/settings';
	import { editMode } from '$lib/stores/editMode';

	import Button from '$lib/components/Button.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';

	/** @type {{data?: any}} */
	let { data = {} } = $props();

	let editing = $state("");
	let open = $state(false);
	let error = $state("");

	let view = $derived.by(() => $settings.get('view') ?? {x: 5, y: 5});

	const handleClick = (e, slot) => {
		if($editMode) {
			editing = slot;
			open = true;
			error = "";
		} else {
			e.target.classList.add('click');
			setTimeout(() => e.target.classList.remove('click'), 250)
		}
	}
</script>

<div class="container">
	{#if data?.waiting}
		<div>
			<h1 class="text-3xl text-black dark:text-white">Waiting to connect...</h1>
			<h3 class="text-xl text-black dark:text-white">Check your VTube Studio client to authorize the connection, then reload the page to get started</h3>
		</div>
	{:else}
		<div class="w-full h-full flex flex-col items-center justify-center">
			{#each { length: view.y } as _,j (j)}
				<div class="flex items-center justify-center w-full">
					{#each { length: view.x } as _,i (i)}
						{#if $buttons?.get(`slot-${(j * view.x) + (i+1)}`)}
							<Button slot={`slot-${(j * view.x) + (i+1)}`}
								data={$buttons.get(`slot-${(j * view.x) + (i+1)}`)} 
								on:click={(e) => handleClick(e, `slot-${(j * view.x) + (i+1)}`)} 
							/>
						{:else}
							<div class="box" onclick={(e) => handleClick(e, `slot-${(j * view.x) + (i+1)}`)}>
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<ButtonModal bind:open bind:error bind:item={editing} hotkeys={data.hotkeys}/>

<style>
	.container {
		width: 100%;
		height: calc(100% - 60px);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		margin: auto;
	}

	#grid {
		display: grid;
		grid-template-rows: repeat(4, 200px);
		grid-template-columns: repeat(5, 200px);
		grid-template-areas: 
		"button1 button2 button3 button4 button5"
		"button6 button7 button8 button9 button10"
		"button11 button12 button13 button14 button15"
		"button16 button17 button18 button19 button20";
		margin: auto;
	}
</style>