export default class Hotkey {
	constructor(client, manager, data = {}) {
		this.client = client;
		this.manager = manager;

		this.model = data.model;
		this.name = data.name;
		this.type = data.type;
		this.description = data.description;
		this.file = data.file;
		this.id = data.id;
		this.keyCombo = data.keyCombo;
		this.onScreen = data.onScreen;
	}

	async execute() {
		if(this.client.debug) console.log(`[debug] Executing hotkey ${this.id}`);
		let reqID = await this.client.sendRequest('send-hotkeys', {
			hotkeyID: this.id
		})

		let resp = await this.client.awaitMessage(reqID);
		return resp;
	}
}