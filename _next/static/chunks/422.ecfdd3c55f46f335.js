(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[422],{9327:function(t,e,n){"use strict";n.d(e,{W:function(){return l}});var r=n(5893),a=n(1639),o=n(5640),c=n(5952),i=n(8018),s=n.n(i),l=function(t){var e=t.estimatedShapeVector,n=t.isCorrectCallback,i=t.isNotCorrectCallback;return(0,r.jsxs)("div",{className:s().container,children:[(0,r.jsx)("div",{className:s().sketch__section,children:(0,r.jsx)(o.DrawSamplingPointsSketch,{canvasWidth:150,canvasHeight:150,samplingPoints:(0,c.H)(e)})}),(0,r.jsxs)("div",{className:s().button__section,children:[(0,r.jsx)(a.z,{text:"\u3053\u306e\u56f3\u5f62\u3067\u554f\u984c\u306a\u3044",className:s().confirm__button,onClick:n}),(0,r.jsx)(a.z,{text:"\u56f3\u5f62\u3092\u4fee\u6b63\u3059\u308b",className:s().cancel__button,onClick:i})]})]})}},7495:function(t,e,n){"use strict";n.d(e,{P:function(){return y}});var r=n(5893),a=n(5952),o=n(5152),c=n.n(o),i=n(7294),s=n(5872),l=n.n(s),u=n(2055),_=n(7995),f=n(1639);function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],c=!0,i=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);c=!0);}catch(s){i=!0,a=s}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}}(t,e)||m(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||m(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t,e){if(t){if("string"===typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}var p=c()((function(){return Promise.resolve().then(n.bind(n,5640)).then((function(t){return t.DrawSamplingPointsSketch}))}),{loadableGenerated:{webpack:function(){return[5640]}},ssr:!1}),y=function(t){var e=t.defaultShapeVector,n=t.suggestionVectorsInfo,o=t.foundCallback,c=t.notFoundCallback,s=h(i.useState(new Array(n.length).fill(0)),2),d=s[0],m=s[1],y=i.useCallback((function(t,e){var n=b(d);n[t]=e,m(n)}),[d]),v=h(i.useState(e),2),S=v[0],C=v[1],x=h(i.useState((0,a.H)(e)),2),j=x[0],g=x[1];return i.useEffect((function(){var t=b(e);d.forEach((function(e,r){t=u.IHx(t,u.JpY(e,n[r].vector))})),C(t)}),[e,n,d]),i.useEffect((function(){var t=(0,a.H)(S);g(t)}),[S]),(0,r.jsxs)("div",{className:l().container,children:[(0,r.jsxs)("div",{className:l().searcher__section,children:[(0,r.jsx)("div",{className:l().sketch__section,children:(0,r.jsx)(p,{canvasWidth:150,canvasHeight:150,samplingPoints:j})}),(0,r.jsx)("div",{className:l().edit__section,children:(0,r.jsx)("div",{className:l().slider__section,children:n.map((function(t,e){return(0,r.jsx)("div",{className:l().slider__wrapper,children:(0,r.jsx)(_.I,{value:d[e],setValue:function(t){return y(e,t)},min:t.minCoefficient,max:t.maxCoefficient,step:(t.maxCoefficient-t.minCoefficient)/100,className:l().slider})},"slider_".concat(e))}))})})]}),(0,r.jsxs)("div",{className:l().button__section,children:[void 0!==o&&(0,r.jsx)(f.z,{text:"\u3053\u306e\u56f3\u5f62\u3067\u6c7a\u5b9a",className:l().confirm__button,onClick:function(){return o(S)}}),c&&(0,r.jsx)(f.z,{text:"\u3053\u306e\u30d1\u30e9\u30e1\u30fc\u30bf\u3067\u306f\u5bfe\u5fdc\u3059\u308b\u3068\u611f\u3058\u308b\u56f3\u5f62\u3092\u4f5c\u308c\u306a\u3044",className:l().cancel__button,onClick:c})]})]})}},1009:function(t,e,n){"use strict";n.r(e),n.d(e,{Annotator:function(){return k}});var r=n(5893),a=n(2916),o=n(4524),c=n(915),i=n(5640),s=n(7941),l=n(5952),u=n(7979),_=n(7294),f=n(1639),d=n(7347),h=n(4449),b=n(9678),m=n.n(b),p=n(9327),y=n(7495);function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function S(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function C(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){S(t,e,n[e])}))}return t}function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],c=!0,i=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);c=!0);}catch(s){i=!0,a=s}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}}(t,e)||g(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(t){return function(t){if(Array.isArray(t))return v(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||g(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t,e){if(t){if("string"===typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}var k=function(t){var e=t.repSoundId,n=t.annotations,b=t.setAnnotations,v=t.correctEstimationHistory,g=t.setCorrectEstimationHistory,k=t.goNextCallback,E=t.resetCallback,A=_.useCallback((function(t){var r=C({},n,S({},e,t));b(r)}),[b]),w=_.useCallback((function(t){var n=j(v).filter((function(t){return t[0]!==e}));n.push([e,t]),g(n)}),[v,g,e]),N=_.useCallback((function(){var t=C({},n);delete t[e],b(t),D("YET")}),[]),O=x(_.useState("YET"),2),I=O[0],D=O[1],H=x(_.useState(null),2),T=H[0],P=H[1],F=x(_.useState(0),2),z=F[0],R=F[1],V=x(_.useState(null),2),J=V[0],W=V[1],L=x(_.useState(null),2),Y=L[0],G=L[1],U=x(_.useState(null),2),B=U[0],M=U[1];_.useEffect((function(){if("YET"===I){var t=new s.f(a.R.inputDim,a.R.outputDim);P(t)}}),[I]),_.useEffect((function(){if(null!==T){var t=0,r=!0,a=!1,c=void 0;try{for(var i,s=Object.entries(n)[Symbol.iterator]();!(r=(i=s.next()).done);r=!0){var u=x(i.value,2),_=u[0],f=u[1],d=_;if(d===e){D("DONE");var h=(0,l.H)(f);W(h)}var b=o.gu[d];T.addPoint(b,f),t+=1}}catch(y){a=!0,c=y}finally{try{r||null==s.return||s.return()}finally{if(a)throw c}}if(t>0){var m=T.estimate(o.gu[e]),p=T.suggestVectors(o.gu[e]);G(m),M(p)}R(t)}}),[e,n,T]);var X=_.useCallback((function(){z<=a.R.inputDim?D("SELECT"):D("JUDGE")}),[z]),$=x(_.useState(null),2),q=$[0],K=$[1],Q=_.useCallback((function(t){K(t),D("EDIT")}),[]),Z=_.useCallback((function(t){var e=(0,l.Z)(t);A(e),D("DONE")}),[A]),tt=_.useCallback((function(){D("SELECT")}),[]),et=_.useCallback((function(){null!==Y&&(A(Y),w("CORRECT"),D("DONE"))}),[Y,A,w]),nt=_.useCallback((function(){null!==Y&&D("SEARCH")}),[Y]),rt=_.useCallback((function(t){A(t),w("SEARCH"),D("DONE")}),[A,w]),at=_.useCallback((function(){w("SELECT"),D("SELECT")}),[w]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["SoundID : ",e]}),(0,r.jsx)("audio",{src:(0,u.H)("/audios/repSounds/".concat(e,".wav")),controls:!0,loop:!0}),"YET"===I&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.z,{text:"\u3053\u306e\u97f3\u306e\u56f3\u5f62\u306e\u9078\u629e\u3092\u958b\u59cb",onClick:X}),(0,r.jsx)(f.z,{text:"\u5168\u3066\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u9078\u629e\u3092\u30ea\u30bb\u30c3\u30c8",onClick:E,className:m().cancel__button})]}),"SELECT"===I&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Select one shape that you feel most congruent to the sound."}),(0,r.jsx)(d.L,{selectCallback:Q})]}),"EDIT"===I&&null!==q&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Adjust the parameters so that you feel the shape most congruent to the sound."}),(0,r.jsx)(h.T,{defaultShapeParams:c._[q],confirmCallback:Z,cancelCallback:tt})]}),"JUDGE"===I&&null!==Y&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Do you feel this shape is congruent with the sound?"}),(0,r.jsx)(p.W,{estimatedShapeVector:Y,isCorrectCallback:et,isNotCorrectCallback:nt})]}),"SEARCH"===I&&null!==Y&&null!==B&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Adjust the parameters so that you feel the shape most congruent to the sound."}),(0,r.jsx)(y.P,{defaultShapeVector:Y,suggestionVectorsInfo:B,foundCallback:rt,notFoundCallback:at})]}),"DONE"===I&&null!==J&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.DrawSamplingPointsSketch,{canvasWidth:150,canvasHeight:150,samplingPoints:J}),(0,r.jsx)(f.z,{text:"\u6b21\u3078",onClick:k}),(0,r.jsx)(f.z,{text:"\u3053\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u9078\u629e\u3092\u3084\u308a\u76f4\u3059",onClick:N,className:m().cancel__button}),(0,r.jsx)(f.z,{text:"\u5168\u3066\u306e\u97f3\u306b\u5bfe\u3059\u308b\u56f3\u5f62\u306e\u9078\u629e\u3092\u30ea\u30bb\u30c3\u30c8",onClick:E,className:m().cancel__button})]})]})}},1639:function(t,e,n){"use strict";n.d(e,{z:function(){return i}});var r=n(5893),a=n(7294),o=n(1314),c=n.n(o),i=a.memo((function(t){var e=t.text,n=t.className,a=t.onClick,o=t.disabled,i=void 0!==o&&o;return(0,r.jsx)("button",{onClick:a,className:"".concat(c().button__basic," ").concat(n||""),disabled:i,children:e})}))},9678:function(t){t.exports={container:"Annotator_container__nNIFf",title:"Annotator_title__Vij_R",audio:"Annotator_audio__8kR0s",guide:"Annotator_guide___F95P",button__section:"Annotator_button__section__gYWGF",button:"Annotator_button__WeKO3",cancel__button:"Annotator_cancel__button__tVcIH"}},8018:function(t){t.exports={container:"CorrectEstimationJudger_container__aP3_g",button__section:"CorrectEstimationJudger_button__section__w8syL",confirm__button:"CorrectEstimationJudger_confirm__button__5Udw9",cancel__button:"CorrectEstimationJudger_cancel__button__tj2Xr"}},5872:function(t){t.exports={container:"ShapeSearcher_container__zWB7z",searcher__section:"ShapeSearcher_searcher__section__uY1No",edit__section:"ShapeSearcher_edit__section__RA6iE",slider__section:"ShapeSearcher_slider__section__tpRHH",slider__wrapper:"ShapeSearcher_slider__wrapper__6Qg_8",slider__label:"ShapeSearcher_slider__label__qwOM4",slider:"ShapeSearcher_slider__6BhTG",button__section:"ShapeSearcher_button__section__rF7Xs",confirm__button:"ShapeSearcher_confirm__button__Hpfdu",cancel__button:"ShapeSearcher_cancel__button__3l3Jr"}},1314:function(t){t.exports={button__basic:"Button_button__basic__5C4_V"}}}]);