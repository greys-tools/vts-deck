<script>
	import {
    Modal,
    Button,
    ButtonGroup,
    Label,
    Checkbox,
    Input,
    FloatingLabelInput,
    Range,

    Dropdown,
    DropdownItem,
    DropdownDivider,
    DropdownHeader
  } from 'flowbite-svelte';
  import { enhance } from '$app/forms';
  import { settings, update } from '$lib/stores/settings';

  import GridView from '~icons/ic/round-grid-view';
  import ListView from '~icons/ic/round-view-list';

  import DarkMode from '~icons/ic/round-dark-mode';
  import LightMode from '~icons/ic/round-light-mode';
  import AutoMode from '~icons/ic/round-auto-mode';

  let theme = $derived($settings.get('theme'));
  let view = $derived($settings.get('view'));

  let { open = $bindable(), error } = $props();

  const save = (key, val) => {
    update(key, val);
  }
</script>

<Modal title="Settings" bind:open={open} size="xs" autoclose={false} outsideclose>
    {#if error}
      <p class='text-red-300'>Error: {error}</p>
    {/if}
    <div class="w-full flex flex-col items-start justify-center">
      <div id="theme-settings" class="w-full flex flex-row items-center justify-between mb-2">
        <p>Theme</p>
        <ButtonGroup>
          <Button
            color={theme == 'dark' ? 'blue' : 'alternative'}
            on:click={() => save('theme', 'dark')}
          >
          	<span class="sr-only">dark mode</span>
          	<DarkMode />
          </Button>
          <Button
            color={theme == 'light' ? 'blue' : 'alternative'}
            on:click={() => save('theme', 'light')}
          >
          	<span class="sr-only">light mode</span>
          	<LightMode />
          </Button>
          <Button
            color={theme == 'system' ? 'blue' : 'alternative'}
            on:click={() => save('theme', 'system')}
          >
          	<span class="sr-only">auto mode</span>
          	<AutoMode />
          </Button>
        </ButtonGroup>
      </div>

      <div id="view-settings" class="w-full flex flex-row items-center justify-between mb-2">
        <p>View</p>
        <div>
          <Label for="x-range">Columns (X Amount)</Label>
          <Range min=1 max=10 size="lg" value={view.x ?? 5}
            on:change={(e) => console.log(e)}
          />
          <Label for="x-range">Rows (Y Amount)</Label>
          <Range min=1 max=10 size="lg" value={view.y ?? 5}
            on:change={(e) => console.log(e)}
          />
        </div>
      </div>
    </div>
</Modal>