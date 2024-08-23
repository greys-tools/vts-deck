import { readFileSync } from 'fs';

import * as Constants from '$lib/constants';
import HotkeyManager from '$lib/plugin/managers/HotkeyManager';

import {
	PLUGIN_NAME as pluginName,
	PLUGIN_DEVELOPER as pluginDeveloper
} from '$env/static/private';

export default class PluginClient {
	constructor(ws, data = { apiVersion: "1.0", apiName: "VTubeStudioPublicAPI" }) {
		this.ws = ws;
		this.apiVersion = data.apiVersion;
		this.apiName = data.apiName;
		this.debug = data.debug ?? false;

		// this.pluginIcon = readFileSync(data.pluginIcon).toString('base64');
		this.pluginName = data.pluginName ?? pluginName;
		this.pluginDeveloper = data.pluginDeveloper ?? pluginDeveloper;

		this.hotkeys = new HotkeyManager(this);

		this.ws.on('open', async () => {
			this.open = true;
			await this.auth()
			.then(() => console.log('Plugin client connected.'))
			.catch(e => console.error("Couldn't connect plugin client: ", e));
		})
	}

	async auth() {
		if(this.token) return;
		let data = {
			pluginIcon: this.pluginIcon,
			pluginName: this.pluginName,
			pluginDeveloper: this.pluginDeveloper
		}
		let reqID = await this.sendRequest('auth-token', data);
		let msg = await this.awaitMessage(reqID);
		let token = msg.data.authenticationToken;

		reqID = await this.sendRequest('auth', {
			...data,
			'authenticationToken': token
		})
		msg = await this.awaitMessage(reqID);
		
		this.token = token;
		this.ready = true;
		this.ws.emit('authed', { token });
		if(msg.data.authenticated) return { success: true, token };
		else return { success: false, reason: msg.data.reason };
	}

	randomID(len = 5) {
		var str = (Math.random() + 1).toString(36).slice(2, len + 2);
		return str;
	}

	decodeMessage(msg) {
		msg = JSON.parse(msg.toString('utf8'));
		return msg;
	}

	async sendRequest(type, data) {
		let requestID = this.randomID();
		if(this.debug) console.log(`[debug] Sending message with ID ${requestID}`);
		this.ws.send(JSON.stringify({
			apiName: this.apiName,
			apiVersion: this.apiVersion,
			requestID,
			messageType: Constants.MessageTypes[type],
			data
		}))
		return requestID;
	}

	async awaitMessage(id, timeout = 60_000) {
		if(this.debug) console.log(`[debug] Awaiting message with ID ${id}`);
		return new Promise((res, rej) => {
			const messageHandler = async (msg) => {
				msg = this.decodeMessage(msg);
				if(msg.requestID !== id) return;

				if(this.debug) console.log(`[debug] Received message with ID ${id}`);
				this.ws.removeListener('message', messageHandler);
				this.ws.removeEventListener('message', messageHandler);
				clearTimeout(tm);
				return res(msg);
			}

			this.ws.on('message', messageHandler);
			let tm = setTimeout(() => {
				if(this.debug) console.log(`[debug] Message listener timed out while listening for message with ID ${id}`);
				this.ws.removeListener('message', messageHandler)
				this.ws.removeEventListener('message', messageHandler)
				return rej({ error: 'Timed out.' })
			}, timeout);
		})
	}

	async awaitReady() {
		if(this.ready) return true;
		return new Promise((res) => {
			this.ws.once('authed', () => res());
		})
	}
}