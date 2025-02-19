![VTS Deck Wordmark](https://cdn.greysdawn.com/img/ta5d0.png)

# VTS Deck
**VTS Deck**, or **VTube Studio Deck**, is a third-party tool intended to make executing 
VTS hotkeys easier for folks who don't have access to a proper stream deck.

This program runs entirely on your computer, and requires you to have VTube Studio open 
for it to work!

## Requirements
1. **Windows** operating system\*
   - Right now, VTS Deck is only built for Windows, and has specifically only been tested on **Windows 11**
   - If you still want to use this tool, you can download the repository and run it manually instead- it also works in your browser!
   - We plan to add more releases in the future
2. **Latest release** of the tool
   - See the [releases page](https://github.com/greys-tools/vts-deck/releases)
3. **VTube Studio**, a **Vtubing model**, and some **hotkeys** set up on it

## Getting Started
Getting the tool going is intended to be as easy and simple as possible:
1. Download and install the latest release, linked above
2. Open up VTube Studio and check to make sure your model and hotkeys are set up
3. Open the tool and allow it to connect to VTS
   - Note: You'll need to authorize the connection in VTS the first time you run the program
4. Right click on any button and hit "edit", then fill out the configuration modal that comes up
5. Save your configuration, click the button, and watch your hotkeys activate!

## Browser Option
If you have a device other than a Windows PC and want to use the tool, you can also try these steps:
1. Download the code in this repository and unzip it somewhere handy
2. Download the latest version of [Nodejs](https://nodejs.org/en)
3. Open a command prompt/terminal in the main folder of the tool
4. Run `npm i` to install all the dependencies for the tool
5. Run `npm run dev` to start the server, and open the link that the terminal gives you (usually `http://localhost:5173`)
6. Use the tool as you normally would!

## App Settings
Right now, the only settings available are for the app's theme (light/dark) and the number of buttons in the grid 
(which can be extended horizontally to have up to 10 buttons per row).

All button configurations are saved to local storage, so they should stick around after you close and reopen the app.
The verification token in VTube Studio is currently set to expire after a year; you'll just need to re-authorize the
plugin when that happens.

In the future, we also plan to add a **list mode** option for people to use instead of the grid, and a way to **add more rows**
instead of just columns!

## Caveats and Known Issues
*Unless otherwise stated, everything here is planned to be fixed in later releases*
- **This program only works with VTube Studio open**, and may refuse to run if it isn't open
- This tool currently expects you to run VTube Studio on the same PC as the tool, using the default port (8001)
- Revoking the plugin's token inside VTube Studio will cause the program to stop working and may require using devTools to fix
- Long names may not fit inside of buttons when the app is in full screen mode
- Connecting may take several seconds, and there may be delays between using hotkeys if the program is idle for a biy (this seems to be a problem with `ws`, but we are looking into fixes!)
- As mentioned before, this tool is currently only available for Windows

## Other Information
If you like this tool and would like to support the devs behind it, consider [donating](https://greys-dono.carrd.co/) or sharing the tool with others <3

Need help? Feel free to open an issue here or join our [support server](https://discord.gg/EvDmXGt) on Discord
