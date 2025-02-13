<script>
	import { run, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { enhance } from '$app/forms';
	import { editMode } from '$lib/stores/editMode';
	import { toggles, update } from '$lib/stores/toggles';
	/** @type {{data: any, slot: any}} */
	let { data, slot } = $props();

	function styles() {
		let tmp = []
		if(data?.color) tmp.push()
		if(data?.toggle) tmp.push()
		style = tmp;
	}

	function handleClick(e) {
		if($editMode) {
			e.preventDefault()
		} else {
			if(data?.toggle) update(slot, toggled ? false : true);
		}
	}

	let style = $state([]);
	
	let toggled = $derived($toggles.get(slot));

	$effect(() => {
		styles();
	});
</script>

<form
  onclick={bubble('click')}
  class="box"
  style={
  	(data?.color ? `background-color: ${data.color};` : '') +
  	(data?.toggle ? `outline-color: ${toggled ? '#aaffaa' : '#ffaaaa'};` : '')
  }
  action="?/send"
  method="POST"
  use:enhance
>
	<button onclick={(e) => handleClick(e)}>
		<h1 class="font-bold text-center" style="font-size: min(2vw, 36px);">{data?.name ?? 'button'}</h1>
	</button>
	{#each data?.hotkeys ?? [] as hk (hk)}
		<input name="id" value={hk.id} type="hidden" />
	{/each}
</form>

<style>
</style>