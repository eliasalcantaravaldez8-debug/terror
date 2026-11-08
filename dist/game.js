(()=>{var cl="170";var Ud=0,$l=1,Nd=2;var Do=1,Od=2,Yn=3,xi=0,Ke=1,An=2,mi=0,cs=1,Kr=2,Kl=3,Ql=4,Bd=5,Li=100,Fd=101,zd=102,kd=103,Hd=104,Vd=200,Gd=201,Wd=202,Xd=203,Ba=204,Fa=205,qd=206,Yd=207,Zd=208,Jd=209,$d=210,Kd=211,Qd=212,jd=213,tf=214,za=0,ka=1,Ha=2,ds=3,Va=4,Ga=5,Wa=6,Xa=7,Uo=0,ef=1,nf=2,gi=0,sf=1,rf=2,of=3,ll=4,af=5,cf=6,lf=7,jl="attached",hf="detached",pu=300,fs=301,ps=302,qa=303,Ya=304,No=306,Gs=1e3,Ni=1001,Za=1002,ln=1003,uf=1004;var xr=1005;var Nn=1006,ia=1007;var Jn=1008;var Qn=1009,mu=1010,gu=1011,Ws=1012,hl=1013,Oi=1014,Rn=1015,rr=1016,ul=1017,dl=1018,ms=1020,xu=35902,_u=1021,yu=1022,_n=1023,vu=1024,Mu=1025,ls=1026,gs=1027,fl=1028,pl=1029,bu=1030,ml=1031;var gl=1033,qr=33776,Yr=33777,Zr=33778,Jr=33779,Ja=35840,$a=35841,Ka=35842,Qa=35843,ja=36196,tc=37492,ec=37496,nc=37808,ic=37809,sc=37810,rc=37811,oc=37812,ac=37813,cc=37814,lc=37815,hc=37816,uc=37817,dc=37818,fc=37819,pc=37820,mc=37821,$r=36492,gc=36494,xc=36495,Su=36283,_c=36284,yc=36285,vc=36286;var Qr=2300,Mc=2301,sa=2302,th=2400,eh=2401,nh=2402;var df=3200,ff=3201;var xl=0,pf=1,pi="",Ze="srgb",vs="srgb-linear",Oo="linear",de="srgb";var Wi=7680;var ih=519,mf=512,gf=513,xf=514,wu=515,_f=516,yf=517,vf=518,Mf=519,sh=35044;var rh="300 es",$n=2e3,jr=2001,_i=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oh=1234567,Bs=Math.PI/180,xs=180/Math.PI;function Mi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qe[i&255]+qe[i>>8&255]+qe[i>>16&255]+qe[i>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]).toLowerCase()}function Oe(i,t,e){return Math.max(t,Math.min(e,i))}function _l(i,t){return(i%t+t)%t}function bf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Sf(i,t,e){return i!==t?(e-i)/(t-i):0}function Fs(i,t,e){return(1-e)*i+e*t}function wf(i,t,e,n){return Fs(i,t,1-Math.exp(-e*n))}function Ef(i,t=1){return t-Math.abs(_l(i,t*2)-t)}function Tf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Af(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Rf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Cf(i,t){return i+Math.random()*(t-i)}function If(i){return i*(.5-Math.random())}function Pf(i){i!==void 0&&(oh=i);let t=oh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lf(i){return i*Bs}function Df(i){return i*xs}function Uf(i){return(i&i-1)===0&&i!==0}function Nf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Of(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Be={DEG2RAD:Bs,RAD2DEG:xs,generateUUID:Mi,clamp:Oe,euclideanModulo:_l,mapLinear:bf,inverseLerp:Sf,lerp:Fs,damp:wf,pingpong:Ef,smoothstep:Tf,smootherstep:Af,randInt:Rf,randFloat:Cf,randFloatSpread:If,seededRandom:Pf,degToRad:Lf,radToDeg:Df,isPowerOfTwo:Uf,ceilPowerOfTwo:Nf,floorPowerOfTwo:Of,setQuaternionFromProperEuler:Bf,normalize:Qe,denormalize:rs},ht=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],M=s[1],v=s[4],_=s[7],I=s[2],E=s[5],A=s[8];return r[0]=o*x+a*M+c*I,r[3]=o*m+a*v+c*E,r[6]=o*p+a*_+c*A,r[1]=l*x+h*M+u*I,r[4]=l*m+h*v+u*E,r[7]=l*p+h*_+u*A,r[2]=d*x+f*M+g*I,r[5]=d*m+f*v+g*E,r[8]=d*p+f*_+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ra.makeScale(t,e)),this}rotate(t){return this.premultiply(ra.makeRotation(-t)),this}translate(t,e){return this.premultiply(ra.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ra=new $t;function Eu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function to(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ff(){let i=to("canvas");return i.style.display="block",i}var ah={};function Ns(i){i in ah||(ah[i]=!0,console.warn(i))}function zf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function kf(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hf(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var se={enabled:!0,workingColorSpace:vs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===de&&(i.r=Kn(i.r),i.g=Kn(i.g),i.b=Kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===de&&(i.r=hs(i.r),i.g=hs(i.g),i.b=hs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pi?Oo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ch=[.64,.33,.3,.6,.15,.06],lh=[.2126,.7152,.0722],hh=[.3127,.329],uh=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dh=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);se.define({[vs]:{primaries:ch,whitePoint:hh,transfer:Oo,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:lh,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:ch,whitePoint:hh,transfer:de,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:lh,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}});var Xi,bc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Xi===void 0&&(Xi=to("canvas")),Xi.width=t.width,Xi.height=t.height;let n=Xi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Xi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=to("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Kn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Kn(e[n]/255)*255):e[n]=Kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Vf=0,eo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Mi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(oa(s[o].image)):r.push(oa(s[o]))}else r=oa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function oa(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?bc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Gf=0,rn=class i extends _i{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ni,s=Ni,r=Nn,o=Jn,a=_n,c=Qn,l=i.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Mi(),this.name="",this.source=new eo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==pu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gs:t.x=t.x-Math.floor(t.x);break;case Ni:t.x=t.x<0?0:1;break;case Za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gs:t.y=t.y-Math.floor(t.y);break;case Ni:t.y=t.y<0?0:1;break;case Za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=pu;rn.DEFAULT_ANISOTROPY=1;var _e=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,_=(f+1)/2,I=(p+1)/2,E=(h+d)/4,A=(u+x)/4,R=(g+m)/4;return v>_&&v>I?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=A/n):_>I?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=R/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=A/r,s=R/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Sc=class extends _i{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new rn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new eo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},jn=class extends Sc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},no=class extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var wc=class extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var He=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*x,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let I=Math.sqrt(v),E=Math.atan2(I,p*M);m=Math.sin(m*E)/I,a=Math.sin(a*E)/I}let _=a*M;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Oe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return aa.copy(this).projectOnVector(t),this.sub(aa)}reflect(t){return this.sub(aa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},aa=new D,fh=new He,On=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_r.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_r.copy(n.boundingBox)),_r.applyMatrix4(t.matrixWorld),this.union(_r)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),yr.subVectors(this.max,Cs),qi.subVectors(t.a,Cs),Yi.subVectors(t.b,Cs),Zi.subVectors(t.c,Cs),ci.subVectors(Yi,qi),li.subVectors(Zi,Yi),Ei.subVectors(qi,Zi);let e=[0,-ci.z,ci.y,0,-li.z,li.y,0,-Ei.z,Ei.y,ci.z,0,-ci.x,li.z,0,-li.x,Ei.z,0,-Ei.x,-ci.y,ci.x,0,-li.y,li.x,0,-Ei.y,Ei.x,0];return!ca(e,qi,Yi,Zi,yr)||(e=[1,0,0,0,1,0,0,0,1],!ca(e,qi,Yi,Zi,yr))?!1:(vr.crossVectors(ci,li),e=[vr.x,vr.y,vr.z],ca(e,qi,Yi,Zi,yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Vn=[new D,new D,new D,new D,new D,new D,new D,new D],wn=new D,_r=new On,qi=new D,Yi=new D,Zi=new D,ci=new D,li=new D,Ei=new D,Cs=new D,yr=new D,vr=new D,Ti=new D;function ca(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ti.fromArray(i,r);let a=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),c=t.dot(Ti),l=e.dot(Ti),h=n.dot(Ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Wf=new On,Is=new D,la=new D,Bn=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Wf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);let e=Is.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(la)),this.expandByPoint(Is.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Gn=new D,ha=new D,Mr=new D,hi=new D,ua=new D,br=new D,da=new D,Xs=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ha.copy(t).add(e).multiplyScalar(.5),Mr.copy(e).sub(t).normalize(),hi.copy(this.origin).sub(ha);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Mr),a=hi.dot(this.direction),c=-hi.dot(Mr),l=hi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ha).addScaledVector(Mr,d),f}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);let n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,s,r){ua.subVectors(e,t),br.subVectors(n,t),da.crossVectors(ua,br);let o=this.direction.dot(da),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hi.subVectors(this.origin,t);let c=a*this.direction.dot(br.crossVectors(hi,br));if(c<0)return null;let l=a*this.direction.dot(ua.cross(hi));if(l<0||c+l>o)return null;let h=-a*hi.dot(da);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gt=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,f=c*u,g=l*h,x=l*u;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,f=c*u,g=l*h,x=l*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+x,e[1]=c*u,e[5]=x*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xf,t,qf)}lookAt(t,e,n){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ui.crossVectors(n,an),ui.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ui.crossVectors(n,an)),ui.normalize(),Sr.crossVectors(an,ui),s[0]=ui.x,s[4]=Sr.x,s[8]=an.x,s[1]=ui.y,s[5]=Sr.y,s[9]=an.y,s[2]=ui.z,s[6]=Sr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],v=n[7],_=n[11],I=n[15],E=s[0],A=s[4],R=s[8],S=s[12],y=s[1],C=s[5],L=s[9],U=s[13],O=s[2],H=s[6],z=s[10],Q=s[14],G=s[3],st=s[7],ct=s[11],et=s[15];return r[0]=o*E+a*y+c*O+l*G,r[4]=o*A+a*C+c*H+l*st,r[8]=o*R+a*L+c*z+l*ct,r[12]=o*S+a*U+c*Q+l*et,r[1]=h*E+u*y+d*O+f*G,r[5]=h*A+u*C+d*H+f*st,r[9]=h*R+u*L+d*z+f*ct,r[13]=h*S+u*U+d*Q+f*et,r[2]=g*E+x*y+m*O+p*G,r[6]=g*A+x*C+m*H+p*st,r[10]=g*R+x*L+m*z+p*ct,r[14]=g*S+x*U+m*Q+p*et,r[3]=M*E+v*y+_*O+I*G,r[7]=M*A+v*C+_*H+I*st,r[11]=M*R+v*L+_*z+I*ct,r[15]=M*S+v*U+_*Q+I*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+x*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=u*m*l-x*d*l+x*c*f-a*m*f-u*c*p+a*d*p,v=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*x*l-g*u*l+g*a*f-o*x*f-h*a*p+o*u*p,I=g*u*c-h*x*c-g*a*d+o*x*d+h*a*m-o*u*m,E=e*M+n*v+s*_+r*I;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return t[0]=M*A,t[1]=(x*d*r-u*m*r-x*s*f+n*m*f+u*s*p-n*d*p)*A,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*A,t[4]=v*A,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*A,t[8]=_*A,t[9]=(g*u*r-h*x*r-g*n*f+e*x*f+h*n*p-e*u*p)*A,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=I*A,t[13]=(h*x*s-g*u*s+g*n*d-e*x*d-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,M=c*l,v=c*h,_=c*u,I=n.x,E=n.y,A=n.z;return s[0]=(1-(x+p))*I,s[1]=(f+_)*I,s[2]=(g-v)*I,s[3]=0,s[4]=(f-_)*E,s[5]=(1-(d+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+v)*A,s[9]=(m-M)*A,s[10]=(1-(d+x))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ji.set(s[0],s[1],s[2]).length(),o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],En.copy(this);let l=1/r,h=1/o,u=1/a;return En.elements[0]*=l,En.elements[1]*=l,En.elements[2]*=l,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,e.setFromRotationMatrix(En),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=$n){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),f,g;if(a===$n)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===jr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=$n){let c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h,g,x;if(a===$n)g=(o+r)*u,x=-2*u;else if(a===jr)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ji=new D,En=new Gt,Xf=new D(0,0,0),qf=new D(1,1,1),ui=new D,Sr=new D,an=new D,ph=new Gt,mh=new He,Ie=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Oe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ph.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ph,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return mh.setFromEuler(this),this.setFromQuaternion(mh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ie.DEFAULT_ORDER="XYZ";var io=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Yf=0,gh=new D,$i=new He,Wn=new Gt,wr=new D,Ps=new D,Zf=new D,Jf=new He,xh=new D(1,0,0),_h=new D(0,1,0),yh=new D(0,0,1),vh={type:"added"},$f={type:"removed"},Ki={type:"childadded",child:null},fa={type:"childremoved",child:null},Pe=class i extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new Ie,n=new He,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Gt},normalMatrix:{value:new $t}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new io,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(xh,t)}rotateY(t){return this.rotateOnAxis(_h,t)}rotateZ(t){return this.rotateOnAxis(yh,t)}translateOnAxis(t,e){return gh.copy(t).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xh,t)}translateY(t){return this.translateOnAxis(_h,t)}translateZ(t){return this.translateOnAxis(yh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wr.copy(t):wr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Ps,wr,this.up):Wn.lookAt(wr,Ps,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Wn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vh),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($f),fa.child=t,this.dispatchEvent(fa),fa.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vh),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,t,Zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,Jf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Pe.DEFAULT_UP=new D(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tn=new D,Xn=new D,pa=new D,qn=new D,Qi=new D,ji=new D,Mh=new D,ma=new D,ga=new D,xa=new D,_a=new _e,ya=new _e,va=new _e,Di=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Tn.subVectors(t,e),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Tn.subVectors(s,e),Xn.subVectors(n,e),pa.subVectors(t,e);let o=Tn.dot(Tn),a=Tn.dot(Xn),c=Tn.dot(pa),l=Xn.dot(Xn),h=Xn.dot(pa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,qn.x),c.addScaledVector(o,qn.y),c.addScaledVector(a,qn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return _a.setScalar(0),ya.setScalar(0),va.setScalar(0),_a.fromBufferAttribute(t,e),ya.fromBufferAttribute(t,n),va.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(_a,r.x),o.addScaledVector(ya,r.y),o.addScaledVector(va,r.z),o}static isFrontFacing(t,e,n,s){return Tn.subVectors(n,e),Xn.subVectors(t,e),Tn.cross(Xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),Tn.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Qi.subVectors(s,n),ji.subVectors(r,n),ma.subVectors(t,n);let c=Qi.dot(ma),l=ji.dot(ma);if(c<=0&&l<=0)return e.copy(n);ga.subVectors(t,s);let h=Qi.dot(ga),u=ji.dot(ga);if(h>=0&&u<=h)return e.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Qi,o);xa.subVectors(t,r);let f=Qi.dot(xa),g=ji.dot(xa);if(g>=0&&f<=g)return e.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ji,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Mh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Mh,a);let p=1/(m+x+d);return o=x*p,a=d*p,e.copy(n).addScaledVector(Qi,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Ma(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ot=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=_l(t,1),e=Oe(e,0,1),n=Oe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ma(o,r,t+1/3),this.g=Ma(o,r,t),this.b=Ma(o,r,t-1/3)}return se.toWorkingColorSpace(this,s),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){let n=Tu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return se.fromWorkingColorSpace(Ye.copy(this),t),Math.round(Oe(Ye.r*255,0,255))*65536+Math.round(Oe(Ye.g*255,0,255))*256+Math.round(Oe(Ye.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(Ye.copy(this),e);let n=Ye.r,s=Ye.g,r=Ye.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Ze){se.fromWorkingColorSpace(Ye.copy(this),t);let e=Ye.r,n=Ye.g,s=Ye.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(Er);let n=Fs(di.h,Er.h,e),s=Fs(di.s,Er.s,e),r=Fs(di.l,Er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ye=new Ot;Ot.NAMES=Tu;var Kf=0,ti=class extends _i{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Mi(),this.name="",this.blending=cs,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=Fa,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==cs&&(n.blending=this.blending),this.side!==xi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ba&&(n.blendSrc=this.blendSrc),this.blendDst!==Fa&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},hn=class extends ti{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ie,this.combine=Uo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Te=new D,Tr=new ht,Ae=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sh,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Tr.fromBufferAttribute(this,e),Tr.applyMatrix3(t),this.setXY(e,Tr.x,Tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Qe(e,this.array),n=Qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Qe(e,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Qe(e,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sh&&(t.usage=this.usage),t}};var so=class extends Ae{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ro=class extends Ae{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var re=class extends Ae{constructor(t,e,n){super(new Float32Array(t),e,n)}},Qf=0,xn=new Gt,ba=new Pe,ts=new D,cn=new On,Ls=new On,Ne=new D,Re=class i extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Eu(t)?ro:so)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,n){return xn.makeTranslation(t,e,n),this.applyMatrix4(xn),this}scale(t,e,n){return xn.makeScale(t,e,n),this.applyMatrix4(xn),this}lookAt(t){return ba.lookAt(t),ba.updateMatrix(),this.applyMatrix4(ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new re(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ls.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(cn.min,Ls.min),cn.expandByPoint(Ne),Ne.addVectors(cn.max,Ls.max),cn.expandByPoint(Ne)):(cn.expandByPoint(Ls.min),cn.expandByPoint(Ls.max))}cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ne.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ne));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ne.fromBufferAttribute(a,l),c&&(ts.fromBufferAttribute(t,l),Ne.add(ts)),s=Math.max(s,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ae(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new D,c[R]=new D;let l=new D,h=new D,u=new D,d=new ht,f=new ht,g=new ht,x=new D,m=new D;function p(R,S,y){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),a[R].add(x),a[S].add(x),a[y].add(x),c[R].add(m),c[S].add(m),c[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,S=M.length;R<S;++R){let y=M[R],C=y.start,L=y.count;for(let U=C,O=C+L;U<O;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let v=new D,_=new D,I=new D,E=new D;function A(R){I.fromBufferAttribute(s,R),E.copy(I);let S=a[R];v.copy(S),v.sub(I.multiplyScalar(I.dot(S))).normalize(),_.crossVectors(E,S);let C=_.dot(c[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,C)}for(let R=0,S=M.length;R<S;++R){let y=M[R],C=y.start,L=y.count;for(let U=C,O=C+L;U<O;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,u=new D;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ae(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bh=new Gt,Ai=new Xs,Ar=new Bn,Sh=new D,Rr=new D,Cr=new D,Ir=new D,Sa=new D,Pr=new D,wh=new D,Lr=new D,fe=class extends Pe{constructor(t=new Re,e=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Pr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Sa.fromBufferAttribute(u,t),o?Pr.addScaledVector(Sa,h):Pr.addScaledVector(Sa.sub(e),h))}e.add(Pr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),Ai.copy(t.ray).recast(t.near),!(Ar.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(Ar,Sh)===null||Ai.origin.distanceToSquared(Sh)>(t.far-t.near)**2))&&(bh.copy(r).invert(),Ai.copy(t.ray).applyMatrix4(bh),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ai)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,I=v;_<I;_+=3){let E=a.getX(_),A=a.getX(_+1),R=a.getX(_+2);s=Dr(this,p,t,n,l,h,u,E,A,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let M=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);s=Dr(this,o,t,n,l,h,u,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,I=v;_<I;_+=3){let E=_,A=_+1,R=_+2;s=Dr(this,p,t,n,l,h,u,E,A,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let M=m,v=m+1,_=m+2;s=Dr(this,o,t,n,l,h,u,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function jf(i,t,e,n,s,r,o,a){let c;if(t.side===Ke?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===xi,a),c===null)return null;Lr.copy(a),Lr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Lr);return l<e.near||l>e.far?null:{distance:l,point:Lr.clone(),object:i}}function Dr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Rr),i.getVertexPosition(c,Cr),i.getVertexPosition(l,Ir);let h=jf(i,t,e,n,Rr,Cr,Ir,wh);if(h){let u=new D;Di.getBarycoord(wh,Rr,Cr,Ir,u),s&&(h.uv=Di.getInterpolatedAttribute(s,a,c,l,u,new ht)),r&&(h.uv1=Di.getInterpolatedAttribute(r,a,c,l,u,new ht)),o&&(h.normal=Di.getInterpolatedAttribute(o,a,c,l,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new D,materialIndex:0};Di.getNormal(Rr,Cr,Ir,d.normal),h.face=d,h.barycoord=u}return h}var Ht=class i extends Re{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(u,2));function g(x,m,p,M,v,_,I,E,A,R,S){let y=_/A,C=I/R,L=_/2,U=I/2,O=E/2,H=A+1,z=R+1,Q=0,G=0,st=new D;for(let ct=0;ct<z;ct++){let et=ct*C-U;for(let Et=0;Et<H;Et++){let Vt=Et*y-L;st[x]=Vt*M,st[m]=et*v,st[p]=O,l.push(st.x,st.y,st.z),st[x]=0,st[m]=0,st[p]=E>0?1:-1,h.push(st.x,st.y,st.z),u.push(Et/A),u.push(1-ct/R),Q+=1}}for(let ct=0;ct<R;ct++)for(let et=0;et<A;et++){let Et=d+et+H*ct,Vt=d+et+H*(ct+1),X=d+(et+1)+H*(ct+1),tt=d+(et+1)+H*ct;c.push(Et,Vt,tt),c.push(Vt,X,tt),G+=6}a.addGroup(f,G,S),f+=G,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function _s(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function je(i){let t={};for(let e=0;e<i.length;e++){let n=_s(i[e]);for(let s in n)t[s]=n[s]}return t}function tp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Au(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var ep={clone:_s,merge:je},np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ip=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yn=class extends ti{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=np,this.fragmentShader=ip,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_s(t.uniforms),this.uniformsGroups=tp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},oo=class extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},fi=new D,Eh=new ht,Th=new ht,Je=class extends oo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(Bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(fi.x,fi.y).multiplyScalar(-t/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-t/fi.z)}getViewSize(t,e){return this.getViewBounds(t,Eh,Th),e.subVectors(Th,Eh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},es=-90,ns=1,Ec=class extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Je(es,ns,t,e);s.layers=this.layers,this.add(s);let r=new Je(es,ns,t,e);r.layers=this.layers,this.add(r);let o=new Je(es,ns,t,e);o.layers=this.layers,this.add(o);let a=new Je(es,ns,t,e);a.layers=this.layers,this.add(a);let c=new Je(es,ns,t,e);c.layers=this.layers,this.add(c);let l=new Je(es,ns,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ao=class extends rn{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:fs,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Tc=class extends jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ao(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ht(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:mi});r.uniforms.tEquirect.value=e;let o=new fe(s,r),a=e.minFilter;return e.minFilter===Jn&&(e.minFilter=Nn),new Ec(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},wa=new D,sp=new D,rp=new $t,Zn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=wa.subVectors(n,e).cross(sp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(wa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||rp.getNormalMatrix(t),s=this.coplanarPoint(wa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ri=new Bn,Ur=new D,qs=class{constructor(t=new Zn,e=new Zn,n=new Zn,s=new Zn,r=new Zn,o=new Zn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],M=s[13],v=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+o,d+h,m+g,_+M).normalize(),n[3].setComponents(c-o,d-h,m-g,_-M).normalize(),n[4].setComponents(c-a,d-u,m-x,_-v).normalize(),e===$n)n[5].setComponents(c+a,d+u,m+x,_+v).normalize();else if(e===jr)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(t){return Ri.center.set(0,0,0),Ri.radius=.7071067811865476,Ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ur.x=s.normal.x>0?t.max.x:t.min.x,Ur.y=s.normal.y>0?t.max.y:t.min.y,Ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ru(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function op(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var yi=class i extends Re{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let M=p*d-o;for(let v=0;v<l;v++){let _=v*u-r;g.push(_,-M,0),x.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let v=M+l*p,_=M+l*(p+1),I=M+1+l*(p+1),E=M+1+l*p;f.push(v,_,E),f.push(_,I,E)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cp=`#ifdef USE_ALPHAHASH
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
#endif`,lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fp=`#ifdef USE_AOMAP
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
#endif`,pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mp=`#ifdef USE_BATCHING
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
#endif`,gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_p=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vp=`#ifdef USE_IRIDESCENCE
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
#endif`,Mp=`#ifdef USE_BUMPMAP
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
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ip=`#define PI 3.141592653589793
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
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lp=`vec3 transformedNormal = objectNormal;
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
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Up=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zp=`#ifdef USE_ENVMAP
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
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
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
}`,Jp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qp=`uniform bool receiveShadow;
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
#endif`,jp=`#ifdef USE_ENVMAP
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
#endif`,tm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sm=`PhysicalMaterial material;
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
#endif`,rm=`struct PhysicalMaterial {
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
}`,om=`
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
#endif`,am=`#if defined( RE_IndirectDiffuse )
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
#endif`,cm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gm=`#if defined( USE_POINTS_UV )
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
#endif`,xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bm=`#ifdef USE_MORPHTARGETS
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
#endif`,Sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Em=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cm=`#ifdef USE_NORMALMAP
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
#endif`,Im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Um=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,km=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xm=`float getShadowMask() {
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
}`,qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ym=`#ifdef USE_SKINNING
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
#endif`,Zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jm=`#ifdef USE_SKINNING
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
#endif`,$m=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,t0=`#ifdef USE_TRANSMISSION
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
#endif`,e0=`#ifdef USE_TRANSMISSION
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
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,r0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,o0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,a0=`uniform sampler2D t2D;
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
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`#include <common>
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
}`,f0=`#if DEPTH_PACKING == 3200
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
}`,p0=`#define DISTANCE
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
}`,m0=`#define DISTANCE
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
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,x0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`uniform float scale;
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
}`,y0=`uniform vec3 diffuse;
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
}`,v0=`#include <common>
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
}`,M0=`uniform vec3 diffuse;
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
}`,b0=`#define LAMBERT
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
}`,S0=`#define LAMBERT
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
}`,w0=`#define MATCAP
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
}`,E0=`#define MATCAP
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
}`,T0=`#define NORMAL
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
}`,A0=`#define NORMAL
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
}`,R0=`#define PHONG
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
}`,C0=`#define PHONG
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
}`,I0=`#define STANDARD
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
}`,P0=`#define STANDARD
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
}`,L0=`#define TOON
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
}`,D0=`#define TOON
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
}`,U0=`uniform float size;
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
}`,N0=`uniform vec3 diffuse;
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
}`,O0=`#include <common>
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
}`,B0=`uniform vec3 color;
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
}`,F0=`uniform float rotation;
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
}`,z0=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:ap,alphahash_pars_fragment:cp,alphamap_fragment:lp,alphamap_pars_fragment:hp,alphatest_fragment:up,alphatest_pars_fragment:dp,aomap_fragment:fp,aomap_pars_fragment:pp,batching_pars_vertex:mp,batching_vertex:gp,begin_vertex:xp,beginnormal_vertex:_p,bsdfs:yp,iridescence_fragment:vp,bumpmap_pars_fragment:Mp,clipping_planes_fragment:bp,clipping_planes_pars_fragment:Sp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Ep,color_fragment:Tp,color_pars_fragment:Ap,color_pars_vertex:Rp,color_vertex:Cp,common:Ip,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Lp,displacementmap_pars_vertex:Dp,displacementmap_vertex:Up,emissivemap_fragment:Np,emissivemap_pars_fragment:Op,colorspace_fragment:Bp,colorspace_pars_fragment:Fp,envmap_fragment:zp,envmap_common_pars_fragment:kp,envmap_pars_fragment:Hp,envmap_pars_vertex:Vp,envmap_physical_pars_fragment:jp,envmap_vertex:Gp,fog_vertex:Wp,fog_pars_vertex:Xp,fog_fragment:qp,fog_pars_fragment:Yp,gradientmap_pars_fragment:Zp,lightmap_pars_fragment:Jp,lights_lambert_fragment:$p,lights_lambert_pars_fragment:Kp,lights_pars_begin:Qp,lights_toon_fragment:tm,lights_toon_pars_fragment:em,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:sm,lights_physical_pars_fragment:rm,lights_fragment_begin:om,lights_fragment_maps:am,lights_fragment_end:cm,logdepthbuf_fragment:lm,logdepthbuf_pars_fragment:hm,logdepthbuf_pars_vertex:um,logdepthbuf_vertex:dm,map_fragment:fm,map_pars_fragment:pm,map_particle_fragment:mm,map_particle_pars_fragment:gm,metalnessmap_fragment:xm,metalnessmap_pars_fragment:_m,morphinstance_vertex:ym,morphcolor_vertex:vm,morphnormal_vertex:Mm,morphtarget_pars_vertex:bm,morphtarget_vertex:Sm,normal_fragment_begin:wm,normal_fragment_maps:Em,normal_pars_fragment:Tm,normal_pars_vertex:Am,normal_vertex:Rm,normalmap_pars_fragment:Cm,clearcoat_normal_fragment_begin:Im,clearcoat_normal_fragment_maps:Pm,clearcoat_pars_fragment:Lm,iridescence_pars_fragment:Dm,opaque_fragment:Um,packing:Nm,premultiplied_alpha_fragment:Om,project_vertex:Bm,dithering_fragment:Fm,dithering_pars_fragment:zm,roughnessmap_fragment:km,roughnessmap_pars_fragment:Hm,shadowmap_pars_fragment:Vm,shadowmap_pars_vertex:Gm,shadowmap_vertex:Wm,shadowmask_pars_fragment:Xm,skinbase_vertex:qm,skinning_pars_vertex:Ym,skinning_vertex:Zm,skinnormal_vertex:Jm,specularmap_fragment:$m,specularmap_pars_fragment:Km,tonemapping_fragment:Qm,tonemapping_pars_fragment:jm,transmission_fragment:t0,transmission_pars_fragment:e0,uv_pars_fragment:n0,uv_pars_vertex:i0,uv_vertex:s0,worldpos_vertex:r0,background_vert:o0,background_frag:a0,backgroundCube_vert:c0,backgroundCube_frag:l0,cube_vert:h0,cube_frag:u0,depth_vert:d0,depth_frag:f0,distanceRGBA_vert:p0,distanceRGBA_frag:m0,equirect_vert:g0,equirect_frag:x0,linedashed_vert:_0,linedashed_frag:y0,meshbasic_vert:v0,meshbasic_frag:M0,meshlambert_vert:b0,meshlambert_frag:S0,meshmatcap_vert:w0,meshmatcap_frag:E0,meshnormal_vert:T0,meshnormal_frag:A0,meshphong_vert:R0,meshphong_frag:C0,meshphysical_vert:I0,meshphysical_frag:P0,meshtoon_vert:L0,meshtoon_frag:D0,points_vert:U0,points_frag:N0,shadow_vert:O0,shadow_frag:B0,sprite_vert:F0,sprite_frag:z0},ft={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Un={basic:{uniforms:je([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:je([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:je([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:je([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:je([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:je([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:je([ft.points,ft.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:je([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:je([ft.common,ft.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:je([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:je([ft.sprite,ft.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:je([ft.common,ft.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:je([ft.lights,ft.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};Un.physical={uniforms:je([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};var Nr={r:0,b:0,g:0},Ci=new Ie,k0=new Gt;function H0(i,t,e,n,s,r,o){let a=new Ot(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function x(M){let v=!1,_=g(M);_===null?p(a,c):_&&_.isColor&&(p(_,1),v=!0);let I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){let _=g(v);_&&(_.isCubeTexture||_.mapping===No)?(h===void 0&&(h=new fe(new Ht(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:_s(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ci.copy(v.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(k0.makeRotationFromEuler(Ci)),h.material.toneMapped=se.getTransfer(_.colorSpace)!==de,(u!==_||d!==_.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new fe(new yi(2,2),new yn({name:"BackgroundMaterial",uniforms:_s(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=se.getTransfer(_.colorSpace)!==de,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(Nr,Au(i)),n.buffers.color.setClear(Nr.r,Nr.g,Nr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:x,addToRenderList:m}}function V0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(y,C,L,U,O){let H=!1,z=u(U,L,C);r!==z&&(r=z,l(r.object)),H=f(y,U,L,O),H&&g(y,U,L,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(y,C,L,U),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,C,L){let U=L.wireframe===!0,O=n[y.id];O===void 0&&(O={},n[y.id]=O);let H=O[C.id];H===void 0&&(H={},O[C.id]=H);let z=H[U];return z===void 0&&(z=d(c()),H[U]=z),z}function d(y){let C=[],L=[],U=[];for(let O=0;O<e;O++)C[O]=0,L[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:U,object:y,attributes:{},index:null}}function f(y,C,L,U){let O=r.attributes,H=C.attributes,z=0,Q=L.getAttributes();for(let G in Q)if(Q[G].location>=0){let ct=O[G],et=H[G];if(et===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(et=y.instanceColor)),ct===void 0||ct.attribute!==et||et&&ct.data!==et.data)return!0;z++}return r.attributesNum!==z||r.index!==U}function g(y,C,L,U){let O={},H=C.attributes,z=0,Q=L.getAttributes();for(let G in Q)if(Q[G].location>=0){let ct=H[G];ct===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor));let et={};et.attribute=ct,ct&&ct.data&&(et.data=ct.data),O[G]=et,z++}r.attributes=O,r.attributesNum=z,r.index=U}function x(){let y=r.newAttributes;for(let C=0,L=y.length;C<L;C++)y[C]=0}function m(y){p(y,0)}function p(y,C){let L=r.newAttributes,U=r.enabledAttributes,O=r.attributeDivisors;L[y]=1,U[y]===0&&(i.enableVertexAttribArray(y),U[y]=1),O[y]!==C&&(i.vertexAttribDivisor(y,C),O[y]=C)}function M(){let y=r.newAttributes,C=r.enabledAttributes;for(let L=0,U=C.length;L<U;L++)C[L]!==y[L]&&(i.disableVertexAttribArray(L),C[L]=0)}function v(y,C,L,U,O,H,z){z===!0?i.vertexAttribIPointer(y,C,L,O,H):i.vertexAttribPointer(y,C,L,U,O,H)}function _(y,C,L,U){x();let O=U.attributes,H=L.getAttributes(),z=C.defaultAttributeValues;for(let Q in H){let G=H[Q];if(G.location>=0){let st=O[Q];if(st===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(st=y.instanceColor)),st!==void 0){let ct=st.normalized,et=st.itemSize,Et=t.get(st);if(Et===void 0)continue;let Vt=Et.buffer,X=Et.type,tt=Et.bytesPerElement,dt=X===i.INT||X===i.UNSIGNED_INT||st.gpuType===hl;if(st.isInterleavedBufferAttribute){let ot=st.data,Dt=ot.stride,Ft=st.offset;if(ot.isInstancedInterleavedBuffer){for(let Bt=0;Bt<G.locationSize;Bt++)p(G.location+Bt,ot.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Bt=0;Bt<G.locationSize;Bt++)m(G.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let Bt=0;Bt<G.locationSize;Bt++)v(G.location+Bt,et/G.locationSize,X,ct,Dt*tt,(Ft+et/G.locationSize*Bt)*tt,dt)}else{if(st.isInstancedBufferAttribute){for(let ot=0;ot<G.locationSize;ot++)p(G.location+ot,st.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let ot=0;ot<G.locationSize;ot++)m(G.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let ot=0;ot<G.locationSize;ot++)v(G.location+ot,et/G.locationSize,X,ct,et*tt,et/G.locationSize*ot*tt,dt)}}else if(z!==void 0){let ct=z[Q];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(G.location,ct);break;case 3:i.vertexAttrib3fv(G.location,ct);break;case 4:i.vertexAttrib4fv(G.location,ct);break;default:i.vertexAttrib1fv(G.location,ct)}}}}M()}function I(){R();for(let y in n){let C=n[y];for(let L in C){let U=C[L];for(let O in U)h(U[O].object),delete U[O];delete C[L]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;let C=n[y.id];for(let L in C){let U=C[L];for(let O in U)h(U[O].object),delete U[O];delete C[L]}delete n[y.id]}function A(y){for(let C in n){let L=n[C];if(L[y.id]===void 0)continue;let U=L[y.id];for(let O in U)h(U[O].object),delete U[O];delete L[y.id]}}function R(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:I,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function G0(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function W0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==_n&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let R=A===rr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Qn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Rn&&!R)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:I,maxSamples:E}}function X0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Zn,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let M=r?0:n,v=M*4,_=p.clippingState||null;c.value=_,_=h(g,d,v,f);for(let I=0;I!==v;++I)_[I]=e[I];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,_=f;v!==x;++v,_+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function q0(i){let t=new WeakMap;function e(o,a){return a===qa?o.mapping=fs:a===Ya&&(o.mapping=ps),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===qa||a===Ya)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Tc(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var co=class extends oo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},os=4,Ah=[.125,.215,.35,.446,.526,.582],Ui=20,Ea=new co,Rh=new Ot,Ta=null,Aa=0,Ra=0,Ca=!1,Pi=(1+Math.sqrt(5))/2,is=1/Pi,Ch=[new D(-Pi,is,0),new D(Pi,is,0),new D(-is,0,Pi),new D(is,0,Pi),new D(0,Pi,-is),new D(0,Pi,is),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],lo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ta,Aa,Ra),this._renderer.xr.enabled=Ca,t.scissorTest=!1,Or(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fs||t.mapping===ps?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:rr,format:_n,colorSpace:vs,depthBuffer:!1},s=Ih(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ih(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y0(r)),this._blurMaterial=Z0(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Ea)}_sceneToCubeUV(t,e,n,s){let a=new Je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Rh),h.toneMapping=gi,h.autoClear=!1;let f=new hn({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),g=new fe(new Ht,f),x=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Rh),x=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;Or(s,M*v,p>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===fs||t.mapping===ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Or(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ea)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ch[(s-r-1)%Ch.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new fe(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ui-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ui;m>Ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ui}`);let p=[],M=0;for(let A=0;A<Ui;++A){let R=A/x,S=Math.exp(-R*R/2);p.push(S),A===0?M+=S:A<m&&(M+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;let _=this._sizeLods[s],I=3*_*(s>v-os?s-v+os:0),E=4*(this._cubeSize-_);Or(e,I,E,3*_,2*_),c.setRenderTarget(e),c.render(u,Ea)}};function Y0(i){let t=[],e=[],n=[],s=i,r=i-os+1+Ah.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-os?c=Ah[o-i+os-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*f),v=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,R=E>2?0:-1,S=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];M.set(S,x*g*E),v.set(d,m*g*E);let y=[E,E,E,E,E,E];_.set(y,p*g*E)}let I=new Re;I.setAttribute("position",new Ae(M,x)),I.setAttribute("uv",new Ae(v,m)),I.setAttribute("faceIndex",new Ae(_,p)),t.push(I),s>os&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ih(i,t,e){let n=new jn(i,t,e);return n.texture.mapping=No,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Or(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Z0(i,t,e){let n=new Float32Array(Ui),s=new D(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Ph(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yl(),fragmentShader:`

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
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Lh(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function yl(){return`

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
	`}function J0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===qa||c===Ya,h=c===fs||c===ps;if(l||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new lo(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new lo(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function $0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function K0(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],i.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let M=f.array;x=f.version;for(let v=0,_=M.length;v<_;v+=3){let I=M[v+0],E=M[v+1],A=M[v+2];d.push(I,E,E,A,A,I)}}else if(g!==void 0){let M=g.array;x=g.version;for(let v=0,_=M.length/3-1;v<_;v+=3){let I=v+0,E=v+1,A=v+2;d.push(I,E,E,A,A,I)}}else return;let m=new(Eu(d)?ro:so)(d,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Q0(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function j0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function tg(i,t,e){let n=new WeakMap,s=new _e;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let _=a.attributes.position.count*v,I=1;_>t.maxTextureSize&&(I=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let E=new Float32Array(_*I*4*u),A=new no(E,_,I,u);A.type=Rn,A.needsUpdate=!0;let R=v*4;for(let y=0;y<u;y++){let C=m[y],L=p[y],U=M[y],O=_*I*4*y;for(let H=0;H<C.count;H++){let z=H*R;f===!0&&(s.fromBufferAttribute(C,H),E[O+z+0]=s.x,E[O+z+1]=s.y,E[O+z+2]=s.z,E[O+z+3]=0),g===!0&&(s.fromBufferAttribute(L,H),E[O+z+4]=s.x,E[O+z+5]=s.y,E[O+z+6]=s.z,E[O+z+7]=0),x===!0&&(s.fromBufferAttribute(U,H),E[O+z+8]=s.x,E[O+z+9]=s.y,E[O+z+10]=s.z,E[O+z+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new ht(_,I)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function eg(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ho=class extends rn{constructor(t,e,n,s,r,o,a,c,l,h=ls){if(h!==ls&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ls&&(n=Oi),n===void 0&&h===gs&&(n=ms),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Cu=new rn,Dh=new ho(1,1),Iu=new no,Pu=new wc,Lu=new ao,Uh=[],Nh=[],Oh=new Float32Array(16),Bh=new Float32Array(9),Fh=new Float32Array(4);function Ms(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Uh[s];if(r===void 0&&(r=new Float32Array(s),Uh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Le(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function De(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Bo(i,t){let e=Nh[t];e===void 0&&(e=new Int32Array(t),Nh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function ng(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2fv(this.addr,t),De(e,t)}}function sg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;i.uniform3fv(this.addr,t),De(e,t)}}function rg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4fv(this.addr,t),De(e,t)}}function og(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Fh.set(n),i.uniformMatrix2fv(this.addr,!1,Fh),De(e,n)}}function ag(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Bh.set(n),i.uniformMatrix3fv(this.addr,!1,Bh),De(e,n)}}function cg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Oh.set(n),i.uniformMatrix4fv(this.addr,!1,Oh),De(e,n)}}function lg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2iv(this.addr,t),De(e,t)}}function ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3iv(this.addr,t),De(e,t)}}function dg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4iv(this.addr,t),De(e,t)}}function fg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function pg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2uiv(this.addr,t),De(e,t)}}function mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3uiv(this.addr,t),De(e,t)}}function gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4uiv(this.addr,t),De(e,t)}}function xg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dh.compareFunction=wu,r=Dh):r=Cu,e.setTexture2D(t||r,s)}function _g(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Pu,s)}function yg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Lu,s)}function vg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Iu,s)}function Mg(i){switch(i){case 5126:return ng;case 35664:return ig;case 35665:return sg;case 35666:return rg;case 35674:return og;case 35675:return ag;case 35676:return cg;case 5124:case 35670:return lg;case 35667:case 35671:return hg;case 35668:case 35672:return ug;case 35669:case 35673:return dg;case 5125:return fg;case 36294:return pg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return vg}}function bg(i,t){i.uniform1fv(this.addr,t)}function Sg(i,t){let e=Ms(t,this.size,2);i.uniform2fv(this.addr,e)}function wg(i,t){let e=Ms(t,this.size,3);i.uniform3fv(this.addr,e)}function Eg(i,t){let e=Ms(t,this.size,4);i.uniform4fv(this.addr,e)}function Tg(i,t){let e=Ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ag(i,t){let e=Ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Rg(i,t){let e=Ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Cg(i,t){i.uniform1iv(this.addr,t)}function Ig(i,t){i.uniform2iv(this.addr,t)}function Pg(i,t){i.uniform3iv(this.addr,t)}function Lg(i,t){i.uniform4iv(this.addr,t)}function Dg(i,t){i.uniform1uiv(this.addr,t)}function Ug(i,t){i.uniform2uiv(this.addr,t)}function Ng(i,t){i.uniform3uiv(this.addr,t)}function Og(i,t){i.uniform4uiv(this.addr,t)}function Bg(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Cu,r[o])}function Fg(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Pu,r[o])}function zg(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Lu,r[o])}function kg(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Iu,r[o])}function Hg(i){switch(i){case 5126:return bg;case 35664:return Sg;case 35665:return wg;case 35666:return Eg;case 35674:return Tg;case 35675:return Ag;case 35676:return Rg;case 5124:case 35670:return Cg;case 35667:case 35671:return Ig;case 35668:case 35672:return Pg;case 35669:case 35673:return Lg;case 5125:return Dg;case 36294:return Ug;case 36295:return Ng;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return kg}}var Ac=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Mg(e.type)}},Rc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Hg(e.type)}},Cc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ia=/(\w+)(\])?(\[|\.)?/g;function zh(i,t){i.seq.push(t),i.map[t.id]=t}function Vg(i,t,e){let n=i.name,s=n.length;for(Ia.lastIndex=0;;){let r=Ia.exec(n),o=Ia.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){zh(e,l===void 0?new Ac(a,i,t):new Rc(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Cc(a),zh(e,u)),e=u}}}var us=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Vg(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function kh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Gg=37297,Wg=0;function Xg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Hh=new $t;function qg(i){se._getMatrix(Hh,se.workingColorSpace,i);let t=`mat3( ${Hh.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case Oo:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Vh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Xg(i.getShaderSource(t),o)}else return s}function Yg(i,t){let e=qg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Zg(i,t){let e;switch(t){case sf:e="Linear";break;case rf:e="Reinhard";break;case of:e="Cineon";break;case ll:e="ACESFilmic";break;case cf:e="AgX";break;case lf:e="Neutral";break;case af:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Br=new D;function Jg(){se.getLuminanceCoefficients(Br);let i=Br.x.toFixed(4),t=Br.y.toFixed(4),e=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $g(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function Kg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Qg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Os(i){return i!==""}function Gh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ic(i){return i.replace(jg,ex)}var tx=new Map;function ex(i,t){let e=Qt[t];if(e===void 0){let n=tx.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ic(e)}var nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xh(i){return i.replace(nx,ix)}function ix(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function sx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Do?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Od?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yn&&(t="SHADOWMAP_TYPE_VSM"),t}function rx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fs:case ps:t="ENVMAP_TYPE_CUBE";break;case No:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ox(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ps:t="ENVMAP_MODE_REFRACTION";break}return t}function ax(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Uo:t="ENVMAP_BLENDING_MULTIPLY";break;case ef:t="ENVMAP_BLENDING_MIX";break;case nf:t="ENVMAP_BLENDING_ADD";break}return t}function cx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=sx(e),l=rx(e),h=ox(e),u=ax(e),d=cx(e),f=$g(e),g=Kg(r),x=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Os).join(`
`),p.length>0&&(p+=`
`)):(m=[qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),p=[qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gi?"#define TONE_MAPPING":"",e.toneMapping!==gi?Qt.tonemapping_pars_fragment:"",e.toneMapping!==gi?Zg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,Yg("linearToOutputTexel",e.outputColorSpace),Jg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Os).join(`
`)),o=Ic(o),o=Gh(o,e),o=Wh(o,e),a=Ic(a),a=Gh(a,e),a=Wh(a,e),o=Xh(o),a=Xh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=M+m+o,_=M+p+a,I=kh(s,s.VERTEX_SHADER,v),E=kh(s,s.FRAGMENT_SHADER,_);s.attachShader(x,I),s.attachShader(x,E),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(x).trim(),U=s.getShaderInfoLog(I).trim(),O=s.getShaderInfoLog(E).trim(),H=!0,z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,I,E);else{let Q=Vh(s,I,"vertex"),G=Vh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+Q+`
`+G)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(U===""||O==="")&&(z=!1);z&&(C.diagnostics={runnable:H,programLog:L,vertexShader:{log:U,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(I),s.deleteShader(E),R=new us(s,x),S=Qg(s,x)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,Gg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=E,this}var hx=0,Pc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Lc(t),e.set(t,n)),n}},Lc=class{constructor(t){this.id=hx++,this.code=t,this.usedTimes=0}};function ux(i,t,e,n,s,r,o){let a=new io,c=new Pc,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,C,L,U){let O=L.fog,H=U.geometry,z=S.isMeshStandardMaterial?L.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||z),G=Q&&Q.mapping===No?Q.image.height:null,st=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ct=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,et=ct!==void 0?ct.length:0,Et=0;H.morphAttributes.position!==void 0&&(Et=1),H.morphAttributes.normal!==void 0&&(Et=2),H.morphAttributes.color!==void 0&&(Et=3);let Vt,X,tt,dt;if(st){let he=Un[st];Vt=he.vertexShader,X=he.fragmentShader}else Vt=S.vertexShader,X=S.fragmentShader,c.update(S),tt=c.getVertexShaderID(S),dt=c.getFragmentShaderID(S);let ot=i.getRenderTarget(),Dt=i.state.buffers.depth.getReversed(),Ft=U.isInstancedMesh===!0,Bt=U.isBatchedMesh===!0,ee=!!S.map,$=!!S.matcap,it=!!Q,P=!!S.aoMap,Lt=!!S.lightMap,nt=!!S.bumpMap,bt=!!S.normalMap,ut=!!S.displacementMap,zt=!!S.emissiveMap,vt=!!S.metalnessMap,T=!!S.roughnessMap,b=S.anisotropy>0,k=S.clearcoat>0,Z=S.dispersion>0,j=S.iridescence>0,J=S.sheen>0,Tt=S.transmission>0,pt=b&&!!S.anisotropyMap,Mt=k&&!!S.clearcoatMap,te=k&&!!S.clearcoatNormalMap,rt=k&&!!S.clearcoatRoughnessMap,St=j&&!!S.iridescenceMap,kt=j&&!!S.iridescenceThicknessMap,Wt=J&&!!S.sheenColorMap,wt=J&&!!S.sheenRoughnessMap,ie=!!S.specularMap,Kt=!!S.specularColorMap,pe=!!S.specularIntensityMap,N=Tt&&!!S.transmissionMap,gt=Tt&&!!S.thicknessMap,q=!!S.gradientMap,K=!!S.alphaMap,yt=S.alphaTest>0,xt=!!S.alphaHash,Zt=!!S.extensions,we=gi;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(we=i.toneMapping);let Xe={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:Vt,fragmentShader:X,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:dt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&U._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&U.instanceColor!==null,instancingMorph:Ft&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:vs,alphaToCoverage:!!S.alphaToCoverage,map:ee,matcap:$,envMap:it,envMapMode:it&&Q.mapping,envMapCubeUVHeight:G,aoMap:P,lightMap:Lt,bumpMap:nt,normalMap:bt,displacementMap:d&&ut,emissiveMap:zt,normalMapObjectSpace:bt&&S.normalMapType===pf,normalMapTangentSpace:bt&&S.normalMapType===xl,metalnessMap:vt,roughnessMap:T,anisotropy:b,anisotropyMap:pt,clearcoat:k,clearcoatMap:Mt,clearcoatNormalMap:te,clearcoatRoughnessMap:rt,dispersion:Z,iridescence:j,iridescenceMap:St,iridescenceThicknessMap:kt,sheen:J,sheenColorMap:Wt,sheenRoughnessMap:wt,specularMap:ie,specularColorMap:Kt,specularIntensityMap:pe,transmission:Tt,transmissionMap:N,thicknessMap:gt,gradientMap:q,opaque:S.transparent===!1&&S.blending===cs&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:yt,alphaHash:xt,combine:S.combine,mapUv:ee&&x(S.map.channel),aoMapUv:P&&x(S.aoMap.channel),lightMapUv:Lt&&x(S.lightMap.channel),bumpMapUv:nt&&x(S.bumpMap.channel),normalMapUv:bt&&x(S.normalMap.channel),displacementMapUv:ut&&x(S.displacementMap.channel),emissiveMapUv:zt&&x(S.emissiveMap.channel),metalnessMapUv:vt&&x(S.metalnessMap.channel),roughnessMapUv:T&&x(S.roughnessMap.channel),anisotropyMapUv:pt&&x(S.anisotropyMap.channel),clearcoatMapUv:Mt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:te&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:wt&&x(S.sheenRoughnessMap.channel),specularMapUv:ie&&x(S.specularMap.channel),specularColorMapUv:Kt&&x(S.specularColorMap.channel),specularIntensityMapUv:pe&&x(S.specularIntensityMap.channel),transmissionMapUv:N&&x(S.transmissionMap.channel),thicknessMapUv:gt&&x(S.thicknessMap.channel),alphaMapUv:K&&x(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(bt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(ee||K),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:U.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:Et,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:we,decodeVideoTexture:ee&&S.map.isVideoTexture===!0&&se.getTransfer(S.map.colorSpace)===de,decodeVideoTextureEmissive:zt&&S.emissiveMap.isVideoTexture===!0&&se.getTransfer(S.emissiveMap.colorSpace)===de,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===An,flipSided:S.side===Ke,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Zt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&S.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Xe.vertexUv1s=l.has(1),Xe.vertexUv2s=l.has(2),Xe.vertexUv3s=l.has(3),l.clear(),Xe}function p(S){let y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(let C in S.defines)y.push(C),y.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(M(y,S),v(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function M(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){let y=g[S.type],C;if(y){let L=Un[y];C=ep.clone(L.uniforms)}else C=S.uniforms;return C}function I(S,y){let C;for(let L=0,U=h.length;L<U;L++){let O=h[L];if(O.cacheKey===y){C=O,++C.usedTimes;break}}return C===void 0&&(C=new lx(i,y,S,r),h.push(C)),C}function E(S){if(--S.usedTimes===0){let y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function A(S){c.remove(S)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:I,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:R}}function dx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function fx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Yh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Zh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||fx),n.length>1&&n.sort(d||Yh),s.length>1&&s.sort(d||Yh)}function h(){for(let u=t,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function px(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Zh,i.set(n,[o])):s>=r.length?(o=new Zh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function mx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ot};break;case"SpotLight":e={position:new D,direction:new D,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function gx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var xx=0;function _x(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function yx(i){let t=new mx,e=gx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new Gt,o=new Gt;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,M=0,v=0,_=0,I=0,E=0,A=0;l.sort(_x);for(let S=0,y=l.length;S<y;S++){let C=l[S],L=C.color,U=C.intensity,O=C.distance,H=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=L.r*U,u+=L.g*U,d+=L.b*U;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],U);A++}else if(C.isDirectionalLight){let z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Q=C.shadow,G=e.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=C.shadow.matrix,M++}n.directional[f]=z,f++}else if(C.isSpotLight){let z=t.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(L).multiplyScalar(U),z.distance=O,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[x]=z;let Q=C.shadow;if(C.map&&(n.spotLightMap[I]=C.map,I++,Q.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[x]=Q.matrix,C.castShadow){let G=e.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=H,_++}x++}else if(C.isRectAreaLight){let z=t.get(C);z.color.copy(L).multiplyScalar(U),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=z,m++}else if(C.isPointLight){let z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){let Q=C.shadow,G=e.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=C.shadow.matrix,v++}n.point[g]=z,g++}else if(C.isHemisphereLight){let z=t.get(C);z.skyColor.copy(C.color).multiplyScalar(U),z.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[p]=z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==v||R.numSpotShadows!==_||R.numSpotMaps!==I||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+I-E,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,R.directionalLength=f,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=v,R.numSpotShadows=_,R.numSpotMaps=I,R.numLightProbes=A,n.version=xx++)}function c(l,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let v=l[p];if(v.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(v.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(v.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Jh(i){let t=new yx(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function vx(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Jh(i),t.set(s,[a])):r>=o.length?(a=new Jh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Dc=class extends ti{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Uc=class extends ti{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Mx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bx=`uniform sampler2D shadow_pass;
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
}`;function Sx(i,t,e){let n=new qs,s=new ht,r=new ht,o=new _e,a=new Dc({depthPacking:ff}),c=new Uc,l={},h=e.maxTextureSize,u={[xi]:Ke,[Ke]:xi,[An]:An},d=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:Mx,fragmentShader:bx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Re;g.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new fe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let p=this.type;this.render=function(E,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let S=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),L=i.state;L.setBlending(mi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=p!==Yn&&this.type===Yn,O=p===Yn&&this.type!==Yn;for(let H=0,z=E.length;H<z;H++){let Q=E[H],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let st=G.getFrameExtents();if(s.multiply(st),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,G.mapSize.y=r.y)),G.map===null||U===!0||O===!0){let et=this.type!==Yn?{minFilter:ln,magFilter:ln}:{};G.map!==null&&G.map.dispose(),G.map=new jn(s.x,s.y,et),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let ct=G.getViewportCount();for(let et=0;et<ct;et++){let Et=G.getViewport(et);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),L.viewport(o),G.updateMatrices(Q,et),n=G.getFrustum(),_(A,R,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===Yn&&M(G,R),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,C)};function M(E,A){let R=t.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new jn(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,R,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,R,f,x,null)}function v(E,A,R,S){let y=null,C=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)y=C;else if(y=R.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let L=y.uuid,U=A.uuid,O=l[L];O===void 0&&(O={},l[L]=O);let H=O[U];H===void 0&&(H=y.clone(),O[U]=H,A.addEventListener("dispose",I)),y=H}if(y.visible=A.visible,y.wireframe=A.wireframe,S===Yn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let L=i.properties.get(y);L.light=R}return y}function _(E,A,R,S,y){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===Yn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);let U=t.update(E),O=E.material;if(Array.isArray(O)){let H=U.groups;for(let z=0,Q=H.length;z<Q;z++){let G=H[z],st=O[G.materialIndex];if(st&&st.visible){let ct=v(E,st,S,y);E.onBeforeShadow(i,E,A,R,U,ct,G),i.renderBufferDirect(R,null,U,ct,E,G),E.onAfterShadow(i,E,A,R,U,ct,G)}}}else if(O.visible){let H=v(E,O,S,y);E.onBeforeShadow(i,E,A,R,U,H,null),i.renderBufferDirect(R,null,U,H,E,null),E.onAfterShadow(i,E,A,R,U,H,null)}}let L=E.children;for(let U=0,O=L.length;U<O;U++)_(L[U],A,R,S,y)}function I(E){E.target.removeEventListener("dispose",I);for(let R in l){let S=l[R],y=E.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}var wx={[za]:ka,[Ha]:Wa,[Va]:Xa,[ds]:Ga,[ka]:za,[Wa]:Ha,[Xa]:Va,[Ga]:ds};function Ex(i,t){function e(){let N=!1,gt=new _e,q=null,K=new _e(0,0,0,0);return{setMask:function(yt){q!==yt&&!N&&(i.colorMask(yt,yt,yt,yt),q=yt)},setLocked:function(yt){N=yt},setClear:function(yt,xt,Zt,we,Xe){Xe===!0&&(yt*=we,xt*=we,Zt*=we),gt.set(yt,xt,Zt,we),K.equals(gt)===!1&&(i.clearColor(yt,xt,Zt,we),K.copy(gt))},reset:function(){N=!1,q=null,K.set(-1,0,0,0)}}}function n(){let N=!1,gt=!1,q=null,K=null,yt=null;return{setReversed:function(xt){if(gt!==xt){let Zt=t.get("EXT_clip_control");gt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);let we=yt;yt=null,this.setClear(we)}gt=xt},getReversed:function(){return gt},setTest:function(xt){xt?ot(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(xt){q!==xt&&!N&&(i.depthMask(xt),q=xt)},setFunc:function(xt){if(gt&&(xt=wx[xt]),K!==xt){switch(xt){case za:i.depthFunc(i.NEVER);break;case ka:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case ds:i.depthFunc(i.LEQUAL);break;case Va:i.depthFunc(i.EQUAL);break;case Ga:i.depthFunc(i.GEQUAL);break;case Wa:i.depthFunc(i.GREATER);break;case Xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=xt}},setLocked:function(xt){N=xt},setClear:function(xt){yt!==xt&&(gt&&(xt=1-xt),i.clearDepth(xt),yt=xt)},reset:function(){N=!1,q=null,K=null,yt=null,gt=!1}}}function s(){let N=!1,gt=null,q=null,K=null,yt=null,xt=null,Zt=null,we=null,Xe=null;return{setTest:function(he){N||(he?ot(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(he){gt!==he&&!N&&(i.stencilMask(he),gt=he)},setFunc:function(he,bn,kn){(q!==he||K!==bn||yt!==kn)&&(i.stencilFunc(he,bn,kn),q=he,K=bn,yt=kn)},setOp:function(he,bn,kn){(xt!==he||Zt!==bn||we!==kn)&&(i.stencilOp(he,bn,kn),xt=he,Zt=bn,we=kn)},setLocked:function(he){N=he},setClear:function(he){Xe!==he&&(i.clearStencil(he),Xe=he)},reset:function(){N=!1,gt=null,q=null,K=null,yt=null,xt=null,Zt=null,we=null,Xe=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,v=null,_=null,I=null,E=null,A=new Ot(0,0,0),R=0,S=!1,y=null,C=null,L=null,U=null,O=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,Q=0,G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=Q>=2);let st=null,ct={},et=i.getParameter(i.SCISSOR_BOX),Et=i.getParameter(i.VIEWPORT),Vt=new _e().fromArray(et),X=new _e().fromArray(Et);function tt(N,gt,q,K){let yt=new Uint8Array(4),xt=i.createTexture();i.bindTexture(N,xt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<q;Zt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(gt,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(gt+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return xt}let dt={};dt[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),dt[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),dt[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(ds),nt(!1),bt($l),ot(i.CULL_FACE),P(mi);function ot(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Dt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ft(N,gt){return u[N]!==gt?(i.bindFramebuffer(N,gt),u[N]=gt,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=gt),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=gt),!0):!1}function Bt(N,gt){let q=f,K=!1;if(N){q=d.get(gt),q===void 0&&(q=[],d.set(gt,q));let yt=N.textures;if(q.length!==yt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let xt=0,Zt=yt.length;xt<Zt;xt++)q[xt]=i.COLOR_ATTACHMENT0+xt;q.length=yt.length,K=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,K=!0);K&&i.drawBuffers(q)}function ee(N){return g!==N?(i.useProgram(N),g=N,!0):!1}let $={[Li]:i.FUNC_ADD,[Fd]:i.FUNC_SUBTRACT,[zd]:i.FUNC_REVERSE_SUBTRACT};$[kd]=i.MIN,$[Hd]=i.MAX;let it={[Vd]:i.ZERO,[Gd]:i.ONE,[Wd]:i.SRC_COLOR,[Ba]:i.SRC_ALPHA,[$d]:i.SRC_ALPHA_SATURATE,[Zd]:i.DST_COLOR,[qd]:i.DST_ALPHA,[Xd]:i.ONE_MINUS_SRC_COLOR,[Fa]:i.ONE_MINUS_SRC_ALPHA,[Jd]:i.ONE_MINUS_DST_COLOR,[Yd]:i.ONE_MINUS_DST_ALPHA,[Kd]:i.CONSTANT_COLOR,[Qd]:i.ONE_MINUS_CONSTANT_COLOR,[jd]:i.CONSTANT_ALPHA,[tf]:i.ONE_MINUS_CONSTANT_ALPHA};function P(N,gt,q,K,yt,xt,Zt,we,Xe,he){if(N===mi){x===!0&&(Dt(i.BLEND),x=!1);return}if(x===!1&&(ot(i.BLEND),x=!0),N!==Bd){if(N!==m||he!==S){if((p!==Li||_!==Li)&&(i.blendEquation(i.FUNC_ADD),p=Li,_=Li),he)switch(N){case cs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Kr:i.blendFunc(i.ONE,i.ONE);break;case Kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ql:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case cs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Kr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ql:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,v=null,I=null,E=null,A.set(0,0,0),R=0,m=N,S=he}return}yt=yt||gt,xt=xt||q,Zt=Zt||K,(gt!==p||yt!==_)&&(i.blendEquationSeparate($[gt],$[yt]),p=gt,_=yt),(q!==M||K!==v||xt!==I||Zt!==E)&&(i.blendFuncSeparate(it[q],it[K],it[xt],it[Zt]),M=q,v=K,I=xt,E=Zt),(we.equals(A)===!1||Xe!==R)&&(i.blendColor(we.r,we.g,we.b,Xe),A.copy(we),R=Xe),m=N,S=!1}function Lt(N,gt){N.side===An?Dt(i.CULL_FACE):ot(i.CULL_FACE);let q=N.side===Ke;gt&&(q=!q),nt(q),N.blending===cs&&N.transparent===!1?P(mi):P(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let K=N.stencilWrite;a.setTest(K),K&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),zt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(N){y!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),y=N)}function bt(N){N!==Ud?(ot(i.CULL_FACE),N!==C&&(N===$l?i.cullFace(i.BACK):N===Nd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),C=N}function ut(N){N!==L&&(z&&i.lineWidth(N),L=N)}function zt(N,gt,q){N?(ot(i.POLYGON_OFFSET_FILL),(U!==gt||O!==q)&&(i.polygonOffset(gt,q),U=gt,O=q)):Dt(i.POLYGON_OFFSET_FILL)}function vt(N){N?ot(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function T(N){N===void 0&&(N=i.TEXTURE0+H-1),st!==N&&(i.activeTexture(N),st=N)}function b(N,gt,q){q===void 0&&(st===null?q=i.TEXTURE0+H-1:q=st);let K=ct[q];K===void 0&&(K={type:void 0,texture:void 0},ct[q]=K),(K.type!==N||K.texture!==gt)&&(st!==q&&(i.activeTexture(q),st=q),i.bindTexture(N,gt||dt[N]),K.type=N,K.texture=gt)}function k(){let N=ct[st];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Wt(N){Vt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Vt.copy(N))}function wt(N){X.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),X.copy(N))}function ie(N,gt){let q=l.get(gt);q===void 0&&(q=new WeakMap,l.set(gt,q));let K=q.get(N);K===void 0&&(K=i.getUniformBlockIndex(gt,N.name),q.set(N,K))}function Kt(N,gt){let K=l.get(gt).get(N);c.get(gt)!==K&&(i.uniformBlockBinding(gt,K,N.__bindingPointIndex),c.set(gt,K))}function pe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ct={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,v=null,_=null,I=null,E=null,A=new Ot(0,0,0),R=0,S=!1,y=null,C=null,L=null,U=null,O=null,Vt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Dt,bindFramebuffer:Ft,drawBuffers:Bt,useProgram:ee,setBlending:P,setMaterial:Lt,setFlipSided:nt,setCullFace:bt,setLineWidth:ut,setPolygonOffset:zt,setScissorTest:vt,activeTexture:T,bindTexture:b,unbindTexture:k,compressedTexImage2D:Z,compressedTexImage3D:j,texImage2D:St,texImage3D:kt,updateUBOMapping:ie,uniformBlockBinding:Kt,texStorage2D:te,texStorage3D:rt,texSubImage2D:J,texSubImage3D:Tt,compressedTexSubImage2D:pt,compressedTexSubImage3D:Mt,scissor:Wt,viewport:wt,reset:pe}}function $h(i,t,e,n){let s=Tx(n);switch(e){case _u:return i*t;case vu:return i*t;case Mu:return i*t*2;case fl:return i*t/s.components*s.byteLength;case pl:return i*t/s.components*s.byteLength;case bu:return i*t*2/s.components*s.byteLength;case ml:return i*t*2/s.components*s.byteLength;case yu:return i*t*3/s.components*s.byteLength;case _n:return i*t*4/s.components*s.byteLength;case gl:return i*t*4/s.components*s.byteLength;case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $a:case Qa:return Math.max(i,16)*Math.max(t,8)/4;case Ja:case Ka:return Math.max(i,8)*Math.max(t,8)/2;case ja:case tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ic:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case sc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case rc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ac:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case cc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case lc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case hc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case uc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case fc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case pc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case mc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case $r:case gc:case xc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Su:case _c:return Math.ceil(i/4)*Math.ceil(t/4)*8;case yc:case vc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tx(i){switch(i){case Qn:case mu:return{byteLength:1,components:1};case Ws:case gu:case rr:return{byteLength:2,components:1};case ul:case dl:return{byteLength:2,components:4};case Oi:case hl:case Rn:return{byteLength:4,components:1};case xu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Ax(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return f?new OffscreenCanvas(T,b):to("canvas")}function x(T,b,k){let Z=1,j=vt(T);if((j.width>k||j.height>k)&&(Z=k/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&T instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&T instanceof ImageBitmap||typeof VideoFrame!="undefined"&&T instanceof VideoFrame){let J=Math.floor(Z*j.width),Tt=Math.floor(Z*j.height);u===void 0&&(u=g(J,Tt));let pt=b?g(J,Tt):u;return pt.width=J,pt.height=Tt,pt.getContext("2d").drawImage(T,0,0,J,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+J+"x"+Tt+")."),pt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(T,b,k,Z,j=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let J=b;if(b===i.RED&&(k===i.FLOAT&&(J=i.R32F),k===i.HALF_FLOAT&&(J=i.R16F),k===i.UNSIGNED_BYTE&&(J=i.R8)),b===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.R8UI),k===i.UNSIGNED_SHORT&&(J=i.R16UI),k===i.UNSIGNED_INT&&(J=i.R32UI),k===i.BYTE&&(J=i.R8I),k===i.SHORT&&(J=i.R16I),k===i.INT&&(J=i.R32I)),b===i.RG&&(k===i.FLOAT&&(J=i.RG32F),k===i.HALF_FLOAT&&(J=i.RG16F),k===i.UNSIGNED_BYTE&&(J=i.RG8)),b===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RG8UI),k===i.UNSIGNED_SHORT&&(J=i.RG16UI),k===i.UNSIGNED_INT&&(J=i.RG32UI),k===i.BYTE&&(J=i.RG8I),k===i.SHORT&&(J=i.RG16I),k===i.INT&&(J=i.RG32I)),b===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGB8UI),k===i.UNSIGNED_SHORT&&(J=i.RGB16UI),k===i.UNSIGNED_INT&&(J=i.RGB32UI),k===i.BYTE&&(J=i.RGB8I),k===i.SHORT&&(J=i.RGB16I),k===i.INT&&(J=i.RGB32I)),b===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),k===i.UNSIGNED_INT&&(J=i.RGBA32UI),k===i.BYTE&&(J=i.RGBA8I),k===i.SHORT&&(J=i.RGBA16I),k===i.INT&&(J=i.RGBA32I)),b===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),b===i.RGBA){let Tt=j?Oo:se.getTransfer(Z);k===i.FLOAT&&(J=i.RGBA32F),k===i.HALF_FLOAT&&(J=i.RGBA16F),k===i.UNSIGNED_BYTE&&(J=Tt===de?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(T,b){let k;return T?b===null||b===Oi||b===ms?k=i.DEPTH24_STENCIL8:b===Rn?k=i.DEPTH32F_STENCIL8:b===Ws&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Oi||b===ms?k=i.DEPTH_COMPONENT24:b===Rn?k=i.DEPTH_COMPONENT32F:b===Ws&&(k=i.DEPTH_COMPONENT16),k}function I(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==ln&&T.minFilter!==Nn?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function E(T){let b=T.target;b.removeEventListener("dispose",E),R(b),b.isVideoTexture&&h.delete(b)}function A(T){let b=T.target;b.removeEventListener("dispose",A),y(b)}function R(T){let b=n.get(T);if(b.__webglInit===void 0)return;let k=T.source,Z=d.get(k);if(Z){let j=Z[b.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(T),Object.keys(Z).length===0&&d.delete(k)}n.remove(T)}function S(T){let b=n.get(T);i.deleteTexture(b.__webglTexture);let k=T.source,Z=d.get(k);delete Z[b.__cacheKey],o.memory.textures--}function y(T){let b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(b.__webglFramebuffer[Z]))for(let j=0;j<b.__webglFramebuffer[Z].length;j++)i.deleteFramebuffer(b.__webglFramebuffer[Z][j]);else i.deleteFramebuffer(b.__webglFramebuffer[Z]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Z])}else{if(Array.isArray(b.__webglFramebuffer))for(let Z=0;Z<b.__webglFramebuffer.length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[Z]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Z=0;Z<b.__webglColorRenderbuffer.length;Z++)b.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Z]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let k=T.textures;for(let Z=0,j=k.length;Z<j;Z++){let J=n.get(k[Z]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(T)}let C=0;function L(){C=0}function U(){let T=C;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),C+=1,T}function O(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function H(T,b){let k=n.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){let Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(k,T,b);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+b)}function z(T,b){let k=n.get(T);if(T.version>0&&k.__version!==T.version){X(k,T,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+b)}function Q(T,b){let k=n.get(T);if(T.version>0&&k.__version!==T.version){X(k,T,b);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+b)}function G(T,b){let k=n.get(T);if(T.version>0&&k.__version!==T.version){tt(k,T,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+b)}let st={[Gs]:i.REPEAT,[Ni]:i.CLAMP_TO_EDGE,[Za]:i.MIRRORED_REPEAT},ct={[ln]:i.NEAREST,[uf]:i.NEAREST_MIPMAP_NEAREST,[xr]:i.NEAREST_MIPMAP_LINEAR,[Nn]:i.LINEAR,[ia]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},et={[mf]:i.NEVER,[Mf]:i.ALWAYS,[gf]:i.LESS,[wu]:i.LEQUAL,[xf]:i.EQUAL,[vf]:i.GEQUAL,[_f]:i.GREATER,[yf]:i.NOTEQUAL};function Et(T,b){if(b.type===Rn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Nn||b.magFilter===ia||b.magFilter===xr||b.magFilter===Jn||b.minFilter===Nn||b.minFilter===ia||b.minFilter===xr||b.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,st[b.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,st[b.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,st[b.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ct[b.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ct[b.minFilter]),b.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,et[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ln||b.minFilter!==xr&&b.minFilter!==Jn||b.type===Rn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Vt(T,b){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",E));let Z=b.source,j=d.get(Z);j===void 0&&(j={},d.set(Z,j));let J=O(b);if(J!==T.__cacheKey){j[J]===void 0&&(j[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),j[J].usedTimes++;let Tt=j[T.__cacheKey];Tt!==void 0&&(j[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&S(b)),T.__cacheKey=J,T.__webglTexture=j[J].texture}return k}function X(T,b,k){let Z=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Z=i.TEXTURE_3D);let j=Vt(T,b),J=b.source;e.bindTexture(Z,T.__webglTexture,i.TEXTURE0+k);let Tt=n.get(J);if(J.version!==Tt.__version||j===!0){e.activeTexture(i.TEXTURE0+k);let pt=se.getPrimaries(se.workingColorSpace),Mt=b.colorSpace===pi?null:se.getPrimaries(b.colorSpace),te=b.colorSpace===pi||pt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let rt=x(b.image,!1,s.maxTextureSize);rt=zt(b,rt);let St=r.convert(b.format,b.colorSpace),kt=r.convert(b.type),Wt=v(b.internalFormat,St,kt,b.colorSpace,b.isVideoTexture);Et(Z,b);let wt,ie=b.mipmaps,Kt=b.isVideoTexture!==!0,pe=Tt.__version===void 0||j===!0,N=J.dataReady,gt=I(b,rt);if(b.isDepthTexture)Wt=_(b.format===gs,b.type),pe&&(Kt?e.texStorage2D(i.TEXTURE_2D,1,Wt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,Wt,rt.width,rt.height,0,St,kt,null));else if(b.isDataTexture)if(ie.length>0){Kt&&pe&&e.texStorage2D(i.TEXTURE_2D,gt,Wt,ie[0].width,ie[0].height);for(let q=0,K=ie.length;q<K;q++)wt=ie[q],Kt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,kt,wt.data):e.texImage2D(i.TEXTURE_2D,q,Wt,wt.width,wt.height,0,St,kt,wt.data);b.generateMipmaps=!1}else Kt?(pe&&e.texStorage2D(i.TEXTURE_2D,gt,Wt,rt.width,rt.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt.width,rt.height,St,kt,rt.data)):e.texImage2D(i.TEXTURE_2D,0,Wt,rt.width,rt.height,0,St,kt,rt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Kt&&pe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Wt,ie[0].width,ie[0].height,rt.depth);for(let q=0,K=ie.length;q<K;q++)if(wt=ie[q],b.format!==_n)if(St!==null)if(Kt){if(N)if(b.layerUpdates.size>0){let yt=$h(wt.width,wt.height,b.format,b.type);for(let xt of b.layerUpdates){let Zt=wt.data.subarray(xt*yt/wt.data.BYTES_PER_ELEMENT,(xt+1)*yt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,xt,wt.width,wt.height,1,St,Zt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,rt.depth,St,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Wt,wt.width,wt.height,rt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,rt.depth,St,kt,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Wt,wt.width,wt.height,rt.depth,0,St,kt,wt.data)}else{Kt&&pe&&e.texStorage2D(i.TEXTURE_2D,gt,Wt,ie[0].width,ie[0].height);for(let q=0,K=ie.length;q<K;q++)wt=ie[q],b.format!==_n?St!==null?Kt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Wt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,kt,wt.data):e.texImage2D(i.TEXTURE_2D,q,Wt,wt.width,wt.height,0,St,kt,wt.data)}else if(b.isDataArrayTexture)if(Kt){if(pe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Wt,rt.width,rt.height,rt.depth),N)if(b.layerUpdates.size>0){let q=$h(rt.width,rt.height,b.format,b.type);for(let K of b.layerUpdates){let yt=rt.data.subarray(K*q/rt.data.BYTES_PER_ELEMENT,(K+1)*q/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,rt.width,rt.height,1,St,kt,yt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,St,kt,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Wt,rt.width,rt.height,rt.depth,0,St,kt,rt.data);else if(b.isData3DTexture)Kt?(pe&&e.texStorage3D(i.TEXTURE_3D,gt,Wt,rt.width,rt.height,rt.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,St,kt,rt.data)):e.texImage3D(i.TEXTURE_3D,0,Wt,rt.width,rt.height,rt.depth,0,St,kt,rt.data);else if(b.isFramebufferTexture){if(pe)if(Kt)e.texStorage2D(i.TEXTURE_2D,gt,Wt,rt.width,rt.height);else{let q=rt.width,K=rt.height;for(let yt=0;yt<gt;yt++)e.texImage2D(i.TEXTURE_2D,yt,Wt,q,K,0,St,kt,null),q>>=1,K>>=1}}else if(ie.length>0){if(Kt&&pe){let q=vt(ie[0]);e.texStorage2D(i.TEXTURE_2D,gt,Wt,q.width,q.height)}for(let q=0,K=ie.length;q<K;q++)wt=ie[q],Kt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,St,kt,wt):e.texImage2D(i.TEXTURE_2D,q,Wt,St,kt,wt);b.generateMipmaps=!1}else if(Kt){if(pe){let q=vt(rt);e.texStorage2D(i.TEXTURE_2D,gt,Wt,q.width,q.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,kt,rt)}else e.texImage2D(i.TEXTURE_2D,0,Wt,St,kt,rt);m(b)&&p(Z),Tt.__version=J.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function tt(T,b,k){if(b.image.length!==6)return;let Z=Vt(T,b),j=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+k);let J=n.get(j);if(j.version!==J.__version||Z===!0){e.activeTexture(i.TEXTURE0+k);let Tt=se.getPrimaries(se.workingColorSpace),pt=b.colorSpace===pi?null:se.getPrimaries(b.colorSpace),Mt=b.colorSpace===pi||Tt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let te=b.isCompressedTexture||b.image[0].isCompressedTexture,rt=b.image[0]&&b.image[0].isDataTexture,St=[];for(let K=0;K<6;K++)!te&&!rt?St[K]=x(b.image[K],!0,s.maxCubemapSize):St[K]=rt?b.image[K].image:b.image[K],St[K]=zt(b,St[K]);let kt=St[0],Wt=r.convert(b.format,b.colorSpace),wt=r.convert(b.type),ie=v(b.internalFormat,Wt,wt,b.colorSpace),Kt=b.isVideoTexture!==!0,pe=J.__version===void 0||Z===!0,N=j.dataReady,gt=I(b,kt);Et(i.TEXTURE_CUBE_MAP,b);let q;if(te){Kt&&pe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,ie,kt.width,kt.height);for(let K=0;K<6;K++){q=St[K].mipmaps;for(let yt=0;yt<q.length;yt++){let xt=q[yt];b.format!==_n?Wt!==null?Kt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,xt.width,xt.height,Wt,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,ie,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,xt.width,xt.height,Wt,wt,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,ie,xt.width,xt.height,0,Wt,wt,xt.data)}}}else{if(q=b.mipmaps,Kt&&pe){q.length>0&&gt++;let K=vt(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,ie,K.width,K.height)}for(let K=0;K<6;K++)if(rt){Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,St[K].width,St[K].height,Wt,wt,St[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ie,St[K].width,St[K].height,0,Wt,wt,St[K].data);for(let yt=0;yt<q.length;yt++){let Zt=q[yt].image[K].image;Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,Zt.width,Zt.height,Wt,wt,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,ie,Zt.width,Zt.height,0,Wt,wt,Zt.data)}}else{Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Wt,wt,St[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ie,Wt,wt,St[K]);for(let yt=0;yt<q.length;yt++){let xt=q[yt];Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,Wt,wt,xt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,ie,Wt,wt,xt.image[K])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),J.__version=j.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function dt(T,b,k,Z,j,J){let Tt=r.convert(k.format,k.colorSpace),pt=r.convert(k.type),Mt=v(k.internalFormat,Tt,pt,k.colorSpace),te=n.get(b),rt=n.get(k);if(rt.__renderTarget=b,!te.__hasExternalTextures){let St=Math.max(1,b.width>>J),kt=Math.max(1,b.height>>J);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,J,Mt,St,kt,b.depth,0,Tt,pt,null):e.texImage2D(j,J,Mt,St,kt,0,Tt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),bt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,rt.__webglTexture,0,nt(b)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,rt.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(T,b,k){if(i.bindRenderbuffer(i.RENDERBUFFER,T),b.depthBuffer){let Z=b.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,J=_(b.stencilBuffer,j),Tt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=nt(b);bt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,J,b.width,b.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,T)}else{let Z=b.textures;for(let j=0;j<Z.length;j++){let J=Z[j],Tt=r.convert(J.format,J.colorSpace),pt=r.convert(J.type),Mt=v(J.internalFormat,Tt,pt,J.colorSpace),te=nt(b);k&&bt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,Mt,b.width,b.height):bt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,Mt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Dt(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=n.get(b.depthTexture);Z.__renderTarget=b,(!Z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),H(b.depthTexture,0);let j=Z.__webglTexture,J=nt(b);if(b.depthTexture.format===ls)bt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(b.depthTexture.format===gs)bt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ft(T){let b=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let Z=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Z){let j=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),b.__depthDisposeCallback=j}b.__boundDepthTexture=Z}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Dt(b.__webglFramebuffer,T)}else if(k){b.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Z]),b.__webglDepthbuffer[Z]===void 0)b.__webglDepthbuffer[Z]=i.createRenderbuffer(),ot(b.__webglDepthbuffer[Z],T,!1);else{let j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ot(b.__webglDepthbuffer,T,!1);else{let Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,j)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(T,b,k){let Z=n.get(T);b!==void 0&&dt(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ft(T)}function ee(T){let b=T.texture,k=n.get(T),Z=n.get(b);T.addEventListener("dispose",A);let j=T.textures,J=T.isWebGLCubeRenderTarget===!0,Tt=j.length>1;if(Tt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=b.version,o.memory.textures++),J){k.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[pt]=[];for(let Mt=0;Mt<b.mipmaps.length;Mt++)k.__webglFramebuffer[pt][Mt]=i.createFramebuffer()}else k.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)k.__webglFramebuffer[pt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let pt=0,Mt=j.length;pt<Mt;pt++){let te=n.get(j[pt]);te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&bt(T)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let pt=0;pt<j.length;pt++){let Mt=j[pt];k.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[pt]);let te=r.convert(Mt.format,Mt.colorSpace),rt=r.convert(Mt.type),St=v(Mt.internalFormat,te,rt,Mt.colorSpace,T.isXRRenderTarget===!0),kt=nt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,St,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,k.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Et(i.TEXTURE_CUBE_MAP,b);for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Mt=0;Mt<b.mipmaps.length;Mt++)dt(k.__webglFramebuffer[pt][Mt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt);else dt(k.__webglFramebuffer[pt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let pt=0,Mt=j.length;pt<Mt;pt++){let te=j[pt],rt=n.get(te);e.bindTexture(i.TEXTURE_2D,rt.__webglTexture),Et(i.TEXTURE_2D,te),dt(k.__webglFramebuffer,T,te,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),m(te)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,Z.__webglTexture),Et(pt,b),b.mipmaps&&b.mipmaps.length>0)for(let Mt=0;Mt<b.mipmaps.length;Mt++)dt(k.__webglFramebuffer[Mt],T,b,i.COLOR_ATTACHMENT0,pt,Mt);else dt(k.__webglFramebuffer,T,b,i.COLOR_ATTACHMENT0,pt,0);m(b)&&p(pt),e.unbindTexture()}T.depthBuffer&&Ft(T)}function $(T){let b=T.textures;for(let k=0,Z=b.length;k<Z;k++){let j=b[k];if(m(j)){let J=M(T),Tt=n.get(j).__webglTexture;e.bindTexture(J,Tt),p(J),e.unbindTexture()}}}let it=[],P=[];function Lt(T){if(T.samples>0){if(bt(T)===!1){let b=T.textures,k=T.width,Z=T.height,j=i.COLOR_BUFFER_BIT,J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(T),pt=b.length>1;if(pt)for(let Mt=0;Mt<b.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Mt=0;Mt<b.length;Mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);let te=n.get(b[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,k,Z,0,0,k,Z,j,i.NEAREST),c===!0&&(it.length=0,P.length=0,it.push(i.COLOR_ATTACHMENT0+Mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(it.push(J),P.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Mt=0;Mt<b.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);let te=n.get(b[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,te,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let b=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function nt(T){return Math.min(s.maxSamples,T.samples)}function bt(T){let b=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ut(T){let b=o.render.frame;h.get(T)!==b&&(h.set(T,b),T.update())}function zt(T,b){let k=T.colorSpace,Z=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==vs&&k!==pi&&(se.getTransfer(k)===de?(Z!==_n||j!==Qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function vt(T){return typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame!="undefined"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=Bt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=$,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=bt}function Rx(i,t){function e(n,s=pi){let r,o=se.getTransfer(s);if(n===Qn)return i.UNSIGNED_BYTE;if(n===ul)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===mu)return i.BYTE;if(n===gu)return i.SHORT;if(n===Ws)return i.UNSIGNED_SHORT;if(n===hl)return i.INT;if(n===Oi)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===rr)return i.HALF_FLOAT;if(n===_u)return i.ALPHA;if(n===yu)return i.RGB;if(n===_n)return i.RGBA;if(n===vu)return i.LUMINANCE;if(n===Mu)return i.LUMINANCE_ALPHA;if(n===ls)return i.DEPTH_COMPONENT;if(n===gs)return i.DEPTH_STENCIL;if(n===fl)return i.RED;if(n===pl)return i.RED_INTEGER;if(n===bu)return i.RG;if(n===ml)return i.RG_INTEGER;if(n===gl)return i.RGBA_INTEGER;if(n===qr||n===Yr||n===Zr||n===Jr)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===$a||n===Ka||n===Qa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ja||n===tc||n===ec)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ja||n===tc)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ec)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===nc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ic)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ac)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===cc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===lc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===dc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===mc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$r||n===gc||n===xc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===$r)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Su||n===_c||n===yc||n===vc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$r)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_c)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===yc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Nc=class extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},$e=class extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cx={type:"move"},zs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cx)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Ix=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Px=`
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

}`,Oc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new rn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new yn({vertexShader:Ix,fragmentShader:Px,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bc=class extends _i{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,x=new Oc,m=e.getContextAttributes(),p=null,M=null,v=[],_=[],I=new ht,E=null,A=new Je;A.viewport=new _e;let R=new Je;R.viewport=new _e;let S=[A,R],y=new Nc,C=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let tt=v[X];return tt===void 0&&(tt=new zs,v[X]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(X){let tt=v[X];return tt===void 0&&(tt=new zs,v[X]=tt),tt.getGripSpace()},this.getHand=function(X){let tt=v[X];return tt===void 0&&(tt=new zs,v[X]=tt),tt.getHandSpace()};function U(X){let tt=_.indexOf(X.inputSource);if(tt===-1)return;let dt=v[tt];dt!==void 0&&(dt.update(X.inputSource,X.frame,l||o),dt.dispatchEvent({type:X.type,data:X.inputSource}))}function O(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",H);for(let X=0;X<v.length;X++){let tt=_[X];tt!==null&&(_[X]=null,v[X].disconnect(tt))}C=null,L=null,x.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,M=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",O),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){let tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new jn(f.framebufferWidth,f.framebufferHeight,{format:_n,type:Qn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,dt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?gs:ls,dt=m.stencil?ms:Oi);let Dt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Dt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new jn(d.textureWidth,d.textureHeight,{format:_n,type:Qn,depthTexture:new ho(d.textureWidth,d.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Vt.setContext(s),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function H(X){for(let tt=0;tt<X.removed.length;tt++){let dt=X.removed[tt],ot=_.indexOf(dt);ot>=0&&(_[ot]=null,v[ot].disconnect(dt))}for(let tt=0;tt<X.added.length;tt++){let dt=X.added[tt],ot=_.indexOf(dt);if(ot===-1){for(let Ft=0;Ft<v.length;Ft++)if(Ft>=_.length){_.push(dt),ot=Ft;break}else if(_[Ft]===null){_[Ft]=dt,ot=Ft;break}if(ot===-1)break}let Dt=v[ot];Dt&&Dt.connect(dt)}}let z=new D,Q=new D;function G(X,tt,dt){z.setFromMatrixPosition(tt.matrixWorld),Q.setFromMatrixPosition(dt.matrixWorld);let ot=z.distanceTo(Q),Dt=tt.projectionMatrix.elements,Ft=dt.projectionMatrix.elements,Bt=Dt[14]/(Dt[10]-1),ee=Dt[14]/(Dt[10]+1),$=(Dt[9]+1)/Dt[5],it=(Dt[9]-1)/Dt[5],P=(Dt[8]-1)/Dt[0],Lt=(Ft[8]+1)/Ft[0],nt=Bt*P,bt=Bt*Lt,ut=ot/(-P+Lt),zt=ut*-P;if(tt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(zt),X.translateZ(ut),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Dt[10]===-1)X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let vt=Bt+ut,T=ee+ut,b=nt-zt,k=bt+(ot-zt),Z=$*ee/T*vt,j=it*ee/T*vt;X.projectionMatrix.makePerspective(b,k,Z,j,vt,T),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function st(X,tt){tt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(tt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let tt=X.near,dt=X.far;x.texture!==null&&(x.depthNear>0&&(tt=x.depthNear),x.depthFar>0&&(dt=x.depthFar)),y.near=R.near=A.near=tt,y.far=R.far=A.far=dt,(C!==y.near||L!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,L=y.far),A.layers.mask=X.layers.mask|2,R.layers.mask=X.layers.mask|4,y.layers.mask=A.layers.mask|R.layers.mask;let ot=X.parent,Dt=y.cameras;st(y,ot);for(let Ft=0;Ft<Dt.length;Ft++)st(Dt[Ft],ot);Dt.length===2?G(y,A,R):y.projectionMatrix.copy(A.projectionMatrix),ct(X,y,ot)};function ct(X,tt,dt){dt===null?X.matrix.copy(tt.matrixWorld):(X.matrix.copy(dt.matrixWorld),X.matrix.invert(),X.matrix.multiply(tt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=xs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let et=null;function Et(X,tt){if(h=tt.getViewerPose(l||o),g=tt,h!==null){let dt=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let ot=!1;dt.length!==y.cameras.length&&(y.cameras.length=0,ot=!0);for(let Ft=0;Ft<dt.length;Ft++){let Bt=dt[Ft],ee=null;if(f!==null)ee=f.getViewport(Bt);else{let it=u.getViewSubImage(d,Bt);ee=it.viewport,Ft===0&&(t.setRenderTargetTextures(M,it.colorTexture,d.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(M))}let $=S[Ft];$===void 0&&($=new Je,$.layers.enable(Ft),$.viewport=new _e,S[Ft]=$),$.matrix.fromArray(Bt.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(Bt.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(ee.x,ee.y,ee.width,ee.height),Ft===0&&(y.matrix.copy($.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ot===!0&&y.cameras.push($)}let Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){let Ft=u.getDepthInformation(dt[0]);Ft&&Ft.isValid&&Ft.texture&&x.init(t,Ft,s.renderState)}}for(let dt=0;dt<v.length;dt++){let ot=_[dt],Dt=v[dt];ot!==null&&Dt!==void 0&&Dt.update(ot,tt,l||o)}et&&et(X,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}let Vt=new Ru;Vt.setAnimationLoop(Et),this.setAnimationLoop=function(X){et=X},this.dispose=function(){}}},Ii=new Ie,Lx=new Gt;function Dx(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Au(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),v=M.envMap,_=M.envMapRotation;v&&(m.envMap.value=v,Ii.copy(_),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),m.envMapRotation.value.setFromMatrix4(Lx.makeRotationFromEuler(Ii)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ux(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){let _=v.program;n.uniformBlockBinding(M,_)}function l(M,v){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));let I=v.program;n.updateUBOMapping(M,I);let E=t.render.frame;r[M.id]!==E&&(d(M),r[M.id]=E)}function h(M){let v=u();M.__bindingPointIndex=v;let _=i.createBuffer(),I=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,I,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let v=s[M.id],_=M.uniforms,I=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,A=_.length;E<A;E++){let R=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,y=R.length;S<y;S++){let C=R[S];if(f(C,E,S,I)===!0){let L=C.__offset,U=Array.isArray(C.value)?C.value:[C.value],O=0;for(let H=0;H<U.length;H++){let z=U[H],Q=x(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,L+O,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,O),O+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,_,I){let E=M.value,A=v+"_"+_;if(I[A]===void 0)return typeof E=="number"||typeof E=="boolean"?I[A]=E:I[A]=E.clone(),!0;{let R=I[A];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return I[A]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(M){let v=M.uniforms,_=0,I=16;for(let A=0,R=v.length;A<R;A++){let S=Array.isArray(v[A])?v[A]:[v[A]];for(let y=0,C=S.length;y<C;y++){let L=S[y],U=Array.isArray(L.value)?L.value:[L.value];for(let O=0,H=U.length;O<H;O++){let z=U[O],Q=x(z),G=_%I,st=G%Q.boundary,ct=G+st;_+=st,ct!==0&&I-ct<Q.storage&&(_+=I-ct),L.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=_,_+=Q.storage}}}let E=_%I;return E>0&&(_+=I-E),M.__size=_,M.__cache={},this}function x(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){let v=M.target;v.removeEventListener("dispose",m);let _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var uo=class{constructor(t={}){let{canvas:e=Ff(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ze,this.toneMapping=gi,this.toneMappingExposure=1;let _=this,I=!1,E=0,A=0,R=null,S=-1,y=null,C=new _e,L=new _e,U=null,O=new Ot(0),H=0,z=e.width,Q=e.height,G=1,st=null,ct=null,et=new _e(0,0,z,Q),Et=new _e(0,0,z,Q),Vt=!1,X=new qs,tt=!1,dt=!1,ot=new Gt,Dt=new Gt,Ft=new D,Bt=new _e,ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$=!1;function it(){return R===null?G:1}let P=n;function Lt(w,B){return e.getContext(w,B)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${cl}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),P===null){let B="webgl2";if(P=Lt(B,w),P===null)throw Lt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let nt,bt,ut,zt,vt,T,b,k,Z,j,J,Tt,pt,Mt,te,rt,St,kt,Wt,wt,ie,Kt,pe,N;function gt(){nt=new $0(P),nt.init(),Kt=new Rx(P,nt),bt=new W0(P,nt,t,Kt),ut=new Ex(P,nt),bt.reverseDepthBuffer&&d&&ut.buffers.depth.setReversed(!0),zt=new j0(P),vt=new dx,T=new Ax(P,nt,ut,vt,bt,Kt,zt),b=new q0(_),k=new J0(_),Z=new op(P),pe=new V0(P,Z),j=new K0(P,Z,zt,pe),J=new eg(P,j,Z,zt),Wt=new tg(P,bt,T),rt=new X0(vt),Tt=new ux(_,b,k,nt,bt,pe,rt),pt=new Dx(_,vt),Mt=new px,te=new vx(nt),kt=new H0(_,b,k,ut,J,f,c),St=new Sx(_,J,bt),N=new Ux(P,zt,bt,ut),wt=new G0(P,nt,zt),ie=new Q0(P,nt,zt),zt.programs=Tt.programs,_.capabilities=bt,_.extensions=nt,_.properties=vt,_.renderLists=Mt,_.shadowMap=St,_.state=ut,_.info=zt}gt();let q=new Bc(_,P);this.xr=q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let w=nt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=nt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(z,Q,!1))},this.getSize=function(w){return w.set(z,Q)},this.setSize=function(w,B,V=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=w,Q=B,e.width=Math.floor(w*G),e.height=Math.floor(B*G),V===!0&&(e.style.width=w+"px",e.style.height=B+"px"),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(z*G,Q*G).floor()},this.setDrawingBufferSize=function(w,B,V){z=w,Q=B,G=V,e.width=Math.floor(w*V),e.height=Math.floor(B*V),this.setViewport(0,0,w,B)},this.getCurrentViewport=function(w){return w.copy(C)},this.getViewport=function(w){return w.copy(et)},this.setViewport=function(w,B,V,W){w.isVector4?et.set(w.x,w.y,w.z,w.w):et.set(w,B,V,W),ut.viewport(C.copy(et).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(Et)},this.setScissor=function(w,B,V,W){w.isVector4?Et.set(w.x,w.y,w.z,w.w):Et.set(w,B,V,W),ut.scissor(L.copy(Et).multiplyScalar(G).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(w){ut.setScissorTest(Vt=w)},this.setOpaqueSort=function(w){st=w},this.setTransparentSort=function(w){ct=w},this.getClearColor=function(w){return w.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(w=!0,B=!0,V=!0){let W=0;if(w){let F=!1;if(R!==null){let at=R.texture.format;F=at===gl||at===ml||at===pl}if(F){let at=R.texture.type,_t=at===Qn||at===Oi||at===Ws||at===ms||at===ul||at===dl,Rt=kt.getClearColor(),Ct=kt.getClearAlpha(),Xt=Rt.r,Jt=Rt.g,It=Rt.b;_t?(g[0]=Xt,g[1]=Jt,g[2]=It,g[3]=Ct,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=Xt,x[1]=Jt,x[2]=It,x[3]=Ct,P.clearBufferiv(P.COLOR,0,x))}else W|=P.COLOR_BUFFER_BIT}B&&(W|=P.DEPTH_BUFFER_BIT),V&&(W|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Mt.dispose(),te.dispose(),vt.dispose(),b.dispose(),k.dispose(),J.dispose(),pe.dispose(),N.dispose(),Tt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Vl),q.removeEventListener("sessionend",Gl),wi.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let w=zt.autoReset,B=St.enabled,V=St.autoUpdate,W=St.needsUpdate,F=St.type;gt(),zt.autoReset=w,St.enabled=B,St.autoUpdate=V,St.needsUpdate=W,St.type=F}function xt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Zt(w){let B=w.target;B.removeEventListener("dispose",Zt),we(B)}function we(w){Xe(w),vt.remove(w)}function Xe(w){let B=vt.get(w).programs;B!==void 0&&(B.forEach(function(V){Tt.releaseProgram(V)}),w.isShaderMaterial&&Tt.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,V,W,F,at){B===null&&(B=ee);let _t=F.isMesh&&F.matrixWorld.determinant()<0,Rt=Pd(w,B,V,W,F);ut.setMaterial(W,_t);let Ct=V.index,Xt=1;if(W.wireframe===!0){if(Ct=j.getWireframeAttribute(V),Ct===void 0)return;Xt=2}let Jt=V.drawRange,It=V.attributes.position,oe=Jt.start*Xt,me=(Jt.start+Jt.count)*Xt;at!==null&&(oe=Math.max(oe,at.start*Xt),me=Math.min(me,(at.start+at.count)*Xt)),Ct!==null?(oe=Math.max(oe,0),me=Math.min(me,Ct.count)):It!=null&&(oe=Math.max(oe,0),me=Math.min(me,It.count));let ge=me-oe;if(ge<0||ge===1/0)return;pe.setup(F,W,Rt,V,Ct);let sn,ce=wt;if(Ct!==null&&(sn=Z.get(Ct),ce=ie,ce.setIndex(sn)),F.isMesh)W.wireframe===!0?(ut.setLineWidth(W.wireframeLinewidth*it()),ce.setMode(P.LINES)):ce.setMode(P.TRIANGLES);else if(F.isLine){let Ut=W.linewidth;Ut===void 0&&(Ut=1),ut.setLineWidth(Ut*it()),F.isLineSegments?ce.setMode(P.LINES):F.isLineLoop?ce.setMode(P.LINE_LOOP):ce.setMode(P.LINE_STRIP)}else F.isPoints?ce.setMode(P.POINTS):F.isSprite&&ce.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ce.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ce.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ut=F._multiDrawStarts,Hn=F._multiDrawCounts,le=F._multiDrawCount,Sn=Ct?Z.get(Ct).bytesPerElement:1,Gi=vt.get(W).currentProgram.getUniforms();for(let on=0;on<le;on++)Gi.setValue(P,"_gl_DrawID",on),ce.render(Ut[on]/Sn,Hn[on])}else if(F.isInstancedMesh)ce.renderInstances(oe,ge,F.count);else if(V.isInstancedBufferGeometry){let Ut=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Hn=Math.min(V.instanceCount,Ut);ce.renderInstances(oe,ge,Hn)}else ce.render(oe,ge)};function he(w,B,V){w.transparent===!0&&w.side===An&&w.forceSinglePass===!1?(w.side=Ke,w.needsUpdate=!0,gr(w,B,V),w.side=xi,w.needsUpdate=!0,gr(w,B,V),w.side=An):gr(w,B,V)}this.compile=function(w,B,V=null){V===null&&(V=w),p=te.get(V),p.init(B),v.push(p),V.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==V&&w.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let W=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let at=F.material;if(at)if(Array.isArray(at))for(let _t=0;_t<at.length;_t++){let Rt=at[_t];he(Rt,V,F),W.add(Rt)}else he(at,V,F),W.add(at)}),v.pop(),p=null,W},this.compileAsync=function(w,B,V=null){let W=this.compile(w,B,V);return new Promise(F=>{function at(){if(W.forEach(function(_t){vt.get(_t).currentProgram.isReady()&&W.delete(_t)}),W.size===0){F(w);return}setTimeout(at,10)}nt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let bn=null;function kn(w){bn&&bn(w)}function Vl(){wi.stop()}function Gl(){wi.start()}let wi=new Ru;wi.setAnimationLoop(kn),typeof self!="undefined"&&wi.setContext(self),this.setAnimationLoop=function(w){bn=w,q.setAnimationLoop(w),w===null?wi.stop():wi.start()},q.addEventListener("sessionstart",Vl),q.addEventListener("sessionend",Gl),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(B),B=q.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,B,R),p=te.get(w,v.length),p.init(B),v.push(p),Dt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),X.setFromProjectionMatrix(Dt),dt=this.localClippingEnabled,tt=rt.init(this.clippingPlanes,dt),m=Mt.get(w,M.length),m.init(),M.push(m),q.enabled===!0&&q.isPresenting===!0){let at=_.xr.getDepthSensingMesh();at!==null&&na(at,B,-1/0,_.sortObjects)}na(w,B,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(st,ct),$=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,$&&kt.addToRenderList(m,w),this.info.render.frame++,tt===!0&&rt.beginShadows();let V=p.state.shadowsArray;St.render(V,w,B),tt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,F=m.transmissive;if(p.setupLights(),B.isArrayCamera){let at=B.cameras;if(F.length>0)for(let _t=0,Rt=at.length;_t<Rt;_t++){let Ct=at[_t];Xl(W,F,w,Ct)}$&&kt.render(w);for(let _t=0,Rt=at.length;_t<Rt;_t++){let Ct=at[_t];Wl(m,w,Ct,Ct.viewport)}}else F.length>0&&Xl(W,F,w,B),$&&kt.render(w),Wl(m,w,B);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(_,w,B),pe.resetDefaultState(),S=-1,y=null,v.pop(),v.length>0?(p=v[v.length-1],tt===!0&&rt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function na(w,B,V,W){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){W&&Bt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Dt);let _t=J.update(w),Rt=w.material;Rt.visible&&m.push(w,_t,Rt,V,Bt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){let _t=J.update(w),Rt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Bt.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Bt.copy(_t.boundingSphere.center)),Bt.applyMatrix4(w.matrixWorld).applyMatrix4(Dt)),Array.isArray(Rt)){let Ct=_t.groups;for(let Xt=0,Jt=Ct.length;Xt<Jt;Xt++){let It=Ct[Xt],oe=Rt[It.materialIndex];oe&&oe.visible&&m.push(w,_t,oe,V,Bt.z,It)}}else Rt.visible&&m.push(w,_t,Rt,V,Bt.z,null)}}let at=w.children;for(let _t=0,Rt=at.length;_t<Rt;_t++)na(at[_t],B,V,W)}function Wl(w,B,V,W){let F=w.opaque,at=w.transmissive,_t=w.transparent;p.setupLightsView(V),tt===!0&&rt.setGlobalState(_.clippingPlanes,V),W&&ut.viewport(C.copy(W)),F.length>0&&mr(F,B,V),at.length>0&&mr(at,B,V),_t.length>0&&mr(_t,B,V),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Xl(w,B,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new jn(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?rr:Qn,minFilter:Jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));let at=p.state.transmissionRenderTarget[W.id],_t=W.viewport||C;at.setSize(_t.z,_t.w);let Rt=_.getRenderTarget();_.setRenderTarget(at),_.getClearColor(O),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),$&&kt.render(V);let Ct=_.toneMapping;_.toneMapping=gi;let Xt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),tt===!0&&rt.setGlobalState(_.clippingPlanes,W),mr(w,V,W),T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let It=0,oe=B.length;It<oe;It++){let me=B[It],ge=me.object,sn=me.geometry,ce=me.material,Ut=me.group;if(ce.side===An&&ge.layers.test(W.layers)){let Hn=ce.side;ce.side=Ke,ce.needsUpdate=!0,ql(ge,V,W,sn,ce,Ut),ce.side=Hn,ce.needsUpdate=!0,Jt=!0}}Jt===!0&&(T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at))}_.setRenderTarget(Rt),_.setClearColor(O,H),Xt!==void 0&&(W.viewport=Xt),_.toneMapping=Ct}function mr(w,B,V){let W=B.isScene===!0?B.overrideMaterial:null;for(let F=0,at=w.length;F<at;F++){let _t=w[F],Rt=_t.object,Ct=_t.geometry,Xt=W===null?_t.material:W,Jt=_t.group;Rt.layers.test(V.layers)&&ql(Rt,B,V,Ct,Xt,Jt)}}function ql(w,B,V,W,F,at){w.onBeforeRender(_,B,V,W,F,at),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(_,B,V,W,w,at),F.transparent===!0&&F.side===An&&F.forceSinglePass===!1?(F.side=Ke,F.needsUpdate=!0,_.renderBufferDirect(V,B,W,F,w,at),F.side=xi,F.needsUpdate=!0,_.renderBufferDirect(V,B,W,F,w,at),F.side=An):_.renderBufferDirect(V,B,W,F,w,at),w.onAfterRender(_,B,V,W,F,at)}function gr(w,B,V){B.isScene!==!0&&(B=ee);let W=vt.get(w),F=p.state.lights,at=p.state.shadowsArray,_t=F.state.version,Rt=Tt.getParameters(w,F.state,at,B,V),Ct=Tt.getProgramCacheKey(Rt),Xt=W.programs;W.environment=w.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(w.isMeshStandardMaterial?k:b).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Xt===void 0&&(w.addEventListener("dispose",Zt),Xt=new Map,W.programs=Xt);let Jt=Xt.get(Ct);if(Jt!==void 0){if(W.currentProgram===Jt&&W.lightsStateVersion===_t)return Zl(w,Rt),Jt}else Rt.uniforms=Tt.getUniforms(w),w.onBeforeCompile(Rt,_),Jt=Tt.acquireProgram(Rt,Ct),Xt.set(Ct,Jt),W.uniforms=Rt.uniforms;let It=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(It.clippingPlanes=rt.uniform),Zl(w,Rt),W.needsLights=Dd(w),W.lightsStateVersion=_t,W.needsLights&&(It.ambientLightColor.value=F.state.ambient,It.lightProbe.value=F.state.probe,It.directionalLights.value=F.state.directional,It.directionalLightShadows.value=F.state.directionalShadow,It.spotLights.value=F.state.spot,It.spotLightShadows.value=F.state.spotShadow,It.rectAreaLights.value=F.state.rectArea,It.ltc_1.value=F.state.rectAreaLTC1,It.ltc_2.value=F.state.rectAreaLTC2,It.pointLights.value=F.state.point,It.pointLightShadows.value=F.state.pointShadow,It.hemisphereLights.value=F.state.hemi,It.directionalShadowMap.value=F.state.directionalShadowMap,It.directionalShadowMatrix.value=F.state.directionalShadowMatrix,It.spotShadowMap.value=F.state.spotShadowMap,It.spotLightMatrix.value=F.state.spotLightMatrix,It.spotLightMap.value=F.state.spotLightMap,It.pointShadowMap.value=F.state.pointShadowMap,It.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Jt,W.uniformsList=null,Jt}function Yl(w){if(w.uniformsList===null){let B=w.currentProgram.getUniforms();w.uniformsList=us.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function Zl(w,B){let V=vt.get(w);V.outputColorSpace=B.outputColorSpace,V.batching=B.batching,V.batchingColor=B.batchingColor,V.instancing=B.instancing,V.instancingColor=B.instancingColor,V.instancingMorph=B.instancingMorph,V.skinning=B.skinning,V.morphTargets=B.morphTargets,V.morphNormals=B.morphNormals,V.morphColors=B.morphColors,V.morphTargetsCount=B.morphTargetsCount,V.numClippingPlanes=B.numClippingPlanes,V.numIntersection=B.numClipIntersection,V.vertexAlphas=B.vertexAlphas,V.vertexTangents=B.vertexTangents,V.toneMapping=B.toneMapping}function Pd(w,B,V,W,F){B.isScene!==!0&&(B=ee),T.resetTextureUnits();let at=B.fog,_t=W.isMeshStandardMaterial?B.environment:null,Rt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:vs,Ct=(W.isMeshStandardMaterial?k:b).get(W.envMap||_t),Xt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Jt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),It=!!V.morphAttributes.position,oe=!!V.morphAttributes.normal,me=!!V.morphAttributes.color,ge=gi;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ge=_.toneMapping);let sn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ce=sn!==void 0?sn.length:0,Ut=vt.get(W),Hn=p.state.lights;if(tt===!0&&(dt===!0||w!==y)){let gn=w===y&&W.id===S;rt.setState(W,w,gn)}let le=!1;W.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Hn.state.version||Ut.outputColorSpace!==Rt||F.isBatchedMesh&&Ut.batching===!1||!F.isBatchedMesh&&Ut.batching===!0||F.isBatchedMesh&&Ut.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ut.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ut.instancing===!1||!F.isInstancedMesh&&Ut.instancing===!0||F.isSkinnedMesh&&Ut.skinning===!1||!F.isSkinnedMesh&&Ut.skinning===!0||F.isInstancedMesh&&Ut.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ut.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ut.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ut.instancingMorph===!1&&F.morphTexture!==null||Ut.envMap!==Ct||W.fog===!0&&Ut.fog!==at||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==rt.numPlanes||Ut.numIntersection!==rt.numIntersection)||Ut.vertexAlphas!==Xt||Ut.vertexTangents!==Jt||Ut.morphTargets!==It||Ut.morphNormals!==oe||Ut.morphColors!==me||Ut.toneMapping!==ge||Ut.morphTargetsCount!==ce)&&(le=!0):(le=!0,Ut.__version=W.version);let Sn=Ut.currentProgram;le===!0&&(Sn=gr(W,B,F));let Gi=!1,on=!1,As=!1,xe=Sn.getUniforms(),Dn=Ut.uniforms;if(ut.useProgram(Sn.program)&&(Gi=!0,on=!0,As=!0),W.id!==S&&(S=W.id,on=!0),Gi||y!==w){ut.buffers.depth.getReversed()?(ot.copy(w.projectionMatrix),kf(ot),Hf(ot),xe.setValue(P,"projectionMatrix",ot)):xe.setValue(P,"projectionMatrix",w.projectionMatrix),xe.setValue(P,"viewMatrix",w.matrixWorldInverse);let oi=xe.map.cameraPosition;oi!==void 0&&oi.setValue(P,Ft.setFromMatrixPosition(w.matrixWorld)),bt.logarithmicDepthBuffer&&xe.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xe.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,on=!0,As=!0)}if(F.isSkinnedMesh){xe.setOptional(P,F,"bindMatrix"),xe.setOptional(P,F,"bindMatrixInverse");let gn=F.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),xe.setValue(P,"boneTexture",gn.boneTexture,T))}F.isBatchedMesh&&(xe.setOptional(P,F,"batchingTexture"),xe.setValue(P,"batchingTexture",F._matricesTexture,T),xe.setOptional(P,F,"batchingIdTexture"),xe.setValue(P,"batchingIdTexture",F._indirectTexture,T),xe.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&xe.setValue(P,"batchingColorTexture",F._colorsTexture,T));let Rs=V.morphAttributes;if((Rs.position!==void 0||Rs.normal!==void 0||Rs.color!==void 0)&&Wt.update(F,V,Sn),(on||Ut.receiveShadow!==F.receiveShadow)&&(Ut.receiveShadow=F.receiveShadow,xe.setValue(P,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Dn.envMap.value=Ct,Dn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Dn.envMapIntensity.value=B.environmentIntensity),on&&(xe.setValue(P,"toneMappingExposure",_.toneMappingExposure),Ut.needsLights&&Ld(Dn,As),at&&W.fog===!0&&pt.refreshFogUniforms(Dn,at),pt.refreshMaterialUniforms(Dn,W,G,Q,p.state.transmissionRenderTarget[w.id]),us.upload(P,Yl(Ut),Dn,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(us.upload(P,Yl(Ut),Dn,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xe.setValue(P,"center",F.center),xe.setValue(P,"modelViewMatrix",F.modelViewMatrix),xe.setValue(P,"normalMatrix",F.normalMatrix),xe.setValue(P,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let gn=W.uniformsGroups;for(let oi=0,ai=gn.length;oi<ai;oi++){let Jl=gn[oi];N.update(Jl,Sn),N.bind(Jl,Sn)}}return Sn}function Ld(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function Dd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,B,V){vt.get(w.texture).__webglTexture=B,vt.get(w.depthTexture).__webglTexture=V;let W=vt.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,B){let V=vt.get(w);V.__webglFramebuffer=B,V.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,V=0){R=w,E=B,A=V;let W=!0,F=null,at=!1,_t=!1;if(w){let Ct=vt.get(w);if(Ct.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(P.FRAMEBUFFER,null),W=!1;else if(Ct.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(Ct.__hasExternalTextures)T.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let It=w.depthTexture;if(Ct.__boundDepthTexture!==It){if(It!==null&&vt.has(It)&&(w.width!==It.image.width||w.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}let Xt=w.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(_t=!0);let Jt=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Jt[B])?F=Jt[B][V]:F=Jt[B],at=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?F=vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Jt)?F=Jt[V]:F=Jt,C.copy(w.viewport),L.copy(w.scissor),U=w.scissorTest}else C.copy(et).multiplyScalar(G).floor(),L.copy(Et).multiplyScalar(G).floor(),U=Vt;if(ut.bindFramebuffer(P.FRAMEBUFFER,F)&&W&&ut.drawBuffers(w,F),ut.viewport(C),ut.scissor(L),ut.setScissorTest(U),at){let Ct=vt.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ct.__webglTexture,V)}else if(_t){let Ct=vt.get(w.texture),Xt=B||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ct.__webglTexture,V||0,Xt)}S=-1},this.readRenderTargetPixels=function(w,B,V,W,F,at,_t){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){ut.bindFramebuffer(P.FRAMEBUFFER,Rt);try{let Ct=w.texture,Xt=Ct.format,Jt=Ct.type;if(!bt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!bt.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-W&&V>=0&&V<=w.height-F&&P.readPixels(B,V,W,F,Kt.convert(Xt),Kt.convert(Jt),at)}finally{let Ct=R!==null?vt.get(R).__webglFramebuffer:null;ut.bindFramebuffer(P.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(w,B,V,W,F,at,_t){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){let Ct=w.texture,Xt=Ct.format,Jt=Ct.type;if(!bt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!bt.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=w.width-W&&V>=0&&V<=w.height-F){ut.bindFramebuffer(P.FRAMEBUFFER,Rt);let It=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),P.readPixels(B,V,W,F,Kt.convert(Xt),Kt.convert(Jt),0);let oe=R!==null?vt.get(R).__webglFramebuffer:null;ut.bindFramebuffer(P.FRAMEBUFFER,oe);let me=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await zf(P,me,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer(It),P.deleteSync(me),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,B=null,V=0){w.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,w=arguments[1]);let W=Math.pow(2,-V),F=Math.floor(w.image.width*W),at=Math.floor(w.image.height*W),_t=B!==null?B.x:0,Rt=B!==null?B.y:0;T.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,_t,Rt,F,at),ut.unbindTexture()},this.copyTextureToTexture=function(w,B,V=null,W=null,F=0){w.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],B=arguments[2],F=arguments[3]||0,V=null);let at,_t,Rt,Ct,Xt,Jt,It,oe,me,ge=w.isCompressedTexture?w.mipmaps[F]:w.image;V!==null?(at=V.max.x-V.min.x,_t=V.max.y-V.min.y,Rt=V.isBox3?V.max.z-V.min.z:1,Ct=V.min.x,Xt=V.min.y,Jt=V.isBox3?V.min.z:0):(at=ge.width,_t=ge.height,Rt=ge.depth||1,Ct=0,Xt=0,Jt=0),W!==null?(It=W.x,oe=W.y,me=W.z):(It=0,oe=0,me=0);let sn=Kt.convert(B.format),ce=Kt.convert(B.type),Ut;B.isData3DTexture?(T.setTexture3D(B,0),Ut=P.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(T.setTexture2DArray(B,0),Ut=P.TEXTURE_2D_ARRAY):(T.setTexture2D(B,0),Ut=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,B.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,B.unpackAlignment);let Hn=P.getParameter(P.UNPACK_ROW_LENGTH),le=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Sn=P.getParameter(P.UNPACK_SKIP_PIXELS),Gi=P.getParameter(P.UNPACK_SKIP_ROWS),on=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ge.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ge.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ct),P.pixelStorei(P.UNPACK_SKIP_ROWS,Xt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Jt);let As=w.isDataArrayTexture||w.isData3DTexture,xe=B.isDataArrayTexture||B.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let Dn=vt.get(w),Rs=vt.get(B),gn=vt.get(Dn.__renderTarget),oi=vt.get(Rs.__renderTarget);ut.bindFramebuffer(P.READ_FRAMEBUFFER,gn.__webglFramebuffer),ut.bindFramebuffer(P.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let ai=0;ai<Rt;ai++)As&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,F,Jt+ai),w.isDepthTexture?(xe&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(B).__webglTexture,F,me+ai),P.blitFramebuffer(Ct,Xt,at,_t,It,oe,at,_t,P.DEPTH_BUFFER_BIT,P.NEAREST)):xe?P.copyTexSubImage3D(Ut,F,It,oe,me+ai,Ct,Xt,at,_t):P.copyTexSubImage2D(Ut,F,It,oe,me+ai,Ct,Xt,at,_t);ut.bindFramebuffer(P.READ_FRAMEBUFFER,null),ut.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else xe?w.isDataTexture||w.isData3DTexture?P.texSubImage3D(Ut,F,It,oe,me,at,_t,Rt,sn,ce,ge.data):B.isCompressedArrayTexture?P.compressedTexSubImage3D(Ut,F,It,oe,me,at,_t,Rt,sn,ge.data):P.texSubImage3D(Ut,F,It,oe,me,at,_t,Rt,sn,ce,ge):w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,It,oe,at,_t,sn,ce,ge.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,It,oe,ge.width,ge.height,sn,ge.data):P.texSubImage2D(P.TEXTURE_2D,F,It,oe,at,_t,sn,ce,ge);P.pixelStorei(P.UNPACK_ROW_LENGTH,Hn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,le),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Sn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Gi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,on),F===0&&B.generateMipmaps&&P.generateMipmap(Ut),ut.unbindTexture()},this.copyTextureToTexture3D=function(w,B,V=null,W=null,F=0){return w.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,w=arguments[2],B=arguments[3],F=arguments[4]||0),Ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,B,V,W,F)},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),ut.unbindTexture()},this.resetState=function(){E=0,A=0,R=null,ut.reset(),pe.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}},fo=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var po=class extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ie,this.environmentIntensity=1,this.environmentRotation=new Ie,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Kh=new D,Qh=new _e,jh=new _e,Nx=new D,tu=new Gt,Fr=new D,Pa=new Bn,eu=new Gt,La=new Xs,mo=class extends fe{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jl,this.bindMatrix=new Gt,this.bindMatrixInverse=new Gt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new On),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Fr),this.boundingBox.expandByPoint(Fr)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Fr),this.boundingSphere.expandByPoint(Fr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pa.copy(this.boundingSphere),Pa.applyMatrix4(s),t.ray.intersectsSphere(Pa)!==!1&&(eu.copy(s).invert(),La.copy(t.ray).applyMatrix4(eu),!(this.boundingBox!==null&&La.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,La)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new _e,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===jl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;Qh.fromBufferAttribute(s.attributes.skinIndex,t),jh.fromBufferAttribute(s.attributes.skinWeight,t),Kh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=jh.getComponent(r);if(o!==0){let a=Qh.getComponent(r);tu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Nx.copy(Kh).applyMatrix4(tu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},Ys=class extends Pe{constructor(){super(),this.isBone=!0,this.type="Bone"}},go=class extends rn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ln,h=ln,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},nu=new Gt,Ox=new Gt,xo=class i{constructor(t=[],e=[]){this.uuid=Mi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Gt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Gt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:Ox;nu.multiplyMatrices(a,e[r]),nu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new go(e,t,t,_n,Rn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ys),this.bones.push(o),this.boneInverses.push(new Gt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},Zs=class extends Ae{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ss=new Gt,iu=new Gt,zr=[],su=new On,Bx=new Gt,Ds=new fe,Us=new Bn,Js=class extends fe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Zs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bx)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new On),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ss),su.copy(t.boundingBox).applyMatrix4(ss),this.boundingBox.union(su)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ss),Us.copy(t.boundingSphere).applyMatrix4(ss),this.boundingSphere.union(Us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ds.geometry=this.geometry,Ds.material=this.material,Ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Us.copy(this.boundingSphere),Us.applyMatrix4(n),t.ray.intersectsSphere(Us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ss),iu.multiplyMatrices(n,ss),Ds.matrixWorld=iu,Ds.raycast(t,zr);for(let o=0,a=zr.length;o<a;o++){let c=zr[o];c.instanceId=r,c.object=this,e.push(c)}zr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Zs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new go(new Float32Array(s*this.count),s,this.count,fl,Rn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var $s=class extends ti{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ru=new Gt,Fc=new Xs,kr=new Bn,Hr=new D,_o=class extends Pe{constructor(t=new Re,e=new $s){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;ru.copy(s).invert(),Fc.copy(t.ray).applyMatrix4(ru);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=l.getX(g);Hr.fromBufferAttribute(u,m),ou(Hr,m,c,s,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)Hr.fromBufferAttribute(u,g),ou(Hr,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ou(i,t,e,n,s,r,o){let a=Fc.distanceSqToPoint(i);if(a<e){let c=new D;Fc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var yo=class extends rn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ht:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],o=[],a=new D,c=new Gt;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Oe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Oe(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ks=class extends vn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ht){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},zc=class extends Ks{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function vl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Vr=new D,Da=new vl,Ua=new vl,Na=new vl,kc=class extends vn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Vr.subVectors(s[0],s[1]).add(s[0]),l=Vr);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Vr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Da.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,x,m),Ua.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,x,m),Na.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Da.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Ua.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Na.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Da.calc(c),Ua.calc(c),Na.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function au(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Fx(i,t){let e=1-i;return e*e*t}function zx(i,t){return 2*(1-i)*i*t}function kx(i,t){return i*i*t}function ks(i,t,e,n){return Fx(i,t)+zx(i,e)+kx(i,n)}function Hx(i,t){let e=1-i;return e*e*e*t}function Vx(i,t){let e=1-i;return 3*e*e*i*t}function Gx(i,t){return 3*(1-i)*i*i*t}function Wx(i,t){return i*i*i*t}function Hs(i,t,e,n,s){return Hx(i,t)+Vx(i,e)+Gx(i,n)+Wx(i,s)}var vo=class extends vn{constructor(t=new ht,e=new ht,n=new ht,s=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ht){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,s.x,r.x,o.x,a.x),Hs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Hc=class extends vn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,s.x,r.x,o.x,a.x),Hs(t,s.y,r.y,o.y,a.y),Hs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Mo=class extends vn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vc=class extends vn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bo=class extends vn{constructor(t=new ht,e=new ht,n=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ht){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gc=class extends vn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y),ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},So=class extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(au(a,c.x,l.x,h.x,u.x),au(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ht().fromArray(s))}return this}},Wc=Object.freeze({__proto__:null,ArcCurve:zc,CatmullRomCurve3:kc,CubicBezierCurve:vo,CubicBezierCurve3:Hc,EllipseCurve:Ks,LineCurve:Mo,LineCurve3:Vc,QuadraticBezierCurve:bo,QuadraticBezierCurve3:Gc,SplineCurve:So}),Xc=class extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Wc[s.type]().fromJSON(s))}return this}},Qs=class extends Xc{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Mo(this.currentPoint.clone(),new ht(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new bo(this.currentPoint.clone(),new ht(t,e),new ht(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new vo(this.currentPoint.clone(),new ht(t,e),new ht(n,s),new ht(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new So(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Ks(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},qc=class i extends Re{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Oe(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new D,d=new ht,f=new D,g=new D,x=new D,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let M=0;M<=e;M++){let v=n+M*h*s,_=Math.sin(v),I=Math.cos(v);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*_,u.y=t[E].y,u.z=t[E].x*I,o.push(u.x,u.y,u.z),d.x=M/e,d.y=E/(t.length-1),a.push(d.x,d.y);let A=c[3*E+0]*_,R=c[3*E+1],S=c[3*E+0]*I;l.push(A,R,S)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){let _=v+M*t.length,I=_,E=_+t.length,A=_+t.length+1,R=_+1;r.push(I,E,R),r.push(A,R,E)}this.setIndex(r),this.setAttribute("position",new re(o,3)),this.setAttribute("uv",new re(a,2)),this.setAttribute("normal",new re(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},wo=class i extends qc{constructor(t=1,e=1,n=4,s=8){let r=new Qs;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}};var Ve=class i extends Re{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(d,3)),this.setAttribute("uv",new re(f,2));function M(){let _=new D,I=new D,E=0,A=(e-t)/n;for(let R=0;R<=r;R++){let S=[],y=R/r,C=y*(e-t)+t;for(let L=0;L<=s;L++){let U=L/s,O=U*c+a,H=Math.sin(O),z=Math.cos(O);I.x=C*H,I.y=-y*n+m,I.z=C*z,u.push(I.x,I.y,I.z),_.set(H,A,z).normalize(),d.push(_.x,_.y,_.z),f.push(U,1-y),S.push(g++)}x.push(S)}for(let R=0;R<s;R++)for(let S=0;S<r;S++){let y=x[S][R],C=x[S+1][R],L=x[S+1][R+1],U=x[S][R+1];(t>0||S!==0)&&(h.push(y,C,U),E+=3),(e>0||S!==r-1)&&(h.push(C,L,U),E+=3)}l.addGroup(p,E,0),p+=E}function v(_){let I=g,E=new ht,A=new D,R=0,S=_===!0?t:e,y=_===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;let C=g;for(let L=0;L<=s;L++){let O=L/s*c+a,H=Math.cos(O),z=Math.sin(O);A.x=S*z,A.y=m*y,A.z=S*H,u.push(A.x,A.y,A.z),d.push(0,y,0),E.x=H*.5+.5,E.y=z*.5*y+.5,f.push(E.x,E.y),g++}for(let L=0;L<s;L++){let U=I+L,O=C+L;_===!0?h.push(O,O+1,U):h.push(O+1,O,U),R+=3}l.addGroup(p,R,_===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Eo=class i extends Ve{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Yc=class i extends Re{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new re(r,3)),this.setAttribute("normal",new re(r.slice(),3)),this.setAttribute("uv",new re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let v=new D,_=new D,I=new D;for(let E=0;E<e.length;E+=3)f(e[E+0],v),f(e[E+1],_),f(e[E+2],I),c(v,_,I,M)}function c(M,v,_,I){let E=I+1,A=[];for(let R=0;R<=E;R++){A[R]=[];let S=M.clone().lerp(_,R/E),y=v.clone().lerp(_,R/E),C=E-R;for(let L=0;L<=C;L++)L===0&&R===E?A[R][L]=S:A[R][L]=S.clone().lerp(y,L/C)}for(let R=0;R<E;R++)for(let S=0;S<2*(E-R)-1;S++){let y=Math.floor(S/2);S%2===0?(d(A[R][y+1]),d(A[R+1][y]),d(A[R][y])):(d(A[R][y+1]),d(A[R+1][y+1]),d(A[R+1][y]))}}function l(M){let v=new D;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(M),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function h(){let M=new D;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];let _=m(M)/2/Math.PI+.5,I=p(M)/Math.PI+.5;o.push(_,1-I)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){let v=o[M+0],_=o[M+2],I=o[M+4],E=Math.max(v,_,I),A=Math.min(v,_,I);E>.9&&A<.1&&(v<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),I<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,v){let _=M*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function g(){let M=new D,v=new D,_=new D,I=new D,E=new ht,A=new ht,R=new ht;for(let S=0,y=0;S<r.length;S+=9,y+=6){M.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),E.set(o[y+0],o[y+1]),A.set(o[y+2],o[y+3]),R.set(o[y+4],o[y+5]),I.copy(M).add(v).add(_).divideScalar(3);let C=m(I);x(E,y+0,M,C),x(A,y+2,v,C),x(R,y+4,_,C)}}function x(M,v,_,I){I<0&&M.x===1&&(o[v]=M.x-1),_.x===0&&_.z===0&&(o[v]=I/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var js=class extends Qs{constructor(t){super(t),this.uuid=Mi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Qs().fromJSON(s))}return this}},Xx={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Du(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=$x(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return tr(r,o,e,a,c,f,0),o}};function Du(i,t,e,n,s){let r,o;if(s===a_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=cu(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=cu(r,i[r],i[r+1],o);return o&&Fo(o,o.next)&&(nr(o),o=o.next),o}function Bi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Fo(e,e.next)||Me(e.prev,e,e.next)===0)){if(nr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function tr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&e_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Yx(i,n,s,r):qx(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),nr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Zx(Bi(i),t,e),tr(i,t,e,n,s,r,2)):o===2&&Jx(i,t,e,n,s,r):tr(Bi(i),t,e,n,s,r,1);break}}}function qx(i){let t=i.prev,e=i,n=i.next;if(Me(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&as(s,a,r,c,o,l,g.x,g.y)&&Me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Yx(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Me(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,x=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=Zc(f,g,t,e,n),M=Zc(x,m,t,e,n),v=i.prevZ,_=i.nextZ;for(;v&&v.z>=p&&_&&_.z<=M;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&as(a,h,c,u,l,d,v.x,v.y)&&Me(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&as(a,h,c,u,l,d,_.x,_.y)&&Me(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&as(a,h,c,u,l,d,v.x,v.y)&&Me(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=M;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&as(a,h,c,u,l,d,_.x,_.y)&&Me(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Zx(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Fo(s,r)&&Uu(s,n,n.next,r)&&er(s,r)&&er(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),nr(n),nr(n.next),n=i=r),n=n.next}while(n!==i);return Bi(n)}function Jx(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&s_(o,a)){let c=Nu(o,a);o=Bi(o,o.next),c=Bi(c,c.next),tr(o,t,e,n,s,r,0),tr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function $x(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Du(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(i_(l));for(s.sort(Kx),r=0;r<s.length;r++)e=Qx(s[r],e);return e}function Kx(i,t){return i.x-t.x}function Qx(i,t){let e=jx(i,t);if(!e)return t;let n=Nu(e,i);return Bi(n,n.next),Bi(e,e.next)}function jx(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&as(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),er(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&t_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function t_(i,t){return Me(i.prev,i,t.prev)<0&&Me(t.next,i,i.next)<0}function e_(i,t,e,n){let s=i;do s.z===0&&(s.z=Zc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,n_(s)}function n_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Zc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function i_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function as(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function s_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!r_(i,t)&&(er(i,t)&&er(t,i)&&o_(i,t)&&(Me(i.prev,i,t.prev)||Me(i,t.prev,t))||Fo(i,t)&&Me(i.prev,i,i.next)>0&&Me(t.prev,t,t.next)>0)}function Me(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Fo(i,t){return i.x===t.x&&i.y===t.y}function Uu(i,t,e,n){let s=Wr(Me(i,t,e)),r=Wr(Me(i,t,n)),o=Wr(Me(e,n,i)),a=Wr(Me(e,n,t));return!!(s!==r&&o!==a||s===0&&Gr(i,e,t)||r===0&&Gr(i,n,t)||o===0&&Gr(e,i,n)||a===0&&Gr(e,t,n))}function Gr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Wr(i){return i>0?1:i<0?-1:0}function r_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Uu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function er(i,t){return Me(i.prev,i,i.next)<0?Me(i,t,i.next)>=0&&Me(i,i.prev,t)>=0:Me(i,t,i.prev)<0||Me(i,i.next,t)<0}function o_(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Nu(i,t){let e=new Jc(i.i,i.x,i.y),n=new Jc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function cu(i,t,e,n){let s=new Jc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function nr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Jc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function a_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Vs=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];lu(t),hu(n,t);let o=t.length;e.forEach(lu);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,hu(n,e[c]);let a=Xx.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function lu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function hu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var To=class i extends Re{constructor(t=new js([new ht(.5,.5),new ht(-.5,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new re(s,3)),this.setAttribute("uv",new re(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:c_,v,_=!1,I,E,A,R;p&&(v=p.getSpacedPoints(h),_=!0,d=!1,I=p.computeFrenetFrames(h,!1),E=new D,A=new D,R=new D),d||(m=0,f=0,g=0,x=0);let S=a.extractPoints(l),y=S.shape,C=S.holes;if(!Vs.isClockWise(y)){y=y.reverse();for(let $=0,it=C.length;$<it;$++){let P=C[$];Vs.isClockWise(P)&&(C[$]=P.reverse())}}let U=Vs.triangulateShape(y,C),O=y;for(let $=0,it=C.length;$<it;$++){let P=C[$];y=y.concat(P)}function H($,it,P){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(it,P)}let z=y.length,Q=U.length;function G($,it,P){let Lt,nt,bt,ut=$.x-it.x,zt=$.y-it.y,vt=P.x-$.x,T=P.y-$.y,b=ut*ut+zt*zt,k=ut*T-zt*vt;if(Math.abs(k)>Number.EPSILON){let Z=Math.sqrt(b),j=Math.sqrt(vt*vt+T*T),J=it.x-zt/Z,Tt=it.y+ut/Z,pt=P.x-T/j,Mt=P.y+vt/j,te=((pt-J)*T-(Mt-Tt)*vt)/(ut*T-zt*vt);Lt=J+ut*te-$.x,nt=Tt+zt*te-$.y;let rt=Lt*Lt+nt*nt;if(rt<=2)return new ht(Lt,nt);bt=Math.sqrt(rt/2)}else{let Z=!1;ut>Number.EPSILON?vt>Number.EPSILON&&(Z=!0):ut<-Number.EPSILON?vt<-Number.EPSILON&&(Z=!0):Math.sign(zt)===Math.sign(T)&&(Z=!0),Z?(Lt=-zt,nt=ut,bt=Math.sqrt(b)):(Lt=ut,nt=zt,bt=Math.sqrt(b/2))}return new ht(Lt/bt,nt/bt)}let st=[];for(let $=0,it=O.length,P=it-1,Lt=$+1;$<it;$++,P++,Lt++)P===it&&(P=0),Lt===it&&(Lt=0),st[$]=G(O[$],O[P],O[Lt]);let ct=[],et,Et=st.concat();for(let $=0,it=C.length;$<it;$++){let P=C[$];et=[];for(let Lt=0,nt=P.length,bt=nt-1,ut=Lt+1;Lt<nt;Lt++,bt++,ut++)bt===nt&&(bt=0),ut===nt&&(ut=0),et[Lt]=G(P[Lt],P[bt],P[ut]);ct.push(et),Et=Et.concat(et)}for(let $=0;$<m;$++){let it=$/m,P=f*Math.cos(it*Math.PI/2),Lt=g*Math.sin(it*Math.PI/2)+x;for(let nt=0,bt=O.length;nt<bt;nt++){let ut=H(O[nt],st[nt],Lt);ot(ut.x,ut.y,-P)}for(let nt=0,bt=C.length;nt<bt;nt++){let ut=C[nt];et=ct[nt];for(let zt=0,vt=ut.length;zt<vt;zt++){let T=H(ut[zt],et[zt],Lt);ot(T.x,T.y,-P)}}}let Vt=g+x;for(let $=0;$<z;$++){let it=d?H(y[$],Et[$],Vt):y[$];_?(A.copy(I.normals[0]).multiplyScalar(it.x),E.copy(I.binormals[0]).multiplyScalar(it.y),R.copy(v[0]).add(A).add(E),ot(R.x,R.y,R.z)):ot(it.x,it.y,0)}for(let $=1;$<=h;$++)for(let it=0;it<z;it++){let P=d?H(y[it],Et[it],Vt):y[it];_?(A.copy(I.normals[$]).multiplyScalar(P.x),E.copy(I.binormals[$]).multiplyScalar(P.y),R.copy(v[$]).add(A).add(E),ot(R.x,R.y,R.z)):ot(P.x,P.y,u/h*$)}for(let $=m-1;$>=0;$--){let it=$/m,P=f*Math.cos(it*Math.PI/2),Lt=g*Math.sin(it*Math.PI/2)+x;for(let nt=0,bt=O.length;nt<bt;nt++){let ut=H(O[nt],st[nt],Lt);ot(ut.x,ut.y,u+P)}for(let nt=0,bt=C.length;nt<bt;nt++){let ut=C[nt];et=ct[nt];for(let zt=0,vt=ut.length;zt<vt;zt++){let T=H(ut[zt],et[zt],Lt);_?ot(T.x,T.y+v[h-1].y,v[h-1].x+P):ot(T.x,T.y,u+P)}}}X(),tt();function X(){let $=s.length/3;if(d){let it=0,P=z*it;for(let Lt=0;Lt<Q;Lt++){let nt=U[Lt];Dt(nt[2]+P,nt[1]+P,nt[0]+P)}it=h+m*2,P=z*it;for(let Lt=0;Lt<Q;Lt++){let nt=U[Lt];Dt(nt[0]+P,nt[1]+P,nt[2]+P)}}else{for(let it=0;it<Q;it++){let P=U[it];Dt(P[2],P[1],P[0])}for(let it=0;it<Q;it++){let P=U[it];Dt(P[0]+z*h,P[1]+z*h,P[2]+z*h)}}n.addGroup($,s.length/3-$,0)}function tt(){let $=s.length/3,it=0;dt(O,it),it+=O.length;for(let P=0,Lt=C.length;P<Lt;P++){let nt=C[P];dt(nt,it),it+=nt.length}n.addGroup($,s.length/3-$,1)}function dt($,it){let P=$.length;for(;--P>=0;){let Lt=P,nt=P-1;nt<0&&(nt=$.length-1);for(let bt=0,ut=h+m*2;bt<ut;bt++){let zt=z*bt,vt=z*(bt+1),T=it+Lt+zt,b=it+nt+zt,k=it+nt+vt,Z=it+Lt+vt;Ft(T,b,k,Z)}}}function ot($,it,P){c.push($),c.push(it),c.push(P)}function Dt($,it,P){Bt($),Bt(it),Bt(P);let Lt=s.length/3,nt=M.generateTopUV(n,s,Lt-3,Lt-2,Lt-1);ee(nt[0]),ee(nt[1]),ee(nt[2])}function Ft($,it,P,Lt){Bt($),Bt(it),Bt(Lt),Bt(it),Bt(P),Bt(Lt);let nt=s.length/3,bt=M.generateSideWallUV(n,s,nt-6,nt-3,nt-2,nt-1);ee(bt[0]),ee(bt[1]),ee(bt[3]),ee(bt[1]),ee(bt[2]),ee(bt[3])}function Bt($){s.push(c[$*3+0]),s.push(c[$*3+1]),s.push(c[$*3+2])}function ee($){r.push($.x),r.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return l_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Wc[s.type]().fromJSON(s)),new i(n,t.options)}},c_={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ht(r,o),new ht(a,c),new ht(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ht(o,1-c),new ht(l,1-u),new ht(d,1-g),new ht(x,1-p)]:[new ht(a,1-c),new ht(h,1-u),new ht(f,1-g),new ht(m,1-p)]}};function l_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ir=class i extends Yc{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var un=class i extends Re{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new D,d=new D,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let M=[],v=p/n,_=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let I=0;I<=e;I++){let E=I/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+_,1-v),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let v=h[p][M+1],_=h[p][M],I=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&f.push(v,_,E),(p!==n-1||c<Math.PI)&&f.push(_,I,E)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Fi=class i extends Re{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new D,u=new D,d=new D;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(x,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new re(a,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var vi=class extends ti{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ot(16777215),this.specular=new Ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ie,this.combine=Uo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Cn=class extends ti{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ie,this.combine=Uo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Xr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function h_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var ys=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},$c=class extends ys{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:th,endingEnd:th}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case eh:r=t,a=2*e-n;break;case nh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case eh:o=t,c=2*n-e;break;case nh:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+M*o[l+I]+v*o[c+I]+_*o[u+I];return r}},Kc=class extends ys{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Qc=class extends ys{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},In=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Xr(e,this.TimeBufferType),this.values=Xr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Xr(t.times,Array),values:Xr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Qc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Kc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new $c(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Qr:e=this.InterpolantFactoryMethodDiscrete;break;case Mc:e=this.InterpolantFactoryMethodLinear;break;case sa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qr;case this.InterpolantFactoryMethodLinear:return Mc;case this.InterpolantFactoryMethodSmooth:return sa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&h_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===sa,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};In.prototype.TimeBufferType=Float32Array;In.prototype.ValueBufferType=Float32Array;In.prototype.DefaultInterpolation=Mc;var zi=class extends In{constructor(t,e,n){super(t,e,n)}};zi.prototype.ValueTypeName="bool";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=Qr;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var jc=class extends In{};jc.prototype.ValueTypeName="color";var tl=class extends In{};tl.prototype.ValueTypeName="number";var el=class extends ys{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)He.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ao=class extends In{InterpolantFactoryMethodLinear(t){return new el(this.times,this.values,this.getValueSize(),t)}};Ao.prototype.ValueTypeName="quaternion";Ao.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends In{constructor(t,e,n){super(t,e,n)}};ki.prototype.ValueTypeName="string";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=Qr;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var nl=class extends In{};nl.prototype.ValueTypeName="vector";var il=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},u_=new il,sl=class{constructor(t){this.manager=t!==void 0?t:u_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sl.DEFAULT_MATERIAL_NAME="__DEFAULT";var sr=class extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ro=class extends sr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Oa=new Gt,uu=new D,du=new D,Co=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qs,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;uu.setFromMatrixPosition(t.matrixWorld),e.position.copy(uu),du.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(du),e.updateMatrixWorld(),Oa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Oa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},rl=class extends Co{constructor(){super(new Je(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=xs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Io=class extends sr{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new rl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ol=class extends Co{constructor(){super(new co(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Po=class extends sr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new ol}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Lo=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=fu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function fu(){return performance.now()}var Ml="\\[\\]\\.:\\/",d_=new RegExp("["+Ml+"]","g"),bl="[^"+Ml+"]",f_="[^"+Ml.replace("\\.","")+"]",p_=/((?:WC+[\/:])*)/.source.replace("WC",bl),m_=/(WCOD+)?/.source.replace("WCOD",f_),g_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bl),x_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bl),__=new RegExp("^"+p_+m_+g_+x_+"$"),y_=["material","materials","bones","map"],al=class{constructor(t,e,n){let s=n||ye.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ye=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(d_,"")}static parseTrackName(t){let e=__.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);y_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ye.Composite=al;ye.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ye.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ye.prototype.GetterByBindingType=[ye.prototype._getValue_direct,ye.prototype._getValue_array,ye.prototype._getValue_arrayElement,ye.prototype._getValue_toArray];ye.prototype.SetterByBindingTypeAndVersioning=[[ye.prototype._setValue_direct,ye.prototype._setValue_direct_setNeedsUpdate,ye.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_array,ye.prototype._setValue_array_setNeedsUpdate,ye.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_arrayElement,ye.prototype._setValue_arrayElement_setNeedsUpdate,ye.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_fromArray,ye.prototype._setValue_fromArray_setNeedsUpdate,ye.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var K_=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cl);var zo=class{constructor(){this.boxes=[],this.grid=new Map,this.dynamic=new Set,this.groundFn=()=>0,this._stamp=0}key(t,e){return t*73856093^e*19349663}addBox(t,e,n,s,r,o,a="static"){let c={minX:t,minY:e,minZ:n,maxX:s,maxY:r,maxZ:o,tag:a,stamp:0};this.boxes.push(c);for(let l=Math.floor(t/16);l<=Math.floor(s/16);l++)for(let h=Math.floor(n/16);h<=Math.floor(o/16);h++){let u=this.key(l,h);this.grid.has(u)||this.grid.set(u,[]),this.grid.get(u).push(c)}return c}addCentered(t,e,n,s,r,o){return this.addBox(t-s/2,e,n-o/2,t+s/2,e+r,n+o/2)}query(t,e,n,s){let r=[],o=++this._stamp;for(let a=Math.floor(t/16);a<=Math.floor(n/16);a++)for(let c=Math.floor(e/16);c<=Math.floor(s/16);c++){let l=this.grid.get(this.key(a,c));if(l)for(let h of l)h.stamp!==o&&(h.stamp=o,r.push(h))}return r}groundAt(t,e,n,s,r=.4){let o=this.groundFn(t,e);for(let a of this.query(t-n,e-n,t+n,e+n))a.maxY<=s+r&&a.maxY>o&&t+n>a.minX&&t-n<a.maxX&&e+n>a.minZ&&e-n<a.maxZ&&(o=a.maxY);return o}resolveCircle(t,e,n,s,r,o=.4,a=null,c=!1){let l=!1,h=0,u=0;for(let f=0;f<3;f++){let g=!1;for(let x of this.query(t-n,e-n,t+n,e+n)){if(x.maxY<=s+o||x.minY>=r)continue;let m=Math.max(x.minX,Math.min(t,x.maxX)),p=Math.max(x.minZ,Math.min(e,x.maxZ)),M=t-m,v=e-p,_=M*M+v*v;if(!(_>=n*n)){if(_>1e-8){let I=Math.sqrt(_);M/=I,v/=I,t=m+M*n,e=p+v*n}else{let I=t-x.minX,E=x.maxX-t,A=e-x.minZ,R=x.maxZ-e,S=Math.min(I,E,A,R);S===I?(t=x.minX-n,M=-1,v=0):S===E?(t=x.maxX+n,M=1,v=0):S===A?(e=x.minZ-n,M=0,v=-1):(e=x.maxZ+n,M=0,v=1)}h+=M,u+=v,l=!0,g=!0}}for(let x of this.dynamic){if(x===a||!x.collidable)continue;let m=x.pushCircleOut(t,e,n,s,r,c);m&&(t=m.x,e=m.z,h+=m.nx,u+=m.nz,l=!0,g=!0)}if(!g)break}let d=Math.hypot(h,u)||1;return{x:t,z:e,hit:l,nx:h/d,nz:u/d}}raycast(t,e,n,s,r,o,a){let c=t+s*a,l=n+o*a,h=a,u=this.query(Math.min(t,c),Math.min(n,l),Math.max(t,c),Math.max(n,l));for(let d of u){let f=0,g=h,x=[t,e,n],m=[s,r,o],p=[d.minX,d.minY,d.minZ],M=[d.maxX,d.maxY,d.maxZ],v=!0;for(let _=0;_<3;_++)if(Math.abs(m[_])<1e-9){if(x[_]<p[_]||x[_]>M[_]){v=!1;break}}else{let I=(p[_]-x[_])/m[_],E=(M[_]-x[_])/m[_];if(I>E){let A=I;I=E,E=A}if(f=Math.max(f,I),g=Math.min(g,E),f>g){v=!1;break}}v&&f<h&&(h=f)}for(let d of this.dynamic){if(!d.rayHit||d===this.rayIgnore)continue;let f=d.rayHit(t,e,n,s,r,o,h);f<h&&(h=f)}if(r<-1e-6){let f=(this.groundFn(t,n)+.05-e)/r;f>0&&f<h&&(h=f)}return h}};function Pn(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Re,l=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Ou(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let g=Ou(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Ou(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ae(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){let x=h.getComponent(d,g);a.setComponent(d+u,g,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var ay=new Gt,Bu=new He,Fu=new Ie,zu=new D,ku=new D;function Fe(i=0,t=0,e=0,n=0,s=0,r=0,o=1,a=1,c=1){return Fu.set(s,n,r,"YXZ"),Bu.setFromEuler(Fu),ku.set(i,t,e),zu.set(o,a,c),new Gt().compose(ku,Bu,zu)}function ue(i,t,e,n=1,s=n){let r=new Ht(i,t,e),o=r.attributes.uv,a=[[e,t],[e,t],[i,e],[i,e],[i,t],[i,t]];for(let c=0;c<6;c++)for(let l=0;l<4;l++){let h=c*4+l;o.setXY(h,o.getX(h)*a[c][0]/n,o.getY(h)*a[c][1]/s)}return r}function Ee(i,t,e=1,n=e){let s=new yi(i,t);s.rotateX(-Math.PI/2);let r=s.attributes.uv;for(let o=0;o<r.count;o++)r.setXY(o,r.getX(o)*i/e,r.getY(o)*t/n);return s}function Sl(i,t,e,n=.4,s=2){let r=i/2+n,o=t/2+n,a=[],c=[],l=(v,_,I,E,A,R)=>{a.push(...v,..._,...I),c.push(...E,...A,...R)},h=[-r,0,-o],u=[r,0,-o],d=[r,0,o],f=[-r,0,o],g=[-r,e,0],x=[r,e,0],m=Math.hypot(o,e)/s,p=2*r/s;l(h,g,x,[0,0],[0,m],[p,m]),l(h,x,u,[0,0],[p,m],[p,0]),l(d,x,g,[0,0],[0,m],[p,m]),l(d,g,f,[0,0],[p,m],[p,0]),l(f,g,h,[0,0],[.5,.5],[1,0]),l(u,x,d,[0,0],[.5,.5],[1,0]),l(h,u,d,[0,0],[1,0],[1,1]),l(h,d,f,[0,0],[1,1],[0,1]);let M=new Re;return M.setAttribute("position",new re(a,3)),M.setAttribute("uv",new re(c,2)),M.computeVertexNormals(),M}function tn(i,t,e,n=10){return new Ve(i,t,e,n)}function v_(i){let t=i.index?i.toNonIndexed():i;for(let e of Object.keys(t.attributes))["position","normal","uv","color"].includes(e)||t.deleteAttribute(e);return t.attributes.uv||t.setAttribute("uv",new re(new Float32Array(t.attributes.position.count*2),2)),t.attributes.normal||t.computeVertexNormals(),t}function or(i,t){let e=new Ot(t),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=e.r,s[r*3+1]=e.g,s[r*3+2]=e.b;return i.setAttribute("color",new Ae(s,3)),i}var Hi=class{constructor(){this.groups=new Map}add(t,e,n,s){e.isPaint&&(s=e.color,e=e.mat);let r=v_(t);if(r===t&&(r=t.clone()),e.isSign){let o=e.region,a=r.attributes.uv;for(let c=0;c<a.count;c++){let l=Math.min(1,Math.max(0,a.getX(c))),h=Math.min(1,Math.max(0,a.getY(c)));a.setXY(c,o.u0+(o.u1-o.u0)*l,o.v0+(o.v1-o.v0)*h)}e=e.mat}n&&r.applyMatrix4(n),e.vertexColors?or(r,s!=null?s:16777215):r.attributes.color&&r.deleteAttribute("color"),this.groups.has(e)||this.groups.set(e,[]),this.groups.get(e).push(r)}flush(t,e={}){var s,r,o;let n=[];for(let[a,c]of this.groups){if(!c.length)continue;let l=Pn(c,!1);c.forEach(d=>d.dispose()),l.computeBoundingSphere();let h=new fe(l,a),u=(r=(s=a.userData.castShadow)!=null?s:e.castShadow)!=null?r:!0;h.castShadow=u,h.receiveShadow=(o=a.userData.receiveShadow)!=null?o:!0,h.matrixAutoUpdate=!1,h.updateMatrix(),t.add(h),n.push(h)}return this.groups.clear(),n}};var wl=new Map,ko=1337;function Pt(){return ko=ko*16807%2147483647,(ko-1)/2147483646}function Ho(i){ko=i%2147483647||1}function mt(i,t){return i+(t-i)*Pt()}function qt(i){return i[Math.floor(Pt()*i.length)]}function Ue(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d")]}function dn(i,t,e,n,s=1){let r=i.getImageData(0,0,t,e),o=r.data;for(let a=0;a<o.length;a+=4){let c=(Pt()-.5)*n;o[a]=Math.max(0,Math.min(255,o[a]+c)),o[a+1]=Math.max(0,Math.min(255,o[a+1]+c)),o[a+2]=Math.max(0,Math.min(255,o[a+2]+c)),o[a+3]=o[a+3]*s}i.putImageData(r,0,0)}function ar(i,t,e,n,s,r=2){for(let o=0;o<n;o++){i.fillStyle=qt(s);let a=r*(.5+Pt());i.fillRect(Pt()*t,Pt()*e,a,a)}}function ze(i,t=!0,e=!0){let n=new yo(i);return t&&(n.wrapS=n.wrapT=Gs),e&&(n.colorSpace=Ze),n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=Jn,n}function Ge(i,t){return wl.has(i)||wl.set(i,t()),wl.get(i)}function bs(){return Ge("asphalt",()=>{let[i,t]=Ue(256,256);t.fillStyle="#3a3b3d",t.fillRect(0,0,256,256),ar(t,256,256,2500,["#2c2d2f","#4a4b4e","#333436","#555"],1.5),dn(t,256,256,22);for(let e=0;e<6;e++)t.fillStyle=`rgba(20,20,22,${mt(.08,.2)})`,t.beginPath(),t.ellipse(Pt()*256,Pt()*256,mt(10,40),mt(6,25),Pt()*3,0,7),t.fill();return ze(i)})}function Hu(){return Ge("road",()=>{let[i,t]=Ue(512,512);t.drawImage(bs().image,0,0,512,512),t.drawImage(bs().image,256,0,256,256);let e=512/12;t.fillStyle="#d9b62c";for(let n=0;n<512;n+=e*6)t.fillRect(256-e*.25,n,e*.12,e*3),t.fillRect(256+e*.13,n,e*.12,e*3);return t.fillStyle="rgba(225,225,225,0.85)",t.fillRect(e*2.5,0,e*.12,512),t.fillRect(512-e*2.5-e*.12,0,e*.12,512),dn(t,512,512,14),ze(i)})}function Vu(){return Ge("cross",()=>{let[i,t]=Ue(256,256);t.drawImage(bs().image,0,0),t.fillStyle="rgba(230,230,230,0.9)";for(let e=8;e<256;e+=32)t.fillRect(e,0,18,256);return dn(t,256,256,30),ze(i)})}function Gu(){return Ge("sidewalk",()=>{let[i,t]=Ue(256,256);t.fillStyle="#9c9890",t.fillRect(0,0,256,256),dn(t,256,256,26),t.strokeStyle="rgba(60,58,55,0.55)",t.lineWidth=2;for(let e=0;e<=256;e+=64)t.beginPath(),t.moveTo(e,0),t.lineTo(e,256),t.stroke(),t.beginPath(),t.moveTo(0,e),t.lineTo(256,e),t.stroke();return ar(t,256,256,400,["#888","#aaa59c","#7d7a74"],2),ze(i)})}function Wu(){return Ge("grass",()=>{let[i,t]=Ue(256,256);return t.fillStyle="#4b6b2e",t.fillRect(0,0,256,256),ar(t,256,256,6e3,["#3f5e26","#5a7d36","#466628","#6b8a3e","#3a5220"],2),dn(t,256,256,18),ze(i)})}function Xu(){return Ge("dirt",()=>{let[i,t]=Ue(256,256);return t.fillStyle="#7a6448",t.fillRect(0,0,256,256),ar(t,256,256,3e3,["#6b563c","#8a7354","#5e4a33"],2),dn(t,256,256,20),ze(i)})}function El(){return Ge("concrete",()=>{let[i,t]=Ue(256,256);return t.fillStyle="#b3aea5",t.fillRect(0,0,256,256),dn(t,256,256,30),ar(t,256,256,600,["#9d978d","#c4bfb6"],3),ze(i)})}function qu(){return Ge("parking",()=>{let[i,t]=Ue(256,256);return t.drawImage(bs().image,0,0),t.fillStyle="rgba(235,235,235,0.9)",t.fillRect(0,0,256,6),t.fillRect(0,0,6,256*.95),ze(i)})}var M_={brick:{base:"#8a4a36",mortar:"#6d3a2b",frame:"#d8d0c0",glass:"#1d2633"},concrete:{base:"#a8a39a",mortar:"#8d877d",frame:"#5b5e62",glass:"#22303e"},office:{base:"#4d5a66",mortar:"#3b4650",frame:"#2a3138",glass:"#2c4258"},plaster:{base:"#c9b48e",mortar:"#a99572",frame:"#f1ece2",glass:"#1f2a35"},apartment:{base:"#b9a495",mortar:"#9a8577",frame:"#e8e0d6",glass:"#1d2733"}};function Yu(i){return Ge("facade_"+i,()=>{let t=M_[i],e=512,n=e/8,[s,r]=Ue(e,e),[o,a]=Ue(e,e);if(r.fillStyle=t.base,r.fillRect(0,0,e,e),a.fillStyle="#000",a.fillRect(0,0,e,e),i==="brick"){r.fillStyle=t.mortar;for(let c=0;c<e;c+=6){r.fillRect(0,c,e,1);for(let l=c/6%2*6;l<e;l+=12)r.fillRect(l,c,1,6)}}dn(r,e,e,i==="office"?10:24);for(let c=0;c<8;c++){r.fillStyle=t.mortar,r.fillRect(0,c*n,e,i==="office"?6:3);for(let l=0;l<8;l++){let h=l*n,u=c*n,d=i==="office"?n-6:n*.55,f=i==="office"?n-10:n*.6,g=h+(n-d)/2,x=u+(n-f)/2+2;r.fillStyle=t.frame,r.fillRect(g-3,x-3,d+6,f+6);let m=Pt()<.38,p=r.createLinearGradient(g,x,g+d,x+f);if(p.addColorStop(0,t.glass),p.addColorStop(1,"#46566a"),r.fillStyle=p,r.fillRect(g,x,d,f),i!=="office"&&(r.fillStyle=t.frame,r.fillRect(g+d/2-1,x,2,f)),m){let M=qt(["#ffd79a","#ffe4b8","#fff1d6","#cfe3ff","#ffc77a"]);a.fillStyle=M,a.globalAlpha=mt(.55,1),a.fillRect(g,x,d,f),a.globalAlpha=1,Pt()<.5&&(a.fillStyle="rgba(0,0,0,0.45)",a.fillRect(g,x,d*mt(.2,.5),f))}i!=="office"&&Pt()<.08&&(r.fillStyle="#ccc",r.fillRect(g+d*.2,x+f+4,d*.5,8))}}return{map:ze(s),emissive:ze(o)}})}function Zu(){return Ge("siding",()=>{let[i,t]=Ue(256,256);t.fillStyle="#ededed",t.fillRect(0,0,256,256);for(let e=0;e<256;e+=16){let n=t.createLinearGradient(0,e,0,e+16);n.addColorStop(0,"#ffffff"),n.addColorStop(.85,"#dedede"),n.addColorStop(1,"#a9a9a9"),t.fillStyle=n,t.fillRect(0,e,256,16)}return dn(t,256,256,10),ze(i)})}function Ju(){return Ge("roof",()=>{let[i,t]=Ue(256,256);t.fillStyle="#5a4038",t.fillRect(0,0,256,256);for(let e=0;e<256;e+=16)for(let n=e/16%2*16;n<288;n+=32)t.fillStyle=qt(["#4d362f","#5f443a","#553c33","#634a40"]),t.fillRect(n-32,e,31,15);return dn(t,256,256,18),ze(i)})}function $u(){return Ge("wood",()=>{let[i,t]=Ue(128,128);t.fillStyle="#7b5a3a",t.fillRect(0,0,128,128);for(let e=0;e<40;e++){t.strokeStyle=`rgba(50,30,15,${mt(.1,.35)})`,t.beginPath();let n=Pt()*128;t.moveTo(0,n),t.bezierCurveTo(40,n+mt(-4,4),80,n+mt(-4,4),128,n),t.stroke()}return dn(t,128,128,14),ze(i)})}function Ku(){return Ge("bark",()=>{let[i,t]=Ue(64,128);t.fillStyle="#4a3726",t.fillRect(0,0,64,128);for(let e=0;e<30;e++)t.fillStyle=`rgba(25,15,8,${mt(.2,.5)})`,t.fillRect(Pt()*64,Pt()*128,mt(1,3),mt(10,40));return dn(t,64,128,20),ze(i)})}function Qu(){return Ge("pool",()=>{let[i,t]=Ue(128,128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,200,120,0.55)"),e.addColorStop(.4,"rgba(255,170,90,0.22)"),e.addColorStop(1,"rgba(255,150,70,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),ze(i,!1)})}function b_(i,t={}){{let e=t.w||512,n=t.h||128,[s,r]=Ue(e,n);r.fillStyle=t.bg||"#1b3d6e",r.fillRect(0,0,e,n),t.border!==!1&&(r.strokeStyle=t.borderColor||"#fff",r.lineWidth=Math.max(4,n*.05),r.strokeRect(r.lineWidth,r.lineWidth,e-r.lineWidth*2,n-r.lineWidth*2)),r.fillStyle=t.fg||"#fff";let o=t.size||n*.5;for(r.font=`${t.weight||"bold"} ${o}px ${t.font||"Arial, Helvetica, sans-serif"}`;r.measureText(i).width>e*.9&&o>8;)o-=2,r.font=`${t.weight||"bold"} ${o}px ${t.font||"Arial, Helvetica, sans-serif"}`;return r.textAlign="center",r.textBaseline="middle",r.fillText(i,e/2,n/2+2),s}}function Tl(){return Ge("shopwin",()=>{let[i,t]=Ue(256,128),e=t.createLinearGradient(0,0,0,128);e.addColorStop(0,"#fff3d4"),e.addColorStop(1,"#e7c58a"),t.fillStyle=e,t.fillRect(0,0,256,128);for(let n=30;n<128;n+=32){t.fillStyle="#7a5a3a",t.fillRect(0,n,256,4);for(let s=4;s<252;s+=mt(8,16)){t.fillStyle=qt(["#c0392b","#2980b9","#27ae60","#f39c12","#8e44ad","#ecf0f1","#d35400"]);let r=mt(10,22);t.fillRect(s,n-r,mt(5,10),r)}}return t.fillStyle="rgba(255,255,255,0.25)",t.beginPath(),t.moveTo(20,0),t.lineTo(70,0),t.lineTo(30,128),t.lineTo(-20,128),t.fill(),ze(i,!1)})}function ju(){return Ge("tilefloor",()=>{let[i,t]=Ue(128,128);for(let e=0;e<4;e++)for(let n=0;n<4;n++)t.fillStyle=(n+e)%2?"#d8d4cc":"#b9b3a8",t.fillRect(n*32,e*32,32,32);return dn(t,128,128,10),ze(i)})}function td(){return Ge("signAtlas",()=>{let[o,a]=Ue(2048,1024);a.fillStyle="#222",a.fillRect(0,0,2048,1024);let c=ze(o,!1),l=new Map,h=0;return{texture:c,region(u,d){let f=u+JSON.stringify(d);if(l.has(f))return l.get(f);if(h>=6*16)return l.values().next().value;let g=h%6,x=Math.floor(h/6);h++;let m=b_(u,{...d,w:341*2,h:64*2});a.drawImage(m,g*341+1,x*64+1,339,62),c.needsUpdate=!0;let p={u0:(g*341+2)/2048,u1:((g+1)*341-2)/2048,v0:1-((x+1)*64-2)/1024,v1:1-(x*64+2)/1024};return l.set(f,p),p}}})}var Vo=[];function be(i,t={}){let e=new Cn(i);return Object.assign(e.userData,t),e}function Ss(i,t,e){return Vo.push({mat:i,base:t,night:e}),i}var Ce=(i,t)=>({isPaint:!0,mat:i,color:t}),At=null;function cr(){if(At)return At;At={},At.road=be({map:Hu()},{castShadow:!1}),At.asphalt=be({map:bs()},{castShadow:!1}),At.cross=be({map:Vu(),polygonOffset:!0,polygonOffsetFactor:-2},{castShadow:!1}),At.sidewalk=be({map:Gu()},{castShadow:!1}),At.grass=be({map:Wu()},{castShadow:!1}),At.dirt=be({map:Xu()},{castShadow:!1}),At.concrete=be({map:El()}),At.concreteFlat=be({map:El(),polygonOffset:!0,polygonOffsetFactor:-1},{castShadow:!1}),At.parking=be({map:qu(),polygonOffset:!0,polygonOffsetFactor:-1},{castShadow:!1}),At.facade={};for(let s of["brick","concrete","office","plaster","apartment"]){let r=Yu(s);At.facade[s]=Ss(be({map:r.map,emissiveMap:r.emissive,emissive:16777215,emissiveIntensity:0}),0,1)}let i=be({map:Zu(),vertexColors:!0});At.siding=[15921126,11125460,14206883,11057306,13209466,14735042].map(s=>Ce(i,s));let t=be({map:Ju(),vertexColors:!0});At.roof=[16777215,9083560,11567216].map(s=>Ce(t,s));let e=be({vertexColors:!0}),n=be({map:$u(),vertexColors:!0});At.trim=Ce(e,16052714),At.darkTrim=Ce(e,3815994),At.wood=Ce(n,16777215),At.woodDark=Ce(n,9071184),At.fence=Ce(e,15658734),At.fenceWood=Ce(n,13150344),At.metal=Ce(e,6054246),At.metalDark=Ce(e,2829873),At.metalLight=Ce(e,11054514),At.red=Ce(e,11545130),At.yellow=Ce(e,14200874),At.green=Ce(e,3042106),At.blue=Ce(e,1916810),At.white=Ce(e,15790320),At.hedge=Ce(e,3495210),At.water=new vi({color:3828362,shininess:100,transparent:!0,opacity:.85}),At.water.userData.castShadow=!1,At.winDark=Ce(e,2568765),At.winLit=Ss(be({color:3815984,emissive:16767392,emissiveIntensity:0}),0,1),At.lamp=Ss(be({color:12303274,emissive:16769712,emissiveIntensity:.3},{castShadow:!1}),.25,1.4),At.pool=new hn({map:Qu(),transparent:!0,depthWrite:!1,blending:Kr,opacity:0}),At.pool.userData.castShadow=!1,At.pool.userData.receiveShadow=!1,Vo.push({mat:At.pool,opacity:!0,base:0,night:1}),At.shopWin=Ss(be({map:Tl(),emissiveMap:Tl(),emissive:16777215,emissiveIntensity:.35},{castShadow:!1}),.35,.9),At.interior=be({color:15261904,emissive:2762272}),At.interiorFloor=be({map:ju(),emissive:1710100},{castShadow:!1}),At.ceilingLight=Ss(be({color:16777215,emissive:16774368,emissiveIntensity:.8},{castShadow:!1}),.8,1.2),At.glass=new vi({color:10139848,transparent:!0,opacity:.25,shininess:120,depthWrite:!1}),At.glass.userData.castShadow=!1,At.awning=[11022898,3107391,3100554,11565598,5910378,3355443].map(s=>Ce(e,s)),At.signMats=new Map,At.tl={NS:[],EW:[]};for(let s of["NS","EW"])for(let r of[16722458,16757274,2817898])At.tl[s].push(new hn({color:r}));return At.tlOff=[3803656,3811848,539160],At.tlBox=Ce(e,2303530),At.bark=be({map:Ku()}),At.flag=be({color:16777215,side:An}),At.signAtlas=td(),At.sign=Ss(be({map:At.signAtlas.texture,emissiveMap:At.signAtlas.texture,emissive:16777215,emissiveIntensity:.4},{castShadow:!1}),.25,.9),At}function Ln(i,t={}){let e=cr();return{isSign:!0,mat:e.sign,region:e.signAtlas.region(i,t)}}var ae=6,ke=12,fn=76,Se=fn-ke,Fn=4,lt=.15,pn=ae/2*fn+ke/2,lr=1.75,ed=4.75,ve=i=>(i-ae/2)*fn,ni=i=>ve(i)+fn/2,w_=["Rua das Ac\xE1cias","Av. Los Valles","Rua Hidalgo","Av. Central","Rua Esperan\xE7a","Rua do Porto","Rua Velha"],E_=["Rua Monroe","Av. Libertad","Rua das Palmeiras","Rua Cole","Rua Ram\xEDrez","Rua Ocidental","Rua Leste"],Al=[["res","res","res","res","res","res"],["res","park","mixed","gas","mixed","res"],["res","shops","down","down","apart","res"],["res","police","down","down","parking","res"],["res","apart","mixed","shops2","park","res"],["res","res","res","res","res","res"]];function nd(i){let t=i-ve(0)+ke/2;return t<0||t>ae*fn+ke?!1:t%fn<ke}function id(i,t){return Math.abs(i)<=pn&&Math.abs(t)<=pn&&(nd(i)||nd(t))?0:lt}var We=class{constructor(t,e,n,s,r){this.x=t,this.z=e,this.ry=n,this.c=Math.cos(n),this.s=Math.sin(n),this.B=s,this.world=r}pt(t,e){return[this.x+t*this.c+e*this.s,this.z-t*this.s+e*this.c]}m(t,e,n,s=0,r=0,o=0,a=1,c=1,l=1){let[h,u]=this.pt(t,n);return Fe(h,e,u,this.ry+s,r,o,a,c,l)}add(t,e,n,s,r,o=0,a=0,c=0){this.B.add(t,e,this.m(n,s,r,o,a,c))}box(t,e,n,s,r,o,a,c=!0,l=2,h=l){this.B.add(ue(r,o,a,l,h),t,this.m(e,n+o/2,s)),c&&this.collide(e,n,s,r,o,a)}collide(t,e,n,s,r,o){let[a,c]=this.pt(t,n),l=Math.abs(this.s)>.5,h=l?o:s,u=l?s:o;this.world.addBox(a-h/2,e,c-u/2,a+h/2,e+r,c+u/2)}},Go=class{constructor(t,e){this.scene=t,this.world=e,this.root=new $e,this.root.name="LosValles",t.add(this.root),this.parkedCars=[],this.npcs=[],this.trees=[],this.shopkeepers=[],this.landmarks=[],this.pedLoops=[],e.groundFn=id,this.M=cr(),this.chunks=new Map}chunk(t,e){let n=Math.floor(t/2)+","+Math.floor(e/2);return this.chunks.has(n)||this.chunks.set(n,new Hi),this.chunks.get(n)}build(){Ho(20261108),this.buildRoads();for(let t=0;t<ae;t++)for(let e=0;e<ae;e++)this.buildBlock(e,t,Al[t][e]);this.buildOutskirts(),this.buildTrees(),this.buildStreetParking();for(let t of this.chunks.values())t.flush(this.root);this.chunks.clear()}buildRoads(){let t=this.M,e=new Hi;for(let s=0;s<=ae;s++){for(let r=0;r<ae;r++){let o=fn-ke,a=ni(r);e.add(Ee(ke,o,ke,12),t.road,Fe(ve(s),0,a)),e.add(Ee(ke,o,ke,12),t.road,Fe(a,0,ve(s),Math.PI/2));for(let c of[-1,1])e.add(Ee(ke,3,9.6,3),t.cross,Fe(ve(s),.01,a+c*(o/2-1.8))),e.add(Ee(ke,3,9.6,3),t.cross,Fe(a+c*(o/2-1.8),.01,ve(s),Math.PI/2))}for(let r=0;r<=ae;r++)e.add(Ee(ke,ke,6),t.asphalt,Fe(ve(s),0,ve(r)))}e.flush(this.root,{castShadow:!1});let n=new Hi;for(let s=0;s<=ae;s++)for(let r=0;r<=ae;r++)this.buildIntersection(n,s,r);n.flush(this.root)}buildIntersection(t,e,n){let s=this.M,r=ve(e),o=ve(n),a=[[0,1,"NS"],[0,-1,"NS"],[1,0,"EW"],[-1,0,"EW"]];for(let[c,l,h]of a){let u=e-c,d=n-l;if(u<0||u>ae||d<0||d>ae)continue;let f=-l,g=c,x=r-c*7.2+-l*7.2,m=o-l*7.2+c*7.2,p=Math.atan2(-c,-l);t.add(tn(.09,.11,5.4,8),s.metalDark,Fe(x,lt+2.7,m)),this.world.addCentered(x,0,m,.3,5.6,.3);let M=x+l*5,v=m-c*5;t.add(ue(.12,.12,5),s.metalDark,Fe((x+M)/2,lt+4.7,(m+v)/2,Math.atan2(l,-c)));for(let[_,I,E]of[[M,v,4.1],[x,m,2.9]]){t.add(ue(.36,1,.28),s.tlBox,Fe(_,lt+E,I,p));for(let A=0;A<3;A++){let R=Math.sin(p)*.15,S=Math.cos(p)*.15;t.add(new Ve(.1,.1,.04,10),s.tl[h][A],Fe(_+R,lt+E+.3-A*.3,I+S,p,Math.PI/2))}}x>r&&m>o&&(n<ae&&t.add(ue(1.8,.28,.03,1.8,.28),Ln(w_[n],{bg:"#1f6b3a",w:512,h:80}),Fe(x-.95,lt+5.05,m)),e<ae&&t.add(ue(1.8,.28,.03,1.8,.28),Ln(E_[e],{bg:"#1f6b3a",w:512,h:80}),Fe(x,lt+5.4,m-.95,Math.PI/2)))}}buildBlock(t,e,n){let s=this.M,r=ni(t),o=ni(e),a=this.chunk(t,e),c=new We(r,o,0,a,this.world);a.add(ue(Se,lt,Se,2),s.sidewalk,Fe(r,lt/2,o));let l=Se-Fn*2,h={res:s.grass,park:s.grass,apart:s.grass,parking:s.parking,gas:s.concreteFlat}[n]||s.concreteFlat;n==="parking"?a.add(Ee(l,l,3,5.5),s.parking,Fe(r,lt+.005,o,Math.PI/2)):a.add(Ee(l,l,n==="res"||n==="park"||n==="apart"?4:3),h,Fe(r,lt+.005,o)),this.streetFurniture(c,t,e,n),{res:()=>this.residential(c,t,e),down:()=>this.downtown(c),mixed:()=>this.mixed(c),shops:()=>this.shopsBlock(c,["Mercado Los Valles","Farm\xE1cia S\xE3o Lucas","Lanchonete do Joe","Ferragens Ram\xEDrez"]),shops2:()=>this.shopsBlock(c,["Loja de Roupas Vega","Padaria Aurora","Conveni\xEAncia 24h","Eletr\xF4nicos Sombra"]),police:()=>this.policeBlock(c),gas:()=>this.gasBlock(c),parking:()=>this.parkingBlock(c),apart:()=>this.apartBlock(c),park:()=>this.parkBlock(c)}[n]();let d=Se/2-2;this.pedLoops.push({cx:r,cz:o,half:d,type:n})}streetFurniture(t,e,n,s){let r=this.M,o=Se/2;for(let a=0;a<4;a++){let c=a*Math.PI/2;for(let l=0;l<3;l++){let h=-18+l*18+(a%2?9:0)*0,u=new We(t.x,t.z,c,t.B,this.world),d=h,f=o-.6;u.add(tn(.07,.11,6.5,8),r.metalDark,d,lt+3.25,f),u.add(ue(.08,.08,1.8),r.metalDark,d,lt+6.4,f+.85),u.add(ue(.45,.14,.7),r.metalDark,d,lt+6.35,f+1.7),u.add(ue(.36,.04,.55),r.lamp,d,lt+6.27,f+1.7),u.collide(d,0,f,.3,6.6,.3),t.B.add(Ee(11,11),r.pool,u.m(d,.03,f+2.2)),l===1&&Pt()<.6&&(u.add(tn(.25,.22,.8,10),r.green,d+2.5,lt+.4,f),u.collide(d+2.5,0,f,.5,.8,.5)),l===0&&Pt()<.5&&(u.add(tn(.12,.14,.6,8),r.red,d+4,lt+.3,f-.2),u.add(new un(.13,8,6),r.red,d+4,lt+.62,f-.2),u.collide(d+4,0,f-.2,.35,.7,.35))}}if((e+n)%3===0&&s!=="res"){let a=new We(t.x,t.z,Math.PI,t.B,this.world),c=o-1.4;a.box(r.metal,-1.4,lt,c,.08,2.4,.08,!1),a.box(r.metal,1.4,lt,c,.08,2.4,.08,!1),a.box(r.metal,-1.4,lt,c-1.2,.08,2.4,.08,!1),a.box(r.metal,1.4,lt,c-1.2,.08,2.4,.08,!1),a.box(r.metalLight,0,lt+2.4,c-.6,3.2,.08,1.6,!1),a.add(Ee(2.8,2.2),r.glass,0,lt+1.3,c-1.22,0,Math.PI/2),a.box(r.woodDark,0,lt+.45,c-1,2.4,.08,.45,!1),a.collide(0,0,c-.6,3,2.5,1.3),a.box(Ln("\xD4NIBUS",{bg:"#0b4f8a",w:256,h:80}),1.9,lt+2.2,c,.5,.25,.03,!1,.5,.25)}}house(t,e,n,s,r={}){var S,y,C,L,U,O;let o=this.M,a=new We(...t.pt(e,n),s,t.B,this.world),c=(S=r.w)!=null?S:mt(9,12),l=(y=r.d)!=null?y:mt(7.5,9),h=(C=r.floors)!=null?C:Pt()<.45?2:1,u=2.9,d=h*u+.3,f=(L=r.siding)!=null?L:qt(o.siding),g=qt(o.roof),x=lt;a.box(o.concrete,0,x,0,c+.3,.45,l+.3,!1),a.box(f,0,x+.45,0,c,d,l,!1,3,3),a.collide(0,0,0,c+.3,d+2,l+.3);for(let H of[-1,1])for(let z of[-1,1])a.box(o.trim,H*(c/2),x+.45,z*(l/2),.18,d,.18,!1);a.box(o.trim,0,x+.45+d-.15,0,c+.1,.18,l+.1,!1);let m=mt(1.6,2.4),p=c>=l,M=p?Sl(c,l,m,.5,2):Sl(l,c,m,.5,2);a.add(M,g,0,x+.45+d,0,p?0:Math.PI/2),Pt()<.45&&a.box(o.facade.brick,c*.3,x+d-.5,-l*.15,.7,m+1.6,.7,!1,3,3);let v=(U=r.doorX)!=null?U:mt(-c*.25,c*.25);a.box(o.woodDark,v,x+.45,l/2+.02,1,2.1,.08,!1,1),a.box(o.trim,v,x+.45+2.1,l/2+.03,1.25,.12,.1,!1),a.box(o.metalLight,v+.35,x+1.45,l/2+.08,.06,.06,.06,!1),a.box(o.concrete,v,x,l/2+.9,2.6,.3,1.8,!1),a.box(o.wood,v,x+.3,l/2+.9,2.8,.1,1.8,!1,2),a.box(o.trim,v,x+2.9,l/2+1,3,.12,2,!1);for(let H of[-1,1])a.box(o.trim,v+H*1.3,x+.4,l/2+1.7,.14,2.5,.14,!1),a.collide(v+H*1.3,0,l/2+1.7,.25,2.8,.25);let _=(H,z,Q)=>{for(let G=0;G<z;G++){let st=Q==="front"||Q==="back"?c:l,ct=-st/2+(G+.5)*(st/z);if(Q==="front"&&H<2&&Math.abs(ct-v)<1.6)continue;let Et=Pt()<.5?o.winLit:o.winDark,Vt=(X,tt,dt)=>{if(a.add(ue(1.2,1.3,.06),Et,X,x+H,tt,dt),a.add(ue(1.4,.1,.12),o.trim,X,x+H+.7,tt,dt),a.add(ue(1.4,.12,.2),o.trim,X,x+H-.7,tt,dt),a.add(ue(.06,1.3,.1),o.trim,X,x+H,tt,dt),a.add(ue(1.2,.06,.1),o.trim,X,x+H,tt,dt),Pt()<.5)for(let ot of[-1,1]){let[Dt,Ft]=dt===0?[ot*.85,0]:[0,ot*.85];a.add(ue(.4,1.35,.05),o.darkTrim,X+Dt,x+H,tt+Ft,dt)}};Q==="front"?Vt(ct,l/2+.03,0):Q==="back"?Vt(ct,-l/2-.03,0):Vt(Q==="left"?-c/2-.03:c/2+.03,ct,Math.PI/2)}};for(let H=0;H<h;H++){let z=.45+H*u+1.55;_(z,Math.max(2,Math.round(c/3)),"front"),_(z,Math.max(2,Math.round(c/3.5)),"back"),_(z,Math.max(1,Math.round(l/4)),"left"),_(z,Math.max(1,Math.round(l/4)),"right")}let I=(O=r.front)!=null?O:8;a.add(Ee(1.4,I),o.concreteFlat,v,x+.012,l/2+1.8+I/2);let E=v>0?-c/2+1.8:c/2-1.8;a.add(Ee(3.2,I+2),o.concreteFlat,E,x+.012,l/2+I/2+1),a.box(o.metalDark,v+1.2,x,l/2+1.8+I-.6,.08,1,.08,!1),a.box(o.blue,v+1.2,x+1,l/2+1.8+I-.6,.25,.25,.45,!1);for(let H=0;H<4;H++){let z=-c/2+.8+Pt()*(c-1.6);Math.abs(z-v)<1.6||Math.abs(z-E)<2||a.add(new ir(mt(.45,.7),0),o.hedge,z,x+.4,l/2+.6)}let[A,R]=a.pt(E,l/2+I-1.5);return{frame:a,driveway:[A,R],drivewayHeading:s+Math.PI,w:c,d:l,doorX:v,front:I}}residential(t,e,n){let s=this.M,r=(Se-Fn*2)/2,o=3,a=r*2/o,c=new We(t.x,t.z,0,t.B,this.world);for(let l of[1,-1]){let h=l>0?0:Math.PI;for(let u=0;u<o;u++){let d=-r+a*(u+.5),f=8.5,g=8.5,x=l*(r-g-f/2-1.8),m=e===0&&n===2&&l===1&&u===2,p=this.house(t,d,x,h,{d:f,front:g,floors:m?2:void 0,siding:m?s.siding[1]:void 0,doorX:m?1.5:void 0});m?this.ethanHouse={door:p.frame.pt(p.doorX,f/2+3.5),driveway:p.driveway,heading:p.drivewayHeading}:Pt()<.45&&this.parkedCars.push({x:p.driveway[0],z:p.driveway[1],heading:h+(Pt()<.5?0:Math.PI),type:qt(["sedan","hatch","suv","pickup"])});let M=l*(r-.3),v=p.frame.pt(p.doorX,0)[0]-t.x,_=p.driveway[0]-t.x,I=[[v-1,v+1],[_-1.9,_+1.9]].sort((S,y)=>S[0]-y[0]),E=d-a/2+.2,A=d+a/2-.2,R=[];for(let[S,y]of I)S>E&&R.push([E,Math.min(S,A)]),E=Math.max(E,y);A>E&&R.push([E,A]);for(let[S,y]of R){if(y-S<.4)continue;let C=(S+y)/2,L=y-S;c.box(s.fence,C,lt+.75,M,L,.08,.05,!1),c.box(s.fence,C,lt+.35,M,L,.08,.05,!1);for(let U=S;U<=y;U+=.25)c.add(ue(.07,.95,.03),s.fence,U,lt+.47,M);c.collide(C,0,M,L,1,.15)}Pt()<.8&&this.trees.push([t.x+d+mt(-5,5),t.z+l*mt(2.5,6),mt(.9,1.4)])}}c.box(s.fenceWood,0,lt,0,r*2,1.8,.08,!0,2);for(let l=1;l<o;l++){let h=-r+a*l;for(let u of[1,-1])c.box(s.fenceWood,h,lt,u*5,.08,1.8,9,!0,2)}}building(t,e,n,s,r,o,a,c={}){let l=this.M,h=3.2,u=lt,d=o*h,f=l.facade[a],g=new We(...t.pt(e,n),0,t.B,this.world);g.box(f,0,u,0,s,d,r,!0,24,25.6),g.box(l.concrete,0,u+d,0,s+.4,.3,r+.4,!1);for(let[x,m,p,M]of[[0,r/2,s,.3],[0,-r/2,s,.3],[s/2,0,.3,r],[-s/2,0,.3,r]])g.box(l.concrete,x,u+d+.3,m,p,.9,M,!1);g.box(l.metalDark,0,u+d+.05,0,s-.4,.05,r-.4,!1);for(let x=0;x<Math.floor(mt(1,4));x++)g.box(l.metalLight,mt(-s/3,s/3),u+d+.3,mt(-r/3,r/3),mt(1.2,2.5),mt(.8,1.5),mt(1.2,2.5),!1);if(Pt()<.4){let x=mt(-s/4,s/4),m=mt(-r/4,r/4);g.add(tn(1.3,1.3,2.4,12),l.woodDark,x,u+d+3,m);for(let p of[[-1,-1],[1,-1],[-1,1],[1,1]])g.box(l.metalDark,x+p[0]*.9,u+d+.3,m+p[1]*.9,.12,1.6,.12,!1)}if(c.tower&&o>8){let x=Math.floor(mt(3,7));g.box(f,0,u+d+.3,0,s*.6,x*h,r*.6,!0,24,25.6),g.box(l.concrete,0,u+d+.3+x*h,0,s*.6+.3,.4,r*.6+.3,!1),Pt()<.6&&g.add(tn(.05,.08,8,6),l.metalDark,0,u+d+x*h+4.5,0)}for(let x of c.storefronts||[])this.storefront(g,s,r,x,c.names);return g}storefront(t,e,n,s,r){let o=this.M,a=lt,c={s:Math.PI,n:0,e:Math.PI/2,w:-Math.PI/2}[s],l=s==="n"||s==="s"?e:n,h=s==="n"||s==="s"?n:e,u=new We(...t.pt(0,0),c,t.B,this.world),d=Math.max(1,Math.floor(l/9)),f=l/d;u.box(o.darkTrim,0,a,h/2+.15,l,3.8,.3,!1,2);for(let g=0;g<d;g++){let x=-l/2+f*(g+.5);u.add(ue(f-1.4,2.4,.05,f-1.4,2.4),o.shopWin,x,a+1.6,h/2+.32),u.add(ue(1,2.2,.05),o.glass,x+f/2-.55,a+1.1,h/2+.33),u.add(ue(f-.6,.08,1.6),qt(o.awning),x,a+3.3,h/2+1,0,.3);let m=r&&r.length?r.shift():qt(["Caf\xE9 Noir","Barbearia Sombra","Livraria Lua","\xD3tica Vis\xE3o","Pizzaria Napoli","Lavanderia","Joalheria Ouro","Banco Los Valles","Hotel Esperanza","Cinema Ritz","Tabacaria","Floricultura","Sapataria","Bar do M\xE1rio","Restaurante El Sol"]),p=Ln(m,{bg:qt(["#1a1a1a","#3b1414","#14283b","#2b2b10","#102b1a"]),fg:qt(["#ffd27a","#ffffff","#ffb0b0","#b0e0ff"]),glow:!0,border:!1,w:512,h:96});u.add(ue(f-1,.75,.08,f-1,.75),p,x,a+4.2,h/2+.36)}}downtown(t){let e=(Se-Fn*2)/2-.5,n=mt(-6,6),s=mt(-6,6),r=2,o=[[-e,n-r/2,-e,s-r/2,"s","w"],[n+r/2,e,-e,s-r/2,"s","e"],[-e,n-r/2,s+r/2,e,"n","w"],[n+r/2,e,s+r/2,e,"n","e"]];for(let[a,c,l,h,u,d]of o){let f=c-a,g=h-l;this.building(t,(a+c)/2,(l+h)/2,f,g,Math.floor(mt(5,15)),qt(["brick","concrete","office","office","apartment","plaster"]),{storefronts:[u,d],tower:Pt()<.5})}}mixed(t){let e=this.M,n=(Se-Fn*2)/2-.5,s=3,r=(n*2-4)/s;for(let o=0;o<s;o++){let a=-n+r/2+o*(r+2);this.building(t,a,-n+7,r,14,Math.floor(mt(2,5)),qt(["brick","plaster","concrete","apartment"]),{storefronts:["s"]})}this.parkingLot(t,0,9,n*2-2,18,0),t.add(Ee(n*2,6,4),e.grass,0,lt+.01,-n+17);for(let o=0;o<5;o++)this.trees.push([t.x-n+4+o*12,t.z-n+17,mt(.8,1.1)])}parkingLot(t,e,n,s,r,o){let a=this.M,c=new We(...t.pt(e,n),o,t.B,this.world);c.add(Ee(s,r,3,5.5),a.parking,0,lt+.008,0,Math.PI/2);let l=Math.floor(s/3);for(let h of[-1,1])for(let u=0;u<l;u++){if(Pt()<.62)continue;let d=-s/2+1.5+u*3,[f,g]=c.pt(d,h*(r/2-2.9));this.parkedCars.push({x:f,z:g,heading:o+(h>0?Math.PI:0)+(Pt()<.15?Math.PI:0),type:qt(["sedan","hatch","suv","pickup","sedan","hatch","taxi"])})}for(let h of[-1,1])c.add(tn(.08,.1,7,8),a.metalDark,h*s/4,lt+3.5,0),c.add(ue(1.6,.15,.4),a.metalDark,h*s/4,lt+7,0),c.add(ue(1.4,.05,.3),a.lamp,h*s/4,lt+6.92,0),t.B.add(Ee(14,14),a.pool,c.m(h*s/4,lt+.03,0)),c.collide(h*s/4,0,0,.3,7,.3)}shopsBlock(t,e){let n=this.M,s=(Se-Fn*2)/2,r=e.length,o=(s*2-2)/r,a=13,c=4.2;for(let l=0;l<r;l++){let h=-s+1+o*(l+.5);this.shop(t,h,-s+a/2+.5,o-.6,a,c,e[l],Math.PI)}this.parkingLot(t,0,10,s*2-2,18,0),this.trees.push([t.x-s+2,t.z+s-2,1],[t.x+s-2,t.z+s-2,1.1])}shop(t,e,n,s,r,o,a,c){let l=this.M,h=lt,u=.25,d=new We(...t.pt(e,n),c,t.B,this.world),f=qt([l.facade.plaster,l.facade.brick,l.facade.concrete]);d.add(Ee(s,r,2),l.interiorFloor,0,h+.02,0),d.box(l.concrete,0,h+o,0,s+.2,.4,r+.2,!0,2),d.add(Ee(s-.5,r-.5,4),l.interior,0,h+o-.01,0,0,Math.PI);for(let A=-1;A<=1;A+=2)d.add(ue(s*.5,.05,.4),l.ceilingLight,0,h+o-.05,A*r/4);d.box(f,0,h,-r/2+u/2,s,o,u,!0,24,25.6),d.box(l.interior,0,h,-r/2+u+.01,s-.6,o-.1,.02,!1);for(let A of[-1,1])d.box(f,A*(s/2-u/2),h,0,u,o,r,!0,24,25.6),d.box(l.interior,A*(s/2-u-.01),h,0,.02,o-.1,r-.6,!1);let g=1.8,x=(s-g)/2;for(let A of[-1,1]){let R=A*(g/2+x/2);d.box(l.darkTrim,R,h,r/2-.1,x,.6,.2,!1),d.add(ue(x,o-1.2,.04),l.glass,R,h+.6+(o-1.2)/2,r/2-.1),d.collide(R,0,r/2-.1,x,o,.3),d.box(l.darkTrim,A*(g/2),h,r/2-.1,.12,o,.22,!1)}d.box(l.darkTrim,0,h+o-.6,r/2-.1,s,.6,.22,!1);let m=Ln(a,{bg:qt(["#7a1616","#123a6a","#1d4a26","#3b2b12","#222"]),fg:"#fff",glow:!0,w:512,h:96});d.add(ue(s-.6,.9,.1,s-.6,.9),m,0,h+o+.65,r/2+.05),d.add(ue(s-.4,.08,1.4),qt(l.awning),0,h+o-.75,r/2+.7,0,.25),d.box(l.woodDark,-s/4,h,-r/2+3,s/2,1.05,.8,!0,1),d.box(l.metalLight,-s/4,h+1.05,-r/2+3,s/2+.1,.05,.9,!1),d.box(l.metalDark,-s/4-.6,h+1.1,-r/2+3,.4,.3,.3,!1);for(let A=0;A<2;A++){let R=s/4+.4,S=-r/2+4.5+A*3.2,y=s/2-1.8;d.box(l.wood,R,h,S,y,1.8,.5,!0,1);for(let C=0;C<3;C++)for(let L=0;L<6;L++)d.add(ue(.25,.3,.25),qt([l.red,l.blue,l.green,l.yellow,l.white]),R-y/2+.3+L*((y-.6)/5),h+.35+C*.6,S+.26)}d.box(l.wood,0,h,-r/2+.55,s-1,2.2,.5,!1,1);let[p,M]=d.pt(-s/4,-r/2+1.9);this.shopkeepers.push({x:p,z:M,heading:c,shop:a});let[v,_]=d.pt(0,r/2+1),[I,E]=d.pt(0,0);this.landmarks.push({name:a,x:v,z:_,kind:"shop",inside:[I,E]})}policeBlock(t){let e=this.M,n=(Se-Fn*2)/2,s=new We(t.x,t.z,0,t.B,this.world),r=34,o=16,a=7.4,c=n-o/2-6;s.box(e.facade.concrete,0,lt,c,r,a,o,!0,24,25.6),s.box(e.blue,0,lt+3.2,c+o/2+.02,r,.5,.05,!1),s.box(e.concrete,0,lt+a,c,r+.6,.5,o+.6,!1),s.box(e.concrete,0,lt,c+o/2+2,10,.3,4,!1),s.box(e.concrete,0,lt+4.2,c+o/2+2,10.4,.4,4.2,!1);for(let h of[-4.5,-1.6,1.6,4.5])s.box(e.white,h,lt+.3,c+o/2+3.7,.5,3.9,.5,!0);s.box(e.glass,0,lt+.3,c+o/2+.05,3,2.8,.05,!1),s.box(Ln("DELEGACIA DE POL\xCDCIA",{bg:"#0e2a5c",fg:"#fff",glow:!0,w:1024,h:128}),0,lt+4.7,c+o/2+4.12,9,.9,.08,!1,9,.9),s.box(Ln("LOS VALLES",{bg:"#0e2a5c",fg:"#ffd27a",glow:!0,w:512,h:96}),0,lt+5.8,c+o/2+.06,6,.9,.08,!1,6,.9),s.add(tn(.06,.08,9,8),e.metalLight,r/2+3,lt+4.5,c+o/2+5),s.add(new yi(1.8,1.1),e.flag,r/2+3.95,lt+8.3,c+o/2+5),s.collide(r/2+3,0,c+o/2+5,.3,9,.3),this.landmarks.push({name:"Delegacia de Los Valles",x:t.x,z:t.z+c+o/2+6,kind:"police"}),this.policeSpot={x:t.x-3,z:t.z+c+o/2+7};let l=this.parkedCars.length;this.parkingLot(t,0,-10,n*2-2,16,0),this.parkedCars.slice(l,l+4).forEach(h=>{h.type="police"});for(let h=0;h<4;h++)this.npcs.push({kind:"police",x:t.x+mt(-12,12),z:t.z+c+o/2+mt(5,9)})}gasBlock(t){let e=this.M,n=(Se-Fn*2)/2,s=new We(t.x,t.z,0,t.B,this.world),r=-6;s.box(e.white,0,lt+5,r,22,.8,12,!1),s.box(e.red,0,lt+5.4,r,22.2,.3,12.2,!1),s.add(ue(20,.05,10),e.ceilingLight,0,lt+4.98,r),t.B.add(Ee(24,16),e.pool,s.m(0,lt+.03,r));for(let o of[-7,0,7]){s.box(e.white,o,lt,r,.6,5,.6,!0);for(let a of[-1,1])s.box(e.concrete,o,lt,r+a*2.5,1.2,.25,3,!1),s.box(e.red,o,lt+.25,r+a*2.5,.8,1.7,.5,!0),s.box(e.darkTrim,o,lt+1.4,r+a*2.5+a*.26,.5,.35,.02,!1)}this.shop(t,0,16,18,12,4.2,"Conveni\xEAncia Posto Valles",Math.PI),s.add(tn(.2,.25,8,8),e.metal,-n+3,lt+4,-n+3),s.box(Ln("POSTO VALLES",{bg:"#b02020",fg:"#fff",glow:!0,w:512,h:128}),-n+3,lt+7,-n+3,3.2,1.6,.4,!1,3.2,1.6),s.box(Ln("GASOLINA  5,89",{bg:"#111",fg:"#ffcc33",glow:!0,w:512,h:96}),-n+3,lt+5.6,-n+3,3.2,.9,.42,!1,3.2,.9),s.collide(-n+3,0,-n+3,.5,8,.5),this.parkedCars.push({x:t.x+3.5,z:t.z+r+2.5,heading:Math.PI/2,type:"hatch"}),this.landmarks.push({name:"Posto Valles",x:t.x,z:t.z+r,kind:"gas"});for(let o=0;o<6;o++)this.trees.push([t.x+n-3,t.z-n+4+o*9,mt(.8,1.1)])}parkingBlock(t){let e=this.M,n=(Se-Fn*2)/2;this.parkingLot(t,0,-13,n*2-2,26,0),this.parkingLot(t,0,14,n*2-2,24,0);let s=new We(t.x,t.z,0,t.B,this.world);s.box(e.facade.plaster,n-3,lt,0,3,2.6,2.5,!0,24,25.6),s.box(e.red,n-3,lt+2.6,0,3.4,.2,2.9,!1),s.box(Ln("ESTACIONAMENTO",{bg:"#1b3d6e",glow:!0}),n-3,lt+3.2,1.3,3,.6,.05,!1,3,.6),this.landmarks.push({name:"Estacionamento Central",x:t.x,z:t.z,kind:"parking"})}apartBlock(t){let e=this.M,n=(Se-Fn*2)/2-1;this.building(t,-n+9,0,16,n*2-6,Math.floor(mt(5,8)),"apartment",{storefronts:["w"]}),this.building(t,n-9,-n/2-1,16,n-4,Math.floor(mt(4,7)),qt(["brick","plaster"]),{storefronts:["e","s"]}),this.building(t,n-9,n/2+1,16,n-4,Math.floor(mt(4,7)),qt(["brick","apartment"]),{storefronts:["e","n"]});let s=new We(t.x,t.z,0,t.B,this.world);for(let r=0;r<3;r++)this.trees.push([t.x+1,t.z-16+r*16,mt(.9,1.2)]);for(let r=0;r<2;r++)this.bench(s,-2.5,-8+r*16,Math.PI/2)}bench(t,e,n,s){let r=this.M,o=new We(...t.pt(e,n),s,t.B,this.world);o.box(r.wood,0,lt+.42,0,1.8,.06,.45,!1,1),o.box(r.wood,0,lt+.65,-.22,1.8,.4,.05,!1,1);for(let a of[-.8,.8])o.box(r.metalDark,a,lt,0,.06,.45,.45,!1);o.collide(0,0,0,1.9,.9,.6)}parkBlock(t){let e=this.M,n=(Se-Fn*2)/2,s=new We(t.x,t.z,0,t.B,this.world);s.add(Ee(3,n*2,3),e.dirt,0,lt+.012,0),s.add(Ee(n*2,3,3),e.dirt,0,lt+.012,0),s.add(tn(4,4.2,.6,24),e.concrete,0,lt+.3,0),s.add(tn(3.7,3.7,.05,24),e.water,0,lt+.52,0),s.add(tn(.4,.6,1.8,10),e.concrete,0,lt+.9,0),s.add(tn(1.2,.8,.25,14),e.concrete,0,lt+1.8,0),this.world.addCentered(t.x,0,t.z,8.2,.75,8.2);for(let[r,o,a]of[[8,4,0],[-8,-4,Math.PI],[4,-8,-Math.PI/2],[-4,8,Math.PI/2],[12,-4,0],[-12,4,Math.PI]])this.bench(s,r,o,a);for(let r=0;r<26;r++){let o=mt(-n+2,n-2),a=mt(-n+2,n-2);Math.abs(o)<3.5||Math.abs(a)<3.5||Math.hypot(o,a)<7||this.trees.push([t.x+o,t.z+a,mt(.9,1.6)])}for(let r of[-1,1])s.box(e.hedge,r*(n-.6),lt,-n/2-2,.9,1,n-6,!0,1),s.box(e.hedge,r*(n-.6),lt,n/2+2,.9,1,n-6,!0,1);for(let[r,o]of[[2.5,14],[-2.5,-14],[14,-2.5],[-14,2.5]])s.add(tn(.06,.08,3.8,8),e.metalDark,r,lt+1.9,o),s.add(new un(.28,10,8),e.lamp,r,lt+3.9,o),t.B.add(Ee(7,7),e.pool,s.m(r,lt+.03,o)),s.collide(r,0,o,.25,4,.25);this.landmarks.push({name:"Pra\xE7a",x:t.x,z:t.z,kind:"park"})}buildStreetParking(){for(let t=0;t<=ae;t++)for(let e=0;e<ae;e++){let n=ni(e);for(let s=-2;s<=2;s++){let r=n+s*9+mt(-1,1);for(let o of[-1,1]){if(Pt()<.82)continue;let a=o<0?0:Math.PI;(t>0&&t<ae||t===0&&o>0||t===ae&&o<0)&&this.parkedCars.push({x:ve(t)+o*ed,z:r,heading:a,type:qt(["sedan","hatch","suv","sedan","pickup","taxi"])})}for(let o of[-1,1]){if(Pt()<.84)continue;let a=o>0?Math.PI/2:-Math.PI/2;(t>0&&t<ae||t===0&&o>0||t===ae&&o<0)&&this.parkedCars.push({x:r,z:ve(t)+o*ed,heading:a,type:qt(["sedan","hatch","suv","sedan","pickup"])})}}}}buildOutskirts(){let t=this.M,e=new Hi,n=pn,s=420;for(let[a,c,l,h]of[[0,(n+s)/2,2*s,s-n],[0,-(n+s)/2,2*s,s-n],[(n+s)/2,0,s-n,2*n],[-(n+s)/2,0,s-n,2*n]])e.add(Ee(l,h,4),t.grass,Fe(a,lt,c));let r=new Cn({color:4086316,flatShading:!0});r.userData.castShadow=!1;for(let a=0;a<26;a++){let c=a/26*Math.PI*2+mt(-.1,.1),l=mt(255,300),h=new Eo(mt(40,80),mt(25,70),7,1);e.add(h,r,Fe(Math.cos(c)*l,0,Math.sin(c)*l))}e.flush(this.root);for(let a=0;a<260;a++){let c=Pt()*Math.PI*2,l=mt(n+12,n+90);this.trees.push([Math.cos(c)*l,Math.sin(c)*l,mt(1,1.8)])}let o=n+60;this.world.addBox(-o-2,0,-o,-o,50,o),this.world.addBox(o,0,-o,o+2,50,o),this.world.addBox(-o,0,-o-2,o,50,-o),this.world.addBox(-o,0,o,o,50,o+2)}buildTrees(){let t=this.trees.length,e=new Ve(.14,.22,3,6);e.translate(0,1.5,0);let n=new ir(1,1),s=new Js(e,this.M.bark,t),r=new Cn({flatShading:!0}),o=new Js(n,r,t*3),a=new Gt,c=new Ot,l=0;this.trees.forEach(([h,u,d],f)=>{let g=id(h,u);a.compose(new D(h,g,u),new He,new D(d,d*mt(.9,1.3),d)),s.setMatrixAt(f,a);for(let x=0;x<3;x++){let m=mt(-.8,.8)*d,p=mt(-.8,.8)*d,M=(2.8+x*.9+mt(-.3,.3))*d,v=d*mt(1.3,2)*(x===2?.75:1);a.compose(new D(h+m,g+M,u+p),new He().setFromEuler(new Ie(Pt(),Pt(),Pt())),new D(v,v*.85,v)),o.setMatrixAt(l,a),c.setHSL(mt(.22,.32),mt(.35,.55),mt(.2,.32)),o.setColorAt(l,c),l++}this.world.addCentered(h,0,u,.5*d,3,.5*d)}),s.castShadow=!0,o.castShadow=!0,o.receiveShadow=!0,this.scene.add(s,o)}};var ii=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n)),T_={sedan:{L:4.6,W:1.82,wheelBase:2.75,wr:.34,belt:.95,roof:1.43,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:46,accel:7.5,name:"Sedan"},hatch:{L:4,W:1.75,wheelBase:2.5,wr:.32,belt:.93,roof:1.47,ws:[.85,.05],rw:[-1.45,-1.85],maxSpeed:42,accel:7,name:"Hatch"},suv:{L:4.75,W:1.95,wheelBase:2.85,wr:.4,belt:1.1,roof:1.75,ws:[1.15,.35],rw:[-1.95,-2.2],maxSpeed:40,accel:6.5,name:"SUV"},pickup:{L:5.2,W:1.95,wheelBase:3.15,wr:.4,belt:1.08,roof:1.78,ws:[1.45,.75],rw:[-.35,-.45],maxSpeed:39,accel:6.2,bed:!0,name:"Picape"},police:{L:4.7,W:1.85,wheelBase:2.8,wr:.35,belt:.97,roof:1.45,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:52,accel:9,police:!0,name:"Viatura"},taxi:{L:4.6,W:1.82,wheelBase:2.75,wr:.34,belt:.95,roof:1.43,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:44,accel:7.2,taxi:!0,name:"T\xE1xi"}},cd=[9313051,1916786,14277081,1710618,4147794,7040883,3037754,10254892,15921906,5906237,2575198,11688479],sd=new vi({vertexColors:!0,shininess:70,specular:5592405}),A_=new vi({color:1713456,transparent:!0,opacity:.42,shininess:120,specular:11184810,depthWrite:!1}),rd=new Cn({vertexColors:!0}),Cl=new hn({color:16774872}),Il=new hn({color:6949386}),R_=new hn({color:16719904}),Wo=[new hn({color:3342336}),new hn({color:51})];function Yt(i,t,e){let n=i.index?i.toNonIndexed():i;n===i&&(n=i.clone());for(let s of Object.keys(n.attributes))["position","normal"].includes(s)||n.deleteAttribute(s);return n.attributes.normal||n.computeVertexNormals(),e&&n.applyMatrix4(e),or(n,t),n}var jt=(i,t,e,n=0,s=0,r=0,o=1,a=1,c=1)=>new Gt().compose(new D(i,t,e),new He().setFromEuler(new Ie(n,s,r,"YXZ")),new D(o,a,c)),Rl=new Map;function C_(i){if(Rl.has(i))return Rl.get(i);let t=[],e=.24;t.push(Yt(new Ve(i,i,e,18),1447446,jt(0,0,0,0,0,Math.PI/2))),t.push(Yt(new Fi(i*.86,i*.14,4,14),2039583,jt(e/2-.02,0,0,0,Math.PI/2,0))),t.push(Yt(new Ve(i*.62,i*.62,e+.02,16),11120050,jt(0,0,0,0,0,Math.PI/2))),t.push(Yt(new Ve(i*.15,i*.15,e+.05,8),7040626,jt(0,0,0,0,0,Math.PI/2)));for(let s=0;s<5;s++){let r=s/5*Math.PI*2;t.push(Yt(new Ht(.03,i*.95,.07),13685718,jt(e/2+.012,0,0,r,0,0)))}let n=Pn(t);return Rl.set(i,n),n}function od(i,t,e=.05){let n=new js;n.moveTo(i[0][0],i[0][1]);for(let r=1;r<i.length;r++){let o=i[r];o.arc?n.absarc(o.arc[0],o.arc[1],o.arc[2],Math.PI,0,!0):n.lineTo(o[0],o[1])}let s=new To(n,{depth:t-e*2,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:2,curveSegments:8});return s.rotateY(-Math.PI/2),s.translate(t/2-e,0,0),s}var I_=0,Xo=class{constructor(t="sedan",e=9313051,n){this.id=I_++,this.type=t;let s=this.T=T_[t];this.world=n,s.police&&(e=16053492),s.taxi&&(e=15254042),this.color=e,this.group=new $e,this.body=new $e,this.group.add(this.body),this.build(e),this.x=0,this.z=0,this.y=0,this.heading=0,this.speed=0,this.lat=0,this.steer=0,this.yawRate=0,this.pushVx=0,this.pushVz=0,this.pitch=0,this.roll=0,this.wheelSpin=0,this.collidable=!0,this.height=s.roof,this.driver=null,this.braking=!1,this.lastHit=0,this.engineOn=!1}build(t){let e=this.T,n=e.L,s=e.W,r=n/2,o=e.wheelBase/2,a=e.wr,c=a*.75,l=e.belt,h=new Ot(t).multiplyScalar(.75).getHex(),u=[],d=a+.08,f=[[-r+.05,c+.05],[-o-d,c],{arc:[-o,a,d]},[o-d,c],{arc:[o,a,d]},[r-.08,c],[r,c+.15],[r+.02,l-.28],[r-.12,l-.16],[e.ws[0]+.1,l]];e.bed?f.push([e.rw[0]-.05,l],[-r+.02,l],[-r,c+.1]):f.push([e.rw[1]-.05,l],[-r+.18,l-.05],[-r+.02,l-.2],[-r,c+.15]),u.push(Yt(od(f,s,.06),t));let g=[[e.ws[0],l-.01],[e.ws[1],e.roof],[e.rw[0],e.roof],[e.rw[1],l-.01]],x=od(g,s-.16,0),m=e.ws[1]-e.rw[0];u.push(Yt(new Ht(s-.12,.06,m+.08),t,jt(0,e.roof+.02,(e.ws[1]+e.rw[0])/2)));let p=(L,U,O,H,z)=>{let Q=Math.hypot(O-L,H-U),G=Math.atan2(O-L,H-U);for(let st of[-1,1])u.push(Yt(new Ht(.07,Q,.09),t,jt(st*z,(U+H)/2,(L+O)/2,G,0,0)))};p(e.ws[0],l,e.ws[1],e.roof,s/2-.1),p(e.rw[1],l,e.rw[0],e.roof,s/2-.1);let M=(e.bed,(e.ws[1]+e.rw[0])/2-.1);p(M,l,M,e.roof,s/2-.09),u.push(Yt(new Ht(s+.04,.2,.16),2105892,jt(0,c+.14,r-.02))),u.push(Yt(new Ht(s+.04,.2,.16),2105892,jt(0,c+.14,-r+.02))),u.push(Yt(new Ht(s*.5,.14,.04),1052688,jt(0,l-.3,r+.015)));for(let L=0;L<4;L++)u.push(Yt(new Ht(s*.48,.012,.05),7829367,jt(0,l-.35+L*.035,r+.02)));for(let L of[-1,1])u.push(Yt(new Ht(.03,.06,n*.78),h,jt(L*(s/2+.005),c+.2,0))),u.push(Yt(new Ht(.02,l-c-.1,.015),1118481,jt(L*(s/2+.008),(l+c)/2,e.ws[0]-.05))),u.push(Yt(new Ht(.02,l-c-.1,.015),1118481,jt(L*(s/2+.008),(l+c)/2,M))),!e.bed&&e.rw[1]<-1.5&&u.push(Yt(new Ht(.02,l-c-.12,.015),1118481,jt(L*(s/2+.008),(l+c)/2,e.rw[1]+.15))),u.push(Yt(new Ht(.03,.03,.14),12303291,jt(L*(s/2+.02),l-.1,M+.25))),u.push(Yt(new Ht(.03,.03,.14),12303291,jt(L*(s/2+.02),l-.1,M-.65))),u.push(Yt(new Ht(.2,.12,.1),t,jt(L*(s/2+.08),l+.06,e.ws[0]-.15))),u.push(Yt(new Ht(.02,.09,.07),11057352,jt(L*(s/2+.08),l+.06,e.ws[0]-.205)));u.push(Yt(new Ht(.5,.13,.02),15658734,jt(0,c+.22,-r-.07))),u.push(Yt(new Ht(.5,.13,.02),15658734,jt(0,c+.22,r+.07)));let v=2763310,_=1973792;for(let L of[.38,-.38])u.push(Yt(new Ht(.48,.14,.5),v,jt(L,c+.12,-.12))),u.push(Yt(new Ht(.48,.62,.12),v,jt(L,c+.48,-.42,-.15,0,0))),u.push(Yt(new Ht(.26,.18,.1),v,jt(L,c+.88,-.48,-.1,0,0)));if(!e.bed&&e.rw[1]<-1.5&&(u.push(Yt(new Ht(s-.3,.16,.5),v,jt(0,c+.14,-1))),u.push(Yt(new Ht(s-.3,.55,.12),v,jt(0,c+.45,-1.28,-.15,0,0)))),u.push(Yt(new Ht(s-.2,.22,.4),_,jt(0,l-.05,e.ws[0]-.28))),u.push(Yt(new Ht(.3,.1,.02),3828378,jt(.38,l+.03,e.ws[0]-.49))),u.push(Yt(new Ht(.2,.3,.5),_,jt(0,c+.35,.25))),u.push(Yt(new Ht(s-.1,.05,n*.6),1381653,jt(0,c+.18,-.1))),e.bed){let L=e.rw[0]+r-.05;u.push(Yt(new Ht(s-.1,.05,L),2236962,jt(0,l-.35,-r+L/2+.05))),u.push(Yt(new Ht(.06,.08,L),t,jt(s/2-.05,l+.02,-r+L/2+.05))),u.push(Yt(new Ht(.06,.08,L),t,jt(-s/2+.05,l+.02,-r+L/2+.05)))}if(e.police){for(let L of[-1,1])u.push(Yt(new Ht(.02,.3,e.L*.45),1120819,jt(L*(s/2+.012),l-.25,-.2))),u.push(Yt(new Ht(.022,.08,e.L*.45),13938487,jt(L*(s/2+.014),l-.07,-.2)));u.push(Yt(new Ht(.9,.05,.25),2236962,jt(0,e.roof+.07,-.35)))}e.taxi&&u.push(Yt(new Ht(.55,.16,.22),16053492,jt(0,e.roof+.12,-.4)));let I=Pn(u);this._lodParts=[I];let E=new fe(I,sd);E.castShadow=!0,E.receiveShadow=!0,this.body.add(E);let A=new fe(x,A_);A.renderOrder=2,this.body.add(A);let R=[];for(let L of[-1,1])R.push(new Ht(.34,.12,.05).translate(L*(s/2-.28),l-.24,r+.005));this.body.add(new fe(Pn(R),Cl));let S=[];for(let L of[-1,1])S.push(new Ht(.36,.13,.05).translate(L*(s/2-.25),e.bed?l-.15:l-.2,-r-.005));this.tail=new fe(Pn(S),Il),this.body.add(this.tail),e.police&&(this.sirenL=new fe(new Ht(.4,.1,.22),Wo[0]),this.sirenR=new fe(new Ht(.4,.1,.22),Wo[1]),this.sirenL.position.set(.22,e.roof+.14,-.35),this.sirenR.position.set(-.22,e.roof+.14,-.35),this.body.add(this.sirenL,this.sirenR)),this.steeringWheel=new $e,this.steeringWheel.add(new fe(Pn([Yt(new Fi(.17,.022,6,16),1118481),Yt(new Ht(.3,.03,.02),2236962)]),rd)),this.steeringWheel.position.set(.38,l+.05,e.ws[0]-.55),this.steeringWheel.rotation.x=-.45,this.steeringWheel.rotation.order="YXZ",this.body.add(this.steeringWheel),this.wheels=[];let y=C_(a);for(let[L,U]of[[1,1],[-1,1],[1,-1],[-1,-1]]){let O=new $e;O.position.set(L*(s/2-.14),a,U*o);let H=new fe(y,rd);H.castShadow=!0,L<0&&(H.rotation.y=Math.PI);let z=new $e;z.add(H),O.add(z),this.group.add(O),this.wheels.push({pivot:O,holder:z,front:U>0,sx:L,sz:U})}let C=[this._lodParts[0].clone()];for(let L of R)C.push(Yt(L,16773312));C.push(Yt(x,1844784));for(let L of S)C.push(Yt(L,7999504));for(let L of this.wheels){let U=new Gt().makeTranslation(L.pivot.position.x,L.pivot.position.y,L.pivot.position.z);L.sx<0&&U.multiply(new Gt().makeRotationY(Math.PI)),C.push(y.clone().applyMatrix4(U))}this.lodMesh=new fe(Pn(C),sd),this.lodMesh.visible=!1,this.group.add(this.lodMesh),this.detail=[E,this.tail,this.steeringWheel,...this.body.children.filter(L=>L.material===Cl),...this.wheels.map(L=>L.pivot)],this.sirenL&&this.detail.push(this.sirenL,this.sirenR),this.glassMesh=A,this.lod=!1,this._lodParts=null,this.seat=new D(.38,c-.37,-.1)}setLOD(t){if(t!==this.lod){this.lod=t;for(let e of this.detail)e.visible=!t;this.lodMesh.visible=t,this.glassMesh.visible=!t,t&&this.body.rotation.set(0,0,0)}}place(t,e,n){this.x=t,this.z=e,this.heading=n,this.y=this.world.groundFn(t,e),this.syncTransform(0)}get forward(){return[Math.sin(this.heading),Math.cos(this.heading)]}get right(){return[-Math.cos(this.heading),Math.sin(this.heading)]}get velX(){return Math.sin(this.heading)*this.speed-Math.cos(this.heading)*this.lat+this.pushVx}get velZ(){return Math.cos(this.heading)*this.speed+Math.sin(this.heading)*this.lat+this.pushVz}get kmh(){return Math.abs(this.speed)*3.6}local(t,e){let n=Math.sin(this.heading),s=Math.cos(this.heading);return[this.x+t*s+e*n,this.z-t*n+e*s]}doorPos(t=1){return this.local(t*(this.T.W/2+.75),-.1)}pushCircleOut(t,e,n,s,r){if(s>this.y+this.height||r<this.y+.1)return null;let o=t-this.x,a=e-this.z;if(o*o+a*a>(this.T.L/2+n+.5)**2)return null;let c=Math.sin(this.heading),l=Math.cos(this.heading),h=o*l-a*c,u=o*c+a*l,d=this.T.W/2,f=this.T.L/2,g=Math.max(-d,Math.min(h,d)),x=Math.max(-f,Math.min(u,f)),m=h-g,p=u-x,M=Math.hypot(m,p),v,_;if(M>1e-6){if(M>=n)return null;m/=M,p/=M,v=g+m*n,_=x+p*n}else{let S=d-Math.abs(h),y=f-Math.abs(u);S<y?(m=Math.sign(h)||1,p=0,v=m*(d+n),_=u):(p=Math.sign(u)||1,m=0,v=h,_=p*(f+n))}let I=this.x+v*l+_*c,E=this.z-v*c+_*l,A=m*l+p*c,R=-m*c+p*l;return{x:I,z:E,nx:A,nz:R}}rayHit(t,e,n,s,r,o,a){let c=t-this.x,l=n-this.z;if(c*c+l*l>(a+4)**2)return 1/0;let h=Math.sin(this.heading),u=Math.cos(this.heading),d=[c*u-l*h,e-this.y,c*h+l*u],f=[s*u-o*h,r,s*h+o*u],g=[-this.T.W/2,.1,-this.T.L/2],x=[this.T.W/2,this.T.roof,this.T.L/2],m=0,p=a;for(let M=0;M<3;M++){if(Math.abs(f[M])<1e-9){if(d[M]<g[M]||d[M]>x[M])return 1/0;continue}let v=(g[M]-d[M])/f[M],_=(x[M]-d[M])/f[M];if(v>_){let I=v;v=_,_=I}if(m=Math.max(m,v),p=Math.min(p,_),m>p)return 1/0}return m}update(t,e,n){let s=this.T,r=e||{throttle:0,brake:0,steer:0,handbrake:0},o=this.speed,a=0;r.throttle>0&&(o<-.5?a=14*r.throttle:a=s.accel*r.throttle*(1-Math.min(1,Math.max(0,o)/s.maxSpeed)**2)),r.brake>0&&(o>.5?a-=14*r.brake:a-=4.5*r.brake*(o>-8?1:0)),this.braking=r.brake>0&&o>.5||r.handbrake>0,this.speed+=a*t;let c=.0025*this.speed*Math.abs(this.speed)+(r.throttle||r.brake?.15:1.2)*Math.sign(this.speed);Math.abs(this.speed)<Math.abs(c*t)&&!r.throttle&&!r.brake?this.speed=0:this.speed-=c*t,r.handbrake&&(this.speed=ii(this.speed,0,1.6,t));let l=.62/(1+Math.abs(this.speed)*.07);this.steer=ii(this.steer,(r.steer||0)*l,7,t);let h=this.speed*Math.tan(this.steer)/s.wheelBase,u=(r.handbrake?20:13)/Math.max(4,Math.abs(this.speed));h=Math.max(-u,Math.min(u,h));let d=r.handbrake?2.2:9;this.yawRate=ii(this.yawRate,h*(r.handbrake?1.25:1),d,t),this.heading+=this.yawRate*t,this.lat+=-this.yawRate*this.speed*(r.handbrake?.12:.035)*t*10,this.lat=ii(this.lat,0,d*.8,t),this.pushVx=ii(this.pushVx,0,3,t),this.pushVz=ii(this.pushVz,0,3,t),this.x+=this.velX*t,this.z+=this.velZ*t,this.resolveCollisions(n),this.syncTransform(t)}updatePassive(t){return Math.abs(this.pushVx)+Math.abs(this.pushVz)+Math.abs(this.speed)<.02?!1:(this.speed=ii(this.speed,0,2,t),this.pushVx=ii(this.pushVx,0,3,t),this.pushVz=ii(this.pushVz,0,3,t),this.x+=this.velX*t,this.z+=this.velZ*t,this.resolveCollisions(null),this.syncTransform(t),!0)}resolveCollisions(t){let e=this.T,n=e.W/2,s=null,r=Math.max(2,Math.round(e.L/e.W));for(let o=0;o<r;o++){let a=-e.L/2+n+o/(r-1)*(e.L-2*n),[c,l]=this.local(0,a),h=this.world.resolveCircle(c,l,n,this.y+.3,this.y+1.4,0,this,!0);h.hit&&(this.x+=h.x-c,this.z+=h.z-l,s=[h.nx,h.nz])}if(s){let[o,a]=this.forward,c=this.velX,l=this.velZ,h=c*s[0]+l*s[1],u=o*s[0]+a*s[1],d=Math.max(0,-h);if(this.speed*=1-Math.min(.85,Math.abs(u)*.9+.05),Math.abs(u)>.6&&d>2&&(this.speed=-Math.sign(this.speed||1)*d*.15),this.lastHit=d,t)for(let f of t){if(f===this)continue;let g=f.x-this.x,x=f.z-this.z,m=Math.hypot(g,x);m<(e.L+f.T.L)/2+.3&&m>.01&&(f.pushVx+=g/m*d*.4,f.pushVz+=x/m*d*.4,f.awake=!0)}}else this.lastHit=0}syncTransform(t){var E;let e=this.T,n=this.world.groundFn,s=e.wheelBase/2,r=e.W/2-.14,[o,a]=this.local(0,s),[c,l]=this.local(0,-s),[h,u]=this.local(r,0),[d,f]=this.local(-r,0),g=n(o,a),x=n(c,l),m=n(h,u),p=n(d,f),M=(g+x+m+p)/4,v=t>0?1-Math.exp(-12*t):1;this.y+=(M-this.y)*v;let _=Math.atan2(x-g,e.wheelBase)-(t>0?Be.clamp((this.speed-((E=this._lastSpeed)!=null?E:this.speed))/t*.004,-.04,.04):0),I=Math.atan2(m-p,e.W)+Be.clamp(this.yawRate*this.speed*.006,-.06,.06);this._lastSpeed=this.speed,this.pitch+=(_-this.pitch)*v,this.roll+=(I-this.roll)*v,this.group.position.set(this.x,this.y,this.z),this.group.rotation.set(0,this.heading,0),this.body.rotation.set(this.pitch,0,this.roll),this.wheelSpin+=this.speed/e.wr*t;for(let A of this.wheels)A.pivot.rotation.y=A.front?this.steer:0,A.holder.rotation.x=this.wheelSpin;this.steeringWheel.rotation.z=-this.steer*3,this.tail.material=this.braking?R_:Il}},ad=0;function ld(i){ad+=i;let t=Math.floor(ad*4)%2===0;Wo[0].color.setHex(t?16718362:3342336),Wo[1].color.setHex(t?51:2245887)}function hd(i){Cl.color.setHex(i?16774872:13158592),Il.color.setHex(i?10096656:5900810)}var P_=new Cn({vertexColors:!0});function L_(i,t,e,n){let s=i.index?i.toNonIndexed():i;s===i&&(s=i.clone());for(let c of Object.keys(s.attributes))["position","normal"].includes(c)||s.deleteAttribute(c);s.applyMatrix4(e),or(s,t);let r=s.attributes.position.count,o=new Uint16Array(r*4),a=new Float32Array(r*4);for(let c=0;c<r;c++)o[c*4]=n,a[c*4]=1;return s.setAttribute("skinIndex",new Ae(o,4)),s.setAttribute("skinWeight",new Ae(a,4)),s}var D_=(i=0,t=0,e=0,n=1,s=1,r=1,o=0,a=0,c=0)=>new Gt().compose(new D(i,t,e),new He().setFromEuler(new Ie(o,a,c)),new D(n,s,r)),hr=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n)),U_={skin:13011556,hair:2825492,shirt:3426654,pants:2895672,shoes:1907997,jacket:null,hairStyle:"short",height:1,build:1,hat:null,beard:!1,badge:!1,tie:null},ws=class{constructor(t={}){var Q,G,st,ct;this.look={...U_,...t};let e=this.look;this.root=new $e,this.root.name="humanoid",this.bones={};let n=(et,Et,Vt,X,tt)=>{let dt=new Ys;return dt.name=et,dt.position.set(Vt,X,tt),Et&&Et.add(dt),this.bones[et]=dt,dt},s=e.build,r=n("hips",null,0,.98,0),o=n("spine",r,0,.12,0),a=n("chest",o,0,.22,0),c=n("neck",a,0,.24,0),l=n("head",c,0,.08,0),h=n("shoulderL",a,.19*s,.18,0),u=n("shoulderR",a,-.19*s,.18,0),d=n("elbowL",h,0,-.29,0),f=n("elbowR",u,0,-.29,0),g=n("handL",d,0,-.27,0),x=n("handR",f,0,-.27,0),m=n("thighL",r,.1*s,-.04,0),p=n("thighR",r,-.1*s,-.04,0),M=n("kneeL",m,0,-.44,0),v=n("kneeR",p,0,-.44,0),_=n("footL",M,0,-.44,0),I=n("footR",v,0,-.44,0),E=Object.values(this.bones);r.updateMatrixWorld(!0);let A=et=>E.indexOf(et),R=[],S=et=>new D().setFromMatrixPosition(et.matrixWorld),y=(et,Et,Vt,X=0,tt=0,dt=0,ot=1,Dt=1,Ft=1,Bt=0,ee=0,$=0)=>{let it=S(et);R.push(L_(Et,Vt,D_(it.x+X,it.y+tt,it.z+dt,ot,Dt,Ft,Bt,ee,$),A(et)))},C=(Q=e.jacket)!=null?Q:e.shirt,L=(et,Et)=>new wo(et,Et,3,8),U=et=>new un(et,12,9),O=(et,Et,Vt)=>new Ht(et,Et,Vt);y(r,L(.15*s,.08),e.pants,0,-.02,0,1.15,1,.75,0,0,Math.PI/2),y(r,new Ve(.165*s,.165*s,.05,12),2234900,0,.06,0,1.05,1,.72),y(o,L(.15*s,.12),C,0,.08,0,1.15,1,.75),y(a,L(.18*s,.12),C,0,.1,0,1.12,1,.72),e.jacket&&(y(a,O(.1,.4,.02),e.shirt,0,.02,.135),y(a,new Fi(.085,.03,6,12),e.jacket,0,.27,0,1,1,1,Math.PI/2)),e.tie&&y(a,O(.05,.24,.02),e.tie,0,.1,.14),e.badge&&y(a,O(.05,.06,.02),13938487,.09,.17,.135),y(c,new Ve(.055,.06,.1,8),e.skin,0,.02,0),y(l,U(.115),e.skin,0,.11,.005,.92,1.08,1),y(l,U(.03),e.skin,0,.1,.11,.8,1,.9),y(l,U(.016),16119285,.042,.135,.095),y(l,U(.016),16119285,-.042,.135,.095),y(l,U(.009),1710618,.042,.135,.108),y(l,U(.009),1710618,-.042,.135,.108),y(l,O(.04,.008,.01),e.hair,.042,.163,.1),y(l,O(.04,.008,.01),e.hair,-.042,.163,.1),y(l,O(.045,.008,.01),9062976,0,.055,.105),y(l,U(.025),e.skin,.108,.11,0,.5,1,.8),y(l,U(.025),e.skin,-.108,.11,0,.5,1,.8),e.beard&&y(l,U(.1),e.hair,0,.06,.03,.95,.6,.85),e.hairStyle==="short"?y(l,new un(.122,12,8,0,Math.PI*2,0,Math.PI*.55),e.hair,0,.125,-.008,.95,1.05,1.05,-.2):e.hairStyle==="long"?(y(l,new un(.125,12,8,0,Math.PI*2,0,Math.PI*.6),e.hair,0,.125,-.01,.97,1.05,1.05,-.15),y(l,O(.22,.26,.06),e.hair,0,0,-.08)):e.hairStyle==="bun"?(y(l,new un(.122,12,8,0,Math.PI*2,0,Math.PI*.55),e.hair,0,.125,-.008,.95,1.05,1.05,-.2),y(l,U(.06),e.hair,0,.2,-.1)):e.hairStyle,e.hat==="police"?(y(l,new Ve(.13,.125,.08,14),(G=e.hatColor)!=null?G:1780298,0,.225,0),y(l,new Ve(.14,.14,.015,14),1118481,0,.19,.03,1,1,1.15),y(l,O(.04,.035,.01),13938487,0,.23,.128)):e.hat==="cap"&&(y(l,new un(.125,12,8,0,Math.PI*2,0,Math.PI*.5),(st=e.hatColor)!=null?st:11149858,0,.14,0),y(l,O(.16,.012,.1),(ct=e.hatColor)!=null?ct:11149858,0,.15,.13));for(let[et,Et,Vt,X]of[[h,d,g,1],[u,f,x,-1]])y(et,U(.07*s),C,0,0,0),y(et,L(.052*s,.2),C,0,-.145,0),y(Et,L(.045*s,.19),e.jacket?e.jacket:e.longSleeve?e.shirt:e.skin,0,-.13,0),y(Vt,U(.05),e.skin,0,-.04,.005,.75,1.15,.9),y(Vt,U(.022),e.skin,.028*X,-.02,.03);for(let[et,Et,Vt]of[[m,M,_],[p,v,I]])y(et,L(.075*s,.32),e.pants,0,-.21,0),y(Et,L(.06*s,.33),e.pants,0,-.21,0),y(Vt,O(.1,.07,.25),e.shoes,0,-.02,.05),y(Vt,O(.105,.02,.26),921102,0,-.055,.05);let H=Pn(R,!1);R.forEach(et=>et.dispose()),H.computeBoundingSphere(),H.boundingSphere.radius=1.4,H.boundingSphere.center.set(0,.9,0);let z=new mo(H,P_);z.add(r),z.bind(new xo(E)),z.castShadow=!0,z.frustumCulled=!0,this.mesh=z,this.root.add(z),this.root.scale.setScalar(e.height),this.rest={};for(let[et,Et]of Object.entries(this.bones))this.rest[et]=Et.position.clone();this.cur={};for(let et of Object.keys(this.bones))this.cur[et]=new D;this.hipY=0,this.hipZ=0,this.phase=0,this.idleT=Math.random()*10,this.landT=0,this.lookYaw=0}update(t,e){let n={};for(let c of Object.keys(this.bones))n[c]=[0,0,0];let s=e.speed||0;this.idleT+=t;let r=0,o=0,a=12;if(e.mode==="sit")n.thighL=[-1.45,0,.05],n.thighR=[-1.45,0,-.05],n.kneeL=[1.2,0,0],n.kneeR=[1.2,0,0],n.footL=[.05,0,0],n.footR=[.05,0,0],n.shoulderL=[-.95,0,.12+(e.steer||0)*.25],n.shoulderR=[-.95,0,-.12+(e.steer||0)*.25],n.elbowL=[-.55,0,0],n.elbowR=[-.55,0,0],n.spine=[-.08,0,0],n.head=[.05,-(e.steer||0)*.25,0],r=-.42,o=-.05;else if(e.grounded){let c=Be.smoothstep(s,2.6,5.2),l=Math.min(1,s/1),h=Be.lerp(1.45,2.7,c);this.phase+=s/h*Math.PI*2*t;let u=this.phase,d=Math.sin(u),f=Math.sin(u+Math.PI),g=Be.lerp(.42,.85,c)*l,x=Be.lerp(.32,.75,c)*l;n.thighL=[-d*g-c*.15,0,.03],n.thighR=[-f*g-c*.15,0,-.03];let m=(_,I)=>(Math.max(0,Math.cos(I-.3))*Be.lerp(.75,1.6,c)+.08)*l;n.kneeL=[m(d,u),0,0],n.kneeR=[m(f,u+Math.PI),0,0],n.footL=[Math.max(0,-d)*.3*l-.05*l,0,0],n.footR=[Math.max(0,-f)*.3*l-.05*l,0,0],n.shoulderL=[d*x,0,.08+c*.08],n.shoulderR=[f*x,0,-.08-c*.08],n.elbowL=[-(Be.lerp(.25,1.35,c)*l+.12)-Math.max(0,d)*.2*l,0,0],n.elbowR=[-(Be.lerp(.25,1.35,c)*l+.12)-Math.max(0,f)*.2*l,0,0];let p=c*.22+Be.clamp((e.accel||0)*.03,-.12,.15);n.spine=[p,Math.sin(u)*.08*l,-(e.turn||0)*.06],n.chest=[0,-Math.sin(u)*.12*l,0],n.hips=[0,Math.sin(u)*.1*l,-(e.turn||0)*.05],r=-Math.abs(Math.cos(u))*Be.lerp(.03,.07,c)*l+.01*l-c*.04;let M=1-l,v=Math.sin(this.idleT*1.6);if(n.chest[0]+=v*.02*M,n.shoulderL[2]+=(.06+v*.01)*M,n.shoulderR[2]-=(.06+v*.01)*M,n.elbowL[0]-=.1*M,n.elbowR[0]-=.1*M,n.hips[2]+=Math.sin(this.idleT*.4)*.03*M,n.thighL[2]+=.04*M,n.thighR[2]-=.04*M,n.head=[0,Math.sin(this.idleT*.35)*.35*M*(Math.sin(this.idleT*.11)>.3?1:.2)+this.lookYaw,0],e.talk){let _=this.idleT*3;n.head[0]+=Math.sin(_*1.3)*.06,n.shoulderR=[-.45-Math.sin(_)*.15,0,-.2],n.elbowR=[-1.1+Math.sin(_*1.7)*.2,.3,0]}if(this.landT>0){this.landT-=t;let _=Math.max(0,this.landT/.25);r-=.12*_,n.thighL[0]-=.5*_,n.thighR[0]-=.5*_,n.kneeL[0]+=.9*_,n.kneeR[0]+=.9*_,n.spine[0]+=.25*_}}else{let c=e.vy>0?1:0;n.thighL=[-.7*c-.25,0,.05],n.thighR=[-.15-.2*(1-c),0,-.05],n.kneeL=[1.1*c+.4,0,0],n.kneeR=[.6,0,0],n.shoulderL=[-.6,0,.5],n.shoulderR=[-.3,0,-.5],n.elbowL=[-.6,0,0],n.elbowR=[-.5,0,0],n.spine=[.12,0,0],n.head=[-.1,0,0]}for(let[c,l]of Object.entries(this.bones)){let h=this.cur[c],u=n[c];h.x=hr(h.x,u[0],a,t),h.y=hr(h.y,u[1],a,t),h.z=hr(h.z,u[2],a,t),l.rotation.set(h.x,h.y,h.z)}this.hipY=hr(this.hipY,r,14,t),this.hipZ=hr(this.hipZ,o,14,t),this.bones.hips.position.set(this.rest.hips.x,this.rest.hips.y+this.hipY,this.rest.hips.z+this.hipZ)}land(t){this.landT=.25*Math.min(1,t)}};var Pl=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function N_(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}var ud={walkSpeed:1.75,runSpeed:6.2,accel:9,runAccel:7,decel:11,airControl:.25,jumpVel:5,gravity:18,radius:.33,height:1.8,turnSpeed:10},qo=class{constructor(t,e,n){this.world=e,this.model=new ws(n),t.add(this.model.root),this.x=0,this.y=0,this.z=0,this.heading=0,this.vx=0,this.vz=0,this.vy=0,this.grounded=!0,this.speed=0,this.turn=0,this.accel=0,this.mode="foot",this.jumpBuffer=0,this.coyote=0}place(t,e,n=0){this.x=t,this.z=e,this.heading=n,this.y=this.world.groundAt(t,e,ud.radius,10),this.vx=this.vz=this.vy=0,this.sync()}update(t,e,n){let s=ud,r=-Math.sin(n),o=-Math.cos(n),a=Math.cos(n),c=-Math.sin(n),l=r*e.z+a*e.x,h=o*e.z+c*e.x,u=Math.hypot(l,h);u>1&&(l/=u,h/=u);let d=u>.05,f=e.run?s.runSpeed:s.walkSpeed,g=l*f,x=h*f,m=this.grounded?1:s.airControl,p=(d?e.run?s.runAccel:s.accel:s.decel)*m,M=Math.hypot(this.vx,this.vz),v=g-this.vx,_=x-this.vz,I=Math.hypot(v,_),E=p*t*Math.max(1.2,I);if(I>0){let z=Math.min(1,E/I);this.vx+=v*z,this.vz+=_*z}!d&&this.grounded&&Math.hypot(this.vx,this.vz)<.05&&(this.vx=0,this.vz=0);let A=this.heading,R=Math.hypot(this.vx,this.vz);d&&R>.15&&(this.heading=N_(this.heading,Math.atan2(l,h),s.turnSpeed*(this.grounded?1:.3),t));let S=this.heading-A;for(;S>Math.PI;)S-=Math.PI*2;for(;S<-Math.PI;)S+=Math.PI*2;this.turn=Pl(this.turn,t>0?S/t*.3:0,8,t),this.accel=Pl(this.accel,t>0?(R-M)/t:0,6,t),this.jumpBuffer=e.jump?.15:Math.max(0,this.jumpBuffer-t),this.coyote=this.grounded?.12:Math.max(0,this.coyote-t),this.jumpBuffer>0&&this.coyote>0&&(this.vy=s.jumpVel,this.grounded=!1,this.jumpBuffer=0,this.coyote=0),this.vy-=s.gravity*t;let y=this.x+this.vx*t,C=this.z+this.vz*t,L=this.world.resolveCircle(y,C,s.radius,this.y,this.y+s.height,.4);if(L.hit){let z=this.vx*L.nx+this.vz*L.nz;z<0&&(this.vx-=z*L.nx,this.vz-=z*L.nz)}this.x=L.x,this.z=L.z;let U=this.y+this.vy*t,O=this.world.groundAt(this.x,this.z,s.radius*.7,this.y),H=this.grounded;U<=O?(!H&&this.vy<-3&&this.model.land((-this.vy-3)/6),U=O,this.vy=0,this.grounded=!0):this.grounded&&U-O<.45&&this.vy<=0?(U=Pl(U,O,25,t),this.vy=0,U-O<.02&&(U=O)):this.grounded=!1,this.y=U,this.speed=Math.hypot(this.vx,this.vz),this.model.update(t,{speed:this.speed,grounded:this.grounded,vy:this.vy,mode:"foot",turn:this.turn,accel:this.accel}),this.sync()}sync(){this.model.root.position.set(this.x,this.y,this.z),this.model.root.rotation.y=this.heading}};var Mn=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function Yo(i){for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i}var Zo=class{constructor(t,e,n){this.cam=t,this.world=e,this.settings=n,this.yaw=Math.PI,this.pitch=.25,this.carYawOffset=0,this.carPitch=.22,this.target=new D,this.smoothTarget=new D,this.curDist=4,this.footDist=4.2,this.carDist=7.5,this.idleMouse=10,this.mode="foot",this.fovBase=68,this.initialized=!1}onMouse(t,e){let n=this.settings.sensitivity*.0022,s=this.settings.invertY?-1:1;this.mode==="car"?(this.carYawOffset=Yo(this.carYawOffset-t*n),this.carPitch=Be.clamp(this.carPitch+e*n*s,-.15,1)):(this.yaw=Yo(this.yaw-t*n),this.pitch=Be.clamp(this.pitch+e*n*s,-.75,1.25)),Math.abs(t)+Math.abs(e)>.5&&(this.idleMouse=0)}onWheel(t){this.mode==="car"?this.carDist=Be.clamp(this.carDist+t*.006,4.5,14):this.footDist=Be.clamp(this.footDist+t*.004,1.6,9)}setMode(t,e=0){t!==this.mode&&(t==="car"?(this.carYawOffset=0,this.carPitch=.22,this.smoothCarHeading=this.yaw-Math.PI,this.smoothReverse=0):this.yaw=Yo(this.yaw),this.mode=t,this.idleMouse=0)}update(t,e,n){this.initialized||(this.smoothTarget.copy(e),this.initialized=!0),this.idleMouse+=t;let s,r,o;if(this.mode==="car"){this.settings.autoFollow&&this.idleMouse>1.6&&Math.abs(n.speed)>1.5&&(this.carYawOffset=Mn(this.carYawOffset,0,2.2,t),this.carPitch=Mn(this.carPitch,.22,2.2,t));let y=n.speed<-2?Math.PI:0;this.smoothCarHeading=this.smoothCarHeading===void 0?n.heading:this.smoothCarHeading+Yo(n.heading-this.smoothCarHeading)*(1-Math.exp(-6*t)),this.smoothReverse=Mn(this.smoothReverse||0,y,3,t),s=this.smoothCarHeading+Math.PI+this.carYawOffset+this.smoothReverse,this.yaw=s,r=this.carPitch,o=this.carDist,this.smoothTarget.x=Mn(this.smoothTarget.x,e.x,18,t),this.smoothTarget.z=Mn(this.smoothTarget.z,e.z,18,t),this.smoothTarget.y=Mn(this.smoothTarget.y,e.y,8,t);let C=this.fovBase+Math.min(14,Math.abs(n.speed)*.35);Math.abs(this.cam.fov-C)>.05&&(this.cam.fov=Mn(this.cam.fov,C,3,t),this.cam.updateProjectionMatrix())}else s=this.yaw,r=this.pitch,o=this.footDist,this.smoothTarget.x=Mn(this.smoothTarget.x,e.x,16,t),this.smoothTarget.z=Mn(this.smoothTarget.z,e.z,16,t),this.smoothTarget.y=Mn(this.smoothTarget.y,e.y,9,t),Math.abs(this.cam.fov-this.fovBase)>.05&&(this.cam.fov=Mn(this.cam.fov,this.fovBase,4,t),this.cam.updateProjectionMatrix());let a=Math.cos(r),c=Math.sin(r),l=Math.sin(s)*a,h=c,u=Math.cos(s)*a,d=this.smoothTarget,f=this.mode==="foot"?.35*Math.min(1,this.curDist/3):0;if(f>0){this.world.rayIgnore=null;let y=this.world.raycast(d.x,d.y,d.z,Math.cos(s),0,-Math.sin(s),f+.25);f=Math.max(0,Math.min(f,y-.25))}let g=Math.cos(s)*f,x=-Math.sin(s)*f,m=d.x+g,p=d.y,M=d.z+x;this.world.rayIgnore=n||null;let v=this.world.raycast(m,p,M,l,h,u,o+.3),_=Math.max(.5,v-.3),I=Math.min(o,_);this.curDist=I<this.curDist?I:Mn(this.curDist,I,4,t);let E=m+l*this.curDist,A=p+h*this.curDist,R=M+u*this.curDist,S=this.world.groundFn(E,R)+.25;A<S&&(A=S),this.cam.position.set(E,A,R),this.cam.lookAt(m,p+(this.mode==="car"?.4:.05),M)}get moveYaw(){return this.yaw}};var dd=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function O_(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}var bi=class{constructor(t,e,n,s={}){if(this.world=e,this.model=new ws(n),t.add(this.model.root),this.name=s.name||"Pedestre",this.role=s.role||"ped",this.lines=s.lines||[],this.behavior=s.behavior||"stand",this.x=s.x||0,this.z=s.z||0,this.heading=s.heading||0,this.homeHeading=this.heading,this.homeX=this.x,this.homeZ=this.z,this.y=e.groundAt(this.x,this.z,.3,5),this.speed=0,this.vx=0,this.vz=0,this.r=.32,this.collidable=!0,this.talking=!1,this.dodge=0,this.dodgeX=0,this.dodgeZ=0,this.wait=0,this.lineIdx=0,this.behavior==="loop"){this.loop=s.loop,this.s=Pt()*this.loop.half*8,this.dir=Pt()<.5?1:-1,this.walk=mt(1.05,1.5),this.lat=mt(-.9,.3);let r=this.loopPos(this.s);this.x=r[0],this.z=r[1]}this.behavior==="patrol"&&(this.walk=1.1,this.patrolT=Pt()*10),this.stuck=0,this.animSkip=0,this.visibleDist=!0,this.sync()}loopPos(t){let e=this.loop.half+this.lat,n=e*2,s=n*4;t=(t%s+s)%s;let{cx:r,cz:o}=this.loop;return t<n?[r-e+t,o-e,0]:t<2*n?[r+e,o-e+(t-n),1]:t<3*n?[r+e-(t-2*n),o+e,2]:[r-e,o+e-(t-3*n),3]}pushCircleOut(t,e,n,s,r,o){if(o||!this.collidable||!this.model.root.visible)return null;let a=t-this.x,c=e-this.z,l=Math.hypot(a,c),h=n+this.r;if(l>=h||l<1e-5)return null;let u=a/l,d=c/l;return{x:this.x+u*h,z:this.z+d*h,nx:u,nz:d}}reactToCar(t,e){if(!t)return;let n=this.x-t.x,s=this.z-t.z;if(n*n+s*s>100)return;let o=Math.abs(t.speed);if(o>2.5&&this.dodge<=0){let[c,l]=t.forward,h=(n*c+s*l)*Math.sign(t.speed),u=n*-l+s*c;if(h>0&&h<3+o*.6&&Math.abs(u)<2.4){let d=u>=0?1:-1;this.dodge=.7,this.dodgeX=-l*d*5,this.dodgeZ=c*d*5}}let a=t.pushCircleOut(this.x,this.z,this.r,this.y,this.y+1.7);a&&(this.x=a.x,this.z=a.z)}update(t,e){let{player:n}=e,s=n.x-this.x,r=n.z-this.z,o=Math.hypot(s,r),a=0,c=this.heading;if(this.dodge>0){this.dodge-=t;let h=this.x+this.dodgeX*t,u=this.z+this.dodgeZ*t,d=this.world.resolveCircle(h,u,this.r,this.y,this.y+1.7,.4,this);this.x=d.x,this.z=d.z,a=5,c=Math.atan2(this.dodgeX,this.dodgeZ)}else if(this.talking)c=Math.atan2(s,r);else if(this.behavior==="loop")if(this.wait>0)this.wait-=t;else{let[h,u]=this.loopPos(this.s+this.dir*1.2);if(!(Math.hypot(n.x-h,n.z-u)<.9&&n.mode==="foot")){let f=this.s+this.dir*this.walk*t,[g,x]=this.loopPos(f),m=this.world.resolveCircle(g,x,this.r,this.y,this.y+1.7,.4,this),p=Math.hypot(m.x-this.x,m.z-this.z);m.hit&&p<this.walk*t*.3?this.stuck+=t:this.stuck=0,this.stuck>1.2&&(this.dir*=-1,this.stuck=0),c=Math.atan2(g-this.x,x-this.z),this.x=m.x,this.z=m.z,this.s=f,a=this.walk,Pt()<t*.04&&(this.wait=mt(2,5))}}else if(this.behavior==="patrol"){this.patrolT+=t;let h=this.homeX+Math.sin(this.patrolT*.12)*6,u=this.homeZ,d=h-this.x,f=u-this.z,g=Math.hypot(d,f);g>.3&&(a=Math.min(this.walk,g),c=Math.atan2(d,f),this.x+=d/g*a*t,this.z+=f/g*a*t)}else c=o<4?Math.atan2(s,r):this.homeHeading;this.heading=O_(this.heading,c,7,t),this.speed=dd(this.speed,a,8,t),this.y=dd(this.y,this.world.groundAt(this.x,this.z,.2,this.y),20,t),this.animSkip+=t;let l=o>45?.1:0;this.animSkip>=l&&(this.model.update(this.animSkip,{speed:this.speed,grounded:!0,mode:"foot",talk:this.talking}),this.animSkip=0),this.sync()}nextLine(){if(!this.lines.length)return null;let t=this.lines[this.lineIdx%this.lines.length];return this.lineIdx++,t}sync(){this.model.root.position.set(this.x,this.y,this.z),this.model.root.rotation.y=this.heading}};var Vi={ethan:{name:"Ethan",look:{skin:13671028,hair:2759698,shirt:4871520,jacket:4866104,pants:3424862,shoes:3811870,hairStyle:"short",height:1,build:1}},ryan:{name:"Ryan Cole",look:{skin:11565142,hair:1577484,shirt:15262422,jacket:5913382,pants:2040880,shoes:1315860,hairStyle:"short",beard:!0,height:1.03,build:1.08},dialogue:["Ethan! At\xE9 que enfim voc\xEA apareceu.","Depois do que aconteceu ontem \xE0 noite, a cidade n\xE3o \xE9 mais a mesma. Tem algu\xE9m nos observando.","Preciso que voc\xEA v\xE1 at\xE9 a Delegacia de Los Valles e descubra o que a pol\xEDcia sabe.","Pegue seu carro, est\xE1 na garagem. E Ethan... tome cuidado. Nem todos aqui s\xE3o o que parecem."]},delegado:{name:"Delegado Morales",look:{skin:11039055,hair:5921370,shirt:2768234,pants:1844792,shoes:1118481,hat:"police",badge:!0,hairStyle:"short",height:1,build:1.12,longSleeve:!0},dialogue:["Voc\xEA \xE9 o Ethan, n\xE3o \xE9? O Ryan disse que voc\xEA viria.","N\xE3o posso falar muito aqui. As paredes t\xEAm ouvidos.","Volte mais tarde. Por enquanto, conhe\xE7a a cidade... e mantenha os olhos abertos."]}},fd=[15845029,14724230,13011556,11039055,9067068,6175526,14263682],pd=[1709072,2825492,4861984,8018480,11569232,6316128,1710618],B_=[12073530,3828408,3836506,14737632,2763306,14196784,8014496,4885146,12610186,9071178],F_=[2899536,1842204,4866096,3820138,5921370,6967360,2767402];function Ll(){let i=Pt()<.5;return{skin:qt(fd),hair:qt(pd),shirt:qt(B_),pants:qt(F_),shoes:qt([1710618,4861984,14737632,3816026]),jacket:Pt()<.3?qt([2763306,4864554,2767450,6957610]):null,hairStyle:i?qt(["long","bun","long"]):qt(["short","short","bald"]),beard:!i&&Pt()<.25,hat:Pt()<.1?"cap":null,hatColor:qt([11149858,2245802,2236962]),height:i?mt(.92,.99):mt(.97,1.06),build:i?mt(.88,.95):mt(.95,1.12),longSleeve:Pt()<.4}}function md(){return{...Ll(),shirt:qt([12597547,2388387,1999945,14059792]),jacket:null,tie:Pt()<.3?2236962:null,longSleeve:!0}}function gd(){return{skin:qt(fd),hair:qt(pd),shirt:2768234,pants:1844792,shoes:1118481,hat:"police",badge:!0,hairStyle:"short",height:mt(.98,1.05),build:mt(1,1.12),longSleeve:!0}}var Dl=["Bem-vindo! Posso ajudar em alguma coisa?","Fique \xE0 vontade para dar uma olhada.","Est\xE1 tudo t\xE3o estranho na cidade ultimamente...","Fechamos \xE0s dez. Depois disso, ningu\xE9m anda por a\xED.","Voc\xEA n\xE3o \xE9 daqui do bairro, \xE9?"],xd=["Boa noite.","Com licen\xE7a.","Hm?","N\xE3o tenho tempo agora.","Cuidado por onde anda.","Dizem que algo estranho acontece na pra\xE7a \xE0 noite..."],_d=["Circulando, cidad\xE3o.","Tudo certo por aqui?","N\xE3o v\xE1 dirigir em alta velocidade, hein."];var Es=[[0,1],[1,0],[0,-1],[-1,0]],z_=["NS","EW","NS","EW"],k_=26,Jo=class{constructor(){this.t=0}state(t){let e=this.t%k_;return t==="NS"?e<10?"G":e<12.5?"Y":"R":e>=13&&e<23?"G":e>=23&&e<25.5?"Y":"R"}update(t){this.t+=t;let e=cr(),n=e.tlOff,s=[16722458,16757274,2817898];for(let r of["NS","EW"]){let o=this.state(r),a=o==="R"?0:o==="Y"?1:2;e.tl[r].forEach((c,l)=>c.color.setHex(l===a?s[l]:n[l]))}}},Ul=class{constructor(t,e,n,s){this.car=t,this.a=e,this.b=n,this.d=s,this.next=this.chooseNext(),this.cruise=9+Pt()*4,this.honk=0;let[r,o]=Es[s],[a,c]=[-o,r],l=8+Pt()*40;t.place(ve(e)+r*l+a*lr,ve(n)+o*l+c*lr,Math.atan2(r,o)),t.driver="ai"}validDir(t,e,n){let[s,r]=Es[n],o=t+s,a=e+r;return o>=0&&o<=ae&&a>=0&&a<=ae}chooseNext(){let[t,e]=Es[this.d],n=this.a+t,s=this.b+e,r=[];for(let[o,a]of[[this.d,3],[(this.d+1)%4,1],[(this.d+3)%4,1]])if(this.validDir(n,s,o))for(let c=0;c<a;c++)r.push(o);return r.length||r.push((this.d+2)%4),qt(r)}lane(t,e,n){let[s,r]=Es[n];return{ox:ve(t)+-r*lr,oz:ve(e)+s*lr,fx:s,fz:r}}update(t,e){let n=this.car,s=this.lane(this.a,this.b,this.d),r=(n.x-s.ox)*s.fx+(n.z-s.oz)*s.fz;if(r>fn-ke/2-.5){let[O,H]=Es[this.d];this.a+=O,this.b+=H,this.d=this.next,this.next=this.chooseNext(),s=this.lane(this.a,this.b,this.d),r=(n.x-s.ox)*s.fx+(n.z-s.oz)*s.fz}let o=this.next!==this.d,a=4.5+Math.abs(n.speed)*.45,c=Math.max(r,-6)+a,l=s.ox+s.fx*c,h=s.oz+s.fz*c,u=Math.sin(n.heading),d=Math.cos(n.heading),f=l-n.x,g=h-n.z,x=f*u+g*d,m=f*d-g*u,p=Math.max(4,m*m+x*x),M=Math.atan(2*n.T.wheelBase*m/p),v=.62/(1+Math.abs(n.speed)*.07),_=Math.max(-1,Math.min(1,M/v)),I=this.cruise,E=fn-ke/2-r;o&&E<18&&(I=Math.min(I,5.5)),r<0&&(I=Math.min(I,6));let R=fn-ke/2-3.8-n.T.L/2-r,S=e.lights.state(z_[this.d]);S!=="G"&&R>-.5&&R<35&&(S==="Y"&&R<5||(I=Math.min(I,Math.sqrt(2*3.5*Math.max(0,R-.3)))));let y=!1,C=(O,H,z,Q)=>{let G=O-n.x,st=H-n.z;if(G*G+st*st>900)return;let ct=G*u+st*d,et=G*d-st*u;if(ct>0&&ct<26&&Math.abs(et-_*ct*.08)<Q){let Et=ct-n.T.L/2-z;return I=Math.min(I,Math.max(0,Et-2.2)*.8),!0}return!1};for(let O of e.cars)O!==n&&C(O.x,O.z,O.T.L/2,1.9);e.player.mode==="foot"&&(y=C(e.player.x,e.player.z,.3,1.6));for(let O of e.npcs)O.dodge>0&&C(O.x,O.z,.3,1.5);y&&n.speed<.5?this.honk+=t:this.honk=0;let L=I-n.speed,U={throttle:Math.max(0,Math.min(1,L*.45)),brake:Math.max(0,Math.min(1,-L*.7)),steer:_,handbrake:0};I<.3&&n.speed<.6&&(U.brake=1,U.throttle=0),n.update(t,U,e.cars)}};function yd(i,t,e){let n=[],s=0;for(;n.length<i&&s++<400;){let r=Math.floor(Pt()*(ae+1)),o=Math.floor(Pt()*(ae+1)),a=Math.floor(Pt()*4),[c,l]=Es[a];if(r+c<0||r+c>ae||o+l<0||o+l>ae)continue;let h=ve(r)+c*fn/2,u=ve(o)+l*fn/2;if(Math.hypot(h-e.x,u-e.z)<40||n.some(f=>f.a===r&&f.b===o&&f.d===a))continue;let d=t(qt(["sedan","hatch","suv","pickup","taxi","sedan","police"]));n.push(new Ul(d,r,o,a))}return n}var Nl={dia:{label:"Dia",top:4161488,horizon:12375790,bottom:9085104,sun:[.35,.8,.45],sunColor:16774109,sunI:2.8,hemiSky:12572927,hemiGround:6971472,hemiI:1.4,fog:12177376,fogD:.0032,night:0,exposure:1},entardecer:{label:"Entardecer",top:2767466,horizon:15768154,bottom:5917264,sun:[-.7,.16,.45],sunColor:16758904,sunI:2.6,hemiSky:11055320,hemiGround:6969416,hemiI:1.45,fog:11571328,fogD:.0036,night:.5,exposure:1.15},noite:{label:"Noite",top:329746,horizon:1713216,bottom:658452,sun:[.3,.6,-.5],sunColor:9085144,sunI:.6,hemiSky:4214922,hemiGround:2761760,hemiI:.8,fog:1449004,fogD:.0055,night:1,exposure:1.25}},$o=class{constructor(t,e,n=340){this.far=n,this.scene=t,this.renderer=e,this.uniforms={top:{value:new Ot},horizon:{value:new Ot},bottom:{value:new Ot},sunDir:{value:new D},sunCol:{value:new Ot}};let s=new yn({uniforms:this.uniforms,side:Ke,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; uniform vec3 sunDir; uniform vec3 sunCol; varying vec3 vP;
        void main(){ float h = vP.y; vec3 c = h > 0.0 ? mix(horizon, top, pow(min(1.0, h * 1.6), 0.7)) : mix(horizon, bottom, min(1.0, -h * 4.0));
          float s = max(0.0, dot(normalize(vP), normalize(sunDir)));
          c += sunCol * (pow(s, 600.0) * 1.5 + pow(s, 12.0) * 0.25);
          gl_FragColor = vec4(c, 1.0); }`});this.dome=new fe(new un(1,24,12),s),this.dome.frustumCulled=!1,this.dome.renderOrder=-1,this.dome.scale.setScalar(n*.92),t.add(this.dome);let r=new Re,o=[];for(let a=0;a<900;a++){let c=new D().randomDirection();c.y<.05&&(c.y=Math.abs(c.y)+.05),c.normalize().multiplyScalar(n*.88),o.push(c.x,c.y,c.z)}r.setAttribute("position",new re(o,3)),this.stars=new _o(r,new $s({color:16777215,size:1.6,sizeAttenuation:!1,fog:!1,transparent:!0,opacity:0})),this.stars.frustumCulled=!1,t.add(this.stars),this.hemi=new Ro(16777215,4473924,1),t.add(this.hemi),this.sun=new Po(16777215,2),t.add(this.sun,this.sun.target),t.fog=new fo(8947848,.004),this.sunDir=new D,this.night=0}setShadows(t,e,n){if(this.sun.castShadow=t,t){this.sun.shadow.mapSize.set(e,e);let s=this.sun.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.near=1,s.far=400,s.updateProjectionMatrix(),this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.extent=n,this.size=e}}apply(t){let e=Nl[t];this.current=t,this.uniforms.top.value.setHex(e.top),this.uniforms.horizon.value.setHex(e.horizon),this.uniforms.bottom.value.setHex(e.bottom),this.sunDir.set(...e.sun).normalize(),this.uniforms.sunDir.value.copy(this.sunDir),this.uniforms.sunCol.value.setHex(e.sunColor).multiplyScalar(e.night>.9?.6:1),this.sun.color.setHex(e.sunColor),this.sun.intensity=e.sunI,this.hemi.color.setHex(e.hemiSky),this.hemi.groundColor.setHex(e.hemiGround),this.hemi.intensity=e.hemiI,this.scene.fog.color.setHex(e.fog),this.scene.fog.density=e.fogD,this.renderer.toneMappingExposure=e.exposure,this.stars.material.opacity=e.night>.9?.9:e.night>.4?.2:0,this.night=e.night;for(let n of Vo){let s=n.base+(n.night-n.base)*e.night;n.opacity?n.mat.opacity=s:n.mat.emissiveIntensity=s}hd(e.night>.4)}follow(t,e){this.dome.position.set(t,0,e),this.stars.position.set(t,0,e);let n=t,s=e;if(this.sun.castShadow){let r=this.extent*2/this.size;n=Math.round(t/r)*r,s=Math.round(e/r)*r}this.sun.target.position.set(n,0,s),this.sun.position.set(n+this.sunDir.x*150,this.sunDir.y*150,s+this.sunDir.z*150)}};var Ko=class{constructor(){this.ctx=null,this.enabled=!0}init(){if(!this.ctx)try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.gain=this.ctx.createGain(),this.gain.gain.value=0,this.filter=this.ctx.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=600,this.o1=this.ctx.createOscillator(),this.o1.type="sawtooth",this.o2=this.ctx.createOscillator(),this.o2.type="square";let e=this.ctx.createGain();e.gain.value=.35,this.o1.connect(this.filter),this.o2.connect(e),e.connect(this.filter),this.filter.connect(this.gain),this.gain.connect(this.ctx.destination),this.o1.start(),this.o2.start()}catch{this.ctx=null}}update(t,e,n){if(!this.ctx)return;let s=this.ctx.currentTime,r=Math.min(4,Math.floor(Math.abs(e)/9)),o=.25+(Math.abs(e)-r*9)/9*.6+n*.15,a=38+o*70+r*6;this.o1.frequency.setTargetAtTime(a,s,.05),this.o2.frequency.setTargetAtTime(a*.5,s,.05),this.filter.frequency.setTargetAtTime(400+n*900+o*400,s,.08),this.gain.gain.setTargetAtTime(t&&this.enabled?.05+n*.05:0,s,.15)}};var vd={sensitivity:1,invertY:!1,quality:"media",autoFollow:!0,fov:68,showFps:!0,time:"entardecer",sound:!0};function H_(){try{return{...vd,...JSON.parse(localStorage.getItem("entreSombras.settings")||"{}")}}catch{return{...vd}}}function si(){try{localStorage.setItem("entreSombras.settings",JSON.stringify(ne))}catch{}}var ne=H_(),Md={baixa:{label:"Baixa",pr:.75,aa:!1,shadows:!1,size:512,extent:40,peds:28,traffic:8,far:260},media:{label:"M\xE9dia",pr:1,aa:!1,shadows:!0,size:1024,extent:45,peds:45,traffic:12,far:340},alta:{label:"Alta",pr:Math.min(window.devicePixelRatio||1,1.5),aa:!0,shadows:!0,size:2048,extent:60,peds:60,traffic:16,far:420}},mn=Md[ne.quality]||Md.media,Nt=i=>document.getElementById(i),Sd=i=>{let t=Nt("loading-text");t&&(t.textContent=i)},nn=new uo({antialias:mn.aa,powerPreference:"high-performance"});nn.setPixelRatio(mn.pr);nn.setSize(window.innerWidth,window.innerHeight);nn.outputColorSpace=Ze;nn.toneMapping=ll;nn.shadowMap.enabled=mn.shadows;nn.shadowMap.type=Do;Nt("game").appendChild(nn.domElement);var en=new po,Ts=new Je(ne.fov,window.innerWidth/window.innerHeight,.1,mn.far);window.addEventListener("resize",()=>{Ts.aspect=window.innerWidth/window.innerHeight,Ts.updateProjectionMatrix(),nn.setSize(window.innerWidth,window.innerHeight)});var Y={};window.game=Y;function V_(){let i=performance.now(),t=new zo,e=new $o(en,nn,mn.far);e.setShadows(mn.shadows,mn.size,mn.extent);let n=new Go(en,t);n.build(),Ho(777);let s=[],r=[],o=(p,M)=>{let v=new Xo(p,M!=null?M:qt(cd),t);return en.add(v.group),t.dynamic.add(v),s.push(v),v};for(let p of n.parkedCars){let M=o(p.type);M.place(p.x,p.z,p.heading),M.parked=!0}let a=n.ethanHouse,c=o("sedan",1916786);c.place(a.driveway[0],a.driveway[1],a.heading+Math.PI),c.owner="Ethan";let l=new qo(en,t,Vi.ethan.look);l.place(a.door[0],a.door[1]+3.5,0),r.push(...yd(mn.traffic,p=>o(p),l));let h=[],u=new bi(en,t,Vi.ryan.look,{name:"Ryan Cole",role:"story",lines:Vi.ryan.dialogue,x:a.door[0]-1.5,z:a.door[1]+8.5,heading:Math.PI});u.story="ryan",h.push(u);for(let p of n.shopkeepers)h.push(new bi(en,t,md(),{name:"Atendente \u2014 "+p.shop,role:"shop",lines:[qt(Dl),qt(Dl)],x:p.x,z:p.z,heading:p.heading}));for(let p of n.npcs)p.kind==="police"&&h.push(new bi(en,t,gd(),{name:"Policial",role:"police",lines:_d,x:p.x,z:p.z,behavior:"patrol"}));let d=new bi(en,t,Vi.delegado.look,{name:Vi.delegado.name,role:"story",lines:Vi.delegado.dialogue,x:n.policeSpot.x,z:n.policeSpot.z,heading:0});d.story="delegado",h.push(d);let f=n.pedLoops;for(let p=0;p<mn.peds;p++){let M=f[p%f.length===0?Math.floor(Pt()*f.length):Math.floor(Pt()*f.length)];h.push(new bi(en,t,Ll(),{name:"Pedestre",role:"ped",lines:[qt(xd)],behavior:"loop",loop:M}))}for(let p of h)t.dynamic.add(p);let g=new Jo,x=new Zo(Ts,t,ne);x.yaw=Math.PI,x.pitch=.22;let m=new Io(16773840,0,45,.55,.5,1.2);en.add(m,m.target),Object.assign(Y,{world:t,sky:e,city:n,cars:s,drivers:r,player:l,npcs:h,ryan:u,delegado:d,lights:g,cam:x,ethanCar:c,headlight:m,settings:ne,Q:mn,renderer:nn,scene:en,camera:Ts}),Y.audio=new Ko,Y.objective=0,Y.buildMs=performance.now()-i,e.apply(ne.time),Y_()}var dr=new Set,ea=new Set,Bl=!1,ri=!1,pr=!1;window.addEventListener("keydown",i=>{["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(i.code)&&i.preventDefault(),dr.has(i.code)||ea.add(i.code),dr.add(i.code)});window.addEventListener("keyup",i=>dr.delete(i.code));window.addEventListener("blur",()=>dr.clear());document.addEventListener("mousemove",i=>{Bl&&!pr&&Y.cam&&Y.cam.onMouse(i.movementX||0,i.movementY||0)});document.addEventListener("wheel",i=>{Y.cam&&ri&&!pr&&Y.cam.onWheel(i.deltaY)},{passive:!0});document.addEventListener("pointerlockchange",()=>{Bl=document.pointerLockElement===nn.domElement,!Bl&&ri&&!Y.dialog&&zl(!0)});nn.domElement.addEventListener("click",()=>{ri&&!pr&&Fl(),Y.dialog&&kl()});function Fl(){try{let i=nn.domElement.requestPointerLock();i&&i.catch&&i.catch(()=>{})}catch{}}var zn=(...i)=>i.some(t=>dr.has(t)),Si=(...i)=>i.some(t=>ea.has(t));function zl(i){pr=i,Nt("pause").style.display=i?"flex":"none",i&&G_()}function G_(){Nt("opt-sens").value=ne.sensitivity,Nt("opt-sens-v").textContent=ne.sensitivity.toFixed(2),Nt("opt-invert").checked=ne.invertY,Nt("opt-follow").checked=ne.autoFollow,Nt("opt-fov").value=ne.fov,Nt("opt-fov-v").textContent=ne.fov,Nt("opt-quality").value=ne.quality,Nt("opt-fps").checked=ne.showFps,Nt("opt-time").value=ne.time,Nt("opt-sound").checked=ne.sound,Nt("opt-dist").value=Y.cam?Y.cam.footDist:4.2,Nt("opt-dist-v").textContent=(Y.cam?Y.cam.footDist:4.2).toFixed(1)}function W_(){Nt("opt-sens").oninput=i=>{ne.sensitivity=+i.target.value,Nt("opt-sens-v").textContent=ne.sensitivity.toFixed(2),si()},Nt("opt-invert").onchange=i=>{ne.invertY=i.target.checked,si()},Nt("opt-follow").onchange=i=>{ne.autoFollow=i.target.checked,si()},Nt("opt-fov").oninput=i=>{ne.fov=+i.target.value,Nt("opt-fov-v").textContent=ne.fov,Y.cam.fovBase=ne.fov,si()},Nt("opt-dist").oninput=i=>{Y.cam.footDist=+i.target.value,Nt("opt-dist-v").textContent=Y.cam.footDist.toFixed(1)},Nt("opt-fps").onchange=i=>{ne.showFps=i.target.checked,si()},Nt("opt-sound").onchange=i=>{ne.sound=i.target.checked,Y.audio.enabled=ne.sound,si()},Nt("opt-time").onchange=i=>{ne.time=i.target.value,Y.sky.apply(ne.time),si()},Nt("opt-quality").onchange=i=>{ne.quality=i.target.value,si(),Nt("quality-note").textContent="A qualidade ser\xE1 aplicada ao reiniciar. Recarregando...",setTimeout(()=>location.reload(),600)},Nt("btn-resume").onclick=()=>{zl(!1),Fl()},Nt("btn-play").onclick=wd}function wd(){ri||(ri=!0,Nt("title").style.display="none",Nt("hud").style.display="block",Y.audio.init(),Y.audio.enabled=ne.sound,Fl(),ta(0))}var X_=["Fale com Ryan Cole na frente da sua casa","V\xE1 at\xE9 a Delegacia de Los Valles (use seu carro azul na garagem)","Fale com o Delegado Morales na entrada da delegacia","Explore Los Valles livremente"];function ta(i){Y.objective=i,Nt("objective").textContent="OBJETIVO: "+X_[i],fr(i===0?"Bem-vindo a Los Valles":"Novo objetivo")}var jo=0;function fr(i){Nt("toast").textContent=i,Nt("toast").style.opacity=1,jo=3}function Ed(i){let t=i.story?i.lines[0]:i.nextLine();Y.dialog={npc:i,idx:0,story:!!i.story,lines:i.story?i.lines:[t]},i.talking=!0,Nt("dialog").style.display="block",Nt("dialog-name").textContent=i.name,Nt("dialog-text").textContent=Y.dialog.lines[0]}function kl(){let i=Y.dialog;if(i){if(i.idx++,i.idx>=i.lines.length){i.npc.talking=!1,Y.dialog=null,Nt("dialog").style.display="none",i.npc.story==="ryan"&&Y.objective===0&&ta(1),i.npc.story==="delegado"&&Y.objective<=2&&Y.objective>=1&&ta(3);return}Nt("dialog-text").textContent=i.lines[i.idx]}}function Td(){let i=Y.player,t=null,e=3.4;for(let n of Y.cars)for(let s of[1,-1]){let[r,o]=n.doorPos(s),a=Math.hypot(i.x-r,i.z-o);a<e&&(e=a,t=n)}return t}function Ad(i){if(i.driver==="ai"){fr("Este carro est\xE1 ocupado");return}let t=Y.player;t.mode="car",Y.car=i,i.driver="player",i.parked=!1,en.remove(t.model.root),i.body.add(t.model.root),t.model.root.position.copy(i.seat),t.model.root.rotation.set(0,0,0),Y.cam.setMode("car",i.heading),fr(i.owner==="Ethan"?"Seu carro":q_(i))}var q_=i=>i.T.name;function Rd(){let i=Y.car,t=Y.player;if(Math.abs(i.speed)>4){fr("Diminua a velocidade para sair");return}let e=null;for(let n of[1,-1]){let[s,r]=i.doorPos(n);if(!Y.world.resolveCircle(s,r,.33,i.y+.2,i.y+1.8,.4,null).hit){e=[s,r];break}}if(!e){let[n,s]=i.local(0,i.T.L/2+1.2);e=[n,s]}i.body.remove(t.model.root),en.add(t.model.root),i.driver=null,i.speed*=.3,Y.car=null,t.mode="foot",t.place(e[0],e[1],i.heading),t.model.cur&&Object.values(t.model.cur).forEach(n=>n.multiplyScalar(.5)),Y.cam.setMode("foot")}var ur;function Y_(){let i=Math.ceil(pn*2+120);ur=document.createElement("canvas"),ur.width=i,ur.height=i;let t=ur.getContext("2d");t.fillStyle="#2d4224",t.fillRect(0,0,i,i);let e=i/2,n={res:"#5d7a4a",park:"#3f7a3a",down:"#8a8580",mixed:"#9a9286",shops:"#a8927a",shops2:"#a8927a",police:"#5a6a9a",gas:"#a87a6a",parking:"#6a6a6a",apart:"#8a8070"};t.fillStyle="#3a3a3c",t.fillRect(e-pn,e-pn,pn*2,pn*2);for(let s=0;s<ae;s++)for(let r=0;r<ae;r++)t.fillStyle="#b9b3a6",t.fillRect(e+ni(r)-Se/2,e+ni(s)-Se/2,Se,Se),t.fillStyle=n[Al[s][r]],t.fillRect(e+ni(r)-Se/2+4,e+ni(s)-Se/2+4,Se-8,Se-8);t.strokeStyle="#b8a040",t.setLineDash([6,6]),t.lineWidth=.8;for(let s=0;s<=ae;s++)t.beginPath(),t.moveTo(e+ve(s),e-pn),t.lineTo(e+ve(s),e+pn),t.stroke(),t.beginPath(),t.moveTo(e-pn,e+ve(s)),t.lineTo(e+pn,e+ve(s)),t.stroke();Y.mmOrigin=e}function Z_(){let i=Nt("minimap"),t=i.getContext("2d"),e=i.width,n=i.height,s=Y.car||Y.player,r=Y.mmOrigin,o=Y.car?.75:1.2;t.save(),t.clearRect(0,0,e,n),t.beginPath(),t.arc(e/2,n/2,e/2-2,0,Math.PI*2),t.clip(),t.fillStyle="#1a2414",t.fillRect(0,0,e,n),t.translate(e/2,n/2),t.scale(o,o),t.rotate(Math.PI+Y.cam.yaw),t.drawImage(ur,-(r+s.x),-(r+s.z));let a=(d,f,g,x)=>{t.fillStyle=g,t.beginPath(),t.arc(d-s.x,f-s.z,x/o,0,Math.PI*2),t.fill()};for(let d of Y.drivers)a(d.car.x,d.car.z,"#d0d0d0",2);Y.car||a(Y.ethanCar.x,Y.ethanCar.z,"#3a8aff",4);let c=J_();c&&a(c[0],c[1],"#ffd23a",6),t.restore(),t.save(),t.translate(e/2,n/2);let l=Y.car?Y.car.heading:Y.player.heading;t.rotate(-(l-Y.cam.yaw)+Math.PI),t.fillStyle="#ff5a3a",t.beginPath(),t.moveTo(0,-8),t.lineTo(6,7),t.lineTo(0,3),t.lineTo(-6,7),t.closePath(),t.fill(),t.restore(),t.strokeStyle="rgba(255,255,255,0.6)",t.lineWidth=2,t.beginPath(),t.arc(e/2,n/2,e/2-2,0,Math.PI*2),t.stroke(),t.fillStyle="#fff",t.font="bold 12px Arial",t.textAlign="center";let h=-Math.cos(Math.PI+Y.cam.yaw)*(e/2-12),u=Math.sin(Math.PI+Y.cam.yaw)*(e/2-12);t.fillText("N",e/2-u,n/2+h+4)}function J_(){return Y.objective===0?[Y.ryan.x,Y.ryan.z]:Y.objective===1||Y.objective===2?[Y.delegado.x,Y.delegado.z]:null}var $_=new Lo,Qo=0,Ol=0,Cd=0,bd=new D;function Id(){requestAnimationFrame(Id);let i=Math.min($_.getDelta(),1/20);Y.manual||Hl(i),nn.render(en,Ts),Qo+=i,Ol++,Qo>.5&&(Cd=Math.round(Ol/Qo),Qo=0,Ol=0),ea.clear()}function Hl(i){var a;let t=Y.player;Y.lights.update(i),ld(i);let e=ri&&!pr,n=!!Y.dialog;if(e&&Si("KeyN")){let c=["entardecer","noite","dia"];ne.time=c[(c.indexOf(ne.time)+1)%3],Y.sky.apply(ne.time),si(),fr(Nl[ne.time].label)}e&&Si("KeyH")&&(Nt("help").style.display=Nt("help").style.display==="none"?"block":"none"),e&&Si("KeyP")&&((a=document.exitPointerLock)==null||a.call(document),zl(!0));let s="";if(t.mode==="foot"){let c=null,l=2.4;for(let d of Y.npcs){let f=Math.hypot(d.x-t.x,d.z-t.z);f<l&&(l=f,c=d)}let h=Td();n?s="[E] Continuar":c&&(!h||l<1.8)?(s=`[E] Falar com ${c.name}`,e&&Si("KeyE","KeyF")&&Ed(c)):h&&(s=h.driver==="ai"?"Carro ocupado":`[E] Entrar no carro${h.owner?" (seu carro)":""}`,e&&Si("KeyE","KeyF")&&Ad(h)),n&&e&&Si("KeyE","Space","Enter","KeyF")&&kl();let u=e&&!n?{x:(zn("KeyD","ArrowRight")?1:0)-(zn("KeyA","ArrowLeft")?1:0),z:(zn("KeyW","ArrowUp")?1:0)-(zn("KeyS","ArrowDown")?1:0),run:zn("ShiftLeft","ShiftRight"),jump:Si("Space")}:{x:0,z:0,run:!1,jump:!1};Y.testInput&&Object.assign(u,Y.testInput),t.mode==="foot"&&t.update(i,u,Y.cam.yaw)}if(t.mode==="car"){let c=Y.car;s=Math.abs(c.speed)>4?"":"[E] Sair do carro";let l=e?{throttle:zn("KeyW","ArrowUp")?1:0,brake:zn("KeyS","ArrowDown")?1:0,steer:(zn("KeyA","ArrowLeft")?1:0)-(zn("KeyD","ArrowRight")?1:0),handbrake:zn("Space")?1:0}:{throttle:0,brake:0,steer:0,handbrake:1};Y.testCarInput&&(l={...l,...Y.testCarInput}),c.update(i,l,Y.cars),t.x=c.x,t.z=c.z,t.y=c.y,t.model.update(i,{mode:"sit",steer:c.steer*1.5}),Y.audio.update(!0,c.speed,l.throttle),e&&Si("KeyE","KeyF")&&Rd()}else Y.audio.update(!1,0,0);let r={lights:Y.lights,cars:Y.cars,player:t,npcs:Y.npcs};for(let c of Y.drivers)c.update(i,r);for(let c of Y.cars)c.driver===null&&c.awake&&(c.awake=c.updatePassive(i));let o=Y.cars.filter(c=>Math.abs(c.speed)>.5&&Math.abs(c.x-t.x)<120&&Math.abs(c.z-t.z)<120);for(let c of Y.npcs){let l=Math.hypot(c.x-t.x,c.z-t.z);if(c.model.root.visible=l<95,l<110){c.update(i,{player:t});for(let h of o)c.reactToCar(h,i)}}for(let c of Y.cars){let l=Math.abs(c.x-t.x)+Math.abs(c.z-t.z);c.group.visible=l<(c.driver?mn.far*.7:mn.far*.42),c.setLOD(l>45&&c.driver!=="player"&&!c.sirenL)}if(Y.objective===1&&Math.hypot(t.x-Y.delegado.x,t.z-Y.delegado.z)<14&&ta(2),t.mode==="car"?Y.cam.update(i,bd.set(Y.car.x,Y.car.y+1.25,Y.car.z),Y.car):Y.cam.update(i,bd.set(t.x,t.y+1.55,t.z),null),Y.sky.follow(t.x,t.z),Y.car&&Y.sky.night>.4){let[c,l]=Y.car.forward;Y.headlight.intensity=60,Y.headlight.position.set(Y.car.x+c*2.2,Y.car.y+.8,Y.car.z+l*2.2),Y.headlight.target.position.set(Y.car.x+c*20,Y.car.y-1.5,Y.car.z+l*20)}else Y.headlight.intensity=0;Nt("prompt").textContent=s,Nt("prompt").style.display=s&&ri?"block":"none",Y.car?(Nt("speedo").style.display="block",Nt("speed").textContent=Math.round(Y.car.kmh),Nt("gear").textContent=Y.car.speed<-.5?"R":Y.car.speed>.5?"D":"N"):Nt("speedo").style.display="none",Nt("fps").style.display=ne.showFps&&ri?"block":"none",Nt("fps").textContent=Cd+" FPS",jo>0&&(jo-=i,jo<=0&&(Nt("toast").style.opacity=0)),ri&&Z_()}Sd("Gerando Los Valles...");setTimeout(()=>{try{V_(),W_(),Nt("loading").style.display="none",Nt("btn-play").disabled=!1,Nt("btn-play").textContent="JOGAR",Y.ready=!0,Id()}catch(i){console.error(i),Sd("Erro ao iniciar: "+i.message),Y.error=i}},30);Y.start=wd;Y.enterCar=i=>Ad(i||Y.ethanCar);Y.exitCar=()=>Rd();Y.nearestCar=Td;Y.step=Hl;Y.sim=(i,t=60)=>{let e=Math.round(i*t);for(let n=0;n<e;n++)Hl(1/t),ea.clear()};Y.openDialog=Ed;Y.advanceDialog=kl;Y.render=()=>nn.render(en,Ts);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
