// Copyright (c) 2025 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import{isPrimitive as e}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-matrix-like@v0.2.2-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-vector-like@v0.2.2-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@v0.2.1-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.2-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-minstd-shuffle@v0.2.1-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@v0.2.3-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-ln@v0.2.4-esm/index.mjs";import d,{ndarray as f}from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-dcopy@v0.3.0-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@v0.2.2-esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-ctor@v0.2.2-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-ctor@v0.2.2-esm/index.mjs";import{ndarray as c}from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-gcopy@v0.2.1-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.2-esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.2-esm/index.mjs";import{isPrimitive as v}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@v0.2.2-esm/index.mjs";import j from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-array-like-object@v0.2.2-esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-contains@v0.2.2-esm/index.mjs";import y from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sqrt@v0.2.2-esm/index.mjs";import{factory as b}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-sample@v0.2.1-esm/index.mjs";import{factory as w}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-discrete-uniform@v0.2.1-esm/index.mjs";import{factory as x}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-mt19937@v0.2.1-esm/index.mjs";import E from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-pinf@v0.2.2-esm/index.mjs";import T from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mean@v0.2.2-esm/index.mjs";import z from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-meanstdev@v0.2.2-esm/index.mjs";function k(e,r,t){return(t?h:p)("float64",new m(e*r),[e,r],[r,1],0,"row-major")}function A(e,r){var t,s,i,n,o,a,d,f,m,p,h;for(m=r.shape[0],p=r.shape[1],t=r.data,s=e.data,i=r.strides[0],n=r.strides[1],o=e.strides[0],a=e.strides[1],d=r.offset,f=e.offset,h=0;h<m;h++)c(p,t,n,d,s,a,f),d+=i,f+=o;return e}function q(e,r){return(r?h:p)("float64",new m(e),[e],[1],0,"row-major")}function P(e,r){return c(r.shape[0],r.data,r.strides[0],r.offset,e.data,e.strides[0],e.offset),e}var R=["euclidean","correlation","cosine"],S=["forgy","sample","kmeans++"];var _={forgy:["forgy",1],sample:["sample",1],"kmeans++":["kmeans++",1,1]};function B(e,r,t,s){var i,n,o,a;for(n=0,i=s,a=0;a<e;a++)n+=(o=r[i])*o,i+=t;for(n=y(n),i=s,a=0;a<e;a++)r[i]/=n;return r}function D(e){var r,t,s,i,n,o,a;for(r=e.data,n=e.shape[0],o=e.shape[1],t=e.strides[0],s=e.strides[1],i=e.offset,a=0;a<n;a++)B(o,r,s,i),i+=t;return e}function L(e,r,t,s,i,n,o,a,d,f){var m,p,h,c;for(m=s,p=o,h=f,c=0;c<e;c++)r[m]=(r[m]-i[p])/a[h],m+=t,p+=n,h+=d;return r}function M(e,r){var t,s,i,n,o,a,d;for(t=e.data,o=e.shape[0],a=e.shape[1],s=e.strides[0],i=e.strides[1],n=e.offset,d=0;d<o;d++)L(a,t,i,n,r,2,0,r,2,1),n+=s;return e}function N(e,r,t,s,i,n,o){var a=function(e,r,t,s,i,n,o){var a,d,f,m,p;for(a=s,d=o,m=0,p=0;p<e;p++)m+=(f=r[a]-i[d])*f,a+=t,d+=n;return y(m)}(e,r,t,s,i,n,o);return a*a}function V(e,r,t,s,i,n,o){var a,d,f,m;for(a=s,d=o,f=0,m=0;m<e;m++)f+=r[a]*i[d],a+=t,d+=n;return f}function Y(e,r,t,s,i,n,o){var a=1-V(e,r,t,s,i,n,o);return a*a}function C(e,r,t,s,i,n,o){var a=1-V(e,r,t,s,i,n,o);return a*a}function F(e,r,t,s,i,n){var o,a,d,f,m;for(f=i.data,o=(d=i.strides[0])*n,a=0,m=0;m<t;m++)e[m]=r(s,f,1,a,f,1,o),a+=d;return e}function G(e,r,t,s,i,n,o,a,d){var f,m,p,h;for(f=E,h=0;h<r;h++)(p=e(t,s,1,n,o,a,d))<f&&(f=p,m=h),n+=i;return m}function H(e,r,t,s,i,n,o,a){var d,f;for(f=0;f<e;f++)d=t[i],d+=(n[a]-d)/r,t[i]=d,i+=s,a+=o;return t}function I(e,r,t,s,i,n){var o,a;return a=e.shape[1],function(d){void 0===o&&((o=k(n.init[1],a,!0)).count=0);if(o.count<n.init[1]&&(c(a,d.data,d.strides[0],d.offset,o.data,o.strides[1],o.strides[0]*o.count),o.count+=1,o.count<n.init[1]))return!1;n.normalize&&("cosine"===n.metric?o=D(o):"correlation"===n.metric&&(o=M(o,s())));e="forgy"===n.init[0]?function(e,r,t){var s,i,n,o,a,d,f,m,p,h,c,l,u,v,j,g;for(u=e.shape[0],v=e.shape[1],i=e.data,f=e.strides[0],m=e.strides[1],h=e.offset,o=r.data,n=r.shape[0],a=r.strides[0],d=r.strides[1],l=r.offset,s=w(0,u-1,{seed:t}),p=[],j=0;j<u*v;j++)p.push(T());for(j=0;j<n;j++){for(c=v*s(),g=0;g<v;g++)p[c+g](o[l+d*g]);l+=a}for(c=0,j=0;j<u;j++){for(g=0;g<v;g++)i[h+m*g]=p[c](),c+=1;h+=f}return e}(e,o,n.seed):"sample"===n.init[0]?function(e,r,t){var s,i,n,o,a,d,m,p,h,c,l;for(h=e.shape[0],c=e.shape[1],i=e.data,d=e.strides[1],m=e.offset,n=r.data,o=r.strides[0],a=r.strides[1],s=[],l=0;l<r.shape[0];l++)s.push(l);for(p=h===s.length?s:b({seed:t,size:h,mutate:!1,replacement:!1})(s),l=0;l<h;l++)f(c,n,a,o*p[l],i,d,m);return e}(e,o,n.seed):function(e,r,t,s,i){var n,o,a,d,m,p,h,c,l,u,v,j,g,y,b,T,z,k,A,q,P,R,S,_,B,D,L,M;if(_=e.shape[0],d=e.shape[1],c=r.shape[0],j=e.data,z=e.strides[0],k=e.strides[1],A=e.offset,g=r.data,b=r.strides[0],T=r.strides[1],h=x({seed:i}),a=w({seed:h()}),h=h.normalized,v="cosine"===t?Y:"correlation"===t?C:N,S=a(0,c-1),1===_)return f(d,g,T,b*S,j,k,A);for(n=[S],q=new Array(d),m=new Array(2*c),y=0,D=0;D<c;D++)m[y]=E,m[y+1]=0,y+=2;for(p=new Array(c),L=1;L<_;L++){for(F(q,v,c,d,r,n[L-1]),l=0,y=0,D=0;D<c;D++)q[D]<m[y]?(m[y]=q[D],m[y+1]=L-1,l+=q[D]):l+=m[y],y+=2;for(p[0]=m[0]/l,y=2,D=1;D<c;D++)p[D]=p[D-1]+m[y]/l,y+=2;for(u=E,P=-1,M=0;M<s;M++){for(S=-1;-1===S;)for(B=h(),D=0;D<c;D++)if(B<p[D]){S=D;break}for(l=0,o=b*S,y=0,D=0;D<c;D++)(R=v(d,g,1,b*D,g,1,o))<m[y]?l+=R:l+=m[y],y+=2;l<u&&(u=l,P=S)}n.push(P)}for(D=0;D<_;D++)f(d,g,T,b*n[D],j,k,A),A+=z;return e}(e,o,n.metric,n.init[2],n.seed);return function(e,r,t,s,i){var n,o,a,d,f,m,p,h,c,l,u;for(c=r.shape[0],n=r.shape[1],d=e.shape[0],o=r.data,f=r.strides[0],a=e.data,m=e.strides[0],h=0,u=0;u<d;u++)p=f*(l=G(i,c,n,o,f,0,a,1,h)),H(n,t.get(l,0)+1,o,1,p,a,1,h),s(l,i(n,o,1,p,a,1,h)),h+=m}(o,e,r,t,i),!0}}var J=4;function K(){var f,p,h,c,b,w,x,E,T,V,F,K,O,Q;if(r(arguments[0]))Q=arguments[0].shape[0],E=arguments[0].shape[1],p=A(p=k(Q,E,!0),arguments[0]),arguments.length>1&&(c=arguments[1],O=!0);else{if(!e(arguments[0]))throw new TypeError(i("0h34q",arguments[0]));if(Q=arguments[0],!e(E=arguments[1]))throw new TypeError(i("0h34p",E));arguments.length>2&&(c=arguments[2],O=!0)}if((V={metric:"euclidean",init:_["kmeans++"].slice(),seed:n(),normalize:!0,copy:!0}).init[1]=Q,V.init[2]=2+o(a(Q)),O&&(K=function(r,t){if(!l(t))return new TypeError(i("0h32V",t));if(u(t,"metric")&&(r.metric=t.metric,!g(R,r.metric)))return new TypeError(i("0h34S","metric",R.join('", "'),r.metric));if(u(t,"init")){if(!j(t.init))return new TypeError(i("0h34l","init",t.init));if(!g(S,t.init[0]))return new TypeError(i("0h34y","init",S.join('", "'),t.init[0]));if(r.init[0]=t.init[0],t.init.length>1&&(r.init[1]=t.init[1],!e(r.init[1])))return new TypeError(i("0h34z","init",r.init[1]));if(t.init.length>2&&(r.init[2]=t.init[2],!e(r.init[2])))return new TypeError(i("0h350","init",r.init[2]))}return u(t,"normalize")&&(r.normalize=t.normalize,!v(r.normalize))?new TypeError(i("0h32o","normalize",r.normalize)):u(t,"copy")&&(r.copy=t.copy,!v(r.copy))?new TypeError(i("0h32o","copy",r.copy)):(u(t,"seed")&&(r.seed=t.seed),null)}(V,c),K))throw K;if(V.init[1]<Q)throw new RangeError(i("0h34r","init",V.init[1]));return b=function(e,r){var t={};return t.centroids=k(e,r,!1),t.stats=k(e,J,!1),t}(Q,E),x=k(Q,J,!0),f=function(e,r){var t,s;for(t=[],s=0;s<r;s++)t.push(0);return function(r,s){var i,n,o;return o=e.get(r,0)+1,e.set(r,0,o),e.set(r,1,e.get(r,1)+s),n=e.get(r,2),n+=(i=s-n)/o,t[r]+=i*(s-n),e.set(r,2,n),e.set(r,3,y(t[r]/(o-1))),e}}(x,Q),"cosine"===V.metric?(T=Y,V.copy&&(w=q(E,!0))):"correlation"===V.metric?(T=C,V.normalize&&(h=function(e){var r,t,s,i,n;for(r=2*(s=new m(2*e)).BYTES_PER_ELEMENT,t=[],i=0,n=0;n<e;n++)t.push(z(new m(s.buffer,i,2))),i+=r;return function(r){var i;if(0===arguments.length)return s;for(i=0;i<e;i++)t[i](r.get(i));return s}}(E)),V.copy&&(w=q(E,!0))):T=N,void 0===p?(p=k(Q,E,!0),F=I(p,x,f,h,T,V)):A(b.centroids,p),s(U,"seed",V.seed),s(U,"predict",(function(e,s){var n,o,a,d,f,m,c,l,u,v,j;if(arguments.length>1){if(!t(e))throw new TypeError(i("0h3Ec",e));u=e,l=s}else l=e;if(!r(l))throw new TypeError(i("0h3Ed",l));if(l.shape[1]!==E)throw new Error(i("0h3Ee",E,l.shape[1]));if(void 0===u)u=q(l.shape[0],!1);else if(u.length!==l.shape[0])throw new Error(i("0h34x",l.shape[0],u.length));if(F)return null;a=l.shape[0],V.normalize&&("cosine"===V.metric?(V.copy&&(l=A(k(a,E,!0),l)),l=D(l)):"correlation"===V.metric&&(V.copy&&(l=A(k(a,E,!0),l)),l=M(l,h())));for(o=p.data,m=p.strides[0],n=l.data,d=l.strides[0],f=l.strides[1],c=l.offset,j=0;j<a;j++)v=G(T,Q,E,o,m,0,n,f,c),u.set(j,v),c+=d;return u})),U;function U(e){var r,s,n,o,a,m,c,l,u,v,j;if(0===arguments.length)return F?null:b;if(!t(l=e))throw new TypeError(i("0h3Dd",l));if(l.shape[0]!==E)throw new Error(i("0h34t",E,l.shape[0]));if(h&&h(l),F){if(!1===F(l))return null;F=void 0}else V.normalize&&("cosine"===V.metric?(V.copy&&(l=P(w,l)),B(E,l.data,l.strides[0],l.offset)):"correlation"===V.metric&&(V.copy&&(l=P(w,l)),n=h(),L(E,l.data,l.strides[0],l.offset,n,2,0,n,2,1))),r=p.data,a=p.strides[0],s=l.data,o=l.strides[0],m=l.offset,c=a*(j=G(T,Q,E,r,a,0,s,o,m)),u=x.get(j,0)+1,H(E,u,r,1,c,s,o,m),v=T(E,r,1,c,s,o,m),f(j,v);return d(p.length,p.data,1,b.centroids.data,1),d(x.length,x.data,1,b.stats.data,1),b}}export{K as default};
//# sourceMappingURL=index.mjs.map
