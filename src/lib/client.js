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
let client; 

const init = (token) => {
	client = new PluginClient(ws, {
		token,
		apiVersion,
		apiName,
		pluginDeveloper,
		pluginName,
		pluginIcon,
		debug: false
	});
}

export { client, init };