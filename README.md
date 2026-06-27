![VTS Deck Wordmark](https://cdn.selenated.com/img/ta5d0.png)

# VTS Deck
**VTS Deck**, or **VTube Studio Deck**,
is a third-party tool intended to make executing 
VTS hotkeys easier for folks who don't have access
to a proper stream deck.

This program runs entirely on your computer,
and requires you to have VTube Studio open for it to work!

## Requirements
1. **Latest release** of the tool
   - Visit the [releases page](https://github.com/greys-tools/vts-deck/releases) and download the `vtsdeck_[...]` file for your operating system
3. **VTube Studio**, a **Vtubing model**, and some **hotkeys** set up on it

## Getting Started
Getting the tool going is intended to be as easy and simple as possible:
1. Download latest release, linked above
2. Open up VTube Studio and check to make sure your model and hotkeys are set up
3. Open the tool by running the executable
   - This should automatically open a window with your default browser
4. Allow it to connect to VTS
   - Note: You'll need to authorize the connection in VTS the first time you run the program
4. Right click on any button and hit "edit", then fill out the configuration modal that comes up
5. Save your configuration, click the button, and watch your hotkeys activate!

## External Devices
If you'd like, you can also use this tool on an external device by running the
app on your PC and opening the browser interface on a separate phone, tablet, or computer.

You'll need to get your device's internal IP address ([guide](https://www.digicert.com/blog/how-can-i-find-out-my-ip-address)). Enter that into your device's browser, then add `:3000` at the end. It should usually look something like this: `http://192.169.0.1:3000`

Once you connect, it should work on your new device!

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
- Long names may not fit inside of buttons when the app is in full screen mode

## Other Information
If you like this tool and would like to support the devs behind it, consider [donating](https://selenated.carrd.co/#donate) or sharing the tool with others <3

Need help? Feel free to open an issue here or join our [support server](https://discord.gg/3y228CvJyQ) on Discord
