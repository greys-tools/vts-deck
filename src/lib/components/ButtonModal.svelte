<script>
	import {
    Modal,
    Button,
    ButtonGroup,
    Label,
    Checkbox,
    Input,
    FloatingLabelInput,

    Dropdown,
    DropdownItem,
    DropdownDivider,
    DropdownHeader,

    Search
  } from 'flowbite-svelte';
  import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
  import { enhance } from '$app/forms';
  import { buttons, update, remove } from '$lib/stores/buttons';

	export let open;
  export let error;
  export let item;
  export let hotkeys = [];

  let search = '';

  $: data = $buttons.get(item) ?? { hotkeys: [] };
  $: if(!data.hotkeys) data.hotkeys = [];

  $: unused = hotkeys.filter(x => !data?.hotkeys?.find(h => h.id == x.id));
  $: filtered = unused.filter(x => search?.length ? x.name.toLowerCase().includes(search) : true);

  const save = (key, val) => {
    update(key, val);
    open = false;
  }

  const clear = () => {
    remove(item);
  }
</script>

<Modal bind:open={open} size="sm" autoclose={false} outsideclose class="w-full min-h-96">
  <div class="flex flex-shrink-0 flex-col justify-between">
    <h1 class="mb-4 text-2xl font-medium text-gray-900 dark:text-white flex-shrink-0 flex-grow-0">Edit Button in Slot {item.replace('slot-', '')}</h1>
    {#if error}
      <p class='text-red-500 dark:text-red-300'>Error: {error}</p>
    {/if}
    <div class="">
      <Label for="name">Button Name</Label>
      <Input id="name" bind:value={data.name} floatClass="text-md" />
      <ColorPicker
        bind:hex={data.color}
        textInputModes={['hex']}
        isAlpha={false}
        isTextInput={false}
        --picker-height="100px"
        --picker-width="100px"
      />
      <h3 class="text-xl text-black dark:text-white">Hotkeys (click to remove)</h3>
      <div class="w-full bg-gray-300 dark:bg-gray-700 p-2 min-h-24 my-2 rounded-md">
        {#each data.hotkeys as hk (hk.id)}
          <Button color="alternative" class="m-2 p-2 rounded-md text-black dark:text-white" on:click={() => data.hotkeys = data.hotkeys.filter(x => x.id !== hk.id)}>
              {hk.name}
          </Button>
        {/each}
      </div>
      <div class="w-full">
        <Button>
          Add a hotkey
        </Button>
        <Dropdown>
          <div slot="header" class="p-4">
            <Search size="md" bind:value={search}/>
          </div>
          {#each filtered as hk (hk.id)}
            <DropdownItem on:click={() => data.hotkeys = [...data.hotkeys, { name: hk.name, id: hk.id }]}>
              {hk.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      </div>
    </div>
    <div class="w-full flex flex-row justify-end items-center mt-2">
      <Button on:click={() => save(item, data)}>
        Save
      </Button>
      <Button on:click={() => open = false} class="mx-2">
        Cancel
      </Button>
      <Button color="red" on:click={() => clear()}>
        Clear Button
      </Button>
    </div>
  </div>
</Modal>

<style>
</style>