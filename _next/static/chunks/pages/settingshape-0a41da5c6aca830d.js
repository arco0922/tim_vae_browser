(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[431],{6135:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settingshape",function(){return e(4265)}])},1639:function(t,n,e){"use strict";e.d(n,{z:function(){return a}});var r=e(5893),o=e(7294),i=e(1314),u=e.n(i),a=o.memo((function(t){var n=t.text,e=t.className,o=t.onClick;return(0,r.jsx)("button",{onClick:o,className:"".concat(u().button__basic," ").concat(e||""),children:n})}))},560:function(t,n,e){"use strict";var r;e.d(n,{u:function(){return r}}),function(t){t.ANNOTATIONS="timmorph__annotations",t.CORRECT_ESTIMATION_HISTORY="timmorph__CorrectEstimationHistory"}(r||(r={}))},4265:function(t,n,e){"use strict";e.r(n);var r=e(5893),o=e(1639),i=e(560),u=e(5968),a=e(1163),s=e(7294),c=e(7844),l=e.n(c);function f(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function h(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var r,o,i=[],u=!0,a=!1;try{for(e=e.call(t);!(u=(r=e.next()).done)&&(i.push(r.value),!n||i.length!==n);u=!0);}catch(s){a=!0,o=s}finally{try{u||null==e.return||e.return()}finally{if(a)throw o}}return i}}(t,n)||function(t,n){if(!t)return;if("string"===typeof t)return f(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return f(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.default=function(){var t=(0,a.useRouter)(),n=h(l()(i.u.ANNOTATIONS,{}),2),e=n[0],c=n[1],f=h(l()(i.u.CORRECT_ESTIMATION_HISTORY,[]),2),d=f[0],p=f[1],y=Object.entries(e).length,v=(0,u.n)(d),_=s.useCallback((function(){t.push("/settingshape/nextroute")}),[t]),g=s.useCallback((function(){c({}),p([])}),[c,p]),m=s.useCallback((function(){t.push("/")}),[t]);return(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"Setting Shapes"}),0===y&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"It seems you have not set any shapes."}),(0,r.jsx)(o.z,{text:"\u56f3\u5f62\u306e\u8a2d\u5b9a\u3092\u958b\u59cb",onClick:_})]}),y>0&&!v&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"It seems you have set some shapes, but not finished the whole setting step."}),(0,r.jsx)(o.z,{text:"\u56f3\u5f62\u306e\u8a2d\u5b9a\u3092\u518d\u958b",onClick:_}),(0,r.jsx)(o.z,{text:"\u56f3\u5f62\u306e\u8a2d\u5b9a\u3092\u30ea\u30bb\u30c3\u30c8",onClick:g})]}),v&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"It seems you have finished shape setting."}),(0,r.jsx)(o.z,{text:"\u30c7\u30e2\u3092\u898b\u308b",onClick:m}),(0,r.jsx)(o.z,{text:"\u56f3\u5f62\u306e\u8a2d\u5b9a\u3092\u30ea\u30bb\u30c3\u30c8",onClick:g})]})]})}},5968:function(t,n,e){"use strict";e.d(n,{n:function(){return r}});var r=function(t){var n=function(t){for(var n=0,e=t.length-1;e>=0;e--)t[e][1]&&(n+=1);return n}(t);return n>=3}},1314:function(t){t.exports={button__basic:"Button_button__basic__5C4_V"}},1163:function(t,n,e){t.exports=e(880)},7844:function(t,n,e){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t},r.apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0});var o=e(7294);n.default=function(t,n,e){var i=o.useMemo((function(){return r({serializer:JSON.stringify,parser:JSON.parse,logger:console.log,syncData:!0},e)}),[e]),u=i.serializer,a=i.parser,s=i.logger,c=i.syncData,l=o.useState((function(){if("undefined"===typeof window)return n;try{var e=window.localStorage.getItem(t);return e?a(e):n}catch(r){return s(r),n}})),f=l[0],h=l[1];return o.useEffect((function(){if("undefined"!==typeof window){try{void 0!==f?window.localStorage.setItem(t,u(f)):window.localStorage.removeItem(t)}catch(n){s(n)}}}),[f]),o.useEffect((function(){if(c){var n=function(n){if(n.key===t&&n.storageArea===window.localStorage)try{h(n.newValue?a(n.newValue):void 0)}catch(n){s(n)}};if("undefined"!==typeof window)return window.addEventListener("storage",n),function(){return window.removeEventListener("storage",n)}}}),[t,c]),[f,h]}}},function(t){t.O(0,[774,888,179],(function(){return n=6135,t(t.s=n);var n}));var n=t.O();_N_E=n}]);