(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{DlNB:function(e,t,r){"use strict";r.r(t);var i=r("Wgwc"),a=r.n(i),s=r("iJZH"),o=r.n(s),n=r("mtLC"),u=r.n(n),c=r("/X8E"),d=r("iOuV"),l=r("COnB"),h=r("Kbsz"),f={components:{CloseIcon:c.a,MicrophoneIcon:d.a,PlayIcon:l.a,PauseIcon:h.a},data:function(){return{audioRecorder:null,streams:null,blobs:[],recorderStatus:"",playerStatus:"paused",micReady:!1,duration:0,wavesurfer:null,hasRecorded:!1,timer:null}},created:function(){},beforeDestroy:function(){this.streams&&this.streams.getTracks().forEach((function(e){e.stop()}))},mounted:function(){var e=this;$(this.$refs.audioRecorderModal).modal("show"),this.initMic(),this.wavesurfer=o.a.create({container:document.querySelector("#wavesurfer"),height:200,barWidth:3,barHeight:1,barRadius:3,interact:!0,cursorWidth:1,cursorColor:"transparent",hideScrollbar:!0,plugins:[u.a.create()]}),this.wavesurfer.on("finish",(function(){e.playerStatus="paused",e.wavesurfer.seekTo(0)}))},computed:{},methods:{close:function(){var e=this;setTimeout((function(){e.$emit("close")}),150)},reset:function(){this.blobs=[],this.recorderStatus="",this.playerStatus="paused",this.duration=0,this.hasRecorded=!1,this.timer=null,this.wavesurfer.setCursorColor("transparent"),this.wavesurfer.empty(),this.audioRecorder.stop()},submit:function(){var e=this;this.blobs.length>0&&($(this.$refs.audioRecorderModal).modal("hide"),setTimeout((function(){var t=a()().valueOf(),r={source:new File(e.blobs,t,{type:e.blobs[0].type}),duration:e.secondsToDuration(e.wavesurfer.getDuration(),14,5)};e.$emit("submit",r),e.reset()}),150))},togglePlayer:function(){switch(this.playerStatus){case"paused":this.playerStatus="playing",this.wavesurfer.play();break;case"playing":this.playerStatus="paused",this.wavesurfer.pause()}},secondsToDuration:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:11,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8,i=new Date(0);i.setSeconds(e);var a=i.toISOString().substr(t,r);return a},pauseRecord:function(){if(this.audioRecorder){clearInterval(this.timer),this.recorderStatus="paused",this.audioRecorder.requestData(),this.audioRecorder.pause();var e=new Blob(this.blobs,{type:"audio/mp3"});this.wavesurfer.microphone.stop(),this.wavesurfer.setCursorColor("#aaa"),this.wavesurfer.setProgressColor("#6e82ea"),this.wavesurfer.setWaveColor("#b5bce5"),this.wavesurfer.loadBlob(e)}},startRecord:function(){var e=this;this.audioRecorder&&(this.timer=setInterval((function(){e.duration+=.01}),10),this.hasRecorded?this.audioRecorder.resume():this.audioRecorder.start(30),this.hasRecorded=!0,this.recorderStatus="recording",this.wavesurfer.setCursorColor("transparent"),this.wavesurfer.setProgressColor("#6e82ea"),this.wavesurfer.setWaveColor("#6e82ea"),this.wavesurfer.microphone.start())},initMic:function(){var e=this;navigator.mediaDevices.getUserMedia({audio:!0}).then((function(t){e.streams=t,e.audioRecorder=new MediaRecorder(t),e.audioRecorder.ondataavailable=function(t){return e.blobs.push(t.data)},e.micReady=!0})).catch((function(e){alert("Unable to detect your microphone."),console.error(e)}))}}},v=(r("KiJr"),r("KHd+")),p=Object(v.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"audioRecorderModal",staticClass:"modal fade",attrs:{tabindex:"-1",role:"dialog"}},[r("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[r("div",{staticClass:"modal-content"},[r("div",{staticClass:"modal-body"},[r("div",{staticClass:"h-100"},[r("div",{staticClass:"audio-recorder overflow-hidden"},[r("div",{staticClass:"d-flex flex-column h-100"},[r("div",{staticClass:"d-flex w-100"},[r("button",{staticClass:"btn ml-auto shadow-none",attrs:{type:"button","data-dismiss":"modal"},on:{click:e.close}},[r("close-icon",{attrs:{height:"36",width:"36"}})],1)]),e._v(" "),r("div",{staticClass:"flex-grow-1 h-100 d-flex flex-column position-relative text-center"},[e.hasRecorded?e._e():r("div",{staticClass:"text-center position-absolute-center w-100"},[r("div",{staticClass:"h6 mb-0"},[e._v("Click to start recording")])]),e._v(" "),e.duration||e.recorderStatus?r("div",[r("div",{staticClass:"pt-4 d-inline-block text-center font-weight-light"},[r("div",{staticClass:"h2 mb-0"},[e._v(e._s(e.secondsToDuration(e.duration)))]),e._v(" "),r("div",{staticClass:"d-flex align-items-center"},["recording"==e.recorderStatus?[r("span",{staticClass:"chat-status bg-danger"},[e._v(" ")]),e._v(" \n\t\t\t\t\t\t\t\t\t\t\t\t"),r("small",{staticClass:"text-gray"},[e._v("Rec")])]:"paused"==e.recorderStatus?[r("span",{staticClass:"chat-status bg-gray"},[e._v(" ")]),e._v(" \n\t\t\t\t\t\t\t\t\t\t\t\t"),r("small",{staticClass:"text-gray"},[e._v("Paused")])]:e._e()],2)])]):e._e(),e._v(" "),r("div",{staticClass:"position-absolute-center w-100 wavesurfer-container"},[r("div",{attrs:{id:"wavesurfer"}}),e._v(" "),e.hasRecorded&&"paused"==e.recorderStatus?r("div",{staticClass:"player-control position-absolute-center"},[r("button",{staticClass:"btn btn-sm btn-white border-0 badge-pill py-2",on:{click:e.togglePlayer}},["paused"==e.playerStatus?r("play-icon",{attrs:{width:"15",height:"15"}}):"playing"==e.playerStatus?r("pause-icon",{attrs:{width:"15",height:"15"}}):e._e()],1)]):e._e()])]),e._v(" "),e.micReady?r("div",{staticClass:"flex-fill w-100 text-center px-5 pb-5"},[r("div",{staticClass:"d-flex align-items-center text-center"},[r("div",{staticClass:"w-25"},[e.hasRecorded?r("button",{staticClass:"btn font-weight-bold mr-auto",attrs:{"data-dismiss":"modal"},on:{click:e.close}},[e._v("Cancel")]):e._e()]),e._v(" "),r("div",{staticClass:"flex-grow-1"},["recording"==e.recorderStatus?r("button",{staticClass:"audio-control audio-pause",on:{click:e.pauseRecord}}):r("button",{staticClass:"audio-control audio-record",on:{click:e.startRecord}},[r("microphone-icon",{attrs:{fill:"white"}})],1)]),e._v(" "),r("div",{staticClass:"w-25"},[e.hasRecorded&&"paused"==e.recorderStatus?r("button",{staticClass:"btn font-weight-bold ml-auto",on:{click:e.submit}},[e._v("Send")]):e._e()])])]):e._e()])])])])])])])}),[],!1,null,"7afd16d8",null);t.default=p.exports},KiJr:function(e,t,r){"use strict";r("b6HS")},b6HS:function(e,t,r){var i=r("dNoQ");"string"==typeof i&&(i=[[e.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,a);i.locals&&(e.exports=i.locals)},dNoQ:function(e,t,r){(t=r("JPst")(!1)).push([e.i,'.wavesurfer-container .btn[data-v-7afd16d8]{opacity:0}.wavesurfer-container:hover .btn[data-v-7afd16d8]{opacity:1}.audio-recorder[data-v-7afd16d8]{height:500px}.player-control[data-v-7afd16d8]{z-index:10}.player-control button[data-v-7afd16d8]{line-height:1 !important;padding:15px !important;position:relative}.player-control button svg[data-v-7afd16d8]{position:absolute;line-height:1 !important;top:50%;left:50%;transform:translate(-50%, -50%)}.audio-control[data-v-7afd16d8]{border:0 !important;outline:0 !important;width:50px;height:50px;border-radius:50% !important;background-color:#4a4a4a;position:relative;vertical-align:top}.audio-control.audio-pause[data-v-7afd16d8]:before{content:"";position:absolute;top:50%;left:19px;transform:translateY(-50%);width:2px;height:35%;background-color:#fff;border-radius:5px}.audio-control.audio-pause[data-v-7afd16d8]:after{content:"";position:absolute;top:50%;left:27px;transform:translateY(-50%);width:2px;height:35%;background-color:#fff;border-radius:5px}',""]),e.exports=t},mtLC:function(e,t,r){(function(e){var r,i,a,s;function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}window,s=function(){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==o(e)&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(i,a,function(t){return e[t]}.bind(null,a));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="localhost:8080/dist/plugin/",r(r.s=3)}({3:function(e,t,r){"use strict";function i(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){function e(t,r){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.params=t,this.wavesurfer=r,this.active=!1,this.paused=!1,this.browser=this.detectBrowser(),this.reloadBufferFunction=function(e){return i.reloadBuffer(e)},void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e,t,r){var i=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return i?new Promise((function(t,r){i.call(navigator,e,t,r)})):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}),this.constraints=this.params.constraints||{video:!1,audio:!0},this.bufferSize=this.params.bufferSize||4096,this.numberOfInputChannels=this.params.numberOfInputChannels||1,this.numberOfOutputChannels=this.params.numberOfOutputChannels||1,this._onBackendCreated=function(){i.micContext=i.wavesurfer.backend.getAudioContext()}}return a(e,null,[{key:"create",value:function(t){return{name:"microphone",deferInit:!(!t||!t.deferInit)&&t.deferInit,params:t,instance:e}}}]),a(e,[{key:"init",value:function(){this.wavesurfer.on("backend-created",this._onBackendCreated),this.wavesurfer.backend&&this._onBackendCreated()}},{key:"destroy",value:function(){this.paused=!0,this.wavesurfer.un("backend-created",this._onBackendCreated),this.stop()}},{key:"start",value:function(){var e=this;navigator.mediaDevices.getUserMedia(this.constraints).then((function(t){return e.gotStream(t)})).catch((function(t){return e.deviceError(t)}))}},{key:"togglePlay",value:function(){this.active?(this.paused=!this.paused,this.paused?this.pause():this.play()):this.start()}},{key:"play",value:function(){this.paused=!1,this.connect()}},{key:"pause",value:function(){this.paused=!0,this.disconnect()}},{key:"stop",value:function(){this.active&&(this.stopDevice(),this.wavesurfer.empty())}},{key:"stopDevice",value:function(){if(this.active=!1,this.disconnect(),this.stream){if(("chrome"===this.browser.browser&&this.browser.version>=45||"firefox"===this.browser.browser&&this.browser.version>=44||"edge"===this.browser.browser||"safari"===this.browser.browser)&&this.stream.getTracks)return void this.stream.getTracks().forEach((function(e){return e.stop()}));this.stream.stop()}}},{key:"connect",value:function(){void 0!==this.stream&&("edge"===this.browser.browser&&(this.localAudioBuffer=this.micContext.createBuffer(this.numberOfInputChannels,this.bufferSize,this.micContext.sampleRate)),this.mediaStreamSource=this.micContext.createMediaStreamSource(this.stream),this.levelChecker=this.micContext.createScriptProcessor(this.bufferSize,this.numberOfInputChannels,this.numberOfOutputChannels),this.mediaStreamSource.connect(this.levelChecker),this.levelChecker.connect(this.micContext.destination),this.levelChecker.onaudioprocess=this.reloadBufferFunction)}},{key:"disconnect",value:function(){void 0!==this.mediaStreamSource&&this.mediaStreamSource.disconnect(),void 0!==this.levelChecker&&(this.levelChecker.disconnect(),this.levelChecker.onaudioprocess=void 0),void 0!==this.localAudioBuffer&&(this.localAudioBuffer=void 0)}},{key:"reloadBuffer",value:function(e){if(!this.paused)if(this.wavesurfer.empty(),"edge"===this.browser.browser){var t,r;for(t=0,r=Math.min(this.localAudioBuffer.numberOfChannels,e.inputBuffer.numberOfChannels);t<r;t++)this.localAudioBuffer.getChannelData(t).set(e.inputBuffer.getChannelData(t));this.wavesurfer.loadDecodedBuffer(this.localAudioBuffer)}else this.wavesurfer.loadDecodedBuffer(e.inputBuffer)}},{key:"gotStream",value:function(e){this.stream=e,this.active=!0,this.play(),this.fireEvent("deviceReady",e)}},{key:"deviceError",value:function(e){this.fireEvent("deviceError",e)}},{key:"extractVersion",value:function(e,t,r){var i=e.match(t);return i&&i.length>=r&&parseInt(i[r],10)}},{key:"detectBrowser",value:function(){var e={browser:null,version:null,minVersion:null};return"undefined"!=typeof window&&window.navigator?navigator.mozGetUserMedia?(e.browser="firefox",e.version=this.extractVersion(navigator.userAgent,/Firefox\/(\d+)\./,1),e.minVersion=31,e):navigator.webkitGetUserMedia?(e.browser="chrome",e.version=this.extractVersion(navigator.userAgent,/Chrom(e|ium)\/(\d+)\./,2),e.minVersion=38,e):navigator.mediaDevices&&navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)?(e.browser="edge",e.version=this.extractVersion(navigator.userAgent,/Edge\/(\d+).(\d+)$/,2),e.minVersion=10547,e):window.RTCPeerConnection&&navigator.userAgent.match(/AppleWebKit\/(\d+)\./)?(e.browser="safari",e.minVersion=11,e.version=this.extractVersion(navigator.userAgent,/AppleWebKit\/(\d+)\./,1),e):(e.browser="Not a supported browser.",e):(e.browser="Not a supported browser.",e)}}]),e}();t.default=s,e.exports=t.default}})},"object"==o(t)&&"object"==o(e)?e.exports=s():(i=[],void 0===(a="function"==typeof(r=s)?r.apply(t,i):r)||(e.exports=a))}).call(this,r("YuTi")(e))}}]);