<script>
  import {
    Modal,
    Alert
  } from 'flowbite-svelte';

  import Settings from '~icons/ic/round-settings';
  import Edit from '~icons/material-symbols/edit';
  import Logo from '$lib/assets/icon.png';

  let { open = $bindable(), error } = $props();

</script>

<Modal title="Help" bind:open={open} size="md" autoclose={false} outsideclose>
    <h1 class="text-xl font-bold">
      <img src={Logo} alt="logo" class="size-6 mr-2 float-left align-middle" />
      Welcome to VTS Deck!
    </h1>
    <Alert border color="yellow">
      <span><b>Note:</b> This tool is used to set up <b>visual buttons</b> to execute hotkeys in VTube Studio.{' '}
      You'll need VTube Studio and a model with hotkeys set up to be able to use this!</span>
    </Alert>

    <h2 class="text-lg font-bold">
      Settings
    </h2>
    <p>
      You can adjust your settings by clicking the <Settings style="display: inline; vertical-align: middle;"/> (gear/settings) button.{" "}
      This will bring up a modal that will let you change the page's theme (dark/light) or add more buttons to the grid.{" "}
      The grid and button sizes will automatically adjust based on your grid size and screen size.
    </p>

    <h2 class="text-lg font-bold">
      Using this tool
    </h2>
    <p>
      There are two ways to get started using this tool:
    </p>
    <ol class="list-decimal ml-4">
      <li>Right click on any button and click "Edit" to open the setup modal</li>
      <li>Click the <Edit style="display: inline; vertical-align: middle;" /> (pencil/edit) button in the nav bar to start mass edit mode,{" "}
          then left click any button to open the setup modal</li> 
    </ol>
    <p>
      Once you have the modal open, you'll be greeted with an interface that allows you to name, color, and configure{" "}
      the button you've chosen.<br />
      The "Act as a toggle" option will give the button a red or green outline based on whether the toggle is{" "}
      inactive or active.<br/>
      Adding hotkeys is as simple as clicking "Add a hotkey" and selecting a hotkey to add to the button! 
    </p>

    <p>
      Adding multiple hotkeys to a button will run those hotkeys at the same time.{" "}
      You can use this to activate things like an outfit animation and outfit toggle together, or{" "}
      to make multiple effects and expressions run at the same time.<br/>
      Feel free to play around with it and use it to your heart's content!
    </p>

    <h2 class="text-lg font-bold">
      Reordering buttons
    </h2>
    <p>
      You can reorder buttons by activating mass edit mode, then clicking and dragging buttons to their new spots.{" "}
      The order is automatically saved when you move a button.
    </p>

    <Alert border color="yellow">
      <span>
        <b>Note:</b> The handle for moving buttons around is the name of the button.{" "}
          You'll want to start dragging from there!
      </span>
    </Alert>

    <h2 class="text-lg font-bold">
      About
    </h2>
    <p>
      This tool was made with <img src="https://em-content.zobj.net/source/twitter/77/purple-heart_1f49c.png" class="size-6 align-middle inline" /> by <a target="_blank" href="https://github.com/greysdawn" class="font-bold underline">greysdawn</a><br/>
      You can view the code on github <a target="_blank" href="https://github.com/greys-tools/vts-deck" class="font-bold underline">here</a>
    </p>
</Modal>

<style>

</style>