require('dotenv').config();
const { app: App, BrowserWindow } = require('electron');
const express = require('express');

async function setup() {
  const { handler } = await import('./build/handler.js');

  const app = express();

  const PORT = process.env.PORT ?? 3000;

  app.use(handler);
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
  console.log('API: ' + process.env.API);


  const createWindow = () => {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: true
      },
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#1f2937',
        symbolColor: '#74b1be',
        height: 60
      }
    })

    win.loadURL(`http://localhost:${PORT}`)
  }

  App.whenReady().then(() => {
    createWindow()
  })
}

setup();