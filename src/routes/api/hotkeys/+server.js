import { fail, json } from '@sveltejs/kit';
import client from '$lib/client';

export async function GET({ request }) {
	var hotkeys = await client.hotkeys.getHotkeys();
	return json(hotkeys);
}