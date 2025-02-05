import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

let tmp = new Map();
if(browser) {
	if(('settings' in localStorage)) {
		var item = localStorage.getItem('settings')
		var data = JSON.parse(item);
		for(var k in data) {
			tmp.set(k, data[k]);
		}
	}
}

export const settings = writable(tmp);

export const update = (setting, value) => {
	settings.update((st) => {
		st.set(setting, value);
		return st;
	});
	
	if(browser) localStorage.setItem('settings', JSON.stringify(toJSON(get(settings))));
	if(setting == 'theme') handleThemeChange(get(settings));
}

const toJSON = (map) => {
	let obj = {};
	for(var [k, v] of map) {
		obj[k] = v;
	}
	return obj;
}

const handleThemeChange = (val) => {
	if(!browser) return;
	var prefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
	var theme = val.get('theme');
	if(theme == 'dark' || (theme == "system" && prefer)) window.document.documentElement.classList.add('dark');
	else if(theme == 'light' || (theme == "system" && !prefer)) window.document.documentElement.classList.remove('dark');
}