(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"/yFD":function(t,e,n){var a=n("dNBw");"string"==typeof a&&(a=[[t.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(a,s);a.locals&&(t.exports=a.locals)},"5cWj":function(t,e,n){"use strict";var a={props:{value:{type:Boolean,default:!1},activeClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{width:100,state:!1,pressed:0,position:0}},mounted:function(){this.toggle(this.value)},computed:{style:function(){return{transform:"translateX(".concat(this.pos_percentage,")")}},pos_percentage:function(){return"".concat(this.position/this.width*100,"%")},state_class:function(){if(this.state)return this.activeClass+" active"}},watch:{value:function(t){this.toggle(t)},position:function(){this.state=this.position>=50}},methods:{onClick:function(){this.toggle(!this.state),this.emit()},toggle:function(t){this.state=t,this.position=t?100:0},dragging:function(t){var e=(t.clientX-this.$el.offsetLeft)/this.width*100;this.position=e<=0?0:e>=100?100:e},resolvePosition:function(){this.position=this.state?100:0},emit:function(){this.$emit("input",this.state)}}},s=(n("fHoB"),n("KHd+")),i=Object(s.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"toggle",class:t.state_class,attrs:{disabled:t.disabled},on:{click:function(e){return e.target!==e.currentTarget?null:t.onClick(e)}}},[n("div",{staticClass:"draggable",style:t.style})])}),[],!1,null,"22734e3b",null);e.a=i.exports},"9O57":function(t,e,n){"use strict";var a={name:"zoom"},s=n("KHd+"),i=Object(s.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{width:"48",height:"48",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z",fill:"#2D8CFF"}}),this._v(" "),e("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M38.087 15.9353L31.3043 20.884V27.135L38.087 32.0837C38.5669 32.4503 39.1304 32.5636 39.1304 31.5628V16.4562C39.1304 15.5638 38.6782 15.4517 38.087 15.9353ZM8.34782 27.7567V16.4873C8.34782 16.0263 8.72491 15.6522 9.19007 15.6522H25.6254C28.1845 15.6522 30.2609 17.7077 30.2609 20.2433V31.5127C30.2609 31.9737 29.8838 32.3478 29.4186 32.3478H12.9833C10.4242 32.3478 8.34782 30.2923 8.34782 27.7567Z",fill:"white"}})])}),[],!1,null,null,null);e.a=i.exports},ARml:function(t,e,n){(e=n("JPst")(!1)).push([t.i,".toggle[data-v-22734e3b]{cursor:pointer;width:40px;height:20px;background:#dee2e6;border-radius:200px;transition:background .6s}.toggle[disabled][data-v-22734e3b]{opacity:.5;pointer-events:none !important}.toggle .draggable[data-v-22734e3b]{pointer-events:none;width:20px;height:20px;background:#fff;border-radius:100%;box-shadow:0 0 5px rgba(0,0,0,.25);transform:translateX(0%);transition:transform .05s ease-in-out}.toggle.active[data-v-22734e3b]{background:#5a5adf;transition:background .6s}",""]),t.exports=e},AmNb:function(t,e,n){var a=n("ai67");"string"==typeof a&&(a=[[t.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(a,s);a.locals&&(t.exports=a.locals)},EL4o:function(t,e,n){"use strict";n("AmNb")},KlRW:function(t,e,n){"use strict";var a={name:"user"},s=n("KHd+"),i=Object(s.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z"}})])}),[],!1,null,null,null);e.a=i.exports},O9dX:function(t,e,n){"use strict";n("/yFD")},RrSB:function(t,e,n){"use strict";var a=n("IGiv"),s=n("kdyA"),i={components:{ChevronRightIcon:a.a,ChevronLeftIcon:s.a},props:{data:{type:Object,require:!0}},computed:{pages:function(){for(var t=[],e=1,n=Math.ceil(this.data.total/this.data.per_page);e<=n;)t.push(e),e++;return t}},methods:{goToPage:function(t){if(t){t=new URL(t);var e=new URLSearchParams(t.search).get("page");this.change(e)}},change:function(t){this.$emit("change",t)}}},o=(n("O9dX"),n("KHd+")),r=Object(o.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.data?n("div",[n("ul",{staticClass:"pagination shadow-sm mb-0 d-inline-flex"},[n("li",{staticClass:"page-item",class:{disabled:!t.data.prev_page_url},on:{click:function(e){return t.goToPage(t.data.prev_page_url)}}},[n("span",{staticClass:"page-link cursor-pointer"},[n("chevron-left-icon",{attrs:{width:"10",height:"10",transform:"scale(3.0)"}})],1)]),t._v(" "),t._l(t.pages,(function(e){return n("li",{key:e,staticClass:"page-item",class:{active:e==t.data.current_page},on:{click:function(n){return t.change(e)}}},[n("span",{staticClass:"page-link cursor-pointer"},[t._v(t._s(e))])])})),t._v(" "),n("li",{staticClass:"page-item",class:{disabled:!t.data.next_page_url},on:{click:function(e){return t.goToPage(t.data.next_page_url)}}},[n("span",{staticClass:"page-link cursor-pointer"},[n("chevron-right-icon",{attrs:{width:"10",height:"10",transform:"scale(3.0)"}})],1)])],2)]):t._e()])}),[],!1,null,"f7e753c0",null);e.a=r.exports},ai67:function(t,e,n){(e=n("JPst")(!1)).push([t.i,".user-profile-image[data-v-83ba48a0]{width:100px;height:100px}.user-profile-image span[data-v-83ba48a0]{font-size:35px}.badge-icon svg[data-v-83ba48a0]{transform:scale(1.3);margin-right:2px}.badge-icon.text-primary svg[data-v-83ba48a0]{fill:#5a5adf}.badge-icon.text-warning svg[data-v-83ba48a0]{fill:#ffc107}.service[data-v-83ba48a0]{width:33%}.profile-image[data-v-83ba48a0]{width:80px;height:80px;border-radius:50%;background-size:cover;background-size:no-repeat;background-position:center;background-color:#ced4da;position:relative}.profile-image span[data-v-83ba48a0]{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#adb5bd;font-size:24px}.profile-image.profile-image-md[data-v-83ba48a0]{width:60px;height:60px}.profile-image.profile-image-md span[data-v-83ba48a0]{font-size:24px}.timeslots-dropdown-menu[data-v-83ba48a0]{max-height:400px}",""]),t.exports=e},dNBw:function(t,e,n){(e=n("JPst")(!1)).push([t.i,".page-item.disabled svg[data-v-f7e753c0]{opacity:.25}",""]),t.exports=e},fHoB:function(t,e,n){"use strict";n("uNBS")},"l+1I":function(t,e,n){"use strict";n.r(e);var a=n("o0o1"),s=n.n(a),i=n("L2JU"),o=n("eeqt"),r=n("XPXJ"),c=n("KlRW"),l=n("dRai"),d=n("5cWj"),m=n("jBWl"),u=n("MCve"),v=n("RrSB"),g=n("Wgwc"),f=n.n(g),b=n("UEn/"),p=n("T1qZ"),h=n("WIcW"),_=n.n(h),k=n("9O57"),w=n("ITrF");function C(t,e,n,a,s,i,o){try{var r=t[i](o),c=r.value}catch(t){return void n(t)}r.done?e(c):Promise.resolve(c).then(a,s)}function x(t){return function(){var e=this,n=arguments;return new Promise((function(a,s){var i=t.apply(e,n);function o(t){C(i,a,s,o,r,"next",t)}function r(t){C(i,a,s,o,r,"throw",t)}o(void 0)}))}}function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function M(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){B(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function B(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var S=n("xCJq"),O=n("s3Wo"),$=n("i93w");f.a.extend(O),f.a.extend($),window.Vue.use(_.a);var P={components:{ArrowLeftIcon:o.a,ClockIcon:r.a,CheckmarkCircleIcon:c.a,ToggleSwitch:d.a,MoreIcon:l.a,Modal:m.a,VueFormValidate:u.a,Paginate:v.a,VueSelect:b.a,VueButton:p.a,ZoomIcon:k.a,ShortcutIcon:w.a},data:function(){return{member:null,convertTime:S,clonedMember:null,filterServices:[],selectedBooking:null,dayjs:f.a,timeslots:[],bookingModalLoading:!1,createZoomLoading:!1,serviceMembers:[]}},computed:M(M({},Object(i.d)({services:function(t){return t.services.index}})),{},{servicesList:function(){var t=[];return this.member.assigned_services.forEach((function(e){t.push({text:e.name,value:e})})),t}}),watch:{selectedBooking:function(t){this.getServiceMembers(t)}},created:function(){this.getServices(),this.getMember()},mounted:function(){var t=this;this.$root.intros.members_show.enabled&&setTimeout((function(){document.querySelector(".introjs-overlay")||t.$root.intros.members_show.intro.start()}),500)},methods:M(M({},Object(i.b)({getServices:"services/index",storeMemberService:"members/store_service",updateMember:"members/update",deleteMember:"members/delete",updateService:"services/update",deleteService:"services/delete",updateBooking:"bookings/update",deleteBooking:"bookings/delete"})),{},{confirmDeleteBooking:function(t){this.deleteBooking(t);var e=this.member.bookings.data.findIndex((function(e){return e.id==t.id}));e>-1&&this.member.bookings.data.splice(e,1)},getServiceMembers:function(t){if(t){var e=[];t.service.parent_service?(e.push({text:this.$root.auth.full_name,value:t.service.parent_service_id}),t.service.parent_service.assigned_services.forEach((function(t){e.push({text:t.coach.full_name,value:t.id})}))):(e.push({text:this.$root.auth.full_name,value:t.service_id}),t.service.assigned_services.forEach((function(t){e.push({text:t.coach.full_name,value:t.id})}))),this.serviceMembers=e}},updateSelectedBooking:function(t){var e=this;return x(s.a.mark((function n(){var a,i;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.bookingModalLoading=!0,(t=JSON.parse(JSON.stringify(t))).date=f()(t.date).format("YYYY-MM-DD"),t.start=f()(t.start).format("HH:mm"),n.next=6,e.updateBooking(t).catch((function(){}));case 6:if(!(a=n.sent)){n.next=13;break}return(i=e.member.bookings.data.findIndex((function(t){return t.id==a.id})))>-1&&e.$set(e.member.bookings.data,i,a),n.next=12,e.getMember();case 12:e.$refs.bookingModal.hide();case 13:e.bookingModalLoading=!1;case 14:case"end":return n.stop()}}),n)})))()},createZoomLink:function(t){var e=this;return x(s.a.mark((function n(){var a,i;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e.createZoomLoading=!0,!e.$root.auth.zoom_token){n.next=8;break}return n.next=4,window.axios.get("/zoom/create_meeting?booking_id=".concat(t.id));case 4:a=n.sent,e.createZoomLoading=!1,(i=e.member.bookings.data.findIndex((function(e){return e.id==t.id})))>-1&&(t.zoom_link=a.data,e.$set(e.member.bookings.data[i],"zoom_link",a.data));case 8:case"end":return n.stop()}}),n)})))()},editBooking:function(t){var e=JSON.parse(JSON.stringify(t));e.start=f()("".concat(e.date," ").concat(e.start)).toDate(),e.isPrevious=f()(new Date).isSameOrAfter(f()(e.start)),this.selectedBooking=e,this.getSelectedBookingNewTimeslots(e.date),this.$refs.bookingModal.show()},filterAvailableTimeslots:function(t){return t.filter((function(t){return t.is_available}))},getSelectedBookingNewTimeslots:function(t){var e=this;return x(s.a.mark((function n(){var a;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,window.axios.get("/services/".concat(e.selectedBooking.service.id,"?date=").concat(f()(t).format("YYYY-MM-DD"),"&single=1"));case 2:a=n.sent,e.timeslots=a.data;case 4:case"end":return n.stop()}}),n)})))()},filterByServices:function(t){var e=this;return x(s.a.mark((function n(){var a,i;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.map((function(t){return t.id})),n.next=3,window.axios.get("/members/".concat(e.member.id,"?page=").concat(e.member.bookings.current_page,"&services=").concat(a));case 3:i=n.sent,e.member.bookings=i.data.bookings;case 5:case"end":return n.stop()}}),n)})))()},getData:function(t){var e=this;return x(s.a.mark((function n(){var a;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,window.axios.get("/members/".concat(e.member.id,"?page=").concat(t));case 2:a=n.sent,e.member.bookings=a.data.bookings;case 4:case"end":return n.stop()}}),n)})))()},toggleMemberAssignedService:function(t){var e=this.clonedMember.assigned_services.findIndex((function(e){return e==t.id}));e>-1?this.clonedMember.assigned_services.splice(e,1):this.clonedMember.assigned_services.push(t.id)},update:function(){var t=this;return x(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.updateMember(t.clonedMember);case 2:n=e.sent,t.member=n,t.$refs.editModal.hide();case 5:case"end":return e.stop()}}),e)})))()},formatDate:function(t){return f()(t).format("MMMM D, YYYY")},memberToggleManageBookings:function(t,e){var n=this;return x(s.a.mark((function a(){return s.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e.manage_bookings=t,n.updateService(e);case 2:case"end":return a.stop()}}),a)})))()},memberToggleAssignedService:function(t,e){var n=this;return x(s.a.mark((function t(){var a,i;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.$set(e,"is_loading",!0),!(a=n.member.services.find((function(t){return t.parent_service_id==e.id})))||a.deleted_at){t.next=8;break}return t.next=5,n.deleteService(a);case 5:a.deleted_at="deleted",t.next=11;break;case 8:return i={id:n.member.id,service_id:e.id},t.next=11,n.storeMemberService(i).then((function(){a&&(a.deleted_at=null)}));case 11:n.$set(e,"is_loading",!1);case 12:case"end":return t.stop()}}),t)})))()},getMember:function(){var t=this;return x(s.a.mark((function e(){var n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.axios.get("/members/".concat(t.$route.params.id));case 2:n=e.sent,t.member=n.data,(a=JSON.parse(JSON.stringify(n.data))).assigned_services=a.assigned_services.map((function(t){return t.parent_service_id})),t.clonedMember=a,t.$root.contentloading=!1;case 8:case"end":return e.stop()}}),e)})))()}})},j=(n("EL4o"),n("KHd+")),D=Object(j.a)(P,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.member?n("div",{staticClass:"w-100 h-100 overflow-hidden"},[n("div",{staticClass:"overflow-auto h-100"},[n("div",{staticClass:"p-4 d-flex align-items-center"},[n("button",{staticClass:"btn p-1 btn-white badge-pill shadow-sm",attrs:{type:"button"},on:{click:function(e){return t.$router.push("/dashboard/team/members")}}},[n("arrow-left-icon",{attrs:{width:"30",height:"30"}})],1),t._v(" "),n("div",{staticClass:"dropdown ml-auto"},[n("button",{staticClass:"btn p-2 btn-white badge-pill shadow-sm",attrs:{"data-intro":t.$root.intros.members_show.steps[0],"data-step":"1","data-toggle":"dropdown","data-offset":"-130, 10"}},[n("more-icon",{attrs:{width:"20",height:"20",transform:"scale(0.75)"}})],1),t._v(" "),n("div",{staticClass:"dropdown-menu"},[n("span",{staticClass:"dropdown-item cursor-pointer",on:{click:function(e){return t.$refs.editModal.show()}}},[t._v("\n\t\t\t\t\t\tEdit\n\t\t\t\t\t")]),t._v(" "),n("span",{staticClass:"dropdown-item cursor-pointer",on:{click:function(e){return t.$refs.deleteModal.show()}}},[t._v("\n\t\t\t\t\t\tDelete\n\t\t\t\t\t")])])])]),t._v(" "),n("div",{staticClass:"text-center mt-n5 mb-3"},[n("div",{staticClass:"user-profile-image d-inline-block",style:{backgroundImage:"url("+t.member.member_user.profile_image+")"}},[t.member.member_user.profile_image?t._e():n("span",[t._v("\n\t\t\t\t\t"+t._s(t.member.member_user.initials)+"\n\t\t\t\t")])]),t._v(" "),n("h1",{staticClass:"h3 font-heading mt-2 mb-0"},[t._v(t._s(t.member.full_name))]),t._v(" "),n("div",{staticClass:"text-muted mb-1"},[t._v(t._s(t.member.email))]),t._v(" "),n("div",{staticClass:"flex-grow-1"},[n("div",{staticClass:"badge badge-icon d-inline-flex align-items-center",class:[t.member.is_pending?"bg-warning-light text-warning":"bg-primary-light text-primary"]},[t.member.is_pending?n("clock-icon",{attrs:{height:"12",width:"12"}}):n("checkmark-circle-icon",{attrs:{height:"12",width:"12"}}),t._v("\n\t\t\t\t\t "+t._s(t.member.is_pending?"Pending":"Accepted")+"\n\t\t\t\t")],1)])]),t._v(" "),n("div",{staticClass:"d-flex align-items-center px-4"},[n("h5",{staticClass:"mt-4 font-heading mb-3"},[t._v("Bookings")]),t._v(" "),n("div",{staticClass:"ml-auto d-flex align-items-center"},[n("div",{staticClass:"d-inline-flex align-items-center mx-2"},[n("vue-select",{attrs:{options:t.servicesList,multiple:"",button_class:"border-0 bg-white shadow-sm",label:"Services",placeholder:"All"},on:{input:t.filterByServices},model:{value:t.filterServices,callback:function(e){t.filterServices=e},expression:"filterServices"}})],1),t._v(" "),n("paginate",{attrs:{data:t.member.bookings},on:{change:t.getData}})],1)]),t._v(" "),t.member.bookings.data.length>0?n("div",{staticClass:"px-4 mb-4"},[n("table",{staticClass:"table table-borderless mb-0"},[t._m(0),t._v(" "),n("tbody",[t._l(t.member.bookings.data,(function(e){return[n("tr",{key:e.id},[n("td",{staticClass:"align-middle"},[t._v(t._s((e.user||e.contact.contact_user).full_name))]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v(t._s(e.service.name))]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formatDate(e.date))+"\n\t\t\t\t\t\t\t")]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.convertTime(e.start,"hh:MMA"))+"\n\t\t\t\t\t\t\t")]),t._v(" "),n("td",{staticClass:"align-middle"},[n("div",{staticClass:"flex-grow-1 text-right"},[n("div",{staticClass:"dropleft"},[n("button",{staticClass:"btn btn-white p-1 line-height-0",attrs:{"data-toggle":"dropdown"}},[n("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(0.75)"}})],1),t._v(" "),n("div",{staticClass:"dropdown-menu dropdown-menu-right"},[n("span",{staticClass:"dropdown-item cursor-pointer",on:{click:function(n){return t.editBooking(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t")])])])])])])]}))],2)])]):n("div",{staticClass:"px-4 mb-4"},[n("div",{staticClass:"rounded bg-white shadow-sm text-center py-3 text-muted"},[t._v("\n\t\t\t\tNo bookings found.\n\t\t\t")])])]),t._v(" "),n("modal",{ref:"bookingModal",attrs:{"close-button":(t.selectedBooking||{}).isPrevious,scrollable:!1}},[t.selectedBooking?n("div",{staticClass:"text-center"},[n("div",{staticClass:"profile-image profile-image-md d-inline-block mb-2",style:{"background-image":"url("+t.selectedBooking.customer.profile_image+")"}},[t.selectedBooking.customer.profile_image?t._e():n("span",[t._v(t._s(t.selectedBooking.customer.initials))])]),t._v(" "),n("h4",{staticClass:"font-heading mb-4"},[t._v("\n\t\t\t\t"+t._s(t.selectedBooking.customer.full_name)+"\n\t\t\t")]),t._v(" "),n("div",[n("div",{staticClass:"d-flex align-items-center text-left mb-3"},[n("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Service")]),t._v(" "),n("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.name))])]),t._v(" "),n("div",{staticClass:"d-flex align-items-center text-left mb-3"},[n("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Coach")]),t._v(" "),t.selectedBooking.isPrevious?n("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.coach.full_name))]):n("vue-select",{attrs:{button_class:"border-0 shadow-none btn btn-light bg-light",options:t.serviceMembers},model:{value:t.selectedBooking.service_id,callback:function(e){t.$set(t.selectedBooking,"service_id",e)},expression:"selectedBooking.service_id"}})],1),t._v(" "),n("div",{staticClass:"d-flex align-items-center text-left mb-3"},[n("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Date")]),t._v(" "),t.selectedBooking.isPrevious?n("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.formatDate(t.selectedBooking.date)))]):n("v-date-picker",{attrs:{"min-date":new Date,popover:{placement:"right",visibility:"click"}},on:{input:t.getSelectedBookingNewTimeslots},scopedSlots:t._u([{key:"default",fn:function(e){return[n("button",t._g({staticClass:"btn btn-light shadow-none",attrs:{type:"button"}},e.inputEvents),[t._v(t._s(t.formatDate(t.selectedBooking.date)))])]}}],null,!1,1537691256),model:{value:t.selectedBooking.date,callback:function(e){t.$set(t.selectedBooking,"date",e)},expression:"selectedBooking.date"}})],1),t._v(" "),n("div",{staticClass:"d-flex align-items-center text-left mb-3"},[n("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Time")]),t._v(" "),t.selectedBooking.isPrevious?n("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.dayjs(t.selectedBooking.start).format("hh:mmA")))]):n("div",{staticClass:"d-flex align-items-center"},[n("div",{staticClass:"dropright"},[n("button",{staticClass:"btn btn-light shadow-none",attrs:{"data-toggle":"dropdown"}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.dayjs(t.selectedBooking.start).format("hh:mmA"))+"\n\t\t\t\t\t\t\t")]),t._v(" "),n("div",{staticClass:"dropdown-menu timeslots-dropdown-menu overflow-y-auto"},[0==t.timeslots.length?n("div",{staticClass:"text-center text-gray small px-2 py-1 text-nowrap"},[t._v("No available timeslots")]):t._l(t.timeslots,(function(e,a){return[n("button",{key:a,staticClass:"btn btn-primary btn-block mb-1",attrs:{type:"button"},on:{click:function(n){t.selectedBooking.start=t.dayjs(t.dayjs(t.selectedBooking.date).format("Y-m-d")+" "+e.time).toDate()}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t\t\t\t")])]}))],2)]),t._v("\n\t\t\t\t\t\t  to  \n\n\t\t\t\t\t\t"),n("div",{staticClass:"btn btn-light shadow-none disabled"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.dayjs(t.selectedBooking.start).add(t.selectedBooking.service.duration,"minute").format("hh:mmA"))+"\n\t\t\t\t\t\t")])])]),t._v(" "),n("div",{staticClass:"d-flex align-items-center text-left"},[n("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Duration")]),t._v(" "),n("div",{staticClass:"h6 font-heading mb-0"},[t._v(t._s(t.selectedBooking.service.duration)+" minutes")])]),t._v(" "),n("div",{staticClass:"text-left mt-3 d-flex align-items-start"},[n("div",{staticClass:"font-weight-normal text-secondary w-25 mb-2"},[t._v("Notes")]),t._v(" "),t.selectedBooking.isPrevious?n("div",{staticClass:"flex-1"},[t._v(t._s(t.selectedBooking.booking_note.note))]):n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedBooking.booking_note.note,expression:"selectedBooking.booking_note.note"}],staticClass:"form-control resize-none flex-1",attrs:{type:"text",placeholder:"Write notes.."},domProps:{value:t.selectedBooking.booking_note.note},on:{input:function(e){e.target.composing||t.$set(t.selectedBooking.booking_note,"note",e.target.value)}}})]),t._v(" "),t.selectedBooking.isPrevious?t._e():n("div",{staticClass:"text-left"},[Object.keys(t.selectedBooking.zoom_link).length>0?n("div",{staticClass:"mt-3"},[n("div",{staticClass:"d-flex align-items-center text-left"},[n("div",{staticClass:"font-weight-normal text-secondary w-25"},[t._v("Zoom Link")]),t._v(" "),n("a",{staticClass:"d-flex align-items-center",attrs:{target:"_blank",href:t.selectedBooking.zoom_link.join_url}},[t._v("\n\t\t\t\t\t\t\t\tGo to Zoom meeting\n\t\t\t\t\t\t\t\t"),n("shortcut-icon",{staticClass:"ml-1 fill-blue",attrs:{width:"16",height:"16"}})],1)])]):t.$root.auth.zoom_token?n("vue-button",{attrs:{type:"button",loading:t.createZoomLoading,button_class:"btn btn-light shadow-none mt-3"},on:{click:function(e){return t.createZoomLink(t.selectedBooking)}}},[n("div",{staticClass:"d-flex align-items-center"},[n("zoom-icon",{staticClass:"mr-2",attrs:{width:"20",height:"20"}}),t._v("\n\t\t\t\t\t\t\tCreate Zoom link\n\t\t\t\t\t\t")],1)]):t._e()],1)]),t._v(" "),t.selectedBooking.isPrevious?t._e():n("div",{staticClass:"d-flex justify-content-between mt-4"},[n("div",{staticClass:"d-flex align-items-center"},[n("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal",disabled:t.bookingModalLoading}},[t._v("Cancel")]),t._v(" "),n("button",{staticClass:"btn btn-link text-danger",attrs:{type:"button","data-dismiss":"modal",disabled:t.bookingModalLoading},on:{click:function(e){return t.$refs.deleteBookingModal.show()}}},[t._v("Delete")])]),t._v(" "),n("vue-button",{attrs:{type:"button",button_class:"btn btn-primary shadow-sm border",loading:t.bookingModalLoading},nativeOn:{click:function(e){return t.updateSelectedBooking(t.selectedBooking)}}},[t._v("Update")])],1)]):t._e()]),t._v(" "),n("modal",{ref:"deleteBookingModal",attrs:{"close-button":!1}},[t.selectedBooking?[n("h5",{staticClass:"font-heading text-center"},[t._v("Delete Booking")]),t._v(" "),n("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\tAre you sure to delete this booking?\n\t\t\t")]),t._v(" "),n("div",{staticClass:"d-flex"},[n("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(e){return t.$refs.bookingModal.show()}}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),n("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){t.confirmDeleteBooking(t.selectedBooking),t.$refs.deleteBookingModal.hide()}}},[t._v("\n\t\t\t\t\tDelete\n\t\t\t\t")])])]:t._e()],2),t._v(" "),n("modal",{ref:"editModal",attrs:{"close-button":!1}},[n("h5",{staticClass:"font-heading mb-3"},[t._v("Edit Member")]),t._v(" "),t.clonedMember?n("vue-form-validate",{on:{submit:t.update}},[n("div",{staticClass:"form-group"},[n("label",{staticClass:"form-label"},[t._v("Email")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedMember.email,expression:"clonedMember.email"}],staticClass:"form-control",attrs:{disabled:!t.clonedMember.is_pending,type:"email","data-required":""},domProps:{value:t.clonedMember.email},on:{input:function(e){e.target.composing||t.$set(t.clonedMember,"email",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-row form-group"},[n("div",{staticClass:"col"},[n("label",{staticClass:"form-label"},[t._v("First Name (Optional)")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedMember.first_name,expression:"clonedMember.first_name"}],staticClass:"form-control",attrs:{disabled:!t.clonedMember.is_pending,type:"text"},domProps:{value:t.clonedMember.first_name},on:{input:function(e){e.target.composing||t.$set(t.clonedMember,"first_name",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"col"},[n("label",{staticClass:"form-label"},[t._v("Last Name (Optional)")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedMember.last_name,expression:"clonedMember.last_name"}],staticClass:"form-control",attrs:{disabled:!t.clonedMember.is_pending,type:"text"},domProps:{value:t.clonedMember.last_name},on:{input:function(e){e.target.composing||t.$set(t.clonedMember,"last_name",e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"form-group"},[n("strong",{staticClass:"d-block mb-2 font-weight-bold"},[t._v("Assign Services")]),t._v(" "),t._l(t.services,(function(e){return[n("div",{key:e.id,staticClass:"d-flex align-items-center mb-2 rounded p-3 bg-light"},[n("div",[n("h6",{staticClass:"font-heading mb-0"},[t._v(t._s(e.name))]),t._v(" "),n("small",{staticClass:"text-gray d-block"},[t._v(t._s(e.duration)+" minutes")])]),t._v(" "),n("div",{staticClass:"ml-auto"},[n("toggle-switch",{attrs:{"active-class":"bg-primary",value:!!t.clonedMember.assigned_services.find((function(t){return t==e.id}))},on:{input:function(n){return t.toggleMemberAssignedService(e)}}})],1)])]}))],2),t._v(" "),n("div",{staticClass:"d-flex"},[n("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),n("button",{staticClass:"ml-auto btn btn-primary",attrs:{type:"submit"}},[t._v("\n\t\t\t\t\tSave\n\t\t\t\t")])])]):t._e()],1),t._v(" "),n("modal",{ref:"deleteModal",attrs:{"close-button":!1}},[t.member?[n("h5",{staticClass:"font-heading text-center"},[t._v("Delete Member")]),t._v(" "),n("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\tAre you sure to delete member\n\t\t\t\t"),n("strong",[t._v(t._s(t.member.full_name.trim()||t.member.email))]),t._v("\n\t\t\t\t?\n\t\t\t\t"),n("br"),t._v(" "),n("span",{staticClass:"text-danger"},[t._v("This action cannot be undone")])]),t._v(" "),n("div",{staticClass:"d-flex justify-content-end"},[n("button",{staticClass:"btn btn-light shadow-none text-body",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),n("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){t.deleteMember(t.member).then((function(){return t.$router.push("/dashboard/team/members")})),t.$refs.deleteModal.hide()}}},[t._v("\n\t\t\t\t\tDelete\n\t\t\t\t")])])]:t._e()],2)],1):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"pl-0"},[this._v("User")]),this._v(" "),e("th",[this._v("Service")]),this._v(" "),e("th",[this._v("Date")]),this._v(" "),e("th",[this._v("Time")])])])}],!1,null,"83ba48a0",null);e.default=D.exports},uNBS:function(t,e,n){var a=n("ARml");"string"==typeof a&&(a=[[t.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(a,s);a.locals&&(t.exports=a.locals)},xCJq:function(t,e){var n=/(\d{1,2})\s*:?\s*(\d{0,2})\s*(a\.?m\.?|p\.?m\.?)/i,a=/(\d{1,2})\s*:\s*(\d{1,2})/i;function s(t){return 1===t.length?"0"+t:t}function i(t){return parseInt(t)>=12?"pm":"am"}t.exports=function(t,e){return function(t,e){var a=t.match(n);if(a){var i=a[1],o=a[2]||"00";return e||(e="hh:MM"),"pm"==a[3].replace(/\./g,"").toLowerCase()&&"12"!==i?e.replace("hh",parseInt(i)+12).replace("mm",o).replace("MM",s(o)):e.replace("hh",i).replace("HH",s(i)).replace("mm",o).replace("MM",s(o))}}(t,e)||function(t,e){var n=t.match(a);if(n){var o=n[1],r=n[2];return e||(e="hh:MM a"),parseInt(o)>12?e.replace("hh",parseInt(o)-12).replace("HH",s(o)).replace("mm",r).replace("MM",s(r)).replace("a","pm").replace("A","PM"):e.replace("hh",o).replace("HH",s(o)).replace("mm",r).replace("MM",s(r)).replace("a",i(o)).replace("A",i(o).toUpperCase())}}(t,e)}}}]);