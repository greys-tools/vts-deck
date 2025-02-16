<script>
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { nanoid } from 'nanoid';

	import { buttons } from '$lib/stores/buttons';
	import { slots } from '$lib/stores/slots';
	import { settings, update } from '$lib/stores/settings';
	import { editMode } from '$lib/stores/editMode';

	import Button from '$lib/components/Button.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';

	/** @type {{data?: any}} */
	let { data = {} } = $props();

	let editing = $state({button: "", slot: ""});
	let open = $state(false);
	let error = $state("");

	let view = $derived.by(() => $settings.get('view') ?? {x: 5, y: 5});
	let sort = $derived.by(() => $settings.get('sort'));

	const handleClick = (e, slot = "", button = "") => {
		if($editMode) {
			editing = { slot, button };
			open = true;
			error = "";
		} else {
			e.target.classList.add('click');
			setTimeout(() => e.target.classList.remove('click'), 250)
		}
	}

	const swappable = (node, data) => {
		let { group, disabled } = data;
		var swap = new Sortable(node, {
			disabled,
			// swap: true,
			animation: 250,
			store: {
				get: (sortable) => {
					let order = sort;
					return order;
				},

				set: (sortable) => {
					let order = sortable.toArray();
					update('sort', order);
				}
			}
		});

		return {
			update: (data) => {
				swap.option('disabled', data.disabled);
			},
			destroy: () => {
				swap.destroy();
			}
		}
	}

	let gridStyle = $derived.by(() => {
		let w = 10 * ( 10 / view.x );
		return (
			`display: grid;` +
			`grid-template-columns: repeat(${view.x}, min(${w}vw, 150px));` +
			`grid-template-rows: repeat(5, min(${w}vw, 150px));`
		);
	})
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
</svelte:head>

<div class="container">
	{#if data?.waiting}
		<div>
			<h1 class="text-3xl text-black dark:text-white">Waiting to connect...</h1>
			<h3 class="text-xl text-black dark:text-white">
				Check your VTube Studio client to authorize the connection,{' '}
				then reload the page to get started
			</h3>
		</div>
	{:else if !sort?.[0]}
		<div></div>
	{:else}
		<div id="grid" use:swappable={{ disabled: !$editMode }}
			class="w-full h-full flex flex-col items-center justify-center"
			style={gridStyle}
		>
			{#each { length: 50 } as _, i (`${i}`)}
				{@const slot = `${i}`}
				{@const btnID = $slots?.get(slot)}
				<Button {slot}
					dataID={slot}
					data={$buttons?.get(btnID)} 
					shown={sort.indexOf(`${i}`) < view.x * view.y ? true : false}
					on:click={(e) => handleClick(e, slot, btnID)} 
				/>
			{/each}
		</div>
	{/if}
</div>

<ButtonModal bind:open bind:error bind:item={editing.button} bind:slot={editing.slot} hotkeys={data.hotkeys}/>

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
</style>