(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2142],{1752:function(n,e,t){n.exports=t(6949)},2264:function(n,e,t){"use strict";t.r(e),t.d(e,{AudioVisualizer:function(){return D}});var r=t(4051),a=t.n(r),o=t(5893),i=t(9589),u=t(7294),s=t(2230),c=t(8982),l=t.n(c),f=t(5152),d=t.n(f),h=t(7979),p=t(7941),v=t(2916),m=t(4524),_=t(5952),x=t(1682);var b=function(){function n(e,t,r){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.shapeFreqs=[],this.durations=[],this.changeDurationMin=e,this.changeDurationMax=t,this.totalDuration=r,this.initShapeFreqsAndDurations()}var e=n.prototype;return e.initShapeFreqsAndDurations=function(){for(var n=0;n<=this.totalDuration;){var e=this.changeDurationMin+Math.random()*(this.changeDurationMax-this.changeDurationMin);this.durations.push(e),n+=e}for(var t=0;t<=this.durations.length;t++){var r=(0,x.V)(),a=(0,_.Z)(r);this.shapeFreqs.push(a)}},e.estimate=function(n){for(var e=0,t=n;t-this.durations[e]>0;)t-=this.durations[e],e+=1;var r=e+1;if(e<0||r>=this.shapeFreqs.length)return null;var a=t/this.durations[e],o=1-a;return this._linearInterpolateVector([o,a],[this.shapeFreqs[e],this.shapeFreqs[r]])},e._linearInterpolateVector=function(n,e){var t=n.length;if(0===t)return[];for(var r=e[0].length,a=new Array(r).fill(0),o=0;o<r;o++)for(var i=0;i<t;i++)a[o]+=n[i]*e[i][o];return a},n}(),w=t(1639);function y(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function g(n,e,t,r,a,o,i){try{var u=n[o](i),s=u.value}catch(c){return void t(c)}u.done?e(s):Promise.resolve(s).then(r,a)}function k(n){return function(){var e=this,t=arguments;return new Promise((function(r,a){var o=n.apply(e,t);function i(n){g(o,r,a,i,u,"next",n)}function u(n){g(o,r,a,i,u,"throw",n)}i(void 0)}))}}function S(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,a,o=[],i=!0,u=!1;try{for(t=t.call(n);!(i=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);i=!0);}catch(s){u=!0,a=s}finally{try{i||null==t.return||t.return()}finally{if(u)throw a}}return o}}(n,e)||E(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(n){return function(n){if(Array.isArray(n))return y(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||E(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(n,e){if(n){if("string"===typeof n)return y(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?y(n,e):void 0}}var j=d()((function(){return t.e(9157).then(t.bind(t,9157)).then((function(n){return n.PlotLatentSketch}))}),{loadableGenerated:{webpack:function(){return[9157]}},ssr:!1}),N=d()((function(){return t.e(5640).then(t.bind(t,5640)).then((function(n){return n.DrawSamplingPointsSketch}))}),{loadableGenerated:{webpack:function(){return[5640]}},ssr:!1}),M=2/21,C=500,D=function(n){var e=n.useMicrophone,t=void 0!==e&&e,r=n.audioFilePath,c=n.visualizerConfig,f=n.visualizeMode,d=n.annotations,x=n.title,y=n.className,g=S(u.useState(null),2),E=g[0],D=g[1];u.useEffect((function(){if(null===E){window.AudioContext=window.AudioContext||window.webkitAudioContext;var n=new AudioContext;D(n)}}),[]);var F=u.useRef(null),P=S(u.useState(null),2),z=P[0],V=P[1];u.useEffect((function(){null!==E&&null===F.current&&null===z&&t&&void 0!==navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then((function(n){var e=E.createMediaStreamSource(n);V(e)})).catch((function(n){console.error(n)}))}),[E]),u.useEffect((function(){if(null!==E&&null!==F.current&&null===z&&!t){var n=F.current,e=E.createMediaElementSource(n);V(e)}}),[E]);var H=S(u.useState(null),2),I=H[0],T=H[1];u.useEffect((function(){if(null!==E&&null===I){var n=function(){var n=k(a().mark((function n(){var e;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,E.audioWorklet.addModule("LONG_FAST"===c.encoderMode?(0,h.H)("/worklet-scripts/resample_mel.worklet.js"):(0,h.H)("/worklet-scripts/resample.worklet.js"));case 2:e=new AudioWorkletNode(E,"LONG_FAST"===c.encoderMode?"resample-mel.worklet":"resample.worklet",{parameterData:{bufferSize:c.frameLength,resampleRate:c.samplingRate}}),T(e);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}}),[E,c]),u.useEffect((function(){null!==E&&null!==z&&null!==I&&(z.connect(I),t||z.connect(E.destination))}),[E,z,I,t]);var L=S(u.useState(null),2),O=L[0],R=L[1],q=S(u.useState(null),2),W=q[0],G=q[1];u.useEffect((function(){var n=function(){var n=k(a().mark((function n(){var e,t;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.YLj((0,h.H)(c.encoderJSONPath));case 2:e=n.sent,t=new i.s(c.isFlipped,e,c.encoderPreprocessor,G),R(t);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[c]);var U=S(u.useState(!0),2),Z=U[0],J=U[1];u.useEffect((function(){null!==I&&null!==O&&(I.port.onmessage=function(){var n=k(a().mark((function n(e){return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null!==e.data){n.next=3;break}return J(!0),n.abrupt("return");case 3:J(!1),O.encodeAudio(e.data);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}),[I,O]);var B=S(u.useState([]),2),K=B[0],Q=B[1],X=S(u.useState(null),2),Y=X[0],$=X[1];u.useEffect((function(){if(null!==W){var n=A(K).concat([W]),e=n.length<=20?n:n.slice(1);Q(e)}}),[W]),u.useEffect((function(){var n=K.length;if(0!==n){var e=K[n-1];if(null===Y||n<20){for(var t=[],r=0;r<e.coord.length;r++){for(var a=0,o=0;o<n;o++)a+=K[o].coord[r];t.push(a/n)}$({coord:t})}else{var i=Y.coord.map((function(n,t){return n*(1-M)+e.coord[t]*M}));$({coord:i})}}}),[K]);var nn=S(u.useState(!1),2),en=nn[0],tn=nn[1],rn=u.useCallback((function(){tn(!0),null!==E&&"running"!==E.state&&E.resume()}),[E]),an=u.useCallback((function(){tn(!1),null!==E&&"suspended"!==E.state&&E.suspend()}),[E]),on=S(u.useState(null),2),un=on[0],sn=on[1],cn=S(u.useState(0),2),ln=cn[0],fn=cn[1],dn=S(u.useState(null),2),hn=dn[0],pn=dn[1];u.useEffect((function(){if("SHAPE"===f){var n=new p.f(v.R.inputDim,v.R.outputDim);sn(n)}}),[f]),u.useEffect((function(){if(null!==un&&void 0!==d){var n=0,e=!0,t=!1,r=void 0;try{for(var a,o=Object.entries(d)[Symbol.iterator]();!(e=(a=o.next()).done);e=!0){var i=S(a.value,2),u=i[0],s=i[1],c=u,l=m.gu[c];un.addPoint(l,s),n+=1}}catch(f){t=!0,r=f}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}fn(n)}}),[d,un]),u.useEffect((function(){if("SHAPE"===f&&null!==un&&null!==Y&&0!==ln){var n=un.estimate(Y.coord),e=(0,_.H)(n);pn(e)}}),[f,Y,un,ln]);var vn=S(u.useState(null),2),mn=vn[0],_n=vn[1],xn=u.useCallback((function(){if("RANDOM"===f&&null!==F.current){var n=F.current,e=new b(1,2,n.duration);_n(e)}}),[f]);return u.useEffect((function(){if("RANDOM"===f&&null!==mn&&null!==Y&&null!==F.current){var n=mn.estimate(F.current.currentTime);if(null!==n){var e=(0,_.H)(n);pn(e)}}}),[f,Y,mn]),(0,o.jsxs)("div",{className:"".concat(l().container," ").concat(y),children:[x&&(0,o.jsx)("h4",{className:l().title,children:x}),void 0!==r&&(0,o.jsx)("audio",{src:(0,h.H)(r),controls:!0,loop:!0,ref:F,preload:"metadata",onClick:rn,onPlay:rn,onPause:an,onLoadedMetadata:xn}),"CHECK"===f&&(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("p",{children:["\u30b9\u30c6\u30fc\u30bf\u30b9\uff1a",null===F.current||F.current.paused?"\u97f3\u3092\u518d\u751f\u3057\u3066\u304f\u3060\u3055\u3044":null===Y?"\u30c6\u30b9\u30c8\u4e2d":NaN===Y.coord[0]?"\u5931\u6557":"\u6210\u529f"]})}),"LATENT"===f&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:l().coord__text,children:[(0,o.jsxs)("p",{children:["first: ",null===Y||void 0===Y?void 0:Y.coord[0]]}),(0,o.jsxs)("p",{children:["second: ",null===Y||void 0===Y?void 0:Y.coord[1]]})]}),(0,o.jsx)(j,{canvasWidth:C,canvasHeight:C,encodeResult:Y,latentImgInfo:c.latentImgInfo,className:l().sketch__container})]}),("SHAPE"===f||"RANDOM"===f)&&(0,o.jsxs)("div",{className:l().sketch__section,children:[Z&&(0,o.jsx)("p",{className:l().silence__text,children:"No sound detected"}),(0,o.jsx)(N,{canvasWidth:C,canvasHeight:C,samplingPoints:hn})]}),t&&(0,o.jsx)("div",{className:l().button__section,children:en?(0,o.jsx)(w.z,{text:"\u7d42\u4e86",onClick:an}):(0,o.jsx)(w.z,{text:"\u7df4\u7fd2\u958b\u59cb",onClick:rn})})]})}},4387:function(n,e,t){"use strict";t.d(e,{e:function(){return r}});var r={cornNum:{label:"\u30c4\u30ce\u306e\u672c\u6570",params:{min:5,max:30,step:1}},cornAmp:{label:"\u30c4\u30ce\u306e\u9577\u3055",params:{min:0,max:.5,step:.01}},randomness:{label:"\u30e9\u30f3\u30c0\u30e0\u306e\u5ea6\u5408\u3044",params:{min:0,max:1,step:.01}},randomSeed:{label:"\u30e9\u30f3\u30c0\u30e0\u306e\u3055\u305b\u65b9",params:{min:1,max:20,step:1}},innerCurve:{label:"\u30c4\u30ce\u306e\u6839\u5143\u306e\u4e38\u3055",params:{min:0,max:1,step:.01}},outerCurve:{label:"\u30c4\u30ce\u306e\u5148\u7aef\u306e\u4e38\u3055",params:{min:0,max:1,step:.01}}}},9589:function(n,e,t){"use strict";t.d(e,{s:function(){return u}});var r=t(4051),a=t.n(r),o=t(2230);function i(n,e,t,r,a,o,i){try{var u=n[o](i),s=u.value}catch(c){return void t(c)}u.done?e(s):Promise.resolve(s).then(r,a)}var u=function(){function n(e,t,r,a){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.isEncoding=!1,this.result=null,this.callback=void 0,this.isFlipped=e,this.encoder=t,this.preprocessor=r,a&&(this.callback=a)}return n.prototype.encodeAudio=function(n){var e,t=this;return(e=a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isEncoding&&null!==n){e.next=2;break}return e.abrupt("return");case 2:return t.isEncoding=!0,e.next=5,o.glt();case 5:return o.lub((function(){var e=t.preprocessor(n),r=t.encoder.predict([e]),a=t.isFlipped?1:0,i=o.XLQ(r[a],[2]),u=Array.from(i.dataSync());t.result={coord:u},t.callback&&t.callback({coord:u})})),t.isEncoding=!1,e.next=9,o.glt();case 9:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function u(n){i(o,r,a,u,s,"next",n)}function s(n){i(o,r,a,u,s,"throw",n)}u(void 0)}))})()},n}()},1682:function(n,e,t){"use strict";t.d(e,{V:function(){return a}});var r=t(4387),a=function(){var n={};return["cornNum","cornAmp","randomness","randomSeed","innerCurve","outerCurve"].forEach((function(e){var t=function(n){var e=n.min,t=n.max,r=n.step,a=Math.floor((t-e)/r);return e+Math.floor(Math.random()*a)*r}(r.e[e].params);n[e]=t})),n}},8982:function(n){n.exports={container:"AudioVisualizer_container__F_TNB",title:"AudioVisualizer_title__NWWgt",coord__text:"AudioVisualizer_coord__text__JklgV",sketch__container:"AudioVisualizer_sketch__container__uaL9G",sketch__section:"AudioVisualizer_sketch__section__9_kl9",silence__text:"AudioVisualizer_silence__text__gZenq",button__section:"AudioVisualizer_button__section__jbI0Z"}}}]);