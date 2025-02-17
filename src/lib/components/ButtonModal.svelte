<script>
  import { run } from 'svelte/legacy';

  import {
    Modal,
    Button,
    ButtonGroup,
    Label,
    Checkbox,
    Input,
    FloatingLabelInput,
    Toggle,

    Dropdown,
    DropdownItem,
    DropdownDivider,
    DropdownHeader,

    Search
  } from 'flowbite-svelte';
  import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
  import { nanoid } from 'nanoid';

  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { buttons, update, remove } from '$lib/stores/buttons';
  import { slots, update as updateSlot, remove as removeSlot } from '$lib/stores/slots';

  /** @type {{open: any, error: any, item: any, hotkeys?: any}} */
  let {
    open = $bindable(),
    error,
    item = $bindable(),
    hotkeys = [],
    slot
  } = $props();
  slot = `${slot}`;

  let search = $state('');
  let data = $state();

  run(() => {
    if(open && !data) {
      if(item) data = $buttons.get(item);
      else data = {
        id: nanoid(),
        name: '',
        color: '',
        hotkeys: [],
        toggle: false
      }
    }
  });

  let unused = $derived.by(() => hotkeys.filter(x => !data?.hotkeys?.find(h => h.id == x.id)));
  let filtered = $derived.by(() => unused.filter(x => search?.length ? x.name.toLowerCase().includes(search) : true));

  const save = () => {
    if(item) update(item, data);
    else {
      update(data.id, data);
      updateSlot(slot, data.id);
    }
    close();
  }

  const close = () => {
    open = false;
    data = null;
  }

  const clear = () => {
    if(item) {
      removeSlot(slot);
      remove(item);
    } else {
      removeSlot(slot);
      remove(data.id);
    }
    close();
  }
</script>

<Modal 
  bind:open={open} 
  size="md" 
  autoclose={false} 
  outsideclose={false} 
  dismissable={false} 
  class="w-full min-h-96"
  title="Edit Button"
>
  <div class="flex flex-shrink-0 flex-col justify-between">
    {#if error}
      <p class='text-red-500 dark:text-red-300'>Error: {error}</p>
    {/if}
    <div class="">
      <div class="mb-2">
        <Label for="name" class="text-lg">Button Name</Label>
        <Input id="name" bind:value={data.name} floatClass="text-md" />
      </div>

      <div class="mb-2">
        <h3 class="text-lg text-black dark:text-white">
          Color
        </h3>
        <ColorPicker
          bind:hex={data.color}
          textInputModes={['hex']}
          isAlpha={false}
          isTextInput={false}
          --picker-height="100px"
          --picker-width="100px"
        />
      </div>

      <div class="mb-2">
        <Label for="toggle" class="text-lg">Act as a toggle</Label>
        <Toggle name="toggle" bind:checked={data.toggle} />
      </div>

      <h3 class="text-lg text-black dark:text-white">Hotkeys (click to remove)</h3>
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
          {#snippet header()}
            <div  class="p-4">
              <Search size="md" bind:value={search}/>
            </div>
          {/snippet}
          {#each filtered as hk (hk.id)}
            <DropdownItem on:click={() => data.hotkeys = [...data.hotkeys, { name: hk.name, id: hk.id }]}>
              {hk.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      </div>
    </div>
    <div class="w-full flex flex-row justify-end items-center mt-2">
      <Button on:click={() => save()}>
        Save
      </Button>
      <Button on:click={() => close()} class="mx-2">
        Cancel
      </Button>
      <Button color="red" on:click={() => clear()}>
        Clear Button
      </Button>
    </div>
  </div>
</Modal>