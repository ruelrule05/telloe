/*! For license information please see gallery-1606410417323.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{HH3L:function(t,e,i){(e=i("JPst")(!1)).push([t.i,"#gallery[data-v-6edccb7a]{width:100vw;height:100vh;top:0;left:0;z-index:-1;backdrop-filter:blur(20px);background-color:rgba(0,0,0,.5);visibility:hidden;opacity:0;transition:all .1s ease-in-out}#gallery.open[data-v-6edccb7a]{visibility:visible;opacity:1;z-index:1000}#gallery img[data-v-6edccb7a]{max-width:100%;max-height:100%}#gallery .preview[data-v-6edccb7a]{width:100px;height:100px;flex:0 0 100px;background-size:cover;background-repeat:no-repeat;background-position:center;background-color:#000;transition:all .1s ease-in-out;opacity:.5}#gallery .preview.active[data-v-6edccb7a],#gallery .preview[data-v-6edccb7a]:hover{opacity:1}#gallery .file-arrow svg[data-v-6edccb7a]{opacity:.75;transition:all .1s ease-in-out}#gallery .file-arrow:hover svg[data-v-6edccb7a]{opacity:1}#gallery .file-arrow.disabled[data-v-6edccb7a]{opacity:0;pointer-events:none}#gallery .image-loade[data-v-6edccb7a]{z-index:10}",""]),t.exports=e},IGiv:function(t,e,i){"use strict";var s={name:"chevron-right"},n=i("KHd+"),r=Object(n.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12.8414611,12 L10.1203717,8.82539569 C9.94066062,8.61573277 9.96494139,8.30008277 10.1746043,8.1203717 C10.3842672,7.94066062 10.6999172,7.96494139 10.8796283,8.17460431 L13.8796283,11.6746043 C14.0401239,11.8618492 14.0401239,12.1381508 13.8796283,12.3253957 L10.8796283,15.8253957 C10.6999172,16.0350586 10.3842672,16.0593394 10.1746043,15.8796283 C9.96494139,15.6999172 9.94066062,15.3842672 10.1203717,15.1746043 L12.8414611,12 Z"}})])}),[],!1,null,null,null);e.a=r.exports},Tvms:function(t,e,i){"use strict";var s=i("oFXt");i.n(s).a},jcJ4:function(t,e,i){!function(t){"use strict";var e={props:{src:{type:String,required:!0},srcPlaceholder:{type:String,default:"//:0"},srcset:{type:String},intersectionOptions:{type:Object,default:function(){return{}}},usePicture:{type:Boolean,default:!1}},inheritAttrs:!1,data:function(){return{observer:null,intersected:!1,loaded:!1}},computed:{srcImage:function(){return this.intersected&&this.src?this.src:this.srcPlaceholder},srcsetImage:function(){return!(!this.intersected||!this.srcset)&&this.srcset}},methods:{load:function(){this.$el.getAttribute("src")!==this.srcPlaceholder&&(this.loaded=!0,this.$emit("load"))}},render:function(t){var e=t("img",{attrs:{src:this.srcImage,srcset:this.srcsetImage},domProps:this.$attrs,class:{"v-lazy-image":!0,"v-lazy-image-loaded":this.loaded},on:{load:this.load}});return this.usePicture?t("picture",{on:{load:this.load}},this.intersected?[this.$slots.default,e]:[e]):e},mounted:function(){var t=this;"IntersectionObserver"in window&&(this.observer=new IntersectionObserver((function(e){e[0].isIntersecting&&(t.intersected=!0,t.observer.disconnect(),t.$emit("intersect"))}),this.intersectionOptions),this.observer.observe(this.$el))},destroyed:function(){"IntersectionObserver"in window&&this.observer.disconnect()}},i={install:function(t,i){t.component("VLazyImage",e)}};t.default=e,t.VLazyImagePlugin=i,Object.defineProperty(t,"__esModule",{value:!0})}(e)},kMA9:function(t,e,i){"use strict";i.r(e);var s=i("jcJ4"),n=i.n(s),r=i("ntmO"),a=i("/X8E"),o=i("kdyA"),c=i("IGiv"),l=i("4Xl5"),d={components:{VLazyImage:n.a,Waveplayer:r.a,CloseIcon:a.a,ChevronLeftIcon:o.a,ChevronRightIcon:c.a,VolumeMidIcon:l.a},props:{conversation:{type:Object,required:!0},file:{type:Object}},data:function(){return{open:!1}},watch:{file:function(t){this.open=!!t}},computed:{media:function(){return this.conversation.files?this.conversation.files.data.filter((function(t){return["image","video","audio"].find((function(e){return e==t.type}))})):[]},hasPrev:function(){var t=this;return this.media.findIndex((function(e){return e.id==(t.file||{}).id}))>0},hasNext:function(){var t=this,e=this.media;return e.findIndex((function(e){return e.id==(t.file||{}).id}))+1<e.length}},mounted:function(){},methods:{imageLoaded:function(t){this.$set(t,"loaded",!0)},goToNext:function(){var t=this,e=this.media,i=e.findIndex((function(e){return e.id==(t.file||{}).id}));i+1<e.length&&(this.$parent.selectedFile=e[i+1])},goToPrev:function(){var t=this,e=this.media,i=e.findIndex((function(e){return e.id==(t.file||{}).id}));i>0&&(this.$parent.selectedFile=e[i-1])},close:function(){var t=this;this.open=!1,setTimeout((function(){t.$parent.selectedFile=null}),150)}}},u=(i("Tvms"),i("KHd+")),h=Object(u.a)(d,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"position-fixed d-flex flex-nowrap flex-column",class:{open:t.open},attrs:{id:"gallery"}},[i("button",{staticClass:"btn btn-transparent position-absolute p-0",staticStyle:{top:"0",right:"0","z-index":"10"},attrs:{type:"button"},on:{click:t.close}},[i("close-icon",{attrs:{width:"48",height:"48",fill:"white"}})],1),t._v(" "),t.file?i("div",{staticClass:"flex-grow-1 flex-1 d-flex text-center overflow-auto"},[i("div",{staticClass:"px-5 position-relative file-arrow cursor-pointer",class:{disabled:!t.hasPrev},on:{click:function(e){return t.goToPrev()}}},[i("chevron-left-icon",{staticClass:"position-absolute-center",attrs:{width:"48",height:"48",transform:"scale(1.2)",fill:"white"}})],1),t._v(" "),i("div",{staticClass:"flex-grow-1 position-relative"},["image"==t.file.type?[t.file.loaded?t._e():i("div",{staticClass:"position-absolute-center w-100 h-100 image-loader"},[t._m(0)]),t._v(" "),i("v-lazy-image",{staticClass:"position-absolute-center",class:{"opacity-0":!t.file.loaded},attrs:{src:t.file.source},on:{load:function(e){return t.imageLoaded(t.file)}}})]:"video"==t.file.type?i("video",{staticClass:"position-absolute-center outline-0 mw-100 mh-100",attrs:{controls:"",controlsList:"nodownload",disablePictureInPicture:"",poster:t.file.preview,src:t.file.source}}):"audio"==t.file.type?i("waveplayer",{staticClass:"position-absolute-center bg-white p-1 rounded",attrs:{source:t.file.source,duration:t.file.metadata.duration}}):t._e()],2),t._v(" "),i("div",{staticClass:"px-5 position-relative file-arrow cursor-pointer",class:{disabled:!t.hasNext},on:{click:function(e){return t.goToNext()}}},[i("chevron-right-icon",{staticClass:"position-absolute-center",attrs:{width:"48",height:"48",transform:"scale(1.2)",fill:"white"}})],1)]):t._e(),t._v(" "),i("div",{staticClass:"p-2 border-top overflow-hidden"},[i("div",{staticClass:"overflow-auto w-100 text-center"},[i("div",{staticClass:"d-inline-flex mw-100"},t._l(t.media,(function(e){return i("div",{staticClass:"preview mx-1 cursor-pointer bg-light position-relative",class:{active:(t.file||{}).id==e.id},style:{"background-image":"url("+e.preview+")"},on:{click:function(i){t.$parent.selectedFile=e}}},["audio"==e.type?i("volume-mid-icon",{staticClass:"position-absolute-center",attrs:{width:"32",height:"32"}}):t._e()],1)})),0)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"position-absolute-center"},[e("div",{staticClass:"spinner-border spinner-border-sm text-white"})])}],!1,null,"6edccb7a",null);e.default=h.exports},kdyA:function(t,e,i){"use strict";var s={name:"chevron-left"},n=i("KHd+"),r=Object(n.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M13.8796283,15.1746043 C14.0593394,15.3842672 14.0350586,15.6999172 13.8253957,15.8796283 C13.6157328,16.0593394 13.3000828,16.0350586 13.1203717,15.8253957 L10.1203717,12.3253957 C9.9598761,12.1381508 9.9598761,11.8618492 10.1203717,11.6746043 L13.1203717,8.17460431 C13.3000828,7.96494139 13.6157328,7.94066062 13.8253957,8.1203717 C14.0350586,8.30008277 14.0593394,8.61573277 13.8796283,8.82539569 L11.1585389,12 L13.8796283,15.1746043 Z"}})])}),[],!1,null,null,null);e.a=r.exports},oFXt:function(t,e,i){var s=i("HH3L");"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(s,n);s.locals&&(t.exports=s.locals)}}]);