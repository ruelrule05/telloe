(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"375c":function(t,e,s){"use strict";var n=s("KHd+"),a=Object(n.a)({name:"more-h"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"}})])}),[],!1,null,null,null);e.a=a.exports},"5cWj":function(t,e,s){"use strict";var n={props:{value:{type:Boolean,default:!1},activeClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{width:100,state:!1,pressed:0,position:0}},mounted:function(){this.toggle(this.value)},computed:{style:function(){return{transform:"translateX(".concat(this.pos_percentage,")")}},pos_percentage:function(){return"".concat(this.position/this.width*100,"%")},state_class:function(){if(this.state)return this.activeClass+" active"}},watch:{value:function(t){this.toggle(t)},position:function(){this.state=this.position>=50}},methods:{onClick:function(){this.toggle(!this.state),this.emit()},toggle:function(t){this.state=t,this.position=t?100:0},dragging:function(t){var e=(t.clientX-this.$el.offsetLeft)/this.width*100;this.position=e<=0?0:e>=100?100:e},resolvePosition:function(){this.position=this.state?100:0},emit:function(){this.$emit("input",this.state)}}},a=(s("fHoB"),s("KHd+")),o=Object(a.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toggle",class:t.state_class,attrs:{disabled:t.disabled},on:{click:function(e){return e.target!==e.currentTarget?null:t.onClick(e)}}},[s("div",{staticClass:"draggable",style:t.style})])}),[],!1,null,"22734e3b",null);e.a=o.exports},ARml:function(t,e,s){(e=s("JPst")(!1)).push([t.i,".toggle[data-v-22734e3b]{cursor:pointer;width:40px;height:20px;background:#dee2e6;border-radius:200px;transition:background .6s}.toggle[disabled][data-v-22734e3b]{opacity:.5;pointer-events:none !important}.toggle .draggable[data-v-22734e3b]{pointer-events:none;width:20px;height:20px;background:#fff;border-radius:100%;box-shadow:0 0 5px rgba(0,0,0,.25);transform:translateX(0%);transition:transform .05s ease-in-out}.toggle.active[data-v-22734e3b]{background:#5a5adf;transition:background .6s}",""]),t.exports=e},EHMz:function(t,e,s){(e=s("JPst")(!1)).push([t.i,".conversation-list[data-v-69e83f82]{width:350px}.conversations-header[data-v-69e83f82]{padding-top:12px}.str-limit[data-v-69e83f82]{overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.conversation-oncall[data-v-69e83f82]{transition:all .1s ease-in-out;right:0;top:50%;transform:translateY(-50%);z-index:20}.conversation-preview[data-v-69e83f82]{transition:all .1s ease-in-out}.conversation-preview .last-message-time[data-v-69e83f82]{transition:all .1s ease-in-out}.conversation-preview .conversation-dropdown[data-v-69e83f82]{transition:all .1s ease-in-out;right:0;top:50%;transform:translateY(-50%);z-index:10}.conversation-preview.active[data-v-69e83f82]{background-color:rgba(233,236,239,.5) !important}.conversation-preview[data-v-69e83f82]:hover{background-color:#f8f9fa}.conversation-preview:hover .conversation-dropdown[data-v-69e83f82]{opacity:1 !important}.conversation-preview:hover .last-message-time[data-v-69e83f82]{opacity:0}.conversation-message-preview[data-v-69e83f82]{font-size:13px}.member-result[data-v-69e83f82]{transition:all .1s ease-in-out}.member-result.active[data-v-69e83f82]{background-color:#5a5adf !important}.member-result.active *[data-v-69e83f82]{color:#fff !important}.member-result[data-v-69e83f82]:hover{background-color:#e9ecef}.member-result.disabled[data-v-69e83f82]{pointer-events:none}.members-search-container[data-v-69e83f82]{min-height:230px;max-height:230px}.user-profile-image-md[data-v-69e83f82]{width:35px;height:35px}.user-profile-image-md>span[data-v-69e83f82]{font-size:13px}.user-profile-image-sm[data-v-69e83f82]{width:22px;height:22px}.conversation-members .user-profile-image-xs[data-v-69e83f82]{width:22px;height:22px}.conversation-members .user-profile-image-xs>span[data-v-69e83f82]{font-size:8px}.conversation-members .conversation-members-container:nth-child(2):nth-last-child(2)~.conversation-members-container .user-profile-image-xs[data-v-69e83f82]{margin-top:-3px}.conversation-members .conversation-members-more[data-v-69e83f82]{background-color:rgba(255,255,255,.5) !important;font-size:12px !important;letter-spacing:-0.7px;color:#000;z-index:10}.conversation-members .conversation-members-more span[data-v-69e83f82]{margin-left:-1px}.new-conversation-member .btn[data-v-69e83f82]{top:-2px;right:-2px}.badge-new-message[data-v-69e83f82]{top:45%;right:8px;transform:translateY(-50%);width:7px;height:7px;border-radius:50%;background-color:#5a5adf}",""]),t.exports=e},SCGh:function(t,e,s){"use strict";var n=s("o0o1"),a=s.n(n),o=s("L2JU"),i=s("jBWl"),r=s("MCve"),c=s("5cWj"),l=s("KHd+"),d=Object(l.a)({name:"archive"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M3,4.5 L3,6.5 C3,6.77614237 3.22385763,7 3.5,7 L20.5,7 C20.7761424,7 21,6.77614237 21,6.5 L21,4.5 C21,4.22385763 20.7761424,4 20.5,4 L3.5,4 C3.22385763,4 3,4.22385763 3,4.5 Z M21,7.91464715 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,7.91464715 C2.41740381,7.70872894 2,7.15310941 2,6.5 L2,4.5 C2,3.67157288 2.67157288,3 3.5,3 L20.5,3 C21.3284271,3 22,3.67157288 22,4.5 L22,6.5 C22,7.15310941 21.5825962,7.70872894 21,7.91464715 L21,7.91464715 Z M20,8 L4,8 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,8 Z M8,11.5 C8,10.6715729 8.67157288,10 9.5,10 L14.5,10 C15.3284271,10 16,10.6715729 16,11.5 C16,12.3284271 15.3284271,13 14.5,13 L9.5,13 C8.67157288,13 8,12.3284271 8,11.5 Z M9,11.5 C9,11.7761424 9.22385763,12 9.5,12 L14.5,12 C14.7761424,12 15,11.7761424 15,11.5 C15,11.2238576 14.7761424,11 14.5,11 L9.5,11 C9.22385763,11 9,11.2238576 9,11.5 Z"}})])}),[],!1,null,null,null).exports,u=s("375c"),v=s("cmxz"),m=s("M55j"),f=Object(l.a)({name:"search"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M16.9994165,16.2923098 L20.8535534,20.1464466 C21.0488155,20.3417088 21.0488155,20.6582912 20.8535534,20.8535534 C20.6582912,21.0488155 20.3417088,21.0488155 20.1464466,20.8535534 L16.2923098,16.9994165 C14.8819612,18.2444908 13.0292099,19 11,19 C6.581722,19 3,15.418278 3,11 C3,6.581722 6.581722,3 11,3 C15.418278,3 19,6.581722 19,11 C19,13.0292099 18.2444908,14.8819612 16.9994165,16.2923098 Z M11,18 C14.8659932,18 18,14.8659932 18,11 C18,7.13400675 14.8659932,4 11,4 C7.13400675,4 4,7.13400675 4,11 C4,14.8659932 7.13400675,18 11,18 Z"}})])}),[],!1,null,null,null).exports,p=s("/X8E"),h=Object(l.a)({name:"colored-icon"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",version:"1.0",viewBox:"0 0 48 48"}},[e("path",{attrs:{fill:"#5D21D2",d:"M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"}}),this._v(" "),e("path",{attrs:{fill:"#3f1594",d:"M44 35L34 29 34 19 44 13z"}})])}),[],!1,null,null,null).exports,g=s("k0Nl"),C=s("t/1i"),b=s("yufb"),w=s("otWt"),_=s("Vtc4"),x=s("dRai"),y=s("Kqct"),L=Object(l.a)({name:"bell-slash"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M14.8292095,19 C14.4116155,20.1832024 13.2866108,21 12,21 C10.7105968,21 9.58711809,20.1801692 9.17072899,19 L8.5,19 C8.22385763,19 8,18.7761424 8,18.5 C8,18.2238576 8.22385763,18 8.5,18 L16.422476,18 C16.6323536,18 16.8398952,17.9559567 17.0316837,17.8707173 C17.78871,17.5342612 18.1296495,16.6478186 17.7931934,15.8907923 L17.0430942,14.2030692 L17,14 L17,11 C17,10.5422771 16.9386215,10.093202 16.8188406,9.66107585 C16.7450781,9.3949674 16.9010053,9.11944757 17.1671138,9.04568509 C17.4332223,8.97192261 17.7087421,9.12784983 17.7825046,9.39395828 C17.9263416,9.9128703 18,10.4517911 18,11 L18,13.8938928 L18.7070049,15.4846538 C19.2677651,16.7463643 18.6995327,18.2237687 17.4378222,18.7845289 C17.1181747,18.9265944 16.7722719,19 16.422476,19 L14.8292095,19 L14.8292095,19 Z M13.7328929,19 L10.267086,19 C10.6157944,19.6033146 11.26791,20 12,20 C12.730784,20 13.3835919,19.6045386 13.7328929,19 L13.7328929,19 Z M10,5.34141142 L10,5 C10,3.8954305 10.8954305,3 12,3 C13.1045695,3 14,3.8954305 14,5 L14,5.34152584 C14.2469554,5.42881861 14.4880765,5.53238203 14.7220467,5.6516798 C14.9680556,5.77711591 15.0657992,6.07823161 14.9403631,6.32424054 C14.814927,6.57024947 14.5138113,6.66799305 14.2678024,6.54255694 C13.5716136,6.18758117 12.7997838,6 12,6 C9.23857625,6 7,8.23857625 7,11 L7,14 L6.95690577,14.2030692 L6.28557404,15.7135656 C6.173422,15.9659077 5.87794112,16.0795542 5.62559903,15.9674022 C5.37325694,15.8552501 5.25961045,15.5597693 5.37176249,15.3074272 L6,13.8938928 L6,11 C6,8.38756235 7.66961525,6.16508423 10,5.34141142 L10,5.34141142 Z M13,5.08303578 L13,5 C13,4.44771525 12.5522847,4 12,4 C11.4477153,4 11,4.44771525 11,5 L11,5.08295844 C11.3252085,5.0283988 11.6592878,5 12,5 C12.3380973,5 12.6723092,5.02803647 13,5.08303578 L13,5.08303578 Z M20.1464466,3.14644661 C20.3417088,2.95118446 20.6582912,2.95118446 20.8535534,3.14644661 C21.0488155,3.34170876 21.0488155,3.65829124 20.8535534,3.85355339 L3.85355339,20.8535534 C3.65829124,21.0488155 3.34170876,21.0488155 3.14644661,20.8535534 C2.95118446,20.6582912 2.95118446,20.3417088 3.14644661,20.1464466 L20.1464466,3.14644661 Z"}})])}),[],!1,null,null,null).exports,k=Object(l.a)({name:"edit-square"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M20,11.5 C20,11.2238576 20.2238576,11 20.5,11 C20.7761424,11 21,11.2238576 21,11.5 L21,18.5000057 C21,19.8807175 19.8807119,21.0000057 18.5,21.0000057 L5.48612181,21.0000057 C4.10540994,21.0000057 2.98612181,19.8807175 2.98612181,18.5000057 L2.98612181,5.5 C2.98612181,4.11928813 4.10540994,3 5.48612181,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L5.48612181,4 C4.65769469,4 3.98612181,4.67157288 3.98612181,5.5 L3.98612181,18.5000057 C3.98612181,19.3284328 4.65769469,20.0000057 5.48612181,20.0000057 L18.5,20.0000057 C19.3284271,20.0000057 20,19.3284328 20,18.5000057 L20,11.5 Z M18.8535534,3.14644661 L20.8535534,5.14644661 C21.0488155,5.34170876 21.0488155,5.65829124 20.8535534,5.85355339 L12.8535534,13.8535534 C12.7597852,13.9473216 12.6326082,14 12.5,14 L10.5,14 C10.2238576,14 10,13.7761424 10,13.5 L10,11.5 C10,11.3673918 10.0526784,11.2402148 10.1464466,11.1464466 L18.1464466,3.14644661 C18.3417088,2.95118446 18.6582912,2.95118446 18.8535534,3.14644661 Z M18.5,4.20710678 L11,11.7071068 L11,13 L12.2928932,13 L19.7928932,5.5 L18.5,4.20710678 Z"}})])}),[],!1,null,null,null).exports;function M(t,e,s,n,a,o,i){try{var r=t[o](i),c=r.value}catch(t){return void s(t)}r.done?e(c):Promise.resolve(c).then(n,a)}function $(t){return function(){var e=this,s=arguments;return new Promise((function(n,a){var o=t.apply(e,s);function i(t){M(o,n,a,i,r,"next",t)}function r(t){M(o,n,a,i,r,"throw",t)}i(void 0)}))}}function O(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,n)}return s}function j(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?O(Object(s),!0).forEach((function(e){P(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):O(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function P(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var E={components:{Modal:i.a,VueFormValidate:r.a,ToggleSwitch:c.a,ArchiveIcon:d,MoreHIcon:u.a,PlusIcon:v.a,DownloadIcon:m.a,SearchIcon:f,CloseIcon:p.a,VideoIcon:h,UserCircleIcon:g.a,PasswordIcon:C.a,HeadphoneIcon:b.a,LockIcon:w.a,ListBulletIcon:_.a,MoreIcon:x.a,BellIcon:y.a,BellSlashIcon:L,EditSquareIcon:k},data:function(){return{conversationTab:"active",newConversation:{members:[]},userSearch:"",newContact:{custom_fields:{},blacklisted_services:[]},search:""}},computed:j(j({},Object(o.d)({conversations:function(t){return t.conversations.index},ready:function(t){return t.conversations.ready},contacts:function(t){return t.contacts.index},members:function(t){return t.members.index},contactsReady:function(t){return t.contacts.ready},services:function(t){return t.services.index}})),{},{orderedConversations:function(){var t=Object.assign([],this.conversations);t.sort((function(t,e){return(t.last_message.timestamp||0)>(e.last_message.timestamp||0)?-1:1}));var e=this.search.trim().toLowerCase();return t.filter((function(t){if(e.length){var s=t.name||"";return s+=" ".concat(t.user.full_name," ").concat(t.user.email),t.members.forEach((function(t){s+=" ".concat(t.user.full_name," ").concat(t.user.email)})),s.toLowerCase().includes(e)}return!0}))},filteredUsers:function(){var t=[],e=this.userSearch.trim().toLowerCase();return this.users.forEach((function(s){s.user.full_name.toLowerCase().includes(e)&&t.push(s)})),t},defaultEmailMessage:function(){return"".concat(this.$root.auth.full_name," has invited you in ").concat(APP_NAME)},users:function(){var t=[];return this.contacts.forEach((function(e){e.is_pending||t.find((function(t){return t.user.id==e.contact_user_id}))||t.push({type:"contact",user:e.contact_user})})),this.members.forEach((function(e){e.is_pending||t.find((function(t){return t.user.id==e.member_user_id}))||t.push({type:"member",user:e.member_user})})),t}}),watch:{},created:function(){var t=this;this.$root.contentloading=!this.ready,this.getConversations().then((function(){if(!t.$route.params.id&&t.conversations.length>0&&"conversations"==t.$route.name){var e=t.orderedConversations.find((function(t){return!t.deleted_at}));e&&t.setConversation(e)}})),this.getContacts({nopaginate:!0}),this.getMembers(),this.$root.socket.on("new_conversation",(function(e){e.member_ids.find((function(e){return e==t.$root.auth.id}))&&(t.conversations.find((function(t){return t.id==e.conversation_id}))||t.getConversation(e.conversation_id))}))},mounted:function(){},methods:j(j({},Object(o.b)({getConversations:"conversations/index",storeConversation:"conversations/store",updateConversation:"conversations/update",showConversation:"conversations/show",getContacts:"contacts/index",storeContact:"contacts/store",getServices:"services/index",getMembers:"members/index"})),{},{resetNewContact:function(){this.newContact={custom_fields:{},blacklisted_services:[]}},createContact:function(){var t=this;return $(a.a.mark((function e(){var s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.newContact.email){e.next=6;break}return t.$refs.addContactModal.hide(),e.next=4,t.storeContact(t.newContact);case 4:(s=e.sent)&&(t.setConversation(s.conversation),t.$refs.newConversationModal.hide());case 6:case"end":return e.stop()}}),e)})))()},resetNewConversationForm:function(){this.newConversation.members=[],this.userSearch=""},getConversation:function(t){var e=this;return $(a.a.mark((function s(){var n;return a.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.showConversation(t);case 2:(n=e.conversations.find((function(e){return e.id==t})))&&e.setConversation(n);case 4:case"end":return s.stop()}}),s)})))()},addNewConversationMember:function(t){t.is_pending||this.newConversation.members.find((function(e){return e.user.id==t.user.id}))||this.newConversation.members.push(t)},createConversation:function(){var t=this;if(this.newConversation.members.length>0){var e=[];this.newConversation.members.forEach((function(t){e.push(t.user.id)})),this.storeConversation({members:e}).then((function(s){s.id!=t.$route.params.id&&t.setConversation(s),t.$root.socket.emit("new_conversation",{member_ids:e,conversation_id:s.id})})),this.$refs.newConversationModal.hide()}},searchMembers:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],s=e?this.newConversation:this;s.searchingMembers||(s.searchingMembers=!0,setTimeout((function(){window.axios.get("/dashboard/contacts?search=".concat(t.target.value.trim())).then((function(t){s.groupMembersResults=t.data})),s.searchingMembers=!1}),500))},setConversation:function(t){t.id!=this.$route.params.id&&this.$router.replace("/dashboard/conversations/".concat(t.id))}})},S=(s("mffS"),Object(l.a)(E,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bg-white text-left border-right"},[s("div",{staticClass:"conversation-list d-flex flex-column h-100 position-relative"},[s("div",{staticClass:"conversations-header"},[s("div",{staticClass:"d-flex px-3 align-items-center mb-2"},[s("h5",{staticClass:"mb-0 font-heading"},[t._v("Messages")]),t._v(" "),"client"==t.$root.auth.role.role?s("div",{staticClass:"ml-auto"},[s("button",{staticClass:"btn btn-light badge-pill line-height-0 p-1",attrs:{"data-intro":t.$root.intros.conversations.steps[0],"data-step":"1",type:"button"},on:{click:function(e){return t.$refs.newConversationModal.show()}}},[s("edit-square-icon")],1),t._v(" "),s("button",{staticClass:"btn btn-light badge-pill line-height-0 p-1 ml-1",attrs:{"data-intro":t.$root.intros.conversations.steps[1],"data-step":"2",type:"button"},on:{click:function(e){t.$root.muted=!t.$root.muted}}},[t.$root.muted?s("bell-slash-icon",{staticClass:"fill-gray-500"}):s("bell-icon")],1)]):t._e()]),t._v(" "),s("div",{staticClass:"d-flex align-items-center btn-tab mt-3 px-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control border shadow-none",attrs:{type:"text",placeholder:"Search conversations"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})])]),t._v(" "),t.ready?s("div",{staticClass:"overflow-auto p-3 position-relative h-100"},[0==t.conversations.length?s("div",{staticClass:"position-absolute-center w-100 text-center text-muted"},[t._v("\n\t\t\t\t\tYou don't have any conversations yet.\n\t\t\t\t")]):t.orderedConversations.length>0?[t._l(t.orderedConversations,(function(e){return[s("div",{key:e.id,staticClass:"conversation-preview mb-1 position-relative rounded-lg",class:{active:e.id==t.$route.params.id}},[t.$root.callConversation&&t.$root.callConversation.id==e.id?s("div",{staticClass:"conversation-oncall position-absolute pr-3"},[s("video-icon",{attrs:{width:"24",height:"24"}})],1):s("div",{staticClass:"position-absolute conversation-dropdown dropdown opacity-0 pr-2"},[s("button",{staticClass:"btn btn-sm btn-light p-1 line-height-0",attrs:{type:"button","data-toggle":"dropdown","data-offset":"-130,0"}},[s("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(0.75)"}})],1),t._v(" "),s("div",{staticClass:"dropdown-menu"},[e.archive?s("span",{staticClass:"dropdown-item cursor-pointer",on:{click:function(s){e.archive=!1,t.updateConversation(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\tMove to active\n\t\t\t\t\t\t\t\t\t")]):s("span",{staticClass:"dropdown-item cursor-pointer",on:{click:function(s){e.archive=!0,t.updateConversation(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\tMove to archives\n\t\t\t\t\t\t\t\t\t")])])]),t._v(" "),s("div",{staticClass:"p-2 cursor-pointer",on:{click:function(s){return t.setConversation(e)}}},[e.last_message.user_id==t.$root.auth.id||e.last_message.is_read?t._e():s("span",{staticClass:"position-absolute badge-new-message"},[t._v(" ")]),t._v(" "),s("div",{staticClass:"media align-items-center conversation-members"},[s("div",{staticClass:"user-profile-image position-relative",class:{"bg-light border border-gray-200 overflow-hidden":e.members.length>1},style:{backgroundImage:"url("+e.member.profile_image+")"}},[e.members.length<=1&&!e.member.profile_image?s("span",[t._v(t._s(e.member.initials))]):e.members.length>1?s("div",{staticClass:"position-absolute-center w-100 d-flex flex-wrap justify-content-center"},[t._l(e.members,(function(n,a){return[a<4?s("div",{key:n.id,staticClass:"w-50 position-relative conversation-members-container"},[s("div",{staticClass:"line-height-0 user-profile-image user-profile-image-xs overflow-hidden",style:{backgroundImage:"url("+n.user.profile_image+")"}},[n.user.profile_image?t._e():s("span",[t._v(t._s(n.user.initials))]),t._v(" "),3==a&&e.members.length>4?s("span",{staticClass:"line-height-0 conversation-members-more w-100 h-100"},[s("span",{staticClass:"position-absolute-center"},[t._v("+"+t._s(e.members.length-4))])]):t._e()])]):t._e()]}))],2):t._e()]),t._v(" "),s("div",{staticClass:"media-body pl-3 overflow-hidden"},[s("div",{staticClass:"h6 mb-0 font-heading",class:{"font-weight-normal":e.last_message.is_read}},[t._v(t._s(e.member.full_name||e.name))]),t._v(" "),s("div",{staticClass:"d-flex align-items-center text-nowrap conversation-message-preview"},[s("div",{staticClass:"flex-grow-1 text-ellipsis",class:[e.last_message.is_read||e.last_message.user_id==t.$root.auth.id?"text-muted":"text-black font-weight-bold"],domProps:{innerHTML:t._s((e.last_message.prefix||"")+e.last_message.message)}}),t._v(" "),t.$root.callConversation&&t.$root.callConversation.id==e.id?t._e():s("span",{staticClass:"ml-auto text-muted last-message-time pl-2"},[t._v(t._s(e.last_message.created_diff))])])])])])])]}))]:s("div",{staticClass:"position-absolute-center text-muted"},[t._v("No conversations found.")])],2):t._e()]),t._v(" "),s("modal",{ref:"newConversationModal",attrs:{"close-button":!1,scrollable:!1},on:{hidden:t.resetNewConversationForm},scopedSlots:t._u([{key:"footer",fn:function(){return[s("div",{staticClass:"d-flex justify-content-between w-100"},[s("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button"},on:{click:function(e){return t.$refs.newConversationModal.hide()}}},[t._v("Cancel")]),t._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:0==t.newConversation.members.length},on:{click:function(e){return t.createConversation()}}},[t._v("Create")])])]},proxy:!0}])},[s("div",{staticClass:"d-flex modal-title align-items-center mb-3"},[s("h5",{staticClass:"font-heading mb-0"},[t._v("New Conversation")])]),t._v(" "),s("div",{ref:"addNewConversationMembersForm",staticClass:"h-100 overflow-hidden d-flex flex-column",attrs:{default:t.contacts}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userSearch,expression:"userSearch"}],staticClass:"form-control shadow-none border",attrs:{type:"text",placeholder:"Search contacts or members..."},domProps:{value:t.userSearch},on:{input:function(e){e.target.composing||(t.userSearch=e.target.value)}}}),t._v(" "),t.newConversation.members.length>0?s("div",{staticClass:"mt-1"},t._l(t.newConversation.members,(function(e,n){return s("div",{key:e.id,staticClass:"user-profile-image d-inline-block new-conversation-member mr-1",style:{backgroundImage:"url("+e.user.profile_image+")"}},[e.user.profile_image?t._e():s("span",[t._v(t._s(e.user.initials))]),t._v(" "),s("button",{staticClass:"btn btn-sm btn-gray-200 badge-pill p-0 line-height-0 position-absolute",on:{click:function(e){return t.newConversation.members.splice(n,1)}}},[s("close-icon",{staticClass:"cursor-pointer",attrs:{height:"16",width:"16"}})],1)])})),0):t._e(),t._v(" "),s("div",{staticClass:"overflow-y-only mt-2 members-search-container position-relative"},[t.contactsReady?0==t.filteredUsers.length?s("div",{staticClass:"text-center text-muted position-absolute-center w-100"},[t._v("\n\t\t\t\t\t\tNo results found.\n\t\t\t\t\t")]):t.filteredUsers.length>0?s("div",t._l(t.filteredUsers,(function(e){return s("div",{key:e.user.id,staticClass:"media member-result align-items-center rounded mb-2 p-2 cursor-pointer",class:{active:t.newConversation.members.find((function(t){return t.user.id==e.user.id})),disabled:e.is_pending},on:{click:function(s){return t.addNewConversationMember(e)}}},[s("div",{staticClass:"user-profile-image user-profile-image-md align-self-center",style:{backgroundImage:"url("+e.user.profile_image+")"}},[e.user.profile_image?t._e():s("span",[t._v(t._s(e.user.initials))])]),t._v(" "),s("div",{staticClass:"media-body pl-2"},[s("div",{staticClass:"font-weight-bold font-heading mb-0 h6"},[t._v(t._s(e.user.full_name))]),t._v(" "),s("div",{staticClass:"small text-muted text-nowrap"},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.user.email)+"\n\t\t\t\t\t\t\t\t\t"),e.is_pending?s("span",{staticClass:"text-warning"},[t._v("Pending")]):t._e()])])])})),0):t._e():s("div",{staticClass:"text-center position-absolute-center w-100"},[s("div",{staticClass:"spinner-border spinner-border-sm text-primary"})])])])]),t._v(" "),s("modal",{ref:"addContactModal",attrs:{title:"Add Contact",form:!0,"close-button":!1},on:{submit:t.createContact,hidden:function(e){return t.resetNewContact()}},scopedSlots:t._u([{key:"footer",fn:function(){return[s("div",{staticClass:"d-flex w-100 justify-content-between"},[s("button",{staticClass:"btn btn-light shadow-sm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Cancel")]),t._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Add")])])]},proxy:!0}])},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"form-label"},[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newContact.email,expression:"newContact.email"}],staticClass:"form-control",attrs:{type:"email","data-required":""},domProps:{value:t.newContact.email},on:{input:function(e){e.target.composing||t.$set(t.newContact,"email",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-row form-group"},[s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("First Name (Optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newContact.first_name,expression:"newContact.first_name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newContact.first_name},on:{input:function(e){e.target.composing||t.$set(t.newContact,"first_name",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("Last Name (Optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newContact.last_name,expression:"newContact.last_name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newContact.last_name},on:{input:function(e){e.target.composing||t.$set(t.newContact,"last_name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("strong",[t._v("Available services")]),t._v(" "),s("div",{staticClass:"d-flex flex-wrap mx-n1"},[t._l(t.services,(function(e){return[e.is_available?s("div",{key:e.id,staticClass:"mt-2 w-50 px-1"},[s("div",{staticClass:"border rounded shadow-sm py-2 px-3 d-flex"},[s("div",[s("h6",{staticClass:"font-heading mb-0"},[t._v(t._s(e.name))]),t._v(" "),s("small",{staticClass:"text-gray d-block"},[t._v(t._s(e.duration)+" minutes")])]),t._v(" "),s("div",{staticClass:"ml-auto"},[s("toggle-switch",{attrs:{value:!t.newContact.blacklisted_services.find((function(t){return t==e.id}))},on:{input:function(s){return t.toggleServiceBlacklist(s,e)}}})],1)])]):t._e()]}))],2)]),t._v(" "),(t.$root.auth.custom_fields||[]).length>0?s("div",{staticClass:"form-group"},[s("strong",[t._v("Fields (Optional)")]),t._v(" "),s("div",{staticClass:"form-row"},t._l(t.$root.auth.custom_fields,(function(e){return s("div",{key:e,staticClass:"col-6"},[s("label",{staticClass:"form-label"},[t._v(t._s(e))]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newContact.custom_fields[e],expression:"newContact.custom_fields[field]"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newContact.custom_fields[e]},on:{input:function(s){s.target.composing||t.$set(t.newContact.custom_fields,e,s.target.value)}}})])})),0)]):t._e(),t._v(" "),s("div",{staticClass:"form-group"},[s("strong",{staticClass:"mb-1 d-block"},[t._v("Invitation Message (Optional)")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newContact.invite_message,expression:"newContact.invite_message"}],staticClass:"form-control resize-none",attrs:{cols:"10",placeholder:t.defaultEmailMessage},domProps:{value:t.newContact.invite_message},on:{input:function(e){e.target.composing||t.$set(t.newContact,"invite_message",e.target.value)}}})])])],1)}),[],!1,null,"69e83f82",null));e.a=S.exports},WWpO:function(t,e,s){var n=s("EHMz");"string"==typeof n&&(n=[[t.i,n,""]]),s("aET+")(n,{hmr:!0,transform:void 0,insertInto:void 0}),n.locals&&(t.exports=n.locals)},dRai:function(t,e,s){"use strict";var n=s("KHd+"),a=Object(n.a)({name:"more"},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"3",height:"11",viewBox:"0 0 3 11"}},[e("g",[e("path",{attrs:{"fill-rule":"evenodd",d:"M1.34444874 0h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444874 0 .74202145-.60242728 1.34444873-1.34444873 1.34444873h-.0888935C.60242728 2.68889747 0 2.0864702 0 1.34444874 0 .60242728.60242728 0 1.34444874 0z"}}),this._v(" "),e("path",{attrs:{"fill-rule":"evenodd",d:"M1.34444874 4.25333331h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444874 0 .74202145-.60242728 1.34444873-1.34444873 1.34444873h-.0888935C.60242728 6.94223078 0 6.3398035 0 5.59778205 0 4.85576059.60242728 4.2533333 1.34444874 4.2533333z"}}),this._v(" "),e("path",{attrs:{"fill-rule":"evenodd",d:"M1.34444874 8.31112253h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444873 0 .74202146-.60242728 1.34444874-1.34444873 1.34444874h-.0888935C.60242728 11.00002 0 10.39759272 0 9.65557126c0-.74202145.60242728-1.34444873 1.34444874-1.34444873z"}})])])}),[],!1,null,null,null);e.a=a.exports},fHoB:function(t,e,s){"use strict";s("uNBS")},mffS:function(t,e,s){"use strict";s("WWpO")},uNBS:function(t,e,s){var n=s("ARml");"string"==typeof n&&(n=[[t.i,n,""]]),s("aET+")(n,{hmr:!0,transform:void 0,insertInto:void 0}),n.locals&&(t.exports=n.locals)}}]);