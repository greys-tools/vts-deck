// maps slots to buttons
// to allow for easier drag n drop/movement

import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

let tmp = new Map();
if(browser) {
	if(('slots' in localStorage)) {
		var item = localStorage.getItem('slots')
		var data = JSON.parse(item);
		for(var k in data) {
			tmp.set(k, data[k]);
		}
	}
}

export const slots = writable(tmp);
console.log('slots: ', get(slots));

export const update = (item, value) => {
	slots.update((st) => {
		st.set(item, value);
		return st;
	});

	if(browser) localStorage.setItem('slots', JSON.stringify(toJSON(get(slots))));
}

export const swap = (item1, item2) => {
	slots.update((st) => {
		let tmp1 = st.get(item1) + '',
			tmp2 = st.get(item2) + '';

		st.set(item1, tmp2);
		st.set(item2, tmp1);
		return st;
	});

	if(browser) localStorage.setItem('slots', JSON.stringify(toJSON(get(slots))));
}

export const remove = (item) => {
	slots.update((st) => {
		st.delete(item);
		return st;
	});

	if(browser) localStorage.setItem('slots', JSON.stringify(toJSON(get(slots))));
}

const toJSON = (map) => {
	let obj = {};
	for(var [k, v] of map) {
		obj[k] = v;
	}
	return obj;
}