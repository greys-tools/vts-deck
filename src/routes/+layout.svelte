<script>
  import "../app.css";
  import {
    DarkMode,

    Navbar,
    NavBrand,

    Toggle,
    Button
  } from 'flowbite-svelte';

  import {
    editMode,
    update
  } from '$lib/stores/editMode';

  import Edit from '~icons/material-symbols/edit';
  import Save from '~icons/material-symbols/save';

  $: mode = $editMode;

  function edit() {
    update(true);
    console.log($editMode)
  }

  function save() {
    update(false);
    console.log($editMode)
  }

  $: console.log(editMode, $editMode)
</script>

<svelte:head>
  <script>
    var prefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ('settings' in localStorage) {
      var st = JSON.parse(localStorage.getItem('settings'));
      if(st.theme == 'dark' || (st.theme == 'system' && prefer)) window.document.documentElement.classList.add('dark');
      else if(st.theme == 'light') window.document.documentElement.classList.remove('dark');
    } else if(prefer) {
      window.document.documentElement.classList.add('dark');  
    }
  </script>
</svelte:head>

<Navbar fluid class="shadow-black drop-shadow-md dark:bg-gray-800" style="app-region: drag">
  <div class="flex justify-start" style="app-region: no-drag">
  <NavBrand>
    VTS Deck
  </NavBrand>
  <div class="flex flex-row items-center">
    <DarkMode />
    <Button color="alternative" class="p-3 border-none" on:click={() => {
      if(mode) save();
      else edit();
    }}>
      {#if mode}
        <Save />
      {:else}
        <Edit />
      {/if}
    </Button>
  </div>
</div>
</Navbar>

<slot />