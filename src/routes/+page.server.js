import { fail } from '@sveltejs/kit';
import { client, init } from '$lib/client';

export async function load({ cookies, fetch, locals }) {
	let token = cookies.get('token');

	if(!client) init(token);
	if(!client.ready) return { verified: !!token, waiting: true };
	if(!token) cookies.set('token', client.token, { path: '/' });

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