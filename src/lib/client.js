import WebSocket from 'ws';
import PluginClient from '$lib/plugin/client';

import {
	apiVersion,
	apiName,
	pluginDeveloper,
	pluginName,
	pluginIcon,
	wsUrl,
} from '$lib/constants';

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