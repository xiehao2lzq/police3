/**/_jsload2&&_jsload2('hotspot', 'D.We(function(a){function b(){}function c(){}function e(a){var b=this.$;b.re=[];if(this.Ah)for(var c in this.Ah)if(!(0==c.indexOf("vector_")&&!this.Od()||0==c.indexOf("tile_")&&this.Od())){var e=this.Ah[c],f;for(f in e){var g=e[f];if(!(g.Ch>this.ka()||g.Cf<this.ka())){var i=this.Rb(g.ja());i.x<this.width&&i.y<this.height&&a.offsetX<i.x+g.Zu[1]&&(a.offsetX>i.x-g.Zu[3]&&a.offsetY>i.y-g.Zu[0]&&a.offsetY<i.y+g.Zu[2])&&b.re.push(g)}}}}function f(b){if(b.point){var c=a.ka(),e=a.va().nk().qg(b.point),f= new R(Math.floor(e.x*Math.pow(2,c-18)),Math.floor(e.y*Math.pow(2,c-18))),i=a.Cd.Id(c),e=a.NK(b.point,c),w=a.ea.replace(/^TANGRAM_/,""),y=e.Am,A=e.Cr,e=f.x-y*i,f=i-(f.y-A*i),w=a.xi[w+"_"+y+"_"+A+"_"+a.Cd.js(c)+"_"+c],c=[];if(w){for(var B in w.polygon)g([e,f],w.polygon[B].KE)&&c.push(w.polygon[B]);for(B in w.polyline){for(var C=[e,f],y=w.polyline[B].KE,i=5+w.polyline[B].style[0].dK,A=C[0],C=C[1],F=t,E=0,G=y.length-3;E<G;E+=2){var N;var L=y[E];N=y[E+1];var M=y[E+2],T=y[E+3],da=L-M,ba=N-T,da=da*da+ba* ba;da>k?(ba=((N-C)*(N-T)-(L-A)*(M-L))/da,1<ba||0>ba?(L=A-L,M=A-M,N=C-N,T=C-T,N=L*L+N*N,T=M*M+T*T,N=N<T?Math.sqrt(N):Math.sqrt(T)):N=Math.abs(((N-C)*-(L-M)-(L-A)*(T-N))/Math.sqrt(da))):(T=A-L,N=C-N,N=Math.sqrt(T*T+N*N));if(i>N){F=p;break}}F&&c.push(w.polyline[B])}}e=a.xi.TY;b=a.Rb(b.point);if(e)for(B in e.polygon)g([b.x,b.y],e.polygon[B].KE)&&c.push(e.k4[B]);return c}}function g(a,b){for(var c=a[0],e=a[1],f=t,g=0,i=b.length-2;g<b.length;g+=2){var k=b[g],B=b[g+1],C=b[i],i=b[i+1];B>e!==i>e&&c<(C-k)* (e-B)/(i-B)+k&&(f=!f);i=g}return f}function i(){a.$.LJ&&0<a.$.re.length?(a.platform.style.cursor="pointer",a.$.LJ=t):(a.$.re=[],a.platform.style.cursor=a.U.yc)}a.$.Et=new uc("",{Da:new P(15,-3),wp:{border:"1px solid #aaa",background:"#fffec2",whiteSpace:"nowrap",font:"12px "+H.fontFamily,mozBoxShadow:"1px 2px 6px #666",webkitBoxShadow:"1px 2px 6px #666",boxShadow:"1px 2px 6px #666",padding:"2px 4px"}});if(!a.U||!a.U.Ks){var k=0.01;a.addEventListener("movestart",b);a.addEventListener("moveend",c); a.addEventListener("zoomstart",b);a.addEventListener("zoomend",function(){setTimeout(c,30)});a.addEventListener("mousemove",function(b){if(!(b.sb&&!(b.sb instanceof oc)||b.Cb)){var c=this.$,f=c.re.slice(0);e.call(this,b);for(var g=c.re.slice(0),i=0;i<f.length;i++)for(var k=0;k<g.length;k++)f[i]===g[k]&&(f.splice(i,1),i--,g.splice(k,1),k--);if(0<f.length){var y=new Q("onhotspotout");y.spots=f.slice(0);this.dispatchEvent(y)}if(0==c.re.length&&!c.y3)this.platform.style.cursor!=this.U.yc&&(this.platform.style.cursor= this.U.yc),c.up&&(clearTimeout(c.up),c.up=s),c.ME=setTimeout(function(){c.Et.aa()},400);else if(0<g.length&&(this.platform.style.cursor="pointer",y=new Q("onhotspotover"),y.spots=g.slice(0),this.dispatchEvent(y),c.up&&(clearTimeout(c.up),c.up=s),c.ME&&(clearTimeout(c.ME),c.ME=s),y.spots[0].gD()))c.up=setTimeout(function(){c.Et.cd(y.spots[0].gD());c.Et.ua(b.point);c.Et.show();a.Pa(c.Et)},400)}});a.addEventListener("clickex",function(a){var b=this.$;a.overlay||(0==b.re.length&&e.call(this,a),0<b.re.length&& (a=new Q("onhotspotclick"),a.spots=b.re.slice(0),a.spots.sort(function(a,b){return a.ja().lat-b.ja().lat}),this.dispatchEvent(a),b.re.length=0))});a.addEventListener("rightclickex",function(a){if(this.U.vo||this.U.no){var b=this.$;if(!a.overlay&&a.point){var c=[];if(0<b.re.length){var e=b.re.slice(0);e.sort(function(a,b){return a.ja().lat-b.ja().lat});for(var g in e)c.push(e[g].ZA);b.re.length=0}b=f(a);c=c.concat(b);b=[];for(g in c)0>b.indexOf(c[g].Ub)&&b.push(c[g].Ub);g=new Q("onhotspotrightclick"); g.styles=c;g.styleIds=b;g.point=a.point;this.dispatchEvent(g)}}});a.addEventListener("load",i);a.addEventListener("moveend",i);a.addEventListener("zoomend",i);a.addEventListener("dragend",function(){this.$.LJ=p})}}); ');