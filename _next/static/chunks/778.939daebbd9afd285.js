(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[778],{8706:function(n,t,r){"use strict";r.r(t),r.d(t,{AudioVisualizer:function(){return _}});var e=r(4051),o=r.n(e),u=r(5893),i=r(2230);function a(n,t){(null==t||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}function c(n,t,r,e,o,u,i){try{var a=n[u](i),c=a.value}catch(l){return void r(l)}a.done?t(c):Promise.resolve(c).then(e,o)}function l(n){return function(n){if(Array.isArray(n))return a(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,t){if(!n)return;if("string"===typeof n)return a(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(n,t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var s=1024,f=function(){function n(t,r){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.isEncoding=!1,this.result=null,this.callback=void 0,this.encoder=t,r&&(this.callback=r)}return n.prototype.encodeAudio=function(n){var t,r=this;return(t=o().mark((function t(){var e,u,a;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.isEncoding){t.next=3;break}return t.abrupt("return");case 3:return r.isEncoding=!0,t.next=6,i.glt();case 6:if(a=Array.from(n),!(Math.max((e=Math).max.apply(e,l(a)),-(u=Math).min.apply(u,l(a)))<.01)){t.next=11;break}return r.isEncoding=!1,t.abrupt("return");case 11:return i.lub((function(){var t=i.RRF(n),e=i.J69(t),o=i.VV$(t),u=i.Fp7(t),a=i.IHx(i.hiC(i.luU(u,o),i.iD$(2)),i.iD$(1e-5)),c=i.hiC(i.luU(t,e),a),l=i.tdS.stft(c,s,1),f=i.XLQ(l,[513]),d=i.hiC(i.WnP(f),i.iD$(s)),p=i.tPi(d,1,512),h=i.XLQ(p,[1,32,16,1]),v=r.encoder.predict([h]),y=i.XLQ(v[1],[2]),m=Array.from(y.dataSync());r.result={coord:m},r.callback&&r.callback({coord:m})})),r.isEncoding=!1,t.next=15,i.glt();case 15:case"end":return t.stop()}}),t)})),function(){var n=this,r=arguments;return new Promise((function(e,o){var u=t.apply(n,r);function i(n){c(u,e,o,i,a,"next",n)}function a(n){c(u,e,o,i,a,"throw",n)}i(void 0)}))})()},n}(),d=r(7294),p=r(2734),h=r.n(p),v=r(5152),y=r.n(v),m=r(7979);function b(n,t){(null==t||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}function w(n,t,r,e,o,u,i){try{var a=n[u](i),c=a.value}catch(l){return void r(l)}a.done?t(c):Promise.resolve(c).then(e,o)}function g(n){return function(){var t=this,r=arguments;return new Promise((function(e,o){var u=n.apply(t,r);function i(n){w(u,e,o,i,a,"next",n)}function a(n){w(u,e,o,i,a,"throw",n)}i(void 0)}))}}function x(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var r=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var e,o,u=[],i=!0,a=!1;try{for(r=r.call(n);!(i=(e=r.next()).done)&&(u.push(e.value),!t||u.length!==t);i=!0);}catch(c){a=!0,o=c}finally{try{i||null==r.return||r.return()}finally{if(a)throw o}}return u}}(n,t)||k(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(n){return function(n){if(Array.isArray(n))return b(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||k(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(n,t){if(n){if("string"===typeof n)return b(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(n,t):void 0}}var S=y()((function(){return Promise.all([r.e(6),r.e(972)]).then(r.bind(r,6972)).then((function(n){return n.PlotLatentSketch}))}),{loadableGenerated:{webpack:function(){return[6972]}},ssr:!1}),E=2/21,_=function(n){var t=n.audioFilePath,r=n.encoderJSONPath,e=n.latentImgInfo,a=n.title,c=x(d.useState(null),2),l=c[0],s=c[1];d.useEffect((function(){if(null===l){window.AudioContext=window.AudioContext||window.webkitAudioContext;var n=new AudioContext;s(n)}}),[]);var p=d.useRef(null),v=x(d.useState(null),2),y=v[0],b=v[1];d.useEffect((function(){if(null!==l&&null!==p.current&&null===y){var n=p.current,t=l.createMediaElementSource(n);b(t)}}),[l]);var w=x(d.useState(null),2),k=w[0],_=w[1];d.useEffect((function(){if(null!==l&&null===k){var n=function(){var n=g(o().mark((function n(){var t;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.audioWorklet.addModule((0,m.H)("/worklet-scripts/resample.worklet.js"));case 2:t=new AudioWorkletNode(l,"resample.worklet"),_(t);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}}),[l]),d.useEffect((function(){null!==l&&null!==y&&null!==k&&y.connect(k).connect(l.destination)}),[l,y,k]);var j=x(d.useState(null),2),C=j[0],I=j[1],P=x(d.useState(null),2),M=P[0],N=P[1];d.useEffect((function(){var n=function(){var n=g(o().mark((function n(){var t,e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.YLj((0,m.H)(r));case 2:t=n.sent,e=new f(t,N),I(e);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[r]),d.useEffect((function(){null!==k&&null!==C&&(k.port.onmessage=function(){var n=g(o().mark((function n(t){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:C.encodeAudio(t.data);case 1:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}),[k,C]);var R=x(d.useState([]),2),H=R[0],L=R[1],V=x(d.useState(null),2),$=V[0],O=V[1];d.useEffect((function(){if(null!==M){var n=A(H).concat([M]),t=n.length<=20?n:n.slice(1);L(t)}}),[M]),d.useEffect((function(){var n=H.length;if(0!==n){var t=H[n-1];if(null===$||n<20){for(var r=[],e=0;e<t.coord.length;e++){for(var o=0,u=0;u<n;u++)o+=H[u].coord[e];r.push(o/n)}O({coord:r})}else{var i=$.coord.map((function(n,r){return n*(1-E)+t.coord[r]*E}));O({coord:i})}}}),[H]);var z=d.useCallback((function(){null!==l&&"running"!==l.state&&l.resume()}),[l]),J=d.useCallback((function(){null!==l&&"suspended"!==l.state&&l.suspend()}),[l]);return(0,u.jsxs)("div",{className:h().container,children:[a&&(0,u.jsx)("h4",{className:h().title,children:a}),(0,u.jsx)("audio",{src:(0,m.H)(t),controls:!0,loop:!0,ref:p,onPlay:z,onPause:J}),(0,u.jsxs)("p",{children:["first: ",null===$||void 0===$?void 0:$.coord[0]]}),(0,u.jsxs)("p",{children:["second: ",null===$||void 0===$?void 0:$.coord[1]]}),(0,u.jsx)(S,{canvasWidth:500,canvasHeight:500,encodeResult:$,latentImgInfo:e,className:h().sketch__container})]})}},7979:function(n,t,r){"use strict";r.d(t,{H:function(){return o}});var e=r(1752);function o(n){return(0,e.default)().publicRuntimeConfig.urlPrefix+n}},2734:function(n){n.exports={container:"VisualizeAudio_container__kpLYR",title:"VisualizeAudio_title__1xpJg",sketch__container:"VisualizeAudio_sketch__container__EJsRg"}},5410:function(){},8628:function(){},1601:function(){},7792:function(){},4977:function(){},5042:function(){}}]);