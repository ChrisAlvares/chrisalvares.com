/*
 RequireJS 2.1.10 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(c){function d(a){return"[object Function]"===N.call(a)}function a(a){return"[object Array]"===N.call(a)}function e(a,c){if(a){var e;for(e=0;e<a.length&&(!a[e]||!c(a[e],e,a));e+=1);}}function f(a,c){if(a){var e;for(e=a.length-1;-1<e&&(!a[e]||!c(a[e],e,a));e-=1);}}function k(a,e){return ea.call(a,e)}function g(a,e){return k(a,e)&&a[e]}function z(a,e){for(var c in a)if(k(a,c)&&e(a[c],c))break}function r(e,c,f,g){c&&z(c,function(c,p){if(f||!k(e,p))!g||"object"!==typeof c||!c||a(c)||d(c)||c instanceof
RegExp?e[p]=c:(e[p]||(e[p]={}),r(e[p],c,f,g))});return e}function y(a,e){return function(){return e.apply(a,arguments)}}function ba(a){throw a;}function ca(a){if(!a)return a;var d=c;e(a.split("."),function(a){d=d[a]});return d}function F(a,e,c,d){e=Error(e+"\nhttp://requirejs.org/docs/errors.html#"+a);e.requireType=a;e.requireModules=d;c&&(e.originalError=c);return e}function fa(n){function p(b,a,e){var h,c,d,f,n,p,m,k=a&&a.split("/");c=k;var s=q.map,l=s&&s["*"];if(b&&"."===b.charAt(0))if(a){c=k.slice(0,
k.length-1);b=b.split("/");a=b.length-1;q.nodeIdCompat&&Q.test(b[a])&&(b[a]=b[a].replace(Q,""));c=b=c.concat(b);f=c.length;for(a=0;a<f;a++)if(d=c[a],"."===d)c.splice(a,1),a-=1;else if(".."===d)if(1!==a||".."!==c[2]&&".."!==c[0])0<a&&(c.splice(a-1,2),a-=2);else break;b=b.join("/")}else 0===b.indexOf("./")&&(b=b.substring(2));if(e&&s&&(k||l)){c=b.split("/");a=c.length;a:for(;0<a;a-=1){f=c.slice(0,a).join("/");if(k)for(d=k.length;0<d;d-=1)if(e=g(s,k.slice(0,d).join("/")))if(e=g(e,f)){h=e;n=a;break a}!p&&
l&&g(l,f)&&(p=g(l,f),m=a)}!h&&p&&(h=p,n=m);h&&(c.splice(0,n,h),b=c.join("/"))}return(h=g(q.pkgs,b))?h:b}function $(b){D&&e(document.getElementsByTagName("script"),function(a){if(a.getAttribute("data-requiremodule")===b&&a.getAttribute("data-requirecontext")===m.contextName)return a.parentNode.removeChild(a),!0})}function s(b){var c=g(q.paths,b);if(c&&a(c)&&1<c.length)return c.shift(),m.require.undef(b),m.require([b]),!0}function aa(b){var a,c=b?b.indexOf("!"):-1;-1<c&&(a=b.substring(0,c),b=b.substring(c+
1,b.length));return[a,b]}function x(b,a,c,h){var e,d,f=null,n=a?a.name:null,k=b,s=!0,l="";b||(s=!1,b="_@r"+(N+=1));b=aa(b);f=b[0];b=b[1];f&&(f=p(f,n,h),d=g(v,f));b&&(f?l=d&&d.normalize?d.normalize(b,function(b){return p(b,n,h)}):p(b,n,h):(l=p(b,n,h),b=aa(l),f=b[0],l=b[1],c=!0,e=m.nameToUrl(l)));c=!f||d||c?"":"_unnormalized"+(P+=1);return{prefix:f,name:l,parentMap:a,unnormalized:!!c,url:e,originalName:k,isDefine:s,id:(f?f+"!"+l:l)+c}}function u(b){var a=b.id,c=g(t,a);c||(c=t[a]=new m.Module(b));return c}
function w(b,a,c){var h=b.id,e=g(t,h);if(!k(v,h)||e&&!e.defineEmitComplete)if(e=u(b),e.error&&"error"===a)c(e.error);else e.on(a,c);else"defined"===a&&c(v[h])}function A(b,a){var c=b.requireModules,h=!1;if(a)a(b);else if(e(c,function(a){if(a=g(t,a))a.error=b,a.events.error&&(h=!0,a.emit("error",b))}),!h)l.onError(b)}function B(){R.length&&(ga.apply(E,[E.length,0].concat(R)),R=[])}function C(b){delete t[b];delete T[b]}function I(b,a,c){var h=b.map.id;b.error?b.emit("error",b.error):(a[h]=!0,e(b.depMaps,
function(h,e){var d=h.id,f=g(t,d);!f||b.depMatched[e]||c[d]||(g(a,d)?(b.defineDep(e,v[d]),b.check()):I(f,a,c))}),c[h]=!0)}function G(){var b,a,c=(b=1E3*q.waitSeconds)&&m.startTime+b<(new Date).getTime(),h=[],d=[],f=!1,n=!0;if(!U){U=!0;z(T,function(b){var e=b.map,p=e.id;if(b.enabled&&(e.isDefine||d.push(b),!b.error))if(!b.inited&&c)s(p)?f=a=!0:(h.push(p),$(p));else if(!b.inited&&b.fetched&&e.isDefine&&(f=!0,!e.prefix))return n=!1});if(c&&h.length)return b=F("timeout","Load timeout for modules: "+h,
null,h),b.contextName=m.contextName,A(b);n&&e(d,function(b){I(b,{},{})});c&&!a||!f||!D&&!da||V||(V=setTimeout(function(){V=0;G()},50));U=!1}}function H(b){k(v,b[0])||u(x(b[0],null,!0)).init(b[1],b[2])}function L(b){b=b.currentTarget||b.srcElement;var a=m.onScriptLoad;b.detachEvent&&!W?b.detachEvent("onreadystatechange",a):b.removeEventListener("load",a,!1);a=m.onScriptError;b.detachEvent&&!W||b.removeEventListener("error",a,!1);return{node:b,id:b&&b.getAttribute("data-requiremodule")}}function M(){var b;
for(B();E.length;){b=E.shift();if(null===b[0])return A(F("mismatch","Mismatched anonymous define() module: "+b[b.length-1]));H(b)}}var U,X,m,J,V,q={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},t={},T={},Y={},E=[],v={},S={},Z={},N=1,P=1;J={require:function(b){return b.require?b.require:b.require=m.makeRequire(b.map)},exports:function(b){b.usingExports=!0;if(b.map.isDefine)return b.exports?b.exports:b.exports=v[b.map.id]={}},module:function(b){return b.module?b.module:b.module=
{id:b.map.id,uri:b.map.url,config:function(){return g(q.config,b.map.id)||{}},exports:J.exports(b)}}};X=function(b){this.events=g(Y,b.id)||{};this.map=b;this.shim=g(q.shim,b.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};X.prototype={init:function(b,a,c,h){h=h||{};if(!this.inited){this.factory=a;if(c)this.on("error",c);else this.events.error&&(c=y(this,function(b){this.emit("error",b)}));this.depMaps=b&&b.slice(0);this.errback=c;this.inited=!0;this.ignore=
h.ignore;h.enabled||this.enabled?this.enable():this.check()}},defineDep:function(b,a){this.depMatched[b]||(this.depMatched[b]=!0,this.depCount-=1,this.depExports[b]=a)},fetch:function(){if(!this.fetched){this.fetched=!0;m.startTime=(new Date).getTime();var b=this.map;if(this.shim)m.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],y(this,function(){return b.prefix?this.callPlugin():this.load()}));else return b.prefix?this.callPlugin():this.load()}},load:function(){var b=this.map.url;
S[b]||(S[b]=!0,m.load(this.map.id,b))},check:function(){if(this.enabled&&!this.enabling){var b,a,c=this.map.id;a=this.depExports;var h=this.exports,e=this.factory;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(d(e)){if(this.events.error&&this.map.isDefine||l.onError!==ba)try{h=m.execCb(c,e,a,h)}catch(f){b=f}else h=m.execCb(c,e,a,h);this.map.isDefine&&void 0===h&&((a=this.module)?h=a.exports:
this.usingExports&&(h=this.exports));if(b)return b.requireMap=this.map,b.requireModules=this.map.isDefine?[this.map.id]:null,b.requireType=this.map.isDefine?"define":"require",A(this.error=b)}else h=e;this.exports=h;if(this.map.isDefine&&!this.ignore&&(v[c]=h,l.onResourceLoad))l.onResourceLoad(m,this.map,this.depMaps);C(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}},callPlugin:function(){var b=
this.map,a=b.id,c=x(b.prefix);this.depMaps.push(c);w(c,"defined",y(this,function(c){var e,d;d=g(Z,this.map.id);var f=this.map.name,n=this.map.parentMap?this.map.parentMap.name:null,s=m.makeRequire(b.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(c.normalize&&(f=c.normalize(f,function(b){return p(b,n,!0)})||""),c=x(b.prefix+"!"+f,this.map.parentMap),w(c,"defined",y(this,function(b){this.init([],function(){return b},null,{enabled:!0,ignore:!0})})),d=g(t,c.id)){this.depMaps.push(c);
if(this.events.error)d.on("error",y(this,function(b){this.emit("error",b)}));d.enable()}}else d?(this.map.url=m.nameToUrl(d),this.load()):(e=y(this,function(b){this.init([],function(){return b},null,{enabled:!0})}),e.error=y(this,function(b){this.inited=!0;this.error=b;b.requireModules=[a];z(t,function(b){0===b.map.id.indexOf(a+"_unnormalized")&&C(b.map.id)});A(b)}),e.fromText=y(this,function(c,h){var d=b.name,f=x(d),n=O;h&&(c=h);n&&(O=!1);u(f);k(q.config,a)&&(q.config[d]=q.config[a]);try{l.exec(c)}catch(p){return A(F("fromtexteval",
"fromText eval for "+a+" failed: "+p,p,[a]))}n&&(O=!0);this.depMaps.push(f);m.completeLoad(d);s([d],e)}),c.load(b.name,s,e,q))}));m.enable(c,this);this.pluginMaps[c.id]=c},enable:function(){T[this.map.id]=this;this.enabling=this.enabled=!0;e(this.depMaps,y(this,function(b,a){var c,e;if("string"===typeof b){b=x(b,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[a]=b;if(c=g(J,b.id)){this.depExports[a]=c(this);return}this.depCount+=1;w(b,"defined",y(this,function(b){this.defineDep(a,
b);this.check()}));this.errback&&w(b,"error",y(this,this.errback))}c=b.id;e=t[c];k(J,c)||!e||e.enabled||m.enable(b,this)}));z(this.pluginMaps,y(this,function(b){var a=g(t,b.id);a&&!a.enabled&&m.enable(b,this)}));this.enabling=!1;this.check()},on:function(b,a){var c=this.events[b];c||(c=this.events[b]=[]);c.push(a)},emit:function(b,a){e(this.events[b],function(b){b(a)});"error"===b&&delete this.events[b]}};m={config:q,contextName:n,registry:t,defined:v,urlFetched:S,defQueue:E,Module:X,makeModuleMap:x,
nextTick:l.nextTick,onError:A,configure:function(b){b.baseUrl&&"/"!==b.baseUrl.charAt(b.baseUrl.length-1)&&(b.baseUrl+="/");var c=q.shim,d={paths:!0,bundles:!0,config:!0,map:!0};z(b,function(b,a){d[a]?(q[a]||(q[a]={}),r(q[a],b,!0,!0)):q[a]=b});b.bundles&&z(b.bundles,function(b,a){e(b,function(b){b!==a&&(Z[b]=a)})});b.shim&&(z(b.shim,function(b,e){a(b)&&(b={deps:b});!b.exports&&!b.init||b.exportsFn||(b.exportsFn=m.makeShimExports(b));c[e]=b}),q.shim=c);b.packages&&e(b.packages,function(b){var a;b=
"string"===typeof b?{name:b}:b;a=b.name;b.location&&(q.paths[a]=b.location);q.pkgs[a]=b.name+"/"+(b.main||"main").replace(ha,"").replace(Q,"")});z(t,function(b,a){b.inited||b.map.unnormalized||(b.map=x(a))});(b.deps||b.callback)&&m.require(b.deps||[],b.callback)},makeShimExports:function(b){return function(){var a;b.init&&(a=b.init.apply(c,arguments));return a||b.exports&&ca(b.exports)}},makeRequire:function(b,a){function c(e,f,p){var g,s;a.enableBuildCallback&&f&&d(f)&&(f.__requireJsBuild=!0);if("string"===
typeof e){if(d(f))return A(F("requireargs","Invalid require call"),p);if(b&&k(J,e))return J[e](t[b.id]);if(l.get)return l.get(m,e,b,c);g=x(e,b,!1,!0);g=g.id;return k(v,g)?v[g]:A(F("notloaded",'Module name "'+g+'" has not been loaded yet for context: '+n+(b?"":". Use require([])")))}M();m.nextTick(function(){M();s=u(x(null,b));s.skipMap=a.skipMap;s.init(e,f,p,{enabled:!0});G()});return c}a=a||{};r(c,{isBrowser:D,toUrl:function(a){var c,e=a.lastIndexOf("."),d=a.split("/")[0];-1!==e&&("."!==d&&".."!==
d||1<e)&&(c=a.substring(e,a.length),a=a.substring(0,e));return m.nameToUrl(p(a,b&&b.id,!0),c,!0)},defined:function(a){return k(v,x(a,b,!1,!0).id)},specified:function(a){a=x(a,b,!1,!0).id;return k(v,a)||k(t,a)}});b||(c.undef=function(a){B();var c=x(a,b,!0),e=g(t,a);$(a);delete v[a];delete S[c.url];delete Y[a];f(E,function(b,c){b[0]===a&&E.splice(c,1)});e&&(e.events.defined&&(Y[a]=e.events),C(a))});return c},enable:function(b){g(t,b.id)&&u(b).enable()},completeLoad:function(b){var a,c,e=g(q.shim,b)||
{},d=e.exports;for(B();E.length;){c=E.shift();if(null===c[0]){c[0]=b;if(a)break;a=!0}else c[0]===b&&(a=!0);H(c)}c=g(t,b);if(!a&&!k(v,b)&&c&&!c.inited)if(!q.enforceDefine||d&&ca(d))H([b,e.deps||[],e.exportsFn]);else return s(b)?void 0:A(F("nodefine","No define call for "+b,null,[b]));G()},nameToUrl:function(b,c,e){var d,f,n;(d=g(q.pkgs,b))&&(b=d);if(d=g(Z,b))return m.nameToUrl(d,c,e);if(l.jsExtRegExp.test(b))d=b+(c||"");else{d=q.paths;b=b.split("/");for(f=b.length;0<f;f-=1)if(n=b.slice(0,f).join("/"),
n=g(d,n)){a(n)&&(n=n[0]);b.splice(0,f,n);break}d=b.join("/");d+=c||(/^data\:|\?/.test(d)||e?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":q.baseUrl)+d}return q.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+q.urlArgs):d},load:function(b,a){l.load(m,b,a)},execCb:function(b,a,c,e){return a.apply(e,c)},onScriptLoad:function(b){if("load"===b.type||ia.test((b.currentTarget||b.srcElement).readyState))K=null,b=L(b),m.completeLoad(b.id)},onScriptError:function(b){var a=L(b);if(!s(a.id))return A(F("scripterror",
"Script error for: "+a.id,b,[a.id]))}};m.require=m.makeRequire();return m}function ja(){if(K&&"interactive"===K.readyState)return K;f(document.getElementsByTagName("script"),function(a){if("interactive"===a.readyState)return K=a});return K}var l,B,C,G,L,H,K,M,u,P,ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ha=/^\.\//;B=Object.prototype;var N=B.toString,ea=B.hasOwnProperty,ga=Array.prototype.splice,D=!("undefined"===typeof window||"undefined"===
typeof navigator||!window.document),da=!D&&"undefined"!==typeof importScripts,ia=D&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,W="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),I={},w={},R=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(d(requirejs))return;w=requirejs;requirejs=void 0}"undefined"===typeof require||d(require)||(w=require,require=void 0);l=requirejs=function(c,e,d,f){var k,r="_";a(c)||"string"===typeof c||(k=
c,a(e)?(c=e,e=d,d=f):c=[]);k&&k.context&&(r=k.context);(f=g(I,r))||(f=I[r]=l.s.newContext(r));k&&f.configure(k);return f.require(c,e,d)};l.config=function(a){return l(a)};l.nextTick="undefined"!==typeof setTimeout?function(a){setTimeout(a,4)}:function(a){a()};require||(require=l);l.version="2.1.10";l.jsExtRegExp=/^\/|:|\?|\.js$/;l.isBrowser=D;B=l.s={contexts:I,newContext:fa};l({});e(["toUrl","undef","defined","specified"],function(a){l[a]=function(){var c=I._;return c.require[a].apply(c,arguments)}});
D&&(C=B.head=document.getElementsByTagName("head")[0],G=document.getElementsByTagName("base")[0])&&(C=B.head=G.parentNode);l.onError=ba;l.createNode=function(a,c,e){c=a.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=a.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};l.load=function(a,c,e){var d=a&&a.config||{};if(D)return d=l.createNode(d,c,e),d.setAttribute("data-requirecontext",a.contextName),d.setAttribute("data-requiremodule",
c),!d.attachEvent||d.attachEvent.toString&&0>d.attachEvent.toString().indexOf("[native code")||W?(d.addEventListener("load",a.onScriptLoad,!1),d.addEventListener("error",a.onScriptError,!1)):(O=!0,d.attachEvent("onreadystatechange",a.onScriptLoad)),d.src=e,M=d,G?C.insertBefore(d,G):C.appendChild(d),M=null,d;if(da)try{importScripts(e),a.completeLoad(c)}catch(f){a.onError(F("importscripts","importScripts failed for "+c+" at "+e,f,[c]))}};D&&!w.skipDataMain&&f(document.getElementsByTagName("script"),
function(a){C||(C=a.parentNode);if(L=a.getAttribute("data-main"))return u=L,w.baseUrl||(H=u.split("/"),u=H.pop(),P=H.length?H.join("/")+"/":"./",w.baseUrl=P),u=u.replace(Q,""),l.jsExtRegExp.test(u)&&(u=L),w.deps=w.deps?w.deps.concat(u):[u],!0});define=function(c,e,f){var g,k;"string"!==typeof c&&(f=e,e=c,c=null);a(e)||(f=e,e=null);!e&&d(f)&&(e=[],f.length&&(f.toString().replace(ka,"").replace(la,function(a,c){e.push(c)}),e=(1===f.length?["require"]:["require","exports","module"]).concat(e)));O&&(g=
M||ja())&&(c||(c=g.getAttribute("data-requiremodule")),k=I[g.getAttribute("data-requirecontext")]);(k?k.defQueue:R).push([c,e,f])};define.amd={jQuery:!0};l.exec=function(a){return eval(a)};l(w)}})(this);define("../components/requirejs/require.js",function(){});
define("data/genericdata",["jquery"],function(c){window.dataGetters={};var d=function(a,e){this.options=c.extend({},this.options,a);this.loading=!1;this.data=null;if(""==this.options.url)throw"Could not load Data URL from options, DataURL is required";"undefined"!==typeof e&&this.setTag(e)};d.prototype.getData=function(){return this.data};d.prototype.isLoading=function(){return this.loading};d.prototype.cancel=function(){this.isLoading()&&null!=this.xhr&&this.xhr.abort()};d.prototype.setTag=function(a){"undefined"!==
typeof window.dataGetters[a]&&window.dataGetters[a].isLoading()&&window.dataGetters[a].cancel();window.dataGetters[a]=this};d.prototype.canLoadMoreData=function(){return!(this.isLoading()||this.hasErroredOut||this.hasFinishedLoadingAllRows)};d.prototype.get=function(){this.loading=!0;this.hasErroredOut=!1;var a=this;this.pushEvent("connected");this.xhr=c.ajax(this.options.url,{data:this.options.parameters,type:this.options.method}).done(c.proxy(this.receieveData,this)).fail(function(c,d){if(0!=c.status){if(null!=
c.responseJSON&&"undefined"!==typeof c.responseJSON.message)return a.receieveData(c.responseJSON);a.pushEvent("error",d)}}).always(function(){a.loading=!1;a.hasErroredOut||a.pushEvent("success");a.pushEvent("complete")})};d.prototype.receieveData=function(a){null==a?(this.pushEvent("error","Could not fetch data"),this.hasFinishedLoadingAllRows=!0):"undefined"!==typeof a.error?this.pushEvent("error",a.error):"undefined"!==typeof a.status&&300<=Number(a.status)?this.pushEvent("error","undefined"!==
typeof a.message?a.message:"Could not fetch data"):this.pushEvent("didRecieveResponse",a);this.data=a;this.pushEvent("success",this)};d.prototype.pushEvent=function(a,e){"error"==a&&(this.hasErroredOut=!0);c(this).trigger(a,[this,e])};d.prototype.options={method:"GET",url:"",parameters:{}};return d});
define("views/financegraph",["jquery","highcharts","jqueryui"],function(c){var d=function(a,e){this.container=c(a);this.options=c.extend(!0,this.defaultOptions,e);null==this.options.dataObj||this.registerDataObj(this.options.dataObj)};d.prototype.registerDataObj=function(a){c(a).on("didRecieveResponse",c.proxy(this.renderWithData,this))};d.prototype.renderWithData=function(a,c,d){this.data=d;this.fillSeries();this.fillData(d.assets,0);this.fillData(d.debt,1);this.fillData(d.net,2);this.render()};
d.prototype.fillData=function(a,c){this.dates=[];for(var d in a){var k=a[d],g=new Date(Number(d));this.dates.push(g);this.series[c].data.push([g,k])}};d.prototype.fillSeries=function(){this.series=[];var a={name:"",data:[],marker:{enabled:!1},type:"spline",color:"black",lineWidth:4,states:{hover:{lineWidth:4}}};this.series.push(c.extend(!0,{},a,{name:"Cash",color:"#C6E9B5",yAxis:0}));this.series.push(c.extend(!0,{},a,{name:"Liabilities",color:"#c65959",yAxis:1}));this.series.push(c.extend(!0,{},a,
{name:"Net Income",color:"#556aba",yAxis:0,lineWidth:6}))};d.prototype.render=function(){var a=this;this.container.highcharts({chart:{type:"spline",height:260,backgroundColor:"white",borderWidth:0,borderRadius:4,borderColor:"#CCCCCC",plotBackgroundColor:"white",plotBorderWidth:1},title:{text:""},xAxis:{type:"datetime",labels:{formatter:function(){return c.datepicker.formatDate("M d",a.dates[this.value])},style:{color:"white"}},title:{text:""}},yAxis:[{title:"",gridLineColor:"black",labels:{formatter:function(){return""}}},
{gridLineWidth:1,gridLineColor:"black",title:"",opposite:!0,labels:{formatter:function(){return""}}}],tooltip:{enabled:!0,formatter:function(){if(2<=this.x){var a=this.series.data[this.x-1].y;return number_format((this.y-a)/a*100,2)+"% change"}return"0% change"}},legend:{layout:"horizontal",align:"bottom",verticalAlign:"top",borderWidth:0,margin:20,style:{color:"white"}},series:this.series})};d.prototype.defaultOptions={dataObj:null};c.fn.financeGraph=function(a){return c(this).each(function(){c(this).data("financeGraph",
new d(this,a))})};return d});
define("views/githubgraph",["jquery"],function(c){var d=function(a,e){this.container=c(a);this.options=c.extend(!0,this.defaultOptions,e);null==this.options.dataObj||this.registerDataObj(this.options.dataObj)};d.prototype.registerDataObj=function(a){c(a).on("didRecieveResponse",c.proxy(this.renderWithData,this))};d.prototype.renderWithData=function(a,e,d){this.data=d;a="undefined"!==typeof d.issues?d.issues:0;c(this.container).html(a)};d.prototype.defaultOptions={dataObj:null};c.fn.githubIssuesGraph=
function(a){return c(this).each(function(){c(this).data("githubIssuesGraph",new d(this,a))})};return d});
define("views/weightgraph",["jquery","highcharts","jqueryui"],function(c){var d=function(a,e){this.container=c(a);this.options=c.extend(!0,this.defaultOptions,e);null==this.options.dataObj||this.registerDataObj(this.options.dataObj)};d.prototype.registerDataObj=function(a){c(a).on("didRecieveResponse",c.proxy(this.renderWithData,this))};d.prototype.renderWithData=function(a,c,d){this.data=d;this.fillSeries();this.fillData(d.veryActiveMinutes,0);this.fillData(d.fairlyActiveMinutes,1);this.fillData(d.weight,
3);this.fillData(d.bmi,2);this.render()};d.prototype.fillData=function(a,c){this.dates=[];for(var d in a){var k=a[d],g=new Date(Number(d));this.dates.push(g);this.series[c].data.push([g,k])}};d.prototype.fillSeries=function(){this.series=[];var a={name:"",data:[],marker:{enabled:!1},type:"spline",color:"black",lineWidth:4,states:{hover:{lineWidth:4}}};this.series.push(c.extend(!0,{},a,{name:"Active Minutes",color:"#0f2b94",yAxis:3,type:"areaspline",stacking:"normal"}));this.series.push(c.extend(!0,
{},a,{name:"Semi Active Minutes",color:"#586dc1",yAxis:3,type:"areaspline",stacking:"normal"}));this.series.push(c.extend(!0,{},a,{name:"BMI",color:"#999999",yAxis:1}));this.series.push(c.extend(!0,{},a,{name:"Weight",color:"#299734",yAxis:0}))};d.prototype.render=function(){var a=this;this.container.highcharts({chart:{type:"spline",height:260,backgroundColor:"white",borderWidth:0,borderRadius:4,borderColor:"#CCCCCC",plotBackgroundColor:"white",plotBorderWidth:1},title:{text:""},xAxis:{type:"datetime",
labels:{formatter:function(){return c.datepicker.formatDate("M d",a.dates[this.value])},style:{color:"white"}},title:{text:""}},yAxis:[{title:"",gridLineColor:"black",labels:{formatter:function(){return""}}},{gridLineWidth:1,gridLineColor:"black",title:"",opposite:!0,labels:{formatter:function(){return""}}},{gridLineWidth:1,gridLineColor:"black",title:"",opposite:!0,labels:{formatter:function(){return""}}},{gridLineWidth:1,gridLineColor:"black",title:"",opposite:!0,labels:{formatter:function(){return""}}}],
tooltip:{enabled:!0,formatter:function(){if("Fitness Calories Burned"==this.series.name)return this.y+" Calories Burned From Activity";if("Active Minutes"==this.series.name)return this.y+" Active Minutes";if("Semi Active Minutes"==this.series.name)return this.y+" Semi-Active Minutes";if(1<=this.x){var a=this.series.data[this.x-1].y,a=(this.y-a)/a*100;return'<span style="color:'+(0<a?"red":"green")+'">'+number_format(a,2)+"% change</span>"}return"0% change"}},legend:{layout:"horizontal",align:"bottom",
verticalAlign:"top",borderWidth:0,margin:20,style:{color:"white"}},series:this.series})};d.prototype.defaultOptions={dataObj:null};c.fn.weightGraph=function(a){return c(this).each(function(){c(this).data("weightGraph",new d(this,a))})};return d});
define("views/productivitygraph",["jquery","underscore"],function(c,d){var a=function(a,d){this.container=c(a);this.options=c.extend(!0,this.defaultOptions,d);null==this.options.dataObj||this.registerDataObj(this.options.dataObj)};a.prototype.registerDataObj=function(a){c(a).on("didRecieveResponse",c.proxy(this.renderWithData,this))};a.prototype.renderWithData=function(a,c,k){this.data=k;var g=this.getTotalTime(),z={type:"pie",name:"Productivity",innerSize:"50%",data:[]};d.each(this.data,function(a,
c){z.data.push([c,a/g*100])});this.renderGraph(z)};a.prototype.renderGraph=function(a){this.container.html("").highcharts({chart:{plotBackgroundColor:null,plotBorderWidth:0,plotShadow:!1,height:260},title:{text:"Productivity",align:"center",verticalAlign:"middle",y:50},colors:["#C6E9B5","#556aba","#299734","#c65959","#DDDDDD"],tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{dataLabels:{enabled:!0,distance:-50,style:{fontWeight:"bold",color:"white",textShadow:"0px 1px 2px black"}},
center:["50%","50%"]}},series:[a]})};a.prototype.getTotalTime=function(){var a=0;d.each(this.data,function(c){a+=c});return a};a.prototype.defaultOptions={dataObj:null};c.fn.productivityGraph=function(d){return c(this).each(function(){c(this).data("productivityGraph",new a(this,d))})};return a});
define("views/energygraph",["jquery","highcharts","jqueryui"],function(c){var d=function(a,d){this.container=c(a);this.options=c.extend(!0,this.defaultOptions,d);null==this.options.dataObj||this.registerDataObj(this.options.dataObj)};d.prototype.registerDataObj=function(a){c(a).on("didRecieveResponse",c.proxy(this.renderWithData,this))};d.prototype.renderWithData=function(a,c,d){this.data=d;this.fillSeries();d instanceof Array&&this.fillData(d,0);this.render()};d.prototype.fillData=function(a,c){this.dates=
[];a=a.reverse();for(var d in a){var k=a[d].wattage;this.dates.push(new Date(a[d].date));this.series[c].data.push(k)}};d.prototype.fillSeries=function(){this.series=[];this.series.push(c.extend(!0,{},{name:"",data:[],marker:{enabled:!1},type:"column",color:"black"},{name:"Wattage",color:"#C6E9B5",yAxis:0}))};d.prototype.render=function(){var a=this;this.container.highcharts({chart:{type:"column",backgroundColor:"white",borderWidth:0,borderRadius:4,borderColor:"#CCCCCC",plotBackgroundColor:"white",
plotBorderWidth:1,height:260},title:{text:""},xAxis:{type:"datetime",labels:{formatter:function(){return c.datepicker.formatDate("M d",a.dates[this.value])},style:{color:"white"}},title:{text:""}},yAxis:[{title:"",gridLineColor:"black"},{gridLineWidth:1,gridLineColor:"black",title:"",opposite:!0,labels:{formatter:function(){return""}}}],tooltip:{enabled:!0,formatter:function(){return this.y+" killowatts"}},legend:{layout:"horizontal",align:"bottom",verticalAlign:"top",borderWidth:0,margin:20,style:{color:"white"}},
series:this.series})};d.prototype.defaultOptions={dataObj:null};c.fn.energyGraph=function(a){return c(this).each(function(){c(this).data("energyGraph",new d(this,a))})};return d});
define("views/caloriegraph",["jquery"],function(c){var d=function(a,d){this.container=c(a);this.options=c.extend(!0,this.defaultOptions,d);null==this.options.dataObj||this.registerDataObj(this.options.dataObj)};d.prototype.registerDataObj=function(a){c(a).on("didRecieveResponse",c.proxy(this.renderWithData,this))};d.prototype.renderWithData=function(a,d,f){this.data=f;var k=!1;_.each("undefined"!==typeof f.activityCalories?f.activityCalories:[],function(a){k=a});c(this.container).html(k?k:0)};d.prototype.defaultOptions=
{dataObj:null};c.fn.calorieGraph=function(a){return c(this).each(function(){c(this).data("calorieGraph",new d(this,a))})};return d});
define("controller/dashboardcontroller","jquery data/genericdata apicalls views/financegraph views/githubgraph views/weightgraph views/productivitygraph views/energygraph views/caloriegraph".split(" "),function(c,d,a){var e=function(){this.data={finance:null,github:null,fitbit:null,productivity:null,energy:null}};e.prototype.load=function(){this.data.finance=new d({url:a.finance});this.data.github=new d({url:a.github});this.data.fitbit=new d({url:a.fitbit});this.data.productivity=new d({url:a.productivity});
this.data.energy=new d({url:a.energy});this.render();this.reload()};e.prototype.render=function(){c(".finance-graph").financeGraph({dataObj:this.data.finance});c(".github-issues").githubIssuesGraph({dataObj:this.data.github});c(".weight-graph").weightGraph({dataObj:this.data.fitbit});c(".productivity-graph").productivityGraph({dataObj:this.data.productivity});c(".energy-graph").energyGraph({dataObj:this.data.energy});c(".calorie-counter").calorieGraph({dataObj:this.data.fitbit})};e.prototype.reload=
function(){for(var a in this.data)this.data[a].get()};e.prototype.clear=function(){c(".finance-graph").html("").data("financeGraph",null)};return e});
requirejs.config({baseUrl:"scripts",paths:{component:"../components",async:"../components/requirejs-plugins/src/async",jquery:"../components/jquery/jquery.min",jqueryui:"../components/jquery-ui/ui/minified/jquery-ui.min",bootstrap:"../components/bootstrap/dist/js/bootstrap.min",underscore:"../components/underscore/underscore-min",text:"../components/requirejs-text/text",highcharts:"../components/highcharts.com/js/highcharts",d3:"../components/d3/d3.min",apicalls:"/apicalls?extension="},shim:{bootstrap:["jquery"],
highcharts:["jquery"],underscore:{exports:"_"},d3:{exports:"d3"}}});
requirejs(["jquery","underscore","bootstrap","controller/dashboardcontroller"],function(c,d,a,e){c(document).ready(function(){(new e).load()});window.number_format=function(a,c,d,e){a=(a+"").replace(/[^0-9+\-Ee.]/g,"");a=isFinite(+a)?+a:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var r="",r=function(a,c){var d=Math.pow(10,c);return""+Math.round(a*d)/d},r=(c?r(a,c):""+Math.round(a)).split(".");3<r[0].length&&(r[0]=r[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,
e));(r[1]||"").length<c&&(r[1]=r[1]||"",r[1]+=Array(c-r[1].length+1).join("0"));return r.join(d)}});define("main",function(){});