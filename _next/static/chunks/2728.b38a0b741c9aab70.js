(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2728],{1752:function(e,t,n){e.exports=n(6949)},2447:function(e,t,n){"use strict";n.r(t),n.d(t,{PracticeAudioVisualizer:function(){return N}});var r=n(4051),i=n.n(r),o=n(5893),a=n(9589),c=n(7294),s=n(2230),u=n(9668),l=n.n(u),d=n(5152),f=n.n(d),p=n(7979),_=n(7941),v=n(2916),m=n(4524),h=n(5952),x=n(1639);function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(e,t,n,r,i,o,a){try{var c=e[o](a),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,i)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function a(e){w(o,r,i,a,c,"next",e)}function c(e){w(o,r,i,a,c,"throw",e)}a(void 0)}))}}function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);a=!0);}catch(s){c=!0,i=s}finally{try{a||null==n.return||n.return()}finally{if(c)throw i}}return o}}(e,t)||S(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||S(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){if(e){if("string"===typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}var j=f()((function(){return n.e(5640).then(n.bind(n,5640)).then((function(e){return e.DrawSamplingPointsSketch}))}),{loadableGenerated:{webpack:function(){return[5640]}},ssr:!1}),A=f()((function(){return n.e(2267).then(n.bind(n,2267)).then((function(e){return e.DrawPracticeFeedbackSketch}))}),{loadableGenerated:{webpack:function(){return[2267]}},ssr:!1}),P=2/21,E=500,N=function(e){var t=e.practiceConfig,n=e.visualizerConfig,r=e.annotations,u=e.className,d=k(c.useState(null),2),f=d[0],b=d[1];c.useEffect((function(){if(null===f){window.AudioContext=window.AudioContext||window.webkitAudioContext;var e=new AudioContext;b(e)}}),[]);var w=k(c.useState(null),2),S=w[0],N=w[1];c.useEffect((function(){null!==f&&null===S&&void 0!==navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then((function(e){var t=f.createMediaStreamSource(e);N(t)})).catch((function(e){console.error(e)}))}),[f]);var z=k(c.useState(null),2),C=z[0],H=z[1];c.useEffect((function(){if(null!==f&&null===C){var e=function(){var e=y(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.audioWorklet.addModule("LONG_FAST"===n.encoderMode?(0,p.H)("/worklet-scripts/resample_mel.worklet.js"):(0,p.H)("/worklet-scripts/resample.worklet.js"));case 2:t=new AudioWorkletNode(f,"LONG_FAST"===n.encoderMode?"resample-mel.worklet":"resample.worklet",{parameterData:{bufferSize:n.frameLength,resampleRate:n.samplingRate}}),H(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}}),[f,n]),c.useEffect((function(){null!==f&&null!==S&&null!==C&&S.connect(C)}),[f,S,C]);var V=k(c.useState(null),2),F=V[0],O=V[1],D=k(c.useState(null),2),I=D[0],M=D[1];c.useEffect((function(){var e=function(){var e=y(i().mark((function e(){var t,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.YLj((0,p.H)(n.encoderJSONPath));case 2:t=e.sent,r=new a.s(n.isFlipped,t,n.encoderPreprocessor,M),O(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n]);var T=k(c.useState(!0),2),L=T[0],U=T[1];c.useEffect((function(){null!==C&&null!==F&&(C.port.onmessage=function(){var e=y(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t.data){e.next=3;break}return U(!0),e.abrupt("return");case 3:U(!1),F.encodeAudio(t.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[C,F]);var W=k(c.useState([]),2),G=W[0],R=W[1],X=k(c.useState(null),2),q=X[0],Y=X[1];c.useEffect((function(){if(null!==I){var e=g(G).concat([I]),t=e.length<=20?e:e.slice(1);R(t)}}),[I]),c.useEffect((function(){var e=G.length;if(0!==e){var t=G[e-1];if(null===q||e<20){for(var n=[],r=0;r<t.coord.length;r++){for(var i=0,o=0;o<e;o++)i+=G[o].coord[r];n.push(i/e)}Y({coord:n})}else{var a=q.coord.map((function(e,n){return e*(1-P)+t.coord[n]*P}));Y({coord:a})}}}),[G]);var J=k(c.useState(!1),2),Q=J[0],Z=J[1],$=c.useCallback((function(){Z(!0),null!==f&&"running"!==f.state&&f.resume()}),[f]),B=c.useCallback((function(){Z(!1),null!==f&&"suspended"!==f.state&&f.suspend()}),[f]),K=k(c.useState(null),2),ee=K[0],te=K[1],ne=k(c.useState(0),2),re=ne[0],ie=ne[1],oe=k(c.useState(null),2),ae=oe[0],ce=oe[1];c.useEffect((function(){if("SHAPE"===t.mode){var e=new _.f(v.R.inputDim,v.R.outputDim);te(e)}}),[t.mode]),c.useEffect((function(){if(null!==ee&&void 0!==r){var e=0,t=!0,n=!1,i=void 0;try{for(var o,a=Object.entries(r)[Symbol.iterator]();!(t=(o=a.next()).done);t=!0){var c=k(o.value,2),s=c[0],u=c[1],l=s,d=m.gu[l];ee.addPoint(d,u),e+=1}}catch(f){n=!0,i=f}finally{try{t||null==a.return||a.return()}finally{if(n)throw i}}ie(e)}}),[r,ee]),c.useEffect((function(){if("SHAPE"===t.mode&&null!==ee&&null!==q&&0!==re){var e=ee.estimate(q.coord),n=(0,h.H)(e);ce(n)}}),[t.mode,q,ee,re]);var se=k(c.useState(null),2),ue=se[0],le=se[1];return c.useEffect((function(){if("SHAPE"===t.mode&&null!==ee&&0!==re){var e=ee.estimate(t.goalInfo.coord),n=(0,h.H)(e);le(n)}}),[t,ee,re]),(0,o.jsxs)("div",{className:"".concat(l().container," ").concat(u),children:["SOUND"===t.mode&&(0,o.jsxs)("div",{className:l().sound__only,children:[(0,o.jsx)("p",{children:"\u76ee\u6a19\u97f3"}),(0,o.jsx)("audio",{src:(0,p.H)(t.goalInfo.audioFilePath),controls:!0,loop:!0,preload:"metadata"})]}),"SHAPE"===t.mode&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:l().ref__section,children:[(0,o.jsxs)("div",{className:l().top__section,children:[(0,o.jsx)("p",{children:"\u76ee\u6a19\u97f3"}),(0,o.jsx)("audio",{src:(0,p.H)(t.goalInfo.audioFilePath),controls:!0,loop:!0,preload:"metadata"})]}),(0,o.jsxs)("div",{className:l().middle__section,children:[(0,o.jsx)("p",{children:"\u76ee\u6a19\u56f3\u5f62"}),(0,o.jsx)("div",{className:l().ref__sketch,children:(0,o.jsx)(j,{canvasWidth:E,canvasHeight:E,samplingPoints:ue})})]}),(0,o.jsx)("div",{className:l().bottom__section})]}),(0,o.jsxs)("div",{className:l().feedback__section,children:[(0,o.jsx)("div",{className:l().top__section}),(0,o.jsxs)("div",{className:l().middle__section,children:[(0,o.jsx)("p",{children:"\u73fe\u72b6\u306e\u56f3\u5f62(\u8d64\u7dda)"}),(0,o.jsxs)("div",{className:l().practice__sketch,children:[Q?(0,o.jsx)(o.Fragment,{children:L&&(0,o.jsx)("p",{className:l().silence__text,children:"No sound detected"})}):(0,o.jsx)(x.z,{text:"\u7df4\u7fd2\u958b\u59cb",onClick:$}),(0,o.jsx)(A,{canvasWidth:E,canvasHeight:E,samplingPoints:ae,goalSamplingPoints:ue,hidePoints:L})]})]}),(0,o.jsx)("div",{className:l().bottom__section,children:Q&&(0,o.jsx)(x.z,{text:"\u7df4\u7fd2\u7d42\u4e86",onClick:B})})]})]})]})}},9589:function(e,t,n){"use strict";n.d(t,{s:function(){return c}});var r=n(4051),i=n.n(r),o=n(2230);function a(e,t,n,r,i,o,a){try{var c=e[o](a),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,i)}var c=function(){function e(t,n,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.isEncoding=!1,this.result=null,this.callback=void 0,this.isFlipped=t,this.encoder=n,this.preprocessor=r,i&&(this.callback=i)}return e.prototype.encodeAudio=function(e){var t,n=this;return(t=i().mark((function t(){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.isEncoding&&null!==e){t.next=2;break}return t.abrupt("return");case 2:return n.isEncoding=!0,t.next=5,o.glt();case 5:return o.lub((function(){var t=n.preprocessor(e),r=n.encoder.predict([t]),i=n.isFlipped?1:0,a=o.XLQ(r[i],[2]),c=Array.from(a.dataSync());n.result={coord:c},n.callback&&n.callback({coord:c})})),n.isEncoding=!1,t.next=9,o.glt();case 9:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function c(e){a(o,r,i,c,s,"next",e)}function s(e){a(o,r,i,c,s,"throw",e)}c(void 0)}))})()},e}()},9668:function(e){e.exports={container:"PracticeAudioVisualizer_container__YTEE7",ref__section:"PracticeAudioVisualizer_ref__section__4Ob47",feedback__section:"PracticeAudioVisualizer_feedback__section__y_5E2",top__section:"PracticeAudioVisualizer_top__section__Wx81Z",middle__section:"PracticeAudioVisualizer_middle__section__qqtXT",bottom__section:"PracticeAudioVisualizer_bottom__section__8NU80",practice__sketch:"PracticeAudioVisualizer_practice__sketch__uiomV",silence__text:"PracticeAudioVisualizer_silence__text__XhCP2",button__section:"PracticeAudioVisualizer_button__section__mLOz_"}}}]);