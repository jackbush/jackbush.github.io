"use strict";(self.webpackChunkjackbush_homepage=self.webpackChunkjackbush_homepage||[]).push([[678],{4465:function(t,e,i){i.r(e),i.d(e,{default:function(){return p}});var s=i(7294),o=i(6234),n=i(4035),a=i.n(n),r=i(3016);const c=(t,e)=>{let i;if("r"===e)i=1;else if("g"===e)i=3;else{if("b"!==e)throw new Error("Channel must be r, g or b");i=5}const s=t.slice(i,i+2);return parseInt(s,16)},h=t=>new(a())((function(e){let i,s,o;const n={frameRate:60,layers:5,spread:.1,speed:20,acceleration:100,blobHex:r._0.lightBlue,opacity:40,backgroundColour:r.KL.background};function a(t){this.blobs=[],this.center=e.createVector(t.x,t.y)}function h(t){this.position=e.createVector(t.x,t.y),this.points=[new u(0),new u(1),new u(2),new u(3),new u(4)],this.drawCycle=[1,4,2,0,3,1,4,2,0,3,1]}function u(t){this.vertex=t,this.radius=((t,e)=>{const i=t*(e=e||.1)*Math.random()*2;return t+(i-i/2)})(.35*i.height,.25),this.initialRadius=this.radius,this.minRadius=this.radius*(1-n.spread),this.maxRadius=this.radius*(1+n.spread),this.isGrowing=Math.random()<.5,this.position=this.getCoordinates(this.vertex,this.radius)}n.speed/=n.frameRate,n.speed*=-1,n.blobColour=e.color(c(n.blobHex,"r"),c(n.blobHex,"g"),c(n.blobHex,"b"),n.opacity),e.setup=function(){e.frameRate(n.frameRate),i=(t=>{const e=document.getElementById(t),i={};return i.width=e.clientWidth,i.height=e.clientHeight,i})(t),s=e.createCanvas(i.width,i.height),s.parent(t);const r=e.createVector(.5*i.width,.5*i.height);o=new a(r),o.add(n.layers),e.fill(n.blobColour),e.noStroke()},e.windowResized=e.setup,e.draw=function(){e.background(n.backgroundColour),o.update(),o.display()},a.prototype.add=function(t){t=t||1;for(let e=0;e<t;e++)this.blobs.push(new h(this.center))},a.prototype.update=function(){this.blobs.forEach((function(t){t.update()}))},a.prototype.display=function(){this.blobs.forEach((function(t){t.display()}))},h.prototype.update=function(){this.points.forEach((function(t){t.update()}))},h.prototype.display=function(){e.beginShape();const t=this;this.drawCycle.forEach((function(i){e.curveVertex(t.position.x+t.points[i].position.x,t.position.y+t.points[i].position.y)})),e.endShape(e.CLOSE)},u.prototype.update=function(){this.radius>=.99*this.maxRadius&&(this.isGrowing=!1),this.radius<=1.01*this.minRadius&&(this.isGrowing=!0);const t=this.radius/this.initialRadius-1;let e=n.acceleration*n.speed*Math.pow(t,2)-n.speed;this.isGrowing||(e*=-1),this.radius+=e,this.position=this.getCoordinates(this.vertex,this.radius)},u.prototype.getCoordinates=function(t,i){const s={x:0,y:0};switch(t){case 0:s.x=0,s.y=-1*i;break;case 1:case 4:s.x=i*e.cos(18),s.y=-1*i*e.sin(18);break;case 2:case 3:s.x=i*e.cos(54),s.y=i*e.sin(54)}return 3!==t&&4!==t||(s.x*=-1),s}}),t),u="jsSketchBlob",d={position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1};var p=()=>(s.useEffect((()=>{"undefined"!=typeof window&&document&&h(u)}),[]),s.createElement(o.Z,null,s.createElement("div",{style:d,id:u})))}}]);
//# sourceMappingURL=component---src-pages-index-js-2c9ad2415b934a6384ee.js.map