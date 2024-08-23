import { fail } from '@sveltejs/kit';
import client from '$lib/client';

export async function load({ cookies, fetch, locals }) {
	if(!client.ready) await client.awaitReady();
	var hotkeys = await client.hotkeys.getHotkeys();
	hotkeys = Array.from(hotkeys).map(([id, h]) => {
		let { client, manager, ...rest } = h;
		return rest;
	})
	return { hotkeys }
}

export const actions = {
	send: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const id = data.get('id');
		console.log(name, id);

		await client.hotkeys.sendHotkey(id);
	}
}