(self["webpackChunk"] = self["webpackChunk"] || []).push([["modals-audiorecorder"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wavesurfer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wavesurfer.js */ "./node_modules/wavesurfer.js/dist/wavesurfer.js");
/* harmony import */ var wavesurfer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wavesurfer_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_plugins_wavesurfer_microphone_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/plugins/wavesurfer.microphone.min.js */ "./Resources/js/plugins/wavesurfer.microphone.min.js");
/* harmony import */ var _js_plugins_wavesurfer_microphone_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_plugins_wavesurfer_microphone_min_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons_close_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/close.vue */ "./Resources/icons/close.vue");
/* harmony import */ var _icons_microphone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/microphone */ "./Resources/icons/microphone.vue");
/* harmony import */ var _icons_play__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/play */ "./Resources/icons/play.vue");
/* harmony import */ var _icons_pause__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/pause */ "./Resources/icons/pause.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // import WaveSurferCursor from '../js/plugins/wavesurfer.cursor.min.js';
// import CameraIcon from '../icons/camera.vue';

 // import PauseAltIcon from '../icons/pause-alt';




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    CloseIcon: _icons_close_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    MicrophoneIcon: _icons_microphone__WEBPACK_IMPORTED_MODULE_4__.default,
    PlayIcon: _icons_play__WEBPACK_IMPORTED_MODULE_5__.default,
    PauseIcon: _icons_pause__WEBPACK_IMPORTED_MODULE_6__.default
  },
  data: function data() {
    return {
      audioRecorder: null,
      streams: null,
      blobs: [],
      recorderStatus: '',
      playerStatus: 'paused',
      micReady: false,
      duration: 0,
      wavesurfer: null,
      hasRecorded: false,
      timer: null
    };
  },
  created: function created() {},
  beforeDestroy: function beforeDestroy() {
    if (this.streams) {
      this.streams.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    $(this.$refs['audioRecorderModal']).modal('show');
    this.initMic();
    this.wavesurfer = wavesurfer_js__WEBPACK_IMPORTED_MODULE_1___default().create({
      container: document.querySelector('#wavesurfer'),
      //backend: 'MediaElement',
      height: 200,
      barWidth: 3,
      barHeight: 1,
      barRadius: 3,
      interact: true,
      cursorWidth: 1,
      cursorColor: 'transparent',
      hideScrollbar: true,
      plugins: [_js_plugins_wavesurfer_microphone_min_js__WEBPACK_IMPORTED_MODULE_2___default().create()]
    });
    this.wavesurfer.on('finish', function () {
      _this.playerStatus = 'paused';

      _this.wavesurfer.seekTo(0);
    });
    /*this.wavesurfer.on('ready', (progress) => {
    	if(this.recorderStatus == 'paused') {
    		this.wavesurfer.play();
    	}
    });
    this.wavesurfer.on('seek', (progress) => {
    	if(this.recorderStatus == 'paused') {
    		let audioDuration = this.wavesurfer.getDuration();
    		let playTo = audioDuration * progress;
    		this.wavesurfer.play(playTo);
    	}
    });*/
  },
  computed: {},
  methods: {
    close: function close() {
      var _this2 = this;

      setTimeout(function () {
        _this2.$emit('close');
      }, 150);
    },
    reset: function reset() {
      this.blobs = [];
      this.recorderStatus = '';
      this.playerStatus = 'paused';
      this.duration = 0;
      this.hasRecorded = false;
      this.timer = null;
      this.wavesurfer.setCursorColor('transparent');
      this.wavesurfer.empty();
      this.audioRecorder.stop();
    },
    submit: function submit() {
      var _this3 = this;

      if (this.blobs.length > 0) {
        $(this.$refs['audioRecorderModal']).modal('hide');
        setTimeout(function () {
          var timestamp = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().valueOf();
          var file = new File(_this3.blobs, timestamp, {
            type: _this3.blobs[0].type
          });
          var audio = {
            source: file,
            duration: _this3.secondsToDuration(_this3.wavesurfer.getDuration(), 14, 5)
          };

          _this3.$emit('submit', audio);

          _this3.reset();
        }, 150);
      }
    },
    togglePlayer: function togglePlayer() {
      switch (this.playerStatus) {
        case 'paused':
          this.playerStatus = 'playing';
          this.wavesurfer.play();
          break;

        case 'playing':
          this.playerStatus = 'paused';
          this.wavesurfer.pause();
          break;
      }
    },
    secondsToDuration: function secondsToDuration(seconds) {
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;
      var date = new Date(0);
      date.setSeconds(seconds);
      var timeString = date.toISOString().substr(limit, end);
      return timeString;
    },
    pauseRecord: function pauseRecord() {
      if (this.audioRecorder) {
        clearInterval(this.timer);
        this.recorderStatus = 'paused';
        this.audioRecorder.requestData();
        this.audioRecorder.pause();
        var blob = new Blob(this.blobs, {
          type: 'audio/mp3'
        });
        this.wavesurfer.microphone.stop();
        this.wavesurfer.setCursorColor('#aaa');
        this.wavesurfer.setProgressColor('#6e82ea');
        this.wavesurfer.setWaveColor('#b5bce5');
        this.wavesurfer.loadBlob(blob);
      }
    },
    startRecord: function startRecord() {
      var _this4 = this;

      if (this.audioRecorder) {
        this.timer = setInterval(function () {
          _this4.duration += 0.01;
        }, 10);

        if (this.hasRecorded) {
          this.audioRecorder.resume();
        } else {
          this.audioRecorder.start(30);
        }

        this.hasRecorded = true;
        this.recorderStatus = 'recording';
        this.wavesurfer.setCursorColor('transparent');
        this.wavesurfer.setProgressColor('#6e82ea');
        this.wavesurfer.setWaveColor('#6e82ea');
        this.wavesurfer.microphone.start(this.streams);
      }
    },
    initMic: function initMic() {
      var _this5 = this;

      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(function (streams) {
        _this5.streams = streams;
        _this5.audioRecorder = new MediaRecorder(streams);

        _this5.audioRecorder.ondataavailable = function (e) {
          return _this5.blobs.push(e.data);
        };

        _this5.micReady = true;
        /*this.$refs['audioFile'].muted = true;
        this.$refs['audioFile'].volume = 0;
        this.$refs['audioFile'].srcObject = new MediaStream(streams.getaudioTracks());
        this.$refs['audioFile'].play();
        this.$refs['audioFile'].onplaying = () => {
        	this.cameraReady = true;
        };*/
      })["catch"](function (error) {
        alert('Unable to detect your microphone.');
        console.error(error);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".wavesurfer-container .btn[data-v-3026d214] {\n  opacity: 0;\n}\n.wavesurfer-container:hover .btn[data-v-3026d214] {\n  opacity: 1;\n}\n.audio-recorder[data-v-3026d214] {\n  height: 500px;\n}\n.player-control[data-v-3026d214] {\n  z-index: 10;\n}\n.player-control button[data-v-3026d214] {\n  line-height: 1 !important;\n  padding: 15px !important;\n  position: relative;\n}\n.player-control button svg[data-v-3026d214] {\n  position: absolute;\n  line-height: 1 !important;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.audio-control[data-v-3026d214] {\n  border: 0 !important;\n  outline: 0 !important;\n  width: 50px;\n  height: 50px;\n  border-radius: 50% !important;\n  background-color: #4a4a4a;\n  position: relative;\n  vertical-align: top;\n}\n.audio-control.audio-pause[data-v-3026d214]:before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 19px;\n  transform: translateY(-50%);\n  width: 2px;\n  height: 35%;\n  background-color: #fff;\n  border-radius: 5px;\n}\n.audio-control.audio-pause[data-v-3026d214]:after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 27px;\n  transform: translateY(-50%);\n  width: 2px;\n  height: 35%;\n  background-color: #fff;\n  border-radius: 5px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_style_index_0_id_3026d214_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_style_index_0_id_3026d214_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_style_index_0_id_3026d214_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./Resources/modals/audio-recorder.vue":
/*!*********************************************!*\
  !*** ./Resources/modals/audio-recorder.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _audio_recorder_vue_vue_type_template_id_3026d214_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio-recorder.vue?vue&type=template&id=3026d214&scoped=true& */ "./Resources/modals/audio-recorder.vue?vue&type=template&id=3026d214&scoped=true&");
/* harmony import */ var _audio_recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio-recorder.vue?vue&type=script&lang=js& */ "./Resources/modals/audio-recorder.vue?vue&type=script&lang=js&");
/* harmony import */ var _audio_recorder_vue_vue_type_style_index_0_id_3026d214_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss& */ "./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _audio_recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _audio_recorder_vue_vue_type_template_id_3026d214_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _audio_recorder_vue_vue_type_template_id_3026d214_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3026d214",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/modals/audio-recorder.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/modals/audio-recorder.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./Resources/modals/audio-recorder.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./audio-recorder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss&":
/*!*******************************************************************************************************!*\
  !*** ./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_style_index_0_id_3026d214_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=style&index=0&id=3026d214&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/modals/audio-recorder.vue?vue&type=template&id=3026d214&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./Resources/modals/audio-recorder.vue?vue&type=template&id=3026d214&scoped=true& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_template_id_3026d214_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_template_id_3026d214_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_audio_recorder_vue_vue_type_template_id_3026d214_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./audio-recorder.vue?vue&type=template&id=3026d214&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=template&id=3026d214&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=template&id=3026d214&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/modals/audio-recorder.vue?vue&type=template&id=3026d214&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* binding */ render,
/* harmony export */   "staticRenderFns": () => /* binding */ staticRenderFns
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "audioRecorderModal",
      staticClass: "modal fade",
      attrs: { tabindex: "-1", role: "dialog" }
    },
    [
      _c(
        "div",
        {
          staticClass: "modal-dialog modal-dialog-centered",
          attrs: { role: "document" }
        },
        [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-body" }, [
              _c("div", { staticClass: "h-100" }, [
                _c("div", { staticClass: "audio-recorder overflow-hidden" }, [
                  _c("div", { staticClass: "d-flex flex-column h-100" }, [
                    _c("div", { staticClass: "d-flex w-100" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn ml-auto shadow-none",
                          attrs: { type: "button", "data-dismiss": "modal" },
                          on: { click: _vm.close }
                        },
                        [
                          _c("close-icon", {
                            attrs: { height: "36", width: "36" }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "flex-grow-1 h-100 d-flex flex-column position-relative text-center"
                      },
                      [
                        !_vm.hasRecorded
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "text-center position-absolute-center w-100"
                              },
                              [
                                _c("div", { staticClass: "h6 mb-0" }, [
                                  _vm._v("Click to start recording")
                                ])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.duration || _vm.recorderStatus
                          ? _c("div", [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "pt-4 d-inline-block text-center font-weight-light"
                                },
                                [
                                  _c("div", { staticClass: "h2 mb-0" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.secondsToDuration(_vm.duration)
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "d-flex align-items-center"
                                    },
                                    [
                                      _vm.recorderStatus == "recording"
                                        ? [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "chat-status bg-danger"
                                              },
                                              [_vm._v(" ")]
                                            ),
                                            _vm._v(
                                              " \n\t\t\t\t\t\t\t\t\t\t\t\t"
                                            ),
                                            _c(
                                              "small",
                                              { staticClass: "text-gray" },
                                              [_vm._v("Rec")]
                                            )
                                          ]
                                        : _vm.recorderStatus == "paused"
                                        ? [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "chat-status bg-gray"
                                              },
                                              [_vm._v(" ")]
                                            ),
                                            _vm._v(
                                              " \n\t\t\t\t\t\t\t\t\t\t\t\t"
                                            ),
                                            _c(
                                              "small",
                                              { staticClass: "text-gray" },
                                              [_vm._v("Paused")]
                                            )
                                          ]
                                        : _vm._e()
                                    ],
                                    2
                                  )
                                ]
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "position-absolute-center w-100 wavesurfer-container"
                          },
                          [
                            _c("div", { attrs: { id: "wavesurfer" } }),
                            _vm._v(" "),
                            _vm.hasRecorded && _vm.recorderStatus == "paused"
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "player-control position-absolute-center"
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-sm btn-white border-0 badge-pill py-2",
                                        on: { click: _vm.togglePlayer }
                                      },
                                      [
                                        _vm.playerStatus == "paused"
                                          ? _c("play-icon", {
                                              attrs: {
                                                width: "15",
                                                height: "15"
                                              }
                                            })
                                          : _vm.playerStatus == "playing"
                                          ? _c("pause-icon", {
                                              attrs: {
                                                width: "15",
                                                height: "15"
                                              }
                                            })
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  ]
                                )
                              : _vm._e()
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm.micReady
                      ? _c(
                          "div",
                          {
                            staticClass: "flex-fill w-100 text-center px-5 pb-5"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center text-center"
                              },
                              [
                                _c("div", { staticClass: "w-25" }, [
                                  _vm.hasRecorded
                                    ? _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn font-weight-bold mr-auto",
                                          attrs: { "data-dismiss": "modal" },
                                          on: { click: _vm.close }
                                        },
                                        [_vm._v("Cancel")]
                                      )
                                    : _vm._e()
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "flex-grow-1" }, [
                                  _vm.recorderStatus == "recording"
                                    ? _c("button", {
                                        staticClass:
                                          "audio-control audio-pause",
                                        on: { click: _vm.pauseRecord }
                                      })
                                    : _c(
                                        "button",
                                        {
                                          staticClass:
                                            "audio-control audio-record",
                                          on: { click: _vm.startRecord }
                                        },
                                        [
                                          _c("microphone-icon", {
                                            attrs: { fill: "white" }
                                          })
                                        ],
                                        1
                                      )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "w-25" }, [
                                  _vm.hasRecorded &&
                                  _vm.recorderStatus == "paused"
                                    ? _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn font-weight-bold ml-auto",
                                          on: { click: _vm.submit }
                                        },
                                        [_vm._v("Send")]
                                      )
                                    : _vm._e()
                                ])
                              ]
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ])
              ])
            ])
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);