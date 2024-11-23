export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/(authed)/crearpoolshop": [~3],
		"/crearusuario": [9],
		"/(authed)/detallePoolCreado/[id]": [~4],
		"/login": [10],
		"/(authed)/mispools": [~5],
		"/mispools/[id]": [~11],
		"/(authed)/perfil": [6],
		"/(authed)/principal": [7],
		"/(authed)/verpool/[id]": [~8]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';