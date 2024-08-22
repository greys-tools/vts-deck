import * as Constants from './constants.js';

export const auth = async (ws, data) => {
	let reqID = await sendRequest(ws, 'auth-token', data);
	let msg = await awaitMessage(ws, reqID);
	let token = msg.data.authenticationToken;

	reqID = await sendRequest(ws, 'auth', {
		...data,
		'authenticationToken': token
	})
	msg = await awaitMessage(ws, reqID);
	
	if(msg.data.authenticated) return { success: true, token };
	else return { success: false, reason: msg.data.reason };
}

export const randomID = (len = 5) => {
	var str = (Math.random() + 1).toString(36).slice(2, len + 2);
	return str;
}

export const decodeMessage = (msg) => {
	msg = JSON.parse(msg.toString('utf8'));
	return msg;
}

export const awaitMessage = async (ws, id, timeout = 60_000) => {
	return new Promise((res, rej) => {
		const messageHandler = async (msg) => {
			msg = decodeMessage(msg);
			if(msg.requestID !== id) return;

			return res(msg);
		}

		ws.on('message', messageHandler);
		setTimeout(() => {
			ws.removeEventListener('message', messageHandler)
			return rej({ error: 'Timed out.' })
		}, timeout);
	})
}

export const sendRequest = async (ws, type, data) => {
	let requestID = randomID();
	ws.send(JSON.stringify({
		apiName: Constants.apiName,
		apiVersion: Constants.apiVersion,
		requestID,
		messageType: Constants.MessageTypes[type],
		data
	}))
	return requestID;
}