(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"+MgP":function(e,t,a){var s=a("DYH9");"string"==typeof s&&(s=[[e.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,i);s.locals&&(e.exports=s.locals)},"375c":function(e,t,a){"use strict";var s={name:"more-h"},i=a("KHd+"),n=Object(i.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"}})])}),[],!1,null,null,null);t.a=n.exports},"4m4z":function(e,t,a){"use strict";var s={components:{CheckmarkIcon:a("vqo1").a},data:function(){return{state:!1}},watch:{value:function(e){this.state=e?1:0},state:function(e){this.$emit("input",e)}},created:function(){this.state=this.value},props:{value:{},label:{type:String}}},i=(a("xkEX"),a("KHd+")),n=Object(i.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"checkbox"},[a("label",{staticClass:"d-flex align-items-center mb-0"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.state)?e._i(e.state,null)>-1:e.state},on:{change:function(t){var a=e.state,s=t.target,i=!!s.checked;if(Array.isArray(a)){var n=e._i(a,null);s.checked?n<0&&(e.state=a.concat([null])):n>-1&&(e.state=a.slice(0,n).concat(a.slice(n+1)))}else e.state=i}}}),e._v(" "),a("span",{staticClass:"cr"},[a("checkmark-icon",{attrs:{fill:"white"}})],1),e._v(" "),a("span",{staticClass:"font-size-base text-body"},[e._v(e._s(e.label))])])])}),[],!1,null,"cc4934b8",null);t.a=n.exports},"5cWj":function(e,t,a){"use strict";var s={props:{value:{type:Boolean,default:!1},activeClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{width:100,state:!1,pressed:0,position:0}},mounted:function(){this.toggle(this.value)},computed:{style:function(){return{transform:"translateX(".concat(this.pos_percentage,")")}},pos_percentage:function(){return"".concat(this.position/this.width*100,"%")},state_class:function(){if(this.state)return this.activeClass+" active"}},watch:{value:function(e){this.toggle(e)},position:function(){this.state=this.position>=50}},methods:{onClick:function(){this.toggle(!this.state),this.emit()},toggle:function(e){this.state=e,this.position=e?100:0},dragging:function(e){var t=(e.clientX-this.$el.offsetLeft)/this.width*100;this.position=t<=0?0:t>=100?100:t},resolvePosition:function(){this.position=this.state?100:0},emit:function(){this.$emit("input",this.state)}}},i=(a("fHoB"),a("KHd+")),n=Object(i.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"toggle",class:e.state_class,attrs:{disabled:e.disabled},on:{click:function(t){return t.target!==t.currentTarget?null:e.onClick(t)}}},[a("div",{staticClass:"draggable",style:e.style})])}),[],!1,null,"22734e3b",null);t.a=n.exports},ARml:function(e,t,a){(t=a("JPst")(!1)).push([e.i,".toggle[data-v-22734e3b]{cursor:pointer;width:40px;height:20px;background:#dee2e6;border-radius:200px;transition:background .6s}.toggle[disabled][data-v-22734e3b]{opacity:.5;pointer-events:none !important}.toggle .draggable[data-v-22734e3b]{pointer-events:none;width:20px;height:20px;background:#fff;border-radius:100%;box-shadow:0 0 5px rgba(0,0,0,.25);transform:translateX(0%);transition:transform .05s ease-in-out}.toggle.active[data-v-22734e3b]{background:#5a5adf;transition:background .6s}",""]),e.exports=t},AZvD:function(e,t,a){(t=a("JPst")(!1)).push([e.i,".dropdown .dropdown-item.active[data-v-101dfe41]{font-weight:600}.dropdown .select_hidden_value[data-v-101dfe41]{position:absolute;z-index:-1}.dropdown .dropdown-caret[data-v-101dfe41]{fill:#adb5bd;transition:all .1s ease-in-out}.dropdown .dropdown-toggle:hover .dropdown-caret[data-v-101dfe41]{fill:#5a5adf}.dropdown.show .dropdown-toggle[data-v-101dfe41]:focus-within{box-shadow:0 0 0 .05rem #5a5adf;border-color:#5a5adf !important}.dropdown.show .dropdown-toggle:focus-within .dropdown-caret[data-v-101dfe41]{fill:#5a5adf}.dropdown .placeholder-body[data-v-101dfe41]:not(:focus)::placeholder{color:#000}.input-searchable[data-v-101dfe41]:not(:focus){cursor:pointer}.visibility-hidden[data-v-101dfe41]{visibility:hidden}.scrollable-menu[data-v-101dfe41]{max-height:300px;overflow-y:auto}",""]),e.exports=t},DYH9:function(e,t,a){(t=a("JPst")(!1)).push([e.i,'.multiline-ellipsis[data-v-1455d167]{overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.service[data-v-1455d167]{transition:all .1s ease-in-out}.service.active[data-v-1455d167]:before{content:"";position:absolute;top:0;left:0;height:100%;width:100%;border-top:solid 1px #5a5adf;border-radius:.5rem;z-index:0}.service-add[data-v-1455d167]{background-color:#f0f2f5;transition:all .1s ease-in-out;border:dashed 1px #adb5bd}.service-add[data-v-1455d167]:hover{background-color:#fff}.btn-add[data-v-1455d167]{border:dashed 1px #adb5bd;transform:none !important}.badge-day[data-v-1455d167]{width:25px;height:25px}.service-day .chevron-down[data-v-1455d167]{fill:#adb5bd;transition:all .1s ease-in-out}.service-day .service-day-heading[aria-expanded=true] svg[data-v-1455d167]{transform:rotate(-180deg);fill:#000}.service-day .service-day-heading:hover svg[data-v-1455d167]{fill:#000}.service-description[data-v-1455d167]{height:34px}.package-buttons[data-v-1455d167]{top:10px;right:10px}',""]),e.exports=t},LjFx:function(e,t,a){(t=a("JPst")(!1)).push([e.i,'.checkbox label[data-v-cc4934b8]{cursor:pointer;line-height:20px}.checkbox label[data-v-cc4934b8]:after{content:"";display:table;clear:both}.checkbox .cr[data-v-cc4934b8]{position:relative;display:inline-block;border:1px solid #ddd;border-radius:.25em;width:1.2em;height:1.2em;float:left;margin-right:.5em;transition:all .1s ease-in-out}.checkbox .cr svg[data-v-cc4934b8]{position:absolute;font-size:.7em;line-height:0;top:50%;left:50%;transform:translate(-50%, -50%);transition:all .1s ease-in-out}.checkbox label input[type=checkbox][data-v-cc4934b8]{display:none}.checkbox label input[type=checkbox]+.cr>svg[data-v-cc4934b8]{opacity:0}.checkbox label input[type=checkbox]:checked+.cr>svg[data-v-cc4934b8]{opacity:1}.checkbox label input[type=checkbox]:checked+.cr[data-v-cc4934b8]{border-color:#5a5adf;background-color:#5a5adf}.checkbox label input[type=checkbox]:disabled+.cr[data-v-cc4934b8]{opacity:.5}',""]),e.exports=t},PW4s:function(e,t,a){"use strict";var s={name:"calendar"},i=a("KHd+"),n=Object(i.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M16,4 L8,4 L8,4.5 C8,4.77614237 7.77614237,5 7.5,5 C7.22385763,5 7,4.77614237 7,4.5 L7,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,8 L20,8 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L17,4 L17,4.5 C17,4.77614237 16.7761424,5 16.5,5 C16.2238576,5 16,4.77614237 16,4.5 L16,4 Z M17,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5073514 C21,19.8880632 19.8807119,21.0073514 18.5,21.0073514 L5.5,21.0073514 C4.11928813,21.0073514 3,19.8880632 3,18.5073514 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L7,3 L7,2.5 C7,2.22385763 7.22385763,2 7.5,2 C7.77614237,2 8,2.22385763 8,2.5 L8,3 L16,3 L16,2.5 C16,2.22385763 16.2238576,2 16.5,2 C16.7761424,2 17,2.22385763 17,2.5 L17,3 Z M20,9 L4,9 L4,18.5073514 C4,19.3357785 4.67157288,20.0073514 5.5,20.0073514 L18.5,20.0073514 C19.3284271,20.0073514 20,19.3357785 20,18.5073514 L20,9 L20,9 Z"}})])}),[],!1,null,null,null);t.a=n.exports},PuPP:function(e,t,a){var s=a("AZvD");"string"==typeof s&&(s=[[e.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,i);s.locals&&(e.exports=s.locals)},"UEn/":function(e,t,a){"use strict";var s=a("4m4z"),i=a("Zha+"),n={components:{VueCheckbox:s.a,ChevronDownIcon:i.a},props:{drop:{type:String,default:"dropdown"},placeholder:{type:String,default:""},options:{type:Array,default:[]},value:{type:[Number,String,Array,Object]},multiple:{type:Boolean,default:!1},searchable:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},button_class:{type:String,default:""},dropdown_class:{type:String,default:""},label:{type:String,default:""},caret:{type:Boolean,default:!0},container_class:{type:String,default:""},suggestion:{type:Boolean,default:!1}},data:function(){return{selected_value:{},search:"",show_no_results:!0,show:!1,focused:!1}},computed:{select_placeholder:function(){var e=this,t=this.placeholder;if(this.selected_value)if(this.multiple){var a=[];this.selected_value.forEach((function(t){var s=e.options.find((function(e){return e.value==t}));s&&a.push(s.text)})),a.length>0&&(t=a.join(", "))}else t=(this.options.find((function(t){return t.value==e.selected_value}))||{}).text||this.placeholder;return t},filtered_options:function(){var e=this;return this.options.filter((function(t){var a=!0;!e.multiple&&e.searchable&&void 0!==e.search&&e.search.trim().length>0&&(t.text.toLowerCase().indexOf(e.search.trim().toLowerCase())<0&&(a=!1));return a}))},toggle_button_class:function(){var e=this.searchable?"cursor-text ":"cursor-pointer ";return e+=this.button_class}},watch:{value:function(e){this.selected_value=e,e||(this.search="")},search:function(e){var t=this;this.suggestion&&(this.selected_value=e,this.$emit("input",this.selected_value)),this.$nextTick((function(){$(t.$refs["dropdown-toggle"]).dropdown("update")}))}},created:function(){this.selected_value=this.value},mounted:function(){var e=this;$(this.$refs.dropdown).on("show.bs.dropdown",(function(){e.$refs["input-searchable"]&&e.$refs["input-searchable"].removeAttribute("readonly"),e.show_no_results=!0,e.suggestion||(e.search=""),e.searchable&&setTimeout((function(){e.$refs["input-searchable"].focus()}))})),$(this.$refs.dropdown).on("hide.bs.dropdown",(function(){e.suggestion?e.search=e.selected_value:e.search=e.selected_value?e.select_placeholder:"",e.$refs["input-searchable"]&&!e.suggestion&&e.$refs["input-searchable"].setAttribute("readonly",!0)})),$(this.$refs.dropdown).on("hidden.bs.dropdown",(function(){e.show_no_results=!1}))},methods:{inputBlurred:function(){var e=this;this.suggestion&&setTimeout((function(){e.focused=!1}),100)},inputFocused:function(e){var t=this;e.relatedTarget&&"submit"==e.relatedTarget.type&&this.$refs["dropdown-toggle"].click(),this.suggestion&&setTimeout((function(){t.focused=!0}),100)},updateValue:function(e){if(this.multiple){this.selected_value=this.selected_value||[];var t=this.selected_value.findIndex((function(t){return t==e.value}));-1==t?this.selected_value.push(e.value):this.selected_value.splice(t,1),this.search=this.placeholder}else this.selected_value=e.value,this.suggestion||(this.search=e.text);this.$emit("change",this.selected_value),this.$emit("input",this.selected_value)}}},o=(a("oqhQ"),a("KHd+")),r=Object(o.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.container_class},[a("div",{ref:"dropdown",staticClass:"dropdown",class:e.drop,attrs:{disabled:e.disabled}},[a("button",{ref:"dropdown-toggle",staticClass:"form-control dropdown-toggle text-left d-inline-flex align-items-center",class:e.toggle_button_class,attrs:{type:"button","data-toggle":"dropdown"}},[e.label?a("span",{staticClass:"text-secondary mr-2"},[e._v(e._s(e.label))]):e._e(),e._v(" "),e.searchable?[a("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],ref:"input-searchable",staticClass:"p-0 form-control shadow-none border-0 outline-0 input-searchable w-100 bg-transparent line-height-1 font-smoothing-auto",attrs:{type:"text",spellcheck:"false",placeholder:e.select_placeholder,"data-required":e.required},domProps:{value:e.search},on:{focus:e.inputFocused,blur:e.inputBlurred,input:function(t){t.target.composing||(e.search=t.target.value)}}})]:[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selected_value,expression:"selected_value"}],staticClass:"select_hidden_value d-none",attrs:{type:"text","data-required":e.required,"data-parent":".dropdown-toggle"},domProps:{value:e.selected_value},on:{focus:e.inputFocused,input:function(t){t.target.composing||(e.selected_value=t.target.value)}}}),e._v(" "),a("div",{staticClass:"text-ellipsis",class:{"text-muted":!e.selected_value||0==e.selected_value.length}},[e._v(e._s(e.select_placeholder))])],e._v(" "),e.caret?a("div",{staticClass:"ml-auto line-height-0"},[a("chevron-down-icon",{staticClass:"ml-2 dropdown-caret",attrs:{width:"8",height:"8",transform:"scale(3)"}})],1):e._e()],2),e._v(" "),a("div",{ref:"dropdown-menu",staticClass:"bg-white dropdown-menu w-100",class:[e.dropdown_class],attrs:{hidden:0==e.filtered_options.length&&e.suggestion}},[a("div",{ref:"scrollable-menu",staticClass:"scrollable-menu"},[0==e.filtered_options.length?a("span",{staticClass:"dropdown-item disabled pl-3 font-weight-light"},[e.show_no_results?a("span",{staticClass:"text-muted"},[e._v("No results found")]):e._e()]):e._l(e.filtered_options,(function(t){return a("span",{staticClass:"dropdown-item cursor-pointer",class:{active:!e.multiple&&t.value==e.selected_value},attrs:{id:"item-"+t.value},on:{click:function(a){return a.preventDefault(),e.updateValue(t)}}},[a("div",{staticClass:"text-ellipsis"},[e.multiple?a("vue-checkbox",{attrs:{value:(e.selected_value||[]).find((function(e){return e==t.value})),label:t.text}}):a("span",[e._v(e._s(t.text))])],1)])}))],2)])])])}),[],!1,null,"101dfe41",null);t.a=r.exports},fHoB:function(e,t,a){"use strict";var s=a("uNBS");a.n(s).a},hN7g:function(e,t,a){"use strict";var s=a("+MgP");a.n(s).a},oDfJ:function(e,t,a){var s=a("LjFx");"string"==typeof s&&(s=[[e.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,i);s.locals&&(e.exports=s.locals)},oqhQ:function(e,t,a){"use strict";var s=a("PuPP");a.n(s).a},pO3a:function(e,t,a){"use strict";var s={name:"package"},i=a("KHd+"),n=Object(i.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M20,9.5962912 L20,19.5 C20,19.7761424 19.7761424,20 19.5,20 L4.5,20 C4.22385763,20 4,19.7761424 4,19.5 L4,9.5962912 L2.03576165,4.68569534 C1.90438878,4.35726314 2.1462677,4 2.5,4 L12.5,4 C12.7044523,4 12.8883067,4.12447547 12.9642383,4.31430466 L14.5,8.1537088 L16.0357617,4.31430466 C16.1116933,4.12447547 16.2955477,4 16.5,4 L21.5,4 C21.8537323,4 22.0956112,4.35726314 21.9642383,4.68569534 L20,9.5962912 L20,9.5962912 Z M15,10 L15,19 L19,19 L19,10 L15,10 Z M14,10 L5,10 L5,19 L14,19 L14,10 Z M4.83851648,9 L13.7614835,9 L12.1614835,5 L3.23851648,5 L4.83851648,9 Z M19.1614835,9 L20.7614835,5 L16.8385165,5 L15.2385165,9 L19.1614835,9 Z M13,15.5 L13,17.5 C13,17.7761424 12.7761424,18 12.5,18 L9.5,18 C9.22385763,18 9,17.7761424 9,17.5 L9,15.5 C9,15.2238576 9.22385763,15 9.5,15 L12.5,15 C12.7761424,15 13,15.2238576 13,15.5 Z M12,16 L10,16 L10,17 L12,17 L12,16 Z"}})])}),[],!1,null,null,null);t.a=n.exports},uNBS:function(e,t,a){var s=a("ARml");"string"==typeof s&&(s=[[e.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,i);s.locals&&(e.exports=s.locals)},vkvX:function(e,t,a){"use strict";a.r(t);var s=a("XuX8"),i=a.n(s),n=a("L2JU"),o=a("jBWl"),r=a("MCve"),l=a("UEn/"),c=a("cmxz"),d=a("PW4s"),u={name:"coin"},p=a("KHd+"),v=Object(p.a)(u,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M14,8 L14.5,8 C15.3284271,8 16,8.67157288 16,9.5 C16,9.77614237 15.7761424,10 15.5,10 C15.2238576,10 15,9.77614237 15,9.5 C15,9.22385763 14.7761424,9 14.5,9 L9.5,9 C9.22385763,9 9,9.22385763 9,9.5 L9,10.6327046 C9,10.8815298 9.18296495,11.0924901 9.42928932,11.1276793 L14.712132,11.8823712 C15.4511051,11.9879387 16,12.6208198 16,13.3672954 L16,14.5 C16,15.3284271 15.3284271,16 14.5,16 L14,16 L14,17.5 C14,17.7761424 13.7761424,18 13.5,18 C13.2238576,18 13,17.7761424 13,17.5 L13,16 L11,16 L11,17.5 C11,17.7761424 10.7761424,18 10.5,18 C10.2238576,18 10,17.7761424 10,17.5 L10,16 L9.5,16 C8.67157288,16 8,15.3284271 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 C8.77614237,14 9,14.2238576 9,14.5 C9,14.7761424 9.22385763,15 9.5,15 L14.5,15 C14.7761424,15 15,14.7761424 15,14.5 L15,13.3672954 C15,13.1184702 14.817035,12.9075099 14.5707107,12.8723207 L9.28786797,12.1176288 C8.54889486,12.0120613 8,11.3791802 8,10.6327046 L8,9.5 C8,8.67157288 8.67157288,8 9.5,8 L10,8 L10,6.5 C10,6.22385763 10.2238576,6 10.5,6 C10.7761424,6 11,6.22385763 11,6.5 L11,8 L13,8 L13,6.5 C13,6.22385763 13.2238576,6 13.5,6 C13.7761424,6 14,6.22385763 14,6.5 L14,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z"}})])}),[],!1,null,null,null).exports,h=a("pO3a"),g=a("5cWj"),f=a("375c"),m=a("4m4z"),b=a("WIcW"),_=a.n(b),w=a("Wgwc"),C=a.n(w);function k(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function x(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?k(Object(a),!0).forEach((function(t){y(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}i.a.use(_.a);var P={components:{Modal:o.a,VueFormValidate:r.a,VueSelect:l.a,PlusIcon:c.a,CalendarIcon:d.a,CoinIcon:v,PackageIcon:h.a,ToggleSwitch:g.a,MoreIcon:f.a,VueCheckbox:m.a},data:function(){return{newPackage:{},clonedPackage:null,selectedPackage:null}},computed:x(x({},Object(n.d)({ready:function(e){return e.packages.ready},packages:function(e){return e.packages.index},services:function(e){return e.services.index}})),{},{servicesList:function(){var e=[];return this.services.forEach((function(t){if(t.is_available){var a=Object.assign({},t);a.bookings=1,e.push({text:a.name,value:a})}})),e}}),watch:{ready:function(e){this.$root.contentloading=!e}},created:function(){this.$root.contentloading=!this.ready,this.getServices(),this.getPackages()},mounted:function(){},methods:x(x({},Object(n.b)({getServices:"services/index",getPackages:"packages/index",storePackage:"packages/store",updatePackage:"packages/update",deletePackage:"packages/delete"})),{},{update:function(){var e=this;this.updatePackage(this.clonedPackage).then((function(t){Object.keys(t).map((function(a){e.packages[e.clonedPackage.index][a]=t[a]}))})),this.$refs.editModal.hide()},submit:function(){this.newPackage.expiration_date=C()(this.newPackage.expiration_date).format("YYYY-MM-DD"),this.storePackage(this.newPackage),this.$refs.addModal.hide()},formatDate:function(e){return C()(e).format("MMMM D, YYYY")}})},L=(a("hN7g"),Object(p.a)(P,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row h-100"},[e.ready?a("div",{staticClass:"col-md-12 h-100 d-flex flex-column"},[e._m(0),e._v(" "),0==e.packages.length?a("div",{staticClass:"py-5 text-center p-2 position-absolute-center"},[a("h6",{staticClass:"text-grayer mb-3 font-weight-light h5 text-secondary"},[e._v("\n          You don't have any packages added yet\n        ")]),e._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(t){e.newPackage={},e.$refs.addModal.show()}}},[e._v("\n          Add Package\n        ")])]):a("div",{staticClass:"d-flex flex-grow-1 overflow-hidden"},[a("div",{staticClass:"flex-grow-1 py-4 overflow-auto container"},[a("div",{staticClass:"row px-2"},[e._l(e.packages,(function(t,s){return a("div",{key:t.id,staticClass:"col-md-4 px-2"},[a("div",{staticClass:"px-1 mb-4"},[a("router-link",{staticClass:"card rounded service p-3 shadow-sm w-100 overflow-hidden cursor-pointer",class:{active:t.is_available},attrs:{to:"/dashboard/bookings/packages/"+t.id,tag:"div"}},[a("div",{staticClass:"package-buttons position-absolute d-flex align-items-center"},[a("div",{staticClass:"dropdown ml-2",on:{click:function(e){e.preventDefault()}}},[a("button",{staticClass:"btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none",attrs:{type:"button","data-toggle":"dropdown","data-offset":"-132, 0"}},[a("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(1.3)"}})],1),e._v(" "),a("div",{staticClass:"dropdown-menu"},[a("div",{staticClass:"d-flex align-items-center px-2 py-1"},[a("span",[e._v("Available")]),e._v(" "),a("toggle-switch",{staticClass:"ml-auto",attrs:{"active-class":"bg-primary"},on:{input:function(a){return e.updatePackage(t)}},nativeOn:{click:function(e){e.stopPropagation()}},model:{value:t.is_available,callback:function(a){e.$set(t,"is_available",a)},expression:"packageItem.is_available"}})],1),e._v(" "),a("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(a){e.clonedPackage=Object.assign({},t),e.clonedPackage.index=s,e.$refs.editModal.show()}}},[e._v("Edit")]),e._v(" "),a("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(a){e.selectedPackage=t,e.$refs.deleteModal.show()}}},[e._v("Delete")])])])]),e._v(" "),a("div",{staticClass:"mb-1"},[a("h5",{staticClass:"font-heading mb-0"},[e._v("\n                      "+e._s(t.name)+"\n                    ")])]),e._v(" "),a("p",{staticClass:"text-muted mb-0 multiline-ellipsis xsmall service-description mb-4"},[e._v("\n                    "+e._s(t.description)+"\n                  ")]),e._v(" "),a("div",{staticClass:"d-flex align-items-center"},[a("package-icon",{attrs:{width:"17",height:"17",fill:"#888"}}),e._v(" "),a("span",{staticClass:"ml-2"},[e._v(e._s(t.services.length)+" services")])],1),e._v(" "),a("div",{staticClass:"d-flex align-items-center mt-2"},[a("coin-icon",{attrs:{width:"17",height:"17",fill:"#888"}}),e._v(" "),a("span",{staticClass:"ml-2"},[e._v("$"+e._s(parseFloat(t.price).toFixed(2)))])],1),e._v(" "),a("div",{staticClass:"d-flex align-items-center mt-2"},[a("calendar-icon",{attrs:{width:"17",height:"17",fill:"#888"}}),e._v(" "),a("span",{staticClass:"ml-2"},[e._v("Expires on "+e._s(e.formatDate(t.expiration_date)))])],1)])],1)])})),e._v(" "),a("div",{staticClass:"col-md-4 px-2"},[a("div",{staticClass:"position-relative h-100"},[a("div",{staticClass:"h-100 position-relative pb-4"},[a("div",{staticClass:"px-1 h-100"},[a("button",{staticClass:"py-5 btn btn-light btn-add btn-lg shadow-none w-100 h-100 text-muted",attrs:{"data-intro":e.$root.intros.add_service.intro,"data-step":e.$root.intros.add_service.step,type:"button"},on:{click:function(t){e.newService={},e.$refs.addModal.show()}}},[a("div",{staticClass:"d-flex align-items-center py-4 justify-content-center"},[a("plus-icon",{staticClass:"fill-gray"}),e._v("\n                        Add Package\n                      ")],1)])])])])])],2)])])]):e._e(),e._v(" "),a("modal",{ref:"editModal",attrs:{"close-button":!1}},[a("h5",{staticClass:"font-heading mb-3"},[e._v("Edit Package")]),e._v(" "),e.clonedPackage?a("vue-form-validate",{on:{submit:e.update}},[a("fieldset",[a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Package name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.clonedPackage.name,expression:"clonedPackage.name"}],staticClass:"form-control",attrs:{type:"text","data-required":""},domProps:{value:e.clonedPackage.name},on:{input:function(t){t.target.composing||e.$set(e.clonedPackage,"name",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Description")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.clonedPackage.description,expression:"clonedPackage.description"}],staticClass:"form-control resize-none",attrs:{"data-required":"",rows:"3"},domProps:{value:e.clonedPackage.description},on:{input:function(t){t.target.composing||e.$set(e.clonedPackage,"description",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Price")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.clonedPackage.price,expression:"clonedPackage.price"}],staticClass:"form-control",attrs:{type:"number",step:"0.01",placeholder:"$0.00"},domProps:{value:e.clonedPackage.price},on:{input:function(t){t.target.composing||e.$set(e.clonedPackage,"price",t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"form-group"},[a("vue-checkbox",{attrs:{label:"Available in widget"},model:{value:e.clonedPackage.in_widget,callback:function(t){e.$set(e.clonedPackage,"in_widget",t)},expression:"clonedPackage.in_widget"}})],1),e._v(" "),a("div",{staticClass:"d-flex align-items-center"},[a("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[e._v("\n            Cancel\n          ")]),e._v(" "),a("button",{staticClass:"ml-auto btn btn-primary",attrs:{type:"submit"}},[e._v("Update")])])]):e._e()],1),e._v(" "),a("modal",{ref:"deleteModal",attrs:{"close-button":!1}},[e.selectedPackage?[a("h5",{staticClass:"font-heading text-center"},[e._v("Delete Service")]),e._v(" "),a("p",{staticClass:"text-center mt-3"},[e._v("\n          Are you sure to delete the package\n          "),a("strong",[e._v(e._s(e.selectedPackage.name))]),e._v("\n          ?\n          "),a("br"),e._v(" "),a("span",{staticClass:"text-danger"},[e._v("This action cannot be undone")])]),e._v(" "),a("div",{staticClass:"d-flex"},[a("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[e._v("\n            Cancel\n          ")]),e._v(" "),a("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(t){e.deletePackage(e.selectedPackage),e.$refs.deleteModal.hide()}}},[e._v("\n            Delete\n          ")])])]:e._e()],2),e._v(" "),a("modal",{ref:"addModal",attrs:{"close-button":!1,scrollable:!1}},[a("h5",{staticClass:"font-heading mb-3"},[e._v("Add Package")]),e._v(" "),a("vue-form-validate",{on:{submit:e.submit}},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Package Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newPackage.name,expression:"newPackage.name"}],staticClass:"form-control",attrs:{type:"text","data-required":""},domProps:{value:e.newPackage.name},on:{input:function(t){t.target.composing||e.$set(e.newPackage,"name",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Description")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newPackage.description,expression:"newPackage.description"}],staticClass:"form-control resize-none",attrs:{type:"text",rows:"4","data-required":""},domProps:{value:e.newPackage.description},on:{input:function(t){t.target.composing||e.$set(e.newPackage,"description",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Services")]),e._v(" "),a("vue-select",{attrs:{options:e.servicesList,multiple:"","data-required":"",placeholder:"Select service"},model:{value:e.newPackage.services,callback:function(t){e.$set(e.newPackage,"services",t)},expression:"newPackage.services"}})],1),e._v(" "),e._l(e.newPackage.services,(function(t,s){return a("div",{key:t.id,staticClass:"rounded bg-light p-3 mb-3 d-flex align-items-center"},[a("h6",{staticClass:"mb-1"},[e._v(e._s(t.name))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newPackage.services[s].bookings,expression:"newPackage.services[index].bookings"}],staticClass:"form-control w-25 ml-auto",attrs:{type:"number","data-required":"",placeholder:"Bookings",min:"1",value:"1"},domProps:{value:e.newPackage.services[s].bookings},on:{input:function(t){t.target.composing||e.$set(e.newPackage.services[s],"bookings",t.target.value)}}})])})),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Expires on")]),e._v(" "),a("v-date-picker",{attrs:{"min-date":new Date,popover:{placement:"bottom",visibility:"click"}},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.inputValue,i=t.inputEvents;return[a("div",e._g({staticClass:"form-control",attrs:{type:"button"}},i),[s?a("span",[e._v(e._s(e.formatDate(s)))]):a("span",{staticClass:"text-muted font-weight-normal"},[e._v("Set expiration date")])])]}}]),model:{value:e.newPackage.expiration_date,callback:function(t){e.$set(e.newPackage,"expiration_date",t)},expression:"newPackage.expiration_date"}})],1),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[e._v("Package Total")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newPackage.price,expression:"newPackage.price"}],staticClass:"form-control",attrs:{type:"number","data-required":"",placeholder:"Package Price",min:"1"},domProps:{value:e.newPackage.price},on:{input:function(t){t.target.composing||e.$set(e.newPackage,"price",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"d-flex align-items-center mt-4"},[a("button",{staticClass:"btn btn-light shadow-none mr-1",attrs:{type:"button","data-dismiss":"modal"}},[e._v("\n            Cancel\n          ")]),e._v(" "),a("button",{staticClass:"ml-auto btn btn-primary",attrs:{type:"submit"}},[e._v("Add")])])],2)],1)],1)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"border-bottom bg-white px-3 py-4"},[t("h5",{staticClass:"font-heading mb-0"},[this._v("Packages")])])}],!1,null,"1455d167",null));t.default=L.exports},vqo1:function(e,t,a){"use strict";var s={name:"checkmark"},i=a("KHd+"),n=Object(i.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"}})])}),[],!1,null,null,null);t.a=n.exports},xkEX:function(e,t,a){"use strict";var s=a("oDfJ");a.n(s).a}}]);