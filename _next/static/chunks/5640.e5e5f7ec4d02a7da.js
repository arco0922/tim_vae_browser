"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5640],{9839:function(t,n,r){r.d(n,{r:function(){return c}});var e=r(5893),a=r(7294),i=r(4035),s=r.n(i);function o(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function u(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var e,a,i=[],s=!0,o=!1;try{for(r=r.call(t);!(s=(e=r.next()).done)&&(i.push(e.value),!n||i.length!==n);s=!0);}catch(u){o=!0,a=u}finally{try{s||null==r.return||r.return()}finally{if(o)throw a}}return i}}(t,n)||function(t,n){if(!t)return;if("string"===typeof t)return o(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=function(t){var n=t.sketch,r=t.sketchProps,i=t.className,o=u(a.useState(null),2),c=o[0],l=o[1],f=a.useRef(null);return a.useEffect((function(){if(null!==f.current){var t=function(t){var n=t.sketch,r=t.initialSketchProps;return function(t){t.props=r,n(t)}}({sketch:n,initialSketchProps:r}),e=new(s())(t,f.current);l(e)}}),[]),a.useEffect((function(){null!==c&&(c.props=r)}),[c,r]),(0,e.jsx)("div",{ref:f,className:i})}},5640:function(t,n,r){r.r(n),r.d(n,{DrawSamplingPointsSketch:function(){return s}});var e=r(5893),a=r(9839),i=(r(7294),function(t){t.setup=function(){t.createCanvas(t.props.canvasWidth,t.props.canvasHeight)};t.draw=function(){t.background(255),t.translate(t.width/2,t.height/2),t.fill(255),t.stroke(0),t.rect(-t.width/2,-t.height/2,t.width,t.height);var n=t.props.samplingPoints;!function(n){var r=n.radius,e=n.samplingPoints;null!==e&&(t.stroke(0),t.strokeWeight(1),t.noFill(),t.beginShape(),e.forEach((function(n){t.vertex(r*n[0],r*n[1])})),t.endShape(t.CLOSE))}({radius:t.width/4,samplingPoints:n}),t.translate(-t.width/2,-t.height/2)}}),s=function(t){var n=t.canvasWidth,r=t.canvasHeight,s=t.samplingPoints,o=t.className;return(0,e.jsx)(a.r,{sketch:i,sketchProps:{canvasWidth:n,canvasHeight:r,samplingPoints:s},className:o})}}}]);