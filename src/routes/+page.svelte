<script>
	import { enhance } from '$app/forms';
	import { invalidateAll, goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { nanoid } from 'nanoid';

	import { buttons, remove as removeButton } from '$lib/stores/buttons';
	import { slots, remove as removeSlot } from '$lib/stores/slots';
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

	let timeout;

	let refresh = () => {
		if(!browser) return;
		if(!data.waiting) {
			clearTimeout(timeout);
		} else {
			invalidateAll();
		}

		timeout = setTimeout(() => { refresh() }, 1000)
	}

	refresh();

	const handleEdit = (e, slot = "", button = "") => {
		editing = { slot, button };
		open = true;
		error = "";
	}

	const handleClick = (e) => {
		e.target.classList.add('click');
		setTimeout(() => e.target.classList.remove('click'), 250)
	}

	const handleClear = (slot, button) => {
		removeButton(button);
		removeSlot(slot);
	}

	const swappable = (node, data) => {
		let { group, disabled } = data;
		var swap = new Sortable(node, {
			disabled,
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
	{#if data?.waiting && !data?.verified}
		<div>
			<h1 class="text-3xl text-black dark:text-white">Waiting to connect...</h1>
			<h3 class="text-xl text-black dark:text-white">
				Check your VTube Studio client to authorize the connection!
			</h3>
		</div>
	{:else if data?.waiting}
		<div>
			<h1 class="text-3xl text-black dark:text-white">Connecting...</h1>
			<h3 class="text-xl text-black dark:text-white">
				We'll be ready in just a second!
			</h3>
		</div>
	{:else if !sort?.[0]}
		<div></div>
	{:else}
		<div id="grid" use:swappable={{ disabled: !$editMode }}
			style={gridStyle}
		>
			{#each { length: 50 } as _, i (`${i}`)}
				{@const slot = `${i}`}
				{@const btnID = $slots?.get(slot)}
				<Button {slot}
					dataID={slot}
					data={$buttons?.get(btnID)} 
					shown={sort.indexOf(`${i}`) < view.x * view.y ? true : false}
					onclick={(e) => {
						if($editMode) handleEdit(e, slot, btnID);
						else handleClick(e)
					}}
					oncontextmenu={(e) => showContext(e, slot, btnID)}
					onedit={(e) => handleEdit(e, slot, btnID)}
					onclear={() => handleClear(slot, btnID)}
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