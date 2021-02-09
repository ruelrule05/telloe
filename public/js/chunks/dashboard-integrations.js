(self["webpackChunk"] = self["webpackChunk"] || []).push([["dashboard-integrations"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/integrations/integrations.js?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/integrations/integrations.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_vue_button_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/vue-button.vue */ "./Resources/components/vue-button.vue");
/* harmony import */ var _icons_checkmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../icons/checkmark */ "./Resources/icons/checkmark.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    VueButton: _components_vue_button_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    CheckmarkIcon: _icons_checkmark__WEBPACK_IMPORTED_MODULE_2__.default
  },
  data: function data() {
    return {
      zoomLoading: false,
      googleCalendarLoading: false,
      outlookLoading: false,
      xeroLoading: false
    };
  },
  created: function created() {
    this.$root.contentloading = false;
  },
  methods: {
    integrateXero: function integrateXero() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.xeroLoading = true;
                _context2.next = 3;
                return window.axios.get('/xero/authenticate');

              case 3:
                response = _context2.sent;

                _this.openAuthWindow(response.data.authUrl, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this.getXeroToken();

                        case 2:
                          _this.xeroLoading = false;

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getXeroToken: function getXeroToken() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return window.axios.get('/xero/token');

              case 2:
                _this2.$root.auth.xero_token = 1;

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    removeXero: function removeXero() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this3.xeroLoading = true;
                _context4.next = 3;
                return window.axios.get('/xero/remove');

              case 3:
                _this3.$root.auth.xero_token = null;
                _this3.xeroLoading = false;

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    integrateOutlook: function integrateOutlook() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this4.outlookLoading = true;
                _context6.next = 3;
                return window.axios.get('/outlook/client');

              case 3:
                response = _context6.sent;

                _this4.openAuthWindow(response.data.authUrl, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _this4.getOutlookToken();

                        case 2:
                          _this4.outlookLoading = false;

                        case 3:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                })));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getOutlookToken: function getOutlookToken() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return window.axios.get('/outlook/token');

              case 2:
                response = _context7.sent;
                _this5.$root.auth.outlook_token = response.data;

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    removeOutlook: function removeOutlook() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this6.outlookLoading = true;
                _context8.next = 3;
                return window.axios.get('/outlook/remove');

              case 3:
                _this6.$root.auth.outlook_token = null;
                _this6.outlookLoading = false;

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    integrateGoogleCalendar: function integrateGoogleCalendar() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee10() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this7.googleCalendarLoading = true;
                _context10.next = 3;
                return window.axios.get('/google_calendar/client');

              case 3:
                response = _context10.sent;

                _this7.openAuthWindow(response.data.authUrl, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return _this7.getGoogleCalendarToken();

                        case 2:
                          _this7.googleCalendarLoading = false;

                        case 3:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                })));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    getGoogleCalendarToken: function getGoogleCalendarToken() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee11() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return window.axios.get('/google_calendar/token');

              case 2:
                response = _context11.sent;
                _this8.$root.auth.google_calendar_token = response.data;

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    removeGoogleCalendar: function removeGoogleCalendar() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee12() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _this9.googleCalendarLoading = true;
                _context12.next = 3;
                return window.axios.get('/google_calendar/remove');

              case 3:
                _this9.$root.auth.google_calendar_token = null;
                _this9.googleCalendarLoading = false;

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    removeZoom: function removeZoom() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee13() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _this10.zoomLoading = true;
                _context13.next = 3;
                return window.axios.get('/zoom/remove');

              case 3:
                _this10.$root.auth.zoom_token = null;
                _this10.zoomLoading = false;

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    getZoomToken: function getZoomToken() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee14() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return window.axios.get('/zoom/token');

              case 2:
                response = _context14.sent;
                _this11.$root.auth.zoom_token = response.data;

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    integrateZoom: function integrateZoom() {
      var _this12 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee16() {
        var response, zoomInstallLink;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _this12.zoomLoading = true;
                _context16.next = 3;
                return window.axios.get('/zoom/install');

              case 3:
                response = _context16.sent;
                zoomInstallLink = response.data;

                _this12.openAuthWindow(zoomInstallLink, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee15() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          _this12.zoomLoading = false;

                          _this12.getZoomToken();

                        case 2:
                        case "end":
                          return _context15.stop();
                      }
                    }
                  }, _callee15);
                })));

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }))();
    },
    openAuthWindow: function openAuthWindow(url, callback) {
      var w = 450;
      var h = 650;
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var systemZoom = width / window.screen.availWidth;
      var left = (width - w) / 2 / systemZoom + dualScreenLeft;
      var top = (height - h) / 2 / systemZoom + dualScreenTop;
      var authWindow = window.open(url, 'telloe_auth_window', "width=".concat(w, ", height=").concat(h, ", top=").concat(top, ", left=").concat(left));
      var callbackInterval = setInterval(function () {
        if (authWindow.closed) {
          clearInterval(callbackInterval);
          callback();
        }
      }, 500);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-button.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-button.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    label: {
      type: String,
      "default": ''
    },
    type: {
      type: String,
      "default": 'button'
    },
    icon: {
      type: String,
      "default": ''
    },
    button_class: {
      type: String,
      "default": 'btn-block btn-primary'
    },
    loading: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {},
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'checkmark'
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".integrated-icon[data-v-7258de49] {\n  top: 5px;\n  right: 5px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_integrations_scss_vue_type_style_index_0_id_7258de49_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_integrations_scss_vue_type_style_index_0_id_7258de49_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_integrations_scss_vue_type_style_index_0_id_7258de49_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./Resources/components/vue-button.vue":
/*!*********************************************!*\
  !*** ./Resources/components/vue-button.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _vue_button_vue_vue_type_template_id_781c2f6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue-button.vue?vue&type=template&id=781c2f6c& */ "./Resources/components/vue-button.vue?vue&type=template&id=781c2f6c&");
/* harmony import */ var _vue_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vue-button.vue?vue&type=script&lang=js& */ "./Resources/components/vue-button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _vue_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _vue_button_vue_vue_type_template_id_781c2f6c___WEBPACK_IMPORTED_MODULE_0__.render,
  _vue_button_vue_vue_type_template_id_781c2f6c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/vue-button.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/integrations/integrations.vue":
/*!**********************************************************************!*\
  !*** ./Resources/dashboard/components/integrations/integrations.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _integrations_vue_vue_type_template_id_7258de49_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integrations.vue?vue&type=template&id=7258de49&scoped=true& */ "./Resources/dashboard/components/integrations/integrations.vue?vue&type=template&id=7258de49&scoped=true&");
/* harmony import */ var _integrations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./integrations.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/integrations/integrations.js?vue&type=script&lang=js&");
/* harmony import */ var _integrations_scss_vue_type_style_index_0_id_7258de49_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true& */ "./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _integrations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _integrations_vue_vue_type_template_id_7258de49_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _integrations_vue_vue_type_template_id_7258de49_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7258de49",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/integrations/integrations.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/checkmark.vue":
/*!***************************************!*\
  !*** ./Resources/icons/checkmark.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _checkmark_vue_vue_type_template_id_28ade310___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkmark.vue?vue&type=template&id=28ade310& */ "./Resources/icons/checkmark.vue?vue&type=template&id=28ade310&");
/* harmony import */ var _checkmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkmark.vue?vue&type=script&lang=js& */ "./Resources/icons/checkmark.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _checkmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _checkmark_vue_vue_type_template_id_28ade310___WEBPACK_IMPORTED_MODULE_0__.render,
  _checkmark_vue_vue_type_template_id_28ade310___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/checkmark.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/integrations/integrations.js?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./Resources/dashboard/components/integrations/integrations.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_integrations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/eslint-loader/dist/cjs.js!./integrations.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/integrations/integrations.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_integrations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/components/vue-button.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./Resources/components/vue-button.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vue-button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-button.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/checkmark.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./Resources/icons/checkmark.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./checkmark.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_integrations_scss_vue_type_style_index_0_id_7258de49_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/integrations/integrations.scss?vue&type=style&index=0&id=7258de49&lang=scss&scoped=true&");


/***/ }),

/***/ "./Resources/components/vue-button.vue?vue&type=template&id=781c2f6c&":
/*!****************************************************************************!*\
  !*** ./Resources/components/vue-button.vue?vue&type=template&id=781c2f6c& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_button_vue_vue_type_template_id_781c2f6c___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_button_vue_vue_type_template_id_781c2f6c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_button_vue_vue_type_template_id_781c2f6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vue-button.vue?vue&type=template&id=781c2f6c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-button.vue?vue&type=template&id=781c2f6c&");


/***/ }),

/***/ "./Resources/dashboard/components/integrations/integrations.vue?vue&type=template&id=7258de49&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/integrations/integrations.vue?vue&type=template&id=7258de49&scoped=true& ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_integrations_vue_vue_type_template_id_7258de49_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_integrations_vue_vue_type_template_id_7258de49_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_integrations_vue_vue_type_template_id_7258de49_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./integrations.vue?vue&type=template&id=7258de49&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/integrations/integrations.vue?vue&type=template&id=7258de49&scoped=true&");


/***/ }),

/***/ "./Resources/icons/checkmark.vue?vue&type=template&id=28ade310&":
/*!**********************************************************************!*\
  !*** ./Resources/icons/checkmark.vue?vue&type=template&id=28ade310& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_vue_vue_type_template_id_28ade310___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_vue_vue_type_template_id_28ade310___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_vue_vue_type_template_id_28ade310___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./checkmark.vue?vue&type=template&id=28ade310& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark.vue?vue&type=template&id=28ade310&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-button.vue?vue&type=template&id=781c2f6c&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-button.vue?vue&type=template&id=781c2f6c& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
    "button",
    {
      staticClass: "btn position-relative",
      class: _vm.button_class,
      attrs: { type: _vm.type, disabled: _vm.loading || _vm.disabled },
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [
      _vm.loading
        ? _c("span", { staticClass: "spinner position-absolute-center" }, [
            _c("span", {
              staticClass: "spinner-border spinner-border-sm align-middle",
              attrs: { role: "status", "aria-hidden": "true" }
            })
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { class: { "opacity-0": _vm.loading } },
        [
          _vm.icon ? [_c("i", { class: _vm.icon }), _vm._v("  ")] : _vm._e(),
          _vm._t("default")
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/integrations/integrations.vue?vue&type=template&id=7258de49&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/integrations/integrations.vue?vue&type=template&id=7258de49&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "text-center py-5 h-100" }, [
    _c("h1", { staticClass: "font-heading h2" }, [_vm._v("Integrations")]),
    _vm._v(" "),
    _c("div", { staticClass: "overflow-auto container mt-5 h-100" }, [
      _c("div", { staticClass: "row px-2" }, [
        _c("div", { staticClass: "col-md-6 col-lg-4 px-2 mb-3 pb-1" }, [
          _c("div", { staticClass: "px-1" }, [
            _c(
              "div",
              { staticClass: "card shadow-sm rounded position-relative" },
              [
                _vm.$root.auth.zoom_token
                  ? _c("checkmark-icon", {
                      staticClass:
                        "integrated-icon fill-green position-absolute",
                      attrs: { width: "36", height: "36" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "card-body" },
                  [
                    _c("img", {
                      attrs: {
                        src: "/logos/zoom.png",
                        alt: "Zoom",
                        height: "80"
                      }
                    }),
                    _vm._v(" "),
                    _c("p", { staticClass: "my-3 text-ellipsis" }, [
                      _vm._v("Create scheduled meeting for your bookings")
                    ]),
                    _vm._v(" "),
                    _vm.$root.auth.zoom_token
                      ? _c(
                          "vue-button",
                          {
                            attrs: {
                              loading: _vm.zoomLoading,
                              button_class: "btn btn-light shadow-none",
                              type: "button"
                            },
                            on: { click: _vm.removeZoom }
                          },
                          [_vm._v("Remove")]
                        )
                      : _c(
                          "vue-button",
                          {
                            attrs: {
                              button_class: "btn btn-primary",
                              loading: _vm.zoomLoading,
                              type: "button"
                            },
                            on: { click: _vm.integrateZoom }
                          },
                          [_vm._v("Integrate")]
                        )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-lg-4 px-2 mb-3 pb-1" }, [
          _c("div", { staticClass: "px-1" }, [
            _c(
              "div",
              { staticClass: "card shadow-sm rounded" },
              [
                _vm.$root.auth.google_calendar_token
                  ? _c("checkmark-icon", {
                      staticClass:
                        "integrated-icon fill-green position-absolute",
                      attrs: { width: "36", height: "36" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "card-body" },
                  [
                    _c("img", {
                      attrs: {
                        src: "/logos/google-calendar.png",
                        alt: "Google Calendar",
                        height: "80"
                      }
                    }),
                    _vm._v(" "),
                    _c("p", { staticClass: "my-3 text-ellipsis" }, [
                      _vm._v("Sync bookings with your Google Calendar")
                    ]),
                    _vm._v(" "),
                    _vm.$root.auth.google_calendar_token
                      ? _c(
                          "vue-button",
                          {
                            attrs: {
                              loading: _vm.googleCalendarLoading,
                              button_class: "btn btn-light shadow-none",
                              type: "button"
                            },
                            on: { click: _vm.removeGoogleCalendar }
                          },
                          [_vm._v("Remove")]
                        )
                      : _c(
                          "vue-button",
                          {
                            attrs: {
                              button_class: "btn btn-primary",
                              loading: _vm.googleCalendarLoading,
                              type: "button"
                            },
                            on: { click: _vm.integrateGoogleCalendar }
                          },
                          [_vm._v("Integrate")]
                        )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-lg-4 px-2 mb-3 pb-1" }, [
          _c("div", { staticClass: "px-1" }, [
            _c(
              "div",
              { staticClass: "card shadow-sm rounded" },
              [
                _vm.$root.auth.outlook_token
                  ? _c("checkmark-icon", {
                      staticClass:
                        "integrated-icon fill-green position-absolute",
                      attrs: { width: "36", height: "36" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "card-body" },
                  [
                    _c("img", {
                      attrs: {
                        src: "/logos/outlook.png",
                        alt: "Outlook Calendar",
                        height: "80"
                      }
                    }),
                    _vm._v(" "),
                    _c("p", { staticClass: "my-3 text-ellipsis" }, [
                      _vm._v("Sync bookings with your Outlook Calendar")
                    ]),
                    _vm._v(" "),
                    _vm.$root.auth.outlook_token
                      ? _c(
                          "vue-button",
                          {
                            attrs: {
                              loading: _vm.outlookLoading,
                              button_class: "btn btn-light shadow-none",
                              type: "button"
                            },
                            on: { click: _vm.removeOutlook }
                          },
                          [_vm._v("Remove")]
                        )
                      : _c(
                          "vue-button",
                          {
                            attrs: {
                              button_class: "btn btn-primary",
                              loading: _vm.outlookLoading,
                              type: "button"
                            },
                            on: { click: _vm.integrateOutlook }
                          },
                          [_vm._v("Integrate")]
                        )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-lg-4 px-2" }, [
          _c("div", { staticClass: "px-1" }, [
            _c(
              "div",
              { staticClass: "card shadow-sm rounded" },
              [
                _vm.$root.auth.xero_token
                  ? _c("checkmark-icon", {
                      staticClass:
                        "integrated-icon fill-green position-absolute",
                      attrs: { width: "36", height: "36" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "card-body" },
                  [
                    _c("img", {
                      attrs: {
                        src: "/logos/xero.png",
                        alt: "Outlook Calendar",
                        height: "80"
                      }
                    }),
                    _vm._v(" "),
                    _c("p", { staticClass: "my-3 text-ellipsis" }, [
                      _vm._v("Manage your Xero invoices")
                    ]),
                    _vm._v(" "),
                    _vm.$root.auth.xero_token
                      ? _c(
                          "vue-button",
                          {
                            attrs: {
                              loading: _vm.xeroLoading,
                              button_class: "btn btn-light shadow-none",
                              type: "button"
                            },
                            on: { click: _vm.removeXero }
                          },
                          [_vm._v("Remove")]
                        )
                      : _c(
                          "vue-button",
                          {
                            attrs: {
                              button_class: "btn btn-primary",
                              loading: _vm.xeroLoading,
                              type: "button"
                            },
                            on: { click: _vm.integrateXero }
                          },
                          [_vm._v("Integrate")]
                        )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark.vue?vue&type=template&id=28ade310&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark.vue?vue&type=template&id=28ade310& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    "svg",
    {
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }
    },
    [
      _c("path", {
        attrs: {
          d:
            "M10.5,14.7928932 L17.1464466,8.14644661 C17.3417088,7.95118446 17.6582912,7.95118446 17.8535534,8.14644661 C18.0488155,8.34170876 18.0488155,8.65829124 17.8535534,8.85355339 L10.8535534,15.8535534 C10.6582912,16.0488155 10.3417088,16.0488155 10.1464466,15.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 C7.34170876,11.9511845 7.65829124,11.9511845 7.85355339,12.1464466 L10.5,14.7928932 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);