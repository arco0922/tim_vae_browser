(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(r,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5970)}])},1639:function(r,n,t){"use strict";t.d(n,{z:function(){return u}});var e=t(5893),o=t(7294),a=t(1314),i=t.n(a),u=o.memo((function(r){var n=r.text,t=r.className,o=r.onClick,a=r.disabled,u=void 0!==a&&a;return(0,e.jsx)("button",{onClick:o,className:"".concat(i().button__basic," ").concat(t||""),disabled:u,children:n})}))},4524:function(r,n,t){"use strict";t.d(n,{P:function(){return e},g:function(){return o}});var e=["rs1_00","rs1_01","rs1_02","rs2_00","rs2_01","rs2_02","rs2_03","rs2_04","rs2_05","rs2_06","rs2_07","rs2_08","rs2_09","rs2_10","rs2_11","rs2_12","rs2_13","rs2_14","rs2_15","rs2_16","rs2_17","rs2_18","rs2_19","rs2_20","rs2_21","rs2_22","rs2_23","rs2_24","rs2_25","rs2_26","rs2_27","rs2_28","rs2_29"],o={rs1_00:[2.1120596,-5.1291986],rs1_01:[1.5762187,2.60493],rs1_02:[-2.382232,.10038004],rs2_00:[2.5993729,-1.2009252],rs2_01:[-.94393796,-3.1945283],rs2_02:[.30973345,.21844022],rs2_03:[3.47645,1.0034096],rs2_04:[1.4669484,-3.0503924],rs2_05:[-.88771594,-1.2711746],rs2_06:[.83919644,-1.4324392],rs2_07:[1.8265278,.890573],rs2_08:[-1.0803591,1.0704242],rs2_09:[.2325852,-2.6102617],rs2_10:[.6404754,1.698138],rs2_11:[1.4612306,-.3326639],rs2_12:[2.6401613,1.8669294],rs2_13:[-1.0652071,-.106734954],rs2_14:[2.209707,-3.9786203],rs2_15:[2.5716124,-.07289239],rs2_16:[-1.5073073,-2.1868656],rs2_17:[.029848829,-.78534675],rs2_18:[1.55066,-2.0992553],rs2_19:[-.12433945,1.0623416],rs2_20:[-.06967662,-1.7259902],rs2_21:[1.2427349,-3.9178205],rs2_22:[1.7086548,-1.2185427],rs2_23:[-1.9910475,.89425653],rs2_24:[-1.8384401,-.5902677],rs2_25:[-.6483803,-2.3826134],rs2_26:[1.1159008,.4414356],rs2_27:[.52229494,-3.384752],rs2_28:[2.6333241,.76941025],rs2_29:[1.7951645,1.6901001]}},9497:function(r,n,t){"use strict";t.d(n,{sq:function(){return V}});var e=t(9645),o=t.n(e);function a(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function u(r){if(Array.isArray(r))return r}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(r,n){return u(r)||function(r,n){var t=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,o,a=[],i=!0,u=!1;try{for(t=t.call(r);!(i=(e=t.next()).done)&&(a.push(e.value),!n||a.length!==n);i=!0);}catch(s){u=!0,o=s}finally{try{i||null==t.return||t.return()}finally{if(u)throw o}}return a}}(r,n)||f(r,n)||s()}function c(r){return u(r)||function(r){if("undefined"!==typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||f(r,i)||s()}function f(r,n){if(r){if("string"===typeof r)return a(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(r,n):void 0}}var h,_,d=function(r,n){return[r.map((function(r){return N(F(r),n)})),r[0].length-1]},g=function(r,n){var t=n.nFft||2048,e=n.winLength||t,o=n.hopLength||Math.floor(e/4),a=S(e);a=p(a,t),n.center&&(r=b(r,Math.floor(t/2)));for(var i=A(r,t,o),u=[],s=i.length,l=t+2,c=0;c<s;c++){var f=new Float32Array(l);u[c]=f}for(var h=0;h<s;h++){var _=y(i[h],a),d=M(_);u[h].set(d.slice(0,l))}return u},v=function(r,n){for(var t=[],e=0;e<r.length;e++)t[e]=m(r[e],n);return t},m=function(r,n){if(r.length!==n[0].length)throw new Error("Each entry in filterbank should have dimensions "+"matching FFT. |mags| = ".concat(r.length,", ")+"|filterbank[0]| = ".concat(n[0].length,"."));for(var t=new Float32Array(n.length),e=0;e<n.length;e++){var o=y(r,n[e]);t[e]=o.reduce((function(r,n){return r+n}))}return t},y=function(r,n){for(var t=new Float32Array(r.length),e=0;e<r.length;e++)t[e]=n[e]*r[e];return t},p=function(r,n){if(r.length>n)throw new Error("Data is longer than length.");var t=Math.floor((n-r.length)/2),e=n-r.length-t;return w(r,[t,e])},w=function(r,n){var t,e,o;"object"===typeof n?(t=(o=l(n,2))[0],e=o[1]):t=e=n;var a=new Float32Array(r.length+t+e);return a.set(r,t),a},b=function(r,n){for(var t=w(r,n),e=0;e<n;e++)t[e]=t[2*n-e],t[t.length-e-1]=t[t.length-2*n+e-1];return t},A=function(r,n,t){for(var e=Math.floor((r.length-n)/t)+1,o=Array.from({length:e},(function(r,t){return new Float32Array(n)})),a=0;a<e;a++){var i=a*t,u=r.slice(i,i+n);o[a].set(u),u.length}return o},x=function(r){for(var n=function(r){var n=2/(u[2+r]-u[r]);f[r]=f[r].map((function(r){return r*n}))},t=r.fMin||0,e=r.fMax||r.sampleRate/2,o=r.nMels||128,a=r.nFft||2048,i=C(r.sampleRate,a),u=E(o+2,t,e),s=P(u),l=I(u,i),c=l[0].length,f=[],h=0;h<o;h++){f[h]=new Float32Array(c);for(var _=0;_<l[h].length;_++){var d=-l[h][_]/s[h],g=l[h+2][_]/s[h+1],v=Math.max(0,Math.min(d,g));f[h][_]=v}}for(var m=0;m<f.length;m++)n(m);return f},M=function(r){var n=new(o())(r.length),t=n.createComplexArray(),e=n.toComplexArray(r,null);return n.transform(t,e),t},S=function(r){for(var n=new Float32Array(r),t=0;t<r;t++)n[t]=.5*(1-Math.cos(2*Math.PI*t/(r-1)));return n},j=function(r,n,t){for(var e=(n-r)/(t-1),o=new Float32Array(t),a=0;a<t;a++)o[a]=r+e*a;return o},F=function(r){for(var n=new Float32Array(r.length/2),t=0;t<r.length/2;t++)n[t]=Math.sqrt(r[2*t]*r[2*t]+r[2*t+1]*r[2*t+1]);return n},O=function(r){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(n)return 2595*Math.log10(1+r/700);var t=0,e=200/3,o=(r-t)/e,a=1e3,i=(a-t)/e,u=Math.log(6.4)/27;return r>=a&&(o=i+Math.log(r/a)/u),o},C=function(r,n){return j(0,r/2,Math.floor(1+n/2))},E=function(r,n,t){var e=O(n),o=O(t),a=j(e,o,r).map((function(r){return function(r){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1])return 700*(Math.exp(r/1125)-1);var n=0,t=200/3,e=n+t*r,o=1e3,a=(o-n)/t,i=Math.log(6.4)/27;return r>=a&&(e=o*Math.exp(i*(r-a))),e}(r)}));return a},P=function(r){for(var n=new Float32Array(r.length-1),t=0;t<r.length;t++)n[t]=r[t+1]-r[t];return n},I=function(r,n){for(var t=[],e=0;e<r.length;e++)t[e]=new Float32Array(n.length);for(var o=0;o<r.length;o++)for(var a=0;a<n.length;a++)t[o][a]=r[o]-n[a];return t},N=function(r,n){return r.map((function(r){return Math.pow(r,n)}))},T=function(r){return r.reduce((function(r,n){return Math.max(r,n)}))},k=function(r){return r.reduce((function(r,n){return Math.min(r,n)}))},z=function(r){return r.reduce((function(r,n){return r+n}))/r.length},R=t(2230),L=function(r){return function(n){var t=n.map((function(r){return Array.from(r)})),e=R.odF(t),o=R.VV$(e),a=R.Fp7(e),i=R.hiC(R.luU(e,o),R.luU(a,o)),u=R.p4s(i);return R.XLQ(u,r)}},V=(h=1024,_=[1,32,16,1],function(r,n,t,e){}(44100,2048,1024,[1,128,64,1]),{encoderMode:"LONG_FAST",isFlipped:!0,encoderJSONPath:"/models/encoder02_long/model.json",samplingRate:44100,frameLength:2048,encoderPreprocessor:L([1,128,64,1]),latentImgInfo:{imgSrc:"/imgs/latentImgs/encoder02_long.png",xmin:-3,xmax:4,ymin:-4.5,ymax:3}});L([1,128,64,1])},5970:function(r,n,t){"use strict";t.r(n);var e=t(5893),o=t(1639),a=t(560),i=t(9497),u=t(5968),s=t(5152),l=t.n(s),c=t(1163),f=t(7294),h=t(7844),_=t.n(h),d=t(5848),g=t.n(d);function v(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function m(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var t=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,o,a=[],i=!0,u=!1;try{for(t=t.call(r);!(i=(e=t.next()).done)&&(a.push(e.value),!n||a.length!==n);i=!0);}catch(s){u=!0,o=s}finally{try{i||null==t.return||t.return()}finally{if(u)throw o}}return a}}(r,n)||function(r,n){if(!r)return;if("string"===typeof r)return v(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(r,n)}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var y=l()((function(){return Promise.all([t.e(6),t.e(873),t.e(437),t.e(113),t.e(636)]).then(t.bind(t,3241)).then((function(r){return r.AudioVisualizer}))}),{loadableGenerated:{webpack:function(){return[3241]}},ssr:!1});n.default=function(){var r=(0,c.useRouter)(),n=m(_()(a.u.ANNOTATIONS,{}),1)[0],t=m(_()(a.u.CORRECT_ESTIMATION_HISTORY,[]),1)[0],s=(0,u.n)(t),l=f.useCallback((function(){r.push("/settingshape")}),[r]);return(0,e.jsxs)("div",{className:g().container,children:[(0,e.jsx)("h1",{children:"TimMorph"}),(0,e.jsx)("h3",{className:g().caution,children:"Only Chrome is supported. Other browsers are not recommended."}),s?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(o.z,{text:"\u56f3\u5f62\u3092\u8a2d\u5b9a\u3092\u5909\u66f4\u3059\u308b",onClick:l}),(0,e.jsxs)("div",{className:g().main__content,children:[(0,e.jsx)(y,{audioFilePath:"/audios/beginner.wav",visualizerConfig:i.sq,visualizeMode:"SHAPE",annotations:n,title:"beginner"}),(0,e.jsx)(y,{audioFilePath:"/audios/intermediate.wav",visualizerConfig:i.sq,visualizeMode:"SHAPE",annotations:n,title:"intermediate"}),(0,e.jsx)(y,{audioFilePath:"/audios/expert.wav",visualizerConfig:i.sq,visualizeMode:"SHAPE",annotations:n,title:"expert"})]})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("p",{children:"It seems you have not finished shape setting."}),(0,e.jsx)(o.z,{text:"\u56f3\u5f62\u3092\u8a2d\u5b9a\u3059\u308b",onClick:l})]})]})}},5968:function(r,n,t){"use strict";t.d(n,{n:function(){return o}});var e=t(4524),o=function(r){var n=function(r){for(var n=0,t=r.length-1;t>=0;t--){if("CORRECT"!==r[t][1])return n;n+=1}return n}(r);return n>=3||r.length===e.P.length-3}},1314:function(r){r.exports={button__basic:"Button_button__basic__5C4_V"}},5848:function(r){r.exports={container:"TopPage_container__zilsm",caution:"TopPage_caution__2wd_5",main__content:"TopPage_main__content__iOn10"}},7844:function(r,n,t){"use strict";var e=this&&this.__assign||function(){return e=Object.assign||function(r){for(var n,t=1,e=arguments.length;t<e;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(r[o]=n[o]);return r},e.apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0});var o=t(7294);n.default=function(r,n,t){var a=o.useMemo((function(){return e({serializer:JSON.stringify,parser:JSON.parse,logger:console.log,syncData:!0},t)}),[t]),i=a.serializer,u=a.parser,s=a.logger,l=a.syncData,c=o.useState((function(){if("undefined"===typeof window)return n;try{var t=window.localStorage.getItem(r);return t?u(t):n}catch(e){return s(e),n}})),f=c[0],h=c[1];return o.useEffect((function(){if("undefined"!==typeof window){try{void 0!==f?window.localStorage.setItem(r,i(f)):window.localStorage.removeItem(r)}catch(n){s(n)}}}),[f]),o.useEffect((function(){if(l){var n=function(n){if(n.key===r&&n.storageArea===window.localStorage)try{h(n.newValue?u(n.newValue):void 0)}catch(n){s(n)}};if("undefined"!==typeof window)return window.addEventListener("storage",n),function(){return window.removeEventListener("storage",n)}}}),[r,l]),[f,h]}},5410:function(){},8628:function(){},1601:function(){},7792:function(){},4977:function(){},5042:function(){}},function(r){r.O(0,[864,723,132,974,904,642,815,774,888,179],(function(){return n=8312,r(r.s=n);var n}));var n=r.O();_N_E=n}]);