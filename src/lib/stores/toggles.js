import { writable } from 'svelte/store';

let tmp = new Map();
export const toggles = writable(tmp);

export const update = (item, value) => {
	toggles.update((st) => {
		st.set(item, value);
		return st;
	});
}