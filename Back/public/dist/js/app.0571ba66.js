(function(e){function t(t){for(var r,a,i=t[0],l=t[1],c=t[2],s=0,f=[];s<i.length;s++)a=i[s],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(t);while(f.length)f.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(u.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},a={app:0},o={app:0},u=[];function i(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"4a8051cd"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={about:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"0694bd82"}[e]+".css",o=l.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var c=u[i],s=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(s===r||s===o))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){c=f[i],s=c.getAttribute("data-href");if(s===r||s===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],d.parentNode.removeChild(d),n(u)},d.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=i(e);var f=new Error;c=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var d=s;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("becf"),n("cabf"),n("3c76");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Navbar"),n("router-view")],1)},o=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[n("b-navbar-brand",{attrs:{href:"#"}},[e._v("Angel E-Shop")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/agregar-cliente",exact:""}},[e._v("Agregar Cliente")]),n("b-nav-item",{attrs:{to:"/cobranza"}},[e._v("Cobranza")]),n("b-nav-item",{attrs:{to:"/inventario"}},[e._v("Inventario")]),n("b-nav-item",{attrs:{to:"/historial-de-venta"}},[e._v("Historial de Venta")]),n("b-nav-item",[e._v("Ingresos")]),n("b-nav-item",{attrs:{to:"/gastos"}},[e._v("Gastos")])],1)],1)],1)],1)},i=[],l={name:"Navbar"},c=l,s=n("2877"),f=Object(s["a"])(c,u,i,!1,null,null,null),d=f.exports,p={name:"app",components:{Navbar:d}},b=p,v=(n("034f"),Object(s["a"])(b,a,o,!1,null,null,null)),h=v.exports,m=(n("d3b7"),n("8c4f"));r["default"].use(m["a"]);var g=[{path:"/login",name:"InicioSesion",component:function(){return n.e("about").then(n.bind(null,"dd7b"))}},{path:"/",name:"Registro",component:function(){return n.e("about").then(n.bind(null,"7803"))}},{path:"/cobranza",name:"Cobranza",component:function(){return n.e("about").then(n.bind(null,"664d"))}},{path:"/agregar-cliente",name:"AgregarCliente",component:function(){return n.e("about").then(n.bind(null,"191e"))}},{path:"/historial-de-venta",name:"HistorialDeVenta",component:function(){return n.e("about").then(n.bind(null,"98d3"))}},{path:"/inventario",name:"Inventario",component:function(){return n.e("about").then(n.bind(null,"2020"))}},{path:"/gastos",name:"Gastos",component:function(){return n.e("about").then(n.bind(null,"b88c"))}}],y=new m["a"]({mode:"history",base:"/",routes:g}),w=y,_=n("2f62");r["default"].use(_["a"]);var O=new _["a"].Store({state:{},mutations:{},actions:{},modules:{}}),j=n("5f5b"),C=n("b1e0"),E=n("bc3a"),S=n.n(E),x=(n("f9e3"),n("2dd8"),n("6838")),P=n.n(x);r["default"].use(j["a"]),r["default"].use(C["a"]),r["default"].use(P.a),S.a.defaults.withCredentials=!0,r["default"].config.productionTip=!1,new r["default"]({router:w,store:O,render:function(e){return e(h)}}).$mount("#app")},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.0571ba66.js.map