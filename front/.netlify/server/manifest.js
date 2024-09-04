export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","img/LogoPS-2.png","img/LogoPS.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DXOiy8Vd.js","app":"_app/immutable/entry/app.Dq5GQPSx.js","imports":["_app/immutable/entry/start.DXOiy8Vd.js","_app/immutable/chunks/entry.C3Orlwji.js","_app/immutable/chunks/scheduler.Uhcmbk6i.js","_app/immutable/entry/app.Dq5GQPSx.js","_app/immutable/chunks/scheduler.Uhcmbk6i.js","_app/immutable/chunks/index.CzQM9D2z.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
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
})();
