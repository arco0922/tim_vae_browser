"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[157],{9839:function(t,n,e){e.d(n,{r:function(){return l}});var r=e(5893),a=e(7294),o=e(4035),c=e.n(o);function u(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function i(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var r,a,o=[],c=!0,u=!1;try{for(e=e.call(t);!(c=(r=e.next()).done)&&(o.push(r.value),!n||o.length!==n);c=!0);}catch(i){u=!0,a=i}finally{try{c||null==e.return||e.return()}finally{if(u)throw a}}return o}}(t,n)||function(t,n){if(!t)return;if("string"===typeof t)return u(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return u(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=function(t){var n=t.sketch,e=t.sketchProps,o=t.className,u=i(a.useState(null),2),l=u[0],s=u[1],f=a.useRef(null);return a.useEffect((function(){if(null!==f.current){var t=function(t){var n=t.sketch,e=t.initialSketchProps;return function(t){t.props=e,n(t)}}({sketch:n,initialSketchProps:e}),r=new(c())(t,f.current);s(r)}}),[]),a.useEffect((function(){null!==l&&(l.props=e)}),[l,e]),(0,r.jsx)("div",{ref:f,className:o})}},9157:function(t,n,e){e.r(n),e.d(n,{PlotLatentSketch:function(){return u}});var r=e(5893),a=e(9839),o=e(7979),c=function(t){var n,e=t.props.latentImgInfo.imgSrc;t.preload=function(){n=t.loadImage((0,o.H)(e))},t.setup=function(){t.createCanvas(t.props.canvasWidth,t.props.canvasHeight)},t.draw=function(){t.background(200);var r=t.props.latentImgInfo,a=r.imgSrc,c=r.xmin,u=r.xmax,i=r.ymin,l=r.ymax;if(a!==e&&(n=t.loadImage((0,o.H)(a)),e=a),t.image(n,0,0,t.width,t.height),null!==t.props.encodeResult){var s=t.props.encodeResult.coord[0],f=t.props.encodeResult.coord[1],p=t.width*(s-c)/(u-c),h=t.height*(l-f)/(l-i);t.fill("red"),t.ellipse(p,h,15,15)}}},u=function(t){var n=t.canvasWidth,e=t.canvasHeight,o=t.encodeResult,u=t.latentImgInfo,i=t.className;return(0,r.jsx)(a.r,{sketch:c,sketchProps:{canvasWidth:n,canvasHeight:e,encodeResult:o,latentImgInfo:u},className:i})}}}]);