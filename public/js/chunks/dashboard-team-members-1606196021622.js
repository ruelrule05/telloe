(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"375c":function(t,e,s){"use strict";var a={name:"more-h"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"}})])}),[],!1,null,null,null);e.a=n.exports},"4m4z":function(t,e,s){"use strict";var a={components:{CheckmarkIcon:s("vqo1").a},data:function(){return{state:!1}},watch:{value:function(t){this.state=t?1:0},state:function(t){this.$emit("input",t)}},created:function(){this.state=this.value},props:{value:{},disabled:{type:Boolean,default:!1},label:{type:String}}},i=(s("KUdA"),s("KHd+")),n=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"checkbox",class:{disabled:t.disabled}},[s("label",{staticClass:"d-flex align-items-center mb-0"},[s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.state,expression:"state"}],attrs:{type:"checkbox",disabled:t.disabled},domProps:{checked:Array.isArray(t.state)?t._i(t.state,null)>-1:t.state},on:{change:function(e){var s=t.state,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&(t.state=s.concat([null])):n>-1&&(t.state=s.slice(0,n).concat(s.slice(n+1)))}else t.state=i}}}),t._v(" "),s("span",{staticClass:"cr"},[s("checkmark-icon",{attrs:{fill:"white"}})],1)]),t._v(" "),s("span",{staticClass:"font-size-base text-body text-exllipsis"},[t._v(t._s(t.label))])])])}),[],!1,null,"f104808c",null);e.a=n.exports},"5cWj":function(t,e,s){"use strict";var a={props:{value:{type:Boolean,default:!1},activeClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{width:100,state:!1,pressed:0,position:0}},mounted:function(){this.toggle(this.value)},computed:{style:function(){return{transform:"translateX(".concat(this.pos_percentage,")")}},pos_percentage:function(){return"".concat(this.position/this.width*100,"%")},state_class:function(){if(this.state)return this.activeClass+" active"}},watch:{value:function(t){this.toggle(t)},position:function(){this.state=this.position>=50}},methods:{onClick:function(){this.toggle(!this.state),this.emit()},toggle:function(t){this.state=t,this.position=t?100:0},dragging:function(t){var e=(t.clientX-this.$el.offsetLeft)/this.width*100;this.position=e<=0?0:e>=100?100:e},resolvePosition:function(){this.position=this.state?100:0},emit:function(){this.$emit("input",this.state)}}},i=(s("fHoB"),s("KHd+")),n=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toggle",class:t.state_class,attrs:{disabled:t.disabled},on:{click:function(e){return e.target!==e.currentTarget?null:t.onClick(e)}}},[s("div",{staticClass:"draggable",style:t.style})])}),[],!1,null,"22734e3b",null);e.a=n.exports},ARml:function(t,e,s){(e=s("JPst")(!1)).push([t.i,".toggle[data-v-22734e3b]{cursor:pointer;width:40px;height:20px;background:#dee2e6;border-radius:200px;transition:background .6s}.toggle[disabled][data-v-22734e3b]{opacity:.5;pointer-events:none !important}.toggle .draggable[data-v-22734e3b]{pointer-events:none;width:20px;height:20px;background:#fff;border-radius:100%;box-shadow:0 0 5px rgba(0,0,0,.25);transform:translateX(0%);transition:transform .05s ease-in-out}.toggle.active[data-v-22734e3b]{background:#5a5adf;transition:background .6s}",""]),t.exports=e},KUdA:function(t,e,s){"use strict";s("SFyK")},KlRW:function(t,e,s){"use strict";var a={name:"user"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z"}})])}),[],!1,null,null,null);e.a=n.exports},MCci:function(t,e,s){"use strict";s("V6+9")},NalG:function(t,e,s){"use strict";var a={name:"pencil"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M15.5,6.20710678 L4,17.7071068 L4,20 L6.29289322,20 L17.7928932,8.5 L15.5,6.20710678 Z M16.2071068,5.5 L18.5,7.79289322 L19.7928932,6.5 L17.5,4.20710678 L16.2071068,5.5 L16.2071068,5.5 Z M3,20.5 L3,17.5 C3,17.3673918 3.05267842,17.2402148 3.14644661,17.1464466 L17.1464466,3.14644661 C17.3417088,2.95118446 17.6582912,2.95118446 17.8535534,3.14644661 L20.8535534,6.14644661 C21.0488155,6.34170876 21.0488155,6.65829124 20.8535534,6.85355339 L6.85355339,20.8535534 C6.7597852,20.9473216 6.63260824,21 6.5,21 L3.5,21 C3.22385763,21 3,20.7761424 3,20.5 Z"}})])}),[],!1,null,null,null);e.a=n.exports},SFyK:function(t,e,s){var a=s("m7aA");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},T1qZ:function(t,e,s){"use strict";var a={props:{label:{type:String,default:""},type:{type:String,default:"button"},icon:{type:String,default:""},button_class:{type:String,default:"btn-block btn-primary"},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data:function(){return{}},mounted:function(){},methods:{}},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn position-relative",class:t.button_class,attrs:{type:t.type,disabled:t.loading||t.disabled},on:{click:function(e){return t.$emit("click")}}},[t.loading?s("span",{staticClass:"spinner position-absolute-center"},[s("span",{staticClass:"spinner-border spinner-border-sm align-middle",attrs:{role:"status","aria-hidden":"true"}})]):t._e(),t._v(" "),s("div",{class:{"opacity-0":t.loading}},[t.icon?[s("i",{class:t.icon}),t._v("  ")]:t._e(),t._t("default")],2)])}),[],!1,null,null,null);e.a=n.exports},"V6+9":function(t,e,s){var a=s("vZvl");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},XPXJ:function(t,e,s){"use strict";var a={name:"clock"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.7906191,14.0931333 C16.0153254,14.2536378 16.0673712,14.5659128 15.9068667,14.7906191 C15.7463622,15.0153254 15.4340872,15.0673712 15.2093809,14.9068667 L11.7093809,12.4068667 C11.6156592,12.3399227 11.5479226,12.2426753 11.5176181,12.1315587 L10.0176181,6.6315587 C9.94496022,6.36514653 10.1020291,6.09027595 10.3684413,6.01761809 C10.6348535,5.94496022 10.909724,6.10202912 10.9823819,6.3684413 L12.4355266,11.6966387 L15.7906191,14.0931333 Z"}})])}),[],!1,null,null,null);e.a=n.exports},fHoB:function(t,e,s){"use strict";s("uNBS")},grtR:function(t,e,s){"use strict";var a={name:"trash"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M19,6 L19,18.5 C19,19.8807119 17.8807119,21 16.5,21 L7.5,21 C6.11928813,21 5,19.8807119 5,18.5 L5,6 L4.5,6 C4.22385763,6 4,5.77614237 4,5.5 C4,5.22385763 4.22385763,5 4.5,5 L9,5 L9,4.5 C9,3.67157288 9.67157288,3 10.5,3 L13.5,3 C14.3284271,3 15,3.67157288 15,4.5 L15,5 L19.5,5 C19.7761424,5 20,5.22385763 20,5.5 C20,5.77614237 19.7761424,6 19.5,6 L19,6 Z M6,6 L6,18.5 C6,19.3284271 6.67157288,20 7.5,20 L16.5,20 C17.3284271,20 18,19.3284271 18,18.5 L18,6 L6,6 Z M14,5 L14,4.5 C14,4.22385763 13.7761424,4 13.5,4 L10.5,4 C10.2238576,4 10,4.22385763 10,4.5 L10,5 L14,5 Z M14,9.5 C14,9.22385763 14.2238576,9 14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,16.5 C15,16.7761424 14.7761424,17 14.5,17 C14.2238576,17 14,16.7761424 14,16.5 L14,9.5 Z M9,9.5 C9,9.22385763 9.22385763,9 9.5,9 C9.77614237,9 10,9.22385763 10,9.5 L10,16.5 C10,16.7761424 9.77614237,17 9.5,17 C9.22385763,17 9,16.7761424 9,16.5 L9,9.5 Z"}})])}),[],!1,null,null,null);e.a=n.exports},m7aA:function(t,e,s){(e=s("JPst")(!1)).push([t.i,'.checkbox label[data-v-f104808c]{cursor:pointer;line-height:20px}.checkbox label[data-v-f104808c]:after{content:"";display:table;clear:both}.checkbox .cr[data-v-f104808c]{position:relative;display:inline-block;border:1px solid #ddd;border-radius:.25em;width:1.2em;height:1.2em;float:left;margin-right:.5em;transition:all .1s ease-in-out}.checkbox .cr svg[data-v-f104808c]{position:absolute;font-size:.7em;line-height:0;top:50%;left:50%;transform:translate(-50%, -50%);transition:all .1s ease-in-out}.checkbox label input[type=checkbox][data-v-f104808c]{display:none}.checkbox label input[type=checkbox]+.cr>svg[data-v-f104808c]{opacity:0}.checkbox label input[type=checkbox]:checked+.cr>svg[data-v-f104808c]{opacity:1}.checkbox label input[type=checkbox]:checked+.cr[data-v-f104808c]{border-color:#5a5adf;background-color:#5a5adf}.checkbox label input[type=checkbox]:disabled+.cr[data-v-f104808c]{opacity:.5}.checkbox.disabled[data-v-f104808c]{pointer-events:none !important}.checkbox.disabled span[data-v-f104808c]{opacity:.3}',""]),t.exports=e},pO3a:function(t,e,s){"use strict";var a={name:"package"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M20,9.5962912 L20,19.5 C20,19.7761424 19.7761424,20 19.5,20 L4.5,20 C4.22385763,20 4,19.7761424 4,19.5 L4,9.5962912 L2.03576165,4.68569534 C1.90438878,4.35726314 2.1462677,4 2.5,4 L12.5,4 C12.7044523,4 12.8883067,4.12447547 12.9642383,4.31430466 L14.5,8.1537088 L16.0357617,4.31430466 C16.1116933,4.12447547 16.2955477,4 16.5,4 L21.5,4 C21.8537323,4 22.0956112,4.35726314 21.9642383,4.68569534 L20,9.5962912 L20,9.5962912 Z M15,10 L15,19 L19,19 L19,10 L15,10 Z M14,10 L5,10 L5,19 L14,19 L14,10 Z M4.83851648,9 L13.7614835,9 L12.1614835,5 L3.23851648,5 L4.83851648,9 Z M19.1614835,9 L20.7614835,5 L16.8385165,5 L15.2385165,9 L19.1614835,9 Z M13,15.5 L13,17.5 C13,17.7761424 12.7761424,18 12.5,18 L9.5,18 C9.22385763,18 9,17.7761424 9,17.5 L9,15.5 C9,15.2238576 9.22385763,15 9.5,15 L12.5,15 C12.7761424,15 13,15.2238576 13,15.5 Z M12,16 L10,16 L10,17 L12,17 L12,16 Z"}})])}),[],!1,null,null,null);e.a=n.exports},rreL:function(t,e,s){"use strict";s.r(e);var a=s("L2JU"),i=s("jBWl"),n=s("MCve"),r=s("4m4z"),o=s("T1qZ"),l=s("5cWj"),c=s("375c"),d=s("cmxz"),m=s("grtR"),u=s("NalG"),v=s("XPXJ"),b=s("KlRW"),p=s("/X8E"),f=s("pO3a");function g(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function h(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?g(Object(s),!0).forEach((function(e){_(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):g(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function _(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var C={components:{Modal:i.a,VueFormValidate:n.a,VueCheckbox:r.a,VueButton:o.a,ToggleSwitch:l.a,MoreIcon:c.a,PlusIcon:d.a,TrashIcon:m.a,PencilIcon:u.a,ClockIcon:v.a,CheckmarkCircleIcon:b.a,CloseIcon:p.a,PackageIcon:f.a},data:function(){var t;return _(t={infoTab:"",selectedMember:null,manageMember:!1,manageFields:!1,addMember:!1,newMember:{custom_fields:{},assigned_services:[],sendToEmail:1},activeTab:"custom_fields",selectedFile:null,addField:!1,newField:"",resendLoading:!1},"selectedMember",null),_(t,"clonedMember",null),t},computed:h(h({},Object(a.d)({ready:function(t){return t.members.ready},services:function(t){return t.services.index},members:function(t){return t.members.index}})),{},{defaultEmailMessage:function(){return"".concat(this.$root.auth.full_name," has invited you as a member in ").concat(APP_NAME)}}),watch:{ready:function(t){this.$root.contentloading=!t}},created:function(){var t=this;this.$root.contentloading=!this.ready,this.getServices(),this.getMembers(),this.$root.socket.on("member_invite_token",(function(e){e&&t.getMemberFromInviteToken(e)}))},mounted:function(){var t=this;this.$root.intros.members_index.enabled&&setTimeout((function(){document.querySelector(".introjs-overlay")||t.$root.intros.members_index.intro.start()}),500)},methods:h(h({},Object(a.b)({getServices:"services/index",getMembers:"members/index",storeMember:"members/store",updateMember:"members/update",deleteMember:"members/delete",getMemberFromInviteToken:"members/get_member_from_invite_token"})),{},{update:function(){this.updateMember(this.clonedMember),this.$refs.editModal.hide()},goToMember:function(t){this.$router.push("/dashboard/team/members/".concat(t))},resendEmail:function(t){var e=this;this.resendLoading=!0,axios.post("/members/".concat(t.id,"/resend")).then((function(){e.resendLoading=!1,e.$refs.resendModal.hide(),e.$toasted.show("Invitation email has been sent successfully.")}))},editMember:function(t){var e=JSON.parse(JSON.stringify(t));e.assigned_services=e.assigned_services.map((function(t){return t.parent_service_id})),this.clonedMember=e,this.$refs.editModal.show()},toggleMemberAssignedService:function(t){var e=this.clonedMember.assigned_services.findIndex((function(e){return e==t.id}));e>-1?this.clonedMember.assigned_services.splice(e,1):this.clonedMember.assigned_services.push(t.id)},toggleAssignedService:function(t){var e=this.newMember.assigned_services.findIndex((function(e){return e==t.id}));e>-1?this.newMember.assigned_services.splice(e,1):this.newMember.assigned_services.push(t.id)},resetNewMember:function(){this.newMember={custom_fields:{},assigned_services:[]}},store:function(){var t=this;this.newMember.email&&(this.storeMember(this.newMember).then((function(){t.newMember={custom_fields:{},assigned_services:[],sendToEmail:1}})),this.$refs.addModal.hide())}})},w=(s("MCci"),s("KHd+")),x=Object(w.a)(C,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ready?s("div",{staticClass:"h-100"},[s("div",{staticClass:"d-flex h-100"},[s("div",{staticClass:"h-100 flex-grow-1"},[s("div",{staticClass:"d-flex flex-column h-100"},[t._m(0),t._v(" "),s("div",{staticClass:"mt-2 overflow-auto h-100 flex-grow-1"},[0==t.members.length?s("div",{staticClass:"text-secondary text-center p-4 position-absolute-center"},[s("div",{staticClass:"h6 mb-0 font-weight-normal"},[s("div",{staticClass:"mb-2"},[t._v("You don't have any members yet.")]),t._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.$refs.addModal.show()}}},[t._v("\n\t\t\t\t\t\t\t\tAdd Member\n\t\t\t\t\t\t\t")])])]):s("div",{staticClass:"overflow-auto h-100 container pb-3 pt-4"},[s("div",{staticClass:"row pt-2 px-2"},[t._l(t.members,(function(e,a){return s("router-link",{key:e.id,staticClass:"col-md-4 member px-2 mb-5 cursor-pointer",attrs:{tag:"div",to:"/dashboard/team/members/"+e.id}},[s("div",{staticClass:"px-1"},[s("div",{staticClass:"bg-white rounded p-3 shadow-sm text-centxer position-relative",attrs:{"data-intro":0==a?t.$root.intros.members_index.steps[0]:null,"data-step":0==a?1:null}},[s("div",{staticClass:"member-buttons position-absolute d-flex align-items-center"},[s("div",{staticClass:"badge badge-icon d-inline-flex align-items-center mr-2",class:[e.is_pending?"bg-warning-light text-warning":"bg-primary-light text-primary"]},[e.is_pending?s("clock-icon",{attrs:{height:"12",width:"12"}}):s("checkmark-circle-icon",{attrs:{height:"12",width:"12"}}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t "+t._s(e.is_pending?"Pending":"Accepted")+"\n\t\t\t\t\t\t\t\t\t\t\t")],1),t._v(" "),s("div",{staticClass:"dropdown",on:{click:function(t){t.preventDefault()}}},[s("button",{staticClass:"btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none",attrs:{type:"button","data-toggle":"dropdown","data-offset":"-132, 0","data-intro":0==a?t.$root.intros.members_index.steps[1]:null,"data-step":0==a?2:null}},[s("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(1.3)"}})],1),t._v(" "),s("div",{staticClass:"dropdown-menu"},[e.is_pending?s("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(s){t.selectedMember=e,t.$refs.resendModal.show()}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tResend invitation\n\t\t\t\t\t\t\t\t\t\t\t\t\t")]):t._e(),t._v(" "),s("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(s){return t.editMember(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),s("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(s){t.selectedMember=e,t.$refs.deleteModal.show()}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t\t\t\t\t\t\t")])])])]),t._v(" "),s("div",{staticClass:"mt-n3"},[s("div",{staticClass:"user-profile-image user-profile-image-sm d-inline-block mb-2 mt-n4",style:{backgroundImage:"url("+e.member_user.profile_image+")"}},[e.member_user.profile_image?t._e():s("span",[t._v(t._s(e.member_user.initials))])])]),t._v(" "),s("h5",{staticClass:"font-heading mb-0"},[t._v(t._s(e.member_user.full_name))]),t._v(" "),s("small",{staticClass:"text-gray"},[t._v(t._s(e.member_user.email))]),t._v(" "),s("div",{staticClass:"d-flex align-items-center justify-content-cexnter mt-3"},[s("package-icon",{attrs:{width:"17",height:"17",fill:"#888"}}),t._v(" "),s("span",{staticClass:"ml-2"},[t._v(t._s(e.assigned_services.length)+" assigned services")])],1)])])])})),t._v(" "),s("div",{staticClass:"col-md-4 member px-2"},[s("div",{staticClass:"px-1 h-100"},[s("div",{staticClass:"position-relative h-100"},[s("div",{staticClass:"h-100 position-relative"},[s("button",{staticClass:"btn btn-light btn-add btn-lg shadow-none d-flex line-height-0 align-items-center justify-content-center w-100 text-muted",attrs:{"data-intro":t.$root.intros.members_index.steps[2],"data-step":"3",type:"button"},on:{click:function(e){return t.$refs.addModal.show()}}},[s("plus-icon",{staticClass:"fill-gray"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\tAdd Member\n\t\t\t\t\t\t\t\t\t\t\t")],1)])])])])],2)])])])]),t._v(" "),s("div",{staticClass:"info bg-white h-100 border-left d-flex flex-column position-relative",class:{open:t.infoTab}},[s("button",{staticClass:"btn btn-white p-0 btn-close position-absolute",attrs:{type:"button"},on:{click:function(e){t.infoTab=""}}},[s("close-icon",{attrs:{height:"30",width:"30"}})],1),t._v(" "),"manage_member"==t.infoTab?[t._m(1),t._v(" "),t.selectedMember?s("div",{staticClass:"p-3"},[s("div",{staticClass:"text-center info-profile"},[s("div",{ref:"profileImage",staticClass:"user-profile-image d-inline-block",style:{backgroundImage:"url("+t.selectedMember.profile_image+")"}},[t.selectedMember.profile_image?t._e():s("span",[t._v(t._s(t.selectedMember.initials))])]),t._v(" "),s("h4",{staticClass:"h5 font-heading conversation-title mb-0 rounded"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.selectedMember.full_name)+"\n\t\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"text-muted"},[t._v(t._s(t.selectedMember.email))]),t._v(" "),(t.selectedMember.contact||{}).is_pending?s("div",{staticClass:"mt-1 badge badge-icon d-inline-flex align-items-center bg-warning-light text-warning"},[s("clock-icon",{staticClass:"fill-warning",attrs:{height:"12",width:"12"}}),t._v("\n\t\t\t\t\t\t\t Pending\n\t\t\t\t\t\t")],1):t._e()]),t._v(" "),s("div",{staticClass:"form-group"},[s("strong",{staticClass:"d-block mb-2 font-weight-bold mt-3"},[t._v("Assigned Services")]),t._v(" "),t._l(t.services,(function(e){return[e.is_available?s("div",{key:e.id,staticClass:"d-flex align-items-center mb-2 rounded p-3 bg-light"},[s("div",[s("h6",{staticClass:"font-heading mb-0"},[t._v(t._s(e.name))]),t._v(" "),s("small",{staticClass:"text-gray d-block"},[t._v(t._s(e.duration)+" minutes")])]),t._v(" "),s("div",{staticClass:"ml-auto"},[e.is_loading?s("div",{staticClass:"spinner-border spinner-border-sm mr-2",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):t._e(),t._v(" "),s("toggle-switch",{class:{"d-none":e.is_loading},attrs:{"active-class":"bg-primary",value:!!t.selectedMember.services.find((function(t){return t.parent_service_id==e.id}))},on:{input:function(s){return t.memberToggleAssignedService(s,e)}}})],1)]):t._e()]}))],2)]):t._e()]:"add_member"==t.infoTab?s("div",{staticClass:"d-flex flex-column overflow-hidden"},[t._m(2),t._v(" "),s("div",{staticClass:"p-4 overflow-auto flex-grow-1"})]):t._e()],2)]),t._v(" "),s("modal",{ref:"editModal",attrs:{"close-button":!1}},[s("h5",{staticClass:"font-heading mb-3"},[t._v("Edit Member")]),t._v(" "),t.clonedMember?s("vue-form-validate",{on:{submit:t.update}},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"form-label"},[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedMember.email,expression:"clonedMember.email"}],staticClass:"form-control",attrs:{disabled:!t.clonedMember.is_pending,type:"email","data-required":""},domProps:{value:t.clonedMember.email},on:{input:function(e){e.target.composing||t.$set(t.clonedMember,"email",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-row form-group"},[s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("First Name (Optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedMember.first_name,expression:"clonedMember.first_name"}],staticClass:"form-control",attrs:{disabled:!t.clonedMember.is_pending,type:"text"},domProps:{value:t.clonedMember.first_name},on:{input:function(e){e.target.composing||t.$set(t.clonedMember,"first_name",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("Last Name (Optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedMember.last_name,expression:"clonedMember.last_name"}],staticClass:"form-control",attrs:{disabled:!t.clonedMember.is_pending,type:"text"},domProps:{value:t.clonedMember.last_name},on:{input:function(e){e.target.composing||t.$set(t.clonedMember,"last_name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("strong",{staticClass:"d-block mb-2 font-weight-bold"},[t._v("Assign Services")]),t._v(" "),t._l(t.services,(function(e){return[e.is_available?s("div",{key:e.id,staticClass:"d-flex align-items-center mb-2 rounded p-3 bg-light"},[s("div",[s("h6",{staticClass:"font-heading mb-0"},[t._v(t._s(e.name))]),t._v(" "),s("small",{staticClass:"text-gray d-block"},[t._v(t._s(e.duration)+" minutes")])]),t._v(" "),s("div",{staticClass:"ml-auto"},[s("toggle-switch",{attrs:{"active-class":"bg-primary",value:!!t.clonedMember.assigned_services.find((function(t){return t==e.id}))},on:{input:function(s){return t.toggleMemberAssignedService(e)}}})],1)]):t._e()]}))],2),t._v(" "),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),s("button",{staticClass:"ml-auto btn btn-primary",attrs:{type:"submit"}},[t._v("\n\t\t\t\t\tSave\n\t\t\t\t")])])]):t._e()],1),t._v(" "),s("modal",{ref:"addModal",attrs:{"close-button":!1}},[s("h5",{staticClass:"font-heading mb-3"},[t._v("Add Member")]),t._v(" "),s("vue-form-validate",{on:{submit:t.store}},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"form-label"},[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newMember.email,expression:"newMember.email"}],staticClass:"form-control",attrs:{type:"email","data-required":""},domProps:{value:t.newMember.email},on:{input:function(e){e.target.composing||t.$set(t.newMember,"email",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-row form-group"},[s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("First Name (Optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newMember.first_name,expression:"newMember.first_name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newMember.first_name},on:{input:function(e){e.target.composing||t.$set(t.newMember,"first_name",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("Last Name (Optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newMember.last_name,expression:"newMember.last_name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newMember.last_name},on:{input:function(e){e.target.composing||t.$set(t.newMember,"last_name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("strong",{staticClass:"d-block mb-2 font-weight-bold"},[t._v("Assign Services")]),t._v(" "),t._l(t.services,(function(e){return[e.is_available?s("div",{key:e.id,staticClass:"d-flex align-items-center mb-2 rounded p-3 bg-light"},[s("div",[s("h6",{staticClass:"font-heading mb-0"},[t._v(t._s(e.name))]),t._v(" "),s("small",{staticClass:"text-gray d-block"},[t._v(t._s(e.duration)+" minutes")])]),t._v(" "),s("div",{staticClass:"ml-auto"},[s("toggle-switch",{attrs:{"active-class":"bg-primary",value:!!t.newMember.assigned_services.find((function(t){return t==e.id}))},on:{input:function(s){return t.toggleAssignedService(e)}}})],1)]):t._e()]}))],2),t._v(" "),s("div",{staticClass:"form-group"},[s("strong",{staticClass:"d-block mb-2"},[t._v("Invitation Message (Optional)")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newMember.invite_message,expression:"newMember.invite_message"}],staticClass:"form-control resize-none",attrs:{rows:"3",placeholder:t.defaultEmailMessage},domProps:{value:t.newMember.invite_message},on:{input:function(e){e.target.composing||t.$set(t.newMember,"invite_message",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("vue-checkbox",{attrs:{label:"Send invitation link to email"},model:{value:t.newMember.sendToEmail,callback:function(e){t.$set(t.newMember,"sendToEmail",e)},expression:"newMember.sendToEmail"}})],1),t._v(" "),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),s("button",{staticClass:"ml-auto btn btn-primary",attrs:{type:"submit"}},[t._v("\n\t\t\t\t\tAdd\n\t\t\t\t")])])])],1),t._v(" "),s("modal",{ref:"resendModal",attrs:{"close-button":!1}},[t.selectedMember?[s("h5",{staticClass:"font-heading text-center"},[t._v("Resend Invitation")]),t._v(" "),s("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\tAre you sure to resend the invitation email to member\n\t\t\t\t"),s("strong",[t._v(t._s(t.selectedMember.full_name.trim()||t.selectedMember.email))]),t._v("\n\t\t\t\t?\n\t\t\t\t"),s("br")]),t._v(" "),s("div",{staticClass:"d-flex justify-content-end"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),s("vue-button",{attrs:{button_class:"btn btn-primary ml-auto",loading:t.resendLoading,type:"button"},on:{click:function(e){return t.resendEmail(t.selectedMember)}}},[t._v("Resend Invitation")])],1)]:t._e()],2),t._v(" "),s("modal",{ref:"deleteModal",attrs:{"close-button":!1}},[t.selectedMember?[s("h5",{staticClass:"font-heading text-center"},[t._v("Delete Member")]),t._v(" "),s("p",{staticClass:"text-center mt-3"},[t._v("\n\t\t\t\tAre you sure to delete member\n\t\t\t\t"),s("strong",[t._v(t._s(t.selectedMember.full_name.trim()||t.selectedMember.email))]),t._v("\n\t\t\t\t?\n\t\t\t\t"),s("br"),t._v(" "),s("span",{staticClass:"text-danger"},[t._v("This action cannot be undone")])]),t._v(" "),s("div",{staticClass:"d-flex justify-content-end"},[s("button",{staticClass:"btn btn-light shadow-none text-body",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]),t._v(" "),s("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){t.deleteMember(t.selectedMember),t.$refs.deleteModal.hide(),t.selectedMember=null}}},[t._v("\n\t\t\t\t\tDelete\n\t\t\t\t")])])]:t._e()],2)],1):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"border-bottom bg-white px-3 py-4"},[e("h5",{staticClass:"font-heading mb-0"},[this._v("Members")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"border-bottom py-3 px-3"},[e("strong",{staticClass:"d-block my-2"},[this._v("Manage Member")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"border-bottom py-3 px-3"},[e("strong",{staticClass:"d-block my-2"},[this._v("Add Member")])])}],!1,null,"966bfd4a",null);e.default=x.exports},uNBS:function(t,e,s){var a=s("ARml");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,i);a.locals&&(t.exports=a.locals)},vZvl:function(t,e,s){(e=s("JPst")(!1)).push([t.i,".info[data-v-966bfd4a]{transition:all .1s ease-in-out;width:350px;margin-right:-350px}.info.open[data-v-966bfd4a]{margin-right:0}.contact.active[data-v-966bfd4a]{box-shadow:0 0 0 .1rem #5a5adf}.w-35[data-v-966bfd4a]{width:35% !important}.w-15[data-v-966bfd4a]{width:15% !important}.badge-icon svg[data-v-966bfd4a]{transform:scale(1.3);margin-right:2px}.badge-icon.text-primary svg[data-v-966bfd4a]{fill:#5a5adf}.badge-icon.text-warning svg[data-v-966bfd4a]{fill:#ffc107}.btn-close[data-v-966bfd4a]{top:10px;right:10px}.user-profile-image[data-v-966bfd4a]{width:55px;height:55px}.user-profile-image span[data-v-966bfd4a]{font-size:20px}.btn-add[data-v-966bfd4a]{border:dashed 1px #adb5bd;transform:none !important;padding-top:55px;padding-bottom:55px}.member-buttons[data-v-966bfd4a]{top:10px;right:10px}",""]),t.exports=e},vqo1:function(t,e,s){"use strict";var a={name:"checkmark"},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"}})])}),[],!1,null,null,null);e.a=n.exports}}]);