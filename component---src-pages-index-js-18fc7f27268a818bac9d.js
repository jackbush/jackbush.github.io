"use strict";(self.webpackChunkjackbush_homepage=self.webpackChunkjackbush_homepage||[]).push([[678],{4465:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var o=i(7294),s=i(6234),n=i(3016),a=i(4035),r=i.n(a);const c=t=>new(r())((function(e){let i,o,s;const a={frameRate:60,layers:5,opacity:.15,spread:.1,speed:20,acceleration:100,blobColour:n._0.lightblue,backgroundColour:n.KL.background};function r(t){this.blobs=[],this.center=e.createVector(t.x,t.y)}function c(t){this.position=e.createVector(t.x,t.y),this.points=[new h(0),new h(1),new h(2),new h(3),new h(4)],this.drawCycle=[1,4,2,0,3,1,4,2,0,3,1]}function h(t){this.vertex=t,this.radius=((t,e)=>{const i=t*(e=e||.1)*Math.random()*2;return t+(i-i/2)})(.35*i.height,.25),this.initialRadius=this.radius,this.minRadius=this.radius*(1-a.spread),this.maxRadius=this.radius*(1+a.spread),this.isGrowing=Math.random()<.5,this.position=this.getCoordinates(this.vertex,this.radius)}a.opacity*=255,a.speed/=a.frameRate,a.speed*=-1,e.setup=function(){e.frameRate(a.frameRate),i=(t=>{const e=document.getElementById(t),i={};return i.width=e.clientWidth,i.height=e.clientHeight,i})(t),o=e.createCanvas(i.width,i.height),o.parent(t);const c=e.createVector(.5*i.width,.5*i.height);s=new r(c),s.add(a.layers),a.blobColour===n._0.lightblue&&(a.blobColour=e.color(a.blobColour.r,a.blobColour.g,a.blobColour.b,a.opacity)),e.fill(a.blobColour),e.noStroke()},e.windowResized=e.setup,e.draw=function(){e.background(a.backgroundColour),s.update(),s.display()},r.prototype.add=function(t){t=t||1;for(let e=0;e<t;e++)this.blobs.push(new c(this.center))},r.prototype.update=function(){this.blobs.forEach((function(t){t.update()}))},r.prototype.display=function(){this.blobs.forEach((function(t){t.display()}))},c.prototype.update=function(){this.points.forEach((function(t){t.update()}))},c.prototype.display=function(){e.beginShape();const t=this;this.drawCycle.forEach((function(i){e.curveVertex(t.position.x+t.points[i].position.x,t.position.y+t.points[i].position.y)})),e.endShape(e.CLOSE)},h.prototype.update=function(){this.radius>=.99*this.maxRadius&&(this.isGrowing=!1),this.radius<=1.01*this.minRadius&&(this.isGrowing=!0);const t=this.radius/this.initialRadius-1;let e=a.acceleration*a.speed*Math.pow(t,2)-a.speed;this.isGrowing||(e*=-1),this.radius+=e,this.position=this.getCoordinates(this.vertex,this.radius)},h.prototype.getCoordinates=function(t,i){const o={x:0,y:0};switch(t){case 0:o.x=0,o.y=-1*i;break;case 1:case 4:o.x=i*e.cos(18),o.y=-1*i*e.sin(18);break;case 2:case 3:o.x=i*e.cos(54),o.y=i*e.sin(54)}return 3!==t&&4!==t||(o.x*=-1),o}}),t),h="jsSketchBlob",u={position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1};var d=()=>(o.useEffect((()=>{"undefined"!=typeof window&&document&&c(h)}),[]),o.createElement(s.Z,null,o.createElement("div",{style:u,id:h}),o.createElement("main",null,o.createElement("h1",{style:n.cp.title},"👋 Hi"))))}}]);
//# sourceMappingURL=component---src-pages-index-js-18fc7f27268a818bac9d.js.map