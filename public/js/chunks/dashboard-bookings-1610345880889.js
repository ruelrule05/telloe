(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"/hYp":function(t,e,s){"use strict";var a=s("o0o1"),i=s.n(a),n=s("XPXJ"),o=s("/X8E"),r=s("vX9Q"),l=s("kdyA"),c=s("IGiv"),d=s("eeqt"),u=s("LzrZ"),m=s("vqo1"),v=s("Wgwc"),h=s.n(v),f=s("WIcW"),g=s.n(f),p=s("pl0M"),b=s.n(p),_=s("5cWj"),k=s("375c"),y=s("MCve"),w=s("UEn/"),C=s("KlRW"),x=s("jBWl"),D=s("xFjY"),T=s.n(D);function S(t,e,s,a,i,n,o){try{var r=t[n](o),l=r.value}catch(t){return void s(t)}r.done?e(l):Promise.resolve(l).then(a,i)}var M=s("s3Wo"),B=s("i93w");h.a.extend(M),h.a.extend(B),window.Vue.use(g.a),window.Vue.use(b.a,{position:"bottom-center",duration:3e3,className:"bg-primary rounded shadow-none"});var Y=T.a.determine(),O={components:{ClockIcon:n.a,CloseIcon:o.a,ChevronLeftIcon:l.a,ChevronRightIcon:c.a,ArrowLeftIcon:d.a,MapMarkerIcon:u.a,CheckmarkIcon:m.a,ToggleSwitch:_.a,MoreIcon:k.a,VueFormValidate:y.a,VueSelect:w.a,CheckmarkCircleIcon:C.a,Modal:x.a},directives:{tooltip:r.a},props:{auth:{type:Boolean,default:!1},contactID:{type:Number,default:0},services:{type:Array,default:[]}},data:function(){return{selectedService:null,open:!1,opacity:0,startDate:null,selectedTimeslots:[],selectedTimeslot:!1,authError:"",error:null,masks:{input:"MMM D, YYYY"},timeslotsLoading:!1,timeslots:[],dayjs:h.a,recurringFrequencies:[{text:"Week",value:"week"},{text:"Month",value:"month"}],days:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],bookingSuccess:!1,bookings:[]}},computed:{tabDates:function(){for(var t=[],e=7,s=h()(this.startDate);e>0;)t.push({name:s.format("ddd"),dayName:s.format("dddd"),date:s.toDate(),label:s.format("MMM DD"),format:s.format("YYYY-MM-DD")}),s=s.add(1,"day"),e--;return t}},watch:{"selectedService.id":function(){this.getServiceTimeslots()},startDate:function(t){t&&(this.error=null),this.authError="",this.getServiceTimeslots()}},created:function(){this.timezone=Y.name(),this.startDate=h()().toDate()},methods:{formatTime:function(t){var e=t.split(":"),s=h()().hour(e[0]).minute(e[1]).format("hh:mmA");return s},submit:function(){var t=this,e=this.assignedService||this.selectedService;e&&this.selectedTimeslots.length>0&&this.$refs.bookingModal.show().then((function(){t.isBooking=!0;var s={timeslots:t.selectedTimeslots},a=null;if(t.auth?a="auth=true":t.contactID&&(a="contact_id=".concat(t.contactID)),a){var i="/@".concat(e.user.username,"/").concat(e.id,"/login_and_book?").concat(a);window.axios.post(i,s,{toasted:!0}).then((function(e){t.bookingSuccess=!0,t.authForm=!1,t.selectedTimeslots=[],t.bookings=e.data})).catch((function(){setTimeout((function(){t.$refs.bookingModal.hide().then((function(){t.isBooking=!1}))}),150)}))}}))},daysInMonth:function(t){return[{text:"First ".concat(t.date.dayName," of the month"),value:"first_week"},{text:"Second ".concat(t.date.dayName," of the month"),value:"second_week"},{text:"Third ".concat(t.date.dayName," of the month"),value:"third_week"},{text:"Last ".concat(t.date.dayName," of the month"),value:"last_week"}]},setTimeslotDefaultDay:function(t,e){if("week"==t){var s=this.days.indexOf(e.date.dayName);-1!=e.days.indexOf(s)&&1!=e.days.length||e.days.push(s)}else"month"==t&&(e.day_in_month="first_week")},timeslotToggleDay:function(t,e){var s=t.days.indexOf(e);if(-1==s?t.days.push(e):t.days.splice(s,1),0==t.days.length){var a=this.days.indexOf(t.date.dayName);t.days.push(a)}},endTime:function(t){var e="";if(this.selectedService&&this.startDate){var s=h()(h()(this.startDate).format("YYYY-MM-DD")+" "+t);e=h()(s).add(this.selectedService.duration,"minute").format("hh:mmA")}return e},formatDate:function(t){return h()(t).format("MMMM D, YYYY")},summary:function(){this.selectedTimeslots.length>0&&(this.selectedTimeslot=!0)},setSelectedDateAndTimeslot:function(t,e){if(e.is_available){var s=this.selectedTimeslots.findIndex((function(s){return s.date.dayName==t.dayName&&s.timeslot.time==e.time}));s>-1?this.selectedTimeslots.splice(s,1):this.selectedTimeslots.push({date:t,timeslot:e,days:[]})}},reset:function(){this.startDate=h()().toDate(),this.selectedService=null,this.selectedTimeslots=[]},getTimeZoneOffset:function(t,e){var s={timeZone:e,calendar:"iso8601",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},a=new Intl.DateTimeFormat(void 0,s).formatToParts(t),i=new Map(a.map((function(t){return[t.type,t.value]}))),n=i.get("year"),o=i.get("month"),r=i.get("day"),l=i.get("hour"),c=i.get("minute"),d=i.get("second"),u=t.getMilliseconds().toString().padStart(3,"0");"24"==l&&(l="00");var m="".concat(n,"-").concat(o,"-").concat(r,"T").concat(l,":").concat(c,":").concat(d,".").concat(u);return-(new Date(m+"Z")-t)/60/1e3},timezoneTime:function(t){var e,s=this.selectedService.user.timezone;if(s!=this.timezone){var a=this.getTimeZoneOffset(new Date,s),i=this.getTimeZoneOffset(new Date,this.timezone),n="".concat(h()(this.startDate).format("YYYY-MM-DD")," ").concat(t);e=h()(n).add(a-i,"minute")}else e=h()("".concat(h()(this.startDate).format("YYYY-MM-DD")," ").concat(t));return e.format("hh:mmA")},timezoneTooltip:function(t,e){return'\n\t\t\t\t<div class="text-left py-1 line-height-base">\n\t\t\t\t\t<div class="mb-2"><div>'.concat(t,"</div><div><strong>").concat(e.label,"</strong></div></div>\n\t\t\t\t\t<div>").concat(this.timezone,"</div><div><strong>").concat(this.timezoneTime(e.time),"</strong></div>\n\t\t\t\t</div>\n\t\t\t")},getServiceTimeslots:function(){var t,e=this;return(t=i.a.mark((function t(){var s;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.selectedService){t.next=8;break}return e.timeslotsLoading=!0,e.selectedTimeslot=null,t.next=5,window.axios.get("".concat(window.location.origin,"/ajax/@").concat(e.selectedService.user.username,"/").concat(e.selectedService.id,"/timeslots?date=").concat(h()(e.startDate).format("YYYY-MM-DD")),{ajax:!1});case 5:s=t.sent,e.timeslots=s.data,e.timeslotsLoading=!1;case 8:case"end":return t.stop()}}),t)})),function(){var e=this,s=arguments;return new Promise((function(a,i){var n=t.apply(e,s);function o(t){S(n,a,i,o,r,"next",t)}function r(t){S(n,a,i,o,r,"throw",t)}o(void 0)}))})()},previousWeek:function(){var t=h()(this.startDate).subtract(7,"day");h()(t.format("YYYY-MM-DD")).isSameOrAfter(h()(h()().format("YYYY-MM-DD")))?this.startDate=t.toDate():h()(h()(this.startDate).format("YYYY-MM-DD")).isSame(h()(h()().format("YYYY-MM-DD")))||(this.startDate=h()().toDate())},nextWeek:function(){this.startDate=h()(this.startDate).add(7,"day").toDate()},show:function(){var t=this;this.open=!0,setTimeout((function(){t.opacity=1}),50)},hide:function(){var t=this;this.opacity=0,this.$emit("hide"),setTimeout((function(){t.open=!1,t.reset()}),100)}}},j=(s("Q6Wk"),s("KHd+")),N=Object(j.a)(O,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"position-fixed w-100 h-100 p-4 overflow-auto",class:"opacity-"+t.opacity,attrs:{id:"add"}},[s("div",{staticClass:"rounded p-4 w-100 minh-100 bg-light position-relative"},[s("button",{staticClass:"btn btn-light shadow-none p-1 badge-pill btn-close",attrs:{type:"button"},on:{click:function(e){return t.hide()}}},[s("close-icon",{attrs:{width:"30",height:"30",transform:"scale(1.2)"}})],1),t._v(" "),t.selectedService?!t.selectedService||t.startDate&&t.selectedTimeslot?s("div",{key:"summary",staticClass:"container selected-service-container"},[s("vue-form-validate",{staticClass:"row justify-content-center",on:{submit:t.submit}},[s("div",{staticClass:"col-md-5"},[s("div",{staticClass:"d-flex align-items-center mb-3"},[s("button",{staticClass:"btn line-height-0 p-0 close",attrs:{type:"button"},on:{click:function(e){t.selectedTimeslot=!1}}},[s("arrow-left-icon",{attrs:{width:"30",height:"30",transform:"scale(1.2)"}})],1),t._v(" "),s("h4",{staticClass:"mb-0 font-heading ml-3"},[t._v("Confirm and Book")])]),t._v(" "),s("div",{staticClass:"bg-white shadow-sm rounded selected-service text-left d-flex"},[s("div",{staticClass:"p-4 border-right flex-1"},[s("h3",{staticClass:"h3 mb-3 font-heading"},[t._v(t._s(t.selectedService.name))]),t._v(" "),s("div",{staticClass:"mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary"},[t._v("Coach")]),t._v(" "),s("div",{staticClass:"h6 font-heading"},[t._v(t._s(t.selectedService.coach.full_name))])]),t._v(" "),s("div",{staticClass:"mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary"},[t._v("Duration")]),t._v(" "),s("div",{staticClass:"h6 font-heading"},[t._v(t._s(t.selectedService.duration)+" minutes")])]),t._v(" "),s("div",[s("div",{staticClass:"font-weight-normal text-secondary"},[t._v("Timeslots")]),t._v(" "),t._l(t.selectedTimeslots,(function(e,a){return s("div",{key:a,staticClass:"bg-light rounded p-3 mt-2"},[s("div",{staticClass:"d-flex"},[s("div",[s("h6",{staticClass:"font-heading mb-1"},[t._v(t._s(t.formatDate(e.date.date))+" ("+t._s(t.dayjs(e.date.date).format("dddd"))+")")]),t._v(" "),s("div",{staticClass:"text-muted"},[t._v(t._s(e.timeslot.label)+" - "+t._s(t.endTime(e.timeslot.time)))])]),t._v(" "),s("div",{staticClass:"dropleft ml-auto mr-n2 mt-n2"},[s("button",{staticClass:"btn btn-sm btn-light p-1 line-height-0 shadow-none",attrs:{type:"button","data-toggle":"dropdown"}},[s("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(1.3)"}})],1),t._v(" "),s("div",{staticClass:"dropdown-menu"},[s("div",{staticClass:"d-flex align-items-center px-2 py-1"},[s("span",[t._v("Recurring")]),t._v(" "),s("toggle-switch",{staticClass:"ml-auto",attrs:{"active-class":"bg-primary"},on:{input:function(s){e.is_recurring&&(t.$set(e,"end_date",t.dayjs(new Date).add(1,"week").toDate()),t.$set(e,"frequency",t.recurringFrequencies[0].value),t.setTimeslotDefaultDay("week",e))}},model:{value:e.is_recurring,callback:function(s){t.$set(e,"is_recurring",s)},expression:"timeslot.is_recurring"}})],1),t._v(" "),s("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(e){t.selectedTimeslots.splice(a,1),0==t.selectedTimeslots.length&&(t.selectedTimeslot=!1)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tRemove\n\t\t\t\t\t\t\t\t\t\t\t\t\t")])])])]),t._v(" "),e.is_recurring?s("div",[s("div",{staticClass:"mb-2"},[s("vue-select",{attrs:{dropdown_class:"w-100",button_class:"form-control mt-2",options:t.recurringFrequencies,label:"Repeat every"},on:{input:function(s){return t.setTimeslotDefaultDay(s,e)}},model:{value:e.frequency,callback:function(s){t.$set(e,"frequency",s)},expression:"timeslot.frequency"}})],1),t._v(" "),"week"==e.frequency?s("div",{staticClass:"mb-2"},t._l(t.days,(function(a,i){return s("div",{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:a,expression:"day",modifiers:{top:!0}}],key:i,staticClass:"badge badge-pill badge-day ml-1 cursor-pointer position-relative shadow-sm p-3",class:[-1==e.days.indexOf(i)?"badge-white":"badge-primary"],on:{click:function(s){return t.timeslotToggleDay(e,i)}}},[s("span",[t._v(t._s(a.substring(0,1)))])])})),0):"month"==e.frequency?s("div",{staticClass:"form-group mb-2"},[s("vue-select",{attrs:{dropdown_class:"w-100",button_class:"form-control",options:t.daysInMonth(e),label:"On"},model:{value:e.day_in_month,callback:function(s){t.$set(e,"day_in_month",s)},expression:"timeslot.day_in_month"}})],1):t._e(),t._v(" "),s("div",{staticClass:"form-group mb-0"},[s("v-date-picker",{staticClass:"flex-grow-1",attrs:{"min-date":new Date,mode:"date",popover:{placement:"right",visibility:"click"},masks:t.masks},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.inputValue,i=e.inputEvents;return[s("button",t._g({staticClass:"d-flex align-items-center form-control",attrs:{type:"button"}},i),[s("span",{staticClass:"text-secondary mr-2"},[t._v("Until")]),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(a)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])]}}],null,!0),model:{value:e.end_date,callback:function(s){t.$set(e,"end_date",s)},expression:"timeslot.end_date"}})],1)]):t._e()])}))],2),t._v(" "),s("button",{staticClass:"btn btn-primary btn-lg btn-block mt-4",attrs:{type:"submit"}},[t._v("Book")])])])])])],1):s("div",{key:"service",staticClass:"container selected-service-container"},[s("div",{staticClass:"mb-5 text-left"},[s("button",{staticClass:"btn line-height-0 p-0 close float-none mb-3 ml-n1",attrs:{type:"button"},on:{click:function(e){return t.reset()}}},[s("arrow-left-icon",{attrs:{width:"30",height:"30",transform:"scale(1.2)"}})],1),t._v(" "),s("h4",{staticClass:"mb-1 h3 font-heading"},[t._v(t._s(t.selectedService.name))]),t._v(" "),s("p",{staticClass:"mb-0 service-description"},[t._v(t._s(t.selectedService.description))]),t._v(" "),t.selectedService.address?s("p",{staticClass:"mb-0 d-flex align-items-center text-muted"},[s("map-marker-icon",{staticClass:"fill-primary",attrs:{height:"18",width:"18"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.selectedService.address)+"\n\t\t\t\t\t")],1):t._e()]),t._v(" "),s("div",{staticClass:"d-flex align-items-center pt-3"},[s("div",{staticClass:"d-flex align-items-center"},[s("div",{staticClass:"bg-white rounded shadow-sm d-flex align-items-center"},[s("button",{staticClass:"btn btn-sm btn-white p-1",attrs:{type:"button"},on:{click:function(e){return t.previousWeek()}}},[s("chevron-left-icon",{attrs:{height:"25",width:"25",transform:"scale(1.4)"}})],1),t._v(" "),s("v-date-picker",{attrs:{"min-date":new Date,popover:{placement:"bottom",visibility:"click"},masks:t.masks},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.inputValue,i=e.inputEvents;return[s("button",t._g({staticClass:"btn btn-white px-1 shadow-none rounded-0",attrs:{type:"button"}},i),[t._v(t._s(a))])]}}]),model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),s("button",{staticClass:"btn btn-sm btn-white p-1",attrs:{type:"button"},on:{click:function(e){return t.nextWeek()}}},[s("chevron-right-icon",{attrs:{height:"25",width:"25",transform:"scale(1.4)"}})],1)],1),t._v(" "),0==t.selectedTimeslots.length?s("div",{staticClass:"ml-3 text-muted"},[t._v("Select at least one (1) timeslot")]):t._e()]),t._v(" "),s("div",{directives:[{name:"tooltip",rawName:"v-tooltip.left",value:"Select at least one (1) timeslot",expression:"'Select at least one (1) timeslot'",modifiers:{left:!0}}],staticClass:"ml-auto",class:{"hide-tooltip":t.selectedTimeslots.length>0}},[s("button",{staticClass:"btn",class:[0==t.selectedTimeslots.length?"disabled":"btn-white shadow-sm"],attrs:{type:"button"},on:{click:function(e){return t.summary()}}},[t._v("\n\t\t\t\t\t\t\tContinue\n\t\t\t\t\t\t")])])]),t._v(" "),s("div",{staticClass:"text-left"},[s("div",{staticClass:"pt-3 pb-4 d-flex"},[s("div",{staticClass:"p-3 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded"},[s("table",{staticClass:"table table-sm table-borderless mb-0 table-layout-fixed"},[s("thead",[s("tr",t._l(t.tabDates,(function(e,a){return s("th",{key:a,staticClass:"align-middle pb-2 pt-0 pl-2"},[s("strong",[t._v(t._s(e.name))]),t._v(" "),s("span",{staticClass:"text-gray"},[t._v(t._s(e.label))])])})),0)]),t._v(" "),s("tbody",{staticClass:"shadow-none bg-transparent text-center"},[s("tr",t._l(t.tabDates,(function(e,a){return s("td",{key:a,staticClass:"px-2 py-0 rounded-0 position-relative"},[t.selectedService&&t.timeslots&&(t.timeslots[e.dayName]||[]).length>0?t._l(t.timeslots[e.dayName],(function(i,n){return s("div",{key:n},[s("div",{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:t.timezoneTooltip(t.selectedService.user.timezone,i),expression:"timezoneTooltip(selectedService.user.timezone, timeslot)",modifiers:{top:!0}}],key:a,staticClass:"py-2 position-relative rounded my-2 timeslot-button",class:[i.is_available?"cursor-pointer bg-primary text-white":"disabled bg-gray-400 pointer-events-none",{selected:t.selectedTimeslots.find((function(t){return t.date.dayName==e.dayName&&t.timeslot.time==i.time}))}],on:{click:function(s){return t.setSelectedDateAndTimeslot(e,i)}}},[s("span",{staticClass:"selected-checkmark position-absolute"},[s("checkmark-icon",{staticClass:"fill-green",attrs:{height:"30",width:"30"}})],1),t._v(" "),s("span",{staticClass:"text-nowrap"},[t._v(t._s(t.timezoneTime(i.time)))])])])})):s("div",{staticClass:"position-absolute-center w-100 h-100 bg-light"})],2)})),0)])]),t._v(" "),s("transition",{attrs:{name:"fade"}},[t.timeslotsLoading?s("div",{staticClass:"timeslots-loader rounded position-absolute-center w-100 h-100 bg-white"},[s("div",{staticClass:"position-absolute-center"},[s("div",{staticClass:"spinner-border text-primary",attrs:{role:"status"}})])]):t._e()])],1)])])]):[s("h2",{staticClass:"font-heading text-center"},[t._v("Available Services")]),t._v(" "),s("div",{staticClass:"container mt-5"},[s("div",{staticClass:"row justify-content-center"},t._l(t.services,(function(e){return s("div",{key:e.id,staticClass:"col-md-5"},[s("div",{staticClass:"card rounded service cursor-pointer mb-3 shadow-sm",on:{click:function(s){t.selectedService=e}}},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"d-flex align-items-center mb-3"},[s("div",{staticClass:"user-profile-image d-inline-block bg-white mb-1",style:{"background-image":"url("+e.user.profile_image+")"}},[e.user.profile_image?t._e():s("span",[t._v(t._s(e.user.initials))])]),t._v(" "),s("div",{staticClass:"pl-1"},[s("h6",{staticClass:"font-heading mb-0"},[t._v(t._s(e.user.full_name))]),t._v(" "),s("span",{staticClass:"text-muted"},[t._v("@"+t._s(e.user.username))])])]),t._v(" "),s("h3",{staticClass:"font-heading h5 mb-1"},[t._v(t._s(e.name))]),t._v(" "),s("p",{staticClass:"mb-0 text-ellipsis text-muted"},[t._v(t._s(e.description))]),t._v(" "),s("div",{staticClass:"d-flex align-items-center mt-4 line-height-1"},[s("div",{staticClass:"d-flex align-items-center"},[s("clock-icon",{attrs:{width:"11",height:"11",transform:"scale(1.5)",fill:"#6c757d"}}),t._v(" "),s("small",{staticClass:"text-muted ml-1"},[t._v(t._s(e.duration)+" min")])],1),t._v(" "),parseInt(e.default_rate)?s("div",{staticClass:"d-flex align-items-center ml-3"},[s("small",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.currency)+"\n\t\t\t\t\t\t\t\t\t\t\t\t"),s("span",{staticClass:"text-muted"},[t._v(t._s(e.default_rate))])])]):t._e()])])])])})),0)])]],2)]),t._v(" "),s("modal",{ref:"bookingModal",attrs:{id:"bookingModal","close-button":t.bookingSuccess},on:{hide:t.hide}},[s("div",{staticClass:"text-center position-relative"},[s("div",{class:{disabled:!t.bookingSuccess}},[s("checkmark-circle-icon",{staticClass:"fill-success",attrs:{width:"60",height:"60"}}),t._v(" "),s("h6",{staticClass:"h3 font-heading"},[t._v("Booking placed!")]),t._v(" "),s("p",{staticClass:"mb-4 h6 font-weight-normal text-muted"},[t._v("A booking confirmation has been sent to your email")]),t._v(" "),t._l(t.bookings,(function(e){return s("div",{key:e.id,staticClass:"rounded p-3 text-left bg-light d-flex align-items-center mt-3"},[s("div",[s("h6",{staticClass:"font-heading mb-1"},[t._v(t._s(t.formatDate(e.date)))]),t._v(" "),s("div",{staticClass:"text-muted"},[t._v(t._s(t.formatTime(e.start))+" - "+t._s(t.formatTime(e.end)))])]),t._v(" "),s("div",{staticClass:"ml-auto dropdown"},[s("button",{staticClass:"btn btn-white shadow-none",attrs:{type:"button","data-toggle":"dropdown"}},[t._v("\n\t\t\t\t\t\t\tAdd to Calendar\n\t\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"dropdown-menu"},[s("a",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",attrs:{target:"_blank",href:e.google_link}},[t._v("Google Calendar")]),t._v(" "),s("a",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",attrs:{target:"_blank",href:e.outlook_link}},[t._v("Outlook")]),t._v(" "),s("a",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",attrs:{target:"_blank",href:e.yahoo_link}},[t._v("Yahoo!")]),t._v(" "),s("a",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",attrs:{target:"_blank",href:e.ical_link}},[t._v("iCal")])])])])}))],2),t._v(" "),t.bookingSuccess?t._e():s("div",{staticClass:"position-absolute-center"},[s("div",{staticClass:"spinner-border text-primary",attrs:{role:"status"}}),t._v(" "),s("h6",{staticClass:"h3 mt-4 mb-0 font-heading"},[t._v("Booking...")])])])])],1)}),[],!1,null,"1f760a11",null);e.a=N.exports},"/yFD":function(t,e,s){var a=s("dNBw");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},A2bC:function(t,e,s){"use strict";s("sPWh")},O9dX:function(t,e,s){"use strict";s("/yFD")},Q6Wk:function(t,e,s){"use strict";s("uRu6")},RrSB:function(t,e,s){"use strict";var a=s("IGiv"),i=s("kdyA"),n={components:{ChevronRightIcon:a.a,ChevronLeftIcon:i.a},props:{data:{type:Object,require:!0}},computed:{pages:function(){for(var t=[],e=1,s=Math.ceil(this.data.total/this.data.per_page);e<=s;)t.push(e),e++;return t}},methods:{goToPage:function(t){if(t){t=new URL(t);var e=new URLSearchParams(t.search).get("page");this.change(e)}},change:function(t){this.$emit("change",t)}}},o=(s("O9dX"),s("KHd+")),r=Object(o.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.data?s("div",[s("ul",{staticClass:"pagination shadow-sm mb-0 d-inline-flex"},[s("li",{staticClass:"page-item",class:{disabled:!t.data.prev_page_url},on:{click:function(e){return t.goToPage(t.data.prev_page_url)}}},[s("span",{staticClass:"page-link cursor-pointer"},[s("chevron-left-icon",{attrs:{width:"10",height:"10",transform:"scale(3.0)"}})],1)]),t._v(" "),t._l(t.pages,(function(e){return s("li",{key:e,staticClass:"page-item",class:{active:e==t.data.current_page},on:{click:function(s){return t.change(e)}}},[s("span",{staticClass:"page-link cursor-pointer"},[t._v(t._s(e))])])})),t._v(" "),s("li",{staticClass:"page-item",class:{disabled:!t.data.next_page_url},on:{click:function(e){return t.goToPage(t.data.next_page_url)}}},[s("span",{staticClass:"page-link cursor-pointer"},[s("chevron-right-icon",{attrs:{width:"10",height:"10",transform:"scale(3.0)"}})],1)])],2)]):t._e()])}),[],!1,null,"f7e753c0",null);e.a=r.exports},U7HP:function(t,e,s){(e=s("JPst")(!1)).push([t.i,"#add[data-v-1f760a11]{top:0;left:0;z-index:1040;opacity:1;transition:all .1s ease-in-out;background-color:rgba(0,0,0,.5)}.user-profile-image[data-v-1f760a11]{height:40px;width:40px}.user-profile-image span[data-v-1f760a11]{font-size:16px}.timeslot-button[data-v-1f760a11]{-moz-user-select:none;-webkit-user-select:none;user-select:none}.timeslot-button .selected-checkmark[data-v-1f760a11]{right:-2px;top:50%;transform:translateY(-50%);opacity:0}.timeslot-button.selected[data-v-1f760a11]{background-color:#ffc107 !important}.timeslot-button.selected .selected-checkmark[data-v-1f760a11]{opacity:1}.badge-day[data-v-1f760a11]{width:25px;height:25px}.badge-day span[data-v-1f760a11]{position:absolute;top:49%;left:50%;transform:translate(-50%, -50%)}#bookingModal .disabled[data-v-1f760a11]{opacity:0 !important;pointer-events:none !important}.table-layout-fixed[data-v-1f760a11]{table-layout:fixed !important}.hide-tooltip .tooltip[data-v-1f760a11]{display:none !important;opacity:0 !important;visibility:hidden !important}.minh-100[data-v-1f760a11]{min-height:100%}",""]),t.exports=e},bcHF:function(t,e,s){"use strict";s.r(e);var a=s("o0o1"),i=s.n(a),n=s("Wgwc"),o=s.n(n),r=s("WIcW"),l=s.n(r),c=s("L2JU"),d=s("jBWl"),u=s("MCve"),m=s("dRai"),v=s("T1qZ"),h=s("UEn/"),f=s("ITrF"),g=s("cmxz"),p=s("/hYp"),b=s("RrSB");function _(t,e,s,a,i,n,o){try{var r=t[n](o),l=r.value}catch(t){return void s(t)}r.done?e(l):Promise.resolve(l).then(a,i)}function k(t){return function(){var e=this,s=arguments;return new Promise((function(a,i){var n=t.apply(e,s);function o(t){_(n,a,i,o,r,"next",t)}function r(t){_(n,a,i,o,r,"throw",t)}o(void 0)}))}}function y(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function w(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?y(Object(s),!0).forEach((function(e){C(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):y(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function C(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var x=s("s3Wo"),D=s("i93w");o.a.extend(x),o.a.extend(D);var T={components:{VCalendar:l.a,Modal:d.a,VueFormValidate:u.a,MoreIcon:m.a,VueButton:v.a,VueSelect:h.a,ShortcutIcon:f.a,PlusIcon:g.a,Add:p.a,Paginate:b.a},data:function(){return{selectedBooking:null,selectedDate:null,selectedTimeslot:null,selectAttribute:{highlight:{fillMode:"solid",contentClass:"bg-primary"}},days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],step:1,error:"",dayjs:o.a,serviceMembers:[],timeslots:[],bookingModalLoading:!1,services:[]}},computed:w(w({},Object(c.d)({ready:function(t){return t.bookings.ready},bookings:function(t){return t.bookings.paginated}})),{},{formattedHolidays:function(){var t=this,e=[];if(this.selectedBooking.service){this.selectedBooking.service.holidays.forEach((function(t){var s=t.split("-"),a=new Date(s[0],s[1]-1,s[2]);e.push(a)}));var s=[];this.days.forEach((function(e,a){a++,t.selectedBooking.service.days[e].isOpen||s.push(a)})),s.length>0&&e.push({weekdays:s})}return e},nextDisabled:function(){var t=!0;switch(this.step){case 1:this.selectedDate&&(t=!1);break;case 2:this.selectedTimeslot&&(t=!1)}return t},buttonText:function(){var t="Next";switch(this.step){case 1:t="Select time";break;case 2:t="Update"}return t},availableTimeslots:function(){return this.timeslots.filter((function(t){return t.is_available}))}}),watch:{ready:function(t){this.$root.contentloading=!t},selectedDate:function(t){t&&(this.error=null),this.getTimeslots()}},created:function(){this.$root.contentloading=!this.ready,this.getBookings({paginate:!0}),this.getServices()},methods:w(w({},Object(c.b)({getBookings:"bookings/index",updateBooking:"bookings/update",deleteBooking:"bookings/delete"})),{},{getServices:function(){var t=this;return k(i.a.mark((function e(){var s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.axios.get("/services/contact_services");case 2:s=e.sent,t.services=s.data;case 4:case"end":return e.stop()}}),e)})))()},confirmDeleteBooking:function(t){var e=this;return k(i.a.mark((function s(){return i.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.deleteBooking(t);case 2:case"end":return s.stop()}}),s)})))()},getData:function(t){var e=this;return k(i.a.mark((function s(){return i.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:e.getBookings({page:t,paginate:!0});case 1:case"end":return s.stop()}}),s)})))()},updateSelectedBooking:function(t){var e=this;return k(i.a.mark((function s(){return i.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return e.bookingModalLoading=!0,(t=JSON.parse(JSON.stringify(t))).date=o()(t.date).format("YYYY-MM-DD"),t.start=o()(t.start).format("HH:mm"),s.next=6,e.updateBooking(t).catch((function(){}));case 6:s.sent&&e.$refs.bookingModal.hide(),e.bookingModalLoading=!1;case 9:case"end":return s.stop()}}),s)})))()},editBooking:function(t){var e=JSON.parse(JSON.stringify(t));e.start=o()("".concat(e.date," ").concat(e.start)).toDate(),e.isPrevious=o()(new Date).isSameOrAfter(o()(e.start)),this.selectedBooking=e,this.getSelectedBookingNewTimeslots(t,e.date),this.$refs.bookingModal.show()},getSelectedBookingNewTimeslots:function(t,e){var s=this;return k(i.a.mark((function a(){var n;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,window.axios.get("/services/".concat(t.service.id,"?date=").concat(o()(e).format("YYYY-MM-DD"),"&single=1"));case 2:n=a.sent,s.timeslots=n.data;case 4:case"end":return a.stop()}}),a)})))()},resetStep:function(){this.step=1,this.selectedTimeslot=this.selectedDate=null},update:function(t){var e=this;if(t){var s=JSON.parse(JSON.stringify(t));s.date=o()(this.selectedDate).format("YYYY-MM-DD"),s.start=this.selectedTimeslot.time,this.updateBooking(s).then((function(){e.$refs.editModal.hide()})).catch((function(t){e.error=t.response.data.message,e.resetStep()}))}},nextStep:function(){this.nextDisabled||this.step++},getTimeslots:function(){var t=this;if(this.selectedBooking&&this.selectedDate){this.selectedTimeslot=null;var e=o()(this.selectedDate).format("YYYY-MM-DD");window.axios.get("/@".concat(this.selectedBooking.service.user.username,"/").concat(this.selectedBooking.service.id,"/timeslots?date=").concat(e)).then((function(s){var a=s.data;if(t.selectedBooking.date==e){var i=t.selectedBooking.start.split(":"),n={label:o()().hour(i[0]).minute(i[1]).format("hh:mmA"),time:t.selectedBooking.start};6==n.label.length&&(n.label="0".concat(n.label)),t.selectedTimeslot=n,a.push(n)}a=a.sort((function(t,e){return t.time>e.time?1:-1})),t.$set(t.selectedBooking.service,"timeslots",a)}))}},formatDate:function(t){return o()(t).format("MMMM D, YYYY")},formatTime:function(t){var e=t.split(":");return o()().set("hour",e[0]).set("minute",e[1]).format("hh:mmA")},destroy:function(t){t&&(this.$refs.deleteModal.hide(),window.axios.delete("/dashboard/bookings/".concat(t.id)),this.$delete(this.bookings,this.bookings.findIndex((function(e){return e.id==t.id}))))}})},S=(s("A2bC"),s("KHd+")),M=Object(S.a)(T,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"h-100"},["customer"==t.$root.auth.role.role?s("div",{staticClass:"h-100"},[t.ready?s("div",{staticClass:"overflow-hidden h-100"},[0==t.bookings.length?s("h6",{staticClass:"text-center text-gray position-absolute-center font-weight-lighter"},[t._v("\n\t\t\t\tYou don't have any bookings yet.\n\t\t\t")]):s("div",{staticClass:"d-flex flex-column h-100"},[s("div",{staticClass:"d-flex mb-3 px-4 pt-4"},[s("h1",{staticClass:"font-heading h3 mb-0"},[t._v("Bookings")]),t._v(" "),s("div",{staticClass:"ml-auto d-flex align-items-center"},[s("button",{staticClass:"btn btn-primary d-flex align-items-center",attrs:{type:"button"},on:{click:function(e){return t.$refs.add.show()}}},[s("plus-icon",{staticClass:"btn-icon fill-white",staticStyle:{stroke:"white"}}),t._v("\n\t\t\t\t\t\t\tAdd Booking\n\t\t\t\t\t\t")],1)])]),t._v(" "),s("div",{staticClass:"overflow-auto flex-grow-1 px-4 pb-4"},[s("paginate",{attrs:{data:t.bookings},on:{change:t.getData}}),t._v(" "),s("table",{staticClass:"table table-borderless mb-0"},[t._m(0),t._v(" "),s("tbody",t._l(t.bookings.data,(function(e){return s("tr",{key:e.vue},[s("td",{staticClass:"align-middle"},[s("strong",{staticClass:"d-block"},[t._v(t._s(e.service.name))]),t._v(" "),s("small",{staticClass:"d-block text-muted"},[t._v(t._s(e.service.coach.full_name))])]),t._v(" "),s("td",{staticClass:"align-middle"},[t._v(t._s(t.formatDate(e.date)))]),t._v(" "),s("td",{staticClass:"align-middle"},[t._v(t._s(t.formatTime(e.start)))]),t._v(" "),s("td",{staticClass:"align-middle"},[t._v(t._s(t.formatTime(e.end)))]),t._v(" "),s("td",{staticClass:"text-right align-middle",staticStyle:{width:"50px"}},[s("div",{staticClass:"dropdown"},[s("button",{staticClass:"btn btn-white p-1 line-height-0",attrs:{"data-toggle":"dropdown"}},[s("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(0.75)"}})],1),t._v(" "),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("span",{staticClass:"dropdown-item d-flex align-items-center cursor-pointer",on:{click:function(s){return t.editBooking(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t")])])])])])})),0)])],1)]),t._v(" "),s("modal",{ref:"bookingModal",attrs:{"close-button":(t.selectedBooking||{}).isPrevious,scrollable:!1}},[t.selectedBooking?s("div",[s("h5",{staticClass:"font-heading mb-3"},[t._v("Edit Booking")]),t._v(" "),s("div",[s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Service")]),t._v(" "),s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.name))])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Coach")]),t._v(" "),s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.coach.full_name))])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Date")]),t._v(" "),t.selectedBooking.isPrevious?s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.formatDate(t.selectedBooking.date)))]):s("v-date-picker",{attrs:{"min-date":new Date,popover:{placement:"right",visibility:"click"}},on:{input:function(e){return t.getSelectedBookingNewTimeslots(t.selectedBooking,e)}},scopedSlots:t._u([{key:"default",fn:function(e){return[s("button",t._g({staticClass:"btn btn-light shadow-none",attrs:{type:"button"}},e.inputEvents),[t._v(t._s(t.formatDate(t.selectedBooking.date)))])]}}],null,!1,1537691256),model:{value:t.selectedBooking.date,callback:function(e){t.$set(t.selectedBooking,"date",e)},expression:"selectedBooking.date"}})],1),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left mb-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Starts at")]),t._v(" "),t.selectedBooking.isPrevious?s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.dayjs(t.selectedBooking.start).format("hh:mmA")))]):s("div",{staticClass:"d-flex align-items-center"},[s("div",{staticClass:"dropright"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{"data-toggle":"dropdown"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.dayjs(t.selectedBooking.start).format("hh:mmA"))+"\n\t\t\t\t\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"dropdown-menu timeslots-dropdown-menu overflow-y-auto"},[0==t.availableTimeslots.length?s("div",{staticClass:"text-center text-gray small px-2 py-1 text-nowrap"},[t._v("No available timeslots")]):t._l(t.availableTimeslots,(function(e,a){return[s("button",{key:a,staticClass:"btn btn-primary btn-block mb-1",attrs:{type:"button"},on:{click:function(s){t.selectedBooking.start=t.dayjs(t.dayjs(t.selectedBooking.date).format("Y-m-d")+" "+e.time).toDate()}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]}))],2)]),t._v("\n\t\t\t\t\t\t\t\t  to  \n\t\t\t\t\t\t\t\t"+t._s(t.dayjs(t.selectedBooking.start).add(t.selectedBooking.service.duration,"minute").format("hh:mmA"))+"\n\t\t\t\t\t\t\t")])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-left"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Duration")]),t._v(" "),s("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.duration)+" minutes")])]),t._v(" "),t.selectedBooking.booking_note.note?s("div",{staticClass:"d-flex align-items-center text-left mt-3"},[s("div",{staticClass:"font-weight-normal text-secondary w-25 mb-2"},[t._v("Notes")]),t._v(" "),s("p",{staticClass:"mb-0 flex-1"},[t._v(t._s(t.selectedBooking.booking_note.note))])]):t._e(),t._v(" "),t.selectedBooking.isPrevious?t._e():s("div",{staticClass:"text-left"},[Object.keys(t.selectedBooking.zoom_link).length>0?s("div",{staticClass:"mt-2"},[s("div",{staticClass:"d-flex align-items-center text-left"},[s("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Zoom Link")]),t._v(" "),s("a",{staticClass:"d-flex align-items-center",attrs:{target:"_blank",href:t.selectedBooking.zoom_link.join_url}},[t._v("\n\t\t\t\t\t\t\t\t\t\tGo to Zoom meeting\n\t\t\t\t\t\t\t\t\t\t"),s("shortcut-icon",{staticClass:"ml-1 fill-blue",attrs:{width:"16",height:"16"}})],1)])]):t._e()])]),t._v(" "),t.selectedBooking.isPrevious?t._e():s("div",{staticClass:"d-flex justify-content-between mt-4"},[s("div",{staticClass:"d-flex align-items-center"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal",disabled:t.bookingModalLoading}},[t._v("Cancel")]),t._v(" "),s("button",{staticClass:"btn btn-link text-danger",attrs:{type:"button","data-dismiss":"modal",disabled:t.bookingModalLoading},on:{click:function(e){return t.$refs.deleteBookingModal.show()}}},[t._v("Delete")])]),t._v(" "),s("vue-button",{attrs:{type:"button",button_class:"btn btn-primary shadow-sm border",loading:t.bookingModalLoading},nativeOn:{click:function(e){return t.updateSelectedBooking(t.selectedBooking)}}},[t._v("Update")])],1)]):t._e()]),t._v(" "),s("modal",{ref:"deleteBookingModal",attrs:{"close-button":!1}},[t.selectedBooking?[s("h5",{staticClass:"font-heading text-center"},[t._v("Delete Booking")]),t._v(" "),s("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\t\t\tAre you sure to delete this booking?\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(e){return t.$refs.bookingModal.show()}}},[t._v("\n\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t")]),t._v(" "),s("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){t.confirmDeleteBooking(t.selectedBooking),t.$refs.deleteBookingModal.hide()}}},[t._v("\n\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t")])])]:t._e()],2)],1):t._e()]):s("router-view"),t._v(" "),s("add",{ref:"add",attrs:{services:t.services,auth:!0},on:{hide:function(e){return t.getData(1)}}})],1)}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticClass:"border-0"},[t._v("Service")]),t._v(" "),s("th",{staticClass:"border-0"},[t._v("Date")]),t._v(" "),s("th",{staticClass:"border-0"},[t._v("Start")]),t._v(" "),s("th",{staticClass:"border-0"},[t._v("End")]),t._v(" "),s("th",{staticClass:"border-0"})])])}],!1,null,null,null);e.default=M.exports},dNBw:function(t,e,s){(e=s("JPst")(!1)).push([t.i,".page-item.disabled svg[data-v-f7e753c0]{opacity:.25}",""]),t.exports=e},klEr:function(t,e,s){(e=s("JPst")(!1)).push([t.i,'.v-calendar .vc-title{font-family:"Avenir Next";font-size:18px}.v-calendar .vc-day-content{line-height:1}.form-body{height:270px}.w-20{width:20% !important}',""]),t.exports=e},sPWh:function(t,e,s){var a=s("klEr");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},uRu6:function(t,e,s){var a=s("U7HP");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)}}]);