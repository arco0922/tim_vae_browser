(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2363],{1752:function(e,t,n){e.exports=n(6949)},2363:function(e,t,n){"use strict";n.r(t),n.d(t,{PracticeAudioVisualizer:function(){return T}});var r=n(4051),o=n.n(r),i=n(5893),a=n(9589),c=n(7294),u=n(2230),s=n(9668),l=n.n(s),d=n(5152),f=n.n(d),m=n(7979),v=n(7941),p=n(2916),_=n(4524),h=n(5952),b=n(1639);function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(u){c=!0,o=u}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(s){return void n(s)}c.done?t(u):Promise.resolve(u).then(r,o)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){k(i,r,o,a,c,"next",e)}function c(e){k(i,r,o,a,c,"throw",e)}a(void 0)}))}}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(u){c=!0,o=u}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(e,t)||j(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e){return function(e){if(Array.isArray(e))return g(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||j(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){if(e){if("string"===typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}var E=f()((function(){return n.e(5640).then(n.bind(n,5640)).then((function(e){return e.DrawSamplingPointsSketch}))}),{loadableGenerated:{webpack:function(){return[5640]}},ssr:!1}),P=f()((function(){return n.e(2267).then(n.bind(n,2267)).then((function(e){return e.DrawPracticeFeedbackSketch}))}),{loadableGenerated:{webpack:function(){return[2267]}},ssr:!1}),N=f()((function(){return n.e(9157).then(n.bind(n,9157)).then((function(e){return e.PlotLatentSketch}))}),{loadableGenerated:{webpack:function(){return[9157]}},ssr:!1}),C=2/21,I=500,T=function(e){var t=e.practiceConfig,n=e.visualizerConfig,r=e.annotations,s=e.isTrial,d=void 0!==s&&s,f=e.recordFileName,x=e.duration,g=void 0===x?0:x,k=e.className,j=S(c.useState(null),2),T=j[0],z=j[1];c.useEffect((function(){if(null===T){window.AudioContext=window.AudioContext||window.webkitAudioContext;var e=new AudioContext({sampleRate:n.samplingRate});z(e)}}),[n.samplingRate]);var H=S(c.useState(null),2),R=H[0],L=H[1],V=S(c.useState(null),2),F=V[0],O=V[1],M=c.useRef([]);c.useEffect((function(){null!==T&&null===R&&void 0!==navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then((function(e){var t=T.createMediaStreamSource(e);if(L(t),void 0!==f){var n=new MediaRecorder(e,{mimeType:"audio/webm"});O(n)}})).catch((function(e){console.error(e)}))}),[T]),c.useEffect((function(){null!==F&&(F.ondataavailable=function(e){var t=e.data,n=M.current;M.current=A(n).concat([t])})}),[F]),c.useEffect((function(){null!==F&&(F.onstop=function(){var e=M.current;if(0!==e.length&&void 0!==f){var t=document.createElement("a");t.href=URL.createObjectURL(new Blob(e)),t.download=f,t.click(),M.current=[]}})}),[F,f]);var D=c.useCallback((function(){null!==F&&F.start()}),[F]),U=c.useCallback((function(){null!==F&&F.stop()}),[F]),W=S(c.useState(null),2),G=W[0],X=W[1];c.useEffect((function(){if(null!==T&&null===G){var e=function(){var e=w(o().mark((function e(){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.audioWorklet.addModule("LONG_FAST"===n.encoderMode?(0,m.H)("/worklet-scripts/resample_mel.worklet.js"):(0,m.H)("/worklet-scripts/resample.worklet.js"));case 2:t=new AudioWorkletNode(T,"LONG_FAST"===n.encoderMode?"resample-mel.worklet":"resample.worklet",{parameterData:{bufferSize:n.frameLength,resampleRate:n.samplingRate}}),X(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}}),[T,n]),c.useEffect((function(){null!==T&&null!==R&&null!==G&&R.connect(G)}),[T,R,G]);var Y=S(c.useState(null),2),q=Y[0],B=Y[1],J=S(c.useState(null),2),Q=J[0],Z=J[1];c.useEffect((function(){var e=function(){var e=w(o().mark((function e(){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.YLj((0,m.H)(n.encoderJSONPath));case 2:t=e.sent,r=new a.s(n.isFlipped,t,n.encoderPreprocessor,Z),B(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n]);var $=S(c.useState(!0),2),K=$[0],ee=$[1];c.useEffect((function(){null!==G&&null!==q&&(G.port.onmessage=function(){var e=w(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t.data){e.next=3;break}return ee(!0),e.abrupt("return");case 3:ee(!1),q.encodeAudio(t.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[G,q]);var te=S(c.useState([]),2),ne=te[0],re=te[1],oe=S(c.useState(null),2),ie=oe[0],ae=oe[1];c.useEffect((function(){if(null!==Q){var e=A(ne).concat([Q]),t=e.length<=20?e:e.slice(1);re(t)}}),[Q]),c.useEffect((function(){var e=ne.length;if(0!==e){var t=ne[e-1];if(null===ie||e<20){for(var n=[],r=0;r<t.coord.length;r++){for(var o=0,i=0;i<e;i++)o+=ne[i].coord[r];n.push(o/e)}ae({coord:n})}else{var a=ie.coord.map((function(e,n){return e*(1-C)+t.coord[n]*C}));ae({coord:a})}}}),[ne]);var ce=S(c.useState(!1),2),ue=ce[0],se=ce[1],le=c.useCallback((function(){se(!0),null!==T&&"running"!==T.state&&T.resume()}),[T]),de=c.useCallback((function(){se(!1),null!==T&&"suspended"!==T.state&&T.suspend()}),[T]),fe=S(c.useState(null),2),me=fe[0],ve=fe[1],pe=S(c.useState(0),2),_e=pe[0],he=pe[1],be=S(c.useState(null),2),xe=be[0],ye=be[1];c.useEffect((function(){if("SHAPE"===t.mode){var e=new v.f(p.R.inputDim,p.R.outputDim);ve(e)}}),[t.mode]);var ge=n.encoderId;c.useEffect((function(){if(null!==me&&void 0!==r){var e=_.lZ[ge];if(void 0!==e){var t=0,n=!0,o=!1,i=void 0;try{for(var a,c=Object.entries(r)[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var u=S(a.value,2),s=u[0],l=u[1],d=e[s];me.addPoint(d,l),t+=1}}catch(f){o=!0,i=f}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}he(t)}}}),[ge,r,me]),c.useEffect((function(){if("SHAPE"===t.mode&&null!==me&&null!==ie&&0!==_e){var e=me.estimate(ie.coord),n=(0,h.H)(e);ye(n)}}),[t.mode,ie,me,_e]);var ke=S(c.useState(null),2),we=ke[0],Se=ke[1];c.useEffect((function(){if("SHAPE"===t.mode&&null!==me&&0!==_e&&void 0!==t.goalInfo.coord[ge]){var e=me.estimate(t.goalInfo.coord[ge]),n=(0,h.H)(e);Se(n)}}),[ge,t,me,_e]);var Ae=function(){var e=y(c.useState(0),2),t=e[0],n=e[1],r=y(c.useState(0),2),o=r[0],i=r[1],a=y(c.useState(!1),2),u=a[0],s=a[1],l=y(c.useState(void 0),2),d=l[0],f=l[1],m=c.useCallback((function(e,t){n(Math.floor(e/60)),i(e-60*Math.floor(e/60)),s(!0),f((function(){return t}))}),[]),v=c.useCallback((function(){s(!0)}),[]),p=c.useCallback((function(){s(!1)}),[]),_=c.useCallback((function(){s(!1),n(0),i(0),void 0!==d&&d()}),[d]);return c.useEffect((function(){if(u){0===t&&0===o&&void 0!==d&&d();var e=setInterval((function(){o>0&&i(o-1),0===o&&(0===t?clearInterval(e):(n(t-1),i(59)))}),1e3);return function(){clearInterval(e)}}}),[u,t,o,d]),{minutes:t,seconds:o,startTimer:m,resumeTimer:v,stopTimer:p,finishTimer:_}}(),je=Ae.minutes,Ee=Ae.seconds,Pe=Ae.startTimer,Ne=Ae.finishTimer,Ce=c.useCallback((function(){de(),d&&U()}),[de,d,U]),Ie=c.useCallback((function(){g>0?Ne():Ce()}),[g,Ne,Ce]),Te=c.useCallback((function(){le(),d&&D(),g>0&&Pe(g,Ce)}),[le,d,D,g,Pe,Ce]);return(0,i.jsxs)("div",{className:"".concat(l().container," ").concat(k),children:["SOUND"===t.mode&&(0,i.jsxs)("div",{className:l().sound__only,children:[ue&&!(0===je&&0===Ee)&&(0,i.jsxs)("p",{children:["\u6b8b\u308a\u6642\u9593\uff1a",je,":",Ee<10?"0".concat(Ee):Ee]}),!(d&&ue)&&(0,i.jsxs)("div",{className:l().sound__part,children:[(0,i.jsx)("p",{children:"\u76ee\u6a19\u97f3"}),(0,i.jsx)("audio",{src:(0,m.H)(t.goalInfo.audioFilePath),controls:!0,loop:!0,preload:"metadata"})]}),(0,i.jsx)("div",{className:l().button__part,children:ue?(0,i.jsx)(b.z,{text:d?"\u30c8\u30e9\u30a4\u30a2\u30eb\u7d42\u4e86":"\u7df4\u7fd2\u7d42\u4e86",onClick:Ie}):(0,i.jsx)(b.z,{text:d?"\u30c8\u30e9\u30a4\u30a2\u30eb\u958b\u59cb":"\u7df4\u7fd2\u958b\u59cb",onClick:Te})})]}),("SHAPE"===t.mode||"LATENT"===t.mode)&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:l().ref__section,children:[(0,i.jsx)("div",{className:l().top__section,children:!(d&&ue)&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("p",{children:"\u76ee\u6a19\u97f3"}),(0,i.jsx)("audio",{src:(0,m.H)(t.goalInfo.audioFilePath),controls:!0,loop:!0,preload:"metadata"})]})}),(0,i.jsxs)("div",{className:l().middle__section,children:["SHAPE"===t.mode&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("p",{children:"\u76ee\u6a19\u56f3\u5f62"}),(0,i.jsx)("div",{className:l().ref__sketch,children:(0,i.jsx)(E,{canvasWidth:I,canvasHeight:I,samplingPoints:we})})]}),"LATENT"===t.mode&&(0,i.jsx)("div",{className:l().ref__margin})]}),(0,i.jsx)("div",{className:l().bottom__section})]}),(0,i.jsxs)("div",{className:l().feedback__section,children:[(0,i.jsx)("div",{className:l().top__section,children:!(0===je&&0===Ee)&&(0,i.jsxs)("p",{children:["\u6b8b\u308a\u6642\u9593\uff1a",je,":",Ee<10?"0".concat(Ee):Ee]})}),(0,i.jsxs)("div",{className:l().middle__section,children:[(0,i.jsx)("p",{children:"SHAPE"===t.mode?"\u73fe\u72b6\u306e\u56f3\u5f62(\u8d64\u7dda)":"LATENT"===t.mode?"\u73fe\u72b6\uff1a\u8d64\u4e38\u3001\u76ee\u6a19\uff1a\u9ec4\u4e38":""}),(0,i.jsxs)("div",{className:l().practice__sketch,children:[ue?(0,i.jsx)(i.Fragment,{children:K&&(0,i.jsx)("p",{className:l().silence__text,children:"No sound detected"})}):(0,i.jsx)(b.z,{text:d?"\u30c8\u30e9\u30a4\u30a2\u30eb\u958b\u59cb":"\u7df4\u7fd2\u958b\u59cb",onClick:Te}),"SHAPE"===t.mode&&(0,i.jsx)(P,{canvasWidth:I,canvasHeight:I,samplingPoints:xe,goalSamplingPoints:we,hidePoints:!ue||K}),"LATENT"===t.mode&&(0,i.jsx)(N,{canvasWidth:I,canvasHeight:n.latentImgInfo.aspectRatio?I*n.latentImgInfo.aspectRatio:I,encodeResult:ie,latentImgInfo:n.latentImgInfo,goalCoord:t.goalInfo.coord[ge],hidePoints:!ue||K,className:l().sketch__container})]})]}),(0,i.jsx)("div",{className:l().bottom__section,children:ue&&(0,i.jsx)(b.z,{text:d?"\u30c8\u30e9\u30a4\u30a2\u30eb\u7d42\u4e86":"\u7df4\u7fd2\u7d42\u4e86",onClick:Ie})})]})]})]})}},9589:function(e,t,n){"use strict";n.d(t,{s:function(){return c}});var r=n(4051),o=n.n(r),i=n(2230);function a(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(s){return void n(s)}c.done?t(u):Promise.resolve(u).then(r,o)}var c=function(){function e(t,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.isEncoding=!1,this.result=null,this.callback=void 0,this.isFlipped=t,this.encoder=n,this.preprocessor=r,o&&(this.callback=o)}return e.prototype.encodeAudio=function(e){var t,n=this;return(t=o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.isEncoding&&null!==e){t.next=2;break}return t.abrupt("return");case 2:return n.isEncoding=!0,t.next=5,i.glt();case 5:return i.lub((function(){var t=n.preprocessor(e),r=n.encoder.predict([t]),o=n.isFlipped?1:0,a=i.XLQ(r[o],[2]),c=Array.from(a.dataSync());n.result={coord:c},n.callback&&n.callback({coord:c})})),n.isEncoding=!1,t.next=9,i.glt();case 9:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(e){a(i,r,o,c,u,"next",e)}function u(e){a(i,r,o,c,u,"throw",e)}c(void 0)}))})()},e}()},7979:function(e,t,n){"use strict";n.d(t,{H:function(){return o}});var r=n(1752);function o(e){return(0,r.default)().publicRuntimeConfig.urlPrefix+e}},9668:function(e){e.exports={container:"PracticeAudioVisualizer_container__YTEE7",sound__only:"PracticeAudioVisualizer_sound__only__R3tpW",button__part:"PracticeAudioVisualizer_button__part__4BaL1",ref__section:"PracticeAudioVisualizer_ref__section__4Ob47",ref__margin:"PracticeAudioVisualizer_ref__margin__YQUJD",feedback__section:"PracticeAudioVisualizer_feedback__section__y_5E2",top__section:"PracticeAudioVisualizer_top__section__Wx81Z",middle__section:"PracticeAudioVisualizer_middle__section__qqtXT",bottom__section:"PracticeAudioVisualizer_bottom__section__8NU80",practice__sketch:"PracticeAudioVisualizer_practice__sketch__uiomV",silence__text:"PracticeAudioVisualizer_silence__text__XhCP2",button__section:"PracticeAudioVisualizer_button__section__mLOz_"}}}]);