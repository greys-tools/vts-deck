import { readFileSync } from 'fs';

import * as Constants from '$lib/constants';
import HotkeyManager from '$lib/plugin/managers/HotkeyManager';

const sleep = async (ms = 500) => {
	return new Promise(res => {
		setTimeout(() => res(), ms)
	})
}

export default class PluginClient {
	constructor(ws, data = { apiVersion: "1.0", apiName: "VTubeStudioPublicAPI" }) {
		this.ws = ws;
		this.apiVersion = data.apiVersion;
		this.apiName = data.apiName;
		this.debug = data.debug ?? false;

		this.pluginIcon = data.pluginIcon;
		this.pluginName = data.pluginName;
		this.pluginDeveloper = data.pluginDeveloper;

		this.token = data.token;

		this.hotkeys = new HotkeyManager(this);

		this.ws.on('open', async () => {
			this.open = true;

			this.ws.on('authed', () => clearTimeout(this.reconnect));
			await this.connect();
		})
	}

	async connect() {
		console.log('Attempting connection...');
		if(this.ready) clearTimeout(this.reconnect);
		try {
			await this.auth();
		} catch(e) {
			console.log(e)
			console.error("Couldn't connect plugin client: ", e);
			this.reconnect = setTimeout(async () => await this.connect(), 5_000);
			return;
		}

		console.log("Plugin connected.");
		clearTimeout(this.reconnect)
		this.ws.emit('ready');
	}

	async auth() {
		let data = {
			pluginIcon: this.pluginIcon,
			pluginName: this.pluginName,
			pluginDeveloper: this.pluginDeveloper
		}

		let reqID, msg;
		let token = this.token || undefined;
		if(this.debug) console.log('token: ', token);

		if(!token?.length) {
			reqID = await this.sendRequest('auth-token', data);
			msg = await this.awaitMessage(reqID);
			if(this.debug) console.log(`[debug] Auth message: `, msg);
			token = msg.data.authenticationToken;
		}

		reqID = await this.sendRequest('auth', {
			...data,
			'authenticationToken': token
		})
		msg = await this.awaitMessage(reqID);
		
		if(!msg.data.authenticated) {
			this.token = undefined;
			this.ready = false;
			return Promise.reject({ success: false, reason: msg.data.message });
		} else {
			this.token = token;
			this.ready = true;
			this.ws.emit('authed', { token });
			return { success: true, token };
		}
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

				if(this.debug) console.log(`[debug] Received message with ID ${id}:\n`, msg);
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