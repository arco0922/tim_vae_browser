(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(6844)}])},6844:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return C}});var r=e(5893),o=e(4051),i=e.n(o),a=e(2230),u=e(7979);function c(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function l(n,t,e,r,o,i,a){try{var u=n[i](a),c=u.value}catch(l){return void e(l)}u.done?t(c):Promise.resolve(c).then(r,o)}function s(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(n){l(i,r,o,a,u,"next",n)}function u(n){l(i,r,o,a,u,"throw",n)}a(void 0)}))}}function f(n){return function(n){if(Array.isArray(n))return c(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,t){if(!n)return;if("string"===typeof n)return c(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return c(n,t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var d=1024,p=function(){function n(t,e,r,o){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.running=!1,this.result=null,this.callback=void 0,this.audioContext=t,this.stream=e,this.encoder=r,this.resampleProcesser=null,o&&(this.callback=o)}var t=n.prototype;return t.start=function(){var n=this;return s(i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.audioContext.createMediaStreamSource(n.stream),t.next=3,n.audioContext.audioWorklet.addModule((0,u.H)("/worklet-scripts/resample.worklet.js"));case 3:n.resampleProcesser=new AudioWorkletNode(n.audioContext,"resample.worklet"),e.connect(n.resampleProcesser).connect(n.audioContext.destination),n.resampleProcesser.port.onmessage=function(){var t=s(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.running){t.next=2;break}return t.abrupt("return");case 2:n.encodeAudio(e.data);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();case 6:case"end":return t.stop()}}),t)})))()},t.encodeAudio=function(n){var t=this;return s(i().mark((function e(){var r,o,u;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.running=!0,e.next=4,a.glt();case 4:if(u=Array.from(n),!(Math.max((r=Math).max.apply(r,f(u)),-(o=Math).min.apply(o,f(u)))<.01)){e.next=9;break}return t.running=!1,e.abrupt("return");case 9:return a.lub((function(){var e=a.RRF(n),r=a.J69(e),o=a.VV$(e),i=a.Fp7(e),u=a.IHx(a.hiC(a.luU(i,o),a.iD$(2)),a.iD$(1e-5)),c=a.hiC(a.luU(e,r),u),l=a.tdS.stft(c,d,1),s=a.XLQ(l,[513]),f=a.hiC(a.WnP(s),a.iD$(d)),p=a.tPi(f,1,512),h=a.XLQ(p,[1,32,16,1]),m=t.encoder.predict([h]),v=a.XLQ(m[1],[2]),y=Array.from(v.dataSync());t.result={coord:y},t.callback&&t.callback({coord:y})})),t.running=!1,e.next=13,a.glt();case 13:case"end":return e.stop()}}),e)})))()},n}(),h=e(7294),m=e(2734),v=e.n(m),y=e(5152);function b(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function w(n,t,e,r,o,i,a){try{var u=n[i](a),c=u.value}catch(l){return void e(l)}u.done?t(c):Promise.resolve(c).then(r,o)}function x(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],a=!0,u=!1;try{for(e=e.call(n);!(a=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(c){u=!0,o=c}finally{try{a||null==e.return||e.return()}finally{if(u)throw o}}return i}}(n,t)||S(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(n){return function(n){if(Array.isArray(n))return b(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||S(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(n,t){if(n){if("string"===typeof n)return b(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?b(n,t):void 0}}var A=e.n(y)()((function(){return Promise.all([e.e(6),e.e(972)]).then(e.bind(e,6972)).then((function(n){return n.PlotLatentSketch}))}),{loadableGenerated:{webpack:function(){return[6972]}},ssr:!1}),g=2/11,k=function(n){var t=n.audioFilePath,e=n.encoderJSONPath,o=n.title,c=x(h.useState(null),2),l=c[0],s=c[1],f=h.useRef(null),d=x(h.useState(null),2),m=d[0],y=d[1];h.useEffect((function(){if(null===l){AudioContext=window.AudioContext||window.webkitAudioContext;var n=new AudioContext;n.suspend(),s(n)}}),[l]),h.useEffect((function(){if(null!==l&&null!==f.current){var n=f.current,t=n.captureStream?n.captureStream():n.mozCaptureStream?n.mozCaptureStream():null;y(t)}}),[l]);var b=x(h.useState(null),2),S=b[0],k=b[1],j=x(h.useState(null),2),P=j[0],C=j[1],E=x(h.useState([]),2),N=E[0],O=E[1],I=x(h.useState(null),2),T=I[0],M=I[1];h.useEffect((function(){if(null!==l&&null!==m&&null===S){var n=function(){var n,t=(n=i().mark((function n(){var t,r;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.YLj((0,u.H)(e));case 2:return t=n.sent,r=new p(l,m,t,C),k(S),n.next=7,r.start();case 7:case"end":return n.stop()}}),n)})),function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(n){w(i,r,o,a,u,"next",n)}function u(n){w(i,r,o,a,u,"throw",n)}a(void 0)}))});return function(){return t.apply(this,arguments)}}();n()}}),[S,l,m]),h.useEffect((function(){if(null!==P){var n=_(N).concat([P]),t=n.length<=10?n:n.slice(1);O(t)}}),[P]),h.useEffect((function(){var n=N.length;if(0!==n){var t=N[n-1];if(null===T||n<10){for(var e=[],r=0;r<t.coord.length;r++){for(var o=0,i=0;i<n;i++)o+=N[i].coord[r];e.push(o/n)}M({coord:e})}else{var a=T.coord.map((function(n,e){return n*(1-g)+t.coord[e]*g}));M({coord:a})}}}),[N]);var J=h.useCallback((function(){null!==l&&l.resume()}),[l]),R=h.useCallback((function(){null!==l&&l.suspend()}),[l]);return(0,r.jsxs)("div",{className:v().container,children:[o&&(0,r.jsx)("h4",{className:v().title,children:o}),(0,r.jsx)("audio",{src:(0,u.H)(t),controls:!0,loop:!0,ref:f,onPlay:J,onPause:R}),(0,r.jsxs)("p",{children:["first: ",null===T||void 0===T?void 0:T.coord[0]]}),(0,r.jsxs)("p",{children:["second: ",null===T||void 0===T?void 0:T.coord[1]]}),(0,r.jsx)(A,{canvasWidth:500,canvasHeight:500,encodeResult:T,className:v().sketch__container})]})},j=e(822),P=e.n(j),C=function(){return(0,r.jsxs)("div",{className:P().container,children:[(0,r.jsx)("h1",{children:"Timbre-VAE on browser"}),(0,r.jsxs)("div",{className:P().main__content,children:[(0,r.jsx)(k,{audioFilePath:"/audios/beginner.wav",encoderJSONPath:"/models/encoder01/model.json",title:"beginner"}),(0,r.jsx)(k,{audioFilePath:"/audios/intermediate.wav",encoderJSONPath:"/models/encoder01/model.json",title:"intermediate"}),(0,r.jsx)(k,{audioFilePath:"/audios/expert.wav",encoderJSONPath:"/models/encoder01/model.json",title:"expert"})]})]})}},7979:function(n,t,e){"use strict";e.d(t,{H:function(){return o}});var r=e(1752);function o(n){return(0,r.default)().publicRuntimeConfig.urlPrefix+n}},822:function(n){n.exports={container:"Top_container__Kixnj",main__content:"Top_main__content__yMeYl"}},2734:function(n){n.exports={container:"VisualizeAudio_container__kpLYR",title:"VisualizeAudio_title__1xpJg",sketch__container:"VisualizeAudio_sketch__container__EJsRg"}},5410:function(){},8628:function(){},1601:function(){},7792:function(){},4977:function(){},5042:function(){}},function(n){n.O(0,[864,904,723,974,132,548,774,888,179],(function(){return t=8312,n(n.s=t);var t}));var t=n.O();_N_E=t}]);