(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"375c":function(t,e,n){"use strict";var s={name:"more-h"},i=n("KHd+"),o=Object(i.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"}})])}),[],!1,null,null,null);e.a=o.exports},"5u6M":function(t,e,n){"use strict";var s=n("Cw12");n.n(s).a},A2bC:function(t,e,n){"use strict";var s=n("sPWh");n.n(s).a},Cw12:function(t,e,n){var s=n("O0WM");"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(s,i);s.locals&&(t.exports=s.locals)},MCve:function(t,e,n){"use strict";function s(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var s=0,o=function(){};return{s:o,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,l=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return r=t.done,t},e:function(t){l=!0,a=t},f:function(){try{r||null==n.return||n.return()}finally{if(l)throw a}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,s=new Array(e);n<e;n++)s[n]=t[n];return s}var o={data:function(){return{valid:!0}},mounted:function(){this.$emit("mounted")},methods:{submit:function(t){this.valid=!0;var e,n=s($(this.$refs.form).find("input, textarea, select"));try{for(n.s();!(e=n.n()).done;){var i=e.value;if(("password"!=i.type&&0==i.value.trim().length||"password"==i.type&&0==i.value.length)&&(i.getAttribute("required")||i.hasAttribute("data-required"))){i.value="",i.focus(),this.valid=!1;break}"text"==i.type&&(i.value=i.value.trim())}}catch(t){n.e(t)}finally{n.f()}this.valid&&this.$emit("submit",t)}}},a=n("KHd+"),r=Object(a.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[t._t("default")],2)}),[],!1,null,null,null);e.a=r.exports},O0WM:function(t,e,n){(e=n("JPst")(!1)).push([t.i,".modal-loader[data-v-e924f312]{z-index:100}.close[data-v-e924f312]{outline:0;padding:0 !important;margin:0 !important;position:absolute;top:5px !important;right:5px !important;float:none !important;z-index:2}",""]),t.exports=e},bcHF:function(t,e,n){"use strict";n.r(e);var s,i=n("Wgwc"),o=n.n(i),a=n("WIcW"),r=n.n(a),l=n("L2JU"),c=n("jBWl"),d=n("MCve"),u=n("375c");function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,s)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){v(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h={components:{VCalendar:r.a,Modal:c.a,VueFormValidate:d.a,MoreHIcon:u.a},data:function(){return{selectedBooking:null,selectedDate:null,selectedTimeslot:null,selectAttribute:{highlight:{fillMode:"solid",contentClass:"bg-primary"}},days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],step:1,error:""}},computed:m(m({},Object(l.d)({ready:function(t){return t.bookings.ready},bookings:function(t){return t.bookings.index}})),{},{formattedHolidays:function(){var t=this,e=[];if(this.selectedBooking.service){this.selectedBooking.service.holidays.forEach((function(t){var n=t.split("-"),s=new Date(n[0],n[1]-1,n[2]);e.push(s)}));var n=[];this.days.forEach((function(e,s){s++,t.selectedBooking.service.days[e].isOpen||n.push(s)})),n.length>0&&e.push({weekdays:n})}return e},nextDisabled:function(){var t=!0;switch(this.step){case 1:this.selectedDate&&(t=!1);break;case 2:this.selectedTimeslot&&(t=!1)}return t},buttonText:function(){var t="Next";switch(this.step){case 1:t="Select time";break;case 2:t="Update"}return t}}),watch:{ready:function(t){this.$root.contentloading=!t},selectedDate:function(t){t&&(this.error=null),this.getTimeslots()}},created:function(){this.$root.contentloading=!this.ready,this.getBookings()},methods:m(m({},Object(l.b)({getBookings:"bookings/index",updateBooking:"bookings/update"})),{},(s={resetStep:function(){this.step=1,this.selectedTimeslot=this.selectedDate=null},update:function(t){var e=this;if(t){var n=JSON.parse(JSON.stringify(t));n.date=o()(this.selectedDate).format("YYYY-MM-DD"),n.start=this.selectedTimeslot.time,this.updateBooking(n).then((function(){e.$refs.editModal.hide()})).catch((function(t){e.error=t.response.data.message,e.resetStep()}))}},formatDate:function(t){var e="";return t&&(e=o()(t).format("MMMM DD, YYYY")),e},nextStep:function(){this.nextDisabled||this.step++},edit:function(t){if(t){var e=t.date.split("-"),n=new Date(e[0],e[1]-1,e[2]);this.selectedBooking=t,this.selectedDate=n,this.$refs.editModal.show()}},getTimeslots:function(){var t=this;if(this.selectedBooking&&this.selectedDate){this.selectedTimeslot=null;var e=o()(this.selectedDate).format("YYYY-MM-DD");axios.get("/@".concat(this.selectedBooking.service.user.username,"/").concat(this.selectedBooking.service.id,"/timeslots?date=").concat(e)).then((function(n){var s=n.data;if(t.selectedBooking.date==e){var i=t.selectedBooking.start.split(":"),a={label:o()().hour(i[0]).minute(i[1]).format("hh:mmA"),time:t.selectedBooking.start};6==a.label.length&&(a.label="0".concat(a.label)),t.selectedTimeslot=a,s.push(a)}s=s.sort((function(t,e){return t.time>e.time?1:-1})),t.$set(t.selectedBooking.service,"timeslots",s)}))}}},v(s,"formatDate",(function(t){return o()(t).format("MMMM D, YYYY")})),v(s,"formatTime",(function(t){var e=t.split(":");return o()().set("hour",e[0]).set("minute",e[1]).format("hh:mmA")})),v(s,"destroy",(function(t){t&&(this.$refs.deleteModal.hide(),axios.delete("/dashboard/bookings/".concat(t.id)),this.$delete(this.bookings,this.bookings.findIndex((function(e){return e.id==t.id}))))})),s))},b=(n("A2bC"),n("KHd+")),p=Object(b.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"h-100"},["customer"==t.$root.auth.role.role?n("div",{staticClass:"p-4"},[t.ready?n("div",[0==t.bookings.length?n("h6",{staticClass:"text-center text-gray position-absolute-center font-weight-lighter"},[t._v("\n\t\t\t\tYou don't have any bookings yet.\n\t\t\t")]):n("div",[n("h1",{staticClass:"font-heading h3 mb-3"},[t._v("Bookings")]),t._v(" "),n("table",{staticClass:"table table-borderless table-fixed-header mb-0"},[t._m(0),t._v(" "),n("tbody",t._l(t.bookings,(function(e){return n("tr",[n("td",{staticClass:"align-middle"},[n("strong",{staticClass:"d-block"},[t._v(t._s(e.service.name))]),t._v(" "),n("small",{staticClass:"d-block text-muted"},[t._v(t._s(e.service.user.full_name))])]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v(t._s(t.formatDate(e.date)))]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v(t._s(t.formatTime(e.start)))]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v(t._s(t.formatTime(e.end)))]),t._v(" "),n("td",{staticClass:"text-right align-middle",staticStyle:{width:"50px"}},[n("div",{staticClass:"dropdown"},[n("button",{staticClass:"btn btn-white border p-1 line-height-0",attrs:{"data-toggle":"dropdown"}},[n("more-h-icon",{attrs:{width:"20",height:"20"}})],1),t._v(" "),n("div",{staticClass:"dropdown-menu dropdown-menu-right"},[n("span",{staticClass:"dropdown-item d-flex align-items-center cursor-pointer",on:{click:function(n){return t.edit(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),n("span",{staticClass:"dropdown-item d-flex align-items-center cursor-pointer",on:{click:function(n){t.selectedBooking=e,t.$refs.deleteModal.show()}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t\t\t\t")])])])])])})),0)])]),t._v(" "),n("modal",{ref:"editModal",on:{hidden:t.resetStep}},[t.selectedBooking?[n("h5",{staticClass:"font-heading"},[t._v("Edit Booking")]),t._v(" "),n("strong",{staticClass:"d-block"},[t._v(t._s(t.selectedBooking.service.name))]),t._v(" "),n("small",{staticClass:"d-block text-muted"},[t._v(t._s(t.selectedBooking.service.user.full_name))]),t._v(" "),n("div",{staticClass:"mb-2 mt-4"},[t.error?n("div",{staticClass:"text-danger"},[t._v(t._s(t.error))]):[t.selectedDate?[n("strong",[t._v(t._s(t.formatDate(t.selectedDate)))]),t._v(" "),t.selectedTimeslot?n("span",[t._v("@"+t._s(t.selectedTimeslot.label))]):t._e()]:n("strong",[t._v("Select Date")])]],2),t._v(" "),n("vue-form-validate",{on:{submit:function(e){return t.update(t.selectedBooking)}}},[n("div",{staticClass:"form-body"},[n("div",{staticClass:"rounded border h-100 mb-3 overflow-hidden"},[1==t.step?n("div",[n("v-date-picker",{staticClass:"v-calendar border-0",attrs:{"select-attribute":t.selectAttribute,"disabled-dates":t.formattedHolidays,"is-required":"","is-expanded":"","is-inline":"","min-date":new Date,"title-position":"left"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1):2==t.step?n("div",{staticClass:"position-relative h-100 bg-light"},[0==(t.selectedBooking.service.timeslots||[]).length?n("div",{staticClass:"text-gray text-center position-absolute-center w-100"},[t._v("\n\t\t\t\t\t\t\t\t\t\tThere are no timeslots available for the selected date\n\t\t\t\t\t\t\t\t\t")]):n("div",{staticClass:"d-flex flex-wrap pb-2 pr-2"},t._l(t.selectedBooking.service.timeslots,(function(e){return n("div",{staticClass:"pt-2 pl-2 w-20"},[n("div",{staticClass:"btn btn-white border btn-block btn-timeslot px-0 text-center",class:{"bg-primary text-white":e==t.selectedTimeslot},on:{click:function(n){t.selectedTimeslot=e}}},[t._v(t._s(e.label))])])})),0)]):t._e()])]),t._v(" "),n("div",{staticClass:"d-flex mt-3"},[t.step>1?n("button",{staticClass:"btn btn-white border",attrs:{type:"button"},on:{click:function(e){t.step--}}},[t._v("Previous")]):t._e(),t._v(" "),1==t.step?n("button",{staticClass:"btn btn-primary ml-auto",attrs:{type:"button",disabled:t.nextDisabled},on:{click:function(e){return e.preventDefault(),t.nextStep()}}},[t._v("Select time")]):2==t.step?n("button",{staticClass:"btn btn-primary ml-auto",attrs:{type:"submit",disabled:t.nextDisabled}},[t._v("Update")]):t._e()])])]:t._e()],2),t._v(" "),n("modal",{ref:"deleteModal",attrs:{"close-button":!1}},[t.selectedBooking?[n("h5",{staticClass:"font-heading text-center"},[t._v("Delete Booking")]),t._v(" "),n("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\t\t\tAre you sure to delete the booking "),n("strong",[t._v(t._s(t.selectedBooking.service.name))]),t._v("? "),n("br"),t._v(" "),n("span",{staticClass:"text-danger"},[t._v("This action cannot be undone")])]),t._v(" "),n("div",{staticClass:"d-flex"},[n("button",{staticClass:"btn btn-white border",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Cancel")]),t._v(" "),n("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){return t.destroy(t.selectedBooking)}}},[t._v("Delete")])])]:t._e()],2)],1):t._e()]):n("router-view")],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{staticClass:"border-0"},[t._v("Service")]),t._v(" "),n("th",{staticClass:"border-0"},[t._v("Date")]),t._v(" "),n("th",{staticClass:"border-0"},[t._v("Start")]),t._v(" "),n("th",{staticClass:"border-0"},[t._v("End")]),t._v(" "),n("th",{staticClass:"border-0"})])])}],!1,null,null,null);e.default=p.exports},jBWl:function(t,e,n){"use strict";var s=n("o0o1"),i=n.n(s),o=n("/X8E"),a=n("MCve");function r(t,e,n,s,i,o,a){try{var r=t[o](a),l=r.value}catch(t){return void n(t)}r.done?e(l):Promise.resolve(l).then(s,i)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(s,i){var o=t.apply(e,n);function a(t){r(o,s,i,a,l,"next",t)}function l(t){r(o,s,i,a,l,"throw",t)}a(void 0)}))}}var c={components:{CloseIcon:o.a,VueFormValidate:a.a},props:{closeButton:{type:Boolean,default:!0},form:{type:Boolean,default:!1},title:{type:String},loading:{type:Boolean,default:!1},size:{type:String,default:""},scrollable:{type:Boolean,default:!0}},computed:{contentComponent:function(){return this.form?"vue-form-validate":"div"},hasFooterSlot:function(){return!!this.$slots.footer}},mounted:function(){var t=this;$(this.$refs.modal).on("show.bs.modal",(function(){t.$emit("show")})),$(this.$refs.modal).on("shown.bs.modal",(function(){t.$emit("shown")})),$(this.$refs.modal).on("hide.bs.modal",(function(){t.$emit("hide")})),$(this.$refs.modal).on("hidden.bs.modal",(function(){t.$emit("hidden")}))},methods:{submit:function(){this.$emit("submit")},show:function(){var t=this;return l(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){$(t.$refs.modal).modal({keyboard:!1,backdrop:"static"}).modal("show"),setTimeout((function(){e()}),150)})));case 1:case"end":return e.stop()}}),e)})))()},hide:function(){var t=this;return l(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){$(t.$refs.modal).modal("hide"),setTimeout((function(){e()}),150)})));case 1:case"end":return e.stop()}}),e)})))()}}},d=(n("5u6M"),n("KHd+")),u=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"modal",staticClass:"modal fade",attrs:{tabindex:"-1",role:"dialog"}},[t.loading?n("div",{staticClass:"modal-loader position-absolute w-100 h-100"},[t._m(0)]):t._e(),t._v(" "),n("div",{staticClass:"modal-dialog modal-dialog-centered",class:[{"opacity-0":t.loading},t.size,{"modal-dialog-scrollable":t.scrollable}],attrs:{role:"document"}},[n(t.contentComponent,{tag:"component",staticClass:"modal-content",on:{submit:t.submit}},[t.closeButton?n("button",{staticClass:"btn p-0 btn-white badge-pill close position-absolute line-height-0",attrs:{type:"button","aria-label":"Close","data-dismiss":"modal"}},[n("close-icon",{attrs:{width:"28",height:"28"}})],1):t._e(),t._v(" "),t.title?n("div",{staticClass:"modal-header bg-light"},[n("h5",{staticClass:"modal-title font-heading"},[t._v(t._s(t.title))])]):t._e(),t._v(" "),n("div",{staticClass:"modal-body position-relative"},[t._t("default")],2),t._v(" "),t.hasFooterSlot?n("div",{staticClass:"modal-footer bg-light"},[t._t("footer")],2):t._e()])],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"position-absolute-center"},[e("div",{staticClass:"spinner-border text-white",attrs:{role:"status"}})])}],!1,null,"e924f312",null);e.a=u.exports},klEr:function(t,e,n){(e=n("JPst")(!1)).push([t.i,'.v-calendar .vc-title{font-family:"Avenir Next";font-size:18px}.v-calendar .vc-day-content{line-height:1}.form-body{height:270px}.w-20{width:20% !important}',""]),t.exports=e},sPWh:function(t,e,n){var s=n("klEr");"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(s,i);s.locals&&(t.exports=s.locals)}}]);