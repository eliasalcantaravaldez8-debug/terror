(()=>{var Lp=Object.defineProperty;var Dp=(i,t)=>{for(var e in t)Lp(i,e,{get:t[e],enumerable:!0})};var gh="170";var zp=0,Au=1,Up=2;var wo=1,xh=2,xi=3,ki=0,pn=1,_n=2,Ni=0,Us=1,Fs=2,Ru=3,Cu=4,Np=5,es=100,Op=101,kp=102,Fp=103,Bp=104,Hp=200,Vp=201,Gp=202,Wp=203,ql=204,Yl=205,Xp=206,qp=207,Yp=208,$p=209,Zp=210,Jp=211,Kp=212,jp=213,Qp=214,$l=0,Zl=1,Jl=2,Bs=3,Kl=4,jl=5,Ql=6,tc=7,Eo=0,Zn=1,t0=2,Oi=0,e0=1,n0=2,i0=3,yh=4,s0=5,r0=6,a0=7,Pu="attached",o0="detached",qd=300,Hs=301,Vs=302,ec=303,nc=304,So=306,Ir=1e3,ss=1001,ic=1002,An=1003,l0=1004;var da=1005;var ii=1006,ul=1007;var qn=1008;var Mi=1009,Yd=1010,$d=1011,Lr=1012,vh=1013,rs=1014,Yn=1015,Yr=1016,_h=1017,Mh=1018,Gs=1020,Zd=35902,Jd=1021,Kd=1022,Un=1023,jd=1024,Qd=1025,Ns=1026,Ws=1027,bh=1028,wh=1029,tf=1030,Eh=1031;var Sh=1033,Ha=33776,Va=33777,Ga=33778,Wa=33779,sc=35840,rc=35841,ac=35842,oc=35843,lc=36196,cc=37492,hc=37496,uc=37808,dc=37809,fc=37810,pc=37811,mc=37812,gc=37813,xc=37814,yc=37815,vc=37816,_c=37817,Mc=37818,bc=37819,wc=37820,Ec=37821,Xa=36492,Sc=36494,Tc=36495,ef=36283,Ac=36284,Rc=36285,Cc=36286;var qa=2300,Pc=2301,dl=2302,Iu=2400,Lu=2401,Du=2402;var c0=3200,h0=3201;var Th=0,u0=1,Ui="",ln="srgb",Qs="srgb-linear",To="linear",ve="srgb";var xs=7680;var zu=519,d0=512,f0=513,p0=514,nf=515,m0=516,g0=517,x0=518,y0=519,Uu=35044;var Nu="300 es",vi=2e3,Ya=2001,Fi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ou=1234567,Sr=Math.PI/180,Xs=180/Math.PI;function Hi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[e&63|128]+dn[e>>8&255]+"-"+dn[e>>16&255]+dn[e>>24&255]+dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]).toLowerCase()}function Qe(i,t,e){return Math.max(t,Math.min(e,i))}function Ah(i,t){return(i%t+t)%t}function v0(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function _0(i,t,e){return i!==t?(e-i)/(t-i):0}function Tr(i,t,e){return(1-e)*i+e*t}function M0(i,t,e,n){return Tr(i,t,1-Math.exp(-e*n))}function b0(i,t=1){return t-Math.abs(Ah(i,t*2)-t)}function w0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function E0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function S0(i,t){return i+Math.floor(Math.random()*(t-i+1))}function T0(i,t){return i+Math.random()*(t-i)}function A0(i){return i*(.5-Math.random())}function R0(i){i!==void 0&&(Ou=i);let t=Ou+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function C0(i){return i*Sr}function P0(i){return i*Xs}function I0(i){return(i&i-1)===0&&i!==0}function L0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function D0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function z0(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ls(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ve={DEG2RAD:Sr,RAD2DEG:Xs,generateUUID:Hi,clamp:Qe,euclideanModulo:Ah,mapLinear:v0,inverseLerp:_0,lerp:Tr,damp:M0,pingpong:b0,smoothstep:w0,smootherstep:E0,randInt:S0,randFloat:T0,randFloatSpread:A0,seededRandom:R0,degToRad:C0,radToDeg:P0,isPowerOfTwo:I0,ceilPowerOfTwo:L0,floorPowerOfTwo:D0,setQuaternionFromProperEuler:z0,normalize:xn,denormalize:Ls},ut=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],b=s[1],y=s[4],v=s[7],T=s[2],E=s[5],R=s[8];return r[0]=a*x+o*b+l*T,r[3]=a*m+o*y+l*E,r[6]=a*p+o*v+l*R,r[1]=c*x+h*b+u*T,r[4]=c*m+h*y+u*E,r[7]=c*p+h*v+u*R,r[2]=d*x+f*b+g*T,r[5]=d*m+f*y+g*E,r[8]=d*p+f*v+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(fl.makeScale(t,e)),this}rotate(t){return this.premultiply(fl.makeRotation(-t)),this}translate(t,e){return this.premultiply(fl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},fl=new jt;function sf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function $a(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function U0(){let i=$a("canvas");return i.style.display="block",i}var ku={};function wr(i){i in ku||(ku[i]=!0,console.warn(i))}function N0(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function O0(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function k0(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ce={enabled:!0,workingColorSpace:Qs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(i.r=_i(i.r),i.g=_i(i.g),i.b=_i(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(i.r=Os(i.r),i.g=Os(i.g),i.b=Os(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ui?To:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function _i(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Fu=[.64,.33,.3,.6,.15,.06],Bu=[.2126,.7152,.0722],Hu=[.3127,.329],Vu=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gu=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ce.define({[Qs]:{primaries:Fu,whitePoint:Hu,transfer:To,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:Bu,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:Fu,whitePoint:Hu,transfer:ve,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:Bu,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}});var ys,Ic=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ys===void 0&&(ys=$a("canvas")),ys.width=t.width,ys.height=t.height;let n=ys.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ys}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=$a("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=_i(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(_i(e[n]/255)*255):e[n]=_i(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},F0=0,Za=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=Hi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(pl(s[a].image)):r.push(pl(s[a]))}else r=pl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function pl(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Ic.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var B0=0,Mn=class i extends Fi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ss,s=ss,r=ii,a=qn,o=Un,l=Mi,c=i.DEFAULT_ANISOTROPY,h=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:B0++}),this.uuid=Hi(),this.name="",this.source=new Za(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ir:t.x=t.x-Math.floor(t.x);break;case ss:t.x=t.x<0?0:1;break;case ic:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ir:t.y=t.y-Math.floor(t.y);break;case ss:t.y=t.y<0?0:1;break;case ic:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=qd;Mn.DEFAULT_ANISOTROPY=1;var pe=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,v=(f+1)/2,T=(p+1)/2,E=(h+d)/4,R=(u+x)/4,C=(g+m)/4;return y>v&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=E/n,r=R/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=E/s,r=C/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=C/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-x)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Lc=class extends Fi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Mn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Za(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},bi=class extends Lc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ja=class extends Mn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Dc=class extends Mn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var en=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-o,p=l*d+c*f+h*g+u*x,b=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let T=Math.sqrt(y),E=Math.atan2(T,p*b);m=Math.sin(m*E)/T,o=Math.sin(o*E)/T}let v=o*b;if(l=l*m+d*v,c=c*m+f*v,h=h*m+g*v,u=u*m+x*v,m===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ml.copy(this).projectOnVector(t),this.sub(ml)}reflect(t){return this.sub(ml.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ml=new D,Wu=new en,si=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Gn):Gn.fromBufferAttribute(r,a),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fa.copy(n.boundingBox)),fa.applyMatrix4(t.matrixWorld),this.union(fa)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gr),pa.subVectors(this.max,gr),vs.subVectors(t.a,gr),_s.subVectors(t.b,gr),Ms.subVectors(t.c,gr),Ci.subVectors(_s,vs),Pi.subVectors(Ms,_s),$i.subVectors(vs,Ms);let e=[0,-Ci.z,Ci.y,0,-Pi.z,Pi.y,0,-$i.z,$i.y,Ci.z,0,-Ci.x,Pi.z,0,-Pi.x,$i.z,0,-$i.x,-Ci.y,Ci.x,0,-Pi.y,Pi.x,0,-$i.y,$i.x,0];return!gl(e,vs,_s,Ms,pa)||(e=[1,0,0,0,1,0,0,0,1],!gl(e,vs,_s,Ms,pa))?!1:(ma.crossVectors(Ci,Pi),e=[ma.x,ma.y,ma.z],gl(e,vs,_s,Ms,pa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},di=[new D,new D,new D,new D,new D,new D,new D,new D],Gn=new D,fa=new si,vs=new D,_s=new D,Ms=new D,Ci=new D,Pi=new D,$i=new D,gr=new D,pa=new D,ma=new D,Zi=new D;function gl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zi.fromArray(i,r);let o=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),l=t.dot(Zi),c=e.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var H0=new si,xr=new D,xl=new D,ri=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):H0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xr.subVectors(t,this.center);let e=xr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(xr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xr.copy(t.center).add(xl)),this.expandByPoint(xr.copy(t.center).sub(xl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},fi=new D,yl=new D,ga=new D,Ii=new D,vl=new D,xa=new D,_l=new D,Dr=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=fi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fi.copy(this.origin).addScaledVector(this.direction,e),fi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){yl.copy(t).add(e).multiplyScalar(.5),ga.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(yl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ga),o=Ii.dot(this.direction),l=-Ii.dot(ga),c=Ii.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yl).addScaledVector(ga,d),f}intersectSphere(t,e){fi.subVectors(t.center,this.origin);let n=fi.dot(this.direction),s=fi.dot(fi)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,fi)!==null}intersectTriangle(t,e,n,s,r){vl.subVectors(e,t),xa.subVectors(n,t),_l.crossVectors(vl,xa);let a=this.direction.dot(_l),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,t);let l=o*this.direction.dot(xa.crossVectors(Ii,xa));if(l<0)return null;let c=o*this.direction.dot(vl.cross(Ii));if(c<0||l+c>a)return null;let h=-o*Ii.dot(_l);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ht=class i{constructor(t,e,n,s,r,a,o,l,c,h,u,d,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,d,f,g,x,m)}set(t,e,n,s,r,a,o,l,c,h,u,d,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/bs.setFromMatrixColumn(t,0).length(),r=1/bs.setFromMatrixColumn(t,1).length(),a=1/bs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,f=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-o*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d+x*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d-x*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(V0,t,G0)}lookAt(t,e,n){let s=this.elements;return Sn.subVectors(t,e),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Li.crossVectors(n,Sn),Li.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Li.crossVectors(n,Sn)),Li.normalize(),ya.crossVectors(Sn,Li),s[0]=Li.x,s[4]=ya.x,s[8]=Sn.x,s[1]=Li.y,s[5]=ya.y,s[9]=Sn.y,s[2]=Li.z,s[6]=ya.z,s[10]=Sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],b=n[3],y=n[7],v=n[11],T=n[15],E=s[0],R=s[4],C=s[8],w=s[12],M=s[1],L=s[5],U=s[9],N=s[13],k=s[2],W=s[6],H=s[10],nt=s[14],q=s[3],rt=s[7],dt=s[11],bt=s[15];return r[0]=a*E+o*M+l*k+c*q,r[4]=a*R+o*L+l*W+c*rt,r[8]=a*C+o*U+l*H+c*dt,r[12]=a*w+o*N+l*nt+c*bt,r[1]=h*E+u*M+d*k+f*q,r[5]=h*R+u*L+d*W+f*rt,r[9]=h*C+u*U+d*H+f*dt,r[13]=h*w+u*N+d*nt+f*bt,r[2]=g*E+x*M+m*k+p*q,r[6]=g*R+x*L+m*W+p*rt,r[10]=g*C+x*U+m*H+p*dt,r[14]=g*w+x*N+m*nt+p*bt,r[3]=b*E+y*M+v*k+T*q,r[7]=b*R+y*L+v*W+T*rt,r[11]=b*C+y*U+v*H+T*dt,r[15]=b*w+y*N+v*nt+T*bt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*f-n*l*f)+x*(+e*l*f-e*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+m*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-e*l*u+e*o*d+s*a*u-n*a*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],b=u*m*c-x*d*c+x*l*f-o*m*f-u*l*p+o*d*p,y=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,v=h*x*c-g*u*c+g*o*f-a*x*f-h*o*p+a*u*p,T=g*u*l-h*x*l-g*o*d+a*x*d+h*o*m-a*u*m,E=e*b+n*y+s*v+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/E;return t[0]=b*R,t[1]=(x*d*r-u*m*r-x*s*f+n*m*f+u*s*p-n*d*p)*R,t[2]=(o*m*r-x*l*r+x*s*c-n*m*c-o*s*p+n*l*p)*R,t[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*R,t[4]=y*R,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*R,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*p-e*l*p)*R,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*f+e*l*f)*R,t[8]=v*R,t[9]=(g*u*r-h*x*r-g*n*f+e*x*f+h*n*p-e*u*p)*R,t[10]=(a*x*r-g*o*r+g*n*c-e*x*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*R,t[12]=T*R,t[13]=(h*x*s-g*u*s+g*n*d-e*x*d-h*n*m+e*u*m)*R,t[14]=(g*o*s-a*x*s-g*n*l+e*x*l+a*n*m-e*o*m)*R,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,x=a*h,m=a*u,p=o*u,b=l*c,y=l*h,v=l*u,T=n.x,E=n.y,R=n.z;return s[0]=(1-(x+p))*T,s[1]=(f+v)*T,s[2]=(g-y)*T,s[3]=0,s[4]=(f-v)*E,s[5]=(1-(d+p))*E,s[6]=(m+b)*E,s[7]=0,s[8]=(g+y)*R,s[9]=(m-b)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=bs.set(s[0],s[1],s[2]).length(),a=bs.set(s[4],s[5],s[6]).length(),o=bs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Wn.copy(this);let c=1/r,h=1/a,u=1/o;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=u,Wn.elements[9]*=u,Wn.elements[10]*=u,e.setFromRotationMatrix(Wn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=vi){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),f,g;if(o===vi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ya)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=vi){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),d=(e+t)*c,f=(n+s)*h,g,x;if(o===vi)g=(a+r)*u,x=-2*u;else if(o===Ya)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},bs=new D,Wn=new Ht,V0=new D(0,0,0),G0=new D(1,1,1),Li=new D,ya=new D,Sn=new D,Xu=new Ht,qu=new en,Xe=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qu.setFromEuler(this),this.setFromQuaternion(qu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xe.DEFAULT_ORDER="XYZ";var Ka=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},W0=0,Yu=new D,ws=new en,pi=new Ht,va=new D,yr=new D,X0=new D,q0=new en,$u=new D(1,0,0),Zu=new D(0,1,0),Ju=new D(0,0,1),Ku={type:"added"},Y0={type:"removed"},Es={type:"childadded",child:null},Ml={type:"childremoved",child:null},qe=class i extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new Xe,n=new en,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ht},normalMatrix:{value:new jt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis($u,t)}rotateY(t){return this.rotateOnAxis(Zu,t)}rotateZ(t){return this.rotateOnAxis(Ju,t)}translateOnAxis(t,e){return Yu.copy(t).applyQuaternion(this.quaternion),this.position.add(Yu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($u,t)}translateY(t){return this.translateOnAxis(Zu,t)}translateZ(t){return this.translateOnAxis(Ju,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?va.copy(t):va.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(yr,va,this.up):pi.lookAt(va,yr,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(pi),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ku),Es.child=t,this.dispatchEvent(Es),Es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Y0),Ml.child=t,this.dispatchEvent(Ml),Ml.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ku),Es.child=t,this.dispatchEvent(Es),Es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,t,X0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,q0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};qe.DEFAULT_UP=new D(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xn=new D,mi=new D,bl=new D,gi=new D,Ss=new D,Ts=new D,ju=new D,wl=new D,El=new D,Sl=new D,Tl=new pe,Al=new pe,Rl=new pe,ns=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Xn.subVectors(t,e),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Xn.subVectors(s,e),mi.subVectors(n,e),bl.subVectors(t,e);let a=Xn.dot(Xn),o=Xn.dot(mi),l=Xn.dot(bl),c=mi.dot(mi),h=mi.dot(bl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gi.x),l.addScaledVector(a,gi.y),l.addScaledVector(o,gi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Tl.setScalar(0),Al.setScalar(0),Rl.setScalar(0),Tl.fromBufferAttribute(t,e),Al.fromBufferAttribute(t,n),Rl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Tl,r.x),a.addScaledVector(Al,r.y),a.addScaledVector(Rl,r.z),a}static isFrontFacing(t,e,n,s){return Xn.subVectors(n,e),mi.subVectors(t,e),Xn.cross(mi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Xn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ss.subVectors(s,n),Ts.subVectors(r,n),wl.subVectors(t,n);let l=Ss.dot(wl),c=Ts.dot(wl);if(l<=0&&c<=0)return e.copy(n);El.subVectors(t,s);let h=Ss.dot(El),u=Ts.dot(El);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ss,a);Sl.subVectors(t,r);let f=Ss.dot(Sl),g=Ts.dot(Sl);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ts,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ju.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(ju,o);let p=1/(m+x+d);return a=x*p,o=d*p,e.copy(n).addScaledVector(Ss,a).addScaledVector(Ts,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},_a={h:0,s:0,l:0};function Cl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ot=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ce.workingColorSpace){if(t=Ah(t,1),e=Qe(e,0,1),n=Qe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Cl(a,r,t+1/3),this.g=Cl(a,r,t),this.b=Cl(a,r,t-1/3)}return ce.toWorkingColorSpace(this,s),this}setStyle(t,e=ln){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ln){let n=rf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}copyLinearToSRGB(t){return this.r=Os(t.r),this.g=Os(t.g),this.b=Os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ln){return ce.fromWorkingColorSpace(fn.copy(this),t),Math.round(Qe(fn.r*255,0,255))*65536+Math.round(Qe(fn.g*255,0,255))*256+Math.round(Qe(fn.b*255,0,255))}getHexString(t=ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.fromWorkingColorSpace(fn.copy(this),e);let n=fn.r,s=fn.g,r=fn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.fromWorkingColorSpace(fn.copy(this),e),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=ln){ce.fromWorkingColorSpace(fn.copy(this),t);let e=fn.r,n=fn.g,s=fn.b;return t!==ln?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Di),this.setHSL(Di.h+t,Di.s+e,Di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Di),t.getHSL(_a);let n=Tr(Di.h,_a.h,e),s=Tr(Di.s,_a.s,e),r=Tr(Di.l,_a.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new Ot;Ot.NAMES=rf;var $0=0,wi=class extends Fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$0++}),this.uuid=Hi(),this.name="",this.blending=Us,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ql,this.blendDst=Yl,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ql&&(n.blendSrc=this.blendSrc),this.blendDst!==Yl&&(n.blendDst=this.blendDst),this.blendEquation!==es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ae=class extends wi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.combine=Eo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var He=new D,Ma=new ut,Oe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uu,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ma.fromBufferAttribute(this,e),Ma.applyMatrix3(t),this.setXY(e,Ma.x,Ma.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix3(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ls(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ls(e,this.array)),e}setX(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ls(e,this.array)),e}setY(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ls(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ls(e,this.array)),e}setW(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),n=xn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),n=xn(n,this.array),s=xn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),n=xn(n,this.array),s=xn(s,this.array),r=xn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uu&&(t.usage=this.usage),t}};var ja=class extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Qa=class extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ae=class extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Z0=0,zn=new Ht,Pl=new qe,As=new D,Tn=new si,vr=new si,je=new D,Ue=class i extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Z0++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sf(t)?Qa:ja)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return zn.makeRotationFromQuaternion(t),this.applyMatrix4(zn),this}rotateX(t){return zn.makeRotationX(t),this.applyMatrix4(zn),this}rotateY(t){return zn.makeRotationY(t),this.applyMatrix4(zn),this}rotateZ(t){return zn.makeRotationZ(t),this.applyMatrix4(zn),this}translate(t,e,n){return zn.makeTranslation(t,e,n),this.applyMatrix4(zn),this}scale(t,e,n){return zn.makeScale(t,e,n),this.applyMatrix4(zn),this}lookAt(t){return Pl.lookAt(t),Pl.updateMatrix(),this.applyMatrix4(Pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ae(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];vr.setFromBufferAttribute(o),this.morphTargetsRelative?(je.addVectors(Tn.min,vr.min),Tn.expandByPoint(je),je.addVectors(Tn.max,vr.max),Tn.expandByPoint(je)):(Tn.expandByPoint(vr.min),Tn.expandByPoint(vr.max))}Tn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)je.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(je));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)je.fromBufferAttribute(o,c),l&&(As.fromBufferAttribute(t,c),je.add(As)),s=Math.max(s,n.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new D,l[C]=new D;let c=new D,h=new D,u=new D,d=new ut,f=new ut,g=new ut,x=new D,m=new D;function p(C,w,M){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),o[C].add(x),o[w].add(x),o[M].add(x),l[C].add(m),l[w].add(m),l[M].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let C=0,w=b.length;C<w;++C){let M=b[C],L=M.start,U=M.count;for(let N=L,k=L+U;N<k;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}let y=new D,v=new D,T=new D,E=new D;function R(C){T.fromBufferAttribute(s,C),E.copy(T);let w=o[C];y.copy(w),y.sub(T.multiplyScalar(T.dot(w))).normalize(),v.crossVectors(E,w);let L=v.dot(l[C])<0?-1:1;a.setXYZW(C,y.x,y.y,y.z,L)}for(let C=0,w=b.length;C<w;++C){let M=b[C],L=M.start,U=M.count;for(let N=L,k=L+U;N<k;N+=3)R(t.getX(N+0)),R(t.getX(N+1)),R(t.getX(N+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Oe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qu=new Ht,Ji=new Dr,ba=new ri,td=new D,wa=new D,Ea=new D,Sa=new D,Il=new D,Ta=new D,ed=new D,Aa=new D,$t=class extends qe{constructor(t=new Ue,e=new Ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Il.fromBufferAttribute(u,t),a?Ta.addScaledVector(Il,h):Ta.addScaledVector(Il.sub(e),h))}e.add(Ta)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ba.copy(n.boundingSphere),ba.applyMatrix4(r),Ji.copy(t.ray).recast(t.near),!(ba.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(ba,td)===null||Ji.origin.distanceToSquared(td)>(t.far-t.near)**2))&&(Qu.copy(r).invert(),Ji.copy(t.ray).applyMatrix4(Qu),!(n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ji)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,T=y;v<T;v+=3){let E=o.getX(v),R=o.getX(v+1),C=o.getX(v+2);s=Ra(this,p,t,n,c,h,u,E,R,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let b=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);s=Ra(this,a,t,n,c,h,u,b,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,T=y;v<T;v+=3){let E=v,R=v+1,C=v+2;s=Ra(this,p,t,n,c,h,u,E,R,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let b=m,y=m+1,v=m+2;s=Ra(this,a,t,n,c,h,u,b,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function J0(i,t,e,n,s,r,a,o){let l;if(t.side===pn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ki,o),l===null)return null;Aa.copy(o),Aa.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Aa);return c<e.near||c>e.far?null:{distance:c,point:Aa.clone(),object:i}}function Ra(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,wa),i.getVertexPosition(l,Ea),i.getVertexPosition(c,Sa);let h=J0(i,t,e,n,wa,Ea,Sa,ed);if(h){let u=new D;ns.getBarycoord(ed,wa,Ea,Sa,u),s&&(h.uv=ns.getInterpolatedAttribute(s,o,l,c,u,new ut)),r&&(h.uv1=ns.getInterpolatedAttribute(r,o,l,c,u,new ut)),a&&(h.normal=ns.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new D,materialIndex:0};ns.getNormal(wa,Ea,Sa,d.normal),h.face=d,h.barycoord=u}return h}var kt=class i extends Ue{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ae(c,3)),this.setAttribute("normal",new ae(h,3)),this.setAttribute("uv",new ae(u,2));function g(x,m,p,b,y,v,T,E,R,C,w){let M=v/R,L=T/C,U=v/2,N=T/2,k=E/2,W=R+1,H=C+1,nt=0,q=0,rt=new D;for(let dt=0;dt<H;dt++){let bt=dt*L-N;for(let Ft=0;Ft<W;Ft++){let Rt=Ft*M-U;rt[x]=Rt*b,rt[m]=bt*y,rt[p]=k,c.push(rt.x,rt.y,rt.z),rt[x]=0,rt[m]=0,rt[p]=E>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Ft/R),u.push(1-dt/C),nt+=1}}for(let dt=0;dt<C;dt++)for(let bt=0;bt<R;bt++){let Ft=d+bt+W*dt,Rt=d+bt+W*(dt+1),$=d+(bt+1)+W*(dt+1),et=d+(bt+1)+W*dt;l.push(Ft,Rt,et),l.push(Rt,$,et),q+=6}o.addGroup(f,q,w),f+=q,d+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function qs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function yn(i){let t={};for(let e=0;e<i.length;e++){let n=qs(i[e]);for(let s in n)t[s]=n[s]}return t}function K0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function af(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var j0={clone:qs,merge:yn},Q0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nn=class extends wi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Q0,this.fragmentShader=tm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qs(t.uniforms),this.uniformsGroups=K0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},to=class extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=vi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},zi=new D,nd=new ut,id=new ut,tn=class extends to{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xs*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zi.x,zi.y).multiplyScalar(-t/zi.z),zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zi.x,zi.y).multiplyScalar(-t/zi.z)}getViewSize(t,e){return this.getViewBounds(t,nd,id),e.subVectors(id,nd)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Sr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Rs=-90,Cs=1,zr=class extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(Rs,Cs,t,e);s.layers=this.layers,this.add(s);let r=new tn(Rs,Cs,t,e);r.layers=this.layers,this.add(r);let a=new tn(Rs,Cs,t,e);a.layers=this.layers,this.add(a);let o=new tn(Rs,Cs,t,e);o.layers=this.layers,this.add(o);let l=new tn(Rs,Cs,t,e);l.layers=this.layers,this.add(l);let c=new tn(Rs,Cs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===vi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ya)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},eo=class extends Mn{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Hs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ur=class extends bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new eo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ii}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new kt(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:qs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:pn,blending:Ni});r.uniforms.tEquirect.value=e;let a=new $t(s,r),o=e.minFilter;return e.minFilter===qn&&(e.minFilter=ii),new zr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Ll=new D,em=new D,nm=new jt,yi=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ll.subVectors(n,e).cross(em.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ll),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||nm.getNormalMatrix(t),s=this.coplanarPoint(Ll).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ki=new ri,Ca=new D,Nr=class{constructor(t=new yi,e=new yi,n=new yi,s=new yi,r=new yi,a=new yi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vi){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],b=s[13],y=s[14],v=s[15];if(n[0].setComponents(l-r,d-c,m-f,v-p).normalize(),n[1].setComponents(l+r,d+c,m+f,v+p).normalize(),n[2].setComponents(l+a,d+h,m+g,v+b).normalize(),n[3].setComponents(l-a,d-h,m-g,v-b).normalize(),n[4].setComponents(l-o,d-u,m-x,v-y).normalize(),e===vi)n[5].setComponents(l+o,d+u,m+x,v+y).normalize();else if(e===Ya)n[5].setComponents(o,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ca.x=s.normal.x>0?t.max.x:t.min.x,Ca.y=s.normal.y>0?t.max.y:t.min.y,Ca.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function of(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function im(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var mn=class i extends Ue{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let b=p*d-a;for(let y=0;y<c;y++){let v=y*u-r;g.push(v,-b,0),x.push(0,0,1),m.push(y/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){let y=b+c*p,v=b+c*(p+1),T=b+1+c*(p+1),E=b+1+c*p;f.push(y,v,E),f.push(v,T,E)}this.setIndex(f),this.setAttribute("position",new ae(g,3)),this.setAttribute("normal",new ae(x,3)),this.setAttribute("uv",new ae(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},sm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,am=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,um=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,fm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ym=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Am=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Um=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,km=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$m=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Jm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Km=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ng=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ig=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ag=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,og=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ug=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ag=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ig=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Og=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Bg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$g=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ix=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ux=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,px=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,yx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_x=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ax=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Px=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:sm,alphahash_pars_fragment:rm,alphamap_fragment:am,alphamap_pars_fragment:om,alphatest_fragment:lm,alphatest_pars_fragment:cm,aomap_fragment:hm,aomap_pars_fragment:um,batching_pars_vertex:dm,batching_vertex:fm,begin_vertex:pm,beginnormal_vertex:mm,bsdfs:gm,iridescence_fragment:xm,bumpmap_pars_fragment:ym,clipping_planes_fragment:vm,clipping_planes_pars_fragment:_m,clipping_planes_pars_vertex:Mm,clipping_planes_vertex:bm,color_fragment:wm,color_pars_fragment:Em,color_pars_vertex:Sm,color_vertex:Tm,common:Am,cube_uv_reflection_fragment:Rm,defaultnormal_vertex:Cm,displacementmap_pars_vertex:Pm,displacementmap_vertex:Im,emissivemap_fragment:Lm,emissivemap_pars_fragment:Dm,colorspace_fragment:zm,colorspace_pars_fragment:Um,envmap_fragment:Nm,envmap_common_pars_fragment:Om,envmap_pars_fragment:km,envmap_pars_vertex:Fm,envmap_physical_pars_fragment:Jm,envmap_vertex:Bm,fog_vertex:Hm,fog_pars_vertex:Vm,fog_fragment:Gm,fog_pars_fragment:Wm,gradientmap_pars_fragment:Xm,lightmap_pars_fragment:qm,lights_lambert_fragment:Ym,lights_lambert_pars_fragment:$m,lights_pars_begin:Zm,lights_toon_fragment:Km,lights_toon_pars_fragment:jm,lights_phong_fragment:Qm,lights_phong_pars_fragment:tg,lights_physical_fragment:eg,lights_physical_pars_fragment:ng,lights_fragment_begin:ig,lights_fragment_maps:sg,lights_fragment_end:rg,logdepthbuf_fragment:ag,logdepthbuf_pars_fragment:og,logdepthbuf_pars_vertex:lg,logdepthbuf_vertex:cg,map_fragment:hg,map_pars_fragment:ug,map_particle_fragment:dg,map_particle_pars_fragment:fg,metalnessmap_fragment:pg,metalnessmap_pars_fragment:mg,morphinstance_vertex:gg,morphcolor_vertex:xg,morphnormal_vertex:yg,morphtarget_pars_vertex:vg,morphtarget_vertex:_g,normal_fragment_begin:Mg,normal_fragment_maps:bg,normal_pars_fragment:wg,normal_pars_vertex:Eg,normal_vertex:Sg,normalmap_pars_fragment:Tg,clearcoat_normal_fragment_begin:Ag,clearcoat_normal_fragment_maps:Rg,clearcoat_pars_fragment:Cg,iridescence_pars_fragment:Pg,opaque_fragment:Ig,packing:Lg,premultiplied_alpha_fragment:Dg,project_vertex:zg,dithering_fragment:Ug,dithering_pars_fragment:Ng,roughnessmap_fragment:Og,roughnessmap_pars_fragment:kg,shadowmap_pars_fragment:Fg,shadowmap_pars_vertex:Bg,shadowmap_vertex:Hg,shadowmask_pars_fragment:Vg,skinbase_vertex:Gg,skinning_pars_vertex:Wg,skinning_vertex:Xg,skinnormal_vertex:qg,specularmap_fragment:Yg,specularmap_pars_fragment:$g,tonemapping_fragment:Zg,tonemapping_pars_fragment:Jg,transmission_fragment:Kg,transmission_pars_fragment:jg,uv_pars_fragment:Qg,uv_pars_vertex:tx,uv_vertex:ex,worldpos_vertex:nx,background_vert:ix,background_frag:sx,backgroundCube_vert:rx,backgroundCube_frag:ax,cube_vert:ox,cube_frag:lx,depth_vert:cx,depth_frag:hx,distanceRGBA_vert:ux,distanceRGBA_frag:dx,equirect_vert:fx,equirect_frag:px,linedashed_vert:mx,linedashed_frag:gx,meshbasic_vert:xx,meshbasic_frag:yx,meshlambert_vert:vx,meshlambert_frag:_x,meshmatcap_vert:Mx,meshmatcap_frag:bx,meshnormal_vert:wx,meshnormal_frag:Ex,meshphong_vert:Sx,meshphong_frag:Tx,meshphysical_vert:Ax,meshphysical_frag:Rx,meshtoon_vert:Cx,meshtoon_frag:Px,points_vert:Ix,points_frag:Lx,shadow_vert:Dx,shadow_frag:zx,sprite_vert:Ux,sprite_frag:Nx},pt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},ni={basic:{uniforms:yn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:yn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:yn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:yn([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:yn([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:yn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:yn([pt.points,pt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:yn([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:yn([pt.common,pt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:yn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:yn([pt.sprite,pt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:yn([pt.common,pt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:yn([pt.lights,pt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};ni.physical={uniforms:yn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Pa={r:0,b:0,g:0},ji=new Xe,Ox=new Ht;function kx(i,t,e,n,s,r,a){let o=new Ot(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?e:t).get(y)),y}function x(b){let y=!1,v=g(b);v===null?p(o,l):v&&v.isColor&&(p(v,1),y=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,y){let v=g(y);v&&(v.isCubeTexture||v.mapping===So)?(h===void 0&&(h=new $t(new kt(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:qs(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ji.copy(y.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ox.makeRotationFromEuler(ji)),h.material.toneMapped=ce.getTransfer(v.colorSpace)!==ve,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new $t(new mn(2,2),new Nn({name:"BackgroundMaterial",uniforms:qs(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ce.getTransfer(v.colorSpace)!==ve,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,y){b.getRGB(Pa,af(i)),n.buffers.color.setClear(Pa.r,Pa.g,Pa.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(b,y=1){o.set(b),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:x,addToRenderList:m}}function Fx(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(M,L,U,N,k){let W=!1,H=u(N,U,L);r!==H&&(r=H,c(r.object)),W=f(M,N,U,k),W&&g(M,N,U,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,v(M,L,U,N),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,U){let N=U.wireframe===!0,k=n[M.id];k===void 0&&(k={},n[M.id]=k);let W=k[L.id];W===void 0&&(W={},k[L.id]=W);let H=W[N];return H===void 0&&(H=d(l()),W[N]=H),H}function d(M){let L=[],U=[],N=[];for(let k=0;k<e;k++)L[k]=0,U[k]=0,N[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:N,object:M,attributes:{},index:null}}function f(M,L,U,N){let k=r.attributes,W=L.attributes,H=0,nt=U.getAttributes();for(let q in nt)if(nt[q].location>=0){let dt=k[q],bt=W[q];if(bt===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(bt=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(bt=M.instanceColor)),dt===void 0||dt.attribute!==bt||bt&&dt.data!==bt.data)return!0;H++}return r.attributesNum!==H||r.index!==N}function g(M,L,U,N){let k={},W=L.attributes,H=0,nt=U.getAttributes();for(let q in nt)if(nt[q].location>=0){let dt=W[q];dt===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor));let bt={};bt.attribute=dt,dt&&dt.data&&(bt.data=dt.data),k[q]=bt,H++}r.attributes=k,r.attributesNum=H,r.index=N}function x(){let M=r.newAttributes;for(let L=0,U=M.length;L<U;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){let U=r.newAttributes,N=r.enabledAttributes,k=r.attributeDivisors;U[M]=1,N[M]===0&&(i.enableVertexAttribArray(M),N[M]=1),k[M]!==L&&(i.vertexAttribDivisor(M,L),k[M]=L)}function b(){let M=r.newAttributes,L=r.enabledAttributes;for(let U=0,N=L.length;U<N;U++)L[U]!==M[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function y(M,L,U,N,k,W,H){H===!0?i.vertexAttribIPointer(M,L,U,k,W):i.vertexAttribPointer(M,L,U,N,k,W)}function v(M,L,U,N){x();let k=N.attributes,W=U.getAttributes(),H=L.defaultAttributeValues;for(let nt in W){let q=W[nt];if(q.location>=0){let rt=k[nt];if(rt===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){let dt=rt.normalized,bt=rt.itemSize,Ft=t.get(rt);if(Ft===void 0)continue;let Rt=Ft.buffer,$=Ft.type,et=Ft.bytesPerElement,mt=$===i.INT||$===i.UNSIGNED_INT||rt.gpuType===vh;if(rt.isInterleavedBufferAttribute){let ot=rt.data,Ct=ot.stride,Gt=rt.offset;if(ot.isInstancedInterleavedBuffer){for(let Bt=0;Bt<q.locationSize;Bt++)p(q.location+Bt,ot.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Bt=0;Bt<q.locationSize;Bt++)m(q.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let Bt=0;Bt<q.locationSize;Bt++)y(q.location+Bt,bt/q.locationSize,$,dt,Ct*et,(Gt+bt/q.locationSize*Bt)*et,mt)}else{if(rt.isInstancedBufferAttribute){for(let ot=0;ot<q.locationSize;ot++)p(q.location+ot,rt.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let ot=0;ot<q.locationSize;ot++)m(q.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let ot=0;ot<q.locationSize;ot++)y(q.location+ot,bt/q.locationSize,$,dt,bt*et,bt/q.locationSize*ot*et,mt)}}else if(H!==void 0){let dt=H[nt];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(q.location,dt);break;case 3:i.vertexAttrib3fv(q.location,dt);break;case 4:i.vertexAttrib4fv(q.location,dt);break;default:i.vertexAttrib1fv(q.location,dt)}}}}b()}function T(){C();for(let M in n){let L=n[M];for(let U in L){let N=L[U];for(let k in N)h(N[k].object),delete N[k];delete L[U]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let L=n[M.id];for(let U in L){let N=L[U];for(let k in N)h(N[k].object),delete N[k];delete L[U]}delete n[M.id]}function R(M){for(let L in n){let U=n[L];if(U[M.id]===void 0)continue;let N=U[M.id];for(let k in N)h(N[k].object),delete N[k];delete U[M.id]}}function C(){w(),a=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function Bx(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Hx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Un&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let C=R===Yr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Mi&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Yn&&!C)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:T,maxSamples:E}}function Vx(i){let t=this,e=null,n=0,s=!1,r=!1,a=new yi,o=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:n,y=b*4,v=p.clippingState||null;l.value=v,v=h(g,d,y,f);for(let T=0;T!==y;++T)v[T]=e[T];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=f;y!==x;++y,v+=4)a.copy(u[y]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Gx(i){let t=new WeakMap;function e(a,o){return o===ec?a.mapping=Hs:o===nc&&(a.mapping=Vs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===ec||o===nc)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Ur(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var no=class extends to{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ds=4,sd=[.125,.215,.35,.446,.526,.582],is=20,Dl=new no,rd=new Ot,zl=null,Ul=0,Nl=0,Ol=!1,ts=(1+Math.sqrt(5))/2,Ps=1/ts,ad=[new D(-ts,Ps,0),new D(ts,Ps,0),new D(-Ps,0,ts),new D(Ps,0,ts),new D(0,ts,-Ps),new D(0,ts,Ps),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],io=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){zl=this._renderer.getRenderTarget(),Ul=this._renderer.getActiveCubeFace(),Nl=this._renderer.getActiveMipmapLevel(),Ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ld(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(zl,Ul,Nl),this._renderer.xr.enabled=Ol,t.scissorTest=!1,Ia(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zl=this._renderer.getRenderTarget(),Ul=this._renderer.getActiveCubeFace(),Nl=this._renderer.getActiveMipmapLevel(),Ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:Yr,format:Un,colorSpace:Qs,depthBuffer:!1},s=od(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=od(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wx(r)),this._blurMaterial=Xx(r,t,e)}return s}_compileMaterial(t){let e=new $t(this._lodPlanes[0],t);this._renderer.compile(e,Dl)}_sceneToCubeUV(t,e,n,s){let o=new tn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(rd),h.toneMapping=Oi,h.autoClear=!1;let f=new Ae({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),g=new $t(new kt,f),x=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(rd),x=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):b===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let y=this._cubeSize;Ia(s,b*y,p>2?y:0,y,y),h.setRenderTarget(s),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Hs||t.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ld());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new $t(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Ia(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Dl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ad[(s-r-1)%ad.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new $t(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*is-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):is;m>is&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${is}`);let p=[],b=0;for(let R=0;R<is;++R){let C=R/x,w=Math.exp(-C*C/2);p.push(w),R===0?b+=w:R<m&&(b+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let v=this._sizeLods[s],T=3*v*(s>y-Ds?s-y+Ds:0),E=4*(this._cubeSize-v);Ia(e,T,E,3*v,2*v),l.setRenderTarget(e),l.render(u,Dl)}};function Wx(i){let t=[],e=[],n=[],s=i,r=i-Ds+1+sd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ds?l=sd[a-i+Ds-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,b=new Float32Array(x*g*f),y=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let E=0;E<f;E++){let R=E%3*2/3-1,C=E>2?0:-1,w=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];b.set(w,x*g*E),y.set(d,m*g*E);let M=[E,E,E,E,E,E];v.set(M,p*g*E)}let T=new Ue;T.setAttribute("position",new Oe(b,x)),T.setAttribute("uv",new Oe(y,m)),T.setAttribute("faceIndex",new Oe(v,p)),t.push(T),s>Ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function od(i,t,e){let n=new bi(i,t,e);return n.texture.mapping=So,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ia(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Xx(i,t,e){let n=new Float32Array(is),s=new D(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function ld(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function cd(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Rh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qx(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===ec||l===nc,h=l===Hs||l===Vs;if(c||h){let u=t.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new io(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new io(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Yx(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&wr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function $x(i,t,e,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let b=f.array;x=f.version;for(let y=0,v=b.length;y<v;y+=3){let T=b[y+0],E=b[y+1],R=b[y+2];d.push(T,E,E,R,R,T)}}else if(g!==void 0){let b=g.array;x=g.version;for(let y=0,v=b.length/3-1;y<v;y+=3){let T=y+0,E=y+1,R=y+2;d.push(T,E,E,R,R,T)}}else return;let m=new(sf(d)?Qa:ja)(d,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Zx(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*x[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jx(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Kx(i,t,e){let n=new WeakMap,s=new pe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let w=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let v=o.attributes.position.count*y,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let E=new Float32Array(v*T*4*u),R=new Ja(E,v,T,u);R.type=Yn,R.needsUpdate=!0;let C=y*4;for(let M=0;M<u;M++){let L=m[M],U=p[M],N=b[M],k=v*T*4*M;for(let W=0;W<L.count;W++){let H=W*C;f===!0&&(s.fromBufferAttribute(L,W),E[k+H+0]=s.x,E[k+H+1]=s.y,E[k+H+2]=s.z,E[k+H+3]=0),g===!0&&(s.fromBufferAttribute(U,W),E[k+H+4]=s.x,E[k+H+5]=s.y,E[k+H+6]=s.z,E[k+H+7]=0),x===!0&&(s.fromBufferAttribute(N,W),E[k+H+8]=s.x,E[k+H+9]=s.y,E[k+H+10]=s.z,E[k+H+11]=N.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new ut(v,T)},n.set(o,d),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function jx(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var so=class extends Mn{constructor(t,e,n,s,r,a,o,l,c,h=Ns){if(h!==Ns&&h!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ns&&(n=rs),n===void 0&&h===Ws&&(n=Gs),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:An,this.minFilter=l!==void 0?l:An,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},lf=new Mn,hd=new so(1,1),cf=new Ja,hf=new Dc,uf=new eo,ud=[],dd=[],fd=new Float32Array(16),pd=new Float32Array(9),md=new Float32Array(4);function tr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=ud[s];if(r===void 0&&(r=new Float32Array(s),ud[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function $e(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ao(i,t){let e=dd[t];e===void 0&&(e=new Int32Array(t),dd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Qx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ty(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2fv(this.addr,t),$e(e,t)}}function ey(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ye(e,t))return;i.uniform3fv(this.addr,t),$e(e,t)}}function ny(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4fv(this.addr,t),$e(e,t)}}function iy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(Ye(e,n))return;md.set(n),i.uniformMatrix2fv(this.addr,!1,md),$e(e,n)}}function sy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(Ye(e,n))return;pd.set(n),i.uniformMatrix3fv(this.addr,!1,pd),$e(e,n)}}function ry(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(Ye(e,n))return;fd.set(n),i.uniformMatrix4fv(this.addr,!1,fd),$e(e,n)}}function ay(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function oy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2iv(this.addr,t),$e(e,t)}}function ly(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;i.uniform3iv(this.addr,t),$e(e,t)}}function cy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4iv(this.addr,t),$e(e,t)}}function hy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function uy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2uiv(this.addr,t),$e(e,t)}}function dy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;i.uniform3uiv(this.addr,t),$e(e,t)}}function fy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4uiv(this.addr,t),$e(e,t)}}function py(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(hd.compareFunction=nf,r=hd):r=lf,e.setTexture2D(t||r,s)}function my(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||hf,s)}function gy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||uf,s)}function xy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||cf,s)}function yy(i){switch(i){case 5126:return Qx;case 35664:return ty;case 35665:return ey;case 35666:return ny;case 35674:return iy;case 35675:return sy;case 35676:return ry;case 5124:case 35670:return ay;case 35667:case 35671:return oy;case 35668:case 35672:return ly;case 35669:case 35673:return cy;case 5125:return hy;case 36294:return uy;case 36295:return dy;case 36296:return fy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return my;case 35680:case 36300:case 36308:case 36293:return gy;case 36289:case 36303:case 36311:case 36292:return xy}}function vy(i,t){i.uniform1fv(this.addr,t)}function _y(i,t){let e=tr(t,this.size,2);i.uniform2fv(this.addr,e)}function My(i,t){let e=tr(t,this.size,3);i.uniform3fv(this.addr,e)}function by(i,t){let e=tr(t,this.size,4);i.uniform4fv(this.addr,e)}function wy(i,t){let e=tr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ey(i,t){let e=tr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Sy(i,t){let e=tr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ty(i,t){i.uniform1iv(this.addr,t)}function Ay(i,t){i.uniform2iv(this.addr,t)}function Ry(i,t){i.uniform3iv(this.addr,t)}function Cy(i,t){i.uniform4iv(this.addr,t)}function Py(i,t){i.uniform1uiv(this.addr,t)}function Iy(i,t){i.uniform2uiv(this.addr,t)}function Ly(i,t){i.uniform3uiv(this.addr,t)}function Dy(i,t){i.uniform4uiv(this.addr,t)}function zy(i,t,e){let n=this.cache,s=t.length,r=Ao(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||lf,r[a])}function Uy(i,t,e){let n=this.cache,s=t.length,r=Ao(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||hf,r[a])}function Ny(i,t,e){let n=this.cache,s=t.length,r=Ao(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||uf,r[a])}function Oy(i,t,e){let n=this.cache,s=t.length,r=Ao(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),$e(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||cf,r[a])}function ky(i){switch(i){case 5126:return vy;case 35664:return _y;case 35665:return My;case 35666:return by;case 35674:return wy;case 35675:return Ey;case 35676:return Sy;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return Ry;case 35669:case 35673:return Cy;case 5125:return Py;case 36294:return Iy;case 36295:return Ly;case 36296:return Dy;case 35678:case 36198:case 36298:case 36306:case 35682:return zy;case 35679:case 36299:case 36307:return Uy;case 35680:case 36300:case 36308:case 36293:return Ny;case 36289:case 36303:case 36311:case 36292:return Oy}}var zc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=yy(e.type)}},Uc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ky(e.type)}},Nc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},kl=/(\w+)(\])?(\[|\.)?/g;function gd(i,t){i.seq.push(t),i.map[t.id]=t}function Fy(i,t,e){let n=i.name,s=n.length;for(kl.lastIndex=0;;){let r=kl.exec(n),a=kl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){gd(e,c===void 0?new zc(o,i,t):new Uc(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Nc(o),gd(e,u)),e=u}}}var ks=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Fy(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function xd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var By=37297,Hy=0;function Vy(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var yd=new jt;function Gy(i){ce._getMatrix(yd,ce.workingColorSpace,i);let t=`mat3( ${yd.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(i)){case To:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function vd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Vy(i.getShaderSource(t),a)}else return s}function Wy(i,t){let e=Gy(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xy(i,t){let e;switch(t){case e0:e="Linear";break;case n0:e="Reinhard";break;case i0:e="Cineon";break;case yh:e="ACESFilmic";break;case r0:e="AgX";break;case a0:e="Neutral";break;case s0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var La=new D;function qy(){ce.getLuminanceCoefficients(La);let i=La.x.toFixed(4),t=La.y.toFixed(4),e=La.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function $y(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zy(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Er(i){return i!==""}function _d(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Md(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Jy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(i){return i.replace(Jy,jy)}var Ky=new Map;function jy(i,t){let e=te[t];if(e===void 0){let n=Ky.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Oc(e)}var Qy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bd(i){return i.replace(Qy,tv)}function tv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ev(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===wo?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===xh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xi&&(t="SHADOWMAP_TYPE_VSM"),t}function nv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case So:t="ENVMAP_TYPE_CUBE_UV";break}return t}function iv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function sv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Eo:t="ENVMAP_BLENDING_MULTIPLY";break;case Zn:t="ENVMAP_BLENDING_MIX";break;case t0:t="ENVMAP_BLENDING_ADD";break}return t}function rv(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function av(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ev(e),c=nv(e),h=iv(e),u=sv(e),d=rv(e),f=Yy(e),g=$y(r),x=s.createProgram(),m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Er).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(m=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?te.tonemapping_pars_fragment:"",e.toneMapping!==Oi?Xy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Wy("linearToOutputTexel",e.outputColorSpace),qy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Er).join(`
`)),a=Oc(a),a=_d(a,e),a=Md(a,e),o=Oc(o),o=_d(o,e),o=Md(o,e),a=bd(a),o=bd(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Nu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=b+m+a,v=b+p+o,T=xd(s,s.VERTEX_SHADER,y),E=xd(s,s.FRAGMENT_SHADER,v);s.attachShader(x,T),s.attachShader(x,E),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(L){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(x).trim(),N=s.getShaderInfoLog(T).trim(),k=s.getShaderInfoLog(E).trim(),W=!0,H=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,E);else{let nt=vd(s,T,"vertex"),q=vd(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+U+`
`+nt+`
`+q)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(N===""||k==="")&&(H=!1);H&&(L.diagnostics={runnable:W,programLog:U,vertexShader:{log:N,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(T),s.deleteShader(E),C=new ks(s,x),w=Zy(s,x)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,By)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hy++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=E,this}var ov=0,kc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Fc(t),e.set(t,n)),n}},Fc=class{constructor(t){this.id=ov++,this.code=t,this.usedTimes=0}};function lv(i,t,e,n,s,r,a){let o=new Ka,l=new kc,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,L,U,N){let k=U.fog,W=N.geometry,H=w.isMeshStandardMaterial?U.environment:null,nt=(w.isMeshStandardMaterial?e:t).get(w.envMap||H),q=nt&&nt.mapping===So?nt.image.height:null,rt=g[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let dt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,bt=dt!==void 0?dt.length:0,Ft=0;W.morphAttributes.position!==void 0&&(Ft=1),W.morphAttributes.normal!==void 0&&(Ft=2),W.morphAttributes.color!==void 0&&(Ft=3);let Rt,$,et,mt;if(rt){let xe=ni[rt];Rt=xe.vertexShader,$=xe.fragmentShader}else Rt=w.vertexShader,$=w.fragmentShader,l.update(w),et=l.getVertexShaderID(w),mt=l.getFragmentShaderID(w);let ot=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),Gt=N.isInstancedMesh===!0,Bt=N.isBatchedMesh===!0,oe=!!w.map,Q=!!w.matcap,lt=!!nt,z=!!w.aoMap,Pt=!!w.lightMap,st=!!w.bumpMap,St=!!w.normalMap,ft=!!w.displacementMap,Wt=!!w.emissiveMap,wt=!!w.metalnessMap,P=!!w.roughnessMap,S=w.anisotropy>0,G=w.clearcoat>0,J=w.dispersion>0,it=w.iridescence>0,K=w.sheen>0,It=w.transmission>0,gt=S&&!!w.anisotropyMap,Et=G&&!!w.clearcoatMap,re=G&&!!w.clearcoatNormalMap,at=G&&!!w.clearcoatRoughnessMap,Tt=it&&!!w.iridescenceMap,Xt=it&&!!w.iridescenceThicknessMap,qt=K&&!!w.sheenColorMap,At=K&&!!w.sheenRoughnessMap,le=!!w.specularMap,Qt=!!w.specularColorMap,Se=!!w.specularIntensityMap,O=It&&!!w.transmissionMap,xt=It&&!!w.thicknessMap,Z=!!w.gradientMap,tt=!!w.alphaMap,_t=w.alphaTest>0,yt=!!w.alphaHash,Jt=!!w.extensions,Ne=Oi;w.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Ne=i.toneMapping);let un={shaderID:rt,shaderType:w.type,shaderName:w.name,vertexShader:Rt,fragmentShader:$,defines:w.defines,customVertexShaderID:et,customFragmentShaderID:mt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&N._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&N.instanceColor!==null,instancingMorph:Gt&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Qs,alphaToCoverage:!!w.alphaToCoverage,map:oe,matcap:Q,envMap:lt,envMapMode:lt&&nt.mapping,envMapCubeUVHeight:q,aoMap:z,lightMap:Pt,bumpMap:st,normalMap:St,displacementMap:d&&ft,emissiveMap:Wt,normalMapObjectSpace:St&&w.normalMapType===u0,normalMapTangentSpace:St&&w.normalMapType===Th,metalnessMap:wt,roughnessMap:P,anisotropy:S,anisotropyMap:gt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:re,clearcoatRoughnessMap:at,dispersion:J,iridescence:it,iridescenceMap:Tt,iridescenceThicknessMap:Xt,sheen:K,sheenColorMap:qt,sheenRoughnessMap:At,specularMap:le,specularColorMap:Qt,specularIntensityMap:Se,transmission:It,transmissionMap:O,thicknessMap:xt,gradientMap:Z,opaque:w.transparent===!1&&w.blending===Us&&w.alphaToCoverage===!1,alphaMap:tt,alphaTest:_t,alphaHash:yt,combine:w.combine,mapUv:oe&&x(w.map.channel),aoMapUv:z&&x(w.aoMap.channel),lightMapUv:Pt&&x(w.lightMap.channel),bumpMapUv:st&&x(w.bumpMap.channel),normalMapUv:St&&x(w.normalMap.channel),displacementMapUv:ft&&x(w.displacementMap.channel),emissiveMapUv:Wt&&x(w.emissiveMap.channel),metalnessMapUv:wt&&x(w.metalnessMap.channel),roughnessMapUv:P&&x(w.roughnessMap.channel),anisotropyMapUv:gt&&x(w.anisotropyMap.channel),clearcoatMapUv:Et&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:re&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Xt&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:At&&x(w.sheenRoughnessMap.channel),specularMapUv:le&&x(w.specularMap.channel),specularColorMapUv:Qt&&x(w.specularColorMap.channel),specularIntensityMapUv:Se&&x(w.specularIntensityMap.channel),transmissionMapUv:O&&x(w.transmissionMap.channel),thicknessMapUv:xt&&x(w.thicknessMap.channel),alphaMapUv:tt&&x(w.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(St||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!W.attributes.uv&&(oe||tt),fog:!!k,useFog:w.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:N.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ft,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:oe&&w.map.isVideoTexture===!0&&ce.getTransfer(w.map.colorSpace)===ve,decodeVideoTextureEmissive:Wt&&w.emissiveMap.isVideoTexture===!0&&ce.getTransfer(w.emissiveMap.colorSpace)===ve,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===_n,flipSided:w.side===pn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Jt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&w.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return un.vertexUv1s=c.has(1),un.vertexUv2s=c.has(2),un.vertexUv3s=c.has(3),c.clear(),un}function p(w){let M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(let L in w.defines)M.push(L),M.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(b(M,w),y(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function b(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function y(w,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),w.push(o.mask)}function v(w){let M=g[w.type],L;if(M){let U=ni[M];L=j0.clone(U.uniforms)}else L=w.uniforms;return L}function T(w,M){let L;for(let U=0,N=h.length;U<N;U++){let k=h[U];if(k.cacheKey===M){L=k,++L.usedTimes;break}}return L===void 0&&(L=new av(i,M,w,r),h.push(L)),L}function E(w){if(--w.usedTimes===0){let M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function R(w){l.remove(w)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:E,releaseShaderCache:R,programs:h,dispose:C}}function cv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function hv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ed(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Sd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function o(u,d,f,g,x,m){let p=a(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,x,m){let p=a(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||hv),n.length>1&&n.sort(d||Ed),s.length>1&&s.sort(d||Ed)}function h(){for(let u=t,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function uv(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Sd,i.set(n,[a])):s>=r.length?(a=new Sd,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function dv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ot};break;case"SpotLight":e={position:new D,direction:new D,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function fv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var pv=0;function mv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function gv(i){let t=new dv,e=fv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new Ht,a=new Ht;function o(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,b=0,y=0,v=0,T=0,E=0,R=0;c.sort(mv);for(let w=0,M=c.length;w<M;w++){let L=c[w],U=L.color,N=L.intensity,k=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=U.r*N,u+=U.g*N,d+=U.b*N;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],N);R++}else if(L.isDirectionalLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let nt=L.shadow,q=e.get(L);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=L.shadow.matrix,b++}n.directional[f]=H,f++}else if(L.isSpotLight){let H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(U).multiplyScalar(N),H.distance=k,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[x]=H;let nt=L.shadow;if(L.map&&(n.spotLightMap[T]=L.map,T++,nt.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[x]=nt.matrix,L.castShadow){let q=e.get(L);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=W,v++}x++}else if(L.isRectAreaLight){let H=t.get(L);H.color.copy(U).multiplyScalar(N),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=H,m++}else if(L.isPointLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){let nt=L.shadow,q=e.get(L);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,q.shadowCameraNear=nt.camera.near,q.shadowCameraFar=nt.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=L.shadow.matrix,y++}n.point[g]=H,g++}else if(L.isHemisphereLight){let H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(N),H.groundColor.copy(L.groundColor).multiplyScalar(N),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==b||C.numPointShadows!==y||C.numSpotShadows!==v||C.numSpotMaps!==T||C.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,C.directionalLength=f,C.pointLength=g,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=b,C.numPointShadows=y,C.numSpotShadows=v,C.numSpotMaps=T,C.numLightProbes=R,n.version=pv++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){let y=c[p];if(y.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(y.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function Td(i){let t=new gv(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function xv(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Td(i),t.set(s,[o])):r>=a.length?(o=new Td(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Bc=class extends wi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=c0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Hc=class extends wi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},yv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _v(i,t,e){let n=new Nr,s=new ut,r=new ut,a=new pe,o=new Bc({depthPacking:h0}),l=new Hc,c={},h=e.maxTextureSize,u={[ki]:pn,[pn]:ki,[_n]:_n},d=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:yv,fragmentShader:vv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ue;g.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new $t(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wo;let p=this.type;this.render=function(E,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let w=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ni),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let N=p!==xi&&this.type===xi,k=p===xi&&this.type!==xi;for(let W=0,H=E.length;W<H;W++){let nt=E[W],q=nt.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let rt=q.getFrameExtents();if(s.multiply(rt),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,q.mapSize.y=r.y)),q.map===null||N===!0||k===!0){let bt=this.type!==xi?{minFilter:An,magFilter:An}:{};q.map!==null&&q.map.dispose(),q.map=new bi(s.x,s.y,bt),q.map.texture.name=nt.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let dt=q.getViewportCount();for(let bt=0;bt<dt;bt++){let Ft=q.getViewport(bt);a.set(r.x*Ft.x,r.y*Ft.y,r.x*Ft.z,r.y*Ft.w),U.viewport(a),q.updateMatrices(nt,bt),n=q.getFrustum(),v(R,C,q.camera,nt,this.type)}q.isPointLightShadow!==!0&&this.type===xi&&b(q,C),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,M,L)};function b(E,R){let C=t.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new bi(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,C,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,C,f,x,null)}function y(E,R,C,w){let M=null,L=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)M=L;else if(M=C.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let U=M.uuid,N=R.uuid,k=c[U];k===void 0&&(k={},c[U]=k);let W=k[N];W===void 0&&(W=M.clone(),k[N]=W,R.addEventListener("dispose",T)),M=W}if(M.visible=R.visible,M.wireframe=R.wireframe,w===xi?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=i.properties.get(M);U.light=C}return M}function v(E,R,C,w,M){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===xi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);let N=t.update(E),k=E.material;if(Array.isArray(k)){let W=N.groups;for(let H=0,nt=W.length;H<nt;H++){let q=W[H],rt=k[q.materialIndex];if(rt&&rt.visible){let dt=y(E,rt,w,M);E.onBeforeShadow(i,E,R,C,N,dt,q),i.renderBufferDirect(C,null,N,dt,E,q),E.onAfterShadow(i,E,R,C,N,dt,q)}}}else if(k.visible){let W=y(E,k,w,M);E.onBeforeShadow(i,E,R,C,N,W,null),i.renderBufferDirect(C,null,N,W,E,null),E.onAfterShadow(i,E,R,C,N,W,null)}}let U=E.children;for(let N=0,k=U.length;N<k;N++)v(U[N],R,C,w,M)}function T(E){E.target.removeEventListener("dispose",T);for(let C in c){let w=c[C],M=E.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}var Mv={[$l]:Zl,[Jl]:Ql,[Kl]:tc,[Bs]:jl,[Zl]:$l,[Ql]:Jl,[tc]:Kl,[jl]:Bs};function bv(i,t){function e(){let O=!1,xt=new pe,Z=null,tt=new pe(0,0,0,0);return{setMask:function(_t){Z!==_t&&!O&&(i.colorMask(_t,_t,_t,_t),Z=_t)},setLocked:function(_t){O=_t},setClear:function(_t,yt,Jt,Ne,un){un===!0&&(_t*=Ne,yt*=Ne,Jt*=Ne),xt.set(_t,yt,Jt,Ne),tt.equals(xt)===!1&&(i.clearColor(_t,yt,Jt,Ne),tt.copy(xt))},reset:function(){O=!1,Z=null,tt.set(-1,0,0,0)}}}function n(){let O=!1,xt=!1,Z=null,tt=null,_t=null;return{setReversed:function(yt){if(xt!==yt){let Jt=t.get("EXT_clip_control");xt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT);let Ne=_t;_t=null,this.setClear(Ne)}xt=yt},getReversed:function(){return xt},setTest:function(yt){yt?ot(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(yt){Z!==yt&&!O&&(i.depthMask(yt),Z=yt)},setFunc:function(yt){if(xt&&(yt=Mv[yt]),tt!==yt){switch(yt){case $l:i.depthFunc(i.NEVER);break;case Zl:i.depthFunc(i.ALWAYS);break;case Jl:i.depthFunc(i.LESS);break;case Bs:i.depthFunc(i.LEQUAL);break;case Kl:i.depthFunc(i.EQUAL);break;case jl:i.depthFunc(i.GEQUAL);break;case Ql:i.depthFunc(i.GREATER);break;case tc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=yt}},setLocked:function(yt){O=yt},setClear:function(yt){_t!==yt&&(xt&&(yt=1-yt),i.clearDepth(yt),_t=yt)},reset:function(){O=!1,Z=null,tt=null,_t=null,xt=!1}}}function s(){let O=!1,xt=null,Z=null,tt=null,_t=null,yt=null,Jt=null,Ne=null,un=null;return{setTest:function(xe){O||(xe?ot(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(xe){xt!==xe&&!O&&(i.stencilMask(xe),xt=xe)},setFunc:function(xe,Hn,hi){(Z!==xe||tt!==Hn||_t!==hi)&&(i.stencilFunc(xe,Hn,hi),Z=xe,tt=Hn,_t=hi)},setOp:function(xe,Hn,hi){(yt!==xe||Jt!==Hn||Ne!==hi)&&(i.stencilOp(xe,Hn,hi),yt=xe,Jt=Hn,Ne=hi)},setLocked:function(xe){O=xe},setClear:function(xe){un!==xe&&(i.clearStencil(xe),un=xe)},reset:function(){O=!1,xt=null,Z=null,tt=null,_t=null,yt=null,Jt=null,Ne=null,un=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,b=null,y=null,v=null,T=null,E=null,R=new Ot(0,0,0),C=0,w=!1,M=null,L=null,U=null,N=null,k=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,nt=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(q)[1]),H=nt>=1):q.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),H=nt>=2);let rt=null,dt={},bt=i.getParameter(i.SCISSOR_BOX),Ft=i.getParameter(i.VIEWPORT),Rt=new pe().fromArray(bt),$=new pe().fromArray(Ft);function et(O,xt,Z,tt){let _t=new Uint8Array(4),yt=i.createTexture();i.bindTexture(O,yt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Jt=0;Jt<Z;Jt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(xt+Jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return yt}let mt={};mt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),mt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),mt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(i.DEPTH_TEST),a.setFunc(Bs),st(!1),St(Au),ot(i.CULL_FACE),z(Ni);function ot(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function Ct(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Gt(O,xt){return u[O]!==xt?(i.bindFramebuffer(O,xt),u[O]=xt,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xt),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function Bt(O,xt){let Z=f,tt=!1;if(O){Z=d.get(xt),Z===void 0&&(Z=[],d.set(xt,Z));let _t=O.textures;if(Z.length!==_t.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let yt=0,Jt=_t.length;yt<Jt;yt++)Z[yt]=i.COLOR_ATTACHMENT0+yt;Z.length=_t.length,tt=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,tt=!0);tt&&i.drawBuffers(Z)}function oe(O){return g!==O?(i.useProgram(O),g=O,!0):!1}let Q={[es]:i.FUNC_ADD,[Op]:i.FUNC_SUBTRACT,[kp]:i.FUNC_REVERSE_SUBTRACT};Q[Fp]=i.MIN,Q[Bp]=i.MAX;let lt={[Hp]:i.ZERO,[Vp]:i.ONE,[Gp]:i.SRC_COLOR,[ql]:i.SRC_ALPHA,[Zp]:i.SRC_ALPHA_SATURATE,[Yp]:i.DST_COLOR,[Xp]:i.DST_ALPHA,[Wp]:i.ONE_MINUS_SRC_COLOR,[Yl]:i.ONE_MINUS_SRC_ALPHA,[$p]:i.ONE_MINUS_DST_COLOR,[qp]:i.ONE_MINUS_DST_ALPHA,[Jp]:i.CONSTANT_COLOR,[Kp]:i.ONE_MINUS_CONSTANT_COLOR,[jp]:i.CONSTANT_ALPHA,[Qp]:i.ONE_MINUS_CONSTANT_ALPHA};function z(O,xt,Z,tt,_t,yt,Jt,Ne,un,xe){if(O===Ni){x===!0&&(Ct(i.BLEND),x=!1);return}if(x===!1&&(ot(i.BLEND),x=!0),O!==Np){if(O!==m||xe!==w){if((p!==es||v!==es)&&(i.blendEquation(i.FUNC_ADD),p=es,v=es),xe)switch(O){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fs:i.blendFunc(i.ONE,i.ONE);break;case Ru:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fs:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ru:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}b=null,y=null,T=null,E=null,R.set(0,0,0),C=0,m=O,w=xe}return}_t=_t||xt,yt=yt||Z,Jt=Jt||tt,(xt!==p||_t!==v)&&(i.blendEquationSeparate(Q[xt],Q[_t]),p=xt,v=_t),(Z!==b||tt!==y||yt!==T||Jt!==E)&&(i.blendFuncSeparate(lt[Z],lt[tt],lt[yt],lt[Jt]),b=Z,y=tt,T=yt,E=Jt),(Ne.equals(R)===!1||un!==C)&&(i.blendColor(Ne.r,Ne.g,Ne.b,un),R.copy(Ne),C=un),m=O,w=!1}function Pt(O,xt){O.side===_n?Ct(i.CULL_FACE):ot(i.CULL_FACE);let Z=O.side===pn;xt&&(Z=!Z),st(Z),O.blending===Us&&O.transparent===!1?z(Ni):z(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let tt=O.stencilWrite;o.setTest(tt),tt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Wt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(O){M!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),M=O)}function St(O){O!==zp?(ot(i.CULL_FACE),O!==L&&(O===Au?i.cullFace(i.BACK):O===Up?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),L=O}function ft(O){O!==U&&(H&&i.lineWidth(O),U=O)}function Wt(O,xt,Z){O?(ot(i.POLYGON_OFFSET_FILL),(N!==xt||k!==Z)&&(i.polygonOffset(xt,Z),N=xt,k=Z)):Ct(i.POLYGON_OFFSET_FILL)}function wt(O){O?ot(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function P(O){O===void 0&&(O=i.TEXTURE0+W-1),rt!==O&&(i.activeTexture(O),rt=O)}function S(O,xt,Z){Z===void 0&&(rt===null?Z=i.TEXTURE0+W-1:Z=rt);let tt=dt[Z];tt===void 0&&(tt={type:void 0,texture:void 0},dt[Z]=tt),(tt.type!==O||tt.texture!==xt)&&(rt!==Z&&(i.activeTexture(Z),rt=Z),i.bindTexture(O,xt||mt[O]),tt.type=O,tt.texture=xt)}function G(){let O=dt[rt];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function J(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function It(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function gt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Et(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function re(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xt(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function qt(O){Rt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Rt.copy(O))}function At(O){$.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),$.copy(O))}function le(O,xt){let Z=c.get(xt);Z===void 0&&(Z=new WeakMap,c.set(xt,Z));let tt=Z.get(O);tt===void 0&&(tt=i.getUniformBlockIndex(xt,O.name),Z.set(O,tt))}function Qt(O,xt){let tt=c.get(xt).get(O);l.get(xt)!==tt&&(i.uniformBlockBinding(xt,tt,O.__bindingPointIndex),l.set(xt,tt))}function Se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},rt=null,dt={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,b=null,y=null,v=null,T=null,E=null,R=new Ot(0,0,0),C=0,w=!1,M=null,L=null,U=null,N=null,k=null,Rt.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Ct,bindFramebuffer:Gt,drawBuffers:Bt,useProgram:oe,setBlending:z,setMaterial:Pt,setFlipSided:st,setCullFace:St,setLineWidth:ft,setPolygonOffset:Wt,setScissorTest:wt,activeTexture:P,bindTexture:S,unbindTexture:G,compressedTexImage2D:J,compressedTexImage3D:it,texImage2D:Tt,texImage3D:Xt,updateUBOMapping:le,uniformBlockBinding:Qt,texStorage2D:re,texStorage3D:at,texSubImage2D:K,texSubImage3D:It,compressedTexSubImage2D:gt,compressedTexSubImage3D:Et,scissor:qt,viewport:At,reset:Se}}function Ad(i,t,e,n){let s=wv(n);switch(e){case Jd:return i*t;case jd:return i*t;case Qd:return i*t*2;case bh:return i*t/s.components*s.byteLength;case wh:return i*t/s.components*s.byteLength;case tf:return i*t*2/s.components*s.byteLength;case Eh:return i*t*2/s.components*s.byteLength;case Kd:return i*t*3/s.components*s.byteLength;case Un:return i*t*4/s.components*s.byteLength;case Sh:return i*t*4/s.components*s.byteLength;case Ha:case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ga:case Wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rc:case oc:return Math.max(i,16)*Math.max(t,8)/4;case sc:case ac:return Math.max(i,8)*Math.max(t,8)/2;case lc:case cc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case hc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case fc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case mc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case xc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case vc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case bc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case wc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ec:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xa:case Sc:case Tc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ef:case Ac:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Rc:case Cc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wv(i){switch(i){case Mi:case Yd:return{byteLength:1,components:1};case Lr:case $d:case Yr:return{byteLength:2,components:1};case _h:case Mh:return{byteLength:2,components:4};case rs:case vh:case Yn:return{byteLength:4,components:1};case Zd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Ev(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return f?new OffscreenCanvas(P,S):$a("canvas")}function x(P,S,G){let J=1,it=wt(P);if((it.width>G||it.height>G)&&(J=G/Math.max(it.width,it.height)),J<1)if(typeof HTMLImageElement!="undefined"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&P instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&P instanceof ImageBitmap||typeof VideoFrame!="undefined"&&P instanceof VideoFrame){let K=Math.floor(J*it.width),It=Math.floor(J*it.height);u===void 0&&(u=g(K,It));let gt=S?g(K,It):u;return gt.width=K,gt.height=It,gt.getContext("2d").drawImage(P,0,0,K,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+K+"x"+It+")."),gt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){i.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(P,S,G,J,it=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=S;if(S===i.RED&&(G===i.FLOAT&&(K=i.R32F),G===i.HALF_FLOAT&&(K=i.R16F),G===i.UNSIGNED_BYTE&&(K=i.R8)),S===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.R8UI),G===i.UNSIGNED_SHORT&&(K=i.R16UI),G===i.UNSIGNED_INT&&(K=i.R32UI),G===i.BYTE&&(K=i.R8I),G===i.SHORT&&(K=i.R16I),G===i.INT&&(K=i.R32I)),S===i.RG&&(G===i.FLOAT&&(K=i.RG32F),G===i.HALF_FLOAT&&(K=i.RG16F),G===i.UNSIGNED_BYTE&&(K=i.RG8)),S===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RG8UI),G===i.UNSIGNED_SHORT&&(K=i.RG16UI),G===i.UNSIGNED_INT&&(K=i.RG32UI),G===i.BYTE&&(K=i.RG8I),G===i.SHORT&&(K=i.RG16I),G===i.INT&&(K=i.RG32I)),S===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGB8UI),G===i.UNSIGNED_SHORT&&(K=i.RGB16UI),G===i.UNSIGNED_INT&&(K=i.RGB32UI),G===i.BYTE&&(K=i.RGB8I),G===i.SHORT&&(K=i.RGB16I),G===i.INT&&(K=i.RGB32I)),S===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),G===i.UNSIGNED_INT&&(K=i.RGBA32UI),G===i.BYTE&&(K=i.RGBA8I),G===i.SHORT&&(K=i.RGBA16I),G===i.INT&&(K=i.RGBA32I)),S===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),S===i.RGBA){let It=it?To:ce.getTransfer(J);G===i.FLOAT&&(K=i.RGBA32F),G===i.HALF_FLOAT&&(K=i.RGBA16F),G===i.UNSIGNED_BYTE&&(K=It===ve?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(P,S){let G;return P?S===null||S===rs||S===Gs?G=i.DEPTH24_STENCIL8:S===Yn?G=i.DEPTH32F_STENCIL8:S===Lr&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===rs||S===Gs?G=i.DEPTH_COMPONENT24:S===Yn?G=i.DEPTH_COMPONENT32F:S===Lr&&(G=i.DEPTH_COMPONENT16),G}function T(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==An&&P.minFilter!==ii?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function E(P){let S=P.target;S.removeEventListener("dispose",E),C(S),S.isVideoTexture&&h.delete(S)}function R(P){let S=P.target;S.removeEventListener("dispose",R),M(S)}function C(P){let S=n.get(P);if(S.__webglInit===void 0)return;let G=P.source,J=d.get(G);if(J){let it=J[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&w(P),Object.keys(J).length===0&&d.delete(G)}n.remove(P)}function w(P){let S=n.get(P);i.deleteTexture(S.__webglTexture);let G=P.source,J=d.get(G);delete J[S.__cacheKey],a.memory.textures--}function M(P){let S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(S.__webglFramebuffer[J]))for(let it=0;it<S.__webglFramebuffer[J].length;it++)i.deleteFramebuffer(S.__webglFramebuffer[J][it]);else i.deleteFramebuffer(S.__webglFramebuffer[J]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[J])}else{if(Array.isArray(S.__webglFramebuffer))for(let J=0;J<S.__webglFramebuffer.length;J++)i.deleteFramebuffer(S.__webglFramebuffer[J]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let J=0;J<S.__webglColorRenderbuffer.length;J++)S.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[J]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let G=P.textures;for(let J=0,it=G.length;J<it;J++){let K=n.get(G[J]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(G[J])}n.remove(P)}let L=0;function U(){L=0}function N(){let P=L;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),L+=1,P}function k(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function W(P,S){let G=n.get(P);if(P.isVideoTexture&&ft(P),P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){let J=P.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(G,P,S);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+S)}function H(P,S){let G=n.get(P);if(P.version>0&&G.__version!==P.version){$(G,P,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+S)}function nt(P,S){let G=n.get(P);if(P.version>0&&G.__version!==P.version){$(G,P,S);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+S)}function q(P,S){let G=n.get(P);if(P.version>0&&G.__version!==P.version){et(G,P,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+S)}let rt={[Ir]:i.REPEAT,[ss]:i.CLAMP_TO_EDGE,[ic]:i.MIRRORED_REPEAT},dt={[An]:i.NEAREST,[l0]:i.NEAREST_MIPMAP_NEAREST,[da]:i.NEAREST_MIPMAP_LINEAR,[ii]:i.LINEAR,[ul]:i.LINEAR_MIPMAP_NEAREST,[qn]:i.LINEAR_MIPMAP_LINEAR},bt={[d0]:i.NEVER,[y0]:i.ALWAYS,[f0]:i.LESS,[nf]:i.LEQUAL,[p0]:i.EQUAL,[x0]:i.GEQUAL,[m0]:i.GREATER,[g0]:i.NOTEQUAL};function Ft(P,S){if(S.type===Yn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ii||S.magFilter===ul||S.magFilter===da||S.magFilter===qn||S.minFilter===ii||S.minFilter===ul||S.minFilter===da||S.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,rt[S.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,rt[S.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,rt[S.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,dt[S.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,dt[S.minFilter]),S.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,bt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===An||S.minFilter!==da&&S.minFilter!==qn||S.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Rt(P,S){let G=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",E));let J=S.source,it=d.get(J);it===void 0&&(it={},d.set(J,it));let K=k(S);if(K!==P.__cacheKey){it[K]===void 0&&(it[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),it[K].usedTimes++;let It=it[P.__cacheKey];It!==void 0&&(it[P.__cacheKey].usedTimes--,It.usedTimes===0&&w(S)),P.__cacheKey=K,P.__webglTexture=it[K].texture}return G}function $(P,S,G){let J=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(J=i.TEXTURE_3D);let it=Rt(P,S),K=S.source;e.bindTexture(J,P.__webglTexture,i.TEXTURE0+G);let It=n.get(K);if(K.version!==It.__version||it===!0){e.activeTexture(i.TEXTURE0+G);let gt=ce.getPrimaries(ce.workingColorSpace),Et=S.colorSpace===Ui?null:ce.getPrimaries(S.colorSpace),re=S.colorSpace===Ui||gt===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let at=x(S.image,!1,s.maxTextureSize);at=Wt(S,at);let Tt=r.convert(S.format,S.colorSpace),Xt=r.convert(S.type),qt=y(S.internalFormat,Tt,Xt,S.colorSpace,S.isVideoTexture);Ft(J,S);let At,le=S.mipmaps,Qt=S.isVideoTexture!==!0,Se=It.__version===void 0||it===!0,O=K.dataReady,xt=T(S,at);if(S.isDepthTexture)qt=v(S.format===Ws,S.type),Se&&(Qt?e.texStorage2D(i.TEXTURE_2D,1,qt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,qt,at.width,at.height,0,Tt,Xt,null));else if(S.isDataTexture)if(le.length>0){Qt&&Se&&e.texStorage2D(i.TEXTURE_2D,xt,qt,le[0].width,le[0].height);for(let Z=0,tt=le.length;Z<tt;Z++)At=le[Z],Qt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,At.width,At.height,Tt,Xt,At.data):e.texImage2D(i.TEXTURE_2D,Z,qt,At.width,At.height,0,Tt,Xt,At.data);S.generateMipmaps=!1}else Qt?(Se&&e.texStorage2D(i.TEXTURE_2D,xt,qt,at.width,at.height),O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at.width,at.height,Tt,Xt,at.data)):e.texImage2D(i.TEXTURE_2D,0,qt,at.width,at.height,0,Tt,Xt,at.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Qt&&Se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,qt,le[0].width,le[0].height,at.depth);for(let Z=0,tt=le.length;Z<tt;Z++)if(At=le[Z],S.format!==Un)if(Tt!==null)if(Qt){if(O)if(S.layerUpdates.size>0){let _t=Ad(At.width,At.height,S.format,S.type);for(let yt of S.layerUpdates){let Jt=At.data.subarray(yt*_t/At.data.BYTES_PER_ELEMENT,(yt+1)*_t/At.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,yt,At.width,At.height,1,Tt,Jt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,At.width,At.height,at.depth,Tt,At.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,qt,At.width,At.height,at.depth,0,At.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,At.width,At.height,at.depth,Tt,Xt,At.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,qt,At.width,At.height,at.depth,0,Tt,Xt,At.data)}else{Qt&&Se&&e.texStorage2D(i.TEXTURE_2D,xt,qt,le[0].width,le[0].height);for(let Z=0,tt=le.length;Z<tt;Z++)At=le[Z],S.format!==Un?Tt!==null?Qt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,At.width,At.height,Tt,At.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,qt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,At.width,At.height,Tt,Xt,At.data):e.texImage2D(i.TEXTURE_2D,Z,qt,At.width,At.height,0,Tt,Xt,At.data)}else if(S.isDataArrayTexture)if(Qt){if(Se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,qt,at.width,at.height,at.depth),O)if(S.layerUpdates.size>0){let Z=Ad(at.width,at.height,S.format,S.type);for(let tt of S.layerUpdates){let _t=at.data.subarray(tt*Z/at.data.BYTES_PER_ELEMENT,(tt+1)*Z/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,at.width,at.height,1,Tt,Xt,_t)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,Tt,Xt,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,qt,at.width,at.height,at.depth,0,Tt,Xt,at.data);else if(S.isData3DTexture)Qt?(Se&&e.texStorage3D(i.TEXTURE_3D,xt,qt,at.width,at.height,at.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,Tt,Xt,at.data)):e.texImage3D(i.TEXTURE_3D,0,qt,at.width,at.height,at.depth,0,Tt,Xt,at.data);else if(S.isFramebufferTexture){if(Se)if(Qt)e.texStorage2D(i.TEXTURE_2D,xt,qt,at.width,at.height);else{let Z=at.width,tt=at.height;for(let _t=0;_t<xt;_t++)e.texImage2D(i.TEXTURE_2D,_t,qt,Z,tt,0,Tt,Xt,null),Z>>=1,tt>>=1}}else if(le.length>0){if(Qt&&Se){let Z=wt(le[0]);e.texStorage2D(i.TEXTURE_2D,xt,qt,Z.width,Z.height)}for(let Z=0,tt=le.length;Z<tt;Z++)At=le[Z],Qt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Tt,Xt,At):e.texImage2D(i.TEXTURE_2D,Z,qt,Tt,Xt,At);S.generateMipmaps=!1}else if(Qt){if(Se){let Z=wt(at);e.texStorage2D(i.TEXTURE_2D,xt,qt,Z.width,Z.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Tt,Xt,at)}else e.texImage2D(i.TEXTURE_2D,0,qt,Tt,Xt,at);m(S)&&p(J),It.__version=K.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function et(P,S,G){if(S.image.length!==6)return;let J=Rt(P,S),it=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+G);let K=n.get(it);if(it.version!==K.__version||J===!0){e.activeTexture(i.TEXTURE0+G);let It=ce.getPrimaries(ce.workingColorSpace),gt=S.colorSpace===Ui?null:ce.getPrimaries(S.colorSpace),Et=S.colorSpace===Ui||It===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let re=S.isCompressedTexture||S.image[0].isCompressedTexture,at=S.image[0]&&S.image[0].isDataTexture,Tt=[];for(let tt=0;tt<6;tt++)!re&&!at?Tt[tt]=x(S.image[tt],!0,s.maxCubemapSize):Tt[tt]=at?S.image[tt].image:S.image[tt],Tt[tt]=Wt(S,Tt[tt]);let Xt=Tt[0],qt=r.convert(S.format,S.colorSpace),At=r.convert(S.type),le=y(S.internalFormat,qt,At,S.colorSpace),Qt=S.isVideoTexture!==!0,Se=K.__version===void 0||J===!0,O=it.dataReady,xt=T(S,Xt);Ft(i.TEXTURE_CUBE_MAP,S);let Z;if(re){Qt&&Se&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,le,Xt.width,Xt.height);for(let tt=0;tt<6;tt++){Z=Tt[tt].mipmaps;for(let _t=0;_t<Z.length;_t++){let yt=Z[_t];S.format!==Un?qt!==null?Qt?O&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,0,0,yt.width,yt.height,qt,yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,le,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,0,0,yt.width,yt.height,qt,At,yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,le,yt.width,yt.height,0,qt,At,yt.data)}}}else{if(Z=S.mipmaps,Qt&&Se){Z.length>0&&xt++;let tt=wt(Tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,le,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(at){Qt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Tt[tt].width,Tt[tt].height,qt,At,Tt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,le,Tt[tt].width,Tt[tt].height,0,qt,At,Tt[tt].data);for(let _t=0;_t<Z.length;_t++){let Jt=Z[_t].image[tt].image;Qt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,0,0,Jt.width,Jt.height,qt,At,Jt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,le,Jt.width,Jt.height,0,qt,At,Jt.data)}}else{Qt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,qt,At,Tt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,le,qt,At,Tt[tt]);for(let _t=0;_t<Z.length;_t++){let yt=Z[_t];Qt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,0,0,qt,At,yt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,le,qt,At,yt.image[tt])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),K.__version=it.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function mt(P,S,G,J,it,K){let It=r.convert(G.format,G.colorSpace),gt=r.convert(G.type),Et=y(G.internalFormat,It,gt,G.colorSpace),re=n.get(S),at=n.get(G);if(at.__renderTarget=S,!re.__hasExternalTextures){let Tt=Math.max(1,S.width>>K),Xt=Math.max(1,S.height>>K);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,K,Et,Tt,Xt,S.depth,0,It,gt,null):e.texImage2D(it,K,Et,Tt,Xt,0,It,gt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),St(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,it,at.__webglTexture,0,st(S)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,it,at.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(P,S,G){if(i.bindRenderbuffer(i.RENDERBUFFER,P),S.depthBuffer){let J=S.depthTexture,it=J&&J.isDepthTexture?J.type:null,K=v(S.stencilBuffer,it),It=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=st(S);St(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt,K,S.width,S.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,K,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,K,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,It,i.RENDERBUFFER,P)}else{let J=S.textures;for(let it=0;it<J.length;it++){let K=J[it],It=r.convert(K.format,K.colorSpace),gt=r.convert(K.type),Et=y(K.internalFormat,It,gt,K.colorSpace),re=st(S);G&&St(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,Et,S.width,S.height):St(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,Et,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Et,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=n.get(S.depthTexture);J.__renderTarget=S,(!J.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W(S.depthTexture,0);let it=J.__webglTexture,K=st(S);if(S.depthTexture.format===Ns)St(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(S.depthTexture.format===Ws)St(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Gt(P){let S=n.get(P),G=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let J=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),J){let it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,J.removeEventListener("dispose",it)};J.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=J}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ct(S.__webglFramebuffer,P)}else if(G){S.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[J]),S.__webglDepthbuffer[J]===void 0)S.__webglDepthbuffer[J]=i.createRenderbuffer(),ot(S.__webglDepthbuffer[J],P,!1);else{let it=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ot(S.__webglDepthbuffer,P,!1);else{let J=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,it)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(P,S,G){let J=n.get(P);S!==void 0&&mt(J.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Gt(P)}function oe(P){let S=P.texture,G=n.get(P),J=n.get(S);P.addEventListener("dispose",R);let it=P.textures,K=P.isWebGLCubeRenderTarget===!0,It=it.length>1;if(It||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=S.version,a.memory.textures++),K){G.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[gt]=[];for(let Et=0;Et<S.mipmaps.length;Et++)G.__webglFramebuffer[gt][Et]=i.createFramebuffer()}else G.__webglFramebuffer[gt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let gt=0;gt<S.mipmaps.length;gt++)G.__webglFramebuffer[gt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(It)for(let gt=0,Et=it.length;gt<Et;gt++){let re=n.get(it[gt]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&St(P)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let gt=0;gt<it.length;gt++){let Et=it[gt];G.__webglColorRenderbuffer[gt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[gt]);let re=r.convert(Et.format,Et.colorSpace),at=r.convert(Et.type),Tt=y(Et.internalFormat,re,at,Et.colorSpace,P.isXRRenderTarget===!0),Xt=st(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,Tt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,G.__webglColorRenderbuffer[gt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(G.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Ft(i.TEXTURE_CUBE_MAP,S);for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)mt(G.__webglFramebuffer[gt][Et],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Et);else mt(G.__webglFramebuffer[gt],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let gt=0,Et=it.length;gt<Et;gt++){let re=it[gt],at=n.get(re);e.bindTexture(i.TEXTURE_2D,at.__webglTexture),Ft(i.TEXTURE_2D,re),mt(G.__webglFramebuffer,P,re,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,0),m(re)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let gt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(gt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,J.__webglTexture),Ft(gt,S),S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)mt(G.__webglFramebuffer[Et],P,S,i.COLOR_ATTACHMENT0,gt,Et);else mt(G.__webglFramebuffer,P,S,i.COLOR_ATTACHMENT0,gt,0);m(S)&&p(gt),e.unbindTexture()}P.depthBuffer&&Gt(P)}function Q(P){let S=P.textures;for(let G=0,J=S.length;G<J;G++){let it=S[G];if(m(it)){let K=b(P),It=n.get(it).__webglTexture;e.bindTexture(K,It),p(K),e.unbindTexture()}}}let lt=[],z=[];function Pt(P){if(P.samples>0){if(St(P)===!1){let S=P.textures,G=P.width,J=P.height,it=i.COLOR_BUFFER_BIT,K=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,It=n.get(P),gt=S.length>1;if(gt)for(let Et=0;Et<S.length;Et++)e.bindFramebuffer(i.FRAMEBUFFER,It.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,It.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let Et=0;Et<S.length;Et++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),gt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,It.__webglColorRenderbuffer[Et]);let re=n.get(S[Et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,G,J,0,0,G,J,it,i.NEAREST),l===!0&&(lt.length=0,z.length=0,lt.push(i.COLOR_ATTACHMENT0+Et),P.depthBuffer&&P.resolveDepthBuffer===!1&&(lt.push(K),z.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,z)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),gt)for(let Et=0;Et<S.length;Et++){e.bindFramebuffer(i.FRAMEBUFFER,It.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,It.__webglColorRenderbuffer[Et]);let re=n.get(S[Et]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,It.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,re,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){let S=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function st(P){return Math.min(s.maxSamples,P.samples)}function St(P){let S=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ft(P){let S=a.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function Wt(P,S){let G=P.colorSpace,J=P.format,it=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||G!==Qs&&G!==Ui&&(ce.getTransfer(G)===ve?(J!==Un||it!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function wt(P){return typeof HTMLImageElement!="undefined"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame!="undefined"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=H,this.setTexture3D=nt,this.setTextureCube=q,this.rebindTextures=Bt,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=St}function Sv(i,t){function e(n,s=Ui){let r,a=ce.getTransfer(s);if(n===Mi)return i.UNSIGNED_BYTE;if(n===_h)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Mh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yd)return i.BYTE;if(n===$d)return i.SHORT;if(n===Lr)return i.UNSIGNED_SHORT;if(n===vh)return i.INT;if(n===rs)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===Yr)return i.HALF_FLOAT;if(n===Jd)return i.ALPHA;if(n===Kd)return i.RGB;if(n===Un)return i.RGBA;if(n===jd)return i.LUMINANCE;if(n===Qd)return i.LUMINANCE_ALPHA;if(n===Ns)return i.DEPTH_COMPONENT;if(n===Ws)return i.DEPTH_STENCIL;if(n===bh)return i.RED;if(n===wh)return i.RED_INTEGER;if(n===tf)return i.RG;if(n===Eh)return i.RG_INTEGER;if(n===Sh)return i.RGBA_INTEGER;if(n===Ha||n===Va||n===Ga||n===Wa)if(a===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sc||n===rc||n===ac||n===oc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lc||n===cc||n===hc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lc||n===cc)return a===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc||n===yc||n===vc||n===_c||n===Mc||n===bc||n===wc||n===Ec)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wc)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ec)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xa||n===Sc||n===Tc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xa)return a===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ef||n===Ac||n===Rc||n===Cc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ac)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Rc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Vc=class extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ze=class extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Tv={type:"move"},Ar=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Av=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Gc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Mn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Nn({vertexShader:Av,fragmentShader:Rv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new mn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wc=class extends Fi{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=new Gc,m=e.getContextAttributes(),p=null,b=null,y=[],v=[],T=new ut,E=null,R=new tn;R.viewport=new pe;let C=new tn;C.viewport=new pe;let w=[R,C],M=new Vc,L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=y[$];return et===void 0&&(et=new Ar,y[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=y[$];return et===void 0&&(et=new Ar,y[$]=et),et.getGripSpace()},this.getHand=function($){let et=y[$];return et===void 0&&(et=new Ar,y[$]=et),et.getHandSpace()};function N($){let et=v.indexOf($.inputSource);if(et===-1)return;let mt=y[et];mt!==void 0&&(mt.update($.inputSource,$.frame,c||a),mt.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",W);for(let $=0;$<y.length;$++){let et=v[$];et!==null&&(v[$]=null,y[$].disconnect(et))}L=null,U=null,x.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,b=null,Rt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",k),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){let et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new bi(f.framebufferWidth,f.framebufferHeight,{format:Un,type:Mi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,mt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?Ws:Ns,mt=m.stencil?Gs:rs);let Ct={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Ct),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new bi(d.textureWidth,d.textureHeight,{format:Un,type:Mi,depthTexture:new so(d.textureWidth,d.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Rt.setContext(s),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function W($){for(let et=0;et<$.removed.length;et++){let mt=$.removed[et],ot=v.indexOf(mt);ot>=0&&(v[ot]=null,y[ot].disconnect(mt))}for(let et=0;et<$.added.length;et++){let mt=$.added[et],ot=v.indexOf(mt);if(ot===-1){for(let Gt=0;Gt<y.length;Gt++)if(Gt>=v.length){v.push(mt),ot=Gt;break}else if(v[Gt]===null){v[Gt]=mt,ot=Gt;break}if(ot===-1)break}let Ct=y[ot];Ct&&Ct.connect(mt)}}let H=new D,nt=new D;function q($,et,mt){H.setFromMatrixPosition(et.matrixWorld),nt.setFromMatrixPosition(mt.matrixWorld);let ot=H.distanceTo(nt),Ct=et.projectionMatrix.elements,Gt=mt.projectionMatrix.elements,Bt=Ct[14]/(Ct[10]-1),oe=Ct[14]/(Ct[10]+1),Q=(Ct[9]+1)/Ct[5],lt=(Ct[9]-1)/Ct[5],z=(Ct[8]-1)/Ct[0],Pt=(Gt[8]+1)/Gt[0],st=Bt*z,St=Bt*Pt,ft=ot/(-z+Pt),Wt=ft*-z;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Wt),$.translateZ(ft),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ct[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let wt=Bt+ft,P=oe+ft,S=st-Wt,G=St+(ot-Wt),J=Q*oe/P*wt,it=lt*oe/P*wt;$.projectionMatrix.makePerspective(S,G,J,it,wt,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function rt($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let et=$.near,mt=$.far;x.texture!==null&&(x.depthNear>0&&(et=x.depthNear),x.depthFar>0&&(mt=x.depthFar)),M.near=C.near=R.near=et,M.far=C.far=R.far=mt,(L!==M.near||U!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,U=M.far),R.layers.mask=$.layers.mask|2,C.layers.mask=$.layers.mask|4,M.layers.mask=R.layers.mask|C.layers.mask;let ot=$.parent,Ct=M.cameras;rt(M,ot);for(let Gt=0;Gt<Ct.length;Gt++)rt(Ct[Gt],ot);Ct.length===2?q(M,R,C):M.projectionMatrix.copy(R.projectionMatrix),dt($,M,ot)};function dt($,et,mt){mt===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(mt.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Xs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let bt=null;function Ft($,et){if(h=et.getViewerPose(c||a),g=et,h!==null){let mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let ot=!1;mt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Gt=0;Gt<mt.length;Gt++){let Bt=mt[Gt],oe=null;if(f!==null)oe=f.getViewport(Bt);else{let lt=u.getViewSubImage(d,Bt);oe=lt.viewport,Gt===0&&(t.setRenderTargetTextures(b,lt.colorTexture,d.ignoreDepthValues?void 0:lt.depthStencilTexture),t.setRenderTarget(b))}let Q=w[Gt];Q===void 0&&(Q=new tn,Q.layers.enable(Gt),Q.viewport=new pe,w[Gt]=Q),Q.matrix.fromArray(Bt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Bt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(oe.x,oe.y,oe.width,oe.height),Gt===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(Q)}let Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){let Gt=u.getDepthInformation(mt[0]);Gt&&Gt.isValid&&Gt.texture&&x.init(t,Gt,s.renderState)}}for(let mt=0;mt<y.length;mt++){let ot=v[mt],Ct=y[mt];ot!==null&&Ct!==void 0&&Ct.update(ot,et,c||a)}bt&&bt($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}let Rt=new of;Rt.setAnimationLoop(Ft),this.setAnimationLoop=function($){bt=$},this.dispose=function(){}}},Qi=new Xe,Cv=new Ht;function Pv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,af(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===pn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===pn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=t.get(p),y=b.envMap,v=b.envMapRotation;y&&(m.envMap.value=y,Qi.copy(v),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),m.envMapRotation.value.setFromMatrix4(Cv.makeRotationFromEuler(Qi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Iv(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,y){let v=y.program;n.uniformBlockBinding(b,v)}function c(b,y){let v=s[b.id];v===void 0&&(g(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",m));let T=y.program;n.updateUBOMapping(b,T);let E=t.render.frame;r[b.id]!==E&&(d(b),r[b.id]=E)}function h(b){let y=u();b.__bindingPointIndex=y;let v=i.createBuffer(),T=b.__size,E=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let y=s[b.id],v=b.uniforms,T=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,R=v.length;E<R;E++){let C=Array.isArray(v[E])?v[E]:[v[E]];for(let w=0,M=C.length;w<M;w++){let L=C[w];if(f(L,E,w,T)===!0){let U=L.__offset,N=Array.isArray(L.value)?L.value:[L.value],k=0;for(let W=0;W<N.length;W++){let H=N[W],nt=x(H);typeof H=="number"||typeof H=="boolean"?(L.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,U+k,L.__data)):H.isMatrix3?(L.__data[0]=H.elements[0],L.__data[1]=H.elements[1],L.__data[2]=H.elements[2],L.__data[3]=0,L.__data[4]=H.elements[3],L.__data[5]=H.elements[4],L.__data[6]=H.elements[5],L.__data[7]=0,L.__data[8]=H.elements[6],L.__data[9]=H.elements[7],L.__data[10]=H.elements[8],L.__data[11]=0):(H.toArray(L.__data,k),k+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,y,v,T){let E=b.value,R=y+"_"+v;if(T[R]===void 0)return typeof E=="number"||typeof E=="boolean"?T[R]=E:T[R]=E.clone(),!0;{let C=T[R];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return T[R]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function g(b){let y=b.uniforms,v=0,T=16;for(let R=0,C=y.length;R<C;R++){let w=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,L=w.length;M<L;M++){let U=w[M],N=Array.isArray(U.value)?U.value:[U.value];for(let k=0,W=N.length;k<W;k++){let H=N[k],nt=x(H),q=v%T,rt=q%nt.boundary,dt=q+rt;v+=rt,dt!==0&&T-dt<nt.storage&&(v+=T-dt),U.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=nt.storage}}}let E=v%T;return E>0&&(v+=T-E),b.__size=v,b.__cache={},this}function x(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){let y=b.target;y.removeEventListener("dispose",m);let v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var ro=class{constructor(t={}){let{canvas:e=U0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,b=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this.toneMapping=Oi,this.toneMappingExposure=1;let v=this,T=!1,E=0,R=0,C=null,w=-1,M=null,L=new pe,U=new pe,N=null,k=new Ot(0),W=0,H=e.width,nt=e.height,q=1,rt=null,dt=null,bt=new pe(0,0,H,nt),Ft=new pe(0,0,H,nt),Rt=!1,$=new Nr,et=!1,mt=!1,ot=new Ht,Ct=new Ht,Gt=new D,Bt=new pe,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Q=!1;function lt(){return C===null?q:1}let z=n;function Pt(A,F){return e.getContext(A,F)}try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${gh}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",yt,!1),z===null){let F="webgl2";if(z=Pt(F,A),z===null)throw Pt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let st,St,ft,Wt,wt,P,S,G,J,it,K,It,gt,Et,re,at,Tt,Xt,qt,At,le,Qt,Se,O;function xt(){st=new Yx(z),st.init(),Qt=new Sv(z,st),St=new Hx(z,st,t,Qt),ft=new bv(z,st),St.reverseDepthBuffer&&d&&ft.buffers.depth.setReversed(!0),Wt=new Jx(z),wt=new cv,P=new Ev(z,st,ft,wt,St,Qt,Wt),S=new Gx(v),G=new qx(v),J=new im(z),Se=new Fx(z,J),it=new $x(z,J,Wt,Se),K=new jx(z,it,J,Wt),qt=new Kx(z,St,P),at=new Vx(wt),It=new lv(v,S,G,st,St,Se,at),gt=new Pv(v,wt),Et=new uv,re=new xv(st),Xt=new kx(v,S,G,ft,K,f,l),Tt=new _v(v,K,St),O=new Iv(z,Wt,St,ft),At=new Bx(z,st,Wt),le=new Zx(z,st,Wt),Wt.programs=It.programs,v.capabilities=St,v.extensions=st,v.properties=wt,v.renderLists=Et,v.shadowMap=Tt,v.state=ft,v.info=Wt}xt();let Z=new Wc(v,z);this.xr=Z,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let A=st.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=st.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(A){A!==void 0&&(q=A,this.setSize(H,nt,!1))},this.getSize=function(A){return A.set(H,nt)},this.setSize=function(A,F,X=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=A,nt=F,e.width=Math.floor(A*q),e.height=Math.floor(F*q),X===!0&&(e.style.width=A+"px",e.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(H*q,nt*q).floor()},this.setDrawingBufferSize=function(A,F,X){H=A,nt=F,q=X,e.width=Math.floor(A*X),e.height=Math.floor(F*X),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(bt)},this.setViewport=function(A,F,X,Y){A.isVector4?bt.set(A.x,A.y,A.z,A.w):bt.set(A,F,X,Y),ft.viewport(L.copy(bt).multiplyScalar(q).round())},this.getScissor=function(A){return A.copy(Ft)},this.setScissor=function(A,F,X,Y){A.isVector4?Ft.set(A.x,A.y,A.z,A.w):Ft.set(A,F,X,Y),ft.scissor(U.copy(Ft).multiplyScalar(q).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(A){ft.setScissorTest(Rt=A)},this.setOpaqueSort=function(A){rt=A},this.setTransparentSort=function(A){dt=A},this.getClearColor=function(A){return A.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor.apply(Xt,arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha.apply(Xt,arguments)},this.clear=function(A=!0,F=!0,X=!0){let Y=0;if(A){let B=!1;if(C!==null){let ht=C.texture.format;B=ht===Sh||ht===Eh||ht===wh}if(B){let ht=C.texture.type,vt=ht===Mi||ht===rs||ht===Lr||ht===Gs||ht===_h||ht===Mh,Lt=Xt.getClearColor(),Dt=Xt.getClearAlpha(),Yt=Lt.r,Kt=Lt.g,zt=Lt.b;vt?(g[0]=Yt,g[1]=Kt,g[2]=zt,g[3]=Dt,z.clearBufferuiv(z.COLOR,0,g)):(x[0]=Yt,x[1]=Kt,x[2]=zt,x[3]=Dt,z.clearBufferiv(z.COLOR,0,x))}else Y|=z.COLOR_BUFFER_BIT}F&&(Y|=z.DEPTH_BUFFER_BIT),X&&(Y|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),Et.dispose(),re.dispose(),wt.dispose(),S.dispose(),G.dispose(),K.dispose(),Se.dispose(),O.dispose(),It.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",vu),Z.removeEventListener("sessionend",_u),Yi.stop()};function tt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let A=Wt.autoReset,F=Tt.enabled,X=Tt.autoUpdate,Y=Tt.needsUpdate,B=Tt.type;xt(),Wt.autoReset=A,Tt.enabled=F,Tt.autoUpdate=X,Tt.needsUpdate=Y,Tt.type=B}function yt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Jt(A){let F=A.target;F.removeEventListener("dispose",Jt),Ne(F)}function Ne(A){un(A),wt.remove(A)}function un(A){let F=wt.get(A).programs;F!==void 0&&(F.forEach(function(X){It.releaseProgram(X)}),A.isShaderMaterial&&It.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,X,Y,B,ht){F===null&&(F=oe);let vt=B.isMesh&&B.matrixWorld.determinant()<0,Lt=Cp(A,F,X,Y,B);ft.setMaterial(Y,vt);let Dt=X.index,Yt=1;if(Y.wireframe===!0){if(Dt=it.getWireframeAttribute(X),Dt===void 0)return;Yt=2}let Kt=X.drawRange,zt=X.attributes.position,de=Kt.start*Yt,Te=(Kt.start+Kt.count)*Yt;ht!==null&&(de=Math.max(de,ht.start*Yt),Te=Math.min(Te,(ht.start+ht.count)*Yt)),Dt!==null?(de=Math.max(de,0),Te=Math.min(Te,Dt.count)):zt!=null&&(de=Math.max(de,0),Te=Math.min(Te,zt.count));let Re=Te-de;if(Re<0||Re===1/0)return;Se.setup(B,Y,Lt,X,Dt);let vn,me=At;if(Dt!==null&&(vn=J.get(Dt),me=le,me.setIndex(vn)),B.isMesh)Y.wireframe===!0?(ft.setLineWidth(Y.wireframeLinewidth*lt()),me.setMode(z.LINES)):me.setMode(z.TRIANGLES);else if(B.isLine){let Ut=Y.linewidth;Ut===void 0&&(Ut=1),ft.setLineWidth(Ut*lt()),B.isLineSegments?me.setMode(z.LINES):B.isLineLoop?me.setMode(z.LINE_LOOP):me.setMode(z.LINE_STRIP)}else B.isPoints?me.setMode(z.POINTS):B.isSprite&&me.setMode(z.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)me.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))me.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ut=B._multiDrawStarts,ui=B._multiDrawCounts,ge=B._multiDrawCount,Vn=Dt?J.get(Dt).bytesPerElement:1,gs=wt.get(Y).currentProgram.getUniforms();for(let En=0;En<ge;En++)gs.setValue(z,"_gl_DrawID",En),me.render(Ut[En]/Vn,ui[En])}else if(B.isInstancedMesh)me.renderInstances(de,Re,B.count);else if(X.isInstancedBufferGeometry){let Ut=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ui=Math.min(X.instanceCount,Ut);me.renderInstances(de,Re,ui)}else me.render(de,Re)};function xe(A,F,X){A.transparent===!0&&A.side===_n&&A.forceSinglePass===!1?(A.side=pn,A.needsUpdate=!0,ua(A,F,X),A.side=ki,A.needsUpdate=!0,ua(A,F,X),A.side=_n):ua(A,F,X)}this.compile=function(A,F,X=null){X===null&&(X=A),p=re.get(X),p.init(F),y.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),A!==X&&A.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let Y=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ht=B.material;if(ht)if(Array.isArray(ht))for(let vt=0;vt<ht.length;vt++){let Lt=ht[vt];xe(Lt,X,B),Y.add(Lt)}else xe(ht,X,B),Y.add(ht)}),y.pop(),p=null,Y},this.compileAsync=function(A,F,X=null){let Y=this.compile(A,F,X);return new Promise(B=>{function ht(){if(Y.forEach(function(vt){wt.get(vt).currentProgram.isReady()&&Y.delete(vt)}),Y.size===0){B(A);return}setTimeout(ht,10)}st.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Hn=null;function hi(A){Hn&&Hn(A)}function vu(){Yi.stop()}function _u(){Yi.start()}let Yi=new of;Yi.setAnimationLoop(hi),typeof self!="undefined"&&Yi.setContext(self),this.setAnimationLoop=function(A){Hn=A,Z.setAnimationLoop(A),A===null?Yi.stop():Yi.start()},Z.addEventListener("sessionstart",vu),Z.addEventListener("sessionend",_u),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(F),F=Z.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,F,C),p=re.get(A,y.length),p.init(F),y.push(p),Ct.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),$.setFromProjectionMatrix(Ct),mt=this.localClippingEnabled,et=at.init(this.clippingPlanes,mt),m=Et.get(A,b.length),m.init(),b.push(m),Z.enabled===!0&&Z.isPresenting===!0){let ht=v.xr.getDepthSensingMesh();ht!==null&&hl(ht,F,-1/0,v.sortObjects)}hl(A,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(rt,dt),Q=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Q&&Xt.addToRenderList(m,A),this.info.render.frame++,et===!0&&at.beginShadows();let X=p.state.shadowsArray;Tt.render(X,A,F),et===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();let Y=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){let ht=F.cameras;if(B.length>0)for(let vt=0,Lt=ht.length;vt<Lt;vt++){let Dt=ht[vt];bu(Y,B,A,Dt)}Q&&Xt.render(A);for(let vt=0,Lt=ht.length;vt<Lt;vt++){let Dt=ht[vt];Mu(m,A,Dt,Dt.viewport)}}else B.length>0&&bu(Y,B,A,F),Q&&Xt.render(A),Mu(m,A,F);C!==null&&(P.updateMultisampleRenderTarget(C),P.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(v,A,F),Se.resetDefaultState(),w=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],et===!0&&at.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function hl(A,F,X,Y){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||$.intersectsSprite(A)){Y&&Bt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ct);let vt=K.update(A),Lt=A.material;Lt.visible&&m.push(A,vt,Lt,X,Bt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||$.intersectsObject(A))){let vt=K.update(A),Lt=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Bt.copy(A.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Bt.copy(vt.boundingSphere.center)),Bt.applyMatrix4(A.matrixWorld).applyMatrix4(Ct)),Array.isArray(Lt)){let Dt=vt.groups;for(let Yt=0,Kt=Dt.length;Yt<Kt;Yt++){let zt=Dt[Yt],de=Lt[zt.materialIndex];de&&de.visible&&m.push(A,vt,de,X,Bt.z,zt)}}else Lt.visible&&m.push(A,vt,Lt,X,Bt.z,null)}}let ht=A.children;for(let vt=0,Lt=ht.length;vt<Lt;vt++)hl(ht[vt],F,X,Y)}function Mu(A,F,X,Y){let B=A.opaque,ht=A.transmissive,vt=A.transparent;p.setupLightsView(X),et===!0&&at.setGlobalState(v.clippingPlanes,X),Y&&ft.viewport(L.copy(Y)),B.length>0&&ha(B,F,X),ht.length>0&&ha(ht,F,X),vt.length>0&&ha(vt,F,X),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function bu(A,F,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new bi(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?Yr:Mi,minFilter:qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ce.workingColorSpace}));let ht=p.state.transmissionRenderTarget[Y.id],vt=Y.viewport||L;ht.setSize(vt.z,vt.w);let Lt=v.getRenderTarget();v.setRenderTarget(ht),v.getClearColor(k),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),Q&&Xt.render(X);let Dt=v.toneMapping;v.toneMapping=Oi;let Yt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),et===!0&&at.setGlobalState(v.clippingPlanes,Y),ha(A,X,Y),P.updateMultisampleRenderTarget(ht),P.updateRenderTargetMipmap(ht),st.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let zt=0,de=F.length;zt<de;zt++){let Te=F[zt],Re=Te.object,vn=Te.geometry,me=Te.material,Ut=Te.group;if(me.side===_n&&Re.layers.test(Y.layers)){let ui=me.side;me.side=pn,me.needsUpdate=!0,wu(Re,X,Y,vn,me,Ut),me.side=ui,me.needsUpdate=!0,Kt=!0}}Kt===!0&&(P.updateMultisampleRenderTarget(ht),P.updateRenderTargetMipmap(ht))}v.setRenderTarget(Lt),v.setClearColor(k,W),Yt!==void 0&&(Y.viewport=Yt),v.toneMapping=Dt}function ha(A,F,X){let Y=F.isScene===!0?F.overrideMaterial:null;for(let B=0,ht=A.length;B<ht;B++){let vt=A[B],Lt=vt.object,Dt=vt.geometry,Yt=Y===null?vt.material:Y,Kt=vt.group;Lt.layers.test(X.layers)&&wu(Lt,F,X,Dt,Yt,Kt)}}function wu(A,F,X,Y,B,ht){A.onBeforeRender(v,F,X,Y,B,ht),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(v,F,X,Y,A,ht),B.transparent===!0&&B.side===_n&&B.forceSinglePass===!1?(B.side=pn,B.needsUpdate=!0,v.renderBufferDirect(X,F,Y,B,A,ht),B.side=ki,B.needsUpdate=!0,v.renderBufferDirect(X,F,Y,B,A,ht),B.side=_n):v.renderBufferDirect(X,F,Y,B,A,ht),A.onAfterRender(v,F,X,Y,B,ht)}function ua(A,F,X){F.isScene!==!0&&(F=oe);let Y=wt.get(A),B=p.state.lights,ht=p.state.shadowsArray,vt=B.state.version,Lt=It.getParameters(A,B.state,ht,F,X),Dt=It.getProgramCacheKey(Lt),Yt=Y.programs;Y.environment=A.isMeshStandardMaterial?F.environment:null,Y.fog=F.fog,Y.envMap=(A.isMeshStandardMaterial?G:S).get(A.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Yt===void 0&&(A.addEventListener("dispose",Jt),Yt=new Map,Y.programs=Yt);let Kt=Yt.get(Dt);if(Kt!==void 0){if(Y.currentProgram===Kt&&Y.lightsStateVersion===vt)return Su(A,Lt),Kt}else Lt.uniforms=It.getUniforms(A),A.onBeforeCompile(Lt,v),Kt=It.acquireProgram(Lt,Dt),Yt.set(Dt,Kt),Y.uniforms=Lt.uniforms;let zt=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(zt.clippingPlanes=at.uniform),Su(A,Lt),Y.needsLights=Ip(A),Y.lightsStateVersion=vt,Y.needsLights&&(zt.ambientLightColor.value=B.state.ambient,zt.lightProbe.value=B.state.probe,zt.directionalLights.value=B.state.directional,zt.directionalLightShadows.value=B.state.directionalShadow,zt.spotLights.value=B.state.spot,zt.spotLightShadows.value=B.state.spotShadow,zt.rectAreaLights.value=B.state.rectArea,zt.ltc_1.value=B.state.rectAreaLTC1,zt.ltc_2.value=B.state.rectAreaLTC2,zt.pointLights.value=B.state.point,zt.pointLightShadows.value=B.state.pointShadow,zt.hemisphereLights.value=B.state.hemi,zt.directionalShadowMap.value=B.state.directionalShadowMap,zt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,zt.spotShadowMap.value=B.state.spotShadowMap,zt.spotLightMatrix.value=B.state.spotLightMatrix,zt.spotLightMap.value=B.state.spotLightMap,zt.pointShadowMap.value=B.state.pointShadowMap,zt.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=Kt,Y.uniformsList=null,Kt}function Eu(A){if(A.uniformsList===null){let F=A.currentProgram.getUniforms();A.uniformsList=ks.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function Su(A,F){let X=wt.get(A);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function Cp(A,F,X,Y,B){F.isScene!==!0&&(F=oe),P.resetTextureUnits();let ht=F.fog,vt=Y.isMeshStandardMaterial?F.environment:null,Lt=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Qs,Dt=(Y.isMeshStandardMaterial?G:S).get(Y.envMap||vt),Yt=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Kt=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),zt=!!X.morphAttributes.position,de=!!X.morphAttributes.normal,Te=!!X.morphAttributes.color,Re=Oi;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Re=v.toneMapping);let vn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,me=vn!==void 0?vn.length:0,Ut=wt.get(Y),ui=p.state.lights;if(et===!0&&(mt===!0||A!==M)){let Dn=A===M&&Y.id===w;at.setState(Y,A,Dn)}let ge=!1;Y.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==ui.state.version||Ut.outputColorSpace!==Lt||B.isBatchedMesh&&Ut.batching===!1||!B.isBatchedMesh&&Ut.batching===!0||B.isBatchedMesh&&Ut.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ut.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ut.instancing===!1||!B.isInstancedMesh&&Ut.instancing===!0||B.isSkinnedMesh&&Ut.skinning===!1||!B.isSkinnedMesh&&Ut.skinning===!0||B.isInstancedMesh&&Ut.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ut.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ut.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ut.instancingMorph===!1&&B.morphTexture!==null||Ut.envMap!==Dt||Y.fog===!0&&Ut.fog!==ht||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==at.numPlanes||Ut.numIntersection!==at.numIntersection)||Ut.vertexAlphas!==Yt||Ut.vertexTangents!==Kt||Ut.morphTargets!==zt||Ut.morphNormals!==de||Ut.morphColors!==Te||Ut.toneMapping!==Re||Ut.morphTargetsCount!==me)&&(ge=!0):(ge=!0,Ut.__version=Y.version);let Vn=Ut.currentProgram;ge===!0&&(Vn=ua(Y,F,B));let gs=!1,En=!1,pr=!1,Ce=Vn.getUniforms(),ei=Ut.uniforms;if(ft.useProgram(Vn.program)&&(gs=!0,En=!0,pr=!0),Y.id!==w&&(w=Y.id,En=!0),gs||M!==A){ft.buffers.depth.getReversed()?(ot.copy(A.projectionMatrix),O0(ot),k0(ot),Ce.setValue(z,"projectionMatrix",ot)):Ce.setValue(z,"projectionMatrix",A.projectionMatrix),Ce.setValue(z,"viewMatrix",A.matrixWorldInverse);let Ai=Ce.map.cameraPosition;Ai!==void 0&&Ai.setValue(z,Gt.setFromMatrixPosition(A.matrixWorld)),St.logarithmicDepthBuffer&&Ce.setValue(z,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ce.setValue(z,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,En=!0,pr=!0)}if(B.isSkinnedMesh){Ce.setOptional(z,B,"bindMatrix"),Ce.setOptional(z,B,"bindMatrixInverse");let Dn=B.skeleton;Dn&&(Dn.boneTexture===null&&Dn.computeBoneTexture(),Ce.setValue(z,"boneTexture",Dn.boneTexture,P))}B.isBatchedMesh&&(Ce.setOptional(z,B,"batchingTexture"),Ce.setValue(z,"batchingTexture",B._matricesTexture,P),Ce.setOptional(z,B,"batchingIdTexture"),Ce.setValue(z,"batchingIdTexture",B._indirectTexture,P),Ce.setOptional(z,B,"batchingColorTexture"),B._colorsTexture!==null&&Ce.setValue(z,"batchingColorTexture",B._colorsTexture,P));let mr=X.morphAttributes;if((mr.position!==void 0||mr.normal!==void 0||mr.color!==void 0)&&qt.update(B,X,Vn),(En||Ut.receiveShadow!==B.receiveShadow)&&(Ut.receiveShadow=B.receiveShadow,Ce.setValue(z,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(ei.envMap.value=Dt,ei.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&F.environment!==null&&(ei.envMapIntensity.value=F.environmentIntensity),En&&(Ce.setValue(z,"toneMappingExposure",v.toneMappingExposure),Ut.needsLights&&Pp(ei,pr),ht&&Y.fog===!0&&gt.refreshFogUniforms(ei,ht),gt.refreshMaterialUniforms(ei,Y,q,nt,p.state.transmissionRenderTarget[A.id]),ks.upload(z,Eu(Ut),ei,P)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ks.upload(z,Eu(Ut),ei,P),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ce.setValue(z,"center",B.center),Ce.setValue(z,"modelViewMatrix",B.modelViewMatrix),Ce.setValue(z,"normalMatrix",B.normalMatrix),Ce.setValue(z,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let Dn=Y.uniformsGroups;for(let Ai=0,Ri=Dn.length;Ai<Ri;Ai++){let Tu=Dn[Ai];O.update(Tu,Vn),O.bind(Tu,Vn)}}return Vn}function Pp(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function Ip(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,F,X){wt.get(A.texture).__webglTexture=F,wt.get(A.depthTexture).__webglTexture=X;let Y=wt.get(A);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,F){let X=wt.get(A);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,X=0){C=A,E=F,R=X;let Y=!0,B=null,ht=!1,vt=!1;if(A){let Dt=wt.get(A);if(Dt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(z.FRAMEBUFFER,null),Y=!1;else if(Dt.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(Dt.__hasExternalTextures)P.rebindTextures(A,wt.get(A.texture).__webglTexture,wt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let zt=A.depthTexture;if(Dt.__boundDepthTexture!==zt){if(zt!==null&&wt.has(zt)&&(A.width!==zt.image.width||A.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}let Yt=A.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(vt=!0);let Kt=wt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Kt[F])?B=Kt[F][X]:B=Kt[F],ht=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?B=wt.get(A).__webglMultisampledFramebuffer:Array.isArray(Kt)?B=Kt[X]:B=Kt,L.copy(A.viewport),U.copy(A.scissor),N=A.scissorTest}else L.copy(bt).multiplyScalar(q).floor(),U.copy(Ft).multiplyScalar(q).floor(),N=Rt;if(ft.bindFramebuffer(z.FRAMEBUFFER,B)&&Y&&ft.drawBuffers(A,B),ft.viewport(L),ft.scissor(U),ft.setScissorTest(N),ht){let Dt=wt.get(A.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+F,Dt.__webglTexture,X)}else if(vt){let Dt=wt.get(A.texture),Yt=F||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Dt.__webglTexture,X||0,Yt)}w=-1},this.readRenderTargetPixels=function(A,F,X,Y,B,ht,vt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&vt!==void 0&&(Lt=Lt[vt]),Lt){ft.bindFramebuffer(z.FRAMEBUFFER,Lt);try{let Dt=A.texture,Yt=Dt.format,Kt=Dt.type;if(!St.textureFormatReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-Y&&X>=0&&X<=A.height-B&&z.readPixels(F,X,Y,B,Qt.convert(Yt),Qt.convert(Kt),ht)}finally{let Dt=C!==null?wt.get(C).__webglFramebuffer:null;ft.bindFramebuffer(z.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(A,F,X,Y,B,ht,vt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&vt!==void 0&&(Lt=Lt[vt]),Lt){let Dt=A.texture,Yt=Dt.format,Kt=Dt.type;if(!St.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=A.width-Y&&X>=0&&X<=A.height-B){ft.bindFramebuffer(z.FRAMEBUFFER,Lt);let zt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,zt),z.bufferData(z.PIXEL_PACK_BUFFER,ht.byteLength,z.STREAM_READ),z.readPixels(F,X,Y,B,Qt.convert(Yt),Qt.convert(Kt),0);let de=C!==null?wt.get(C).__webglFramebuffer:null;ft.bindFramebuffer(z.FRAMEBUFFER,de);let Te=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await N0(z,Te,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,zt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ht),z.deleteBuffer(zt),z.deleteSync(Te),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,F=null,X=0){A.isTexture!==!0&&(wr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,A=arguments[1]);let Y=Math.pow(2,-X),B=Math.floor(A.image.width*Y),ht=Math.floor(A.image.height*Y),vt=F!==null?F.x:0,Lt=F!==null?F.y:0;P.setTexture2D(A,0),z.copyTexSubImage2D(z.TEXTURE_2D,X,0,0,vt,Lt,B,ht),ft.unbindTexture()},this.copyTextureToTexture=function(A,F,X=null,Y=null,B=0){A.isTexture!==!0&&(wr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,A=arguments[1],F=arguments[2],B=arguments[3]||0,X=null);let ht,vt,Lt,Dt,Yt,Kt,zt,de,Te,Re=A.isCompressedTexture?A.mipmaps[B]:A.image;X!==null?(ht=X.max.x-X.min.x,vt=X.max.y-X.min.y,Lt=X.isBox3?X.max.z-X.min.z:1,Dt=X.min.x,Yt=X.min.y,Kt=X.isBox3?X.min.z:0):(ht=Re.width,vt=Re.height,Lt=Re.depth||1,Dt=0,Yt=0,Kt=0),Y!==null?(zt=Y.x,de=Y.y,Te=Y.z):(zt=0,de=0,Te=0);let vn=Qt.convert(F.format),me=Qt.convert(F.type),Ut;F.isData3DTexture?(P.setTexture3D(F,0),Ut=z.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(P.setTexture2DArray(F,0),Ut=z.TEXTURE_2D_ARRAY):(P.setTexture2D(F,0),Ut=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,F.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,F.unpackAlignment);let ui=z.getParameter(z.UNPACK_ROW_LENGTH),ge=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Vn=z.getParameter(z.UNPACK_SKIP_PIXELS),gs=z.getParameter(z.UNPACK_SKIP_ROWS),En=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Re.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Re.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Dt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Yt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Kt);let pr=A.isDataArrayTexture||A.isData3DTexture,Ce=F.isDataArrayTexture||F.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let ei=wt.get(A),mr=wt.get(F),Dn=wt.get(ei.__renderTarget),Ai=wt.get(mr.__renderTarget);ft.bindFramebuffer(z.READ_FRAMEBUFFER,Dn.__webglFramebuffer),ft.bindFramebuffer(z.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let Ri=0;Ri<Lt;Ri++)pr&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wt.get(A).__webglTexture,B,Kt+Ri),A.isDepthTexture?(Ce&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wt.get(F).__webglTexture,B,Te+Ri),z.blitFramebuffer(Dt,Yt,ht,vt,zt,de,ht,vt,z.DEPTH_BUFFER_BIT,z.NEAREST)):Ce?z.copyTexSubImage3D(Ut,B,zt,de,Te+Ri,Dt,Yt,ht,vt):z.copyTexSubImage2D(Ut,B,zt,de,Te+Ri,Dt,Yt,ht,vt);ft.bindFramebuffer(z.READ_FRAMEBUFFER,null),ft.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Ce?A.isDataTexture||A.isData3DTexture?z.texSubImage3D(Ut,B,zt,de,Te,ht,vt,Lt,vn,me,Re.data):F.isCompressedArrayTexture?z.compressedTexSubImage3D(Ut,B,zt,de,Te,ht,vt,Lt,vn,Re.data):z.texSubImage3D(Ut,B,zt,de,Te,ht,vt,Lt,vn,me,Re):A.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,B,zt,de,ht,vt,vn,me,Re.data):A.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,B,zt,de,Re.width,Re.height,vn,Re.data):z.texSubImage2D(z.TEXTURE_2D,B,zt,de,ht,vt,vn,me,Re);z.pixelStorei(z.UNPACK_ROW_LENGTH,ui),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ge),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Vn),z.pixelStorei(z.UNPACK_SKIP_ROWS,gs),z.pixelStorei(z.UNPACK_SKIP_IMAGES,En),B===0&&F.generateMipmaps&&z.generateMipmap(Ut),ft.unbindTexture()},this.copyTextureToTexture3D=function(A,F,X=null,Y=null,B=0){return A.isTexture!==!0&&(wr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,A=arguments[2],F=arguments[3],B=arguments[4]||0),wr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,F,X,Y,B)},this.initRenderTarget=function(A){wt.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),ft.unbindTexture()},this.resetState=function(){E=0,R=0,C=null,ft.reset(),Se.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}},ao=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ys=class extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xe,this.environmentIntensity=1,this.environmentRotation=new Xe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Rd=new D,Cd=new pe,Pd=new pe,Lv=new D,Id=new Ht,Da=new D,Fl=new ri,Ld=new Ht,Bl=new Dr,oo=class extends $t{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Pu,this.bindMatrix=new Ht,this.bindMatrixInverse=new Ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new si),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Da),this.boundingBox.expandByPoint(Da)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ri),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Da),this.boundingSphere.expandByPoint(Da)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fl.copy(this.boundingSphere),Fl.applyMatrix4(s),t.ray.intersectsSphere(Fl)!==!1&&(Ld.copy(s).invert(),Bl.copy(t.ray).applyMatrix4(Ld),!(this.boundingBox!==null&&Bl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Bl)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new pe,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Pu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===o0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;Cd.fromBufferAttribute(s.attributes.skinIndex,t),Pd.fromBufferAttribute(s.attributes.skinWeight,t),Rd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let a=Pd.getComponent(r);if(a!==0){let o=Cd.getComponent(r);Id.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Lv.copy(Rd).applyMatrix4(Id),a)}}return e.applyMatrix4(this.bindMatrixInverse)}},Or=class extends qe{constructor(){super(),this.isBone=!0,this.type="Bone"}},lo=class extends Mn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=An,h=An,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Dd=new Ht,Dv=new Ht,co=class i{constructor(t=[],e=[]){this.uuid=Hi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ht)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Ht;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=t.length;r<a;r++){let o=t[r]?t[r].matrixWorld:Dv;Dd.multiplyMatrices(o,e[r]),Dd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new lo(e,t,t,Un,Yn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Or),this.bones.push(a),this.boneInverses.push(new Ht().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let a=e[s];t.bones.push(a.uuid);let o=n[s];t.boneInverses.push(o.toArray())}return t}},kr=class extends Oe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Is=new Ht,zd=new Ht,za=[],Ud=new si,zv=new Ht,_r=new $t,Mr=new ri,Bi=class extends $t{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new kr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zv)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Is),Ud.copy(t.boundingBox).applyMatrix4(Is),this.boundingBox.union(Ud)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Is),Mr.copy(t.boundingSphere).applyMatrix4(Is),this.boundingSphere.union(Mr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mr.copy(this.boundingSphere),Mr.applyMatrix4(n),t.ray.intersectsSphere(Mr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Is),zd.multiplyMatrices(n,Is),_r.matrixWorld=zd,_r.raycast(t,za);for(let a=0,o=za.length;a<o;a++){let l=za[a];l.instanceId=r,l.object=this,e.push(l)}za.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new kr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lo(new Float32Array(s*this.count),s,this.count,bh,Yn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var as=class extends wi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Nd=new Ht,Xc=new Dr,Ua=new ri,Na=new D,$s=class extends qe{constructor(t=new Ue,e=new as){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(s),Ua.radius+=r,t.ray.intersectsSphere(Ua)===!1)return;Nd.copy(s).invert(),Xc.copy(t.ray).applyMatrix4(Nd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,x=f;g<x;g++){let m=c.getX(g);Na.fromBufferAttribute(u,m),Od(Na,m,l,s,t,e,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,x=f;g<x;g++)Na.fromBufferAttribute(u,g),Od(Na,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Od(i,t,e,n,s,r,a){let o=Xc.distanceSqToPoint(i);if(o<e){let l=new D;Xc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Zs=class extends Mn{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},On=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ut:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],a=[],o=new D,l=new Ht;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Qe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Qe(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Fr=class extends On{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},qc=class extends Fr{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ch(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Oa=new D,Hl=new Ch,Vl=new Ch,Gl=new Ch,Yc=class extends On{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Oa.subVectors(s[0],s[1]).add(s[0]),c=Oa);let u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Oa.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Oa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Hl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),Vl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),Gl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Hl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Vl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Gl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Hl.calc(l),Vl.calc(l),Gl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function kd(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Uv(i,t){let e=1-i;return e*e*t}function Nv(i,t){return 2*(1-i)*i*t}function Ov(i,t){return i*i*t}function Rr(i,t,e,n){return Uv(i,t)+Nv(i,e)+Ov(i,n)}function kv(i,t){let e=1-i;return e*e*e*t}function Fv(i,t){let e=1-i;return 3*e*e*i*t}function Bv(i,t){return 3*(1-i)*i*i*t}function Hv(i,t){return i*i*i*t}function Cr(i,t,e,n,s){return kv(i,t)+Fv(i,e)+Bv(i,n)+Hv(i,s)}var ho=class extends On{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cr(t,s.x,r.x,a.x,o.x),Cr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},$c=class extends On{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cr(t,s.x,r.x,a.x,o.x),Cr(t,s.y,r.y,a.y,o.y),Cr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},uo=class extends On{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Zc=class extends On{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fo=class extends On{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Rr(t,s.x,r.x,a.x),Rr(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Jc=class extends On{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Rr(t,s.x,r.x,a.x),Rr(t,s.y,r.y,a.y),Rr(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},po=class extends On{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(kd(o,l.x,c.x,h.x,u.x),kd(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},Kc=Object.freeze({__proto__:null,ArcCurve:qc,CatmullRomCurve3:Yc,CubicBezierCurve:ho,CubicBezierCurve3:$c,EllipseCurve:Fr,LineCurve:uo,LineCurve3:Zc,QuadraticBezierCurve:fo,QuadraticBezierCurve3:Jc,SplineCurve:po}),jc=class extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Kc[s.type]().fromJSON(s))}return this}},Br=class extends jc{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new uo(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new fo(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new ho(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new po(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new Fr(t,e,n,s,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Qc=class i extends Ue{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Qe(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,u=new D,d=new ut,f=new D,g=new D,x=new D,m=0,p=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let b=0;b<=e;b++){let y=n+b*h*s,v=Math.sin(y),T=Math.cos(y);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*v,u.y=t[E].y,u.z=t[E].x*T,a.push(u.x,u.y,u.z),d.x=b/e,d.y=E/(t.length-1),o.push(d.x,d.y);let R=l[3*E+0]*v,C=l[3*E+1],w=l[3*E+0]*T;c.push(R,C,w)}}for(let b=0;b<e;b++)for(let y=0;y<t.length-1;y++){let v=y+b*t.length,T=v,E=v+t.length,R=v+t.length+1,C=v+1;r.push(T,E,C),r.push(R,C,E)}this.setIndex(r),this.setAttribute("position",new ae(a,3)),this.setAttribute("uv",new ae(o,2)),this.setAttribute("normal",new ae(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},mo=class i extends Qc{constructor(t=1,e=1,n=4,s=8){let r=new Br;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},go=class i extends Ue{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new D,h=new ut;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ae(a,3)),this.setAttribute("normal",new ae(o,3)),this.setAttribute("uv",new ae(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ke=class i extends Ue{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;b(),a===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ae(u,3)),this.setAttribute("normal",new ae(d,3)),this.setAttribute("uv",new ae(f,2));function b(){let v=new D,T=new D,E=0,R=(e-t)/n;for(let C=0;C<=r;C++){let w=[],M=C/r,L=M*(e-t)+t;for(let U=0;U<=s;U++){let N=U/s,k=N*l+o,W=Math.sin(k),H=Math.cos(k);T.x=L*W,T.y=-M*n+m,T.z=L*H,u.push(T.x,T.y,T.z),v.set(W,R,H).normalize(),d.push(v.x,v.y,v.z),f.push(N,1-M),w.push(g++)}x.push(w)}for(let C=0;C<s;C++)for(let w=0;w<r;w++){let M=x[w][C],L=x[w+1][C],U=x[w+1][C+1],N=x[w][C+1];(t>0||w!==0)&&(h.push(M,L,N),E+=3),(e>0||w!==r-1)&&(h.push(L,U,N),E+=3)}c.addGroup(p,E,0),p+=E}function y(v){let T=g,E=new ut,R=new D,C=0,w=v===!0?t:e,M=v===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;let L=g;for(let U=0;U<=s;U++){let k=U/s*l+o,W=Math.cos(k),H=Math.sin(k);R.x=w*H,R.y=m*M,R.z=w*W,u.push(R.x,R.y,R.z),d.push(0,M,0),E.x=W*.5+.5,E.y=H*.5*M+.5,f.push(E.x,E.y),g++}for(let U=0;U<s;U++){let N=T+U,k=L+U;v===!0?h.push(k,k+1,N):h.push(k+1,k,N),C+=3}c.addGroup(p,C,v===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},os=class i extends ke{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},th=class i extends Ue{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new ae(r,3)),this.setAttribute("normal",new ae(r.slice(),3)),this.setAttribute("uv",new ae(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let y=new D,v=new D,T=new D;for(let E=0;E<e.length;E+=3)f(e[E+0],y),f(e[E+1],v),f(e[E+2],T),l(y,v,T,b)}function l(b,y,v,T){let E=T+1,R=[];for(let C=0;C<=E;C++){R[C]=[];let w=b.clone().lerp(v,C/E),M=y.clone().lerp(v,C/E),L=E-C;for(let U=0;U<=L;U++)U===0&&C===E?R[C][U]=w:R[C][U]=w.clone().lerp(M,U/L)}for(let C=0;C<E;C++)for(let w=0;w<2*(E-C)-1;w++){let M=Math.floor(w/2);w%2===0?(d(R[C][M+1]),d(R[C+1][M]),d(R[C][M])):(d(R[C][M+1]),d(R[C+1][M+1]),d(R[C+1][M]))}}function c(b){let y=new D;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(b),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){let b=new D;for(let y=0;y<r.length;y+=3){b.x=r[y+0],b.y=r[y+1],b.z=r[y+2];let v=m(b)/2/Math.PI+.5,T=p(b)/Math.PI+.5;a.push(v,1-T)}g(),u()}function u(){for(let b=0;b<a.length;b+=6){let y=a[b+0],v=a[b+2],T=a[b+4],E=Math.max(y,v,T),R=Math.min(y,v,T);E>.9&&R<.1&&(y<.2&&(a[b+0]+=1),v<.2&&(a[b+2]+=1),T<.2&&(a[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function f(b,y){let v=b*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){let b=new D,y=new D,v=new D,T=new D,E=new ut,R=new ut,C=new ut;for(let w=0,M=0;w<r.length;w+=9,M+=6){b.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),v.set(r[w+6],r[w+7],r[w+8]),E.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),C.set(a[M+4],a[M+5]),T.copy(b).add(y).add(v).divideScalar(3);let L=m(T);x(E,M+0,b,L),x(R,M+2,y,L),x(C,M+4,v,L)}}function x(b,y,v,T){T<0&&b.x===1&&(a[y]=b.x-1),v.x===0&&v.z===0&&(a[y]=T/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Hr=class extends Br{constructor(t){super(t),this.uuid=Hi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Br().fromJSON(s))}return this}},Vv={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=df(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,d,f;if(n&&(r=Yv(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Vr(r,a,e,o,l,f,0),a}};function df(i,t,e,n,s){let r,a;if(s===s_(i,t,e,n)>0)for(r=t;r<e;r+=n)a=Fd(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=Fd(r,i[r],i[r+1],a);return a&&Ro(a,a.next)&&(Wr(a),a=a.next),a}function ls(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ro(e,e.next)||De(e.prev,e,e.next)===0)){if(Wr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Vr(i,t,e,n,s,r,a){if(!i)return;!a&&r&&jv(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Wv(i,n,s,r):Gv(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Wr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Xv(ls(i),t,e),Vr(i,t,e,n,s,r,2)):a===2&&qv(i,t,e,n,s,r):Vr(ls(i),t,e,n,s,r,1);break}}}function Gv(i){let t=i.prev,e=i,n=i.next;if(De(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,d=s>r?s>a?s:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&zs(s,o,r,l,a,c,g.x,g.y)&&De(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Wv(i,t,e,n){let s=i.prev,r=i,a=i.next;if(De(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,x=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=eh(f,g,t,e,n),b=eh(x,m,t,e,n),y=i.prevZ,v=i.nextZ;for(;y&&y.z>=p&&v&&v.z<=b;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&zs(o,h,l,u,c,d,y.x,y.y)&&De(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&zs(o,h,l,u,c,d,v.x,v.y)&&De(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&zs(o,h,l,u,c,d,y.x,y.y)&&De(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&zs(o,h,l,u,c,d,v.x,v.y)&&De(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Xv(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Ro(s,r)&&ff(s,n,n.next,r)&&Gr(s,r)&&Gr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Wr(n),Wr(n.next),n=i=r),n=n.next}while(n!==i);return ls(n)}function qv(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&e_(a,o)){let l=pf(a,o);a=ls(a,a.next),l=ls(l,l.next),Vr(a,t,e,n,s,r,0),Vr(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Yv(i,t,e,n){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=df(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(t_(c));for(s.sort($v),r=0;r<s.length;r++)e=Zv(s[r],e);return e}function $v(i,t){return i.x-t.x}function Zv(i,t){let e=Jv(i,t);if(!e)return t;let n=pf(e,i);return ls(n,n.next),ls(e,e.next)}function Jv(i,t){let e=t,n=-1/0,s,r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&zs(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Gr(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Kv(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function Kv(i,t){return De(i.prev,i,t.prev)<0&&De(t.next,i,i.next)<0}function jv(i,t,e,n){let s=i;do s.z===0&&(s.z=eh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Qv(s)}function Qv(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function eh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function t_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function zs(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function e_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!n_(i,t)&&(Gr(i,t)&&Gr(t,i)&&i_(i,t)&&(De(i.prev,i,t.prev)||De(i,t.prev,t))||Ro(i,t)&&De(i.prev,i,i.next)>0&&De(t.prev,t,t.next)>0)}function De(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ro(i,t){return i.x===t.x&&i.y===t.y}function ff(i,t,e,n){let s=Fa(De(i,t,e)),r=Fa(De(i,t,n)),a=Fa(De(e,n,i)),o=Fa(De(e,n,t));return!!(s!==r&&a!==o||s===0&&ka(i,e,t)||r===0&&ka(i,n,t)||a===0&&ka(e,i,n)||o===0&&ka(e,t,n))}function ka(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Fa(i){return i>0?1:i<0?-1:0}function n_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ff(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Gr(i,t){return De(i.prev,i,i.next)<0?De(i,t,i.next)>=0&&De(i,i.prev,t)>=0:De(i,t,i.prev)<0||De(i,i.next,t)<0}function i_(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function pf(i,t){let e=new nh(i.i,i.x,i.y),n=new nh(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Fd(i,t,e,n){let s=new nh(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Wr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function nh(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function s_(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Pr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Bd(t),Hd(n,t);let a=t.length;e.forEach(Bd);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Hd(n,e[l]);let o=Vv.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Bd(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Hd(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var xo=class i extends Ue{constructor(t=new Hr([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new ae(s,3)),this.setAttribute("uv",new ae(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:r_,y,v=!1,T,E,R,C;p&&(y=p.getSpacedPoints(h),v=!0,d=!1,T=p.computeFrenetFrames(h,!1),E=new D,R=new D,C=new D),d||(m=0,f=0,g=0,x=0);let w=o.extractPoints(c),M=w.shape,L=w.holes;if(!Pr.isClockWise(M)){M=M.reverse();for(let Q=0,lt=L.length;Q<lt;Q++){let z=L[Q];Pr.isClockWise(z)&&(L[Q]=z.reverse())}}let N=Pr.triangulateShape(M,L),k=M;for(let Q=0,lt=L.length;Q<lt;Q++){let z=L[Q];M=M.concat(z)}function W(Q,lt,z){return lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(lt,z)}let H=M.length,nt=N.length;function q(Q,lt,z){let Pt,st,St,ft=Q.x-lt.x,Wt=Q.y-lt.y,wt=z.x-Q.x,P=z.y-Q.y,S=ft*ft+Wt*Wt,G=ft*P-Wt*wt;if(Math.abs(G)>Number.EPSILON){let J=Math.sqrt(S),it=Math.sqrt(wt*wt+P*P),K=lt.x-Wt/J,It=lt.y+ft/J,gt=z.x-P/it,Et=z.y+wt/it,re=((gt-K)*P-(Et-It)*wt)/(ft*P-Wt*wt);Pt=K+ft*re-Q.x,st=It+Wt*re-Q.y;let at=Pt*Pt+st*st;if(at<=2)return new ut(Pt,st);St=Math.sqrt(at/2)}else{let J=!1;ft>Number.EPSILON?wt>Number.EPSILON&&(J=!0):ft<-Number.EPSILON?wt<-Number.EPSILON&&(J=!0):Math.sign(Wt)===Math.sign(P)&&(J=!0),J?(Pt=-Wt,st=ft,St=Math.sqrt(S)):(Pt=ft,st=Wt,St=Math.sqrt(S/2))}return new ut(Pt/St,st/St)}let rt=[];for(let Q=0,lt=k.length,z=lt-1,Pt=Q+1;Q<lt;Q++,z++,Pt++)z===lt&&(z=0),Pt===lt&&(Pt=0),rt[Q]=q(k[Q],k[z],k[Pt]);let dt=[],bt,Ft=rt.concat();for(let Q=0,lt=L.length;Q<lt;Q++){let z=L[Q];bt=[];for(let Pt=0,st=z.length,St=st-1,ft=Pt+1;Pt<st;Pt++,St++,ft++)St===st&&(St=0),ft===st&&(ft=0),bt[Pt]=q(z[Pt],z[St],z[ft]);dt.push(bt),Ft=Ft.concat(bt)}for(let Q=0;Q<m;Q++){let lt=Q/m,z=f*Math.cos(lt*Math.PI/2),Pt=g*Math.sin(lt*Math.PI/2)+x;for(let st=0,St=k.length;st<St;st++){let ft=W(k[st],rt[st],Pt);ot(ft.x,ft.y,-z)}for(let st=0,St=L.length;st<St;st++){let ft=L[st];bt=dt[st];for(let Wt=0,wt=ft.length;Wt<wt;Wt++){let P=W(ft[Wt],bt[Wt],Pt);ot(P.x,P.y,-z)}}}let Rt=g+x;for(let Q=0;Q<H;Q++){let lt=d?W(M[Q],Ft[Q],Rt):M[Q];v?(R.copy(T.normals[0]).multiplyScalar(lt.x),E.copy(T.binormals[0]).multiplyScalar(lt.y),C.copy(y[0]).add(R).add(E),ot(C.x,C.y,C.z)):ot(lt.x,lt.y,0)}for(let Q=1;Q<=h;Q++)for(let lt=0;lt<H;lt++){let z=d?W(M[lt],Ft[lt],Rt):M[lt];v?(R.copy(T.normals[Q]).multiplyScalar(z.x),E.copy(T.binormals[Q]).multiplyScalar(z.y),C.copy(y[Q]).add(R).add(E),ot(C.x,C.y,C.z)):ot(z.x,z.y,u/h*Q)}for(let Q=m-1;Q>=0;Q--){let lt=Q/m,z=f*Math.cos(lt*Math.PI/2),Pt=g*Math.sin(lt*Math.PI/2)+x;for(let st=0,St=k.length;st<St;st++){let ft=W(k[st],rt[st],Pt);ot(ft.x,ft.y,u+z)}for(let st=0,St=L.length;st<St;st++){let ft=L[st];bt=dt[st];for(let Wt=0,wt=ft.length;Wt<wt;Wt++){let P=W(ft[Wt],bt[Wt],Pt);v?ot(P.x,P.y+y[h-1].y,y[h-1].x+z):ot(P.x,P.y,u+z)}}}$(),et();function $(){let Q=s.length/3;if(d){let lt=0,z=H*lt;for(let Pt=0;Pt<nt;Pt++){let st=N[Pt];Ct(st[2]+z,st[1]+z,st[0]+z)}lt=h+m*2,z=H*lt;for(let Pt=0;Pt<nt;Pt++){let st=N[Pt];Ct(st[0]+z,st[1]+z,st[2]+z)}}else{for(let lt=0;lt<nt;lt++){let z=N[lt];Ct(z[2],z[1],z[0])}for(let lt=0;lt<nt;lt++){let z=N[lt];Ct(z[0]+H*h,z[1]+H*h,z[2]+H*h)}}n.addGroup(Q,s.length/3-Q,0)}function et(){let Q=s.length/3,lt=0;mt(k,lt),lt+=k.length;for(let z=0,Pt=L.length;z<Pt;z++){let st=L[z];mt(st,lt),lt+=st.length}n.addGroup(Q,s.length/3-Q,1)}function mt(Q,lt){let z=Q.length;for(;--z>=0;){let Pt=z,st=z-1;st<0&&(st=Q.length-1);for(let St=0,ft=h+m*2;St<ft;St++){let Wt=H*St,wt=H*(St+1),P=lt+Pt+Wt,S=lt+st+Wt,G=lt+st+wt,J=lt+Pt+wt;Gt(P,S,G,J)}}}function ot(Q,lt,z){l.push(Q),l.push(lt),l.push(z)}function Ct(Q,lt,z){Bt(Q),Bt(lt),Bt(z);let Pt=s.length/3,st=b.generateTopUV(n,s,Pt-3,Pt-2,Pt-1);oe(st[0]),oe(st[1]),oe(st[2])}function Gt(Q,lt,z,Pt){Bt(Q),Bt(lt),Bt(Pt),Bt(lt),Bt(z),Bt(Pt);let st=s.length/3,St=b.generateSideWallUV(n,s,st-6,st-3,st-2,st-1);oe(St[0]),oe(St[1]),oe(St[3]),oe(St[1]),oe(St[2]),oe(St[3])}function Bt(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function oe(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return a_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Kc[s.type]().fromJSON(s)),new i(n,t.options)}},r_={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ut(r,a),new ut(o,l),new ut(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ut(a,1-l),new ut(c,1-u),new ut(d,1-g),new ut(x,1-p)]:[new ut(o,1-l),new ut(h,1-u),new ut(f,1-g),new ut(m,1-p)]}};function a_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Xr=class i extends th{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Ze=class i extends Ue{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new D,d=new D,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let b=[],y=p/n,v=0;p===0&&a===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let T=0;T<=e;T++){let E=T/e;u.x=-t*Math.cos(s+E*r)*Math.sin(a+y*o),u.y=t*Math.cos(a+y*o),u.z=t*Math.sin(s+E*r)*Math.sin(a+y*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+v,1-y),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){let y=h[p][b+1],v=h[p][b],T=h[p+1][b],E=h[p+1][b+1];(p!==0||a>0)&&f.push(y,v,E),(p!==n-1||l<Math.PI)&&f.push(v,T,E)}this.setIndex(f),this.setAttribute("position",new ae(g,3)),this.setAttribute("normal",new ae(x,3)),this.setAttribute("uv",new ae(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ei=class i extends Ue{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new D,u=new D,d=new D;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,b=(s+1)*f+g;a.push(x,m,b),a.push(m,p,b)}this.setIndex(a),this.setAttribute("position",new ae(o,3)),this.setAttribute("normal",new ae(l,3)),this.setAttribute("uv",new ae(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Rn=class extends wi{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ot(16777215),this.specular=new Ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Th,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.combine=Eo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var nn=class extends wi{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Th,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.combine=Eo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Ba(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function o_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Js=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ih=class extends Js{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Iu,endingEnd:Iu}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Lu:r=t,o=2*e-n;break;case Du:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Lu:a=t,l=2*n-e;break;case Du:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,b=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let T=0;T!==o;++T)r[T]=p*a[h+T]+b*a[c+T]+y*a[l+T]+v*a[u+T];return r}},sh=class extends Js{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},rh=class extends Js{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$n=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ba(e,this.TimeBufferType),this.values=Ba(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ba(t.times,Array),values:Ba(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new rh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new sh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ih(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case qa:e=this.InterpolantFactoryMethodDiscrete;break;case Pc:e=this.InterpolantFactoryMethodLinear;break;case dl:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qa;case this.InterpolantFactoryMethodLinear:return Pc;case this.InterpolantFactoryMethodSmooth:return dl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&o_(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===dl,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=Pc;var cs=class extends $n{constructor(t,e,n){super(t,e,n)}};cs.prototype.ValueTypeName="bool";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=qa;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var ah=class extends $n{};ah.prototype.ValueTypeName="color";var oh=class extends $n{};oh.prototype.ValueTypeName="number";var lh=class extends Js{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)en.slerpFlat(r,0,a,c-o,a,c,l);return r}},yo=class extends $n{InterpolantFactoryMethodLinear(t){return new lh(this.times,this.values,this.getValueSize(),t)}};yo.prototype.ValueTypeName="quaternion";yo.prototype.InterpolantFactoryMethodSmooth=void 0;var hs=class extends $n{constructor(t,e,n){super(t,e,n)}};hs.prototype.ValueTypeName="string";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=qa;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var ch=class extends $n{};ch.prototype.ValueTypeName="vector";var hh=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},l_=new hh,uh=class{constructor(t){this.manager=t!==void 0?t:l_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};uh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ks=class extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},vo=class extends Ks{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Wl=new Ht,Vd=new D,Gd=new D,qr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nr,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Vd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vd),Gd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gd),e.updateMatrixWorld(),Wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},dh=class extends qr{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=Xs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},_o=class extends Ks{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new dh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Wd=new Ht,br=new D,Xl=new D,fh=class extends qr{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),br.setFromMatrixPosition(t.matrixWorld),n.position.copy(br),Xl.copy(n.position),Xl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Xl),n.updateMatrixWorld(),s.makeTranslation(-br.x,-br.y,-br.z),Wd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wd)}},js=class extends Ks{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new fh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},ph=class extends qr{constructor(){super(new no(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mo=class extends Ks{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new ph}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var bo=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Xd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Xd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Xd(){return performance.now()}var Ph="\\[\\]\\.:\\/",c_=new RegExp("["+Ph+"]","g"),Ih="[^"+Ph+"]",h_="[^"+Ph.replace("\\.","")+"]",u_=/((?:WC+[\/:])*)/.source.replace("WC",Ih),d_=/(WCOD+)?/.source.replace("WCOD",h_),f_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ih),p_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ih),m_=new RegExp("^"+u_+d_+f_+p_+"$"),g_=["material","materials","bones","map"],mh=class{constructor(t,e,n){let s=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(c_,"")}static parseTrackName(t){let e=m_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);g_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=mh;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var d1=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);var Co=class{constructor(){this.boxes=[],this.grid=new Map,this.dynamic=new Set,this.groundFn=()=>0,this._stamp=0}key(t,e){return t*73856093^e*19349663}addBox(t,e,n,s,r,a,o="static"){let l={minX:t,minY:e,minZ:n,maxX:s,maxY:r,maxZ:a,tag:o,stamp:0};this.boxes.push(l);for(let c=Math.floor(t/16);c<=Math.floor(s/16);c++)for(let h=Math.floor(n/16);h<=Math.floor(a/16);h++){let u=this.key(c,h);this.grid.has(u)||this.grid.set(u,[]),this.grid.get(u).push(l)}return l}disableBox(t){t.maxY=-100,t.minY=-101}addCentered(t,e,n,s,r,a){return this.addBox(t-s/2,e,n-a/2,t+s/2,e+r,n+a/2)}query(t,e,n,s){let r=[],a=++this._stamp;for(let o=Math.floor(t/16);o<=Math.floor(n/16);o++)for(let l=Math.floor(e/16);l<=Math.floor(s/16);l++){let c=this.grid.get(this.key(o,l));if(c)for(let h of c)h.stamp!==a&&(h.stamp=a,r.push(h))}return r}groundAt(t,e,n,s,r=.4){let a=this.groundFn(t,e);for(let o of this.query(t-n,e-n,t+n,e+n))o.maxY<=s+r&&o.maxY>a&&t+n>o.minX&&t-n<o.maxX&&e+n>o.minZ&&e-n<o.maxZ&&(a=o.maxY);return a}resolveCircle(t,e,n,s,r,a=.4,o=null,l=!1){let c=!1,h=0,u=0;for(let f=0;f<3;f++){let g=!1;for(let x of this.query(t-n,e-n,t+n,e+n)){if(x.maxY<=s+a||x.minY>=r)continue;let m=Math.max(x.minX,Math.min(t,x.maxX)),p=Math.max(x.minZ,Math.min(e,x.maxZ)),b=t-m,y=e-p,v=b*b+y*y;if(!(v>=n*n)){if(v>1e-8){let T=Math.sqrt(v);b/=T,y/=T,t=m+b*n,e=p+y*n}else{let T=t-x.minX,E=x.maxX-t,R=e-x.minZ,C=x.maxZ-e,w=Math.min(T,E,R,C);w===T?(t=x.minX-n,b=-1,y=0):w===E?(t=x.maxX+n,b=1,y=0):w===R?(e=x.minZ-n,b=0,y=-1):(e=x.maxZ+n,b=0,y=1)}h+=b,u+=y,c=!0,g=!0}}for(let x of this.dynamic){if(x===o||!x.collidable)continue;let m=x.pushCircleOut(t,e,n,s,r,l);m&&(t=m.x,e=m.z,h+=m.nx,u+=m.nz,c=!0,g=!0)}if(!g)break}let d=Math.hypot(h,u)||1;return{x:t,z:e,hit:c,nx:h/d,nz:u/d}}raycast(t,e,n,s,r,a,o){let l=t+s*o,c=n+a*o,h=o,u=this.query(Math.min(t,l),Math.min(n,c),Math.max(t,l),Math.max(n,c));for(let d of u){let f=0,g=h,x=[t,e,n],m=[s,r,a],p=[d.minX,d.minY,d.minZ],b=[d.maxX,d.maxY,d.maxZ],y=!0;for(let v=0;v<3;v++)if(Math.abs(m[v])<1e-9){if(x[v]<p[v]||x[v]>b[v]){y=!1;break}}else{let T=(p[v]-x[v])/m[v],E=(b[v]-x[v])/m[v];if(T>E){let R=T;T=E,E=R}if(f=Math.max(f,T),g=Math.min(g,E),f>g){y=!1;break}}y&&f<h&&(h=f)}for(let d of this.dynamic){if(!d.rayHit||d===this.rayIgnore)continue;let f=d.rayHit(t,e,n,s,r,a,h);f<h&&(h=f)}if(r<-1e-6){let f=(this.groundFn(t,n)+.05-e)/r;f>0&&f<h&&(h=f)}return h}};function Cn(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ue,c=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=mf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);let g=mf(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function mf(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Oe(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){let x=h.getComponent(d,g);o.setComponent(d+u,g,x)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var b1=new Ht,gf=new en,xf=new Xe,yf=new D,vf=new D;function ie(i=0,t=0,e=0,n=0,s=0,r=0,a=1,o=1,l=1){return xf.set(s,n,r,"YXZ"),gf.setFromEuler(xf),vf.set(i,t,e),yf.set(a,o,l),new Ht().compose(vf,gf,yf)}function ne(i,t,e,n=1,s=n){let r=new kt(i,t,e),a=r.attributes.uv,o=[[e,t],[e,t],[i,e],[i,e],[i,t],[i,t]];for(let l=0;l<6;l++)for(let c=0;c<4;c++){let h=l*4+c;a.setXY(h,a.getX(h)*o[l][0]/n,a.getY(h)*o[l][1]/s)}return r}function ee(i,t,e=1,n=e){let s=new mn(i,t);s.rotateX(-Math.PI/2);let r=s.attributes.uv;for(let a=0;a<r.count;a++)r.setXY(a,r.getX(a)*i/e,r.getY(a)*t/n);return s}function er(i,t,e,n=.4,s=2){let r=i/2+n,a=t/2+n,o=[],l=[],c=(y,v,T,E,R,C)=>{o.push(...y,...v,...T),l.push(...E,...R,...C)},h=[-r,0,-a],u=[r,0,-a],d=[r,0,a],f=[-r,0,a],g=[-r,e,0],x=[r,e,0],m=Math.hypot(a,e)/s,p=2*r/s;c(h,g,x,[0,0],[0,m],[p,m]),c(h,x,u,[0,0],[p,m],[p,0]),c(d,x,g,[0,0],[0,m],[p,m]),c(d,g,f,[0,0],[p,m],[p,0]),c(f,g,h,[0,0],[.5,.5],[1,0]),c(u,x,d,[0,0],[.5,.5],[1,0]),c(h,u,d,[0,0],[1,0],[1,1]),c(h,d,f,[0,0],[1,1],[0,1]);let b=new Ue;return b.setAttribute("position",new ae(o,3)),b.setAttribute("uv",new ae(l,2)),b.computeVertexNormals(),b}function Fe(i,t,e,n=10){return new ke(i,t,e,n)}function x_(i){let t=i.index?i.toNonIndexed():i;for(let e of Object.keys(t.attributes))["position","normal","uv","color"].includes(e)||t.deleteAttribute(e);return t.attributes.uv||t.setAttribute("uv",new ae(new Float32Array(t.attributes.position.count*2),2)),t.attributes.normal||t.computeVertexNormals(),t}function $r(i,t){let e=new Ot(t),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=e.r,s[r*3+1]=e.g,s[r*3+2]=e.b;return i.setAttribute("color",new Oe(s,3)),i}var ai=class{constructor(){this.groups=new Map}add(t,e,n,s){e.isPaint&&(s=e.color,e=e.mat);let r=x_(t);if(r===t&&(r=t.clone()),e.isSign){let a=e.region,o=r.attributes.uv;for(let l=0;l<o.count;l++){let c=Math.min(1,Math.max(0,o.getX(l))),h=Math.min(1,Math.max(0,o.getY(l)));o.setXY(l,a.u0+(a.u1-a.u0)*c,a.v0+(a.v1-a.v0)*h)}e=e.mat}n&&r.applyMatrix4(n),e.vertexColors?$r(r,s!=null?s:16777215):r.attributes.color&&r.deleteAttribute("color"),this.groups.has(e)||this.groups.set(e,[]),this.groups.get(e).push(r)}flush(t,e={}){var s,r,a;let n=[];for(let[o,l]of this.groups){if(!l.length)continue;let c=Cn(l,!1);l.forEach(d=>d.dispose()),c.computeBoundingSphere();let h=new $t(c,o),u=(r=(s=o.userData.castShadow)!=null?s:e.castShadow)!=null?r:!0;h.castShadow=u,h.receiveShadow=(a=o.userData.receiveShadow)!=null?a:!0,h.matrixAutoUpdate=!1,h.updateMatrix(),t.add(h),n.push(h)}return this.groups.clear(),n}};var Lh=new Map,Po=1337;function j(){return Po=Po*16807%2147483647,(Po-1)/2147483646}function nr(i){Po=i%2147483647||1}function V(i,t){return i+(t-i)*j()}function Nt(i){return i[Math.floor(j()*i.length)]}function _e(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d",{willReadFrequently:!0})]}function bn(i,t,e,n,s=1){let r=i.getImageData(0,0,t,e),a=r.data;for(let o=0;o<a.length;o+=4){let l=(j()-.5)*n;a[o]=Math.max(0,Math.min(255,a[o]+l)),a[o+1]=Math.max(0,Math.min(255,a[o+1]+l)),a[o+2]=Math.max(0,Math.min(255,a[o+2]+l)),a[o+3]=a[o+3]*s}i.putImageData(r,0,0)}function Zr(i,t,e,n,s,r=2){for(let a=0;a<n;a++){i.fillStyle=Nt(s);let o=r*(.5+j());i.fillRect(j()*t,j()*e,o,o)}}function Me(i,t=!0,e=!0){let n=new Zs(i);return t&&(n.wrapS=n.wrapT=Ir),e&&(n.colorSpace=ln),n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=qn,n}function Le(i,t){return Lh.has(i)||Lh.set(i,t()),Lh.get(i)}function Jr(i,t=2,e=null){let n="n_"+(e||i.uuid)+t;return Le(n,()=>{let s=i.image,r=s.width,a=s.height,o=s.getContext("2d").getImageData(0,0,r,a).data,l=new Float32Array(r*a);for(let g=0;g<r*a;g++)l[g]=(o[g*4]*.299+o[g*4+1]*.587+o[g*4+2]*.114)/255;let[c,h]=_e(r,a),u=h.createImageData(r,a),d=u.data;for(let g=0;g<a;g++)for(let x=0;x<r;x++){let m=l[g*r+(x-1+r)%r],p=l[g*r+(x+1)%r],b=l[(g-1+a)%a*r+x],y=l[(g+1)%a*r+x],v=-(p-m)*t,T=(y-b)*t,E=1,R=Math.hypot(v,T,E);v/=R,T/=R,E/=R;let C=(g*r+x)*4;d[C]=(v*.5+.5)*255,d[C+1]=(T*.5+.5)*255,d[C+2]=(E*.5+.5)*255,d[C+3]=255}h.putImageData(u,0,0);let f=Me(c,!0,!1);return f.wrapS=i.wrapS,f.wrapT=i.wrapT,f})}function _f(i,t,e,n,s=1,r="rgba(15,15,16,0.6)"){i.strokeStyle=r,i.lineWidth=s,i.beginPath(),i.moveTo(t,e);let a=j()*Math.PI*2;for(let o=0;o<n;o++)a+=V(-.6,.6),t+=Math.cos(a)*6,e+=Math.sin(a)*6,i.lineTo(t,e);i.stroke()}function Kr(){return Le("asphalt",()=>{let[t,e]=_e(512,512);e.fillStyle="#3b3c3e",e.fillRect(0,0,512,512);for(let n=0;n<40;n++){let s=e.createRadialGradient(0,0,0,0,0,1),r=j()<.5?"255,255,255":"0,0,0";s.addColorStop(0,`rgba(${r},${V(.03,.07)})`),s.addColorStop(1,`rgba(${r},0)`),e.save(),e.translate(j()*512,j()*512),e.scale(V(30,120),V(30,120)),e.fillStyle=s,e.fillRect(-1,-1,2,2),e.restore()}Zr(e,512,512,14e3,["#2a2b2d","#4c4d50","#333436","#5a5a5c","#262628","#6a6a6c"],1.6),bn(e,512,512,26);for(let n=0;n<4;n++)_f(e,j()*512,j()*512,Math.floor(V(5,14)),V(.6,1.2),"rgba(15,15,16,0.4)");for(let n=0;n<5;n++)e.fillStyle=`rgba(10,10,12,${V(.06,.14)})`,e.beginPath(),e.ellipse(j()*512,j()*512,V(8,30),V(5,18),j()*3,0,7),e.fill();return Me(t)})}function Mf(){return Le("road",()=>{let[t,e]=_e(1024,1024),n=Kr().image;for(let[a,o,l]of[[0,0,0],[512,0,1],[0,512,2],[512,512,3]])e.save(),e.translate(a+256,o+256),e.rotate(l*Math.PI/2),e.drawImage(n,-256,-256),e.restore();e.fillStyle="rgba(25,25,27,0.22)",e.fillRect(V(350,600),V(100,700),V(150,260),V(120,260));let s=1024/12;for(let a of[3.6,5.3,6.7,8.4]){let o=e.createLinearGradient((a-.5)*s,0,(a+.5)*s,0);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(.5,"rgba(10,10,12,0.18)"),o.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=o,e.fillRect((a-.5)*s,0,s,1024)}for(let[a,o]of[[0,.6],[12,11.4]]){let l=e.createLinearGradient(a*s,0,o*s,0);l.addColorStop(0,"rgba(20,18,15,0.55)"),l.addColorStop(1,"rgba(20,18,15,0)"),e.fillStyle=l,e.fillRect(Math.min(a,o)*s,0,.6*s,1024)}let r=(a,o,l,c,h)=>{e.fillStyle=a,e.fillRect(o,l,c,h);for(let u=0;u<c*h/30;u++)e.fillStyle="rgba(50,50,52,0.6)",e.fillRect(o+j()*c,l+j()*h,V(1,3),V(1,3))};for(let a=0;a<1024;a+=s*6)r("#d4b02e",1024/2-s*.24,a,s*.12,s*3),r("#d4b02e",1024/2+s*.12,a,s*.12,s*3);return r("rgba(226,226,222,0.92)",s*2.5,0,s*.12,1024),r("rgba(226,226,222,0.92)",1024-s*2.5-s*.12,0,s*.12,1024),bn(e,1024,1024,10),Me(t)})}function bf(){return Le("cross",()=>{let[i,t]=_e(512,512);t.drawImage(Kr().image,0,0);for(let e=16;e<512;e+=64){t.fillStyle="rgba(232,232,228,0.92)",t.fillRect(e,0,36,512);for(let n=0;n<300;n++)t.fillStyle="rgba(60,60,62,0.55)",t.fillRect(e+j()*36,j()*512,V(1,4),V(1,4))}return bn(t,512,512,20),Me(i)})}function jr(){return Le("sidewalk",()=>{let[t,e]=_e(512,512),n=128;for(let s=0;s<512;s+=n)for(let r=0;r<512;r+=n){let a=Math.floor(V(140,168));e.fillStyle=`rgb(${a},${a-4},${a-10})`,e.fillRect(r,s,n,n);for(let o=0;o<6;o++){let l=e.createRadialGradient(r+j()*n,s+j()*n,0,r+n/2,s+n/2,n);l.addColorStop(0,`rgba(0,0,0,${V(0,.08)})`),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.fillRect(r,s,n,n)}}Zr(e,512,512,9e3,["#8a857c","#b3ada2","#7b776f","#c2bdb2"],1.5),bn(e,512,512,22),e.fillStyle="rgba(55,52,48,0.85)";for(let s=0;s<=512;s+=n)e.fillRect(s-1.5,0,3,512),e.fillRect(0,s-1.5,512,3);e.fillStyle="rgba(255,255,255,0.12)";for(let s=0;s<=512;s+=n)e.fillRect(s+1.5,0,1,512),e.fillRect(0,s+1.5,512,1);for(let s=0;s<6;s++)_f(e,j()*512,j()*512,Math.floor(V(3,8)),1,"rgba(40,38,35,0.6)");for(let s=0;s<30;s++)e.fillStyle=`rgba(30,30,30,${V(.15,.35)})`,e.beginPath(),e.arc(j()*512,j()*512,V(1.5,4),0,7),e.fill();return Me(t)})}function Dh(){return Le("grass",()=>{let[t,e]=_e(512,512);e.fillStyle="#48682c",e.fillRect(0,0,512,512);for(let n=0;n<30;n++){let s=e.createRadialGradient(0,0,0,0,0,1),r=Nt(["70,100,40","60,85,30","95,110,50","50,70,28"]);s.addColorStop(0,`rgba(${r},0.5)`),s.addColorStop(1,`rgba(${r},0)`),e.save(),e.translate(j()*512,j()*512),e.scale(V(40,110),V(40,110)),e.fillStyle=s,e.fillRect(-1,-1,2,2),e.restore()}for(let n=0;n<22e3;n++){let s=j()*512,r=j()*512,a=V(3,8),o=V(-.5,.5)-Math.PI/2;e.strokeStyle=Nt(["#3a5a22","#5f8636","#4d7230","#6e9440","#35501d","#7a9a48"]),e.lineWidth=V(.7,1.4),e.beginPath(),e.moveTo(s,r),e.lineTo(s+Math.cos(o)*a,r+Math.sin(o)*a),e.stroke()}return bn(e,512,512,14),Me(t)})}function zh(){return Le("dirt",()=>{let[t,e]=_e(512,512);e.fillStyle="#7d6649",e.fillRect(0,0,512,512),Zr(e,512,512,9e3,["#6b563c","#8f7858","#5e4a33","#9c8766","#4f3e2a"],2.2);for(let n=0;n<400;n++)e.fillStyle=Nt(["#a39478","#6d6658","#8a8070"]),e.beginPath(),e.arc(j()*512,j()*512,V(1.5,4),0,7),e.fill();return bn(e,512,512,20),Me(t)})}function ir(){return Le("concrete",()=>{let[t,e]=_e(512,512);e.fillStyle="#b1aca3",e.fillRect(0,0,512,512);for(let n=0;n<25;n++){let s=e.createRadialGradient(0,0,0,0,0,1);s.addColorStop(0,`rgba(80,75,70,${V(.04,.12)})`),s.addColorStop(1,"rgba(80,75,70,0)"),e.save(),e.translate(j()*512,j()*512),e.scale(V(30,120),V(30,120)),e.fillStyle=s,e.fillRect(-1,-1,2,2),e.restore()}bn(e,512,512,30),Zr(e,512,512,1600,["#9d978d","#c4bfb6","#8a857c"],2.5);for(let n=0;n<18;n++)e.fillStyle=`rgba(70,66,60,${V(.04,.1)})`,e.fillRect(j()*512,0,V(2,8),512*V(.2,1));return Me(t)})}function wf(){return Le("parking",()=>{let[i,t]=_e(512,512);t.drawImage(Kr().image,0,0),t.fillStyle="rgba(235,235,230,0.9)",t.fillRect(0,0,512,12),t.fillRect(0,0,12,512*.95);for(let e=0;e<400;e++)t.fillStyle="rgba(60,60,62,0.5)",t.fillRect(j()*512,j()*12,2,2),t.fillRect(j()*12,j()*490,2,2);return Me(i)})}var y_={brick:{base:"#8a4a36",mortar:"#5f3326",frame:"#d8d0c0",glass:"#1d2633",sill:"#c8c0b0"},concrete:{base:"#a8a39a",mortar:"#8d877d",frame:"#5b5e62",glass:"#22303e",sill:"#bdb8ae"},office:{base:"#4d5a66",mortar:"#3b4650",frame:"#2a3138",glass:"#2c4258",sill:"#3b4650"},plaster:{base:"#c9b48e",mortar:"#a99572",frame:"#f1ece2",glass:"#1f2a35",sill:"#e8e0d0"},apartment:{base:"#b9a495",mortar:"#9a8577",frame:"#e8e0d6",glass:"#1d2733",sill:"#ddd4c8"}};function Io(i){return Le("facade_"+i,()=>{let t=y_[i],e=1024,n=e/8,[s,r]=_e(e,e),[a,o]=_e(e,e),[l,c]=_e(e,e),[h,u]=_e(e,e);if(r.fillStyle=t.base,r.fillRect(0,0,e,e),o.fillStyle="#000",o.fillRect(0,0,e,e),c.fillStyle="#0a0a0a",c.fillRect(0,0,e,e),u.fillStyle="#808080",u.fillRect(0,0,e,e),i==="brick")for(let p=0;p<e;p+=8){for(let b=p/8%2*8;b<e+16;b+=16){let y=V(-14,14);r.fillStyle=`rgb(${138+y},${74+y*.6},${54+y*.5})`,r.fillRect(b-16,p,15,7),u.fillStyle="#9a9a9a",u.fillRect(b-16,p,15,7)}r.fillStyle=t.mortar,r.fillRect(0,p+7,e,1)}else if(i==="concrete"||i==="plaster"||i==="apartment")for(let p=0;p<e;p+=n/2)r.fillStyle="rgba(0,0,0,0.06)",r.fillRect(0,p,e,1),u.fillStyle="#606060",u.fillRect(0,p,e,2);bn(r,e,e,i==="office"?8:22);for(let p=0;p<40;p++)r.fillStyle=`rgba(30,25,20,${V(.03,.08)})`,r.fillRect(j()*e,j()*e,V(3,10),V(40,200));for(let p=0;p<8;p++){r.fillStyle=t.mortar,r.fillRect(0,p*n,e,i==="office"?10:6),u.fillStyle="#b0b0b0",u.fillRect(0,p*n,e,i==="office"?10:6);for(let b=0;b<8;b++){let y=b*n,v=p*n,T=i==="office"?n-12:n*.52,E=i==="office"?n-20:n*.6,R=y+(n-T)/2,C=v+(n-E)/2+4;r.fillStyle=t.frame,r.fillRect(R-6,C-6,T+12,E+12),r.fillStyle=t.sill,r.fillRect(R-10,C+E+4,T+20,7),i!=="office"&&(r.fillStyle=t.sill,r.fillRect(R-8,C-12,T+16,6)),u.fillStyle="#c8c8c8",u.fillRect(R-6,C-6,T+12,E+12),u.fillStyle="#e0e0e0",u.fillRect(R-10,C+E+4,T+20,7),u.fillStyle="#303030",u.fillRect(R,C,T,E);let w=j()<.38,M=r.createLinearGradient(R,C,R+T*.6,C+E);if(M.addColorStop(0,"#5a6e86"),M.addColorStop(.45,t.glass),M.addColorStop(1,"#2a3646"),r.fillStyle=M,r.fillRect(R,C,T,E),j()<.5&&(r.fillStyle=Nt(["rgba(220,210,190,0.35)","rgba(160,60,50,0.3)","rgba(80,100,140,0.3)"]),r.fillRect(R,C,T*V(.15,.4),E)),c.fillStyle="#ffffff",c.fillRect(R,C,T,E),i!=="office"?(r.fillStyle=t.frame,r.fillRect(R+T/2-2,C,4,E),r.fillRect(R,C+E*.38,T,3),c.fillStyle="#000",c.fillRect(R+T/2-2,C,4,E),c.fillRect(R,C+E*.38,T,3)):(r.fillStyle=t.frame,r.fillRect(R+T/2-1,C,2,E)),w){let L=Nt(["#ffd79a","#ffe4b8","#fff1d6","#cfe3ff","#ffc77a"]),U=o.createLinearGradient(R,C,R,C+E);U.addColorStop(0,L),U.addColorStop(1,"#8a6a40"),o.fillStyle=U,o.globalAlpha=V(.55,1),o.fillRect(R,C,T,E),o.globalAlpha=1,j()<.5&&(o.fillStyle="rgba(0,0,0,0.5)",o.fillRect(R,C,T*V(.2,.5),E)),i!=="office"&&(o.fillStyle="#000",o.fillRect(R+T/2-2,C,4,E))}i!=="office"&&j()<.1&&(r.fillStyle="#d0d0cc",r.fillRect(R+T*.2,C+E+12,T*.55,14),r.fillStyle="#888",r.fillRect(R+T*.2,C+E+24,T*.55,2))}}let d=Me(s),f=Me(a),g=Me(l,!0,!1),x=Me(h,!0,!1),m=Jr(x,i==="brick"?3:2.2,"facade_"+i);return{map:d,emissive:f,spec:g,normal:m}})}function Uh(){return Le("siding",()=>{let[i,t]=_e(512,512);for(let e=0;e<512;e+=32){let n=t.createLinearGradient(0,e,0,e+32);n.addColorStop(0,"#ffffff"),n.addColorStop(.8,"#e2e2e2"),n.addColorStop(.93,"#bdbdbd"),n.addColorStop(1,"#8a8a8a"),t.fillStyle=n,t.fillRect(0,e,512,32);for(let s=j()*200;s<512;s+=V(180,320))t.fillStyle="rgba(120,120,120,0.5)",t.fillRect(s,e,2,30)}for(let e=0;e<30;e++)t.fillStyle=`rgba(90,85,75,${V(.03,.08)})`,t.fillRect(j()*512,j()*512,V(2,6),V(30,160));return bn(t,512,512,10),Me(i)})}function Nh(){return Le("roof",()=>{let[i,t]=_e(512,512);t.fillStyle="#3a2a24",t.fillRect(0,0,512,512);for(let e=0;e<512;e+=24)for(let n=e/24%2*24;n<560;n+=48){let s=V(-12,12),r=t.createLinearGradient(0,e,0,e+23);r.addColorStop(0,`rgb(${92+s},${66+s},${57+s})`),r.addColorStop(1,`rgb(${70+s},${50+s},${43+s})`),t.fillStyle=r,t.fillRect(n-48,e,46,23)}return Zr(t,512,512,4e3,["#2a1e1a","#7a6058","#4a3a34"],1.4),bn(t,512,512,14),Me(i)})}function Ef(){return Le("leaves",()=>{let[t,e]=_e(256,256);e.fillStyle="#7a8a6a",e.fillRect(0,0,256,256);for(let n=0;n<2600;n++){let s=j()*256,r=j()*256,a=V(2,6),o=Math.floor(V(120,255));e.fillStyle=`rgb(${o*.85},${o},${o*.7})`,e.beginPath(),e.ellipse(s,r,a,a*.55,j()*3,0,7),e.fill()}for(let n=0;n<400;n++)e.fillStyle="rgba(20,30,10,0.5)",e.beginPath(),e.arc(j()*256,j()*256,V(1,4),0,7),e.fill();return Me(t)})}function Sf(){return Le("ao",()=>{let[i,t]=_e(8,64),e=t.createLinearGradient(0,0,0,64);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.35,"rgba(0,0,0,0.3)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,8,64),Me(i,!1)})}function Tf(){return Le("blob",()=>{let[i,t]=_e(64,64),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.4)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Me(i,!1)})}function Oh(){return Le("wood",()=>{let[i,t]=_e(128,128);t.fillStyle="#7b5a3a",t.fillRect(0,0,128,128);for(let e=0;e<40;e++){t.strokeStyle=`rgba(50,30,15,${V(.1,.35)})`,t.beginPath();let n=j()*128;t.moveTo(0,n),t.bezierCurveTo(40,n+V(-4,4),80,n+V(-4,4),128,n),t.stroke()}return bn(t,128,128,14),Me(i)})}function kh(){return Le("bark",()=>{let[i,t]=_e(64,128);t.fillStyle="#4a3726",t.fillRect(0,0,64,128);for(let e=0;e<30;e++)t.fillStyle=`rgba(25,15,8,${V(.2,.5)})`,t.fillRect(j()*64,j()*128,V(1,3),V(10,40));return bn(t,64,128,20),Me(i)})}function Af(){return Le("pool",()=>{let[i,t]=_e(128,128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,200,120,0.55)"),e.addColorStop(.4,"rgba(255,170,90,0.22)"),e.addColorStop(1,"rgba(255,150,70,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Me(i,!1)})}function Rf(){return Le("glow",()=>{let[i,t]=_e(64,64),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,230,180,0.6)"),e.addColorStop(1,"rgba(255,200,120,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Me(i,!1)})}function Cf(i,t={}){let e="sign_"+i+JSON.stringify(t);return Le(e,()=>Me(Pf(i,t),!1))}function Pf(i,t={}){{let e=t.w||512,n=t.h||128,[s,r]=_e(e,n);r.fillStyle=t.bg||"#1b3d6e",r.fillRect(0,0,e,n),t.border!==!1&&(r.strokeStyle=t.borderColor||"#fff",r.lineWidth=Math.max(4,n*.05),r.strokeRect(r.lineWidth,r.lineWidth,e-r.lineWidth*2,n-r.lineWidth*2)),r.fillStyle=t.fg||"#fff";let a=t.size||n*.5;for(r.font=`${t.weight||"bold"} ${a}px ${t.font||"Arial, Helvetica, sans-serif"}`;r.measureText(i).width>e*.9&&a>8;)a-=2,r.font=`${t.weight||"bold"} ${a}px ${t.font||"Arial, Helvetica, sans-serif"}`;return r.textAlign="center",r.textBaseline="middle",r.fillText(i,e/2,n/2+2),s}}function Fh(){return Le("shopwin",()=>{let[i,t]=_e(256,128),e=t.createLinearGradient(0,0,0,128);e.addColorStop(0,"#fff3d4"),e.addColorStop(1,"#e7c58a"),t.fillStyle=e,t.fillRect(0,0,256,128);for(let n=30;n<128;n+=32){t.fillStyle="#7a5a3a",t.fillRect(0,n,256,4);for(let s=4;s<252;s+=V(8,16)){t.fillStyle=Nt(["#c0392b","#2980b9","#27ae60","#f39c12","#8e44ad","#ecf0f1","#d35400"]);let r=V(10,22);t.fillRect(s,n-r,V(5,10),r)}}return t.fillStyle="rgba(255,255,255,0.25)",t.beginPath(),t.moveTo(20,0),t.lineTo(70,0),t.lineTo(30,128),t.lineTo(-20,128),t.fill(),Me(i,!1)})}function Bh(){return Le("tilefloor",()=>{let[i,t]=_e(128,128);for(let e=0;e<4;e++)for(let n=0;n<4;n++)t.fillStyle=(n+e)%2?"#d8d4cc":"#b9b3a8",t.fillRect(n*32,e*32,32,32);return bn(t,128,128,10),Me(i)})}function If(){return Le("signAtlas",()=>{let[a,o]=_e(2048,1024);o.fillStyle="#222",o.fillRect(0,0,2048,1024);let l=Me(a,!1),c=new Map,h=0;return{texture:l,region(u,d){let f=u+JSON.stringify(d);if(c.has(f))return c.get(f);if(h>=6*16)return c.values().next().value;let g=h%6,x=Math.floor(h/6);h++;let m=Pf(u,{...d,w:341*2,h:64*2});o.drawImage(m,g*341+1,x*64+1,339,62),l.needsUpdate=!0;let p={u0:(g*341+2)/2048,u1:((g+1)*341-2)/2048,v0:1-((x+1)*64-2)/1024,v1:1-(x*64+2)/1024};return c.set(f,p),p}}})}function Hh(){return Le("corrugated",()=>{let[i,t]=_e(256,256);for(let e=0;e<256;e+=16){let n=t.createLinearGradient(e,0,e+16,0);n.addColorStop(0,"#9a9a9a"),n.addColorStop(.5,"#f2f2f2"),n.addColorStop(1,"#9a9a9a"),t.fillStyle=n,t.fillRect(e,0,16,256)}for(let e=0;e<40;e++)t.fillStyle=`rgba(110,60,30,${V(.05,.2)})`,t.fillRect(j()*256,j()*256,V(3,14),V(10,80));return bn(t,256,256,16),Me(i)})}var Lo=[];function Je(i,t={}){let e=new nn(i);return Object.assign(e.userData,t),e}function sr(i,t,e){return Lo.push({mat:i,base:t,night:e}),i}var Be=(i,t)=>({isPaint:!0,mat:i,color:t}),jn=new Ur(128,{generateMipmaps:!0,minFilter:qn}),Kn=(i,t,e)=>({normalMap:Jr(i,t,e),normalScale:new ut(1,1)}),Mt=null;function Vi(){if(Mt)return Mt;Mt={};let i=(o,l,c={})=>new Rn({map:o,...Kn(o,2.2,l),shininess:18,specular:2500134,...c});Mt.road=i(Mf(),"road"),Mt.road.userData.castShadow=!1,Mt.asphalt=i(Kr(),"asphalt"),Mt.asphalt.userData.castShadow=!1,Mt.cross=i(bf(),"cross",{polygonOffset:!0,polygonOffsetFactor:-2}),Mt.cross.userData.castShadow=!1,Mt.sidewalk=Je({map:jr(),...Kn(jr(),3,"sidewalk")},{castShadow:!1}),Mt.grass=Je({map:Dh(),...Kn(Dh(),2.5,"grass")},{castShadow:!1}),Mt.dirt=Je({map:zh(),...Kn(zh(),3,"dirt")},{castShadow:!1}),Mt.concrete=Je({map:ir(),...Kn(ir(),1.5,"concrete")}),Mt.concreteFlat=Je({map:ir(),polygonOffset:!0,polygonOffsetFactor:-1},{castShadow:!1}),Mt.parking=i(wf(),"parking",{polygonOffset:!0,polygonOffsetFactor:-1}),Mt.parking.userData.castShadow=!1,Mt.facade={};for(let o of["brick","concrete","office","plaster","apartment"]){let l=Io(o);Mt.facade[o]=sr(new Rn({map:l.map,emissiveMap:l.emissive,emissive:16777215,emissiveIntensity:0,specularMap:l.spec,normalMap:l.normal,specular:8947848,shininess:80,envMap:jn.texture,combine:Zn,reflectivity:o==="office"?.75:.55}),0,1)}let t=Je({map:Uh(),...Kn(Uh(),2,"siding"),vertexColors:!0});Mt.siding=[15921126,11125460,14206883,11057306,13209466,14735042].map(o=>Be(t,o));let e=Je({map:Nh(),...Kn(Nh(),4,"roof"),vertexColors:!0});Mt.roof=[16777215,9083560,11567216].map(o=>Be(e,o));let n=Je({vertexColors:!0}),s=Je({map:Oh(),...Kn(Oh(),2,"wood"),vertexColors:!0});Mt.trim=Be(n,16052714),Mt.darkTrim=Be(n,3815994),Mt.wood=Be(s,16777215),Mt.woodDark=Be(s,9071184),Mt.fence=Be(n,15658734),Mt.fenceWood=Be(s,13150344),Mt.metal=Be(n,6054246),Mt.metalDark=Be(n,2829873),Mt.metalLight=Be(n,11054514),Mt.red=Be(n,11545130),Mt.yellow=Be(n,14200874),Mt.green=Be(n,3042106),Mt.blue=Be(n,1916810),Mt.white=Be(n,15790320),Mt.hedge=Be(n,3495210),Mt.water=new Rn({color:3828362,shininess:100,transparent:!0,opacity:.85,envMap:jn.texture,combine:Zn,reflectivity:.6}),Mt.water.userData.castShadow=!1,Mt.winDark=new Rn({color:2765888,specular:10066329,shininess:90,envMap:jn.texture,combine:Zn,reflectivity:.55}),Mt.ao=new Ae({map:Sf(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}),Mt.ao.userData.castShadow=!1,Mt.ao.userData.receiveShadow=!1,Mt.winLit=sr(new Rn({color:3815984,emissive:16767392,emissiveIntensity:0,specular:7829367,shininess:80,envMap:jn.texture,combine:Zn,reflectivity:.35}),0,1),Mt.lamp=sr(Je({color:12303274,emissive:16769712,emissiveIntensity:.3},{castShadow:!1}),.25,1.4),Mt.pool=new Ae({map:Af(),transparent:!0,depthWrite:!1,blending:Fs,opacity:0}),Mt.pool.userData.castShadow=!1,Mt.pool.userData.receiveShadow=!1,Lo.push({mat:Mt.pool,opacity:!0,base:0,night:1}),Mt.shopWin=sr(new Rn({map:Fh(),emissiveMap:Fh(),emissive:16777215,emissiveIntensity:.08,color:12303291,specular:8947848,shininess:90,envMap:jn.texture,combine:Zn,reflectivity:.3}),.08,.85),Mt.interior=Je({color:15261904,emissive:2762272}),Mt.interiorFloor=Je({map:Bh(),emissive:1710100},{castShadow:!1}),Mt.ceilingLight=sr(Je({color:16777215,emissive:16774368,emissiveIntensity:.8},{castShadow:!1}),.8,1.2),Mt.glass=new Rn({color:10139848,transparent:!0,opacity:.3,shininess:120,depthWrite:!1,envMap:jn.texture,combine:Zn,reflectivity:.4}),Mt.glass.userData.castShadow=!1,Mt.awning=[11022898,3107391,3100554,11565598,5910378,3355443].map(o=>Be(n,o)),Mt.signMats=new Map;let r=Je({map:Hh(),...Kn(Hh(),3,"corrugated"),vertexColors:!0});Mt.corr=o=>Be(r,o);let a=Je({map:ir(),...Kn(ir(),1.5,"concrete"),vertexColors:!0});Mt.wall=o=>Be(a,o),Mt.tile=Je({map:Bh(),emissive:1315344},{castShadow:!1}),Mt.tl={NS:[],EW:[]};for(let o of["NS","EW"])for(let l of[16722458,16757274,2817898])Mt.tl[o].push(new Ae({color:l}));return Mt.tlOff=[3803656,3811848,539160],Mt.tlBox=Be(n,2303530),Mt.bark=Je({map:kh(),...Kn(kh(),3,"bark")}),Mt.flag=Je({color:16777215,side:_n}),Mt.signAtlas=If(),Mt.sign=sr(Je({map:Mt.signAtlas.texture,emissiveMap:Mt.signAtlas.texture,emissive:16777215,emissiveIntensity:.4},{castShadow:!1}),.25,.9),Mt}function cn(i,t={}){let e=Vi();return{isSign:!0,mat:e.sign,region:e.signAtlas.region(i,t)}}var Vt={favela:{x:0,z:330,w:80,d:60,name:"Favela (antigo esconderijo)"},hideout:{x:-6,z:330},crashWall:{x:170,z:352},prison:{x:-350,z:76,w:80,d:70,name:"Penitenci\xE1ria Estadual"},prisonGate:{x:-308,z:76},industrial:{x:350,z:0,w:110,d:150,name:"Zona Industrial"},rivalTerritory:{x:340,z:-45},bookTable:{x:352,z:-52},galpao:{x:362,z:48},abandoned:{x:-80,z:-330,w:40,d:36,name:"Casa abandonada"},mansion:{x:152,z:-352,w:76,d:60,name:"Mans\xE3o de Lucas"},hill:{x:70,z:-330,r:46,h:11,name:"Colina"},fernando:{x:-170,z:-312,w:40,d:34,name:"Casa de Fernando"},blackwoodGate:{x:432,z:0},investigatorRoom:{x:0,y:-60,z:0},studio:{x:60,y:-80,z:0}},v_=[[Vt.favela.x-50,Vt.favela.z-40,Vt.favela.x+190,Vt.favela.z+40],[Vt.prison.x-50,Vt.prison.z-45,-230,Vt.prison.z+45],[230,-85,450,85],[Vt.abandoned.x-30,-360,Vt.abandoned.x+30,-230],[Vt.mansion.x-50,-390,Vt.mansion.x+50,-230],[Vt.hill.x-55,Vt.hill.z-55,Vt.hill.x+55,Vt.hill.z+55],[Vt.fernando.x-30,-340,Vt.fernando.x+30,-230],[-8,230,8,310]];function Lf(i,t,e=0){return v_.some(([n,s,r,a])=>i>n-e&&i<r+e&&t>s-e&&t<a+e)}function Do(i,t){let e=Vt.hill,n=((i-e.x)**2+(t-e.z)**2)/(e.r*e.r);if(n>=1)return 0;let s=1-n;return e.h*s*s*(3-2*s)}var he=6,sn=12,Pn=76,fe=Pn-sn,Qn=4,I=.15,In=he/2*Pn+sn/2,Qr=1.75,Df=4.75,be=i=>(i-he/2)*Pn,wn=i=>be(i)+Pn/2,__=["Rua das Ac\xE1cias","Av. Los Valles","Rua Hidalgo","Av. Central","Rua Esperan\xE7a","Rua do Porto","Rua Velha"],M_=["Rua Monroe","Av. Libertad","Rua das Palmeiras","Rua Cole","Rua Ram\xEDrez","Rua Ocidental","Rua Leste"],Gh=[["res","res","res","res","res","res"],["res","park","mixed","gas","mixed","res"],["res","shops","down","down","apart","res"],["res","police","down","down","parking","res"],["res","hospital","mixed","shops2","park","res"],["res","res","res","res","res","res"]];function zf(i){let t=i-be(0)+sn/2;return t<0||t>he*Pn+sn?!1:t%Pn<sn}function Uf(i,t){return Math.abs(i)<=In&&Math.abs(t)<=In?zf(i)||zf(t)?0:I:I+Do(i,t)}var Ge=class{constructor(t,e,n,s,r){this.x=t,this.z=e,this.ry=n,this.c=Math.cos(n),this.s=Math.sin(n),this.B=s,this.world=r}pt(t,e){return[this.x+t*this.c+e*this.s,this.z-t*this.s+e*this.c]}m(t,e,n,s=0,r=0,a=0,o=1,l=1,c=1){let[h,u]=this.pt(t,n);return ie(h,e,u,this.ry+s,r,a,o,l,c)}add(t,e,n,s,r,a=0,o=0,l=0){this.B.add(t,e,this.m(n,s,r,a,o,l))}box(t,e,n,s,r,a,o,l=!0,c=2,h=c){this.B.add(ne(r,a,o,c,h),t,this.m(e,n+a/2,s)),l&&this.collide(e,n,s,r,a,o)}ao(t,e,n,s,r=1.5){let a=I+.022,o=Vi();for(let[l,c,h,u]of[[0,s/2+r/2,n+r,0],[0,-s/2-r/2,n+r,Math.PI],[n/2+r/2,0,s+r,Math.PI/2],[-n/2-r/2,0,s+r,-Math.PI/2]])this.B.add(ee(h,r,h,r),o.ao,this.m(t+l,a,e+c,u))}collide(t,e,n,s,r,a){let[o,l]=this.pt(t,n),c=Math.abs(this.s)>.5,h=c?a:s,u=c?s:a;this.world.addBox(o-h/2,e,l-u/2,o+h/2,e+r,l+u/2)}},zo=class{constructor(t,e){this.scene=t,this.world=e,this.root=new ze,this.root.name="LosValles",t.add(this.root),this.parkedCars=[],this.npcs=[],this.trees=[],this.shopkeepers=[],this.landmarks=[],this.pedLoops=[],this.lamps=[],e.groundFn=Uf,this.M=Vi(),this.chunks=new Map}chunk(t,e){let n=Math.floor(t/2)+","+Math.floor(e/2);return this.chunks.has(n)||this.chunks.set(n,new ai),this.chunks.get(n)}build(){nr(20261108),this.buildRoads();for(let t=0;t<he;t++)for(let e=0;e<he;e++)this.buildBlock(e,t,Gh[t][e]);this.buildOutskirts(),this.buildStreetParking();for(let t of this.chunks.values())t.flush(this.root);this.chunks.clear()}buildRoads(){let t=this.M,e=new ai;for(let s=0;s<=he;s++){for(let r=0;r<he;r++){let a=Pn-sn,o=wn(r);e.add(ee(sn,a,sn,12),t.road,ie(be(s),0,o)),e.add(ee(sn,a,sn,12),t.road,ie(o,0,be(s),Math.PI/2)),e.add(new ke(.42,.42,.03,14),t.metalDark,ie(be(s)+(j()<.5?-1:1)*1.7,.012,o+V(-20,20))),e.add(new ke(.42,.42,.03,14),t.metalDark,ie(o+V(-20,20),.012,be(s)+(j()<.5?-1:1)*1.7));for(let l of[-1,1])e.add(ee(sn,3,9.6,3),t.cross,ie(be(s),.01,o+l*(a/2-1.8))),e.add(ee(sn,3,9.6,3),t.cross,ie(o+l*(a/2-1.8),.01,be(s),Math.PI/2))}for(let r=0;r<=he;r++)e.add(ee(sn,sn,6),t.asphalt,ie(be(s),0,be(r)))}e.flush(this.root,{castShadow:!1});let n=new ai;for(let s=0;s<=he;s++)for(let r=0;r<=he;r++)this.buildIntersection(n,s,r);n.flush(this.root)}buildIntersection(t,e,n){let s=this.M,r=be(e),a=be(n),o=[[0,1,"NS"],[0,-1,"NS"],[1,0,"EW"],[-1,0,"EW"]];for(let[l,c,h]of o){let u=e-l,d=n-c;if(u<0||u>he||d<0||d>he)continue;let f=-c,g=l,x=r-l*7.2+-c*7.2,m=a-c*7.2+l*7.2,p=Math.atan2(-l,-c);t.add(Fe(.09,.11,5.4,8),s.metalDark,ie(x,I+2.7,m)),this.world.addCentered(x,0,m,.3,5.6,.3);let b=x+c*5,y=m-l*5;t.add(ne(.12,.12,5),s.metalDark,ie((x+b)/2,I+4.7,(m+y)/2,Math.atan2(c,-l)));for(let[v,T,E]of[[b,y,4.1],[x,m,2.9]]){t.add(ne(.36,1,.28),s.tlBox,ie(v,I+E,T,p));for(let R=0;R<3;R++){let C=Math.sin(p)*.15,w=Math.cos(p)*.15;t.add(new ke(.1,.1,.04,10),s.tl[h][R],ie(v+C,I+E+.3-R*.3,T+w,p,Math.PI/2))}}x>r&&m>a&&(n<he&&t.add(ne(1.8,.28,.03,1.8,.28),cn(__[n],{bg:"#1f6b3a",w:512,h:80}),ie(x-.95,I+5.05,m)),e<he&&t.add(ne(1.8,.28,.03,1.8,.28),cn(M_[e],{bg:"#1f6b3a",w:512,h:80}),ie(x,I+5.4,m-.95,Math.PI/2)))}}buildBlock(t,e,n){let s=this.M,r=wn(t),a=wn(e),o=this.chunk(t,e),l=new Ge(r,a,0,o,this.world);o.add(ne(fe,I,fe,4),s.sidewalk,ie(r,I/2,a));for(let[f,g,x,m]of[[0,fe/2-.15,fe,.3],[0,-fe/2+.15,fe,.3],[fe/2-.15,0,.3,fe-.6],[-fe/2+.15,0,.3,fe-.6]])o.add(ne(x+.02,I+.01,m+.02,2),s.concrete,ie(r+f,(I+.01)/2,a+g));let c=fe-Qn*2,h={res:s.grass,park:s.grass,apart:s.grass,parking:s.parking,gas:s.concreteFlat}[n]||s.concreteFlat;n==="parking"?o.add(ee(c,c,3,5.5),s.parking,ie(r,I+.005,a,Math.PI/2)):o.add(ee(c,c,n==="res"||n==="park"||n==="apart"?4:3),h,ie(r,I+.005,a)),this.streetFurniture(l,t,e,n),{res:()=>this.residential(l,t,e),down:()=>this.downtown(l),mixed:()=>this.mixed(l),shops:()=>this.shopsBlock(l,["Mercado Los Valles","Farm\xE1cia S\xE3o Lucas","Lanchonete do Joe","Ferragens Ram\xEDrez"]),shops2:()=>this.shopsBlock(l,["Loja de Roupas Vega","Padaria Aurora","Conveni\xEAncia 24h","Eletr\xF4nicos Sombra"]),police:()=>this.policeBlock(l),gas:()=>this.gasBlock(l),parking:()=>this.parkingBlock(l),apart:()=>this.apartBlock(l),park:()=>this.parkBlock(l),hospital:()=>this.hospitalBlock(l)}[n]();let d=fe/2-2;this.pedLoops.push({cx:r,cz:a,half:d,type:n})}streetFurniture(t,e,n,s){let r=this.M,a=fe/2;for(let o=0;o<4;o++){let l=o*Math.PI/2;for(let c=0;c<3;c++){let h=-18+c*18+(o%2?9:0)*0,u=new Ge(t.x,t.z,l,t.B,this.world),d=h,f=a-.6;u.add(Fe(.07,.11,6.5,8),r.metalDark,d,I+3.25,f),u.add(ne(.08,.08,1.8),r.metalDark,d,I+6.4,f+.85),u.add(ne(.45,.14,.7),r.metalDark,d,I+6.35,f+1.7),u.add(ne(.36,.04,.55),r.lamp,d,I+6.27,f+1.7);{let[g,x]=u.pt(d,f+1.7);this.lamps.push([g,I+6.15,x])}u.collide(d,0,f,.3,6.6,.3),t.B.add(ee(11,11),r.pool,u.m(d,.03,f+2.2)),c===1&&j()<.6&&(u.add(Fe(.25,.22,.8,10),r.green,d+2.5,I+.4,f),u.collide(d+2.5,0,f,.5,.8,.5)),c===0&&j()<.5&&(u.add(Fe(.12,.14,.6,8),r.red,d+4,I+.3,f-.2),u.add(new Ze(.13,8,6),r.red,d+4,I+.62,f-.2),u.collide(d+4,0,f-.2,.35,.7,.35))}}if((e+n)%3===0&&s!=="res"){let o=new Ge(t.x,t.z,Math.PI,t.B,this.world),l=a-1.4;o.box(r.metal,-1.4,I,l,.08,2.4,.08,!1),o.box(r.metal,1.4,I,l,.08,2.4,.08,!1),o.box(r.metal,-1.4,I,l-1.2,.08,2.4,.08,!1),o.box(r.metal,1.4,I,l-1.2,.08,2.4,.08,!1),o.box(r.metalLight,0,I+2.4,l-.6,3.2,.08,1.6,!1),o.add(ee(2.8,2.2),r.glass,0,I+1.3,l-1.22,0,Math.PI/2),o.box(r.woodDark,0,I+.45,l-1,2.4,.08,.45,!1),o.collide(0,0,l-.6,3,2.5,1.3),o.box(cn("\xD4NIBUS",{bg:"#0b4f8a",w:256,h:80}),1.9,I+2.2,l,.5,.25,.03,!1,.5,.25)}}house(t,e,n,s,r={}){var w,M,L,U,N,k;let a=this.M,o=new Ge(...t.pt(e,n),s,t.B,this.world),l=(w=r.w)!=null?w:V(9,12),c=(M=r.d)!=null?M:V(7.5,9),h=(L=r.floors)!=null?L:j()<.45?2:1,u=2.9,d=h*u+.3,f=(U=r.siding)!=null?U:Nt(a.siding),g=Nt(a.roof),x=I;o.box(a.concrete,0,x,0,l+.3,.45,c+.3,!1),o.ao(0,0,l+.3,c+.3,1.3),o.box(f,0,x+.45,0,l,d,c,!1,3,3),o.collide(0,0,0,l+.3,d+2,c+.3);for(let W of[-1,1])for(let H of[-1,1])o.box(a.trim,W*(l/2),x+.45,H*(c/2),.18,d,.18,!1);o.box(a.trim,0,x+.45+d-.15,0,l+.1,.18,c+.1,!1);let m=V(1.6,2.4),p=l>=c,b=p?er(l,c,m,.5,2):er(c,l,m,.5,2);o.add(b,g,0,x+.45+d,0,p?0:Math.PI/2),j()<.45&&o.box(a.facade.brick,l*.3,x+d-.5,-c*.15,.7,m+1.6,.7,!1,3,3);let y=(N=r.doorX)!=null?N:V(-l*.25,l*.25);o.box(a.woodDark,y,x+.45,c/2+.02,1,2.1,.08,!1,1),o.box(a.trim,y,x+.45+2.1,c/2+.03,1.25,.12,.1,!1),o.box(a.metalLight,y+.35,x+1.45,c/2+.08,.06,.06,.06,!1),o.box(a.concrete,y,x,c/2+.9,2.6,.3,1.8,!1),o.box(a.wood,y,x+.3,c/2+.9,2.8,.1,1.8,!1,2),o.box(a.trim,y,x+2.9,c/2+1,3,.12,2,!1);for(let W of[-1,1])o.box(a.trim,y+W*1.3,x+.4,c/2+1.7,.14,2.5,.14,!1),o.collide(y+W*1.3,0,c/2+1.7,.25,2.8,.25);let v=(W,H,nt)=>{for(let q=0;q<H;q++){let rt=nt==="front"||nt==="back"?l:c,dt=-rt/2+(q+.5)*(rt/H);if(nt==="front"&&W<2&&Math.abs(dt-y)<1.6)continue;let Ft=j()<.5?a.winLit:a.winDark,Rt=($,et,mt)=>{if(o.add(ne(1.2,1.3,.06),Ft,$,x+W,et,mt),o.add(ne(1.4,.1,.12),a.trim,$,x+W+.7,et,mt),o.add(ne(1.4,.12,.2),a.trim,$,x+W-.7,et,mt),o.add(ne(.06,1.3,.1),a.trim,$,x+W,et,mt),o.add(ne(1.2,.06,.1),a.trim,$,x+W,et,mt),j()<.5)for(let ot of[-1,1]){let[Ct,Gt]=mt===0?[ot*.85,0]:[0,ot*.85];o.add(ne(.4,1.35,.05),a.darkTrim,$+Ct,x+W,et+Gt,mt)}};nt==="front"?Rt(dt,c/2+.03,0):nt==="back"?Rt(dt,-c/2-.03,0):Rt(nt==="left"?-l/2-.03:l/2+.03,dt,Math.PI/2)}};for(let W=0;W<h;W++){let H=.45+W*u+1.55;v(H,Math.max(2,Math.round(l/3)),"front"),v(H,Math.max(2,Math.round(l/3.5)),"back"),v(H,Math.max(1,Math.round(c/4)),"left"),v(H,Math.max(1,Math.round(c/4)),"right")}let T=(k=r.front)!=null?k:8;o.add(ee(1.4,T),a.concreteFlat,y,x+.012,c/2+1.8+T/2);let E=y>0?-l/2+1.8:l/2-1.8;o.add(ee(3.2,T+2),a.concreteFlat,E,x+.012,c/2+T/2+1),o.box(a.metalDark,y+1.2,x,c/2+1.8+T-.6,.08,1,.08,!1),o.box(a.blue,y+1.2,x+1,c/2+1.8+T-.6,.25,.25,.45,!1);for(let W=0;W<4;W++){let H=-l/2+.8+j()*(l-1.6);Math.abs(H-y)<1.6||Math.abs(H-E)<2||o.add(new Xr(V(.45,.7),0),a.hedge,H,x+.4,c/2+.6)}let[R,C]=o.pt(E,c/2+T-1.5);return{frame:o,driveway:[R,C],drivewayHeading:s+Math.PI,w:l,d:c,doorX:y,front:T}}residential(t,e,n){let s=this.M,r=(fe-Qn*2)/2,a=3,o=r*2/a,l=new Ge(t.x,t.z,0,t.B,this.world);for(let c of[1,-1]){let h=c>0?0:Math.PI;for(let u=0;u<a;u++){let d=-r+o*(u+.5),f=8.5,g=8.5,x=c*(r-g-f/2-1.8),m=e===0&&n===2&&c===1&&u===2,p=this.house(t,d,x,h,{d:f,front:g,floors:m?2:void 0,siding:m?s.siding[1]:void 0,doorX:m?1.5:void 0});m?this.ethanHouse={door:p.frame.pt(p.doorX,f/2+3.5),driveway:p.driveway,heading:p.drivewayHeading}:j()<.45&&this.parkedCars.push({x:p.driveway[0],z:p.driveway[1],heading:h+(j()<.5?0:Math.PI),type:Nt(["sedan","hatch","suv","pickup"])});let b=c*(r-.3),y=p.frame.pt(p.doorX,0)[0]-t.x,v=p.driveway[0]-t.x,T=[[y-1,y+1],[v-1.9,v+1.9]].sort((w,M)=>w[0]-M[0]),E=d-o/2+.2,R=d+o/2-.2,C=[];for(let[w,M]of T)w>E&&C.push([E,Math.min(w,R)]),E=Math.max(E,M);R>E&&C.push([E,R]);for(let[w,M]of C){if(M-w<.4)continue;let L=(w+M)/2,U=M-w;l.box(s.fence,L,I+.75,b,U,.08,.05,!1),l.box(s.fence,L,I+.35,b,U,.08,.05,!1);for(let N=w;N<=M;N+=.25)l.add(ne(.07,.95,.03),s.fence,N,I+.47,b);l.collide(L,0,b,U,1,.15)}j()<.8&&this.trees.push([t.x+d+V(-5,5),t.z+c*V(2.5,6),V(.9,1.4)])}}l.box(s.fenceWood,0,I,0,r*2,1.8,.08,!0,2);for(let c=1;c<a;c++){let h=-r+o*c;for(let u of[1,-1])l.box(s.fenceWood,h,I,u*5,.08,1.8,9,!0,2)}}building(t,e,n,s,r,a,o,l={}){var x,m;let c=this.M,h=3.2,u=I,d=a*h,f=c.facade[o],g=new Ge(...t.pt(e,n),0,t.B,this.world);g.box(f,0,u,0,s,d,r,!0,24,25.6),g.ao(0,0,s+((x=l.storefronts)!=null&&x.length?.6:0),r+((m=l.storefronts)!=null&&m.length?.6:0),1.8),g.box(c.concrete,0,u+d,0,s+.4,.3,r+.4,!1);for(let[p,b,y,v]of[[0,r/2,s,.3],[0,-r/2,s,.3],[s/2,0,.3,r],[-s/2,0,.3,r]])g.box(c.concrete,p,u+d+.3,b,y,.9,v,!1);g.box(c.metalDark,0,u+d+.05,0,s-.4,.05,r-.4,!1);for(let p=0;p<Math.floor(V(1,4));p++)g.box(c.metalLight,V(-s/3,s/3),u+d+.3,V(-r/3,r/3),V(1.2,2.5),V(.8,1.5),V(1.2,2.5),!1);if(j()<.4){let p=V(-s/4,s/4),b=V(-r/4,r/4);g.add(Fe(1.3,1.3,2.4,12),c.woodDark,p,u+d+3,b);for(let y of[[-1,-1],[1,-1],[-1,1],[1,1]])g.box(c.metalDark,p+y[0]*.9,u+d+.3,b+y[1]*.9,.12,1.6,.12,!1)}if(l.tower&&a>8){let p=Math.floor(V(3,7));g.box(f,0,u+d+.3,0,s*.6,p*h,r*.6,!0,24,25.6),g.box(c.concrete,0,u+d+.3+p*h,0,s*.6+.3,.4,r*.6+.3,!1),j()<.6&&g.add(Fe(.05,.08,8,6),c.metalDark,0,u+d+p*h+4.5,0)}for(let p of l.storefronts||[])this.storefront(g,s,r,p,l.names);return g}storefront(t,e,n,s,r){let a=this.M,o=I,l={s:Math.PI,n:0,e:Math.PI/2,w:-Math.PI/2}[s],c=s==="n"||s==="s"?e:n,h=s==="n"||s==="s"?n:e,u=new Ge(...t.pt(0,0),l,t.B,this.world),d=Math.max(1,Math.floor(c/9)),f=c/d;u.box(a.darkTrim,0,o,h/2+.15,c,3.8,.3,!1,2);for(let g=0;g<d;g++){let x=-c/2+f*(g+.5);u.add(ne(f-1.4,2.4,.05,f-1.4,2.4),a.shopWin,x,o+1.6,h/2+.32),u.add(ne(1,2.2,.05),a.glass,x+f/2-.55,o+1.1,h/2+.33),u.add(ne(f-.6,.08,1.6),Nt(a.awning),x,o+3.3,h/2+1,0,.3);let m=r&&r.length?r.shift():Nt(["Caf\xE9 Noir","Barbearia Sombra","Livraria Lua","\xD3tica Vis\xE3o","Pizzaria Napoli","Lavanderia","Joalheria Ouro","Banco Los Valles","Hotel Esperanza","Cinema Ritz","Tabacaria","Floricultura","Sapataria","Bar do M\xE1rio","Restaurante El Sol"]),p=cn(m,{bg:Nt(["#1a1a1a","#3b1414","#14283b","#2b2b10","#102b1a"]),fg:Nt(["#ffd27a","#ffffff","#ffb0b0","#b0e0ff"]),glow:!0,border:!1,w:512,h:96});u.add(ne(f-1,.75,.08,f-1,.75),p,x,o+4.2,h/2+.36)}}downtown(t){let e=(fe-Qn*2)/2-.5,n=V(-6,6),s=V(-6,6),r=2,a=[[-e,n-r/2,-e,s-r/2,"s","w"],[n+r/2,e,-e,s-r/2,"s","e"],[-e,n-r/2,s+r/2,e,"n","w"],[n+r/2,e,s+r/2,e,"n","e"]];for(let[o,l,c,h,u,d]of a){let f=l-o,g=h-c;this.building(t,(o+l)/2,(c+h)/2,f,g,Math.floor(V(5,15)),Nt(["brick","concrete","office","office","apartment","plaster"]),{storefronts:[u,d],tower:j()<.5})}}mixed(t){let e=this.M,n=(fe-Qn*2)/2-.5,s=3,r=(n*2-4)/s;for(let a=0;a<s;a++){let o=-n+r/2+a*(r+2);this.building(t,o,-n+7,r,14,Math.floor(V(2,5)),Nt(["brick","plaster","concrete","apartment"]),{storefronts:["s"]})}this.parkingLot(t,0,9,n*2-2,18,0),t.add(ee(n*2,6,4),e.grass,0,I+.01,-n+17);for(let a=0;a<5;a++)this.trees.push([t.x-n+4+a*12,t.z-n+17,V(.8,1.1)])}parkingLot(t,e,n,s,r,a){let o=this.M,l=new Ge(...t.pt(e,n),a,t.B,this.world);l.add(ee(s,r,3,5.5),o.parking,0,I+.008,0,Math.PI/2);let c=Math.floor(s/3);for(let h of[-1,1])for(let u=0;u<c;u++){if(j()<.62)continue;let d=-s/2+1.5+u*3,[f,g]=l.pt(d,h*(r/2-2.9));this.parkedCars.push({x:f,z:g,heading:a+(h>0?Math.PI:0)+(j()<.15?Math.PI:0),type:Nt(["sedan","hatch","suv","pickup","sedan","hatch","taxi"])})}for(let h of[-1,1]){l.add(Fe(.08,.1,7,8),o.metalDark,h*s/4,I+3.5,0),l.add(ne(1.6,.15,.4),o.metalDark,h*s/4,I+7,0),l.add(ne(1.4,.05,.3),o.lamp,h*s/4,I+6.92,0);{let[u,d]=l.pt(h*s/4,0);this.lamps.push([u,I+6.8,d])}t.B.add(ee(14,14),o.pool,l.m(h*s/4,I+.03,0)),l.collide(h*s/4,0,0,.3,7,.3)}}shopsBlock(t,e){let n=this.M,s=(fe-Qn*2)/2,r=e.length,a=(s*2-2)/r,o=13,l=4.2;for(let c=0;c<r;c++){let h=-s+1+a*(c+.5);this.shop(t,h,-s+o/2+.5,a-.6,o,l,e[c],Math.PI)}this.parkingLot(t,0,10,s*2-2,18,0),this.trees.push([t.x-s+2,t.z+s-2,1],[t.x+s-2,t.z+s-2,1.1])}shop(t,e,n,s,r,a,o,l){let c=this.M,h=I,u=.25,d=new Ge(...t.pt(e,n),l,t.B,this.world),f=Nt([c.facade.plaster,c.facade.brick,c.facade.concrete]);d.add(ee(s,r,2),c.interiorFloor,0,h+.02,0),d.box(c.concrete,0,h+a,0,s+.2,.4,r+.2,!0,2),d.ao(0,0,s,r,1.4),d.add(ee(s-.5,r-.5,4),c.interior,0,h+a-.01,0,0,Math.PI);for(let R=-1;R<=1;R+=2)d.add(ne(s*.5,.05,.4),c.ceilingLight,0,h+a-.05,R*r/4);d.box(f,0,h,-r/2+u/2,s,a,u,!0,24,25.6),d.box(c.interior,0,h,-r/2+u+.01,s-.6,a-.1,.02,!1);for(let R of[-1,1])d.box(f,R*(s/2-u/2),h,0,u,a,r,!0,24,25.6),d.box(c.interior,R*(s/2-u-.01),h,0,.02,a-.1,r-.6,!1);let g=1.8,x=(s-g)/2;for(let R of[-1,1]){let C=R*(g/2+x/2);d.box(c.darkTrim,C,h,r/2-.1,x,.6,.2,!1),d.add(ne(x,a-1.2,.04),c.glass,C,h+.6+(a-1.2)/2,r/2-.1),d.collide(C,0,r/2-.1,x,a,.3),d.box(c.darkTrim,R*(g/2),h,r/2-.1,.12,a,.22,!1)}d.box(c.darkTrim,0,h+a-.6,r/2-.1,s,.6,.22,!1);let m=cn(o,{bg:Nt(["#7a1616","#123a6a","#1d4a26","#3b2b12","#222"]),fg:"#fff",glow:!0,w:512,h:96});d.add(ne(s-.6,.9,.1,s-.6,.9),m,0,h+a+.65,r/2+.05),d.add(ne(s-.4,.08,1.4),Nt(c.awning),0,h+a-.75,r/2+.7,0,.25),d.box(c.woodDark,-s/4,h,-r/2+3,s/2,1.05,.8,!0,1),d.box(c.metalLight,-s/4,h+1.05,-r/2+3,s/2+.1,.05,.9,!1),d.box(c.metalDark,-s/4-.6,h+1.1,-r/2+3,.4,.3,.3,!1);for(let R=0;R<2;R++){let C=s/4+.4,w=-r/2+4.5+R*3.2,M=s/2-1.8;d.box(c.wood,C,h,w,M,1.8,.5,!0,1);for(let L=0;L<3;L++)for(let U=0;U<6;U++)d.add(ne(.25,.3,.25),Nt([c.red,c.blue,c.green,c.yellow,c.white]),C-M/2+.3+U*((M-.6)/5),h+.35+L*.6,w+.26)}d.box(c.wood,0,h,-r/2+.55,s-1,2.2,.5,!1,1);let[p,b]=d.pt(-s/4,-r/2+1.9);this.shopkeepers.push({x:p,z:b,heading:l,shop:o});let[y,v]=d.pt(0,r/2+1),[T,E]=d.pt(0,0);this.landmarks.push({name:o,x:y,z:v,kind:"shop",inside:[T,E]})}policeBlock(t){let e=this.M,n=(fe-Qn*2)/2,s=new Ge(t.x,t.z,0,t.B,this.world),r=34,a=16,o=7.4,l=n-a/2-6;s.box(e.facade.concrete,0,I,l,r,o,a,!0,24,25.6),s.ao(0,l,r,a,1.8),s.box(e.blue,0,I+3.2,l+a/2+.02,r,.5,.05,!1),s.box(e.concrete,0,I+o,l,r+.6,.5,a+.6,!1),s.box(e.concrete,0,I,l+a/2+2,10,.3,4,!1),s.box(e.concrete,0,I+4.2,l+a/2+2,10.4,.4,4.2,!1);for(let h of[-4.5,-1.6,1.6,4.5])s.box(e.white,h,I+.3,l+a/2+3.7,.5,3.9,.5,!0);s.box(e.glass,0,I+.3,l+a/2+.05,3,2.8,.05,!1),s.box(cn("DELEGACIA DE POL\xCDCIA",{bg:"#0e2a5c",fg:"#fff",glow:!0,w:1024,h:128}),0,I+4.7,l+a/2+4.12,9,.9,.08,!1,9,.9),s.box(cn("LOS VALLES",{bg:"#0e2a5c",fg:"#ffd27a",glow:!0,w:512,h:96}),0,I+5.8,l+a/2+.06,6,.9,.08,!1,6,.9),s.add(Fe(.06,.08,9,8),e.metalLight,r/2+3,I+4.5,l+a/2+5),s.add(new mn(1.8,1.1),e.flag,r/2+3.95,I+8.3,l+a/2+5),s.collide(r/2+3,0,l+a/2+5,.3,9,.3),this.landmarks.push({name:"Delegacia de Los Valles",x:t.x,z:t.z+l+a/2+6,kind:"police"}),this.policeSpot={x:t.x-3,z:t.z+l+a/2+7};let c=this.parkedCars.length;this.parkingLot(t,0,-10,n*2-2,16,0),this.parkedCars.slice(c,c+4).forEach(h=>{h.type="police"});for(let h=0;h<4;h++)this.npcs.push({kind:"police",x:t.x+V(-12,12),z:t.z+l+a/2+V(5,9)})}gasBlock(t){let e=this.M,n=(fe-Qn*2)/2,s=new Ge(t.x,t.z,0,t.B,this.world),r=-6;s.box(e.white,0,I+5,r,22,.8,12,!1),s.box(e.red,0,I+5.4,r,22.2,.3,12.2,!1),s.add(ne(20,.05,10),e.ceilingLight,0,I+4.98,r),t.B.add(ee(24,16),e.pool,s.m(0,I+.03,r));for(let a of[-7,0,7]){s.box(e.white,a,I,r,.6,5,.6,!0);for(let o of[-1,1])s.box(e.concrete,a,I,r+o*2.5,1.2,.25,3,!1),s.box(e.red,a,I+.25,r+o*2.5,.8,1.7,.5,!0),s.box(e.darkTrim,a,I+1.4,r+o*2.5+o*.26,.5,.35,.02,!1)}this.shop(t,0,16,18,12,4.2,"Conveni\xEAncia Posto Valles",Math.PI),s.add(Fe(.2,.25,8,8),e.metal,-n+3,I+4,-n+3),s.box(cn("POSTO VALLES",{bg:"#b02020",fg:"#fff",glow:!0,w:512,h:128}),-n+3,I+7,-n+3,3.2,1.6,.4,!1,3.2,1.6),s.box(cn("GASOLINA  5,89",{bg:"#111",fg:"#ffcc33",glow:!0,w:512,h:96}),-n+3,I+5.6,-n+3,3.2,.9,.42,!1,3.2,.9),s.collide(-n+3,0,-n+3,.5,8,.5),this.parkedCars.push({x:t.x+3.5,z:t.z+r+2.5,heading:Math.PI/2,type:"hatch"}),this.landmarks.push({name:"Posto Valles",x:t.x,z:t.z+r,kind:"gas"});for(let a=0;a<6;a++)this.trees.push([t.x+n-3,t.z-n+4+a*9,V(.8,1.1)])}parkingBlock(t){let e=this.M,n=(fe-Qn*2)/2;this.parkingLot(t,0,-13,n*2-2,26,0),this.parkingLot(t,0,14,n*2-2,24,0);let s=new Ge(t.x,t.z,0,t.B,this.world);s.box(e.facade.plaster,n-3,I,0,3,2.6,2.5,!0,24,25.6),s.box(e.red,n-3,I+2.6,0,3.4,.2,2.9,!1),s.box(cn("ESTACIONAMENTO",{bg:"#1b3d6e",glow:!0}),n-3,I+3.2,1.3,3,.6,.05,!1,3,.6),this.landmarks.push({name:"Estacionamento Central",x:t.x,z:t.z,kind:"parking"}),s.box(e.metal,-n+6,I,0,10,5,8,!0,2),s.ao(-n+6,0,10,8,1.4),s.box(e.darkTrim,-n+11.05,I,0,.1,3.6,5,!1),s.box(cn("OFICINA MEC\xC2NICA",{bg:"#202020",fg:"#ffcc33",glow:!0}),-n+11.1,I+4.2,0,.08,.7,6,!1,6,.7);{let[r,a]=s.pt(-n+15,0);this.landmarks.push({name:"Oficina Mec\xE2nica",x:r,z:a,kind:"oficina"})}}apartBlock(t){let e=this.M,n=(fe-Qn*2)/2-1;this.building(t,-n+9,0,16,n*2-6,Math.floor(V(5,8)),"apartment",{storefronts:["w"]}),this.building(t,n-9,-n/2-1,16,n-4,Math.floor(V(4,7)),Nt(["brick","plaster"]),{storefronts:["e","s"]}),this.building(t,n-9,n/2+1,16,n-4,Math.floor(V(4,7)),Nt(["brick","apartment"]),{storefronts:["e","n"]});let s=new Ge(t.x,t.z,0,t.B,this.world);for(let r=0;r<3;r++)this.trees.push([t.x+1,t.z-16+r*16,V(.9,1.2)]);for(let r=0;r<2;r++)this.bench(s,-2.5,-8+r*16,Math.PI/2)}hospitalBlock(t){let e=this.M,n=(fe-Qn*2)/2,s=new Ge(t.x,t.z,0,t.B,this.world),r=40,a=22,o=4*3.2,l=-n+a/2+4;s.box(e.facade.plaster,0,I,l,r,o,a,!0,24,25.6),s.ao(0,l,r,a,1.8),s.box(e.white,0,I+o,l,r+.6,.6,a+.6,!1),s.box(e.white,0,I+3.4,l-a/2-2.5,12,.35,5,!1);for(let u of[-5.5,5.5])s.box(e.white,u,I,l-a/2-4.6,.4,3.4,.4,!0);s.box(e.glass,0,I,l-a/2-.05,5,3,.06,!1),s.box(cn("HOSPITAL LOS VALLES",{bg:"#ffffff",fg:"#b01818",glow:!0,w:1024,h:128}),0,I+o-1.6,l-a/2-.08,14,1.4,.08,!1,14,1.4),s.box(e.red,0,I+o+1.2,l-a/2+.3,3,.8,.3,!1),s.box(e.red,0,I+o+.4,l-a/2+.3,.8,2.4,.3,!1),this.parkingLot(t,0,14,n*2-2,20,0);let[c,h]=s.pt(0,l-a/2-6);this.landmarks.push({name:"Hospital Los Valles",x:c,z:h,kind:"hospital"});for(let u=0;u<4;u++)this.trees.push([t.x-n+4+u*16,t.z-2,V(.8,1.1)])}bench(t,e,n,s){let r=this.M,a=new Ge(...t.pt(e,n),s,t.B,this.world);a.box(r.wood,0,I+.42,0,1.8,.06,.45,!1,1),a.box(r.wood,0,I+.65,-.22,1.8,.4,.05,!1,1);for(let o of[-.8,.8])a.box(r.metalDark,o,I,0,.06,.45,.45,!1);a.collide(0,0,0,1.9,.9,.6)}parkBlock(t){let e=this.M,n=(fe-Qn*2)/2,s=new Ge(t.x,t.z,0,t.B,this.world);s.add(ee(3,n*2,3),e.dirt,0,I+.012,0),s.add(ee(n*2,3,3),e.dirt,0,I+.012,0),s.add(Fe(4,4.2,.6,24),e.concrete,0,I+.3,0),s.add(Fe(3.7,3.7,.05,24),e.water,0,I+.52,0),s.add(Fe(.4,.6,1.8,10),e.concrete,0,I+.9,0),s.add(Fe(1.2,.8,.25,14),e.concrete,0,I+1.8,0),this.world.addCentered(t.x,0,t.z,8.2,.75,8.2);for(let[r,a,o]of[[8,4,0],[-8,-4,Math.PI],[4,-8,-Math.PI/2],[-4,8,Math.PI/2],[12,-4,0],[-12,4,Math.PI]])this.bench(s,r,a,o);for(let r=0;r<26;r++){let a=V(-n+2,n-2),o=V(-n+2,n-2);Math.abs(a)<3.5||Math.abs(o)<3.5||Math.hypot(a,o)<7||this.trees.push([t.x+a,t.z+o,V(.9,1.6)])}for(let r of[-1,1])s.box(e.hedge,r*(n-.6),I,-n/2-2,.9,1,n-6,!0,1),s.box(e.hedge,r*(n-.6),I,n/2+2,.9,1,n-6,!0,1);for(let[r,a]of[[2.5,14],[-2.5,-14],[14,-2.5],[-14,2.5]]){s.add(Fe(.06,.08,3.8,8),e.metalDark,r,I+1.9,a),s.add(new Ze(.28,10,8),e.lamp,r,I+3.9,a);{let[o,l]=s.pt(r,a);this.lamps.push([o,I+3.9,l])}t.B.add(ee(7,7),e.pool,s.m(r,I+.03,a)),s.collide(r,0,a,.25,4,.25)}this.landmarks.push({name:"Pra\xE7a",x:t.x,z:t.z,kind:"park"})}buildStreetParking(){for(let t=0;t<=he;t++)for(let e=0;e<he;e++){let n=wn(e);for(let s=-2;s<=2;s++){let r=n+s*9+V(-1,1);for(let a of[-1,1]){if(j()<.82)continue;let o=a<0?0:Math.PI;(t>0&&t<he||t===0&&a>0||t===he&&a<0)&&this.parkedCars.push({x:be(t)+a*Df,z:r,heading:o,type:Nt(["sedan","hatch","suv","sedan","pickup","taxi"])})}for(let a of[-1,1]){if(j()<.84)continue;let o=a>0?Math.PI/2:-Math.PI/2;(t>0&&t<he||t===0&&a>0||t===he&&a<0)&&this.parkedCars.push({x:r,z:be(t)+a*Df,heading:o,type:Nt(["sedan","hatch","suv","sedan","pickup"])})}}}}buildOutskirts(){let t=this.M,e=new ai,n=In,s=560;for(let[o,l,c,h]of[[0,(n+s)/2,2*s,s-n],[0,-(n+s)/2,2*s,s-n],[(n+s)/2,0,s-n,2*n],[-(n+s)/2,0,s-n,2*n]])e.add(ee(c,h,4),t.grass,ie(o,I,l));let r=new nn({color:4086316,flatShading:!0});r.userData.castShadow=!1;for(let o=0;o<26;o++){let l=o/26*Math.PI*2+V(-.1,.1),c=V(470,520),h=new os(V(60,110),V(40,90),7,1);e.add(h,r,ie(Math.cos(l)*c,0,Math.sin(l)*c))}e.flush(this.root);for(let o=0;o<420;o++){let l=j()*Math.PI*2,c=V(n+12,n+200),h=Math.cos(l)*c,u=Math.sin(l)*c;Math.abs(h)>440||Math.abs(u)>440||Lf(h,u,6)||Math.abs(h)<10||Math.abs(u)<10||Math.abs(u-76)<10||Math.abs(h-152)<10||Math.abs(h+76)<10||Math.abs(h+152)<10||this.trees.push([h,u,V(1,1.8),j()<.45])}let a=448;this.world.addBox(-a-2,0,-a,-a,50,a),this.world.addBox(a,0,-a,a+2,50,a),this.world.addBox(-a,0,-a-2,a,50,-a),this.world.addBox(-a,0,a,a,50,a+2)}buildTrees(){let t=this.trees.filter(y=>!y[3]),e=this.trees.filter(y=>y[3]),n=new ke(.12,.24,3.2,7);n.translate(0,1.6,0);let s=new Bi(n,this.M.bark,this.trees.length),r=Ef(),a=new nn({map:r,normalMap:Jr(r,3,"leaves")}),o=new Xr(1,2),l=o.attributes.position;for(let y=0;y<l.count;y++){let v=new D().fromBufferAttribute(l,y),T=1+Math.sin(v.x*5.1)*.07+Math.cos(v.y*4.3+v.z*3.7)*.07;l.setXYZ(y,v.x*T,v.y*T,v.z*T)}o.computeVertexNormals();let c=new Bi(o,a,Math.max(1,t.length*3)),h=[];for(let y=0;y<4;y++){let v=new os(1.5-y*.3,2.2,9);v.translate(0,2.4+y*1.25,0),h.push(v)}let u=Cn(h),d=new Bi(u,a,Math.max(1,e.length)),f=new Ht,g=new Ot,x=new en,m=0,p=0,b=0;for(let[y,v,T,E]of this.trees){let R=Uf(y,v);if(f.compose(new D(y,R,v),x.identity(),new D(T,T*V(.9,1.3),T)),s.setMatrixAt(p++,f),E)x.setFromAxisAngle(new D(0,1,0),j()*6),f.compose(new D(y,R,v),x,new D(T,T*V(1,1.4),T)),d.setMatrixAt(b,f),g.setHSL(V(.28,.36),V(.3,.45),V(.2,.28)),d.setColorAt(b++,g);else{let C=V(.2,.3);for(let w=0;w<3;w++){let M=V(-.8,.8)*T,L=V(-.8,.8)*T,U=(2.9+w*.9+V(-.3,.3))*T,N=T*V(1.3,2)*(w===2?.75:1);x.setFromEuler(new Xe(j(),j(),j())),f.compose(new D(y+M,R+U,v+L),x,new D(N,N*.85,N)),c.setMatrixAt(m,f),g.setHSL(C+V(-.02,.02),V(.4,.6),V(.32,.45)-w*.03*-1),c.setColorAt(m++,g)}}this.world.addCentered(y,0,v,.5*T,3,.5*T)}c.count=m,d.count=b;for(let y of[s,c,d])y.castShadow=!0,y.receiveShadow=!0,this.scene.add(y)}};var Uo=class{constructor(t,e,n){this.scene=t,this.world=e,this.city=n,this.M=Vi(),this.root=new ze,this.root.name="zonas",t.add(this.root),this.spots={}}F(t,e,n,s){return new Ge(t,e,n,s,this.world)}lamp(t,e,n){this.city.lamps.push([t,e,n])}build(){nr(4242);let t=new ai;this.roads(t),this.favela(t),this.prison(t),this.industrial(t),this.abandoned(t),this.mansion(t),this.hill(),this.fernando(t),this.investigator(),this.studio(),this.blackwood(t),t.flush(this.root)}roads(t){let e=this.M,n=I+.012,s=(r,a,o,l,c=8,h=e.asphalt)=>{let u=Math.hypot(o-r,l-a),d=Math.atan2(o-r,l-a);t.add(ee(c,u,6),h,ie((r+o)/2,n,(a+l)/2,d))};s(0,234,0,302),s(16,352,168,352,6,e.dirt),s(-234,76,-306,76),s(234,0,440,0,10),s(330,-75,330,75,9),s(300,-20,410,-20,8),s(300,22,410,22,8),s(-76,-234,-76,-314),s(152,-234,152,-320),s(80,-300,150,-300,4,e.dirt),s(-152,-234,-152,-296)}favela(t){let e=this.M,n=Vt.favela;t.add(ee(n.w,n.d,4),e.dirt,ie(n.x,I+.01,n.z));let s=[13214330,11887946,8034992,14205066,10123944,12105896,11037274,9087098],r=this.F(0,0,0,t);for(let g=0;g<40;g++){let x=n.x+V(-36,36),m=n.z+V(-26,26);if(Math.abs(x-Vt.hideout.x)<12&&Math.abs(m-Vt.hideout.z)<10||Math.abs(x)<5||Math.abs(m-352)<5)continue;let p=V(3.5,6),b=V(3.5,6),y=V(2.6,3.2)*(j()<.3?2:1),v=Nt(s);r.box(e.wall(v),x,I,m,p,y,b,!0,3,3),r.box(e.wall(8026744),x,I+y,m,p+.3,.15,b+.3,!1),r.box(e.woodDark,x,I,m+b/2+.02,.9,2,.05,!1,1),r.box(e.winDark,x+p/4,I+y-1.4,m+b/2+.02,.8,.7,.05,!1),r.ao(x,m,p,b,1),j()<.4&&r.box(e.corr(5929632),x,I+y+.15,m,1.2,1,1.2,!1,2)}let a=Vt.hideout,o=9,l=7,c=3.2,h=.2,u=this.F(a.x,a.z,0,t),d=e.wall(11575440);u.box(d,0,I,-l/2,o,c,h,!0,3),u.box(d,-o/2,I,0,h,c,l,!0,3),u.box(d,o/2,I,0,h,c,l,!0,3),u.box(d,-o/4-.6,I,l/2,o/2-1.2,c,h,!0,3),u.box(d,o/4+.6,I,l/2,o/2-1.2,c,h,!0,3),u.box(d,0,I+2.2,l/2,2.4,c-2.2,h,!1),u.box(e.wall(6974056),0,I+c,0,o+.4,.2,l+.4,!0),u.add(ee(o-.4,l-.4,2),e.tile,0,I+.02,0),u.add(ee(o-.6,l-.6,3),e.interior,0,I+c-.01,0,0,Math.PI),u.add(ne(1.2,.05,.4),e.ceilingLight,0,I+c-.05,0),u.box(e.woodDark,-1.5,I,-1.2,1.6,.78,.9,!0,1),u.box(e.metalDark,-1.5,I,-.2,.5,.45,.5,!1),u.box(e.metalDark,-1.5,I+.45,.05,.5,.5,.06,!1),u.box(e.wall(6969994),3,I,-2.2,2.2,.3,1.2,!1),u.box(e.woodDark,3.7,I,1.6,.6,1.9,1.4,!0,1),u.box(e.red,-1.2,I+.78,-1.3,.3,.1,.2,!1),this.spots.hideoutChair=u.pt(-1.5,-.2),this.spots.hideoutDoorIn=u.pt(0,l/2-1),this.spots.hideoutOut=u.pt(0,l/2+3),this.spots.hideoutCar=u.pt(4,l/2+6);{let[g,x]=u.pt(0,l/2+.6);this.lamp(g,I+2.6,x)}{let[g,x]=u.pt(0,0);this.lamp(g,I+c-.3,x)}for(let[g,x]of[[-20,312],[18,318],[-28,345],[10,348],[30,340],[60,352],[100,352],[140,352]])t.add(Fe(.06,.08,4.5,6),e.metalDark,ie(g,I+2.25,x)),t.add(new Ze(.22,8,6),e.lamp,ie(g,I+4.5,x)),this.lamp(g,I+4.4,x);let f=Vt.crashWall;t.add(ne(1.2,2.6,16,3),e.facade.brick,ie(f.x,I+1.3,f.z)),this.world.addCentered(f.x,0,f.z,1.2,2.6,16)}prison(t){let e=this.M,n=Vt.prison,s=n.w,r=n.d,a=7,o=this.F(n.x,n.z,0,t),l=e.wall(10131084);o.box(l,0,I,-r/2,s,a,1,!0,3),o.box(l,0,I,r/2,s,a,1,!0,3),o.box(l,-s/2,I,0,1,a,r,!0,3),o.box(l,s/2,I,-r/4-2.5,1,a,r/2-5,!0,3),o.box(l,s/2,I,r/4+2.5,1,a,r/2-5,!0,3),o.box(e.metalDark,s/2+.2,I,-4.4,.2,5,1.2,!1),o.box(e.metalDark,s/2+.2,I,4.4,.2,5,1.2,!1);for(let[c,h]of[[-1,-1],[1,-1],[-1,1],[1,1]]){o.box(l,c*s/2,I,h*r/2,3,11,3,!0,3),o.box(e.metalDark,c*s/2,I+11,h*r/2,3.6,.4,3.6,!1);let[u,d]=o.pt(c*s/2,h*r/2);this.lamp(u,I+11.5,d)}o.box(e.facade.concrete,-8,I,0,34,9.6,26,!0,24,25.6),o.ao(-8,0,34,26,1.6),o.box(cn("PENITENCI\xC1RIA ESTADUAL",{bg:"#2a2a2a",fg:"#e0e0e0",glow:!0,w:1024,h:128}),s/2+.6,I+5.5,0,.1,1,10,!1,10,1),o.add(ee(s-2,r-2,3),e.concreteFlat,0,I+.01,0),this.spots.prisonGateIn=o.pt(s/2-4,0),this.spots.prisonGateOut=o.pt(s/2+6,0),this.spots.prisonPickup=o.pt(s/2+14,2)}warehouse(t,e,n,s,r,a,o,l={}){let c=this.M,h=this.F(e,n,l.ry||0,t),u=c.corr(o),d=.3;if(l.interior){let f=l.door||8;h.box(u,0,I,-r/2,s,a,d,!0,2),h.box(u,0,I,r/2,s,a,d,!0,2),h.box(u,s/2,I,0,d,a,r,!0,2),h.box(u,-s/2,I,-(r/2+f/2)/2-f/4,d,a,(r-f)/2,!0,2),h.box(u,-s/2,I,(r/2+f/2)/2+f/4,d,a,(r-f)/2,!0,2),h.box(u,-s/2,I+5,0,d,a-5,f,!1,2),h.box(c.corr(6974058),0,I+a,0,s+.6,.3,r+.6,!0,2),h.add(ee(s-.6,r-.6,3),c.concreteFlat,0,I+.02,0);for(let g=-1;g<=1;g++)h.add(ne(2,.08,.6),c.ceilingLight,g*s/3.2,I+a-.1,0)}else h.box(u,0,I,0,s,a,r,!0,2),h.box(c.metalDark,-s/2-.02,I,0,.05,4.5,Math.min(6,r-2),!1),h.box(c.corr(6974058),0,I+a,0,s+.6,.3,r+.6,!1,2);return h.ao(0,0,s,r,2),h}industrial(t){let e=this.M,n=Vt.industrial;t.add(ee(n.w,n.d,3),e.concrete,ie(n.x+5,I+.004,n.z)),this.warehouse(t,305,-55,18,26,9,9083560),this.warehouse(t,305,50,18,30,10,11051152),this.warehouse(t,395,-55,22,26,10,8030842),this.warehouse(t,398,52,20,24,9,10127994),this.warehouse(t,365,-55,18,18,7,9067082);let s=Vt.galpao,r=this.warehouse(t,s.x+2,s.z,30,20,9,6971480,{interior:!0,door:8});for(let[h,u]of[[4,-5],[4,5],[10,0]]){r.box(e.woodDark,h,I,u,2.4,.8,1.2,!0,1);for(let d=0;d<4;d++)r.box(e.green,h-.8+d*.5,I+.8,u-.2,.4,.12+j()*.2,.25,!1);for(let d=0;d<3;d++)r.box(e.white,h-.6+d*.6,I+.8,u+.3,.45,.15,.3,!1)}for(let h=0;h<10;h++)r.box(e.wood,V(-12,12),I,Nt([-8.5,8.5])+V(-.5,.5),1.2,1.2,1.2,!0,1);for(let h of[-9,0,9]){let[u,d]=r.pt(h,0);this.lamp(u,I+8.4,d)}this.spots.galpaoDoor=r.pt(-19,0),this.spots.galpaoInside=r.pt(-4,0),this.spots.galpaoBack=r.pt(12,-6),this.spots.galpaoCarSpot=r.pt(-24,6);let a=[11024938,2775690,3832394,13146666,6974058];for(let h=0;h<14;h++){let u=Nt([318,342,375,388])+V(-3,3),d=V(-10,12)+(h%2?-50:0)+(h%3?0:75);if(Math.abs(u-330)<8||Math.abs(d+20)<7||Math.abs(d-22)<7||Math.abs(d)<7||u>345&&u<380&&d>35&&d<62)continue;let f=j()<.5?0:Math.PI/2,g=this.F(u,d,f,t),x=1+Math.floor(j()*2);for(let m=0;m<x;m++)g.box(e.corr(Nt(a)),0,I+m*2.6,0,2.4,2.6,6,m===0,2);g.ao(0,0,2.4,6,1)}for(let[h,u]of[[300,-75],[300,75],[410,-75],[410,75]])t.add(Fe(.1,.12,8,6),e.metalDark,ie(h,I+4,u)),this.lamp(h,I+8,u);for(let[h,u]of[[330,-40],[330,40],[360,-20],[360,22],[395,-20],[395,22],[345,30]])t.add(Fe(.08,.1,7,6),e.metalDark,ie(h+5,I+3.5,u+4)),this.lamp(h+5,I+7,u+4),this.world.addCentered(h+5,0,u+4,.3,7,.3);let o=(h,u,d,f)=>{let g=Math.hypot(d-h,f-u),x=Math.atan2(d-h,f-u);t.add(ne(.06,2.2,g),e.metalLight,ie((h+d)/2,I+1.1,(u+f)/2,x)),this.world.addBox(Math.min(h,d)-.1,0,Math.min(u,f)-.1,Math.max(h,d)+.1,2.2,Math.max(u,f)+.1)};o(296,-78,296,-6),o(296,6,296,78),o(296,78,414,78),o(296,-78,414,-78),o(414,-78,414,-6),o(414,6,414,78);let l=Vt.bookTable,c=this.F(l.x,l.z,0,t);c.box(e.corr(3815994),0,I+2.6,0,6,.15,4,!1);for(let[h,u]of[[-2.8,-1.8],[2.8,-1.8],[-2.8,1.8],[2.8,1.8]])c.box(e.metalDark,h,I,u,.12,2.6,.12,!1);c.box(e.woodDark,0,I,0,2,.8,1,!0,1),c.box(e.red,.3,I+.8,0,.35,.08,.25,!1),c.box(cn("PROPRIEDADE PRIVADA",{bg:"#7a1010",fg:"#fff"}),-6,I+1.4,3,2.4,.5,.05,!1,2.4,.5),c.box(e.metalDark,-6,I,3,.08,1.4,.08,!1),this.spots.book=[l.x+.3,l.z],this.spots.rivalCenter=[Vt.rivalTerritory.x,Vt.rivalTerritory.z],this.spots.victorCar=[345,-30]}abandoned(t){let e=this.M,n=Vt.abandoned,s=11,r=9,a=3.1,o=.22;t.add(ee(n.w,n.d,4),e.dirt,ie(n.x,I+.008,n.z));let l=this.F(n.x,n.z,0,t),c=e.siding[0].mat?{isPaint:!0,mat:e.siding[0].mat,color:6972504}:e.wall(6972504);l.box(c,0,I,-r/2,s,a,o,!0,3),l.box(c,-s/2,I,0,o,a,r,!0,3),l.box(c,s/2,I,0,o,a,r,!0,3),l.box(c,-s/4-.5,I,r/2,s/2-1,a,o,!0,3),l.box(c,s/4+.5,I,r/2,s/2-1,a,o,!0,3),l.box(c,0,I+2.2,r/2,2,a-2.2,o,!1),l.add(er(s,r,1.8,.4),e.roof[1],0,I+a,0),l.box(e.woodDark,0,I+a-.1,0,s,.1,r,!0,1);for(let h of[-3.5,3.5])l.box(e.woodDark,h,I+1.2,r/2+.05,1.3,.12,.05,!1,1),l.box(e.woodDark,h,I+1.6,r/2+.05,1.3,.12,.05,!1,1);l.add(ee(s-.5,r-.5,2),(e.woodDark.mat,e.dirt),0,I+.015,0);for(let h=0;h<6;h++)l.box(e.wood,V(-4,4),I,V(-3,3),V(.4,1.6),.15,V(.2,.5),!1,1);l.ao(0,0,s,r,1.5),this.spots.abandonedInside=l.pt(0,0),this.spots.abandonedFront=l.pt(0,r/2+6);for(let h=0;h<8;h++)this.city.trees.push([n.x+V(-18,18),n.z+V(-16,-8),V(1,1.6),j()<.3])}mansion(t){let e=this.M,n=Vt.mansion,s=n.w,r=n.d,a=this.F(n.x,n.z,0,t);t.add(ee(s,r,4),e.grass,ie(n.x,I+.008,n.z));let o=e.wall(14735560),l=3;a.box(o,0,I,-r/2,s,l,.5,!0,3),a.box(o,-s/2,I,0,.5,l,r,!0,3),a.box(o,s/2,I,0,.5,l,r,!0,3),a.box(o,-s/4-2,I,r/2,s/2-4,l,.5,!0,3),a.box(o,s/4+2,I,r/2,s/2-4,l,.5,!0,3);for(let T of[-4.2,4.2]){a.box(o,T,I,r/2,.9,3.6,.9,!0,3);let[E,R]=a.pt(T,r/2+.6);this.lamp(E,I+3.8,R)}let c=0,h=-8,u=30,d=16,f=3.6,g=.3,x=e.facade.plaster,m=this.F(n.x+c,n.z+h,0,t);m.box(x,0,I,-d/2,u,f*2,g,!0,24,25.6),m.box(x,u/2,I,0,g,f*2,d,!0,24,25.6),m.box(x,-u/2,I,0,g,f,d,!0,24,25.6),m.box(x,-u/2,I+f,-d/4-1.5,g,f,d/2-3,!0,24,25.6),m.box(x,-u/2,I+f,d/4+1.5,g,f,d/2-3,!0,24,25.6),m.box(x,-u/2,I+f,0,g,.9,3,!1,24,25.6),m.box(x,-u/2,I+f+2.9,0,g,.7,3,!1,24,25.6),m.add(ne(.04,2,3),e.glass,-u/2,I+f+1.9,0),m.box(x,-u/4-.75,I,d/2,u/2-1.5,f*2,g,!0,24,25.6),m.box(x,u/4+.75,I,d/2,u/2-1.5,f*2,g,!0,24,25.6),m.box(x,0,I+3,d/2,3,f*2-3,g,!1,24,25.6),m.box(e.concrete,0,I+f,0,u,.3,d,!0,2),m.box(e.concrete,0,I+f*2,0,u+1,.4,d+1,!0,2),m.box(e.white,0,I+f*2+.4,0,u+1.2,.6,d+1.2,!1),m.add(ee(u-.6,d-.6,2),e.tile,0,I+.02,0),m.add(ee(u-.6,d-.6,3),e.interior,0,I+f-.01,0,0,Math.PI);for(let T of[-8,0,8]){m.add(ne(1.6,.06,1.6),e.ceilingLight,T,I+f-.06,0);let[E,R]=m.pt(T,0);this.lamp(E,I+f-.3,R)}m.box(e.ceilingLight,-u/2+3.2,I+f+.3,0,.1,3,5,!1),m.add(ee(5,5,2),e.ceilingLight,-u/2+3,I+f*2-.05,0,0,Math.PI),m.box(e.ceilingLight,-u/2+3,I+f+.3,-2.5,5.4,3,.1,!1),m.box(e.ceilingLight,-u/2+3,I+f+.3,2.5,5.4,3,.1,!1),m.box(e.woodDark,-6,I,-3,3,.8,1.4,!0,1),m.box(e.wall(8006186),5,I,-4.5,5,.8,1.6,!0,3),m.box(e.metalLight,9,I,3,1.2,1.2,1.2,!0,1);for(let T of[-2.6,2.6])m.box(e.white,T,I,d/2+2.4,.6,f*2,.6,!0);m.box(e.white,0,I+f*2-.5,d/2+2.2,7,.5,4.6,!1),m.ao(0,0,u,d,2);let p=u/2+6,b=10,y=12;m.box(x,p,I,-y/2+2,b,3.6,g,!0,24,25.6),m.box(x,p+b/2,I,2,g,3.6,y,!0,24,25.6),m.box(e.concrete,p,I+3.6,2,b+.4,.3,y+.4,!0,2),this.spots.garageCar=m.pt(p,2),a.box(e.white,-16,I,16,14,.25,7,!1),a.add(ee(13,6),e.water,-16,I+.27,16);{let[T,E]=a.pt(-16,16);this.world.addCentered(T,0,E,14,.7,7)}for(let[T,E]of[[-30,-24],[-30,20],[30,20],[-20,4],[20,18],[28,-26]])this.city.trees.push([n.x+T,n.z+E,V(1,1.4),j()<.5]);for(let[T,E]of[[-10,22],[10,22],[-30,0],[30,0],[0,10]]){a.add(Fe(.06,.08,3.4,6),e.metalDark,T,I+1.7,E),a.add(new Ze(.25,8,6),e.lamp,T,I+3.5,E);let[R,C]=a.pt(T,E);this.lamp(R,I+3.5,C)}let v=this.spots;v.mansionGate=a.pt(0,r/2+4),v.mansionApproach=a.pt(-8,r/2+14),v.mansionDoor=m.pt(0,d/2+1),v.mansionHall=m.pt(0,2),v.lucasHall=m.pt(0,-4),v.brotherWindow=[n.x+c-u/2+1.6,I+f+.3,n.z+h],v.mansionCarOut=a.pt(-6,r/2+10),v.guardRoutes=[[a.pt(-30,24),a.pt(-30,-24)],[a.pt(30,24),a.pt(30,-24)],[a.pt(-20,22),a.pt(20,22)],[a.pt(-25,-26),a.pt(25,-26)],[a.pt(-6,12),a.pt(6,12)],[a.pt(-34,0),a.pt(-20,8)],[a.pt(31,12),a.pt(34,-12)]]}hill(){let t=Vt.hill,e=new mn(t.r*2,t.r*2,36,36);e.rotateX(-Math.PI/2);let n=e.attributes.position;for(let a=0;a<n.count;a++){let o=n.getX(a)+t.x,l=n.getZ(a)+t.z;n.setY(a,I+Do(o,l)+.02)}let s=e.attributes.uv;for(let a=0;a<s.count;a++)s.setXY(a,s.getX(a)*t.r/2,s.getY(a)*t.r/2);e.computeVertexNormals();let r=new $t(e,this.M.grass);r.position.set(t.x,0,t.z),r.receiveShadow=!0,this.root.add(r),this.spots.hillTop=[t.x+14,t.z-2];for(let a=0;a<10;a++){let o=j()*6.28,l=V(18,40);this.city.trees.push([t.x+Math.cos(o)*l,t.z+Math.sin(o)*l,V(1,1.5),j()<.6])}}fernando(t){let e=this.M,n=Vt.fernando,s=14,r=10,a=3,o=.2;t.add(ee(n.w,n.d,4),e.grass,ie(n.x,I+.008,n.z));let l=this.F(n.x,n.z,0,t),c=e.siding[3];l.box(c,0,I,-r/2,s,a,o,!0,3),l.box(c,-s/2,I,0,o,a,r,!0,3),l.box(c,s/2,I,0,o,a,r,!0,3),l.box(c,-s/4-.6,I,r/2,s/2-1.2,a,o,!0,3),l.box(c,s/4+.6,I,r/2,s/2-1.2,a,o,!0,3),l.box(c,0,I+2.2,r/2,2.4,a-2.2,o,!1),l.box(e.interior,-1.5,I,-1,s/2-2,a,.15,!0,2),l.box(e.interior,s/2-2,I,-1,4,a,.15,!0,2),l.add(er(s,r,1.6,.4),e.roof[2],0,I+a,0),l.box(e.interior,0,I+a-.05,0,s,.1,r,!0,2),l.add(ee(s-.4,r-.4,2),e.tile,0,I+.02,0),l.box(e.woodDark,3,I,-3.3,2,.45,2.4,!0,1),l.box(e.white,3,I+.45,-3.3,1.9,.15,2.3,!1),l.box(e.white,3,I+.6,-4.2,1.2,.15,.45,!1),l.box(e.woodDark,.8,I,-4.4,.6,.6,.5,!1,1),l.box(e.wall(5917242),-3.5,I,2.5,3,.8,1,!0,3),l.box(e.metalDark,-3.5,I,4.3,1.8,.9,.4,!1),l.ao(0,0,s,r,1.5);let h=this.spots;h.fernandoBed=l.pt(3,-3.4),h.fernandoBedHead=l.pt(3,-4.3),h.fernandoFront=l.pt(0,r/2+8),h.fernandoDoor=l.pt(0,r/2+.5),h.fernandoCams=[{p:l.pt(-s/2-.3,r/2+.3),y:I+2.8,yaw:.6,sweep:.7},{p:l.pt(s/2+.3,r/2+.3),y:I+2.8,yaw:-.6,sweep:.7},{p:l.pt(s/2+.3,-r/2-.3),y:I+2.8,yaw:-2.2,sweep:.6},{p:l.pt(-s/2+.4,r/2-.4),y:I+2.6,yaw:2.4,sweep:.8,inside:!0}],this.city.trees.push([n.x-14,n.z+10,1.2,!1],[n.x+15,n.z-8,1.3,!0])}investigator(){let t=this.M,e=Vt.investigatorRoom,n=new ai,s=7,r=6,a=3,o=(f,g,x,m,p,b,y)=>n.add(ne(m,p,b,2),y,ie(e.x+f,e.y+g,e.z+x)),l=t.wall(4870232);o(0,-.1,0,s,.2,r,t.woodDark),o(0,a,0,s,.2,r,l),o(-s/2,a/2,0,.2,a,r,l),o(s/2,a/2,0,.2,a,r,l),o(0,a/2,-r/2,s,a,.2,l),o(0,a/2,r/2,s,a,.2,l),o(0,.38,-1,2.4,.76,1.2,t.woodDark),o(.9,.85,-1.2,.15,.2,.15,t.metalDark),o(.9,1,-1.2,.35,.18,.35,t.ceilingLight),o(0,1.6,-r/2+.12,3.2,1.6,.05,t.wood),n.flush(this.root);let c=new Ae({color:16777215}),h=new $t(new mn(.42,.3).rotateX(-Math.PI/2),c);h.position.set(e.x-.2,e.y+.77,e.z-.9),h.rotation.y=.08,this.root.add(h),this.investigatorPhoto=c;let u=new Ae({color:14209216});for(let f=0;f<6;f++){let g=new $t(new mn(.4,.3),u);g.position.set(e.x-1.2+f%3*1.2,e.y+1.25+Math.floor(f/3)*.6,e.z-r/2+.16),g.rotation.z=V(-.1,.1),this.root.add(g)}let d=new js(16767136,0,7,2);d.position.set(e.x+.9,e.y+1.2,e.z-1.1),this.root.add(d),this.investigatorLamp=d,this.spots.invChair=[e.x,e.y,e.z-.1],this.spots.invCam=[e.x+1.6,e.y+1.7,e.z+1.8],this.spots.invLook=[e.x-.2,e.y+.8,e.z-.9]}studio(){let t=Vt.studio,e=new $t(new mn(10,6),new nn({map:Io("brick").map,color:11577504}));e.position.set(t.x,t.y+2,t.z-2),this.root.add(e);let n=new $t(new mn(10,8).rotateX(-Math.PI/2),new nn({map:jr()}));n.position.set(t.x,t.y,t.z+1),this.root.add(n)}blackwood(t){let e=this.M,n=Vt.blackwoodGate;t.add(ne(1,4,.3,1,4),cn("BLACKWOOD",{bg:"#1a1a20",fg:"#c8c0a8",glow:!0}),ie(n.x-4,I+4,-8)),t.add(Fe(.1,.1,4,6),e.metalDark,ie(n.x-4,I+2,-8));let s=new ze,r=new $t(new kt(.6,1.2,12),new nn({color:13148192}));r.position.set(n.x,I+.6,0),s.add(r);let a=new $t(new kt(.1,.8,4),new nn({map:Cf("ACESSO BLOQUEADO",{bg:"#8a1010",fg:"#fff",w:512,h:96})}));a.position.set(n.x-.4,I+1.8,0),s.add(a),this.root.add(s),this.blackwoodBarrier=s,this.blackwoodBox=this.world.addCentered(n.x,0,0,1,4,14),this.world.addBox(n.x-.5,0,-40,n.x+.5,6,-7),this.world.addBox(n.x-.5,0,7,n.x+.5,6,40)}unlockBlackwood(){this.blackwoodBarrier.visible&&(this.blackwoodBarrier.visible=!1,this.world.disableBox(this.blackwoodBox))}};var b_=new nn({vertexColors:!0});function w_(i,t,e,n){let s=i.index?i.toNonIndexed():i;s===i&&(s=i.clone());for(let l of Object.keys(s.attributes))["position","normal"].includes(l)||s.deleteAttribute(l);s.applyMatrix4(e),$r(s,t);let r=s.attributes.position.count,a=new Uint16Array(r*4),o=new Float32Array(r*4);for(let l=0;l<r;l++)a[l*4]=n,o[l*4]=1;return s.setAttribute("skinIndex",new Oe(a,4)),s.setAttribute("skinWeight",new Oe(o,4)),s}var E_=(i=0,t=0,e=0,n=1,s=1,r=1,a=0,o=0,l=0)=>new Ht().compose(new D(i,t,e),new en().setFromEuler(new Xe(a,o,l)),new D(n,s,r)),ta=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n)),S_={skin:13011556,hair:2825492,shirt:3426654,pants:2895672,shoes:1907997,jacket:null,hairStyle:"short",height:1,build:1,hat:null,beard:!1,badge:!1,tie:null},Si=class{constructor(t={}){var nt,q,rt,dt,bt,Ft;this.look={...S_,...t};let e=this.look;this.root=new ze,this.root.name="humanoid",this.bones={};let n=(Rt,$,et,mt,ot)=>{let Ct=new Or;return Ct.name=Rt,Ct.position.set(et,mt,ot),$&&$.add(Ct),this.bones[Rt]=Ct,Ct},s=e.build,r=n("hips",null,0,.98,0),a=n("spine",r,0,.12,0),o=n("chest",a,0,.22,0),l=n("neck",o,0,.24,0),c=n("head",l,0,.08,0),h=n("shoulderL",o,.19*s,.18,0),u=n("shoulderR",o,-.19*s,.18,0),d=n("elbowL",h,0,-.29,0),f=n("elbowR",u,0,-.29,0),g=n("handL",d,0,-.27,0),x=n("handR",f,0,-.27,0),m=n("thighL",r,.1*s,-.04,0),p=n("thighR",r,-.1*s,-.04,0),b=n("kneeL",m,0,-.44,0),y=n("kneeR",p,0,-.44,0),v=n("footL",b,0,-.44,0),T=n("footR",y,0,-.44,0),E=Object.values(this.bones);r.updateMatrixWorld(!0);let R=Rt=>E.indexOf(Rt),C=[],w=Rt=>new D().setFromMatrixPosition(Rt.matrixWorld),M=(Rt,$,et,mt=0,ot=0,Ct=0,Gt=1,Bt=1,oe=1,Q=0,lt=0,z=0)=>{let Pt=w(Rt);C.push(w_($,et,E_(Pt.x+mt,Pt.y+ot,Pt.z+Ct,Gt,Bt,oe,Q,lt,z),R(Rt)))},L=(nt=e.jacket)!=null?nt:e.shirt,U=(Rt,$)=>new mo(Rt,$,4,12),N=Rt=>new Ze(Rt,16,12),k=(Rt,$,et)=>new kt(Rt,$,et);M(r,U(.15*s,.08),e.pants,0,-.02,0,1.15,1,.75,0,0,Math.PI/2),M(r,new ke(.165*s,.165*s,.05,12),2234900,0,.06,0,1.05,1,.72),M(a,U(.15*s,.12),L,0,.08,0,1.15,1,.75),M(o,U(.18*s,.12),L,0,.1,0,1.12,1,.72),e.jacket&&(M(o,k(.1,.4,.02),e.shirt,0,.02,.135),M(o,new Ei(.085,.03,6,12),e.jacket,0,.27,0,1,1,1,Math.PI/2)),e.tie&&M(o,k(.05,.24,.02),e.tie,0,.1,.14),e.badge&&M(o,k(.05,.06,.02),13938487,.09,.17,.135),M(l,new ke(.055,.06,.1,8),e.skin,0,.02,0),M(c,N(.115),e.skin,0,.11,.005,.92,1.08,1),M(c,N(.03),e.skin,0,.1,.11,.8,1,.9),M(c,N(.016),16119285,.042,.135,.095),M(c,N(.016),16119285,-.042,.135,.095),M(c,N(.009),1710618,.042,.135,.108),M(c,N(.009),1710618,-.042,.135,.108),M(c,k(.04,.008,.01),e.hair,.042,.163,.1),M(c,k(.04,.008,.01),e.hair,-.042,.163,.1),M(c,k(.045,.008,.01),9062976,0,.055,.105),M(c,N(.025),e.skin,.108,.11,0,.5,1,.8),M(c,N(.025),e.skin,-.108,.11,0,.5,1,.8),e.beard&&M(c,N(.1),e.hair,0,.06,.03,.95,.6,.85),e.hairStyle==="short"?M(c,new Ze(.122,12,8,0,Math.PI*2,0,Math.PI*.55),e.hair,0,.125,-.008,.95,1.05,1.05,-.2):e.hairStyle==="long"?(M(c,new Ze(.125,12,8,0,Math.PI*2,0,Math.PI*.6),e.hair,0,.125,-.01,.97,1.05,1.05,-.15),M(c,k(.22,.26,.06),e.hair,0,0,-.08)):e.hairStyle==="bun"?(M(c,new Ze(.122,12,8,0,Math.PI*2,0,Math.PI*.55),e.hair,0,.125,-.008,.95,1.05,1.05,-.2),M(c,N(.06),e.hair,0,.2,-.1)):e.hairStyle,e.hat==="police"?(M(c,new ke(.13,.125,.08,14),(q=e.hatColor)!=null?q:1780298,0,.225,0),M(c,new ke(.14,.14,.015,14),1118481,0,.19,.03,1,1,1.15),M(c,k(.04,.035,.01),13938487,0,.23,.128)):e.hat==="hood"?(M(c,new Ze(.15,14,10,0,Math.PI*2,0,Math.PI*.62),(rt=e.hatColor)!=null?rt:1118484,0,.12,-.02,1,1.1,1.1,-.35),M(l,new ke(.12,.16,.14,12),(dt=e.hatColor)!=null?dt:1118484,0,0,-.02)):e.hat==="cap"&&(M(c,new Ze(.125,12,8,0,Math.PI*2,0,Math.PI*.5),(bt=e.hatColor)!=null?bt:11149858,0,.14,0),M(c,k(.16,.012,.1),(Ft=e.hatColor)!=null?Ft:11149858,0,.15,.13));for(let[Rt,$,et,mt]of[[h,d,g,1],[u,f,x,-1]])M(Rt,N(.07*s),L,0,0,0),M(Rt,U(.052*s,.2),L,0,-.145,0),M($,U(.045*s,.19),e.jacket?e.jacket:e.longSleeve?e.shirt:e.skin,0,-.13,0),M(et,N(.05),e.skin,0,-.04,.005,.75,1.15,.9),M(et,N(.022),e.skin,.028*mt,-.02,.03);for(let[Rt,$,et]of[[m,b,v],[p,y,T]])M(Rt,U(.075*s,.32),e.pants,0,-.21,0),M($,U(.06*s,.33),e.pants,0,-.21,0),M(et,k(.1,.07,.25),e.shoes,0,-.02,.05),M(et,k(.105,.02,.26),921102,0,-.055,.05);let W=Cn(C,!1);C.forEach(Rt=>Rt.dispose()),W.computeBoundingSphere(),W.boundingSphere.radius=1.4,W.boundingSphere.center.set(0,.9,0);let H=new oo(W,b_);H.add(r),H.bind(new co(E)),H.castShadow=!0,H.frustumCulled=!0,this.mesh=H,this.root.add(H),this.root.scale.setScalar(e.height),this.rest={};for(let[Rt,$]of Object.entries(this.bones))this.rest[Rt]=$.position.clone();this.cur={};for(let Rt of Object.keys(this.bones))this.cur[Rt]=new D;this.hipY=0,this.hipZ=0,this.phase=0,this.idleT=Math.random()*10,this.landT=0,this.lookYaw=0,this.punchT=0,this.root.rotation.order="YXZ"}punch(){this.punchT=.35}update(t,e){let n={};for(let c of Object.keys(this.bones))n[c]=[0,0,0];let s=e.speed||0;this.idleT+=t;let r=0,a=0,o=12;if(e.mode==="chair")n.thighL=[-1.5,0,.08],n.thighR=[-1.5,0,-.08],n.kneeL=[1.5,0,0],n.kneeR=[1.5,0,0],n.shoulderL=[-.5,0,.1],n.shoulderR=[-.5,0,-.1],n.elbowL=[-.9,0,0],n.elbowR=[-.9,0,0],n.spine=[.1,0,0],n.head=[.15+Math.sin(this.idleT*.5)*.04,0,0],r=-.46,a=-.05;else if(e.mode==="lie")n.thighL=[0,0,.12],n.thighR=[0,0,-.12],n.kneeL=[.15,0,0],n.kneeR=[.25,0,0],n.shoulderL=[0,0,.35],n.shoulderR=[0,0,-.35],n.elbowL=[-.3,0,0],n.elbowR=[-.2,0,0],n.head=[0,.4,0];else if(e.mode==="handsup")n.shoulderL=[-2.9,0,.35],n.shoulderR=[-2.9,0,-.35],n.elbowL=[-.5,0,0],n.elbowR=[-.5,0,0],n.spine=[.08,0,0],n.head=[.1+Math.sin(this.idleT*6)*.03,0,0],n.kneeL=[.15,0,0],n.kneeR=[.15,0,0];else if(e.mode==="binoculars")n.shoulderL=[-1.45,0,-.45],n.shoulderR=[-1.45,0,.45],n.elbowL=[-1.9,0,0],n.elbowR=[-1.9,0,0],n.head=[-.05,0,0];else if(e.mode==="sit")n.thighL=[-1.45,0,.05],n.thighR=[-1.45,0,-.05],n.kneeL=[1.2,0,0],n.kneeR=[1.2,0,0],n.footL=[.05,0,0],n.footR=[.05,0,0],n.shoulderL=[-.95,0,.12+(e.steer||0)*.25],n.shoulderR=[-.95,0,-.12+(e.steer||0)*.25],n.elbowL=[-.55,0,0],n.elbowR=[-.55,0,0],n.spine=[-.08,0,0],n.head=[.05,-(e.steer||0)*.25,0],r=-.42,a=-.05;else if(e.grounded)if(e.crouch){let c=Math.min(1,s/.8);this.phase+=s/1.1*Math.PI*2*t;let h=Math.sin(this.phase);n.thighL=[-1-h*.3*c,0,.1],n.thighR=[-1+h*.3*c,0,-.1],n.kneeL=[1.7,0,0],n.kneeR=[1.7,0,0],n.footL=[-.5,0,0],n.footR=[-.5,0,0],n.spine=[.45,0,0],n.head=[-.3,0,0],n.shoulderL=[-.5,0,.2],n.shoulderR=[-.5,0,-.2],n.elbowL=[-1.2,0,0],n.elbowR=[-1.2,0,0],r=-.42}else{let c=Ve.smoothstep(s,2.6,5.2),h=Math.min(1,s/1),u=Ve.lerp(1.45,2.7,c);this.phase+=s/u*Math.PI*2*t;let d=this.phase,f=Math.sin(d),g=Math.sin(d+Math.PI),x=Ve.lerp(.42,.85,c)*h,m=Ve.lerp(.32,.75,c)*h;n.thighL=[-f*x-c*.15,0,.03],n.thighR=[-g*x-c*.15,0,-.03];let p=(T,E)=>(Math.max(0,Math.cos(E-.3))*Ve.lerp(.75,1.6,c)+.08)*h;n.kneeL=[p(f,d),0,0],n.kneeR=[p(g,d+Math.PI),0,0],n.footL=[Math.max(0,-f)*.3*h-.05*h,0,0],n.footR=[Math.max(0,-g)*.3*h-.05*h,0,0],n.shoulderL=[f*m,0,.08+c*.08],n.shoulderR=[g*m,0,-.08-c*.08],n.elbowL=[-(Ve.lerp(.25,1.35,c)*h+.12)-Math.max(0,f)*.2*h,0,0],n.elbowR=[-(Ve.lerp(.25,1.35,c)*h+.12)-Math.max(0,g)*.2*h,0,0];let b=c*.22+Ve.clamp((e.accel||0)*.03,-.12,.15);n.spine=[b,Math.sin(d)*.08*h,-(e.turn||0)*.06],n.chest=[0,-Math.sin(d)*.12*h,0],n.hips=[0,Math.sin(d)*.1*h,-(e.turn||0)*.05],r=-Math.abs(Math.cos(d))*Ve.lerp(.03,.07,c)*h+.01*h-c*.04;let y=1-h,v=Math.sin(this.idleT*1.6);if(n.chest[0]+=v*.02*y,n.shoulderL[2]+=(.06+v*.01)*y,n.shoulderR[2]-=(.06+v*.01)*y,n.elbowL[0]-=.1*y,n.elbowR[0]-=.1*y,n.hips[2]+=Math.sin(this.idleT*.4)*.03*y,n.thighL[2]+=.04*y,n.thighR[2]-=.04*y,n.head=[0,Math.sin(this.idleT*.35)*.35*y*(Math.sin(this.idleT*.11)>.3?1:.2)+this.lookYaw,0],e.talk){let T=this.idleT*3;n.head[0]+=Math.sin(T*1.3)*.06,n.shoulderR=[-.45-Math.sin(T)*.15,0,-.2],n.elbowR=[-1.1+Math.sin(T*1.7)*.2,.3,0]}if(this.landT>0){this.landT-=t;let T=Math.max(0,this.landT/.25);r-=.12*T,n.thighL[0]-=.5*T,n.thighR[0]-=.5*T,n.kneeL[0]+=.9*T,n.kneeR[0]+=.9*T,n.spine[0]+=.25*T}}else{let c=e.vy>0?1:0;n.thighL=[-.7*c-.25,0,.05],n.thighR=[-.15-.2*(1-c),0,-.05],n.kneeL=[1.1*c+.4,0,0],n.kneeR=[.6,0,0],n.shoulderL=[-.6,0,.5],n.shoulderR=[-.3,0,-.5],n.elbowL=[-.6,0,0],n.elbowR=[-.5,0,0],n.spine=[.12,0,0],n.head=[-.1,0,0]}if(e.phone&&(n.shoulderR=[-.35,0,-.25],n.elbowR=[-2.4,.2,0],n.head=[.05,.15,.1]),this.punchT>0){this.punchT-=t;let c=Math.sin(Math.min(1,(.35-this.punchT)/.35)*Math.PI);n.shoulderR=[-1.5*c-.2,0,-.1],n.elbowR=[-.2-(1-c)*1.4,0,0],n.shoulderL=[-.6,0,.2],n.elbowL=[-1.6,0,0],n.spine=[n.spine[0]+.1,-.35*c,0]}let l=this.punchT>0?30:o;for(let[c,h]of Object.entries(this.bones)){let u=this.cur[c],d=n[c];u.x=ta(u.x,d[0],l,t),u.y=ta(u.y,d[1],l,t),u.z=ta(u.z,d[2],l,t),h.rotation.set(u.x,u.y,u.z)}this.hipY=ta(this.hipY,r,14,t),this.hipZ=ta(this.hipZ,a,14,t),this.bones.hips.position.set(this.rest.hips.x,this.rest.hips.y+this.hipY,this.rest.hips.z+this.hipZ)}land(t){this.landT=.25*Math.min(1,t)}};var Nf=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function T_(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}var oi=class{constructor(t,e,n,s={}){var r,a,o,l,c,h,u;if(this.world=e,this.scene=t,this.model=new Si(n),t.add(this.model.root),this.name=s.name||"Pedestre",this.role=s.role||"ped",this.lines=s.lines||[],this.behavior=s.behavior||"stand",this.x=s.x||0,this.z=s.z||0,this.heading=s.heading||0,this.homeHeading=this.heading,this.homeX=this.x,this.homeZ=this.z,this.y=(r=s.y)!=null?r:e.groundAt(this.x,this.z,.3,e.groundFn(this.x,this.z)+.3),this.speed=0,this.r=.32,this.collidable=!0,this.talking=!1,this.dodge=0,this.dodgeX=0,this.dodgeZ=0,this.wait=0,this.lineIdx=0,this.team=s.team||"neutral",this.hp=(a=s.hp)!=null?a:100,this.maxHp=this.hp,this.attackCd=V(.3,1.2),this.damage=(o=s.damage)!=null?o:7,this.route=s.route||null,this.routeI=0,this.routeDir=1,this.walkSpeed=(l=s.walk)!=null?l:V(1.05,1.5),this.runSpeed=(c=s.run)!=null?c:4.6,this.target=null,this.downT=0,this.getUp=(h=s.getUp)!=null?h:0,this.pose=s.pose||null,this.lying=0,this.interactable=(u=s.interactable)!=null?u:!0,this.behavior==="loop"){this.loop=s.loop,this.s=j()*this.loop.half*8,this.dir=j()<.5?1:-1,this.lat=V(-.9,.3);let d=this.loopPos(this.s);this.x=d[0],this.z=d[1]}this.behavior==="patrol"&&(this.walkSpeed=1.1,this.patrolT=j()*10),this.behavior==="sleep"&&this.setLying(-Math.PI/2,.55),this.stuck=0,this.animSkip=0,this.sync()}get alive(){return this.behavior!=="down"}setLying(t,e=.15){this.lying=t,this.lift=e}knockDown(t=0){this.behavior="down",this.downT=0,this.getUp=t,this.hp=0,this.setLying(Math.PI/2,.15),this.collidable=!1,this.interactable=!1,this.speed=0}loopPos(t){let e=this.loop.half+this.lat,n=e*2,s=n*4;t=(t%s+s)%s;let{cx:r,cz:a}=this.loop;return t<n?[r-e+t,a-e,0]:t<2*n?[r+e,a-e+(t-n),1]:t<3*n?[r+e-(t-2*n),a+e,2]:[r-e,a+e-(t-3*n),3]}pushCircleOut(t,e,n,s,r,a){if(a||!this.collidable||!this.model.root.visible||this.inCar||r<this.y||s>this.y+1.8)return null;let o=t-this.x,l=e-this.z,c=Math.hypot(o,l),h=n+this.r;if(c>=h||c<1e-5)return null;let u=o/c,d=l/c;return{x:this.x+u*h,z:this.z+d*h,nx:u,nz:d}}reactToCar(t,e){if(!t||this.inCar||this.behavior==="down"||this.behavior==="sleep"||this.behavior==="chair")return!1;let n=this.x-t.x,s=this.z-t.z;if(n*n+s*s>100)return!1;let a=Math.abs(t.speed);if(a>2.5&&this.dodge<=0){let[l,c]=t.forward,h=(n*l+s*c)*Math.sign(t.speed),u=n*-c+s*l;if(h>0&&h<3+a*.6&&Math.abs(u)<2.4){let d=u>=0?1:-1;this.dodge=.7,this.dodgeX=-c*d*5,this.dodgeZ=l*d*5}}let o=t.pushCircleOut(this.x,this.z,this.r,this.y,this.y+1.7);return o&&(this.x=o.x,this.z=o.z,a>6)?(this.knockDown(this.role==="ped"||this.role==="police"?6:0),!0):!1}moveTo(t,e,n,s,r=.4){let a=t-this.x,o=e-this.z,l=Math.hypot(a,o);if(l<r)return{arrived:!0,speed:0,heading:this.heading};let c=Math.min(n,l*3),h=this.world.resolveCircle(this.x+a/l*c*s,this.z+o/l*c*s,this.r,this.y,this.y+1.7,.4,this),u=Math.hypot(h.x-this.x,h.z-this.z);return this.x=h.x,this.z=h.z,u<c*s*.25&&c>.5?this.stuck+=s:this.stuck=Math.max(0,this.stuck-s),{arrived:!1,speed:c,heading:Math.atan2(a,o)}}update(t,e){let{player:n}=e,s=n.x-this.x,r=n.z-this.z,a=Math.hypot(s,r),o=0,l=this.heading,c="foot",h=!1;if(this.inCar){this.sync();return}if(this.behavior==="down")this.downT+=t,this.getUp>0&&this.downT>this.getUp&&(this.behavior=this.prevBehavior||"panic",this.setLying(0,0),this.collidable=!0,this.hp=this.maxHp,this.interactable=!0,this.panicT=6),c="lie";else if(this.dodge>0){this.dodge-=t;let d=this.world.resolveCircle(this.x+this.dodgeX*t,this.z+this.dodgeZ*t,this.r,this.y,this.y+1.7,.4,this);this.x=d.x,this.z=d.z,o=5,l=Math.atan2(this.dodgeX,this.dodgeZ)}else if(this.talking)l=Math.atan2(s,r),this.pose&&(c=this.pose);else switch(this.behavior){case"loop":{if(this.wait>0){this.wait-=t;break}let[d,f]=this.loopPos(this.s+this.dir*1.2);if(Math.hypot(n.x-d,n.z-f)<.9&&n.mode==="foot")break;let x=this.s+this.dir*this.walkSpeed*t,[m,p]=this.loopPos(x),b=this.world.resolveCircle(m,p,this.r,this.y,this.y+1.7,.4,this),y=Math.hypot(b.x-this.x,b.z-this.z);b.hit&&y<this.walkSpeed*t*.3?this.stuck+=t:this.stuck=0,this.stuck>1.2&&(this.dir*=-1,this.stuck=0),l=Math.atan2(m-this.x,p-this.z),this.x=b.x,this.z=b.z,this.s=x,o=this.walkSpeed,j()<t*.04&&(this.wait=V(2,5));break}case"patrol":{this.patrolT+=t;let d=this.moveTo(this.homeX+Math.sin(this.patrolT*.12)*6,this.homeZ,this.walkSpeed,t,.3);d.arrived||(o=d.speed,l=d.heading);break}case"guard":{let d,f,g=this.walkSpeed;if(this.investigate?([d,f]=this.investigate,g=this.alertLevel>=75?3.2:1.8):this.route&&([d,f]=this.route[this.routeI]),d!==void 0){let x=this.moveTo(d,f,g,t,.6);x.arrived||this.stuck>2?(this.stuck=0,this.investigate?(this.wait=2.5,this.investigate=null):this.route&&(this.wait=V(1,3),this.routeI+=this.routeDir,(this.routeI>=this.route.length||this.routeI<0)&&(this.routeDir*=-1,this.routeI+=this.routeDir*2,this.routeI=Math.max(0,Math.min(this.route.length-1,this.routeI))))):this.wait>0?this.wait-=t:(o=x.speed,l=x.heading)}this.wait>0&&(this.wait-=t,o=0,this.lookT=(this.lookT||0)+t,l=this.heading+Math.sin(this.lookT*1.5)*.04);break}case"follow":case"ally":{let d=null;if(this.behavior==="ally"&&(d=e.nearestEnemy?e.nearestEnemy(this,16):null),d)o=this.fight(d,t,e),l=Math.atan2(d.x-this.x,d.z-this.z);else{let f=this.followSlot?this.followSlot(n):[n.x,n.z],g=Math.hypot(f[0]-this.x,f[1]-this.z);if(g>1.2){let x=this.moveTo(f[0],f[1],g>5?this.runSpeed:1.8,t,1);x.arrived||(o=x.speed,l=x.heading),g>40&&e.teleportFollower&&e.teleportFollower(this)}else l=n.heading}h=n.crouch&&!d;break}case"hostile":{let d=e.nearestFoe?e.nearestFoe(this,40):null;d&&(o=this.fight(d,t,e),l=Math.atan2(d.x-this.x,d.z-this.z));break}case"scripted":{if(this.goal){let d=this.moveTo(this.goal[0],this.goal[1],this.goalSpeed||1.5,t,.35);if(d.arrived){if(this.goal=null,this.onArrive){let f=this.onArrive;this.onArrive=null,f()}}else o=d.speed,l=d.heading}else this.faceTo&&(l=Math.atan2(this.faceTo[0]-this.x,this.faceTo[1]-this.z));this.pose&&(c=this.pose);break}case"flee":{if(this.route&&this.routeI<this.route.length){let[d,f]=this.route[this.routeI],g=a<8?this.runSpeed*1.25:a>25?this.runSpeed*.75:this.runSpeed,x=this.moveTo(d,f,g,t,1.2);x.arrived||this.stuck>1?(this.routeI++,this.stuck=0):(o=x.speed,l=x.heading)}else this.fled=!0;break}case"panic":{this.panicT=(this.panicT||6)-t;let d=this.panicFrom||[n.x,n.z],f=this.x-d[0],g=this.z-d[1],x=Math.hypot(f,g)||1,m=this.moveTo(this.x+f/x*3,this.z+g/x*3,4.2,t,.1);o=m.speed,l=m.heading,this.panicT<=0&&(this.behavior=this.loop?"loop":"stand",this.panicFrom=null);break}case"chair":c="chair";break;case"sleep":c="lie";break;default:this.pose&&(c=this.pose),l=a<4&&this.role!=="story-static"?Math.atan2(s,r):this.homeHeading}this.heading=T_(this.heading,l,7,t),this.speed=Nf(this.speed,o,8,t),this.behavior!=="sleep"&&this.behavior!=="chair"&&!this.fixedY&&(this.y=Nf(this.y,this.world.groundAt(this.x,this.z,.2,this.y),20,t)),this.animSkip+=t;let u=a>45?.1:0;this.animSkip>=u&&(this.model.update(this.animSkip,{speed:this.speed,grounded:!0,mode:c,talk:this.talking&&c==="foot",crouch:h,phone:this.phone}),this.animSkip=0),this.sync()}fight(t,e,n){let s=Math.hypot(t.x-this.x,t.z-this.z);if(this.attackCd-=e,t===n.player&&n.tokens)if(n.tokens.has(this)||n.tokens.size<2)s<3&&n.tokens.add(this);else return s<2.8?0:this.moveTo(t.x,t.z,2.2,e,2.8).speed;return s>1.25?this.moveTo(t.x,t.z,s>4?this.runSpeed:2.4,e,1.1).speed:(this.attackCd<=0&&(this.attackCd=V(1.1,1.8),this.model.punch(),n.hit&&n.hit(this,t,this.damage)),0)}nextLine(){if(!this.lines.length)return null;let t=this.lines[this.lineIdx%this.lines.length];return this.lineIdx++,t}remove(){this.scene.remove(this.model.root),this.removed=!0,this.collidable=!1}sync(){this.inCar||(this.model.root.position.set(this.x,this.y+(this.lift||0)*Math.min(1,Math.abs(this.lying)),this.z),this.model.root.rotation.set(this.lying||0,this.heading,0))}};var Ti=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n)),A_={sedan:{L:4.6,W:1.82,wheelBase:2.75,wr:.34,belt:.95,roof:1.43,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:46,accel:7.5,name:"Sedan"},hatch:{L:4,W:1.75,wheelBase:2.5,wr:.32,belt:.93,roof:1.47,ws:[.85,.05],rw:[-1.45,-1.85],maxSpeed:42,accel:7,name:"Hatch"},suv:{L:4.75,W:1.95,wheelBase:2.85,wr:.4,belt:1.1,roof:1.75,ws:[1.15,.35],rw:[-1.95,-2.2],maxSpeed:40,accel:6.5,name:"SUV"},pickup:{L:5.2,W:1.95,wheelBase:3.15,wr:.4,belt:1.08,roof:1.78,ws:[1.45,.75],rw:[-.35,-.45],maxSpeed:39,accel:6.2,bed:!0,name:"Picape"},police:{L:4.7,W:1.85,wheelBase:2.8,wr:.35,belt:.97,roof:1.45,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:52,accel:9,police:!0,name:"Viatura"},taxi:{L:4.6,W:1.82,wheelBase:2.75,wr:.34,belt:.95,roof:1.43,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:44,accel:7.2,taxi:!0,name:"T\xE1xi"}},Hf=[9313051,1916786,14277081,1710618,4147794,7040883,3037754,10254892,15921906,5906237,2575198,11688479],Of=new Rn({vertexColors:!0,shininess:90,specular:6710886,envMap:jn.texture,combine:Zn,reflectivity:.22}),R_=new Rn({color:1713456,transparent:!0,opacity:.5,shininess:120,specular:11184810,depthWrite:!1,envMap:jn.texture,combine:Zn,reflectivity:.45}),kf=new nn({vertexColors:!0}),Xh=new Ae({color:16774872}),qh=new Ae({color:6949386}),C_=new Ae({color:16719904}),No=[new Ae({color:3342336}),new Ae({color:51})];function Zt(i,t,e){let n=i.index?i.toNonIndexed():i;n===i&&(n=i.clone());for(let s of Object.keys(n.attributes))["position","normal"].includes(s)||n.deleteAttribute(s);return n.attributes.normal||n.computeVertexNormals(),e&&n.applyMatrix4(e),$r(n,t),n}var se=(i,t,e,n=0,s=0,r=0,a=1,o=1,l=1)=>new Ht().compose(new D(i,t,e),new en().setFromEuler(new Xe(n,s,r,"YXZ")),new D(a,o,l)),Wh=new Map;function P_(i){if(Wh.has(i))return Wh.get(i);let t=[],e=.24;t.push(Zt(new ke(i,i,e,18),1447446,se(0,0,0,0,0,Math.PI/2))),t.push(Zt(new Ei(i*.86,i*.14,4,14),2039583,se(e/2-.02,0,0,0,Math.PI/2,0))),t.push(Zt(new ke(i*.62,i*.62,e+.02,16),11120050,se(0,0,0,0,0,Math.PI/2))),t.push(Zt(new ke(i*.15,i*.15,e+.05,8),7040626,se(0,0,0,0,0,Math.PI/2)));for(let s=0;s<5;s++){let r=s/5*Math.PI*2;t.push(Zt(new kt(.03,i*.95,.07),13685718,se(e/2+.012,0,0,r,0,0)))}let n=Cn(t);return Wh.set(i,n),n}function Ff(i,t,e=.05){let n=new Hr;n.moveTo(i[0][0],i[0][1]);for(let r=1;r<i.length;r++){let a=i[r];a.arc?n.absarc(a.arc[0],a.arc[1],a.arc[2],Math.PI,0,!0):n.lineTo(a[0],a[1])}let s=new xo(n,{depth:t-e*2,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:2,curveSegments:8});return s.rotateY(-Math.PI/2),s.translate(t/2-e,0,0),s}var I_=0,us=class{constructor(t="sedan",e=9313051,n){this.id=I_++,this.type=t;let s=this.T=A_[t];this.world=n,s.police&&(e=16053492),s.taxi&&(e=15254042),this.color=e,this.group=new ze,this.body=new ze,this.group.add(this.body),this.build(e),this.x=0,this.z=0,this.y=0,this.heading=0,this.speed=0,this.lat=0,this.steer=0,this.yawRate=0,this.pushVx=0,this.pushVz=0,this.pitch=0,this.roll=0,this.wheelSpin=0,this.collidable=!0,this.height=s.roof,this.driver=null,this.braking=!1,this.lastHit=0,this.engineOn=!1,this.tank={sedan:50,hatch:45,suv:70,pickup:80,police:60,taxi:50}[t]||50,this.fuel=.35+Math.random()*.65,this.health=1}build(t){let e=this.T,n=e.L,s=e.W,r=n/2,a=e.wheelBase/2,o=e.wr,l=o*.75,c=e.belt,h=new Ot(t).multiplyScalar(.75).getHex(),u=[],d=o+.08,f=[[-r+.05,l+.05],[-a-d,l],{arc:[-a,o,d]},[a-d,l],{arc:[a,o,d]},[r-.08,l],[r,l+.15],[r+.02,c-.28],[r-.12,c-.16],[e.ws[0]+.1,c]];e.bed?f.push([e.rw[0]-.05,c],[-r+.02,c],[-r,l+.1]):f.push([e.rw[1]-.05,c],[-r+.18,c-.05],[-r+.02,c-.2],[-r,l+.15]),u.push(Zt(Ff(f,s,.06),t));let g=[[e.ws[0],c-.01],[e.ws[1],e.roof],[e.rw[0],e.roof],[e.rw[1],c-.01]],x=Ff(g,s-.16,0),m=e.ws[1]-e.rw[0];u.push(Zt(new kt(s-.12,.06,m+.08),t,se(0,e.roof+.02,(e.ws[1]+e.rw[0])/2)));let p=(U,N,k,W,H)=>{let nt=Math.hypot(k-U,W-N),q=Math.atan2(k-U,W-N);for(let rt of[-1,1])u.push(Zt(new kt(.07,nt,.09),t,se(rt*H,(N+W)/2,(U+k)/2,q,0,0)))};p(e.ws[0],c,e.ws[1],e.roof,s/2-.1),p(e.rw[1],c,e.rw[0],e.roof,s/2-.1);let b=(e.bed,(e.ws[1]+e.rw[0])/2-.1);p(b,c,b,e.roof,s/2-.09),u.push(Zt(new kt(s+.04,.2,.16),2105892,se(0,l+.14,r-.02))),u.push(Zt(new kt(s+.04,.2,.16),2105892,se(0,l+.14,-r+.02))),u.push(Zt(new kt(s*.5,.14,.04),1052688,se(0,c-.3,r+.015)));for(let U=0;U<4;U++)u.push(Zt(new kt(s*.48,.012,.05),7829367,se(0,c-.35+U*.035,r+.02)));for(let U of[-1,1])u.push(Zt(new kt(.03,.06,n*.78),h,se(U*(s/2+.005),l+.2,0))),u.push(Zt(new kt(.02,c-l-.1,.015),1118481,se(U*(s/2+.008),(c+l)/2,e.ws[0]-.05))),u.push(Zt(new kt(.02,c-l-.1,.015),1118481,se(U*(s/2+.008),(c+l)/2,b))),!e.bed&&e.rw[1]<-1.5&&u.push(Zt(new kt(.02,c-l-.12,.015),1118481,se(U*(s/2+.008),(c+l)/2,e.rw[1]+.15))),u.push(Zt(new kt(.03,.03,.14),12303291,se(U*(s/2+.02),c-.1,b+.25))),u.push(Zt(new kt(.03,.03,.14),12303291,se(U*(s/2+.02),c-.1,b-.65))),u.push(Zt(new kt(.2,.12,.1),t,se(U*(s/2+.08),c+.06,e.ws[0]-.15))),u.push(Zt(new kt(.02,.09,.07),11057352,se(U*(s/2+.08),c+.06,e.ws[0]-.205)));u.push(Zt(new kt(.5,.13,.02),15658734,se(0,l+.22,-r-.07))),u.push(Zt(new kt(.5,.13,.02),15658734,se(0,l+.22,r+.07)));let y=2763310,v=1973792;for(let U of[.38,-.38])u.push(Zt(new kt(.48,.14,.5),y,se(U,l+.12,-.12))),u.push(Zt(new kt(.48,.62,.12),y,se(U,l+.48,-.42,-.15,0,0))),u.push(Zt(new kt(.26,.18,.1),y,se(U,l+.88,-.48,-.1,0,0)));if(!e.bed&&e.rw[1]<-1.5&&(u.push(Zt(new kt(s-.3,.16,.5),y,se(0,l+.14,-1))),u.push(Zt(new kt(s-.3,.55,.12),y,se(0,l+.45,-1.28,-.15,0,0)))),u.push(Zt(new kt(s-.2,.22,.4),v,se(0,c-.05,e.ws[0]-.28))),u.push(Zt(new kt(.3,.1,.02),3828378,se(.38,c+.03,e.ws[0]-.49))),u.push(Zt(new kt(.2,.3,.5),v,se(0,l+.35,.25))),u.push(Zt(new kt(s-.1,.05,n*.6),1381653,se(0,l+.18,-.1))),e.bed){let U=e.rw[0]+r-.05;u.push(Zt(new kt(s-.1,.05,U),2236962,se(0,c-.35,-r+U/2+.05))),u.push(Zt(new kt(.06,.08,U),t,se(s/2-.05,c+.02,-r+U/2+.05))),u.push(Zt(new kt(.06,.08,U),t,se(-s/2+.05,c+.02,-r+U/2+.05)))}if(e.police){for(let U of[-1,1])u.push(Zt(new kt(.02,.3,e.L*.45),1120819,se(U*(s/2+.012),c-.25,-.2))),u.push(Zt(new kt(.022,.08,e.L*.45),13938487,se(U*(s/2+.014),c-.07,-.2)));u.push(Zt(new kt(.9,.05,.25),2236962,se(0,e.roof+.07,-.35)))}e.taxi&&u.push(Zt(new kt(.55,.16,.22),16053492,se(0,e.roof+.12,-.4)));let T=Cn(u);this._lodParts=[T];let E=new $t(T,Of);E.castShadow=!0,E.receiveShadow=!0,this.body.add(E);let R=new $t(x,R_);R.renderOrder=2,this.body.add(R);let C=[];for(let U of[-1,1])C.push(new kt(.34,.12,.05).translate(U*(s/2-.28),c-.24,r+.005));this.body.add(new $t(Cn(C),Xh));let w=[];for(let U of[-1,1])w.push(new kt(.36,.13,.05).translate(U*(s/2-.25),e.bed?c-.15:c-.2,-r-.005));this.tail=new $t(Cn(w),qh),this.body.add(this.tail),e.police&&(this.sirenL=new $t(new kt(.4,.1,.22),No[0]),this.sirenR=new $t(new kt(.4,.1,.22),No[1]),this.sirenL.position.set(.22,e.roof+.14,-.35),this.sirenR.position.set(-.22,e.roof+.14,-.35),this.body.add(this.sirenL,this.sirenR)),this.steeringWheel=new ze,this.steeringWheel.add(new $t(Cn([Zt(new Ei(.17,.022,6,16),1118481),Zt(new kt(.3,.03,.02),2236962)]),kf)),this.steeringWheel.position.set(.38,c+.05,e.ws[0]-.55),this.steeringWheel.rotation.x=-.45,this.steeringWheel.rotation.order="YXZ",this.body.add(this.steeringWheel),this.wheels=[];let M=P_(o);for(let[U,N]of[[1,1],[-1,1],[1,-1],[-1,-1]]){let k=new ze;k.position.set(U*(s/2-.14),o,N*a);let W=new $t(M,kf);W.castShadow=!0,U<0&&(W.rotation.y=Math.PI);let H=new ze;H.add(W),k.add(H),this.group.add(k),this.wheels.push({pivot:k,holder:H,front:N>0,sx:U,sz:N})}let L=[this._lodParts[0].clone()];for(let U of C)L.push(Zt(U,16773312));L.push(Zt(x,1844784));for(let U of w)L.push(Zt(U,7999504));for(let U of this.wheels){let N=new Ht().makeTranslation(U.pivot.position.x,U.pivot.position.y,U.pivot.position.z);U.sx<0&&N.multiply(new Ht().makeRotationY(Math.PI)),L.push(M.clone().applyMatrix4(N))}this.lodMesh=new $t(Cn(L),Of),this.lodMesh.visible=!1,this.group.add(this.lodMesh),this.detail=[E,this.tail,this.steeringWheel,...this.body.children.filter(U=>U.material===Xh),...this.wheels.map(U=>U.pivot)],this.sirenL&&this.detail.push(this.sirenL,this.sirenR),this.glassMesh=R,this.lod=!1,this._lodParts=null,this.seat=new D(.38,l-.37,-.1)}setLOD(t){if(t!==this.lod){this.lod=t;for(let e of this.detail)e.visible=!t;this.lodMesh.visible=t,this.glassMesh.visible=!t,t&&this.body.rotation.set(0,0,0)}}place(t,e,n){this.x=t,this.z=e,this.heading=n,this.y=this.world.groundFn(t,e),this.syncTransform(0)}get forward(){return[Math.sin(this.heading),Math.cos(this.heading)]}get right(){return[-Math.cos(this.heading),Math.sin(this.heading)]}get velX(){return Math.sin(this.heading)*this.speed-Math.cos(this.heading)*this.lat+this.pushVx}get velZ(){return Math.cos(this.heading)*this.speed+Math.sin(this.heading)*this.lat+this.pushVz}get kmh(){return Math.abs(this.speed)*3.6}local(t,e){let n=Math.sin(this.heading),s=Math.cos(this.heading);return[this.x+t*s+e*n,this.z-t*n+e*s]}doorPos(t=1){return this.local(t*(this.T.W/2+.75),-.1)}pushCircleOut(t,e,n,s,r){if(s>this.y+this.height||r<this.y+.1)return null;let a=t-this.x,o=e-this.z;if(a*a+o*o>(this.T.L/2+n+.5)**2)return null;let l=Math.sin(this.heading),c=Math.cos(this.heading),h=a*c-o*l,u=a*l+o*c,d=this.T.W/2,f=this.T.L/2,g=Math.max(-d,Math.min(h,d)),x=Math.max(-f,Math.min(u,f)),m=h-g,p=u-x,b=Math.hypot(m,p),y,v;if(b>1e-6){if(b>=n)return null;m/=b,p/=b,y=g+m*n,v=x+p*n}else{let w=d-Math.abs(h),M=f-Math.abs(u);w<M?(m=Math.sign(h)||1,p=0,y=m*(d+n),v=u):(p=Math.sign(u)||1,m=0,y=h,v=p*(f+n))}let T=this.x+y*c+v*l,E=this.z-y*l+v*c,R=m*c+p*l,C=-m*l+p*c;return{x:T,z:E,nx:R,nz:C}}rayHit(t,e,n,s,r,a,o){let l=t-this.x,c=n-this.z;if(l*l+c*c>(o+4)**2)return 1/0;let h=Math.sin(this.heading),u=Math.cos(this.heading),d=[l*u-c*h,e-this.y,l*h+c*u],f=[s*u-a*h,r,s*h+a*u],g=[-this.T.W/2,.1,-this.T.L/2],x=[this.T.W/2,this.T.roof,this.T.L/2],m=0,p=o;for(let b=0;b<3;b++){if(Math.abs(f[b])<1e-9){if(d[b]<g[b]||d[b]>x[b])return 1/0;continue}let y=(g[b]-d[b])/f[b],v=(x[b]-d[b])/f[b];if(y>v){let T=y;y=v,v=T}if(m=Math.max(m,y),p=Math.min(p,v),m>p)return 1/0}return m}update(t,e,n){let s=this.T,r=e||{throttle:0,brake:0,steer:0,handbrake:0},a=this.speed,o=0,l=r.throttle||0;this.driver==="player"&&(this.fuel=Math.max(0,this.fuel-Math.abs(this.speed)*t/(9e3*this.tank/55)),this.fuel<=0&&(l=Math.min(l,.12)));let c=.45+.55*this.health;l>0&&(a<-.5?o=14*l:o=s.accel*c*l*(1-Math.min(1,Math.max(0,a)/(s.maxSpeed*c))**2)),r.brake>0&&(a>.5?o-=14*r.brake:o-=4.5*r.brake*(a>-8?1:0)),this.braking=r.brake>0&&a>.5||r.handbrake>0,this.speed+=o*t;let h=.0025*this.speed*Math.abs(this.speed)+(r.throttle||r.brake?.15:1.2)*Math.sign(this.speed);Math.abs(this.speed)<Math.abs(h*t)&&!r.throttle&&!r.brake?this.speed=0:this.speed-=h*t,r.handbrake&&(this.speed=Ti(this.speed,0,1.6,t));let u=.62/(1+Math.abs(this.speed)*.07);this.steer=Ti(this.steer,(r.steer||0)*u,7,t);let d=this.speed*Math.tan(this.steer)/s.wheelBase,f=(r.handbrake?20:13)/Math.max(4,Math.abs(this.speed));d=Math.max(-f,Math.min(f,d));let g=r.handbrake?2.2:9;this.yawRate=Ti(this.yawRate,d*(r.handbrake?1.25:1),g,t),this.heading+=this.yawRate*t,this.lat+=-this.yawRate*this.speed*(r.handbrake?.12:.035)*t*10,this.lat=Ti(this.lat,0,g*.8,t),this.pushVx=Ti(this.pushVx,0,3,t),this.pushVz=Ti(this.pushVz,0,3,t),this.x+=this.velX*t,this.z+=this.velZ*t,this.resolveCollisions(n),this.syncTransform(t)}updatePassive(t){return Math.abs(this.pushVx)+Math.abs(this.pushVz)+Math.abs(this.speed)<.02?!1:(this.speed=Ti(this.speed,0,2,t),this.pushVx=Ti(this.pushVx,0,3,t),this.pushVz=Ti(this.pushVz,0,3,t),this.x+=this.velX*t,this.z+=this.velZ*t,this.resolveCollisions(null),this.syncTransform(t),!0)}resolveCollisions(t){let e=this.T,n=e.W/2,s=null,r=Math.max(2,Math.round(e.L/e.W));for(let a=0;a<r;a++){let o=-e.L/2+n+a/(r-1)*(e.L-2*n),[l,c]=this.local(0,o),h=this.world.resolveCircle(l,c,n,this.y+.3,this.y+1.4,0,this,!0);h.hit&&(this.x+=h.x-l,this.z+=h.z-c,s=[h.nx,h.nz])}if(s){let[a,o]=this.forward,l=this.velX,c=this.velZ,h=l*s[0]+c*s[1],u=a*s[0]+o*s[1],d=Math.max(0,-h);if(this.speed*=1-Math.min(.85,Math.abs(u)*.9+.05),Math.abs(u)>.6&&d>2&&(this.speed=-Math.sign(this.speed||1)*d*.15),this.lastHit=d,t)for(let f of t){if(f===this)continue;let g=f.x-this.x,x=f.z-this.z,m=Math.hypot(g,x);m<(e.L+f.T.L)/2+.3&&m>.01&&(f.pushVx+=g/m*d*.4,f.pushVz+=x/m*d*.4,f.awake=!0)}}else this.lastHit=0}syncTransform(t){var E;let e=this.T,n=this.world.groundFn,s=e.wheelBase/2,r=e.W/2-.14,[a,o]=this.local(0,s),[l,c]=this.local(0,-s),[h,u]=this.local(r,0),[d,f]=this.local(-r,0),g=n(a,o),x=n(l,c),m=n(h,u),p=n(d,f),b=(g+x+m+p)/4,y=t>0?1-Math.exp(-12*t):1;this.y+=(b-this.y)*y;let v=Math.atan2(x-g,e.wheelBase)-(t>0?Ve.clamp((this.speed-((E=this._lastSpeed)!=null?E:this.speed))/t*.004,-.04,.04):0),T=Math.atan2(m-p,e.W)+Ve.clamp(this.yawRate*this.speed*.006,-.06,.06);this._lastSpeed=this.speed,this.pitch+=(v-this.pitch)*y,this.roll+=(T-this.roll)*y,this.group.position.set(this.x,this.y,this.z),this.group.rotation.set(0,this.heading,0),this.body.rotation.set(this.pitch,0,this.roll),this.wheelSpin+=this.speed/e.wr*t;for(let R of this.wheels)R.pivot.rotation.y=R.front?this.steer:0,R.holder.rotation.x=this.wheelSpin;this.steeringWheel.rotation.z=-this.steer*3,this.tail.material=this.braking?C_:qh}},Bf=0;function Vf(i){Bf+=i;let t=Math.floor(Bf*4)%2===0;No[0].color.setHex(t?16718362:3342336),No[1].color.setHex(t?51:2245887)}function Gf(i){Xh.color.setHex(i?16774872:13158592),qh.color.setHex(i?10096656:5900810)}var Oo=13671028,ko=2759698,We={ethan:{name:"Ethan Cross",look:{skin:Oo,hair:ko,shirt:4871520,jacket:4866104,pants:3424862,shoes:3811870,hairStyle:"short",height:1,build:1}},ethanPrison:{name:"Ethan Cross",look:{skin:Oo,hair:ko,shirt:14211280,pants:5921368,shoes:2763306,hairStyle:"short",beard:!0,height:1,build:1.02}},ethanYoung:{name:"Ethan",look:{skin:Oo,hair:ko,shirt:9054762,pants:2764602,shoes:14737632,hairStyle:"short",hat:"cap",hatColor:1710618,height:1,build:.97}},ryan:{name:"Ryan Cole",look:{skin:11565142,hair:1577484,shirt:15262422,jacket:5913382,pants:2040880,shoes:1315860,hairStyle:"short",beard:!0,height:1.03,build:1.08}},ryanYoung:{name:"Ryan",look:{skin:11565142,hair:1577484,shirt:2771578,pants:2763306,shoes:1315860,hairStyle:"short",height:1.03,build:1.02}},victor:{name:"Victor Kane",look:{skin:13145196,hair:1052688,shirt:15790320,jacket:1710622,pants:1710622,shoes:657930,tie:6950928,hairStyle:"short",beard:!0,height:1.04,build:1.1,longSleeve:!0}},blake:{name:"Blake Morrison",look:{skin:14725264,hair:6965802,shirt:3815994,jacket:2767402,pants:2763306,shoes:1710618,hairStyle:"short",height:1,build:1.05}},lucas:{name:"Lucas",look:{skin:15253664,hair:3811866,shirt:2768234,pants:1844792,shoes:1118481,hairStyle:"short",height:.99,build:.98,longSleeve:!0,badge:!0}},fernando:{name:"Fernando del Costa",look:{skin:14198914,hair:2759184,shirt:15263968,pants:3816010,shoes:2763306,hairStyle:"short",beard:!0,height:1,build:1}},brother:{name:"???",look:{skin:Oo,hair:ko,shirt:2763306,jacket:1052690,pants:1710618,shoes:657930,hairStyle:"short",height:1.01,build:1}},reed:{name:"Detective Marcus Reed",look:{skin:9067068,hair:5921370,shirt:14210248,jacket:6969920,pants:3814440,shoes:2759184,tie:2763338,hairStyle:"short",beard:!0,height:1.02,build:1.08,longSleeve:!0}},investigator:{name:"Investigador",look:{skin:10119754,hair:2763306,shirt:13683904,jacket:3815994,pants:2763306,shoes:1710618,hairStyle:"short",height:1,build:1.05,longSleeve:!0}},driver:{name:"Motorista",look:{skin:6965812,hair:1052688,shirt:15790320,jacket:1052688,pants:1052688,shoes:328965,tie:1052688,hairStyle:"bald",height:1.02,build:1.1,longSleeve:!0}},mystery:{name:"Pessoa misteriosa",look:{skin:8018500,hair:1052688,shirt:1315862,pants:1184276,shoes:657930,hat:"hood",hatColor:1184276,hairStyle:"bald",height:.98,build:.95,longSleeve:!0}}};function Gi(){return{...rr(),shirt:1710618,jacket:2237738,pants:1710618,shoes:657930,hat:null,hairStyle:"short",build:V(1.05,1.15),height:V(1,1.05),longSleeve:!0}}function Wf(){return{...rr(),shirt:Nt([8002074,5902352,9054746]),jacket:j()<.5?1710618:null,pants:Nt([1710618,2763322]),hat:j()<.4?"cap":null,hatColor:7999504,hairStyle:"short",build:V(1,1.12)}}function Fo(){return{...rr(),shirt:15263976,jacket:1316378,pants:1316378,shoes:328965,tie:1316378,hairStyle:Nt(["short","bald"]),hat:null,build:V(1.08,1.18),height:V(1,1.06),longSleeve:!0}}var Xf=[15845029,14724230,13011556,11039055,9067068,6175526,14263682],qf=[1709072,2825492,4861984,8018480,11569232,6316128,1710618],L_=[12073530,3828408,3836506,14737632,2763306,14196784,8014496,4885146,12610186,9071178],D_=[2899536,1842204,4866096,3820138,5921370,6967360,2767402];function rr(){let i=j()<.5;return{skin:Nt(Xf),hair:Nt(qf),shirt:Nt(L_),pants:Nt(D_),shoes:Nt([1710618,4861984,14737632,3816026]),jacket:j()<.3?Nt([2763306,4864554,2767450,6957610]):null,hairStyle:i?Nt(["long","bun","long"]):Nt(["short","short","bald"]),beard:!i&&j()<.25,hat:j()<.1?"cap":null,hatColor:Nt([11149858,2245802,2236962]),height:i?V(.92,.99):V(.97,1.06),build:i?V(.88,.95):V(.95,1.12),longSleeve:j()<.4}}function Yf(){return{...rr(),shirt:Nt([12597547,2388387,1999945,14059792]),jacket:null,tie:j()<.3?2236962:null,longSleeve:!0}}function ar(){return{skin:Nt(Xf),hair:Nt(qf),shirt:2768234,pants:1844792,shoes:1118481,hat:"police",badge:!0,hairStyle:"short",height:V(.98,1.05),build:V(1,1.12),longSleeve:!0}}var Yh=["Bem-vindo! Posso ajudar em alguma coisa?","Fique \xE0 vontade para dar uma olhada.","Est\xE1 tudo t\xE3o estranho na cidade ultimamente...","Fechamos \xE0s dez. Depois disso, ningu\xE9m anda por a\xED.","Voc\xEA n\xE3o \xE9 daqui do bairro, \xE9?"],$f=["Boa noite.","Com licen\xE7a.","Hm?","N\xE3o tenho tempo agora.","Cuidado por onde anda.","Dizem que algo estranho acontece na pra\xE7a \xE0 noite..."],Zf=["Circulando, cidad\xE3o.","Tudo certo por aqui?","N\xE3o v\xE1 dirigir em alta velocidade, hein."];var $h=class extends Error{constructor(t){super(t),this.fail=!0}},Zh=class extends Error{constructor(){super("abort"),this.abort=!0}},we=i=>document.getElementById(i),Jf=(i,t,e)=>i+(t-i)*e,z_=i=>i*i*(3-2*i),Kf=[[0,"Ningu\xE9m percebeu nada"],[25,"Suspeita"],[50,"Seguran\xE7a em alerta"],[75,"Procurando algo suspeito"],[100,"ALARME ATIVADO"]],Bo=class{constructor(t){this.G=t,this.t=0,this.waiters=[],this.entities=new Map,this.followers=[],this.fade=0,this.fadeTarget=0,this.fadeSpeed=2,this.cut=!1,this.current=null,this.marker=this.makeMarker(),t.scene.add(this.marker),this.alert=null,this.cameras=[],this.advance=!1,this.choice=-1}makeMarker(){let t=new ze,e=new $t(new ke(.9,.9,40,16,1,!0),new Ae({color:16761402,transparent:!0,opacity:.22,depthWrite:!1,side:_n,fog:!1}));e.position.y=20,t.add(e);let n=new $t(new Ei(1.2,.08,6,24),new Ae({color:16765530,fog:!1}));return n.rotation.x=Math.PI/2,n.position.y=.2,t.add(n),t.visible=!1,t}update(t){this.t+=t;let e=this.waiters;this.waiters=[];for(let s of e){let r=!1;try{r=s.pred(t)}catch(a){s.rej(a);continue}r?s.res(r):this.waiters.push(s)}if(this.failChecks)for(let s of this.failChecks){let r=s();if(r){this.fail(r);break}}if(this.fade!==this.fadeTarget){let s=Math.sign(this.fadeTarget-this.fade)*t*this.fadeSpeed;this.fade=Math.abs(this.fadeTarget-this.fade)<Math.abs(s)?this.fadeTarget:this.fade+s,we("fade").style.opacity=this.fade}let n=this.objTarget&&this.resolve(this.objTarget);if(this.marker.visible=!!n&&!this.cut,n&&(this.marker.position.set(n[0],this.G.world.groundFn(n[0],n[1]),n[1]),this.marker.rotation.y+=t),this.shotState){let s=this.shotState;s.t=Math.min(s.dur,s.t+t);let r=s.dur>0?z_(s.t/s.dur):1,a=s.from.map((l,c)=>Jf(l,s.from2[c],r)),o=s.look.map((l,c)=>Jf(l,s.look2[c],r));this.G.camera.position.set(...a),this.G.camera.lookAt(...o)}this.alert&&this.updateAlert(t),this.updateCameras(t)}wait(t){let e=this.t+t;return this.until(()=>this.t>=e)}until(t){return new Promise((e,n)=>this.waiters.push({pred:t,res:e,rej:n}))}fail(t){let e=new $h(t),n=this.waiters;this.waiters=[],n.forEach(s=>s.rej(e))}abort(){let t=new Zh,e=this.waiters;this.waiters=[],e.forEach(n=>n.rej(t))}task(t){t().catch(e=>{!e.fail&&!e.abort&&console.error(e)})}resolve(t){return t?typeof t=="function"?t():Array.isArray(t)?t:[t.x,t.z]:null}async fadeOut(t=.8){this.fadeCalls=(this.fadeCalls||0)+1,this.fadeTarget=1,this.fadeSpeed=1/t,await this.until(()=>this.fade>=1)}async fadeIn(t=.8){this.fadeCalls=(this.fadeCalls||0)+1,this.fadeTarget=0,this.fadeSpeed=1/t,await this.until(()=>this.fade<=0)}async card(t,e="",n=3){we("card-title").textContent=t,we("card-sub").textContent=e,we("card").style.opacity=1,await this.wait(n),we("card").style.opacity=0,await this.wait(.6)}letterbox(t){document.body.classList.toggle("cine",t)}async cutscene(t){this.cut=!0,this.G.inputLocked=!0,this.letterbox(!0);try{await t()}finally{this.endCut()}}endCut(){this.cut=!1,this.G.inputLocked=!1,this.letterbox(!1),this.shotState=null,this.G.camOverride=!1,this.hideDialog();let t=this.G.player,e=(t.mode==="car"&&this.G.car?this.G.car.heading:t.heading)+Math.PI;this.G.cam.yaw=e,this.G.cam.pitch=.22,this.G.cam.initialized=!1}shot(t,e,n=0,s=t,r=e){this.G.camOverride=!0,this.shotState={from:t,look:e,from2:s,look2:r,dur:n,t:0}}safe(t,e){let n=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2],a=Math.hypot(n,s,r)||1;this.G.world.rayIgnore=null;let o=this.G.world.raycast(e[0],e[1],e[2],n/a,s/a,r/a,a);if(o>=a)return t;let l=Math.max(.6,o-.35)/a;return[e[0]+n*l,e[1]+s*l,e[2]+r*l]}frame(t,e,n=1,s=3.2,r=1.6){let a=(t.x+e.x)/2,o=(t.z+e.z)/2,l=Math.max(t.y||0,e.y||0),c=e.x-t.x,h=e.z-t.z,u=Math.hypot(c,h)||1;c/=u,h/=u;let d=-h*n,f=c*n,g=Math.max(s,u*1.3),x=[a,l+1.4,o];this.shot(this.safe([a+d*g-c*.6,l+r,o+f*g-h*.6],x),x)}over(t,e,n=2.3){let s=e.x-t.x,r=e.z-t.z,a=Math.hypot(s,r)||1;s/=a,r/=a;let o=[e.x,(e.y||0)+1.45,e.z];this.shot(this.safe([t.x-s*n-r*.7,(t.y||0)+1.9,t.z-r*n+s*.7],o),o)}showDialog(t,e,n="[E] / clique para continuar"){we("dialog").style.display="block",we("dialog-name").textContent=t,we("dialog-text").textContent=e,we("dialog-choices").innerHTML="",we("dialog-hint").textContent=n}hideDialog(){we("dialog").style.display="none"}async say(t,e,n={}){let s=typeof t=="string"?t:t.name,r=typeof t=="object"?t:null;if(r&&r.model&&(r.talking=!n.noAnim),n.sub){this.showDialog(s,e,""),await this.wait(n.time||Math.min(6,1.6+e.length*.045)),r&&(r.talking=!1),this.hideDialog();return}this.showDialog(s,e),this.advance=!1;let a=this.t;await this.until(()=>this.advance&&this.t-a>.35),this.advance=!1,r&&(r.talking=!1)}async choose(t,e="Ethan"){we("dialog").style.display="block",we("dialog-name").textContent=e,we("dialog-text").textContent="",we("dialog-hint").textContent="Escolha com 1, 2, 3 ou clique";let n=we("dialog-choices");n.innerHTML="",t.forEach((a,o)=>{let l=document.createElement("button");l.className="choice",l.textContent=`${o+1}. ${a.text}`,l.onclick=()=>{this.choice=o},n.appendChild(l)}),this.choice=-1,this.G.unlockPointer&&this.G.unlockPointer();let s=await this.until(()=>this.choice>=0&&this.choice<t.length?this.choice+1:!1)-1;n.innerHTML="",this.hideDialog(),this.G.relockPointer&&this.G.relockPointer();let r=t[s];if(r.trait){let a=this.G.campaign().traits;a[r.trait]=(a[r.trait]||0)+1,this.G.toast("Personalidade: +1 "+U_[r.trait])}return r.line&&await this.say(this.G.campaign().char==="ryan"?"Ryan":"Ethan",r.line),s}objective(t,e=null){this.objText=t,this.objTarget=e,we("objective").textContent=t?"OBJETIVO: "+t:"",we("objective").style.display=t?"block":"none",t&&this.G.toast(t,2.2)}clearObjective(){this.objective("",null)}near(t,e){let n=this.resolve(t),s=this.G.player;return n&&Math.hypot(s.x-n[0],s.z-n[1])<e}async goto(t,e,n,s={}){this.objective(n,t),await this.until(()=>this.near(t,e)&&(!s.foot||this.G.player.mode==="foot")&&(!s.car||this.G.player.mode==="car")),this.clearObjective()}async press(t,e,n){this.G.storyPrompt=null,await this.until(()=>{let s=this.near(t,e)&&this.G.player.mode==="foot";return this.G.storyPrompt=s?n:null,s&&this.G.consumeInteract&&this.G.consumeInteract()?(this.G.storyPrompt=null,!0):!1})}npc(t,e,n={}){var o;let s=this.entities.get(t);if(s&&!s.removed)return n.x!==void 0&&(s.x=n.x,s.z=n.z,s.y=(o=n.y)!=null?o:this.G.world.groundAt(s.x,s.z,.3,this.G.world.groundFn(s.x,s.z)+.3)),s;let r=typeof e=="string"?We[e].look:e,a=new oi(this.G.scene,this.G.world,r,{name:typeof e=="string"?We[e].name:"NPC",...n});return a.storyKey=t,a.role=n.role||"story",this.G.npcs.push(a),this.G.world.dynamic.add(a),this.entities.set(t,a),a}car(t,e,n,s,r,a){let o=this.entities.get(t);if(o&&!o.removed)return o.place(s,r,a),o.speed=0,o;let l=new us(e,n,this.G.world);return l.place(s,r,a),this.G.scene.add(l.group),this.G.world.dynamic.add(l),this.G.cars.push(l),this.entities.set(t,l),l.storyKey=t,l}get(t){let e=this.entities.get(t);return e&&!e.removed?e:null}despawn(t){let e=this.entities.get(t);if(!e)return;this.entities.delete(t);let n=this.G;e instanceof oi?(e.inCar&&this.unseat(e),e.remove(),n.npcs.splice(n.npcs.indexOf(e),1),n.world.dynamic.delete(e),this.followers=this.followers.filter(s=>s!==e)):(n.car===e&&n.forceExitCar(),e.removed=!0,n.scene.remove(e.group),n.world.dynamic.delete(e),n.cars.splice(n.cars.indexOf(e),1),n.aiDrivers=n.aiDrivers.filter(s=>s.car!==e))}cleanup(){for(let t of[...this.entities.keys()])this.despawn(t);this.followers=[],this.G.aiDrivers=[],this.clearObjective(),this.stopAlert(),this.clearCameras(),this.failChecks=null,this.G.storyPrompt=null,this.hideDialog(),this.letterbox(!1),this.cut=!1,this.G.inputLocked=!1,this.G.camOverride=!1,this.shotState=null,this.G.carsLocked=!1,this.G.scope=null,we("scope").style.display="none",this.G.player.pose=null}follow(t,e=!1){this.followers.includes(t)||this.followers.push(t),t.behavior=e?"ally":"follow",t.team="ally";let n=this.followers.indexOf(t);t.followSlot=s=>{let r=s.heading+Math.PI+(n-(this.followers.length-1)/2)*.7;return[s.x+Math.sin(r)*2.2,s.z+Math.cos(r)*2.2]}}unfollow(t){this.followers=this.followers.filter(e=>e!==t),t.inCar&&this.unseat(t),t.behavior="stand"}seat(t,e,n){let r=n===-1?[.38,-.1]:[[-.38,-.1],[.4,-1.05],[-.4,-1.05]][n];if(!r){t.model.root.visible=!1,t.inCar=e,t.collidable=!1;return}this.G.scene.remove(t.model.root),e.body.add(t.model.root),t.model.root.position.set(r[0],e.seat.y,r[1]),t.model.root.rotation.set(0,0,0),t.model.update(.5,{mode:"sit"}),t.inCar=e,t.collidable=!1}unseat(t){let e=t.inCar;if(!e)return;t.model.root.parent&&t.model.root.parent.remove(t.model.root),this.G.scene.add(t.model.root),t.model.root.visible=!0,t.inCar=null,t.collidable=!0;let[n,s]=e.doorPos(-1);t.x=n+(Math.random()-.5),t.z=s+(Math.random()-.5),t.y=this.G.world.groundAt(t.x,t.z,.3,this.G.world.groundFn(t.x,t.z)+.3),t.sync()}onEnterCar(t){this.followers.forEach((e,n)=>this.seat(e,t,n))}onExitCar(){this.followers.forEach(t=>this.unseat(t))}teleportFollower(t){let e=this.G.player,n=Math.random()*6.28;t.x=e.x+Math.sin(n)*2.5,t.z=e.z+Math.cos(n)*2.5,t.y=this.G.world.groundAt(t.x,t.z,.3,e.y+.3)}placePlayer(t,e,n=0){let s=this.G;s.car&&s.forceExitCar(),s.player.place(t,e,n),s.cam.yaw=n+Math.PI,s.cam.pitch=.22,s.cam.initialized=!1,this.followers.forEach(r=>{r.inCar&&this.unseat(r),this.teleportFollower(r)})}putInCar(t){let e=this.G;e.car&&e.forceExitCar(),e.player.place(t.x,t.z,t.heading),e.enterCarDirect(t)}startAlert(t={}){this.alert={value:0,range:t.range||13,fov:t.fov||.85,rate:t.rate||70,seenBodies:new Set,failAt100:t.failAt100!==!1},we("alert").style.display="block",this.renderAlert()}stopAlert(){this.alert=null,we("alert").style.display="none"}addAlert(t){this.alert&&(this.alert.value=Math.min(100,Math.max(0,this.alert.value+t)))}renderAlert(){let t=this.alert;if(!t)return;let e=Kf[0][1];for(let[n,s]of Kf)t.value>=n&&(e=s);we("alert-fill").style.width=t.value+"%",we("alert-label").textContent=`ALERTA ${Math.round(t.value)} \u2014 ${e}`,we("alert-fill").style.background=t.value>=75?"#d83a2a":t.value>=50?"#e08a2a":t.value>=25?"#d8c02a":"#6aa86a"}canSee(t,e,n,s,r,a,o,l,c){let h=r-t,u=o-n,d=Math.hypot(h,u);if(d>l||d<.01)return 0;let f=Math.sin(s),g=Math.cos(s);if((h*f+u*g)/d<Math.cos(c))return 0;let m=a-e,p=Math.hypot(h,m,u);return this.G.world.rayIgnore=null,this.G.world.raycast(t,e,n,h/p,m/p,u/p,p)<p-.4?0:1-d/l}updateAlert(t){var o;let e=this.alert,n=this.G,s=n.player,r=!1,a=n.sky.night>.6?.8:1;for(let l of n.npcs){if(l.behavior!=="guard"||l.removed)continue;let c=this.canSee(l.x,l.y+1.6,l.z,l.heading,s.x,s.y+(s.crouch?.8:1.4),s.z,e.range*a,e.fov);if(c>0){r=!0;let h=(s.crouch?.45:1)*(s.speed>4?1.6:1);e.value+=e.rate*c*h*t,l.investigate=[s.x,s.z],l.alertLevel=e.value,Math.hypot(l.x-s.x,l.z-s.z)<1.8&&e.value>40&&(e.value=100)}for(let h of n.npcs)h.behavior==="down"&&h.team==="enemy"&&!e.seenBodies.has(h)&&this.canSee(l.x,l.y+1.6,l.z,l.heading,h.x,h.y+.3,h.z,e.range*.8,e.fov)>0&&(e.seenBodies.add(h),e.value+=25,l.investigate=[h.x,h.z],l.alertLevel=e.value,n.toast("Um seguran\xE7a encontrou um colega desacordado!"))}for(let l of this.cameras){if(l.disabled>0)continue;let c=this.canSee(l.x,l.y,l.z,l.heading,s.x,s.y+(s.crouch?.8:1.4),s.z,14,.5);c>0&&(r=!0,e.value+=e.rate*.9*c*t*((o=e.camFactor)!=null?o:1))}if(!r&&e.value<100&&(e.value=Math.max(0,e.value-2.5*t)),e.value=Math.min(100,e.value),e.value>=100&&e.failAt100){this.renderAlert(),this.fail("ALARME ATIVADO \u2014 MISS\xC3O FRACASSADA");return}this.renderAlert()}addCamera(t,e,n,s,r){let a=new ze,o=new $t(new kt(.25,.18,.4),new nn({color:2763306})),l=new $t(new Ze(.04,6,4),new Ae({color:16719904}));l.position.set(0,.05,.21);let c=new Ae({color:16724e3,transparent:!0,opacity:.12,depthWrite:!1,side:_n}),h=new $t(new os(Math.tan(.5)*14,14,16,1,!0),c);h.rotation.x=-Math.PI/2,h.position.z=7,h.rotation.order="XYZ";let u=new ze;u.rotation.x=.35,u.add(o,l,h),a.add(u),a.position.set(t,e,n),this.G.scene.add(a);let d={x:t,y:e,z:n,base:s,sweep:r,heading:s,disabled:0,g:a,led:l,coneMat:c,t:Math.random()*6};return this.cameras.push(d),d}updateCameras(t){for(let e of this.cameras)e.t+=t,e.disabled=Math.max(0,e.disabled-t),e.disabled<=0&&(e.heading=e.base+Math.sin(e.t*.5)*e.sweep),e.g.rotation.y=e.heading,e.led.material.color.setHex(e.disabled>0?2105376:16719904),e.coneMat.opacity=e.disabled>0?0:.12}clearCameras(){for(let t of this.cameras)this.G.scene.remove(t.g);this.cameras=[]}async binoculars(t,e=1.4){let n=this.G;n.scope={fov:9},we("scope").style.display="block",n.player.pose="binoculars";let s=0;await this.until(r=>{let a=n.camera,o=new D;a.getWorldDirection(o);let l=new D(t[0]-a.position.x,t[1]-a.position.y,t[2]-a.position.z).normalize();return s=o.angleTo(l)<.04?s+r:0,we("scope-hint").textContent=s>0?"Focando...":"Use o mouse para observar a mans\xE3o",s>=e}),n.scope=null,we("scope").style.display="none",n.player.pose=null}capture(t,e=480,n=300,s=null){let r=this.G,a=r.renderer.domElement,o=t.aspect;t.aspect=a.width/a.height,t.updateProjectionMatrix(),r.renderer.render(r.scene,t);let l=document.createElement("canvas");l.width=e,l.height=n;let c=l.getContext("2d"),h=e/n,u=a.width,d=a.width/h;return d>a.height&&(d=a.height,u=d*h),c.drawImage(a,(a.width-u)/2,(a.height-d)/2,u,d,0,0,e,n),t.aspect=o,t.updateProjectionMatrix(),s&&s(c,e,n),l}},U_={inteligencia:"Intelig\xEAncia",frieza:"Frieza",carisma:"Carisma",manipulacao:"Manipula\xE7\xE3o",impulsividade:"Impulsividade"};var N_=`
#phone{position:fixed;right:24px;bottom:24px;width:300px;height:560px;max-height:calc(100vh - 48px);background:#0d0e12;border:3px solid #2a2c33;border-radius:28px;box-shadow:0 20px 60px rgba(0,0,0,.6);display:none;flex-direction:column;overflow:hidden;z-index:30;color:#eee;font-family:'Segoe UI',Arial,sans-serif}
#phone .bar{display:flex;justify-content:space-between;padding:10px 18px 6px;font-size:12px;opacity:.8}
#phone .scr{flex:1;overflow-y:auto;padding:8px 14px 14px}
#phone .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px 8px;padding-top:10px}
#phone .app{display:flex;flex-direction:column;align-items:center;gap:5px;font-size:10.5px;cursor:pointer;background:none;border:0;color:#ddd;padding:0}
#phone .ic{width:48px;height:48px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:#fff}
#phone h4{margin:6px 0 10px;font-size:16px;letter-spacing:.04em}
#phone .back{background:none;border:0;color:#e0a050;cursor:pointer;font-size:13px;padding:0;margin-bottom:6px}
#phone .item{background:#181a20;border-radius:10px;padding:9px 10px;margin-bottom:8px;font-size:12.5px;line-height:1.4}
#phone .item small{opacity:.6;display:block;margin-top:3px}
#phone .tag{display:inline-block;font-size:9.5px;padding:1px 5px;border-radius:4px;background:#5a2a2a;margin-left:6px;vertical-align:middle}
#phone .tag.n{background:#2a4a6a}
#phone img{width:100%;border-radius:8px;margin-top:6px;display:block}
#phone .btn{background:#e0a050;color:#111;border:0;border-radius:8px;padding:7px 10px;font-weight:700;cursor:pointer;margin:4px 4px 0 0;font-size:12px}
#phone .home{height:5px;width:110px;background:#555;border-radius:3px;margin:8px auto}
#phone-notif{position:fixed;right:24px;top:70px;background:rgba(15,16,20,.92);border-left:3px solid #e0a050;padding:9px 13px;font-size:13px;max-width:300px;opacity:0;transition:opacity .4s;z-index:25;pointer-events:none}
`,jf=[["mapa","Mapa","#3a8a5a","M"],["mensagens","Mensagens","#3a7ad0","\u2709"],["ligacoes","Liga\xE7\xF5es","#2aa060","\u260E"],["banco","Banco","#c8962a","$"],["camera","C\xE2mera","#555","\u25C9"],["garagem","Garagem","#6a5aa8","G"],["missoes","Miss\xF5es","#a83a3a","!"],["noticias","Not\xEDcias","#2a5a8a","N"],["vibe","VIBE","#d0306a","V"],["status","Status","#4a6a7a","\u2665"]],O_=[["arquivos","Arquivos","#5a5a3a","A"],["casos","Casos","#7a3a2a","C"],["contratos","Contratos","#2a2a2a","\u2726"],["ferramentas","Ferramentas","#2a6a6a","F"],["anotacoes","Anota\xE7\xF5es","#8a7a3a","\u270E"]],Ho=class{constructor(t){this.G=t,this.open=!1,this.app=null;let e=document.createElement("style");e.textContent=N_,document.head.appendChild(e),this.el=document.createElement("div"),this.el.id="phone",document.body.appendChild(this.el),this.notifEl=document.createElement("div"),this.notifEl.id="phone-notif",document.body.appendChild(this.notifEl),this.el.addEventListener("click",n=>{let s=n.target.closest("[data-app]");if(s){this.show(s.dataset.app);return}let r=n.target.closest("[data-act]");r&&this.action(r.dataset.act,r.dataset.arg)})}get C(){return this.G.state[this.G.state.char]}toggle(t=!this.open){this.open=t,this.el.style.display=t?"flex":"none",t&&(this.app=null,this.render())}notify(t){this.notifEl.textContent=t,this.notifEl.style.opacity=1,clearTimeout(this._nt),this._nt=setTimeout(()=>{this.notifEl.style.opacity=0},4200)}clock(){let t=this.G.state.hour;return String(Math.floor(t)).padStart(2,"0")+":"+String(Math.floor(t%1*60)).padStart(2,"0")}addMessage(t,e,n=null,s=this.G.state.char){this.G.state[s].messages.unshift({from:t,text:e,photo:n,day:this.G.state.day,time:this.clock()}),s===this.G.state.char&&this.notify("Nova mensagem de "+t)}addCall(t,e,n=this.G.state.char){this.G.state[n].calls.unshift({from:t,note:e,day:this.G.state.day,time:this.clock()})}addPost(t){var n;let e=this.G.state;e.feed.unshift({...t,day:e.day,time:this.clock(),likes:(n=t.likes)!=null?n:Math.floor(20+Math.random()*900)}),e.feed=e.feed.slice(0,60),t.notify!==!1&&this.notify("VIBE: @"+t.user+" publicou")}addNews(t,e=""){let n=this.G.state;n.news.unshift({title:t,body:e,day:n.day,time:this.clock()}),n.news=n.news.slice(0,40)}show(t){this.app=t,this.render()}action(t,e){let n=this.G;t==="back"&&(this.app=null,this.render()),t==="photo"&&(n.takePhoto&&n.takePhoto(),this.render()),t==="callcar"&&(n.callCar&&n.callCar(),this.toggle(!1)),t==="contract"&&(n.onContract&&n.onContract(e),this.render())}render(){let t=this.G,e=t.state,n=this.C,s=e.char==="ryan",r=`<div class="bar"><span>${this.clock()}</span><span>${s?"Ryan":"Ethan"} \xB7 4G \u25AE\u25AE\u25AE</span></div>`,a=h=>String(h).replace(/[&<>]/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[u]),o="",l='<button class="back" data-act="back">\u2039 Voltar</button>',c=(h,u,d)=>h.length?h.map(u).join(""):`<div class="item">${d}</div>`;switch(this.app){case null:{o=`<div class="grid">${(s?jf.concat(O_):jf).map(([u,d,f,g])=>`<button class="app" data-app="${u}"><span class="ic" style="background:${f}">${g}</span>${d}</button>`).join("")}</div>`;break}case"mapa":o=l+'<h4>Mapa</h4><canvas id="phone-map" width="260" height="260" style="width:100%;border-radius:10px;background:#1a2414"></canvas><div class="item">Amarelo: objetivo \xB7 Azul: seu carro \xB7 Vermelho: voc\xEA</div>';break;case"mensagens":o=l+"<h4>Mensagens</h4>"+c(n.messages,h=>`<div class="item"><b>${a(h.from)}</b><br>${a(h.text)}${h.photo?`<img src="${h.photo}" alt="foto">`:""}<small>Dia ${h.day} \xB7 ${h.time}</small></div>`,"Nenhuma mensagem.");break;case"ligacoes":o=l+"<h4>Liga\xE7\xF5es</h4>"+c(n.calls,h=>`<div class="item"><b>${a(h.from)}</b><br>${a(h.note||"")}<small>Dia ${h.day} \xB7 ${h.time}</small></div>`,"Nenhuma liga\xE7\xE3o.");break;case"banco":o=l+`<h4>Banco</h4><div class="item" style="font-size:22px">R$ ${n.money.toLocaleString("pt-BR")}</div><div class="item">Conta de ${s?"Ryan Cole":"Ethan Cross"}. O dinheiro de Ethan e de Ryan \xE9 separado.</div>`;break;case"camera":o=l+'<h4>C\xE2mera</h4><button class="btn" data-act="photo">Tirar foto</button>'+c(n.photos,h=>`<div class="item"><img src="${h.src}" alt="foto"><small>${a(h.label||"")} \xB7 Dia ${h.day}</small></div>`,"Nenhuma foto ainda.");break;case"garagem":o=l+`<h4>Garagem</h4><div class="item"><b>${s?"SUV preta":"Sedan azul"}</b><br>Combust\xEDvel: ${Math.round((t.ownCar()?t.ownCar().fuel:1)*100)}% \xB7 Estado: ${Math.round((t.ownCar()?t.ownCar().health:1)*100)}%</div><button class="btn" data-act="callcar">Chamar meu carro</button>`;break;case"missoes":o=l+"<h4>Miss\xF5es</h4>"+(t.missionList?t.missionList().map(h=>`<div class="item"><b>${a(h.title)}</b> ${h.status==="done"?'<span class="tag n">CONCLU\xCDDA</span>':h.status==="active"?'<span class="tag">EM ANDAMENTO</span>':h.status==="available"?'<span class="tag n">DISPON\xCDVEL</span>':'<span class="tag">BLOQUEADA</span>'}<small>${a(h.hint||"")}</small></div>`).join(""):"");break;case"noticias":o=l+"<h4>Not\xEDcias de Los Valles</h4>"+c(e.news,h=>`<div class="item"><b>${a(h.title)}</b><br>${a(h.body)}<small>Dia ${h.day} \xB7 ${h.time}</small></div>`,"Sem not\xEDcias.");break;case"vibe":o=l+'<h4 style="color:#ff5a9a">VIBE</h4>'+c(e.feed,h=>`<div class="item"><b>@${a(h.user)}</b>${h.tag?`<span class="tag ${h.tag==="NOT\xCDCIA"?"n":""}">${h.tag}</span>`:""}<br>${a(h.text)}${h.photo?`<img src="${h.photo}" alt="">`:""}<small>\u2665 ${h.likes} \xB7 ${(h.comments||[]).length} coment\xE1rios \xB7 Dia ${h.day} ${h.time}</small>${(h.comments||[]).map(u=>`<div style="margin-top:4px;opacity:.8">\u21B3 <b>@${a(u[0])}</b> ${a(u[1])}</div>`).join("")}</div>`,"Nada no feed.");break;case"status":{let h=n.needs,u=n.traits;o=l+`<h4>Status</h4><div class="item">Vida ${Math.round(n.hp)} \xB7 Fome ${Math.round(h.fome)} \xB7 Sede ${Math.round(h.sede)} \xB7 Sono ${Math.round(h.sono)} \xB7 Dor ${Math.round(h.dor)}</div><div class="item"><b>Personalidade</b><br>Intelig\xEAncia ${u.inteligencia} \xB7 Frieza ${u.frieza} \xB7 Carisma ${u.carisma} \xB7 Manipula\xE7\xE3o ${u.manipulacao} \xB7 Impulsividade ${u.impulsividade}</div><div class="item">Procurado (m\xE1ximo j\xE1 alcan\xE7ado): ${"\u2605".repeat(e.maxStars)}${"\u2606".repeat(6-e.maxStars)}<br>Blackwood: ${e.blackwood?"desbloqueada":"bloqueada (precisa de 2 estrelas)"}</div>`;break}case"arquivos":o=l+"<h4>Arquivos</h4>"+c(n.notes.filter(h=>h.type==="arquivo"),h=>`<div class="item"><b>${a(h.title)}</b><br>${a(h.text)}</div>`,"Nenhum arquivo.");break;case"casos":o=l+"<h4>Casos</h4>"+c(n.notes.filter(h=>h.type==="caso"),h=>`<div class="item"><b>${a(h.title)}</b><br>${a(h.text)}</div>`,"Nenhum caso aberto.");break;case"contratos":o=l+"<h4>Contratos</h4>"+c(n.contracts,h=>`<div class="item"><b>${a(h.title)}</b> <span class="tag">${a(h.status)}</span><br>${a(h.text)}${h.status==="oferta"?`<br><button class="btn" data-act="contract" data-arg="${h.id}:aceitar">Aceitar</button><button class="btn" data-act="contract" data-arg="${h.id}:recusar">Recusar</button>`:""}</div>`,"Nenhum contrato.");break;case"ferramentas":o=l+"<h4>Ferramentas</h4>"+(n.tools.pulso?'<div class="item"><b>Pulso Eletr\xF4nico</b><br>Desativa c\xE2meras pr\xF3ximas por alguns segundos. Tecla <b>Q</b>.</div>':'<div class="item">Nenhuma ferramenta desbloqueada.</div>');break;case"anotacoes":o=l+"<h4>Anota\xE7\xF5es</h4>"+c(n.notes.filter(h=>h.type==="nota"),h=>`<div class="item">${a(h.text)}</div>`,"Sem anota\xE7\xF5es.");break}this.el.innerHTML=r+`<div class="scr">${o}</div><div class="home"></div>`,this.app==="mapa"&&t.drawPhoneMap&&t.drawPhoneMap(document.getElementById("phone-map"))}},Jh={prologo:[{user:"lv_noticias",tag:"NOT\xCDCIA",text:"Grande opera\xE7\xE3o policial na favela esta noite. Um homem foi preso ap\xF3s batida de carro durante a fuga.",comments:[["joana.r","ouvi as sirenes daqui de casa"],["m4rcos","diz que um deles fugiu a p\xE9..."]]},{user:"boca_da_vila",tag:"RUMOR",text:"Algu\xE9m entregou o esquema. Ningu\xE9m sabe quem.",comments:[["anon_88","sempre tem um traidor"]]}],liberdade:[{user:"valles_24h",tag:"RUMOR",text:"Viram um carro blindado preto parado na frente da Penitenci\xE1ria hoje cedo. Quem ser\xE1 que saiu?",comments:[["lu.santos","carro de rico ou de bandido"],["deivid","kkkk os dois"]]}],victor:[{user:"lv_noticias",tag:"NOT\xCDCIA",text:"Confronto entre grupos rivais na Zona Industrial. Pol\xEDcia chegou depois que todos haviam deixado o local.",comments:[["zona_leste","de novo isso?"]]},{user:"motorista_lv",tag:"RUMOR",text:"Um carro passou voando pela Av. Los Valles sendo perseguido por outro. Parecia filme.",comments:[["bia.k","eu vi! quase bateu no \xF4nibus"]]}],ligacao:[{user:"anon_lv",tag:"RUMOR",text:"Tem gente fotografando pessoas na rua sem elas saberem. Cuidado, Los Valles.",notify:!1}],mansao:[{user:"condominio_norte",tag:"RUMOR",text:"Barulho estranho vindo daquela mans\xE3o enorme l\xE1 do norte. Seguran\xE7as correndo pra todo lado.",comments:[["vizinho_x","aquilo ali nunca foi normal"]]}],galpao:[{user:"lv_noticias",tag:"NOT\xCDCIA",text:"Policial \xE9 encontrado morto em galp\xE3o abandonado na Zona Industrial. A pol\xEDcia n\xE3o divulgou suspeitos.",comments:[["rafa_m","mais um..."],["anon_77","policial em galp\xE3o abandonado? estranho"]]},{user:"olho_vivo",tag:"RUMOR",text:"Gente falando que viram algu\xE9m de capuz correndo pela Zona Industrial naquela noite. N\xE3o confirmado.",comments:[["k4mila","fonte?"]]}],investigacao:[{user:"lv_noticias",tag:"NOT\xCDCIA",text:"Investiga\xE7\xE3o sobre a morte do policial segue em sigilo."}],fernando:[{user:"bairro_oeste",tag:"RUMOR",text:"Algu\xE9m ouviu gritos de socorro numa casa perto da sa\xEDda oeste de madrugada.",comments:[["vigia_noturno","as c\xE2meras de l\xE1 apagaram do nada"]]}],procurado:[{user:"valles_24h",tag:"RUMOR",text:"Persegui\xE7\xE3o policial agora no centro! Fiquem longe das avenidas."},{user:"lv_transito",tag:"NOT\xCDCIA",text:"Viaturas bloqueiam ruas ap\xF3s confus\xE3o. Tr\xE2nsito lento na regi\xE3o."}],acidente:[{user:"lv_transito",tag:"NOT\xCDCIA",text:"Acidente entre ve\xEDculos deixa tr\xE2nsito lento. Sem feridos graves."}],aleatorio:[{user:"cafe_noir",text:"Caf\xE9 novo no card\xE1pio hoje. Passa aqui! \u2615"},{user:"joana.r",text:"Los Valles \xE0 noite tem outra cara."},{user:"pizzaria_napoli",text:"Promo\xE7\xE3o de ter\xE7a: pizza grande pela metade do pre\xE7o."},{user:"m4rcos",text:"Algu\xE9m mais acha que essa cidade esconde coisa demais?"},{user:"lv_clima",tag:"NOT\xCDCIA",text:"Previs\xE3o: noite com nuvens e possibilidade de chuva."}]};var ea=(i,t,e)=>Math.max(t,Math.min(e,i));function Kh(i,t,e){let n=Math.sin(i.heading),s=Math.cos(i.heading),r=t-i.x,a=e-i.z,o=r*n+a*s,l=r*s-a*n;o<.5&&Math.abs(l)<2&&(o=.5);let c=Math.max(4,l*l+o*o),h=Math.atan(2*i.T.wheelBase*l/c),u=.62/(1+Math.abs(i.speed)*.07);return{steer:ea(h/u,-1,1),dist:Math.hypot(r,a),ahead:o}}function jh(i,t){let e=t-i.speed;return{throttle:ea(e*.5,0,1),brake:ea(-e*.6,0,1)}}var Wi=class{constructor(t,e,n={}){var s;this.car=t,this.route=e,this.i=0,this.done=!1,this.cruise=n.speed||24,this.rubber=(s=n.rubber)!=null?s:!0,this.player=n.player,this.stuckT=0,this.reverseT=0,t.driver="ai"}update(t,e){let n=this.car;if(this.done){n.update(t,{brake:0,throttle:0,steer:0,handbrake:1},e.cars);return}this.prev||(this.prev=[n.x,n.z]);let[s,r]=this.route[this.i],[a,o]=this.i>0?this.route[this.i-1]:this.prev,l=s-a,c=r-o,h=Math.hypot(l,c)||1,u=((n.x-a)*l+(n.z-o)*c)/h,d=6+Math.abs(n.speed)*.45,f=Math.min(h,Math.max(0,u)+d),g=Kh(n,a+l/h*f,o+c/h*f);if(g.dist=Math.hypot(s-n.x,r-n.z),(u>h-4||g.dist<6)&&(this.i++,this.i>=this.route.length)){this.done=!0;return}let x=this.cruise;if(this.i+1<this.route.length){let[p,b]=this.route[this.i+1],y=Math.atan2(s-n.x,r-n.z),v=Math.atan2(p-s,b-r),T=Math.abs(v-y);T>Math.PI&&(T=Math.PI*2-T),g.dist<35&&T>.6&&(x=Math.min(x,7+(1-T/Math.PI)*6))}if(this.rubber&&this.player){let p=Math.hypot(this.player.x-n.x,this.player.z-n.z);p>90?x*=.6:p<18&&(x*=1.15)}let m={...jh(n,x),steer:g.steer,handbrake:0};if(Math.abs(n.speed)<1&&!this.done?this.stuckT+=t:this.stuckT=0,this.stuckT>1.5&&(this.reverseT=1.2,this.stuckT=0,this.stuckCount=(this.stuckCount||0)+1),this.reverseT>0&&(this.reverseT-=t,m={throttle:0,brake:1,steer:-g.steer,handbrake:0}),this.stuckCount>=4&&this.i<this.route.length){let[p,b]=this.route[this.i],[y,v]=this.i>0?this.route[this.i-1]:[n.x,n.z];n.place(p,b,Math.atan2(p-y,b-v)),n.speed=8,this.stuckCount=0,this.i=Math.min(this.i+1,this.route.length-1)}n.speed>5&&(this.stuckCount=0),n.update(t,m,e.cars)}},or=class{constructor(t,e,n={}){this.car=t,this.getTarget=e,this.max=n.speed||26,this.stuckT=0,this.reverseT=0,t.driver="ai"}update(t,e){let n=this.car,s=this.getTarget();if(!s){n.update(t,{brake:1},e.cars);return}let r=Kh(n,s.x,s.z),a=ea(r.dist*.9,0,this.max);r.dist<8&&(a=Math.min(a,4));let o={...jh(n,a),steer:r.steer,handbrake:0};r.ahead<0&&r.dist<15&&(o={throttle:0,brake:1,steer:-r.steer,handbrake:0}),Math.abs(n.speed)<.8&&r.dist>10?this.stuckT+=t:this.stuckT=0,this.stuckT>1.5&&(this.reverseT=1.1,this.stuckT=0),this.reverseT>0&&(this.reverseT-=t,o={throttle:0,brake:1,steer:-r.steer,handbrake:0}),n.update(t,o,e.cars),this.dist=r.dist}},na=class{constructor(t,e){this.car=t,this.getLeader=e,t.driver="ai",this.reverseT=0,this.stuckT=0}update(t,e){let n=this.car,s=this.getLeader();if(!s){n.update(t,{brake:1},e.cars);return}let r=Math.sin(s.heading),a=Math.cos(s.heading),o=s.x-r*11,l=s.z-a*11,c=Kh(n,o,l),h=Math.abs(s.speed||0),u=c.dist<4?Math.min(h,2):ea(h+(c.dist-8)*.6,0,34),d={...jh(n,u),steer:c.steer,handbrake:0};Math.abs(n.speed)<.8&&c.dist>12?this.stuckT+=t:this.stuckT=0,this.stuckT>2&&(this.reverseT=1.1,this.stuckT=0),this.reverseT>0&&(this.reverseT-=t,d={throttle:0,brake:1,steer:-c.steer,handbrake:0}),n.update(t,d,e.cars),this.dist=c.dist}};var gn="Ethan";var ia=(i,t)=>i.npcs.filter(e=>e.team==="enemy"&&e.tag===t&&e.behavior!=="down"&&!e.removed);function ti(i){return i.city.ethanHouse}function rn(i,t,e,n=0){return i.npc("ryan","ryan",{x:t,z:e,heading:n,role:"story",hp:400,damage:14,interactable:!1})}function Vo(i,t,e,n,s="g"){let r=[];for(let a=0;a<t;a++){let o=i.npc(s+a,Gi(),{x:e+a%3*1.2-1.2,z:n+Math.floor(a/3)*1.4+1.5,name:"Guarda",role:"story",hp:260,damage:12,interactable:!1});r.push(o)}return r}function sa(i,t,e,n,s,r,a={}){var l,c;let o=i.npc(t,e,{x:n,z:s,name:a.name||"Capanga",role:"enemy",team:"enemy",behavior:"hostile",hp:(l=a.hp)!=null?l:70,damage:(c=a.damage)!=null?c:6,interactable:!1,run:4.2,...a});return o.team="enemy",o.tag=r,o}function Qf(i,t,e,n,s,r,a,o){return i.car(e,n,s,r,a,o)}function k_(i){return i.showDocument("O LIVRO",'<div class="book"><p><b>Nome:</b> Lucas</p><p><b>Idade:</b> 26 anos</p><p><b>Profiss\xE3o:</b> policial corrupto</p><p><b>Resid\xEAncia:</b> mans\xE3o gigantesca</p><p><b>Seguran\xE7a:</b> sete guardas</p></div>')}var tp=[{id:"prologo",title:"Pr\xF3logo \u2014 A Trai\xE7\xE3o",auto:!0,next:"liberdade",hint:"A opera\xE7\xE3o policial no esconderijo.",stages:[{name:"esconderijo",async run(i,t){let e=t.zones.spots;t.setHour(22.5),t.player.setLook(We.ethanYoung.look),await i.fadeOut(.01);let[n,s]=e.hideoutChair;i.placePlayer(n,s,Math.PI),t.player.pose="chair";let r=i.npc("ryan","ryanYoung",{x:e.hideoutOut[0],z:e.hideoutOut[1]+2,heading:Math.PI,behavior:"scripted",role:"story",hp:400,damage:14});r.goalSpeed=5.5,await i.cutscene(async()=>{i.shot([n+2.8,2.25,s+2.6],[n,1,s],0,[n+2.4,2.1,s+2.2],[n,1.05,s]),await i.fadeIn(1.2),await i.card("LOS VALLES \u2014 13 DE AGOSTO DE 2027","Esconderijo da gangue, na favela",3.2),t.sound("siren",4),r.goal=e.hideoutDoorIn,await i.until(()=>!r.goal),r.faceTo=[n,s],i.frame(t.player,r,1,2.8),await i.say(r,"Chefe, a pol\xEDcia t\xE1 invadindo! Tem algum espi\xE3o ou traidor! E agora?"),i.over(r,t.player,1.8),await i.say(gn,"Vamos fugir.")}),t.player.pose=null}},{name:"fuga",cp:"hideout",async run(i,t){let e=t.zones.spots;i.resumed&&(t.setHour(22.5),t.player.setLook(We.ethanYoung.look),i.placePlayer(...e.hideoutOut,0));let n=i.npc("ryan","ryanYoung",{x:e.hideoutOut[0]+1,z:e.hideoutOut[1],role:"story",hp:400});i.follow(n);let s=Qf(i,t,"fugaCar","sedan",2763312,e.hideoutCar[0],e.hideoutCar[1],Math.PI/2);await i.goto([s.x,s.z],3,"Corra at\xE9 o carro e fuja (E para entrar)"),await i.until(()=>t.car===s),t.sound("siren",6);for(let o=0;o<3;o++){let l=i.car("pol"+o,"police",16777215,-4+o*4,290-o*9,Math.PI);t.aiDrivers.push(new or(l,()=>t.car||t.player,{speed:24}))}let r=Vt.crashWall;i.objective("Fuja da pol\xEDcia!",[r.x-20,r.z]);let a=i.t;await i.until(()=>t.car&&Math.hypot(t.car.x-(r.x-20),t.car.z-r.z)<25||i.t-a>70),i.clearObjective()}},{name:"batida",async run(i,t){let e=Vt.crashWall,n=i.get("fugaCar");(!n||t.car!==n)&&(n=Qf(i,t,"fugaCar","sedan",2763312,e.x-70,e.z,Math.PI/2),i.putInCar(n));let s=i.get("ryan")||i.npc("ryan","ryanYoung",{x:e.x-70,z:e.z+3});i.follow(s),i.onEnterCar(n),await i.cutscene(async()=>{n.place(e.x-55,e.z+.3,Math.PI/2),n.speed=24,t.forceCarInput={throttle:1,steer:.08},i.shot([e.x-8,2.2,e.z+12],[e.x-30,1,e.z],2.3,[e.x-6,1.6,e.z+9],[e.x-2,1,e.z]);let r=i.t;await i.until(()=>n.lastHit>4||n.x>e.x-4.5||i.t-r>5),t.forceCarInput=null,t.sound("crash"),t.shake(.8),await i.wait(1.4);for(let o=0;o<3;o++){let l=i.get("pol"+o)||i.car("pol"+o,"police",16777215,e.x-40,e.z,Math.PI/2);l.place(e.x-18-o*7,e.z+(o-1)*4,Math.PI/2+(o-1)*.4),l.speed=0}t.aiDrivers=[],i.unfollow(s),s.behavior="flee",s.route=[[e.x-6,e.z+10],[e.x-2,e.z+30],[e.x+30,e.z+50]],s.routeI=0,s.runSpeed=6,t.forceExitCar(),t.player.pose="handsup";let a=[];for(let o=0;o<4;o++)a.push(i.npc("cop"+o,ar(),{x:t.player.x-6+o*2.5,z:t.player.z+5-o%2*9,role:"story",name:"Policial",behavior:"scripted"}));a.forEach((o,l)=>{o.goal=[t.player.x+Math.sin(l*1.6)*2.2,t.player.z+Math.cos(l*1.6)*2.2],o.goalSpeed=3,o.faceTo=[t.player.x,t.player.z]}),i.shot([t.player.x+7,3.5,t.player.z+6],[t.player.x,1.2,t.player.z],3.5,[t.player.x+4,2.2,t.player.z+3.5],[t.player.x,1.3,t.player.z]),await i.wait(2.2),i.shot([e.x-6,2,e.z+4],[e.x+10,1,e.z+40],2.5),await i.wait(2.2),await i.fadeOut(1.2),await i.card("Ethan foi capturado pela pol\xEDcia.","Ryan conseguiu escapar.",3.5),await i.card("SETE ANOS DEPOIS","",2.8)}),t.player.pose=null,t.vibe("prologo")}}]},{id:"liberdade",title:"Sete Anos Depois",auto:!0,next:null,hint:"Ethan \xE9 libertado.",stages:[{name:"saida",async run(i,t){let e=t.zones.spots;t.setHour(9.5),t.player.setLook(We.ethanPrison.look),i.placePlayer(...e.prisonGateIn,Math.PI/2),i.fade>0&&await i.fadeIn(1.2),await i.card("PENITENCI\xC1RIA ESTADUAL \u2014 2034","Ethan Cross \xE9 libertado",3),await i.goto(e.prisonGateOut,3,"Saia da penitenci\xE1ria")}},{name:"carro-preto",async run(i,t){let e=t.zones.spots;i.resumed&&(t.setHour(9.7),t.player.setLook(We.ethanPrison.look),i.placePlayer(...e.prisonGateOut,Math.PI/2));let[n,s]=e.prisonPickup,r=i.car("blindado","suv",723725,-238,74.25,-Math.PI/2),a=i.npc("motorista","driver",{x:-238,z:74,role:"story",interactable:!1});i.seat(a,r,-1);let o=new Wi(r,[[-270,74.3],[n+4,s]],{speed:13,rubber:!1});t.aiDrivers.push(o),i.objective("Espere na entrada",null),await i.until(()=>o.done&&Math.abs(r.speed)<.5),await i.cutscene(async()=>{i.frame(t.player,r,-1,4.5,1.8),await i.wait(.6),await i.say("Motorista","Cole me mandou te buscar.")}),i.objective("Entre no carro preto",()=>r.doorPos(-1)),await i.press(()=>r.doorPos(-1),2.6,"[E] Entrar no carro preto"),i.clearObjective(),await i.fadeOut(1),i.despawn("blindado"),i.despawn("motorista")}},{name:"reencontro",async run(i,t){let e=ti(t);t.setHour(17.8),t.player.setLook(We.ethanPrison.look),i.placePlayer(e.door[0]+1,e.door[1]+5,Math.PI);let n=rn(i,e.door[0]-.5,e.door[1]+1.5,0);n.behavior="stand",await i.cutscene(async()=>{i.frame(t.player,n,1,3.4),await i.fadeIn(1.2),await i.say(n,"Ethan. Sete anos..."),await i.say(n,"O nosso antigo esconderijo j\xE1 era. O grupo rival destruiu tudo."),await i.say(n,"Pelo que eu sei, s\xF3 sobramos n\xF3s dois."),i.over(t.player,n),await i.say(n,"Esse tempo todo eu fiquei investigando quem traiu a gente."),await i.say(n,"Consegui preservar tr\xEAs nomes de um livro."),i.over(n,t.player),await i.choose([{text:"Quem fez isso vai pagar.",trait:"frieza",line:"Quem fez isso vai pagar."},{text:"Vamos com calma. Primeiro eu quero entender tudo.",trait:"inteligencia",line:"Vamos com calma. Primeiro eu quero entender tudo."},{text:"Me passa esses nomes. Agora.",trait:"impulsividade",line:"Me passa esses nomes. Agora."}]),i.frame(t.player,n,-1,3),await i.say(gn,"Eu vou descobrir quem est\xE1 por tr\xE1s de tudo isso.")}),t.player.setLook(We.ethan.look),t.vibe("liberdade"),t.phone.addMessage("Ryan Cole","Descansa hoje. Amanh\xE3 a gente come\xE7a pelos nomes do livro. Me encontra quando estiver pronto.")}}]},{id:"nomes",title:"Os Nomes do Livro",start:i=>[ti(i).door[0],ti(i).door[1]+3],next:"lucas",hint:"Comece na casa de Ryan (marcador amarelo).",stages:[{name:"encontrar-ryan",async run(i,t){let e=ti(t);await i.fadeOut(.8),t.setHour(9),i.placePlayer(e.door[0],e.door[1]+4,0);let n=t.ethanCar;Math.hypot(n.x-e.driveway[0],n.z-e.driveway[1])>30&&!t.car&&n.place(e.driveway[0],e.driveway[1],e.heading+Math.PI),await i.fadeIn(.8),await i.card("No dia seguinte","",2.2);let s=wn(4),r=wn(3)+10;rn(i,s,r,Math.PI),Vo(i,5,s+3,r-2),i.car("carroGuardas","suv",1052688,s-6,r+4,0),await i.goto([s,r],10,"Pegue um carro e encontre Ryan")}},{name:"casa-abandonada",async run(i,t){let e=wn(4),n=wn(3)+10;i.resumed&&(t.setHour(9.3),i.placePlayer(e+4,n+6,Math.PI));let s=rn(i,e,n,Math.PI),r=Vo(i,5,e+3,n-2),a=i.car("carroGuardas","suv",1052688,e-6,n+4,0);await i.cutscene(async()=>{i.frame(t.player,s,1,3.2),await i.say(s,"Chegou. Esses s\xE3o os nossos homens."),await i.say(s,"Primeiro a casa abandonada. Depois a gente vai at\xE9 a \xE1rea deles.")}),i.follow(s,!0),r.forEach(o=>{i.seat(o,a,r.indexOf(o)===0?-1:r.indexOf(o)-1)}),t.aiDrivers.push(new na(a,()=>t.car||t.player)),await i.goto(t.zones.spots.abandonedFront,14,"Dirija at\xE9 a casa abandonada (os guardas seguem voc\xEA)"),await i.goto(t.zones.spots.abandonedInside,3,"Verifique a casa abandonada",{foot:!0}),await i.say(s,"N\xE3o tem ningu\xE9m aqui.",{sub:!0}),await i.say(s,"Eles est\xE3o no territ\xF3rio deles, na Zona Industrial.",{sub:!0})}},{name:"territorio",async run(i,t){let e=t.zones.spots.rivalCenter;i.resumed&&i.placePlayer(285,6,Math.PI/2);let n=rn(i,t.player.x+2,t.player.z+2);i.follow(n,!0);let s=i.car("carroGuardas","suv",1052688,t.player.x-10,t.player.z,Math.PI/2),r=Vo(i,5,s.x,s.z);t.aiDrivers.some(a=>a.car===s)||(r.forEach((a,o)=>i.seat(a,s,o===0?-1:o-1)),t.aiDrivers.push(new na(s,()=>t.car||t.player))),await i.goto(e,45,"V\xE1 at\xE9 o territ\xF3rio do grupo rival"),t.aiDrivers=t.aiDrivers.filter(a=>a.car!==s),r.forEach(a=>{a.inCar&&i.unseat(a),i.follow(a,!0)})}},{name:"confronto",async run(i,t){let e=t.zones.spots.rivalCenter;i.resumed&&i.placePlayer(e[0]-30,e[1]+25,Math.PI*.75);let n=rn(i,t.player.x+2,t.player.z+1);i.follow(n,!0);let s=Vo(i,5,t.player.x-3,t.player.z+2);s.forEach(a=>i.follow(a,!0));for(let a=0;a<8;a++)sa(i,"rival"+a,Wf(),e[0]+a%4*4-6,e[1]-4+Math.floor(a/4)*6,"rival",{hp:60,damage:5});let r=sa(i,"blake","blake",e[0]+6,e[1]-8,"blake",{name:"Blake Morrison",hp:9999,damage:7});i.failChecks=[()=>t.player.hp<=0?"Ethan foi derrotado":null],i.objective("Enfrente o grupo rival (F para golpear)",e),await i.until(()=>ia(t,"rival").length<=1||r.hp<9930),i.failChecks=null,i.clearObjective(),ia(t,"rival").forEach(a=>a.knockDown(0)),r.behavior="scripted",r.team="neutral",r.pose="handsup",r.goal=null,r.faceTo=[t.player.x,t.player.z],s.forEach(a=>{a.behavior="stand"}),n.behavior="stand",s[3].knockDown(0),s[4].knockDown(0),await i.cutscene(async()=>{i.placePlayer(r.x-Math.sin(r.heading)*-3,r.z+3.2,Math.PI),t.player.heading=Math.atan2(r.x-t.player.x,r.z-t.player.z),t.player.sync(),r.faceTo=[t.player.x,t.player.z],i.frame(t.player,r,1,3),await i.say(r,"Para! Para! Eu me rendo!"),await i.say(r,"Eu falo! Eu conto tudo o que eu sei!"),await i.say(gn,"Ent\xE3o fala.");let a=i.car("carroVictor","sedan",657930,328.25,4,Math.PI),o=i.npc("victor","victor",{x:a.x,z:a.z,role:"story",interactable:!1});i.seat(o,a,-1),t.aiDrivers.push(new Wi(a,[[328.25,-20],[r.x+5,r.z+4]],{speed:12,rubber:!1})),i.shot([r.x-4,2.5,r.z+7],[a.x,1,a.z],3,[r.x-3,2.2,r.z+6],[r.x+5,1,r.z+4]),t.sound("screech");let l=i.t;await i.until(()=>t.aiDrivers.every(c=>c.car!==a||c.done)&&Math.abs(a.speed)<.6||i.t-l>14),i.unseat(o),o.x=a.x-1.5,o.z=a.z+1.5,o.behavior="scripted",o.faceTo=[r.x,r.z],i.frame(o,r,-1,3.4),await i.say(o,"Blake. Nem mais uma palavra."),r.pose=null,r.faceTo=[o.x,o.z],i.over(t.player,o,2.6),await i.wait(1.2),i.seat(o,a,-1),await i.wait(.4)}),t.vibe("victor")}},{name:"perseguicao",async run(i,t){let e=t.zones.spots.rivalCenter;i.resumed&&i.placePlayer(e[0]-6,e[1]+6,0);let n=rn(i,t.player.x+2,t.player.z+1);i.follow(n,!0);let s=i.car("carroVictor","sedan",657930,e[0]+10,e[1]-2,Math.PI),r=i.npc("victor","victor",{x:s.x,z:s.z,role:"story",interactable:!1});r.inCar||i.seat(r,s,-1),t.aiDrivers=t.aiDrivers.filter(h=>h.car!==s);let a=[[330-1.75,-20],[328.25,-6],[300,-1.75],[234,-1.75],[153.75,-1.75],[153.75,-76],[153.75,-150],[153.75,-228],[153.75,-300]],o=new Wi(s,a,{speed:30,player:t.player});t.aiDrivers.push(o);let l=i.car("carroGrupo","sedan",2767434,t.player.x-4,t.player.z+2,Math.PI/2);i.objective("Persiga Victor Kane",()=>[s.x,s.z]);let c=i.t;await i.until(()=>o.done||i.t-c>70),await i.fadeOut(.8),i.despawn("carroVictor"),i.despawn("victor"),await i.card("Victor Kane conseguiu escapar.","",2.6),i.clearObjective(),await i.fadeIn(.8)}},{name:"livro",async run(i,t){let e=t.zones.spots.book,n=rn(i,e[0]-2,e[1]+2);i.follow(n,!0);let s=i.get("blake");s&&(s.behavior="scripted",s.lines=["..."],s.interactable=!0),await i.goto(e,2.2,"Volte ao territ\xF3rio e recupere o livro",{foot:!1}),await i.press(e,2.4,"[E] Pegar o livro"),t.sound("page"),await i.cutscene(async()=>{i.shot([e[0]+1.2,1.9,e[1]+1.4],[e[0],1,e[1]]),await i.fadeOut(.6),await i.card("O livro foi recuperado.","Dois integrantes do grupo de Ethan morreram durante os acontecimentos.",4),i.placePlayer(e[0]-1,e[1]+2.5,Math.PI*.8),n.x=e[0]-2.6,n.z=e[1]+1.2,n.behavior="stand",i.frame(t.player,n,1,2.8),await i.fadeIn(.6),await i.say(n,"Finalmente. O livro."),await i.say(gn,"Vamos ver o primeiro nome.")})}}]},{id:"lucas",title:"O Primeiro Suspeito",auto:!0,next:null,hint:"O primeiro nome do livro.",stages:[{name:"primeiro-nome",async run(i,t){let e=t.zones.spots.book;i.resumed&&i.placePlayer(e[0]-1,e[1]+2.5,Math.PI*.8);let n=rn(i,t.player.x-1.6,t.player.z-1.2);n.behavior="stand",await i.cutscene(async()=>{i.frame(t.player,n,1,2.8),await k_(t),await i.say(gn,"Lucas... Eu quero descobrir o que ele sabe sobre a trai\xE7\xE3o."),t.sound("ring"),t.player.phone=!0,i.over(n,t.player,2),await i.say("Celular","\u{1F4F1} N\xFAmero desconhecido est\xE1 ligando...",{}),await i.say("Desconhecido","Eu sei de tudo, sei quem te traiu e quem te trair\xE1 mais pra frente e eu t\xF4 te vendo agora..."),t.player.phone=!1,t.phone.addCall("N\xFAmero desconhecido","Liga\xE7\xE3o recebida \u2014 encerrada pelo outro lado"),await i.say("Celular","A liga\xE7\xE3o foi encerrada.");let s=t.camera.clone(),r=t.player,a=r.heading+Math.PI+.5;s.position.set(r.x+Math.sin(a)*34,r.y+9,r.z+Math.cos(a)*34),s.fov=14,s.updateProjectionMatrix(),s.lookAt((r.x+n.x)/2,r.y+1.1,(r.z+n.z)/2);let l=i.capture(s,400,260,(c,h,u)=>{let d=c.getImageData(0,0,h,u);for(let f=0;f<d.data.length;f+=4){let g=d.data[f]*.3+d.data[f+1]*.59+d.data[f+2]*.11+(Math.random()-.5)*30;d.data[f]=d.data[f+1]=d.data[f+2]=g}c.putImageData(d,0,0)}).toDataURL("image/jpeg",.7);t.phone.addMessage("N\xFAmero desconhecido","",l),t.addPhoto(l,"Foto recebida de n\xFAmero desconhecido"),t.sound("ping"),await t.showDocument("Nova mensagem \u2014 N\xFAmero desconhecido",`<img src="${l}" style="width:100%;border-radius:6px" alt="Foto de Ethan e Ryan tirada de longe">`),i.frame(t.player,n,-1,2.8),await i.say(n,"Algu\xE9m est\xE1 observando a gente.")}),t.vibe("ligacao")}}]},{id:"irmao",title:"O Irm\xE3o",start:i=>[ti(i).door[0],ti(i).door[1]+3],after:"lucas",next:null,hint:"\xC0 noite, observar a mans\xE3o de Lucas.",stages:[{name:"colina",async run(i,t){let e=ti(t);t.state.hour>5&&t.state.hour<20&&(await i.fadeOut(.8),t.setHour(22),i.placePlayer(e.door[0],e.door[1]+4,0),await i.fadeIn(.8),await i.card("Durante a noite","",2));let n=rn(i,t.player.x+1.5,t.player.z+1);i.follow(n),await i.goto(t.zones.spots.hillTop,6,"V\xE1 com Ryan at\xE9 a colina de onde se v\xEA a mans\xE3o de Lucas",{foot:!1})}},{name:"binoculos",async run(i,t){let e=t.zones.spots,n=e.brotherWindow;(i.resumed||t.state.hour>5&&t.state.hour<19)&&t.setHour(22.3),i.resumed&&i.placePlayer(e.hillTop[0],e.hillTop[1],Math.PI/2);let s=rn(i,t.player.x-1.5,t.player.z+1);i.follow(s);let r=i.npc("irmao","brother",{x:n[0],z:n[2],y:n[1],role:"story",interactable:!1,heading:-Math.PI/2});r.behavior="stand",r.role="story-static",r.homeHeading=-Math.PI/2,r.fixedY=!0,r.y=n[1],await i.press(e.hillTop,5,"[E] Usar bin\xF3culos"),i.clearObjective(),t.inputLocked=!0,await i.binoculars([n[0],n[1]+1.5,n[2]]),t.inputLocked=!1,await i.cutscene(async()=>{i.shot([n[0]-6,n[1]+1.8,n[2]+1],[n[0],n[1]+1.5,n[2]],3,[n[0]-3.5,n[1]+1.7,n[2]+.4],[n[0],n[1]+1.55,n[2]]),await i.wait(1.5),i.frame(t.player,s,1,2.6),await i.say(gn,"Aquele filho da puta... Eu vou matar ele... Por que logo voc\xEA?"),await i.say(s,"Quem \xE9, Ethan?"),i.over(s,t.player,1.8),await i.say(gn,"Eu conhe\xE7o aquela pessoa h\xE1 muito tempo."),await i.say(gn,"\xC9 o meu irm\xE3o. Todo mundo achava que ele estava morto h\xE1 dez anos."),i.over(t.player,s,1.8),await i.say(s,"O qu\xEA?! Teu irm\xE3o?!")}),i.despawn("irmao")}}]},{id:"fotografia",title:"A Fotografia",start:i=>[ti(i).door[0],ti(i).door[1]+3],after:"irmao",next:"mansao",hint:"Examine o livro na casa de Ryan.",stages:[{name:"foto",async run(i,t){let e=ti(t),n=rn(i,e.door[0]-1.6,e.door[1]+2.5,0);n.behavior="stand",i.objective("Examine o livro com Ryan",[e.door[0],e.door[1]+3]),await i.press([e.door[0],e.door[1]+3],3,"[E] Examinar o livro"),i.clearObjective(),await i.cutscene(async()=>{i.frame(t.player,n,1,2.8);let s=t.storyPhoto("irmaoPolicial");await t.showDocument("Fotografia encontrada dentro do livro",`<img src="${s}" style="width:100%" alt="Fotografia do irm\xE3o de Ethan com um policial, datada de 12/08/2027"><p style="margin-top:10px">Data: <b>12/08/2027</b> \u2014 um dia antes da opera\xE7\xE3o policial na favela que terminou com a pris\xE3o de Ethan.</p>`),t.addPhoto(s,"Fotografia do livro \u2014 12/08/2027"),await i.say(gn,"Meu irm\xE3o? Ele fez isso? N\xE3o acredito..."),i.over(n,t.player,1.8),await i.say(gn,"Vamos invadir aquela mans\xE3o hoje \xE0 noite, eu, voc\xEA e s\xF3 1 guarda.")})}},{name:"viagem",async run(i,t){let e=ti(t);i.resumed&&i.placePlayer(e.door[0],e.door[1]+4,0);let n=rn(i,t.player.x+1.5,t.player.z+1);i.follow(n,!0);let s=i.npc("guardaMansao",Gi(),{x:t.player.x-1.5,z:t.player.z+1,name:"Guarda",hp:260,damage:12,interactable:!1});i.follow(s,!0),await i.goto(t.zones.spots.mansionApproach,16,"Dirija at\xE9 a mans\xE3o de Lucas (voc\xEA controla a viagem)"),await i.fadeOut(1.2),t.setHour(23.6),await i.card("Mais tarde, naquela noite","",2)}}]},{id:"mansao",title:"A Mans\xE3o",auto:!0,next:"galpao",hint:"Invas\xE3o silenciosa.",stages:[{name:"infiltracao",async run(i,t){let e=t.zones.spots;t.setHour(23.6),i.placePlayer(e.mansionApproach[0],e.mansionApproach[1],Math.PI);let n=rn(i,e.mansionApproach[0]+1.5,e.mansionApproach[1]+2);n.behavior="stand",n.pose=null;let s=i.npc("guardaMansao",Gi(),{x:e.mansionApproach[0]-1.5,z:e.mansionApproach[1]+2,name:"Guarda",hp:260,damage:12,interactable:!1});s.behavior="stand",i.follow(n,!0),i.unfollow(n),i.follow(s,!0),i.unfollow(s),n.behavior="stand",s.behavior="stand",n.team=s.team="ally",i.car("carroInvasao","suv",1052690,e.mansionCarOut[0],e.mansionCarOut[1]+8,Math.PI),e.guardRoutes.forEach((r,a)=>{let o=i.npc("seg"+a,Fo(),{x:r[0][0],z:r[0][1],name:"Seguran\xE7a",role:"enemy",team:"enemy",behavior:"guard",route:r,hp:60,damage:8,interactable:!1,walk:1.3});o.team="enemy",o.tag="mansao"}),i.fade>0&&await i.fadeIn(1),i.startAlert({range:15,fov:.8,rate:75}),t.toast("C: agachar \xB7 F por tr\xE1s: nocautear em sil\xEAncio",4),await i.goto(e.mansionDoor,2.2,"Entre na mans\xE3o sem ativar o alarme",{foot:!0}),i.stopAlert()}},{name:"lucas",async run(i,t){let e=t.zones.spots;t.setHour(23.8);for(let c=0;c<7;c++){let h=i.get("seg"+c);h&&h.behavior!=="down"&&(h.behavior="stand",h.team="neutral",h.x=h.homeX,h.z=h.homeZ)}i.placePlayer(e.mansionHall[0],e.mansionHall[1]+1,Math.PI);let n=rn(i,t.player.x+1.4,t.player.z+1.2),s=i.npc("guardaMansao",Gi(),{x:t.player.x-1.4,z:t.player.z+1.2,name:"Guarda",hp:260,damage:12});i.follow(n,!0),i.follow(s,!0);let r=i.npc("lucas","lucas",{x:e.lucasHall[0],z:e.lucasHall[1]-1,role:"story",heading:0,behavior:"scripted",interactable:!1});r.faceTo=[t.player.x,t.player.z];let a=[];for(let c=0;c<3;c++)a.push(sa(i,"hallSeg"+c,Fo(),e.lucasHall[0]-4+c*4,e.lucasHall[1]+.5,"hall",{name:"Seguran\xE7a",hp:70,damage:7}));a.forEach(c=>{c.behavior="scripted",c.faceTo=[t.player.x,t.player.z]}),await i.cutscene(async()=>{i.frame(t.player,r,1,3.6,1.7),await i.say(r,"Ethan Cross?! Que porra voc\xEA est\xE1 fazendo aqui?!"),i.over(r,t.player,2),await i.say(gn,"Parece que voc\xEA n\xE3o esperava minha visita.")}),a.forEach(c=>{c.behavior="hostile"}),r.behavior="scripted",r.goalSpeed=5,r.goal=[e.garageCar[0]-3,e.garageCar[1]+5];let o=i.car("carroLucas","sedan",657930,e.garageCar[0],e.garageCar[1],Math.PI);i.failChecks=[()=>t.player.hp<=0?"Ethan foi derrotado":null],i.objective("Enfrente os seguran\xE7as \u2014 Lucas est\xE1 fugindo!",null);let l=i.t;await i.until(()=>ia(t,"hall").length===0||i.t-l>25),i.failChecks=null,ia(t,"hall").forEach(c=>c.knockDown(0)),await i.cutscene(async()=>{r.x=o.x-2,r.z=o.z+2,i.seat(r,o,-1),i.shot([e.garageCar[0]-8,2.4,e.garageCar[1]+14],[o.x,1,o.z]),t.sound("screech"),t.aiDrivers.push(new Wi(o,[[o.x,o.z+12],[e.mansionGate[0],e.mansionGate[1]-4],[150.25,-300]],{speed:14,rubber:!1})),await i.wait(2.6)}),i.clearObjective()}},{name:"perseguicao",async run(i,t){let e=t.zones.spots;t.setHour(23.9);let n=i.car("carroLucas","sedan",657930,150.25,-300,0),s=i.npc("lucas","lucas",{x:n.x,z:n.z,role:"story",interactable:!1});s.inCar||i.seat(s,n,-1),t.aiDrivers=t.aiDrivers.filter(u=>u.car!==n);let r=i.car("carroInvasao","suv",1052690,e.mansionCarOut[0],e.mansionCarOut[1]+8,Math.PI);(i.resumed||t.car!==r)&&(i.putInCar(r),r.place(150.25,-326,0));let a=rn(i,r.x,r.z);i.follow(a,!0);let o=i.npc("guardaMansao",Gi(),{x:r.x,z:r.z,name:"Guarda",hp:260});i.follow(o,!0),t.car&&i.onEnterCar(t.car);let l=[[150.25,-240],[150.25,-150],[150.25,-76],[150.25,-3],[160,1.75],[234,1.75],[326,1.75],[328.25,14],[338,23.75],[341,40]],c=new Wi(n,l,{speed:27,player:t.player});t.aiDrivers.push(c);let h=0;i.failChecks=[()=>(h=Math.hypot(n.x-t.player.x,n.z-t.player.z)>210?h+1/60:0,h>7?"Lucas escapou \u2014 MISS\xC3O FRACASSADA":null)],i.objective("Persiga Lucas",()=>[n.x,n.z]),await i.until(()=>c.done),i.failChecks=null,i.clearObjective(),t.vibe("mansao")}}]},{id:"galpao",title:"O Galp\xE3o",auto:!0,next:"investigacao",hint:"Lucas se esconde num galp\xE3o abandonado.",stages:[{name:"confronto",async run(i,t){let e=t.zones.spots;t.setHour(.2),(i.resumed||!t.car)&&i.placePlayer(e.galpaoCarSpot[0]-6,e.galpaoCarSpot[1],Math.PI/2);let n=rn(i,t.player.x+2,t.player.z+1);i.follow(n,!0);let s=i.npc("guardaMansao",Gi(),{x:t.player.x-2,z:t.player.z+1,name:"Guarda",hp:260,damage:12});i.follow(s,!0);let r=i.car("carroLucas","sedan",657930,e.galpaoCarSpot[0],e.galpaoCarSpot[1],0),a=i.npc("lucas","lucas",{x:e.galpaoBack[0],z:e.galpaoBack[1],role:"story",interactable:!1});a.inCar&&i.unseat(a),a.x=e.galpaoBack[0],a.z=e.galpaoBack[1],a.behavior="scripted",a.pose=null,a.faceTo=[e.galpaoDoor[0],e.galpaoDoor[1]],t.aiDrivers=t.aiDrivers.filter(c=>c.car!==r);let[o,l]=e.galpaoInside;for(let c=0;c<6;c++)sa(i,"gs"+c,Fo(),o+c%3*3-1,l+(Math.floor(c/3)*6-3),"galpao",{name:"Capanga",hp:55,damage:5});for(let c=0;c<3;c++)sa(i,"cp"+c,ar(),o+8,l-3+c*3,"galpao",{name:"Policial corrupto",hp:65,damage:6});i.failChecks=[()=>t.player.hp<=0?"Ethan foi derrotado":null],i.objective("Entre no galp\xE3o e enfrente o grupo (F para golpear)",e.galpaoDoor),await i.until(()=>ia(t,"galpao").length===0),i.failChecks=null,i.clearObjective()}},{name:"interrogatorio",async run(i,t){let e=t.zones.spots;t.setHour(.4),i.resumed&&i.placePlayer(e.galpaoInside[0],e.galpaoInside[1],Math.PI/2);let n=rn(i,t.player.x+2,t.player.z+1);i.follow(n,!0);let s=i.npc("guardaMansao",Gi(),{x:t.player.x-2,z:t.player.z+1,name:"Guarda",hp:260});i.follow(s,!0);let r=i.npc("lucas","lucas",{x:e.galpaoBack[0],z:e.galpaoBack[1],role:"story",interactable:!1});r.behavior="scripted",r.pose="handsup",r.faceTo=[t.player.x,t.player.z],i.objective("Capture Lucas",()=>[r.x,r.z]),await i.press(()=>[r.x,r.z],2.4,"[E] Capturar Lucas"),i.clearObjective(),await i.cutscene(async()=>{r.faceTo=[t.player.x,t.player.z],n.behavior="stand",s.behavior="stand",i.frame(t.player,r,1,2.6,1.6),await i.say(gn,"O que voc\xEA sabe? AGORA PORRA!!!!!"),i.over(t.player,r,1.6),await i.say(r,"Eu... eu... eu n\xE3o sei de nada, o que voc\xEA quer de mim?"),i.over(r,t.player,1.6),await i.say(gn,"Voc\xEA nos traiu."),i.over(t.player,r,1.4),i.showDialog("Lucas","N\xE3o fui eu, mas foi...",""),await i.wait(1.6),i.hideDialog(),t.sound("shot"),t.flash(),t.shake(.3),r.knockDown(0),r.setLying(-Math.PI/2,.15),await i.wait(1.6),i.frame(t.player,r,-1,3,1.9),await i.say(gn,"Ah merda... Voc\xEA me entregou...")}),t.vibe("galpao")}},{name:"misterio",async run(i,t){let e=t.zones.spots;t.setHour(.5),i.resumed&&i.placePlayer(e.galpaoInside[0],e.galpaoInside[1],-Math.PI/2);let n=i.npc("lucas","lucas",{x:e.galpaoBack[0],z:e.galpaoBack[1],role:"story",interactable:!1});n.behavior!=="down"&&(n.knockDown(0),n.setLying(-Math.PI/2,.15));let s=rn(i,t.player.x+2,t.player.z+1);i.follow(s,!0);let r=i.car("carroLucas","sedan",657930,e.galpaoCarSpot[0],e.galpaoCarSpot[1],0);await i.goto([e.galpaoCarSpot[0]-4,e.galpaoCarSpot[1]],4,"Corra at\xE9 o carro",{foot:!0});let[a,o]=[e.galpaoCarSpot[0]-12,e.galpaoCarSpot[1]-8],l=i.npc("misterio","mystery",{x:a,z:o,role:"story",interactable:!1,behavior:"scripted"});l.faceTo=[t.player.x,t.player.z],i.despawn("ryan");let c=i.get("guardaMansao");c&&(i.unfollow(c),c.behavior="stand"),t.carsLocked=!0,await i.cutscene(async()=>{i.over(t.player,l,2.4),await i.wait(.6),await i.say(gn,"EI! VOC\xCA!"),l.behavior="flee",l.runSpeed=6.4,l.route=[[330,40],[330,4],[318,-20],[300,-20],[296,0],[278,4],[255,9],[238,30],[236,70]],i.shot([t.player.x+3,2.4,t.player.z+3],[l.x,1.4,l.z],1.5),await i.wait(1.2),i.frame(t.player,r,1,4),await i.say(gn,"RYAN?! CAD\xCA VOC\xCA?!")}),i.objective("Persiga a pessoa misteriosa (a p\xE9)",()=>[l.x,l.z]),await i.until(()=>l.fled),await i.fadeOut(.8),i.despawn("misterio"),t.carsLocked=!1,i.clearObjective(),await i.card("A pessoa conseguiu escapar.","Ryan desapareceu.",3.2),t.campaign().flags.ryanDesaparecido=!0}}]},{id:"investigacao",title:"Culpado??",auto:!0,next:null,hint:"Algu\xE9m est\xE1 investigando Ethan.",stages:[{name:"sala",async run(i,t){let e=t.zones.spots,[n,s,r]=e.invChair;i.fade<1&&await i.fadeOut(.6),t.zones.investigatorPhoto.map=t.storyPhotoTexture("culpado"),t.zones.investigatorPhoto.needsUpdate=!0,t.zones.investigatorLamp.intensity=6;let a=i.npc("investigador","investigator",{x:n,z:r+.6,y:s,role:"story",interactable:!1,heading:Math.PI});a.fixedY=!0,a.y=s,a.behavior="chair",await i.cutscene(async()=>{let[o,l,c]=e.invCam,[h,u,d]=e.invLook;i.shot([o,l,c],[n,s+1.2,r],4,[h+.3,u+.9,d+.55],[h,u,d]),await i.fadeIn(1.4),await i.wait(4.5),await i.fadeOut(1.2)}),i.despawn("investigador"),t.zones.investigatorLamp.intensity=0,i.placePlayer(e.galpaoCarSpot[0]-6,e.galpaoCarSpot[1]-10,Math.PI),await i.fadeIn(1),t.vibe("investigacao"),t.phone.addNews("Morte em galp\xE3o segue sem explica\xE7\xE3o","Fontes dizem que um investigador acompanha o caso de perto.")}}]}];var Go="Ryan",ep=[{id:"r_contrato",title:"O Contrato",auto:!0,next:null,hint:"Uma liga\xE7\xE3o oferece um contrato.",stages:[{name:"ligacao",async run(i,t){let e=t.city.ethanHouse;(i.resumed||!t.campaign().pos)&&i.placePlayer(e.door[0],e.door[1]+4,0),await i.wait(1.5),t.sound("ring"),t.player.phone=!0,await i.cutscene(async()=>{i.over({x:t.player.x+1,z:t.player.z+2,y:t.player.y},t.player,2),await i.say("Celular","\u{1F4F1} N\xFAmero privado est\xE1 ligando..."),await i.say("N\xFAmero privado","Ryan Cole? Tenho um contrato pra voc\xEA. O pagamento \xE9 bom."),await i.say("N\xFAmero privado","Aceita?");let n=await i.choose([{text:"Aceitar o contrato"},{text:"Recusar o contrato"}],"Ryan"),s=t.campaign();s.contracts.push({id:"c1",title:"Contrato \u2014 n\xFAmero privado",status:n===0?"aceito":"recusado",text:n===0?"Aguardando instru\xE7\xF5es.":"Voc\xEA recusou esta proposta."}),t.phone.addCall("N\xFAmero privado",n===0?"Contrato aceito":"Contrato recusado"),n===0?(await i.say(Go,"Aceito. Me manda os detalhes."),await i.say("N\xFAmero privado","Voc\xEA vai receber as instru\xE7\xF5es."),s.flags.contrato1="aceito"):(await i.say(Go,"N\xE3o, obrigado."),s.flags.contrato1="recusado")}),t.player.phone=!1}}]},{id:"r_fernando",title:"A Casa das C\xE2meras",auto:!0,requires:i=>i.flags.contrato1==="recusado",next:null,hint:"Outra pessoa oferece um trabalho diferente.",stages:[{name:"proposta",async run(i,t){await i.wait(2),t.sound("ring"),t.player.phone=!0,await i.cutscene(async()=>{i.over({x:t.player.x+1,z:t.player.z+2,y:t.player.y},t.player,2),await i.say("Celular","\u{1F4F1} Outro n\xFAmero est\xE1 ligando..."),await i.say("Desconhecido","Ryan. Tenho um trabalho diferente pra voc\xEA."),await i.say("Desconhecido","Uma casa monitorada por c\xE2meras. Nenhum seguran\xE7a."),await i.say("Desconhecido","Vou te mandar um equipamento: o Pulso Eletr\xF4nico. Ele desliga as c\xE2meras por alguns segundos.")}),t.player.phone=!1;let e=t.campaign();e.tools.pulso=!0,e.contracts.push({id:"c2",title:"Trabalho \u2014 casa monitorada",status:"aceito",text:"Entrar na casa monitorada por c\xE2meras."}),e.notes.push({type:"caso",title:"Casa monitorada",text:"Casa com c\xE2meras, sem seguran\xE7a f\xEDsica. Local marcado no mapa."}),t.toast("Ferramenta desbloqueada: Pulso Eletr\xF4nico (tecla Q)",4),t.phone.addMessage("Desconhecido","O endere\xE7o est\xE1 no seu mapa."),await i.goto(t.zones.spots.fernandoFront,14,"V\xE1 at\xE9 a casa monitorada")}},{name:"casa",async run(i,t){let e=t.zones.spots;t.state.hour>5&&t.state.hour<19&&(await i.fadeOut(.6),t.setHour(1.5),await i.fadeIn(.6)),(i.resumed||i.retry)&&i.placePlayer(e.fernandoFront[0],e.fernandoFront[1]+4,Math.PI);let[n,s]=e.fernandoBed,[r,a]=e.fernandoBedHead,o=i.npc("fernando","fernando",{x:n+(n-r)*1.1,z:s+(s-a)*1.1,role:"story",interactable:!1,behavior:"sleep"});o.heading=Math.atan2(n-r,s-a),o.fixedY=!0,o.y=.15+.6-.55,o.behavior="sleep",o.setLying(-Math.PI/2,.67);for(let c of e.fernandoCams)i.addCamera(c.p[0],c.y,c.p[1],c.yaw,c.sweep);i.startAlert({rate:85}),t.toast("Q: Pulso Eletr\xF4nico \xB7 C: agachar",4),await i.goto([n+(n-r)*1.5+.8,s+(s-a)*1.5],2.2,"Entre na casa sem ser visto pelas c\xE2meras",{foot:!0}),i.stopAlert();let l=-1;if(await i.cutscene(async()=>{i.shot([n+1.6,1.9,s+1.2],[n,.8,s]),await i.wait(1),await i.say(Go,"Fernando del Costa..."),l=await i.choose([{text:"Eliminar Fernando enquanto ele dorme"},{text:"Acordar Fernando e interrog\xE1-lo"}],"Ryan");let c=t.campaign();l===0?(await i.fadeOut(1),await i.card("Fernando del Costa foi eliminado.","",2.6),c.flags.fernando="eliminado",i.despawn("fernando"),await i.fadeIn(.8)):(o.behavior="scripted",o.setLying(0,0),o.fixedY=!1,o.y=.15,o.x=n-1.2,o.z=s,o.faceTo=[t.player.x,t.player.z],i.frame(t.player,o,1,2.5),await i.say(Go,"Acorda, Fernando."),await i.say(o,"Ryan?! O que voc\xEA est\xE1 fazendo aqui?!"),await i.say(o,"SOCORRO! ALGU\xC9M ME AJUDA!"),c.flags.fernando="interrogado")}),l===1){i.startAlert({rate:85}),i.addAlert(40),i.alert.camFactor=.35;let c=i.get("fernando");c&&(c.behavior="stand",c.pose=null);let[h,u]=e.fernandoFront,d=Vt.fernando.x,f=Vt.fernando.z;i.objective("Fuja da casa antes que o alerta chegue a 100",[h,u+45]),await i.until(g=>(i.addAlert(3*g),Math.hypot(t.player.x-d,t.player.z-f)>55)),i.stopAlert(),i.clearObjective()}else await i.goto(e.fernandoFront,6,"Saia da casa");t.vibe("fernando")}}]}];var Wo=class{constructor(){this.ctx=null,this.enabled=!0}init(){if(!this.ctx)try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.gain=this.ctx.createGain(),this.gain.gain.value=0,this.filter=this.ctx.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=600,this.o1=this.ctx.createOscillator(),this.o1.type="sawtooth",this.o2=this.ctx.createOscillator(),this.o2.type="square";let e=this.ctx.createGain();e.gain.value=.35,this.o1.connect(this.filter),this.o2.connect(e),e.connect(this.filter),this.filter.connect(this.gain),this.gain.connect(this.ctx.destination),this.o1.start(),this.o2.start()}catch{this.ctx=null}}update(t,e,n){if(!this.ctx)return;let s=this.ctx.currentTime,r=Math.min(4,Math.floor(Math.abs(e)/9)),a=.25+(Math.abs(e)-r*9)/9*.6+n*.15,o=38+a*70+r*6;this.o1.frequency.setTargetAtTime(o,s,.05),this.o2.frequency.setTargetAtTime(o*.5,s,.05),this.filter.frequency.setTargetAtTime(400+n*900+a*400,s,.08),this.gain.gain.setTargetAtTime(t&&this.enabled?.05+n*.05:0,s,.15)}};function np(i,t,e=1){if(!i)return;let n=i.currentTime,s=i.createGain();s.connect(i.destination);let r=o=>{let l=i.createBuffer(1,i.sampleRate*o,i.sampleRate),c=l.getChannelData(0);for(let u=0;u<c.length;u++)c[u]=Math.random()*2-1;let h=i.createBufferSource();return h.buffer=l,h},a=(o,l)=>{let c=i.createOscillator();return c.type=o,c.frequency.value=l,c};if(t==="siren"){let o=a("sine",700);o.connect(s),s.gain.value=.05;for(let l=0;l<e*2;l++)o.frequency.setValueAtTime(650,n+l*.5),o.frequency.linearRampToValueAtTime(950,n+l*.5+.25),o.frequency.linearRampToValueAtTime(650,n+l*.5+.5);s.gain.setValueAtTime(.05,n+e-.3),s.gain.linearRampToValueAtTime(0,n+e),o.start(n),o.stop(n+e)}else if(t==="crash"||t==="shot"||t==="punch"){let o=r(t==="crash"?1.2:.4),l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=t==="shot"?3e3:t==="punch"?500:900,o.connect(l),l.connect(s);let c=t==="crash"?1.1:t==="shot"?.35:.12;s.gain.setValueAtTime(t==="punch"?.25:.5,n),s.gain.exponentialRampToValueAtTime(.001,n+c),o.start(n),o.stop(n+c)}else if(t==="screech"){let o=a("sawtooth",1200),l=i.createBiquadFilter();l.type="bandpass",l.frequency.value=2200,o.connect(l),l.connect(s),s.gain.setValueAtTime(.04,n),s.gain.linearRampToValueAtTime(0,n+.9),o.frequency.linearRampToValueAtTime(900,n+.9),o.start(n),o.stop(n+.9)}else if(t==="ring"){let o=a("sine",880),l=a("sine",1100);o.connect(s),l.connect(s);for(let c=0;c<3;c++)s.gain.setValueAtTime(.06,n+c*.9),s.gain.setValueAtTime(0,n+c*.9+.45);o.start(n),l.start(n),o.stop(n+2.7),l.stop(n+2.7)}else if(t==="ping"||t==="page"||t==="cash"){let o=a("sine",t==="cash"?1500:t==="ping"?1320:400);o.connect(s),s.gain.setValueAtTime(.06,n),s.gain.exponentialRampToValueAtTime(.001,n+.35),o.start(n),o.stop(n+.35)}}var iu={};Dp(iu,{SLOT_KEYS:()=>Xo,describe:()=>nu,latestSlot:()=>qo,listSlots:()=>ip,newCampaign:()=>tu,newState:()=>ds,readSlot:()=>lr,requestLoad:()=>cr,takePendingLoad:()=>eu,writeSlot:()=>Ln});var Xo=["auto","missao","1","2","3","4","5"],Qh="entreSombras.save.";function tu(i){return{char:i,done:[],flags:{},money:i==="ethan"?250:4800,hp:100,needs:{fome:85,sede:85,sono:80,dor:0},traits:{inteligencia:0,frieza:0,carisma:0,manipulacao:0,impulsividade:0},pos:null,mission:null,stage:0,messages:[],calls:[],photos:[],notes:[],tools:{},contracts:[],car:{fuel:1,health:1}}}function ds(){return{ver:1,char:"ethan",hour:21.5,day:1,blackwood:!1,maxStars:0,feed:[],news:[],ethan:tu("ethan"),ryan:tu("ryan")}}function Ln(i,t){try{let e={...t,ts:Date.now(),slot:i};return localStorage.setItem(Qh+i,JSON.stringify(e)),!0}catch{try{let n=JSON.parse(JSON.stringify(t));for(let s of["ethan","ryan"])n[s].photos=[];return localStorage.setItem(Qh+i,JSON.stringify({...n,ts:Date.now(),slot:i})),!0}catch{return!1}}}function lr(i){try{let t=localStorage.getItem(Qh+i);return t?JSON.parse(t):null}catch{return null}}function ip(){return Xo.map(i=>({key:i,data:lr(i)}))}function qo(){let i=null;for(let{key:t,data:e}of ip())e&&(!i||e.ts>i.data.ts)&&(i={key:t,data:e});return i}function cr(i){try{sessionStorage.setItem("entreSombras.load",i)}catch{}location.reload()}function eu(){try{let i=sessionStorage.getItem("entreSombras.load");return sessionStorage.removeItem("entreSombras.load"),i}catch{return null}}function nu(i){if(!i)return"Vazio";let t=i[i.char]||{},e=new Date(i.ts),n=i.char==="ryan"?"Ryan":"Ethan",s=t.mission?" \xB7 em miss\xE3o":"";return`${n} \xB7 Dia ${i.day} ${String(Math.floor(i.hour)).padStart(2,"0")}h \xB7 ${t.done?t.done.length:0} miss\xF5es${s} \xB7 ${e.toLocaleDateString()} ${e.toLocaleTimeString().slice(0,5)}`}var su=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function F_(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}var sp={walkSpeed:1.75,runSpeed:6.2,accel:9,runAccel:7,decel:11,airControl:.25,jumpVel:5,gravity:18,radius:.33,height:1.8,turnSpeed:10},Yo=class{constructor(t,e,n){this.world=e,this.model=new Si(n),t.add(this.model.root),this.x=0,this.y=0,this.z=0,this.heading=0,this.vx=0,this.vz=0,this.vy=0,this.grounded=!0,this.speed=0,this.turn=0,this.accel=0,this.mode="foot",this.jumpBuffer=0,this.coyote=0,this.scene=t,this.crouch=!1,this.hp=100,this.pose=null}setLook(t){let e=this.model.root.parent;e&&e.remove(this.model.root),this.model=new Si(t),(e||this.scene).add(this.model.root),this.sync()}place(t,e,n=0,s=null){this.x=t,this.z=e,this.heading=n,this.y=this.world.groundAt(t,e,sp.radius,s!=null?s:this.world.groundFn(t,e)+.3),this.vx=this.vz=this.vy=0,this.sync()}update(t,e,n){let s=sp,r=-Math.sin(n),a=-Math.cos(n),o=Math.cos(n),l=-Math.sin(n),c=r*e.z+o*e.x,h=a*e.z+l*e.x,u=Math.hypot(c,h);u>1&&(c/=u,h/=u);let d=u>.05;this.crouch=!!e.crouch&&this.grounded;let f=this.crouch?1.3:e.run?s.runSpeed:s.walkSpeed,g=c*f,x=h*f,m=this.grounded?1:s.airControl,p=(d?e.run?s.runAccel:s.accel:s.decel)*m,b=Math.hypot(this.vx,this.vz),y=g-this.vx,v=x-this.vz,T=Math.hypot(y,v),E=p*t*Math.max(1.2,T);if(T>0){let H=Math.min(1,E/T);this.vx+=y*H,this.vz+=v*H}!d&&this.grounded&&Math.hypot(this.vx,this.vz)<.05&&(this.vx=0,this.vz=0);let R=this.heading,C=Math.hypot(this.vx,this.vz);d&&C>.15&&(this.heading=F_(this.heading,Math.atan2(c,h),s.turnSpeed*(this.grounded?1:.3),t));let w=this.heading-R;for(;w>Math.PI;)w-=Math.PI*2;for(;w<-Math.PI;)w+=Math.PI*2;this.turn=su(this.turn,t>0?w/t*.3:0,8,t),this.accel=su(this.accel,t>0?(C-b)/t:0,6,t),this.jumpBuffer=e.jump?.15:Math.max(0,this.jumpBuffer-t),this.coyote=this.grounded?.12:Math.max(0,this.coyote-t),this.jumpBuffer>0&&this.coyote>0&&(this.vy=s.jumpVel,this.grounded=!1,this.jumpBuffer=0,this.coyote=0),this.vy-=s.gravity*t;let M=this.x+this.vx*t,L=this.z+this.vz*t,U=this.world.resolveCircle(M,L,s.radius,this.y,this.y+s.height,.4);if(U.hit){let H=this.vx*U.nx+this.vz*U.nz;H<0&&(this.vx-=H*U.nx,this.vz-=H*U.nz)}this.x=U.x,this.z=U.z;let N=this.y+this.vy*t,k=this.world.groundAt(this.x,this.z,s.radius*.7,this.y),W=this.grounded;N<=k?(!W&&this.vy<-3&&this.model.land((-this.vy-3)/6),N=k,this.vy=0,this.grounded=!0):this.grounded&&N-k<.45&&this.vy<=0?(N=su(N,k,25,t),this.vy=0,N-k<.02&&(N=k)):this.grounded=!1,this.y=N,this.speed=Math.hypot(this.vx,this.vz),this.model.update(t,{speed:this.speed,grounded:this.grounded,vy:this.vy,mode:this.pose||"foot",turn:this.turn,accel:this.accel,crouch:this.crouch,phone:this.phone}),this.sync()}sync(){this.model.root.position.set(this.x,this.y,this.z),this.model.root.rotation.set(this.lying||0,this.heading,0),this.lying&&(this.model.root.position.y+=.15)}};var kn=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function $o(i){for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i}var Zo=class{constructor(t,e,n){this.cam=t,this.world=e,this.settings=n,this.yaw=Math.PI,this.pitch=.25,this.carYawOffset=0,this.carPitch=.22,this.target=new D,this.smoothTarget=new D,this.curDist=4,this.footDist=4.2,this.carDist=7.5,this.idleMouse=10,this.mode="foot",this.fovBase=68,this.initialized=!1}onMouse(t,e){let n=this.settings.sensitivity*.0022,s=this.settings.invertY?-1:1;this.mode==="car"?(this.carYawOffset=$o(this.carYawOffset-t*n),this.carPitch=Ve.clamp(this.carPitch+e*n*s,-.15,1)):(this.yaw=$o(this.yaw-t*n),this.pitch=Ve.clamp(this.pitch+e*n*s,-.75,1.25)),Math.abs(t)+Math.abs(e)>.5&&(this.idleMouse=0)}onWheel(t){this.mode==="car"?this.carDist=Ve.clamp(this.carDist+t*.006,4.5,14):this.footDist=Ve.clamp(this.footDist+t*.004,1.6,9)}setMode(t,e=0){t!==this.mode&&(t==="car"?(this.carYawOffset=0,this.carPitch=.22,this.smoothCarHeading=this.yaw-Math.PI,this.smoothReverse=0):this.yaw=$o(this.yaw),this.mode=t,this.idleMouse=0)}update(t,e,n){this.initialized||(this.smoothTarget.copy(e),this.initialized=!0),this.idleMouse+=t;let s,r,a;if(this.mode==="car"){this.settings.autoFollow&&this.idleMouse>1.6&&Math.abs(n.speed)>1.5&&(this.carYawOffset=kn(this.carYawOffset,0,2.2,t),this.carPitch=kn(this.carPitch,.22,2.2,t));let M=n.speed<-2?Math.PI:0;this.smoothCarHeading=this.smoothCarHeading===void 0?n.heading:this.smoothCarHeading+$o(n.heading-this.smoothCarHeading)*(1-Math.exp(-6*t)),this.smoothReverse=kn(this.smoothReverse||0,M,3,t),s=this.smoothCarHeading+Math.PI+this.carYawOffset+this.smoothReverse,this.yaw=s,r=this.carPitch,a=this.carDist,this.smoothTarget.x=kn(this.smoothTarget.x,e.x,18,t),this.smoothTarget.z=kn(this.smoothTarget.z,e.z,18,t),this.smoothTarget.y=kn(this.smoothTarget.y,e.y,8,t);let L=this.fovBase+Math.min(14,Math.abs(n.speed)*.35);Math.abs(this.cam.fov-L)>.05&&(this.cam.fov=kn(this.cam.fov,L,3,t),this.cam.updateProjectionMatrix())}else s=this.yaw,r=this.pitch,a=this.footDist,this.smoothTarget.x=kn(this.smoothTarget.x,e.x,16,t),this.smoothTarget.z=kn(this.smoothTarget.z,e.z,16,t),this.smoothTarget.y=kn(this.smoothTarget.y,e.y,9,t),Math.abs(this.cam.fov-this.fovBase)>.05&&(this.cam.fov=kn(this.cam.fov,this.fovBase,4,t),this.cam.updateProjectionMatrix());let o=Math.cos(r),l=Math.sin(r),c=Math.sin(s)*o,h=l,u=Math.cos(s)*o,d=this.smoothTarget,f=this.mode==="foot"?.35*Math.min(1,this.curDist/3):0;if(f>0){this.world.rayIgnore=null;let M=this.world.raycast(d.x,d.y,d.z,Math.cos(s),0,-Math.sin(s),f+.25);f=Math.max(0,Math.min(f,M-.25))}let g=Math.cos(s)*f,x=-Math.sin(s)*f,m=d.x+g,p=d.y,b=d.z+x;this.world.rayIgnore=n||null;let y=this.world.raycast(m,p,b,c,h,u,a+.3),v=Math.max(.5,y-.3),T=Math.min(a,v);this.curDist=T<this.curDist?T:kn(this.curDist,T,4,t);let E=m+c*this.curDist,R=p+h*this.curDist,C=b+u*this.curDist,w=this.world.groundFn(E,C)+.25;R<w&&(R=w),this.cam.position.set(E,R,C),this.cam.lookAt(m,p+(this.mode==="car"?.4:.05),b)}get moveYaw(){return this.yaw}};var hr=[[0,1],[1,0],[0,-1],[-1,0]],B_=["NS","EW","NS","EW"],H_=26,Jo=class{constructor(){this.t=0}state(t){let e=this.t%H_;return t==="NS"?e<10?"G":e<12.5?"Y":"R":e>=13&&e<23?"G":e>=23&&e<25.5?"Y":"R"}update(t){this.t+=t;let e=Vi(),n=e.tlOff,s=[16722458,16757274,2817898];for(let r of["NS","EW"]){let a=this.state(r),o=a==="R"?0:a==="Y"?1:2;e.tl[r].forEach((l,c)=>l.color.setHex(c===o?s[c]:n[c]))}}},ru=class{constructor(t,e,n,s){this.car=t,this.a=e,this.b=n,this.d=s,this.next=this.chooseNext(),this.cruise=9+j()*4,this.honk=0;let[r,a]=hr[s],[o,l]=[-a,r],c=8+j()*40;t.place(be(e)+r*c+o*Qr,be(n)+a*c+l*Qr,Math.atan2(r,a)),t.driver="ai"}validDir(t,e,n){let[s,r]=hr[n],a=t+s,o=e+r;return a>=0&&a<=he&&o>=0&&o<=he}chooseNext(){let[t,e]=hr[this.d],n=this.a+t,s=this.b+e,r=[];for(let[a,o]of[[this.d,3],[(this.d+1)%4,1],[(this.d+3)%4,1]])if(this.validDir(n,s,a))for(let l=0;l<o;l++)r.push(a);return r.length||r.push((this.d+2)%4),Nt(r)}lane(t,e,n){let[s,r]=hr[n];return{ox:be(t)+-r*Qr,oz:be(e)+s*Qr,fx:s,fz:r}}update(t,e){let n=this.car,s=this.lane(this.a,this.b,this.d),r=(n.x-s.ox)*s.fx+(n.z-s.oz)*s.fz;if(r>Pn-sn/2-.5){let[k,W]=hr[this.d];this.a+=k,this.b+=W,this.d=this.next,this.next=this.chooseNext(),s=this.lane(this.a,this.b,this.d),r=(n.x-s.ox)*s.fx+(n.z-s.oz)*s.fz}let a=this.next!==this.d,o=4.5+Math.abs(n.speed)*.45,l=Math.max(r,-6)+o,c=s.ox+s.fx*l,h=s.oz+s.fz*l,u=Math.sin(n.heading),d=Math.cos(n.heading),f=c-n.x,g=h-n.z,x=f*u+g*d,m=f*d-g*u,p=Math.max(4,m*m+x*x),b=Math.atan(2*n.T.wheelBase*m/p),y=.62/(1+Math.abs(n.speed)*.07),v=Math.max(-1,Math.min(1,b/y)),T=this.cruise,E=Pn-sn/2-r;a&&E<18&&(T=Math.min(T,5.5)),r<0&&(T=Math.min(T,6));let C=Pn-sn/2-3.8-n.T.L/2-r,w=e.lights.state(B_[this.d]);w!=="G"&&C>-.5&&C<35&&(w==="Y"&&C<5||(T=Math.min(T,Math.sqrt(2*3.5*Math.max(0,C-.3)))));let M=!1,L=(k,W,H,nt)=>{let q=k-n.x,rt=W-n.z;if(q*q+rt*rt>900)return;let dt=q*u+rt*d,bt=q*d-rt*u;if(dt>0&&dt<26&&Math.abs(bt-v*dt*.08)<nt){let Ft=dt-n.T.L/2-H;return T=Math.min(T,Math.max(0,Ft-2.2)*.8),!0}return!1};for(let k of e.cars)k!==n&&L(k.x,k.z,k.T.L/2,1.9);e.player.mode==="foot"&&(M=L(e.player.x,e.player.z,.3,1.6));for(let k of e.npcs)k.dodge>0&&L(k.x,k.z,.3,1.5);M&&n.speed<.5?this.honk+=t:this.honk=0;let U=T-n.speed,N={throttle:Math.max(0,Math.min(1,U*.45)),brake:Math.max(0,Math.min(1,-U*.7)),steer:v,handbrake:0};T<.3&&n.speed<.6&&(N.brake=1,N.throttle=0),n.update(t,N,e.cars)}};function rp(i,t,e){let n=[],s=0;for(;n.length<i&&s++<400;){let r=Math.floor(j()*(he+1)),a=Math.floor(j()*(he+1)),o=Math.floor(j()*4),[l,c]=hr[o];if(r+l<0||r+l>he||a+c<0||a+c>he)continue;let h=be(r)+l*Pn/2,u=be(a)+c*Pn/2;if(Math.hypot(h-e.x,u-e.z)<40||n.some(f=>f.a===r&&f.b===a&&f.d===o))continue;let d=t(Nt(["sedan","hatch","suv","pickup","taxi","sedan","police"]));n.push(new ru(d,r,a,o))}return n}var ap={dia:{cloud:16777215,cloudShade:10135224,cover:.42,label:"Dia",top:4161488,horizon:12375790,bottom:9085104,sun:[.35,.8,.45],sunColor:16774109,sunI:2.8,hemiSky:12572927,hemiGround:6971472,hemiI:1.4,fog:12177376,fogD:.0032,night:0,exposure:1},entardecer:{cloud:16758928,cloudShade:5914712,cover:.5,label:"Entardecer",top:2767466,horizon:15768154,bottom:5917264,sun:[-.7,.16,.45],sunColor:16758904,sunI:2.6,hemiSky:11055320,hemiGround:6969416,hemiI:1.45,fog:11571328,fogD:.0036,night:.5,exposure:1.15},amanhecer:{cloud:16765104,cloudShade:6971504,cover:.45,label:"Amanhecer",top:3824272,horizon:15775888,bottom:6971488,sun:[.75,.15,-.3],sunColor:16763032,sunI:2.2,hemiSky:11057368,hemiGround:6969930,hemiI:1.3,fog:12626072,fogD:.0036,night:.35,exposure:1.1},noite:{cloud:3817560,cloudShade:790038,cover:.45,label:"Noite",top:329746,horizon:1713216,bottom:658452,sun:[.3,.6,-.5],sunColor:9085144,sunI:.6,hemiSky:4214922,hemiGround:2761760,hemiI:.8,fog:1449004,fogD:.0055,night:1,exposure:1.25}},Ko=class{constructor(t,e,n=340){this.far=n,this.scene=t,this.renderer=e,this.uniforms={top:{value:new Ot},horizon:{value:new Ot},bottom:{value:new Ot},sunDir:{value:new D},sunCol:{value:new Ot},cloudCol:{value:new Ot},cloudShade:{value:new Ot},cover:{value:.5},time:{value:0}};let s=new Nn({uniforms:this.uniforms,side:pn,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; uniform vec3 sunDir; uniform vec3 sunCol; uniform vec3 cloudCol; uniform vec3 cloudShade; uniform float cover; uniform float time; varying vec3 vP;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
        float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return v; }
        void main(){ vec3 d = normalize(vP); float h = d.y;
          vec3 c = h > 0.0 ? mix(horizon, top, pow(min(1.0, h * 1.6), 0.7)) : mix(horizon, bottom, min(1.0, -h * 4.0));
          vec3 sd = normalize(sunDir); float s = max(0.0, dot(d, sd));
          c += sunCol * (pow(s, 800.0) * 2.0 + pow(s, 14.0) * 0.3 + pow(s, 3.0) * 0.08);
          if (h > 0.01) {
            vec2 uv = d.xz / (h + 0.12) * 1.6 + vec2(time * 0.006, time * 0.002);
            float n = fbm(uv);
            float cl = smoothstep(1.0 - cover, 1.0 - cover + 0.32, n) * smoothstep(0.01, 0.18, h);
            float lit = 0.55 + 0.45 * fbm(uv + sd.xz * 0.15);
            vec3 cc = mix(cloudShade, cloudCol, lit) + sunCol * pow(s, 6.0) * 0.6;
            c = mix(c, cc, cl * 0.92);
          }
          gl_FragColor = vec4(c, 1.0); }`});this.dome=new $t(new Ze(1,24,12),s),this.dome.frustumCulled=!1,this.dome.renderOrder=-1,this.dome.scale.setScalar(n*.92),t.add(this.dome);let r=new Ue,a=[];for(let c=0;c<900;c++){let h=new D().randomDirection();h.y<.05&&(h.y=Math.abs(h.y)+.05),h.normalize().multiplyScalar(n*.88),a.push(h.x,h.y,h.z)}r.setAttribute("position",new ae(a,3)),this.stars=new $s(r,new as({color:16777215,size:1.6,sizeAttenuation:!1,fog:!1,transparent:!0,opacity:0})),this.stars.frustumCulled=!1,t.add(this.stars),this.hemi=new vo(16777215,4473924,1),t.add(this.hemi),this.sun=new Mo(16777215,2),t.add(this.sun,this.sun.target),t.fog=new ao(8947848,.004),this.sunDir=new D,this.night=0,this.envScene=new Ys;let o=new $t(this.dome.geometry,s);o.scale.setScalar(50);let l=new $t(new go(60,16).rotateX(-Math.PI/2),new Ae({color:4210752}));l.position.y=-3,this.envGround=l,this.envScene.add(o,l),this.cubeCam=new zr(.5,200,jn)}updateEnv(){this.envGround.material.color.copy(this.hemi.groundColor).multiplyScalar(.6*this.hemi.intensity),this.cubeCam.update(this.renderer,this.envScene)}tick(t){this.uniforms.time.value+=t}setShadows(t,e,n){if(this.sun.castShadow=t,t){this.sun.shadow.mapSize.set(e,e);let s=this.sun.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.near=1,s.far=400,s.updateProjectionMatrix(),this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.04,this.sun.shadow.radius=2.5,this.extent=n,this.size=e}}apply(t){var e;this.setHour((e={dia:12,entardecer:18.6,noite:23}[t])!=null?e:12,!0)}setHour(t,e=!1){t=(t%24+24)%24,this.hour=t;let n=[[0,"noite"],[5,"noite"],[6.4,"amanhecer"],[8,"dia"],[17,"dia"],[18.6,"entardecer"],[20.2,"noite"],[24,"noite"]],s=0;for(;s<n.length-2&&t>n[s+1][0];)s++;let[r,a]=n[s],[o,l]=n[s+1],c=o>r?Ve.smoothstep(t,r,o):0,h=ap[a],u=ap[l],d=m=>this._c1.setHex(h[m]).lerp(this._c2.setHex(u[m]),c),f=m=>h[m]+(u[m]-h[m])*c;this._c1=this._c1||new Ot,this._c2=this._c2||new Ot,this.uniforms.top.value.copy(d("top")),this.uniforms.horizon.value.copy(d("horizon")),this.uniforms.bottom.value.copy(d("bottom")),this.sunDir.set(h.sun[0]+(u.sun[0]-h.sun[0])*c,h.sun[1]+(u.sun[1]-h.sun[1])*c,h.sun[2]+(u.sun[2]-h.sun[2])*c).normalize(),this.uniforms.sunDir.value.copy(this.sunDir);let g=f("night");this.uniforms.sunCol.value.copy(d("sunColor")).multiplyScalar(g>.9?.6:1),this.uniforms.cloudCol.value.copy(d("cloud")),this.uniforms.cloudShade.value.copy(d("cloudShade")),this.uniforms.cover.value=f("cover")+(this.rain||0)*.4,this.sun.color.copy(d("sunColor")),this.sun.intensity=f("sunI")*(1-(this.rain||0)*.5),this.hemi.color.copy(d("hemiSky")),this.hemi.groundColor.copy(d("hemiGround")),this.hemi.intensity=f("hemiI"),this.scene.fog.color.copy(d("fog")),this.scene.fog.density=f("fogD")*(1+(this.rain||0)*.8),this.renderer.toneMappingExposure=f("exposure"),this.stars.material.opacity=g>.9?.9:g>.4?.2:0,this.night=g,this.current=g>.8?"noite":g>.3?"entardecer":"dia";for(let m of Lo){let p=m.base+(m.night-m.base)*g;m.opacity?m.mat.opacity=p:m.mat.emissiveIntensity=p}Gf(g>.4);let x=performance.now();(e||!this._envT||x-this._envT>2500)&&(this._envT=x,this.updateEnv())}follow(t,e){this.dome.position.set(t,0,e),this.stars.position.set(t,0,e);let n=t,s=e;if(this.sun.castShadow){let r=this.extent*2/this.size;n=Math.round(t/r)*r,s=Math.round(e/r)*r}this.sun.target.position.set(n,0,s),this.sun.position.set(n+this.sunDir.x*150,this.sunDir.y*150,s+this.sunDir.z*150)}};var op={sensitivity:1,invertY:!1,quality:"media",autoFollow:!0,fov:68,showFps:!0,time:"entardecer",sound:!0,adaptive:!0};function V_(){try{return{...op,...JSON.parse(localStorage.getItem("entreSombras.settings")||"{}")}}catch{return{...op}}}function Xi(){try{localStorage.setItem("entreSombras.settings",JSON.stringify(ue))}catch{}}var ue=V_(),lp={baixa:{label:"Baixa",pr:.75,aa:!1,shadows:!1,size:512,extent:40,peds:28,traffic:8,far:320,lamps:0,soft:!1},media:{label:"M\xE9dia",pr:1,aa:!1,shadows:!0,size:2048,extent:42,peds:45,traffic:12,far:400,lamps:4,soft:!1},alta:{label:"Alta",pr:Math.min(window.devicePixelRatio||1,1.5),aa:!0,shadows:!0,size:2048,extent:60,peds:60,traffic:16,far:480,lamps:8,soft:!0}},Ke=lp[ue.quality]||lp.media,ct=i=>document.getElementById(i),fp=i=>{let t=ct("loading-text");t&&(t.textContent=i)},on=new ro({antialias:Ke.aa,powerPreference:"high-performance"});on.setPixelRatio(Ke.pr);on.setSize(window.innerWidth,window.innerHeight);on.outputColorSpace=ln;on.toneMapping=yh;on.shadowMap.enabled=Ke.shadows;on.shadowMap.type=Ke.soft?xh:wo;var sl="";try{let i=on.getContext(),t=i.getExtension("WEBGL_debug_renderer_info");sl=t?i.getParameter(t.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER)}catch{sl=""}var rl=Ke.pr;ct("game").appendChild(on.domElement);var Pe=new Ys,hn=new tn(ue.fov,window.innerWidth/window.innerHeight,.1,Ke.far);window.addEventListener("resize",()=>{hn.aspect=window.innerWidth/window.innerHeight,hn.updateProjectionMatrix(),on.setSize(window.innerWidth,window.innerHeight)});var _={};window.game=_;function G_(){let i=performance.now(),t=new Co,e=new Ko(Pe,on,Ke.far);e.setShadows(Ke.shadows,Ke.size,Ke.extent);let n=new zo(Pe,t);n.build();let s=new Uo(Pe,t,n);s.build(),n.buildTrees(),nr(777);let r=[],a=[],o=(E,R)=>{let C=new us(E,R!=null?R:Nt(Hf),t);return Pe.add(C.group),t.dynamic.add(C),r.push(C),C};for(let E of n.parkedCars){let R=o(E.type);R.place(E.x,E.z,E.heading),R.parked=!0}let l=n.ethanHouse,c=o("sedan",1916786);c.place(l.driveway[0],l.driveway[1],l.heading+Math.PI),c.owner="Ethan",c.fuel=1;let h=new Yo(Pe,t,We.ethan.look);h.place(l.door[0],l.door[1]+3.5,0),a.push(...rp(Ke.traffic,E=>o(E),h));let u=[];for(let E of n.shopkeepers)u.push(new oi(Pe,t,Yf(),{name:"Atendente \u2014 "+E.shop,role:"shop",lines:[Nt(Yh),Nt(Yh)],x:E.x,z:E.z,heading:E.heading}));for(let E of n.npcs)E.kind==="police"&&u.push(new oi(Pe,t,ar(),{name:"Policial",role:"police",lines:Zf,x:E.x,z:E.z,behavior:"patrol"}));let d=n.pedLoops;for(let E=0;E<Ke.peds;E++){let R=d[Math.floor(j()*d.length)];u.push(new oi(Pe,t,rr(),{name:"Pedestre",role:"ped",lines:[Nt($f)],behavior:"loop",loop:R}))}for(let E of u)t.dynamic.add(E);let f=new Jo,g=new Zo(hn,t,ue);g.yaw=Math.PI,g.pitch=.22;let x=new _o(16773840,0,45,.55,.5,1.2);Pe.add(x,x.target);let m=[];for(let E=0;E<Ke.lamps;E++){let R=new js(16763274,0,26,2);Pe.add(R),m.push(R)}let p=new Float32Array(n.lamps.length*3);n.lamps.forEach((E,R)=>p.set(E,R*3));let b=new Ue;b.setAttribute("position",new Oe(p,3));let y=new $s(b,new as({map:Rf(),size:3.2,sizeAttenuation:!0,transparent:!0,depthWrite:!1,blending:Fs,color:16767392,opacity:0}));y.frustumCulled=!1,Pe.add(y);let v=new mn(1,1).rotateX(-Math.PI/2),T=new Bi(v,new Ae({map:Tf(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}),900);T.frustumCulled=!1,T.renderOrder=1,Pe.add(T),Object.assign(_,{world:t,sky:e,city:n,zones:s,cars:r,drivers:a,player:h,npcs:u,lights:f,cam:g,ethanCar:c,headlight:x,settings:ue,Q:Ke,renderer:on,scene:Pe,camera:hn,lampLights:m,glow:y,blobs:T}),_.aiDrivers=[],_.police=[],_.audio=new Wo,_.state=ds(),_.story=new Bo(_),_.phone=new Ho(_),_.buildMs=performance.now()-i,e.setHour(_.state.hour,!0),s1()}var aa=new Set,qi=new Set,oa=!1,an=!1,ci=!1;window.addEventListener("keydown",i=>{["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(i.code)&&i.preventDefault(),aa.has(i.code)||qi.add(i.code),aa.add(i.code)});window.addEventListener("keyup",i=>aa.delete(i.code));window.addEventListener("blur",()=>aa.clear());document.addEventListener("mousemove",i=>{oa&&!ci&&_.cam&&_.cam.onMouse(i.movementX||0,i.movementY||0)});document.addEventListener("wheel",i=>{_.cam&&an&&!ci&&!_.phone.open&&_.cam.onWheel(i.deltaY)},{passive:!0});var pp=()=>_.phone.open||_.docOpen||ct("dialog-choices").children.length>0||ct("slots").style.display==="flex";document.addEventListener("pointerlockchange",()=>{oa=document.pointerLockElement===on.domElement,!oa&&an&&!pp()&&mp(!0)});on.domElement.addEventListener("click",()=>{an&&!ci&&!pp()&&ol(),_.story&&(_.story.advance=!0)});function ol(){try{let i=on.domElement.requestPointerLock();i&&i.catch&&i.catch(()=>{})}catch{}}_.unlockPointer=()=>{var i;_._relock=oa,oa&&((i=document.exitPointerLock)==null||i.call(document))};_.relockPointer=()=>{_._relock&&an&&!ci&&ol()};var li=(...i)=>i.some(t=>aa.has(t)),Fn=(...i)=>i.some(t=>qi.has(t));_.consumeInteract=()=>qi.has("KeyE")?(qi.delete("KeyE"),!0):!1;_.campaign=()=>_.state[_.state.char];_.toast=(i,t=3)=>{ct("toast").textContent=i,ct("toast").style.opacity=1,el=t};var el=0,ye=_.toast;_.sound=(i,t)=>{ue.sound&&_.audio.ctx&&np(_.audio.ctx,i,t)};var ra=0;_.shake=i=>{ra=i};_.flash=()=>{let i=ct("flash");i.style.transition="none",i.style.opacity=.9,requestAnimationFrame(()=>{i.style.transition="opacity .6s",i.style.opacity=0})};_.setHour=i=>{_.state.hour=(i%24+24)%24,_.sky.setHour(_.state.hour,!0)};_.vibe=i=>{for(let t of Jh[i]||[])_.phone.addPost({...t})};_.addMoney=i=>{_.campaign().money=Math.max(0,_.campaign().money+i),i>0&&_.sound("cash")};_.addPhoto=(i,t)=>{let e=_.campaign();e.photos.unshift({src:i,label:t,day:_.state.day}),e.photos=e.photos.slice(0,8)};_.ownCar=()=>_.ethanCar;_.showDocument=(i,t)=>new Promise(e=>{ct("doc-title").textContent=i,ct("doc-body").innerHTML=t,ct("doc").style.display="flex",_.docOpen=!0,_.unlockPointer();let n=()=>{ct("doc").style.display="none",_.docOpen=!1,_._docClose=null,_.relockPointer(),e()};_._docClose=n,ct("doc-close").onclick=n});_.takePhoto=()=>{let i=_.story.capture(hn,320,200);_.addPhoto(i.toDataURL("image/jpeg",.7),"Foto"),_.sound("ping"),ye("Foto salva na galeria")};_.callCar=()=>{let i=_.ownCar(),t=_.player;if(_.car===i)return;let e=t.heading+Math.PI/2;i.place(t.x+Math.sin(e)*4,t.z+Math.cos(e)*4,t.heading),i.speed=0,ye("Seu carro foi trazido at\xE9 voc\xEA")};function mp(i){ci=i,ct("pause").style.display=i?"flex":"none",i&&W_()}function W_(){ct("opt-sens").value=ue.sensitivity,ct("opt-sens-v").textContent=ue.sensitivity.toFixed(2),ct("opt-invert").checked=ue.invertY,ct("opt-follow").checked=ue.autoFollow,ct("opt-fov").value=ue.fov,ct("opt-fov-v").textContent=ue.fov,ct("opt-quality").value=ue.quality,ct("opt-fps").checked=ue.showFps,ct("opt-time").value=_.sky.current||"dia",ct("opt-sound").checked=ue.sound,ct("opt-adaptive").checked=ue.adaptive,ct("gpu-info").textContent=(sl?"Placa de v\xEDdeo: "+sl.replace(/ANGLE \(|\)$/g,""):"")+" \xB7 resolu\xE7\xE3o "+Math.round(rl*100)+"%",ct("opt-dist").value=_.cam?_.cam.footDist:4.2,ct("opt-dist-v").textContent=(_.cam?_.cam.footDist:4.2).toFixed(1),ct("btn-switch").textContent=_.state.char==="ethan"?"JOGAR COMO RYAN":"JOGAR COMO ETHAN"}function X_(){ct("opt-sens").oninput=t=>{ue.sensitivity=+t.target.value,ct("opt-sens-v").textContent=ue.sensitivity.toFixed(2),Xi()},ct("opt-invert").onchange=t=>{ue.invertY=t.target.checked,Xi()},ct("opt-follow").onchange=t=>{ue.autoFollow=t.target.checked,Xi()},ct("opt-fov").oninput=t=>{ue.fov=+t.target.value,ct("opt-fov-v").textContent=ue.fov,_.cam.fovBase=ue.fov,Xi()},ct("opt-dist").oninput=t=>{_.cam.footDist=+t.target.value,ct("opt-dist-v").textContent=_.cam.footDist.toFixed(1)},ct("opt-fps").onchange=t=>{ue.showFps=t.target.checked,Xi()},ct("opt-adaptive").onchange=t=>{ue.adaptive=t.target.checked,Xi(),ue.adaptive||_.setPixelRatio(Ke.pr)},ct("opt-sound").onchange=t=>{ue.sound=t.target.checked,_.audio.enabled=ue.sound,Xi()},ct("opt-time").onchange=t=>{_.setHour({dia:12,entardecer:18.6,noite:23}[t.target.value])},ct("opt-quality").onchange=t=>{ue.quality=t.target.value,Xi(),ct("quality-note").textContent="A qualidade ser\xE1 aplicada ao reiniciar. Salvando e recarregando...",an?(Ln("auto",Bn()),setTimeout(()=>cr("auto"),600)):setTimeout(()=>location.reload(),600)},ct("btn-resume").onclick=()=>{mp(!1),ol()},ct("btn-save").onclick=()=>nl("save"),ct("btn-load2").onclick=()=>nl("load"),ct("btn-switch").onclick=()=>q_(),ct("slots-close").onclick=()=>{ct("slots").style.display="none"},ct("doc-close").onclick=()=>_._docClose&&_._docClose();let i=qo();ct("btn-play").textContent=i?"CONTINUAR":"NOVO JOGO \u2014 ETHAN",ct("btn-play").disabled=!1,ct("btn-play").onclick=()=>ps(i?i.data:ds()),ct("btn-new").hidden=!i,ct("btn-new").onclick=()=>ps(ds()),ct("btn-ryan").hidden=!1,ct("btn-ryan").onclick=()=>{let t=i?i.data:ds();t.char="ryan",ps(t)},ct("btn-load").hidden=!i,ct("btn-load").onclick=()=>nl("load")}function nl(i){ct("slots").style.display="flex",ct("slots-title").textContent=i==="save"?"SALVAR JOGO":"CARREGAR JOGO";let t=i==="save"?["1","2","3","4","5"]:Xo,e={auto:"Autom\xE1tico",missao:"\xDAltima miss\xE3o"};ct("slots-list").innerHTML=t.map(n=>{let s=lr(n);return`<div class="slot"><span><b>${e[n]||"Espa\xE7o "+n}</b><br>${nu(s)}</span><button data-slot="${n}" ${i==="load"&&!s?"disabled":""}>${i==="save"?"Salvar":"Carregar"}</button></div>`}).join(""),ct("slots-list").querySelectorAll("button").forEach(n=>n.onclick=()=>{let s=n.dataset.slot;i==="save"?(Ln(s,Bn()),ye("Jogo salvo no espa\xE7o "+s),nl("save")):an?cr(s):(ct("slots").style.display="none",ps(lr(s)))})}function Bn(){let i=_.state,t=_.campaign(),e=_.player;return t.pos=[e.x,e.z,e.heading],t.car={fuel:_.ethanCar.fuel,health:_.ethanCar.health,pos:[_.ethanCar.x,_.ethanCar.z,_.ethanCar.heading]},_.mission&&(t.mission=_.mission.id,t.stage=_.missionStage||0),JSON.parse(JSON.stringify(i))}function q_(){if(_.mission){ye("Termine ou saia da miss\xE3o antes de trocar de personagem");return}let i=Bn();i.char=i.char==="ethan"?"ryan":"ethan",Ln("auto",i),cr("auto")}function Y_(i){return i.char==="ryan"?We.ryan.look:i.done.includes("liberdade")?We.ethan.look:i.done.includes("prologo")?We.ethanPrison.look:We.ethanYoung.look}function ps(i){if(an)return;_.state=i;let t=_.campaign();an=!0,ct("title").style.display="none",ct("hud").style.display="block",_.audio.init(),_.audio.enabled=ue.sound,ol(),_.sky.setHour(i.hour,!0),i.blackwood&&_.zones.unlockBlackwood(),_.player.setLook(Y_(t)),_.player.hp=t.hp,_.ethanCar.owner=t.char==="ryan"?"Ryan":"Ethan",t.car&&(_.ethanCar.fuel=t.car.fuel,_.ethanCar.health=t.car.health,t.car.pos&&_.ethanCar.place(...t.car.pos));let e=_.city.ethanHouse;if(t.pos?_.player.place(t.pos[0],t.pos[1],t.pos[2]):_.player.place(e.door[0],e.door[1]+4,0),_.cam.yaw=_.player.heading+Math.PI,_.cam.initialized=!1,mu(),t.mission){let n=ms().find(s=>s.id===t.mission);n&&ca(n,t.stage||0,!0)}else gp();t.char==="ryan"&&!t.flags.introRyan&&(t.flags.introRyan=!0,ye("Campanha de Ryan Cole",3)),xu=performance.now()}function mu(){let i=_.campaign(),t=_.city.ethanHouse,e=i.char==="ethan"&&i.done.includes("liberdade")&&!i.flags.ryanDesaparecido&&!_.mission;e&&!_.freeRyan?(_.freeRyan=new oi(Pe,_.world,We.ryan.look,{name:"Ryan Cole",role:"story",lines:["Quando estiver pronto, a gente continua.","Cuidado l\xE1 fora, Ethan."],x:t.door[0]-1.5,z:t.door[1]+1.4,heading:0}),_.npcs.push(_.freeRyan),_.world.dynamic.add(_.freeRyan)):!e&&_.freeRyan&&(_.freeRyan.remove(),_.npcs.splice(_.npcs.indexOf(_.freeRyan),1),_.world.dynamic.delete(_.freeRyan),_.freeRyan=null)}function ms(){return _.state.char==="ryan"?ep:tp}function ll(i){let t=_.campaign(),e=ms(),n=e.indexOf(i);return t.done.includes(i.id)?"done":_.mission===i?"active":!(i.after?t.done.includes(i.after):n===0||t.done.includes(e[n-1].id))||i.requires&&!i.requires(t)?"locked":"available"}_.missionList=()=>{let i=ms().map(t=>({title:t.title,status:ll(t),hint:t.hint}));return i.push({title:"Pr\xF3ximos cap\xEDtulos",status:"locked",hint:"Aguardando a defini\xE7\xE3o do autor da hist\xF3ria."}),_.state.char==="ryan"&&_.campaign().flags.contrato1==="aceito"&&i.splice(1,0,{title:"Contrato aceito",status:"locked",hint:"O conte\xFAdo deste contrato ainda n\xE3o foi definido pelo autor."}),i};function gp(){if(!_.mission){for(let i of ms())if(i.auto&&ll(i)==="available"){ca(i,0,!1);return}}}var ur=[];function $_(){let i=_.story,t=0,e=null;if(!_.mission)for(let n of ms()){if(n.auto||!n.start||ll(n)!=="available")continue;let[s,r]=n.start(_);if(!ur[t]){let l=i.makeMarker();l.children[0].material=l.children[0].material.clone(),l.children[0].material.color.setHex(3840767),Pe.add(l),ur[t]=l}let a=ur[t++];a.visible=!0,a.position.set(s,_.world.groundFn(s,r),r),a.rotation.y+=.02,Math.hypot(_.player.x-s,_.player.z-r)<(_.player.mode==="car"?5:2.6)&&(e=n)}for(;t<ur.length;t++)ur[t].visible=!1;return e}async function ca(i,t=0,e=!1){let n=_.story,s=_.campaign();_.mission=i,s.mission=i.id,mu(),la(i.title,"MISS\xC3O",!1);let r=t;for(;r<i.stages.length;){if(_.missionStage=r,s.stage=r,n.resumed=e&&r===t,n.retry=!1,Ln("missao",Bn()),n.resumed){let a=n.fadeCalls||0;n.task(async()=>{await n.wait(.35),n.fade>0&&!n.cut&&(n.fadeCalls||0)===a&&await n.fadeIn(.6)})}try{await i.stages[r].run(n,_),r++,e=!1}catch(a){if(a.abort)return;a.fail||console.error(a),await Z_(a.fail?a.message:"Erro na miss\xE3o: "+a.message),n.cleanup(),_.player.hp=100,_.campaign().hp=100,e=!0,t=r,_.car&&cl()}}if(n.cleanup(),s.done.push(i.id),s.mission=null,s.stage=0,_.mission=null,i.reward&&_.addMoney(i.reward),la("MISS\xC3O CONCLU\xCDDA",i.title,!1),mu(),Ln("missao",Bn()),Ln("auto",Bn()),i.next){let a=ms().find(o=>o.id===i.next);if(a&&ll(a)==="available"){ca(a,0,!1);return}}gp()}async function Z_(i){let t=_.story;la(i.includes("\u2014")?i.split("\u2014")[0].trim():"MISS\xC3O FRACASSADA",i.includes("\u2014")?i.split("\u2014")[1].trim():i,!0),_.inputLocked=!0,await new Promise(e=>setTimeout(e,2600)),t.fadeTarget=1,t.fade=1,ct("fade").style.opacity=1,_.inputLocked=!1,ye("Voltando ao \xFAltimo checkpoint...",2)}var il=0;function la(i,t,e){let n=ct("banner");n.querySelector(".t").textContent=i,n.querySelector(".s").textContent=t,n.classList.toggle("fail",e),n.style.opacity=1,il=3.2}function xp(){let i=_.player,t=null,e=3.4;for(let n of _.cars)if(!n.removed)for(let s of[1,-1]){let[r,a]=n.doorPos(s),o=Math.hypot(i.x-r,i.z-a);o<e&&(e=o,t=n)}return t}function yp(i){if(_.carsLocked){ye("Agora n\xE3o d\xE1 para pegar um carro");return}if(i.driver==="ai"||_.police.some(t=>t.car===i)){ye("Este carro est\xE1 ocupado");return}!i.owner&&i.parked&&_.state[_.state.char]&&!_.mission&&al(.35,"roubo"),vp(i)}function vp(i){let t=_.player;t.mode="car",_.car=i,i.driver="player",i.parked=!1,t.model.root.parent&&t.model.root.parent.remove(t.model.root),i.body.add(t.model.root),t.model.root.position.copy(i.seat),t.model.root.rotation.set(0,0,0),_.cam.setMode("car",i.heading),_.story.onEnterCar(i)}_.enterCarDirect=vp;function _p(){let i=_.car;if(Math.abs(i.speed)>4){ye("Diminua a velocidade para sair");return}cl()}function cl(){let i=_.car,t=_.player;if(!i)return;let e=null;for(let n of[1,-1]){let[s,r]=i.doorPos(n);if(!_.world.resolveCircle(s,r,.33,i.y+.2,i.y+1.8,.4,null).hit){e=[s,r];break}}e||(e=i.local(0,i.T.L/2+1.2)),i.body.remove(t.model.root),Pe.add(t.model.root),i.driver=null,i.speed*=.3,_.car=null,t.mode="foot",t.place(e[0],e[1],i.heading),_.cam.setMode("foot"),_.story.onExitCar()}_.forceExitCar=cl;var gu=0,Mp=-99;function bp(i){let t=_.campaign();_.player.hp=Math.max(0,_.player.hp-i),t.needs.dor=Math.min(100,t.needs.dor+i*.7),Mp=_.story.t,ct("vignette").style.background="radial-gradient(ellipse at center, rgba(120,0,0,0) 45%, rgba(140,0,0,0.6) 100%)",setTimeout(()=>{ct("vignette").style.background=""},250),_.sound("punch")}_.damagePlayer=bp;var au=new Set;function J_(){let i=_.player;for(let t of au)(!t.alive||t.removed||Math.hypot(t.x-i.x,t.z-i.z)>3.5)&&au.delete(t);return{player:i,tokens:au,nearestFoe:(t,e)=>{let n=null,s=e;if(i.mode==="foot"&&i.hp>0){let r=Math.hypot(i.x-t.x,i.z-t.z);r<s&&(s=r,n=i)}for(let r of _.npcs)if(r.team==="ally"&&r.alive&&!r.inCar&&!r.removed){let a=Math.hypot(r.x-t.x,r.z-t.z);a<s&&(s=a,n=r)}return n},nearestEnemy:(t,e)=>{let n=null,s=e;for(let r of _.npcs)if(r.team==="enemy"&&r.alive&&!r.removed&&r.behavior==="hostile"){let a=Math.hypot(r.x-t.x,r.z-t.z);a<s&&(s=a,n=r)}return n},hit:(t,e,n)=>{if(e===i){bp(n);return}if(e.team==="ally"){e.hp=Math.max(30,e.hp-n*.5);return}e.hp-=n,_.sound("punch"),e.hp<=0&&e.knockDown(0)},teleportFollower:t=>_.story.teleportFollower(t)}}function wp(){let i=_.player;if(gu>0||i.mode!=="foot")return;gu=.45,i.model.punch();let t=Math.sin(i.heading),e=Math.cos(i.heading),n=null,s=1.9;for(let l of _.npcs){if(!l.alive||l.inCar||l.removed||l.role==="story"&&l.team!=="enemy")continue;let c=l.x-i.x,h=l.z-i.z,u=Math.hypot(c,h);u<s&&(c*t+h*e)/(u||1)>.3&&(s=u,n=l)}if(!n)return;_.sound("punch");let r=Math.sin(n.heading),a=Math.cos(n.heading),o=((i.x-n.x)*r+(i.z-n.z)*a)/(s||1)<-.2;if(n.team==="enemy"){if(n.behavior==="guard"&&o&&(!_.story.alert||_.story.alert.value<75)){n.knockDown(0),ye("Seguran\xE7a nocauteado em sil\xEAncio",1.5);return}n.hp-=34,n.hp<=0?n.knockDown(0):n.behavior==="guard"&&(_.story.addAlert(30),n.investigate=[i.x,i.z]);return}n.hp-=40,n.hp<=0&&(n.prevBehavior=n.behavior==="down"?"loop":n.behavior,n.knockDown(8)),al(n.role==="police"?2:1,"agress\xE3o",n);for(let l of _.npcs)l.role==="ped"&&l.alive&&Math.hypot(l.x-i.x,l.z-i.z)<18&&(l.behavior="panic",l.panicFrom=[i.x,i.z],l.panicT=6)}var Ee={stars:0,unseen:0};_.wanted=Ee;function al(i,t,e){if(_.mission)return;let n=_.player;if(!(i>=2||_.npcs.some(a=>a!==e&&a.alive&&!a.inCar&&(a.role==="ped"||a.role==="police"||a.role==="shop")&&Math.hypot(a.x-n.x,a.z-n.z)<28)||_.police.length>0))return;let r=Ee.stars;Ee.stars=Math.min(6,Ee.stars+(i<1?Math.random()<i?1:0:i)),Ee.stars>r&&(Ee.unseen=0,_.state.maxStars=Math.max(_.state.maxStars,Ee.stars),ye("Procurado: "+"\u2605".repeat(Ee.stars),2),_.sound("siren",2),Ee.stars>=2&&!_.state.blackwood&&(_.state.blackwood=!0,_.zones.unlockBlackwood(),setTimeout(()=>ye("BLACKWOOD DESBLOQUEADA \u2014 siga a estrada leste depois da Zona Industrial",5),2200),Ln("auto",Bn())),r===0&&_.vibe("procurado"))}function K_(i){let t=_.player,e=()=>_.car||t,n=Ee.stars?Math.min(6,Ee.stars+1):0;if(_.police.length<n&&Math.random()<i*.8){let r=Math.random()*Math.PI*2,a=85,o=t.x+Math.sin(r)*a,l=t.z+Math.cos(r)*a,c=d=>be(Math.max(0,Math.min(he,Math.round(d/h+he/2)))),h=76;o=Math.abs(o)<In?c(o)+1.75:o;let u=new us("police",16777215,_.world);u.place(o,l,Math.atan2(t.x-o,t.z-l)),u.fuel=1,Pe.add(u.group),_.world.dynamic.add(u),_.cars.push(u),_.police.push({car:u,drv:new or(u,e,{speed:20+Ee.stars*2.5}),near:0})}let s=!1;for(let r of _.police){r.drv.update(i,{cars:_.cars});let a=Math.hypot(r.car.x-t.x,r.car.z-t.z);if(a<90&&Ee.stars&&(s=!0),Ee.stars&&t.mode==="foot"&&a<7&&Math.abs(r.car.speed)<2?r.near+=i:r.near=Math.max(0,r.near-i),r.near>2.5){j_();return}}Ee.stars&&(Ee.unseen=s?0:Ee.unseen+i,Ee.unseen>10+Ee.stars*4&&(Ee.stars=0,ye("Voc\xEA despistou a pol\xEDcia",2.5))),Ee.stars||(_.police=_.police.filter(r=>Math.hypot(r.car.x-t.x,r.car.z-t.z)>80||_.police.length>0?(Ep(r.car),!1):!0))}function Ep(i){i.removed=!0,Pe.remove(i.group),_.world.dynamic.delete(i);let t=_.cars.indexOf(i);t>=0&&_.cars.splice(t,1)}function j_(){Ee.stars=0,_.police.forEach(n=>Ep(n.car)),_.police=[];let i=_.campaign(),t=Math.max(50,Math.round(i.money*.1));_.addMoney(-t),_.car&&cl();let e=_.city.policeSpot;_.player.place(e.x,e.z+3,0),la("PRESO",`Multa de R$ ${t}. Voc\xEA foi liberado na delegacia.`,!0)}var fs={comida:[{text:"Lanche \u2014 R$ 18",price:18,fome:40},{text:"Refei\xE7\xE3o completa \u2014 R$ 35",price:35,fome:70,sede:15}],bebida:[{text:"\xC1gua \u2014 R$ 5",price:5,sede:45},{text:"Refrigerante \u2014 R$ 7",price:7,sede:30,fome:5}],cafe:[{text:"Caf\xE9 \u2014 R$ 8",price:8,sono:15,sede:10}]};function Q_(i){let t=i.name.toLowerCase(),e=[];return/mercado|conveni|padaria/.test(t)?e=[...fs.comida,...fs.bebida,...fs.cafe]:/lanchonete|pizzaria|restaurante|bar|café/.test(t)?e=[...fs.comida,fs.bebida[1],...fs.cafe]:/farmácia/.test(t)&&(e=[{text:"Analg\xE9sico \u2014 R$ 25",price:25,dor:-40},fs.bebida[0]]),e}async function t1(i){let t=_.story,e=_.campaign(),n=i.role==="shop"?Q_(i):[];if(i.talking=!0,n.length){let s=[...n,{text:"Conversar"},{text:"Sair"}];_.inputLocked=!0;let r=await t.choose(s,i.name);if(_.inputLocked=!1,r<n.length){let a=n[r];if(e.money<a.price)ye("Dinheiro insuficiente");else{_.addMoney(-a.price);for(let o of["fome","sede","sono"])a[o]&&(e.needs[o]=Math.min(100,e.needs[o]+a[o]));a.dor&&(e.needs.dor=Math.max(0,e.needs.dor+a.dor)),ye("Comprado: "+a.text.split(" \u2014 ")[0])}}else r===n.length&&(_.inputLocked=!0,await t.say(i,i.nextLine()||"..."),_.inputLocked=!1,t.hideDialog())}else _.inputLocked=!0,await t.say(i,i.nextLine()||"..."),_.inputLocked=!1,t.hideDialog();i.talking=!1}async function e1(){let i=_.story,t=_.campaign();_.inputLocked=!0,await i.fadeOut(.8),_.setHour(_.state.hour+8),_.state.hour<8&&_.state.day++,t.needs.sono=100,t.needs.fome=Math.max(0,t.needs.fome-12),t.needs.sede=Math.max(0,t.needs.sede-18),t.needs.dor=0,_.player.hp=100,Ln("auto",Bn()),await i.fadeIn(.8),_.inputLocked=!1,ye("Voc\xEA dormiu 8 horas. Jogo salvo.")}async function ou(i){let t=_.campaign();if(i==="hospital"){if(t.money<150){ye("Atendimento custa R$ 150");return}_.addMoney(-150),_.player.hp=100,t.needs.dor=0,ye("Voc\xEA foi atendido no hospital."),Ln("auto",Bn())}else if(i==="oficina"){let e=_.car;if(!e)return;let n=Math.round((1-e.health)*400)+20;if(t.money<n){ye("Conserto custa R$ "+n);return}_.addMoney(-n),e.health=1,ye("Carro consertado (R$ "+n+")"),Ln("auto",Bn())}else if(i==="posto"){let e=_.car;if(!e)return;let n=(1-e.fuel)*e.tank,s=Math.round(n*5.89);if(n<.5){ye("O tanque j\xE1 est\xE1 cheio");return}if(t.money<s){ye(`Abastecer custa R$ ${s}`);return}_.addMoney(-s),e.fuel=1,ye(`Abastecido: ${n.toFixed(1)} L (R$ ${s})`)}}var lu={};function n1(i){let t=_.campaign(),e=t.needs,n=i;e.fome=Math.max(0,e.fome-.035*n),e.sede=Math.max(0,e.sede-.055*n),e.sono=Math.max(0,e.sono-.026*n),e.dor=Math.max(0,e.dor-.5*n);let s=_.player;e.fome<5||e.sede<5||e.sono<3?s.hp=Math.max(0,s.hp-.25*i):_.story.t-Mp>6&&s.hp<100&&e.fome>25&&e.sede>25&&(s.hp=Math.min(100,s.hp+(e.dor>50?.2:.6)*i));for(let a of["fome","sede","sono"])e[a]<25&&!lu[a]&&(lu[a]=!0,ye({fome:"Ethan est\xE1 com fome \u2014 compre comida numa loja",sede:"Com sede \u2014 compre \xE1gua numa loja",sono:"Com sono \u2014 durma na casa (porta)"}[a].replace("Ethan",t.char==="ryan"?"Ryan":"Ethan"),4)),e[a]>40&&(lu[a]=!1);t.hp=s.hp}function i1(){let i=_.campaign(),t=i.needs,e=(n,s,r)=>`<div class="stat"><span>${n}</span><i><b style="width:${Math.max(0,Math.min(100,s))}%;background:${r}"></b></i></div>`;ct("stats").innerHTML=e("VIDA",_.player.hp,"#d84a4a")+e("FOME",t.fome,"#d8a04a")+e("SEDE",t.sede,"#4a9ad8")+e("SONO",t.sono,"#9a7ad8")+e("DOR",t.dor,"#e06a8a"),ct("money").textContent="R$ "+i.money.toLocaleString("pt-BR"),ct("stars").textContent=Ee.stars?"\u2605".repeat(Ee.stars)+"\u2606".repeat(6-Ee.stars):"",ct("stars").classList.toggle("flash",Ee.stars>0&&Ee.unseen>2)}var fr,dr=900;function s1(){fr=document.createElement("canvas"),fr.width=dr,fr.height=dr;let i=fr.getContext("2d"),t=dr/2;i.fillStyle="#2d4224",i.fillRect(0,0,dr,dr);let e={res:"#5d7a4a",park:"#3f7a3a",down:"#8a8580",mixed:"#9a9286",shops:"#a8927a",shops2:"#a8927a",police:"#5a6a9a",gas:"#a87a6a",parking:"#6a6a6a",apart:"#8a8070",hospital:"#c8c8c8"};i.fillStyle="#3a3a3c",i.fillRect(t-In,t-In,In*2,In*2);for(let n=0;n<he;n++)for(let s=0;s<he;s++)i.fillStyle="#b9b3a6",i.fillRect(t+wn(s)-fe/2,t+wn(n)-fe/2,fe,fe),i.fillStyle=e[Gh[n][s]]||"#888",i.fillRect(t+wn(s)-fe/2+4,t+wn(n)-fe/2+4,fe-8,fe-8);i.strokeStyle="#3a3a3c",i.lineWidth=8;for(let[n,s,r,a]of[[0,234,0,302],[-234,76,-306,76],[234,0,440,0],[330,-75,330,75],[300,-20,410,-20],[300,22,410,22],[-76,-234,-76,-314],[152,-234,152,-320],[-152,-234,-152,-296]])i.beginPath(),i.moveTo(t+n,t+s),i.lineTo(t+r,t+a),i.stroke();i.strokeStyle="#7a6448",i.lineWidth=5,i.beginPath(),i.moveTo(t+16,t+352),i.lineTo(t+168,t+352),i.stroke();for(let n of["favela","prison","industrial","abandoned","mansion","fernando"]){let s=Vt[n];i.fillStyle={favela:"#9a7a5a",prison:"#6a6a6a",industrial:"#7a7a88",abandoned:"#5a5040",mansion:"#c8b88a",fernando:"#6a8a6a"}[n],i.fillRect(t+s.x-s.w/2,t+s.z-s.d/2,s.w,s.d)}i.fillStyle="#4a7a3a",i.beginPath(),i.arc(t+Vt.hill.x,t+Vt.hill.z,Vt.hill.r*.8,0,7),i.fill(),i.strokeStyle="#b8a040",i.setLineDash([6,6]),i.lineWidth=.8;for(let n=0;n<=he;n++)i.beginPath(),i.moveTo(t+be(n),t-In),i.lineTo(t+be(n),t+In),i.stroke(),i.beginPath(),i.moveTo(t-In,t+be(n)),i.lineTo(t+In,t+be(n)),i.stroke();_.mmOrigin=t}function Sp(i,t,e,n=!0){let s=(a,o,l,c)=>{i.fillStyle=l,i.beginPath(),i.arc(n?a-t.x:a,n?o-t.z:o,c/e,0,Math.PI*2),i.fill()};for(let a of _.drivers)s(a.car.x,a.car.z,"#d0d0d0",2);for(let a of _.police)s(a.car.x,a.car.z,Math.floor(_.story.t*4)%2?"#ff3030":"#3060ff",4);_.car||s(_.ethanCar.x,_.ethanCar.z,"#3a8aff",4);for(let a of ur)a.visible&&s(a.position.x,a.position.z,"#3a9aff",6);let r=_.story.objTarget&&_.story.resolve(_.story.objTarget);r&&s(r[0],r[1],"#ffd23a",6)}function r1(){let i=ct("minimap"),t=i.getContext("2d"),e=i.width,n=i.height,s=_.car||_.player,r=_.mmOrigin,a=_.car?.75:1.2;t.save(),t.clearRect(0,0,e,n),t.beginPath(),t.arc(e/2,n/2,e/2-2,0,Math.PI*2),t.clip(),t.fillStyle="#1a2414",t.fillRect(0,0,e,n),t.translate(e/2,n/2),t.scale(a,a),t.rotate(Math.PI+_.cam.yaw),t.drawImage(fr,-(r+s.x),-(r+s.z)),Sp(t,s,a),t.restore(),t.save(),t.translate(e/2,n/2);let o=_.car?_.car.heading:_.player.heading;t.rotate(-(o-_.cam.yaw)+Math.PI),t.fillStyle="#ff5a3a",t.beginPath(),t.moveTo(0,-8),t.lineTo(6,7),t.lineTo(0,3),t.lineTo(-6,7),t.closePath(),t.fill(),t.restore(),t.strokeStyle="rgba(255,255,255,0.6)",t.lineWidth=2,t.beginPath(),t.arc(e/2,n/2,e/2-2,0,Math.PI*2),t.stroke(),t.fillStyle="#fff",t.font="bold 12px Arial",t.textAlign="center";let l=-Math.cos(Math.PI+_.cam.yaw)*(e/2-12),c=Math.sin(Math.PI+_.cam.yaw)*(e/2-12);t.fillText("N",e/2-c,n/2+l+4)}_.drawPhoneMap=i=>{let t=i.getContext("2d"),e=i.width/dr;t.save(),t.scale(e,e),t.drawImage(fr,0,0),t.translate(_.mmOrigin,_.mmOrigin),Sp(t,{x:0,z:0},e,!1);let n=_.car||_.player;t.fillStyle="#ff5a3a",t.beginPath(),t.arc(n.x,n.z,8,0,7),t.fill(),t.restore()};function Tp(i,t=420,e=300){let n=Vt.studio,s=i.map((u,d)=>{let f=new Si(u);return f.root.position.set(n.x-(i.length-1)*.45+d*.9,n.y,n.z),f.root.rotation.y=(d-(i.length-1)/2)*-.25,f.update(.5,{speed:0,grounded:!0,mode:"foot"}),Pe.add(f.root),f}),r=new tn(30,t/e,.1,60);r.position.set(n.x,n.y+1.55,n.z+4.6),r.lookAt(n.x,n.y+1.3,n.z);let a=_.sky.hemi,o=a.intensity,l=a.color.getHex(),c=Pe.fog.density;a.intensity=2.6,a.color.setHex(16777215),Pe.fog.density=0;let h=_.story.capture(r,t,e);return a.intensity=o,a.color.setHex(l),Pe.fog.density=c,s.forEach(u=>Pe.remove(u.root)),h}_.storyPhoto=i=>{if(i==="irmaoPolicial"){let t=Tp([We.brother.look,ar()]),e=document.createElement("canvas");e.width=460,e.height=380;let n=e.getContext("2d");return n.fillStyle="#f4f0e6",n.fillRect(0,0,460,380),n.filter="sepia(0.35) contrast(1.05)",n.drawImage(t,20,20),n.filter="none",n.fillStyle="#ff8a2a",n.font='bold 22px "Courier New", monospace',n.textAlign="right",n.fillText("12/08/2027",424,306),n.fillStyle="#3a3428",n.font="italic 16px Georgia, serif",n.textAlign="left",n.fillText("Foto encontrada dentro do livro",24,352),e.toDataURL("image/jpeg",.85)}return""};_.storyPhotoTexture=i=>{let t=Tp([_.state.char==="ethan"?We.ethan.look:We.ethan.look],300,220),e=document.createElement("canvas");e.width=320,e.height=240;let n=e.getContext("2d");n.fillStyle="#f0ece2",n.fillRect(0,0,320,240),n.drawImage(t,10,10),n.save(),n.translate(160,140),n.rotate(-.18),n.fillStyle="#d01818",n.font='bold 44px "Comic Sans MS", "Segoe Print", cursive',n.textAlign="center",n.fillText("CULPADO??",0,0),n.restore();let s=new Zs(e);return s.colorSpace=ln,s};var a1=new bo,jo=0,cu=0,Ap=0,xu=performance.now(),hu=0,Qo=0,uu=120,du=new D;function Rp(){requestAnimationFrame(Rp);let i=Math.min(a1.getDelta(),1/20);_.manual||(yu(i),h1(i)),_.noRender||on.render(Pe,hn),jo+=i,cu++,jo>.5&&(Ap=Math.round(cu/jo),jo=0,cu=0),qi.clear()}function yu(i){let t=_.player,e=_.story;_.lights.update(i),Vf(i);let n=an&&!ci,s=_.inputLocked||_.phone.open||_.docOpen;n&&Fn("KeyE","Space","Enter")&&(e.advance=!0);for(let h=1;h<=4;h++)Fn("Digit"+h,"Numpad"+h)&&(e.choice=h-1);if(_.docOpen&&Fn("KeyE","Enter","Escape")&&(_._docClose&&_._docClose(),qi.delete("KeyE")),n&&!e.cut&&(_.state.hour+=i/60,_.state.hour>=24&&(_.state.hour-=24,_.state.day++),hu+=i,hu>.5&&(hu=0,_.sky.setHour(_.state.hour))),n&&!s&&Fn("KeyN")&&!_.mission&&(_.setHour(_.state.hour+3),ye("Hor\xE1rio: "+String(Math.floor(_.state.hour)).padStart(2,"0")+"h")),n&&Fn("KeyH")&&(ct("help").style.display=ct("help").style.display==="none"?"block":"none"),n&&Fn("KeyT")&&!e.cut&&!_.inputLocked&&(_.phone.toggle(),_.phone.open?_.unlockPointer():_.relockPointer()),n&&_.phone.open&&Fn("Escape")&&_.phone.toggle(!1),n&&!s&&Fn("KeyC")&&(t.crouchToggle=!t.crouchToggle),n&&!s&&Fn("KeyF")&&wp(),gu-=i,Qo-=i,n&&!s&&Fn("KeyQ")&&_.campaign().tools.pulso)if(Qo>0)ye("Pulso recarregando: "+Math.ceil(Qo)+"s",1);else{Qo=16;let h=0;for(let u of e.cameras)Math.hypot(u.x-t.x,u.z-t.z)<26&&(u.disabled=8,h++);ye(h?`Pulso Eletr\xF4nico: ${h} c\xE2mera(s) desligada(s) por 8s`:"Nenhuma c\xE2mera por perto",2),_.sound("ping")}let r="",a=an?$_():null;if(t.mode==="foot"){let h=null,u=2.2;for(let y of _.npcs){if(!y.interactable||!y.alive||y.inCar||y.team==="enemy")continue;let v=Math.hypot(y.x-t.x,y.z-t.z);v<u&&(u=v,h=y)}let d=_.carsLocked?null:xp(),f=_.city.ethanHouse,x=_.city.landmarks.find(y=>y.kind==="hospital"&&Math.hypot(y.x-t.x,y.z-t.z)<5),m=!_.mission&&Math.hypot(f.door[0]-t.x,f.door[1]-t.z)<1.8,p=n&&!s&&!e.cut;_.storyPrompt?r=_.storyPrompt:a?(r=`[E] Iniciar miss\xE3o: ${a.title}`,p&&_.consumeInteract()&&ca(a,0,!1)):m?(r="[E] Dormir (8 horas e salvar)",p&&_.consumeInteract()&&e1()):x&&!_.mission?(r="[E] Atendimento m\xE9dico (R$ 150)",p&&_.consumeInteract()&&ou("hospital")):h&&(!d||u<1.8)&&!_.mission?(r=`[E] Falar com ${h.name}`,p&&_.consumeInteract()&&t1(h)):d&&(r=d.driver==="ai"?"Carro ocupado":`[E] Entrar no carro${d===_.ethanCar?" (seu carro)":""}`,p&&_.consumeInteract()&&yp(d));let b=n&&!s?{x:(li("KeyD","ArrowRight")?1:0)-(li("KeyA","ArrowLeft")?1:0),z:(li("KeyW","ArrowUp")?1:0)-(li("KeyS","ArrowDown")?1:0),run:li("ShiftLeft","ShiftRight"),jump:Fn("Space")&&!e.cut,crouch:t.crouchToggle}:{x:0,z:0,run:!1,jump:!1,crouch:t.crouchToggle};_.testInput&&Object.assign(b,_.testInput),_.scope&&(b.x=0,b.z=0),t.mode==="foot"&&t.update(i,b,_.cam.yaw)}if(t.mode==="car"){let h=_.car,u=_.city.landmarks,d=u.find(m=>m.kind==="gas"&&Math.hypot(m.x-h.x,m.z-h.z)<14),f=u.find(m=>m.kind==="oficina"&&Math.hypot(m.x-h.x,m.z-h.z)<10);r=Math.abs(h.speed)>4?"":"[E] Sair do carro",Math.abs(h.speed)<1&&!_.mission&&d&&(r+="   [G] Abastecer"),Math.abs(h.speed)<1&&!_.mission&&f&&(r+="   [G] Consertar");let g=n&&!s?{throttle:li("KeyW","ArrowUp")?1:0,brake:li("KeyS","ArrowDown")?1:0,steer:(li("KeyA","ArrowLeft")?1:0)-(li("KeyD","ArrowRight")?1:0),handbrake:li("Space")?1:0}:{throttle:0,brake:0,steer:0,handbrake:e.cut?0:1};_.testCarInput&&(g={...g,..._.testCarInput}),_.forceCarInput&&(g={brake:0,handbrake:0,..._.forceCarInput});let x=Math.abs(h.speed);if(h.update(i,g,_.cars),h.lastHit>3){if(h.health=Math.max(0,h.health-h.lastHit*.012),h.lastHit>8){let m=_.campaign();m.needs.dor=Math.min(100,m.needs.dor+h.lastHit*1.5),t.hp=Math.max(1,t.hp-(h.lastHit-8)*1.5),_.shake(.25)}x>6&&_.police.some(m=>Math.hypot(m.car.x-h.x,m.car.z-h.z)<6)&&al(1,"viatura")}t.x=h.x,t.z=h.z,t.y=h.y,t.model.update(i,{mode:"sit",steer:h.steer*1.5}),_.audio.update(!0,h.speed,g.throttle),n&&!s&&!e.cut&&_.consumeInteract()?_p():n&&!s&&Fn("KeyG")&&(d?ou("posto"):f&&ou("oficina"))}else _.audio.update(!1,0,0);let o={lights:_.lights,cars:_.cars,player:t,npcs:_.npcs};for(let h of _.drivers)h.update(i,o);for(let h of _.aiDrivers)h.update(i,o);n&&K_(i);for(let h of _.cars)h.driver===null&&h.awake&&(h.awake=h.updatePassive(i));let l=J_(),c=_.cars.filter(h=>Math.abs(h.speed)>.5&&Math.abs(h.x-t.x)<120&&Math.abs(h.z-t.z)<120);for(let h of _.npcs){let u=Math.hypot(h.x-t.x,h.z-t.z),d=h.role==="story"||h.team!=="neutral";if(h.inCar||(h.model.root.visible=u<95||d),u<110||d){h.update(i,l);for(let f of c)h.reactToCar(f,i)&&f===_.car&&al(1,"atropelamento",h)}}for(let h of _.cars){let u=Math.abs(h.x-t.x)+Math.abs(h.z-t.z);h.group.visible=u<(h.driver?Ke.far*.7:Ke.far*.42),h.setLOD(u>45&&h.driver!=="player"&&!h.sirenL&&!h.storyKey)}if(an&&t.hp<=0&&!_.dead&&(_.mission?e.failChecks||e.fail("Voc\xEA morreu"):(_.dead=!0,o1())),an&&!ci&&(n1(i),e.update(i)),_.scope){let h=du.set(-Math.sin(_.cam.yaw)*Math.cos(_.cam.pitch),-Math.sin(_.cam.pitch),-Math.cos(_.cam.yaw)*Math.cos(_.cam.pitch));hn.position.set(t.x,t.y+1.65,t.z),hn.lookAt(t.x+h.x,t.y+1.65+h.y,t.z+h.z),hn.fov!==_.scope.fov&&(hn.fov=_.scope.fov,hn.updateProjectionMatrix()),t.heading=Math.atan2(h.x,h.z),t.sync()}else _.camOverride||(hn.fov<20&&(hn.fov=ue.fov,hn.updateProjectionMatrix()),t.mode==="car"?_.cam.update(i,du.set(_.car.x,_.car.y+1.25,_.car.z),_.car):_.cam.update(i,du.set(t.x,t.y+(t.crouch?1.1:1.55),t.z),null));if(ra>0&&(ra-=i,hn.position.x+=(Math.random()-.5)*ra*.6,hn.position.y+=(Math.random()-.5)*ra*.6),_.sky.follow(t.x,t.z),_.sky.tick(i),l1(i,t),c1(),_.car&&_.sky.night>.4){let[h,u]=_.car.forward;_.headlight.intensity=60,_.headlight.position.set(_.car.x+h*2.2,_.car.y+.8,_.car.z+u*2.2),_.headlight.target.position.set(_.car.x+h*20,_.car.y-1.5,_.car.z+u*20)}else _.headlight.intensity=0;if(t.x>436&&_.state.blackwood&&!_.bwMsg&&(_.bwMsg=!0,ye("Blackwood: a cidade ainda est\xE1 sendo constru\xEDda e chega numa pr\xF3xima atualiza\xE7\xE3o.",5)),an&&!_.mission&&!ci&&performance.now()-xu>5*60*1e3&&(xu=performance.now(),Ln("auto",Bn()),ye("Salvamento autom\xE1tico",1.5)),uu-=i,an&&uu<0){uu=150+Math.random()*120;let h=Nt(Jh.aleatorio);_.phone.addPost({...h,notify:!1})}ct("prompt").textContent=r,ct("prompt").style.display=r&&an&&!e.cut?"block":"none",_.car?(ct("speedo").style.display="block",ct("speed").textContent=Math.round(_.car.kmh),ct("gear").textContent=_.car.speed<-.5?"R":_.car.speed>.5?"D":"N",ct("fuel").textContent=`Combust\xEDvel ${Math.round(_.car.fuel*100)}% \xB7 Estado ${Math.round(_.car.health*100)}%${_.car.fuel<=0?" \xB7 SEM COMBUST\xCDVEL":""}`):ct("speedo").style.display="none",ct("fps").style.display=ue.showFps&&an?"block":"none",ct("fps").textContent=Ap+" FPS",el>0&&(el-=i,el<=0&&(ct("toast").style.opacity=0)),il>0&&(il-=i,il<=0&&(ct("banner").style.opacity=0)),an&&(r1(),i1())}async function o1(){let i=_.story;la("VOC\xCA MORREU","Voltando ao \xFAltimo salvamento...",!0),await new Promise(e=>setTimeout(e,2500));let t=qo();if(t)cr(t.key);else{let e=_.city.landmarks.find(n=>n.kind==="hospital");_.player.place(e.x,e.z,0),_.player.hp=100,_.dead=!1,i.fadeIn(.5)}}var fu=0,cp=new Ht,hp=new en,up=new D,dp=new D;function l1(i,t){let e=_.sky.night;if(_.glow.material.opacity=e>.4?Math.min(1,e)*.9:0,fu-=i,fu<=0&&_.lampLights.length){fu=.35;let n=e>.4,s=_.camera.position.x,r=_.camera.position.z,a=t.x-s,o=t.z-r,l=Math.hypot(a,o)||1,c=[];for(let h of _.city.lamps){let u=h[0]-t.x,d=h[2]-t.z;if(Math.abs(u)>90||Math.abs(d)>90)continue;let f=Math.hypot(u,d);c.push([f-Math.max(0,(u*a+d*o)/l)*.4,h])}c.sort((h,u)=>h[0]-u[0]),_.lampLights.forEach((h,u)=>{let d=c[u]&&c[u][1];h.visible=n&&!!d,d&&(h.position.set(d[0],d[1]-.3,d[2]),h.intensity=90*e)})}}function c1(){let i=_.blobs,t=0,e=i.instanceMatrix.count,n=(r,a,o,l,c,h)=>{t>=e||(hp.setFromAxisAngle(up.set(0,1,0),h),dp.set(l,1,c),cp.compose(up.set(r,a+.03,o),hp,dp),i.setMatrixAt(t++,cp))},s=_.player;s.mode==="foot"&&n(s.x,_.world.groundFn(s.x,s.z),s.z,1.1,1.1,0);for(let r of _.npcs)r.model.root.visible&&!r.inCar&&Math.abs(r.x-s.x)+Math.abs(r.z-s.z)<60&&n(r.x,r.y,r.z,1,1,0);for(let r of _.cars)r.group.visible&&Math.abs(r.x-s.x)+Math.abs(r.z-s.z)<90&&n(r.x,r.y,r.z,r.T.W+.9,r.T.L+1,r.heading);i.count=t,i.instanceMatrix.needsUpdate=!0}var tl=0,pu=0;function h1(i){if(!ue.adaptive||!an||ci||(tl+=i,pu++,tl<2))return;let t=pu/tl;tl=0,pu=0;let e=rl;t<42&&e>.6?e=Math.max(.6,e-.1):t>57&&e<Ke.pr&&(e=Math.min(Ke.pr,e+.05)),e!==rl&&_.setPixelRatio(e)}fp("Gerando Los Valles...");setTimeout(()=>{try{G_(),X_(),ct("loading").style.display="none",_.ready=!0,Rp();let i=eu();if(i){let t=lr(i);t&&ps(t)}}catch(i){console.error(i),fp("Erro ao iniciar: "+i.message),_.error=i}},30);_.start=i=>ps(i||ds());_.SAVE=iu;_.snapshot=Bn;_.runMission=ca;_.missions=ms;_.enterCar=i=>yp(i||_.ethanCar);_.exitCar=()=>_p();_.nearestCar=xp;_.step=yu;_.punch=wp;_.setPixelRatio=i=>{rl=i,on.setPixelRatio(i),on.setSize(window.innerWidth,window.innerHeight)};_.sim=(i,t=60)=>{let e=Math.round(i*t);for(let n=0;n<e;n++)yu(1/t),qi.clear()};_.press=i=>qi.add(i);_.__unpause=()=>{ci=!1};_.render=()=>on.render(Pe,hn);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
