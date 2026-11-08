(()=>{var Mc="170";var af=0,_h=1,lf=2;var Go=1,bc=2,ti=3,bi=0,tn=1,Cn=2,vi=0,ps=1,_s=2,yh=3,vh=4,cf=5,Oi=100,hf=101,uf=102,df=103,ff=104,pf=200,mf=201,gf=202,xf=203,Ka=204,Qa=205,_f=206,yf=207,vf=208,Mf=209,bf=210,Sf=211,wf=212,Ef=213,Tf=214,ja=0,tl=1,el=2,ys=3,nl=4,il=5,sl=6,rl=7,Wo=0,Un=1,Af=2,Mi=0,Rf=1,Cf=2,If=3,Sc=4,Pf=5,Lf=6,Df=7,Mh="attached",Uf="detached",Bu=300,vs=301,Ms=302,ol=303,al=304,Xo=306,er=1e3,zi=1001,ll=1002,un=1003,Nf=1004;var Ir=1005;var zn=1006,ga=1007;var In=1008;var si=1009,Fu=1010,zu=1011,nr=1012,wc=1013,ki=1014,Pn=1015,_r=1016,Ec=1017,Tc=1018,bs=1020,ku=35902,Hu=1021,Vu=1022,vn=1023,Gu=1024,Wu=1025,ms=1026,Ss=1027,Ac=1028,Rc=1029,Xu=1030,Cc=1031;var Ic=1033,ro=33776,oo=33777,ao=33778,lo=33779,cl=35840,hl=35841,ul=35842,dl=35843,fl=36196,pl=37492,ml=37496,gl=37808,xl=37809,_l=37810,yl=37811,vl=37812,Ml=37813,bl=37814,Sl=37815,wl=37816,El=37817,Tl=37818,Al=37819,Rl=37820,Cl=37821,co=36492,Il=36494,Pl=36495,qu=36283,Ll=36284,Dl=36285,Ul=36286;var ho=2300,Nl=2301,xa=2302,bh=2400,Sh=2401,wh=2402;var Of=3200,Bf=3201;var Pc=0,Ff=1,yi="",Qe="srgb",Is="srgb-linear",qo="linear",me="srgb";var Ji=7680;var Eh=519,zf=512,kf=513,Hf=514,Yu=515,Vf=516,Gf=517,Wf=518,Xf=519,Th=35044;var Ah="300 es",ni=2e3,uo=2001,Si=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rh=1234567,$s=Math.PI/180,ws=180/Math.PI;function Ei(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function He(i,t,e){return Math.max(t,Math.min(e,i))}function Lc(i,t){return(i%t+t)%t}function qf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Yf(i,t,e){return i!==t?(e-i)/(t-i):0}function Js(i,t,e){return(1-e)*i+e*t}function Zf(i,t,e,n){return Js(i,t,1-Math.exp(-e*n))}function $f(i,t=1){return t-Math.abs(Lc(i,t*2)-t)}function Jf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Kf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Qf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function jf(i,t){return i+Math.random()*(t-i)}function tp(i){return i*(.5-Math.random())}function ep(i){i!==void 0&&(Rh=i);let t=Rh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function np(i){return i*$s}function ip(i){return i*ws}function sp(i){return(i&i-1)===0&&i!==0}function rp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function op(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ap(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function us(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var We={DEG2RAD:$s,RAD2DEG:ws,generateUUID:Ei,clamp:He,euclideanModulo:Lc,mapLinear:qf,inverseLerp:Yf,lerp:Js,damp:Zf,pingpong:$f,smoothstep:Jf,smootherstep:Kf,randInt:Qf,randFloat:jf,randFloatSpread:tp,seededRandom:ep,degToRad:np,radToDeg:ip,isPowerOfTwo:sp,ceilPowerOfTwo:rp,floorPowerOfTwo:op,setQuaternionFromProperEuler:ap,normalize:nn,denormalize:us},ut=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Jt=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],M=s[1],y=s[4],_=s[7],R=s[2],T=s[5],w=s[8];return r[0]=o*x+a*M+l*R,r[3]=o*m+a*y+l*T,r[6]=o*p+a*_+l*w,r[1]=c*x+h*M+u*R,r[4]=c*m+h*y+u*T,r[7]=c*p+h*_+u*w,r[2]=d*x+f*M+g*R,r[5]=d*m+f*y+g*T,r[8]=d*p+f*_+g*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(_a.makeScale(t,e)),this}rotate(t){return this.premultiply(_a.makeRotation(-t)),this}translate(t,e){return this.premultiply(_a.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},_a=new Jt;function Zu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lp(){let i=fo("canvas");return i.style.display="block",i}var Ch={};function Ys(i){i in Ch||(Ch[i]=!0,console.warn(i))}function cp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function hp(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function up(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var re={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===me&&(i.r=ii(i.r),i.g=ii(i.g),i.b=ii(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===me&&(i.r=gs(i.r),i.g=gs(i.g),i.b=gs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===yi?qo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ih=[.64,.33,.3,.6,.15,.06],Ph=[.2126,.7152,.0722],Lh=[.3127,.329],Dh=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uh=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);re.define({[Is]:{primaries:Ih,whitePoint:Lh,transfer:qo,toXYZ:Dh,fromXYZ:Uh,luminanceCoefficients:Ph,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:Ih,whitePoint:Lh,transfer:me,toXYZ:Dh,fromXYZ:Uh,luminanceCoefficients:Ph,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}});var Ki,Ol=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ki===void 0&&(Ki=fo("canvas")),Ki.width=t.width,Ki.height=t.height;let n=Ki.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ki}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=fo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ii(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ii(e[n]/255)*255):e[n]=ii(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},dp=0,po=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Ei(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ya(s[o].image)):r.push(ya(s[o]))}else r=ya(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ya(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var fp=0,an=class i extends Si{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=zi,s=zi,r=zn,o=In,a=vn,l=si,c=i.DEFAULT_ANISOTROPY,h=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Ei(),this.name="",this.source=new po(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case er:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case ll:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case er:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case ll:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Bu;an.DEFAULT_ANISOTROPY=1;var ae=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,_=(f+1)/2,R=(p+1)/2,T=(h+d)/4,w=(u+x)/4,A=(g+m)/4;return y>_&&y>R?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=w/n):_>R?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=A/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=w/r,s=A/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bl=class extends Si{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new an(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new po(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ri=class extends Bl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},mo=class extends an{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fl=class extends an{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ve=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-a,p=l*d+c*f+h*g+u*x,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let R=Math.sqrt(y),T=Math.atan2(R,p*M);m=Math.sin(m*T)/R,a=Math.sin(a*T)/R}let _=a*M;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(He(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return va.copy(this).projectOnVector(t),this.sub(va)}reflect(t){return this.sub(va.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},va=new P,Nh=new Ve,kn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pr.copy(n.boundingBox)),Pr.applyMatrix4(t.matrixWorld),this.union(Pr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ks),Lr.subVectors(this.max,ks),Qi.subVectors(t.a,ks),ji.subVectors(t.b,ks),ts.subVectors(t.c,ks),fi.subVectors(ji,Qi),pi.subVectors(ts,ji),Ci.subVectors(Qi,ts);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Ci.z,Ci.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Ci.z,0,-Ci.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Ci.y,Ci.x,0];return!Ma(e,Qi,ji,ts,Lr)||(e=[1,0,0,0,1,0,0,0,1],!Ma(e,Qi,ji,ts,Lr))?!1:(Dr.crossVectors(fi,pi),e=[Dr.x,Dr.y,Dr.z],Ma(e,Qi,ji,ts,Lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},$n=[new P,new P,new P,new P,new P,new P,new P,new P],Tn=new P,Pr=new kn,Qi=new P,ji=new P,ts=new P,fi=new P,pi=new P,Ci=new P,ks=new P,Lr=new P,Dr=new P,Ii=new P;function Ma(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ii.fromArray(i,r);let a=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),l=t.dot(Ii),c=e.dot(Ii),h=n.dot(Ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var pp=new kn,Hs=new P,ba=new P,Hn=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):pp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hs.subVectors(t,this.center);let e=Hs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Hs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ba.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hs.copy(t.center).add(ba)),this.expandByPoint(Hs.copy(t.center).sub(ba))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Jn=new P,Sa=new P,Ur=new P,mi=new P,wa=new P,Nr=new P,Ea=new P,ir=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Sa.copy(t).add(e).multiplyScalar(.5),Ur.copy(e).sub(t).normalize(),mi.copy(this.origin).sub(Sa);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ur),a=mi.dot(this.direction),l=-mi.dot(Ur),c=mi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Sa).addScaledVector(Ur,d),f}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);let n=Jn.dot(this.direction),s=Jn.dot(Jn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,n,s,r){wa.subVectors(e,t),Nr.subVectors(n,t),Ea.crossVectors(wa,Nr);let o=this.direction.dot(Ea),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,t);let l=a*this.direction.dot(Nr.crossVectors(mi,Nr));if(l<0)return null;let c=a*this.direction.dot(wa.cross(mi));if(c<0||l+c>o)return null;let h=-a*mi.dot(Ea);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ft=class i{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,x,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/es.setFromMatrixColumn(t,0).length(),r=1/es.setFromMatrixColumn(t,1).length(),o=1/es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mp,t,gp)}lookAt(t,e,n){let s=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),gi.crossVectors(n,cn),gi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),gi.crossVectors(n,cn)),gi.normalize(),Or.crossVectors(cn,gi),s[0]=gi.x,s[4]=Or.x,s[8]=cn.x,s[1]=gi.y,s[5]=Or.y,s[9]=cn.y,s[2]=gi.z,s[6]=Or.z,s[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],y=n[7],_=n[11],R=n[15],T=s[0],w=s[4],A=s[8],b=s[12],v=s[1],I=s[5],D=s[9],U=s[13],O=s[2],H=s[6],z=s[10],j=s[14],G=s[3],ot=s[7],dt=s[11],it=s[15];return r[0]=o*T+a*v+l*O+c*G,r[4]=o*w+a*I+l*H+c*ot,r[8]=o*A+a*D+l*z+c*dt,r[12]=o*b+a*U+l*j+c*it,r[1]=h*T+u*v+d*O+f*G,r[5]=h*w+u*I+d*H+f*ot,r[9]=h*A+u*D+d*z+f*dt,r[13]=h*b+u*U+d*j+f*it,r[2]=g*T+x*v+m*O+p*G,r[6]=g*w+x*I+m*H+p*ot,r[10]=g*A+x*D+m*z+p*dt,r[14]=g*b+x*U+m*j+p*it,r[3]=M*T+y*v+_*O+R*G,r[7]=M*w+y*I+_*H+R*ot,r[11]=M*A+y*D+_*z+R*dt,r[15]=M*b+y*U+_*j+R*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+x*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=u*m*c-x*d*c+x*l*f-a*m*f-u*l*p+a*d*p,y=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,_=h*x*c-g*u*c+g*a*f-o*x*f-h*a*p+o*u*p,R=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,T=e*M+n*y+s*_+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/T;return t[0]=M*w,t[1]=(x*d*r-u*m*r-x*s*f+n*m*f+u*s*p-n*d*p)*w,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*p+n*l*p)*w,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*w,t[4]=y*w,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*w,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*w,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*w,t[8]=_*w,t[9]=(g*u*r-h*x*r-g*n*f+e*x*f+h*n*p-e*u*p)*w,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*w,t[12]=R*w,t[13]=(h*x*s-g*u*s+g*n*d-e*x*d-h*n*m+e*u*m)*w,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*w,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,M=l*c,y=l*h,_=l*u,R=n.x,T=n.y,w=n.z;return s[0]=(1-(x+p))*R,s[1]=(f+_)*R,s[2]=(g-y)*R,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(d+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+y)*w,s[9]=(m-M)*w,s[10]=(1-(d+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=es.set(s[0],s[1],s[2]).length(),o=es.set(s[4],s[5],s[6]).length(),a=es.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],An.copy(this);let c=1/r,h=1/o,u=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,e.setFromRotationMatrix(An),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ni){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),f,g;if(a===ni)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===uo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ni){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,f=(n+s)*h,g,x;if(a===ni)g=(o+r)*u,x=-2*u;else if(a===uo)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},es=new P,An=new Ft,mp=new P(0,0,0),gp=new P(1,1,1),gi=new P,Or=new P,cn=new P,Oh=new Ft,Bh=new Ve,De=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Oh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Oh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bh.setFromEuler(this),this.setFromQuaternion(Bh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};De.DEFAULT_ORDER="XYZ";var go=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},xp=0,Fh=new P,ns=new Ve,Kn=new Ft,Br=new P,Vs=new P,_p=new P,yp=new Ve,zh=new P(1,0,0),kh=new P(0,1,0),Hh=new P(0,0,1),Vh={type:"added"},vp={type:"removed"},is={type:"childadded",child:null},Ta={type:"childremoved",child:null},Ue=class i extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new De,n=new Ve,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ft},normalMatrix:{value:new Jt}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(zh,t)}rotateY(t){return this.rotateOnAxis(kh,t)}rotateZ(t){return this.rotateOnAxis(Hh,t)}translateOnAxis(t,e){return Fh.copy(t).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zh,t)}translateY(t){return this.translateOnAxis(kh,t)}translateZ(t){return this.translateOnAxis(Hh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Br.copy(t):Br.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Vs,Br,this.up):Kn.lookAt(Br,Vs,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),ns.setFromRotationMatrix(Kn),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vh),is.child=t,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vp),Ta.child=t,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vh),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,t,_p),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,yp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ue.DEFAULT_UP=new P(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=new P,Qn=new P,Aa=new P,jn=new P,ss=new P,rs=new P,Gh=new P,Ra=new P,Ca=new P,Ia=new P,Pa=new ae,La=new ae,Da=new ae,Bi=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Rn.subVectors(t,e),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Rn.subVectors(s,e),Qn.subVectors(n,e),Aa.subVectors(t,e);let o=Rn.dot(Rn),a=Rn.dot(Qn),l=Rn.dot(Aa),c=Qn.dot(Qn),h=Qn.dot(Aa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(a,jn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Pa.setScalar(0),La.setScalar(0),Da.setScalar(0),Pa.fromBufferAttribute(t,e),La.fromBufferAttribute(t,n),Da.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Pa,r.x),o.addScaledVector(La,r.y),o.addScaledVector(Da,r.z),o}static isFrontFacing(t,e,n,s){return Rn.subVectors(n,e),Qn.subVectors(t,e),Rn.cross(Qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Rn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ss.subVectors(s,n),rs.subVectors(r,n),Ra.subVectors(t,n);let l=ss.dot(Ra),c=rs.dot(Ra);if(l<=0&&c<=0)return e.copy(n);Ca.subVectors(t,s);let h=ss.dot(Ca),u=rs.dot(Ca);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ss,o);Ia.subVectors(t,r);let f=ss.dot(Ia),g=rs.dot(Ia);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(rs,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Gh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Gh,a);let p=1/(m+x+d);return o=x*p,a=d*p,e.copy(n).addScaledVector(ss,o).addScaledVector(rs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},$u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Fr={h:0,s:0,l:0};function Ua(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ot=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=Lc(t,1),e=He(e,0,1),n=He(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ua(o,r,t+1/3),this.g=Ua(o,r,t),this.b=Ua(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){let n=$u[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ii(t.r),this.g=ii(t.g),this.b=ii(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return re.fromWorkingColorSpace(Ke.copy(this),t),Math.round(He(Ke.r*255,0,255))*65536+Math.round(He(Ke.g*255,0,255))*256+Math.round(He(Ke.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(Ke.copy(this),e);let n=Ke.r,s=Ke.g,r=Ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=Qe){re.fromWorkingColorSpace(Ke.copy(this),t);let e=Ke.r,n=Ke.g,s=Ke.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(xi),this.setHSL(xi.h+t,xi.s+e,xi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(xi),t.getHSL(Fr);let n=Js(xi.h,Fr.h,e),s=Js(xi.s,Fr.s,e),r=Js(xi.l,Fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ke=new Ot;Ot.NAMES=$u;var Mp=0,oi=class extends Si{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Ei(),this.name="",this.blending=ps,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ka,this.blendDst=Qa,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(n.blending=this.blending),this.side!==bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ka&&(n.blendSrc=this.blendSrc),this.blendDst!==Qa&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ge=class extends oi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new De,this.combine=Wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Le=new P,zr=new ut,Re=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Th,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=us(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=nn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=us(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=us(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=us(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),n=nn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),n=nn(n,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),n=nn(n,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Th&&(t.usage=this.usage),t}};var xo=class extends Re{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var _o=class extends Re{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ne=class extends Re{constructor(t,e,n){super(new Float32Array(t),e,n)}},bp=0,yn=new Ft,Na=new Ue,os=new P,hn=new kn,Gs=new kn,ke=new P,Ee=class i extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zu(t)?_o:xo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,n){return yn.makeTranslation(t,e,n),this.applyMatrix4(yn),this}scale(t,e,n){return yn.makeScale(t,e,n),this.applyMatrix4(yn),this}lookAt(t){return Na.lookAt(t),Na.updateMatrix(),this.applyMatrix4(Na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Gs.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(hn.min,Gs.min),hn.expandByPoint(ke),ke.addVectors(hn.max,Gs.max),hn.expandByPoint(ke)):(hn.expandByPoint(Gs.min),hn.expandByPoint(Gs.max))}hn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ke.fromBufferAttribute(a,c),l&&(os.fromBufferAttribute(t,c),ke.add(os)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Re(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new P,l[A]=new P;let c=new P,h=new P,u=new P,d=new ut,f=new ut,g=new ut,x=new P,m=new P;function p(A,b,v){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[A].add(x),a[b].add(x),a[v].add(x),l[A].add(m),l[b].add(m),l[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let A=0,b=M.length;A<b;++A){let v=M[A],I=v.start,D=v.count;for(let U=I,O=I+D;U<O;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let y=new P,_=new P,R=new P,T=new P;function w(A){R.fromBufferAttribute(s,A),T.copy(R);let b=a[A];y.copy(b),y.sub(R.multiplyScalar(R.dot(b))).normalize(),_.crossVectors(T,b);let I=_.dot(l[A])<0?-1:1;o.setXYZW(A,y.x,y.y,y.z,I)}for(let A=0,b=M.length;A<b;++A){let v=M[A],I=v.start,D=v.count;for(let U=I,O=I+D;U<O;U+=3)w(t.getX(U+0)),w(t.getX(U+1)),w(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Re(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Re(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wh=new Ft,Pi=new ir,kr=new Hn,Xh=new P,Hr=new P,Vr=new P,Gr=new P,Oa=new P,Wr=new P,qh=new P,Xr=new P,de=class extends Ue{constructor(t=new Ee,e=new Ge){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Oa.fromBufferAttribute(u,t),o?Wr.addScaledVector(Oa,h):Wr.addScaledVector(Oa.sub(e),h))}e.add(Wr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(kr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(kr,Xh)===null||Pi.origin.distanceToSquared(Xh)>(t.far-t.near)**2))&&(Wh.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(Wh),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,R=y;_<R;_+=3){let T=a.getX(_),w=a.getX(_+1),A=a.getX(_+2);s=qr(this,p,t,n,c,h,u,T,w,A),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let M=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=qr(this,o,t,n,c,h,u,M,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,R=y;_<R;_+=3){let T=_,w=_+1,A=_+2;s=qr(this,p,t,n,c,h,u,T,w,A),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let M=m,y=m+1,_=m+2;s=qr(this,o,t,n,c,h,u,M,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Sp(i,t,e,n,s,r,o,a){let l;if(t.side===tn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===bi,a),l===null)return null;Xr.copy(a),Xr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Xr);return c<e.near||c>e.far?null:{distance:c,point:Xr.clone(),object:i}}function qr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Hr),i.getVertexPosition(l,Vr),i.getVertexPosition(c,Gr);let h=Sp(i,t,e,n,Hr,Vr,Gr,qh);if(h){let u=new P;Bi.getBarycoord(qh,Hr,Vr,Gr,u),s&&(h.uv=Bi.getInterpolatedAttribute(s,a,l,c,u,new ut)),r&&(h.uv1=Bi.getInterpolatedAttribute(r,a,l,c,u,new ut)),o&&(h.normal=Bi.getInterpolatedAttribute(o,a,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};Bi.getNormal(Hr,Vr,Gr,d.normal),h.face=d,h.barycoord=u}return h}var Vt=class i extends Ee{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(u,2));function g(x,m,p,M,y,_,R,T,w,A,b){let v=_/w,I=R/A,D=_/2,U=R/2,O=T/2,H=w+1,z=A+1,j=0,G=0,ot=new P;for(let dt=0;dt<z;dt++){let it=dt*I-U;for(let At=0;At<H;At++){let Gt=At*v-D;ot[x]=Gt*M,ot[m]=it*y,ot[p]=O,c.push(ot.x,ot.y,ot.z),ot[x]=0,ot[m]=0,ot[p]=T>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(At/w),u.push(1-dt/A),j+=1}}for(let dt=0;dt<A;dt++)for(let it=0;it<w;it++){let At=d+it+H*dt,Gt=d+it+H*(dt+1),q=d+(it+1)+H*(dt+1),nt=d+(it+1)+H*dt;l.push(At,Gt,nt),l.push(Gt,q,nt),G+=6}a.addGroup(f,G,b),f+=G,d+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Es(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function sn(i){let t={};for(let e=0;e<i.length;e++){let n=Es(i[e]);for(let s in n)t[s]=n[s]}return t}function wp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ju(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}var Ep={clone:Es,merge:sn},Tp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ap=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mn=class extends oi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tp,this.fragmentShader=Ap,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Es(t.uniforms),this.uniformsGroups=wp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},yo=class extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=ni}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},_i=new P,Yh=new ut,Zh=new ut,Ye=class extends yo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(_i.x,_i.y).multiplyScalar(-t/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-t/_i.z)}getViewSize(t,e){return this.getViewBounds(t,Yh,Zh),e.subVectors(Zh,Yh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan($s*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},as=-90,ls=1,sr=class extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ye(as,ls,t,e);s.layers=this.layers,this.add(s);let r=new Ye(as,ls,t,e);r.layers=this.layers,this.add(r);let o=new Ye(as,ls,t,e);o.layers=this.layers,this.add(o);let a=new Ye(as,ls,t,e);a.layers=this.layers,this.add(a);let l=new Ye(as,ls,t,e);l.layers=this.layers,this.add(l);let c=new Ye(as,ls,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===ni)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===uo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},vo=class extends an{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:vs,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},rr=class extends ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new vo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:zn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vt(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:vi});r.uniforms.tEquirect.value=e;let o=new de(s,r),a=e.minFilter;return e.minFilter===In&&(e.minFilter=zn),new sr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ba=new P,Rp=new P,Cp=new Jt,ei=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ba.subVectors(n,e).cross(Rp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ba),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Cp.getNormalMatrix(t),s=this.coplanarPoint(Ba).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Li=new Hn,Yr=new P,or=class{constructor(t=new ei,e=new ei,n=new ei,s=new ei,r=new ei,o=new ei){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ni){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],M=s[13],y=s[14],_=s[15];if(n[0].setComponents(l-r,d-c,m-f,_-p).normalize(),n[1].setComponents(l+r,d+c,m+f,_+p).normalize(),n[2].setComponents(l+o,d+h,m+g,_+M).normalize(),n[3].setComponents(l-o,d-h,m-g,_-M).normalize(),n[4].setComponents(l-a,d-u,m-x,_-y).normalize(),e===ni)n[5].setComponents(l+a,d+u,m+x,_+y).normalize();else if(e===uo)n[5].setComponents(a,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Yr.x=s.normal.x>0?t.max.x:t.min.x,Yr.y=s.normal.y>0?t.max.y:t.min.y,Yr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ku(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ip(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Vn=class i extends Ee{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let M=p*d-o;for(let y=0;y<c;y++){let _=y*u-r;g.push(_,-M,0),x.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){let y=M+c*p,_=M+c*(p+1),R=M+1+c*(p+1),T=M+1+c*p;f.push(y,_,T),f.push(_,R,T)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(x,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Pp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lp=`#ifdef USE_ALPHAHASH
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
#endif`,Dp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Op=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bp=`#ifdef USE_AOMAP
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
#endif`,Fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zp=`#ifdef USE_BATCHING
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
#endif`,kp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wp=`#ifdef USE_IRIDESCENCE
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
#endif`,Xp=`#ifdef USE_BUMPMAP
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
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,tm=`#define PI 3.141592653589793
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
} // validated`,em=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nm=`vec3 transformedNormal = objectNormal;
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
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,om=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,am="gl_FragColor = linearToOutputTexel( gl_FragColor );",lm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cm=`#ifdef USE_ENVMAP
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
#endif`,hm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,um=`#ifdef USE_ENVMAP
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
#endif`,dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
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
#endif`,pm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_m=`#ifdef USE_GRADIENTMAP
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
}`,ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bm=`uniform bool receiveShadow;
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
#endif`,Sm=`#ifdef USE_ENVMAP
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
#endif`,wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rm=`PhysicalMaterial material;
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
#endif`,Cm=`struct PhysicalMaterial {
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
}`,Im=`
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
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Um=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Om=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,km=`#if defined( USE_POINTS_UV )
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
#endif`,Hm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
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
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$m=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jm=`#ifdef USE_NORMALMAP
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
#endif`,t0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,n0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,i0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,r0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,o0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,u0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,p0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,m0=`float getShadowMask() {
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
}`,g0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x0=`#ifdef USE_SKINNING
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
#endif`,_0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
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
#endif`,v0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,w0=`#ifdef USE_TRANSMISSION
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
#endif`,E0=`#ifdef USE_TRANSMISSION
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,I0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P0=`uniform sampler2D t2D;
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
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`#include <common>
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
}`,B0=`#if DEPTH_PACKING == 3200
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
}`,F0=`#define DISTANCE
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
}`,z0=`#define DISTANCE
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
}`,k0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,H0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`uniform float scale;
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
}`,G0=`uniform vec3 diffuse;
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
}`,W0=`#include <common>
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
}`,X0=`uniform vec3 diffuse;
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
}`,q0=`#define LAMBERT
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
}`,Y0=`#define LAMBERT
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
}`,Z0=`#define MATCAP
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
}`,$0=`#define MATCAP
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
}`,J0=`#define NORMAL
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
}`,K0=`#define NORMAL
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
}`,Q0=`#define PHONG
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
}`,j0=`#define PHONG
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
}`,tg=`#define STANDARD
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
}`,eg=`#define STANDARD
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
}`,ng=`#define TOON
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
}`,ig=`#define TOON
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
}`,sg=`uniform float size;
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
}`,rg=`uniform vec3 diffuse;
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
}`,og=`#include <common>
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
}`,ag=`uniform vec3 color;
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
}`,lg=`uniform float rotation;
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
}`,cg=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:Pp,alphahash_pars_fragment:Lp,alphamap_fragment:Dp,alphamap_pars_fragment:Up,alphatest_fragment:Np,alphatest_pars_fragment:Op,aomap_fragment:Bp,aomap_pars_fragment:Fp,batching_pars_vertex:zp,batching_vertex:kp,begin_vertex:Hp,beginnormal_vertex:Vp,bsdfs:Gp,iridescence_fragment:Wp,bumpmap_pars_fragment:Xp,clipping_planes_fragment:qp,clipping_planes_pars_fragment:Yp,clipping_planes_pars_vertex:Zp,clipping_planes_vertex:$p,color_fragment:Jp,color_pars_fragment:Kp,color_pars_vertex:Qp,color_vertex:jp,common:tm,cube_uv_reflection_fragment:em,defaultnormal_vertex:nm,displacementmap_pars_vertex:im,displacementmap_vertex:sm,emissivemap_fragment:rm,emissivemap_pars_fragment:om,colorspace_fragment:am,colorspace_pars_fragment:lm,envmap_fragment:cm,envmap_common_pars_fragment:hm,envmap_pars_fragment:um,envmap_pars_vertex:dm,envmap_physical_pars_fragment:Sm,envmap_vertex:fm,fog_vertex:pm,fog_pars_vertex:mm,fog_fragment:gm,fog_pars_fragment:xm,gradientmap_pars_fragment:_m,lightmap_pars_fragment:ym,lights_lambert_fragment:vm,lights_lambert_pars_fragment:Mm,lights_pars_begin:bm,lights_toon_fragment:wm,lights_toon_pars_fragment:Em,lights_phong_fragment:Tm,lights_phong_pars_fragment:Am,lights_physical_fragment:Rm,lights_physical_pars_fragment:Cm,lights_fragment_begin:Im,lights_fragment_maps:Pm,lights_fragment_end:Lm,logdepthbuf_fragment:Dm,logdepthbuf_pars_fragment:Um,logdepthbuf_pars_vertex:Nm,logdepthbuf_vertex:Om,map_fragment:Bm,map_pars_fragment:Fm,map_particle_fragment:zm,map_particle_pars_fragment:km,metalnessmap_fragment:Hm,metalnessmap_pars_fragment:Vm,morphinstance_vertex:Gm,morphcolor_vertex:Wm,morphnormal_vertex:Xm,morphtarget_pars_vertex:qm,morphtarget_vertex:Ym,normal_fragment_begin:Zm,normal_fragment_maps:$m,normal_pars_fragment:Jm,normal_pars_vertex:Km,normal_vertex:Qm,normalmap_pars_fragment:jm,clearcoat_normal_fragment_begin:t0,clearcoat_normal_fragment_maps:e0,clearcoat_pars_fragment:n0,iridescence_pars_fragment:i0,opaque_fragment:s0,packing:r0,premultiplied_alpha_fragment:o0,project_vertex:a0,dithering_fragment:l0,dithering_pars_fragment:c0,roughnessmap_fragment:h0,roughnessmap_pars_fragment:u0,shadowmap_pars_fragment:d0,shadowmap_pars_vertex:f0,shadowmap_vertex:p0,shadowmask_pars_fragment:m0,skinbase_vertex:g0,skinning_pars_vertex:x0,skinning_vertex:_0,skinnormal_vertex:y0,specularmap_fragment:v0,specularmap_pars_fragment:M0,tonemapping_fragment:b0,tonemapping_pars_fragment:S0,transmission_fragment:w0,transmission_pars_fragment:E0,uv_pars_fragment:T0,uv_pars_vertex:A0,uv_vertex:R0,worldpos_vertex:C0,background_vert:I0,background_frag:P0,backgroundCube_vert:L0,backgroundCube_frag:D0,cube_vert:U0,cube_frag:N0,depth_vert:O0,depth_frag:B0,distanceRGBA_vert:F0,distanceRGBA_frag:z0,equirect_vert:k0,equirect_frag:H0,linedashed_vert:V0,linedashed_frag:G0,meshbasic_vert:W0,meshbasic_frag:X0,meshlambert_vert:q0,meshlambert_frag:Y0,meshmatcap_vert:Z0,meshmatcap_frag:$0,meshnormal_vert:J0,meshnormal_frag:K0,meshphong_vert:Q0,meshphong_frag:j0,meshphysical_vert:tg,meshphysical_frag:eg,meshtoon_vert:ng,meshtoon_frag:ig,points_vert:sg,points_frag:rg,shadow_vert:og,shadow_frag:ag,sprite_vert:lg,sprite_frag:cg},mt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Fn={basic:{uniforms:sn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:sn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:sn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:sn([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:sn([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:sn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:sn([mt.points,mt.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:sn([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:sn([mt.common,mt.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:sn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:sn([mt.sprite,mt.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:sn([mt.common,mt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:sn([mt.lights,mt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};Fn.physical={uniforms:sn([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};var Zr={r:0,b:0,g:0},Di=new De,hg=new Ft;function ug(i,t,e,n,s,r,o){let a=new Ot(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?e:t).get(y)),y}function x(M){let y=!1,_=g(M);_===null?p(a,l):_&&_.isColor&&(p(_,1),y=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===Xo)?(h===void 0&&(h=new de(new Vt(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:Es(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Di.copy(y.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(hg.makeRotationFromEuler(Di)),h.material.toneMapped=re.getTransfer(_.colorSpace)!==me,(u!==_||d!==_.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new de(new Vn(2,2),new Mn({name:"BackgroundMaterial",uniforms:Es(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=re.getTransfer(_.colorSpace)!==me,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,y){M.getRGB(Zr,Ju(i)),n.buffers.color.setClear(Zr.r,Zr.g,Zr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:x,addToRenderList:m}}function dg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(v,I,D,U,O){let H=!1,z=u(U,D,I);r!==z&&(r=z,c(r.object)),H=f(v,U,D,O),H&&g(v,U,D,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(v,I,D,U),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,I,D){let U=D.wireframe===!0,O=n[v.id];O===void 0&&(O={},n[v.id]=O);let H=O[I.id];H===void 0&&(H={},O[I.id]=H);let z=H[U];return z===void 0&&(z=d(l()),H[U]=z),z}function d(v){let I=[],D=[],U=[];for(let O=0;O<e;O++)I[O]=0,D[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:D,attributeDivisors:U,object:v,attributes:{},index:null}}function f(v,I,D,U){let O=r.attributes,H=I.attributes,z=0,j=D.getAttributes();for(let G in j)if(j[G].location>=0){let dt=O[G],it=H[G];if(it===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(it=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(it=v.instanceColor)),dt===void 0||dt.attribute!==it||it&&dt.data!==it.data)return!0;z++}return r.attributesNum!==z||r.index!==U}function g(v,I,D,U){let O={},H=I.attributes,z=0,j=D.getAttributes();for(let G in j)if(j[G].location>=0){let dt=H[G];dt===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(dt=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(dt=v.instanceColor));let it={};it.attribute=dt,dt&&dt.data&&(it.data=dt.data),O[G]=it,z++}r.attributes=O,r.attributesNum=z,r.index=U}function x(){let v=r.newAttributes;for(let I=0,D=v.length;I<D;I++)v[I]=0}function m(v){p(v,0)}function p(v,I){let D=r.newAttributes,U=r.enabledAttributes,O=r.attributeDivisors;D[v]=1,U[v]===0&&(i.enableVertexAttribArray(v),U[v]=1),O[v]!==I&&(i.vertexAttribDivisor(v,I),O[v]=I)}function M(){let v=r.newAttributes,I=r.enabledAttributes;for(let D=0,U=I.length;D<U;D++)I[D]!==v[D]&&(i.disableVertexAttribArray(D),I[D]=0)}function y(v,I,D,U,O,H,z){z===!0?i.vertexAttribIPointer(v,I,D,O,H):i.vertexAttribPointer(v,I,D,U,O,H)}function _(v,I,D,U){x();let O=U.attributes,H=D.getAttributes(),z=I.defaultAttributeValues;for(let j in H){let G=H[j];if(G.location>=0){let ot=O[j];if(ot===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor)),ot!==void 0){let dt=ot.normalized,it=ot.itemSize,At=t.get(ot);if(At===void 0)continue;let Gt=At.buffer,q=At.type,nt=At.bytesPerElement,pt=q===i.INT||q===i.UNSIGNED_INT||ot.gpuType===wc;if(ot.isInterleavedBufferAttribute){let ct=ot.data,Ut=ct.stride,zt=ot.offset;if(ct.isInstancedInterleavedBuffer){for(let Bt=0;Bt<G.locationSize;Bt++)p(G.location+Bt,ct.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Bt=0;Bt<G.locationSize;Bt++)m(G.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let Bt=0;Bt<G.locationSize;Bt++)y(G.location+Bt,it/G.locationSize,q,dt,Ut*nt,(zt+it/G.locationSize*Bt)*nt,pt)}else{if(ot.isInstancedBufferAttribute){for(let ct=0;ct<G.locationSize;ct++)p(G.location+ct,ot.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let ct=0;ct<G.locationSize;ct++)m(G.location+ct);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let ct=0;ct<G.locationSize;ct++)y(G.location+ct,it/G.locationSize,q,dt,it*nt,it/G.locationSize*ct*nt,pt)}}else if(z!==void 0){let dt=z[j];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(G.location,dt);break;case 3:i.vertexAttrib3fv(G.location,dt);break;case 4:i.vertexAttrib4fv(G.location,dt);break;default:i.vertexAttrib1fv(G.location,dt)}}}}M()}function R(){A();for(let v in n){let I=n[v];for(let D in I){let U=I[D];for(let O in U)h(U[O].object),delete U[O];delete I[D]}delete n[v]}}function T(v){if(n[v.id]===void 0)return;let I=n[v.id];for(let D in I){let U=I[D];for(let O in U)h(U[O].object),delete U[O];delete I[D]}delete n[v.id]}function w(v){for(let I in n){let D=n[I];if(D[v.id]===void 0)continue;let U=D[v.id];for(let O in U)h(U[O].object),delete U[O];delete D[v.id]}}function A(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function fg(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function pg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==vn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let A=w===_r&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==si&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Pn&&!A)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:R,maxSamples:T}}function mg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new ei,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,y=M*4,_=p.clippingState||null;l.value=_,_=h(g,d,y,f);for(let R=0;R!==y;++R)_[R]=e[R];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=f;y!==x;++y,_+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function gg(i){let t=new WeakMap;function e(o,a){return a===ol?o.mapping=vs:a===al&&(o.mapping=Ms),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ol||a===al)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new rr(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Mo=class extends yo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ds=4,$h=[.125,.215,.35,.446,.526,.582],Fi=20,Fa=new Mo,Jh=new Ot,za=null,ka=0,Ha=0,Va=!1,Ni=(1+Math.sqrt(5))/2,cs=1/Ni,Kh=[new P(-Ni,cs,0),new P(Ni,cs,0),new P(-cs,0,Ni),new P(cs,0,Ni),new P(0,Ni,-cs),new P(0,Ni,cs),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],bo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){za=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(za,ka,Ha),this._renderer.xr.enabled=Va,t.scissorTest=!1,$r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vs||t.mapping===Ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),za=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:_r,format:vn,colorSpace:Is,depthBuffer:!1},s=Qh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xg(r)),this._blurMaterial=_g(r,t,e)}return s}_compileMaterial(t){let e=new de(this._lodPlanes[0],t);this._renderer.compile(e,Fa)}_sceneToCubeUV(t,e,n,s){let a=new Ye(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Jh),h.toneMapping=Mi,h.autoClear=!1;let f=new Ge({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new de(new Vt,f),x=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Jh),x=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let y=this._cubeSize;$r(s,M*y,p>2?y:0,y,y),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===vs||t.mapping===Ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new de(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;$r(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Fa)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Kh[(s-r-1)%Kh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new de(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Fi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Fi;m>Fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fi}`);let p=[],M=0;for(let w=0;w<Fi;++w){let A=w/x,b=Math.exp(-A*A/2);p.push(b),w===0?M+=b:w<m&&(M+=2*b)}for(let w=0;w<p.length;w++)p[w]=p[w]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let _=this._sizeLods[s],R=3*_*(s>y-ds?s-y+ds:0),T=4*(this._cubeSize-_);$r(e,R,T,3*_,2*_),l.setRenderTarget(e),l.render(u,Fa)}};function xg(i){let t=[],e=[],n=[],s=i,r=i-ds+1+$h.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ds?l=$h[o-i+ds-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*f),y=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){let w=T%3*2/3-1,A=T>2?0:-1,b=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];M.set(b,x*g*T),y.set(d,m*g*T);let v=[T,T,T,T,T,T];_.set(v,p*g*T)}let R=new Ee;R.setAttribute("position",new Re(M,x)),R.setAttribute("uv",new Re(y,m)),R.setAttribute("faceIndex",new Re(_,p)),t.push(R),s>ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Qh(i,t,e){let n=new ri(i,t,e);return n.texture.mapping=Xo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $r(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function _g(i,t,e){let n=new Float32Array(Fi),s=new P(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:vi,depthTest:!1,depthWrite:!1})}function jh(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:vi,depthTest:!1,depthWrite:!1})}function tu(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Dc(){return`

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
	`}function yg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===ol||l===al,h=l===vs||l===Ms;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new bo(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new bo(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function vg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ys("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Mg(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let M=f.array;x=f.version;for(let y=0,_=M.length;y<_;y+=3){let R=M[y+0],T=M[y+1],w=M[y+2];d.push(R,T,T,w,w,R)}}else if(g!==void 0){let M=g.array;x=g.version;for(let y=0,_=M.length/3-1;y<_;y+=3){let R=y+0,T=y+1,w=y+2;d.push(R,T,T,w,w,R)}}else return;let m=new(Zu(d)?_o:xo)(d,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function bg(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Sg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function wg(i,t,e){let n=new WeakMap,s=new ae;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,R=1;_>t.maxTextureSize&&(R=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let T=new Float32Array(_*R*4*u),w=new mo(T,_,R,u);w.type=Pn,w.needsUpdate=!0;let A=y*4;for(let v=0;v<u;v++){let I=m[v],D=p[v],U=M[v],O=_*R*4*v;for(let H=0;H<I.count;H++){let z=H*A;f===!0&&(s.fromBufferAttribute(I,H),T[O+z+0]=s.x,T[O+z+1]=s.y,T[O+z+2]=s.z,T[O+z+3]=0),g===!0&&(s.fromBufferAttribute(D,H),T[O+z+4]=s.x,T[O+z+5]=s.y,T[O+z+6]=s.z,T[O+z+7]=0),x===!0&&(s.fromBufferAttribute(U,H),T[O+z+8]=s.x,T[O+z+9]=s.y,T[O+z+10]=s.z,T[O+z+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new ut(_,R)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Eg(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var So=class extends an{constructor(t,e,n,s,r,o,a,l,c,h=ms){if(h!==ms&&h!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ms&&(n=ki),n===void 0&&h===Ss&&(n=bs),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:un,this.minFilter=l!==void 0?l:un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Qu=new an,eu=new So(1,1),ju=new mo,td=new Fl,ed=new vo,nu=[],iu=[],su=new Float32Array(16),ru=new Float32Array(9),ou=new Float32Array(4);function Ps(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=nu[s];if(r===void 0&&(r=new Float32Array(s),nu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Yo(i,t){let e=iu[t];e===void 0&&(e=new Int32Array(t),iu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Tg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ag(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function Rg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function Cg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function Ig(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;ou.set(n),i.uniformMatrix2fv(this.addr,!1,ou),Oe(e,n)}}function Pg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;ru.set(n),i.uniformMatrix3fv(this.addr,!1,ru),Oe(e,n)}}function Lg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;su.set(n),i.uniformMatrix4fv(this.addr,!1,su),Oe(e,n)}}function Dg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function Ng(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function Og(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function Bg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function Hg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(eu.compareFunction=Yu,r=eu):r=Qu,e.setTexture2D(t||r,s)}function Vg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||td,s)}function Gg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ed,s)}function Wg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ju,s)}function Xg(i){switch(i){case 5126:return Tg;case 35664:return Ag;case 35665:return Rg;case 35666:return Cg;case 35674:return Ig;case 35675:return Pg;case 35676:return Lg;case 5124:case 35670:return Dg;case 35667:case 35671:return Ug;case 35668:case 35672:return Ng;case 35669:case 35673:return Og;case 5125:return Bg;case 36294:return Fg;case 36295:return zg;case 36296:return kg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Vg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Wg}}function qg(i,t){i.uniform1fv(this.addr,t)}function Yg(i,t){let e=Ps(t,this.size,2);i.uniform2fv(this.addr,e)}function Zg(i,t){let e=Ps(t,this.size,3);i.uniform3fv(this.addr,e)}function $g(i,t){let e=Ps(t,this.size,4);i.uniform4fv(this.addr,e)}function Jg(i,t){let e=Ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Kg(i,t){let e=Ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Qg(i,t){let e=Ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function jg(i,t){i.uniform1iv(this.addr,t)}function tx(i,t){i.uniform2iv(this.addr,t)}function ex(i,t){i.uniform3iv(this.addr,t)}function nx(i,t){i.uniform4iv(this.addr,t)}function ix(i,t){i.uniform1uiv(this.addr,t)}function sx(i,t){i.uniform2uiv(this.addr,t)}function rx(i,t){i.uniform3uiv(this.addr,t)}function ox(i,t){i.uniform4uiv(this.addr,t)}function ax(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Qu,r[o])}function lx(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||td,r[o])}function cx(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ed,r[o])}function hx(i,t,e){let n=this.cache,s=t.length,r=Yo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ju,r[o])}function ux(i){switch(i){case 5126:return qg;case 35664:return Yg;case 35665:return Zg;case 35666:return $g;case 35674:return Jg;case 35675:return Kg;case 35676:return Qg;case 5124:case 35670:return jg;case 35667:case 35671:return tx;case 35668:case 35672:return ex;case 35669:case 35673:return nx;case 5125:return ix;case 36294:return sx;case 36295:return rx;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return lx;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return hx}}var zl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Xg(e.type)}},kl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ux(e.type)}},Hl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ga=/(\w+)(\])?(\[|\.)?/g;function au(i,t){i.seq.push(t),i.map[t.id]=t}function dx(i,t,e){let n=i.name,s=n.length;for(Ga.lastIndex=0;;){let r=Ga.exec(n),o=Ga.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){au(e,c===void 0?new zl(a,i,t):new kl(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Hl(a),au(e,u)),e=u}}}var xs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);dx(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function lu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var fx=37297,px=0;function mx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var cu=new Jt;function gx(i){re._getMatrix(cu,re.workingColorSpace,i);let t=`mat3( ${cu.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case qo:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function hu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+mx(i.getShaderSource(t),o)}else return s}function xx(i,t){let e=gx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function _x(i,t){let e;switch(t){case Rf:e="Linear";break;case Cf:e="Reinhard";break;case If:e="Cineon";break;case Sc:e="ACESFilmic";break;case Lf:e="AgX";break;case Df:e="Neutral";break;case Pf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Jr=new P;function yx(){re.getLuminanceCoefficients(Jr);let i=Jr.x.toFixed(4),t=Jr.y.toFixed(4),e=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function Mx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function bx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Zs(i){return i!==""}function uu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function du(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Sx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vl(i){return i.replace(Sx,Ex)}var wx=new Map;function Ex(i,t){let e=Qt[t];if(e===void 0){let n=wx.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Vl(e)}var Tx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(i){return i.replace(Tx,Ax)}function Ax(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Rx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Go?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===bc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ti&&(t="SHADOWMAP_TYPE_VSM"),t}function Cx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vs:case Ms:t="ENVMAP_TYPE_CUBE";break;case Xo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ix(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ms:t="ENVMAP_MODE_REFRACTION";break}return t}function Px(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wo:t="ENVMAP_BLENDING_MULTIPLY";break;case Un:t="ENVMAP_BLENDING_MIX";break;case Af:t="ENVMAP_BLENDING_ADD";break}return t}function Lx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Dx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Rx(e),c=Cx(e),h=Ix(e),u=Px(e),d=Lx(e),f=vx(e),g=Mx(r),x=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),p.length>0&&(p+=`
`)):(m=[pu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),p=[pu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mi?"#define TONE_MAPPING":"",e.toneMapping!==Mi?Qt.tonemapping_pars_fragment:"",e.toneMapping!==Mi?_x("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,xx("linearToOutputTexel",e.outputColorSpace),yx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zs).join(`
`)),o=Vl(o),o=uu(o,e),o=du(o,e),a=Vl(a),a=uu(a,e),a=du(a,e),o=fu(o),a=fu(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Ah?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ah?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=M+m+o,_=M+p+a,R=lu(s,s.VERTEX_SHADER,y),T=lu(s,s.FRAGMENT_SHADER,_);s.attachShader(x,R),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(I){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(x).trim(),U=s.getShaderInfoLog(R).trim(),O=s.getShaderInfoLog(T).trim(),H=!0,z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,R,T);else{let j=hu(s,R,"vertex"),G=hu(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+j+`
`+G)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(U===""||O==="")&&(z=!1);z&&(I.diagnostics={runnable:H,programLog:D,vertexShader:{log:U,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(R),s.deleteShader(T),A=new xs(s,x),b=bx(s,x)}let A;this.getUniforms=function(){return A===void 0&&w(this),A};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,fx)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=px++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=T,this}var Ux=0,Gl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Wl(t),e.set(t,n)),n}},Wl=class{constructor(t){this.id=Ux++,this.code=t,this.usedTimes=0}};function Nx(i,t,e,n,s,r,o){let a=new go,l=new Gl,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,I,D,U){let O=D.fog,H=U.geometry,z=b.isMeshStandardMaterial?D.environment:null,j=(b.isMeshStandardMaterial?e:t).get(b.envMap||z),G=j&&j.mapping===Xo?j.image.height:null,ot=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let dt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,it=dt!==void 0?dt.length:0,At=0;H.morphAttributes.position!==void 0&&(At=1),H.morphAttributes.normal!==void 0&&(At=2),H.morphAttributes.color!==void 0&&(At=3);let Gt,q,nt,pt;if(ot){let pe=Fn[ot];Gt=pe.vertexShader,q=pe.fragmentShader}else Gt=b.vertexShader,q=b.fragmentShader,l.update(b),nt=l.getVertexShaderID(b),pt=l.getFragmentShaderID(b);let ct=i.getRenderTarget(),Ut=i.state.buffers.depth.getReversed(),zt=U.isInstancedMesh===!0,Bt=U.isBatchedMesh===!0,ie=!!b.map,K=!!b.matcap,rt=!!j,L=!!b.aoMap,Dt=!!b.lightMap,st=!!b.bumpMap,wt=!!b.normalMap,ft=!!b.displacementMap,kt=!!b.emissiveMap,Mt=!!b.metalnessMap,C=!!b.roughnessMap,S=b.anisotropy>0,k=b.clearcoat>0,$=b.dispersion>0,et=b.iridescence>0,J=b.sheen>0,Rt=b.transmission>0,gt=S&&!!b.anisotropyMap,bt=k&&!!b.clearcoatMap,ee=k&&!!b.clearcoatNormalMap,at=k&&!!b.clearcoatRoughnessMap,Et=et&&!!b.iridescenceMap,Ht=et&&!!b.iridescenceThicknessMap,Xt=J&&!!b.sheenColorMap,Tt=J&&!!b.sheenRoughnessMap,se=!!b.specularMap,Kt=!!b.specularColorMap,ge=!!b.specularIntensityMap,N=Rt&&!!b.transmissionMap,xt=Rt&&!!b.thicknessMap,Y=!!b.gradientMap,Q=!!b.alphaMap,vt=b.alphaTest>0,_t=!!b.alphaHash,Zt=!!b.extensions,Ae=Mi;b.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(Ae=i.toneMapping);let $e={shaderID:ot,shaderType:b.type,shaderName:b.name,vertexShader:Gt,fragmentShader:q,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:pt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&U._colorsTexture!==null,instancing:zt,instancingColor:zt&&U.instanceColor!==null,instancingMorph:zt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Is,alphaToCoverage:!!b.alphaToCoverage,map:ie,matcap:K,envMap:rt,envMapMode:rt&&j.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:Dt,bumpMap:st,normalMap:wt,displacementMap:d&&ft,emissiveMap:kt,normalMapObjectSpace:wt&&b.normalMapType===Ff,normalMapTangentSpace:wt&&b.normalMapType===Pc,metalnessMap:Mt,roughnessMap:C,anisotropy:S,anisotropyMap:gt,clearcoat:k,clearcoatMap:bt,clearcoatNormalMap:ee,clearcoatRoughnessMap:at,dispersion:$,iridescence:et,iridescenceMap:Et,iridescenceThicknessMap:Ht,sheen:J,sheenColorMap:Xt,sheenRoughnessMap:Tt,specularMap:se,specularColorMap:Kt,specularIntensityMap:ge,transmission:Rt,transmissionMap:N,thicknessMap:xt,gradientMap:Y,opaque:b.transparent===!1&&b.blending===ps&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:vt,alphaHash:_t,combine:b.combine,mapUv:ie&&x(b.map.channel),aoMapUv:L&&x(b.aoMap.channel),lightMapUv:Dt&&x(b.lightMap.channel),bumpMapUv:st&&x(b.bumpMap.channel),normalMapUv:wt&&x(b.normalMap.channel),displacementMapUv:ft&&x(b.displacementMap.channel),emissiveMapUv:kt&&x(b.emissiveMap.channel),metalnessMapUv:Mt&&x(b.metalnessMap.channel),roughnessMapUv:C&&x(b.roughnessMap.channel),anisotropyMapUv:gt&&x(b.anisotropyMap.channel),clearcoatMapUv:bt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:ee&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&x(b.sheenRoughnessMap.channel),specularMapUv:se&&x(b.specularMap.channel),specularColorMapUv:Kt&&x(b.specularColorMap.channel),specularIntensityMapUv:ge&&x(b.specularIntensityMap.channel),transmissionMapUv:N&&x(b.transmissionMap.channel),thicknessMapUv:xt&&x(b.thicknessMap.channel),alphaMapUv:Q&&x(b.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(wt||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(ie||Q),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ut,skinning:U.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:At,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ae,decodeVideoTexture:ie&&b.map.isVideoTexture===!0&&re.getTransfer(b.map.colorSpace)===me,decodeVideoTextureEmissive:kt&&b.emissiveMap.isVideoTexture===!0&&re.getTransfer(b.emissiveMap.colorSpace)===me,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Cn,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Zt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&b.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function p(b){let v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(let I in b.defines)v.push(I),v.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(M(v,b),y(v,b),v.push(i.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function M(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function y(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let v=g[b.type],I;if(v){let D=Fn[v];I=Ep.clone(D.uniforms)}else I=b.uniforms;return I}function R(b,v){let I;for(let D=0,U=h.length;D<U;D++){let O=h[D];if(O.cacheKey===v){I=O,++I.usedTimes;break}}return I===void 0&&(I=new Dx(i,v,b,r),h.push(I)),I}function T(b){if(--b.usedTimes===0){let v=h.indexOf(b);h[v]=h[h.length-1],h.pop(),b.destroy()}}function w(b){l.remove(b)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:R,releaseProgram:T,releaseShaderCache:w,programs:h,dispose:A}}function Ox(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Bx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function mu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Bx),n.length>1&&n.sort(d||mu),s.length>1&&s.sort(d||mu)}function h(){for(let u=t,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Fx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new gu,i.set(n,[o])):s>=r.length?(o=new gu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function zx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Ot};break;case"SpotLight":e={position:new P,direction:new P,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function kx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Hx=0;function Vx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Gx(i){let t=new zx,e=kx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let s=new P,r=new Ft,o=new Ft;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,M=0,y=0,_=0,R=0,T=0,w=0;c.sort(Vx);for(let b=0,v=c.length;b<v;b++){let I=c[b],D=I.color,U=I.intensity,O=I.distance,H=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=D.r*U,u+=D.g*U,d+=D.b*U;else if(I.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(I.sh.coefficients[z],U);w++}else if(I.isDirectionalLight){let z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,G=e.get(I);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=z,f++}else if(I.isSpotLight){let z=t.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(D).multiplyScalar(U),z.distance=O,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,n.spot[x]=z;let j=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,j.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[x]=j.matrix,I.castShadow){let G=e.get(I);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=H,_++}x++}else if(I.isRectAreaLight){let z=t.get(I);z.color.copy(D).multiplyScalar(U),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=z,m++}else if(I.isPointLight){let z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){let j=I.shadow,G=e.get(I);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=z,g++}else if(I.isHemisphereLight){let z=t.get(I);z.skyColor.copy(I.color).multiplyScalar(U),z.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[p]=z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==x||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==M||A.numPointShadows!==y||A.numSpotShadows!==_||A.numSpotMaps!==R||A.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,A.directionalLength=f,A.pointLength=g,A.spotLength=x,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=M,A.numPointShadows=y,A.numSpotShadows=_,A.numSpotMaps=R,A.numLightProbes=w,n.version=Hx++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let y=c[p];if(y.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function xu(i){let t=new Gx(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Wx(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new xu(i),t.set(s,[a])):r>=o.length?(a=new xu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Xl=class extends oi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ql=class extends oi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Xx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qx=`uniform sampler2D shadow_pass;
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
}`;function Yx(i,t,e){let n=new or,s=new ut,r=new ut,o=new ae,a=new Xl({depthPacking:Bf}),l=new ql,c={},h=e.maxTextureSize,u={[bi]:tn,[tn]:bi,[Cn]:Cn},d=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:Xx,fragmentShader:qx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ee;g.setAttribute("position",new Re(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new de(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Go;let p=this.type;this.render=function(T,w,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),v=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),D=i.state;D.setBlending(vi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let U=p!==ti&&this.type===ti,O=p===ti&&this.type!==ti;for(let H=0,z=T.length;H<z;H++){let j=T[H],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let ot=G.getFrameExtents();if(s.multiply(ot),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ot.x),s.x=r.x*ot.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ot.y),s.y=r.y*ot.y,G.mapSize.y=r.y)),G.map===null||U===!0||O===!0){let it=this.type!==ti?{minFilter:un,magFilter:un}:{};G.map!==null&&G.map.dispose(),G.map=new ri(s.x,s.y,it),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let dt=G.getViewportCount();for(let it=0;it<dt;it++){let At=G.getViewport(it);o.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),D.viewport(o),G.updateMatrices(j,it),n=G.getFrustum(),_(w,A,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===ti&&M(G,A),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,v,I)};function M(T,w){let A=t.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ri(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(w,null,A,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(w,null,A,f,x,null)}function y(T,w,A,b){let v=null,I=A.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)v=I;else if(v=A.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let D=v.uuid,U=w.uuid,O=c[D];O===void 0&&(O={},c[D]=O);let H=O[U];H===void 0&&(H=v.clone(),O[U]=H,w.addEventListener("dispose",R)),v=H}if(v.visible=w.visible,v.wireframe=w.wireframe,b===ti?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:u[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,A.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let D=i.properties.get(v);D.light=A}return v}function _(T,w,A,b,v){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===ti)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,T.matrixWorld);let U=t.update(T),O=T.material;if(Array.isArray(O)){let H=U.groups;for(let z=0,j=H.length;z<j;z++){let G=H[z],ot=O[G.materialIndex];if(ot&&ot.visible){let dt=y(T,ot,b,v);T.onBeforeShadow(i,T,w,A,U,dt,G),i.renderBufferDirect(A,null,U,dt,T,G),T.onAfterShadow(i,T,w,A,U,dt,G)}}}else if(O.visible){let H=y(T,O,b,v);T.onBeforeShadow(i,T,w,A,U,H,null),i.renderBufferDirect(A,null,U,H,T,null),T.onAfterShadow(i,T,w,A,U,H,null)}}let D=T.children;for(let U=0,O=D.length;U<O;U++)_(D[U],w,A,b,v)}function R(T){T.target.removeEventListener("dispose",R);for(let A in c){let b=c[A],v=T.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}var Zx={[ja]:tl,[el]:sl,[nl]:rl,[ys]:il,[tl]:ja,[sl]:el,[rl]:nl,[il]:ys};function $x(i,t){function e(){let N=!1,xt=new ae,Y=null,Q=new ae(0,0,0,0);return{setMask:function(vt){Y!==vt&&!N&&(i.colorMask(vt,vt,vt,vt),Y=vt)},setLocked:function(vt){N=vt},setClear:function(vt,_t,Zt,Ae,$e){$e===!0&&(vt*=Ae,_t*=Ae,Zt*=Ae),xt.set(vt,_t,Zt,Ae),Q.equals(xt)===!1&&(i.clearColor(vt,_t,Zt,Ae),Q.copy(xt))},reset:function(){N=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let N=!1,xt=!1,Y=null,Q=null,vt=null;return{setReversed:function(_t){if(xt!==_t){let Zt=t.get("EXT_clip_control");xt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);let Ae=vt;vt=null,this.setClear(Ae)}xt=_t},getReversed:function(){return xt},setTest:function(_t){_t?ct(i.DEPTH_TEST):Ut(i.DEPTH_TEST)},setMask:function(_t){Y!==_t&&!N&&(i.depthMask(_t),Y=_t)},setFunc:function(_t){if(xt&&(_t=Zx[_t]),Q!==_t){switch(_t){case ja:i.depthFunc(i.NEVER);break;case tl:i.depthFunc(i.ALWAYS);break;case el:i.depthFunc(i.LESS);break;case ys:i.depthFunc(i.LEQUAL);break;case nl:i.depthFunc(i.EQUAL);break;case il:i.depthFunc(i.GEQUAL);break;case sl:i.depthFunc(i.GREATER);break;case rl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=_t}},setLocked:function(_t){N=_t},setClear:function(_t){vt!==_t&&(xt&&(_t=1-_t),i.clearDepth(_t),vt=_t)},reset:function(){N=!1,Y=null,Q=null,vt=null,xt=!1}}}function s(){let N=!1,xt=null,Y=null,Q=null,vt=null,_t=null,Zt=null,Ae=null,$e=null;return{setTest:function(pe){N||(pe?ct(i.STENCIL_TEST):Ut(i.STENCIL_TEST))},setMask:function(pe){xt!==pe&&!N&&(i.stencilMask(pe),xt=pe)},setFunc:function(pe,wn,Yn){(Y!==pe||Q!==wn||vt!==Yn)&&(i.stencilFunc(pe,wn,Yn),Y=pe,Q=wn,vt=Yn)},setOp:function(pe,wn,Yn){(_t!==pe||Zt!==wn||Ae!==Yn)&&(i.stencilOp(pe,wn,Yn),_t=pe,Zt=wn,Ae=Yn)},setLocked:function(pe){N=pe},setClear:function(pe){$e!==pe&&(i.clearStencil(pe),$e=pe)},reset:function(){N=!1,xt=null,Y=null,Q=null,vt=null,_t=null,Zt=null,Ae=null,$e=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,y=null,_=null,R=null,T=null,w=new Ot(0,0,0),A=0,b=!1,v=null,I=null,D=null,U=null,O=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,j=0,G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=j>=2);let ot=null,dt={},it=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),Gt=new ae().fromArray(it),q=new ae().fromArray(At);function nt(N,xt,Y,Q){let vt=new Uint8Array(4),_t=i.createTexture();i.bindTexture(N,_t),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<Y;Zt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(xt+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return _t}let pt={};pt[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),pt[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pt[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ct(i.DEPTH_TEST),o.setFunc(ys),st(!1),wt(_h),ct(i.CULL_FACE),L(vi);function ct(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Ut(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function zt(N,xt){return u[N]!==xt?(i.bindFramebuffer(N,xt),u[N]=xt,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xt),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function Bt(N,xt){let Y=f,Q=!1;if(N){Y=d.get(xt),Y===void 0&&(Y=[],d.set(xt,Y));let vt=N.textures;if(Y.length!==vt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,Zt=vt.length;_t<Zt;_t++)Y[_t]=i.COLOR_ATTACHMENT0+_t;Y.length=vt.length,Q=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Q=!0);Q&&i.drawBuffers(Y)}function ie(N){return g!==N?(i.useProgram(N),g=N,!0):!1}let K={[Oi]:i.FUNC_ADD,[hf]:i.FUNC_SUBTRACT,[uf]:i.FUNC_REVERSE_SUBTRACT};K[df]=i.MIN,K[ff]=i.MAX;let rt={[pf]:i.ZERO,[mf]:i.ONE,[gf]:i.SRC_COLOR,[Ka]:i.SRC_ALPHA,[bf]:i.SRC_ALPHA_SATURATE,[vf]:i.DST_COLOR,[_f]:i.DST_ALPHA,[xf]:i.ONE_MINUS_SRC_COLOR,[Qa]:i.ONE_MINUS_SRC_ALPHA,[Mf]:i.ONE_MINUS_DST_COLOR,[yf]:i.ONE_MINUS_DST_ALPHA,[Sf]:i.CONSTANT_COLOR,[wf]:i.ONE_MINUS_CONSTANT_COLOR,[Ef]:i.CONSTANT_ALPHA,[Tf]:i.ONE_MINUS_CONSTANT_ALPHA};function L(N,xt,Y,Q,vt,_t,Zt,Ae,$e,pe){if(N===vi){x===!0&&(Ut(i.BLEND),x=!1);return}if(x===!1&&(ct(i.BLEND),x=!0),N!==cf){if(N!==m||pe!==b){if((p!==Oi||_!==Oi)&&(i.blendEquation(i.FUNC_ADD),p=Oi,_=Oi),pe)switch(N){case ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _s:i.blendFunc(i.ONE,i.ONE);break;case yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case vh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _s:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case vh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,y=null,R=null,T=null,w.set(0,0,0),A=0,m=N,b=pe}return}vt=vt||xt,_t=_t||Y,Zt=Zt||Q,(xt!==p||vt!==_)&&(i.blendEquationSeparate(K[xt],K[vt]),p=xt,_=vt),(Y!==M||Q!==y||_t!==R||Zt!==T)&&(i.blendFuncSeparate(rt[Y],rt[Q],rt[_t],rt[Zt]),M=Y,y=Q,R=_t,T=Zt),(Ae.equals(w)===!1||$e!==A)&&(i.blendColor(Ae.r,Ae.g,Ae.b,$e),w.copy(Ae),A=$e),m=N,b=!1}function Dt(N,xt){N.side===Cn?Ut(i.CULL_FACE):ct(i.CULL_FACE);let Y=N.side===tn;xt&&(Y=!Y),st(Y),N.blending===ps&&N.transparent===!1?L(vi):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),kt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ct(i.SAMPLE_ALPHA_TO_COVERAGE):Ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(N){v!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),v=N)}function wt(N){N!==af?(ct(i.CULL_FACE),N!==I&&(N===_h?i.cullFace(i.BACK):N===lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ut(i.CULL_FACE),I=N}function ft(N){N!==D&&(z&&i.lineWidth(N),D=N)}function kt(N,xt,Y){N?(ct(i.POLYGON_OFFSET_FILL),(U!==xt||O!==Y)&&(i.polygonOffset(xt,Y),U=xt,O=Y)):Ut(i.POLYGON_OFFSET_FILL)}function Mt(N){N?ct(i.SCISSOR_TEST):Ut(i.SCISSOR_TEST)}function C(N){N===void 0&&(N=i.TEXTURE0+H-1),ot!==N&&(i.activeTexture(N),ot=N)}function S(N,xt,Y){Y===void 0&&(ot===null?Y=i.TEXTURE0+H-1:Y=ot);let Q=dt[Y];Q===void 0&&(Q={type:void 0,texture:void 0},dt[Y]=Q),(Q.type!==N||Q.texture!==xt)&&(ot!==Y&&(i.activeTexture(Y),ot=Y),i.bindTexture(N,xt||pt[N]),Q.type=N,Q.texture=xt)}function k(){let N=dt[ot];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function gt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function bt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ht(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Xt(N){Gt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Gt.copy(N))}function Tt(N){q.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),q.copy(N))}function se(N,xt){let Y=c.get(xt);Y===void 0&&(Y=new WeakMap,c.set(xt,Y));let Q=Y.get(N);Q===void 0&&(Q=i.getUniformBlockIndex(xt,N.name),Y.set(N,Q))}function Kt(N,xt){let Q=c.get(xt).get(N);l.get(xt)!==Q&&(i.uniformBlockBinding(xt,Q,N.__bindingPointIndex),l.set(xt,Q))}function ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ot=null,dt={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,y=null,_=null,R=null,T=null,w=new Ot(0,0,0),A=0,b=!1,v=null,I=null,D=null,U=null,O=null,Gt.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ct,disable:Ut,bindFramebuffer:zt,drawBuffers:Bt,useProgram:ie,setBlending:L,setMaterial:Dt,setFlipSided:st,setCullFace:wt,setLineWidth:ft,setPolygonOffset:kt,setScissorTest:Mt,activeTexture:C,bindTexture:S,unbindTexture:k,compressedTexImage2D:$,compressedTexImage3D:et,texImage2D:Et,texImage3D:Ht,updateUBOMapping:se,uniformBlockBinding:Kt,texStorage2D:ee,texStorage3D:at,texSubImage2D:J,texSubImage3D:Rt,compressedTexSubImage2D:gt,compressedTexSubImage3D:bt,scissor:Xt,viewport:Tt,reset:ge}}function _u(i,t,e,n){let s=Jx(n);switch(e){case Hu:return i*t;case Gu:return i*t;case Wu:return i*t*2;case Ac:return i*t/s.components*s.byteLength;case Rc:return i*t/s.components*s.byteLength;case Xu:return i*t*2/s.components*s.byteLength;case Cc:return i*t*2/s.components*s.byteLength;case Vu:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case Ic:return i*t*4/s.components*s.byteLength;case ro:case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ao:case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case hl:case dl:return Math.max(i,16)*Math.max(t,8)/4;case cl:case ul:return Math.max(i,8)*Math.max(t,8)/2;case fl:case pl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ml:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case gl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case _l:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case bl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case wl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case El:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case co:case Il:case Pl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case qu:case Ll:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Dl:case Ul:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jx(i){switch(i){case si:case Fu:return{byteLength:1,components:1};case nr:case zu:case _r:return{byteLength:2,components:1};case Ec:case Tc:return{byteLength:2,components:4};case ki:case wc:case Pn:return{byteLength:4,components:1};case ku:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Kx(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return f?new OffscreenCanvas(C,S):fo("canvas")}function x(C,S,k){let $=1,et=Mt(C);if((et.width>k||et.height>k)&&($=k/Math.max(et.width,et.height)),$<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let J=Math.floor($*et.width),Rt=Math.floor($*et.height);u===void 0&&(u=g(J,Rt));let gt=S?g(J,Rt):u;return gt.width=J,gt.height=Rt,gt.getContext("2d").drawImage(C,0,0,J,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+J+"x"+Rt+")."),gt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,S,k,$,et=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let J=S;if(S===i.RED&&(k===i.FLOAT&&(J=i.R32F),k===i.HALF_FLOAT&&(J=i.R16F),k===i.UNSIGNED_BYTE&&(J=i.R8)),S===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.R8UI),k===i.UNSIGNED_SHORT&&(J=i.R16UI),k===i.UNSIGNED_INT&&(J=i.R32UI),k===i.BYTE&&(J=i.R8I),k===i.SHORT&&(J=i.R16I),k===i.INT&&(J=i.R32I)),S===i.RG&&(k===i.FLOAT&&(J=i.RG32F),k===i.HALF_FLOAT&&(J=i.RG16F),k===i.UNSIGNED_BYTE&&(J=i.RG8)),S===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RG8UI),k===i.UNSIGNED_SHORT&&(J=i.RG16UI),k===i.UNSIGNED_INT&&(J=i.RG32UI),k===i.BYTE&&(J=i.RG8I),k===i.SHORT&&(J=i.RG16I),k===i.INT&&(J=i.RG32I)),S===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGB8UI),k===i.UNSIGNED_SHORT&&(J=i.RGB16UI),k===i.UNSIGNED_INT&&(J=i.RGB32UI),k===i.BYTE&&(J=i.RGB8I),k===i.SHORT&&(J=i.RGB16I),k===i.INT&&(J=i.RGB32I)),S===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),k===i.UNSIGNED_INT&&(J=i.RGBA32UI),k===i.BYTE&&(J=i.RGBA8I),k===i.SHORT&&(J=i.RGBA16I),k===i.INT&&(J=i.RGBA32I)),S===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),S===i.RGBA){let Rt=et?qo:re.getTransfer($);k===i.FLOAT&&(J=i.RGBA32F),k===i.HALF_FLOAT&&(J=i.RGBA16F),k===i.UNSIGNED_BYTE&&(J=Rt===me?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(C,S){let k;return C?S===null||S===ki||S===bs?k=i.DEPTH24_STENCIL8:S===Pn?k=i.DEPTH32F_STENCIL8:S===nr&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ki||S===bs?k=i.DEPTH_COMPONENT24:S===Pn?k=i.DEPTH_COMPONENT32F:S===nr&&(k=i.DEPTH_COMPONENT16),k}function R(C,S){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==un&&C.minFilter!==zn?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function T(C){let S=C.target;S.removeEventListener("dispose",T),A(S),S.isVideoTexture&&h.delete(S)}function w(C){let S=C.target;S.removeEventListener("dispose",w),v(S)}function A(C){let S=n.get(C);if(S.__webglInit===void 0)return;let k=C.source,$=d.get(k);if($){let et=$[S.__cacheKey];et.usedTimes--,et.usedTimes===0&&b(C),Object.keys($).length===0&&d.delete(k)}n.remove(C)}function b(C){let S=n.get(C);i.deleteTexture(S.__webglTexture);let k=C.source,$=d.get(k);delete $[S.__cacheKey],o.memory.textures--}function v(C){let S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(S.__webglFramebuffer[$]))for(let et=0;et<S.__webglFramebuffer[$].length;et++)i.deleteFramebuffer(S.__webglFramebuffer[$][et]);else i.deleteFramebuffer(S.__webglFramebuffer[$]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[$])}else{if(Array.isArray(S.__webglFramebuffer))for(let $=0;$<S.__webglFramebuffer.length;$++)i.deleteFramebuffer(S.__webglFramebuffer[$]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let $=0;$<S.__webglColorRenderbuffer.length;$++)S.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[$]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let k=C.textures;for(let $=0,et=k.length;$<et;$++){let J=n.get(k[$]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(k[$])}n.remove(C)}let I=0;function D(){I=0}function U(){let C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function O(C){let S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function H(C,S){let k=n.get(C);if(C.isVideoTexture&&ft(C),C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){let $=C.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(k,C,S);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+S)}function z(C,S){let k=n.get(C);if(C.version>0&&k.__version!==C.version){q(k,C,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+S)}function j(C,S){let k=n.get(C);if(C.version>0&&k.__version!==C.version){q(k,C,S);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+S)}function G(C,S){let k=n.get(C);if(C.version>0&&k.__version!==C.version){nt(k,C,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+S)}let ot={[er]:i.REPEAT,[zi]:i.CLAMP_TO_EDGE,[ll]:i.MIRRORED_REPEAT},dt={[un]:i.NEAREST,[Nf]:i.NEAREST_MIPMAP_NEAREST,[Ir]:i.NEAREST_MIPMAP_LINEAR,[zn]:i.LINEAR,[ga]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},it={[zf]:i.NEVER,[Xf]:i.ALWAYS,[kf]:i.LESS,[Yu]:i.LEQUAL,[Hf]:i.EQUAL,[Wf]:i.GEQUAL,[Vf]:i.GREATER,[Gf]:i.NOTEQUAL};function At(C,S){if(S.type===Pn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===zn||S.magFilter===ga||S.magFilter===Ir||S.magFilter===In||S.minFilter===zn||S.minFilter===ga||S.minFilter===Ir||S.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ot[S.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ot[S.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ot[S.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,dt[S.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,dt[S.minFilter]),S.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,it[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===un||S.minFilter!==Ir&&S.minFilter!==In||S.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Gt(C,S){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",T));let $=S.source,et=d.get($);et===void 0&&(et={},d.set($,et));let J=O(S);if(J!==C.__cacheKey){et[J]===void 0&&(et[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),et[J].usedTimes++;let Rt=et[C.__cacheKey];Rt!==void 0&&(et[C.__cacheKey].usedTimes--,Rt.usedTimes===0&&b(S)),C.__cacheKey=J,C.__webglTexture=et[J].texture}return k}function q(C,S,k){let $=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&($=i.TEXTURE_3D);let et=Gt(C,S),J=S.source;e.bindTexture($,C.__webglTexture,i.TEXTURE0+k);let Rt=n.get(J);if(J.version!==Rt.__version||et===!0){e.activeTexture(i.TEXTURE0+k);let gt=re.getPrimaries(re.workingColorSpace),bt=S.colorSpace===yi?null:re.getPrimaries(S.colorSpace),ee=S.colorSpace===yi||gt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let at=x(S.image,!1,s.maxTextureSize);at=kt(S,at);let Et=r.convert(S.format,S.colorSpace),Ht=r.convert(S.type),Xt=y(S.internalFormat,Et,Ht,S.colorSpace,S.isVideoTexture);At($,S);let Tt,se=S.mipmaps,Kt=S.isVideoTexture!==!0,ge=Rt.__version===void 0||et===!0,N=J.dataReady,xt=R(S,at);if(S.isDepthTexture)Xt=_(S.format===Ss,S.type),ge&&(Kt?e.texStorage2D(i.TEXTURE_2D,1,Xt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,Xt,at.width,at.height,0,Et,Ht,null));else if(S.isDataTexture)if(se.length>0){Kt&&ge&&e.texStorage2D(i.TEXTURE_2D,xt,Xt,se[0].width,se[0].height);for(let Y=0,Q=se.length;Y<Q;Y++)Tt=se[Y],Kt?N&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Tt.width,Tt.height,Et,Ht,Tt.data):e.texImage2D(i.TEXTURE_2D,Y,Xt,Tt.width,Tt.height,0,Et,Ht,Tt.data);S.generateMipmaps=!1}else Kt?(ge&&e.texStorage2D(i.TEXTURE_2D,xt,Xt,at.width,at.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at.width,at.height,Et,Ht,at.data)):e.texImage2D(i.TEXTURE_2D,0,Xt,at.width,at.height,0,Et,Ht,at.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Kt&&ge&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,Xt,se[0].width,se[0].height,at.depth);for(let Y=0,Q=se.length;Y<Q;Y++)if(Tt=se[Y],S.format!==vn)if(Et!==null)if(Kt){if(N)if(S.layerUpdates.size>0){let vt=_u(Tt.width,Tt.height,S.format,S.type);for(let _t of S.layerUpdates){let Zt=Tt.data.subarray(_t*vt/Tt.data.BYTES_PER_ELEMENT,(_t+1)*vt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,_t,Tt.width,Tt.height,1,Et,Zt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Tt.width,Tt.height,at.depth,Et,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Xt,Tt.width,Tt.height,at.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Tt.width,Tt.height,at.depth,Et,Ht,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Xt,Tt.width,Tt.height,at.depth,0,Et,Ht,Tt.data)}else{Kt&&ge&&e.texStorage2D(i.TEXTURE_2D,xt,Xt,se[0].width,se[0].height);for(let Y=0,Q=se.length;Y<Q;Y++)Tt=se[Y],S.format!==vn?Et!==null?Kt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Xt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?N&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Tt.width,Tt.height,Et,Ht,Tt.data):e.texImage2D(i.TEXTURE_2D,Y,Xt,Tt.width,Tt.height,0,Et,Ht,Tt.data)}else if(S.isDataArrayTexture)if(Kt){if(ge&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,Xt,at.width,at.height,at.depth),N)if(S.layerUpdates.size>0){let Y=_u(at.width,at.height,S.format,S.type);for(let Q of S.layerUpdates){let vt=at.data.subarray(Q*Y/at.data.BYTES_PER_ELEMENT,(Q+1)*Y/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,at.width,at.height,1,Et,Ht,vt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,Et,Ht,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Xt,at.width,at.height,at.depth,0,Et,Ht,at.data);else if(S.isData3DTexture)Kt?(ge&&e.texStorage3D(i.TEXTURE_3D,xt,Xt,at.width,at.height,at.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,Et,Ht,at.data)):e.texImage3D(i.TEXTURE_3D,0,Xt,at.width,at.height,at.depth,0,Et,Ht,at.data);else if(S.isFramebufferTexture){if(ge)if(Kt)e.texStorage2D(i.TEXTURE_2D,xt,Xt,at.width,at.height);else{let Y=at.width,Q=at.height;for(let vt=0;vt<xt;vt++)e.texImage2D(i.TEXTURE_2D,vt,Xt,Y,Q,0,Et,Ht,null),Y>>=1,Q>>=1}}else if(se.length>0){if(Kt&&ge){let Y=Mt(se[0]);e.texStorage2D(i.TEXTURE_2D,xt,Xt,Y.width,Y.height)}for(let Y=0,Q=se.length;Y<Q;Y++)Tt=se[Y],Kt?N&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Et,Ht,Tt):e.texImage2D(i.TEXTURE_2D,Y,Xt,Et,Ht,Tt);S.generateMipmaps=!1}else if(Kt){if(ge){let Y=Mt(at);e.texStorage2D(i.TEXTURE_2D,xt,Xt,Y.width,Y.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Ht,at)}else e.texImage2D(i.TEXTURE_2D,0,Xt,Et,Ht,at);m(S)&&p($),Rt.__version=J.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function nt(C,S,k){if(S.image.length!==6)return;let $=Gt(C,S),et=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+k);let J=n.get(et);if(et.version!==J.__version||$===!0){e.activeTexture(i.TEXTURE0+k);let Rt=re.getPrimaries(re.workingColorSpace),gt=S.colorSpace===yi?null:re.getPrimaries(S.colorSpace),bt=S.colorSpace===yi||Rt===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let ee=S.isCompressedTexture||S.image[0].isCompressedTexture,at=S.image[0]&&S.image[0].isDataTexture,Et=[];for(let Q=0;Q<6;Q++)!ee&&!at?Et[Q]=x(S.image[Q],!0,s.maxCubemapSize):Et[Q]=at?S.image[Q].image:S.image[Q],Et[Q]=kt(S,Et[Q]);let Ht=Et[0],Xt=r.convert(S.format,S.colorSpace),Tt=r.convert(S.type),se=y(S.internalFormat,Xt,Tt,S.colorSpace),Kt=S.isVideoTexture!==!0,ge=J.__version===void 0||$===!0,N=et.dataReady,xt=R(S,Ht);At(i.TEXTURE_CUBE_MAP,S);let Y;if(ee){Kt&&ge&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,se,Ht.width,Ht.height);for(let Q=0;Q<6;Q++){Y=Et[Q].mipmaps;for(let vt=0;vt<Y.length;vt++){let _t=Y[vt];S.format!==vn?Xt!==null?Kt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt,0,0,_t.width,_t.height,Xt,_t.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt,se,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt,0,0,_t.width,_t.height,Xt,Tt,_t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt,se,_t.width,_t.height,0,Xt,Tt,_t.data)}}}else{if(Y=S.mipmaps,Kt&&ge){Y.length>0&&xt++;let Q=Mt(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,se,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(at){Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Et[Q].width,Et[Q].height,Xt,Tt,Et[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,se,Et[Q].width,Et[Q].height,0,Xt,Tt,Et[Q].data);for(let vt=0;vt<Y.length;vt++){let Zt=Y[vt].image[Q].image;Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt+1,0,0,Zt.width,Zt.height,Xt,Tt,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt+1,se,Zt.width,Zt.height,0,Xt,Tt,Zt.data)}}else{Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Xt,Tt,Et[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,se,Xt,Tt,Et[Q]);for(let vt=0;vt<Y.length;vt++){let _t=Y[vt];Kt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt+1,0,0,Xt,Tt,_t.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,vt+1,se,Xt,Tt,_t.image[Q])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),J.__version=et.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function pt(C,S,k,$,et,J){let Rt=r.convert(k.format,k.colorSpace),gt=r.convert(k.type),bt=y(k.internalFormat,Rt,gt,k.colorSpace),ee=n.get(S),at=n.get(k);if(at.__renderTarget=S,!ee.__hasExternalTextures){let Et=Math.max(1,S.width>>J),Ht=Math.max(1,S.height>>J);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,J,bt,Et,Ht,S.depth,0,Rt,gt,null):e.texImage2D(et,J,bt,Et,Ht,0,Rt,gt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),wt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,et,at.__webglTexture,0,st(S)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,et,at.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(C,S,k){if(i.bindRenderbuffer(i.RENDERBUFFER,C),S.depthBuffer){let $=S.depthTexture,et=$&&$.isDepthTexture?$.type:null,J=_(S.stencilBuffer,et),Rt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=st(S);wt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt,J,S.width,S.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,J,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,J,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,C)}else{let $=S.textures;for(let et=0;et<$.length;et++){let J=$[et],Rt=r.convert(J.format,J.colorSpace),gt=r.convert(J.type),bt=y(J.internalFormat,Rt,gt,J.colorSpace),ee=st(S);k&&wt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,bt,S.width,S.height):wt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,bt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,bt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(S.depthTexture);$.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);let et=$.__webglTexture,J=st(S);if(S.depthTexture.format===ms)wt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(S.depthTexture.format===Ss)wt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function zt(C){let S=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){let $=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),$){let et=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,$.removeEventListener("dispose",et)};$.addEventListener("dispose",et),S.__depthDisposeCallback=et}S.__boundDepthTexture=$}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ut(S.__webglFramebuffer,C)}else if(k){S.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[$]),S.__webglDepthbuffer[$]===void 0)S.__webglDepthbuffer[$]=i.createRenderbuffer(),ct(S.__webglDepthbuffer[$],C,!1);else{let et=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ct(S.__webglDepthbuffer,C,!1);else{let $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(C,S,k){let $=n.get(C);S!==void 0&&pt($.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&zt(C)}function ie(C){let S=C.texture,k=n.get(C),$=n.get(S);C.addEventListener("dispose",w);let et=C.textures,J=C.isWebGLCubeRenderTarget===!0,Rt=et.length>1;if(Rt||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=S.version,o.memory.textures++),J){k.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[gt]=[];for(let bt=0;bt<S.mipmaps.length;bt++)k.__webglFramebuffer[gt][bt]=i.createFramebuffer()}else k.__webglFramebuffer[gt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let gt=0;gt<S.mipmaps.length;gt++)k.__webglFramebuffer[gt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let gt=0,bt=et.length;gt<bt;gt++){let ee=n.get(et[gt]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&wt(C)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let gt=0;gt<et.length;gt++){let bt=et[gt];k.__webglColorRenderbuffer[gt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[gt]);let ee=r.convert(bt.format,bt.colorSpace),at=r.convert(bt.type),Et=y(bt.internalFormat,ee,at,bt.colorSpace,C.isXRRenderTarget===!0),Ht=st(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,Et,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,k.__webglColorRenderbuffer[gt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),ct(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),At(i.TEXTURE_CUBE_MAP,S);for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0)for(let bt=0;bt<S.mipmaps.length;bt++)pt(k.__webglFramebuffer[gt][bt],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,bt);else pt(k.__webglFramebuffer[gt],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let gt=0,bt=et.length;gt<bt;gt++){let ee=et[gt],at=n.get(ee);e.bindTexture(i.TEXTURE_2D,at.__webglTexture),At(i.TEXTURE_2D,ee),pt(k.__webglFramebuffer,C,ee,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,0),m(ee)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let gt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(gt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,$.__webglTexture),At(gt,S),S.mipmaps&&S.mipmaps.length>0)for(let bt=0;bt<S.mipmaps.length;bt++)pt(k.__webglFramebuffer[bt],C,S,i.COLOR_ATTACHMENT0,gt,bt);else pt(k.__webglFramebuffer,C,S,i.COLOR_ATTACHMENT0,gt,0);m(S)&&p(gt),e.unbindTexture()}C.depthBuffer&&zt(C)}function K(C){let S=C.textures;for(let k=0,$=S.length;k<$;k++){let et=S[k];if(m(et)){let J=M(C),Rt=n.get(et).__webglTexture;e.bindTexture(J,Rt),p(J),e.unbindTexture()}}}let rt=[],L=[];function Dt(C){if(C.samples>0){if(wt(C)===!1){let S=C.textures,k=C.width,$=C.height,et=i.COLOR_BUFFER_BIT,J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(C),gt=S.length>1;if(gt)for(let bt=0;bt<S.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let bt=0;bt<S.length;bt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),gt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[bt]);let ee=n.get(S[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,k,$,0,0,k,$,et,i.NEAREST),l===!0&&(rt.length=0,L.length=0,rt.push(i.COLOR_ATTACHMENT0+bt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(rt.push(J),L.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),gt)for(let bt=0;bt<S.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[bt]);let ee=n.get(S[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,ee,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let S=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function st(C){return Math.min(s.maxSamples,C.samples)}function wt(C){let S=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ft(C){let S=o.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function kt(C,S){let k=C.colorSpace,$=C.format,et=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Is&&k!==yi&&(re.getTransfer(k)===me?($!==vn||et!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function Mt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=H,this.setTexture2DArray=z,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=Bt,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=wt}function Qx(i,t){function e(n,s=yi){let r,o=re.getTransfer(s);if(n===si)return i.UNSIGNED_BYTE;if(n===Ec)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Tc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ku)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fu)return i.BYTE;if(n===zu)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===wc)return i.INT;if(n===ki)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===_r)return i.HALF_FLOAT;if(n===Hu)return i.ALPHA;if(n===Vu)return i.RGB;if(n===vn)return i.RGBA;if(n===Gu)return i.LUMINANCE;if(n===Wu)return i.LUMINANCE_ALPHA;if(n===ms)return i.DEPTH_COMPONENT;if(n===Ss)return i.DEPTH_STENCIL;if(n===Ac)return i.RED;if(n===Rc)return i.RED_INTEGER;if(n===Xu)return i.RG;if(n===Cc)return i.RG_INTEGER;if(n===Ic)return i.RGBA_INTEGER;if(n===ro||n===oo||n===ao||n===lo)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cl||n===hl||n===ul||n===dl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fl||n===pl||n===ml)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fl||n===pl)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ml)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===gl||n===xl||n===_l||n===yl||n===vl||n===Ml||n===bl||n===Sl||n===wl||n===El||n===Tl||n===Al||n===Rl||n===Cl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===gl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_l)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ml)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===El)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Tl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===co||n===Il||n===Pl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===co)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qu||n===Ll||n===Dl||n===Ul)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===co)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ul)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Yl=class extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},je=class extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}},jx={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jx)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new je;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},t_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e_=`
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

}`,Zl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new an,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Mn({vertexShader:t_,fragmentShader:e_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new de(new Vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$l=class extends Si{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=new Zl,m=e.getContextAttributes(),p=null,M=null,y=[],_=[],R=new ut,T=null,w=new Ye;w.viewport=new ae;let A=new Ye;A.viewport=new ae;let b=[w,A],v=new Yl,I=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let nt=y[q];return nt===void 0&&(nt=new Ks,y[q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(q){let nt=y[q];return nt===void 0&&(nt=new Ks,y[q]=nt),nt.getGripSpace()},this.getHand=function(q){let nt=y[q];return nt===void 0&&(nt=new Ks,y[q]=nt),nt.getHandSpace()};function U(q){let nt=_.indexOf(q.inputSource);if(nt===-1)return;let pt=y[nt];pt!==void 0&&(pt.update(q.inputSource,q.frame,c||o),pt.dispatchEvent({type:q.type,data:q.inputSource}))}function O(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",H);for(let q=0;q<y.length;q++){let nt=_[q];nt!==null&&(_[q]=null,y[q].disconnect(nt))}I=null,D=null,x.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,M=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",O),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){let nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new ri(f.framebufferWidth,f.framebufferHeight,{format:vn,type:si,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,pt=null,ct=null;m.depth&&(ct=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?Ss:ms,pt=m.stencil?bs:ki);let Ut={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new ri(d.textureWidth,d.textureHeight,{format:vn,type:si,depthTexture:new So(d.textureWidth,d.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Gt.setContext(s),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function H(q){for(let nt=0;nt<q.removed.length;nt++){let pt=q.removed[nt],ct=_.indexOf(pt);ct>=0&&(_[ct]=null,y[ct].disconnect(pt))}for(let nt=0;nt<q.added.length;nt++){let pt=q.added[nt],ct=_.indexOf(pt);if(ct===-1){for(let zt=0;zt<y.length;zt++)if(zt>=_.length){_.push(pt),ct=zt;break}else if(_[zt]===null){_[zt]=pt,ct=zt;break}if(ct===-1)break}let Ut=y[ct];Ut&&Ut.connect(pt)}}let z=new P,j=new P;function G(q,nt,pt){z.setFromMatrixPosition(nt.matrixWorld),j.setFromMatrixPosition(pt.matrixWorld);let ct=z.distanceTo(j),Ut=nt.projectionMatrix.elements,zt=pt.projectionMatrix.elements,Bt=Ut[14]/(Ut[10]-1),ie=Ut[14]/(Ut[10]+1),K=(Ut[9]+1)/Ut[5],rt=(Ut[9]-1)/Ut[5],L=(Ut[8]-1)/Ut[0],Dt=(zt[8]+1)/zt[0],st=Bt*L,wt=Bt*Dt,ft=ct/(-L+Dt),kt=ft*-L;if(nt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(kt),q.translateZ(ft),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ut[10]===-1)q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let Mt=Bt+ft,C=ie+ft,S=st-kt,k=wt+(ct-kt),$=K*ie/C*Mt,et=rt*ie/C*Mt;q.projectionMatrix.makePerspective(S,k,$,et,Mt,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ot(q,nt){nt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(nt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let nt=q.near,pt=q.far;x.texture!==null&&(x.depthNear>0&&(nt=x.depthNear),x.depthFar>0&&(pt=x.depthFar)),v.near=A.near=w.near=nt,v.far=A.far=w.far=pt,(I!==v.near||D!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),I=v.near,D=v.far),w.layers.mask=q.layers.mask|2,A.layers.mask=q.layers.mask|4,v.layers.mask=w.layers.mask|A.layers.mask;let ct=q.parent,Ut=v.cameras;ot(v,ct);for(let zt=0;zt<Ut.length;zt++)ot(Ut[zt],ct);Ut.length===2?G(v,w,A):v.projectionMatrix.copy(w.projectionMatrix),dt(q,v,ct)};function dt(q,nt,pt){pt===null?q.matrix.copy(nt.matrixWorld):(q.matrix.copy(pt.matrixWorld),q.matrix.invert(),q.matrix.multiply(nt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ws*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let it=null;function At(q,nt){if(h=nt.getViewerPose(c||o),g=nt,h!==null){let pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let ct=!1;pt.length!==v.cameras.length&&(v.cameras.length=0,ct=!0);for(let zt=0;zt<pt.length;zt++){let Bt=pt[zt],ie=null;if(f!==null)ie=f.getViewport(Bt);else{let rt=u.getViewSubImage(d,Bt);ie=rt.viewport,zt===0&&(t.setRenderTargetTextures(M,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(M))}let K=b[zt];K===void 0&&(K=new Ye,K.layers.enable(zt),K.viewport=new ae,b[zt]=K),K.matrix.fromArray(Bt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(Bt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(ie.x,ie.y,ie.width,ie.height),zt===0&&(v.matrix.copy(K.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ct===!0&&v.cameras.push(K)}let Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){let zt=u.getDepthInformation(pt[0]);zt&&zt.isValid&&zt.texture&&x.init(t,zt,s.renderState)}}for(let pt=0;pt<y.length;pt++){let ct=_[pt],Ut=y[pt];ct!==null&&Ut!==void 0&&Ut.update(ct,nt,c||o)}it&&it(q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}let Gt=new Ku;Gt.setAnimationLoop(At),this.setAnimationLoop=function(q){it=q},this.dispose=function(){}}},Ui=new De,n_=new Ft;function i_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ju(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),y=M.envMap,_=M.envMapRotation;y&&(m.envMap.value=y,Ui.copy(_),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(n_.makeRotationFromEuler(Ui)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function s_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){let _=y.program;n.uniformBlockBinding(M,_)}function c(M,y){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));let R=y.program;n.updateUBOMapping(M,R);let T=t.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function h(M){let y=u();M.__bindingPointIndex=y;let _=i.createBuffer(),R=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let y=s[M.id],_=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,w=_.length;T<w;T++){let A=Array.isArray(_[T])?_[T]:[_[T]];for(let b=0,v=A.length;b<v;b++){let I=A[b];if(f(I,T,b,R)===!0){let D=I.__offset,U=Array.isArray(I.value)?I.value:[I.value],O=0;for(let H=0;H<U.length;H++){let z=U[H],j=x(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,D+O,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,O),O+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,_,R){let T=M.value,w=y+"_"+_;if(R[w]===void 0)return typeof T=="number"||typeof T=="boolean"?R[w]=T:R[w]=T.clone(),!0;{let A=R[w];if(typeof T=="number"||typeof T=="boolean"){if(A!==T)return R[w]=T,!0}else if(A.equals(T)===!1)return A.copy(T),!0}return!1}function g(M){let y=M.uniforms,_=0,R=16;for(let w=0,A=y.length;w<A;w++){let b=Array.isArray(y[w])?y[w]:[y[w]];for(let v=0,I=b.length;v<I;v++){let D=b[v],U=Array.isArray(D.value)?D.value:[D.value];for(let O=0,H=U.length;O<H;O++){let z=U[O],j=x(z),G=_%R,ot=G%j.boundary,dt=G+ot;_+=ot,dt!==0&&R-dt<j.storage&&(_+=R-dt),D.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=j.storage}}}let T=_%R;return T>0&&(_+=R-T),M.__size=_,M.__cache={},this}function x(M){let y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){let y=M.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var wo=class{constructor(t={}){let{canvas:e=lp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qe,this.toneMapping=Mi,this.toneMappingExposure=1;let _=this,R=!1,T=0,w=0,A=null,b=-1,v=null,I=new ae,D=new ae,U=null,O=new Ot(0),H=0,z=e.width,j=e.height,G=1,ot=null,dt=null,it=new ae(0,0,z,j),At=new ae(0,0,z,j),Gt=!1,q=new or,nt=!1,pt=!1,ct=new Ft,Ut=new Ft,zt=new P,Bt=new ae,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},K=!1;function rt(){return A===null?G:1}let L=n;function Dt(E,B){return e.getContext(E,B)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Mc}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),L===null){let B="webgl2";if(L=Dt(B,E),L===null)throw Dt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let st,wt,ft,kt,Mt,C,S,k,$,et,J,Rt,gt,bt,ee,at,Et,Ht,Xt,Tt,se,Kt,ge,N;function xt(){st=new vg(L),st.init(),Kt=new Qx(L,st),wt=new pg(L,st,t,Kt),ft=new $x(L,st),wt.reverseDepthBuffer&&d&&ft.buffers.depth.setReversed(!0),kt=new Sg(L),Mt=new Ox,C=new Kx(L,st,ft,Mt,wt,Kt,kt),S=new gg(_),k=new yg(_),$=new Ip(L),ge=new dg(L,$),et=new Mg(L,$,kt,ge),J=new Eg(L,et,$,kt),Xt=new wg(L,wt,C),at=new mg(Mt),Rt=new Nx(_,S,k,st,wt,ge,at),gt=new i_(_,Mt),bt=new Fx,ee=new Wx(st),Ht=new ug(_,S,k,ft,J,f,l),Et=new Yx(_,J,wt),N=new s_(L,kt,wt,ft),Tt=new fg(L,st,kt),se=new bg(L,st,kt),kt.programs=Rt.programs,_.capabilities=wt,_.extensions=st,_.properties=Mt,_.renderLists=bt,_.shadowMap=Et,_.state=ft,_.info=kt}xt();let Y=new $l(_,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let E=st.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=st.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(z,j,!1))},this.getSize=function(E){return E.set(z,j)},this.setSize=function(E,B,V=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,j=B,e.width=Math.floor(E*G),e.height=Math.floor(B*G),V===!0&&(e.style.width=E+"px",e.style.height=B+"px"),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(z*G,j*G).floor()},this.setDrawingBufferSize=function(E,B,V){z=E,j=B,G=V,e.width=Math.floor(E*V),e.height=Math.floor(B*V),this.setViewport(0,0,E,B)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(it)},this.setViewport=function(E,B,V,W){E.isVector4?it.set(E.x,E.y,E.z,E.w):it.set(E,B,V,W),ft.viewport(I.copy(it).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(At)},this.setScissor=function(E,B,V,W){E.isVector4?At.set(E.x,E.y,E.z,E.w):At.set(E,B,V,W),ft.scissor(D.copy(At).multiplyScalar(G).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(E){ft.setScissorTest(Gt=E)},this.setOpaqueSort=function(E){ot=E},this.setTransparentSort=function(E){dt=E},this.getClearColor=function(E){return E.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor.apply(Ht,arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha.apply(Ht,arguments)},this.clear=function(E=!0,B=!0,V=!0){let W=0;if(E){let F=!1;if(A!==null){let ht=A.texture.format;F=ht===Ic||ht===Cc||ht===Rc}if(F){let ht=A.texture.type,yt=ht===si||ht===ki||ht===nr||ht===bs||ht===Ec||ht===Tc,Ct=Ht.getClearColor(),It=Ht.getClearAlpha(),qt=Ct.r,$t=Ct.g,Pt=Ct.b;yt?(g[0]=qt,g[1]=$t,g[2]=Pt,g[3]=It,L.clearBufferuiv(L.COLOR,0,g)):(x[0]=qt,x[1]=$t,x[2]=Pt,x[3]=It,L.clearBufferiv(L.COLOR,0,x))}else W|=L.COLOR_BUFFER_BIT}B&&(W|=L.DEPTH_BUFFER_BIT),V&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),bt.dispose(),ee.dispose(),Mt.dispose(),S.dispose(),k.dispose(),J.dispose(),ge.dispose(),N.dispose(),Rt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",hh),Y.removeEventListener("sessionend",uh),Ri.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let E=kt.autoReset,B=Et.enabled,V=Et.autoUpdate,W=Et.needsUpdate,F=Et.type;xt(),kt.autoReset=E,Et.enabled=B,Et.autoUpdate=V,Et.needsUpdate=W,Et.type=F}function _t(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Zt(E){let B=E.target;B.removeEventListener("dispose",Zt),Ae(B)}function Ae(E){$e(E),Mt.remove(E)}function $e(E){let B=Mt.get(E).programs;B!==void 0&&(B.forEach(function(V){Rt.releaseProgram(V)}),E.isShaderMaterial&&Rt.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,V,W,F,ht){B===null&&(B=ie);let yt=F.isMesh&&F.matrixWorld.determinant()<0,Ct=sf(E,B,V,W,F);ft.setMaterial(W,yt);let It=V.index,qt=1;if(W.wireframe===!0){if(It=et.getWireframeAttribute(V),It===void 0)return;qt=2}let $t=V.drawRange,Pt=V.attributes.position,oe=$t.start*qt,xe=($t.start+$t.count)*qt;ht!==null&&(oe=Math.max(oe,ht.start*qt),xe=Math.min(xe,(ht.start+ht.count)*qt)),It!==null?(oe=Math.max(oe,0),xe=Math.min(xe,It.count)):Pt!=null&&(oe=Math.max(oe,0),xe=Math.min(xe,Pt.count));let ve=xe-oe;if(ve<0||ve===1/0)return;ge.setup(F,W,Ct,V,It);let on,he=Tt;if(It!==null&&(on=$.get(It),he=se,he.setIndex(on)),F.isMesh)W.wireframe===!0?(ft.setLineWidth(W.wireframeLinewidth*rt()),he.setMode(L.LINES)):he.setMode(L.TRIANGLES);else if(F.isLine){let Nt=W.linewidth;Nt===void 0&&(Nt=1),ft.setLineWidth(Nt*rt()),F.isLineSegments?he.setMode(L.LINES):F.isLineLoop?he.setMode(L.LINE_LOOP):he.setMode(L.LINE_STRIP)}else F.isPoints?he.setMode(L.POINTS):F.isSprite&&he.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)he.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))he.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Nt=F._multiDrawStarts,Zn=F._multiDrawCounts,ue=F._multiDrawCount,En=It?$.get(It).bytesPerElement:1,$i=Mt.get(W).currentProgram.getUniforms();for(let ln=0;ln<ue;ln++)$i.setValue(L,"_gl_DrawID",ln),he.render(Nt[ln]/En,Zn[ln])}else if(F.isInstancedMesh)he.renderInstances(oe,ve,F.count);else if(V.isInstancedBufferGeometry){let Nt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Zn=Math.min(V.instanceCount,Nt);he.renderInstances(oe,ve,Zn)}else he.render(oe,ve)};function pe(E,B,V){E.transparent===!0&&E.side===Cn&&E.forceSinglePass===!1?(E.side=tn,E.needsUpdate=!0,Cr(E,B,V),E.side=bi,E.needsUpdate=!0,Cr(E,B,V),E.side=Cn):Cr(E,B,V)}this.compile=function(E,B,V=null){V===null&&(V=E),p=ee.get(V),p.init(B),y.push(p),V.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==V&&E.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ht=F.material;if(ht)if(Array.isArray(ht))for(let yt=0;yt<ht.length;yt++){let Ct=ht[yt];pe(Ct,V,F),W.add(Ct)}else pe(ht,V,F),W.add(ht)}),y.pop(),p=null,W},this.compileAsync=function(E,B,V=null){let W=this.compile(E,B,V);return new Promise(F=>{function ht(){if(W.forEach(function(yt){Mt.get(yt).currentProgram.isReady()&&W.delete(yt)}),W.size===0){F(E);return}setTimeout(ht,10)}st.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let wn=null;function Yn(E){wn&&wn(E)}function hh(){Ri.stop()}function uh(){Ri.start()}let Ri=new Ku;Ri.setAnimationLoop(Yn),typeof self!="undefined"&&Ri.setContext(self),this.setAnimationLoop=function(E){wn=E,Y.setAnimationLoop(E),E===null?Ri.stop():Ri.start()},Y.addEventListener("sessionstart",hh),Y.addEventListener("sessionend",uh),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(B),B=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,B,A),p=ee.get(E,y.length),p.init(B),y.push(p),Ut.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),q.setFromProjectionMatrix(Ut),pt=this.localClippingEnabled,nt=at.init(this.clippingPlanes,pt),m=bt.get(E,M.length),m.init(),M.push(m),Y.enabled===!0&&Y.isPresenting===!0){let ht=_.xr.getDepthSensingMesh();ht!==null&&ma(ht,B,-1/0,_.sortObjects)}ma(E,B,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ot,dt),K=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,K&&Ht.addToRenderList(m,E),this.info.render.frame++,nt===!0&&at.beginShadows();let V=p.state.shadowsArray;Et.render(V,E,B),nt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,F=m.transmissive;if(p.setupLights(),B.isArrayCamera){let ht=B.cameras;if(F.length>0)for(let yt=0,Ct=ht.length;yt<Ct;yt++){let It=ht[yt];fh(W,F,E,It)}K&&Ht.render(E);for(let yt=0,Ct=ht.length;yt<Ct;yt++){let It=ht[yt];dh(m,E,It,It.viewport)}}else F.length>0&&fh(W,F,E,B),K&&Ht.render(E),dh(m,E,B);A!==null&&(C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(_,E,B),ge.resetDefaultState(),b=-1,v=null,y.pop(),y.length>0?(p=y[y.length-1],nt===!0&&at.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function ma(E,B,V,W){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){W&&Bt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ut);let yt=J.update(E),Ct=E.material;Ct.visible&&m.push(E,yt,Ct,V,Bt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){let yt=J.update(E),Ct=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Bt.copy(E.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Bt.copy(yt.boundingSphere.center)),Bt.applyMatrix4(E.matrixWorld).applyMatrix4(Ut)),Array.isArray(Ct)){let It=yt.groups;for(let qt=0,$t=It.length;qt<$t;qt++){let Pt=It[qt],oe=Ct[Pt.materialIndex];oe&&oe.visible&&m.push(E,yt,oe,V,Bt.z,Pt)}}else Ct.visible&&m.push(E,yt,Ct,V,Bt.z,null)}}let ht=E.children;for(let yt=0,Ct=ht.length;yt<Ct;yt++)ma(ht[yt],B,V,W)}function dh(E,B,V,W){let F=E.opaque,ht=E.transmissive,yt=E.transparent;p.setupLightsView(V),nt===!0&&at.setGlobalState(_.clippingPlanes,V),W&&ft.viewport(I.copy(W)),F.length>0&&Rr(F,B,V),ht.length>0&&Rr(ht,B,V),yt.length>0&&Rr(yt,B,V),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function fh(E,B,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new ri(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?_r:si,minFilter:In,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));let ht=p.state.transmissionRenderTarget[W.id],yt=W.viewport||I;ht.setSize(yt.z,yt.w);let Ct=_.getRenderTarget();_.setRenderTarget(ht),_.getClearColor(O),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),K&&Ht.render(V);let It=_.toneMapping;_.toneMapping=Mi;let qt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),nt===!0&&at.setGlobalState(_.clippingPlanes,W),Rr(E,V,W),C.updateMultisampleRenderTarget(ht),C.updateRenderTargetMipmap(ht),st.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Pt=0,oe=B.length;Pt<oe;Pt++){let xe=B[Pt],ve=xe.object,on=xe.geometry,he=xe.material,Nt=xe.group;if(he.side===Cn&&ve.layers.test(W.layers)){let Zn=he.side;he.side=tn,he.needsUpdate=!0,ph(ve,V,W,on,he,Nt),he.side=Zn,he.needsUpdate=!0,$t=!0}}$t===!0&&(C.updateMultisampleRenderTarget(ht),C.updateRenderTargetMipmap(ht))}_.setRenderTarget(Ct),_.setClearColor(O,H),qt!==void 0&&(W.viewport=qt),_.toneMapping=It}function Rr(E,B,V){let W=B.isScene===!0?B.overrideMaterial:null;for(let F=0,ht=E.length;F<ht;F++){let yt=E[F],Ct=yt.object,It=yt.geometry,qt=W===null?yt.material:W,$t=yt.group;Ct.layers.test(V.layers)&&ph(Ct,B,V,It,qt,$t)}}function ph(E,B,V,W,F,ht){E.onBeforeRender(_,B,V,W,F,ht),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(_,B,V,W,E,ht),F.transparent===!0&&F.side===Cn&&F.forceSinglePass===!1?(F.side=tn,F.needsUpdate=!0,_.renderBufferDirect(V,B,W,F,E,ht),F.side=bi,F.needsUpdate=!0,_.renderBufferDirect(V,B,W,F,E,ht),F.side=Cn):_.renderBufferDirect(V,B,W,F,E,ht),E.onAfterRender(_,B,V,W,F,ht)}function Cr(E,B,V){B.isScene!==!0&&(B=ie);let W=Mt.get(E),F=p.state.lights,ht=p.state.shadowsArray,yt=F.state.version,Ct=Rt.getParameters(E,F.state,ht,B,V),It=Rt.getProgramCacheKey(Ct),qt=W.programs;W.environment=E.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(E.isMeshStandardMaterial?k:S).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,qt===void 0&&(E.addEventListener("dispose",Zt),qt=new Map,W.programs=qt);let $t=qt.get(It);if($t!==void 0){if(W.currentProgram===$t&&W.lightsStateVersion===yt)return gh(E,Ct),$t}else Ct.uniforms=Rt.getUniforms(E),E.onBeforeCompile(Ct,_),$t=Rt.acquireProgram(Ct,It),qt.set(It,$t),W.uniforms=Ct.uniforms;let Pt=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Pt.clippingPlanes=at.uniform),gh(E,Ct),W.needsLights=of(E),W.lightsStateVersion=yt,W.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=$t,W.uniformsList=null,$t}function mh(E){if(E.uniformsList===null){let B=E.currentProgram.getUniforms();E.uniformsList=xs.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function gh(E,B){let V=Mt.get(E);V.outputColorSpace=B.outputColorSpace,V.batching=B.batching,V.batchingColor=B.batchingColor,V.instancing=B.instancing,V.instancingColor=B.instancingColor,V.instancingMorph=B.instancingMorph,V.skinning=B.skinning,V.morphTargets=B.morphTargets,V.morphNormals=B.morphNormals,V.morphColors=B.morphColors,V.morphTargetsCount=B.morphTargetsCount,V.numClippingPlanes=B.numClippingPlanes,V.numIntersection=B.numClipIntersection,V.vertexAlphas=B.vertexAlphas,V.vertexTangents=B.vertexTangents,V.toneMapping=B.toneMapping}function sf(E,B,V,W,F){B.isScene!==!0&&(B=ie),C.resetTextureUnits();let ht=B.fog,yt=W.isMeshStandardMaterial?B.environment:null,Ct=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Is,It=(W.isMeshStandardMaterial?k:S).get(W.envMap||yt),qt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,$t=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pt=!!V.morphAttributes.position,oe=!!V.morphAttributes.normal,xe=!!V.morphAttributes.color,ve=Mi;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ve=_.toneMapping);let on=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,he=on!==void 0?on.length:0,Nt=Mt.get(W),Zn=p.state.lights;if(nt===!0&&(pt===!0||E!==v)){let _n=E===v&&W.id===b;at.setState(W,E,_n)}let ue=!1;W.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==Zn.state.version||Nt.outputColorSpace!==Ct||F.isBatchedMesh&&Nt.batching===!1||!F.isBatchedMesh&&Nt.batching===!0||F.isBatchedMesh&&Nt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Nt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Nt.instancing===!1||!F.isInstancedMesh&&Nt.instancing===!0||F.isSkinnedMesh&&Nt.skinning===!1||!F.isSkinnedMesh&&Nt.skinning===!0||F.isInstancedMesh&&Nt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Nt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Nt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Nt.instancingMorph===!1&&F.morphTexture!==null||Nt.envMap!==It||W.fog===!0&&Nt.fog!==ht||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==at.numPlanes||Nt.numIntersection!==at.numIntersection)||Nt.vertexAlphas!==qt||Nt.vertexTangents!==$t||Nt.morphTargets!==Pt||Nt.morphNormals!==oe||Nt.morphColors!==xe||Nt.toneMapping!==ve||Nt.morphTargetsCount!==he)&&(ue=!0):(ue=!0,Nt.__version=W.version);let En=Nt.currentProgram;ue===!0&&(En=Cr(W,B,F));let $i=!1,ln=!1,Fs=!1,Me=En.getUniforms(),Bn=Nt.uniforms;if(ft.useProgram(En.program)&&($i=!0,ln=!0,Fs=!0),W.id!==b&&(b=W.id,ln=!0),$i||v!==E){ft.buffers.depth.getReversed()?(ct.copy(E.projectionMatrix),hp(ct),up(ct),Me.setValue(L,"projectionMatrix",ct)):Me.setValue(L,"projectionMatrix",E.projectionMatrix),Me.setValue(L,"viewMatrix",E.matrixWorldInverse);let ui=Me.map.cameraPosition;ui!==void 0&&ui.setValue(L,zt.setFromMatrixPosition(E.matrixWorld)),wt.logarithmicDepthBuffer&&Me.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Me.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),v!==E&&(v=E,ln=!0,Fs=!0)}if(F.isSkinnedMesh){Me.setOptional(L,F,"bindMatrix"),Me.setOptional(L,F,"bindMatrixInverse");let _n=F.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),Me.setValue(L,"boneTexture",_n.boneTexture,C))}F.isBatchedMesh&&(Me.setOptional(L,F,"batchingTexture"),Me.setValue(L,"batchingTexture",F._matricesTexture,C),Me.setOptional(L,F,"batchingIdTexture"),Me.setValue(L,"batchingIdTexture",F._indirectTexture,C),Me.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&Me.setValue(L,"batchingColorTexture",F._colorsTexture,C));let zs=V.morphAttributes;if((zs.position!==void 0||zs.normal!==void 0||zs.color!==void 0)&&Xt.update(F,V,En),(ln||Nt.receiveShadow!==F.receiveShadow)&&(Nt.receiveShadow=F.receiveShadow,Me.setValue(L,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Bn.envMap.value=It,Bn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Bn.envMapIntensity.value=B.environmentIntensity),ln&&(Me.setValue(L,"toneMappingExposure",_.toneMappingExposure),Nt.needsLights&&rf(Bn,Fs),ht&&W.fog===!0&&gt.refreshFogUniforms(Bn,ht),gt.refreshMaterialUniforms(Bn,W,G,j,p.state.transmissionRenderTarget[E.id]),xs.upload(L,mh(Nt),Bn,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(xs.upload(L,mh(Nt),Bn,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Me.setValue(L,"center",F.center),Me.setValue(L,"modelViewMatrix",F.modelViewMatrix),Me.setValue(L,"normalMatrix",F.normalMatrix),Me.setValue(L,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let _n=W.uniformsGroups;for(let ui=0,di=_n.length;ui<di;ui++){let xh=_n[ui];N.update(xh,En),N.bind(xh,En)}}return En}function rf(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function of(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,B,V){Mt.get(E.texture).__webglTexture=B,Mt.get(E.depthTexture).__webglTexture=V;let W=Mt.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,B){let V=Mt.get(E);V.__webglFramebuffer=B,V.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,V=0){A=E,T=B,w=V;let W=!0,F=null,ht=!1,yt=!1;if(E){let It=Mt.get(E);if(It.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(L.FRAMEBUFFER,null),W=!1;else if(It.__webglFramebuffer===void 0)C.setupRenderTarget(E);else if(It.__hasExternalTextures)C.rebindTextures(E,Mt.get(E.texture).__webglTexture,Mt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Pt=E.depthTexture;if(It.__boundDepthTexture!==Pt){if(Pt!==null&&Mt.has(Pt)&&(E.width!==Pt.image.width||E.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(E)}}let qt=E.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(yt=!0);let $t=Mt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray($t[B])?F=$t[B][V]:F=$t[B],ht=!0):E.samples>0&&C.useMultisampledRTT(E)===!1?F=Mt.get(E).__webglMultisampledFramebuffer:Array.isArray($t)?F=$t[V]:F=$t,I.copy(E.viewport),D.copy(E.scissor),U=E.scissorTest}else I.copy(it).multiplyScalar(G).floor(),D.copy(At).multiplyScalar(G).floor(),U=Gt;if(ft.bindFramebuffer(L.FRAMEBUFFER,F)&&W&&ft.drawBuffers(E,F),ft.viewport(I),ft.scissor(D),ft.setScissorTest(U),ht){let It=Mt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+B,It.__webglTexture,V)}else if(yt){let It=Mt.get(E.texture),qt=B||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,It.__webglTexture,V||0,qt)}b=-1},this.readRenderTargetPixels=function(E,B,V,W,F,ht,yt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Mt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(Ct=Ct[yt]),Ct){ft.bindFramebuffer(L.FRAMEBUFFER,Ct);try{let It=E.texture,qt=It.format,$t=It.type;if(!wt.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-W&&V>=0&&V<=E.height-F&&L.readPixels(B,V,W,F,Kt.convert(qt),Kt.convert($t),ht)}finally{let It=A!==null?Mt.get(A).__webglFramebuffer:null;ft.bindFramebuffer(L.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(E,B,V,W,F,ht,yt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Mt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(Ct=Ct[yt]),Ct){let It=E.texture,qt=It.format,$t=It.type;if(!wt.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=E.width-W&&V>=0&&V<=E.height-F){ft.bindFramebuffer(L.FRAMEBUFFER,Ct);let Pt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.bufferData(L.PIXEL_PACK_BUFFER,ht.byteLength,L.STREAM_READ),L.readPixels(B,V,W,F,Kt.convert(qt),Kt.convert($t),0);let oe=A!==null?Mt.get(A).__webglFramebuffer:null;ft.bindFramebuffer(L.FRAMEBUFFER,oe);let xe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await cp(L,xe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ht),L.deleteBuffer(Pt),L.deleteSync(xe),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,B=null,V=0){E.isTexture!==!0&&(Ys("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,E=arguments[1]);let W=Math.pow(2,-V),F=Math.floor(E.image.width*W),ht=Math.floor(E.image.height*W),yt=B!==null?B.x:0,Ct=B!==null?B.y:0;C.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,yt,Ct,F,ht),ft.unbindTexture()},this.copyTextureToTexture=function(E,B,V=null,W=null,F=0){E.isTexture!==!0&&(Ys("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],B=arguments[2],F=arguments[3]||0,V=null);let ht,yt,Ct,It,qt,$t,Pt,oe,xe,ve=E.isCompressedTexture?E.mipmaps[F]:E.image;V!==null?(ht=V.max.x-V.min.x,yt=V.max.y-V.min.y,Ct=V.isBox3?V.max.z-V.min.z:1,It=V.min.x,qt=V.min.y,$t=V.isBox3?V.min.z:0):(ht=ve.width,yt=ve.height,Ct=ve.depth||1,It=0,qt=0,$t=0),W!==null?(Pt=W.x,oe=W.y,xe=W.z):(Pt=0,oe=0,xe=0);let on=Kt.convert(B.format),he=Kt.convert(B.type),Nt;B.isData3DTexture?(C.setTexture3D(B,0),Nt=L.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(C.setTexture2DArray(B,0),Nt=L.TEXTURE_2D_ARRAY):(C.setTexture2D(B,0),Nt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,B.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,B.unpackAlignment);let Zn=L.getParameter(L.UNPACK_ROW_LENGTH),ue=L.getParameter(L.UNPACK_IMAGE_HEIGHT),En=L.getParameter(L.UNPACK_SKIP_PIXELS),$i=L.getParameter(L.UNPACK_SKIP_ROWS),ln=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ve.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ve.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,It),L.pixelStorei(L.UNPACK_SKIP_ROWS,qt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,$t);let Fs=E.isDataArrayTexture||E.isData3DTexture,Me=B.isDataArrayTexture||B.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let Bn=Mt.get(E),zs=Mt.get(B),_n=Mt.get(Bn.__renderTarget),ui=Mt.get(zs.__renderTarget);ft.bindFramebuffer(L.READ_FRAMEBUFFER,_n.__webglFramebuffer),ft.bindFramebuffer(L.DRAW_FRAMEBUFFER,ui.__webglFramebuffer);for(let di=0;di<Ct;di++)Fs&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mt.get(E).__webglTexture,F,$t+di),E.isDepthTexture?(Me&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mt.get(B).__webglTexture,F,xe+di),L.blitFramebuffer(It,qt,ht,yt,Pt,oe,ht,yt,L.DEPTH_BUFFER_BIT,L.NEAREST)):Me?L.copyTexSubImage3D(Nt,F,Pt,oe,xe+di,It,qt,ht,yt):L.copyTexSubImage2D(Nt,F,Pt,oe,xe+di,It,qt,ht,yt);ft.bindFramebuffer(L.READ_FRAMEBUFFER,null),ft.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Me?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Nt,F,Pt,oe,xe,ht,yt,Ct,on,he,ve.data):B.isCompressedArrayTexture?L.compressedTexSubImage3D(Nt,F,Pt,oe,xe,ht,yt,Ct,on,ve.data):L.texSubImage3D(Nt,F,Pt,oe,xe,ht,yt,Ct,on,he,ve):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,F,Pt,oe,ht,yt,on,he,ve.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,F,Pt,oe,ve.width,ve.height,on,ve.data):L.texSubImage2D(L.TEXTURE_2D,F,Pt,oe,ht,yt,on,he,ve);L.pixelStorei(L.UNPACK_ROW_LENGTH,Zn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ue),L.pixelStorei(L.UNPACK_SKIP_PIXELS,En),L.pixelStorei(L.UNPACK_SKIP_ROWS,$i),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ln),F===0&&B.generateMipmaps&&L.generateMipmap(Nt),ft.unbindTexture()},this.copyTextureToTexture3D=function(E,B,V=null,W=null,F=0){return E.isTexture!==!0&&(Ys("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,E=arguments[2],B=arguments[3],F=arguments[4]||0),Ys('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,B,V,W,F)},this.initRenderTarget=function(E){Mt.get(E).__webglFramebuffer===void 0&&C.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?C.setTextureCube(E,0):E.isData3DTexture?C.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?C.setTexture2DArray(E,0):C.setTexture2D(E,0),ft.unbindTexture()},this.resetState=function(){T=0,w=0,A=null,ft.reset(),ge.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}},Eo=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ts=class extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new De,this.environmentIntensity=1,this.environmentRotation=new De,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var yu=new P,vu=new ae,Mu=new ae,r_=new P,bu=new Ft,Kr=new P,Wa=new Hn,Su=new Ft,Xa=new ir,To=class extends de{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Mh,this.bindMatrix=new Ft,this.bindMatrixInverse=new Ft,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new kn),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Kr),this.boundingBox.expandByPoint(Kr)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Kr),this.boundingSphere.expandByPoint(Kr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wa.copy(this.boundingSphere),Wa.applyMatrix4(s),t.ray.intersectsSphere(Wa)!==!1&&(Su.copy(s).invert(),Xa.copy(t.ray).applyMatrix4(Su),!(this.boundingBox!==null&&Xa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Xa)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ae,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Mh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Uf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;vu.fromBufferAttribute(s.attributes.skinIndex,t),Mu.fromBufferAttribute(s.attributes.skinWeight,t),yu.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=Mu.getComponent(r);if(o!==0){let a=vu.getComponent(r);bu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(r_.copy(yu).applyMatrix4(bu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},ar=class extends Ue{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ao=class extends an{constructor(t=null,e=1,n=1,s,r,o,a,l,c=un,h=un,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},wu=new Ft,o_=new Ft,Ro=class i{constructor(t=[],e=[]){this.uuid=Ei(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ft)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Ft;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:o_;wu.multiplyMatrices(a,e[r]),wu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Ao(e,t,t,vn,Pn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new ar),this.bones.push(o),this.boneInverses.push(new Ft().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},lr=class extends Re{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},hs=new Ft,Eu=new Ft,Qr=[],Tu=new kn,a_=new Ft,Ws=new de,Xs=new Hn,wi=class extends de{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new lr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,a_)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new kn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hs),Tu.copy(t.boundingBox).applyMatrix4(hs),this.boundingBox.union(Tu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hs),Xs.copy(t.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(Xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xs.copy(this.boundingSphere),Xs.applyMatrix4(n),t.ray.intersectsSphere(Xs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,hs),Eu.multiplyMatrices(n,hs),Ws.matrixWorld=Eu,Ws.raycast(t,Qr);for(let o=0,a=Qr.length;o<a;o++){let l=Qr[o];l.instanceId=r,l.object=this,e.push(l)}Qr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new lr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ao(new Float32Array(s*this.count),s,this.count,Ac,Pn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Hi=class extends oi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Au=new Ft,Jl=new ir,jr=new Hn,to=new P,As=class extends Ue{constructor(t=new Ee,e=new Hi){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(s),jr.radius+=r,t.ray.intersectsSphere(jr)===!1)return;Au.copy(s).invert(),Jl.copy(t.ray).applyMatrix4(Au);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=c.getX(g);to.fromBufferAttribute(u,m),Ru(to,m,l,s,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)to.fromBufferAttribute(u,g),Ru(to,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ru(i,t,e,n,s,r,o){let a=Jl.distanceSqToPoint(i);if(a<e){let l=new P;Jl.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Co=class extends an{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},bn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ut:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,s=[],r=[],o=[],a=new P,l=new Ft;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(He(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(He(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},cr=class extends bn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Kl=class extends cr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Uc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var eo=new P,qa=new Uc,Ya=new Uc,Za=new Uc,Ql=class extends bn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(eo.subVectors(s[0],s[1]).add(s[0]),c=eo);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(eo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=eo),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),qa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),Ya.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),Za.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(qa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ya.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Za.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(qa.calc(l),Ya.calc(l),Za.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Cu(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function l_(i,t){let e=1-i;return e*e*t}function c_(i,t){return 2*(1-i)*i*t}function h_(i,t){return i*i*t}function Qs(i,t,e,n){return l_(i,t)+c_(i,e)+h_(i,n)}function u_(i,t){let e=1-i;return e*e*e*t}function d_(i,t){let e=1-i;return 3*e*e*i*t}function f_(i,t){return 3*(1-i)*i*i*t}function p_(i,t){return i*i*i*t}function js(i,t,e,n,s){return u_(i,t)+d_(i,e)+f_(i,n)+p_(i,s)}var Io=class extends bn{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(js(t,s.x,r.x,o.x,a.x),js(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},jl=class extends bn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(js(t,s.x,r.x,o.x,a.x),js(t,s.y,r.y,o.y,a.y),js(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Po=class extends bn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},tc=class extends bn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lo=class extends bn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,s.x,r.x,o.x),Qs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ec=class extends bn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,s.x,r.x,o.x),Qs(t,s.y,r.y,o.y),Qs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Do=class extends bn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Cu(a,l.x,c.x,h.x,u.x),Cu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},nc=Object.freeze({__proto__:null,ArcCurve:Kl,CatmullRomCurve3:Ql,CubicBezierCurve:Io,CubicBezierCurve3:jl,EllipseCurve:cr,LineCurve:Po,LineCurve3:tc,QuadraticBezierCurve:Lo,QuadraticBezierCurve3:ec,SplineCurve:Do}),ic=class extends bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new nc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new nc[s.type]().fromJSON(s))}return this}},hr=class extends ic{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Po(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Lo(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Io(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Do(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new cr(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},sc=class i extends Ee{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=He(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,u=new P,d=new ut,f=new P,g=new P,x=new P,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let M=0;M<=e;M++){let y=n+M*h*s,_=Math.sin(y),R=Math.cos(y);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*_,u.y=t[T].y,u.z=t[T].x*R,o.push(u.x,u.y,u.z),d.x=M/e,d.y=T/(t.length-1),a.push(d.x,d.y);let w=l[3*T+0]*_,A=l[3*T+1],b=l[3*T+0]*R;c.push(w,A,b)}}for(let M=0;M<e;M++)for(let y=0;y<t.length-1;y++){let _=y+M*t.length,R=_,T=_+t.length,w=_+t.length+1,A=_+1;r.push(R,T,A),r.push(w,A,T)}this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("uv",new ne(a,2)),this.setAttribute("normal",new ne(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},Uo=class i extends sc{constructor(t=1,e=1,n=4,s=8){let r=new hr;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},No=class i extends Ee{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new P,h=new ut;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(a,3)),this.setAttribute("uv",new ne(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Be=class i extends Ee{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ne(u,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(f,2));function M(){let _=new P,R=new P,T=0,w=(e-t)/n;for(let A=0;A<=r;A++){let b=[],v=A/r,I=v*(e-t)+t;for(let D=0;D<=s;D++){let U=D/s,O=U*l+a,H=Math.sin(O),z=Math.cos(O);R.x=I*H,R.y=-v*n+m,R.z=I*z,u.push(R.x,R.y,R.z),_.set(H,w,z).normalize(),d.push(_.x,_.y,_.z),f.push(U,1-v),b.push(g++)}x.push(b)}for(let A=0;A<s;A++)for(let b=0;b<r;b++){let v=x[b][A],I=x[b+1][A],D=x[b+1][A+1],U=x[b][A+1];(t>0||b!==0)&&(h.push(v,I,U),T+=3),(e>0||b!==r-1)&&(h.push(I,D,U),T+=3)}c.addGroup(p,T,0),p+=T}function y(_){let R=g,T=new ut,w=new P,A=0,b=_===!0?t:e,v=_===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;let I=g;for(let D=0;D<=s;D++){let O=D/s*l+a,H=Math.cos(O),z=Math.sin(O);w.x=b*z,w.y=m*v,w.z=b*H,u.push(w.x,w.y,w.z),d.push(0,v,0),T.x=H*.5+.5,T.y=z*.5*v+.5,f.push(T.x,T.y),g++}for(let D=0;D<s;D++){let U=R+D,O=I+D;_===!0?h.push(O,O+1,U):h.push(O+1,O,U),A+=3}c.addGroup(p,A,_===!0?1:2),p+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ur=class i extends Be{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},rc=class i extends Ee{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let y=new P,_=new P,R=new P;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],_),f(e[T+2],R),l(y,_,R,M)}function l(M,y,_,R){let T=R+1,w=[];for(let A=0;A<=T;A++){w[A]=[];let b=M.clone().lerp(_,A/T),v=y.clone().lerp(_,A/T),I=T-A;for(let D=0;D<=I;D++)D===0&&A===T?w[A][D]=b:w[A][D]=b.clone().lerp(v,D/I)}for(let A=0;A<T;A++)for(let b=0;b<2*(T-A)-1;b++){let v=Math.floor(b/2);b%2===0?(d(w[A][v+1]),d(w[A+1][v]),d(w[A][v])):(d(w[A][v+1]),d(w[A+1][v+1]),d(w[A+1][v]))}}function c(M){let y=new P;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(M),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){let M=new P;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];let _=m(M)/2/Math.PI+.5,R=p(M)/Math.PI+.5;o.push(_,1-R)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){let y=o[M+0],_=o[M+2],R=o[M+4],T=Math.max(y,_,R),w=Math.min(y,_,R);T>.9&&w<.1&&(y<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),R<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){let _=M*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function g(){let M=new P,y=new P,_=new P,R=new P,T=new ut,w=new ut,A=new ut;for(let b=0,v=0;b<r.length;b+=9,v+=6){M.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),T.set(o[v+0],o[v+1]),w.set(o[v+2],o[v+3]),A.set(o[v+4],o[v+5]),R.copy(M).add(y).add(_).divideScalar(3);let I=m(R);x(T,v+0,M,I),x(w,v+2,y,I),x(A,v+4,_,I)}}function x(M,y,_,R){R<0&&M.x===1&&(o[y]=M.x-1),_.x===0&&_.z===0&&(o[y]=R/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var dr=class extends hr{constructor(t){super(t),this.uuid=Ei(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new hr().fromJSON(s))}return this}},m_={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=nd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=v_(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return fr(r,o,e,a,l,f,0),o}};function nd(i,t,e,n,s){let r,o;if(s===P_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Iu(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Iu(r,i[r],i[r+1],o);return o&&Zo(o,o.next)&&(mr(o),o=o.next),o}function Vi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Zo(e,e.next)||we(e.prev,e,e.next)===0)){if(mr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&E_(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?x_(i,n,s,r):g_(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),mr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=__(Vi(i),t,e),fr(i,t,e,n,s,r,2)):o===2&&y_(i,t,e,n,s,r):fr(Vi(i),t,e,n,s,r,1);break}}}function g_(i){let t=i.prev,e=i,n=i.next;if(we(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&fs(s,a,r,l,o,c,g.x,g.y)&&we(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function x_(i,t,e,n){let s=i.prev,r=i,o=i.next;if(we(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,x=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=oc(f,g,t,e,n),M=oc(x,m,t,e,n),y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=M;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&fs(a,h,l,u,c,d,y.x,y.y)&&we(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&fs(a,h,l,u,c,d,_.x,_.y)&&we(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&fs(a,h,l,u,c,d,y.x,y.y)&&we(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=M;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&fs(a,h,l,u,c,d,_.x,_.y)&&we(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function __(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Zo(s,r)&&id(s,n,n.next,r)&&pr(s,r)&&pr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),mr(n),mr(n.next),n=i=r),n=n.next}while(n!==i);return Vi(n)}function y_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&R_(o,a)){let l=sd(o,a);o=Vi(o,o.next),l=Vi(l,l.next),fr(o,t,e,n,s,r,0),fr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function v_(i,t,e,n){let s=[],r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=nd(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(A_(c));for(s.sort(M_),r=0;r<s.length;r++)e=b_(s[r],e);return e}function M_(i,t){return i.x-t.x}function b_(i,t){let e=S_(i,t);if(!e)return t;let n=sd(e,i);return Vi(n,n.next),Vi(e,e.next)}function S_(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,l=s.x,c=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&fs(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),pr(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&w_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function w_(i,t){return we(i.prev,i,t.prev)<0&&we(t.next,i,i.next)<0}function E_(i,t,e,n){let s=i;do s.z===0&&(s.z=oc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,T_(s)}function T_(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function oc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function A_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fs(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function R_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!C_(i,t)&&(pr(i,t)&&pr(t,i)&&I_(i,t)&&(we(i.prev,i,t.prev)||we(i,t.prev,t))||Zo(i,t)&&we(i.prev,i,i.next)>0&&we(t.prev,t,t.next)>0)}function we(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Zo(i,t){return i.x===t.x&&i.y===t.y}function id(i,t,e,n){let s=io(we(i,t,e)),r=io(we(i,t,n)),o=io(we(e,n,i)),a=io(we(e,n,t));return!!(s!==r&&o!==a||s===0&&no(i,e,t)||r===0&&no(i,n,t)||o===0&&no(e,i,n)||a===0&&no(e,t,n))}function no(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function io(i){return i>0?1:i<0?-1:0}function C_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&id(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function pr(i,t){return we(i.prev,i,i.next)<0?we(i,t,i.next)>=0&&we(i,i.prev,t)>=0:we(i,t,i.prev)<0||we(i,i.next,t)<0}function I_(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function sd(i,t){let e=new ac(i.i,i.x,i.y),n=new ac(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Iu(i,t,e,n){let s=new ac(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ac(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function P_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var tr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Pu(t),Lu(n,t);let o=t.length;e.forEach(Pu);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Lu(n,e[l]);let a=m_.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Pu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Lu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Oo=class i extends Ee{constructor(t=new dr([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new ne(s,3)),this.setAttribute("uv",new ne(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:L_,y,_=!1,R,T,w,A;p&&(y=p.getSpacedPoints(h),_=!0,d=!1,R=p.computeFrenetFrames(h,!1),T=new P,w=new P,A=new P),d||(m=0,f=0,g=0,x=0);let b=a.extractPoints(c),v=b.shape,I=b.holes;if(!tr.isClockWise(v)){v=v.reverse();for(let K=0,rt=I.length;K<rt;K++){let L=I[K];tr.isClockWise(L)&&(I[K]=L.reverse())}}let U=tr.triangulateShape(v,I),O=v;for(let K=0,rt=I.length;K<rt;K++){let L=I[K];v=v.concat(L)}function H(K,rt,L){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(rt,L)}let z=v.length,j=U.length;function G(K,rt,L){let Dt,st,wt,ft=K.x-rt.x,kt=K.y-rt.y,Mt=L.x-K.x,C=L.y-K.y,S=ft*ft+kt*kt,k=ft*C-kt*Mt;if(Math.abs(k)>Number.EPSILON){let $=Math.sqrt(S),et=Math.sqrt(Mt*Mt+C*C),J=rt.x-kt/$,Rt=rt.y+ft/$,gt=L.x-C/et,bt=L.y+Mt/et,ee=((gt-J)*C-(bt-Rt)*Mt)/(ft*C-kt*Mt);Dt=J+ft*ee-K.x,st=Rt+kt*ee-K.y;let at=Dt*Dt+st*st;if(at<=2)return new ut(Dt,st);wt=Math.sqrt(at/2)}else{let $=!1;ft>Number.EPSILON?Mt>Number.EPSILON&&($=!0):ft<-Number.EPSILON?Mt<-Number.EPSILON&&($=!0):Math.sign(kt)===Math.sign(C)&&($=!0),$?(Dt=-kt,st=ft,wt=Math.sqrt(S)):(Dt=ft,st=kt,wt=Math.sqrt(S/2))}return new ut(Dt/wt,st/wt)}let ot=[];for(let K=0,rt=O.length,L=rt-1,Dt=K+1;K<rt;K++,L++,Dt++)L===rt&&(L=0),Dt===rt&&(Dt=0),ot[K]=G(O[K],O[L],O[Dt]);let dt=[],it,At=ot.concat();for(let K=0,rt=I.length;K<rt;K++){let L=I[K];it=[];for(let Dt=0,st=L.length,wt=st-1,ft=Dt+1;Dt<st;Dt++,wt++,ft++)wt===st&&(wt=0),ft===st&&(ft=0),it[Dt]=G(L[Dt],L[wt],L[ft]);dt.push(it),At=At.concat(it)}for(let K=0;K<m;K++){let rt=K/m,L=f*Math.cos(rt*Math.PI/2),Dt=g*Math.sin(rt*Math.PI/2)+x;for(let st=0,wt=O.length;st<wt;st++){let ft=H(O[st],ot[st],Dt);ct(ft.x,ft.y,-L)}for(let st=0,wt=I.length;st<wt;st++){let ft=I[st];it=dt[st];for(let kt=0,Mt=ft.length;kt<Mt;kt++){let C=H(ft[kt],it[kt],Dt);ct(C.x,C.y,-L)}}}let Gt=g+x;for(let K=0;K<z;K++){let rt=d?H(v[K],At[K],Gt):v[K];_?(w.copy(R.normals[0]).multiplyScalar(rt.x),T.copy(R.binormals[0]).multiplyScalar(rt.y),A.copy(y[0]).add(w).add(T),ct(A.x,A.y,A.z)):ct(rt.x,rt.y,0)}for(let K=1;K<=h;K++)for(let rt=0;rt<z;rt++){let L=d?H(v[rt],At[rt],Gt):v[rt];_?(w.copy(R.normals[K]).multiplyScalar(L.x),T.copy(R.binormals[K]).multiplyScalar(L.y),A.copy(y[K]).add(w).add(T),ct(A.x,A.y,A.z)):ct(L.x,L.y,u/h*K)}for(let K=m-1;K>=0;K--){let rt=K/m,L=f*Math.cos(rt*Math.PI/2),Dt=g*Math.sin(rt*Math.PI/2)+x;for(let st=0,wt=O.length;st<wt;st++){let ft=H(O[st],ot[st],Dt);ct(ft.x,ft.y,u+L)}for(let st=0,wt=I.length;st<wt;st++){let ft=I[st];it=dt[st];for(let kt=0,Mt=ft.length;kt<Mt;kt++){let C=H(ft[kt],it[kt],Dt);_?ct(C.x,C.y+y[h-1].y,y[h-1].x+L):ct(C.x,C.y,u+L)}}}q(),nt();function q(){let K=s.length/3;if(d){let rt=0,L=z*rt;for(let Dt=0;Dt<j;Dt++){let st=U[Dt];Ut(st[2]+L,st[1]+L,st[0]+L)}rt=h+m*2,L=z*rt;for(let Dt=0;Dt<j;Dt++){let st=U[Dt];Ut(st[0]+L,st[1]+L,st[2]+L)}}else{for(let rt=0;rt<j;rt++){let L=U[rt];Ut(L[2],L[1],L[0])}for(let rt=0;rt<j;rt++){let L=U[rt];Ut(L[0]+z*h,L[1]+z*h,L[2]+z*h)}}n.addGroup(K,s.length/3-K,0)}function nt(){let K=s.length/3,rt=0;pt(O,rt),rt+=O.length;for(let L=0,Dt=I.length;L<Dt;L++){let st=I[L];pt(st,rt),rt+=st.length}n.addGroup(K,s.length/3-K,1)}function pt(K,rt){let L=K.length;for(;--L>=0;){let Dt=L,st=L-1;st<0&&(st=K.length-1);for(let wt=0,ft=h+m*2;wt<ft;wt++){let kt=z*wt,Mt=z*(wt+1),C=rt+Dt+kt,S=rt+st+kt,k=rt+st+Mt,$=rt+Dt+Mt;zt(C,S,k,$)}}}function ct(K,rt,L){l.push(K),l.push(rt),l.push(L)}function Ut(K,rt,L){Bt(K),Bt(rt),Bt(L);let Dt=s.length/3,st=M.generateTopUV(n,s,Dt-3,Dt-2,Dt-1);ie(st[0]),ie(st[1]),ie(st[2])}function zt(K,rt,L,Dt){Bt(K),Bt(rt),Bt(Dt),Bt(rt),Bt(L),Bt(Dt);let st=s.length/3,wt=M.generateSideWallUV(n,s,st-6,st-3,st-2,st-1);ie(wt[0]),ie(wt[1]),ie(wt[3]),ie(wt[1]),ie(wt[2]),ie(wt[3])}function Bt(K){s.push(l[K*3+0]),s.push(l[K*3+1]),s.push(l[K*3+2])}function ie(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return D_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new nc[s.type]().fromJSON(s)),new i(n,t.options)}},L_={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ut(r,o),new ut(a,l),new ut(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ut(o,1-l),new ut(c,1-u),new ut(d,1-g),new ut(x,1-p)]:[new ut(a,1-l),new ut(h,1-u),new ut(f,1-g),new ut(m,1-p)]}};function D_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var gr=class i extends rc{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var dn=class i extends Ee{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new P,d=new P,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let M=[],y=p/n,_=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let R=0;R<=e;R++){let T=R/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(T+_,1-y),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let y=h[p][M+1],_=h[p][M],R=h[p+1][M],T=h[p+1][M+1];(p!==0||o>0)&&f.push(y,_,T),(p!==n-1||l<Math.PI)&&f.push(_,R,T)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(x,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Gi=class i extends Ee{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(x,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var fn=class extends oi{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ot(16777215),this.specular=new Ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new De,this.combine=Wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ln=class extends oi{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new De,this.combine=Wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function so(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function U_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Rs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},lc=class extends Rs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bh,endingEnd:bh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Sh:r=t,a=2*e-n;break;case wh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Sh:o=t,l=2*n-e;break;case wh:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let R=0;R!==a;++R)r[R]=p*o[h+R]+M*o[c+R]+y*o[l+R]+_*o[u+R];return r}},cc=class extends Rs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},hc=class extends Rs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Dn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=so(e,this.TimeBufferType),this.values=so(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:so(t.times,Array),values:so(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new hc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new cc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new lc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ho:e=this.InterpolantFactoryMethodDiscrete;break;case Nl:e=this.InterpolantFactoryMethodLinear;break;case xa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ho;case this.InterpolantFactoryMethodLinear:return Nl;case this.InterpolantFactoryMethodSmooth:return xa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&U_(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xa,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=Nl;var Wi=class extends Dn{constructor(t,e,n){super(t,e,n)}};Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=ho;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var uc=class extends Dn{};uc.prototype.ValueTypeName="color";var dc=class extends Dn{};dc.prototype.ValueTypeName="number";var fc=class extends Rs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ve.slerpFlat(r,0,o,c-a,o,c,l);return r}},Bo=class extends Dn{InterpolantFactoryMethodLinear(t){return new fc(this.times,this.values,this.getValueSize(),t)}};Bo.prototype.ValueTypeName="quaternion";Bo.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends Dn{constructor(t,e,n){super(t,e,n)}};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=ho;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var pc=class extends Dn{};pc.prototype.ValueTypeName="vector";var mc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},N_=new mc,gc=class{constructor(t){this.manager=t!==void 0?t:N_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};gc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Cs=class extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Fo=class extends Cs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},$a=new Ft,Du=new P,Uu=new P,xr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new Ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new or,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Du.setFromMatrixPosition(t.matrixWorld),e.position.copy(Du),Uu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Uu),e.updateMatrixWorld(),$a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($a),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},xc=class extends xr{constructor(){super(new Ye(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=ws*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},zo=class extends Cs{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new xc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Nu=new Ft,qs=new P,Ja=new P,_c=class extends xr{constructor(){super(new Ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new ae(2,1,1,1),new ae(0,1,1,1),new ae(3,1,1,1),new ae(1,1,1,1),new ae(3,0,1,1),new ae(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),qs.setFromMatrixPosition(t.matrixWorld),n.position.copy(qs),Ja.copy(n.position),Ja.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ja),n.updateMatrixWorld(),s.makeTranslation(-qs.x,-qs.y,-qs.z),Nu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nu)}},ko=class extends Cs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new _c}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},yc=class extends xr{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ho=class extends Cs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new yc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Vo=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ou(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Ou();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Ou(){return performance.now()}var Nc="\\[\\]\\.:\\/",O_=new RegExp("["+Nc+"]","g"),Oc="[^"+Nc+"]",B_="[^"+Nc.replace("\\.","")+"]",F_=/((?:WC+[\/:])*)/.source.replace("WC",Oc),z_=/(WCOD+)?/.source.replace("WCOD",B_),k_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oc),H_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oc),V_=new RegExp("^"+F_+z_+k_+H_+"$"),G_=["material","materials","bones","map"],vc=class{constructor(t,e,n){let s=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(O_,"")}static parseTrackName(t){let e=V_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);G_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=vc;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sy=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mc}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mc);var $o=class{constructor(){this.boxes=[],this.grid=new Map,this.dynamic=new Set,this.groundFn=()=>0,this._stamp=0}key(t,e){return t*73856093^e*19349663}addBox(t,e,n,s,r,o,a="static"){let l={minX:t,minY:e,minZ:n,maxX:s,maxY:r,maxZ:o,tag:a,stamp:0};this.boxes.push(l);for(let c=Math.floor(t/16);c<=Math.floor(s/16);c++)for(let h=Math.floor(n/16);h<=Math.floor(o/16);h++){let u=this.key(c,h);this.grid.has(u)||this.grid.set(u,[]),this.grid.get(u).push(l)}return l}addCentered(t,e,n,s,r,o){return this.addBox(t-s/2,e,n-o/2,t+s/2,e+r,n+o/2)}query(t,e,n,s){let r=[],o=++this._stamp;for(let a=Math.floor(t/16);a<=Math.floor(n/16);a++)for(let l=Math.floor(e/16);l<=Math.floor(s/16);l++){let c=this.grid.get(this.key(a,l));if(c)for(let h of c)h.stamp!==o&&(h.stamp=o,r.push(h))}return r}groundAt(t,e,n,s,r=.4){let o=this.groundFn(t,e);for(let a of this.query(t-n,e-n,t+n,e+n))a.maxY<=s+r&&a.maxY>o&&t+n>a.minX&&t-n<a.maxX&&e+n>a.minZ&&e-n<a.maxZ&&(o=a.maxY);return o}resolveCircle(t,e,n,s,r,o=.4,a=null,l=!1){let c=!1,h=0,u=0;for(let f=0;f<3;f++){let g=!1;for(let x of this.query(t-n,e-n,t+n,e+n)){if(x.maxY<=s+o||x.minY>=r)continue;let m=Math.max(x.minX,Math.min(t,x.maxX)),p=Math.max(x.minZ,Math.min(e,x.maxZ)),M=t-m,y=e-p,_=M*M+y*y;if(!(_>=n*n)){if(_>1e-8){let R=Math.sqrt(_);M/=R,y/=R,t=m+M*n,e=p+y*n}else{let R=t-x.minX,T=x.maxX-t,w=e-x.minZ,A=x.maxZ-e,b=Math.min(R,T,w,A);b===R?(t=x.minX-n,M=-1,y=0):b===T?(t=x.maxX+n,M=1,y=0):b===w?(e=x.minZ-n,M=0,y=-1):(e=x.maxZ+n,M=0,y=1)}h+=M,u+=y,c=!0,g=!0}}for(let x of this.dynamic){if(x===a||!x.collidable)continue;let m=x.pushCircleOut(t,e,n,s,r,l);m&&(t=m.x,e=m.z,h+=m.nx,u+=m.nz,c=!0,g=!0)}if(!g)break}let d=Math.hypot(h,u)||1;return{x:t,z:e,hit:c,nx:h/d,nz:u/d}}raycast(t,e,n,s,r,o,a){let l=t+s*a,c=n+o*a,h=a,u=this.query(Math.min(t,l),Math.min(n,c),Math.max(t,l),Math.max(n,c));for(let d of u){let f=0,g=h,x=[t,e,n],m=[s,r,o],p=[d.minX,d.minY,d.minZ],M=[d.maxX,d.maxY,d.maxZ],y=!0;for(let _=0;_<3;_++)if(Math.abs(m[_])<1e-9){if(x[_]<p[_]||x[_]>M[_]){y=!1;break}}else{let R=(p[_]-x[_])/m[_],T=(M[_]-x[_])/m[_];if(R>T){let w=R;R=T,T=w}if(f=Math.max(f,R),g=Math.min(g,T),f>g){y=!1;break}}y&&f<h&&(h=f)}for(let d of this.dynamic){if(!d.rayHit||d===this.rayIgnore)continue;let f=d.rayHit(t,e,n,s,r,o,h);f<h&&(h=f)}if(r<-1e-6){let f=(this.groundFn(t,n)+.05-e)/r;f>0&&f<h&&(h=f)}return h}};function pn(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Ee,c=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=rd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let g=rd(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function rd(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Re(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){let x=h.getComponent(d,g);a.setComponent(d+u,g,x)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var Dy=new Ft,od=new Ve,ad=new De,ld=new P,cd=new P;function Pe(i=0,t=0,e=0,n=0,s=0,r=0,o=1,a=1,l=1){return ad.set(s,n,r,"YXZ"),od.setFromEuler(ad),cd.set(i,t,e),ld.set(o,a,l),new Ft().compose(cd,od,ld)}function fe(i,t,e,n=1,s=n){let r=new Vt(i,t,e),o=r.attributes.uv,a=[[e,t],[e,t],[i,e],[i,e],[i,t],[i,t]];for(let l=0;l<6;l++)for(let c=0;c<4;c++){let h=l*4+c;o.setXY(h,o.getX(h)*a[l][0]/n,o.getY(h)*a[l][1]/s)}return r}function Te(i,t,e=1,n=e){let s=new Vn(i,t);s.rotateX(-Math.PI/2);let r=s.attributes.uv;for(let o=0;o<r.count;o++)r.setXY(o,r.getX(o)*i/e,r.getY(o)*t/n);return s}function Bc(i,t,e,n=.4,s=2){let r=i/2+n,o=t/2+n,a=[],l=[],c=(y,_,R,T,w,A)=>{a.push(...y,..._,...R),l.push(...T,...w,...A)},h=[-r,0,-o],u=[r,0,-o],d=[r,0,o],f=[-r,0,o],g=[-r,e,0],x=[r,e,0],m=Math.hypot(o,e)/s,p=2*r/s;c(h,g,x,[0,0],[0,m],[p,m]),c(h,x,u,[0,0],[p,m],[p,0]),c(d,x,g,[0,0],[0,m],[p,m]),c(d,g,f,[0,0],[p,m],[p,0]),c(f,g,h,[0,0],[.5,.5],[1,0]),c(u,x,d,[0,0],[.5,.5],[1,0]),c(h,u,d,[0,0],[1,0],[1,1]),c(h,d,f,[0,0],[1,1],[0,1]);let M=new Ee;return M.setAttribute("position",new ne(a,3)),M.setAttribute("uv",new ne(l,2)),M.computeVertexNormals(),M}function rn(i,t,e,n=10){return new Be(i,t,e,n)}function W_(i){let t=i.index?i.toNonIndexed():i;for(let e of Object.keys(t.attributes))["position","normal","uv","color"].includes(e)||t.deleteAttribute(e);return t.attributes.uv||t.setAttribute("uv",new ne(new Float32Array(t.attributes.position.count*2),2)),t.attributes.normal||t.computeVertexNormals(),t}function yr(i,t){let e=new Ot(t),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=e.r,s[r*3+1]=e.g,s[r*3+2]=e.b;return i.setAttribute("color",new Re(s,3)),i}var qi=class{constructor(){this.groups=new Map}add(t,e,n,s){e.isPaint&&(s=e.color,e=e.mat);let r=W_(t);if(r===t&&(r=t.clone()),e.isSign){let o=e.region,a=r.attributes.uv;for(let l=0;l<a.count;l++){let c=Math.min(1,Math.max(0,a.getX(l))),h=Math.min(1,Math.max(0,a.getY(l)));a.setXY(l,o.u0+(o.u1-o.u0)*c,o.v0+(o.v1-o.v0)*h)}e=e.mat}n&&r.applyMatrix4(n),e.vertexColors?yr(r,s!=null?s:16777215):r.attributes.color&&r.deleteAttribute("color"),this.groups.has(e)||this.groups.set(e,[]),this.groups.get(e).push(r)}flush(t,e={}){var s,r,o;let n=[];for(let[a,l]of this.groups){if(!l.length)continue;let c=pn(l,!1);l.forEach(d=>d.dispose()),c.computeBoundingSphere();let h=new de(c,a),u=(r=(s=a.userData.castShadow)!=null?s:e.castShadow)!=null?r:!0;h.castShadow=u,h.receiveShadow=(o=a.userData.receiveShadow)!=null?o:!0,h.matrixAutoUpdate=!1,h.updateMatrix(),t.add(h),n.push(h)}return this.groups.clear(),n}};var Fc=new Map,Jo=1337;function tt(){return Jo=Jo*16807%2147483647,(Jo-1)/2147483646}function Ko(i){Jo=i%2147483647||1}function Z(i,t){return i+(t-i)*tt()}function Wt(i){return i[Math.floor(tt()*i.length)]}function _e(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d",{willReadFrequently:!0})]}function mn(i,t,e,n,s=1){let r=i.getImageData(0,0,t,e),o=r.data;for(let a=0;a<o.length;a+=4){let l=(tt()-.5)*n;o[a]=Math.max(0,Math.min(255,o[a]+l)),o[a+1]=Math.max(0,Math.min(255,o[a+1]+l)),o[a+2]=Math.max(0,Math.min(255,o[a+2]+l)),o[a+3]=o[a+3]*s}i.putImageData(r,0,0)}function vr(i,t,e,n,s,r=2){for(let o=0;o<n;o++){i.fillStyle=Wt(s);let a=r*(.5+tt());i.fillRect(tt()*t,tt()*e,a,a)}}function be(i,t=!0,e=!0){let n=new Co(i);return t&&(n.wrapS=n.wrapT=er),e&&(n.colorSpace=Qe),n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=In,n}function Ce(i,t){return Fc.has(i)||Fc.set(i,t()),Fc.get(i)}function Mr(i,t=2,e=null){let n="n_"+(e||i.uuid)+t;return Ce(n,()=>{let s=i.image,r=s.width,o=s.height,a=s.getContext("2d").getImageData(0,0,r,o).data,l=new Float32Array(r*o);for(let g=0;g<r*o;g++)l[g]=(a[g*4]*.299+a[g*4+1]*.587+a[g*4+2]*.114)/255;let[c,h]=_e(r,o),u=h.createImageData(r,o),d=u.data;for(let g=0;g<o;g++)for(let x=0;x<r;x++){let m=l[g*r+(x-1+r)%r],p=l[g*r+(x+1)%r],M=l[(g-1+o)%o*r+x],y=l[(g+1)%o*r+x],_=-(p-m)*t,R=(y-M)*t,T=1,w=Math.hypot(_,R,T);_/=w,R/=w,T/=w;let A=(g*r+x)*4;d[A]=(_*.5+.5)*255,d[A+1]=(R*.5+.5)*255,d[A+2]=(T*.5+.5)*255,d[A+3]=255}h.putImageData(u,0,0);let f=be(c,!0,!1);return f.wrapS=i.wrapS,f.wrapT=i.wrapT,f})}function hd(i,t,e,n,s=1,r="rgba(15,15,16,0.6)"){i.strokeStyle=r,i.lineWidth=s,i.beginPath(),i.moveTo(t,e);let o=tt()*Math.PI*2;for(let a=0;a<n;a++)o+=Z(-.6,.6),t+=Math.cos(o)*6,e+=Math.sin(o)*6,i.lineTo(t,e);i.stroke()}function br(){return Ce("asphalt",()=>{let[t,e]=_e(512,512);e.fillStyle="#3b3c3e",e.fillRect(0,0,512,512);for(let n=0;n<40;n++){let s=e.createRadialGradient(0,0,0,0,0,1),r=tt()<.5?"255,255,255":"0,0,0";s.addColorStop(0,`rgba(${r},${Z(.03,.07)})`),s.addColorStop(1,`rgba(${r},0)`),e.save(),e.translate(tt()*512,tt()*512),e.scale(Z(30,120),Z(30,120)),e.fillStyle=s,e.fillRect(-1,-1,2,2),e.restore()}vr(e,512,512,14e3,["#2a2b2d","#4c4d50","#333436","#5a5a5c","#262628","#6a6a6c"],1.6),mn(e,512,512,26);for(let n=0;n<4;n++)hd(e,tt()*512,tt()*512,Math.floor(Z(5,14)),Z(.6,1.2),"rgba(15,15,16,0.4)");for(let n=0;n<5;n++)e.fillStyle=`rgba(10,10,12,${Z(.06,.14)})`,e.beginPath(),e.ellipse(tt()*512,tt()*512,Z(8,30),Z(5,18),tt()*3,0,7),e.fill();return be(t)})}function ud(){return Ce("road",()=>{let[t,e]=_e(1024,1024),n=br().image;for(let[o,a,l]of[[0,0,0],[512,0,1],[0,512,2],[512,512,3]])e.save(),e.translate(o+256,a+256),e.rotate(l*Math.PI/2),e.drawImage(n,-256,-256),e.restore();e.fillStyle="rgba(25,25,27,0.22)",e.fillRect(Z(350,600),Z(100,700),Z(150,260),Z(120,260));let s=1024/12;for(let o of[3.6,5.3,6.7,8.4]){let a=e.createLinearGradient((o-.5)*s,0,(o+.5)*s,0);a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(.5,"rgba(10,10,12,0.18)"),a.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=a,e.fillRect((o-.5)*s,0,s,1024)}for(let[o,a]of[[0,.6],[12,11.4]]){let l=e.createLinearGradient(o*s,0,a*s,0);l.addColorStop(0,"rgba(20,18,15,0.55)"),l.addColorStop(1,"rgba(20,18,15,0)"),e.fillStyle=l,e.fillRect(Math.min(o,a)*s,0,.6*s,1024)}let r=(o,a,l,c,h)=>{e.fillStyle=o,e.fillRect(a,l,c,h);for(let u=0;u<c*h/30;u++)e.fillStyle="rgba(50,50,52,0.6)",e.fillRect(a+tt()*c,l+tt()*h,Z(1,3),Z(1,3))};for(let o=0;o<1024;o+=s*6)r("#d4b02e",1024/2-s*.24,o,s*.12,s*3),r("#d4b02e",1024/2+s*.12,o,s*.12,s*3);return r("rgba(226,226,222,0.92)",s*2.5,0,s*.12,1024),r("rgba(226,226,222,0.92)",1024-s*2.5-s*.12,0,s*.12,1024),mn(e,1024,1024,10),be(t)})}function dd(){return Ce("cross",()=>{let[i,t]=_e(512,512);t.drawImage(br().image,0,0);for(let e=16;e<512;e+=64){t.fillStyle="rgba(232,232,228,0.92)",t.fillRect(e,0,36,512);for(let n=0;n<300;n++)t.fillStyle="rgba(60,60,62,0.55)",t.fillRect(e+tt()*36,tt()*512,Z(1,4),Z(1,4))}return mn(t,512,512,20),be(i)})}function zc(){return Ce("sidewalk",()=>{let[t,e]=_e(512,512),n=128;for(let s=0;s<512;s+=n)for(let r=0;r<512;r+=n){let o=Math.floor(Z(140,168));e.fillStyle=`rgb(${o},${o-4},${o-10})`,e.fillRect(r,s,n,n);for(let a=0;a<6;a++){let l=e.createRadialGradient(r+tt()*n,s+tt()*n,0,r+n/2,s+n/2,n);l.addColorStop(0,`rgba(0,0,0,${Z(0,.08)})`),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.fillRect(r,s,n,n)}}vr(e,512,512,9e3,["#8a857c","#b3ada2","#7b776f","#c2bdb2"],1.5),mn(e,512,512,22),e.fillStyle="rgba(55,52,48,0.85)";for(let s=0;s<=512;s+=n)e.fillRect(s-1.5,0,3,512),e.fillRect(0,s-1.5,512,3);e.fillStyle="rgba(255,255,255,0.12)";for(let s=0;s<=512;s+=n)e.fillRect(s+1.5,0,1,512),e.fillRect(0,s+1.5,512,1);for(let s=0;s<6;s++)hd(e,tt()*512,tt()*512,Math.floor(Z(3,8)),1,"rgba(40,38,35,0.6)");for(let s=0;s<30;s++)e.fillStyle=`rgba(30,30,30,${Z(.15,.35)})`,e.beginPath(),e.arc(tt()*512,tt()*512,Z(1.5,4),0,7),e.fill();return be(t)})}function kc(){return Ce("grass",()=>{let[t,e]=_e(512,512);e.fillStyle="#48682c",e.fillRect(0,0,512,512);for(let n=0;n<30;n++){let s=e.createRadialGradient(0,0,0,0,0,1),r=Wt(["70,100,40","60,85,30","95,110,50","50,70,28"]);s.addColorStop(0,`rgba(${r},0.5)`),s.addColorStop(1,`rgba(${r},0)`),e.save(),e.translate(tt()*512,tt()*512),e.scale(Z(40,110),Z(40,110)),e.fillStyle=s,e.fillRect(-1,-1,2,2),e.restore()}for(let n=0;n<22e3;n++){let s=tt()*512,r=tt()*512,o=Z(3,8),a=Z(-.5,.5)-Math.PI/2;e.strokeStyle=Wt(["#3a5a22","#5f8636","#4d7230","#6e9440","#35501d","#7a9a48"]),e.lineWidth=Z(.7,1.4),e.beginPath(),e.moveTo(s,r),e.lineTo(s+Math.cos(a)*o,r+Math.sin(a)*o),e.stroke()}return mn(e,512,512,14),be(t)})}function Hc(){return Ce("dirt",()=>{let[t,e]=_e(512,512);e.fillStyle="#7d6649",e.fillRect(0,0,512,512),vr(e,512,512,9e3,["#6b563c","#8f7858","#5e4a33","#9c8766","#4f3e2a"],2.2);for(let n=0;n<400;n++)e.fillStyle=Wt(["#a39478","#6d6658","#8a8070"]),e.beginPath(),e.arc(tt()*512,tt()*512,Z(1.5,4),0,7),e.fill();return mn(e,512,512,20),be(t)})}function Qo(){return Ce("concrete",()=>{let[t,e]=_e(512,512);e.fillStyle="#b1aca3",e.fillRect(0,0,512,512);for(let n=0;n<25;n++){let s=e.createRadialGradient(0,0,0,0,0,1);s.addColorStop(0,`rgba(80,75,70,${Z(.04,.12)})`),s.addColorStop(1,"rgba(80,75,70,0)"),e.save(),e.translate(tt()*512,tt()*512),e.scale(Z(30,120),Z(30,120)),e.fillStyle=s,e.fillRect(-1,-1,2,2),e.restore()}mn(e,512,512,30),vr(e,512,512,1600,["#9d978d","#c4bfb6","#8a857c"],2.5);for(let n=0;n<18;n++)e.fillStyle=`rgba(70,66,60,${Z(.04,.1)})`,e.fillRect(tt()*512,0,Z(2,8),512*Z(.2,1));return be(t)})}function fd(){return Ce("parking",()=>{let[i,t]=_e(512,512);t.drawImage(br().image,0,0),t.fillStyle="rgba(235,235,230,0.9)",t.fillRect(0,0,512,12),t.fillRect(0,0,12,512*.95);for(let e=0;e<400;e++)t.fillStyle="rgba(60,60,62,0.5)",t.fillRect(tt()*512,tt()*12,2,2),t.fillRect(tt()*12,tt()*490,2,2);return be(i)})}var X_={brick:{base:"#8a4a36",mortar:"#5f3326",frame:"#d8d0c0",glass:"#1d2633",sill:"#c8c0b0"},concrete:{base:"#a8a39a",mortar:"#8d877d",frame:"#5b5e62",glass:"#22303e",sill:"#bdb8ae"},office:{base:"#4d5a66",mortar:"#3b4650",frame:"#2a3138",glass:"#2c4258",sill:"#3b4650"},plaster:{base:"#c9b48e",mortar:"#a99572",frame:"#f1ece2",glass:"#1f2a35",sill:"#e8e0d0"},apartment:{base:"#b9a495",mortar:"#9a8577",frame:"#e8e0d6",glass:"#1d2733",sill:"#ddd4c8"}};function pd(i){return Ce("facade_"+i,()=>{let t=X_[i],e=1024,n=e/8,[s,r]=_e(e,e),[o,a]=_e(e,e),[l,c]=_e(e,e),[h,u]=_e(e,e);if(r.fillStyle=t.base,r.fillRect(0,0,e,e),a.fillStyle="#000",a.fillRect(0,0,e,e),c.fillStyle="#0a0a0a",c.fillRect(0,0,e,e),u.fillStyle="#808080",u.fillRect(0,0,e,e),i==="brick")for(let p=0;p<e;p+=8){for(let M=p/8%2*8;M<e+16;M+=16){let y=Z(-14,14);r.fillStyle=`rgb(${138+y},${74+y*.6},${54+y*.5})`,r.fillRect(M-16,p,15,7),u.fillStyle="#9a9a9a",u.fillRect(M-16,p,15,7)}r.fillStyle=t.mortar,r.fillRect(0,p+7,e,1)}else if(i==="concrete"||i==="plaster"||i==="apartment")for(let p=0;p<e;p+=n/2)r.fillStyle="rgba(0,0,0,0.06)",r.fillRect(0,p,e,1),u.fillStyle="#606060",u.fillRect(0,p,e,2);mn(r,e,e,i==="office"?8:22);for(let p=0;p<40;p++)r.fillStyle=`rgba(30,25,20,${Z(.03,.08)})`,r.fillRect(tt()*e,tt()*e,Z(3,10),Z(40,200));for(let p=0;p<8;p++){r.fillStyle=t.mortar,r.fillRect(0,p*n,e,i==="office"?10:6),u.fillStyle="#b0b0b0",u.fillRect(0,p*n,e,i==="office"?10:6);for(let M=0;M<8;M++){let y=M*n,_=p*n,R=i==="office"?n-12:n*.52,T=i==="office"?n-20:n*.6,w=y+(n-R)/2,A=_+(n-T)/2+4;r.fillStyle=t.frame,r.fillRect(w-6,A-6,R+12,T+12),r.fillStyle=t.sill,r.fillRect(w-10,A+T+4,R+20,7),i!=="office"&&(r.fillStyle=t.sill,r.fillRect(w-8,A-12,R+16,6)),u.fillStyle="#c8c8c8",u.fillRect(w-6,A-6,R+12,T+12),u.fillStyle="#e0e0e0",u.fillRect(w-10,A+T+4,R+20,7),u.fillStyle="#303030",u.fillRect(w,A,R,T);let b=tt()<.38,v=r.createLinearGradient(w,A,w+R*.6,A+T);if(v.addColorStop(0,"#5a6e86"),v.addColorStop(.45,t.glass),v.addColorStop(1,"#2a3646"),r.fillStyle=v,r.fillRect(w,A,R,T),tt()<.5&&(r.fillStyle=Wt(["rgba(220,210,190,0.35)","rgba(160,60,50,0.3)","rgba(80,100,140,0.3)"]),r.fillRect(w,A,R*Z(.15,.4),T)),c.fillStyle="#ffffff",c.fillRect(w,A,R,T),i!=="office"?(r.fillStyle=t.frame,r.fillRect(w+R/2-2,A,4,T),r.fillRect(w,A+T*.38,R,3),c.fillStyle="#000",c.fillRect(w+R/2-2,A,4,T),c.fillRect(w,A+T*.38,R,3)):(r.fillStyle=t.frame,r.fillRect(w+R/2-1,A,2,T)),b){let I=Wt(["#ffd79a","#ffe4b8","#fff1d6","#cfe3ff","#ffc77a"]),D=a.createLinearGradient(w,A,w,A+T);D.addColorStop(0,I),D.addColorStop(1,"#8a6a40"),a.fillStyle=D,a.globalAlpha=Z(.55,1),a.fillRect(w,A,R,T),a.globalAlpha=1,tt()<.5&&(a.fillStyle="rgba(0,0,0,0.5)",a.fillRect(w,A,R*Z(.2,.5),T)),i!=="office"&&(a.fillStyle="#000",a.fillRect(w+R/2-2,A,4,T))}i!=="office"&&tt()<.1&&(r.fillStyle="#d0d0cc",r.fillRect(w+R*.2,A+T+12,R*.55,14),r.fillStyle="#888",r.fillRect(w+R*.2,A+T+24,R*.55,2))}}let d=be(s),f=be(o),g=be(l,!0,!1),x=be(h,!0,!1),m=Mr(x,i==="brick"?3:2.2,"facade_"+i);return{map:d,emissive:f,spec:g,normal:m}})}function Vc(){return Ce("siding",()=>{let[i,t]=_e(512,512);for(let e=0;e<512;e+=32){let n=t.createLinearGradient(0,e,0,e+32);n.addColorStop(0,"#ffffff"),n.addColorStop(.8,"#e2e2e2"),n.addColorStop(.93,"#bdbdbd"),n.addColorStop(1,"#8a8a8a"),t.fillStyle=n,t.fillRect(0,e,512,32);for(let s=tt()*200;s<512;s+=Z(180,320))t.fillStyle="rgba(120,120,120,0.5)",t.fillRect(s,e,2,30)}for(let e=0;e<30;e++)t.fillStyle=`rgba(90,85,75,${Z(.03,.08)})`,t.fillRect(tt()*512,tt()*512,Z(2,6),Z(30,160));return mn(t,512,512,10),be(i)})}function Gc(){return Ce("roof",()=>{let[i,t]=_e(512,512);t.fillStyle="#3a2a24",t.fillRect(0,0,512,512);for(let e=0;e<512;e+=24)for(let n=e/24%2*24;n<560;n+=48){let s=Z(-12,12),r=t.createLinearGradient(0,e,0,e+23);r.addColorStop(0,`rgb(${92+s},${66+s},${57+s})`),r.addColorStop(1,`rgb(${70+s},${50+s},${43+s})`),t.fillStyle=r,t.fillRect(n-48,e,46,23)}return vr(t,512,512,4e3,["#2a1e1a","#7a6058","#4a3a34"],1.4),mn(t,512,512,14),be(i)})}function md(){return Ce("leaves",()=>{let[t,e]=_e(256,256);e.fillStyle="#7a8a6a",e.fillRect(0,0,256,256);for(let n=0;n<2600;n++){let s=tt()*256,r=tt()*256,o=Z(2,6),a=Math.floor(Z(120,255));e.fillStyle=`rgb(${a*.85},${a},${a*.7})`,e.beginPath(),e.ellipse(s,r,o,o*.55,tt()*3,0,7),e.fill()}for(let n=0;n<400;n++)e.fillStyle="rgba(20,30,10,0.5)",e.beginPath(),e.arc(tt()*256,tt()*256,Z(1,4),0,7),e.fill();return be(t)})}function gd(){return Ce("ao",()=>{let[i,t]=_e(8,64),e=t.createLinearGradient(0,0,0,64);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.35,"rgba(0,0,0,0.3)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,8,64),be(i,!1)})}function xd(){return Ce("blob",()=>{let[i,t]=_e(64,64),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.4)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),be(i,!1)})}function Wc(){return Ce("wood",()=>{let[i,t]=_e(128,128);t.fillStyle="#7b5a3a",t.fillRect(0,0,128,128);for(let e=0;e<40;e++){t.strokeStyle=`rgba(50,30,15,${Z(.1,.35)})`,t.beginPath();let n=tt()*128;t.moveTo(0,n),t.bezierCurveTo(40,n+Z(-4,4),80,n+Z(-4,4),128,n),t.stroke()}return mn(t,128,128,14),be(i)})}function Xc(){return Ce("bark",()=>{let[i,t]=_e(64,128);t.fillStyle="#4a3726",t.fillRect(0,0,64,128);for(let e=0;e<30;e++)t.fillStyle=`rgba(25,15,8,${Z(.2,.5)})`,t.fillRect(tt()*64,tt()*128,Z(1,3),Z(10,40));return mn(t,64,128,20),be(i)})}function _d(){return Ce("pool",()=>{let[i,t]=_e(128,128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,200,120,0.55)"),e.addColorStop(.4,"rgba(255,170,90,0.22)"),e.addColorStop(1,"rgba(255,150,70,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),be(i,!1)})}function yd(){return Ce("glow",()=>{let[i,t]=_e(64,64),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,230,180,0.6)"),e.addColorStop(1,"rgba(255,200,120,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),be(i,!1)})}function q_(i,t={}){{let e=t.w||512,n=t.h||128,[s,r]=_e(e,n);r.fillStyle=t.bg||"#1b3d6e",r.fillRect(0,0,e,n),t.border!==!1&&(r.strokeStyle=t.borderColor||"#fff",r.lineWidth=Math.max(4,n*.05),r.strokeRect(r.lineWidth,r.lineWidth,e-r.lineWidth*2,n-r.lineWidth*2)),r.fillStyle=t.fg||"#fff";let o=t.size||n*.5;for(r.font=`${t.weight||"bold"} ${o}px ${t.font||"Arial, Helvetica, sans-serif"}`;r.measureText(i).width>e*.9&&o>8;)o-=2,r.font=`${t.weight||"bold"} ${o}px ${t.font||"Arial, Helvetica, sans-serif"}`;return r.textAlign="center",r.textBaseline="middle",r.fillText(i,e/2,n/2+2),s}}function qc(){return Ce("shopwin",()=>{let[i,t]=_e(256,128),e=t.createLinearGradient(0,0,0,128);e.addColorStop(0,"#fff3d4"),e.addColorStop(1,"#e7c58a"),t.fillStyle=e,t.fillRect(0,0,256,128);for(let n=30;n<128;n+=32){t.fillStyle="#7a5a3a",t.fillRect(0,n,256,4);for(let s=4;s<252;s+=Z(8,16)){t.fillStyle=Wt(["#c0392b","#2980b9","#27ae60","#f39c12","#8e44ad","#ecf0f1","#d35400"]);let r=Z(10,22);t.fillRect(s,n-r,Z(5,10),r)}}return t.fillStyle="rgba(255,255,255,0.25)",t.beginPath(),t.moveTo(20,0),t.lineTo(70,0),t.lineTo(30,128),t.lineTo(-20,128),t.fill(),be(i,!1)})}function vd(){return Ce("tilefloor",()=>{let[i,t]=_e(128,128);for(let e=0;e<4;e++)for(let n=0;n<4;n++)t.fillStyle=(n+e)%2?"#d8d4cc":"#b9b3a8",t.fillRect(n*32,e*32,32,32);return mn(t,128,128,10),be(i)})}function Md(){return Ce("signAtlas",()=>{let[o,a]=_e(2048,1024);a.fillStyle="#222",a.fillRect(0,0,2048,1024);let l=be(o,!1),c=new Map,h=0;return{texture:l,region(u,d){let f=u+JSON.stringify(d);if(c.has(f))return c.get(f);if(h>=6*16)return c.values().next().value;let g=h%6,x=Math.floor(h/6);h++;let m=q_(u,{...d,w:341*2,h:64*2});a.drawImage(m,g*341+1,x*64+1,339,62),l.needsUpdate=!0;let p={u0:(g*341+2)/2048,u1:((g+1)*341-2)/2048,v0:1-((x+1)*64-2)/1024,v1:1-(x*64+2)/1024};return c.set(f,p),p}}})}var jo=[];function en(i,t={}){let e=new Ln(i);return Object.assign(e.userData,t),e}function Ls(i,t,e){return jo.push({mat:i,base:t,night:e}),i}var Fe=(i,t)=>({isPaint:!0,mat:i,color:t}),Nn=new rr(128,{generateMipmaps:!0,minFilter:In}),li=(i,t,e)=>({normalMap:Mr(i,t,e),normalScale:new ut(1,1)}),St=null;function Ds(){if(St)return St;St={};let i=(r,o,a={})=>new fn({map:r,...li(r,2.2,o),shininess:18,specular:2500134,...a});St.road=i(ud(),"road"),St.road.userData.castShadow=!1,St.asphalt=i(br(),"asphalt"),St.asphalt.userData.castShadow=!1,St.cross=i(dd(),"cross",{polygonOffset:!0,polygonOffsetFactor:-2}),St.cross.userData.castShadow=!1,St.sidewalk=en({map:zc(),...li(zc(),3,"sidewalk")},{castShadow:!1}),St.grass=en({map:kc(),...li(kc(),2.5,"grass")},{castShadow:!1}),St.dirt=en({map:Hc(),...li(Hc(),3,"dirt")},{castShadow:!1}),St.concrete=en({map:Qo(),...li(Qo(),1.5,"concrete")}),St.concreteFlat=en({map:Qo(),polygonOffset:!0,polygonOffsetFactor:-1},{castShadow:!1}),St.parking=i(fd(),"parking",{polygonOffset:!0,polygonOffsetFactor:-1}),St.parking.userData.castShadow=!1,St.facade={};for(let r of["brick","concrete","office","plaster","apartment"]){let o=pd(r);St.facade[r]=Ls(new fn({map:o.map,emissiveMap:o.emissive,emissive:16777215,emissiveIntensity:0,specularMap:o.spec,normalMap:o.normal,specular:8947848,shininess:80,envMap:Nn.texture,combine:Un,reflectivity:r==="office"?.75:.55}),0,1)}let t=en({map:Vc(),...li(Vc(),2,"siding"),vertexColors:!0});St.siding=[15921126,11125460,14206883,11057306,13209466,14735042].map(r=>Fe(t,r));let e=en({map:Gc(),...li(Gc(),4,"roof"),vertexColors:!0});St.roof=[16777215,9083560,11567216].map(r=>Fe(e,r));let n=en({vertexColors:!0}),s=en({map:Wc(),...li(Wc(),2,"wood"),vertexColors:!0});St.trim=Fe(n,16052714),St.darkTrim=Fe(n,3815994),St.wood=Fe(s,16777215),St.woodDark=Fe(s,9071184),St.fence=Fe(n,15658734),St.fenceWood=Fe(s,13150344),St.metal=Fe(n,6054246),St.metalDark=Fe(n,2829873),St.metalLight=Fe(n,11054514),St.red=Fe(n,11545130),St.yellow=Fe(n,14200874),St.green=Fe(n,3042106),St.blue=Fe(n,1916810),St.white=Fe(n,15790320),St.hedge=Fe(n,3495210),St.water=new fn({color:3828362,shininess:100,transparent:!0,opacity:.85,envMap:Nn.texture,combine:Un,reflectivity:.6}),St.water.userData.castShadow=!1,St.winDark=new fn({color:2765888,specular:10066329,shininess:90,envMap:Nn.texture,combine:Un,reflectivity:.55}),St.ao=new Ge({map:gd(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}),St.ao.userData.castShadow=!1,St.ao.userData.receiveShadow=!1,St.winLit=Ls(new fn({color:3815984,emissive:16767392,emissiveIntensity:0,specular:7829367,shininess:80,envMap:Nn.texture,combine:Un,reflectivity:.35}),0,1),St.lamp=Ls(en({color:12303274,emissive:16769712,emissiveIntensity:.3},{castShadow:!1}),.25,1.4),St.pool=new Ge({map:_d(),transparent:!0,depthWrite:!1,blending:_s,opacity:0}),St.pool.userData.castShadow=!1,St.pool.userData.receiveShadow=!1,jo.push({mat:St.pool,opacity:!0,base:0,night:1}),St.shopWin=Ls(new fn({map:qc(),emissiveMap:qc(),emissive:16777215,emissiveIntensity:.08,color:12303291,specular:8947848,shininess:90,envMap:Nn.texture,combine:Un,reflectivity:.3}),.08,.85),St.interior=en({color:15261904,emissive:2762272}),St.interiorFloor=en({map:vd(),emissive:1710100},{castShadow:!1}),St.ceilingLight=Ls(en({color:16777215,emissive:16774368,emissiveIntensity:.8},{castShadow:!1}),.8,1.2),St.glass=new fn({color:10139848,transparent:!0,opacity:.3,shininess:120,depthWrite:!1,envMap:Nn.texture,combine:Un,reflectivity:.4}),St.glass.userData.castShadow=!1,St.awning=[11022898,3107391,3100554,11565598,5910378,3355443].map(r=>Fe(n,r)),St.signMats=new Map,St.tl={NS:[],EW:[]};for(let r of["NS","EW"])for(let o of[16722458,16757274,2817898])St.tl[r].push(new Ge({color:o}));return St.tlOff=[3803656,3811848,539160],St.tlBox=Fe(n,2303530),St.bark=en({map:Xc(),...li(Xc(),3,"bark")}),St.flag=en({color:16777215,side:Cn}),St.signAtlas=Md(),St.sign=Ls(en({map:St.signAtlas.texture,emissiveMap:St.signAtlas.texture,emissive:16777215,emissiveIntensity:.4},{castShadow:!1}),.25,.9),St}function On(i,t={}){let e=Ds();return{isSign:!0,mat:e.sign,region:e.signAtlas.region(i,t)}}var ce=6,Xe=12,gn=76,le=gn-Xe,Gn=4,lt=.15,xn=ce/2*gn+Xe/2,Sr=1.75,Sd=4.75,ye=i=>(i-ce/2)*gn,ci=i=>ye(i)+gn/2,Y_=["Rua das Ac\xE1cias","Av. Los Valles","Rua Hidalgo","Av. Central","Rua Esperan\xE7a","Rua do Porto","Rua Velha"],Z_=["Rua Monroe","Av. Libertad","Rua das Palmeiras","Rua Cole","Rua Ram\xEDrez","Rua Ocidental","Rua Leste"],Yc=[["res","res","res","res","res","res"],["res","park","mixed","gas","mixed","res"],["res","shops","down","down","apart","res"],["res","police","down","down","parking","res"],["res","apart","mixed","shops2","park","res"],["res","res","res","res","res","res"]];function wd(i){let t=i-ye(0)+Xe/2;return t<0||t>ce*gn+Xe?!1:t%gn<Xe}function Ed(i,t){return Math.abs(i)<=xn&&Math.abs(t)<=xn&&(wd(i)||wd(t))?0:lt}var Ze=class{constructor(t,e,n,s,r){this.x=t,this.z=e,this.ry=n,this.c=Math.cos(n),this.s=Math.sin(n),this.B=s,this.world=r}pt(t,e){return[this.x+t*this.c+e*this.s,this.z-t*this.s+e*this.c]}m(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){let[h,u]=this.pt(t,n);return Pe(h,e,u,this.ry+s,r,o,a,l,c)}add(t,e,n,s,r,o=0,a=0,l=0){this.B.add(t,e,this.m(n,s,r,o,a,l))}box(t,e,n,s,r,o,a,l=!0,c=2,h=c){this.B.add(fe(r,o,a,c,h),t,this.m(e,n+o/2,s)),l&&this.collide(e,n,s,r,o,a)}ao(t,e,n,s,r=1.5){let o=lt+.022,a=Ds();for(let[l,c,h,u]of[[0,s/2+r/2,n+r,0],[0,-s/2-r/2,n+r,Math.PI],[n/2+r/2,0,s+r,Math.PI/2],[-n/2-r/2,0,s+r,-Math.PI/2]])this.B.add(Te(h,r,h,r),a.ao,this.m(t+l,o,e+c,u))}collide(t,e,n,s,r,o){let[a,l]=this.pt(t,n),c=Math.abs(this.s)>.5,h=c?o:s,u=c?s:o;this.world.addBox(a-h/2,e,l-u/2,a+h/2,e+r,l+u/2)}},ta=class{constructor(t,e){this.scene=t,this.world=e,this.root=new je,this.root.name="LosValles",t.add(this.root),this.parkedCars=[],this.npcs=[],this.trees=[],this.shopkeepers=[],this.landmarks=[],this.pedLoops=[],this.lamps=[],e.groundFn=Ed,this.M=Ds(),this.chunks=new Map}chunk(t,e){let n=Math.floor(t/2)+","+Math.floor(e/2);return this.chunks.has(n)||this.chunks.set(n,new qi),this.chunks.get(n)}build(){Ko(20261108),this.buildRoads();for(let t=0;t<ce;t++)for(let e=0;e<ce;e++)this.buildBlock(e,t,Yc[t][e]);this.buildOutskirts(),this.buildTrees(),this.buildStreetParking();for(let t of this.chunks.values())t.flush(this.root);this.chunks.clear()}buildRoads(){let t=this.M,e=new qi;for(let s=0;s<=ce;s++){for(let r=0;r<ce;r++){let o=gn-Xe,a=ci(r);e.add(Te(Xe,o,Xe,12),t.road,Pe(ye(s),0,a)),e.add(Te(Xe,o,Xe,12),t.road,Pe(a,0,ye(s),Math.PI/2)),e.add(new Be(.42,.42,.03,14),t.metalDark,Pe(ye(s)+(tt()<.5?-1:1)*1.7,.012,a+Z(-20,20))),e.add(new Be(.42,.42,.03,14),t.metalDark,Pe(a+Z(-20,20),.012,ye(s)+(tt()<.5?-1:1)*1.7));for(let l of[-1,1])e.add(Te(Xe,3,9.6,3),t.cross,Pe(ye(s),.01,a+l*(o/2-1.8))),e.add(Te(Xe,3,9.6,3),t.cross,Pe(a+l*(o/2-1.8),.01,ye(s),Math.PI/2))}for(let r=0;r<=ce;r++)e.add(Te(Xe,Xe,6),t.asphalt,Pe(ye(s),0,ye(r)))}e.flush(this.root,{castShadow:!1});let n=new qi;for(let s=0;s<=ce;s++)for(let r=0;r<=ce;r++)this.buildIntersection(n,s,r);n.flush(this.root)}buildIntersection(t,e,n){let s=this.M,r=ye(e),o=ye(n),a=[[0,1,"NS"],[0,-1,"NS"],[1,0,"EW"],[-1,0,"EW"]];for(let[l,c,h]of a){let u=e-l,d=n-c;if(u<0||u>ce||d<0||d>ce)continue;let f=-c,g=l,x=r-l*7.2+-c*7.2,m=o-c*7.2+l*7.2,p=Math.atan2(-l,-c);t.add(rn(.09,.11,5.4,8),s.metalDark,Pe(x,lt+2.7,m)),this.world.addCentered(x,0,m,.3,5.6,.3);let M=x+c*5,y=m-l*5;t.add(fe(.12,.12,5),s.metalDark,Pe((x+M)/2,lt+4.7,(m+y)/2,Math.atan2(c,-l)));for(let[_,R,T]of[[M,y,4.1],[x,m,2.9]]){t.add(fe(.36,1,.28),s.tlBox,Pe(_,lt+T,R,p));for(let w=0;w<3;w++){let A=Math.sin(p)*.15,b=Math.cos(p)*.15;t.add(new Be(.1,.1,.04,10),s.tl[h][w],Pe(_+A,lt+T+.3-w*.3,R+b,p,Math.PI/2))}}x>r&&m>o&&(n<ce&&t.add(fe(1.8,.28,.03,1.8,.28),On(Y_[n],{bg:"#1f6b3a",w:512,h:80}),Pe(x-.95,lt+5.05,m)),e<ce&&t.add(fe(1.8,.28,.03,1.8,.28),On(Z_[e],{bg:"#1f6b3a",w:512,h:80}),Pe(x,lt+5.4,m-.95,Math.PI/2)))}}buildBlock(t,e,n){let s=this.M,r=ci(t),o=ci(e),a=this.chunk(t,e),l=new Ze(r,o,0,a,this.world);a.add(fe(le,lt,le,4),s.sidewalk,Pe(r,lt/2,o));for(let[f,g,x,m]of[[0,le/2-.15,le,.3],[0,-le/2+.15,le,.3],[le/2-.15,0,.3,le-.6],[-le/2+.15,0,.3,le-.6]])a.add(fe(x+.02,lt+.01,m+.02,2),s.concrete,Pe(r+f,(lt+.01)/2,o+g));let c=le-Gn*2,h={res:s.grass,park:s.grass,apart:s.grass,parking:s.parking,gas:s.concreteFlat}[n]||s.concreteFlat;n==="parking"?a.add(Te(c,c,3,5.5),s.parking,Pe(r,lt+.005,o,Math.PI/2)):a.add(Te(c,c,n==="res"||n==="park"||n==="apart"?4:3),h,Pe(r,lt+.005,o)),this.streetFurniture(l,t,e,n),{res:()=>this.residential(l,t,e),down:()=>this.downtown(l),mixed:()=>this.mixed(l),shops:()=>this.shopsBlock(l,["Mercado Los Valles","Farm\xE1cia S\xE3o Lucas","Lanchonete do Joe","Ferragens Ram\xEDrez"]),shops2:()=>this.shopsBlock(l,["Loja de Roupas Vega","Padaria Aurora","Conveni\xEAncia 24h","Eletr\xF4nicos Sombra"]),police:()=>this.policeBlock(l),gas:()=>this.gasBlock(l),parking:()=>this.parkingBlock(l),apart:()=>this.apartBlock(l),park:()=>this.parkBlock(l)}[n]();let d=le/2-2;this.pedLoops.push({cx:r,cz:o,half:d,type:n})}streetFurniture(t,e,n,s){let r=this.M,o=le/2;for(let a=0;a<4;a++){let l=a*Math.PI/2;for(let c=0;c<3;c++){let h=-18+c*18+(a%2?9:0)*0,u=new Ze(t.x,t.z,l,t.B,this.world),d=h,f=o-.6;u.add(rn(.07,.11,6.5,8),r.metalDark,d,lt+3.25,f),u.add(fe(.08,.08,1.8),r.metalDark,d,lt+6.4,f+.85),u.add(fe(.45,.14,.7),r.metalDark,d,lt+6.35,f+1.7),u.add(fe(.36,.04,.55),r.lamp,d,lt+6.27,f+1.7);{let[g,x]=u.pt(d,f+1.7);this.lamps.push([g,lt+6.15,x])}u.collide(d,0,f,.3,6.6,.3),t.B.add(Te(11,11),r.pool,u.m(d,.03,f+2.2)),c===1&&tt()<.6&&(u.add(rn(.25,.22,.8,10),r.green,d+2.5,lt+.4,f),u.collide(d+2.5,0,f,.5,.8,.5)),c===0&&tt()<.5&&(u.add(rn(.12,.14,.6,8),r.red,d+4,lt+.3,f-.2),u.add(new dn(.13,8,6),r.red,d+4,lt+.62,f-.2),u.collide(d+4,0,f-.2,.35,.7,.35))}}if((e+n)%3===0&&s!=="res"){let a=new Ze(t.x,t.z,Math.PI,t.B,this.world),l=o-1.4;a.box(r.metal,-1.4,lt,l,.08,2.4,.08,!1),a.box(r.metal,1.4,lt,l,.08,2.4,.08,!1),a.box(r.metal,-1.4,lt,l-1.2,.08,2.4,.08,!1),a.box(r.metal,1.4,lt,l-1.2,.08,2.4,.08,!1),a.box(r.metalLight,0,lt+2.4,l-.6,3.2,.08,1.6,!1),a.add(Te(2.8,2.2),r.glass,0,lt+1.3,l-1.22,0,Math.PI/2),a.box(r.woodDark,0,lt+.45,l-1,2.4,.08,.45,!1),a.collide(0,0,l-.6,3,2.5,1.3),a.box(On("\xD4NIBUS",{bg:"#0b4f8a",w:256,h:80}),1.9,lt+2.2,l,.5,.25,.03,!1,.5,.25)}}house(t,e,n,s,r={}){var b,v,I,D,U,O;let o=this.M,a=new Ze(...t.pt(e,n),s,t.B,this.world),l=(b=r.w)!=null?b:Z(9,12),c=(v=r.d)!=null?v:Z(7.5,9),h=(I=r.floors)!=null?I:tt()<.45?2:1,u=2.9,d=h*u+.3,f=(D=r.siding)!=null?D:Wt(o.siding),g=Wt(o.roof),x=lt;a.box(o.concrete,0,x,0,l+.3,.45,c+.3,!1),a.ao(0,0,l+.3,c+.3,1.3),a.box(f,0,x+.45,0,l,d,c,!1,3,3),a.collide(0,0,0,l+.3,d+2,c+.3);for(let H of[-1,1])for(let z of[-1,1])a.box(o.trim,H*(l/2),x+.45,z*(c/2),.18,d,.18,!1);a.box(o.trim,0,x+.45+d-.15,0,l+.1,.18,c+.1,!1);let m=Z(1.6,2.4),p=l>=c,M=p?Bc(l,c,m,.5,2):Bc(c,l,m,.5,2);a.add(M,g,0,x+.45+d,0,p?0:Math.PI/2),tt()<.45&&a.box(o.facade.brick,l*.3,x+d-.5,-c*.15,.7,m+1.6,.7,!1,3,3);let y=(U=r.doorX)!=null?U:Z(-l*.25,l*.25);a.box(o.woodDark,y,x+.45,c/2+.02,1,2.1,.08,!1,1),a.box(o.trim,y,x+.45+2.1,c/2+.03,1.25,.12,.1,!1),a.box(o.metalLight,y+.35,x+1.45,c/2+.08,.06,.06,.06,!1),a.box(o.concrete,y,x,c/2+.9,2.6,.3,1.8,!1),a.box(o.wood,y,x+.3,c/2+.9,2.8,.1,1.8,!1,2),a.box(o.trim,y,x+2.9,c/2+1,3,.12,2,!1);for(let H of[-1,1])a.box(o.trim,y+H*1.3,x+.4,c/2+1.7,.14,2.5,.14,!1),a.collide(y+H*1.3,0,c/2+1.7,.25,2.8,.25);let _=(H,z,j)=>{for(let G=0;G<z;G++){let ot=j==="front"||j==="back"?l:c,dt=-ot/2+(G+.5)*(ot/z);if(j==="front"&&H<2&&Math.abs(dt-y)<1.6)continue;let At=tt()<.5?o.winLit:o.winDark,Gt=(q,nt,pt)=>{if(a.add(fe(1.2,1.3,.06),At,q,x+H,nt,pt),a.add(fe(1.4,.1,.12),o.trim,q,x+H+.7,nt,pt),a.add(fe(1.4,.12,.2),o.trim,q,x+H-.7,nt,pt),a.add(fe(.06,1.3,.1),o.trim,q,x+H,nt,pt),a.add(fe(1.2,.06,.1),o.trim,q,x+H,nt,pt),tt()<.5)for(let ct of[-1,1]){let[Ut,zt]=pt===0?[ct*.85,0]:[0,ct*.85];a.add(fe(.4,1.35,.05),o.darkTrim,q+Ut,x+H,nt+zt,pt)}};j==="front"?Gt(dt,c/2+.03,0):j==="back"?Gt(dt,-c/2-.03,0):Gt(j==="left"?-l/2-.03:l/2+.03,dt,Math.PI/2)}};for(let H=0;H<h;H++){let z=.45+H*u+1.55;_(z,Math.max(2,Math.round(l/3)),"front"),_(z,Math.max(2,Math.round(l/3.5)),"back"),_(z,Math.max(1,Math.round(c/4)),"left"),_(z,Math.max(1,Math.round(c/4)),"right")}let R=(O=r.front)!=null?O:8;a.add(Te(1.4,R),o.concreteFlat,y,x+.012,c/2+1.8+R/2);let T=y>0?-l/2+1.8:l/2-1.8;a.add(Te(3.2,R+2),o.concreteFlat,T,x+.012,c/2+R/2+1),a.box(o.metalDark,y+1.2,x,c/2+1.8+R-.6,.08,1,.08,!1),a.box(o.blue,y+1.2,x+1,c/2+1.8+R-.6,.25,.25,.45,!1);for(let H=0;H<4;H++){let z=-l/2+.8+tt()*(l-1.6);Math.abs(z-y)<1.6||Math.abs(z-T)<2||a.add(new gr(Z(.45,.7),0),o.hedge,z,x+.4,c/2+.6)}let[w,A]=a.pt(T,c/2+R-1.5);return{frame:a,driveway:[w,A],drivewayHeading:s+Math.PI,w:l,d:c,doorX:y,front:R}}residential(t,e,n){let s=this.M,r=(le-Gn*2)/2,o=3,a=r*2/o,l=new Ze(t.x,t.z,0,t.B,this.world);for(let c of[1,-1]){let h=c>0?0:Math.PI;for(let u=0;u<o;u++){let d=-r+a*(u+.5),f=8.5,g=8.5,x=c*(r-g-f/2-1.8),m=e===0&&n===2&&c===1&&u===2,p=this.house(t,d,x,h,{d:f,front:g,floors:m?2:void 0,siding:m?s.siding[1]:void 0,doorX:m?1.5:void 0});m?this.ethanHouse={door:p.frame.pt(p.doorX,f/2+3.5),driveway:p.driveway,heading:p.drivewayHeading}:tt()<.45&&this.parkedCars.push({x:p.driveway[0],z:p.driveway[1],heading:h+(tt()<.5?0:Math.PI),type:Wt(["sedan","hatch","suv","pickup"])});let M=c*(r-.3),y=p.frame.pt(p.doorX,0)[0]-t.x,_=p.driveway[0]-t.x,R=[[y-1,y+1],[_-1.9,_+1.9]].sort((b,v)=>b[0]-v[0]),T=d-a/2+.2,w=d+a/2-.2,A=[];for(let[b,v]of R)b>T&&A.push([T,Math.min(b,w)]),T=Math.max(T,v);w>T&&A.push([T,w]);for(let[b,v]of A){if(v-b<.4)continue;let I=(b+v)/2,D=v-b;l.box(s.fence,I,lt+.75,M,D,.08,.05,!1),l.box(s.fence,I,lt+.35,M,D,.08,.05,!1);for(let U=b;U<=v;U+=.25)l.add(fe(.07,.95,.03),s.fence,U,lt+.47,M);l.collide(I,0,M,D,1,.15)}tt()<.8&&this.trees.push([t.x+d+Z(-5,5),t.z+c*Z(2.5,6),Z(.9,1.4)])}}l.box(s.fenceWood,0,lt,0,r*2,1.8,.08,!0,2);for(let c=1;c<o;c++){let h=-r+a*c;for(let u of[1,-1])l.box(s.fenceWood,h,lt,u*5,.08,1.8,9,!0,2)}}building(t,e,n,s,r,o,a,l={}){var x,m;let c=this.M,h=3.2,u=lt,d=o*h,f=c.facade[a],g=new Ze(...t.pt(e,n),0,t.B,this.world);g.box(f,0,u,0,s,d,r,!0,24,25.6),g.ao(0,0,s+((x=l.storefronts)!=null&&x.length?.6:0),r+((m=l.storefronts)!=null&&m.length?.6:0),1.8),g.box(c.concrete,0,u+d,0,s+.4,.3,r+.4,!1);for(let[p,M,y,_]of[[0,r/2,s,.3],[0,-r/2,s,.3],[s/2,0,.3,r],[-s/2,0,.3,r]])g.box(c.concrete,p,u+d+.3,M,y,.9,_,!1);g.box(c.metalDark,0,u+d+.05,0,s-.4,.05,r-.4,!1);for(let p=0;p<Math.floor(Z(1,4));p++)g.box(c.metalLight,Z(-s/3,s/3),u+d+.3,Z(-r/3,r/3),Z(1.2,2.5),Z(.8,1.5),Z(1.2,2.5),!1);if(tt()<.4){let p=Z(-s/4,s/4),M=Z(-r/4,r/4);g.add(rn(1.3,1.3,2.4,12),c.woodDark,p,u+d+3,M);for(let y of[[-1,-1],[1,-1],[-1,1],[1,1]])g.box(c.metalDark,p+y[0]*.9,u+d+.3,M+y[1]*.9,.12,1.6,.12,!1)}if(l.tower&&o>8){let p=Math.floor(Z(3,7));g.box(f,0,u+d+.3,0,s*.6,p*h,r*.6,!0,24,25.6),g.box(c.concrete,0,u+d+.3+p*h,0,s*.6+.3,.4,r*.6+.3,!1),tt()<.6&&g.add(rn(.05,.08,8,6),c.metalDark,0,u+d+p*h+4.5,0)}for(let p of l.storefronts||[])this.storefront(g,s,r,p,l.names);return g}storefront(t,e,n,s,r){let o=this.M,a=lt,l={s:Math.PI,n:0,e:Math.PI/2,w:-Math.PI/2}[s],c=s==="n"||s==="s"?e:n,h=s==="n"||s==="s"?n:e,u=new Ze(...t.pt(0,0),l,t.B,this.world),d=Math.max(1,Math.floor(c/9)),f=c/d;u.box(o.darkTrim,0,a,h/2+.15,c,3.8,.3,!1,2);for(let g=0;g<d;g++){let x=-c/2+f*(g+.5);u.add(fe(f-1.4,2.4,.05,f-1.4,2.4),o.shopWin,x,a+1.6,h/2+.32),u.add(fe(1,2.2,.05),o.glass,x+f/2-.55,a+1.1,h/2+.33),u.add(fe(f-.6,.08,1.6),Wt(o.awning),x,a+3.3,h/2+1,0,.3);let m=r&&r.length?r.shift():Wt(["Caf\xE9 Noir","Barbearia Sombra","Livraria Lua","\xD3tica Vis\xE3o","Pizzaria Napoli","Lavanderia","Joalheria Ouro","Banco Los Valles","Hotel Esperanza","Cinema Ritz","Tabacaria","Floricultura","Sapataria","Bar do M\xE1rio","Restaurante El Sol"]),p=On(m,{bg:Wt(["#1a1a1a","#3b1414","#14283b","#2b2b10","#102b1a"]),fg:Wt(["#ffd27a","#ffffff","#ffb0b0","#b0e0ff"]),glow:!0,border:!1,w:512,h:96});u.add(fe(f-1,.75,.08,f-1,.75),p,x,a+4.2,h/2+.36)}}downtown(t){let e=(le-Gn*2)/2-.5,n=Z(-6,6),s=Z(-6,6),r=2,o=[[-e,n-r/2,-e,s-r/2,"s","w"],[n+r/2,e,-e,s-r/2,"s","e"],[-e,n-r/2,s+r/2,e,"n","w"],[n+r/2,e,s+r/2,e,"n","e"]];for(let[a,l,c,h,u,d]of o){let f=l-a,g=h-c;this.building(t,(a+l)/2,(c+h)/2,f,g,Math.floor(Z(5,15)),Wt(["brick","concrete","office","office","apartment","plaster"]),{storefronts:[u,d],tower:tt()<.5})}}mixed(t){let e=this.M,n=(le-Gn*2)/2-.5,s=3,r=(n*2-4)/s;for(let o=0;o<s;o++){let a=-n+r/2+o*(r+2);this.building(t,a,-n+7,r,14,Math.floor(Z(2,5)),Wt(["brick","plaster","concrete","apartment"]),{storefronts:["s"]})}this.parkingLot(t,0,9,n*2-2,18,0),t.add(Te(n*2,6,4),e.grass,0,lt+.01,-n+17);for(let o=0;o<5;o++)this.trees.push([t.x-n+4+o*12,t.z-n+17,Z(.8,1.1)])}parkingLot(t,e,n,s,r,o){let a=this.M,l=new Ze(...t.pt(e,n),o,t.B,this.world);l.add(Te(s,r,3,5.5),a.parking,0,lt+.008,0,Math.PI/2);let c=Math.floor(s/3);for(let h of[-1,1])for(let u=0;u<c;u++){if(tt()<.62)continue;let d=-s/2+1.5+u*3,[f,g]=l.pt(d,h*(r/2-2.9));this.parkedCars.push({x:f,z:g,heading:o+(h>0?Math.PI:0)+(tt()<.15?Math.PI:0),type:Wt(["sedan","hatch","suv","pickup","sedan","hatch","taxi"])})}for(let h of[-1,1]){l.add(rn(.08,.1,7,8),a.metalDark,h*s/4,lt+3.5,0),l.add(fe(1.6,.15,.4),a.metalDark,h*s/4,lt+7,0),l.add(fe(1.4,.05,.3),a.lamp,h*s/4,lt+6.92,0);{let[u,d]=l.pt(h*s/4,0);this.lamps.push([u,lt+6.8,d])}t.B.add(Te(14,14),a.pool,l.m(h*s/4,lt+.03,0)),l.collide(h*s/4,0,0,.3,7,.3)}}shopsBlock(t,e){let n=this.M,s=(le-Gn*2)/2,r=e.length,o=(s*2-2)/r,a=13,l=4.2;for(let c=0;c<r;c++){let h=-s+1+o*(c+.5);this.shop(t,h,-s+a/2+.5,o-.6,a,l,e[c],Math.PI)}this.parkingLot(t,0,10,s*2-2,18,0),this.trees.push([t.x-s+2,t.z+s-2,1],[t.x+s-2,t.z+s-2,1.1])}shop(t,e,n,s,r,o,a,l){let c=this.M,h=lt,u=.25,d=new Ze(...t.pt(e,n),l,t.B,this.world),f=Wt([c.facade.plaster,c.facade.brick,c.facade.concrete]);d.add(Te(s,r,2),c.interiorFloor,0,h+.02,0),d.box(c.concrete,0,h+o,0,s+.2,.4,r+.2,!0,2),d.ao(0,0,s,r,1.4),d.add(Te(s-.5,r-.5,4),c.interior,0,h+o-.01,0,0,Math.PI);for(let w=-1;w<=1;w+=2)d.add(fe(s*.5,.05,.4),c.ceilingLight,0,h+o-.05,w*r/4);d.box(f,0,h,-r/2+u/2,s,o,u,!0,24,25.6),d.box(c.interior,0,h,-r/2+u+.01,s-.6,o-.1,.02,!1);for(let w of[-1,1])d.box(f,w*(s/2-u/2),h,0,u,o,r,!0,24,25.6),d.box(c.interior,w*(s/2-u-.01),h,0,.02,o-.1,r-.6,!1);let g=1.8,x=(s-g)/2;for(let w of[-1,1]){let A=w*(g/2+x/2);d.box(c.darkTrim,A,h,r/2-.1,x,.6,.2,!1),d.add(fe(x,o-1.2,.04),c.glass,A,h+.6+(o-1.2)/2,r/2-.1),d.collide(A,0,r/2-.1,x,o,.3),d.box(c.darkTrim,w*(g/2),h,r/2-.1,.12,o,.22,!1)}d.box(c.darkTrim,0,h+o-.6,r/2-.1,s,.6,.22,!1);let m=On(a,{bg:Wt(["#7a1616","#123a6a","#1d4a26","#3b2b12","#222"]),fg:"#fff",glow:!0,w:512,h:96});d.add(fe(s-.6,.9,.1,s-.6,.9),m,0,h+o+.65,r/2+.05),d.add(fe(s-.4,.08,1.4),Wt(c.awning),0,h+o-.75,r/2+.7,0,.25),d.box(c.woodDark,-s/4,h,-r/2+3,s/2,1.05,.8,!0,1),d.box(c.metalLight,-s/4,h+1.05,-r/2+3,s/2+.1,.05,.9,!1),d.box(c.metalDark,-s/4-.6,h+1.1,-r/2+3,.4,.3,.3,!1);for(let w=0;w<2;w++){let A=s/4+.4,b=-r/2+4.5+w*3.2,v=s/2-1.8;d.box(c.wood,A,h,b,v,1.8,.5,!0,1);for(let I=0;I<3;I++)for(let D=0;D<6;D++)d.add(fe(.25,.3,.25),Wt([c.red,c.blue,c.green,c.yellow,c.white]),A-v/2+.3+D*((v-.6)/5),h+.35+I*.6,b+.26)}d.box(c.wood,0,h,-r/2+.55,s-1,2.2,.5,!1,1);let[p,M]=d.pt(-s/4,-r/2+1.9);this.shopkeepers.push({x:p,z:M,heading:l,shop:a});let[y,_]=d.pt(0,r/2+1),[R,T]=d.pt(0,0);this.landmarks.push({name:a,x:y,z:_,kind:"shop",inside:[R,T]})}policeBlock(t){let e=this.M,n=(le-Gn*2)/2,s=new Ze(t.x,t.z,0,t.B,this.world),r=34,o=16,a=7.4,l=n-o/2-6;s.box(e.facade.concrete,0,lt,l,r,a,o,!0,24,25.6),s.ao(0,l,r,o,1.8),s.box(e.blue,0,lt+3.2,l+o/2+.02,r,.5,.05,!1),s.box(e.concrete,0,lt+a,l,r+.6,.5,o+.6,!1),s.box(e.concrete,0,lt,l+o/2+2,10,.3,4,!1),s.box(e.concrete,0,lt+4.2,l+o/2+2,10.4,.4,4.2,!1);for(let h of[-4.5,-1.6,1.6,4.5])s.box(e.white,h,lt+.3,l+o/2+3.7,.5,3.9,.5,!0);s.box(e.glass,0,lt+.3,l+o/2+.05,3,2.8,.05,!1),s.box(On("DELEGACIA DE POL\xCDCIA",{bg:"#0e2a5c",fg:"#fff",glow:!0,w:1024,h:128}),0,lt+4.7,l+o/2+4.12,9,.9,.08,!1,9,.9),s.box(On("LOS VALLES",{bg:"#0e2a5c",fg:"#ffd27a",glow:!0,w:512,h:96}),0,lt+5.8,l+o/2+.06,6,.9,.08,!1,6,.9),s.add(rn(.06,.08,9,8),e.metalLight,r/2+3,lt+4.5,l+o/2+5),s.add(new Vn(1.8,1.1),e.flag,r/2+3.95,lt+8.3,l+o/2+5),s.collide(r/2+3,0,l+o/2+5,.3,9,.3),this.landmarks.push({name:"Delegacia de Los Valles",x:t.x,z:t.z+l+o/2+6,kind:"police"}),this.policeSpot={x:t.x-3,z:t.z+l+o/2+7};let c=this.parkedCars.length;this.parkingLot(t,0,-10,n*2-2,16,0),this.parkedCars.slice(c,c+4).forEach(h=>{h.type="police"});for(let h=0;h<4;h++)this.npcs.push({kind:"police",x:t.x+Z(-12,12),z:t.z+l+o/2+Z(5,9)})}gasBlock(t){let e=this.M,n=(le-Gn*2)/2,s=new Ze(t.x,t.z,0,t.B,this.world),r=-6;s.box(e.white,0,lt+5,r,22,.8,12,!1),s.box(e.red,0,lt+5.4,r,22.2,.3,12.2,!1),s.add(fe(20,.05,10),e.ceilingLight,0,lt+4.98,r),t.B.add(Te(24,16),e.pool,s.m(0,lt+.03,r));for(let o of[-7,0,7]){s.box(e.white,o,lt,r,.6,5,.6,!0);for(let a of[-1,1])s.box(e.concrete,o,lt,r+a*2.5,1.2,.25,3,!1),s.box(e.red,o,lt+.25,r+a*2.5,.8,1.7,.5,!0),s.box(e.darkTrim,o,lt+1.4,r+a*2.5+a*.26,.5,.35,.02,!1)}this.shop(t,0,16,18,12,4.2,"Conveni\xEAncia Posto Valles",Math.PI),s.add(rn(.2,.25,8,8),e.metal,-n+3,lt+4,-n+3),s.box(On("POSTO VALLES",{bg:"#b02020",fg:"#fff",glow:!0,w:512,h:128}),-n+3,lt+7,-n+3,3.2,1.6,.4,!1,3.2,1.6),s.box(On("GASOLINA  5,89",{bg:"#111",fg:"#ffcc33",glow:!0,w:512,h:96}),-n+3,lt+5.6,-n+3,3.2,.9,.42,!1,3.2,.9),s.collide(-n+3,0,-n+3,.5,8,.5),this.parkedCars.push({x:t.x+3.5,z:t.z+r+2.5,heading:Math.PI/2,type:"hatch"}),this.landmarks.push({name:"Posto Valles",x:t.x,z:t.z+r,kind:"gas"});for(let o=0;o<6;o++)this.trees.push([t.x+n-3,t.z-n+4+o*9,Z(.8,1.1)])}parkingBlock(t){let e=this.M,n=(le-Gn*2)/2;this.parkingLot(t,0,-13,n*2-2,26,0),this.parkingLot(t,0,14,n*2-2,24,0);let s=new Ze(t.x,t.z,0,t.B,this.world);s.box(e.facade.plaster,n-3,lt,0,3,2.6,2.5,!0,24,25.6),s.box(e.red,n-3,lt+2.6,0,3.4,.2,2.9,!1),s.box(On("ESTACIONAMENTO",{bg:"#1b3d6e",glow:!0}),n-3,lt+3.2,1.3,3,.6,.05,!1,3,.6),this.landmarks.push({name:"Estacionamento Central",x:t.x,z:t.z,kind:"parking"})}apartBlock(t){let e=this.M,n=(le-Gn*2)/2-1;this.building(t,-n+9,0,16,n*2-6,Math.floor(Z(5,8)),"apartment",{storefronts:["w"]}),this.building(t,n-9,-n/2-1,16,n-4,Math.floor(Z(4,7)),Wt(["brick","plaster"]),{storefronts:["e","s"]}),this.building(t,n-9,n/2+1,16,n-4,Math.floor(Z(4,7)),Wt(["brick","apartment"]),{storefronts:["e","n"]});let s=new Ze(t.x,t.z,0,t.B,this.world);for(let r=0;r<3;r++)this.trees.push([t.x+1,t.z-16+r*16,Z(.9,1.2)]);for(let r=0;r<2;r++)this.bench(s,-2.5,-8+r*16,Math.PI/2)}bench(t,e,n,s){let r=this.M,o=new Ze(...t.pt(e,n),s,t.B,this.world);o.box(r.wood,0,lt+.42,0,1.8,.06,.45,!1,1),o.box(r.wood,0,lt+.65,-.22,1.8,.4,.05,!1,1);for(let a of[-.8,.8])o.box(r.metalDark,a,lt,0,.06,.45,.45,!1);o.collide(0,0,0,1.9,.9,.6)}parkBlock(t){let e=this.M,n=(le-Gn*2)/2,s=new Ze(t.x,t.z,0,t.B,this.world);s.add(Te(3,n*2,3),e.dirt,0,lt+.012,0),s.add(Te(n*2,3,3),e.dirt,0,lt+.012,0),s.add(rn(4,4.2,.6,24),e.concrete,0,lt+.3,0),s.add(rn(3.7,3.7,.05,24),e.water,0,lt+.52,0),s.add(rn(.4,.6,1.8,10),e.concrete,0,lt+.9,0),s.add(rn(1.2,.8,.25,14),e.concrete,0,lt+1.8,0),this.world.addCentered(t.x,0,t.z,8.2,.75,8.2);for(let[r,o,a]of[[8,4,0],[-8,-4,Math.PI],[4,-8,-Math.PI/2],[-4,8,Math.PI/2],[12,-4,0],[-12,4,Math.PI]])this.bench(s,r,o,a);for(let r=0;r<26;r++){let o=Z(-n+2,n-2),a=Z(-n+2,n-2);Math.abs(o)<3.5||Math.abs(a)<3.5||Math.hypot(o,a)<7||this.trees.push([t.x+o,t.z+a,Z(.9,1.6)])}for(let r of[-1,1])s.box(e.hedge,r*(n-.6),lt,-n/2-2,.9,1,n-6,!0,1),s.box(e.hedge,r*(n-.6),lt,n/2+2,.9,1,n-6,!0,1);for(let[r,o]of[[2.5,14],[-2.5,-14],[14,-2.5],[-14,2.5]]){s.add(rn(.06,.08,3.8,8),e.metalDark,r,lt+1.9,o),s.add(new dn(.28,10,8),e.lamp,r,lt+3.9,o);{let[a,l]=s.pt(r,o);this.lamps.push([a,lt+3.9,l])}t.B.add(Te(7,7),e.pool,s.m(r,lt+.03,o)),s.collide(r,0,o,.25,4,.25)}this.landmarks.push({name:"Pra\xE7a",x:t.x,z:t.z,kind:"park"})}buildStreetParking(){for(let t=0;t<=ce;t++)for(let e=0;e<ce;e++){let n=ci(e);for(let s=-2;s<=2;s++){let r=n+s*9+Z(-1,1);for(let o of[-1,1]){if(tt()<.82)continue;let a=o<0?0:Math.PI;(t>0&&t<ce||t===0&&o>0||t===ce&&o<0)&&this.parkedCars.push({x:ye(t)+o*Sd,z:r,heading:a,type:Wt(["sedan","hatch","suv","sedan","pickup","taxi"])})}for(let o of[-1,1]){if(tt()<.84)continue;let a=o>0?Math.PI/2:-Math.PI/2;(t>0&&t<ce||t===0&&o>0||t===ce&&o<0)&&this.parkedCars.push({x:r,z:ye(t)+o*Sd,heading:a,type:Wt(["sedan","hatch","suv","sedan","pickup"])})}}}}buildOutskirts(){let t=this.M,e=new qi,n=xn,s=420;for(let[a,l,c,h]of[[0,(n+s)/2,2*s,s-n],[0,-(n+s)/2,2*s,s-n],[(n+s)/2,0,s-n,2*n],[-(n+s)/2,0,s-n,2*n]])e.add(Te(c,h,4),t.grass,Pe(a,lt,l));let r=new Ln({color:4086316,flatShading:!0});r.userData.castShadow=!1;for(let a=0;a<26;a++){let l=a/26*Math.PI*2+Z(-.1,.1),c=Z(255,300),h=new ur(Z(40,80),Z(25,70),7,1);e.add(h,r,Pe(Math.cos(l)*c,0,Math.sin(l)*c))}e.flush(this.root);for(let a=0;a<260;a++){let l=tt()*Math.PI*2,c=Z(n+12,n+90);this.trees.push([Math.cos(l)*c,Math.sin(l)*c,Z(1,1.8),tt()<.45])}let o=n+60;this.world.addBox(-o-2,0,-o,-o,50,o),this.world.addBox(o,0,-o,o+2,50,o),this.world.addBox(-o,0,-o-2,o,50,-o),this.world.addBox(-o,0,o,o,50,o+2)}buildTrees(){let t=this.trees.filter(y=>!y[3]),e=this.trees.filter(y=>y[3]),n=new Be(.12,.24,3.2,7);n.translate(0,1.6,0);let s=new wi(n,this.M.bark,this.trees.length),r=md(),o=new Ln({map:r,normalMap:Mr(r,3,"leaves")}),a=new gr(1,2),l=a.attributes.position;for(let y=0;y<l.count;y++){let _=new P().fromBufferAttribute(l,y),R=1+Math.sin(_.x*5.1)*.07+Math.cos(_.y*4.3+_.z*3.7)*.07;l.setXYZ(y,_.x*R,_.y*R,_.z*R)}a.computeVertexNormals();let c=new wi(a,o,Math.max(1,t.length*3)),h=[];for(let y=0;y<4;y++){let _=new ur(1.5-y*.3,2.2,9);_.translate(0,2.4+y*1.25,0),h.push(_)}let u=pn(h),d=new wi(u,o,Math.max(1,e.length)),f=new Ft,g=new Ot,x=new Ve,m=0,p=0,M=0;for(let[y,_,R,T]of this.trees){let w=Ed(y,_);if(f.compose(new P(y,w,_),x.identity(),new P(R,R*Z(.9,1.3),R)),s.setMatrixAt(p++,f),T)x.setFromAxisAngle(new P(0,1,0),tt()*6),f.compose(new P(y,w,_),x,new P(R,R*Z(1,1.4),R)),d.setMatrixAt(M,f),g.setHSL(Z(.28,.36),Z(.3,.45),Z(.2,.28)),d.setColorAt(M++,g);else{let A=Z(.2,.3);for(let b=0;b<3;b++){let v=Z(-.8,.8)*R,I=Z(-.8,.8)*R,D=(2.9+b*.9+Z(-.3,.3))*R,U=R*Z(1.3,2)*(b===2?.75:1);x.setFromEuler(new De(tt(),tt(),tt())),f.compose(new P(y+v,w+D,_+I),x,new P(U,U*.85,U)),c.setMatrixAt(m,f),g.setHSL(A+Z(-.02,.02),Z(.4,.6),Z(.32,.45)-b*.03*-1),c.setColorAt(m++,g)}}this.world.addCentered(y,0,_,.5*R,3,.5*R)}c.count=m,d.count=M;for(let y of[s,c,d])y.castShadow=!0,y.receiveShadow=!0,this.scene.add(y)}};var hi=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n)),$_={sedan:{L:4.6,W:1.82,wheelBase:2.75,wr:.34,belt:.95,roof:1.43,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:46,accel:7.5,name:"Sedan"},hatch:{L:4,W:1.75,wheelBase:2.5,wr:.32,belt:.93,roof:1.47,ws:[.85,.05],rw:[-1.45,-1.85],maxSpeed:42,accel:7,name:"Hatch"},suv:{L:4.75,W:1.95,wheelBase:2.85,wr:.4,belt:1.1,roof:1.75,ws:[1.15,.35],rw:[-1.95,-2.2],maxSpeed:40,accel:6.5,name:"SUV"},pickup:{L:5.2,W:1.95,wheelBase:3.15,wr:.4,belt:1.08,roof:1.78,ws:[1.45,.75],rw:[-.35,-.45],maxSpeed:39,accel:6.2,bed:!0,name:"Picape"},police:{L:4.7,W:1.85,wheelBase:2.8,wr:.35,belt:.97,roof:1.45,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:52,accel:9,police:!0,name:"Viatura"},taxi:{L:4.6,W:1.82,wheelBase:2.75,wr:.34,belt:.95,roof:1.43,ws:[1.05,.25],rw:[-1,-1.8],maxSpeed:44,accel:7.2,taxi:!0,name:"T\xE1xi"}},Id=[9313051,1916786,14277081,1710618,4147794,7040883,3037754,10254892,15921906,5906237,2575198,11688479],Td=new fn({vertexColors:!0,shininess:90,specular:6710886,envMap:Nn.texture,combine:Un,reflectivity:.22}),J_=new fn({color:1713456,transparent:!0,opacity:.5,shininess:120,specular:11184810,depthWrite:!1,envMap:Nn.texture,combine:Un,reflectivity:.45}),Ad=new Ln({vertexColors:!0}),$c=new Ge({color:16774872}),Jc=new Ge({color:6949386}),K_=new Ge({color:16719904}),ea=[new Ge({color:3342336}),new Ge({color:51})];function Yt(i,t,e){let n=i.index?i.toNonIndexed():i;n===i&&(n=i.clone());for(let s of Object.keys(n.attributes))["position","normal"].includes(s)||n.deleteAttribute(s);return n.attributes.normal||n.computeVertexNormals(),e&&n.applyMatrix4(e),yr(n,t),n}var te=(i,t,e,n=0,s=0,r=0,o=1,a=1,l=1)=>new Ft().compose(new P(i,t,e),new Ve().setFromEuler(new De(n,s,r,"YXZ")),new P(o,a,l)),Zc=new Map;function Q_(i){if(Zc.has(i))return Zc.get(i);let t=[],e=.24;t.push(Yt(new Be(i,i,e,18),1447446,te(0,0,0,0,0,Math.PI/2))),t.push(Yt(new Gi(i*.86,i*.14,4,14),2039583,te(e/2-.02,0,0,0,Math.PI/2,0))),t.push(Yt(new Be(i*.62,i*.62,e+.02,16),11120050,te(0,0,0,0,0,Math.PI/2))),t.push(Yt(new Be(i*.15,i*.15,e+.05,8),7040626,te(0,0,0,0,0,Math.PI/2)));for(let s=0;s<5;s++){let r=s/5*Math.PI*2;t.push(Yt(new Vt(.03,i*.95,.07),13685718,te(e/2+.012,0,0,r,0,0)))}let n=pn(t);return Zc.set(i,n),n}function Rd(i,t,e=.05){let n=new dr;n.moveTo(i[0][0],i[0][1]);for(let r=1;r<i.length;r++){let o=i[r];o.arc?n.absarc(o.arc[0],o.arc[1],o.arc[2],Math.PI,0,!0):n.lineTo(o[0],o[1])}let s=new Oo(n,{depth:t-e*2,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:2,curveSegments:8});return s.rotateY(-Math.PI/2),s.translate(t/2-e,0,0),s}var j_=0,na=class{constructor(t="sedan",e=9313051,n){this.id=j_++,this.type=t;let s=this.T=$_[t];this.world=n,s.police&&(e=16053492),s.taxi&&(e=15254042),this.color=e,this.group=new je,this.body=new je,this.group.add(this.body),this.build(e),this.x=0,this.z=0,this.y=0,this.heading=0,this.speed=0,this.lat=0,this.steer=0,this.yawRate=0,this.pushVx=0,this.pushVz=0,this.pitch=0,this.roll=0,this.wheelSpin=0,this.collidable=!0,this.height=s.roof,this.driver=null,this.braking=!1,this.lastHit=0,this.engineOn=!1}build(t){let e=this.T,n=e.L,s=e.W,r=n/2,o=e.wheelBase/2,a=e.wr,l=a*.75,c=e.belt,h=new Ot(t).multiplyScalar(.75).getHex(),u=[],d=a+.08,f=[[-r+.05,l+.05],[-o-d,l],{arc:[-o,a,d]},[o-d,l],{arc:[o,a,d]},[r-.08,l],[r,l+.15],[r+.02,c-.28],[r-.12,c-.16],[e.ws[0]+.1,c]];e.bed?f.push([e.rw[0]-.05,c],[-r+.02,c],[-r,l+.1]):f.push([e.rw[1]-.05,c],[-r+.18,c-.05],[-r+.02,c-.2],[-r,l+.15]),u.push(Yt(Rd(f,s,.06),t));let g=[[e.ws[0],c-.01],[e.ws[1],e.roof],[e.rw[0],e.roof],[e.rw[1],c-.01]],x=Rd(g,s-.16,0),m=e.ws[1]-e.rw[0];u.push(Yt(new Vt(s-.12,.06,m+.08),t,te(0,e.roof+.02,(e.ws[1]+e.rw[0])/2)));let p=(D,U,O,H,z)=>{let j=Math.hypot(O-D,H-U),G=Math.atan2(O-D,H-U);for(let ot of[-1,1])u.push(Yt(new Vt(.07,j,.09),t,te(ot*z,(U+H)/2,(D+O)/2,G,0,0)))};p(e.ws[0],c,e.ws[1],e.roof,s/2-.1),p(e.rw[1],c,e.rw[0],e.roof,s/2-.1);let M=(e.bed,(e.ws[1]+e.rw[0])/2-.1);p(M,c,M,e.roof,s/2-.09),u.push(Yt(new Vt(s+.04,.2,.16),2105892,te(0,l+.14,r-.02))),u.push(Yt(new Vt(s+.04,.2,.16),2105892,te(0,l+.14,-r+.02))),u.push(Yt(new Vt(s*.5,.14,.04),1052688,te(0,c-.3,r+.015)));for(let D=0;D<4;D++)u.push(Yt(new Vt(s*.48,.012,.05),7829367,te(0,c-.35+D*.035,r+.02)));for(let D of[-1,1])u.push(Yt(new Vt(.03,.06,n*.78),h,te(D*(s/2+.005),l+.2,0))),u.push(Yt(new Vt(.02,c-l-.1,.015),1118481,te(D*(s/2+.008),(c+l)/2,e.ws[0]-.05))),u.push(Yt(new Vt(.02,c-l-.1,.015),1118481,te(D*(s/2+.008),(c+l)/2,M))),!e.bed&&e.rw[1]<-1.5&&u.push(Yt(new Vt(.02,c-l-.12,.015),1118481,te(D*(s/2+.008),(c+l)/2,e.rw[1]+.15))),u.push(Yt(new Vt(.03,.03,.14),12303291,te(D*(s/2+.02),c-.1,M+.25))),u.push(Yt(new Vt(.03,.03,.14),12303291,te(D*(s/2+.02),c-.1,M-.65))),u.push(Yt(new Vt(.2,.12,.1),t,te(D*(s/2+.08),c+.06,e.ws[0]-.15))),u.push(Yt(new Vt(.02,.09,.07),11057352,te(D*(s/2+.08),c+.06,e.ws[0]-.205)));u.push(Yt(new Vt(.5,.13,.02),15658734,te(0,l+.22,-r-.07))),u.push(Yt(new Vt(.5,.13,.02),15658734,te(0,l+.22,r+.07)));let y=2763310,_=1973792;for(let D of[.38,-.38])u.push(Yt(new Vt(.48,.14,.5),y,te(D,l+.12,-.12))),u.push(Yt(new Vt(.48,.62,.12),y,te(D,l+.48,-.42,-.15,0,0))),u.push(Yt(new Vt(.26,.18,.1),y,te(D,l+.88,-.48,-.1,0,0)));if(!e.bed&&e.rw[1]<-1.5&&(u.push(Yt(new Vt(s-.3,.16,.5),y,te(0,l+.14,-1))),u.push(Yt(new Vt(s-.3,.55,.12),y,te(0,l+.45,-1.28,-.15,0,0)))),u.push(Yt(new Vt(s-.2,.22,.4),_,te(0,c-.05,e.ws[0]-.28))),u.push(Yt(new Vt(.3,.1,.02),3828378,te(.38,c+.03,e.ws[0]-.49))),u.push(Yt(new Vt(.2,.3,.5),_,te(0,l+.35,.25))),u.push(Yt(new Vt(s-.1,.05,n*.6),1381653,te(0,l+.18,-.1))),e.bed){let D=e.rw[0]+r-.05;u.push(Yt(new Vt(s-.1,.05,D),2236962,te(0,c-.35,-r+D/2+.05))),u.push(Yt(new Vt(.06,.08,D),t,te(s/2-.05,c+.02,-r+D/2+.05))),u.push(Yt(new Vt(.06,.08,D),t,te(-s/2+.05,c+.02,-r+D/2+.05)))}if(e.police){for(let D of[-1,1])u.push(Yt(new Vt(.02,.3,e.L*.45),1120819,te(D*(s/2+.012),c-.25,-.2))),u.push(Yt(new Vt(.022,.08,e.L*.45),13938487,te(D*(s/2+.014),c-.07,-.2)));u.push(Yt(new Vt(.9,.05,.25),2236962,te(0,e.roof+.07,-.35)))}e.taxi&&u.push(Yt(new Vt(.55,.16,.22),16053492,te(0,e.roof+.12,-.4)));let R=pn(u);this._lodParts=[R];let T=new de(R,Td);T.castShadow=!0,T.receiveShadow=!0,this.body.add(T);let w=new de(x,J_);w.renderOrder=2,this.body.add(w);let A=[];for(let D of[-1,1])A.push(new Vt(.34,.12,.05).translate(D*(s/2-.28),c-.24,r+.005));this.body.add(new de(pn(A),$c));let b=[];for(let D of[-1,1])b.push(new Vt(.36,.13,.05).translate(D*(s/2-.25),e.bed?c-.15:c-.2,-r-.005));this.tail=new de(pn(b),Jc),this.body.add(this.tail),e.police&&(this.sirenL=new de(new Vt(.4,.1,.22),ea[0]),this.sirenR=new de(new Vt(.4,.1,.22),ea[1]),this.sirenL.position.set(.22,e.roof+.14,-.35),this.sirenR.position.set(-.22,e.roof+.14,-.35),this.body.add(this.sirenL,this.sirenR)),this.steeringWheel=new je,this.steeringWheel.add(new de(pn([Yt(new Gi(.17,.022,6,16),1118481),Yt(new Vt(.3,.03,.02),2236962)]),Ad)),this.steeringWheel.position.set(.38,c+.05,e.ws[0]-.55),this.steeringWheel.rotation.x=-.45,this.steeringWheel.rotation.order="YXZ",this.body.add(this.steeringWheel),this.wheels=[];let v=Q_(a);for(let[D,U]of[[1,1],[-1,1],[1,-1],[-1,-1]]){let O=new je;O.position.set(D*(s/2-.14),a,U*o);let H=new de(v,Ad);H.castShadow=!0,D<0&&(H.rotation.y=Math.PI);let z=new je;z.add(H),O.add(z),this.group.add(O),this.wheels.push({pivot:O,holder:z,front:U>0,sx:D,sz:U})}let I=[this._lodParts[0].clone()];for(let D of A)I.push(Yt(D,16773312));I.push(Yt(x,1844784));for(let D of b)I.push(Yt(D,7999504));for(let D of this.wheels){let U=new Ft().makeTranslation(D.pivot.position.x,D.pivot.position.y,D.pivot.position.z);D.sx<0&&U.multiply(new Ft().makeRotationY(Math.PI)),I.push(v.clone().applyMatrix4(U))}this.lodMesh=new de(pn(I),Td),this.lodMesh.visible=!1,this.group.add(this.lodMesh),this.detail=[T,this.tail,this.steeringWheel,...this.body.children.filter(D=>D.material===$c),...this.wheels.map(D=>D.pivot)],this.sirenL&&this.detail.push(this.sirenL,this.sirenR),this.glassMesh=w,this.lod=!1,this._lodParts=null,this.seat=new P(.38,l-.37,-.1)}setLOD(t){if(t!==this.lod){this.lod=t;for(let e of this.detail)e.visible=!t;this.lodMesh.visible=t,this.glassMesh.visible=!t,t&&this.body.rotation.set(0,0,0)}}place(t,e,n){this.x=t,this.z=e,this.heading=n,this.y=this.world.groundFn(t,e),this.syncTransform(0)}get forward(){return[Math.sin(this.heading),Math.cos(this.heading)]}get right(){return[-Math.cos(this.heading),Math.sin(this.heading)]}get velX(){return Math.sin(this.heading)*this.speed-Math.cos(this.heading)*this.lat+this.pushVx}get velZ(){return Math.cos(this.heading)*this.speed+Math.sin(this.heading)*this.lat+this.pushVz}get kmh(){return Math.abs(this.speed)*3.6}local(t,e){let n=Math.sin(this.heading),s=Math.cos(this.heading);return[this.x+t*s+e*n,this.z-t*n+e*s]}doorPos(t=1){return this.local(t*(this.T.W/2+.75),-.1)}pushCircleOut(t,e,n,s,r){if(s>this.y+this.height||r<this.y+.1)return null;let o=t-this.x,a=e-this.z;if(o*o+a*a>(this.T.L/2+n+.5)**2)return null;let l=Math.sin(this.heading),c=Math.cos(this.heading),h=o*c-a*l,u=o*l+a*c,d=this.T.W/2,f=this.T.L/2,g=Math.max(-d,Math.min(h,d)),x=Math.max(-f,Math.min(u,f)),m=h-g,p=u-x,M=Math.hypot(m,p),y,_;if(M>1e-6){if(M>=n)return null;m/=M,p/=M,y=g+m*n,_=x+p*n}else{let b=d-Math.abs(h),v=f-Math.abs(u);b<v?(m=Math.sign(h)||1,p=0,y=m*(d+n),_=u):(p=Math.sign(u)||1,m=0,y=h,_=p*(f+n))}let R=this.x+y*c+_*l,T=this.z-y*l+_*c,w=m*c+p*l,A=-m*l+p*c;return{x:R,z:T,nx:w,nz:A}}rayHit(t,e,n,s,r,o,a){let l=t-this.x,c=n-this.z;if(l*l+c*c>(a+4)**2)return 1/0;let h=Math.sin(this.heading),u=Math.cos(this.heading),d=[l*u-c*h,e-this.y,l*h+c*u],f=[s*u-o*h,r,s*h+o*u],g=[-this.T.W/2,.1,-this.T.L/2],x=[this.T.W/2,this.T.roof,this.T.L/2],m=0,p=a;for(let M=0;M<3;M++){if(Math.abs(f[M])<1e-9){if(d[M]<g[M]||d[M]>x[M])return 1/0;continue}let y=(g[M]-d[M])/f[M],_=(x[M]-d[M])/f[M];if(y>_){let R=y;y=_,_=R}if(m=Math.max(m,y),p=Math.min(p,_),m>p)return 1/0}return m}update(t,e,n){let s=this.T,r=e||{throttle:0,brake:0,steer:0,handbrake:0},o=this.speed,a=0;r.throttle>0&&(o<-.5?a=14*r.throttle:a=s.accel*r.throttle*(1-Math.min(1,Math.max(0,o)/s.maxSpeed)**2)),r.brake>0&&(o>.5?a-=14*r.brake:a-=4.5*r.brake*(o>-8?1:0)),this.braking=r.brake>0&&o>.5||r.handbrake>0,this.speed+=a*t;let l=.0025*this.speed*Math.abs(this.speed)+(r.throttle||r.brake?.15:1.2)*Math.sign(this.speed);Math.abs(this.speed)<Math.abs(l*t)&&!r.throttle&&!r.brake?this.speed=0:this.speed-=l*t,r.handbrake&&(this.speed=hi(this.speed,0,1.6,t));let c=.62/(1+Math.abs(this.speed)*.07);this.steer=hi(this.steer,(r.steer||0)*c,7,t);let h=this.speed*Math.tan(this.steer)/s.wheelBase,u=(r.handbrake?20:13)/Math.max(4,Math.abs(this.speed));h=Math.max(-u,Math.min(u,h));let d=r.handbrake?2.2:9;this.yawRate=hi(this.yawRate,h*(r.handbrake?1.25:1),d,t),this.heading+=this.yawRate*t,this.lat+=-this.yawRate*this.speed*(r.handbrake?.12:.035)*t*10,this.lat=hi(this.lat,0,d*.8,t),this.pushVx=hi(this.pushVx,0,3,t),this.pushVz=hi(this.pushVz,0,3,t),this.x+=this.velX*t,this.z+=this.velZ*t,this.resolveCollisions(n),this.syncTransform(t)}updatePassive(t){return Math.abs(this.pushVx)+Math.abs(this.pushVz)+Math.abs(this.speed)<.02?!1:(this.speed=hi(this.speed,0,2,t),this.pushVx=hi(this.pushVx,0,3,t),this.pushVz=hi(this.pushVz,0,3,t),this.x+=this.velX*t,this.z+=this.velZ*t,this.resolveCollisions(null),this.syncTransform(t),!0)}resolveCollisions(t){let e=this.T,n=e.W/2,s=null,r=Math.max(2,Math.round(e.L/e.W));for(let o=0;o<r;o++){let a=-e.L/2+n+o/(r-1)*(e.L-2*n),[l,c]=this.local(0,a),h=this.world.resolveCircle(l,c,n,this.y+.3,this.y+1.4,0,this,!0);h.hit&&(this.x+=h.x-l,this.z+=h.z-c,s=[h.nx,h.nz])}if(s){let[o,a]=this.forward,l=this.velX,c=this.velZ,h=l*s[0]+c*s[1],u=o*s[0]+a*s[1],d=Math.max(0,-h);if(this.speed*=1-Math.min(.85,Math.abs(u)*.9+.05),Math.abs(u)>.6&&d>2&&(this.speed=-Math.sign(this.speed||1)*d*.15),this.lastHit=d,t)for(let f of t){if(f===this)continue;let g=f.x-this.x,x=f.z-this.z,m=Math.hypot(g,x);m<(e.L+f.T.L)/2+.3&&m>.01&&(f.pushVx+=g/m*d*.4,f.pushVz+=x/m*d*.4,f.awake=!0)}}else this.lastHit=0}syncTransform(t){var T;let e=this.T,n=this.world.groundFn,s=e.wheelBase/2,r=e.W/2-.14,[o,a]=this.local(0,s),[l,c]=this.local(0,-s),[h,u]=this.local(r,0),[d,f]=this.local(-r,0),g=n(o,a),x=n(l,c),m=n(h,u),p=n(d,f),M=(g+x+m+p)/4,y=t>0?1-Math.exp(-12*t):1;this.y+=(M-this.y)*y;let _=Math.atan2(x-g,e.wheelBase)-(t>0?We.clamp((this.speed-((T=this._lastSpeed)!=null?T:this.speed))/t*.004,-.04,.04):0),R=Math.atan2(m-p,e.W)+We.clamp(this.yawRate*this.speed*.006,-.06,.06);this._lastSpeed=this.speed,this.pitch+=(_-this.pitch)*y,this.roll+=(R-this.roll)*y,this.group.position.set(this.x,this.y,this.z),this.group.rotation.set(0,this.heading,0),this.body.rotation.set(this.pitch,0,this.roll),this.wheelSpin+=this.speed/e.wr*t;for(let w of this.wheels)w.pivot.rotation.y=w.front?this.steer:0,w.holder.rotation.x=this.wheelSpin;this.steeringWheel.rotation.z=-this.steer*3,this.tail.material=this.braking?K_:Jc}},Cd=0;function Pd(i){Cd+=i;let t=Math.floor(Cd*4)%2===0;ea[0].color.setHex(t?16718362:3342336),ea[1].color.setHex(t?51:2245887)}function Ld(i){$c.color.setHex(i?16774872:13158592),Jc.color.setHex(i?10096656:5900810)}var ty=new Ln({vertexColors:!0});function ey(i,t,e,n){let s=i.index?i.toNonIndexed():i;s===i&&(s=i.clone());for(let l of Object.keys(s.attributes))["position","normal"].includes(l)||s.deleteAttribute(l);s.applyMatrix4(e),yr(s,t);let r=s.attributes.position.count,o=new Uint16Array(r*4),a=new Float32Array(r*4);for(let l=0;l<r;l++)o[l*4]=n,a[l*4]=1;return s.setAttribute("skinIndex",new Re(o,4)),s.setAttribute("skinWeight",new Re(a,4)),s}var ny=(i=0,t=0,e=0,n=1,s=1,r=1,o=0,a=0,l=0)=>new Ft().compose(new P(i,t,e),new Ve().setFromEuler(new De(o,a,l)),new P(n,s,r)),wr=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n)),iy={skin:13011556,hair:2825492,shirt:3426654,pants:2895672,shoes:1907997,jacket:null,hairStyle:"short",height:1,build:1,hat:null,beard:!1,badge:!1,tie:null},Us=class{constructor(t={}){var j,G,ot,dt;this.look={...iy,...t};let e=this.look;this.root=new je,this.root.name="humanoid",this.bones={};let n=(it,At,Gt,q,nt)=>{let pt=new ar;return pt.name=it,pt.position.set(Gt,q,nt),At&&At.add(pt),this.bones[it]=pt,pt},s=e.build,r=n("hips",null,0,.98,0),o=n("spine",r,0,.12,0),a=n("chest",o,0,.22,0),l=n("neck",a,0,.24,0),c=n("head",l,0,.08,0),h=n("shoulderL",a,.19*s,.18,0),u=n("shoulderR",a,-.19*s,.18,0),d=n("elbowL",h,0,-.29,0),f=n("elbowR",u,0,-.29,0),g=n("handL",d,0,-.27,0),x=n("handR",f,0,-.27,0),m=n("thighL",r,.1*s,-.04,0),p=n("thighR",r,-.1*s,-.04,0),M=n("kneeL",m,0,-.44,0),y=n("kneeR",p,0,-.44,0),_=n("footL",M,0,-.44,0),R=n("footR",y,0,-.44,0),T=Object.values(this.bones);r.updateMatrixWorld(!0);let w=it=>T.indexOf(it),A=[],b=it=>new P().setFromMatrixPosition(it.matrixWorld),v=(it,At,Gt,q=0,nt=0,pt=0,ct=1,Ut=1,zt=1,Bt=0,ie=0,K=0)=>{let rt=b(it);A.push(ey(At,Gt,ny(rt.x+q,rt.y+nt,rt.z+pt,ct,Ut,zt,Bt,ie,K),w(it)))},I=(j=e.jacket)!=null?j:e.shirt,D=(it,At)=>new Uo(it,At,4,12),U=it=>new dn(it,16,12),O=(it,At,Gt)=>new Vt(it,At,Gt);v(r,D(.15*s,.08),e.pants,0,-.02,0,1.15,1,.75,0,0,Math.PI/2),v(r,new Be(.165*s,.165*s,.05,12),2234900,0,.06,0,1.05,1,.72),v(o,D(.15*s,.12),I,0,.08,0,1.15,1,.75),v(a,D(.18*s,.12),I,0,.1,0,1.12,1,.72),e.jacket&&(v(a,O(.1,.4,.02),e.shirt,0,.02,.135),v(a,new Gi(.085,.03,6,12),e.jacket,0,.27,0,1,1,1,Math.PI/2)),e.tie&&v(a,O(.05,.24,.02),e.tie,0,.1,.14),e.badge&&v(a,O(.05,.06,.02),13938487,.09,.17,.135),v(l,new Be(.055,.06,.1,8),e.skin,0,.02,0),v(c,U(.115),e.skin,0,.11,.005,.92,1.08,1),v(c,U(.03),e.skin,0,.1,.11,.8,1,.9),v(c,U(.016),16119285,.042,.135,.095),v(c,U(.016),16119285,-.042,.135,.095),v(c,U(.009),1710618,.042,.135,.108),v(c,U(.009),1710618,-.042,.135,.108),v(c,O(.04,.008,.01),e.hair,.042,.163,.1),v(c,O(.04,.008,.01),e.hair,-.042,.163,.1),v(c,O(.045,.008,.01),9062976,0,.055,.105),v(c,U(.025),e.skin,.108,.11,0,.5,1,.8),v(c,U(.025),e.skin,-.108,.11,0,.5,1,.8),e.beard&&v(c,U(.1),e.hair,0,.06,.03,.95,.6,.85),e.hairStyle==="short"?v(c,new dn(.122,12,8,0,Math.PI*2,0,Math.PI*.55),e.hair,0,.125,-.008,.95,1.05,1.05,-.2):e.hairStyle==="long"?(v(c,new dn(.125,12,8,0,Math.PI*2,0,Math.PI*.6),e.hair,0,.125,-.01,.97,1.05,1.05,-.15),v(c,O(.22,.26,.06),e.hair,0,0,-.08)):e.hairStyle==="bun"?(v(c,new dn(.122,12,8,0,Math.PI*2,0,Math.PI*.55),e.hair,0,.125,-.008,.95,1.05,1.05,-.2),v(c,U(.06),e.hair,0,.2,-.1)):e.hairStyle,e.hat==="police"?(v(c,new Be(.13,.125,.08,14),(G=e.hatColor)!=null?G:1780298,0,.225,0),v(c,new Be(.14,.14,.015,14),1118481,0,.19,.03,1,1,1.15),v(c,O(.04,.035,.01),13938487,0,.23,.128)):e.hat==="cap"&&(v(c,new dn(.125,12,8,0,Math.PI*2,0,Math.PI*.5),(ot=e.hatColor)!=null?ot:11149858,0,.14,0),v(c,O(.16,.012,.1),(dt=e.hatColor)!=null?dt:11149858,0,.15,.13));for(let[it,At,Gt,q]of[[h,d,g,1],[u,f,x,-1]])v(it,U(.07*s),I,0,0,0),v(it,D(.052*s,.2),I,0,-.145,0),v(At,D(.045*s,.19),e.jacket?e.jacket:e.longSleeve?e.shirt:e.skin,0,-.13,0),v(Gt,U(.05),e.skin,0,-.04,.005,.75,1.15,.9),v(Gt,U(.022),e.skin,.028*q,-.02,.03);for(let[it,At,Gt]of[[m,M,_],[p,y,R]])v(it,D(.075*s,.32),e.pants,0,-.21,0),v(At,D(.06*s,.33),e.pants,0,-.21,0),v(Gt,O(.1,.07,.25),e.shoes,0,-.02,.05),v(Gt,O(.105,.02,.26),921102,0,-.055,.05);let H=pn(A,!1);A.forEach(it=>it.dispose()),H.computeBoundingSphere(),H.boundingSphere.radius=1.4,H.boundingSphere.center.set(0,.9,0);let z=new To(H,ty);z.add(r),z.bind(new Ro(T)),z.castShadow=!0,z.frustumCulled=!0,this.mesh=z,this.root.add(z),this.root.scale.setScalar(e.height),this.rest={};for(let[it,At]of Object.entries(this.bones))this.rest[it]=At.position.clone();this.cur={};for(let it of Object.keys(this.bones))this.cur[it]=new P;this.hipY=0,this.hipZ=0,this.phase=0,this.idleT=Math.random()*10,this.landT=0,this.lookYaw=0}update(t,e){let n={};for(let l of Object.keys(this.bones))n[l]=[0,0,0];let s=e.speed||0;this.idleT+=t;let r=0,o=0,a=12;if(e.mode==="sit")n.thighL=[-1.45,0,.05],n.thighR=[-1.45,0,-.05],n.kneeL=[1.2,0,0],n.kneeR=[1.2,0,0],n.footL=[.05,0,0],n.footR=[.05,0,0],n.shoulderL=[-.95,0,.12+(e.steer||0)*.25],n.shoulderR=[-.95,0,-.12+(e.steer||0)*.25],n.elbowL=[-.55,0,0],n.elbowR=[-.55,0,0],n.spine=[-.08,0,0],n.head=[.05,-(e.steer||0)*.25,0],r=-.42,o=-.05;else if(e.grounded){let l=We.smoothstep(s,2.6,5.2),c=Math.min(1,s/1),h=We.lerp(1.45,2.7,l);this.phase+=s/h*Math.PI*2*t;let u=this.phase,d=Math.sin(u),f=Math.sin(u+Math.PI),g=We.lerp(.42,.85,l)*c,x=We.lerp(.32,.75,l)*c;n.thighL=[-d*g-l*.15,0,.03],n.thighR=[-f*g-l*.15,0,-.03];let m=(_,R)=>(Math.max(0,Math.cos(R-.3))*We.lerp(.75,1.6,l)+.08)*c;n.kneeL=[m(d,u),0,0],n.kneeR=[m(f,u+Math.PI),0,0],n.footL=[Math.max(0,-d)*.3*c-.05*c,0,0],n.footR=[Math.max(0,-f)*.3*c-.05*c,0,0],n.shoulderL=[d*x,0,.08+l*.08],n.shoulderR=[f*x,0,-.08-l*.08],n.elbowL=[-(We.lerp(.25,1.35,l)*c+.12)-Math.max(0,d)*.2*c,0,0],n.elbowR=[-(We.lerp(.25,1.35,l)*c+.12)-Math.max(0,f)*.2*c,0,0];let p=l*.22+We.clamp((e.accel||0)*.03,-.12,.15);n.spine=[p,Math.sin(u)*.08*c,-(e.turn||0)*.06],n.chest=[0,-Math.sin(u)*.12*c,0],n.hips=[0,Math.sin(u)*.1*c,-(e.turn||0)*.05],r=-Math.abs(Math.cos(u))*We.lerp(.03,.07,l)*c+.01*c-l*.04;let M=1-c,y=Math.sin(this.idleT*1.6);if(n.chest[0]+=y*.02*M,n.shoulderL[2]+=(.06+y*.01)*M,n.shoulderR[2]-=(.06+y*.01)*M,n.elbowL[0]-=.1*M,n.elbowR[0]-=.1*M,n.hips[2]+=Math.sin(this.idleT*.4)*.03*M,n.thighL[2]+=.04*M,n.thighR[2]-=.04*M,n.head=[0,Math.sin(this.idleT*.35)*.35*M*(Math.sin(this.idleT*.11)>.3?1:.2)+this.lookYaw,0],e.talk){let _=this.idleT*3;n.head[0]+=Math.sin(_*1.3)*.06,n.shoulderR=[-.45-Math.sin(_)*.15,0,-.2],n.elbowR=[-1.1+Math.sin(_*1.7)*.2,.3,0]}if(this.landT>0){this.landT-=t;let _=Math.max(0,this.landT/.25);r-=.12*_,n.thighL[0]-=.5*_,n.thighR[0]-=.5*_,n.kneeL[0]+=.9*_,n.kneeR[0]+=.9*_,n.spine[0]+=.25*_}}else{let l=e.vy>0?1:0;n.thighL=[-.7*l-.25,0,.05],n.thighR=[-.15-.2*(1-l),0,-.05],n.kneeL=[1.1*l+.4,0,0],n.kneeR=[.6,0,0],n.shoulderL=[-.6,0,.5],n.shoulderR=[-.3,0,-.5],n.elbowL=[-.6,0,0],n.elbowR=[-.5,0,0],n.spine=[.12,0,0],n.head=[-.1,0,0]}for(let[l,c]of Object.entries(this.bones)){let h=this.cur[l],u=n[l];h.x=wr(h.x,u[0],a,t),h.y=wr(h.y,u[1],a,t),h.z=wr(h.z,u[2],a,t),c.rotation.set(h.x,h.y,h.z)}this.hipY=wr(this.hipY,r,14,t),this.hipZ=wr(this.hipZ,o,14,t),this.bones.hips.position.set(this.rest.hips.x,this.rest.hips.y+this.hipY,this.rest.hips.z+this.hipZ)}land(t){this.landT=.25*Math.min(1,t)}};var Kc=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function sy(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}var Dd={walkSpeed:1.75,runSpeed:6.2,accel:9,runAccel:7,decel:11,airControl:.25,jumpVel:5,gravity:18,radius:.33,height:1.8,turnSpeed:10},ia=class{constructor(t,e,n){this.world=e,this.model=new Us(n),t.add(this.model.root),this.x=0,this.y=0,this.z=0,this.heading=0,this.vx=0,this.vz=0,this.vy=0,this.grounded=!0,this.speed=0,this.turn=0,this.accel=0,this.mode="foot",this.jumpBuffer=0,this.coyote=0}place(t,e,n=0){this.x=t,this.z=e,this.heading=n,this.y=this.world.groundAt(t,e,Dd.radius,10),this.vx=this.vz=this.vy=0,this.sync()}update(t,e,n){let s=Dd,r=-Math.sin(n),o=-Math.cos(n),a=Math.cos(n),l=-Math.sin(n),c=r*e.z+a*e.x,h=o*e.z+l*e.x,u=Math.hypot(c,h);u>1&&(c/=u,h/=u);let d=u>.05,f=e.run?s.runSpeed:s.walkSpeed,g=c*f,x=h*f,m=this.grounded?1:s.airControl,p=(d?e.run?s.runAccel:s.accel:s.decel)*m,M=Math.hypot(this.vx,this.vz),y=g-this.vx,_=x-this.vz,R=Math.hypot(y,_),T=p*t*Math.max(1.2,R);if(R>0){let z=Math.min(1,T/R);this.vx+=y*z,this.vz+=_*z}!d&&this.grounded&&Math.hypot(this.vx,this.vz)<.05&&(this.vx=0,this.vz=0);let w=this.heading,A=Math.hypot(this.vx,this.vz);d&&A>.15&&(this.heading=sy(this.heading,Math.atan2(c,h),s.turnSpeed*(this.grounded?1:.3),t));let b=this.heading-w;for(;b>Math.PI;)b-=Math.PI*2;for(;b<-Math.PI;)b+=Math.PI*2;this.turn=Kc(this.turn,t>0?b/t*.3:0,8,t),this.accel=Kc(this.accel,t>0?(A-M)/t:0,6,t),this.jumpBuffer=e.jump?.15:Math.max(0,this.jumpBuffer-t),this.coyote=this.grounded?.12:Math.max(0,this.coyote-t),this.jumpBuffer>0&&this.coyote>0&&(this.vy=s.jumpVel,this.grounded=!1,this.jumpBuffer=0,this.coyote=0),this.vy-=s.gravity*t;let v=this.x+this.vx*t,I=this.z+this.vz*t,D=this.world.resolveCircle(v,I,s.radius,this.y,this.y+s.height,.4);if(D.hit){let z=this.vx*D.nx+this.vz*D.nz;z<0&&(this.vx-=z*D.nx,this.vz-=z*D.nz)}this.x=D.x,this.z=D.z;let U=this.y+this.vy*t,O=this.world.groundAt(this.x,this.z,s.radius*.7,this.y),H=this.grounded;U<=O?(!H&&this.vy<-3&&this.model.land((-this.vy-3)/6),U=O,this.vy=0,this.grounded=!0):this.grounded&&U-O<.45&&this.vy<=0?(U=Kc(U,O,25,t),this.vy=0,U-O<.02&&(U=O)):this.grounded=!1,this.y=U,this.speed=Math.hypot(this.vx,this.vz),this.model.update(t,{speed:this.speed,grounded:this.grounded,vy:this.vy,mode:"foot",turn:this.turn,accel:this.accel}),this.sync()}sync(){this.model.root.position.set(this.x,this.y,this.z),this.model.root.rotation.y=this.heading}};var Sn=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function sa(i){for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i}var ra=class{constructor(t,e,n){this.cam=t,this.world=e,this.settings=n,this.yaw=Math.PI,this.pitch=.25,this.carYawOffset=0,this.carPitch=.22,this.target=new P,this.smoothTarget=new P,this.curDist=4,this.footDist=4.2,this.carDist=7.5,this.idleMouse=10,this.mode="foot",this.fovBase=68,this.initialized=!1}onMouse(t,e){let n=this.settings.sensitivity*.0022,s=this.settings.invertY?-1:1;this.mode==="car"?(this.carYawOffset=sa(this.carYawOffset-t*n),this.carPitch=We.clamp(this.carPitch+e*n*s,-.15,1)):(this.yaw=sa(this.yaw-t*n),this.pitch=We.clamp(this.pitch+e*n*s,-.75,1.25)),Math.abs(t)+Math.abs(e)>.5&&(this.idleMouse=0)}onWheel(t){this.mode==="car"?this.carDist=We.clamp(this.carDist+t*.006,4.5,14):this.footDist=We.clamp(this.footDist+t*.004,1.6,9)}setMode(t,e=0){t!==this.mode&&(t==="car"?(this.carYawOffset=0,this.carPitch=.22,this.smoothCarHeading=this.yaw-Math.PI,this.smoothReverse=0):this.yaw=sa(this.yaw),this.mode=t,this.idleMouse=0)}update(t,e,n){this.initialized||(this.smoothTarget.copy(e),this.initialized=!0),this.idleMouse+=t;let s,r,o;if(this.mode==="car"){this.settings.autoFollow&&this.idleMouse>1.6&&Math.abs(n.speed)>1.5&&(this.carYawOffset=Sn(this.carYawOffset,0,2.2,t),this.carPitch=Sn(this.carPitch,.22,2.2,t));let v=n.speed<-2?Math.PI:0;this.smoothCarHeading=this.smoothCarHeading===void 0?n.heading:this.smoothCarHeading+sa(n.heading-this.smoothCarHeading)*(1-Math.exp(-6*t)),this.smoothReverse=Sn(this.smoothReverse||0,v,3,t),s=this.smoothCarHeading+Math.PI+this.carYawOffset+this.smoothReverse,this.yaw=s,r=this.carPitch,o=this.carDist,this.smoothTarget.x=Sn(this.smoothTarget.x,e.x,18,t),this.smoothTarget.z=Sn(this.smoothTarget.z,e.z,18,t),this.smoothTarget.y=Sn(this.smoothTarget.y,e.y,8,t);let I=this.fovBase+Math.min(14,Math.abs(n.speed)*.35);Math.abs(this.cam.fov-I)>.05&&(this.cam.fov=Sn(this.cam.fov,I,3,t),this.cam.updateProjectionMatrix())}else s=this.yaw,r=this.pitch,o=this.footDist,this.smoothTarget.x=Sn(this.smoothTarget.x,e.x,16,t),this.smoothTarget.z=Sn(this.smoothTarget.z,e.z,16,t),this.smoothTarget.y=Sn(this.smoothTarget.y,e.y,9,t),Math.abs(this.cam.fov-this.fovBase)>.05&&(this.cam.fov=Sn(this.cam.fov,this.fovBase,4,t),this.cam.updateProjectionMatrix());let a=Math.cos(r),l=Math.sin(r),c=Math.sin(s)*a,h=l,u=Math.cos(s)*a,d=this.smoothTarget,f=this.mode==="foot"?.35*Math.min(1,this.curDist/3):0;if(f>0){this.world.rayIgnore=null;let v=this.world.raycast(d.x,d.y,d.z,Math.cos(s),0,-Math.sin(s),f+.25);f=Math.max(0,Math.min(f,v-.25))}let g=Math.cos(s)*f,x=-Math.sin(s)*f,m=d.x+g,p=d.y,M=d.z+x;this.world.rayIgnore=n||null;let y=this.world.raycast(m,p,M,c,h,u,o+.3),_=Math.max(.5,y-.3),R=Math.min(o,_);this.curDist=R<this.curDist?R:Sn(this.curDist,R,4,t);let T=m+c*this.curDist,w=p+h*this.curDist,A=M+u*this.curDist,b=this.world.groundFn(T,A)+.25;w<b&&(w=b),this.cam.position.set(T,w,A),this.cam.lookAt(m,p+(this.mode==="car"?.4:.05),M)}get moveYaw(){return this.yaw}};var Ud=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));function ry(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}var Ti=class{constructor(t,e,n,s={}){if(this.world=e,this.model=new Us(n),t.add(this.model.root),this.name=s.name||"Pedestre",this.role=s.role||"ped",this.lines=s.lines||[],this.behavior=s.behavior||"stand",this.x=s.x||0,this.z=s.z||0,this.heading=s.heading||0,this.homeHeading=this.heading,this.homeX=this.x,this.homeZ=this.z,this.y=e.groundAt(this.x,this.z,.3,5),this.speed=0,this.vx=0,this.vz=0,this.r=.32,this.collidable=!0,this.talking=!1,this.dodge=0,this.dodgeX=0,this.dodgeZ=0,this.wait=0,this.lineIdx=0,this.behavior==="loop"){this.loop=s.loop,this.s=tt()*this.loop.half*8,this.dir=tt()<.5?1:-1,this.walk=Z(1.05,1.5),this.lat=Z(-.9,.3);let r=this.loopPos(this.s);this.x=r[0],this.z=r[1]}this.behavior==="patrol"&&(this.walk=1.1,this.patrolT=tt()*10),this.stuck=0,this.animSkip=0,this.visibleDist=!0,this.sync()}loopPos(t){let e=this.loop.half+this.lat,n=e*2,s=n*4;t=(t%s+s)%s;let{cx:r,cz:o}=this.loop;return t<n?[r-e+t,o-e,0]:t<2*n?[r+e,o-e+(t-n),1]:t<3*n?[r+e-(t-2*n),o+e,2]:[r-e,o+e-(t-3*n),3]}pushCircleOut(t,e,n,s,r,o){if(o||!this.collidable||!this.model.root.visible)return null;let a=t-this.x,l=e-this.z,c=Math.hypot(a,l),h=n+this.r;if(c>=h||c<1e-5)return null;let u=a/c,d=l/c;return{x:this.x+u*h,z:this.z+d*h,nx:u,nz:d}}reactToCar(t,e){if(!t)return;let n=this.x-t.x,s=this.z-t.z;if(n*n+s*s>100)return;let o=Math.abs(t.speed);if(o>2.5&&this.dodge<=0){let[l,c]=t.forward,h=(n*l+s*c)*Math.sign(t.speed),u=n*-c+s*l;if(h>0&&h<3+o*.6&&Math.abs(u)<2.4){let d=u>=0?1:-1;this.dodge=.7,this.dodgeX=-c*d*5,this.dodgeZ=l*d*5}}let a=t.pushCircleOut(this.x,this.z,this.r,this.y,this.y+1.7);a&&(this.x=a.x,this.z=a.z)}update(t,e){let{player:n}=e,s=n.x-this.x,r=n.z-this.z,o=Math.hypot(s,r),a=0,l=this.heading;if(this.dodge>0){this.dodge-=t;let h=this.x+this.dodgeX*t,u=this.z+this.dodgeZ*t,d=this.world.resolveCircle(h,u,this.r,this.y,this.y+1.7,.4,this);this.x=d.x,this.z=d.z,a=5,l=Math.atan2(this.dodgeX,this.dodgeZ)}else if(this.talking)l=Math.atan2(s,r);else if(this.behavior==="loop")if(this.wait>0)this.wait-=t;else{let[h,u]=this.loopPos(this.s+this.dir*1.2);if(!(Math.hypot(n.x-h,n.z-u)<.9&&n.mode==="foot")){let f=this.s+this.dir*this.walk*t,[g,x]=this.loopPos(f),m=this.world.resolveCircle(g,x,this.r,this.y,this.y+1.7,.4,this),p=Math.hypot(m.x-this.x,m.z-this.z);m.hit&&p<this.walk*t*.3?this.stuck+=t:this.stuck=0,this.stuck>1.2&&(this.dir*=-1,this.stuck=0),l=Math.atan2(g-this.x,x-this.z),this.x=m.x,this.z=m.z,this.s=f,a=this.walk,tt()<t*.04&&(this.wait=Z(2,5))}}else if(this.behavior==="patrol"){this.patrolT+=t;let h=this.homeX+Math.sin(this.patrolT*.12)*6,u=this.homeZ,d=h-this.x,f=u-this.z,g=Math.hypot(d,f);g>.3&&(a=Math.min(this.walk,g),l=Math.atan2(d,f),this.x+=d/g*a*t,this.z+=f/g*a*t)}else l=o<4?Math.atan2(s,r):this.homeHeading;this.heading=ry(this.heading,l,7,t),this.speed=Ud(this.speed,a,8,t),this.y=Ud(this.y,this.world.groundAt(this.x,this.z,.2,this.y),20,t),this.animSkip+=t;let c=o>45?.1:0;this.animSkip>=c&&(this.model.update(this.animSkip,{speed:this.speed,grounded:!0,mode:"foot",talk:this.talking}),this.animSkip=0),this.sync()}nextLine(){if(!this.lines.length)return null;let t=this.lines[this.lineIdx%this.lines.length];return this.lineIdx++,t}sync(){this.model.root.position.set(this.x,this.y,this.z),this.model.root.rotation.y=this.heading}};var Yi={ethan:{name:"Ethan",look:{skin:13671028,hair:2759698,shirt:4871520,jacket:4866104,pants:3424862,shoes:3811870,hairStyle:"short",height:1,build:1}},ryan:{name:"Ryan Cole",look:{skin:11565142,hair:1577484,shirt:15262422,jacket:5913382,pants:2040880,shoes:1315860,hairStyle:"short",beard:!0,height:1.03,build:1.08},dialogue:["Ethan! At\xE9 que enfim voc\xEA apareceu.","Depois do que aconteceu ontem \xE0 noite, a cidade n\xE3o \xE9 mais a mesma. Tem algu\xE9m nos observando.","Preciso que voc\xEA v\xE1 at\xE9 a Delegacia de Los Valles e descubra o que a pol\xEDcia sabe.","Pegue seu carro, est\xE1 na garagem. E Ethan... tome cuidado. Nem todos aqui s\xE3o o que parecem."]},delegado:{name:"Delegado Morales",look:{skin:11039055,hair:5921370,shirt:2768234,pants:1844792,shoes:1118481,hat:"police",badge:!0,hairStyle:"short",height:1,build:1.12,longSleeve:!0},dialogue:["Voc\xEA \xE9 o Ethan, n\xE3o \xE9? O Ryan disse que voc\xEA viria.","N\xE3o posso falar muito aqui. As paredes t\xEAm ouvidos.","Volte mais tarde. Por enquanto, conhe\xE7a a cidade... e mantenha os olhos abertos."]}},Nd=[15845029,14724230,13011556,11039055,9067068,6175526,14263682],Od=[1709072,2825492,4861984,8018480,11569232,6316128,1710618],oy=[12073530,3828408,3836506,14737632,2763306,14196784,8014496,4885146,12610186,9071178],ay=[2899536,1842204,4866096,3820138,5921370,6967360,2767402];function Qc(){let i=tt()<.5;return{skin:Wt(Nd),hair:Wt(Od),shirt:Wt(oy),pants:Wt(ay),shoes:Wt([1710618,4861984,14737632,3816026]),jacket:tt()<.3?Wt([2763306,4864554,2767450,6957610]):null,hairStyle:i?Wt(["long","bun","long"]):Wt(["short","short","bald"]),beard:!i&&tt()<.25,hat:tt()<.1?"cap":null,hatColor:Wt([11149858,2245802,2236962]),height:i?Z(.92,.99):Z(.97,1.06),build:i?Z(.88,.95):Z(.95,1.12),longSleeve:tt()<.4}}function Bd(){return{...Qc(),shirt:Wt([12597547,2388387,1999945,14059792]),jacket:null,tie:tt()<.3?2236962:null,longSleeve:!0}}function Fd(){return{skin:Wt(Nd),hair:Wt(Od),shirt:2768234,pants:1844792,shoes:1118481,hat:"police",badge:!0,hairStyle:"short",height:Z(.98,1.05),build:Z(1,1.12),longSleeve:!0}}var jc=["Bem-vindo! Posso ajudar em alguma coisa?","Fique \xE0 vontade para dar uma olhada.","Est\xE1 tudo t\xE3o estranho na cidade ultimamente...","Fechamos \xE0s dez. Depois disso, ningu\xE9m anda por a\xED.","Voc\xEA n\xE3o \xE9 daqui do bairro, \xE9?"],zd=["Boa noite.","Com licen\xE7a.","Hm?","N\xE3o tenho tempo agora.","Cuidado por onde anda.","Dizem que algo estranho acontece na pra\xE7a \xE0 noite..."],kd=["Circulando, cidad\xE3o.","Tudo certo por aqui?","N\xE3o v\xE1 dirigir em alta velocidade, hein."];var Ns=[[0,1],[1,0],[0,-1],[-1,0]],ly=["NS","EW","NS","EW"],cy=26,oa=class{constructor(){this.t=0}state(t){let e=this.t%cy;return t==="NS"?e<10?"G":e<12.5?"Y":"R":e>=13&&e<23?"G":e>=23&&e<25.5?"Y":"R"}update(t){this.t+=t;let e=Ds(),n=e.tlOff,s=[16722458,16757274,2817898];for(let r of["NS","EW"]){let o=this.state(r),a=o==="R"?0:o==="Y"?1:2;e.tl[r].forEach((l,c)=>l.color.setHex(c===a?s[c]:n[c]))}}},th=class{constructor(t,e,n,s){this.car=t,this.a=e,this.b=n,this.d=s,this.next=this.chooseNext(),this.cruise=9+tt()*4,this.honk=0;let[r,o]=Ns[s],[a,l]=[-o,r],c=8+tt()*40;t.place(ye(e)+r*c+a*Sr,ye(n)+o*c+l*Sr,Math.atan2(r,o)),t.driver="ai"}validDir(t,e,n){let[s,r]=Ns[n],o=t+s,a=e+r;return o>=0&&o<=ce&&a>=0&&a<=ce}chooseNext(){let[t,e]=Ns[this.d],n=this.a+t,s=this.b+e,r=[];for(let[o,a]of[[this.d,3],[(this.d+1)%4,1],[(this.d+3)%4,1]])if(this.validDir(n,s,o))for(let l=0;l<a;l++)r.push(o);return r.length||r.push((this.d+2)%4),Wt(r)}lane(t,e,n){let[s,r]=Ns[n];return{ox:ye(t)+-r*Sr,oz:ye(e)+s*Sr,fx:s,fz:r}}update(t,e){let n=this.car,s=this.lane(this.a,this.b,this.d),r=(n.x-s.ox)*s.fx+(n.z-s.oz)*s.fz;if(r>gn-Xe/2-.5){let[O,H]=Ns[this.d];this.a+=O,this.b+=H,this.d=this.next,this.next=this.chooseNext(),s=this.lane(this.a,this.b,this.d),r=(n.x-s.ox)*s.fx+(n.z-s.oz)*s.fz}let o=this.next!==this.d,a=4.5+Math.abs(n.speed)*.45,l=Math.max(r,-6)+a,c=s.ox+s.fx*l,h=s.oz+s.fz*l,u=Math.sin(n.heading),d=Math.cos(n.heading),f=c-n.x,g=h-n.z,x=f*u+g*d,m=f*d-g*u,p=Math.max(4,m*m+x*x),M=Math.atan(2*n.T.wheelBase*m/p),y=.62/(1+Math.abs(n.speed)*.07),_=Math.max(-1,Math.min(1,M/y)),R=this.cruise,T=gn-Xe/2-r;o&&T<18&&(R=Math.min(R,5.5)),r<0&&(R=Math.min(R,6));let A=gn-Xe/2-3.8-n.T.L/2-r,b=e.lights.state(ly[this.d]);b!=="G"&&A>-.5&&A<35&&(b==="Y"&&A<5||(R=Math.min(R,Math.sqrt(2*3.5*Math.max(0,A-.3)))));let v=!1,I=(O,H,z,j)=>{let G=O-n.x,ot=H-n.z;if(G*G+ot*ot>900)return;let dt=G*u+ot*d,it=G*d-ot*u;if(dt>0&&dt<26&&Math.abs(it-_*dt*.08)<j){let At=dt-n.T.L/2-z;return R=Math.min(R,Math.max(0,At-2.2)*.8),!0}return!1};for(let O of e.cars)O!==n&&I(O.x,O.z,O.T.L/2,1.9);e.player.mode==="foot"&&(v=I(e.player.x,e.player.z,.3,1.6));for(let O of e.npcs)O.dodge>0&&I(O.x,O.z,.3,1.5);v&&n.speed<.5?this.honk+=t:this.honk=0;let D=R-n.speed,U={throttle:Math.max(0,Math.min(1,D*.45)),brake:Math.max(0,Math.min(1,-D*.7)),steer:_,handbrake:0};R<.3&&n.speed<.6&&(U.brake=1,U.throttle=0),n.update(t,U,e.cars)}};function Hd(i,t,e){let n=[],s=0;for(;n.length<i&&s++<400;){let r=Math.floor(tt()*(ce+1)),o=Math.floor(tt()*(ce+1)),a=Math.floor(tt()*4),[l,c]=Ns[a];if(r+l<0||r+l>ce||o+c<0||o+c>ce)continue;let h=ye(r)+l*gn/2,u=ye(o)+c*gn/2;if(Math.hypot(h-e.x,u-e.z)<40||n.some(f=>f.a===r&&f.b===o&&f.d===a))continue;let d=t(Wt(["sedan","hatch","suv","pickup","taxi","sedan","police"]));n.push(new th(d,r,o,a))}return n}var eh={dia:{cloud:16777215,cloudShade:10135224,cover:.42,label:"Dia",top:4161488,horizon:12375790,bottom:9085104,sun:[.35,.8,.45],sunColor:16774109,sunI:2.8,hemiSky:12572927,hemiGround:6971472,hemiI:1.4,fog:12177376,fogD:.0032,night:0,exposure:1},entardecer:{cloud:16758928,cloudShade:5914712,cover:.5,label:"Entardecer",top:2767466,horizon:15768154,bottom:5917264,sun:[-.7,.16,.45],sunColor:16758904,sunI:2.6,hemiSky:11055320,hemiGround:6969416,hemiI:1.45,fog:11571328,fogD:.0036,night:.5,exposure:1.15},noite:{cloud:3817560,cloudShade:790038,cover:.45,label:"Noite",top:329746,horizon:1713216,bottom:658452,sun:[.3,.6,-.5],sunColor:9085144,sunI:.6,hemiSky:4214922,hemiGround:2761760,hemiI:.8,fog:1449004,fogD:.0055,night:1,exposure:1.25}},aa=class{constructor(t,e,n=340){this.far=n,this.scene=t,this.renderer=e,this.uniforms={top:{value:new Ot},horizon:{value:new Ot},bottom:{value:new Ot},sunDir:{value:new P},sunCol:{value:new Ot},cloudCol:{value:new Ot},cloudShade:{value:new Ot},cover:{value:.5},time:{value:0}};let s=new Mn({uniforms:this.uniforms,side:tn,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; uniform vec3 sunDir; uniform vec3 sunCol; uniform vec3 cloudCol; uniform vec3 cloudShade; uniform float cover; uniform float time; varying vec3 vP;
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
          gl_FragColor = vec4(c, 1.0); }`});this.dome=new de(new dn(1,24,12),s),this.dome.frustumCulled=!1,this.dome.renderOrder=-1,this.dome.scale.setScalar(n*.92),t.add(this.dome);let r=new Ee,o=[];for(let c=0;c<900;c++){let h=new P().randomDirection();h.y<.05&&(h.y=Math.abs(h.y)+.05),h.normalize().multiplyScalar(n*.88),o.push(h.x,h.y,h.z)}r.setAttribute("position",new ne(o,3)),this.stars=new As(r,new Hi({color:16777215,size:1.6,sizeAttenuation:!1,fog:!1,transparent:!0,opacity:0})),this.stars.frustumCulled=!1,t.add(this.stars),this.hemi=new Fo(16777215,4473924,1),t.add(this.hemi),this.sun=new Ho(16777215,2),t.add(this.sun,this.sun.target),t.fog=new Eo(8947848,.004),this.sunDir=new P,this.night=0,this.envScene=new Ts;let a=new de(this.dome.geometry,s);a.scale.setScalar(50);let l=new de(new No(60,16).rotateX(-Math.PI/2),new Ge({color:4210752}));l.position.y=-3,this.envGround=l,this.envScene.add(a,l),this.cubeCam=new sr(.5,200,Nn)}updateEnv(){this.envGround.material.color.copy(this.hemi.groundColor).multiplyScalar(.6*this.hemi.intensity),this.cubeCam.update(this.renderer,this.envScene)}tick(t){this.uniforms.time.value+=t}setShadows(t,e,n){if(this.sun.castShadow=t,t){this.sun.shadow.mapSize.set(e,e);let s=this.sun.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.near=1,s.far=400,s.updateProjectionMatrix(),this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.04,this.sun.shadow.radius=2.5,this.extent=n,this.size=e}}apply(t){let e=eh[t];this.current=t,this.uniforms.top.value.setHex(e.top),this.uniforms.horizon.value.setHex(e.horizon),this.uniforms.bottom.value.setHex(e.bottom),this.sunDir.set(...e.sun).normalize(),this.uniforms.sunDir.value.copy(this.sunDir),this.uniforms.sunCol.value.setHex(e.sunColor).multiplyScalar(e.night>.9?.6:1),this.uniforms.cloudCol.value.setHex(e.cloud),this.uniforms.cloudShade.value.setHex(e.cloudShade),this.uniforms.cover.value=e.cover,this.sun.color.setHex(e.sunColor),this.sun.intensity=e.sunI,this.hemi.color.setHex(e.hemiSky),this.hemi.groundColor.setHex(e.hemiGround),this.hemi.intensity=e.hemiI,this.scene.fog.color.setHex(e.fog),this.scene.fog.density=e.fogD,this.renderer.toneMappingExposure=e.exposure,this.stars.material.opacity=e.night>.9?.9:e.night>.4?.2:0,this.night=e.night;for(let n of jo){let s=n.base+(n.night-n.base)*e.night;n.opacity?n.mat.opacity=s:n.mat.emissiveIntensity=s}Ld(e.night>.4),this.updateEnv()}follow(t,e){this.dome.position.set(t,0,e),this.stars.position.set(t,0,e);let n=t,s=e;if(this.sun.castShadow){let r=this.extent*2/this.size;n=Math.round(t/r)*r,s=Math.round(e/r)*r}this.sun.target.position.set(n,0,s),this.sun.position.set(n+this.sunDir.x*150,this.sunDir.y*150,s+this.sunDir.z*150)}};var la=class{constructor(){this.ctx=null,this.enabled=!0}init(){if(!this.ctx)try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.gain=this.ctx.createGain(),this.gain.gain.value=0,this.filter=this.ctx.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=600,this.o1=this.ctx.createOscillator(),this.o1.type="sawtooth",this.o2=this.ctx.createOscillator(),this.o2.type="square";let e=this.ctx.createGain();e.gain.value=.35,this.o1.connect(this.filter),this.o2.connect(e),e.connect(this.filter),this.filter.connect(this.gain),this.gain.connect(this.ctx.destination),this.o1.start(),this.o2.start()}catch{this.ctx=null}}update(t,e,n){if(!this.ctx)return;let s=this.ctx.currentTime,r=Math.min(4,Math.floor(Math.abs(e)/9)),o=.25+(Math.abs(e)-r*9)/9*.6+n*.15,a=38+o*70+r*6;this.o1.frequency.setTargetAtTime(a,s,.05),this.o2.frequency.setTargetAtTime(a*.5,s,.05),this.filter.frequency.setTargetAtTime(400+n*900+o*400,s,.08),this.gain.gain.setTargetAtTime(t&&this.enabled?.05+n*.05:0,s,.15)}};var Vd={sensitivity:1,invertY:!1,quality:"media",autoFollow:!0,fov:68,showFps:!0,time:"entardecer",sound:!0,adaptive:!0};function hy(){try{return{...Vd,...JSON.parse(localStorage.getItem("entreSombras.settings")||"{}")}}catch{return{...Vd}}}function Xn(){try{localStorage.setItem("entreSombras.settings",JSON.stringify(jt))}catch{}}var jt=hy(),Gd={baixa:{label:"Baixa",pr:.75,aa:!1,shadows:!1,size:512,extent:40,peds:28,traffic:8,far:260,lamps:0,soft:!1},media:{label:"M\xE9dia",pr:1,aa:!1,shadows:!0,size:2048,extent:42,peds:45,traffic:12,far:340,lamps:4,soft:!1},alta:{label:"Alta",pr:Math.min(window.devicePixelRatio||1,1.5),aa:!0,shadows:!0,size:2048,extent:60,peds:60,traffic:16,far:420,lamps:8,soft:!0}},ze=Gd[jt.quality]||Gd.media,Lt=i=>document.getElementById(i),$d=i=>{let t=Lt("loading-text");t&&(t.textContent=i)},Ie=new wo({antialias:ze.aa,powerPreference:"high-performance"});Ie.setPixelRatio(ze.pr);Ie.setSize(window.innerWidth,window.innerHeight);Ie.outputColorSpace=Qe;Ie.toneMapping=Sc;Ie.shadowMap.enabled=ze.shadows;Ie.shadowMap.type=ze.soft?bc:Go;var da="";try{let i=Ie.getContext(),t=i.getExtension("WEBGL_debug_renderer_info");da=t?i.getParameter(t.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER)}catch{da=""}var Zi=ze.pr;Lt("game").appendChild(Ie.domElement);var qe=new Ts,Os=new Ye(jt.fov,window.innerWidth/window.innerHeight,.1,ze.far);window.addEventListener("resize",()=>{Os.aspect=window.innerWidth/window.innerHeight,Os.updateProjectionMatrix(),Ie.setSize(window.innerWidth,window.innerHeight)});var X={};window.game=X;function uy(){let i=performance.now(),t=new $o,e=new aa(qe,Ie,ze.far);e.setShadows(ze.shadows,ze.size,ze.extent);let n=new ta(qe,t);n.build(),Ko(777);let s=[],r=[],o=(w,A)=>{let b=new na(w,A!=null?A:Wt(Id),t);return qe.add(b.group),t.dynamic.add(b),s.push(b),b};for(let w of n.parkedCars){let A=o(w.type);A.place(w.x,w.z,w.heading),A.parked=!0}let a=n.ethanHouse,l=o("sedan",1916786);l.place(a.driveway[0],a.driveway[1],a.heading+Math.PI),l.owner="Ethan";let c=new ia(qe,t,Yi.ethan.look);c.place(a.door[0],a.door[1]+3.5,0),r.push(...Hd(ze.traffic,w=>o(w),c));let h=[],u=new Ti(qe,t,Yi.ryan.look,{name:"Ryan Cole",role:"story",lines:Yi.ryan.dialogue,x:a.door[0]-1.5,z:a.door[1]+8.5,heading:Math.PI});u.story="ryan",h.push(u);for(let w of n.shopkeepers)h.push(new Ti(qe,t,Bd(),{name:"Atendente \u2014 "+w.shop,role:"shop",lines:[Wt(jc),Wt(jc)],x:w.x,z:w.z,heading:w.heading}));for(let w of n.npcs)w.kind==="police"&&h.push(new Ti(qe,t,Fd(),{name:"Policial",role:"police",lines:kd,x:w.x,z:w.z,behavior:"patrol"}));let d=new Ti(qe,t,Yi.delegado.look,{name:Yi.delegado.name,role:"story",lines:Yi.delegado.dialogue,x:n.policeSpot.x,z:n.policeSpot.z,heading:0});d.story="delegado",h.push(d);let f=n.pedLoops;for(let w=0;w<ze.peds;w++){let A=f[w%f.length===0?Math.floor(tt()*f.length):Math.floor(tt()*f.length)];h.push(new Ti(qe,t,Qc(),{name:"Pedestre",role:"ped",lines:[Wt(zd)],behavior:"loop",loop:A}))}for(let w of h)t.dynamic.add(w);let g=new oa,x=new ra(Os,t,jt);x.yaw=Math.PI,x.pitch=.22;let m=new zo(16773840,0,45,.55,.5,1.2);qe.add(m,m.target);let p=[];for(let w=0;w<ze.lamps;w++){let A=new ko(16763274,0,26,2);qe.add(A),p.push(A)}let M=new Float32Array(n.lamps.length*3);n.lamps.forEach((w,A)=>M.set(w,A*3));let y=new Ee;y.setAttribute("position",new Re(M,3));let _=new As(y,new Hi({map:yd(),size:3.2,sizeAttenuation:!0,transparent:!0,depthWrite:!1,blending:_s,color:16767392,opacity:0}));_.frustumCulled=!1,qe.add(_);let R=new Vn(1,1).rotateX(-Math.PI/2),T=new wi(R,new Ge({map:xd(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}),h.length+s.length+1);T.frustumCulled=!1,T.renderOrder=1,qe.add(T),Object.assign(X,{world:t,sky:e,city:n,cars:s,drivers:r,player:c,npcs:h,ryan:u,delegado:d,lights:g,cam:x,ethanCar:l,headlight:m,settings:jt,Q:ze,renderer:Ie,scene:qe,camera:Os,lampLights:p,glow:_,blobs:T}),X.audio=new la,X.objective=0,X.buildMs=performance.now()-i,e.apply(jt.time),gy()}var Tr=new Set,pa=new Set,rh=!1,qn=!1,Bs=!1;window.addEventListener("keydown",i=>{["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(i.code)&&i.preventDefault(),Tr.has(i.code)||pa.add(i.code),Tr.add(i.code)});window.addEventListener("keyup",i=>Tr.delete(i.code));window.addEventListener("blur",()=>Tr.clear());document.addEventListener("mousemove",i=>{rh&&!Bs&&X.cam&&X.cam.onMouse(i.movementX||0,i.movementY||0)});document.addEventListener("wheel",i=>{X.cam&&qn&&!Bs&&X.cam.onWheel(i.deltaY)},{passive:!0});document.addEventListener("pointerlockchange",()=>{rh=document.pointerLockElement===Ie.domElement,!rh&&qn&&!X.dialog&&ah(!0)});Ie.domElement.addEventListener("click",()=>{qn&&!Bs&&oh(),X.dialog&&lh()});function oh(){try{let i=Ie.domElement.requestPointerLock();i&&i.catch&&i.catch(()=>{})}catch{}}var Wn=(...i)=>i.some(t=>Tr.has(t)),Ai=(...i)=>i.some(t=>pa.has(t));function ah(i){Bs=i,Lt("pause").style.display=i?"flex":"none",i&&dy()}function dy(){Lt("opt-sens").value=jt.sensitivity,Lt("opt-sens-v").textContent=jt.sensitivity.toFixed(2),Lt("opt-invert").checked=jt.invertY,Lt("opt-follow").checked=jt.autoFollow,Lt("opt-fov").value=jt.fov,Lt("opt-fov-v").textContent=jt.fov,Lt("opt-quality").value=jt.quality,Lt("opt-fps").checked=jt.showFps,Lt("opt-time").value=jt.time,Lt("opt-sound").checked=jt.sound,Lt("opt-adaptive").checked=jt.adaptive,Lt("gpu-info").textContent=(da?"Placa de v\xEDdeo: "+da.replace(/ANGLE \(|\)$/g,""):"")+" \xB7 resolu\xE7\xE3o "+Math.round(Zi*100)+"%",Lt("opt-dist").value=X.cam?X.cam.footDist:4.2,Lt("opt-dist-v").textContent=(X.cam?X.cam.footDist:4.2).toFixed(1)}function fy(){Lt("opt-sens").oninput=i=>{jt.sensitivity=+i.target.value,Lt("opt-sens-v").textContent=jt.sensitivity.toFixed(2),Xn()},Lt("opt-invert").onchange=i=>{jt.invertY=i.target.checked,Xn()},Lt("opt-follow").onchange=i=>{jt.autoFollow=i.target.checked,Xn()},Lt("opt-fov").oninput=i=>{jt.fov=+i.target.value,Lt("opt-fov-v").textContent=jt.fov,X.cam.fovBase=jt.fov,Xn()},Lt("opt-dist").oninput=i=>{X.cam.footDist=+i.target.value,Lt("opt-dist-v").textContent=X.cam.footDist.toFixed(1)},Lt("opt-fps").onchange=i=>{jt.showFps=i.target.checked,Xn()},Lt("opt-adaptive").onchange=i=>{jt.adaptive=i.target.checked,Xn(),jt.adaptive||(Zi=ze.pr,Ie.setPixelRatio(Zi),Ie.setSize(window.innerWidth,window.innerHeight))},Lt("opt-sound").onchange=i=>{jt.sound=i.target.checked,X.audio.enabled=jt.sound,Xn()},Lt("opt-time").onchange=i=>{jt.time=i.target.value,X.sky.apply(jt.time),Xn()},Lt("opt-quality").onchange=i=>{jt.quality=i.target.value,Xn(),Lt("quality-note").textContent="A qualidade ser\xE1 aplicada ao reiniciar. Recarregando...",setTimeout(()=>location.reload(),600)},Lt("btn-resume").onclick=()=>{ah(!1),oh()},Lt("btn-play").onclick=Jd}function Jd(){qn||(qn=!0,Lt("title").style.display="none",Lt("hud").style.display="block",X.audio.init(),X.audio.enabled=jt.sound,oh(),fa(0))}var py=["Fale com Ryan Cole na frente da sua casa","V\xE1 at\xE9 a Delegacia de Los Valles (use seu carro azul na garagem)","Fale com o Delegado Morales na entrada da delegacia","Explore Los Valles livremente"];function fa(i){X.objective=i,Lt("objective").textContent="OBJETIVO: "+py[i],Ar(i===0?"Bem-vindo a Los Valles":"Novo objetivo")}var ua=0;function Ar(i){Lt("toast").textContent=i,Lt("toast").style.opacity=1,ua=3}function Kd(i){let t=i.story?i.lines[0]:i.nextLine();X.dialog={npc:i,idx:0,story:!!i.story,lines:i.story?i.lines:[t]},i.talking=!0,Lt("dialog").style.display="block",Lt("dialog-name").textContent=i.name,Lt("dialog-text").textContent=X.dialog.lines[0]}function lh(){let i=X.dialog;if(i){if(i.idx++,i.idx>=i.lines.length){i.npc.talking=!1,X.dialog=null,Lt("dialog").style.display="none",i.npc.story==="ryan"&&X.objective===0&&fa(1),i.npc.story==="delegado"&&X.objective<=2&&X.objective>=1&&fa(3);return}Lt("dialog-text").textContent=i.lines[i.idx]}}function Qd(){let i=X.player,t=null,e=3.4;for(let n of X.cars)for(let s of[1,-1]){let[r,o]=n.doorPos(s),a=Math.hypot(i.x-r,i.z-o);a<e&&(e=a,t=n)}return t}function jd(i){if(i.driver==="ai"){Ar("Este carro est\xE1 ocupado");return}let t=X.player;t.mode="car",X.car=i,i.driver="player",i.parked=!1,qe.remove(t.model.root),i.body.add(t.model.root),t.model.root.position.copy(i.seat),t.model.root.rotation.set(0,0,0),X.cam.setMode("car",i.heading),Ar(i.owner==="Ethan"?"Seu carro":my(i))}var my=i=>i.T.name;function tf(){let i=X.car,t=X.player;if(Math.abs(i.speed)>4){Ar("Diminua a velocidade para sair");return}let e=null;for(let n of[1,-1]){let[s,r]=i.doorPos(n);if(!X.world.resolveCircle(s,r,.33,i.y+.2,i.y+1.8,.4,null).hit){e=[s,r];break}}if(!e){let[n,s]=i.local(0,i.T.L/2+1.2);e=[n,s]}i.body.remove(t.model.root),qe.add(t.model.root),i.driver=null,i.speed*=.3,X.car=null,t.mode="foot",t.place(e[0],e[1],i.heading),t.model.cur&&Object.values(t.model.cur).forEach(n=>n.multiplyScalar(.5)),X.cam.setMode("foot")}var Er;function gy(){let i=Math.ceil(xn*2+120);Er=document.createElement("canvas"),Er.width=i,Er.height=i;let t=Er.getContext("2d");t.fillStyle="#2d4224",t.fillRect(0,0,i,i);let e=i/2,n={res:"#5d7a4a",park:"#3f7a3a",down:"#8a8580",mixed:"#9a9286",shops:"#a8927a",shops2:"#a8927a",police:"#5a6a9a",gas:"#a87a6a",parking:"#6a6a6a",apart:"#8a8070"};t.fillStyle="#3a3a3c",t.fillRect(e-xn,e-xn,xn*2,xn*2);for(let s=0;s<ce;s++)for(let r=0;r<ce;r++)t.fillStyle="#b9b3a6",t.fillRect(e+ci(r)-le/2,e+ci(s)-le/2,le,le),t.fillStyle=n[Yc[s][r]],t.fillRect(e+ci(r)-le/2+4,e+ci(s)-le/2+4,le-8,le-8);t.strokeStyle="#b8a040",t.setLineDash([6,6]),t.lineWidth=.8;for(let s=0;s<=ce;s++)t.beginPath(),t.moveTo(e+ye(s),e-xn),t.lineTo(e+ye(s),e+xn),t.stroke(),t.beginPath(),t.moveTo(e-xn,e+ye(s)),t.lineTo(e+xn,e+ye(s)),t.stroke();X.mmOrigin=e}function xy(){let i=Lt("minimap"),t=i.getContext("2d"),e=i.width,n=i.height,s=X.car||X.player,r=X.mmOrigin,o=X.car?.75:1.2;t.save(),t.clearRect(0,0,e,n),t.beginPath(),t.arc(e/2,n/2,e/2-2,0,Math.PI*2),t.clip(),t.fillStyle="#1a2414",t.fillRect(0,0,e,n),t.translate(e/2,n/2),t.scale(o,o),t.rotate(Math.PI+X.cam.yaw),t.drawImage(Er,-(r+s.x),-(r+s.z));let a=(d,f,g,x)=>{t.fillStyle=g,t.beginPath(),t.arc(d-s.x,f-s.z,x/o,0,Math.PI*2),t.fill()};for(let d of X.drivers)a(d.car.x,d.car.z,"#d0d0d0",2);X.car||a(X.ethanCar.x,X.ethanCar.z,"#3a8aff",4);let l=_y();l&&a(l[0],l[1],"#ffd23a",6),t.restore(),t.save(),t.translate(e/2,n/2);let c=X.car?X.car.heading:X.player.heading;t.rotate(-(c-X.cam.yaw)+Math.PI),t.fillStyle="#ff5a3a",t.beginPath(),t.moveTo(0,-8),t.lineTo(6,7),t.lineTo(0,3),t.lineTo(-6,7),t.closePath(),t.fill(),t.restore(),t.strokeStyle="rgba(255,255,255,0.6)",t.lineWidth=2,t.beginPath(),t.arc(e/2,n/2,e/2-2,0,Math.PI*2),t.stroke(),t.fillStyle="#fff",t.font="bold 12px Arial",t.textAlign="center";let h=-Math.cos(Math.PI+X.cam.yaw)*(e/2-12),u=Math.sin(Math.PI+X.cam.yaw)*(e/2-12);t.fillText("N",e/2-u,n/2+h+4)}function _y(){return X.objective===0?[X.ryan.x,X.ryan.z]:X.objective===1||X.objective===2?[X.delegado.x,X.delegado.z]:null}var yy=new Vo,ca=0,nh=0,ef=0,Wd=new P;function nf(){requestAnimationFrame(nf);let i=Math.min(yy.getDelta(),1/20);X.manual||(ch(i),by(i)),Ie.render(qe,Os),ca+=i,nh++,ca>.5&&(ef=Math.round(nh/ca),ca=0,nh=0),pa.clear()}function ch(i){var a;let t=X.player;X.lights.update(i),Pd(i);let e=qn&&!Bs,n=!!X.dialog;if(e&&Ai("KeyN")){let l=["entardecer","noite","dia"];jt.time=l[(l.indexOf(jt.time)+1)%3],X.sky.apply(jt.time),Xn(),Ar(eh[jt.time].label)}e&&Ai("KeyH")&&(Lt("help").style.display=Lt("help").style.display==="none"?"block":"none"),e&&Ai("KeyP")&&((a=document.exitPointerLock)==null||a.call(document),ah(!0));let s="";if(t.mode==="foot"){let l=null,c=2.4;for(let d of X.npcs){let f=Math.hypot(d.x-t.x,d.z-t.z);f<c&&(c=f,l=d)}let h=Qd();n?s="[E] Continuar":l&&(!h||c<1.8)?(s=`[E] Falar com ${l.name}`,e&&Ai("KeyE","KeyF")&&Kd(l)):h&&(s=h.driver==="ai"?"Carro ocupado":`[E] Entrar no carro${h.owner?" (seu carro)":""}`,e&&Ai("KeyE","KeyF")&&jd(h)),n&&e&&Ai("KeyE","Space","Enter","KeyF")&&lh();let u=e&&!n?{x:(Wn("KeyD","ArrowRight")?1:0)-(Wn("KeyA","ArrowLeft")?1:0),z:(Wn("KeyW","ArrowUp")?1:0)-(Wn("KeyS","ArrowDown")?1:0),run:Wn("ShiftLeft","ShiftRight"),jump:Ai("Space")}:{x:0,z:0,run:!1,jump:!1};X.testInput&&Object.assign(u,X.testInput),t.mode==="foot"&&t.update(i,u,X.cam.yaw)}if(t.mode==="car"){let l=X.car;s=Math.abs(l.speed)>4?"":"[E] Sair do carro";let c=e?{throttle:Wn("KeyW","ArrowUp")?1:0,brake:Wn("KeyS","ArrowDown")?1:0,steer:(Wn("KeyA","ArrowLeft")?1:0)-(Wn("KeyD","ArrowRight")?1:0),handbrake:Wn("Space")?1:0}:{throttle:0,brake:0,steer:0,handbrake:1};X.testCarInput&&(c={...c,...X.testCarInput}),l.update(i,c,X.cars),t.x=l.x,t.z=l.z,t.y=l.y,t.model.update(i,{mode:"sit",steer:l.steer*1.5}),X.audio.update(!0,l.speed,c.throttle),e&&Ai("KeyE","KeyF")&&tf()}else X.audio.update(!1,0,0);let r={lights:X.lights,cars:X.cars,player:t,npcs:X.npcs};for(let l of X.drivers)l.update(i,r);for(let l of X.cars)l.driver===null&&l.awake&&(l.awake=l.updatePassive(i));let o=X.cars.filter(l=>Math.abs(l.speed)>.5&&Math.abs(l.x-t.x)<120&&Math.abs(l.z-t.z)<120);for(let l of X.npcs){let c=Math.hypot(l.x-t.x,l.z-t.z);if(l.model.root.visible=c<95,c<110){l.update(i,{player:t});for(let h of o)l.reactToCar(h,i)}}for(let l of X.cars){let c=Math.abs(l.x-t.x)+Math.abs(l.z-t.z);l.group.visible=c<(l.driver?ze.far*.7:ze.far*.42),l.setLOD(c>45&&l.driver!=="player"&&!l.sirenL)}if(X.objective===1&&Math.hypot(t.x-X.delegado.x,t.z-X.delegado.z)<14&&fa(2),t.mode==="car"?X.cam.update(i,Wd.set(X.car.x,X.car.y+1.25,X.car.z),X.car):X.cam.update(i,Wd.set(t.x,t.y+1.55,t.z),null),X.sky.follow(t.x,t.z),X.sky.tick(i),vy(i,t),My(),X.car&&X.sky.night>.4){let[l,c]=X.car.forward;X.headlight.intensity=60,X.headlight.position.set(X.car.x+l*2.2,X.car.y+.8,X.car.z+c*2.2),X.headlight.target.position.set(X.car.x+l*20,X.car.y-1.5,X.car.z+c*20)}else X.headlight.intensity=0;Lt("prompt").textContent=s,Lt("prompt").style.display=s&&qn?"block":"none",X.car?(Lt("speedo").style.display="block",Lt("speed").textContent=Math.round(X.car.kmh),Lt("gear").textContent=X.car.speed<-.5?"R":X.car.speed>.5?"D":"N"):Lt("speedo").style.display="none",Lt("fps").style.display=jt.showFps&&qn?"block":"none",Lt("fps").textContent=ef+" FPS",ua>0&&(ua-=i,ua<=0&&(Lt("toast").style.opacity=0)),qn&&xy()}var ih=0,Xd=new Ft,qd=new Ve,Yd=new P,Zd=new P;function vy(i,t){let e=X.sky.night;if(X.glow.material.opacity=e>.4?Math.min(1,e)*.9:0,ih-=i,ih<=0&&X.lampLights.length){ih=.35;let n=e>.4,s=X.camera.position.x,r=X.camera.position.z,o=t.x-s,a=t.z-r,l=Math.hypot(o,a)||1,c=X.city.lamps.map(h=>{let u=h[0]-t.x,d=h[2]-t.z;return[Math.hypot(u,d)-Math.max(0,(u*o+d*a)/l)*.4,h]});c.sort((h,u)=>h[0]-u[0]),X.lampLights.forEach((h,u)=>{let d=c[u]&&c[u][1];h.visible=n&&!!d,d&&(h.position.set(d[0],d[1]-.3,d[2]),h.intensity=90*e)})}}function My(){let i=X.blobs,t=0,e=(s,r,o,a,l,c)=>{qd.setFromAxisAngle(Yd.set(0,1,0),c),Zd.set(a,1,l),Xd.compose(Yd.set(s,r+.03,o),qd,Zd),i.setMatrixAt(t++,Xd)},n=X.player;n.mode==="foot"&&e(n.x,X.world.groundFn(n.x,n.z),n.z,1.1,1.1,0);for(let s of X.npcs)s.model.root.visible&&Math.abs(s.x-n.x)+Math.abs(s.z-n.z)<60&&e(s.x,s.y,s.z,1,1,0);for(let s of X.cars)s.group.visible&&Math.abs(s.x-n.x)+Math.abs(s.z-n.z)<90&&e(s.x,s.y,s.z,s.T.W+.9,s.T.L+1,s.heading);i.count=t,i.instanceMatrix.needsUpdate=!0}var ha=0,sh=0;function by(i){if(!jt.adaptive||!qn||Bs||(ha+=i,sh++,ha<2))return;let t=sh/ha;ha=0,sh=0;let e=Zi;t<42&&e>.6?e=Math.max(.6,e-.1):t>57&&e<ze.pr&&(e=Math.min(ze.pr,e+.05)),e!==Zi&&(Zi=e,Ie.setPixelRatio(e),Ie.setSize(window.innerWidth,window.innerHeight))}$d("Gerando Los Valles...");setTimeout(()=>{try{uy(),fy(),Lt("loading").style.display="none",Lt("btn-play").disabled=!1,Lt("btn-play").textContent="JOGAR",X.ready=!0,nf()}catch(i){console.error(i),$d("Erro ao iniciar: "+i.message),X.error=i}},30);X.start=Jd;X.enterCar=i=>jd(i||X.ethanCar);X.exitCar=()=>tf();X.nearestCar=Qd;X.step=ch;X.setPixelRatio=i=>{Zi=i,Ie.setPixelRatio(i),Ie.setSize(window.innerWidth,window.innerHeight)};X.sim=(i,t=60)=>{let e=Math.round(i*t);for(let n=0;n<e;n++)ch(1/t),pa.clear()};X.openDialog=Kd;X.advanceDialog=lh;X.render=()=>Ie.render(qe,Os);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
