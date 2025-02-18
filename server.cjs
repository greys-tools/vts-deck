require('dotenv').config();
const path = require('path');
const {
  app: App,
  BrowserWindow,
  ipcMain,
  shell,
  session
} = require('electron');
const express = require('express');

async function setup() {
  const { handler } = await import('./build/handler.js');

  const app = express();

  const PORT = process.env.PORT ?? 3000;

  app.use(handler);
  app.listen(PORT);

  const createWindow = () => {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.cjs')
      },
      frame: false
    })

    const handleWindow = ({ url }) => {
      if (!url.includes('localhost')) {
        shell.openExternal(url);
        return { action: 'deny' };
      }
    }

    session.defaultSession.cookies.on('change', () => session.defaultSession.cookies.flushStore());

    win.webContents.setWindowOpenHandler(handleWindow);
    win.loadURL(`http://localhost:${PORT}`);
  }

  App.whenReady().then(() => {
    ipcMain.on('minimize', () => {
      let curwindow = BrowserWindow.getFocusedWindow();
      curwindow.minimize();
    })

    ipcMain.on('maximize', () => {
      let curwindow = BrowserWindow.getFocusedWindow();
      if(curwindow.isMaximized()) curwindow.unmaximize();
      else curwindow.maximize();
    })

    ipcMain.on('close', () => {
      let curwindow = BrowserWindow.getFocusedWindow();
      curwindow.close();
    })

    createWindow()
  })
}

setup();