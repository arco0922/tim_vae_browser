(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[397],{1752:function(r,n,t){r.exports=t(6949)},8461:function(r,n,t){"use strict";t.r(n),t.d(n,{AudioVisualizer:function(){return F}});var e=t(4051),o=t.n(e),a=t(5893),i=t(2230);function s(r,n,t,e,o,a,i){try{var s=r[a](i),u=s.value}catch(c){return void t(c)}s.done?n(u):Promise.resolve(u).then(e,o)}var u=function(){function r(n,t,e,o){!function(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r),this.isEncoding=!1,this.result=null,this.callback=void 0,this.isFlipped=n,this.encoder=t,this.preprocessor=e,o&&(this.callback=o)}return r.prototype.encodeAudio=function(r){var n,t=this;return(n=o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.isEncoding&&null!==r){n.next=2;break}return n.abrupt("return");case 2:return t.isEncoding=!0,n.next=5,i.glt();case 5:return i.lub((function(){var n=t.preprocessor(r),e=t.encoder.predict([n]),o=t.isFlipped?1:0,a=i.XLQ(e[o],[2]),s=Array.from(a.dataSync());t.result={coord:s},t.callback&&t.callback({coord:s})})),t.isEncoding=!1,n.next=9,i.glt();case 9:case"end":return n.stop()}}),n)})),function(){var r=this,t=arguments;return new Promise((function(e,o){var a=n.apply(r,t);function i(r){s(a,e,o,i,u,"next",r)}function u(r){s(a,e,o,i,u,"throw",r)}i(void 0)}))})()},r}(),c=t(7294),l=t(8982),f=t.n(l),d=t(5152),h=t.n(d),p=t(7979),v=t(7941),_=t(2916),m=t(4524),w=t(5952),y=t(4387),g=function(){var r={};return["cornNum","cornAmp","randomness","randomSeed","innerCurve","outerCurve"].forEach((function(n){var t=function(r){var n=r.min,t=r.max,e=r.step,o=Math.floor((t-n)/e);return n+Math.floor(Math.random()*o)*e}(y.e[n].params);r[n]=t})),r};var b=function(){function r(n,t,e){!function(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r),this.shapeFreqs=[],this.durations=[],this.changeDurationMin=n,this.changeDurationMax=t,this.totalDuration=e,this.initShapeFreqsAndDurations()}var n=r.prototype;return n.initShapeFreqsAndDurations=function(){for(var r=0;r<=this.totalDuration;){var n=this.changeDurationMin+Math.random()*(this.changeDurationMax-this.changeDurationMin);this.durations.push(n),r+=n}for(var t=0;t<=this.durations.length;t++){var e=g(),o=(0,w.Z)(e);this.shapeFreqs.push(o)}},n.estimate=function(r){for(var n=0,t=r;t-this.durations[n]>0;)t-=this.durations[n],n+=1;var e=n+1;if(n<0||e>=this.shapeFreqs.length)return null;var o=t/this.durations[n],a=1-o;return this._linearInterpolateVector([a,o],[this.shapeFreqs[n],this.shapeFreqs[e]])},n._linearInterpolateVector=function(r,n){var t=r.length;if(0===t)return[];for(var e=n[0].length,o=new Array(e).fill(0),a=0;a<e;a++)for(var i=0;i<t;i++)o[a]+=r[i]*n[i][a];return o},r}();function S(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function A(r,n,t,e,o,a,i){try{var s=r[a](i),u=s.value}catch(c){return void t(c)}s.done?n(u):Promise.resolve(u).then(e,o)}function k(r){return function(){var n=this,t=arguments;return new Promise((function(e,o){var a=r.apply(n,t);function i(r){A(a,e,o,i,s,"next",r)}function s(r){A(a,e,o,i,s,"throw",r)}i(void 0)}))}}function x(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var t=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,o,a=[],i=!0,s=!1;try{for(t=t.call(r);!(i=(e=t.next()).done)&&(a.push(e.value),!n||a.length!==n);i=!0);}catch(u){s=!0,o=u}finally{try{i||null==t.return||t.return()}finally{if(s)throw o}}return a}}(r,n)||M(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(r){return function(r){if(Array.isArray(r))return S(r)}(r)||function(r){if("undefined"!==typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||M(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(r,n){if(r){if("string"===typeof r)return S(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?S(r,n):void 0}}var j=h()((function(){return t.e(157).then(t.bind(t,9157)).then((function(r){return r.PlotLatentSketch}))}),{loadableGenerated:{webpack:function(){return[9157]}},ssr:!1}),P=h()((function(){return t.e(640).then(t.bind(t,5640)).then((function(r){return r.DrawSamplingPointsSketch}))}),{loadableGenerated:{webpack:function(){return[5640]}},ssr:!1}),C=2/21,D=500,F=function(r){var n=r.audioFilePath,t=r.visualizerConfig,e=r.visualizeMode,s=r.annotations,l=r.title,d=x(c.useState(null),2),h=d[0],y=d[1];c.useEffect((function(){if(null===h){window.AudioContext=window.AudioContext||window.webkitAudioContext;var r=new AudioContext;y(r)}}),[]);var g=c.useRef(null),S=x(c.useState(null),2),A=S[0],M=S[1];c.useEffect((function(){if(null!==h&&null!==g.current&&null===A){var r=g.current,n=h.createMediaElementSource(r);M(n)}}),[h]);var F=x(c.useState(null),2),N=F[0],H=F[1];c.useEffect((function(){if(null!==h&&null===N){var r=function(){var r=k(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,h.audioWorklet.addModule("LONG_FAST"===t.encoderMode?(0,p.H)("/worklet-scripts/resample_mel.worklet.js"):(0,p.H)("/worklet-scripts/resample.worklet.js"));case 2:n=new AudioWorkletNode(h,"LONG_FAST"===t.encoderMode?"resample-mel.worklet":"resample.worklet",{parameterData:{bufferSize:t.frameLength,resampleRate:t.samplingRate}}),H(n);case 4:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();r()}}),[h,t]),c.useEffect((function(){null!==h&&null!==A&&null!==N&&A.connect(N).connect(h.destination)}),[h,A,N]);var I=x(c.useState(null),2),T=I[0],L=I[1],O=x(c.useState(null),2),R=O[0],q=O[1];c.useEffect((function(){var r=function(){var r=k(o().mark((function r(){var n,e;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,i.YLj((0,p.H)(t.encoderJSONPath));case 2:n=r.sent,e=new u(t.isFlipped,n,t.encoderPreprocessor,q),L(e);case 5:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();r()}),[t]),c.useEffect((function(){null!==N&&null!==T&&(N.port.onmessage=function(){var r=k(o().mark((function r(n){return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:T.encodeAudio(n.data);case 1:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}())}),[N,T]);var z=x(c.useState([]),2),V=z[0],W=z[1],G=x(c.useState(null),2),B=G[0],J=G[1];c.useEffect((function(){if(null!==R){var r=E(V).concat([R]),n=r.length<=20?r:r.slice(1);W(n)}}),[R]),c.useEffect((function(){var r=V.length;if(0!==r){var n=V[r-1];if(null===B||r<20){for(var t=[],e=0;e<n.coord.length;e++){for(var o=0,a=0;a<r;a++)o+=V[a].coord[e];t.push(o/r)}J({coord:t})}else{var i=B.coord.map((function(r,t){return r*(1-C)+n.coord[t]*C}));J({coord:i})}}}),[V]);var Q=c.useCallback((function(){null!==h&&"running"!==h.state&&h.resume()}),[h]),U=c.useCallback((function(){null!==h&&"suspended"!==h.state&&h.suspend()}),[h]),X=x(c.useState(null),2),Y=X[0],Z=X[1],$=x(c.useState(0),2),K=$[0],rr=$[1],nr=x(c.useState(null),2),tr=nr[0],er=nr[1];c.useEffect((function(){if("SHAPE"===e){var r=new v.f(_.R.inputDim,_.R.outputDim);Z(r)}}),[e]),c.useEffect((function(){if(null!==Y&&void 0!==s){var r=0,n=!0,t=!1,e=void 0;try{for(var o,a=Object.entries(s)[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var i=x(o.value,2),u=i[0],c=i[1],l=u,f=m.g[l];Y.addPoint(f,c),r+=1}}catch(d){t=!0,e=d}finally{try{n||null==a.return||a.return()}finally{if(t)throw e}}rr(r)}}),[s,Y]),c.useEffect((function(){if("SHAPE"===e&&null!==Y&&null!==B&&0!==K){var r=Y.estimate(B.coord),n=(0,w.H)(r);er(n)}}),[e,B,Y,K]);var or=x(c.useState(null),2),ar=or[0],ir=or[1],sr=c.useCallback((function(){if("RANDOM"===e&&null!==g.current){var r=g.current,n=new b(1,2,r.duration);ir(n)}}),[e]);return c.useEffect((function(){if("RANDOM"===e&&null!==ar&&null!==B&&null!==g.current){var r=ar.estimate(g.current.currentTime);if(null!==r){var n=(0,w.H)(r);er(n)}}}),[e,B,ar]),(0,a.jsxs)("div",{className:f().container,children:[l&&(0,a.jsx)("h4",{className:f().title,children:l}),(0,a.jsx)("audio",{src:(0,p.H)(n),controls:!0,loop:!0,ref:g,preload:"metadata",onClick:Q,onPlay:Q,onPause:U,onLoadedMetadata:sr}),"LATENT"===e&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("p",{children:["first: ",null===B||void 0===B?void 0:B.coord[0]]}),(0,a.jsxs)("p",{children:["second: ",null===B||void 0===B?void 0:B.coord[1]]}),(0,a.jsx)(j,{canvasWidth:D,canvasHeight:D,encodeResult:B,latentImgInfo:t.latentImgInfo,className:f().sketch__container})]}),("SHAPE"===e||"RANDOM"===e)&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(P,{canvasWidth:D,canvasHeight:D,samplingPoints:tr})})]})}},4524:function(r,n,t){"use strict";t.d(n,{P:function(){return e},g:function(){return o}});var e=["rs1_00","rs1_01","rs1_02","rs2_00","rs2_01","rs2_02","rs2_03","rs2_04","rs2_05","rs2_06","rs2_07","rs2_08","rs2_09","rs2_10","rs2_11","rs2_12","rs2_13","rs2_14","rs2_15","rs2_16","rs2_17","rs2_18","rs2_19","rs2_20","rs2_21","rs2_22","rs2_23","rs2_24","rs2_25","rs2_26","rs2_27","rs2_28","rs2_29"],o={rs1_00:[2.1120596,-5.1291986],rs1_01:[1.5762187,2.60493],rs1_02:[-2.382232,.10038004],rs2_00:[2.5993729,-1.2009252],rs2_01:[-.94393796,-3.1945283],rs2_02:[.30973345,.21844022],rs2_03:[3.47645,1.0034096],rs2_04:[1.4669484,-3.0503924],rs2_05:[-.88771594,-1.2711746],rs2_06:[.83919644,-1.4324392],rs2_07:[1.8265278,.890573],rs2_08:[-1.0803591,1.0704242],rs2_09:[.2325852,-2.6102617],rs2_10:[.6404754,1.698138],rs2_11:[1.4612306,-.3326639],rs2_12:[2.6401613,1.8669294],rs2_13:[-1.0652071,-.106734954],rs2_14:[2.209707,-3.9786203],rs2_15:[2.5716124,-.07289239],rs2_16:[-1.5073073,-2.1868656],rs2_17:[.029848829,-.78534675],rs2_18:[1.55066,-2.0992553],rs2_19:[-.12433945,1.0623416],rs2_20:[-.06967662,-1.7259902],rs2_21:[1.2427349,-3.9178205],rs2_22:[1.7086548,-1.2185427],rs2_23:[-1.9910475,.89425653],rs2_24:[-1.8384401,-.5902677],rs2_25:[-.6483803,-2.3826134],rs2_26:[1.1159008,.4414356],rs2_27:[.52229494,-3.384752],rs2_28:[2.6333241,.76941025],rs2_29:[1.7951645,1.6901001]}},8982:function(r){r.exports={container:"AudioVisualizer_container__F_TNB",title:"AudioVisualizer_title__NWWgt",sketch__container:"AudioVisualizer_sketch__container__uaL9G"}}}]);