(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"5cWj":function(t,e,a){"use strict";var s={props:{value:{type:Boolean,default:!1},activeClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{width:100,state:!1,pressed:0,position:0}},mounted:function(){this.toggle(this.value)},computed:{style:function(){return{transform:"translateX(".concat(this.pos_percentage,")")}},pos_percentage:function(){return"".concat(this.position/this.width*100,"%")},state_class:function(){if(this.state)return this.activeClass+" active"}},watch:{value:function(t){this.toggle(t)},position:function(){this.state=this.position>=50}},methods:{onClick:function(){this.toggle(!this.state),this.emit()},toggle:function(t){this.state=t,this.position=t?100:0},dragging:function(t){var e=(t.clientX-this.$el.offsetLeft)/this.width*100;this.position=e<=0?0:e>=100?100:e},resolvePosition:function(){this.position=this.state?100:0},emit:function(){this.$emit("input",this.state)}}},n=(a("fHoB"),a("KHd+")),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"toggle",class:t.state_class,attrs:{disabled:t.disabled},on:{click:function(e){return e.target!==e.currentTarget?null:t.onClick(e)}}},[a("div",{staticClass:"draggable",style:t.style})])}),[],!1,null,"22734e3b",null);e.a=i.exports},ARml:function(t,e,a){(e=a("JPst")(!1)).push([t.i,".toggle[data-v-22734e3b]{cursor:pointer;width:40px;height:20px;background:#dee2e6;border-radius:200px;transition:background .6s}.toggle[disabled][data-v-22734e3b]{opacity:.5;pointer-events:none !important}.toggle .draggable[data-v-22734e3b]{pointer-events:none;width:20px;height:20px;background:#fff;border-radius:100%;box-shadow:0 0 5px rgba(0,0,0,.25);transform:translateX(0%);transition:transform .05s ease-in-out}.toggle.active[data-v-22734e3b]{background:#5a5adf;transition:background .6s}",""]),t.exports=e},BsWS:function(t,e,a){"use strict";a.r(e);var s=a("XuX8"),n=a.n(s),i=a("L2JU"),r=a("jBWl"),o=a("5cWj"),c=a("p2YT"),l=a("MCve"),d=a("4m4z"),u=a("NalG"),v=a("Zha+"),m=a("cmxz"),p=a("GINL"),h=a("grtR"),f=a("XPXJ"),g=a("eeqt"),b=a("dRai"),_=a("Wgwc"),w=a.n(_),C=a("uv9J"),k=a.n(C);function x(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function y(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?x(Object(a),!0).forEach((function(e){P(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function P(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}n.a.use(k.a);a("xCJq");var I={components:{Modal:r.a,VueFormValidate:l.a,VueCheckbox:d.a,PencilIcon:u.a,ChevronDownIcon:v.a,PlusIcon:m.a,CogIcon:p.a,TrashIcon:h.a,ClockIcon:f.a,ToggleSwitch:o.a,Timerangepicker:c.a,ArrowLeftIcon:g.a,MoreIcon:b.a},data:function(){return{packageItem:null,clonedPackage:null}},computed:y({},Object(i.d)({services:function(t){return t.services.index}})),created:function(){var t=this;this.getPackage(this.$route.params.id).then((function(e){t.$root.contentloading=!1,t.packageItem=e,t.clonedPackage=Object.assign({},e)})),this.getServices()},methods:y(y({},Object(i.b)({getPackage:"packages/show",deletePackage:"packages/delete",getServices:"services/index"})),{},{submit:function(){var t=this;this.updateService(this.clonedService).then((function(e){Object.keys(e).map((function(a){t.service[a]=e[a]}))})),this.$refs.editModal.hide()},formatDate:function(t){return w()(t).format("MMMM D, YYYY")}})},M=(a("HPQ6"),a("KHd+")),$=Object(M.a)(I,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.packageItem?a("div",{staticClass:"h-100"},[a("div",{staticClass:"d-flex h-100 overflow-hidden"},[a("div",{staticClass:"p-4 flex-grow-1 overflow-auto"},[a("div",{staticClass:"d-flex"},[a("div",[a("button",{staticClass:"btn p-2 btn-white badge-pill shadow-sm",attrs:{type:"button"},on:{click:function(e){return t.$router.push("/dashboard/bookings/packages")}}},[a("arrow-left-icon")],1)]),t._v(" "),a("div",{staticClass:"dropdown ml-auto"},[a("button",{staticClass:"btn p-2 btn-white badge-pill shadow-sm",attrs:{"data-toggle":"dropdown","data-offset":"-130, 10"}},[a("cog-icon")],1),t._v(" "),a("div",{staticClass:"dropdown-menu"},[a("span",{staticClass:"dropdown-item cursor-pointer d-flex align-items-center",on:{click:function(e){t.clonedPackage=Object.assign({},t.packageItem),t.$refs.editModal.show()}}},[a("pencil-icon",{staticClass:"mr-2",attrs:{width:"16",height:"16"}}),t._v("\n              Edit\n            ")],1),t._v(" "),a("span",{staticClass:"dropdown-item cursor-pointer d-flex align-items-center",on:{click:function(e){return t.$refs.deleteModal.show()}}},[a("trash-icon",{staticClass:"mr-2",attrs:{width:"16",height:"16"}}),t._v("\n              Delete\n            ")],1)])])]),t._v(" "),a("div",{staticClass:"rounded bg-white shadow-sm p-3 mt-3"},[a("h1",{staticClass:"font-heading h3"},[t._v(t._s(t.packageItem.name))]),t._v(" "),a("p",{staticClass:"service-description"},[t._v(t._s(t.packageItem.description))]),t._v(" "),a("h6",{staticClass:"font-heading d-inline-block mb-2"},[t._v("Services:")]),t._v("\n        "+t._s(t.packageItem.services.map((function(t){return t.name+" ("+t.bookings+" bookings)"})).join(", "))+"\n        "),a("div",[a("h6",{staticClass:"font-heading d-inline-block mb-2"},[t._v("Price:")]),t._v("\n          $"+t._s(parseFloat(t.packageItem.price).toFixed(2))+"\n        ")]),t._v(" "),a("h6",{staticClass:"font-heading d-inline-block mb-2"},[t._v("Expires on:")]),t._v("\n        "+t._s(t.formatDate(t.packageItem.expiration_date))+"\n        "),a("div",[a("h6",{staticClass:"font-heading d-inline-block"},[t._v("Available in widget:")]),t._v("\n          "+t._s(t.packageItem.in_widget?"Yes":"No")+"\n        ")])]),t._v(" "),a("h5",{staticClass:"mt-5 font-heading mb-0"},[t._v("Orders")]),t._v(" "),t.packageItem.orders.length>0?a("div",[a("table",{staticClass:"table table-borderless table-fixed-header mb-0"},[t._m(0),t._v(" "),a("tbody",[t._l(t.packageItem.orders,(function(e){return[a("tr",{key:e.id},[a("td",{staticClass:"align-middle"},[t._v(t._s(e.user.full_name))]),t._v(" "),a("td",{staticClass:"align-middle"},[t._v("\n                  "+t._s(t.formatDate(e.created_at))+"\n                ")]),t._v(" "),a("td",{staticClass:"align-middle"},[t._v("\n                  "+t._s(t.convertTime(e.start,"hh:MMA"))+"\n                ")]),t._v(" "),a("td",{staticClass:"align-middle"},[a("div",{staticClass:"d-flex align-items-center"},[a("div",{staticClass:"user-profile-image user-profile-image-sm mr-2",style:{backgroundImage:"url("+t.packageItem.user.profile_image+")"}},[t.packageItem.user.profile_image?t._e():a("span",[t._v(t._s(t.packageItem.user.initials))])]),t._v("\n                    "+t._s(t.packageItem.user.full_name)+"\n                    "),t.$root.auth.id==t.packageItem.user.id?a("span",[t._v("(You)")]):t._e()])])])]}))],2)])]):a("div",[a("div",{staticClass:"rounded bg-white text-center py-3 text-muted mt-2"},[t._v("\n          No orders.\n        ")])])])]),t._v(" "),a("modal",{ref:"editModal",attrs:{"close-button":!1}},[a("h5",{staticClass:"font-heading mb-3"},[t._v("Edit Package")]),t._v(" "),a("vue-form-validate",{on:{submit:t.submit}},[a("fieldset",[a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[t._v("Package name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedPackage.name,expression:"clonedPackage.name"}],staticClass:"form-control",attrs:{type:"text","data-required":""},domProps:{value:t.clonedPackage.name},on:{input:function(e){e.target.composing||t.$set(t.clonedPackage,"name",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[t._v("Description")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.clonedPackage.description,expression:"clonedPackage.description"}],staticClass:"form-control resize-none",attrs:{"data-required":"",rows:"3"},domProps:{value:t.clonedPackage.description},on:{input:function(e){e.target.composing||t.$set(t.clonedPackage,"description",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[t._v("Duration (in minutes)")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedPackage.duration,expression:"clonedPackage.duration"}],staticClass:"form-control",attrs:{type:"number","data-required":""},domProps:{value:t.clonedPackage.duration},on:{input:function(e){e.target.composing||t.$set(t.clonedPackage,"duration",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[t._v("Interval (in minutes)")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedPackage.interval,expression:"clonedPackage.interval"}],staticClass:"form-control",attrs:{type:"number",onkeydown:"if(event.key==='.'){event.preventDefault();}",placeholder:"Defaults to 15 mins"},domProps:{value:t.clonedPackage.interval},on:{input:function(e){e.target.composing||t.$set(t.clonedPackage,"interval",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"form-label"},[t._v("Default Rate")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedPackage.default_rate,expression:"clonedPackage.default_rate"}],staticClass:"form-control",attrs:{type:"number",step:"0.01",placeholder:"$0.00"},domProps:{value:t.clonedPackage.default_rate},on:{input:function(e){e.target.composing||t.$set(t.clonedPackage,"default_rate",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("vue-checkbox",{attrs:{label:"Available in widget"},model:{value:t.clonedPackage.in_widget,callback:function(e){t.$set(t.clonedPackage,"in_widget",e)},expression:"clonedPackage.in_widget"}})],1),t._v(" "),a("div",{staticClass:"d-flex align-items-center"},[a("button",{staticClass:"btn btn-white border mr-1",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n          Cancel\n        ")]),t._v(" "),a("button",{staticClass:"ml-auto btn btn-primary",attrs:{type:"submit"}},[t._v("Update")])])])],1),t._v(" "),a("modal",{ref:"deleteModal",attrs:{"close-button":!1}},[t.packageItem?[a("h5",{staticClass:"font-heading text-center"},[t._v("Delete Service")]),t._v(" "),a("p",{staticClass:"text-center mt-3"},[t._v("\n        Are you sure to delete the package\n        "),a("strong",[t._v(t._s(t.packageItem.name))]),t._v("\n        ?\n        "),a("br"),t._v(" "),a("span",{staticClass:"text-danger"},[t._v("This action cannot be undone")])]),t._v(" "),a("div",{staticClass:"d-flex"},[a("button",{staticClass:"btn btn-white border",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n          Cancel\n        ")]),t._v(" "),a("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){t.deletePackage(t.packageItem).then((function(){return t.$router.push("/dashboard/bookings/packages")})),t.$refs.deleteModal.hide()}}},[t._v("\n          Delete\n        ")])])]:t._e()],2)],1):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",{staticClass:"text-muted"},[e("tr",[e("th",[this._v("User")]),this._v(" "),e("th",[this._v("Date")]),this._v(" "),e("th",[this._v("Time")]),this._v(" "),e("th",[this._v("Assignee")])])])}],!1,null,"77c3be0b",null);e.default=$.exports},HPQ6:function(t,e,a){"use strict";var s=a("TR6b");a.n(s).a},NalG:function(t,e,a){"use strict";var s={name:"pencil"},n=a("KHd+"),i=Object(n.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M15.5,6.20710678 L4,17.7071068 L4,20 L6.29289322,20 L17.7928932,8.5 L15.5,6.20710678 Z M16.2071068,5.5 L18.5,7.79289322 L19.7928932,6.5 L17.5,4.20710678 L16.2071068,5.5 L16.2071068,5.5 Z M3,20.5 L3,17.5 C3,17.3673918 3.05267842,17.2402148 3.14644661,17.1464466 L17.1464466,3.14644661 C17.3417088,2.95118446 17.6582912,2.95118446 17.8535534,3.14644661 L20.8535534,6.14644661 C21.0488155,6.34170876 21.0488155,6.65829124 20.8535534,6.85355339 L6.85355339,20.8535534 C6.7597852,20.9473216 6.63260824,21 6.5,21 L3.5,21 C3.22385763,21 3,20.7761424 3,20.5 Z"}})])}),[],!1,null,null,null);e.a=i.exports},TR6b:function(t,e,a){var s=a("zBnX");"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,n);s.locals&&(t.exports=s.locals)},WJGg:function(t,e,a){var s=a("wFTB");"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,n);s.locals&&(t.exports=s.locals)},XPXJ:function(t,e,a){"use strict";var s={name:"clock"},n=a("KHd+"),i=Object(n.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.7906191,14.0931333 C16.0153254,14.2536378 16.0673712,14.5659128 15.9068667,14.7906191 C15.7463622,15.0153254 15.4340872,15.0673712 15.2093809,14.9068667 L11.7093809,12.4068667 C11.6156592,12.3399227 11.5479226,12.2426753 11.5176181,12.1315587 L10.0176181,6.6315587 C9.94496022,6.36514653 10.1020291,6.09027595 10.3684413,6.01761809 C10.6348535,5.94496022 10.909724,6.10202912 10.9823819,6.3684413 L12.4355266,11.6966387 L15.7906191,14.0931333 Z"}})])}),[],!1,null,null,null);e.a=i.exports},aoh8:function(t,e,a){"use strict";var s=a("WJGg");a.n(s).a},eeqt:function(t,e,a){"use strict";var s={name:"arrow-left"},n=a("KHd+"),i=Object(n.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M8.70710678,12 L18.5,12 C18.7761424,12 19,12.2238576 19,12.5 C19,12.7761424 18.7761424,13 18.5,13 L8.70710678,13 L11.8535534,16.1464466 C12.0488155,16.3417088 12.0488155,16.6582912 11.8535534,16.8535534 C11.6582912,17.0488155 11.3417088,17.0488155 11.1464466,16.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 L11.1464466,8.14644661 C11.3417088,7.95118446 11.6582912,7.95118446 11.8535534,8.14644661 C12.0488155,8.34170876 12.0488155,8.65829124 11.8535534,8.85355339 L8.70710678,12 Z"}})])}),[],!1,null,null,null);e.a=i.exports},fHoB:function(t,e,a){"use strict";var s=a("uNBS");a.n(s).a},p2YT:function(t,e,a){"use strict";var s=a("Wgwc"),n=a.n(s),i={props:{start:{type:String,default:null},end:{type:String,default:null}},data:function(){return{time_start:null,time_end:null}},watch:{start:function(t){var e=this;t&&(this.time_start=this.hours.find((function(t){return t.time==e.start})))},end:function(t){var e=this;t&&(this.time_end=this.hours.find((function(t){return t.time==e.end})))}},computed:{hours:function(){var t=n()();t=t.hour(0).minute(0);for(var e=[],a=0;a<24;a++)e.push({time:t.format("HH:mm"),label:t.format("h:mmA")}),e.push({time:t.add(30,"minute").format("HH:mm"),label:t.add(30,"minute").format("h:mmA")}),t=t.add(60,"minute");return e},startHours:function(){var t=this,e=[];return this.hours.forEach((function(a){(!t.time_end||a.time<t.time_end.time)&&e.push(a)})),e},endHours:function(){var t=this,e=[];return this.hours.forEach((function(a){(!t.time_start||a.time>t.time_start.time)&&e.push(a)})),e}},mounted:function(){var t=this;$(this.$refs.start).on("show.bs.dropdown",(function(){setTimeout((function(){t.time_start&&t.$refs["dropdown-start"].querySelector("#start-".concat(t.time_start.time.replace(":",""))).scrollIntoView({block:"nearest"})}),50)})),$(this.$refs.end).on("show.bs.dropdown",(function(){setTimeout((function(){t.time_end&&t.$refs["dropdown-end"].querySelector("#end-".concat(t.time_end.time.replace(":",""))).scrollIntoView({block:"nearest"})}),50)}))},created:function(){var t=this,e=this.hours;this.start&&(this.time_start=e.find((function(e){return e.time==t.start}))),this.end&&(this.time_end=e.find((function(e){return e.time==t.end})))},methods:{formatDate:function(t){return n()(t).format("MMMM D, YYYY")},update:function(){this.time_start?this.time_end||$(this.$refs["dropdown-end"]).dropdown("show"):$(this.$refs["dropdown-start"]).dropdown("show"),this.$emit("update",{start:this.time_start,end:this.time_end})}}},r=(a("aoh8"),a("KHd+")),o=Object(r.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"d-flex align-items-stretch"},[a("div",{staticClass:"rounded border w-50 mr-1 flex-grow-1"},[a("div",{ref:"start",staticClass:"position-relative dropdown d-flex align-items-stretch"},[a("div",{staticClass:"text-gray p-2 label"},[t._v("From")]),t._v(" "),a("div",{staticClass:"w-100 position-static"},[a("button",{staticClass:"btn btn-white shadow-none border-0 h-100 btn-block",class:{"text-gray":!t.time_start},attrs:{"data-toggle":"dropdown","data-offset":"-50,0"}},[t._v(t._s(t.time_start?t.time_start.label:"Set time"))]),t._v(" "),a("div",{ref:"dropdown-start",staticClass:"dropdown-menu w-100 px-1 overflow-auto bg-light"},[0==t.startHours.length?a("div",{staticClass:"text-gray text-center small font-weight-light line-height-sm"},[t._v("There are no hours available")]):a("div",{staticClass:"d-flex flex-wrap"},t._l(t.startHours,(function(e){return a("div",{staticClass:"w-50 p-1"},[a("button",{staticClass:"btn btn-white btn-sm btn-block p-1 border",class:{active:t.time_start==e},attrs:{id:"start-"+e.time.replace(":","")},on:{click:function(a){t.time_start=e,t.update()}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t\t\t")])])})),0)])])])]),t._v(" "),a("div",{staticClass:"rounded border w-50 mr-1 flex-grow-1"},[a("div",{ref:"end",staticClass:"position-relative dropdown d-flex align-items-stretch"},[a("div",{staticClass:"text-gray p-2 label"},[t._v("To")]),t._v(" "),a("div",{staticClass:"w-100 position-static"},[a("button",{staticClass:"btn btn-white shadow-none border-0 h-100 btn-block",class:{"text-gray":!t.time_end},attrs:{"data-toggle":"dropdown","data-display":"static"}},[t._v(t._s(t.time_end?t.time_end.label:"Set time"))]),t._v(" "),a("div",{ref:"dropdown-end",staticClass:"dropdown-menu w-100 px-1 overflow-auto bg-light"},[0==t.endHours.length?a("div",{staticClass:"text-gray text-center small font-weight-light line-height-sm"},[t._v("There are no hours available")]):a("div",{staticClass:"d-flex flex-wrap"},t._l(t.endHours,(function(e){return a("div",{staticClass:"w-50 p-1"},[a("button",{staticClass:"btn btn-white btn-sm btn-block p-1 border",class:{active:t.time_end==e},attrs:{id:"end-"+e.time.replace(":","")},on:{click:function(a){t.time_end=e,t.update()}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t\t\t")])])})),0)])])])])])])}),[],!1,null,"ab4b36e4",null);e.a=o.exports},uNBS:function(t,e,a){var s=a("ARml");"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(s,n);s.locals&&(t.exports=s.locals)},wFTB:function(t,e,a){(e=a("JPst")(!1)).push([t.i,".btn-white[data-v-ab4b36e4]{border-top-right-radius:-0.5rem !important;border-bottom-right-radius:-0.5rem !important}.label[data-v-ab4b36e4]{border-top-left-radius:-0.5rem !important;border-bottom-left-radius:-0.5rem !important}.dropdown-menu[data-v-ab4b36e4]{max-height:250px}",""]),t.exports=e},xCJq:function(t,e){var a=/(\d{1,2})\s*:?\s*(\d{0,2})\s*(a\.?m\.?|p\.?m\.?)/i,s=/(\d{1,2})\s*:\s*(\d{1,2})/i;function n(t){return 1===t.length?"0"+t:t}function i(t){return parseInt(t)>=12?"pm":"am"}t.exports=function(t,e){return function(t,e){var s=t.match(a);if(s){var i=s[1],r=s[2]||"00";return e||(e="hh:MM"),"pm"==s[3].replace(/\./g,"").toLowerCase()&&"12"!==i?e.replace("hh",parseInt(i)+12).replace("mm",r).replace("MM",n(r)):e.replace("hh",i).replace("HH",n(i)).replace("mm",r).replace("MM",n(r))}}(t,e)||function(t,e){var a=t.match(s);if(a){var r=a[1],o=a[2];return e||(e="hh:MM a"),parseInt(r)>12?e.replace("hh",parseInt(r)-12).replace("HH",n(r)).replace("mm",o).replace("MM",n(o)).replace("a","pm").replace("A","PM"):e.replace("hh",r).replace("HH",n(r)).replace("mm",o).replace("MM",n(o)).replace("a",i(r)).replace("A",i(r).toUpperCase())}}(t,e)}},zBnX:function(t,e,a){(e=a("JPst")(!1)).push([t.i,".multiline-ellipsis[data-v-77c3be0b]{overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.service[data-v-77c3be0b]{border:solid 1px transparent;transition:all .1s ease-in-out}.service[data-v-77c3be0b]:hover:not(.active){border-color:#ced4da}.service.active[data-v-77c3be0b]{box-shadow:0 0 0 .1rem #5a5adf}.service.unavailable[data-v-77c3be0b]{opacity:.45}.service-add[data-v-77c3be0b]{background-color:#f0f2f5;transition:all .1s ease-in-out;border:dashed 1px #adb5bd}.service-add[data-v-77c3be0b]:hover{background-color:#fff}.badge-day[data-v-77c3be0b]{width:25px;height:25px}.service-day .chevron-down[data-v-77c3be0b]{fill:#adb5bd;transition:all .1s ease-in-out}.service-day .service-day-heading[aria-expanded=true] svg[data-v-77c3be0b]{transform:rotate(-180deg);fill:#000}.service-day .service-day-heading:hover svg[data-v-77c3be0b]{fill:#000}.info[data-v-77c3be0b]{flex:0 0 350px}.service-description[data-v-77c3be0b]{font-size:16px}.user-profile-image-sm[data-v-77c3be0b]{width:30px;height:30px}.user-profile-image-sm span[data-v-77c3be0b]{font-size:11px}",""]),t.exports=e}}]);