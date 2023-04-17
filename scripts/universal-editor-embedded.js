(()=>{var e,t,n,r,o,i,a,s;(t=e||(e={})).Call="call",t.Reply="reply",t.Syn="syn",t.SynAck="synAck",t.Ack="ack",(r=n||(n={})).Fulfilled="fulfilled",r.Rejected="rejected",(i=o||(o={})).ConnectionDestroyed="ConnectionDestroyed",i.ConnectionTimeout="ConnectionTimeout",i.NoIframeSrc="NoIframeSrc",(a||(a={})).DataCloneError="DataCloneError",(s||(s={})).Message="message";const c=({name:e,message:t,stack:n})=>({name:e,message:t,stack:n});var l=(t,r,o)=>{const{localName:i,local:l,remote:u,originForSending:d,originForReceiving:p}=t;let g=!1;const f=t=>{if(t.source!==u||t.data.penpal!==e.Call)return;if("*"!==p&&t.origin!==p)return void o(`${i} received message from origin ${t.origin} which did not match expected origin ${p}`);const s=t.data,{methodName:l,args:f,id:m}=s;o(`${i}: Received ${l}() call`);const h=t=>r=>{if(o(`${i}: Sending ${l}() reply`),g)return void o(`${i}: Unable to send ${l}() reply due to destroyed connection`);const s={penpal:e.Reply,id:m,resolution:t,returnValue:r};t===n.Rejected&&r instanceof Error&&(s.returnValue=c(r),s.returnValueIsError=!0);try{u.postMessage(s,d)}catch(t){if(t.name===a.DataCloneError){const r={penpal:e.Reply,id:m,resolution:n.Rejected,returnValue:c(t),returnValueIsError:!0};u.postMessage(r,d)}throw t}};new Promise((e=>e(r[l].apply(r,f)))).then(h(n.Fulfilled),h(n.Rejected))};return l.addEventListener(s.Message,f),()=>{g=!0,l.removeEventListener(s.Message,f)}};let u=0;const d=e=>e?e.split("."):[],p=(e,t,n)=>{const r=d(t);return r.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===r.length-1&&(e[t]=n),e[t])),e),e},g=(e,t)=>{const n={};return Object.keys(e).forEach((r=>{const o=e[r],i=((e,t)=>{const n=d(t||"");return n.push(e),(e=>e.join("."))(n)})(r,t);"object"==typeof o&&Object.assign(n,g(o,i)),"function"==typeof o&&(n[i]=o)})),n},f=e=>{const t={};for(const n in e)p(t,n,e[n]);return t};var m,h=(t,r,i,a,c)=>{const{localName:l,local:d,remote:p,originForSending:g,originForReceiving:m}=r;let h=!1;c(`${l}: Connecting call sender`);const y=t=>(...r)=>{let i;c(`${l}: Sending ${t}() call`);try{p.closed&&(i=!0)}catch(e){i=!0}if(i&&a(),h){const e=new Error(`Unable to send ${t}() call due to destroyed connection`);throw e.code=o.ConnectionDestroyed,e}return new Promise(((o,i)=>{const a=++u,f=r=>{if(r.source!==p||r.data.penpal!==e.Reply||r.data.id!==a)return;if("*"!==m&&r.origin!==m)return void c(`${l} received message from origin ${r.origin} which did not match expected origin ${m}`);const u=r.data;c(`${l}: Received ${t}() reply`),d.removeEventListener(s.Message,f);let g=u.returnValue;u.returnValueIsError&&(g=(e=>{const t=new Error;return Object.keys(e).forEach((n=>t[n]=e[n])),t})(g)),(u.resolution===n.Fulfilled?o:i)(g)};d.addEventListener(s.Message,f);const h={penpal:e.Call,id:a,methodName:t,args:r};p.postMessage(h,g)}))},E=i.reduce(((e,t)=>(e[t]=y(t),e)),{});return Object.assign(t,f(E)),()=>{h=!0}},y=(e,t)=>{let n;return void 0!==e&&(n=window.setTimeout((()=>{const n=new Error(`Connection timed out after ${e}ms`);n.code=o.ConnectionTimeout,t(n)}),e)),()=>{clearTimeout(n)}},E=(t,n,r,o)=>{const{destroy:i,onDestroy:a}=r;return r=>{if(!(t instanceof RegExp?t.test(r.origin):"*"===t||t===r.origin))return void o(`Child: Handshake - Received SYN-ACK from origin ${r.origin} which did not match expected origin ${t}`);o("Child: Handshake - Received SYN-ACK, responding with ACK");const s="null"===r.origin?"*":r.origin,c={penpal:e.Ack,methodNames:Object.keys(n)};window.parent.postMessage(c,s);const u={localName:"Child",local:window,remote:window.parent,originForSending:s,originForReceiving:r.origin},d=l(u,n,o);a(d);const p={},g=h(p,u,r.data.methodNames,i,o);return a(g),p}},v=(t={})=>{const{parentOrigin:n="*",methods:r={},timeout:o,debug:i=!1}=t,a=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(i),c=((e,t)=>{const n=[];let r=!1;return{destroy(o){r||(r=!0,t(`${e}: Destroying connection`),n.forEach((e=>{e(o)})))},onDestroy(e){r?e():n.push(e)}}})("Child",a),{destroy:l,onDestroy:u}=c,d=g(r),p=E(n,d,c,a);return{promise:new Promise(((t,r)=>{const i=y(o,l),c=n=>{if((()=>{try{clearTimeout()}catch(e){return!1}return!0})()&&n.source===parent&&n.data&&n.data.penpal===e.SynAck){const e=p(n);e&&(window.removeEventListener(s.Message,c),i(),t(e))}};window.addEventListener(s.Message,c),(()=>{a("Child: Handshake - Sending SYN");const t={penpal:e.Syn},r=n instanceof RegExp?"*":n;window.parent.postMessage(t,r)})(),u((e=>{window.removeEventListener(s.Message,c),e&&r(e)}))})),destroy(){l()}}};function b(e,t,n){var r,o,i,a,s;function c(){var l=Date.now()-a;l<t&&l>=0?r=setTimeout(c,t-l):(r=null,n||(s=e.apply(i,o),i=o=null))}null==t&&(t=100);var l=function(){i=this,o=arguments,a=Date.now();var l=n&&!r;return r||(r=setTimeout(c,t)),l&&(s=e.apply(i,o),i=o=null),s};return l.clear=function(){r&&(clearTimeout(r),r=null)},l.flush=function(){r&&(s=e.apply(i,o),i=o=null,clearTimeout(r),r=null)},l}b.debounce=b,m=b;var w=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const A=[];for(let e=0;e<256;++e)A.push((e+256).toString(16).slice(1));var R=function(e){if(!function(e){return"string"==typeof e&&w.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function T(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function P(e,t){return e<<t|e>>>32-t}var C,S,L=function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=R(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),i=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),i=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];i[t]=n}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=i[e][t];for(let e=16;e<80;++e)r[e]=P(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],a=n[1],s=n[2],c=n[3],l=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),i=P(o,5)+T(n,a,s,c)+l+t[n]+r[e]>>>0;l=c,c=s,s=P(a,30)>>>0,a=o,o=i}n[0]=n[0]+o>>>0,n[1]=n[1]+a>>>0,n[2]=n[2]+s>>>0,n[3]=n[3]+c>>>0,n[4]=n[4]+l>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i),i[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return(A[e[t+0]]+A[e[t+1]]+A[e[t+2]]+A[e[t+3]]+"-"+A[e[t+4]]+A[e[t+5]]+"-"+A[e[t+6]]+A[e[t+7]]+"-"+A[e[t+8]]+A[e[t+9]]+"-"+A[e[t+10]]+A[e[t+11]]+A[e[t+12]]+A[e[t+13]]+A[e[t+14]]+A[e[t+15]]).toLowerCase()}(i)}try{r.name="v5"}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}();(S=C||(C={})).ID="itemID",S.TYPE="itemType",S.SCOPE="itemScope",S.PROP="itemProp";const I={UUID:"id",ID:C.ID.toLowerCase(),TYPE:C.TYPE.toLowerCase(),SCOPE:C.SCOPE.toLowerCase(),PROP:C.PROP.toLowerCase(),PARENTID:"parentid",EDITOR_BEHAVIOR:"data-editor-behavior"},M="universal-editor-message-bus.herokuapp.com",O="/gql",_="urn:auecon:",$={USER_INPUT_RELAY_MESSAGE:"REMOTE_APP_USER_INPUT",DEMO_APP_HOST:"ue-remote-app.adobe.net/?authorHost=https://author-p15902-e145656-cmstg.adobeaemcloud.com&publishHost=https://publish-p15902-e145656-cmstg.adobeaemcloud.com",GRAPHQL_HOST:M,GRAPHQL_PORT_PUBLIC:443,GRAPHQL_PORT_LOCAL:4e3,GRAPHQL_PATH:O,GRAPHQL_URL:`${M}:443${O}`,EDITABLE_SELECTOR:`[${I.TYPE}]`,CANVAS_PATH:"/canvas",PARENT_SELECTOR:`[${I.SCOPE}][${I.ID}]`,URN_PREFIX:_,META_SELECTOR:`meta[name^='${_}']`,DEMO_APP_HOST_PROD:"ue-remote-app.adobe.net",FRAGMENT_TYPE:"reference",UNIFIED_SHELL_STAGE:"https://experience-stage.adobe.com",UNIFIED_SHELL_PROD:"https://experience.adobe.com",HEADLESS_CF_EDITOR_URL:"#/aem/cf/editor/editor",CONTAINER_SELECTOR:`[${I.TYPE}=container]`,COMPONENT_ITEM_TYPE:"component"};var D=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const U=[];for(let e=0;e<256;++e)U.push((e+256).toString(16).slice(1));var N=function(e){if(!function(e){return"string"==typeof e&&D.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function H(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function F(e,t){return e<<t|e>>>32-t}!function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=N(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),i=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),i=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];i[t]=n}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=i[e][t];for(let e=16;e<80;++e)r[e]=F(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],a=n[1],s=n[2],c=n[3],l=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),i=F(o,5)+H(n,a,s,c)+l+t[n]+r[e]>>>0;l=c,c=s,s=F(a,30)>>>0,a=o,o=i}n[0]=n[0]+o>>>0,n[1]=n[1]+a>>>0,n[2]=n[2]+s>>>0,n[3]=n[3]+c>>>0,n[4]=n[4]+l>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i),i[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return(U[e[t+0]]+U[e[t+1]]+U[e[t+2]]+U[e[t+3]]+"-"+U[e[t+4]]+U[e[t+5]]+"-"+U[e[t+6]]+U[e[t+7]]+"-"+U[e[t+8]]+U[e[t+9]]+"-"+U[e[t+10]]+U[e[t+11]]+U[e[t+12]]+U[e[t+13]]+U[e[t+14]]+U[e[t+15]]).toLowerCase()}(i)}try{r.name="v5"}catch(e){}r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8"}();const k={element:window.document},V=150,x="Component",B=e=>{const t=e.closest($.PARENT_SELECTOR);return(null==t?void 0:t.getAttribute(I.ID))||""},Y={viewport:{width:0,height:0},frame:{width:0,height:0},scroll:{x:0,y:0}},j=({editor:e})=>{null==e||e.updateFrameDetails({details:Y})},q=({target:e})=>{const t=e.documentElement;Y.scroll.x=t.scrollLeft,Y.scroll.y=t.scrollTop},K=({target:e})=>{const t=Math.max(e.document.documentElement.clientWidth||0,e.innerWidth||0),n=Math.max(e.document.documentElement.clientHeight||0,e.innerHeight||0),{width:r,height:o}=e.document.documentElement.getBoundingClientRect();Y.viewport={width:t,height:n},Y.frame={width:Math.ceil(r),height:Math.ceil(o)}},G=({editor:e})=>{const t=[];[...document.styleSheets].forEach((e=>{try{const{cssRules:n}=e;[...n].find((e=>e instanceof CSSFontFaceRule))&&e.href&&t.push(e.href)}catch(n){e.href&&t.push(e.href)}})),e.addCustomFonts(t)},z=({editor:e})=>{const t=k.element,n=(0,m.debounce)((()=>{const n=(e=>{const{scrollLeft:t,scrollTop:n}=e.documentElement,r=e.querySelectorAll($.EDITABLE_SELECTOR)||[],o={editables:[],offset:{x:t,y:n},selected:{}};return r.forEach((e=>{const t=(e=>{const t=e.getAttribute(I.TYPE)||"",n=e.getAttribute(I.ID)||void 0,r=e.getAttribute(I.PROP)||void 0,o=t===$.COMPONENT_ITEM_TYPE||e.getAttribute(I.EDITOR_BEHAVIOR)===$.COMPONENT_ITEM_TYPE,i=!n&&r?B(e):"",a=o&&n?(e=>{const t=e.closest($.CONTAINER_SELECTOR),n=null==t?void 0:t.getAttribute(I.ID);if(n)return L(`${n}`,L.URL);const r=null==t?void 0:t.getAttribute(I.PROP),o=t&&B(t);return r&&o?L(`${o}_${r}`,L.URL):""})(e):"",s=L(`${n||i}${r?`_${r}`:""}`,L.URL),c=t||x;return{rect:e.getBoundingClientRect(),itemtype:t,label:c,id:s,itemid:n,itemprop:r,containerid:a,parentid:i}})(e);o.editables.push(t)})),o})(t);e.repaintEditables({editables:n})}),V);n(),window.removeEventListener("resize",n),window.addEventListener("resize",n),(({element:e,callback:t})=>{const n=new MutationObserver(t);n.observe(e,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),n.disconnect})({element:t,callback:n})},Q=({editor:e})=>{const t=window;t.document.addEventListener("scroll",(0,m.debounce)((({target:t})=>{q({target:t}),j({editor:e})}),V)),t.addEventListener("resize",(0,m.debounce)((({target:t})=>{K({target:t}),j({editor:e})}),V)),t.addEventListener("orientationchange",(0,m.debounce)((({target:n})=>{q({target:t.document}),K({target:n}),j({editor:e})}),V));const n=(0,m.debounce)((()=>{K({target:t}),j({editor:e})}),V);new ResizeObserver(n).observe(t.document.body),requestAnimationFrame((()=>{q({target:t.document}),K({target:t}),j({editor:e})}))},W=({editor:e})=>{document.addEventListener("click",(t=>(({event:e,editor:t})=>{const n=e.target.closest("A");n&&(e.preventDefault(),t.navigateTo({href:n.href}))})({event:t,editor:e})),{capture:!0})},X=()=>{window.addEventListener("keydown",(({type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i})=>{const a={type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i};parent.postMessage({type:$.USER_INPUT_RELAY_MESSAGE,value:a},"*")}))},Z="rgba(0, 0, 0, 0)",J=e=>{const t=window.getComputedStyle(e).backgroundColor,n=e.parentElement;return t===Z&&n?J(n):t};var ee=function(e){var t,n=new Set,r=function(e,r){var o="function"==typeof e?e(t):e;if(!Object.is(o,t)){var i=t;t=(null!=r?r:"object"!=typeof o)?o:Object.assign({},t,o),n.forEach((function(e){return e(t,i)}))}},o=function(){return t},i={setState:r,getState:o,subscribe:function(e){return n.add(e),function(){return n.delete(e)}},destroy:function(){return n.clear()}};return t=e(r,o,i),i};const te=({set:e},{mode:t})=>{e((e=>({...e,mode:t,isInEditor:"in-editor"===t})))},ne=function(e){return e&&e.__esModule?e.default:e}((function(e){return e?ee(e):ee}))(((e,t)=>({mode:"regular",isInEditor:!1,setMode:te.bind(null,{get:t,set:e})}))),re=e=>e.split("/").pop()||"",oe=e=>{const[t="",n=""]=e.split("/");return`${n.toUpperCase()} ${t}`},ie=e=>{const{naturalWidth:t,naturalHeight:n}=e;return t&&n&&`${t} x ${n}`||""},ae=e=>{const t=Math.floor(Math.log(e)/Math.log(1024));return`${parseFloat((e/Math.pow(1024,t)).toFixed(0))} ${["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}`},se=new RegExp(`^${$.URN_PREFIX}`),ce={enableEditing:()=>{ne.getState().setMode({mode:"in-editor"})},getEditableElement:e=>{const t=document.querySelector(e);if(!(t&&t instanceof HTMLElement))return;const n=window.getComputedStyle(t),r=J(t),o=r!==Z?`${n.getPropertyValue("font-size")} ${n.getPropertyValue("font-family")}`:"";return{content:t.innerText,htmlContent:t.innerHTML,style:{font:n.getPropertyValue("font")||o,visibility:t.style.visibility,color:n.getPropertyValue("color"),textAlign:n.getPropertyValue("text-align"),textTransform:n.getPropertyValue("text-transform"),border:n.getPropertyValue("border"),padding:n.getPropertyValue("padding"),backgroundColor:r,width:n.getPropertyValue("width"),height:n.getPropertyValue("height")}}},updateField:async({selector:e,value:t})=>{const n=document.querySelector(e);return n&&(n.innerHTML=t),!0},removeField:({selector:e})=>{const t=document.querySelector(e);t&&t.remove()},getUrnMappings:()=>{const e=document.querySelectorAll($.META_SELECTOR);return Array.from(e).reduce(((e,{name:t,content:n})=>({...e,[t.replace(se,"")]:n})),{})},getMediaProperties:async e=>{const t=document.querySelector(e),n=null==t?void 0:t.getAttribute("src");if(!n||!t)return;const r=await(async e=>{try{return await fetch(e).then((e=>e.blob()))}catch{return}})(n),{type:o,size:i}=r||{};return{name:re(n),mimeType:o?oe(o):"",resolution:ie(t),size:i?ae(i):"",src:n,alt:t.getAttribute("alt")||""}},getFormFieldProperties:async e=>{const t=document.querySelector(e),n=(null==t?void 0:t.getAttribute("name"))||"",r=(null==t?void 0:t.getAttribute("placeholder"))||"",o=null==t?void 0:t.getAttribute("required"),i=null==t?void 0:t.getAttribute("pattern"),a=null==t?void 0:t.getAttribute("aria-describedby"),s=a?document.getElementById(a):null,c=null==t?void 0:t.id,l=document.querySelector(`label[for=${c}]`);let u=[];if(t instanceof HTMLSelectElement){const e=Array.from(t.options);for(const t of e)u.push({label:t.label,value:t.value})}return{name:n,label:(null==l?void 0:l.innerHTML)||"",description:(null==s?void 0:s.innerText)||"",placeholder:r,required:o?"true":"false",pattern:i,options:u}}};(async()=>{const e=v({methods:ce}),t=await e.promise;G({editor:t}),z({editor:t}),Q({editor:t}),W({editor:t}),X()})()})();
//# sourceMappingURL=universal-editor-embedded.js.map