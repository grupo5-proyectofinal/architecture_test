import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DowA2g3m.js","app":"_app/immutable/entry/app.bcmy4EBL.js","imports":["_app/immutable/entry/start.DowA2g3m.js","_app/immutable/chunks/entry.Ci3lCyAb.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/entry/app.bcmy4EBL.js","_app/immutable/chunks/scheduler.BWih1DpW.js","_app/immutable/chunks/index.Ae5gyTAO.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/crearpoolshop",
				pattern: /^\/crearpoolshop\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/perfil",
				pattern: /^\/perfil\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
