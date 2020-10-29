/*! For license information please see dashboard-team-members-show-1603990782125.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"5cWj":function(t,e,n){"use strict";var i={props:{value:{type:Boolean,default:!1},activeClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{width:100,state:!1,pressed:0,position:0}},mounted:function(){this.toggle(this.value)},computed:{style:function(){return{transform:"translateX(".concat(this.pos_percentage,")")}},pos_percentage:function(){return"".concat(this.position/this.width*100,"%")},state_class:function(){if(this.state)return this.activeClass+" active"}},watch:{value:function(t){this.toggle(t)},position:function(){this.state=this.position>=50}},methods:{onClick:function(){this.toggle(!this.state),this.emit()},toggle:function(t){this.state=t,this.position=t?100:0},dragging:function(t){var e=(t.clientX-this.$el.offsetLeft)/this.width*100;this.position=e<=0?0:e>=100?100:e},resolvePosition:function(){this.position=this.state?100:0},emit:function(){this.$emit("input",this.state)}}},s=(n("fHoB"),n("KHd+")),a=Object(s.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"toggle",class:t.state_class,attrs:{disabled:t.disabled},on:{click:function(e){return e.target!==e.currentTarget?null:t.onClick(e)}}},[n("div",{staticClass:"draggable",style:t.style})])}),[],!1,null,"22734e3b",null);e.a=a.exports},"8bTU":function(t,e,n){var i=n("L0Vr");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,s);i.locals&&(t.exports=i.locals)},ARml:function(t,e,n){(e=n("JPst")(!1)).push([t.i,".toggle[data-v-22734e3b]{cursor:pointer;width:40px;height:20px;background:#dee2e6;border-radius:200px;transition:background .6s}.toggle[disabled][data-v-22734e3b]{opacity:.5;pointer-events:none !important}.toggle .draggable[data-v-22734e3b]{pointer-events:none;width:20px;height:20px;background:#fff;border-radius:100%;box-shadow:0 0 5px rgba(0,0,0,.25);transform:translateX(0%);transition:transform .05s ease-in-out}.toggle.active[data-v-22734e3b]{background:#5a5adf;transition:background .6s}",""]),t.exports=e},KlRW:function(t,e,n){"use strict";var i={name:"user"},s=n("KHd+"),a=Object(s.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z"}})])}),[],!1,null,null,null);e.a=a.exports},L0Vr:function(t,e,n){(e=n("JPst")(!1)).push([t.i,".user-profile-image[data-v-76fb9d61]{width:100px;height:100px}.user-profile-image span[data-v-76fb9d61]{font-size:35px}.badge-icon svg[data-v-76fb9d61]{transform:scale(1.3);margin-right:2px}.badge-icon.text-primary svg[data-v-76fb9d61]{fill:#5a5adf}.badge-icon.text-warning svg[data-v-76fb9d61]{fill:#ffc107}.service[data-v-76fb9d61]{width:33%}",""]),t.exports=e},XPXJ:function(t,e,n){"use strict";var i={name:"clock"},s=n("KHd+"),a=Object(s.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.7906191,14.0931333 C16.0153254,14.2536378 16.0673712,14.5659128 15.9068667,14.7906191 C15.7463622,15.0153254 15.4340872,15.0673712 15.2093809,14.9068667 L11.7093809,12.4068667 C11.6156592,12.3399227 11.5479226,12.2426753 11.5176181,12.1315587 L10.0176181,6.6315587 C9.94496022,6.36514653 10.1020291,6.09027595 10.3684413,6.01761809 C10.6348535,5.94496022 10.909724,6.10202912 10.9823819,6.3684413 L12.4355266,11.6966387 L15.7906191,14.0931333 Z"}})])}),[],!1,null,null,null);e.a=a.exports},eeqt:function(t,e,n){"use strict";var i={name:"arrow-left"},s=n("KHd+"),a=Object(s.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M8.70710678,12 L18.5,12 C18.7761424,12 19,12.2238576 19,12.5 C19,12.7761424 18.7761424,13 18.5,13 L8.70710678,13 L11.8535534,16.1464466 C12.0488155,16.3417088 12.0488155,16.6582912 11.8535534,16.8535534 C11.6582912,17.0488155 11.3417088,17.0488155 11.1464466,16.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 L11.1464466,8.14644661 C11.3417088,7.95118446 11.6582912,7.95118446 11.8535534,8.14644661 C12.0488155,8.34170876 12.0488155,8.65829124 11.8535534,8.85355339 L8.70710678,12 Z"}})])}),[],!1,null,null,null);e.a=a.exports},fHoB:function(t,e,n){"use strict";var i=n("uNBS");n.n(i).a},"l+1I":function(t,e,n){"use strict";n.r(e);var i=n("o0o1"),s=n.n(i),a=n("L2JU"),r=n("eeqt"),o=n("XPXJ"),c=n("KlRW"),l=n("5cWj"),u=n("XuX8"),p=n.n(u),h=n("uv9J"),f=n.n(h),g=n("Wgwc"),d=n.n(g);function m(t,e,n,i,s,a,r){try{var o=t[a](r),c=o.value}catch(t){return void n(t)}o.done?e(c):Promise.resolve(c).then(i,s)}function v(t){return function(){var e=this,n=arguments;return new Promise((function(i,s){var a=t.apply(e,n);function r(t){m(a,i,s,r,o,"next",t)}function o(t){m(a,i,s,r,o,"throw",t)}r(void 0)}))}}function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){w(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function w(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}p.a.use(f.a);var k=n("xCJq"),C={components:{ArrowLeftIcon:r.a,ClockIcon:o.a,CheckmarkCircleIcon:c.a,ToggleSwitch:l.a},data:function(){return{member:null,paginate:["bookings"],convertTime:k}},computed:_(_({},Object(a.d)({services:function(t){return t.services.index}})),{},{bookings:function(){var t=[];return this.member.services.forEach((function(e){e.bookings.length>0&&e.bookings.forEach((function(n){n.service=e,t.push(n)}))})),t}}),created:function(){this.getServices(),this.getMember()},methods:_(_({},Object(a.b)({getServices:"services/index",storeMemberService:"members/store_service",updateService:"services/update",deleteService:"services/delete"})),{},{formatDate:function(t){return d()(t).format("MMMM D, YYYY")},memberToggleManageBookings:function(t,e){var n=this;return v(s.a.mark((function i(){return s.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:e.manage_bookings=t,n.updateService(e);case 2:case"end":return i.stop()}}),i)})))()},memberToggleAssignedService:function(t,e){var n=this;return v(s.a.mark((function t(){var i,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.$set(e,"is_loading",!0),!(i=n.member.services.find((function(t){return t.parent_service_id==e.id})))||i.deleted_at){t.next=8;break}return t.next=5,n.deleteService(i);case 5:i.deleted_at="deleted",t.next=11;break;case 8:return a={id:n.member.id,service_id:e.id},t.next=11,n.storeMemberService(a).then((function(t){i&&(i.deleted_at=null)}));case 11:n.$set(e,"is_loading",!1);case 12:case"end":return t.stop()}}),t)})))()},getMember:function(){var t=this;return v(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/members/".concat(t.$route.params.id));case 2:n=e.sent,t.member=n.data,t.$root.contentloading=!1;case 5:case"end":return e.stop()}}),e)})))()}})},x=(n("lC9Q"),n("KHd+")),P=Object(x.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.member?n("div",{staticClass:"w-100 h-100 overflow-hidden"},[n("div",{staticClass:"overflow-auto h-100"},[n("div",{staticClass:"p-4"},[n("button",{staticClass:"btn p-2 btn-white badge-pill shadow-sm",attrs:{type:"button"},on:{click:function(e){return t.$router.push("/dashboard/team/members")}}},[n("arrow-left-icon")],1)]),t._v(" "),n("div",{staticClass:"text-center mt-n5 mb-3"},[n("div",{staticClass:"user-profile-image d-inline-block",style:{backgroundImage:"url("+t.member.member_user.profile_image+")"}},[t.member.member_user.profile_image?t._e():n("span",[t._v("\n          "+t._s(t.member.member_user.initials)+"\n        ")])]),t._v(" "),n("h1",{staticClass:"h3 font-heading mt-2 mb-0"},[t._v(t._s(t.member.full_name))]),t._v(" "),n("div",{staticClass:"text-muted mb-1"},[t._v(t._s(t.member.email))]),t._v(" "),n("div",{staticClass:"flex-grow-1"},[n("div",{staticClass:"badge badge-icon d-inline-flex align-items-center",class:[t.member.is_pending?"bg-warning-light text-warning":"bg-primary-light text-primary"]},[t.member.is_pending?n("clock-icon",{attrs:{height:"12",width:"12"}}):n("checkmark-circle-icon",{attrs:{height:"12",width:"12"}}),t._v("\n           "+t._s(t.member.is_pending?"Pending":"Accepted")+"\n        ")],1)])]),t._v(" "),n("h5",{staticClass:"mt-5 font-heading px-4 mb-3"},[t._v("Assigned Services")]),t._v(" "),t._l(t.services,(function(e){return[e.is_available?n("div",{key:e.id,staticClass:"pl-4 d-inline-block w-25"},[n("div",{staticClass:"w-100 mb-2 rounded p-3 bg-white"},[n("div",{staticClass:"overflow-hidden"},[n("h6",{staticClass:"font-heading mb-0 text-ellipsis"},[t._v(t._s(e.name))]),t._v(" "),n("small",{staticClass:"text-gray d-block"},[t._v(t._s(e.duration)+" minutes")])]),t._v(" "),n("div",{staticClass:"mt-3"},[n("div",{staticClass:"d-flex align-items-center"},[n("toggle-switch",{attrs:{"active-class":"bg-green",value:!!t.member.services.find((function(t){return t.parent_service_id==e.id&&!t.deleted_at}))},on:{input:function(n){return t.memberToggleAssignedService(n,e)}}}),t._v(" "),n("span",{staticClass:"ml-3"},[t._v("Available")])],1)]),t._v(" "),n("div",{staticClass:"mt-2"},[n("div",{staticClass:"d-flex align-items-center"},[n("toggle-switch",{attrs:{"active-class":"bg-green",disabled:!t.member.services.find((function(t){return t.parent_service_id==e.id&&!t.deleted_at})),value:e.manage_bookings},on:{input:function(n){return t.memberToggleManageBookings(n,e)}}}),t._v(" "),n("span",{staticClass:"ml-3"},[t._v("Manage Bookings")])],1)])])]):t._e()]})),t._v(" "),n("h5",{staticClass:"mt-4 font-heading px-4 mb-0"},[t._v("Bookings")]),t._v(" "),t.bookings.length>0?n("div",{staticClass:"px-4 mb-4"},[n("table",{staticClass:"table table-borderless table-fixed-header mb-0"},[t._m(0),t._v(" "),n("tbody",[t._l(t.bookings,(function(e){return[n("tr",{key:e.id},[n("td",{staticClass:"align-middle"},[t._v(t._s(e.user.full_name))]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v(t._s(e.service.name))]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v("\n                "+t._s(t.formatDate(e.created_at))+"\n              ")]),t._v(" "),n("td",{staticClass:"align-middle"},[t._v("\n                "+t._s(t.convertTime(e.start,"hh:MMA"))+"\n              ")])])]}))],2)])]):n("div",{staticClass:"px-4 mb-4"},[n("div",{staticClass:"rounded bg-white text-center py-3 text-muted"},[t._v("\n        No bookings.\n      ")])])],2)]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",{staticClass:"text-secondary"},[e("tr",[e("th",{staticClass:"pl-0"},[this._v("User")]),this._v(" "),e("th",[this._v("Service")]),this._v(" "),e("th",[this._v("Date")]),this._v(" "),e("th",[this._v("Time")])])])}],!1,null,"76fb9d61",null);e.default=P.exports},lC9Q:function(t,e,n){"use strict";var i=n("8bTU");n.n(i).a},uNBS:function(t,e,n){var i=n("ARml");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,s);i.locals&&(t.exports=i.locals)},uv9J:function(t,e,n){t.exports=function(){"use strict";var t,e,n="undefined"!=typeof console;t=function(t,s,a){void 0===a&&(a="error"),n&&console[a]("[vue-paginate]: "+t+" "+(s?i(e(s)):""))},e=function(t){if(t.$root===t)return"root instance";var e=t._isVue?t.$options.name||t.$options._componentTag:t.name;return(e?"component <"+e+">":"anonymous component")+(t._isVue&&t.$options.__file?" at "+t.$options.__file:"")};var i=function(t){return"anonymous component"===t&&(t+=' - use the "name" option for better debugging messages.'),"\n(found in "+t+")"},s={name:"paginate",props:{name:{type:String,required:!0},list:{type:Array,required:!0},per:{type:Number,default:3,validator:function(t){return t>0}},tag:{type:String,default:"ul"},container:{type:Object,default:null}},data:function(){return{initialListSize:this.list.length}},computed:{parent:function(){return this.container?this.container:this.$parent},currentPage:{get:function(){if(this.parent.paginate[this.name])return this.parent.paginate[this.name].page},set:function(t){this.parent.paginate[this.name].page=t}},pageItemsCount:function(){var t=this.list.length;return this.currentPage*this.per+1+"-"+Math.min(this.currentPage*this.per+this.per,t)+" of "+t},lastPage:function(){return Math.ceil(this.list.length/this.per)}},mounted:function(){this.per<=0&&t('<paginate name="'+this.name+"\"> 'per' prop can't be 0 or less.",this.parent),this.parent.paginate[this.name]?this.paginateList():t("'"+this.name+"' is not registered in 'paginate' array.",this.parent)},watch:{currentPage:function(){this.paginateList()},list:function(){this.currentPage>=this.lastPage&&(this.currentPage=this.lastPage-1),this.paginateList()},per:function(){this.currentPage=0,this.paginateList()}},methods:{paginateList:function(){var t=this.currentPage*this.per,e=this.list.slice(t,t+this.per);this.parent.paginate[this.name].list=e},goToPage:function(e){var n=Math.ceil(this.list.length/this.per);e>n?t("You cannot go to page "+e+". The last page is "+n+".",this.parent):this.currentPage=e-1}},render:function(t){return t(this.tag,{},this.$slots.default)}},a=function(t,e,n){this.listOfPages=t,this.lastPage=t.length-1,this.currentPage=e===this.lastPage?this.lastPage-1:e,this.limit=n};a.prototype.generate=function(){var t=this._buildFirstHalf(),e=this._buildSecondHalf();return t.concat(e)},a.prototype._buildFirstHalf=function(){var t=this._allPagesButLast().slice(this._currentChunkIndex(),this._currentChunkIndex()+this.limit);return this.currentPage>=this.limit&&(t.unshift("…"),t.unshift(0)),this.lastPage-this.limit>this._currentChunkIndex()&&t.push("…"),t},a.prototype._buildSecondHalf=function(){return[this.lastPage]},a.prototype._currentChunkIndex=function(){return Math.floor(this.currentPage/this.limit)*this.limit},a.prototype._allPagesButLast=function(){var t=this;return this.listOfPages.filter((function(e){return e!==t.lastPage}))};var r={name:"paginate-links",props:{for:{type:String,required:!0},limit:{type:Number,default:0},simple:{type:Object,default:null,validator:function(t){return t.prev&&t.next}},stepLinks:{type:Object,default:function(){return{prev:"«",next:"»"}},validator:function(t){return t.prev&&t.next}},showStepLinks:{type:Boolean},hideSinglePage:{type:Boolean},classes:{type:Object,default:null},async:{type:Boolean,default:!1},container:{type:Object,default:null}},data:function(){return{listOfPages:[],numberOfPages:0,target:null}},computed:{parent:function(){return this.container?this.container.el:this.$parent},state:function(){return this.container?this.container.state:this.$parent.paginate[this.for]},currentPage:{get:function(){if(this.state)return this.state.page},set:function(t){this.state.page=t}}},mounted:function(){var e=this;this.simple&&this.limit&&t('<paginate-links for="'+this.for+"\"> 'simple' and 'limit' props can't be used at the same time. In this case, 'simple' will take precedence, and 'limit' will be ignored.",this.parent,"warn"),this.simple&&!this.simple.next&&t('<paginate-links for="'+this.for+"\"> 'simple' prop doesn't contain 'next' value.",this.parent),this.simple&&!this.simple.prev&&t('<paginate-links for="'+this.for+"\"> 'simple' prop doesn't contain 'prev' value.",this.parent),this.stepLinks&&!this.stepLinks.next&&t('<paginate-links for="'+this.for+"\"> 'step-links' prop doesn't contain 'next' value.",this.parent),this.stepLinks&&!this.stepLinks.prev&&t('<paginate-links for="'+this.for+"\"> 'step-links' prop doesn't contain 'prev' value.",this.parent),this.$nextTick((function(){e.updateListOfPages()}))},watch:{state:{handler:function(){this.updateListOfPages()},deep:!0},currentPage:function(t,e){this.$emit("change",t+1,e+1)}},methods:{updateListOfPages:function(){var e,n,i;if(this.target=(e=this.parent.$children,n=this.for,e.filter((function(t){return"paginate"===t.$vnode.componentOptions.tag})).find((function(t){return t.name===n}))),!this.target){if(this.async)return;return t('<paginate-links for="'+this.for+'"> can\'t be used without its companion <paginate name="'+this.for+'">',this.parent),void t('To fix that issue you may need to use :async="true" on <paginate-links> component to allow for asyncronous rendering',this.parent,"warn")}this.numberOfPages=Math.ceil(this.target.list.length/this.target.per),this.listOfPages=(i=this.numberOfPages,Array.apply(null,{length:i}).map((function(t,e){return e})))}},render:function(t){var e=this;if(!this.target&&this.async)return null;var n=this.simple?function(t,e){var n=t.listOfPages.length-1,i={on:{click:function(e){e.preventDefault(),t.currentPage>0&&(t.currentPage-=1)}}},s={on:{click:function(e){e.preventDefault(),t.currentPage<n&&(t.currentPage+=1)}}},a={class:["next",t.currentPage>=n?"disabled":""]},r={class:["prev",t.currentPage<=0?"disabled":""]},o=e("li",r,[e("a",i,t.simple.prev)]),c=e("li",a,[e("a",s,t.simple.next)]);return[o,c]}(this,t):this.limit>1?function(t,e){var n=new a(t.listOfPages,t.currentPage,t.limit,t.stepLinks).generate(),i=function(t){return t.map((function(e,n){return"…"===e&&0===t[n-1]?"left-ellipses":"…"===e&&0!==t[n-1]?"right-ellipses":e}))}(n=t.showStepLinks?[t.stepLinks.prev].concat(n,[t.stepLinks.next]):n);return n.map((function(n,s){var a={on:{click:function(e){e.preventDefault(),t.currentPage=c(n,t.limit,t.currentPage,t.listOfPages,t.stepLinks,i[s])}}},r=o(n,t.currentPage,t.listOfPages.length-1,t.stepLinks),l=n===parseInt(n,10)?n+1:n;return e("li",{class:r},[e("a",a,l)])}))}(this,t):function(t,e){return(t.showStepLinks?[t.stepLinks.prev].concat(t.listOfPages,[t.stepLinks.next]):t.listOfPages).map((function(n){var i={on:{click:function(e){e.preventDefault(),t.currentPage=c(n,t.limit,t.currentPage,t.listOfPages,t.stepLinks)}}},s=o(n,t.currentPage,t.listOfPages.length-1,t.stepLinks),a=n===t.stepLinks.next||n===t.stepLinks.prev?n:n+1;return e("li",{class:s},[e("a",i,a)])}))}(this,t);if(this.hideSinglePage&&this.numberOfPages<=1)return null;var i=t("ul",{class:["paginate-links",this.for]},n);return this.classes&&this.$nextTick((function(){var t,n;t=i.elm,n=e.classes,Object.keys(n).forEach((function(e){if("ul"===e){var i=n.ul;Array.isArray(i)?i.forEach((function(e){return t.classList.add(e)})):t.classList.add(i)}t.querySelectorAll(e).forEach((function(t){var i=n[e];Array.isArray(i)?i.forEach((function(e){return t.classList.add(e)})):t.classList.add(i)}))}))})),i}};function o(t,e,n,i){var s=i.prev,a=i.next,r=[];return t===s?r.push("left-arrow"):t===a?r.push("right-arrow"):"…"===t?r.push("ellipses"):r.push("number"),t===e&&r.push("active"),(t===s&&e<=0||t===a&&e>=n)&&r.push("disabled"),r}function c(t,e,n,i,s,a){var r=s.prev,o=s.next;void 0===a&&(a=null);var c=Math.floor(n/e);if(t===r)return n-1<0?0:n-1;if(t===o)return n+1>i.length-1?i.length-1:n+1;if(a&&"right-ellipses"===a)return(c+1)*e;if(a&&"left-ellipses"===a){var l=i.slice(c*e,c*e+e);return n===i.length-1&&1===l.length&&c--,(c-1)*e+e-1}return t}var l={install:function(e){e.mixin({created:function(){var t;"undefined"!==this.paginate&&this.paginate instanceof Array&&(this.paginate=(void 0===(t=this.paginate)&&(t=[]),t.reduce((function(t,e){return t[e]={list:[],page:0},t}),{})))},methods:{paginated:function(e){if(this.paginate&&this.paginate[e])return this.paginate[e].list;t("'"+e+"' is not registered in 'paginate' array.",this)}}}),e.component("paginate",s),e.component("paginate-links",r)}};return"undefined"!=typeof window&&window.Vue&&window.Vue.use(l),l}()},xCJq:function(t,e){var n=/(\d{1,2})\s*:?\s*(\d{0,2})\s*(a\.?m\.?|p\.?m\.?)/i,i=/(\d{1,2})\s*:\s*(\d{1,2})/i;function s(t){return 1===t.length?"0"+t:t}function a(t){return parseInt(t)>=12?"pm":"am"}t.exports=function(t,e){return function(t,e){var i=t.match(n);if(i){var a=i[1],r=i[2]||"00";return e||(e="hh:MM"),"pm"==i[3].replace(/\./g,"").toLowerCase()&&"12"!==a?e.replace("hh",parseInt(a)+12).replace("mm",r).replace("MM",s(r)):e.replace("hh",a).replace("HH",s(a)).replace("mm",r).replace("MM",s(r))}}(t,e)||function(t,e){var n=t.match(i);if(n){var r=n[1],o=n[2];return e||(e="hh:MM a"),parseInt(r)>12?e.replace("hh",parseInt(r)-12).replace("HH",s(r)).replace("mm",o).replace("MM",s(o)).replace("a","pm").replace("A","PM"):e.replace("hh",r).replace("HH",s(r)).replace("mm",o).replace("MM",s(o)).replace("a",a(r)).replace("A",a(r).toUpperCase())}}(t,e)}}}]);