(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{J5Va:function(t,e,o){"use strict";o.r(e);var s={data:function(){return{script:""}},created:function(){this.script='<script src="'.concat(APP_URL,"/js/widget.js?p=").concat(this.$root.auth.username,'"><\/script>'),this.$root.contentloading=!1},methods:{copyToClipboard:function(){this.$toasted.show("Copied to clipboard");var t=this.$refs.script,e=$("<input>");$("body").append(e),e.val($(t).text()).select(),document.execCommand("copy"),e.remove(),this.selectElementText(t)},selectElementText:function(t){var e,o,s=window,a=s.document;s.getSelection&&a.createRange?(e=s.getSelection(),(o=a.createRange()).selectNodeContents(t),e.removeAllRanges(),e.addRange(o)):a.body.createTextRange&&((o=a.body.createTextRange()).moveToElementText(t),o.select())}}},a=(o("aZVL"),o("KHd+")),n=Object(a.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row justify-content-center position-absolute-center w-100"},[e("div",{staticClass:"col-md-6"},[this._v("\n        Click to copy and paste this code as the first item into the "),e("strong",[this._v("<HEAD>")]),this._v(" of every webpage you want to show the booking widget.\n        "),e("div",{ref:"script",staticClass:"border border-dashed rounded p-3 mt-2 bg-white cursor-pointer text-wrap",on:{click:this.copyToClipboard}},[e("code",[this._v(this._s(this.script))])])])])}),[],!1,null,"3baf73a2",null);e.default=n.exports},aZVL:function(t,e,o){"use strict";var s=o("r3ag");o.n(s).a},gSPH:function(t,e,o){(e=o("JPst")(!1)).push([t.i,".border-dashed[data-v-3baf73a2]{border-style:dashed !important;word-break:break-all}",""]),t.exports=e},r3ag:function(t,e,o){var s=o("gSPH");"string"==typeof s&&(s=[[t.i,s,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};o("aET+")(s,a);s.locals&&(t.exports=s.locals)}}]);