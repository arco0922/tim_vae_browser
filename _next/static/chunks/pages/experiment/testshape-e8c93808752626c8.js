(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4854],{9217:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/experiment/testshape",function(){return n(2833)}])},2833:function(t,e,n){"use strict";n.r(e);var r=n(5893),o=n(1639),i=n(4419),a=n(560),u=n(5968),s=n(1163),c=n(7294),l=n(7844),f=n.n(l),d=n(7692),_=n.n(d);function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.default=function(){var t=(0,s.useRouter)(),e=h(f()(a.u.EXP_CORRECT_ESTIMATION_HISTORY,[]),1)[0],n=(0,u.n)(e),l=h(f()(a.u.EXP_RESULTS,{}),2),d=(l[0],l[1]),p=c.useCallback((function(){t.push("/experiment/testshape/1"),d({})}),[t,d]);return n?(0,r.jsxs)("div",{className:_().container,children:[(0,r.jsx)("h2",{className:_().title,children:"\u30b9\u30c6\u30c3\u30d72"}),(0,r.jsxs)("div",{className:_().guide,children:["\u7d9a\u3044\u3066\u3001\u3042\u306a\u305f\u306e\u97f3\u8272\u3068\u56f3\u5f62\u306e\u5bfe\u5fdc\u95a2\u4fc2\u306b\u95a2\u3057\u3066\u3088\u308a\u8a73\u7d30\u306a\u8abf\u67fb\u3092\u884c\u3044\u307e\u3059\u3002",(0,r.jsx)("br",{}),"\u4e0b\u306e\u300c\u6b21\u3078\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"]}),(0,r.jsx)(o.z,{text:"\u6b21\u3078",onClick:p,className:_().next__button})]}):(0,r.jsx)(i.G,{})}},5968:function(t,e,n){"use strict";n.d(e,{n:function(){return o}});var r=n(4524),o=function(t){var e=function(t){for(var e=0,n=t.length-1;n>=0;n--){if("CORRECT"!==t[n][1])return e;e+=1}return e}(t);return e>=3||t.length===r.Pg.length-3}},7692:function(t){t.exports={container:"testshape_container__ONXcT",title:"testshape_title__0SDP3",guide:"testshape_guide__MVn8a",next__button:"testshape_next__button__Lsprg"}},7844:function(t,e,n){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(7294);e.default=function(t,e,n){var i=o.useMemo((function(){return r({serializer:JSON.stringify,parser:JSON.parse,logger:console.log,syncData:!0},n)}),[n]),a=i.serializer,u=i.parser,s=i.logger,c=i.syncData,l=o.useState((function(){if("undefined"===typeof window)return e;try{var n=window.localStorage.getItem(t);return n?u(n):e}catch(r){return s(r),e}})),f=l[0],d=l[1];return o.useEffect((function(){if("undefined"!==typeof window){try{void 0!==f?window.localStorage.setItem(t,a(f)):window.localStorage.removeItem(t)}catch(e){s(e)}}}),[f]),o.useEffect((function(){if(c){var e=function(e){if(e.key===t&&e.storageArea===window.localStorage)try{d(e.newValue?u(e.newValue):void 0)}catch(e){s(e)}};if("undefined"!==typeof window)return window.addEventListener("storage",e),function(){return window.removeEventListener("storage",e)}}}),[t,c]),[f,d]}}},function(t){t.O(0,[9508,9774,2888,179],(function(){return e=9217,t(t.s=e);var e}));var e=t.O();_N_E=e}]);