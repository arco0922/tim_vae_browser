(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[137],{8798:function(r,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settingshape/[repSoundId]",function(){return n(2003)}])},560:function(r,t,n){"use strict";var e;n.d(t,{u:function(){return e}}),function(r){r.ANNOTATIONS="timmorph__annotations",r.CORRECT_ESTIMATION_HISTORY="timmorph__CorrectEstimationHistory"}(e||(e={}))},4524:function(r,t,n){"use strict";n.d(t,{P:function(){return e},g:function(){return s}});var e=["rs1_00","rs1_01","rs1_02","rs2_00","rs2_01","rs2_02","rs2_03","rs2_04","rs2_05","rs2_06","rs2_07","rs2_08","rs2_09","rs2_10","rs2_11","rs2_12","rs2_13","rs2_14","rs2_15","rs2_16","rs2_17","rs2_18","rs2_19","rs2_20","rs2_21","rs2_22","rs2_23","rs2_24","rs2_25","rs2_26","rs2_27","rs2_28","rs2_29"],s={rs1_00:[2.1120596,-5.1291986],rs1_01:[1.5762187,2.60493],rs1_02:[-2.382232,.10038004],rs2_00:[2.5993729,-1.2009252],rs2_01:[-.94393796,-3.1945283],rs2_02:[.30973345,.21844022],rs2_03:[3.47645,1.0034096],rs2_04:[1.4669484,-3.0503924],rs2_05:[-.88771594,-1.2711746],rs2_06:[.83919644,-1.4324392],rs2_07:[1.8265278,.890573],rs2_08:[-1.0803591,1.0704242],rs2_09:[.2325852,-2.6102617],rs2_10:[.6404754,1.698138],rs2_11:[1.4612306,-.3326639],rs2_12:[2.6401613,1.8669294],rs2_13:[-1.0652071,-.106734954],rs2_14:[2.209707,-3.9786203],rs2_15:[2.5716124,-.07289239],rs2_16:[-1.5073073,-2.1868656],rs2_17:[.029848829,-.78534675],rs2_18:[1.55066,-2.0992553],rs2_19:[-.12433945,1.0623416],rs2_20:[-.06967662,-1.7259902],rs2_21:[1.2427349,-3.9178205],rs2_22:[1.7086548,-1.2185427],rs2_23:[-1.9910475,.89425653],rs2_24:[-1.8384401,-.5902677],rs2_25:[-.6483803,-2.3826134],rs2_26:[1.1159008,.4414356],rs2_27:[.52229494,-3.384752],rs2_28:[2.6333241,.76941025],rs2_29:[1.7951645,1.6901001]}},2003:function(r,t,n){"use strict";n.r(t);var e=n(5893),s=n(7294),o=n(2012),i=n.n(o),u=n(5152),a=n.n(u),_=n(1163),c=n(4524),f=n(7844),l=n.n(f),d=n(560);function p(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function y(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=n){var e,s,o=[],i=!0,u=!1;try{for(n=n.call(r);!(i=(e=n.next()).done)&&(o.push(e.value),!t||o.length!==t);i=!0);}catch(a){u=!0,s=a}finally{try{i||null==n.return||n.return()}finally{if(u)throw s}}return o}}(r,t)||function(r,t){if(!r)return;if("string"===typeof r)return p(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(r,t)}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var h=a()((function(){return Promise.all([n.e(6),n.e(873),n.e(52),n.e(618),n.e(603)]).then(n.bind(n,1603)).then((function(r){return r.Annotator}))}),{loadableGenerated:{webpack:function(){return[1603]}},ssr:!1}),w=c.P.map((function(r){return r}));t.default=function(){var r=(0,_.useRouter)(),t=r.query.repSoundId,n=y(l()(d.u.ANNOTATIONS,{}),2),o=n[0],u=n[1],a=y(l()(d.u.CORRECT_ESTIMATION_HISTORY,[]),2),c=a[0],f=a[1],p=s.useCallback((function(){r.push("/settingshape/nextroute")}),[r]),v=s.useCallback((function(){u({}),f([]),r.push("/settingshape")}),[r,u,f]);return void 0!==t&&"object"!==typeof t&&w.includes(t)?(0,e.jsx)("div",{className:i().container,children:(0,e.jsx)(h,{repSoundId:t,annotations:o,setAnnotations:u,correctEstimationHistory:c,setCorrectEstimationHistory:f,goNextCallback:p,resetCallback:v})}):(0,e.jsx)("div",{children:"No representative sound was Found"})}},2012:function(r){r.exports={container:"settingshape_container__9D519"}},1163:function(r,t,n){r.exports=n(880)},7844:function(r,t,n){"use strict";var e=this&&this.__assign||function(){return e=Object.assign||function(r){for(var t,n=1,e=arguments.length;n<e;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s]);return r},e.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var s=n(7294);t.default=function(r,t,n){var o=s.useMemo((function(){return e({serializer:JSON.stringify,parser:JSON.parse,logger:console.log,syncData:!0},n)}),[n]),i=o.serializer,u=o.parser,a=o.logger,_=o.syncData,c=s.useState((function(){if("undefined"===typeof window)return t;try{var n=window.localStorage.getItem(r);return n?u(n):t}catch(e){return a(e),t}})),f=c[0],l=c[1];return s.useEffect((function(){if("undefined"!==typeof window){try{void 0!==f?window.localStorage.setItem(r,i(f)):window.localStorage.removeItem(r)}catch(t){a(t)}}}),[f]),s.useEffect((function(){if(_){var t=function(t){if(t.key===r&&t.storageArea===window.localStorage)try{l(t.newValue?u(t.newValue):void 0)}catch(t){a(t)}};if("undefined"!==typeof window)return window.addEventListener("storage",t),function(){return window.removeEventListener("storage",t)}}}),[r,_]),[f,l]}}},function(r){r.O(0,[152,774,888,179],(function(){return t=8798,r(r.s=t);var t}));var t=r.O();_N_E=t}]);