import {
	PLUGIN_DEVELOPER as pluginDeveloper,
	PLUGIN_NAME as pluginName 
} from '$env/static/private';
import WebSocket from 'ws';
import PluginClient from '$lib/plugin/client';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as Constants from '$lib/constants';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ws = new WebSocket('ws://0.0.0.0:8001');
const client = new PluginClient(ws, {
	apiVersion: Constants.apiVersion,
	apiName: Constants.apiName,
	pluginDeveloper,
	pluginName,
	pluginIcon: `${__dirname}/../../icon.png`,
	debug: true
});

export default client;