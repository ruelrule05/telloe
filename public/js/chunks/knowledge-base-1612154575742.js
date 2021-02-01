(self.webpackChunk=self.webpackChunk||[]).push([[257],{5041:(t,e,n)=>{"use strict";n.d(e,{Z:()=>i});var r=n(3645),o=n.n(r)()((function(t){return t[1]}));o.push([t.id,"#knowledgebase{position:absolute;bottom:20px;right:20px;z-index:10}#knowledgebase>div{box-shadow:0 0 .5rem rgba(92,101,112,.35)!important}.knowledgebase-body{width:350px;height:360px}.btn-close{position:absolute;top:5px;right:5px}.topic{text-decoration:none!important}.topic h6{color:#000}.topic svg{opacity:0}.topic:hover h6{text-decoration:underline;color:#5a5adf}.topic:hover svg{opacity:1}",""]);const i=o},3726:function(t,e,n){"use strict";var r;!function(o){if("function"!=typeof i){var i=function(t){return t};i.nonNative=!0}const a=i("plaintext"),s=i("html"),c=i("comment"),l=/<(\w*)>/g,u=/<\/?([^\s\/>]+)/;function f(t,e,n){return p(t=t||"",d(e=e||[],n=n||""))}function d(t,e){return{allowable_tags:t=function(t){let e=new Set;if("string"==typeof t){let n;for(;n=l.exec(t);)e.add(n[1])}else i.nonNative||"function"!=typeof t[i.iterator]?"function"==typeof t.forEach&&t.forEach(e.add,e):e=new Set(t);return e}(t),tag_replacement:e,state:a,tag_buffer:"",depth:0,in_quote_char:""}}function p(t,e){let n=e.allowable_tags,r=e.tag_replacement,o=e.state,i=e.tag_buffer,l=e.depth,u=e.in_quote_char,f="";for(let e=0,d=t.length;e<d;e++){let d=t[e];if(o===a)switch(d){case"<":o=s,i+=d;break;default:f+=d}else if(o===s)switch(d){case"<":if(u)break;l++;break;case">":if(u)break;if(l){l--;break}u="",o=a,i+=">",n.has(v(i))?f+=i:f+=r,i="";break;case'"':case"'":u=d===u?"":u||d,i+=d;break;case"-":"<!-"===i&&(o=c),i+=d;break;case" ":case"\n":if("<"===i){o=a,f+="< ",i="";break}i+=d;break;default:i+=d}else if(o===c)switch(d){case">":"--"==i.slice(-2)&&(o=a),i="";break;default:i+=d}}return e.state=o,e.tag_buffer=i,e.depth=l,e.in_quote_char=u,f}function v(t){let e=u.exec(t);return e?e[1].toLowerCase():null}f.init_streaming_mode=function(t,e){let n=d(t=t||[],e=e||"");return function(t){return p(t||"",n)}},void 0===(r=function(){return f}.call(e,n,e,t))||(t.exports=r)}()},2892:function(t,e){!function(t){"use strict";function e(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}}(t,e)||function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){var r,o,i,a,s=null,c="number"==typeof e?e:(o=(r=n(String(e).split(/(ms|s)/i),2))[0],a=void 0===(i=r[1])?"ms":i,Number(o)*{ms:1,s:1e3}[a]),l=function(){for(var e=this,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];var i=function(){s=null,t.apply(e,r)};clearTimeout(s),(s=setTimeout(i,c))||t.apply(this,r)};return l.cancel=function(){clearTimeout(s),s=null},l}function i(t){return t.map((function(t){return t.toLowerCase()}))}function a(t,e){var n=(t.getNamedItem("debounce-events")||{}).value,r=void 0!==n&&n;return i(r?r.split(","):function(t){return Array.isArray(t)?t:null==t?[]:[t]}(e))}function s(t){return""===t}function c(t,e){return s(t)&&e.cancelonempty}function l(t,e){return"Enter"===t&&(!e.lock||e.unlock)}function u(t,e){return s(t)&&e.fireonempty}function f(t){var e=n(t.split("."),1)[0];return Number(e)>=3?"mounted":"bind"}var d={install:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.lock,i=void 0!==r&&r,s=n.listenTo,d=void 0===s?"keyup":s,p=n.defaultTime,v=void 0===p?"300ms":p,h=n.fireOnEmpty,b=void 0!==h&&h,m=n.cancelOnEmpty,g=void 0!==m&&m;t.directive("debounce",e({},f(t.version),(function(t,e){var n=e.value,r=e.arg,s=void 0===r?v:r,f=e.modifiers,p=Object.assign({fireonempty:b,cancelonempty:g,lock:i},f),h=a(t.attributes,d),m=o((function(t){n(t.target.value,t)}),s);function y(t){c(t.target.value,p)?m.cancel():l(t.key,p)||u(t.target.value,p)?(m.cancel(),n(t.target.value,t)):m(t)}h.forEach((function(e){t.addEventListener(e,y)}))})))}};t.debounce=o,t.default=d,Object.defineProperty(t,"__esModule",{value:!0})}(e)},3196:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>w});var r=n(7757),o=n.n(r);const i={name:"book"};var a=n(1900);const s=(0,a.Z)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M8,3 L8,17 L19,17 L19,3.5 C19,3.22385763 18.7761424,3 18.5,3 L8,3 Z M7,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,17.4998169 C5.41783027,17.1859724 5.93719704,17 6.5,17 L7,17 L7,3 Z M4.15121433,20.3582581 C4.05793442,20.2674293 4,20.1404803 4,20 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L18.5,2 C19.3284271,2 20,2.67157288 20,3.5 L20,20.5 C20,21.3284271 19.3284271,22 18.5,22 L6.5,22 C5.42082093,22 4.50134959,21.3162099 4.15121433,20.3582581 L4.15121433,20.3582581 Z M19,18 L6.5,18 C5.67157288,18 5,18.6715729 5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L18.5,21 C18.7761424,21 19,20.7761424 19,20.5 L19,18 Z M10.5,10 C10.2238576,10 10,9.77614237 10,9.5 C10,9.22385763 10.2238576,9 10.5,9 L16.5,9 C16.7761424,9 17,9.22385763 17,9.5 C17,9.77614237 16.7761424,10 16.5,10 L10.5,10 Z M10.5,8 C10.2238576,8 10,7.77614237 10,7.5 C10,7.22385763 10.2238576,7 10.5,7 L14.5,7 C14.7761424,7 15,7.22385763 15,7.5 C15,7.77614237 14.7761424,8 14.5,8 L10.5,8 Z"}})])}),[],!1,null,null,null).exports;var c=n(9591),l=n(7954),u=n(538),f=n(2892),d=n.n(f);function p(t,e,n,r,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,o)}u.default.use(d(),{listenTo:"input"});var v=n(3726);const h={components:{BookIcon:s,CloseIcon:c.Z,ShortcutIcon:l.Z},data:function(){return{open:!1,loading:!0,topics:[],search:""}},watch:{open:function(t){t||(this.search="",this.getTopics())}},created:function(){this.getTopics()},methods:{stripTags:function(t){return v(t)},getTopics:function(){var t,e=this;return(t=o().mark((function t(){var n,r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,fetch("https://docs.telloe.com/wp-json/wp/v2/docs?search=".concat(e.search));case 3:return n=t.sent,t.next=6,n.json();case 6:r=t.sent,e.topics=r,e.loading=!1;case 9:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){p(i,r,o,a,s,"next",t)}function s(t){p(i,r,o,a,s,"throw",t)}a(void 0)}))})()}}};var b=n(3379),m=n.n(b),g=n(5041),y={insert:"head",singleton:!1};m()(g.Z,y);g.Z.locals;const w=(0,a.Z)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"knowledgebase"}},[t.open?n("div",{staticClass:"rounded bg-white p-3 knowledgebase-body d-flex flex-column"},[n("div",[n("h5",{staticClass:"font-heading mb-2"},[t._v("\n\t\t\t\tKnowledgebase Portal\n\t\t\t")]),t._v(" "),n("button",{staticClass:"btn btn-sm btn-white badge-pill line-height-0 p-0 ml-aut shadow-none btn-close",attrs:{type:"button"},on:{click:function(e){t.open=!1}}},[n("close-icon")],1),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"},{name:"debounce",rawName:"v-debounce:400ms",value:t.getTopics,expression:"getTopics",arg:"400ms"}],staticClass:"form-control shadow-none border",attrs:{type:"text",placeholder:"Search for topics..."},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"flex-grow-1 position-relative"},[t.loading?n("div",{staticClass:"position-absolute-center"},[n("div",{staticClass:"spinner-border spinner-border-sm text-primary"})]):t.topics.length>0?t._l(t.topics,(function(e,r){return n("a",{key:r,staticClass:"d-block pt-3 topic",attrs:{target:"_blank",href:e.link}},[n("div",{staticClass:"d-flex align-items-center"},[n("h6",{staticClass:"font-heading mb-0 text-ellipsis mr-1"},[t._v(t._s(e.title.rendered))]),t._v(" "),n("div",{staticClass:"flex-1 line-height-0"},[n("shortcut-icon",{staticClass:"fill-primary",attrs:{width:"14",height:"14"}})],1)]),t._v(" "),n("p",{staticClass:"text-ellipsis mb-0 text-muted small"},[t._v(t._s(t.stripTags(e.excerpt.rendered)))])])})):n("div",{staticClass:"position-absolute-center text-muted"},[t._v("No topics found.")])],2)]):n("div",{staticClass:"bg-white badge-pill p-1 line-height-0",attrs:{role:"button"},on:{click:function(e){t.open=!0}}},[n("book-icon")],1)])}),[],!1,null,null,null).exports}}]);