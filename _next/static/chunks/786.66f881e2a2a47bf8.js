(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[786],{1752:function(t,r,n){t.exports=n(6949)},9839:function(t,r,n){"use strict";n.d(r,{r:function(){return c}});var e=n(5893),o=n(7294),a=n(4035),i=n.n(a);function u(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function s(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var e,o,a=[],i=!0,u=!1;try{for(n=n.call(t);!(i=(e=n.next()).done)&&(a.push(e.value),!r||a.length!==r);i=!0);}catch(s){u=!0,o=s}finally{try{i||null==n.return||n.return()}finally{if(u)throw o}}return a}}(t,r)||function(t,r){if(!t)return;if("string"===typeof t)return u(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=function(t){var r=t.sketch,n=t.sketchProps,a=t.className,u=s(o.useState(null),2),c=u[0],l=u[1],f=o.useRef(null);return o.useEffect((function(){if(null!==f.current){var t=function(t){var r=t.sketch,n=t.initialSketchProps;return function(t){t.props=n,r(t)}}({sketch:r,initialSketchProps:n}),e=new(i())(t,f.current);l(e)}}),[]),o.useEffect((function(){null!==c&&(c.props=n)}),[c,n]),(0,e.jsx)("div",{ref:f,className:a})}},786:function(t,r,n){"use strict";n.r(r),n.d(r,{DrawMousePosOnLatentSketch:function(){return u}});var e=n(5893),o=n(9839),a=n(7979),i=(n(7294),function(t){var r,n=t.props.latentImgInfo.imgSrc;t.preload=function(){r=t.loadImage((0,a.H)(n))},t.setup=function(){t.createCanvas(t.props.canvasWidth,t.props.canvasHeight)},t.draw=function(){t.background(200);var e=t.props.latentImgInfo,o=e.imgSrc,i=e.xmin,u=e.xmax,s=e.ymin,c=e.ymax;if(o!==n&&(r=t.loadImage((0,a.H)(o)),n=o),t.image(r,0,0,t.width,t.height),null!==t.props.coord){var l=t.width*(t.props.coord[0]-i)/(u-i),f=t.height*(c-t.props.coord[1])/(c-s);t.fill("red"),t.ellipse(l,f,15,15)}},t.mouseDragged=function(){var r=t.props.latentImgInfo,n=r.xmin,e=r.xmax,o=r.ymin,a=r.ymax;if(t.mouseX>=0&&t.mouseX<=t.width&&t.mouseY>=0&&t.mouseY<=t.height){var i=t.mouseX,u=t.mouseY,s=n+i*(e-n)/t.width,c=a-u*(a-o)/t.height;t.props.setCoord([s,c])}}}),u=function(t){var r=t.canvasWidth,n=t.canvasHeight,a=t.latentImgInfo,u=t.coord,s=t.setCoord,c=t.className;return(0,e.jsx)(o.r,{sketch:i,sketchProps:{canvasWidth:r,canvasHeight:n,latentImgInfo:a,coord:u,setCoord:s},className:c})}},7979:function(t,r,n){"use strict";n.d(r,{H:function(){return o}});var e=n(1752);function o(t){return(0,e.default)().publicRuntimeConfig.urlPrefix+t}}}]);