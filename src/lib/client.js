import WebSocket from 'ws';
import PluginClient from '$lib/plugin/client';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import {
	apiVersion,
	apiName,
	pluginDeveloper,
	pluginName,
	pluginIcon,
	wsUrl,
} from '$lib/constants';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ws = new WebSocket(wsUrl);
const client = new PluginClient(ws, {
	apiVersion,
	apiName,
	pluginDeveloper,
	pluginName,
	pluginIcon,
	debug: true
});

export default client;