(self.webpackChunk=self.webpackChunk||[]).push([[807],{5688:(e,t,o)=>{"use strict";o.d(t,{Z:()=>a});var n=o(3645),s=o.n(n)()((function(e){return e[1]}));s.push([e.id,".border-dashed[data-v-3baf73a2]{border-style:dashed!important;word-break:break-all}",""]);const a=s},4179:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>i});const n={data:function(){return{script:""}},created:function(){this.script='<script src="'.concat(APP_URL,"/js/widget.js?p=").concat(this.$root.auth.username,'"><\/script>'),this.$root.contentloading=!1},methods:{copyToClipboard:function(){this.$toasted.show("Copied to clipboard");var e=this.$refs.script,t=$("<input>");$("body").append(t),t.val($(e).text()).select(),document.execCommand("copy"),t.remove(),this.selectElementText(e)},selectElementText:function(e){var t,o,n=window,s=n.document;n.getSelection&&s.createRange?(t=n.getSelection(),(o=s.createRange()).selectNodeContents(e),t.removeAllRanges(),t.addRange(o)):s.body.createTextRange&&((o=s.body.createTextRange()).moveToElementText(e),o.select())}}};var s=o(3379),a=o.n(s),r=o(5688),c={insert:"head",singleton:!1};a()(r.Z,c);r.Z.locals;const i=(0,o(1900).Z)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"row justify-content-center position-absolute-center w-100"},[o("div",{staticClass:"col-md-6"},[e._v("\n        Click to copy and paste this code as the first item into the "),o("strong",[e._v("<HEAD>")]),e._v(" of every webpage you want to show the booking widget.\n        "),o("div",{ref:"script",staticClass:"border border-dashed rounded p-3 mt-2 bg-white cursor-pointer text-wrap",on:{click:e.copyToClipboard}},[o("code",[e._v(e._s(e.script))])])])])}),[],!1,null,"3baf73a2",null).exports}}]);