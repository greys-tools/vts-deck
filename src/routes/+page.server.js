import { fail } from '@sveltejs/kit';
import client from '$lib/client';

export async function load({ cookies, fetch, locals }) {
	if(!client.ready) return { waiting: true };

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
		const ids = data.getAll('id');
		console.log(ids);

		for(var id of ids) {
			await client.hotkeys.sendHotkey(id);
		}
	}
}