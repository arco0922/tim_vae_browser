(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[493],{1009:function(t,n,e){"use strict";e.r(n),e.d(n,{Annotator:function(){return k}});var r=e(5893),a=e(2916),o=e(4524),l=e(915),u=e(5640),c=e(7941),s=e(5952),i=e(7979),f=e(7294),b=e(1639),d=e(7347),h=e(4449),m=e(9678),p=e.n(m),y=e(9327),C=e(7495);function j(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function v(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function E(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})))),r.forEach((function(n){v(t,n,e[n])}))}return t}function S(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var r,a,o=[],l=!0,u=!1;try{for(e=e.call(t);!(l=(r=e.next()).done)&&(o.push(r.value),!n||o.length!==n);l=!0);}catch(c){u=!0,a=c}finally{try{l||null==e.return||e.return()}finally{if(u)throw a}}return o}}(t,n)||g(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(t){return function(t){if(Array.isArray(t))return j(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||g(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t,n){if(t){if("string"===typeof t)return j(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?j(t,n):void 0}}var k=function(t){var n=t.repSoundId,e=t.annotations,m=t.setAnnotations,j=t.correctEstimationHistory,g=t.setCorrectEstimationHistory,k=t.goNextCallback,_=t.resetCallback,w=f.useCallback((function(t){var r=E({},e,v({},n,t));m(r)}),[m]),O=f.useCallback((function(t){var e=x(j).filter((function(t){return t[0]!==n}));e.push([n,t]),g(e)}),[j,g,n]),A=f.useCallback((function(){var t=E({},e);delete t[n],m(t),N("YET")}),[]),D=S(f.useState("YET"),2),T=D[0],N=D[1],I=S(f.useState(null),2),P=I[0],F=I[1],H=S(f.useState(0),2),R=H[0],z=H[1],L=S(f.useState(null),2),V=L[0],Y=L[1],U=S(f.useState(null),2),G=U[0],J=U[1],W=S(f.useState(null),2),B=W[0],M=W[1];f.useEffect((function(){if("YET"===T){var t=new c.f(a.R.inputDim,a.R.outputDim);F(t)}}),[T]),f.useEffect((function(){if(null!==P){var t=0,r=!0,a=!1,l=void 0;try{for(var u,c=Object.entries(e)[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){var i=S(u.value,2),f=i[0],b=i[1],d=f;if(d===n){N("DONE");var h=(0,s.H)(b);Y(h)}var m=o.g[d];P.addPoint(m,b),t+=1}}catch(C){a=!0,l=C}finally{try{r||null==c.return||c.return()}finally{if(a)throw l}}if(t>0){var p=P.estimate(o.g[n]),y=P.suggestVectors(o.g[n]);J(p),M(y)}z(t)}}),[n,e,P]);var Z=f.useCallback((function(){R<=a.R.inputDim?N("SELECT"):N("JUDGE")}),[R]),$=S(f.useState(null),2),q=$[0],K=$[1],Q=f.useCallback((function(t){K(t),N("EDIT")}),[]),X=f.useCallback((function(t){var n=(0,s.Z)(t);w(n),N("DONE")}),[w]),tt=f.useCallback((function(){N("SELECT")}),[]),nt=f.useCallback((function(){null!==G&&(w(G),O("CORRECT"),N("DONE"))}),[G,w,O]),et=f.useCallback((function(){null!==G&&N("SEARCH")}),[G]),rt=f.useCallback((function(t){w(t),O("SEARCH"),N("DONE")}),[w,O]),at=f.useCallback((function(){O("SELECT"),N("SELECT")}),[O]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["SoundID : ",n]}),(0,r.jsx)("audio",{src:(0,i.H)("/audios/repSounds/".concat(n,".wav")),controls:!0,loop:!0}),"YET"===T&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(b.z,{text:"\u3053\u306e\u97f3\u306e\u56f3\u5f62\u306e\u9078\u629e\u3092\u958b\u59cb",onClick:Z}),(0,r.jsx)(b.z,{text:"\u5168\u3066\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u9078\u629e\u3092\u30ea\u30bb\u30c3\u30c8",onClick:_,className:p().cancel__button})]}),"SELECT"===T&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Select one shape that you feel most congruent to the sound."}),(0,r.jsx)(d.L,{selectCallback:Q})]}),"EDIT"===T&&null!==q&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Adjust the parameters so that you feel the shape most congruent to the sound."}),(0,r.jsx)(h.T,{defaultShapeParams:l._[q],confirmCallback:X,cancelCallback:tt})]}),"JUDGE"===T&&null!==G&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Do you feel this shape is congruent with the sound?"}),(0,r.jsx)(y.W,{estimatedShapeVector:G,isCorrectCallback:nt,isNotCorrectCallback:et})]}),"SEARCH"===T&&null!==G&&null!==B&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Adjust the parameters so that you feel the shape most congruent to the sound."}),(0,r.jsx)(C.P,{defaultShapeVector:G,suggestionVectorsInfo:B,foundCallback:rt,notFoundCallback:at})]}),"DONE"===T&&null!==V&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.DrawSamplingPointsSketch,{canvasWidth:150,canvasHeight:150,samplingPoints:V}),(0,r.jsx)(b.z,{text:"\u6b21\u3078",onClick:k}),(0,r.jsx)(b.z,{text:"\u3053\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u9078\u629e\u3092\u3084\u308a\u76f4\u3059",onClick:A,className:p().cancel__button}),(0,r.jsx)(b.z,{text:"\u5168\u3066\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u9078\u629e\u3092\u30ea\u30bb\u30c3\u30c8",onClick:_,className:p().cancel__button})]})]})}},1639:function(t,n,e){"use strict";e.d(n,{z:function(){return u}});var r=e(5893),a=e(7294),o=e(1314),l=e.n(o),u=a.memo((function(t){var n=t.text,e=t.className,a=t.onClick,o=t.disabled,u=void 0!==o&&o;return(0,r.jsx)("button",{onClick:a,className:"".concat(l().button__basic," ").concat(e||""),disabled:u,children:n})}))},1314:function(t){t.exports={button__basic:"Button_button__basic__5C4_V"}}}]);