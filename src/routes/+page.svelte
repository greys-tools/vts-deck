<script>
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import { buttons, update } from '$lib/stores/buttons';
	import { editMode } from '$lib/stores/editMode';

	import Button from '$lib/components/Button.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';

	export let data = {};

	let editing = "";
	let open = false;
	let error = ""
	const handleClick = (e, slot) => {
		e.target.classList.add('click');
		setTimeout(() => e.target.classList.remove('click'), 250)
		if($editMode) {
			editing = slot;
			console.log(editing)
			open = true;
			error = "";
		} else {
			//...
		}
	}

	$: console.log($buttons);
</script>

<div class="container">
	{#if data?.waiting}
		<div>
			<h1 class="text-3xl text-black dark:text-white">Waiting to connect...</h1>
			<h3 class="text-xl text-black dark:text-white">Check your VTube Studio client to authorize the connection, then reload the page to get started</h3>
		</div>
	{:else}
		<div id="grid">
			{#each {length: 20} as _,i (i)}
				{#if $buttons?.get(`slot-${i+1}`)}
					<Button data={$buttons.get(`slot-${i+1}`)} on:click={(e) => handleClick(e, `slot-${i+1}`)} />
				{:else}
					<div class="box" on:click={(e) => handleClick(e, `slot-${i+1}`)}>
					</div>
				{/if}
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