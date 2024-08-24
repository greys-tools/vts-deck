import { writable } from 'svelte/store';

export const editMode = writable(false);

export const update = (value) => {
	editMode.update(() => value);
	return value;
}