(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{MpJr:function(t,e,a){"use strict";a("TjAh")},Pj6Y:function(t,e,a){(e=a("JPst")(!1)).push([t.i,".user-profile-image[data-v-fd655cc6]{width:55px;height:55px}.user-profile-image span[data-v-fd655cc6]{font-size:20px}.position-top-right[data-v-fd655cc6]{position:absolute;top:0;right:0}.badge-icon svg[data-v-fd655cc6]{transform:scale(1.3);margin-right:2px}.badge-icon.text-primary svg[data-v-fd655cc6]{fill:#5a5adf}.badge-icon.text-warning svg[data-v-fd655cc6]{fill:#ffc107}.service[data-v-fd655cc6]{width:33%}.text-decoration-dark[data-v-fd655cc6]{text-decoration-color:#5c6570 !important}.member .btn-more[data-v-fd655cc6]{opacity:0;transition:all .1s ease-in-out}.member:hover .btn-more[data-v-fd655cc6]{opacity:1}.btn-add[data-v-fd655cc6]{border:dashed 1px #adb5bd;transform:none !important}",""]),t.exports=e},TjAh:function(t,e,a){var n=a("Pj6Y");"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(n,s);n.locals&&(t.exports=n.locals)},UX8q:function(t,e,a){"use strict";a.r(e);var n=a("L2JU"),s=a("eeqt"),i=a("ITrF"),r=a("375c"),o=a("/X8E"),l=a("NalG"),c=a("jBWl"),d=a("UEn/"),m=a("MCve"),b=a("pO3a"),u=a("cmxz");function v(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?v(Object(a),!0).forEach((function(e){f(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function f(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var h=a("NmYn"),p={components:{ArrowLeftIcon:s.a,ShortcutIcon:i.a,MoreIcon:r.a,CloseIcon:o.a,PencilIcon:l.a,Modal:c.a,VueSelect:d.a,VueFormValidate:m.a,PackageIcon:b.a,PlusIcon:u.a},data:function(){return{organization:null,clonedOrganization:null,selectedMember:null,newMembers:[],slugify:h}},computed:g(g({},Object(n.d)({members:function(t){return t.members.index}})),{},{membersList:function(){var t=[];return this.members.forEach((function(e){if(!e.is_pending){var a=Object.assign({},e);t.push({text:a.member_user.full_name,value:a})}})),t}}),created:function(){var t=this;this.getMembers(),this.getOrganization(this.$route.params.id).then((function(e){t.organization=e,t.clonedOrganization=Object.assign({},e),t.$root.contentloading=!1}))},mounted:function(){var t=this;setTimeout((function(){document.querySelector(".introjs-overlay")||t.$root.intros.organizations_show.intro.start()}),500)},methods:g(g({},Object(n.b)({getMembers:"members/index",deleteOrganizationMember:"organizations/delete_member",addOrganizationMembers:"organizations/add_members",getOrganization:"organizations/show",updateOrganization:"organizations/update"})),{},{deleteMember:function(){var t=this,e=this.organization.members.findIndex((function(e){return e.id==t.selectedMember.id}));e>-1&&this.organization.members.splice(e,1),this.deleteOrganizationMember(this.selectedMember),this.$refs.deleteModal.hide()},addMembers:function(){var t=this;this.newMembers.length>0&&this.addOrganizationMembers({organization_id:this.organization.id,member_ids:this.newMembers.map((function(t){return t.id}))}).then((function(e){t.organization.members=e.data,t.$refs.addMemberModal.hide()}))}})},_=(a("MpJr"),a("KHd+")),w=Object(_.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.organization?a("div",{staticClass:"w-100 h-100 overflow-hidden"},[a("div",{staticClass:"overflow-auto h-100"},[a("div",{staticClass:"p-3 d-flex align-items-center"},[a("button",{staticClass:"btn p-1 btn-white badge-pill shadow-sm",attrs:{type:"button"},on:{click:function(e){return t.$router.push("/dashboard/team/organizations")}}},[a("arrow-left-icon",{attrs:{width:"30",height:"30"}})],1),t._v(" "),a("div",{staticClass:"ml-auto"},[a("button",{staticClass:"btn p-1 btn-white badge-pill shadow-sm",attrs:{type:"button"},on:{click:function(e){t.clonedOrganization=Object.assign({},t.organization),t.$refs.editModal.show()}}},[a("pencil-icon",{attrs:{width:"30",height:"30",transform:"scale(0.75)"}})],1)])]),t._v(" "),a("div",{staticClass:"text-center"},[a("h1",{staticClass:"font-heading h3 mb-1"},[t._v(t._s(t.organization.name))]),t._v(" "),a("a",{staticClass:"d-inline-flex align-items-center text-decoration-dark",attrs:{href:"/"+t.organization.slug,target:"_blank"}},[a("span",{staticClass:"text-muted mr-1"},[t._v(t._s(t.organization.slug))]),t._v(" "),a("shortcut-icon",{staticClass:"fill-gray",attrs:{height:"14",width:"14"}})],1)]),t._v(" "),a("div",{staticClass:"container mt-5"},[a("div",{staticClass:"row pt-3 px-2"},[t.organization.members.length>0?[t._l(t.organization.members,(function(e){return a("div",{key:e.id,staticClass:"col-md-4 member px-2"},[a("div",{staticClass:"px-1"},[a("div",{staticClass:"bg-white rounded p-3 shadow-sm text-cenxter position-relative"},[a("div",{staticClass:"dropdown position-top-right mr-2 mt-1 btn-more"},[a("button",{staticClass:"btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none",attrs:{type:"button","data-toggle":"dropdown","data-offset":"-132, 0"}},[a("more-icon",{staticClass:"fill-gray-500",attrs:{width:"20",height:"20",transform:"scale(1.3)"}})],1),t._v(" "),a("div",{staticClass:"dropdown-menu"},[a("router-link",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",attrs:{to:"/dashboard/team/members/"+e.member.id}},[t._v("Manage Member")]),t._v(" "),a("span",{staticClass:"dropdown-item d-flex align-items-center px-2 cursor-pointer",on:{click:function(a){t.selectedMember=e,t.$refs.deleteModal.show()}}},[t._v("Remove")])],1)]),t._v(" "),a("div",{staticClass:"mt-n3"},[a("div",{staticClass:"user-profile-image user-profile-image-sm d-inline-block mb-2 mt-n4",style:{backgroundImage:"url("+e.member.member_user.profile_image+")"}},[e.member.member_user.profile_image?t._e():a("span",[t._v(t._s(e.member.member_user.initials))])])]),t._v(" "),a("h5",{staticClass:"font-heading mb-0"},[t._v(t._s(e.member.member_user.full_name))]),t._v(" "),a("small",{staticClass:"text-gray"},[t._v(t._s(e.member.member_user.email))]),t._v(" "),a("div",{staticClass:"d-flex align-items-center mt-3"},[a("package-icon",{attrs:{width:"17",height:"17",fill:"#888"}}),t._v(" "),a("span",{staticClass:"ml-2"},[t._v(t._s(e.member.assigned_services.length)+" assigned services")])],1)])])])})),t._v(" "),a("div",{staticClass:"col-md-4 member px-2"},[a("div",{staticClass:"px-1 h-100"},[a("div",{staticClass:"position-relative h-100"},[a("div",{staticClass:"h-100 position-relative"},[a("button",{staticClass:"py-5 btn btn-light btn-add btn-lg shadow-none d-flex line-height-0 align-items-center justify-content-center w-100 h-100 text-muted",attrs:{"data-intro":t.$root.intros.add_service.intro,"data-step":t.$root.intros.add_service.step,type:"button"},on:{click:function(e){return t.$refs.addMemberModal.show()}}},[a("plus-icon",{staticClass:"fill-gray"}),t._v("\n                      Add Member\n                    ")],1)])])])])]:a("div",{staticClass:"position-absolute-center text-center"},[a("div",{staticClass:"h6 mb-3 font-weight-normal text-secondary"},[t._v("\n              This organization does not have any members yet.\n            ")]),t._v(" "),a("button",{staticClass:"btn btn-white d-inline-flex align-items-center shadow-sm",attrs:{type:"button"},on:{click:function(e){return t.$refs.addMemberModal.show()}}},[t._v("Add Member")])])],2)])]),t._v(" "),a("modal",{ref:"editModal",attrs:{"close-button":!1}},[a("h5",{staticClass:"font-heading"},[t._v("Edit Organization")]),t._v(" "),a("vue-form-validate",{on:{submit:function(e){t.$refs.editModal.hide(),t.updateOrganization(t.clonedOrganization).then((function(e){return t.organization=e}))}}},[a("div",{staticClass:"form-group mb-1"},[a("label",{staticClass:"form-label"},[t._v("Organization Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.clonedOrganization.name,expression:"clonedOrganization.name"}],staticClass:"form-control",attrs:{type:"text","data-required":""},domProps:{value:t.clonedOrganization.name},on:{input:function(e){e.target.composing||t.$set(t.clonedOrganization,"name",e.target.value)}}}),t._v(" "),a("small",{staticClass:"text-muted"},[t._v(t._s(t.slugify(t.clonedOrganization.name,{lower:!0,strict:!0})))])]),t._v(" "),a("div",{staticClass:"d-flex mt-3"},[a("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n              Cancel\n            ")]),t._v(" "),a("button",{staticClass:"btn btn-primary ml-auto",attrs:{type:"submit"}},[t._v("\n              Save\n            ")])])])],1),t._v(" "),a("modal",{ref:"addMemberModal",attrs:{"close-button":!1}},[a("vue-form-validate",{on:{submit:t.addMembers}},[a("h5",{staticClass:"font-heading"},[t._v("Add Members")]),t._v(" "),a("div",{staticClass:"form-group mb-1"},[a("vue-select",{attrs:{options:t.membersList,required:!0,multiple:"",placeholder:"Select members"},model:{value:t.newMembers,callback:function(e){t.newMembers=e},expression:"newMembers"}})],1),t._v(" "),t._l(t.newMembers,(function(e,n){return a("div",{key:e.id,staticClass:"rounded bg-light p-2 d-flex align-items-center mb-1"},[a("div",{staticClass:"user-profile-image user-profile-image-sm",style:{backgroundImage:"url("+e.member_user.profile_image+")"}},[e.member_user.profile_image?t._e():a("span",[t._v(t._s(e.member_user.initials))])]),t._v(" "),a("div",{staticClass:"pl-2 flex-grow-1"},[a("h6",{staticClass:"mb-0 font-heading"},[t._v(t._s(e.member_user.full_name))]),t._v(" "),a("small",{staticClass:"text-secondary"},[t._v(t._s(e.member_user.email))])]),t._v(" "),a("div",{staticClass:"align-self-start"},[a("button",{staticClass:"btn btn-sm p-0 line-height-0 mr-n1 mt-n1",attrs:{type:"button"},on:{click:function(e){return t.newMembers.splice(n,1)}}},[a("close-icon",{attrs:{height:"20",width:"20"}})],1)])])})),t._v(" "),a("div",{staticClass:"d-flex mt-3"},[a("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n            Cancel\n          ")]),t._v(" "),a("button",{staticClass:"btn btn-primary ml-auto",attrs:{type:"submit"},on:{click:function(t){}}},[t._v("\n            Add Members\n          ")])])],2)],1),t._v(" "),a("modal",{ref:"deleteModal",attrs:{"close-button":!1}},[t.selectedMember?[a("h5",{staticClass:"font-heading text-center"},[t._v("Remove Member")]),t._v(" "),a("p",{staticClass:"text-center mt-3"},[t._v("\n          Are you sure to remove  "),a("strong",[t._v(t._s(t.selectedMember.member.member_user.full_name))]),t._v(" from this organization?\n        ")]),t._v(" "),a("div",{staticClass:"d-flex"},[a("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n            Cancel\n          ")]),t._v(" "),a("button",{staticClass:"btn btn-danger ml-auto",attrs:{type:"button"},on:{click:function(e){return t.deleteMember()}}},[t._v("\n            Remove\n          ")])])]:t._e()],2)],1):t._e()}),[],!1,null,"fd655cc6",null);e.default=w.exports},eeqt:function(t,e,a){"use strict";var n={name:"arrow-left"},s=a("KHd+"),i=Object(s.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M8.70710678,12 L18.5,12 C18.7761424,12 19,12.2238576 19,12.5 C19,12.7761424 18.7761424,13 18.5,13 L8.70710678,13 L11.8535534,16.1464466 C12.0488155,16.3417088 12.0488155,16.6582912 11.8535534,16.8535534 C11.6582912,17.0488155 11.3417088,17.0488155 11.1464466,16.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 L11.1464466,8.14644661 C11.3417088,7.95118446 11.6582912,7.95118446 11.8535534,8.14644661 C12.0488155,8.34170876 12.0488155,8.65829124 11.8535534,8.85355339 L8.70710678,12 Z"}})])}),[],!1,null,null,null);e.a=i.exports}}]);