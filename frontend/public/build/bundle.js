var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function l(t){return"function"==typeof t}function r(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t){return null==t?"":t}function s(t,n){t.appendChild(n)}function i(t,n,e){t.insertBefore(n,e||null)}function a(t){t.parentNode&&t.parentNode.removeChild(t)}function u(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function d(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function p(){return f(" ")}function m(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function h(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function g(t,n){n=""+n,t.data!==n&&(t.data=n)}function $(t,n){t.value=null==n?"":n}let v;function b(t){v=t}function k(t){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(t)}const y=[],x=[];let w=[];const _=[],E=Promise.resolve();let C=!1;function L(t){w.push(t)}const P=new Set;let S=0;function A(){if(0!==S)return;const t=v;do{try{for(;S<y.length;){const t=y[S];S++,b(t),j(t.$$)}}catch(t){throw y.length=0,S=0,t}for(b(null),y.length=0,S=0;x.length;)x.pop()();for(let t=0;t<w.length;t+=1){const n=w[t];P.has(n)||(P.add(n),n())}w.length=0}while(y.length);for(;_.length;)_.pop()();C=!1,P.clear(),b(t)}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(L)}}const z=new Set;let M;function N(t,n){t&&t.i&&(z.delete(t),t.i(n))}function T(t,n,e,o){if(t&&t.o){if(z.has(t))return;z.add(t),M.c.push((()=>{z.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}else o&&o()}function U(t){t&&t.c()}function B(t,e,r,c){const{fragment:s,after_update:i}=t.$$;s&&s.m(e,r),c||L((()=>{const e=t.$$.on_mount.map(n).filter(l);t.$$.on_destroy?t.$$.on_destroy.push(...e):o(e),t.$$.on_mount=[]})),i.forEach(L)}function H(t,n){const e=t.$$;null!==e.fragment&&(!function(t){const n=[],e=[];w.forEach((o=>-1===t.indexOf(o)?n.push(o):e.push(o))),e.forEach((t=>t())),w=n}(e.after_update),o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function O(t,n){-1===t.$$.dirty[0]&&(y.push(t),C||(C=!0,E.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function q(n,l,r,c,s,i,u,d=[-1]){const f=v;b(n);const p=n.$$={fragment:null,ctx:[],props:i,update:t,not_equal:s,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(f?f.$$.context:[])),callbacks:e(),dirty:d,skip_bound:!1,root:l.target||f.$$.root};u&&u(p.root);let m=!1;if(p.ctx=r?r(n,l.props||{},((t,e,...o)=>{const l=o.length?o[0]:e;return p.ctx&&s(p.ctx[t],p.ctx[t]=l)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](l),m&&O(n,t)),e})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!c&&c(p.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);p.fragment&&p.fragment.l(t),t.forEach(a)}else p.fragment&&p.fragment.c();l.intro&&N(n.$$.fragment),B(n,l.target,l.anchor,l.customElement),A()}b(f)}class I{$destroy(){H(this,1),this.$destroy=t}$on(n,e){if(!l(e))return t;const o=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return o.push(e),()=>{const t=o.indexOf(e);-1!==t&&o.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const R=t=>({...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"});function F(n){let e;return{c(){e=d("footer"),e.innerHTML='<div class="copyright svelte-1ioxxtp">Copyright 2024 PoolShop</div>',h(e,"class","svelte-1ioxxtp")},m(t,n){i(t,e,n)},p:t,i:t,o:t,d(t){t&&a(e)}}}(t=>{const n=[];let e=R(t)})("undefined"!=typeof window&&"document"in window&&"location"in window?window:((t="/")=>{let n=0;const e=[{pathname:t,search:""}],o=[];return{get location(){return e[n]},addEventListener(t,n){},removeEventListener(t,n){},history:{get entries(){return e},get index(){return n},get state(){return o[n]},pushState(t,l,r){const[c,s=""]=r.split("?");n++,e.push({pathname:c,search:s}),o.push(t)},replaceState(t,l,r){const[c,s=""]=r.split("?");e[n]={pathname:c,search:s},o[n]=t}}}})());class V extends I{constructor(t){super(),q(this,t,null,F,r,{})}}function D(n){let e,l,r,c,u,g,$,v,b,k,y,x,w,_,E,C,L,P,S,A,j,z,M,N,T,U,B,H,O,q,I,R;return{c(){e=d("header"),l=d("div"),r=d("a"),r.innerHTML='<img src="" alt="PoolShop" class="logo img-fluid svelte-1tbin6k"/>',c=p(),u=d("div"),g=d("ul"),$=d("li"),v=d("a"),b=f("Inicio"),y=p(),x=d("li"),w=d("a"),_=f("Pools"),C=p(),L=d("li"),P=d("a"),S=f("Contacto"),j=p(),z=d("li"),M=d("a"),N=f("Perfil"),U=p(),B=d("li"),H=d("a"),O=f("Salir"),h(r,"class","navbar-brand svelte-1tbin6k"),h(r,"href","#home"),h(v,"class",k="nav-link "+("home"===n[0]?"active":"")+" svelte-1tbin6k"),h(v,"aria-current","page"),h(v,"href","#home"),h($,"class","nav-item"),h(w,"class",E="nav-link "+("about"===n[0]?"active":"")+" svelte-1tbin6k"),h(w,"href","#about"),h(x,"class","nav-item"),h(P,"class",A="nav-link "+("contact"===n[0]?"active":"")+" svelte-1tbin6k"),h(P,"href","#contact"),h(L,"class","nav-item"),h(M,"class",T="nav-link "+("perfil"===n[0]?"active":"")+" svelte-1tbin6k"),h(M,"href","#perfil"),h(z,"class","nav-item"),h(H,"class",q="nav-link "+("logout"===n[0]?"active":"")+" svelte-1tbin6k"),h(H,"href","#logout"),h(B,"class","nav-item"),h(g,"class","navbar-nav ml-auto svelte-1tbin6k"),h(u,"class","navbar-collapse"),h(l,"class","container d-flex justify-content-between align-items-center"),h(e,"class","navbar navbar-expand-lg navbar-dark bg-dark fixed-top header svelte-1tbin6k")},m(t,o){i(t,e,o),s(e,l),s(l,r),s(l,c),s(l,u),s(u,g),s(g,$),s($,v),s(v,b),s(g,y),s(g,x),s(x,w),s(w,_),s(g,C),s(g,L),s(L,P),s(P,S),s(g,j),s(g,z),s(z,M),s(M,N),s(g,U),s(g,B),s(B,H),s(H,O),I||(R=[m(v,"click",n[2]),m(w,"click",n[3]),m(P,"click",n[4]),m(M,"click",n[5]),m(H,"click",n[6])],I=!0)},p(t,[n]){1&n&&k!==(k="nav-link "+("home"===t[0]?"active":"")+" svelte-1tbin6k")&&h(v,"class",k),1&n&&E!==(E="nav-link "+("about"===t[0]?"active":"")+" svelte-1tbin6k")&&h(w,"class",E),1&n&&A!==(A="nav-link "+("contact"===t[0]?"active":"")+" svelte-1tbin6k")&&h(P,"class",A),1&n&&T!==(T="nav-link "+("perfil"===t[0]?"active":"")+" svelte-1tbin6k")&&h(M,"class",T),1&n&&q!==(q="nav-link "+("logout"===t[0]?"active":"")+" svelte-1tbin6k")&&h(H,"class",q)},i:t,o:t,d(t){t&&a(e),I=!1,o(R)}}}function G(t,n,e){let o="home";function l(t){e(0,o=t)}return[o,l,()=>l("home"),()=>l("about"),()=>l("contact"),()=>l("perfil"),()=>l("logout")]}class J extends I{constructor(t){super(),q(this,t,G,D,r,{})}}function K(t,n,e){const o=t.slice();return o[8]=n[e],o}function Q(t,n,e){const o=t.slice();return o[11]=n[e],o}function W(t){let n;return{c(){n=d("div"),n.innerHTML='<div class="spinner-border" role="status"><span class="sr-only">Cargando...</span></div>',h(n,"class","text-center")},m(t,e){i(t,n,e)},d(t){t&&a(n)}}}function X(t){let n,e;return{c(){n=d("div"),e=f(t[5]),h(n,"class","alert alert-danger"),h(n,"role","alert")},m(t,o){i(t,n,o),s(n,e)},p(t,n){32&n&&g(e,t[5])},d(t){t&&a(n)}}}function Y(t){let n,e,o,l=t[2],r=[];for(let n=0;n<l.length;n+=1)r[n]=Z(Q(t,l,n));return{c(){n=d("h5"),n.textContent="Pools de Compras Abiertos",e=p(),o=d("ul");for(let t=0;t<r.length;t+=1)r[t].c();h(o,"class","list-group mb-3")},m(t,l){i(t,n,l),i(t,e,l),i(t,o,l);for(let t=0;t<r.length;t+=1)r[t]&&r[t].m(o,null)},p(t,n){if(4&n){let e;for(l=t[2],e=0;e<l.length;e+=1){const c=Q(t,l,e);r[e]?r[e].p(c,n):(r[e]=Z(c),r[e].c(),r[e].m(o,null))}for(;e<r.length;e+=1)r[e].d(1);r.length=l.length}},d(t){t&&a(n),t&&a(e),t&&a(o),u(r,t)}}}function Z(t){let n,e,o=t[11].name+"";return{c(){n=d("li"),e=f(o),h(n,"class","list-group-item")},m(t,o){i(t,n,o),s(n,e)},p(t,n){4&n&&o!==(o=t[11].name+"")&&g(e,o)},d(t){t&&a(n)}}}function tt(t){let n,e,o,l=t[3],r=[];for(let n=0;n<l.length;n+=1)r[n]=nt(K(t,l,n));return{c(){n=d("h5"),n.textContent="Usuarios",e=p(),o=d("ul");for(let t=0;t<r.length;t+=1)r[t].c();h(o,"class","list-group")},m(t,l){i(t,n,l),i(t,e,l),i(t,o,l);for(let t=0;t<r.length;t+=1)r[t]&&r[t].m(o,null)},p(t,n){if(8&n){let e;for(l=t[3],e=0;e<l.length;e+=1){const c=K(t,l,e);r[e]?r[e].p(c,n):(r[e]=nt(c),r[e].c(),r[e].m(o,null))}for(;e<r.length;e+=1)r[e].d(1);r.length=l.length}},d(t){t&&a(n),t&&a(e),t&&a(o),u(r,t)}}}function nt(t){let n,e,o=t[8].name+"";return{c(){n=d("li"),e=f(o),h(n,"class","list-group-item")},m(t,o){i(t,n,o),s(n,e)},p(t,n){8&n&&o!==(o=t[8].name+"")&&g(e,o)},d(t){t&&a(n)}}}function et(t){let n;return{c(){n=d("p"),n.textContent="No se encontraron resultados.",h(n,"class","text-muted")},m(t,e){i(t,n,e)},d(t){t&&a(n)}}}function ot(n){let e,l,r,c,u,f,g,v,b,k,y,x,w,_,E=n[4]&&W(),C=n[5]&&X(n),L=n[2].length>0&&Y(n),P=n[3].length>0&&tt(n),S=n[1]&&0===n[2].length&&0===n[3].length&&!n[4]&&et();return{c(){e=d("div"),l=d("div"),l.innerHTML='<h1 class="display-4 text-center mt-5">Bienvenido a Pool Shop</h1>',r=p(),c=d("div"),u=d("div"),f=d("input"),g=p(),E&&E.c(),v=p(),C&&C.c(),b=p(),k=d("div"),L&&L.c(),y=p(),P&&P.c(),x=p(),S&&S.c(),h(l,"class","row"),h(f,"class","form-control mb-3"),h(f,"type","text"),h(f,"placeholder",n[0]),h(u,"class","container mt-3"),h(c,"class","row"),h(e,"class","container")},m(t,o){i(t,e,o),s(e,l),s(e,r),s(e,c),s(c,u),s(u,f),$(f,n[1]),s(u,g),E&&E.m(u,null),s(u,v),C&&C.m(u,null),s(u,b),s(u,k),L&&L.m(k,null),s(k,y),P&&P.m(k,null),s(k,x),S&&S.m(k,null),w||(_=[m(f,"input",n[7]),m(f,"input",n[6])],w=!0)},p(t,[n]){1&n&&h(f,"placeholder",t[0]),2&n&&f.value!==t[1]&&$(f,t[1]),t[4]?E||(E=W(),E.c(),E.m(u,v)):E&&(E.d(1),E=null),t[5]?C?C.p(t,n):(C=X(t),C.c(),C.m(u,b)):C&&(C.d(1),C=null),t[2].length>0?L?L.p(t,n):(L=Y(t),L.c(),L.m(k,y)):L&&(L.d(1),L=null),t[3].length>0?P?P.p(t,n):(P=tt(t),P.c(),P.m(k,x)):P&&(P.d(1),P=null),t[1]&&0===t[2].length&&0===t[3].length&&!t[4]?S||(S=et(),S.c(),S.m(k,null)):S&&(S.d(1),S=null)},i:t,o:t,d(t){t&&a(e),E&&E.d(),C&&C.d(),L&&L.d(),P&&P.d(),S&&S.d(),w=!1,o(_)}}}function lt(t,n,e){let{placeholder:o="Buscar..."}=n,l="",r=[],c=[],s=!1,i="";async function a(){if(""===l.trim())return e(2,r=[]),void e(3,c=[]);e(4,s=!0),e(5,i="");try{const t=await fetch(`https://api.example.com/pools?search=${encodeURIComponent(l)}`);if(!t.ok)throw new Error("Error al cargar los pools de compras");const n=await t.json(),o=await fetch(`https://api.example.com/users?search=${encodeURIComponent(l)}`);if(!o.ok)throw new Error("Error al cargar los usuarios");const s=await o.json();e(2,r=n),e(3,c=s)}catch(t){e(5,i=t.message)}finally{e(4,s=!1)}}return k((()=>{a()})),t.$$set=t=>{"placeholder"in t&&e(0,o=t.placeholder)},[o,l,r,c,s,i,a,function(){l=this.value,e(1,l)}]}class rt extends I{constructor(t){super(),q(this,t,lt,ot,r,{placeholder:0})}}function ct(t){let n,e,o;return{c(){n=d("div"),e=d("i"),h(e,"class",o=c(t[2])+" svelte-1nzb274"),h(n,"class","mb-3")},m(t,o){i(t,n,o),s(n,e)},p(t,n){4&n&&o!==(o=c(t[2])+" svelte-1nzb274")&&h(e,"class",o)},d(t){t&&a(n)}}}function st(n){let e,o,r,c,u,$,v,b,k,y,x,w,_,E=n[2]&&ct(n);return{c(){e=d("div"),o=d("div"),E&&E.c(),r=p(),c=d("h5"),u=f(n[0]),$=p(),v=d("p"),b=f(n[1]),k=p(),y=d("button"),x=f(n[3]),h(c,"class","card-titulo"),h(v,"class","card-text"),h(y,"class","btn btn-secondary"),h(o,"class","card-body"),h(e,"class","card text-center svelte-1nzb274")},m(t,a){i(t,e,a),s(e,o),E&&E.m(o,null),s(o,r),s(o,c),s(c,u),s(o,$),s(o,v),s(v,b),s(o,k),s(o,y),s(y,x),w||(_=m(y,"click",(function(){l(n[4])&&n[4].apply(this,arguments)})),w=!0)},p(t,[e]){(n=t)[2]?E?E.p(n,e):(E=ct(n),E.c(),E.m(o,r)):E&&(E.d(1),E=null),1&e&&g(u,n[0]),2&e&&g(b,n[1]),8&e&&g(x,n[3])},i:t,o:t,d(t){t&&a(e),E&&E.d(),w=!1,_()}}}function it(t,n,e){let{titulo:o=""}=n,{descripcion:l=""}=n,{icon:r=""}=n,{actionLabel:c=""}=n,{actionClick:s=""}=n;return t.$$set=t=>{"titulo"in t&&e(0,o=t.titulo),"descripcion"in t&&e(1,l=t.descripcion),"icon"in t&&e(2,r=t.icon),"actionLabel"in t&&e(3,c=t.actionLabel),"actionClick"in t&&e(4,s=t.actionClick)},[o,l,r,c,s]}class at extends I{constructor(t){super(),q(this,t,it,st,r,{titulo:0,descripcion:1,icon:2,actionLabel:3,actionClick:4})}}function ut(n){let e,o,l,r,c,u,f,m,g,$,v,b,k,y,x,w;return c=new rt({}),g=new at({props:{titulo:"Cree nuevo pool de compra",descripcion:"Empiece creando su propio Pool de compra",actionLabel:"Crear pool"}}),b=new at({props:{titulo:"Unase a un grupos existentes",descripcion:"Busque grupos basados en su ubicación",actionLabel:"Unirse a un grupo"}}),x=new at({props:{titulo:"Administre sus grupos",descripcion:"Vea y administre los creados o que pertenezca",actionLabel:"Administrar grupos"}}),{c(){e=d("main"),o=d("div"),l=d("div"),r=d("div"),U(c.$$.fragment),u=p(),f=d("div"),m=d("div"),U(g.$$.fragment),$=p(),v=d("div"),U(b.$$.fragment),k=p(),y=d("div"),U(x.$$.fragment),h(r,"class","col"),h(l,"class","row"),h(m,"class","col-md-4"),h(v,"class","col-md-4"),h(y,"class","col-md-4"),h(f,"class","row"),h(o,"class","container")},m(t,n){i(t,e,n),s(e,o),s(o,l),s(l,r),B(c,r,null),s(o,u),s(o,f),s(f,m),B(g,m,null),s(f,$),s(f,v),B(b,v,null),s(f,k),s(f,y),B(x,y,null),w=!0},p:t,i(t){w||(N(c.$$.fragment,t),N(g.$$.fragment,t),N(b.$$.fragment,t),N(x.$$.fragment,t),w=!0)},o(t){T(c.$$.fragment,t),T(g.$$.fragment,t),T(b.$$.fragment,t),T(x.$$.fragment,t),w=!1},d(t){t&&a(e),H(c),H(g),H(b),H(x)}}}class dt extends I{constructor(t){super(),q(this,t,null,ut,r,{})}}function ft(n){let e,o,l,r,c,u,f,m,g,$,v;return o=new J({}),u=new dt({}),$=new V({}),{c(){e=d("main"),U(o.$$.fragment),l=p(),r=d("br"),c=p(),U(u.$$.fragment),f=p(),m=d("br"),g=p(),U($.$$.fragment),h(e,"class","svelte-1ik7tgs")},m(t,n){i(t,e,n),B(o,e,null),s(e,l),s(e,r),s(e,c),B(u,e,null),s(e,f),s(e,m),s(e,g),B($,e,null),v=!0},p:t,i(t){v||(N(o.$$.fragment,t),N(u.$$.fragment,t),N($.$$.fragment,t),v=!0)},o(t){T(o.$$.fragment,t),T(u.$$.fragment,t),T($.$$.fragment,t),v=!1},d(t){t&&a(e),H(o),H(u),H($)}}}return new class extends I{constructor(t){super(),q(this,t,null,ft,r,{})}}({target:document.body,props:{name:"world"}})}();
