import Hotkey from "../structures/Hotkey.js";

export default class HotkeyManager {
	constructor(client, model) {
		this.client = client;
		this.model = model;

		this.mapped = new Map();
	}

	async getHotkeys(model, force) {
		if(this.client.debug) console.log(`[debug] Fetching hotkeys for model ${model ?? 'current'}`);
		var existing = this.mapped.get(model ?? this.model);
		if(!force && existing) return existing;

		let reqID = await this.client.sendRequest('get-hotkeys', { modelID: model ?? null });
		let msg = await this.client.awaitMessage(reqID);
		
		let { modelID, modelName, availableHotkeys: hk } = msg.data;
		let keys = hk.map(h => {
			let { name, type, description, file, hotkeyID: id, keyCombination: keyCombo, onScreenButtonID: onScreen } = h;
			return [id, new Hotkey(this.client, this, {
				model: { modelID, modelName },
				name,
				type,
				description,
				file,
				id,
				keyCombo,
				onScreen
			})]
		});

		this.mapped.set(modelID, keys);
		return new Map(keys);
	}

	async sendHotkey(hotkey) {
		if(this.client.debug) console.log(`[debug] Executing hotkey ${hotkey}`);
		var reqID = await this.client.sendRequest('send-hotkeys', { hotkeyID: hotkey });

		var resp = await this.client.awaitMessage(reqID);
		return resp;
	}
}