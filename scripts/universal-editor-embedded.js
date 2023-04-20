(()=>{var e,t,n,r,o,i,a,l;(t=e||(e={})).Call="call",t.Reply="reply",t.Syn="syn",t.SynAck="synAck",t.Ack="ack",(r=n||(n={})).Fulfilled="fulfilled",r.Rejected="rejected",(i=o||(o={})).ConnectionDestroyed="ConnectionDestroyed",i.ConnectionTimeout="ConnectionTimeout",i.NoIframeSrc="NoIframeSrc",(a||(a={})).DataCloneError="DataCloneError",(l||(l={})).Message="message";const s=({name:e,message:t,stack:n})=>({name:e,message:t,stack:n});var c=(t,r,o)=>{const{localName:i,local:c,remote:u,originForSending:d,originForReceiving:p}=t;let m=!1;const g=t=>{if(t.source!==u||t.data.penpal!==e.Call)return;if("*"!==p&&t.origin!==p)return void o(`${i} received message from origin ${t.origin} which did not match expected origin ${p}`);const l=t.data,{methodName:c,args:g,id:f}=l;o(`${i}: Received ${c}() call`);const h=t=>r=>{if(o(`${i}: Sending ${c}() reply`),m)return void o(`${i}: Unable to send ${c}() reply due to destroyed connection`);const l={penpal:e.Reply,id:f,resolution:t,returnValue:r};t===n.Rejected&&r instanceof Error&&(l.returnValue=s(r),l.returnValueIsError=!0);try{u.postMessage(l,d)}catch(t){if(t.name===a.DataCloneError){const r={penpal:e.Reply,id:f,resolution:n.Rejected,returnValue:s(t),returnValueIsError:!0};u.postMessage(r,d)}throw t}};new Promise((e=>e(r[c].apply(r,g)))).then(h(n.Fulfilled),h(n.Rejected))};return c.addEventListener(l.Message,g),()=>{m=!0,c.removeEventListener(l.Message,g)}};let u=0;const d=e=>e?e.split("."):[],p=(e,t,n)=>{const r=d(t);return r.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===r.length-1&&(e[t]=n),e[t])),e),e},m=(e,t)=>{const n={};return Object.keys(e).forEach((r=>{const o=e[r],i=((e,t)=>{const n=d(t||"");return n.push(e),(e=>e.join("."))(n)})(r,t);"object"==typeof o&&Object.assign(n,m(o,i)),"function"==typeof o&&(n[i]=o)})),n},g=e=>{const t={};for(const n in e)p(t,n,e[n]);return t};var f,h=(t,r,i,a,s)=>{const{localName:c,local:d,remote:p,originForSending:m,originForReceiving:f}=r;let h=!1;s(`${c}: Connecting call sender`);const y=t=>(...r)=>{let i;s(`${c}: Sending ${t}() call`);try{p.closed&&(i=!0)}catch(e){i=!0}if(i&&a(),h){const e=new Error(`Unable to send ${t}() call due to destroyed connection`);throw e.code=o.ConnectionDestroyed,e}return new Promise(((o,i)=>{const a=++u,g=r=>{if(r.source!==p||r.data.penpal!==e.Reply||r.data.id!==a)return;if("*"!==f&&r.origin!==f)return void s(`${c} received message from origin ${r.origin} which did not match expected origin ${f}`);const u=r.data;s(`${c}: Received ${t}() reply`),d.removeEventListener(l.Message,g);let m=u.returnValue;u.returnValueIsError&&(m=(e=>{const t=new Error;return Object.keys(e).forEach((n=>t[n]=e[n])),t})(m)),(u.resolution===n.Fulfilled?o:i)(m)};d.addEventListener(l.Message,g);const h={penpal:e.Call,id:a,methodName:t,args:r};p.postMessage(h,m)}))},E=i.reduce(((e,t)=>(e[t]=y(t),e)),{});return Object.assign(t,g(E)),()=>{h=!0}},y=(e,t)=>{let n;return void 0!==e&&(n=window.setTimeout((()=>{const n=new Error(`Connection timed out after ${e}ms`);n.code=o.ConnectionTimeout,t(n)}),e)),()=>{clearTimeout(n)}},E=(t,n,r,o)=>{const{destroy:i,onDestroy:a}=r;return r=>{if(!(t instanceof RegExp?t.test(r.origin):"*"===t||t===r.origin))return void o(`Child: Handshake - Received SYN-ACK from origin ${r.origin} which did not match expected origin ${t}`);o("Child: Handshake - Received SYN-ACK, responding with ACK");const l="null"===r.origin?"*":r.origin,s={penpal:e.Ack,methodNames:Object.keys(n)};window.parent.postMessage(s,l);const u={localName:"Child",local:window,remote:window.parent,originForSending:l,originForReceiving:r.origin},d=c(u,n,o);a(d);const p={},m=h(p,u,r.data.methodNames,i,o);return a(m),p}},b=(t={})=>{const{parentOrigin:n="*",methods:r={},timeout:o,debug:i=!1}=t,a=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(i),s=((e,t)=>{const n=[];let r=!1;return{destroy(o){r||(r=!0,t(`${e}: Destroying connection`),n.forEach((e=>{e(o)})))},onDestroy(e){r?e():n.push(e)}}})("Child",a),{destroy:c,onDestroy:u}=s,d=m(r),p=E(n,d,s,a);return{promise:new Promise(((t,r)=>{const i=y(o,c),s=n=>{if((()=>{try{clearTimeout()}catch(e){return!1}return!0})()&&n.source===parent&&n.data&&n.data.penpal===e.SynAck){const e=p(n);e&&(window.removeEventListener(l.Message,s),i(),t(e))}};window.addEventListener(l.Message,s),(()=>{a("Child: Handshake - Sending SYN");const t={penpal:e.Syn},r=n instanceof RegExp?"*":n;window.parent.postMessage(t,r)})(),u((e=>{window.removeEventListener(l.Message,s),e&&r(e)}))})),destroy(){c()}}};function v(e,t,n){var r,o,i,a,l;function s(){var c=Date.now()-a;c<t&&c>=0?r=setTimeout(s,t-c):(r=null,n||(l=e.apply(i,o),i=o=null))}null==t&&(t=100);var c=function(){i=this,o=arguments,a=Date.now();var c=n&&!r;return r||(r=setTimeout(s,t)),c&&(l=e.apply(i,o),i=o=null),l};return c.clear=function(){r&&(clearTimeout(r),r=null)},c.flush=function(){r&&(l=e.apply(i,o),i=o=null,clearTimeout(r),r=null)},c}v.debounce=v,f=v;var A=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const T=[];for(let e=0;e<256;++e)T.push((e+256).toString(16).slice(1));var w=function(e){if(!function(e){return"string"==typeof e&&A.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function R(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function P(e,t){return e<<t|e>>>32-t}var S,C,L=function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=w(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),i=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),i=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];i[t]=n}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=i[e][t];for(let e=16;e<80;++e)r[e]=P(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],a=n[1],l=n[2],s=n[3],c=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),i=P(o,5)+R(n,a,l,s)+c+t[n]+r[e]>>>0;c=s,s=l,l=P(a,30)>>>0,a=o,o=i}n[0]=n[0]+o>>>0,n[1]=n[1]+a>>>0,n[2]=n[2]+l>>>0,n[3]=n[3]+s>>>0,n[4]=n[4]+c>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i),i[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return(T[e[t+0]]+T[e[t+1]]+T[e[t+2]]+T[e[t+3]]+"-"+T[e[t+4]]+T[e[t+5]]+"-"+T[e[t+6]]+T[e[t+7]]+"-"+T[e[t+8]]+T[e[t+9]]+"-"+T[e[t+10]]+T[e[t+11]]+T[e[t+12]]+T[e[t+13]]+T[e[t+14]]+T[e[t+15]]).toLowerCase()}(i)}try{r.name="v5"}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}();(C=S||(S={})).ID="itemID",C.TYPE="itemType",C.SCOPE="itemScope",C.PROP="itemProp";const I={UUID:"id",ID:S.ID.toLowerCase(),TYPE:S.TYPE.toLowerCase(),SCOPE:S.SCOPE.toLowerCase(),PROP:S.PROP.toLowerCase(),PARENTID:"parentid",EDITOR_BEHAVIOR:"data-editor-behavior"},M="universal-editor-message-bus.herokuapp.com",O="/gql",$="urn:auecon:",_={USER_INPUT_RELAY_MESSAGE:"REMOTE_APP_USER_INPUT",DEMO_APP_HOST:"ue-remote-app.adobe.net/?authorHost=https://author-p15902-e145656-cmstg.adobeaemcloud.com&publishHost=https://publish-p15902-e145656-cmstg.adobeaemcloud.com",GRAPHQL_HOST:M,GRAPHQL_PORT_PUBLIC:443,GRAPHQL_PORT_LOCAL:4e3,GRAPHQL_PATH:O,GRAPHQL_URL:`${M}:443${O}`,EDITABLE_SELECTOR:`[${I.TYPE}]`,CANVAS_PATH:"/canvas",PARENT_SELECTOR:`[${I.SCOPE}][${I.ID}]`,URN_PREFIX:$,META_SELECTOR:`meta[name^='${$}']`,DEMO_APP_HOST_PROD:"ue-remote-app.adobe.net",FRAGMENT_TYPE:"reference",UNIFIED_SHELL_STAGE:"https://experience-stage.adobe.com",UNIFIED_SHELL_PROD:"https://experience.adobe.com",HEADLESS_CF_EDITOR_URL:"#/aem/cf/editor/editor",CONTAINER_SELECTOR:`[${I.TYPE}=container]`,COMPONENT_ITEM_TYPE:"component"};var N=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const D=[];for(let e=0;e<256;++e)D.push((e+256).toString(16).slice(1));var U=function(e){if(!function(e){return"string"==typeof e&&N.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function H(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function x(e,t){return e<<t|e>>>32-t}!function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=U(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),i=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),i=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];i[t]=n}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=i[e][t];for(let e=16;e<80;++e)r[e]=x(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],a=n[1],l=n[2],s=n[3],c=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),i=x(o,5)+H(n,a,l,s)+c+t[n]+r[e]>>>0;c=s,s=l,l=x(a,30)>>>0,a=o,o=i}n[0]=n[0]+o>>>0,n[1]=n[1]+a>>>0,n[2]=n[2]+l>>>0,n[3]=n[3]+s>>>0,n[4]=n[4]+c>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i),i[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return(D[e[t+0]]+D[e[t+1]]+D[e[t+2]]+D[e[t+3]]+"-"+D[e[t+4]]+D[e[t+5]]+"-"+D[e[t+6]]+D[e[t+7]]+"-"+D[e[t+8]]+D[e[t+9]]+"-"+D[e[t+10]]+D[e[t+11]]+D[e[t+12]]+D[e[t+13]]+D[e[t+14]]+D[e[t+15]]).toLowerCase()}(i)}try{r.name="v5"}catch(e){}r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8"}();const k={element:window.document},F=150,B="Component",V=e=>{const t=e.closest(_.CONTAINER_SELECTOR),n=null==t?void 0:t.getAttribute(I.ID);if(n)return L(`${n}`,L.URL);const r=null==t?void 0:t.getAttribute(I.PROP),o=t&&Y(t);return r&&o?L(`${o}_${r}`,L.URL):""},Y=e=>{const t=e.closest(_.PARENT_SELECTOR);return(null==t?void 0:t.getAttribute(I.ID))||""},q=(e,t,n)=>{const r=e.getAttribute(I.TYPE)||"urn:fnk:type/component",o=e.getAttribute(I.ID)||`${t}:Name:${e.getAttribute("name")}`,i=e.getAttribute(I.PROP)||void 0,a=r===_.COMPONENT_ITEM_TYPE||e.getAttribute(I.EDITOR_BEHAVIOR)===_.COMPONENT_ITEM_TYPE,l=!o&&i?Y(e):"",s=a&&o?V(e):"",c=n?`${n}:${e.tagName.toLowerCase()}[name=${e.getAttribute("name")}]`:`${e.tagName.toLowerCase()}[name=${e.getAttribute("name")}]`,u=r||B;let d=e.getBoundingClientRect();return e instanceof HTMLFieldSetElement||!e.parentElement||(d=e.parentElement.getBoundingClientRect()),{rect:d,itemtype:r,label:u,id:c,itemid:o,itemprop:i,containerid:s,parentid:l}},j=e=>{const{scrollLeft:t,scrollTop:n}=e.documentElement,r=e.querySelectorAll(_.EDITABLE_SELECTOR)||[],o={editables:[],offset:{x:t,y:n},selected:{}};return r.forEach((e=>{const t=(e=>{const t=e.getAttribute(I.TYPE)||"",n=e.getAttribute(I.ID)||void 0,r=e.getAttribute(I.PROP)||void 0,o=t===_.COMPONENT_ITEM_TYPE||e.getAttribute(I.EDITOR_BEHAVIOR)===_.COMPONENT_ITEM_TYPE,i=!n&&r?Y(e):"",a=o&&n?V(e):"",l=L(`${n||i}${r?`_${r}`:""}`,L.URL),s=t||B;return{rect:e.getBoundingClientRect(),itemtype:t,label:s,id:l,itemid:n,itemprop:r,containerid:a,parentid:i}})(e);o.editables.push(t)})),((e,t)=>{const n=e.getElementsByTagName("form")||[];Array.from(n).forEach((e=>{((e,t,n)=>{["checkbox","radio"].forEach((n=>{const r=e.querySelectorAll(`input[type=${n}]`),o=Array.from(r).reduce((function(e,t){const n=t;return e[n.name]=e[n.name]||[],e[n.name].push(t),e}),Object.create(null));for(const n in o){const r=o[n][0].closest("fieldset");if(r&&r.hasAttribute("name")){const n=q(r,e.name);t.editables.push(n)}}}))})(e,t),((e,t,n)=>{const r=new Set;t.editables.forEach((e=>{r.add(e.id)})),["input","select","button","textarea"].forEach((n=>{const o=e.getElementsByTagName(n);Array.from(o).forEach((n=>{if(n instanceof HTMLInputElement&&("radio"===n.type||"checkbox"===n.type)){const e=n.closest("fieldset");if(e){const t=`fieldset[name=${e.getAttribute("name")}]`;if(r.has(t))return}}if(n.hasAttribute("name")&&"hidden"!==n.getAttribute("type")){const r=q(n,e.name);t.editables.push(r)}}))}))})(e,t),((e,t)=>{const n=new Set;t.editables.forEach((e=>{n.add(e.id)}));const r=e.getElementsByTagName("fieldset");Array.from(r).forEach((r=>{const o=`fieldset[name=${r.getAttribute("name")}]`;if(!n.has(o)){const n=q(r,e.name,"container");t.editables.push(n)}}))})(e,t)}))})(e,o),o},K={viewport:{width:0,height:0},frame:{width:0,height:0},scroll:{x:0,y:0}},G=({editor:e})=>{null==e||e.updateFrameDetails({details:K})},z=({target:e})=>{const t=e.documentElement;K.scroll.x=t.scrollLeft,K.scroll.y=t.scrollTop},Q=({target:e})=>{const t=Math.max(e.document.documentElement.clientWidth||0,e.innerWidth||0),n=Math.max(e.document.documentElement.clientHeight||0,e.innerHeight||0),{width:r,height:o}=e.document.documentElement.getBoundingClientRect();K.viewport={width:t,height:n},K.frame={width:Math.ceil(r),height:Math.ceil(o)}},W=({editor:e})=>{const t=[];[...document.styleSheets].forEach((e=>{try{const{cssRules:n}=e;[...n].find((e=>e instanceof CSSFontFaceRule))&&e.href&&t.push(e.href)}catch(n){e.href&&t.push(e.href)}})),e.addCustomFonts(t)},X=({editor:e})=>{const t=k.element,n=(0,f.debounce)((()=>{const n=j(t);e.repaintEditables({editables:n})}),F);n(),window.removeEventListener("resize",n),window.addEventListener("resize",n),(({element:e,callback:t})=>{const n=new MutationObserver(t);n.observe(e,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),n.disconnect})({element:t,callback:n})},Z=({editor:e})=>{const t=window;t.document.addEventListener("scroll",(0,f.debounce)((({target:t})=>{z({target:t}),G({editor:e})}),F)),t.addEventListener("resize",(0,f.debounce)((({target:t})=>{Q({target:t}),G({editor:e})}),F)),t.addEventListener("orientationchange",(0,f.debounce)((({target:n})=>{z({target:t.document}),Q({target:n}),G({editor:e})}),F));const n=(0,f.debounce)((()=>{Q({target:t}),G({editor:e})}),F);new ResizeObserver(n).observe(t.document.body),requestAnimationFrame((()=>{z({target:t.document}),Q({target:t}),G({editor:e})}))},J=({editor:e})=>{document.addEventListener("click",(t=>(({event:e,editor:t})=>{const n=e.target.closest("A");n&&(e.preventDefault(),t.navigateTo({href:n.href}))})({event:t,editor:e})),{capture:!0})},ee=()=>{window.addEventListener("keydown",(({type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i})=>{const a={type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i};parent.postMessage({type:_.USER_INPUT_RELAY_MESSAGE,value:a},"*")}))},te="rgba(0, 0, 0, 0)",ne=e=>{const t=window.getComputedStyle(e).backgroundColor,n=e.parentElement;return t===te&&n?ne(n):t};var re=function(e){var t,n=new Set,r=function(e,r){var o="function"==typeof e?e(t):e;if(!Object.is(o,t)){var i=t;t=(null!=r?r:"object"!=typeof o)?o:Object.assign({},t,o),n.forEach((function(e){return e(t,i)}))}},o=function(){return t},i={setState:r,getState:o,subscribe:function(e){return n.add(e),function(){return n.delete(e)}},destroy:function(){return n.clear()}};return t=e(r,o,i),i};const oe=({set:e},{mode:t})=>{e((e=>({...e,mode:t,isInEditor:"in-editor"===t})))},ie=function(e){return e&&e.__esModule?e.default:e}((function(e){return e?re(e):re}))(((e,t)=>({mode:"regular",isInEditor:!1,setMode:oe.bind(null,{get:t,set:e})}))),ae=e=>e.split("/").pop()||"",le=e=>{const[t="",n=""]=e.split("/");return`${n.toUpperCase()} ${t}`},se=e=>{const{naturalWidth:t,naturalHeight:n}=e;return t&&n&&`${t} x ${n}`||""},ce=e=>{const t=Math.floor(Math.log(e)/Math.log(1024));return`${parseFloat((e/Math.pow(1024,t)).toFixed(0))} ${["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}`},ue=new RegExp(`^${_.URN_PREFIX}`),de={enableEditing:()=>{ie.getState().setMode({mode:"in-editor"})},getEditableElement:e=>{const t=document.querySelector(e);if(!(t&&t instanceof HTMLElement))return;const n=window.getComputedStyle(t),r=ne(t),o=r!==te?`${n.getPropertyValue("font-size")} ${n.getPropertyValue("font-family")}`:"";return{content:t.innerText,htmlContent:t.innerHTML,style:{font:n.getPropertyValue("font")||o,visibility:t.style.visibility,color:n.getPropertyValue("color"),textAlign:n.getPropertyValue("text-align"),textTransform:n.getPropertyValue("text-transform"),border:n.getPropertyValue("border"),padding:n.getPropertyValue("padding"),backgroundColor:r,width:n.getPropertyValue("width"),height:n.getPropertyValue("height")}}},updateField:async({selector:e,value:t})=>{const n=document.querySelector(e);return n&&(n.innerHTML=t),!0},removeField:({selector:e})=>{const t=document.querySelector(e);t&&t.remove()},getUrnMappings:()=>{const e=document.querySelectorAll(_.META_SELECTOR);return Array.from(e).reduce(((e,{name:t,content:n})=>({...e,[t.replace(ue,"")]:n})),{})},getMediaProperties:async e=>{const t=document.querySelector(e),n=null==t?void 0:t.getAttribute("src");if(!n||!t)return;const r=await(async e=>{try{return await fetch(e).then((e=>e.blob()))}catch{return}})(n),{type:o,size:i}=r||{};return{name:ae(n),mimeType:o?le(o):"",resolution:se(t),size:i?ce(i):"",src:n,alt:t.getAttribute("alt")||""}},getFormFieldProperties:async e=>{const t=document.querySelector(e),n=(null==t?void 0:t.getAttribute("name"))||"",r=(null==t?void 0:t.getAttribute("placeholder"))||"",o=null==t?void 0:t.getAttribute("required"),i=(null==t?void 0:t.getAttribute("pattern"))||"",a=(null==t?void 0:t.getAttribute("maxlength"))||"",l=(null==t?void 0:t.getAttribute("minlength"))||"",s=(null==t?void 0:t.getAttribute("max"))||"",c=(null==t?void 0:t.getAttribute("min"))||"",u=null==t?void 0:t.getAttribute("readonly"),d=null==t?void 0:t.getAttribute("disabled"),p=null==t?void 0:t.getAttribute("aria-describedby"),m=p?document.getElementById(p):null,g=null==t?void 0:t.id;let f=g?document.querySelector(`label[for=${g}]`):"",h=[],y="";if(t instanceof HTMLInputElement&&(y=t.type),t instanceof HTMLSelectElement){y="select";const e=Array.from(t.options);for(const t of e)h.push({label:t.label,value:t.value})}if(t instanceof HTMLFieldSetElement&&(y="fieldset",f=t.querySelector("legend"),!e.startsWith("container:"))){let e=t.querySelectorAll("input[type=checkbox]");0===e.length&&(e=t.querySelectorAll("input[type=radio]")),Array.from(e).forEach((e=>{const n=e,r=t.querySelector(`label[for=${e.id}]`);h.push({label:(null==r?void 0:r.innerHTML)||n.value,value:n.value})}))}return t instanceof HTMLButtonElement&&(f=t,y=t.type||"button"),{name:n,type:y,label:(null==f?void 0:f.innerText)||"",description:(null==m?void 0:m.innerText)||"",placeholder:r,required:""===o||o?"true":"false",readonly:""===u||u?"true":"false",disabled:""===d||d?"true":"false",pattern:i,options:h,maxlength:a,minlength:l,max:s,min:c}}};(async()=>{const e=b({methods:de}),t=await e.promise;W({editor:t}),X({editor:t}),Z({editor:t}),J({editor:t}),ee()})()})();
//# sourceMappingURL=universal-editor-embedded.js.map
