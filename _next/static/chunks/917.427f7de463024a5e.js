(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[917],{7417:function(n,t,e){"use strict";e.r(t),e.d(t,{StepOneAnnotator:function(){return x}});var r=e(5893),o=e(4524),a=e(915),i=e(5640),c=e(5952),u=e(7979),s=e(7294),l=e(1639),f=e(7347),p=e(4449),m=e(4815),_=e.n(m);function d(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function b(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function y(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})))),r.forEach((function(t){b(n,t,e[t])}))}return n}function v(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,a=[],i=!0,c=!1;try{for(e=e.call(n);!(i=(r=e.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(u){c=!0,o=u}finally{try{i||null==e.return||e.return()}finally{if(c)throw o}}return a}}(n,t)||function(n,t){if(!n)return;if("string"===typeof n)return d(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return d(n,t)}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var x=function(n){var t=n.annotations,e=n.setAnnotations,m=n.goNextCallback,d=s.useCallback((function(n,r){var o=y({},t,b({},n,r));e(o)}),[t,e]),x=v(s.useState({}),2),h=x[0],g=x[1];s.useEffect((function(){var n={};o.rW.forEach((function(e){var r=t[e];if(void 0!==r){var o=(0,c.H)(r);n[e]=o}})),g(n)}),[t]);var S=v(s.useState(new Set),2),A=S[0],j=S[1],C=function(n){var t=document.querySelector("#audio__".concat(n));if(null!==t){var e=t;e.paused||(e.pause(),e.currentTime=0)}},O=s.useCallback((function(n){o.rW.forEach((function(t){t!==n&&C(t)}))}),[]),N=s.useCallback((function(n){j((function(t){return new Set(t.add(n))})),O(n)}),[O]),k=v(s.useState(null),2),w=k[0],P=k[1],z=v(s.useState(null),2),E=z[0],I=z[1],W=s.useCallback((function(n){O(n),function(n){var t=document.querySelector("#audio__".concat(n));if(null!==t){var e=t;e.paused&&e.play()}}(n),P(n)}),[O]),J=v(s.useState({}),2),H=J[0],L=J[1],T=s.useCallback((function(n,t){if(null!==n){var e=y({},H,b({},n,t));L(e),P(null),I(n)}}),[H]),X=s.useCallback((function(n){C(n),P(null)}),[]),Y=s.useCallback((function(n,t){var e=(0,c.Z)(t);d(n,e),I(null)}),[d]),q=s.useCallback((function(n){I(null),P(n)}),[]),F=s.useCallback((function(n){W(n)}),[W]);return(0,r.jsxs)("div",{className:_().container,children:[(0,r.jsxs)("div",{className:_().guide__section,children:[(0,r.jsx)("h2",{className:_().title,children:"\u30b9\u30c6\u30c3\u30d71-1 ~ 1-3"}),(0,r.jsxs)("p",{children:["\u5de6\u5074\u306e",o.rW.length,"\u500b\u306e\u97f3\u5404\u3005\u306b\u5bfe\u3057\u3066\u3001\u53f3\u5074\u306e\u56f3\u5f62\u306e\u4e00\u89a7\u304b\u3089\u5bfe\u5fdc\u3059\u308b\u3068\u611f\u3058\u308b\u3082\u306e\u3092\u56de\u7b54\u3057\u3066\u4e0b\u3055\u3044\u3002"]}),(0,r.jsxs)("p",{children:["\u305f\u3060\u3057\u3001",(0,r.jsx)("span",{className:_().caution,children:"\u5168\u3066\u306e\u97f3\u3092\u4e00\u5ea6\u4ee5\u4e0a\u518d\u751f\u3057\u306a\u3044\u3068\u56f3\u5f62\u3092\u56de\u7b54\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u305b\u3093\u3002"}),(0,r.jsx)("br",{}),"\u305d\u308c\u305e\u308c\u306e\u97f3\u3092\u826f\u304f\u8074\u304d\u6bd4\u3079\u3066\u304b\u3089\u56de\u7b54\u3057\u3066\u304f\u3060\u3055\u3044\u3002"]}),(0,r.jsx)("p",{children:"\u5168\u3066\u306e\u97f3\u306b\u5bfe\u3057\u3066\u56f3\u5f62\u3092\u56de\u7b54\u3057\u7d42\u3048\u305f\u3089\u3001\u30da\u30fc\u30b8\u4e00\u756a\u4e0b\u306e\u300c\u6b21\u3078\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"})]}),(0,r.jsxs)("div",{className:_().annotate__section,children:[(0,r.jsx)("div",{className:_().annotator__section,children:o.rW.map((function(n){return(0,r.jsxs)("div",{className:_().item__container,children:[(0,r.jsx)("audio",{src:(0,u.H)("/audios/repSounds/".concat(n,".wav")),controls:!0,loop:!0,onPlay:function(){return N(n)},className:_().audio,id:"audio__".concat(n)}),w!==n&&E!==n&&void 0===h[n]&&(0,r.jsx)(l.z,{text:"\u3053\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u56de\u7b54\u3092\u958b\u59cb",onClick:function(){return W(n)},className:_().button,disabled:A.size!==o.rW.length||null!==w||null!==E}),w===n&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:_().guide,children:"\u53f3\u306e\u56f3\u5f62\u306e\u4e00\u89a7\u306e\u4e2d\u304b\u3089\u3001\u3053\u306e\u97f3\u306b\u6700\u3082\u5bfe\u5fdc\u3057\u3066\u3044\u308b\u3068\u611f\u3058\u308b\u56f3\u5f62\u3092\u4e00\u3064\u9078\u3093\u3067\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}),(0,r.jsx)(l.z,{text:"\u56f3\u5f62\u306e\u9078\u629e\u3092\u30ad\u30e3\u30f3\u30bb\u30eb",onClick:function(){return X(n)},className:"".concat(_().cancel__button," ").concat(_().button)})]}),E===n&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{className:_().guide,children:["\u30d1\u30e9\u30e1\u30fc\u30bf\u3092\u5fae\u8abf\u7bc0\u3057\u3001\u81ea\u5206\u306b\u3068\u3063\u3066\u6700\u3082\u3053\u306e\u97f3\u306b\u5bfe\u5fdc\u3059\u308b\u3068\u611f\u3058\u308b\u3088\u3046\u306b\u56f3\u5f62\u3092\u5909\u5f62\u3055\u305b\u3066\u304f\u3060\u3055\u3044\u3002",(0,r.jsx)("br",{}),"\u65e2\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u308b\u3068\u611f\u3058\u308b\u5834\u5408\u306f\u305d\u306e\u307e\u307e\u3067\u3082\u69cb\u3044\u307e\u305b\u3093\u3002"]}),(0,r.jsx)(p.T,{defaultShapeParams:a._[H[n]||"ss00"],confirmCallback:function(t){return Y(n,t)},cancelCallback:function(){return q(n)}})]}),void 0!==h[n]&&w!==n&&E!==n&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:_().guide,children:"\u3042\u306a\u305f\u304c\u3053\u306e\u97f3\u306b\u5bfe\u5fdc\u3059\u308b\u3068\u56de\u7b54\u3057\u305f\u56f3\u5f62\u306f\u4ee5\u4e0b\u306e\u901a\u308a\u3067\u3059\u3002"}),(0,r.jsx)(i.DrawSamplingPointsSketch,{canvasWidth:150,canvasHeight:150,samplingPoints:h[n]||null}),(0,r.jsx)(l.z,{text:"\u3053\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u56de\u7b54\u3092\u3084\u308a\u76f4\u3059",onClick:function(){return F(n)},className:"".concat(_().cancel__button," ").concat(_().button),disabled:A.size!==o.rW.length||null!==w||null!==E})]})]},n)}))}),(0,r.jsx)("div",{className:_().select__section,children:(0,r.jsx)(f.L,{selectCallback:function(n){return T(w,n)},disabled:null===w})})]}),(0,r.jsx)("div",{className:_().navigation__section,children:(0,r.jsx)(l.z,{text:"\u6b21\u3078",onClick:m,disabled:Object.keys(h).length!==o.rW.length,className:_().next__button})})]})}},4387:function(n,t,e){"use strict";e.d(t,{e:function(){return r}});var r={cornNum:{label:"\u30c4\u30ce\u306e\u672c\u6570",params:{min:5,max:30,step:1}},cornAmp:{label:"\u30c4\u30ce\u306e\u9577\u3055",params:{min:0,max:.5,step:.01}},randomness:{label:"\u30e9\u30f3\u30c0\u30e0\u306e\u5ea6\u5408\u3044",params:{min:0,max:1,step:.01}},randomSeed:{label:"\u30e9\u30f3\u30c0\u30e0\u306e\u3055\u305b\u65b9",params:{min:1,max:20,step:1}},innerCurve:{label:"\u30c4\u30ce\u306e\u6839\u5143\u306e\u4e38\u3055",params:{min:0,max:1,step:.01}},outerCurve:{label:"\u30c4\u30ce\u306e\u5148\u7aef\u306e\u4e38\u3055",params:{min:0,max:1,step:.01}}}},5952:function(n,t,e){"use strict";e.d(t,{H:function(){return f},Z:function(){return l}});var r=e(9645),o=e.n(r),a=e(4035),i=e.n(a);function c(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function u(n){return function(n){if(Array.isArray(n))return c(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,t){if(!n)return;if("string"===typeof n)return c(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return c(n,t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var s=2e3,l=function(n){var t=n.cornNum,e=n.cornAmp,r=n.randomness,o=n.randomSeed,a=n.outerCurve,c=n.innerCurve,s=new(i())((function(){})),l=_({p:s,cornNum:t,cornAmp:e,randomness:r,randomSeed:o,innerCurve:c,outerCurve:a}),f=l.samplingPointsX,p=l.samplingPointsY,m=d(f),b=d(p);return u(m).concat(u(b))},f=function(n){var t=n.length/4,e=n.slice(0,2*t),r=n.slice(2*t),o=b(e),a=b(r);return o.map((function(n,t){return[n,a[t]]}))},p=function(n){for(var t=n.p,e=n.bezierOperator,r=0,o=e[0].x,a=e[0].y,i=o,c=a,u=Array(2001),l=0;l<=s;l++)i=t.bezierPoint(e[0].x,e[1].x,e[2].x,e[3].x,l/s),c=t.bezierPoint(e[0].y,e[1].y,e[2].y,e[3].y,l/s),r+=t.dist(o,a,i,c),u[l]=r,o=i,a=c;return u},m=function(n){for(var t=n.p,e=n.bezierOperator,r=n.distArray,o=n.offset,a=n.segmentL,i=0,c=[],u=[],l=0;l<=s;l++)if(r[l]>=a*i+o){var f=t.bezierPoint(e[0].x,e[1].x,e[2].x,e[3].x,l/s),p=t.bezierPoint(e[0].y,e[1].y,e[2].y,e[3].y,l/s);c.push(f),u.push(p),i+=1}return{pointsX:c,pointsY:u,rest:o+i*a-r[2e3]}},_=function(n){var t=n.p,e=n.cornNum,r=n.cornAmp,o=n.randomness,a=n.randomSeed,i=n.outerCurve,c=n.innerCurve;t.randomSeed(a);for(var s=Array(2*e),l=Array(2*e),f=0;f<2*e;f++)s[f]=1*(1+r*t.pow(-1,f)+o*t.random(-1,1)*.4),l[f]=t.PI*f/e-t.PI/2+o*t.random(-1,1)*t.PI/e;for(var _=Array(2*e),d=Array(2*e),b=0;b<2*e;b++){var y=b,v=(b+1)%(2*e),x=s[y]*t.cos(l[y]),h=s[y]*t.sin(l[y]),g=s[v]*t.cos(l[v]),S=s[v]*t.sin(l[v]),A=t.createVector(-h,x).normalize(),j=t.createVector(S,-g).normalize(),C=void 0;y%2==0?(C=[{x:x,y:h},{x:x+.5*i*A.x,y:h+.5*i*A.y},{x:g+.5*c*j.x,y:S+.5*c*j.y},{x:g,y:S}],_[b]=C,d[b]=p({p:t,bezierOperator:C})):(C=[{x:x,y:h},{x:x+.5*c*A.x,y:h+.5*c*A.y},{x:g+.5*i*j.x,y:S+.5*i*j.y},{x:g,y:S}],_[b]=C,d[b]=p({p:t,bezierOperator:C}))}var O=0;d.forEach((function(n){return O+=n[2e3]}));for(var N=O/512,k=0,w=[],P=[],z=0;z<2*e;z++){var E=m({p:t,bezierOperator:_[z],distArray:d[z],offset:k,segmentL:N}),I=E.pointsX,W=E.pointsY,J=E.rest;w=u(w).concat(u(I)),P=u(P).concat(u(W)),k=J}for(;w.length>512;)w.pop(),P.pop();return{samplingPointsX:w,samplingPointsY:P}},d=function(n){var t=new(o())(n.length),e=t.toComplexArray(n,null),r=t.createComplexArray();return t.transform(r,e),r},b=function(n){var t=n.length/2,e=new(o())(t),r=e.createComplexArray();return e.inverseTransform(r,n),e.fromComplexArray(r,null)}},7979:function(n,t,e){"use strict";e.d(t,{H:function(){return o}});var r=e(1752);function o(n){return(0,r.default)().publicRuntimeConfig.urlPrefix+n}},4815:function(n){n.exports={container:"StepOneAnnotator_container__F0Yz2",guide__section:"StepOneAnnotator_guide__section__LOhpS",annotate__section:"StepOneAnnotator_annotate__section__NNOMJ",annotator__section:"StepOneAnnotator_annotator__section__buMEJ",select__section:"StepOneAnnotator_select__section__iuiqN",item__container:"StepOneAnnotator_item__container__JcWnC",title:"StepOneAnnotator_title__JSJvm",caution:"StepOneAnnotator_caution__ERtge",audio:"StepOneAnnotator_audio__u_Iup",guide:"StepOneAnnotator_guide__5I7J7",button__section:"StepOneAnnotator_button__section__f7LV9",button:"StepOneAnnotator_button__1unq1",cancel__button:"StepOneAnnotator_cancel__button__GJXjh",navigation__section:"StepOneAnnotator_navigation__section__RZP1g",next__button:"StepOneAnnotator_next__button__CueS3"}}}]);