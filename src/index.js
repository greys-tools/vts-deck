import 'dotenv/config';
import WebSocket, { WebSocketServer } from 'ws';
import fs from 'fs';
import * as Utils from './utils.js';

const ws = new WebSocket(process.env.WS_URL);
const wss = new WebSocketServer({ port: 8002 });

const pluginName = process.env.PLUGIN_NAME;
const pluginDeveloper = process.env.PLUGIN_DEVELOPER;
const iconFile = './icon.png';
const pluginIcon = fs.readFileSync(iconFile).toString('base64');

ws.on('error', console.error);

ws.on('open', async () => {
	var resp = await Utils.auth(ws, { pluginName, pluginDeveloper, pluginIcon });
	console.log(resp);
})

// ws.on('message', console.log);