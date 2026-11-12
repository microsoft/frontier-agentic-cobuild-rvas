(()=>{var Be=window,Ne=Be.ShadowRoot&&(Be.ShadyCSS===void 0||Be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol(),Vt=new WeakMap,ge=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Ne&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Vt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Vt.set(t,e))}return e}toString(){return this.cssText}},Ft=o=>new ge(typeof o=="string"?o:o+"",void 0,ot),u=(o,...e)=>{let t=o.length===1?o[0]:e.reduce(((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1]),o[0]);return new ge(t,o,ot)},nt=(o,e)=>{Ne?o.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{let i=document.createElement("style"),s=Be.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}))},Te=Ne?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Ft(t)})(o):o;var at,He=window,Gt=He.trustedTypes,$i=Gt?Gt.emptyScript:"",Zt=He.reactiveElementPolyfillSupport,ht={toAttribute(o,e){switch(e){case Boolean:o=o?$i:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Kt=(o,e)=>e!==o&&(e==e||o==o),lt={attribute:!0,type:String,converter:ht,reflect:!1,hasChanged:Kt},dt="finalized",T=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach(((t,i)=>{let s=this._$Ep(i,t);s!==void 0&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){let r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||lt}static finalize(){if(this.hasOwnProperty(dt))return!1;this[dt]=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(Te(s))}else e!==void 0&&t.push(Te(e));return t}static _$Ep(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=lt){var s;let r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){let n=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:ht).toAttribute(t,i.type);this._$El=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(e,t){var i;let s=this.constructor,r=s._$Ev.get(e);if(r!==void 0&&this._$El!==r){let n=s.getPropertyOptions(r),a=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:ht;this._$El=r,this[r]=a.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Kt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((s,r)=>this[r]=s)),this._$Ei=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach((s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)})),this.update(i)):this._$Ek()}catch(s){throw t=!1,this._$Ek(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};T[dt]=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},Zt?.({ReactiveElement:T}),((at=He.reactiveElementVersions)!==null&&at!==void 0?at:He.reactiveElementVersions=[]).push("1.6.3");var ct,We=window,se=We.trustedTypes,Qt=se?se.createPolicy("lit-html",{createHTML:o=>o}):void 0,ut="$lit$",U=`lit$${(Math.random()+"").slice(9)}$`,si="?"+U,Si=`<${si}>`,Z=document,be=()=>Z.createComment(""),ye=o=>o===null||typeof o!="object"&&typeof o!="function",ri=Array.isArray,Mi=o=>ri(o)||typeof o?.[Symbol.iterator]=="function",pt=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yt=/-->/g,Xt=/>/g,F=RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jt=/'/g,ei=/"/g,oi=/^(?:script|style|textarea|title)$/i,ni=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),f=ni(1),Yi=ni(2),K=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ti=new WeakMap,G=Z.createTreeWalker(Z,129,null,!1);function ai(o,e){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qt!==void 0?Qt.createHTML(e):e}var Oi=(o,e)=>{let t=o.length-1,i=[],s,r=e===2?"<svg>":"",n=ve;for(let a=0;a<t;a++){let d=o[a],h,c,p=-1,g=0;for(;g<d.length&&(n.lastIndex=g,c=n.exec(d),c!==null);)g=n.lastIndex,n===ve?c[1]==="!--"?n=Yt:c[1]!==void 0?n=Xt:c[2]!==void 0?(oi.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=F):c[3]!==void 0&&(n=F):n===F?c[0]===">"?(n=s??ve,p=-1):c[1]===void 0?p=-2:(p=n.lastIndex-c[2].length,h=c[1],n=c[3]===void 0?F:c[3]==='"'?ei:Jt):n===ei||n===Jt?n=F:n===Yt||n===Xt?n=ve:(n=F,s=void 0);let _=n===F&&o[a+1].startsWith("/>")?" ":"";r+=n===ve?d+Si:p>=0?(i.push(h),d.slice(0,p)+ut+d.slice(p)+U+_):d+U+(p===-2?(i.push(void 0),a):_)}return[ai(o,r+(o[t]||"<?>")+(e===2?"</svg>":"")),i]},we=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0,a=e.length-1,d=this.parts,[h,c]=Oi(e,t);if(this.el=o.createElement(h,i),G.currentNode=this.el.content,t===2){let p=this.el.content,g=p.firstChild;g.remove(),p.append(...g.childNodes)}for(;(s=G.nextNode())!==null&&d.length<a;){if(s.nodeType===1){if(s.hasAttributes()){let p=[];for(let g of s.getAttributeNames())if(g.endsWith(ut)||g.startsWith(U)){let _=c[n++];if(p.push(g),_!==void 0){let j=s.getAttribute(_.toLowerCase()+ut).split(U),B=/([.?@])?(.*)/.exec(_);d.push({type:1,index:r,name:B[2],strings:j,ctor:B[1]==="."?mt:B[1]==="?"?gt:B[1]==="@"?vt:oe})}else d.push({type:6,index:r})}for(let g of p)s.removeAttribute(g)}if(oi.test(s.tagName)){let p=s.textContent.split(U),g=p.length-1;if(g>0){s.textContent=se?se.emptyScript:"";for(let _=0;_<g;_++)s.append(p[_],be()),G.nextNode(),d.push({type:2,index:++r});s.append(p[g],be())}}}else if(s.nodeType===8)if(s.data===si)d.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf(U,p+1))!==-1;)d.push({type:7,index:r}),p+=U.length-1}r++}}static createElement(e,t){let i=Z.createElement("template");return i.innerHTML=e,i}};function re(o,e,t=o,i){var s,r,n,a;if(e===K)return e;let d=i!==void 0?(s=t._$Co)===null||s===void 0?void 0:s[i]:t._$Cl,h=ye(e)?void 0:e._$litDirective$;return d?.constructor!==h&&((r=d?._$AO)===null||r===void 0||r.call(d,!1),h===void 0?d=void 0:(d=new h(o),d._$AT(o,t,i)),i!==void 0?((n=(a=t)._$Co)!==null&&n!==void 0?n:a._$Co=[])[i]=d:t._$Cl=d),d!==void 0&&(e=re(o,d._$AS(o,e.values),d,i)),e}var ft=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;let{el:{content:i},parts:s}=this._$AD,r=((t=e?.creationScope)!==null&&t!==void 0?t:Z).importNode(i,!0);G.currentNode=r;let n=G.nextNode(),a=0,d=0,h=s[0];for(;h!==void 0;){if(a===h.index){let c;h.type===2?c=new xe(n,n.nextSibling,this,e):h.type===1?c=new h.ctor(n,h.name,h.strings,this,e):h.type===6&&(c=new bt(n,this,e)),this._$AV.push(c),h=s[++d]}a!==h?.index&&(n=G.nextNode(),a++)}return G.currentNode=Z,r}v(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},xe=class o{constructor(e,t,i,s){var r;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=(r=s?.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=re(this,e,t),ye(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Mi(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==$&&ye(this._$AH)?this._$AA.nextSibling.data=e:this.$(Z.createTextNode(e)),this._$AH=e}g(e){var t;let{values:i,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=we.createElement(ai(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{let n=new ft(r,this),a=n.u(this.options);n.v(i),this.$(a),this._$AH=n}}_$AC(e){let t=ti.get(e.strings);return t===void 0&&ti.set(e.strings,t=new we(e)),t}T(e){ri(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new o(this.k(be()),this.k(be()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},oe=class{constructor(e,t,i,s,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){let r=this.strings,n=!1;if(r===void 0)e=re(this,e,t,0),n=!ye(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{let a=e,d,h;for(e=r[0],d=0;d<r.length-1;d++)h=re(this,a[i+d],t,d),h===K&&(h=this._$AH[d]),n||(n=!ye(h)||h!==this._$AH[d]),h===$?e=$:e!==$&&(e+=(h??"")+r[d+1]),this._$AH[d]=h}n&&!s&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},mt=class extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}},Ai=se?se.emptyScript:"",gt=class extends oe{constructor(){super(...arguments),this.type=4}j(e){e&&e!==$?this.element.setAttribute(this.name,Ai):this.element.removeAttribute(this.name)}},vt=class extends oe{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=re(this,e,t,0))!==null&&i!==void 0?i:$)===K)return;let s=this._$AH,r=e===$&&s!==$||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==$&&(s===$||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},bt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){re(this,e)}};var ii=We.litHtmlPolyfillSupport;ii?.(we,xe),((ct=We.litHtmlVersions)!==null&&ct!==void 0?ct:We.litHtmlVersions=[]).push("2.8.0");var li=(o,e,t)=>{var i,s;let r=(i=t?.renderBefore)!==null&&i!==void 0?i:e,n=r._$litPart$;if(n===void 0){let a=(s=t?.renderBefore)!==null&&s!==void 0?s:null;r._$litPart$=n=new xe(e.insertBefore(be(),a),a,void 0,t??{})}return n._$AI(o),n};var yt,wt;var O=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=li(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return K}};O.finalized=!0,O._$litElement$=!0,(yt=globalThis.litElementHydrateSupport)===null||yt===void 0||yt.call(globalThis,{LitElement:O});var hi=globalThis.litElementPolyfillSupport;hi?.({LitElement:O});((wt=globalThis.litElementVersions)!==null&&wt!==void 0?wt:globalThis.litElementVersions=[]).push("3.3.3");var m=o=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(o,e):((t,i)=>{let{kind:s,elements:r}=i;return{kind:s,elements:r,finisher(n){customElements.define(t,n)}}})(o,e);var Ci=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}},Ei=(o,e,t)=>{e.constructor.createProperty(t,o)};function l(o){return(e,t)=>t!==void 0?Ei(o,e,t):Ci(o,e)}function di(o){return l({...o,state:!0})}var Q=({finisher:o,descriptor:e})=>(t,i)=>{var s;if(i===void 0){let r=(s=t.originalKey)!==null&&s!==void 0?s:t.key,n=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return o!=null&&(n.finisher=function(a){o(a,r)}),n}{let r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),o?.(r,i)}};function y(o,e){return Q({descriptor:t=>{let i={get(){var s,r;return(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(o))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){let s=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,n;return this[s]===void 0&&(this[s]=(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&n!==void 0?n:null),this[s]}}return i}})}var xt,Rs=((xt=window.HTMLSlotElement)===null||xt===void 0?void 0:xt.prototype.assignedElements)!=null?(o,e)=>o.assignedElements(e):(o,e)=>o.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));var Pi=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},zi=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},b=u`
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`,v=class extends O{constructor(){super(...arguments),this.lastSize=[0,0],this.seed=Math.floor(Math.random()*2**31)}updated(e){this.wiredRender()}wiredRender(e=!1){if(this.svg){let t=this.canvasSize();if(!e&&t[0]===this.lastSize[0]&&t[1]===this.lastSize[1])return;for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);this.svg.setAttribute("width",`${t[0]}`),this.svg.setAttribute("height",`${t[1]}`),this.draw(this.svg,t),this.lastSize=t,this.classList.add("wired-rendered")}}fire(e,t){_e(this,e,t)}};Pi([y("svg"),zi("design:type",SVGSVGElement)],v.prototype,"svg",void 0);function ci(){return Math.floor(Math.random()*2**31)}function _e(o,e,t){o.dispatchEvent(new CustomEvent(e,{composed:!0,bubbles:!0,detail:t}))}function _t(o,e,t){if(o&&o.length){let[i,s]=e,r=Math.PI/180*t,n=Math.cos(r),a=Math.sin(r);for(let d of o){let[h,c]=d;d[0]=(h-i)*n-(c-s)*a+i,d[1]=(h-i)*a+(c-s)*n+s}}}function ji(o,e,t){let i=[];o.forEach(s=>i.push(...s)),_t(i,e,t)}function Li(o,e){return o[0]===e[0]&&o[1]===e[1]}function pi(o,e,t,i=1){let s=t,r=Math.max(e,.1),n=o[0]&&o[0][0]&&typeof o[0][0]=="number"?[o]:o,a=[0,0];if(s)for(let h of n)_t(h,a,s);let d=Ii(n,r,i);if(s){for(let h of n)_t(h,a,-s);ji(d,a,-s)}return d}function Ii(o,e,t){let i=[];for(let h of o){let c=[...h];Li(c[0],c[c.length-1])||c.push([c[0][0],c[0][1]]),c.length>2&&i.push(c)}let s=[];e=Math.max(e,.1);let r=[];for(let h of i)for(let c=0;c<h.length-1;c++){let p=h[c],g=h[c+1];if(p[1]!==g[1]){let _=Math.min(p[1],g[1]);r.push({ymin:_,ymax:Math.max(p[1],g[1]),x:_===p[1]?p[0]:g[0],islope:(g[0]-p[0])/(g[1]-p[1])})}}if(r.sort((h,c)=>h.ymin<c.ymin?-1:h.ymin>c.ymin?1:h.x<c.x?-1:h.x>c.x?1:h.ymax===c.ymax?0:(h.ymax-c.ymax)/Math.abs(h.ymax-c.ymax)),!r.length)return s;let n=[],a=r[0].ymin,d=0;for(;n.length||r.length;){if(r.length){let h=-1;for(let p=0;p<r.length&&!(r[p].ymin>a);p++)h=p;r.splice(0,h+1).forEach(p=>{n.push({s:a,edge:p})})}if(n=n.filter(h=>!(h.edge.ymax<=a)),n.sort((h,c)=>h.edge.x===c.edge.x?0:(h.edge.x-c.edge.x)/Math.abs(h.edge.x-c.edge.x)),(t!==1||d%e===0)&&n.length>1)for(let h=0;h<n.length;h=h+2){let c=h+1;if(c>=n.length)break;let p=n[h].edge,g=n[c].edge;s.push([[Math.round(p.x),a],[Math.round(g.x),a]])}a+=t,n.forEach(h=>{h.edge.x=h.edge.x+t*h.edge.islope}),d++}return s}function Y(o,e){var t;let i=e.hachureAngle+90,s=e.hachureGap;s<0&&(s=e.strokeWidth*4),s=Math.round(Math.max(s,.1));let r=1;return e.roughness>=1&&(((t=e.randomizer)===null||t===void 0?void 0:t.next())||Math.random())>.7&&(r=s),pi(o,s,i,r||1)}var ne=class{constructor(e){this.helper=e}fillPolygons(e,t){return this._fillPolygons(e,t)}_fillPolygons(e,t){let i=Y(e,t);return{type:"fillSketch",ops:this.renderLines(i,t)}}renderLines(e,t){let i=[];for(let s of e)i.push(...this.helper.doubleLineOps(s[0][0],s[0][1],s[1][0],s[1][1],t));return i}};function ke(o){let e=o[0],t=o[1];return Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2))}var Re=class extends ne{fillPolygons(e,t){let i=t.hachureGap;i<0&&(i=t.strokeWidth*4),i=Math.max(i,.1);let s=Object.assign({},t,{hachureGap:i}),r=Y(e,s),n=Math.PI/180*t.hachureAngle,a=[],d=i*.5*Math.cos(n),h=i*.5*Math.sin(n);for(let[p,g]of r)ke([p,g])&&a.push([[p[0]-d,p[1]+h],[...g]],[[p[0]+d,p[1]-h],[...g]]);return{type:"fillSketch",ops:this.renderLines(a,t)}}};var De=class{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}};function $t(o,e,t,i,s){return{type:"path",ops:Ue(o,e,t,i,s)}}function Hi(o,e,t){let i=(o||[]).length;if(i>2){let s=[];for(let r=0;r<i-1;r++)s.push(...Ue(o[r][0],o[r][1],o[r+1][0],o[r+1][1],t));return e&&s.push(...Ue(o[i-1][0],o[i-1][1],o[0][0],o[0][1],t)),{type:"path",ops:s}}else if(i===2)return $t(o[0][0],o[0][1],o[1][0],o[1][1],t);return{type:"path",ops:[]}}function St(o,e){return Hi(o,!0,e)}function mi(o,e,t,i,s){let r=[[o,e],[o+t,e],[o+t,e+i],[o,e+i]];return St(r,s)}function Mt(o,e,t,i,s){let r=Ot(t,i,s);return Wi(o,e,s,r).opset}function Ot(o,e,t){let i=Math.sqrt(Math.PI*2*Math.sqrt((Math.pow(o/2,2)+Math.pow(e/2,2))/2)),s=Math.ceil(Math.max(t.curveStepCount,t.curveStepCount/Math.sqrt(200)*i)),r=Math.PI*2/s,n=Math.abs(o/2),a=Math.abs(e/2),d=1-t.curveFitting;return n+=k(n*d,t),a+=k(a*d,t),{increment:r,rx:n,ry:a}}function Wi(o,e,t,i){let[s,r]=fi(i.increment,o,e,i.rx,i.ry,1,i.increment*kt(.1,kt(.4,1,t),t),t),n=ui(s,null,t);if(!t.disableMultiStroke&&t.roughness!==0){let[a]=fi(i.increment,o,e,i.rx,i.ry,1.5,0,t),d=ui(a,null,t);n=n.concat(d)}return{estimatedPoints:r,opset:{type:"path",ops:n}}}function gi(o,e,t,i,s){return Ue(o,e,t,i,s,!0)}function vi(o){return o.randomizer||(o.randomizer=new De(o.seed||0)),o.randomizer.next()}function kt(o,e,t,i=1){return t.roughness*i*(vi(t)*(e-o)+o)}function k(o,e,t=1){return kt(-o,o,e,t)}function Ue(o,e,t,i,s,r=!1){let n=r?s.disableMultiStrokeFill:s.disableMultiStroke,a=Rt(o,e,t,i,s,!0,!1);if(n)return a;let d=Rt(o,e,t,i,s,!0,!0);return a.concat(d)}function Rt(o,e,t,i,s,r,n){let a=Math.pow(o-t,2)+Math.pow(e-i,2),d=Math.sqrt(a),h=1;d<200?h=1:d>500?h=.4:h=-.0016668*d+1.233334;let c=s.maxRandomnessOffset||0;c*c*100>a&&(c=d/10);let p=c/2,g=.2+vi(s)*.2,_=s.bowing*s.maxRandomnessOffset*(i-e)/200,j=s.bowing*s.maxRandomnessOffset*(o-t)/200;_=k(_,s,h),j=k(j,s,h);let B=[],W=()=>k(p,s,h),ie=()=>k(c,s,h),D=s.preserveVertices;return r&&(n?B.push({op:"move",data:[o+(D?0:W()),e+(D?0:W())]}):B.push({op:"move",data:[o+(D?0:k(c,s,h)),e+(D?0:k(c,s,h))]})),n?B.push({op:"bcurveTo",data:[_+o+(t-o)*g+W(),j+e+(i-e)*g+W(),_+o+2*(t-o)*g+W(),j+e+2*(i-e)*g+W(),t+(D?0:W()),i+(D?0:W())]}):B.push({op:"bcurveTo",data:[_+o+(t-o)*g+ie(),j+e+(i-e)*g+ie(),_+o+2*(t-o)*g+ie(),j+e+2*(i-e)*g+ie(),t+(D?0:ie()),i+(D?0:ie())]}),B}function ui(o,e,t){let i=o.length,s=[];if(i>3){let r=[],n=1-t.curveTightness;s.push({op:"move",data:[o[1][0],o[1][1]]});for(let a=1;a+2<i;a++){let d=o[a];r[0]=[d[0],d[1]],r[1]=[d[0]+(n*o[a+1][0]-n*o[a-1][0])/6,d[1]+(n*o[a+1][1]-n*o[a-1][1])/6],r[2]=[o[a+1][0]+(n*o[a][0]-n*o[a+2][0])/6,o[a+1][1]+(n*o[a][1]-n*o[a+2][1])/6],r[3]=[o[a+1][0],o[a+1][1]],s.push({op:"bcurveTo",data:[r[1][0],r[1][1],r[2][0],r[2][1],r[3][0],r[3][1]]})}if(e&&e.length===2){let a=t.maxRandomnessOffset;s.push({op:"lineTo",data:[e[0]+k(a,t),e[1]+k(a,t)]})}}else i===3?(s.push({op:"move",data:[o[1][0],o[1][1]]}),s.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[2][0],o[2][1]]})):i===2&&s.push(...Rt(o[0][0],o[0][1],o[1][0],o[1][1],t,!0,!0));return s}function fi(o,e,t,i,s,r,n,a){let d=a.roughness===0,h=[],c=[];if(d){o=o/4,c.push([e+i*Math.cos(-o),t+s*Math.sin(-o)]);for(let p=0;p<=Math.PI*2;p=p+o){let g=[e+i*Math.cos(p),t+s*Math.sin(p)];h.push(g),c.push(g)}c.push([e+i*Math.cos(0),t+s*Math.sin(0)]),c.push([e+i*Math.cos(o),t+s*Math.sin(o)])}else{let p=k(.5,a)-Math.PI/2;c.push([k(r,a)+e+.9*i*Math.cos(p-o),k(r,a)+t+.9*s*Math.sin(p-o)]);let g=Math.PI*2+p-.01;for(let _=p;_<g;_=_+o){let j=[k(r,a)+e+i*Math.cos(_),k(r,a)+t+s*Math.sin(_)];h.push(j),c.push(j)}c.push([k(r,a)+e+i*Math.cos(p+Math.PI*2+n*.5),k(r,a)+t+s*Math.sin(p+Math.PI*2+n*.5)]),c.push([k(r,a)+e+.98*i*Math.cos(p+n),k(r,a)+t+.98*s*Math.sin(p+n)]),c.push([k(r,a)+e+.9*i*Math.cos(p+n*.5),k(r,a)+t+.9*s*Math.sin(p+n*.5)])}return[c,h]}var Di={randOffset(o,e){return o},randOffsetWithRange(o,e,t){return(o+e)/2},ellipse(o,e,t,i,s){return Mt(o,e,t,i,s)},doubleLineOps(o,e,t,i,s){return gi(o,e,t,i,s)}};function ae(o){return{maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:o}}function Ui(o,e){let t="";for(let i of o.ops){let s=i.data;switch(i.op){case"move":if(e&&t)break;t+=`M${s[0]} ${s[1]} `;break;case"bcurveTo":t+=`C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;break;case"lineTo":t+=`L${s[0]} ${s[1]} `;break}}return t.trim()}function N(o,e){let t=document.createElementNS("http://www.w3.org/2000/svg",o);if(e)for(let i in e)t.setAttributeNS(null,i,e[i]);return t}function $e(o,e,t=!1){let i=N("path",{d:Ui(o,t)});return e&&e.appendChild(i),i}function x(o,e,t,i,s,r){return $e(mi(e+2,t+2,i-4,s-4,ae(r)),o)}function w(o,e,t,i,s,r){return $e($t(e,t,i,s,ae(r)),o)}function bi(o,e,t){return $e(St(e,ae(t)),o,!0)}function C(o,e,t,i,s,r){return i=Math.max(i>10?i-4:i-1,1),s=Math.max(s>10?s-4:s-1,1),$e(Mt(e,t,i,s,ae(r)),o)}function X(o,e){let i=new Re(Di).fillPolygon(o,ae(e));return $e(i,null)}function le(o,e,t,i,s){let r=ae(s),n=Ot(t,i,r),a=[],d=0;for(;d<=Math.PI*2;)a.push([o+n.rx*Math.cos(d),e+n.ry*Math.sin(d)]),d+=n.increment;return X(a,s)}var qe=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Ve=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Se=class extends v{constructor(){super(),this.elevation=1,this.disabled=!1,this.roAttached=!1,window.ResizeObserver&&(this.ro=new window.ResizeObserver(()=>{this.svg&&this.wiredRender(!0)}))}static get styles(){return[b,u`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `]}render(){return f`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}focus(){this.button?this.button.focus():super.focus()}canvasSize(){if(this.button){let e=this.button.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5),i=e.width+(t-1)*2,s=e.height+(t-1)*2;return[i,s]}return this.lastSize}draw(e,t){let i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-(i-1)*2,height:t[1]-(i-1)*2};x(e,0,0,s.width,s.height,this.seed);for(let r=1;r<i;r++)w(e,r*2,s.height+r*2,s.width+r*2,s.height+r*2,this.seed).style.opacity=`${(75-r*10)/100}`,w(e,s.width+r*2,s.height+r*2,s.width+r*2,r*2,this.seed).style.opacity=`${(75-r*10)/100}`,w(e,r*2,s.height+r*2,s.width+r*2,s.height+r*2,this.seed).style.opacity=`${(75-r*10)/100}`,w(e,s.width+r*2,s.height+r*2,s.width+r*2,r*2,this.seed).style.opacity=`${(75-r*10)/100}`}updated(){super.updated(),this.roAttached||this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.button&&this.ro&&(this.ro.observe(this.button),this.roAttached=!0)}detachResizeListener(){this.button&&this.ro&&this.ro.unobserve(this.button),this.roAttached=!1}};qe([l({type:Number}),Ve("design:type",Object)],Se.prototype,"elevation",void 0);qe([l({type:Boolean,reflect:!0}),Ve("design:type",Object)],Se.prototype,"disabled",void 0);qe([y("button"),Ve("design:type",HTMLButtonElement)],Se.prototype,"button",void 0);Se=qe([m("wired-button"),Ve("design:paramtypes",[])],Se);var At=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Ct=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},he=class extends v{constructor(){super(),this.elevation=1,this.roAttached=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
        path.cardFill {
          stroke-width: 3.5;
          stroke: var(--wired-card-background-fill);
        }
        path {
          stroke: var(--wired-card-background-fill, currentColor);
        }
      `]}render(){return f`
    <div id="overlay"><svg></svg></div>
    <div style="position: relative;">
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    `}updated(e){let t=e.has("fill");this.wiredRender(t),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.resizeObserver?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0})),this.roAttached=!0)}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler),this.roAttached=!1}canvasSize(){let e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5),i=e.width+(t-1)*2,s=e.height+(t-1)*2;return[i,s]}draw(e,t){let i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-(i-1)*2,height:t[1]-(i-1)*2};if(this.fill&&this.fill.trim()){let r=X([[2,2],[s.width-4,2],[s.width-2,s.height-4],[2,s.height-4]],this.seed);r.classList.add("cardFill"),e.style.setProperty("--wired-card-background-fill",this.fill.trim()),e.appendChild(r)}x(e,2,2,s.width-4,s.height-4,this.seed);for(let r=1;r<i;r++)w(e,r*2,s.height-4+r*2,s.width-4+r*2,s.height-4+r*2,this.seed).style.opacity=`${(85-r*10)/100}`,w(e,s.width-4+r*2,s.height-4+r*2,s.width-4+r*2,r*2,this.seed).style.opacity=`${(85-r*10)/100}`,w(e,r*2,s.height-4+r*2,s.width-4+r*2,s.height-4+r*2,this.seed).style.opacity=`${(85-r*10)/100}`,w(e,s.width-4+r*2,s.height-4+r*2,s.width-4+r*2,r*2,this.seed).style.opacity=`${(85-r*10)/100}`}};At([l({type:Number}),Ct("design:type",Object)],he.prototype,"elevation",void 0);At([l({type:String}),Ct("design:type",String)],he.prototype,"fill",void 0);he=At([m("wired-card"),Ct("design:paramtypes",[])],he);var Me=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Fe=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},de=class extends v{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[b,u`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-checkbox-icon-color, currentColor);
        stroke-width: var(--wired-checkbox-default-swidth, 0.7);
      }
      g path {
        stroke-width: 2.5;
      }
      #container.focused {
        --wired-checkbox-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return f`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),this.fire("change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){x(e,0,0,t[0],t[1],this.seed),this.svgCheck=N("g"),e.appendChild(this.svgCheck),w(this.svgCheck,t[0]*.3,t[1]*.4,t[0]*.5,t[1]*.7,this.seed),w(this.svgCheck,t[0]*.5,t[1]*.7,t[0]+5,-5,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};Me([l({type:Boolean}),Fe("design:type",Object)],de.prototype,"checked",void 0);Me([l({type:Boolean,reflect:!0}),Fe("design:type",Object)],de.prototype,"disabled",void 0);Me([di(),Fe("design:type",Object)],de.prototype,"focused",void 0);Me([y("input"),Fe("design:type",HTMLInputElement)],de.prototype,"input",void 0);de=Me([m("wired-checkbox")],de);var Ge=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Et=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Oe=class extends v{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return[b,u`
      :host {
        display: inline-block;
        font-size: 14px;
        text-align: left;
      }
      button {
        cursor: pointer;
        outline: none;
        overflow: hidden;
        color: inherit;
        user-select: none;
        position: relative;
        font-family: inherit;
        text-align: inherit;
        font-size: inherit;
        letter-spacing: 1.25px;
        padding: 1px 10px;
        min-height: 36px;
        text-transform: inherit;
        background: none;
        border: none;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
      }
      button.selected {
        color: var(--wired-item-selected-color, #fff);
      }
      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0;
      }
      button span {
        display: inline-block;
        transition: transform 0.2s ease;
        position: relative;
      }
      button:active span {
        transform: scale(1.02);
      }
      #overlay {
        display: none;
      }
      button.selected #overlay {
        display: block;
      }
      svg path {
        stroke: var(--wired-item-selected-bg, #000);
        stroke-width: 2.75;
        fill: transparent;
        transition: transform 0.05s ease;
      }
      @media (hover: hover) {
        button:hover::before {
          opacity: 0.05;
        }
      }
      `]}render(){return f`
    <button class="${this.selected?"selected":""}">
      <div id="overlay"><svg></svg></div>
      <span><slot></slot></span>
    </button>`}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){let i=X([[0,0],[t[0],0],[t[0],t[1]],[0,t[1]]],this.seed);e.appendChild(i)}};Ge([l(),Et("design:type",Object)],Oe.prototype,"value",void 0);Ge([l(),Et("design:type",Object)],Oe.prototype,"name",void 0);Ge([l({type:Boolean}),Et("design:type",Object)],Oe.prototype,"selected",void 0);Oe=Ge([m("wired-item")],Oe);var ce=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Ae=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},J=class extends O{constructor(){super(...arguments),this.disabled=!1,this.seed=ci(),this.cardShowing=!1,this.itemNodes=[]}static get styles(){return u`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        outline: none;
        opacity: 0;
      }
    
      :host(.wired-disabled) {
        opacity: 0.5 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.02);
      }
      
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
    
      #container {
        white-space: nowrap;
        position: relative;
      }
    
      .inline {
        display: inline-block;
        vertical-align: top
      }
    
      #textPanel {
        min-width: 90px;
        min-height: 18px;
        padding: 8px;
      }
    
      #dropPanel {
        width: 34px;
        cursor: pointer;
      }
    
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    
      svg {
        display: block;
      }
    
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
      }
    
      #card {
        display: block;
        position: absolute;
        background: var(--wired-combo-popup-bg, white);
        z-index: 1;
        box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
        padding: 8px;
      }
  
      ::slotted(wired-item) {
        display: block;
      }
    `}render(){return f`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}" style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break;case 27:e.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:e.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:e.preventDefault(),this.cardShowing||this.setCardShowing(!0);break}})}updated(e){e.has("disabled")&&this.refreshDisabledState();let t=this.svg;for(;t.hasChildNodes();)t.removeChild(t.lastChild);let i=this.shadowRoot.getElementById("container").getBoundingClientRect();t.setAttribute("width",`${i.width}`),t.setAttribute("height",`${i.height}`);let s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",x(t,0,0,s.width,s.height,this.seed);let r=s.width-4;x(t,r,0,34,s.height,this.seed);let n=Math.max(0,Math.abs((s.height-24)/2)),a=bi(t,[[r+8,5+n],[r+26,5+n],[r+17,n+Math.min(s.height,18)]],this.seed);if(a.style.fill="currentColor",a.style.pointerEvents=this.disabled?"none":"auto",a.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];let d=this.shadowRoot.getElementById("slot").assignedNodes();if(d&&d.length)for(let h=0;h<d.length;h++){let c=d[h];c.tagName==="WIRED-ITEM"&&(c.setAttribute("role","option"),this.itemNodes.push(c))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));let t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let i=null;for(let s=0;s<t.length;s++){let r=t[s];if(r.tagName==="WIRED-ITEM"){let n=r.value||r.getAttribute("value")||"";if(this.selected&&n===this.selected){i=r;break}}}this.lastSelectedItem=i||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),i?this.value={value:i.value||"",text:i.textContent||""}:this.value=void 0}}setCardShowing(e){this.card&&(this.cardShowing=e,this.card.style.display=e?"":"none",e&&setTimeout(()=>{this.shadowRoot.getElementById("slot").assignedNodes().filter(i=>i.nodeType===Node.ELEMENT_NODE).forEach(i=>{let s=i;s.requestUpdate&&s.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`))}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){_e(this,"selected",{selected:this.selected})}selectPrevious(){let e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:t===0?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){let e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(e){e.stopPropagation(),this.setCardShowing(!this.cardShowing)}};ce([l({type:Object}),Ae("design:type",Object)],J.prototype,"value",void 0);ce([l({type:String,reflect:!0}),Ae("design:type",String)],J.prototype,"selected",void 0);ce([l({type:Boolean,reflect:!0}),Ae("design:type",Object)],J.prototype,"disabled",void 0);ce([y("svg"),Ae("design:type",SVGSVGElement)],J.prototype,"svg",void 0);ce([y("#card"),Ae("design:type",HTMLDivElement)],J.prototype,"card",void 0);J=ce([m("wired-combo")],J);var Ze=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Pt=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Ce=class extends O{constructor(){super(...arguments),this.elevation=5,this.open=!1}static get styles(){return u`
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: var(--wired-dialog-z-index, 100);
      }
      #container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      #overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(150px);
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      wired-card {
        display: inline-block;
        background: white;
        text-align: left;
      }

      :host([open]) #container {
        pointer-events: auto;
      }
      :host([open]) #container::before {
        opacity: 1;
      }
      :host([open]) #overlay {
        opacity: 1;
        transform: none;
      }
    `}render(){return f`
    <div id="container">
      <div id="overlay" class="vertical layout">
        <div class="flex"></div>
        <div style="text-align: center; padding: 5px;">
          <wired-card .elevation="${this.elevation}"><slot></slot></wired-card>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `}updated(){this.card&&this.card.wiredRender(!0)}};Ze([l({type:Number}),Pt("design:type",Object)],Ce.prototype,"elevation",void 0);Ze([l({type:Boolean,reflect:!0}),Pt("design:type",Object)],Ce.prototype,"open",void 0);Ze([y("wired-card"),Pt("design:type",he)],Ce.prototype,"card",void 0);Ce=Ze([m("wired-dialog")],Ce);var yi=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},qi=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},zt=class extends v{constructor(){super(...arguments),this.elevation=1,this.roAttached=!1}static get styles(){return[b,u`
        :host {
          display: block;
          position: relative;
        }
      `]}render(){return f`<svg></svg>`}canvasSize(){let e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,t*6]}draw(e,t){let i=Math.min(Math.max(1,this.elevation),5);for(let s=0;s<i;s++)w(e,0,s*6+3,t[0],s*6+3,this.seed)}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.resizeObserver?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0})),this.roAttached=!0)}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler),this.roAttached=!1}};yi([l({type:Number}),qi("design:type",Object)],zt.prototype,"elevation",void 0);zt=yi([m("wired-divider")],zt);var jt=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},wi=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Ke=class extends v{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[b,u`
        :host {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 16px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.85;
        }
        path {
          stroke: var(--wired-fab-bg-color, #018786);
          stroke-width: 3;
          fill: transparent;
        }

        button:focus ::slotted(*) {
          opacity: 1;
        }
        button:active ::slotted(*) {
          opacity: 1;
          transform: scale(1.15);
        }
      `]}render(){return f`
    <button ?disabled="${this.disabled}">
      <div id="overlay">
        <svg></svg>
      </div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </button>
    `}canvasSize(){if(this.button){let e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){let i=Math.min(t[0],t[1]),s=le(i/2,i/2,i,i,this.seed);e.appendChild(s)}};jt([l({type:Boolean,reflect:!0}),wi("design:type",Object)],Ke.prototype,"disabled",void 0);jt([y("button"),wi("design:type",HTMLButtonElement)],Ke.prototype,"button",void 0);Ke=jt([m("wired-fab")],Ke);var Lt=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},xi=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Qe=class extends v{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[b,u`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
        }
      `]}render(){return f`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}canvasSize(){if(this.button){let e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){let i=Math.min(t[0],t[1]);e.setAttribute("width",`${i}`),e.setAttribute("height",`${i}`),C(e,i/2,i/2,i,i,this.seed)}};Lt([l({type:Boolean,reflect:!0}),xi("design:type",Object)],Qe.prototype,"disabled",void 0);Lt([y("button"),xi("design:type",HTMLButtonElement)],Qe.prototype,"button",void 0);Qe=Lt([m("wired-icon-button")],Qe);var It=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Bt=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Vi="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",Ye=class extends v{constructor(){super(),this.elevation=1,this.src=Vi,this.roAttached=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px;
        }
        img {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
      `]}render(){return f`
    <img src="${this.src}">
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0})),this.roAttached=!0)}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler),this.roAttached=!1}canvasSize(){let e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5),i=e.width+(t-1)*2,s=e.height+(t-1)*2;return[i,s]}draw(e,t){let i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-(i-1)*2,height:t[1]-(i-1)*2};x(e,2,2,s.width-4,s.height-4,this.seed);for(let r=1;r<i;r++)w(e,r*2,s.height-4+r*2,s.width-4+r*2,s.height-4+r*2,this.seed).style.opacity=`${(85-r*10)/100}`,w(e,s.width-4+r*2,s.height-4+r*2,s.width-4+r*2,r*2,this.seed).style.opacity=`${(85-r*10)/100}`,w(e,r*2,s.height-4+r*2,s.width-4+r*2,s.height-4+r*2,this.seed).style.opacity=`${(85-r*10)/100}`,w(e,s.width-4+r*2,s.height-4+r*2,s.width-4+r*2,r*2,this.seed).style.opacity=`${(85-r*10)/100}`}};It([l({type:Number}),Bt("design:type",Object)],Ye.prototype,"elevation",void 0);It([l({type:String}),Bt("design:type",String)],Ye.prototype,"src",void 0);Ye=It([m("wired-image"),Bt("design:paramtypes",[])],Ye);var S=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},M=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},R=class extends v{constructor(){super(),this.disabled=!1,this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.required=!1,this.autofocus=!1,this.readonly=!1,this.roAttached=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender(!0)}))}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `]}render(){return f`
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `}get input(){return this.textInput}get value(){let e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){let t=this.input;if(t){t.value=e;return}}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,2,2,t[0]-2,t[1]-2,this.seed)}refire(e){e.stopPropagation(),this.fire(e.type,{sourceEvent:e})}focus(){this.textInput?this.textInput.focus():super.focus()}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.textInput&&this.resizeObserver&&this.resizeObserver.observe(this.textInput),this.roAttached=!0)}detachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.unobserve(this.textInput),this.roAttached=!1}};S([l({type:Boolean,reflect:!0}),M("design:type",Object)],R.prototype,"disabled",void 0);S([l({type:String}),M("design:type",Object)],R.prototype,"placeholder",void 0);S([l({type:String}),M("design:type",String)],R.prototype,"name",void 0);S([l({type:String}),M("design:type",String)],R.prototype,"min",void 0);S([l({type:String}),M("design:type",String)],R.prototype,"max",void 0);S([l({type:String}),M("design:type",String)],R.prototype,"step",void 0);S([l({type:String}),M("design:type",Object)],R.prototype,"type",void 0);S([l({type:String}),M("design:type",Object)],R.prototype,"autocomplete",void 0);S([l({type:String}),M("design:type",Object)],R.prototype,"autocapitalize",void 0);S([l({type:String}),M("design:type",Object)],R.prototype,"autocorrect",void 0);S([l({type:Boolean}),M("design:type",Object)],R.prototype,"required",void 0);S([l({type:Boolean}),M("design:type",Object)],R.prototype,"autofocus",void 0);S([l({type:Boolean}),M("design:type",Object)],R.prototype,"readonly",void 0);S([l({type:Number}),M("design:type",Number)],R.prototype,"minlength",void 0);S([l({type:Number}),M("design:type",Number)],R.prototype,"maxlength",void 0);S([l({type:Number}),M("design:type",Number)],R.prototype,"size",void 0);S([y("input"),M("design:type",HTMLInputElement)],R.prototype,"textInput",void 0);R=S([m("wired-input"),M("design:paramtypes",[])],R);var Ee=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Xe=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},pe=class extends v{constructor(){super(...arguments),this.elevation=1}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
        }
        a, a:hover, a:visited {
          color: inherit;
          outline: none;
          display: inline-block;
          white-space: nowrap;
          text-decoration: none;
          border: none;
        }
        path {
          stroke: var(--wired-link-decoration-color, blue);
          stroke-opacity: 0.45;
        }
        a:focus path {
          stroke-opacity: 1;
        }
      `]}render(){return f`
    <a href="${this.href}" target="${this.target||""}">
      <slot></slot>
      <div id="overlay"><svg></svg></div>
    </a>
    `}focus(){this.anchor?this.anchor.focus():super.focus()}canvasSize(){if(this.anchor){let e=this.anchor.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5),i=e.width,s=e.height+(t-1)*2;return[i,s]}return this.lastSize}draw(e,t){let i=Math.min(Math.max(1,this.elevation),5),s={width:t[0],height:t[1]-(i-1)*2};for(let r=0;r<i;r++)w(e,0,s.height+r*2-2,s.width,s.height+r*2-2,this.seed),w(e,0,s.height+r*2-2,s.width,s.height+r*2-2,this.seed)}};Ee([l({type:Number}),Xe("design:type",Object)],pe.prototype,"elevation",void 0);Ee([l({type:String}),Xe("design:type",String)],pe.prototype,"href",void 0);Ee([l({type:String}),Xe("design:type",String)],pe.prototype,"target",void 0);Ee([y("a"),Xe("design:type",HTMLAnchorElement)],pe.prototype,"anchor",void 0);pe=Ee([m("wired-link")],pe);var Je=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Nt=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Pe=class extends v{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return[b,u`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        padding: 5px;
        outline: none;
      }
      :host(:focus) path {
        stroke-width: 1.5;
      }
      ::slotted(wired-item) {
        display: block;
      }
      :host(.wired-horizontal) ::slotted(wired-item) {
        display: inline-block;
      }
      `]}render(){return f`
    <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
    <div id="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break}})}updated(){if(super.updated(),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];let e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){let i=e[t];i.tagName==="WIRED-ITEM"&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));let t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let i=null;for(let s=0;s<t.length;s++){let r=t[s];if(r.tagName==="WIRED-ITEM"){let n=r.value||"";if(this.selected&&n===this.selected){i=r;break}}}this.lastSelectedItem=i||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),i?this.value={value:i.value||"",text:i.textContent||""}:this.value=void 0}}fireSelected(){this.fire("selected",{selected:this.selected})}selectPrevious(){let e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:t===0?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){let e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,0,0,t[0],t[1],this.seed)}};Je([l({type:Object}),Nt("design:type",Object)],Pe.prototype,"value",void 0);Je([l({type:String}),Nt("design:type",String)],Pe.prototype,"selected",void 0);Je([l({type:Boolean}),Nt("design:type",Object)],Pe.prototype,"horizontal",void 0);Pe=Je([m("wired-listbox")],Pe);var ze=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},et=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},q=class extends v{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return[b,u`
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        height: 42px;
        font-family: sans-serif;
      }
      .labelContainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progressLabel {
        color: var(--wired-progress-label-color, #000);
        font-size: var(--wired-progress-font-size, 14px);
        background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      path.progbox {
        stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
        stroke-width: 2.75;
        fill: none;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
      `]}render(){return f`
    <div id="overlay" class="overlay">
      <svg></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `}getProgressLabel(){return this.percentage?this.max===this.min?"%":Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%":""+this.value}wiredRender(e=!1){super.wiredRender(e),this.refreshProgressFill()}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,2,2,t[0]-2,t[1]-2,this.seed)}refreshProgressFill(){if(this.progBox&&(this.progBox.parentElement&&this.progBox.parentElement.removeChild(this.progBox),this.progBox=void 0),this.svg){let e=0,t=this.getBoundingClientRect();if(this.max>this.min){e=(this.value-this.min)/(this.max-this.min);let i=t.width*Math.max(0,Math.min(e,100));this.progBox=X([[0,0],[i,0],[i,t.height],[0,t.height]],this.seed),this.svg.appendChild(this.progBox),this.progBox.classList.add("progbox")}}}};ze([l({type:Number}),et("design:type",Object)],q.prototype,"value",void 0);ze([l({type:Number}),et("design:type",Object)],q.prototype,"min",void 0);ze([l({type:Number}),et("design:type",Object)],q.prototype,"max",void 0);ze([l({type:Boolean}),et("design:type",Object)],q.prototype,"percentage",void 0);q=ze([m("wired-progress")],q);var ue=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},je=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},ee=class extends v{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[b,u`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-radio-icon-color, currentColor);
        stroke-width: var(--wired-radio-default-swidth, 0.7);
      }
      g path {
        stroke-width: 0;
        fill: var(--wired-radio-icon-color, currentColor);
      }
      #container.focused {
        --wired-radio-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return f`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),this.fire("change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){C(e,t[0]/2,t[1]/2,t[0],t[1],this.seed),this.svgCheck=N("g"),e.appendChild(this.svgCheck);let i=Math.max(t[0]*.6,5),s=Math.max(t[1]*.6,5);C(this.svgCheck,t[0]/2,t[1]/2,i,s,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};ue([l({type:Boolean}),je("design:type",Object)],ee.prototype,"checked",void 0);ue([l({type:Boolean,reflect:!0}),je("design:type",Object)],ee.prototype,"disabled",void 0);ue([l({type:String}),je("design:type",String)],ee.prototype,"name",void 0);ue([l(),je("design:type",Object)],ee.prototype,"focused",void 0);ue([y("input"),je("design:type",HTMLInputElement)],ee.prototype,"input",void 0);ee=ue([m("wired-radio")],ee);var _i=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Fi=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Tt=class extends O{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return u`
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `}render(){return f`<slot id="slot" @slotchange="${this.slotChange}"></slot>`}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",this.checkListener)}handleChecked(e){let t=e.detail.checked,i=e.target,s=i.name||"";t?(this.selected=t&&s||"",this.fireSelected()):i.checked=!0}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break}})}updated(){let t=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],t&&t.length)for(let i=0;i<t.length;i++){let s=t[i];if(s.tagName==="WIRED-RADIO"){this.radioNodes.push(s);let r=s.name||"";this.selected&&r===this.selected?s.checked=!0:s.checked=!1}}}selectPrevious(){let e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let s=0;s<e.length;s++)if(e[s].name===this.selected){i=s;break}i<0?t=e[0]:(i--,i<0&&(i=e.length-1),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}selectNext(){let e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let s=0;s<e.length;s++)if(e[s].name===this.selected){i=s;break}i<0?t=e[0]:(i++,i>=e.length&&(i=0),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}fireSelected(){_e(this,"selected",{selected:this.selected})}};_i([l({type:String}),Fi("design:type",String)],Tt.prototype,"selected",void 0);Tt=_i([m("wired-radio-group")],Tt);var te=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},fe=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},V=class extends v{constructor(){super(...arguments),this.disabled=!1,this.placeholder="",this.autocomplete="",this.autocorrect="",this.autofocus=!1}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px 40px 10px 5px;
          font-family: sans-serif;
          width: 180px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        
        input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
        input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        .thicker path {
          stroke-width: 1.5;
        }

        button {
          position: absolute;
          top: 0;
          right: 2px;
          width: 32px;
          height: 100%;
          box-sizing: border-box;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          opacity: 0;
        }
      `]}render(){return f`
    <input type="search" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" 
      autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    <button @click="${()=>this.value=""}"></button>
    `}get input(){return this.textInput}get value(){let e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){let t=this.input;t&&(t.value=e),this.refreshIconState()}else this.pendingValue=e}wiredRender(e=!1){super.wiredRender(e),this.refreshIconState()}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,2,2,t[0]-2,t[1]-2,this.seed),this.searchIcon=N("g"),this.searchIcon.classList.add("thicker"),e.appendChild(this.searchIcon),C(this.searchIcon,t[0]-30,(t[1]-30)/2+10,20,20,this.seed),w(this.searchIcon,t[0]-10,(t[1]-30)/2+30,t[0]-25,(t[1]-30)/2+15,this.seed),this.closeIcon=N("g"),this.closeIcon.classList.add("thicker"),e.appendChild(this.closeIcon),w(this.closeIcon,t[0]-33,(t[1]-30)/2+2,t[0]-7,(t[1]-30)/2+28,this.seed),w(this.closeIcon,t[0]-7,(t[1]-30)/2+2,t[0]-33,(t[1]-30)/2+28,this.seed)}refreshIconState(){this.searchIcon&&this.closeIcon&&(this.searchIcon.style.display=this.value.trim()?"none":"",this.closeIcon.style.display=this.value.trim()?"":"none")}refire(e){this.refreshIconState(),e.stopPropagation(),this.fire(e.type,{sourceEvent:e})}};te([l({type:Boolean,reflect:!0}),fe("design:type",Object)],V.prototype,"disabled",void 0);te([l({type:String}),fe("design:type",Object)],V.prototype,"placeholder",void 0);te([l({type:String}),fe("design:type",Object)],V.prototype,"autocomplete",void 0);te([l({type:String}),fe("design:type",Object)],V.prototype,"autocorrect",void 0);te([l({type:Boolean}),fe("design:type",Object)],V.prototype,"autofocus",void 0);te([y("input"),fe("design:type",HTMLInputElement)],V.prototype,"textInput",void 0);V=te([m("wired-search-input")],V);var me=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Le=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},H=class extends v{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.disabled=!1,this.canvasWidth=300}static get styles(){return[b,u`
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `]}get value(){return this.input?+this.input.value:this.min}set value(e){this.input?this.input.value=`${e}`:this.pendingValue=e,this.updateThumbPosition()}firstUpdated(){this.value=this.pendingValue||+(this.getAttribute("value")||this.value||this.min),delete this.pendingValue}render(){return f`
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}onInput(e){e.stopPropagation(),this.updateThumbPosition(),this.input&&this.fire("change",{value:+this.input.value})}wiredRender(e=!1){super.wiredRender(e),this.updateThumbPosition()}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){this.canvasWidth=t[0];let i=Math.round(t[1]/2);w(e,0,i,t[0],i,this.seed).classList.add("bar"),this.knob=C(e,10,i,20,20,this.seed),this.knob.classList.add("knob")}updateThumbPosition(){if(this.input){let e=+this.input.value,t=Math.max(this.step,this.max-this.min),i=(e-this.min)/t;this.knob&&(this.knob.style.transform=`translateX(${i*(this.canvasWidth-20)}px)`)}}};me([l({type:Number}),Le("design:type",Object)],H.prototype,"min",void 0);me([l({type:Number}),Le("design:type",Object)],H.prototype,"max",void 0);me([l({type:Number}),Le("design:type",Object)],H.prototype,"step",void 0);me([l({type:Boolean,reflect:!0}),Le("design:type",Object)],H.prototype,"disabled",void 0);me([y("input"),Le("design:type",HTMLInputElement)],H.prototype,"input",void 0);H=me([m("wired-slider")],H);var Ht=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},ki=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},tt=class extends v{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
        }
        path {
          stroke: currentColor;
          stroke-opacity: 0.65;
          stroke-width: 1.5;
          fill: none;
        }
        .knob {
          stroke-width: 2.8 !important;
          stroke-opacity: 1;
        }
      `]}render(){return f`<svg></svg>`}canvasSize(){return[76,76]}draw(e,t){C(e,t[0]/2,t[1]/2,Math.floor(t[0]*.8),Math.floor(.8*t[1]),this.seed),this.knob=le(0,0,20,20,this.seed),this.knob.classList.add("knob"),e.appendChild(this.knob),this.updateCursor()}updateCursor(){if(this.knob){let e=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${e[0]}px, ${e[1]}px, 0) rotateZ(${Math.round(this.value*360*2)}deg)`}}updated(){super.updated(),this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(e=>this.tick(e))}tick(e){this.spinning?(this.timerstart||(this.timerstart=e),this.value=Math.min(1,(e-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}};Ht([l({type:Boolean}),ki("design:type",Object)],tt.prototype,"spinning",void 0);Ht([l({type:Number}),ki("design:type",Object)],tt.prototype,"duration",void 0);tt=Ht([m("wired-spinner")],tt);var Wt=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Dt=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},it=class extends v{constructor(){super(),this.name="",this.label="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
      `]}render(){return f`
    <div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,2,2,t[0]-4,t[1]-4,this.seed)}};Wt([l({type:String}),Dt("design:type",Object)],it.prototype,"name",void 0);Wt([l({type:String}),Dt("design:type",Object)],it.prototype,"label",void 0);it=Wt([m("wired-tab"),Dt("design:paramtypes",[])],it);var Ut=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},Ri=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},st=class extends O{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return[b,u`
        :host {
          display: block;
          opacity: 1;
        }
        ::slotted(.hidden) {
          display: none !important;
        }
    
        :host ::slotted(.hidden) {
          display: none !important;
        }
        #bar {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
      `]}render(){return f`
    <div id="bar">
      ${this.pages.map(e=>f`
      <wired-item role="tab" .value="${e.name}" .selected="${e.name===this.selected}" ?aria-selected="${e.name===this.selected}"
        @click="${()=>this.selected=e.name}">${e.label||e.name}</wired-item>
      `)}
    </div>
    <div>
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){let e=this.slotElement.assignedNodes();if(e&&e.length){for(let t=0;t<e.length;t++){let i=e[t];if(i.nodeType===Node.ELEMENT_NODE&&i.tagName.toLowerCase()==="wired-tab"){let s=i;this.pages.push(s);let r=s.getAttribute("name")||"";r&&r.trim().split(" ").forEach(n=>{n&&this.pageMap.set(n,s)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break}})}updated(){let e=this.getElement();for(let t=0;t<this.pages.length;t++){let i=this.pages[t];i===e?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=e||void 0,this.current&&this.current.wiredRender&&requestAnimationFrame(()=>requestAnimationFrame(()=>this.current.wiredRender()))}getElement(){let e;return this.selected&&(e=this.pageMap.get(this.selected)),e||(e=this.pages[0]),e||null}selectPrevious(){let e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:t===0?t=e.length-1:t--,this.selected=e[t].name||""}}selectNext(){let e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].name||""}}};Ut([l({type:String}),Ri("design:type",String)],st.prototype,"selected",void 0);Ut([y("slot"),Ri("design:type",HTMLSlotElement)],st.prototype,"slotElement",void 0);st=Ut([m("wired-tabs")],st);var E=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},P=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},A=class extends v{constructor(){super(...arguments),this.disabled=!1,this.rows=2,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          font-family: sans-serif;
          width: 400px;
          outline: none;
          padding: 4px;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        textarea {
          position: relative;
          outline: none;
          border: none;
          resize: none;
          background: inherit;
          color: inherit;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
          text-align: inherit;
          padding: 10px;
          box-sizing: border-box;
        }
      `]}render(){return f`
    <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
      placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
      rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}"
      @change="${this.refire}" @input="${this.refire}"></textarea>
    <div id="overlay">
      <svg></svg>
    </div>
    `}get textarea(){return this.textareaInput}get value(){let e=this.textarea;return e&&e.value||""}set value(e){if(this.shadowRoot){let t=this.textarea;if(t){t.value=e;return}}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,4,4,t[0]-4,t[1]-4,this.seed)}refire(e){e.stopPropagation(),this.fire(e.type,{sourceEvent:e})}};E([l({type:Boolean,reflect:!0}),P("design:type",Object)],A.prototype,"disabled",void 0);E([l({type:Number}),P("design:type",Object)],A.prototype,"rows",void 0);E([l({type:Number}),P("design:type",Object)],A.prototype,"maxrows",void 0);E([l({type:String}),P("design:type",Object)],A.prototype,"autocomplete",void 0);E([l({type:Boolean}),P("design:type",Object)],A.prototype,"autofocus",void 0);E([l({type:String}),P("design:type",Object)],A.prototype,"inputmode",void 0);E([l({type:String}),P("design:type",Object)],A.prototype,"placeholder",void 0);E([l({type:Boolean}),P("design:type",Object)],A.prototype,"required",void 0);E([l({type:Boolean}),P("design:type",Object)],A.prototype,"readonly",void 0);E([l({type:Number}),P("design:type",Number)],A.prototype,"minlength",void 0);E([l({type:Number}),P("design:type",Number)],A.prototype,"maxlength",void 0);E([y("textarea"),P("design:type",HTMLTextAreaElement)],A.prototype,"textareaInput",void 0);A=E([m("wired-textarea")],A);var rt=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},qt=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},Ie=class extends v{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return[b,u`
      :host {
        display: inline-block;
        cursor: pointer;
        position: relative;
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        opacity: 0;
      }
      .knob {
        transition: transform 0.3s ease;
      }
      .knob path {
        stroke-width: 0.7;
      }
      .knob.checked {
        transform: translateX(48px);
      }
      path.knobfill {
        stroke-width: 3 !important;
        fill: transparent;
      }
      .knob.unchecked path.knobfill {
        stroke: var(--wired-toggle-off-color, gray);
      }
      .knob.checked path.knobfill {
        stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
      }
      `]}render(){return f`
    <div style="position: relative;">
      <svg></svg>
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}"  @change="${this.onChange}">
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshKnob()}onChange(){this.checked=this.input.checked,this.refreshKnob(),this.fire("change",{checked:this.checked})}canvasSize(){return[80,34]}draw(e,t){x(e,16,8,t[0]-32,18,this.seed).classList.add("toggle-bar"),this.knob=N("g"),this.knob.classList.add("knob"),e.appendChild(this.knob);let s=le(16,16,32,32,this.seed);s.classList.add("knobfill"),this.knob.appendChild(s),C(this.knob,16,16,32,32,this.seed)}refreshKnob(){if(this.knob){let e=this.knob.classList;this.checked?(e.remove("unchecked"),e.add("checked")):(e.remove("checked"),e.add("unchecked"))}}};rt([l({type:Boolean}),qt("design:type",Object)],Ie.prototype,"checked",void 0);rt([l({type:Boolean,reflect:!0}),qt("design:type",Object)],Ie.prototype,"disabled",void 0);rt([y("input"),qt("design:type",HTMLInputElement)],Ie.prototype,"input",void 0);Ie=rt([m("wired-toggle")],Ie);var L=function(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(n=o[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},I=function(o,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,e)},z=class extends v{constructor(){super(),this.src="",this.autoplay=!1,this.loop=!1,this.muted=!1,this.playsinline=!1,this.playing=!1,this.timeDisplay="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver(()=>{this.svg&&this.wiredRender()}))}static get styles(){return[b,u`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px 3px 68px;
          --wired-progress-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
          --wired-slider-knob-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
        }
        video {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
        #controls {
          position: absolute;
          pointer-events: auto;
          left: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          height: 70px;
        }
        .layout.horizontal {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 5px 10px;
        }
        .flex {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        wired-progress {
          display: block;
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          --wired-progress-label-color: transparent;
          --wired-progress-label-background: transparent;
        }
        wired-icon-button span {
          font-size: 16px;
          line-height: 16px;
          width: 16px;
          height: 16px;
          padding: 0px;
          font-family: sans-serif;
          display: inline-block;
        }
        #timeDisplay {
          padding: 0 20px 0 8px;
          font-size: 13px;
        }
        wired-slider {
          display: block;
          max-width: 200px;
          margin: 0 6px 0 auto;
        }
      `]}render(){return f`
    <video 
      .autoplay="${this.autoplay}"
      .loop="${this.loop}"
      .muted="${this.muted}"
      .playsinline="${this.playsinline}"
      src="${this.src}"
      @play="${()=>this.playing=!0}"
      @pause="${()=>this.playing=!1}"
      @canplay="${this.canPlay}"
      @timeupdate="${this.updateTime}">
    </video>
    <div id="overlay">
      <svg></svg>
    </div>
    <div id="controls">
      <wired-progress></wired-progress>
      <div class="horizontal layout center">
        <wired-icon-button @click="${this.togglePause}">
          <span>${this.playing?"||":"\u25B6"}</span>
        </wired-icon-button>
        <div id="timeDisplay">${this.timeDisplay}</div>
        <div class="flex">
          <wired-slider @change="${this.volumeChange}"></wired-slider>
        </div>
        <div style="width: 24px; height: 24px;">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path style="stroke: none; fill: currentColor;" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>
        </div>
      </div>
    </div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}wiredRender(){super.wiredRender(),this.progressBar&&this.progressBar.wiredRender(!0)}canvasSize(){let e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){x(e,2,2,t[0]-4,t[1]-4,this.seed)}updateTime(){this.video&&this.progressBar&&(this.progressBar.value=this.video.duration?Math.round(this.video.currentTime/this.video.duration*100):0,this.timeDisplay=`${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`)}getTimeDisplay(e){let t=Math.floor(e/60),i=Math.round(e-t*60);return`${t}:${i}`}togglePause(){this.video&&(this.playing?this.video.pause():this.video.play())}volumeChange(){this.video&&this.slider&&(this.video.volume=this.slider.value/100)}canPlay(){this.slider&&this.video&&(this.slider.value=this.video.volume*100)}};L([l({type:String}),I("design:type",Object)],z.prototype,"src",void 0);L([l({type:Boolean}),I("design:type",Object)],z.prototype,"autoplay",void 0);L([l({type:Boolean}),I("design:type",Object)],z.prototype,"loop",void 0);L([l({type:Boolean}),I("design:type",Object)],z.prototype,"muted",void 0);L([l({type:Boolean}),I("design:type",Object)],z.prototype,"playsinline",void 0);L([l(),I("design:type",Object)],z.prototype,"playing",void 0);L([l(),I("design:type",Object)],z.prototype,"timeDisplay",void 0);L([y("wired-progress"),I("design:type",q)],z.prototype,"progressBar",void 0);L([y("wired-slider"),I("design:type",H)],z.prototype,"slider",void 0);L([y("video"),I("design:type",HTMLVideoElement)],z.prototype,"video",void 0);z=L([m("wired-video"),I("design:paramtypes",[])],z);})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
