(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"0y+J":function(t,a,e){(a=e("JPst")(!1)).push([t.i,".plan[data-v-3204e905]{box-shadow:0 1px 2px rgba(92,101,112,.2);transition:all .1s ease-in-out}.plan .btn-checkmark[data-v-3204e905]{right:0;top:0}.plan .btn-checkmark svg[data-v-3204e905]{opacity:0;fill:#fff;stroke:#fff}.plan.active .btn-checkmark[data-v-3204e905]{background:#5a5adf}.plan.active .btn-checkmark svg[data-v-3204e905]{opacity:1}.plan.selected[data-v-3204e905]:not(.active){box-shadow:0 0 0 .1rem rgba(90,90,223,.6)}.plan-price[data-v-3204e905]{background:rgba(90,90,223,.035)}.booking-plus[data-plan=standard] svg[data-v-3204e905],.booking-plus[data-plan=pro] svg[data-v-3204e905]{opacity:0}.payments[data-plan=standard] svg[data-v-3204e905]{opacity:0}.integrations[data-plan=standard]>div:nth-child(5) svg[data-v-3204e905],.integrations[data-plan=standard]>div:nth-child(6) svg[data-v-3204e905]{opacity:0}",""]),t.exports=a},LFox:function(t,a,e){var s=e("0y+J");"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(s,n);s.locals&&(t.exports=s.locals)},T1qZ:function(t,a,e){"use strict";var s={props:{label:{type:String,default:""},type:{type:String,default:"button"},icon:{type:String,default:""},button_class:{type:String,default:"btn-block btn-primary"},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data:function(){return{}},mounted:function(){},methods:{}},n=e("KHd+"),i=Object(n.a)(s,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"btn position-relative",class:t.button_class,attrs:{type:t.type,disabled:t.loading||t.disabled},on:{click:function(a){return t.$emit("click")}}},[t.loading?e("span",{staticClass:"spinner position-absolute-center"},[e("span",{staticClass:"spinner-border spinner-border-sm align-middle",attrs:{role:"status","aria-hidden":"true"}})]):t._e(),t._v(" "),e("div",{class:{"opacity-0":t.loading}},[t.icon?[e("i",{class:t.icon}),t._v("  ")]:t._e(),t._t("default")],2)])}),[],!1,null,null,null);a.a=i.exports},TvIf:function(t,a,e){"use strict";e.r(a);var s=e("o0o1"),n=e.n(s),i=e("L2JU"),r=e("T1qZ"),c=e("jBWl"),o=e("MCve"),l=e("pTNP"),d=e.n(l),u=e("vqo1");function m(t,a,e,s,n,i,r){try{var c=t[i](r),o=c.value}catch(t){return void e(t)}c.done?a(o):Promise.resolve(o).then(s,n)}function v(t){return function(){var a=this,e=arguments;return new Promise((function(s,n){var i=t.apply(a,e);function r(t){m(i,s,n,r,c,"next",t)}function c(t){m(i,s,n,r,c,"throw",t)}r(void 0)}))}}function p(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,s)}return e}function f(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?p(Object(e),!0).forEach((function(a){h(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):p(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}function h(t,a,e){return a in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}var b={components:{VueButton:r.a,Modal:c.a,VueFormValidate:o.a,CheckmarkIcon:u.a},data:function(){return{selectedPlan:null,paymentLoading:!1,cardForm:{number:"",expiration:"",exp_month:"",exp_year:"",cvc:"",name:"",errors:{number:!1,expiration:!1,cvc:!1}},stripe:null,publishableKey:"",seats:0,loading:!1}},computed:f({},Object(i.d)({plans:function(t){return t.plans.index},ready:function(t){return t.plans.ready}})),mounted:function(){},created:function(){this.$root.contentloading=!this.ready,this.$root.heading="Billing",this.getData(),this.getPlans()},watch:{ready:function(t){this.$root.contentloading=!t,t&&(this.seats=this.plans[0].seats)}},methods:f(f({},Object(i.b)({getPlans:"plans/index"})),{},{selectPlan:function(t){t.id!=(this.$root.auth.subscription||{}).plan_id&&(this.selectedPlan=t,this.$refs.paymentModal.show())},unsubscribe:function(){var t=this;this.loading=!0,window.axios.delete("/dashboard/subscriptions/".concat(this.$root.auth.id)).then((function(){t.$root.auth.subscription=null,t.$refs.cancelSubscription.hide(),t.loading=!1}))},subscribe:function(){var t=this;return v(n.a.mark((function a(){var e,s,i;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(Object.keys(t.cardForm.errors).forEach((function(a){return t.cardForm.errors[a]=""})),e=!1,t.$cardFormat.validateCardNumber(t.cardForm.number)||(t.cardForm.errors.number=e=!0),t.$cardFormat.validateCardExpiry(t.cardForm.expiration)||(t.cardForm.errors.expiration=e=!0),t.$cardFormat.validateCardCVC(t.cardForm.cvc)||(t.cardForm.errors.cvc=e=!0),e||!t.selectedPlan){a.next=17;break}return t.paymentLoading=!0,s=t.cardForm.expiration.split("/"),t.cardForm.exp_month=parseInt(s[0].trim()),t.cardForm.exp_year=s[1].trim(),2===t.cardForm.exp_year.length&&(t.cardForm.exp_year<70?t.cardForm.exp_year="20".concat(t.cardForm.exp_year):t.cardForm.exp_year="19".concat(t.cardForm.exp_year)),t.cardForm.exp_year=parseInt(t.cardForm.exp_year),i={card:{number:"4242424242424242",exp_month:"02",exp_year:"21",cvc:"999",name:"Billy Joe"}},a.next=15,t.stripe.createToken(i);case 15:a.sent.json().then((function(a){window.axios.post("/dashboard/subscriptions",{card:t.cardForm,card_token:a.id,plan_id:t.selectedPlan.id}).then((function(a){t.$refs.paymentModal.hide(),t.$root.auth.subscription=a.data})).catch((function(){t.paymentLoading=!1}))}));case 17:case"end":return a.stop()}}),a)})))()},getData:function(){var t=this;return v(n.a.mark((function a(){var e;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,window.axios.get("/dashboard/stripe_publishable_key");case 2:e=a.sent,t.publishableKey=e.data,t.stripe=d()(t.publishableKey);case 5:case"end":return a.stop()}}),a)})))()}})},g=(e("k/VV"),e("KHd+")),_=Object(g.a)(b,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"py-4 d-flex flex-row w-100 align-items-center h-100 overflow-auto "},[e("div",{staticClass:"w-100 h-100"},[e("h1",{staticClass:"font-heading mb-4 text-center"},[t._v("Choose a Plan")]),t._v(" "),e("div",{staticClass:"d-flex flex-row align-items-center justify-content-center"},[e("div",{staticClass:"row pb-4 px-3 h-100 w-100 m-0 justify-content-center"},t._l(t.plans,(function(a){return e("div",{key:a.id,staticClass:"col-md-4 py-2"},[e("div",{staticClass:"border rounded bg-white plan p-3 position-relative",class:{active:t.$root.auth.subscription&&t.$root.auth.subscription.plan_id==a.id,selected:a.id==(t.selectedPlan||{}).id}},[e("div",{staticClass:"btn btn-checkmark p-1 badge-pill line-height-0 position-absolute mr-2 mt-2"},[e("checkmark-icon",{attrs:{width:"20",height:"20",transform:"scale(1.8)","stroke-width":"1"}})],1),t._v(" "),e("h5",{staticClass:"mb-4 font-heading text-primary text-uppercase"},[t._v(t._s(a.name))]),t._v(" "),e("h4",{staticClass:"mb-0 font-weight-normal d-inline"},[e("strong",[t._v("$"+t._s(parseInt(a.price)))])]),t._v(" "),e("span",[t._v("."+t._s(a.price.split(".")[1]))]),t._v(" / "+t._s(a.interval)+"\n\n\t\t\t\t\t\t"),e("div",{staticClass:"text-secondary"},[a.per_user?[t._v("per user")]:t._e(),t._v("\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t")],2),t._v(" "),e("div",{staticClass:"mt-3"},[t.$root.auth.subscription&&t.$root.auth.subscription.plan_id==a.id?e("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button"},on:{click:function(a){return t.$refs.cancelSubscription.show()}}},[t._v("Cancel subscription")]):e("button",{staticClass:"btn btn-outline-primary btn-lg btn-block",attrs:{disabled:t.$root.auth.subscription,type:"button"},on:{click:function(e){return t.selectPlan(a)}}},[t._v("Subscribe")])]),t._v(" "),e("div",{staticClass:"my-3"},[e("strong",[t._v("Bookings")]),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Booking System")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Booking URL")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Time Zone Manager")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Email Reminders")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Unlimited Service Types")],1),t._v(" "),e("div",{staticClass:"booking-plus",attrs:{"data-plan":a.name.toLowerCase()}},[e("strong",{staticClass:"mt-3 d-block"},[t._v("Booking Plus")]),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Multi-team booking system")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Organization Booking URL")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Linked Accounts")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Admin Bookings")],1)]),t._v(" "),e("div",{staticClass:"payments",attrs:{"data-plan":a.name.toLowerCase()}},[e("strong",{staticClass:"mt-3 d-block"},[t._v("Payments")]),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Take Payments (via Stripe)")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Xero Accounting Integration")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Subscription Manager")],1)]),t._v(" "),e("div",{staticClass:"integrations",attrs:{"data-plan":a.name.toLowerCase()}},[e("strong",{staticClass:"mt-3 d-block"},[t._v("Integrations")]),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Zoom")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Google Calendar")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Outlook Calendar")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Xero")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Stripe")],1)]),t._v(" "),e("strong",{staticClass:"mt-3 d-block"},[t._v("Communication")]),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Unlimited Contacts")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Delayed Chat")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Live Chat")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Send Files")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Send Voice Memos")],1),t._v(" "),e("div",{staticClass:"d-flex align-items-center"},[e("checkmark-icon",{staticClass:"fill-success ml-n1",attrs:{width:"30",height:"30"}}),t._v("Live Video Calls")],1)]),t._v(" "),e("small",{staticClass:"text-secondary"},[t._v("+ Stripe processing fees of 2.9% + 30¢ per successful card charge.")])])])})),0)])]),t._v(" "),e("modal",{ref:"cancelSubscription",attrs:{"close-button":!1}},[e("div",{staticClass:"text-center"},[e("h5",{staticClass:"font-heading"},[t._v("Cancel Subscription")]),t._v(" "),e("p",{staticClass:"mb-0"},[t._v("Are you sure to cancel your current subscription?")])]),t._v(" "),e("div",{staticClass:"d-flex mt-4"},[e("button",{staticClass:"btn btn-light shadow-none",attrs:{type:"button",disabled:t.loading},on:{click:function(a){return t.$refs.cancelSubscription.hide()}}},[t._v("Cancel")]),t._v(" "),e("vue-button",{attrs:{type:"button",loading:t.loading,button_class:"ml-auto btn btn-danger"},on:{click:function(a){return t.unsubscribe()}}},[t._v("Cancel Subscription")])],1)]),t._v(" "),e("modal",{ref:"paymentModal",attrs:{"close-button":!1},on:{hidden:function(a){t.selectedPlan=null,t.paymentLoading=!1}}},[t.selectedPlan?e("div",[e("div",{staticClass:"bg-orange-light rounded p-3 selected-plan-summary"},[e("h5",{staticClass:"mb-1 font-heading text-primary text-uppercase"},[t._v(t._s(t.selectedPlan.name))]),t._v(" "),e("h4",{staticClass:"mb-0 font-weight-normal d-inline"},[e("strong",[t._v("$"+t._s(parseInt(t.selectedPlan.price)))])]),t._v(" "),e("span",[t._v("."+t._s(t.selectedPlan.price.split(".")[1]))]),t._v(" / "+t._s(t.selectedPlan.interval)+"\n\t\t\t")]),t._v(" "),e("vue-form-validate",{staticClass:"mt-3",on:{submit:function(a){return t.subscribe()}}},[e("fieldset",{attrs:{disabled:t.paymentLoading}},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label"},[t._v("Card Number")]),t._v(" "),e("div",{staticClass:"input-icon position-relative"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.cardForm.number,expression:"cardForm.number"},{name:"cardformat",rawName:"v-cardformat:formatCardNumber",arg:"formatCardNumber"}],staticClass:"form-control",class:{"is-invalid":t.cardForm.errors.number},attrs:{type:"tel",placeholder:"#### #### #### ####","data-required":""},domProps:{value:t.cardForm.number},on:{input:function(a){a.target.composing||t.$set(t.cardForm,"number",a.target.value)}}}),t._v(" "),e("div",{staticClass:"invalid-tooltip"},[t._v("Invalid card number")])])]),t._v(" "),e("div",{staticClass:"row mb-3 form-row form-group"},[e("div",{staticClass:"col"},[e("label",{staticClass:"form-label"},[t._v("Expiration")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.cardForm.expiration,expression:"cardForm.expiration"},{name:"cardformat",rawName:"v-cardformat:formatCardExpiry",arg:"formatCardExpiry"}],staticClass:"form-control",class:{"is-invalid":t.cardForm.errors.expiration},attrs:{type:"text",placeholder:"MM/YY","data-required":""},domProps:{value:t.cardForm.expiration},on:{input:function(a){a.target.composing||t.$set(t.cardForm,"expiration",a.target.value)}}}),t._v(" "),e("div",{staticClass:"invalid-tooltip"},[t._v("Invalid card expiration")])]),t._v(" "),e("div",{staticClass:"col"},[e("label",{staticClass:"form-label"},[t._v("CVC")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.cardForm.cvc,expression:"cardForm.cvc"},{name:"cardformat",rawName:"v-cardformat:formatCardCVC",arg:"formatCardCVC"}],staticClass:"form-control",class:{"is-invalid":t.cardForm.errors.cvc},attrs:{type:"text",placeholder:"***","data-required":""},domProps:{value:t.cardForm.cvc},on:{input:function(a){a.target.composing||t.$set(t.cardForm,"cvc",a.target.value)}}}),t._v(" "),e("div",{staticClass:"invalid-tooltip"},[t._v("Invalid card CVC")])])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label"},[t._v("Name on card")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.cardForm.name,expression:"cardForm.name"}],staticClass:"form-control",attrs:{type:"text","data-required":""},domProps:{value:t.cardForm.name},on:{input:function(a){a.target.composing||t.$set(t.cardForm,"name",a.target.value)}}})])]),t._v(" "),e("div",{staticClass:"d-flex align-items-center mt-3"},[e("button",{staticClass:"btn btn-light shadow-none",attrs:{disabled:t.paymentLoading,type:"button","data-dismiss":"modal"}},[t._v("Cancel")]),t._v(" "),e("vue-button",{attrs:{type:"submit",loading:t.paymentLoading,button_class:"ml-auto btn btn-primary shadow-none"}},[t._v("Subscribe")])],1)])],1):t._e()])],1)}),[],!1,null,"3204e905",null);a.default=_.exports},"k/VV":function(t,a,e){"use strict";e("LFox")},olGb:function(t,a){t.exports=function(t,a){"use strict";var e=new RegExp(['(?:[\0-"-&+-}-퟿-￿]|',"[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|","(?:[^\ud800-\udbff]|^)[\udc00-\udfff])"].join(""),"g");function s(t){return String(t).replace(e,encodeURIComponent).replace(/ /g,"+").replace(/[!'()~\*]/g,(function(t){return"%"+t.charCodeAt().toString(16).slice(-2).toUpperCase()}))}function n(t){var e=Object.keys(t);return a.sorted?e.sort():e}function i(t){return t.filter((function(t){return t})).join("&")}function r(t,e){var c=typeof e,o=null;return e===o?o=a.ignorenull?o:s(t)+"="+o:/string|number|boolean/.test(c)?o=s(t)+"="+s(e):Array.isArray(e)?o=function(t,e){return e.length?i(e.map((function(e,s){return a.skipIndex?r(t+"[]",e):r(t+"["+s+"]",e)}))):s(t+"[]")}(t,e):"object"===c&&(o=function(t,a){return i(n(a).map((function(e){return r(t+"["+e+"]",a[e])})))}(t,e)),o}return a="object"==typeof a?a:{},t&&i(n(t).map((function(a){return r(a,t[a])})))}},pTNP:function(t,a,e){const s=e("olGb");function n(t,a){const e=s(t);return fetch("https://api.stripe.com/v1/tokens",{method:"post",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+a},body:e})}t.exports=function(t){return{createToken:async function(a){const e=Object.keys(a),s=function(t,a){return null!=t.card?a.indexOf("card"):null!=t.bank_account?a.indexOf("bank_account"):null!=t.pii&&a.indexOf("pii")}(a,e);var i;if(0==s){let c=e[s];var r=function(t,a){var e={};for(var s in a){e[t+"["+s+"]"]=a[s]}return e}(c,a[c]);i=await n(r,t)}else i=await n(a,t);return async function(t){if(null==t._bodyInit)return t;return await t.json()}(i)}}}},vqo1:function(t,a,e){"use strict";var s={name:"checkmark"},n=e("KHd+"),i=Object(n.a)(s,(function(){var t=this.$createElement,a=this._self._c||t;return a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[a("path",{attrs:{d:"M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"}})])}),[],!1,null,null,null);a.a=i.exports}}]);