<script>
	import { enhance } from '$app/forms';
	import { editMode } from '$lib/stores/editMode';
	import { toggles, update } from '$lib/stores/toggles';
	export let data;
	export let slot;

	$: style = [];
	$: toggled = $toggles.get(slot);
	$: console.log(toggled);

	$: styles();

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
</script>

<form
  on:click
  class="box"
  style={
  	(data?.color ? `background-color: ${data.color};` : '') +
  	(data?.toggle ? `border-color: ${toggled ? '#aaffaa' : '#ffaaaa'};` : '')
  }
  action="?/send"
  method="POST"
  use:enhance
>
	<button on:click={(e) => handleClick(e)}>
		<h1 class="text-3xl font-bold text-center">{data?.name ?? 'button'}</h1>
	</button>
	{#each data?.hotkeys ?? [] as hk (hk)}
		<input name="id" value={hk.id} type="hidden" />
	{/each}
</form>

<style lang="postcss">

</style>