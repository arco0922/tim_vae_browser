(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{8920:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settingshape/step1",function(){return t(4216)}])},4216:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(7294),a=t(5615),i=t.n(a),u=t(5152),c=t.n(u),s=t(1163),l=t(7844),f=t.n(l),d=t(560);function p(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function w(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,a=[],i=!0,u=!1;try{for(t=t.call(e);!(i=(r=t.next()).done)&&(a.push(r.value),!n||a.length!==n);i=!0);}catch(c){u=!0,o=c}finally{try{i||null==t.return||t.return()}finally{if(u)throw o}}return a}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return p(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return p(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var y=c()((function(){return Promise.all([t.e(6),t.e(52),t.e(275),t.e(116),t.e(32)]).then(t.bind(t,7417)).then((function(e){return e.StepOneAnnotator}))}),{loadableGenerated:{webpack:function(){return[7417]}},ssr:!1});n.default=function(){var e=(0,s.useRouter)(),n=w(f()(d.u.ANNOTATIONS,{}),2),t=n[0],a=n[1],u=o.useCallback((function(){e.push("/settingshape/nextroute")}),[e]);return(0,r.jsx)("div",{className:i().container,children:(0,r.jsx)(y,{annotations:t,setAnnotations:a,goNextCallback:u})})}},5615:function(e){e.exports={container:"step1_container__SEJDr"}},7844:function(e,n,t){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},r.apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0});var o=t(7294);n.default=function(e,n,t){var a=o.useMemo((function(){return r({serializer:JSON.stringify,parser:JSON.parse,logger:console.log,syncData:!0},t)}),[t]),i=a.serializer,u=a.parser,c=a.logger,s=a.syncData,l=o.useState((function(){if("undefined"===typeof window)return n;try{var t=window.localStorage.getItem(e);return t?u(t):n}catch(r){return c(r),n}})),f=l[0],d=l[1];return o.useEffect((function(){if("undefined"!==typeof window){try{void 0!==f?window.localStorage.setItem(e,i(f)):window.localStorage.removeItem(e)}catch(n){c(n)}}}),[f]),o.useEffect((function(){if(s){var n=function(n){if(n.key===e&&n.storageArea===window.localStorage)try{d(n.newValue?u(n.newValue):void 0)}catch(n){c(n)}};if("undefined"!==typeof window)return window.addEventListener("storage",n),function(){return window.removeEventListener("storage",n)}}}),[e,s]),[f,d]}}},function(e){e.O(0,[774,888,179],(function(){return n=8920,e(e.s=n);var n}));var n=e.O();_N_E=n}]);