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
    DropdownHeader
  } from 'flowbite-svelte';
  import { enhance } from '$app/forms';
  import { settings, update } from '$lib/stores/settings';

  import GridView from '~icons/ic/round-grid-view';
  import ListView from '~icons/ic/round-view-list';

  import DarkMode from '~icons/ic/round-dark-mode';
  import LightMode from '~icons/ic/round-light-mode';
  import AutoMode from '~icons/ic/round-auto-mode';

  let { open = $bindable(), error } = $props();

  let theme = $derived.by(() => $settings.get('theme'));
  let view = $derived.by(() => $settings.get('view') ?? {x: 5, y: 5});

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
        <p><b>Theme</b></p>
        <ButtonGroup>
          <Button
            color={theme == 'dark' ? 'blue' : 'alternative'}
            onclick={() => save('theme', 'dark')}
          >
            <span class="sr-only">dark mode</span>
            <DarkMode />
          </Button>
          <Button
            color={theme == 'light' ? 'blue' : 'alternative'}
            onclick={() => save('theme', 'light')}
          >
            <span class="sr-only">light mode</span>
            <LightMode />
          </Button>
          <Button
            color={theme == 'system' ? 'blue' : 'alternative'}
            onclick={() => save('theme', 'system')}
          >
            <span class="sr-only">auto mode</span>
            <AutoMode />
          </Button>
        </ButtonGroup>
      </div>

      <div id="view-settings" class="w-full flex flex-col items-start justify-between mb-2">
        <p><b>View</b></p>
        <div>
          <Label for="x-range">Columns (X/Horizontal Amount)</Label>
          <div class="flex items-center justify-center">
            <span><b>5</b></span>
            <input type="range" min=5 max=10 size="md" value={view.x ?? 5} list="values"
              class="mx-2 bg-transparent"
              id="x-range"
              name="x-range"
              onchange={(e) => save('view', {...view, x: parseInt(e.target.value) })}
            />
            <span><b>10</b></span>
            <datalist id="values" name="values">
              <option value="5"></option>
              <option value="6"></option>
              <option value="7"></option>
              <option value="8"></option>
              <option value="9"></option>
              <option value="10"></option>
            </datalist>
          </div>
      </div>
    </div>
</Modal>