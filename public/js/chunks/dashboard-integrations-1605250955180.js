(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{Rrjf:function(t,o,e){"use strict";e.r(o);var n=e("o0o1"),a=e.n(n),r=e("T1qZ"),s=e("vqo1");function i(t,o,e,n,a,r,s){try{var i=t[r](s),c=i.value}catch(t){return void e(t)}i.done?o(c):Promise.resolve(c).then(n,a)}function c(t){return function(){var o=this,e=arguments;return new Promise((function(n,a){var r=t.apply(o,e);function s(t){i(r,n,a,s,c,"next",t)}function c(t){i(r,n,a,s,c,"throw",t)}s(void 0)}))}}var u={components:{VueButton:r.a,CheckmarkIcon:s.a},data:function(){return{zoomLoading:!1,googleCalendarLoading:!1,outlookLoading:!1,xeroLoading:!1}},created:function(){this.$root.contentloading=!1},methods:{integrateXero:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.xeroLoading=!0,o.next=3,axios.get("/xero/authenticate");case 3:e=o.sent,t.openAuthWindow(e.data.authUrl,c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,t.getXeroToken();case 2:t.xeroLoading=!1;case 3:case"end":return o.stop()}}),o)}))));case 5:case"end":return o.stop()}}),o)})))()},getXeroToken:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,axios.get("/xero/token");case 2:e=o.sent,t.$root.auth.xero_token=e.data;case 4:case"end":return o.stop()}}),o)})))()},removeXero:function(){var t=this;return c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.xeroLoading=!0,o.next=3,axios.get("/xero/remove");case 3:t.$root.auth.xero_token=null,t.xeroLoading=!1;case 5:case"end":return o.stop()}}),o)})))()},integrateOutlook:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.outlookLoading=!0,o.next=3,axios.get("/outlook/client");case 3:e=o.sent,t.openAuthWindow(e.data.authUrl,c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,t.getOutlookToken();case 2:t.outlookLoading=!1;case 3:case"end":return o.stop()}}),o)}))));case 5:case"end":return o.stop()}}),o)})))()},getOutlookToken:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,axios.get("/outlook/token");case 2:e=o.sent,t.$root.auth.outlook_token=e.data;case 4:case"end":return o.stop()}}),o)})))()},removeOutlook:function(){var t=this;return c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.outlookLoading=!0,o.next=3,axios.get("/outlook/remove");case 3:t.$root.auth.outlook_token=null,t.outlookLoading=!1;case 5:case"end":return o.stop()}}),o)})))()},integrateGoogleCalendar:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.googleCalendarLoading=!0,o.next=3,axios.get("/google_calendar/client");case 3:e=o.sent,t.openAuthWindow(e.data.authUrl,c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,t.getGoogleCalendarToken();case 2:t.googleCalendarLoading=!1;case 3:case"end":return o.stop()}}),o)}))));case 5:case"end":return o.stop()}}),o)})))()},getGoogleCalendarToken:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,axios.get("/google_calendar/token");case 2:e=o.sent,t.$root.auth.google_calendar_token=e.data;case 4:case"end":return o.stop()}}),o)})))()},removeGoogleCalendar:function(){var t=this;return c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.googleCalendarLoading=!0,o.next=3,axios.get("/google_calendar/remove");case 3:t.$root.auth.google_calendar_token=null,t.googleCalendarLoading=!1;case 5:case"end":return o.stop()}}),o)})))()},removeZoom:function(){var t=this;return c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.zoomLoading=!0,o.next=3,axios.get("/zoom/remove");case 3:t.$root.auth.zoom_token=null,t.zoomLoading=!1;case 5:case"end":return o.stop()}}),o)})))()},getZoomToken:function(){var t=this;return c(a.a.mark((function o(){var e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,axios.get("/zoom/token");case 2:e=o.sent,t.$root.auth.zoom_token=e.data;case 4:case"end":return o.stop()}}),o)})))()},integrateZoom:function(){var t=this;return c(a.a.mark((function o(){var e,n;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.zoomLoading=!0,o.next=3,axios.get("/zoom/install");case 3:e=o.sent,n=e.data,t.openAuthWindow(n,c(a.a.mark((function o(){return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:t.zoomLoading=!1,t.getZoomToken();case 2:case"end":return o.stop()}}),o)}))));case 6:case"end":return o.stop()}}),o)})))()},openAuthWindow:function(t,o){var e=screen.width/2-225,n=screen.height/2-325,a=window.open(t,"telloe_auth_window","width=".concat(450,", height=").concat(650,", top=").concat(n,", left=").concat(e)),r=setInterval((function(){a.closed&&(clearInterval(r),o())}),500)}}},l=(e("wKhf"),e("KHd+")),d=Object(l.a)(u,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"text-center py-5 h-100"},[e("h1",{staticClass:"font-heading h2"},[t._v("Integrations")]),t._v(" "),e("div",{staticClass:"overflow-auto container mt-5 h-100"},[e("div",{staticClass:"row px-2"},[e("div",{staticClass:"col-md-6 col-lg-4 px-2 mb-3 pb-1"},[e("div",{staticClass:"px-1"},[e("div",{staticClass:"card shadow-sm rounded position-relative"},[t.$root.auth.zoom_token?e("checkmark-icon",{staticClass:"integrated-icon fill-green position-absolute",attrs:{width:"36",height:"36"}}):t._e(),t._v(" "),e("div",{staticClass:"card-body"},[e("img",{attrs:{src:"/logos/zoom.png",alt:"Zoom",height:"80"}}),t._v(" "),e("p",{staticClass:"my-3 text-ellipsis"},[t._v("Create scheduled meeting for your bookings")]),t._v(" "),t.$root.auth.zoom_token?e("vue-button",{attrs:{loading:t.zoomLoading,button_class:"btn btn-light shadow-none",type:"button"},on:{click:t.removeZoom}},[t._v("Remove")]):e("vue-button",{attrs:{button_class:"btn btn-primary",loading:t.zoomLoading,type:"button"},on:{click:t.integrateZoom}},[t._v("Integrate")])],1)],1)])]),t._v(" "),e("div",{staticClass:"col-md-6 col-lg-4 px-2 mb-3 pb-1"},[e("div",{staticClass:"px-1"},[e("div",{staticClass:"card shadow-sm rounded"},[t.$root.auth.google_calendar_token?e("checkmark-icon",{staticClass:"integrated-icon fill-green position-absolute",attrs:{width:"36",height:"36"}}):t._e(),t._v(" "),e("div",{staticClass:"card-body"},[e("img",{attrs:{src:"/logos/google-calendar.png",alt:"Google Calendar",height:"80"}}),t._v(" "),e("p",{staticClass:"my-3 text-ellipsis"},[t._v("Sync bookings with your Google Calendar")]),t._v(" "),t.$root.auth.google_calendar_token?e("vue-button",{attrs:{loading:t.googleCalendarLoading,button_class:"btn btn-light shadow-none",type:"button"},on:{click:t.removeGoogleCalendar}},[t._v("Remove")]):e("vue-button",{attrs:{button_class:"btn btn-primary",loading:t.googleCalendarLoading,type:"button"},on:{click:t.integrateGoogleCalendar}},[t._v("Integrate")])],1)],1)])]),t._v(" "),e("div",{staticClass:"col-md-6 col-lg-4 px-2 mb-3 pb-1"},[e("div",{staticClass:"px-1"},[e("div",{staticClass:"card shadow-sm rounded"},[t.$root.auth.outlook_token?e("checkmark-icon",{staticClass:"integrated-icon fill-green position-absolute",attrs:{width:"36",height:"36"}}):t._e(),t._v(" "),e("div",{staticClass:"card-body"},[e("img",{attrs:{src:"/logos/outlook.png",alt:"Outlook Calendar",height:"80"}}),t._v(" "),e("p",{staticClass:"my-3 text-ellipsis"},[t._v("Sync bookings with your Outlook Calendar")]),t._v(" "),t.$root.auth.outlook_token?e("vue-button",{attrs:{loading:t.outlookLoading,button_class:"btn btn-light shadow-none",type:"button"},on:{click:t.removeOutlook}},[t._v("Remove")]):e("vue-button",{attrs:{button_class:"btn btn-primary",loading:t.outlookLoading,type:"button"},on:{click:t.integrateOutlook}},[t._v("Integrate")])],1)],1)])]),t._v(" "),e("div",{staticClass:"col-md-6 col-lg-4 px-2"},[e("div",{staticClass:"px-1"},[e("div",{staticClass:"card shadow-sm rounded"},[t.$root.auth.xero_token?e("checkmark-icon",{staticClass:"integrated-icon fill-green position-absolute",attrs:{width:"36",height:"36"}}):t._e(),t._v(" "),e("div",{staticClass:"card-body"},[e("img",{attrs:{src:"/logos/xero.png",alt:"Outlook Calendar",height:"80"}}),t._v(" "),e("p",{staticClass:"my-3 text-ellipsis"},[t._v("Manage your Xero invoices")]),t._v(" "),t.$root.auth.xero_token?e("vue-button",{attrs:{loading:t.xeroLoading,button_class:"btn btn-light shadow-none",type:"button"},on:{click:t.removeXero}},[t._v("Remove")]):e("vue-button",{attrs:{button_class:"btn btn-primary",loading:t.xeroLoading,type:"button"},on:{click:t.integrateXero}},[t._v("Integrate")])],1)],1)])])])])])}),[],!1,null,"98cb80de",null);o.default=d.exports},T1qZ:function(t,o,e){"use strict";var n={props:{label:{type:String,default:""},type:{type:String,default:"button"},icon:{type:String,default:""},button_class:{type:String,default:"btn-block btn-primary"},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data:function(){return{}},mounted:function(){},methods:{}},a=e("KHd+"),r=Object(a.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("button",{staticClass:"btn position-relative",class:t.button_class,attrs:{type:t.type,disabled:t.loading||t.disabled},on:{click:function(o){return t.$emit("click")}}},[t.loading?e("span",{staticClass:"spinner position-absolute-center"},[e("span",{staticClass:"spinner-border spinner-border-sm align-middle",attrs:{role:"status","aria-hidden":"true"}})]):t._e(),t._v(" "),e("div",{class:{"opacity-0":t.loading}},[t.icon?[e("i",{class:t.icon}),t._v("  ")]:t._e(),t._t("default")],2)])}),[],!1,null,null,null);o.a=r.exports},oinK:function(t,o,e){(o=e("JPst")(!1)).push([t.i,".integrated-icon[data-v-98cb80de]{top:5px;right:5px}",""]),t.exports=o},p0rp:function(t,o,e){var n=e("oinK");"string"==typeof n&&(n=[[t.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(n,a);n.locals&&(t.exports=n.locals)},vqo1:function(t,o,e){"use strict";var n={name:"checkmark"},a=e("KHd+"),r=Object(a.a)(n,(function(){var t=this.$createElement,o=this._self._c||t;return o("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[o("path",{attrs:{d:"M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"}})])}),[],!1,null,null,null);o.a=r.exports},wKhf:function(t,o,e){"use strict";var n=e("p0rp");e.n(n).a}}]);