(self["webpackChunk"] = self["webpackChunk"] || []).push([["knowledge-base"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/knowledge-base/knowledge-base.js?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/knowledge-base/knowledge-base.js?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../icons/book */ "./Resources/icons/book.vue");
/* harmony import */ var _icons_close__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../icons/close */ "./Resources/icons/close.vue");
/* harmony import */ var _icons_shortcut__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../icons/shortcut */ "./Resources/icons/shortcut.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-debounce */ "./node_modules/vue-debounce/dist/vue-debounce.min.js");
/* harmony import */ var vue_debounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_debounce__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






vue__WEBPACK_IMPORTED_MODULE_5__.default.use((vue_debounce__WEBPACK_IMPORTED_MODULE_4___default()), {
  listenTo: 'input'
});

var striptags = __webpack_require__(/*! striptags */ "./node_modules/striptags/src/striptags.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    BookIcon: _icons_book__WEBPACK_IMPORTED_MODULE_1__.default,
    CloseIcon: _icons_close__WEBPACK_IMPORTED_MODULE_2__.default,
    ShortcutIcon: _icons_shortcut__WEBPACK_IMPORTED_MODULE_3__.default
  },
  data: function data() {
    return {
      open: false,
      loading: true,
      topics: [],
      search: ''
    };
  },
  watch: {
    open: function open(value) {
      if (!value) {
        this.search = '';
        this.getTopics();
      }
    }
  },
  created: function created() {
    this.getTopics();
  },
  methods: {
    stripTags: function stripTags(string) {
      return striptags(string);
    },
    getTopics: function getTopics() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var response, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.loading = true;
                _context.next = 3;
                return fetch("https://docs.telloe.com/wp-json/wp/v2/docs?search=".concat(_this.search));

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                data = _context.sent;
                _this.topics = data;
                _this.loading = false;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/book.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/book.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
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
  name: 'book'
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "#knowledgebase {\n  position: absolute;\n  bottom: 20px;\n  right: 20px;\n  z-index: 10;\n}\n#knowledgebase > div {\n  box-shadow: 0 0 0.5rem rgba(92, 101, 112, 0.35) !important;\n}\n.knowledgebase-body {\n  width: 350px;\n  height: 360px;\n}\n.btn-close {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n}\n.topic {\n  text-decoration: none !important;\n}\n.topic h6 {\n  color: #000;\n}\n.topic svg {\n  opacity: 0;\n}\n.topic:hover h6 {\n  text-decoration: underline;\n  color: #5a5adf;\n}\n.topic:hover svg {\n  opacity: 1;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/striptags/src/striptags.js":
/*!*************************************************!*\
  !*** ./node_modules/striptags/src/striptags.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function (global) {

    // minimal symbol polyfill for IE11 and others
    if (typeof Symbol !== 'function') {
        var Symbol = function(name) {
            return name;
        }

        Symbol.nonNative = true;
    }

    const STATE_PLAINTEXT = Symbol('plaintext');
    const STATE_HTML      = Symbol('html');
    const STATE_COMMENT   = Symbol('comment');

    const ALLOWED_TAGS_REGEX  = /<(\w*)>/g;
    const NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;

    function striptags(html, allowable_tags, tag_replacement) {
        html            = html || '';
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return striptags_internal(html, context);
    }

    function init_striptags_stream(allowable_tags, tag_replacement) {
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return function striptags_stream(html) {
            return striptags_internal(html || '', context);
        };
    }

    striptags.init_streaming_mode = init_striptags_stream;

    function init_context(allowable_tags, tag_replacement) {
        allowable_tags = parse_allowable_tags(allowable_tags);

        return {
            allowable_tags : allowable_tags,
            tag_replacement: tag_replacement,

            state         : STATE_PLAINTEXT,
            tag_buffer    : '',
            depth         : 0,
            in_quote_char : ''
        };
    }

    function striptags_internal(html, context) {
        let allowable_tags  = context.allowable_tags;
        let tag_replacement = context.tag_replacement;

        let state         = context.state;
        let tag_buffer    = context.tag_buffer;
        let depth         = context.depth;
        let in_quote_char = context.in_quote_char;
        let output        = '';

        for (let idx = 0, length = html.length; idx < length; idx++) {
            let char = html[idx];

            if (state === STATE_PLAINTEXT) {
                switch (char) {
                    case '<':
                        state       = STATE_HTML;
                        tag_buffer += char;
                        break;

                    default:
                        output += char;
                        break;
                }
            }

            else if (state === STATE_HTML) {
                switch (char) {
                    case '<':
                        // ignore '<' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // we're seeing a nested '<'
                        depth++;
                        break;

                    case '>':
                        // ignore '>' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // something like this is happening: '<<>>'
                        if (depth) {
                            depth--;

                            break;
                        }

                        // this is closing the tag in tag_buffer
                        in_quote_char = '';
                        state         = STATE_PLAINTEXT;
                        tag_buffer   += '>';

                        if (allowable_tags.has(normalize_tag(tag_buffer))) {
                            output += tag_buffer;
                        } else {
                            output += tag_replacement;
                        }

                        tag_buffer = '';
                        break;

                    case '"':
                    case '\'':
                        // catch both single and double quotes

                        if (char === in_quote_char) {
                            in_quote_char = '';
                        } else {
                            in_quote_char = in_quote_char || char;
                        }

                        tag_buffer += char;
                        break;

                    case '-':
                        if (tag_buffer === '<!-') {
                            state = STATE_COMMENT;
                        }

                        tag_buffer += char;
                        break;

                    case ' ':
                    case '\n':
                        if (tag_buffer === '<') {
                            state      = STATE_PLAINTEXT;
                            output    += '< ';
                            tag_buffer = '';

                            break;
                        }

                        tag_buffer += char;
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }

            else if (state === STATE_COMMENT) {
                switch (char) {
                    case '>':
                        if (tag_buffer.slice(-2) == '--') {
                            // close the comment
                            state = STATE_PLAINTEXT;
                        }

                        tag_buffer = '';
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }
        }

        // save the context for future iterations
        context.state         = state;
        context.tag_buffer    = tag_buffer;
        context.depth         = depth;
        context.in_quote_char = in_quote_char;

        return output;
    }

    function parse_allowable_tags(allowable_tags) {
        let tag_set = new Set();

        if (typeof allowable_tags === 'string') {
            let match;

            while ((match = ALLOWED_TAGS_REGEX.exec(allowable_tags))) {
                tag_set.add(match[1]);
            }
        }

        else if (!Symbol.nonNative &&
                 typeof allowable_tags[Symbol.iterator] === 'function') {

            tag_set = new Set(allowable_tags);
        }

        else if (typeof allowable_tags.forEach === 'function') {
            // IE11 compatible
            allowable_tags.forEach(tag_set.add, tag_set);
        }

        return tag_set;
    }

    function normalize_tag(tag_buffer) {
        let match = NORMALIZE_TAG_REGEX.exec(tag_buffer);

        return match ? match[1].toLowerCase() : null;
    }

    if (true) {
        // AMD
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function module_factory() { return striptags; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }

    else {}
}(this));


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_knowledge_base_scss_vue_type_style_index_0_lang_scss_scopeds_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_knowledge_base_scss_vue_type_style_index_0_lang_scss_scopeds_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_knowledge_base_scss_vue_type_style_index_0_lang_scss_scopeds_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/vue-debounce/dist/vue-debounce.min.js":
/*!************************************************************!*\
  !*** ./node_modules/vue-debounce/dist/vue-debounce.min.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

!function(e,t){ true?t(exports):0}(this,(function(e){"use strict";function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){var r,o,i,u,a=null,l="number"==typeof t?t:(r=n(String(t).split(/(ms|s)/i),2),o=r[0],i=r[1],u=void 0===i?"ms":i,Number(o)*{ms:1,s:1e3}[u]),c=function(){for(var t=this,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];var i=function(){a=null,e.apply(t,r)};clearTimeout(a),(a=setTimeout(i,l))||e.apply(this,r)};return c.cancel=function(){clearTimeout(a),a=null},c}function i(e){return e.map((function(e){return e.toLowerCase()}))}function u(e,t){var n=(e.getNamedItem("debounce-events")||{}).value,r=void 0!==n&&n;return i(r?r.split(","):function(e){return Array.isArray(e)?e:null==e?[]:[e]}(t))}function a(e){return""===e}function l(e,t){return a(e)&&t.cancelonempty}function c(e,t){return"Enter"===e&&(!t.lock||t.unlock)}function f(e,t){return a(e)&&t.fireonempty}function s(e){var t=n(e.split("."),1)[0];return Number(t)>=3?"mounted":"bind"}var d={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.lock,i=void 0!==r&&r,a=n.listenTo,d=void 0===a?"keyup":a,v=n.defaultTime,y=void 0===v?"300ms":v,m=n.fireOnEmpty,p=void 0!==m&&m,b=n.cancelOnEmpty,g=void 0!==b&&b;e.directive("debounce",t({},s(e.version),(function(e,t){var n=t.value,r=t.arg,a=void 0===r?y:r,s=t.modifiers,v=Object.assign({fireonempty:p,cancelonempty:g,lock:i},s),m=u(e.attributes,d),b=o((function(e){n(e.target.value,e)}),a);function h(e){l(e.target.value,v)?b.cancel():c(e.key,v)||f(e.target.value,v)?(b.cancel(),n(e.target.value,e)):b(e)}m.forEach((function(t){e.addEventListener(t,h)}))})))}};e.debounce=o,e.default=d,Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ "./Resources/dashboard/components/knowledge-base/knowledge-base.vue":
/*!**************************************************************************!*\
  !*** ./Resources/dashboard/components/knowledge-base/knowledge-base.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _knowledge_base_vue_vue_type_template_id_175809ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knowledge-base.vue?vue&type=template&id=175809ae& */ "./Resources/dashboard/components/knowledge-base/knowledge-base.vue?vue&type=template&id=175809ae&");
/* harmony import */ var _knowledge_base_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./knowledge-base.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/knowledge-base/knowledge-base.js?vue&type=script&lang=js&");
/* harmony import */ var _knowledge_base_scss_vue_type_style_index_0_lang_scss_scopeds_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true& */ "./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _knowledge_base_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _knowledge_base_vue_vue_type_template_id_175809ae___WEBPACK_IMPORTED_MODULE_0__.render,
  _knowledge_base_vue_vue_type_template_id_175809ae___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/knowledge-base/knowledge-base.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/book.vue":
/*!**********************************!*\
  !*** ./Resources/icons/book.vue ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _book_vue_vue_type_template_id_ef5a00d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./book.vue?vue&type=template&id=ef5a00d4& */ "./Resources/icons/book.vue?vue&type=template&id=ef5a00d4&");
/* harmony import */ var _book_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./book.vue?vue&type=script&lang=js& */ "./Resources/icons/book.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _book_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _book_vue_vue_type_template_id_ef5a00d4___WEBPACK_IMPORTED_MODULE_0__.render,
  _book_vue_vue_type_template_id_ef5a00d4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/book.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/knowledge-base/knowledge-base.js?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./Resources/dashboard/components/knowledge-base/knowledge-base.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_knowledge_base_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/eslint-loader/dist/cjs.js!./knowledge-base.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/knowledge-base/knowledge-base.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_knowledge_base_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/book.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./Resources/icons/book.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_book_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./book.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/book.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_book_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true&":
/*!**************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true& ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_knowledge_base_scss_vue_type_style_index_0_lang_scss_scopeds_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/knowledge-base/knowledge-base.scss?vue&type=style&index=0&lang=scss&scopeds=true&");


/***/ }),

/***/ "./Resources/dashboard/components/knowledge-base/knowledge-base.vue?vue&type=template&id=175809ae&":
/*!*********************************************************************************************************!*\
  !*** ./Resources/dashboard/components/knowledge-base/knowledge-base.vue?vue&type=template&id=175809ae& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_knowledge_base_vue_vue_type_template_id_175809ae___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_knowledge_base_vue_vue_type_template_id_175809ae___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_knowledge_base_vue_vue_type_template_id_175809ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./knowledge-base.vue?vue&type=template&id=175809ae& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/knowledge-base/knowledge-base.vue?vue&type=template&id=175809ae&");


/***/ }),

/***/ "./Resources/icons/book.vue?vue&type=template&id=ef5a00d4&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/book.vue?vue&type=template&id=ef5a00d4& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_book_vue_vue_type_template_id_ef5a00d4___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_book_vue_vue_type_template_id_ef5a00d4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_book_vue_vue_type_template_id_ef5a00d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./book.vue?vue&type=template&id=ef5a00d4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/book.vue?vue&type=template&id=ef5a00d4&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/knowledge-base/knowledge-base.vue?vue&type=template&id=175809ae&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/knowledge-base/knowledge-base.vue?vue&type=template&id=175809ae& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "knowledgebase" } }, [
    !_vm.open
      ? _c(
          "div",
          {
            staticClass: "bg-white badge-pill p-1 line-height-0",
            attrs: { role: "button" },
            on: {
              click: function($event) {
                _vm.open = true
              }
            }
          },
          [_c("book-icon")],
          1
        )
      : _c(
          "div",
          {
            staticClass:
              "rounded bg-white p-3 knowledgebase-body d-flex flex-column"
          },
          [
            _c("div", [
              _c("h5", { staticClass: "font-heading mb-2" }, [
                _vm._v("\n\t\t\t\tKnowledgebase Portal\n\t\t\t")
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass:
                    "btn btn-sm btn-white badge-pill line-height-0 p-0 ml-aut shadow-none btn-close",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      _vm.open = false
                    }
                  }
                },
                [_c("close-icon")],
                1
              ),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.search,
                    expression: "search"
                  },
                  {
                    name: "debounce",
                    rawName: "v-debounce:400ms",
                    value: _vm.getTopics,
                    expression: "getTopics",
                    arg: "400ms"
                  }
                ],
                staticClass: "form-control shadow-none border",
                attrs: { type: "text", placeholder: "Search for topics..." },
                domProps: { value: _vm.search },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.search = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "flex-grow-1 position-relative" },
              [
                _vm.loading
                  ? _c("div", { staticClass: "position-absolute-center" }, [
                      _c("div", {
                        staticClass:
                          "spinner-border spinner-border-sm text-primary"
                      })
                    ])
                  : _vm.topics.length > 0
                  ? _vm._l(_vm.topics, function(topic, topicIndex) {
                      return _c(
                        "a",
                        {
                          key: topicIndex,
                          staticClass: "d-block pt-3 topic",
                          attrs: { target: "_blank", href: topic.link }
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c(
                                "h6",
                                {
                                  staticClass:
                                    "font-heading mb-0 text-ellipsis mr-1"
                                },
                                [_vm._v(_vm._s(topic.title.rendered))]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "flex-1 line-height-0" },
                                [
                                  _c("shortcut-icon", {
                                    staticClass: "fill-primary",
                                    attrs: { width: "14", height: "14" }
                                  })
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "p",
                            {
                              staticClass: "text-ellipsis mb-0 text-muted small"
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.stripTags(topic.excerpt.rendered))
                              )
                            ]
                          )
                        ]
                      )
                    })
                  : _c(
                      "div",
                      { staticClass: "position-absolute-center text-muted" },
                      [_vm._v("No topics found.")]
                    )
              ],
              2
            )
          ]
        )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/book.vue?vue&type=template&id=ef5a00d4&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/book.vue?vue&type=template&id=ef5a00d4& ***!
  \********************************************************************************************************************************************************************************************************/
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
            "M8,3 L8,17 L19,17 L19,3.5 C19,3.22385763 18.7761424,3 18.5,3 L8,3 Z M7,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,17.4998169 C5.41783027,17.1859724 5.93719704,17 6.5,17 L7,17 L7,3 Z M4.15121433,20.3582581 C4.05793442,20.2674293 4,20.1404803 4,20 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L18.5,2 C19.3284271,2 20,2.67157288 20,3.5 L20,20.5 C20,21.3284271 19.3284271,22 18.5,22 L6.5,22 C5.42082093,22 4.50134959,21.3162099 4.15121433,20.3582581 L4.15121433,20.3582581 Z M19,18 L6.5,18 C5.67157288,18 5,18.6715729 5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L18.5,21 C18.7761424,21 19,20.7761424 19,20.5 L19,18 Z M10.5,10 C10.2238576,10 10,9.77614237 10,9.5 C10,9.22385763 10.2238576,9 10.5,9 L16.5,9 C16.7761424,9 17,9.22385763 17,9.5 C17,9.77614237 16.7761424,10 16.5,10 L10.5,10 Z M10.5,8 C10.2238576,8 10,7.77614237 10,7.5 C10,7.22385763 10.2238576,7 10.5,7 L14.5,7 C14.7761424,7 15,7.22385763 15,7.5 C15,7.77614237 14.7761424,8 14.5,8 L10.5,8 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);