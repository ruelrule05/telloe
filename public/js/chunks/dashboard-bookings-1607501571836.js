(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"4m4z":function(t,e,s){"use strict";var a={components:{CheckmarkIcon:s("vqo1").a},data:function(){return{state:!1}},watch:{value:function(t){this.state=t?1:0},state:function(t){this.$emit("input",t)}},created:function(){this.state=this.value},props:{value:{},disabled:{type:Boolean,default:!1},label:{type:String}}},i=(s("KUdA"),s("KHd+")),o=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"checkbox",class:{disabled:t.disabled}},[s("label",{staticClass:"d-flex align-items-center mb-0"},[s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.state,expression:"state"}],attrs:{type:"checkbox",disabled:t.disabled},domProps:{checked:Array.isArray(t.state)?t._i(t.state,null)>-1:t.state},on:{change:function(e){var s=t.state,a=e.target,i=!!a.checked;if(Array.isArray(s)){var o=t._i(s,null);a.checked?o<0&&(t.state=s.concat([null])):o>-1&&(t.state=s.slice(0,o).concat(s.slice(o+1)))}else t.state=i}}}),t._v(" "),s("span",{staticClass:"cr"},[s("checkmark-icon",{attrs:{fill:"white"}})],1)]),t._v(" "),s("span",{staticClass:"font-size-base text-body text-exllipsis"},[t._v(t._s(t.label))])])])}),[],!1,null,"f104808c",null);e.a=o.exports},A2bC:function(t,e,s){"use strict";s("sPWh")},KUdA:function(t,e,s){"use strict";s("SFyK")},SFyK:function(t,e,s){var a=s("m7aA");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},T1qZ:function(t,e,s){"use strict";var a={props:{label:{type:String,default:""},type:{type:String,default:"button"},icon:{type:String,default:""},button_class:{type:String,default:"btn-block btn-primary"},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data:function(){return{}},mounted:function(){},methods:{}},i=s("KHd+"),o=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn position-relative",class:t.button_class,attrs:{type:t.type,disabled:t.loading||t.disabled},on:{click:function(e){return t.$emit("click")}}},[t.loading?s("span",{staticClass:"spinner position-absolute-center"},[s("span",{staticClass:"spinner-border spinner-border-sm align-middle",attrs:{role:"status","aria-hidden":"true"}})]):t._e(),t._v(" "),s("div",{class:{"opacity-0":t.loading}},[t.icon?[s("i",{class:t.icon}),t._v("  ")]:t._e(),t._t("default")],2)])}),[],!1,null,null,null);e.a=o.exports},"UEn/":function(t,e,s){"use strict";var a=s("4m4z"),i=s("Zha+"),o={components:{VueCheckbox:a.a,ChevronDownIcon:i.a},props:{drop:{type:String,default:"dropdown"},placeholder:{type:String,default:""},options:{type:Array,default:[]},value:{type:[Number,String,Array,Object]},multiple:{type:Boolean,default:!1},searchable:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},button_class:{type:String,default:""},dropdown_class:{type:String,default:""},label:{type:String,default:""},caret:{type:Boolean,default:!0},container_class:{type:String,default:""},suggestion:{type:Boolean,default:!1}},data:function(){return{selected_value:{},search:"",show_no_results:!0,show:!1,focused:!1}},computed:{select_placeholder:function(){var t=this,e=this.placeholder;if(this.selected_value)if(this.multiple){var s=[];this.selected_value.forEach((function(e){var a=t.options.find((function(t){return t.value==e||t.value.id&&e.id&&t.value.id==e.id}));a&&s.push(a.text)})),s.length>0&&(e=s.join(", "))}else e=(this.options.find((function(e){return e.value==t.selected_value}))||{}).text||this.placeholder;return e},filtered_options:function(){var t=this;return this.options.filter((function(e){var s=!0;!t.multiple&&t.searchable&&void 0!==t.search&&t.search.trim().length>0&&(e.text.toLowerCase().indexOf(t.search.trim().toLowerCase())<0&&(s=!1));return s}))},toggle_button_class:function(){var t=this.searchable?"cursor-text ":"cursor-pointer ";return t+=this.button_class}},watch:{value:function(t){this.selected_value=t,t||(this.search="")},search:function(t){var e=this;this.suggestion&&(this.selected_value=t,this.$emit("input",this.selected_value)),this.$nextTick((function(){$(e.$refs["dropdown-toggle"]).dropdown("update")}))}},created:function(){this.selected_value=this.value},mounted:function(){var t=this;$(this.$refs.dropdown).on("show.bs.dropdown",(function(){t.$refs["input-searchable"]&&t.$refs["input-searchable"].removeAttribute("readonly"),t.show_no_results=!0,t.suggestion||(t.search=""),t.searchable&&setTimeout((function(){t.$refs["input-searchable"].focus()}))})),$(this.$refs.dropdown).on("hide.bs.dropdown",(function(){t.suggestion?t.search=t.selected_value:t.search=t.selected_value?t.select_placeholder:"",t.$refs["input-searchable"]&&!t.suggestion&&t.$refs["input-searchable"].setAttribute("readonly",!0)})),$(this.$refs.dropdown).on("hidden.bs.dropdown",(function(){t.show_no_results=!1}))},methods:{inputBlurred:function(){var t=this;this.suggestion&&setTimeout((function(){t.focused=!1}),100)},inputFocused:function(t){var e=this;t.relatedTarget&&"submit"==t.relatedTarget.type&&this.$refs["dropdown-toggle"].click(),this.suggestion&&setTimeout((function(){e.focused=!0}),100)},updateValue:function(t){if(this.multiple){this.selected_value=this.selected_value||[];var e=this.selected_value.findIndex((function(e){return e==t.value||e.id&&t.value.id&&e.id==t.value.id}));-1==e?this.selected_value.push(t.value):this.selected_value.splice(e,1),this.search=this.placeholder}else this.selected_value=t.value,this.suggestion||(this.search=t.text);this.$emit("change",this.selected_value),this.$emit("input",this.selected_value)}}},n=(s("ih+N"),s("KHd+")),l=Object(n.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.container_class},[s("div",{ref:"dropdown",staticClass:"dropdown",class:t.drop,attrs:{disabled:t.disabled}},[s("button",{ref:"dropdown-toggle",staticClass:"btn dropdown-toggle text-left d-inline-flex align-items-center",class:t.toggle_button_class,attrs:{type:"button",disabled:t.disabled,"data-toggle":"dropdown"}},[t.label?s("span",{staticClass:"text-secondary mr-2"},[t._v(t._s(t.label))]):t._e(),t._v(" "),t.searchable?[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],ref:"input-searchable",staticClass:"p-0 form-control shadow-none border-0 outline-0 input-searchable w-100 bg-transparent line-height-1 font-smoothing-auto",attrs:{type:"text",spellcheck:"false",placeholder:t.select_placeholder,"data-required":t.required},domProps:{value:t.search},on:{focus:t.inputFocused,blur:t.inputBlurred,input:function(e){e.target.composing||(t.search=e.target.value)}}})]:[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selected_value,expression:"selected_value"}],staticClass:"select_hidden_value d-none",attrs:{type:"text","data-required":t.required,"data-parent":".dropdown-toggle"},domProps:{value:t.selected_value},on:{focus:t.inputFocused,input:function(e){e.target.composing||(t.selected_value=e.target.value)}}}),t._v(" "),s("div",{staticClass:"text-ellipsis",class:{"text-muted":!t.selected_value||0==t.selected_value.length}},[t._v(t._s(t.select_placeholder))])],t._v(" "),t.caret?s("div",{staticClass:"ml-auto line-height-0"},[s("chevron-down-icon",{staticClass:"ml-2 dropdown-caret",attrs:{width:"8",height:"8",transform:"scale(3)"}})],1):t._e()],2),t._v(" "),s("div",{ref:"dropdown-menu",staticClass:"bg-white dropdown-menu",class:[t.dropdown_class],attrs:{hidden:0==t.filtered_options.length&&t.suggestion}},[s("div",{ref:"scrollable-menu",staticClass:"scrollable-menu"},[0==t.filtered_options.length?s("span",{staticClass:"dropdown-item disabled pl-3 font-weight-light"},[t.show_no_results?s("span",{staticClass:"text-muted"},[t._v("No results found")]):t._e()]):t._l(t.filtered_options,(function(e,a){return s("span",{key:a,staticClass:"dropdown-item cursor-pointer",class:{active:!t.multiple&&e.value==t.selected_value},attrs:{id:"item-"+e.value},on:{click:function(s){return s.preventDefault(),t.updateValue(e)}}},[t.multiple?s("vue-checkbox",{attrs:{value:(t.selected_value||[]).find((function(t){return t==e.value||t.id&&e.value.id&&t.id==e.value.id})),label:e.text}}):s("span",[t._v(t._s(e.text))])],1)}))],2)])])])}),[],!1,null,"7d9d986e",null);e.a=l.exports},bcHF:function(t,e,s){"use strict";s.r(e);var a=s("o0o1"),i=s.n(a),o=s("Wgwc"),n=s.n(o),l=s("WIcW"),r=s.n(l),c=s("L2JU"),d=s("jBWl"),u=s("MCve"),h=s("dRai"),v=s("T1qZ"),f=s("UEn/"),p=s("ITrF");function g(t,e,s,a,i,o,n){try{var l=t[o](n),r=l.value}catch(t){return void s(t)}l.done?e(r):Promise.resolve(r).then(a,i)}function m(t){return function(){var e=this,s=arguments;return new Promise((function(a,i){var o=t.apply(e,s);function n(t){g(o,a,i,n,l,"next",t)}function l(t){g(o,a,i,n,l,"throw",t)}n(void 0)}))}}function b(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function _(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?b(Object(s),!0).forEach((function(e){w(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):b(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function w(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var k=s("s3Wo"),y=s("i93w");n.a.extend(k),n.a.extend(y);var x={components:{VCalendar:r.a,Modal:d.a,VueFormValidate:u.a,MoreIcon:h.a,VueButton:v.a,VueSelect:f.a,ShortcutIcon:p.a},data:function(){return{selectedBooking:null,selectedDate:null,selectedTimeslot:null,selectAttribute:{highlight:{fillMode:"solid",contentClass:"bg-primary"}},days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],step:1,error:"",dayjs:n.a,serviceMembers:[],timeslots:[],bookingModalLoading:!1}},computed:_(_({},Object(c.d)({ready:function(t){return t.bookings.ready},bookings:function(t){return t.bookings.index}})),{},{formattedHolidays:function(){var t=this,e=[];if(this.selectedBooking.service){this.selectedBooking.service.holidays.forEach((function(t){var s=t.split("-"),a=new Date(s[0],s[1]-1,s[2]);e.push(a)}));var s=[];this.days.forEach((function(e,a){a++,t.selectedBooking.service.days[e].isOpen||s.push(a)})),s.length>0&&e.push({weekdays:s})}return e},nextDisabled:function(){var t=!0;switch(this.step){case 1:this.selectedDate&&(t=!1);break;case 2:this.selectedTimeslot&&(t=!1)}return t},buttonText:function(){var t="Next";switch(this.step){case 1:t="Select time";break;case 2:t="Update"}return t},availableTimeslots:function(){return this.timeslots.filter((function(t){return t.is_available}))}}),watch:{ready:function(t){this.$root.contentloading=!t},selectedDate:function(t){t&&(this.error=null),this.getTimeslots()}},created:function(){this.$root.contentloading=!this.ready,this.getBookings()},methods:_(_({},Object(c.b)({getBookings:"bookings/index",updateBooking:"bookings/update"})),{},{updateSelectedBooking:function(t){var e=this;return m(i.a.mark((function s(){return i.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return e.bookingModalLoading=!0,(t=JSON.parse(JSON.stringify(t))).date=n()(t.date).format("YYYY-MM-DD"),t.start=n()(t.start).format("HH:mm"),s.next=6,e.updateBooking(t).catch((function(){}));case 6:s.sent&&e.$refs.bookingModal.hide(),e.bookingModalLoading=!1;case 9:case"end":return s.stop()}}),s)})))()},editBooking:function(t){var e=JSON.parse(JSON.stringify(t));e.start=n()("".concat(e.date," ").concat(e.start)).toDate(),e.isPrevious=n()(new Date).isSameOrAfter(n()(e.start)),this.selectedBooking=e,this.getSelectedBookingNewTimeslots(t,e.date),this.$refs.bookingModal.show()},getSelectedBookingNewTimeslots:function(t,e){var s=this;return m(i.a.mark((function a(){var o;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,window.axios.get("/services/".concat(t.service.id,"?date=").concat(n()(e).format("YYYY-MM-DD"),"&single=1"));case 2:o=a.sent,s.timeslots=o.data;case 4:case"end":return a.stop()}}),a)})))()},resetStep:function(){this.step=1,this.selectedTimeslot=this.selectedDate=null},update:function(t){var e=this;if(t){var s=JSON.parse(JSON.stringify(t));s.date=n()(this.selectedDate).format("YYYY-MM-DD"),s.start=this.selectedTimeslot.time,this.updateBooking(s).then((function(){e.$refs.editModal.hide()})).catch((function(t){e.error=t.response.data.message,e.resetStep()}))}},nextStep:function(){this.nextDisabled||this.step++},getTimeslots:function(){var t=this;if(this.selectedBooking&&this.selectedDate){this.selectedTimeslot=null;var e=n()(this.selectedDate).format("YYYY-MM-DD");window.axios.get("/@".concat(this.selectedBooking.service.user.username,"/").concat(this.selectedBooking.service.id,"/timeslots?date=").concat(e)).then((function(s){var a=s.data;if(t.selectedBooking.date==e){var i=t.selectedBooking.start.split(":"),o={label:n()().hour(i[0]).minute(i[1]).format("hh:mmA"),time:t.selectedBooking.start};6==o.label.length&&(o.label="0".concat(o.label)),t.selectedTimeslot=o,a.push(o)}a=a.sort((function(t,e){return t.time>e.time?1:-1})),t.$set(t.selectedBooking.service,"timeslots",a)}))}},formatDate:function(t){return n()(t).format("MMMM D, YYYY")},formatTime:function(t){var e=t.split(":");return n()().set("hour",e[0]).set("minute",e[1]).format("hh:mmA")},destroy:function(t){t&&(this.$refs.deleteModal.hide(),window.axios.delete("/dashboard/bookings/".concat(t.id)),this.$delete(this.bookings,this.bookings.findIndex((function(e){return e.id==t.id}))))}})},C=(s("A2bC"),s("KHd+")),B=Object(C.a)(x,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"h-100"},["customer"==t.$root.auth.role.role?s("div",{staticClass:"p-4"},[t.ready?s("div",[0==t.bookings.length?s("h6",{staticClass:"text-center text-gray position-absolute-center font-weight-lighter"},[t._v("\n\t\t\t\tYou don't have any bookings yet.\n\t\t\t")]):s("div",[s("h1",{staticClass:"font-heading h3 mb-3"},[t._v("Bookings")]),t._v(" "),s("table",{staticClass:"table table-borderless mb-0"},[t._m(0),t._v(" "),s("tbody",t._l(t.bookings,(function(e){return s("tr",{key:e.vue},[s("td",{staticClass:"align-middle"},[s("strong",{staticClass:"d-block"},[t._v(t._s(e.service.name))]),t._v(" "),s("small",{staticClass:"d-block text-muted"},[t._v(t._s(e.service.coach.full_name))])]),t._v(" "),s("td",{staticClass:"align-middle"},[t._v(t._s(t.formatDate(e.date)))]),t._v(" "),s("td",{staticClass:"align-middle"},[t._v(t._s(t.formatTime(e.start)))]),t._v(" "),s("td",{staticClass:"align-middle"},[t._v(t._s(t.formatTime(e.end)))]),t._v(" "),s("td",{staticClass:"text-right align-middle",staticStyle:{width:"50px"}},[s("div",{staticClass:"dropdown"},[s("button",{staticClass:"btn btn-white p-1 line-height-0",attrs:{"data-toggle":"dropdown"}},[s("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(0.75)"}})],1),t._v(" "),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("span",{staticClass:"dropdown-item d-flex align-items-center cursor-pointer",on:{click:function(s){return t.editBooking(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t")])])])])])})),0)])]),t._v(" "),s("modal",{ref:"bookingModal",attrs:{"close-button":(t.selectedBooking||{}).isPrevious,scrollable:!1}},[t.selectedBooking?s("div",[s("h5",{staticClass:"font-heading mb-3"},[t._v("Edit Booking")]),t._v(" "),s("div",[s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Service")]),t._v(" "),s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.name))])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Coach")]),t._v(" "),s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.coach.full_name))])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Date")]),t._v(" "),t.selectedBooking.isPrevious?s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.formatDate(t.selectedBooking.date)))]):s("v-date-picker",{attrs:{"min-date":new Date,popover:{placement:"right",visibility:"click"}},on:{input:function(e){return t.getSelectedBookingNewTimeslots(t.selectedBooking,e)}},scopedSlots:t._u([{key:"default",fn:function(e){return[s("button",t._g({staticClass:"btn btn-light shadow-none",attrs:{type:"button"}},e.inputEvents),[t._v(t._s(t.formatDate(t.selectedBooking.date)))])]}}],null,!1,1537691256),model:{value:t.selectedBooking.date,callback:function(e){t.$set(t.selectedBooking,"date",e)},expression:"selectedBooking.date"}})],1),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Starts at")]),t._v(" "),t.selectedBooking.isPrevious?s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.dayjs(t.selectedBooking.start).format("hh:mmA")))]):s("div",{staticClass:"d-flex align-items-center"},[s("div",{staticClass:"dropright"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{"data-toggle":"dropdown"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.dayjs(t.selectedBooking.start).format("hh:mmA"))+"\n\t\t\t\t\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"dropdown-menu timeslots-dropdown-menu overflow-y-auto"},[0==t.availableTimeslots.length?s("div",{staticClass:"text-center text-gray small px-2 py-1 text-nowrap"},[t._v("No available timeslots")]):t._l(t.availableTimeslots,(function(e,a){return[s("button",{key:a,staticClass:"btn btn-primary btn-block mb-1",attrs:{type:"button"},on:{click:function(s){t.selectedBooking.start=t.dayjs(t.dayjs(t.selectedBooking.date).format("Y-m-d")+" "+e.time).toDate()}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]}))],2)]),t._v("\n\t\t\t\t\t\t\t\t  to  \n\t\t\t\t\t\t\t\t"+t._s(t.dayjs(t.selectedBooking.start).add(t.selectedBooking.service.duration,"minute").format("hh:mmA"))+"\n\t\t\t\t\t\t\t")])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Duration")]),t._v(" "),s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.duration)+" minutes")])]),t._v(" "),t.selectedBooking.booking_note.note?s("div",{staticClass:"d-flex align-items-center text-left mt-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25 mb-2"},[t._v("Notes")]),t._v(" "),s("p",{staticClass:"mb-0 flex-1"},[t._v(t._s(t.selectedBooking.booking_note.note))])]):t._e(),t._v(" "),t.selectedBooking.isPrevious?t._e():s("div",{staticClass:"text-left"},[Object.keys(t.selectedBooking.zoom_link).length>0?s("div",{staticClass:"mt-2"},[s("div",{staticClass:"d-flex align-items-center text-left"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Zoom Link")]),t._v(" "),s("a",{staticClass:"d-flex align-items-center",attrs:{target:"_blank",href:t.selectedBooking.zoom_link.join_url}},[t._v("\n\t\t\t\t\t\t\t\t\t\tGo to Zoom meeting\n\t\t\t\t\t\t\t\t\t\t"),s("shortcut-icon",{staticClass:"ml-1 fill-blue",attrs:{width:"16",height:"16"}})],1)])]):t._e()])]),t._v(" "),t.selectedBooking.isPrevious?t._e():s("div",{staticClass:"d-flex justify-content-between mt-4"},[s("div",{staticClass:"d-flex align-items-center"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal",disabled:t.bookingModalLoading}},[t._v("Cancel")]),t._v(" "),s("button",{staticClass:"btn btn-link text-danger",attrs:{type:"button","data-dismiss":"modal",disabled:t.bookingModalLoading},on:{click:function(e){return t.$refs.deleteBookingModal.show()}}},[t._v("Delete")])]),t._v(" "),s("vue-button",{attrs:{type:"button",button_class:"btn btn-primary shadow-sm border",loading:t.bookingModalLoading},nativeOn:{click:function(e){return t.updateSelectedBooking(t.selectedBooking)}}},[t._v("Update")])],1)]):t._e()]),t._v(" "),s("modal",{ref:"deleteBookingModal",attrs:{"close-button":!1}},[t.selectedBooking?[s("h5",{staticClass:"font-heading text-center"},[t._v("Delete Booking")]),t._v(" "),s("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\t\t\tAre you sure to delete this booking?\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(e){return t.$refs.bookingModal.show()}}},[t._v("\n\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t")]),t._v(" "),s("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){t.confirmDeleteBooking(t.selectedBooking),t.$refs.deleteBookingModal.hide()}}},[t._v("\n\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t")])])]:t._e()],2)],1):t._e()]):s("router-view")],1)}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticClass:"border-0"},[t._v("Service")]),t._v(" "),s("th",{staticClass:"border-0"},[t._v("Date")]),t._v(" "),s("th",{staticClass:"border-0"},[t._v("Start")]),t._v(" "),s("th",{staticClass:"border-0"},[t._v("End")]),t._v(" "),s("th",{staticClass:"border-0"})])])}],!1,null,null,null);e.default=B.exports},dRai:function(t,e,s){"use strict";var a={name:"more"},i=s("KHd+"),o=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"3",height:"11",viewBox:"0 0 3 11"}},[e("g",[e("path",{attrs:{"fill-rule":"evenodd",d:"M1.34444874 0h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444874 0 .74202145-.60242728 1.34444873-1.34444873 1.34444873h-.0888935C.60242728 2.68889747 0 2.0864702 0 1.34444874 0 .60242728.60242728 0 1.34444874 0z"}}),this._v(" "),e("path",{attrs:{"fill-rule":"evenodd",d:"M1.34444874 4.25333331h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444874 0 .74202145-.60242728 1.34444873-1.34444873 1.34444873h-.0888935C.60242728 6.94223078 0 6.3398035 0 5.59778205 0 4.85576059.60242728 4.2533333 1.34444874 4.2533333z"}}),this._v(" "),e("path",{attrs:{"fill-rule":"evenodd",d:"M1.34444874 8.31112253h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444873 0 .74202146-.60242728 1.34444874-1.34444873 1.34444874h-.0888935C.60242728 11.00002 0 10.39759272 0 9.65557126c0-.74202145.60242728-1.34444873 1.34444874-1.34444873z"}})])])}),[],!1,null,null,null);e.a=o.exports},i93w:function(t,e,s){t.exports=function(){"use strict";return function(t,e){e.prototype.isSameOrAfter=function(t,e){return this.isSame(t,e)||this.isAfter(t,e)}}}()},"ih+N":function(t,e,s){"use strict";s("rHI3")},klEr:function(t,e,s){(e=s("JPst")(!1)).push([t.i,'.v-calendar .vc-title{font-family:"Avenir Next";font-size:18px}.v-calendar .vc-day-content{line-height:1}.form-body{height:270px}.w-20{width:20% !important}',""]),t.exports=e},m7aA:function(t,e,s){(e=s("JPst")(!1)).push([t.i,'.checkbox label[data-v-f104808c]{cursor:pointer;line-height:20px}.checkbox label[data-v-f104808c]:after{content:"";display:table;clear:both}.checkbox .cr[data-v-f104808c]{position:relative;display:inline-block;border:1px solid #ddd;border-radius:.25em;width:1.2em;height:1.2em;float:left;margin-right:.5em;transition:all .1s ease-in-out}.checkbox .cr svg[data-v-f104808c]{position:absolute;font-size:.7em;line-height:0;top:50%;left:50%;transform:translate(-50%, -50%);transition:all .1s ease-in-out}.checkbox label input[type=checkbox][data-v-f104808c]{display:none}.checkbox label input[type=checkbox]+.cr>svg[data-v-f104808c]{opacity:0}.checkbox label input[type=checkbox]:checked+.cr>svg[data-v-f104808c]{opacity:1}.checkbox label input[type=checkbox]:checked+.cr[data-v-f104808c]{border-color:#5a5adf;background-color:#5a5adf}.checkbox label input[type=checkbox]:disabled+.cr[data-v-f104808c]{opacity:.5}.checkbox.disabled[data-v-f104808c]{pointer-events:none !important}.checkbox.disabled span[data-v-f104808c]{opacity:.3}',""]),t.exports=e},rHI3:function(t,e,s){var a=s("wyyO");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},s3Wo:function(t,e,s){t.exports=function(){"use strict";return function(t,e){e.prototype.isSameOrBefore=function(t,e){return this.isSame(t,e)||this.isBefore(t,e)}}}()},sPWh:function(t,e,s){var a=s("klEr");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},vqo1:function(t,e,s){"use strict";var a={name:"checkmark"},i=s("KHd+"),o=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"}})])}),[],!1,null,null,null);e.a=o.exports},wyyO:function(t,e,s){(e=s("JPst")(!1)).push([t.i,".dropdown .dropdown-item.active[data-v-7d9d986e]{font-weight:600}.dropdown .select_hidden_value[data-v-7d9d986e]{position:absolute;z-index:-1}.dropdown .dropdown-caret[data-v-7d9d986e]{fill:#adb5bd;transition:all .1s ease-in-out}.dropdown .dropdown-toggle:hover .dropdown-caret[data-v-7d9d986e]{fill:#5a5adf}.dropdown.show .dropdown-toggle[data-v-7d9d986e]:focus-within{box-shadow:0 0 0 .05rem #5a5adf;border-color:#5a5adf !important}.dropdown.show .dropdown-toggle:focus-within .dropdown-caret[data-v-7d9d986e]{fill:#5a5adf}.dropdown .placeholder-body[data-v-7d9d986e]:not(:focus)::placeholder{color:#000}.input-searchable[data-v-7d9d986e]:not(:focus){cursor:pointer}.visibility-hidden[data-v-7d9d986e]{visibility:hidden}.scrollable-menu[data-v-7d9d986e]{max-height:300px;overflow-y:auto}",""]),t.exports=e}}]);