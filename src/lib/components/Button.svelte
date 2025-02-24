<script>
	import { run, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { enhance } from '$app/forms';
	import { editMode } from '$lib/stores/editMode';
	import { toggles, update } from '$lib/stores/toggles';

	import ContextMenu from '$lib/components/ContextMenu.svelte';

	/** @type {{data: any, slot: any}} */
	let {
		data,
		slot,
		dataID,
		shown,
		onedit,
		onclear,
		onclick
	} = $props();
	dataID = dataID.toString();
	slot = slot.toString

	let toggled = $derived($toggles.get(data.id));
	let context = $state({
		shown: false,
		target: {
			slot,
			button: dataID
		},
		pos: {
			x: 0,
			y: 0
		}
	});

	let showContext = (e) => {
		e.preventDefault();
		context.shown = true;
		context.pos = {
			x: e.clientX,
			y: e.clientY
		}

		console.log('context', context)
	}

	function handleClick(e) {
		if($editMode) {
			e.preventDefault();
			onedit(e)
		} else {
			if(data?.toggle) update(data.id, toggled ? false : true);
		}
	}

	let style = $state([]);
	function styles() {
		let tmp = []
		if(data?.color) tmp.push()
		if(data?.toggle) tmp.push()
		style = tmp;
	}

	$effect(() => {
		styles();
	});
</script>

<form
  data-id={dataID}
  onclick={bubble('click')}
  class="box"
  style={
  	(data?.color ? `background-color: ${data.color};` : '') +
  	(data?.toggle ? `outline-color: ${toggled ? '#aaffaa' : '#ffaaaa'};` : '') +
  	(shown ? '' : 'display: none;')
  }
  action="?/send"
  method="POST"
  use:enhance
>
	<button
		onclick={(e) => handleClick(e)} 
		oncontextmenu={showContext}
	>
		<h1 class="font-bold text-center" style="font-size: min(2vw, 36px);">{data?.name}</h1>
	</button>
	{#each data?.hotkeys ?? [] as hk (hk)}
		<input name="id" value={hk.id} type="hidden" />
	{/each}
</form>

<ContextMenu
	bind:shown={context.shown}
	bind:target={context.target}
	bind:pos={context.pos}
	onedit={onedit}
	onclear={onclear}
/>