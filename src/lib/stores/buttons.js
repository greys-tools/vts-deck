import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

let tmp = new Map();
if(browser) {
	if(('buttons' in localStorage)) {
		var item = localStorage.getItem('buttons')
		var data = JSON.parse(item);
		console.log(data);
		for(var k in data) {
			tmp.set(k, data[k]);
		}
	}
}

export const buttons = writable(tmp);

export const update = (item, value) => {
	buttons.update((st) => {
		st.set(item, value);
		return st;
	});

	if(browser) localStorage.setItem('buttons', JSON.stringify(toJSON(get(buttons))));
}

export const remove = (item) => {
	buttons.update((st) => {
		st.delete(item);
		return st;
	});

	if(browser) localStorage.setItem('buttons', JSON.stringify(toJSON(get(buttons))));
}

const toJSON = (map) => {
	let obj = {};
	for(var [k, v] of map) {
		obj[k] = v;
	}
	return obj;
}