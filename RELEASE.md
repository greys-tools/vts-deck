Heya, it's been a while! We're back with a quick update: we've set things up so that the program
can now be built to run on all platforms (theoretically), with it using your default browser
for the interface!

Previously, this package was built only for Windows and used Electron. This wasn't really
ideal, so we've changed that up. Now, we're building everything with Deno and letting the
user opt for their favorite browser as a means of interfacing with the tool

This also makes it easier for folks to connect to it via an outside device, like
your phone! Before, you'd have to manually install Node and run some commands. Now,
you can just grab your internal IP address (see the readme for how) and it should just work

That's all for now! Hopefully nothing breaks <3