<script>
	import Edit from '~icons/material-symbols-light/edit-square-rounded';
	import Clear from '~icons/material-symbols-light/delete-forever-rounded';

	let {
		shown = $bindable(),
		target = $bindable(),
		pos = $bindable(),
		onedit,
		onclear
	} = $props();

	let menu = { h: 0, w: 0 };
	let windowSize = { h: 0, w: 0 };

	$effect(() => {
		if(shown) {
			windowSize = {
				h: window.innerHeight,
				w: window.innerWidth
			}

			if(windowSize.h - pos.y < menu.h)
				pos.y = pos.y - menu.h;
			if(windowSize.w - pos.x < menu.w)
				pos.x = pos.x - menu.w;
		}
	})

	let hide = () => shown = false;

	let getDimensions = (node) => {
		menu = {
			h: node.offsetHeight,
			w: node.offsetWidth
		}
	}
</script>

<svelte:window
	onclick={hide}
/>

{#if shown}
	<nav use:getDimensions
		class="p-2 w-24 bg-white border-2 border-gray-400 rounded-md dark:bg-gray-700 dark:bg-gray-500 absolute"
		style="top:{pos.y}px; left:{pos.x}px"
	>
		<ul class="text-black dark:text-white">
			<li 
				class="hover:bg-black/20 dark:hover:bg-white/20 rounded-md p-1 cursor-pointer text-md" 
				onclick={onedit}
			>
				<button class="flex justify-center items-center">
					<Edit />
					<span class="ml-1">Edit</span>
				</button>
			</li>
			<li 
				class="hover:bg-black/20 dark:hover:bg-white/20 rounded-md p-1 cursor-pointer mt-1 text-md"
				onclick={onclear}
			>
				<button class="flex justify-center items-center">
					<Clear />
					<span class="ml-1">Clear</span>
				</button>
			</li>
		</ul>
	</nav>
{/if}

<style lang="postcss">
</style>