(self["webpackChunk"] = self["webpackChunk"] || []).push([["dashboard-billing"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/billing/billing.js?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/billing/billing.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_vue_button_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/vue-button.vue */ "./Resources/components/vue-button.vue");
/* harmony import */ var _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/modal/modal.vue */ "./Resources/components/modal/modal.vue");
/* harmony import */ var _components_vue_form_validate_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/vue-form-validate.vue */ "./Resources/components/vue-form-validate.vue");
/* harmony import */ var stripe_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stripe-client */ "./node_modules/stripe-client/index.js");
/* harmony import */ var stripe_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(stripe_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _icons_checkmark__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../icons/checkmark */ "./Resources/icons/checkmark.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    VueButton: _components_vue_button_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    Modal: _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    VueFormValidate: _components_vue_form_validate_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    CheckmarkIcon: _icons_checkmark__WEBPACK_IMPORTED_MODULE_5__.default
  },
  data: function data() {
    return {
      selectedPlan: null,
      paymentLoading: false,
      cardForm: {
        number: '',
        expiration: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        name: '',
        errors: {
          number: false,
          expiration: false,
          cvc: false
        }
      },
      stripe: null,
      publishableKey: '',
      seats: 0,
      loading: false
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_6__.mapState)({
    plans: function plans(state) {
      return state.plans.index;
    },
    ready: function ready(state) {
      return state.plans.ready;
    }
  })),
  mounted: function mounted() {},
  created: function created() {
    this.$root.contentloading = !this.ready;
    this.$root.heading = 'Billing';
    this.getData();
    this.getPlans();
  },
  watch: {
    ready: function ready(value) {
      this.$root.contentloading = !value;
      if (value) this.seats = this.plans[0].seats;
    }
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_6__.mapActions)({
    getPlans: 'plans/index'
  })), {}, {
    selectPlan: function selectPlan(plan) {
      if (plan.id != (this.$root.auth.subscription || {}).plan_id) {
        this.selectedPlan = plan;
        this.$refs['paymentModal'].show();
      }
    },
    unsubscribe: function unsubscribe() {
      var _this = this;

      this.loading = true;
      window.axios["delete"]("/dashboard/subscriptions/".concat(this.$root.auth.id)).then(function () {
        _this.$root.auth.subscription = null;

        _this.$refs['cancelSubscription'].hide();

        _this.loading = false;
      });
    },
    subscribe: function subscribe() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var error, expiration, cardData, card;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Object.keys(_this2.cardForm.errors).forEach(function (k) {
                  return _this2.cardForm.errors[k] = '';
                });
                error = false; // validate card number

                if (!_this2.$cardFormat.validateCardNumber(_this2.cardForm.number)) {
                  _this2.cardForm.errors.number = error = true;
                } // validate card expiry


                if (!_this2.$cardFormat.validateCardExpiry(_this2.cardForm.expiration)) {
                  _this2.cardForm.errors.expiration = error = true;
                } // validate card CVC


                if (!_this2.$cardFormat.validateCardCVC(_this2.cardForm.cvc)) {
                  _this2.cardForm.errors.cvc = error = true;
                }

                if (!(!error && _this2.selectedPlan)) {
                  _context.next = 17;
                  break;
                }

                _this2.paymentLoading = true;
                expiration = _this2.cardForm.expiration.split('/');
                _this2.cardForm.exp_month = parseInt(expiration[0].trim());
                _this2.cardForm.exp_year = expiration[1].trim();

                if (_this2.cardForm.exp_year.length === 2) {
                  if (_this2.cardForm.exp_year < 70) {
                    _this2.cardForm.exp_year = "20".concat(_this2.cardForm.exp_year);
                  } else {
                    _this2.cardForm.exp_year = "19".concat(_this2.cardForm.exp_year);
                  }
                }

                _this2.cardForm.exp_year = parseInt(_this2.cardForm.exp_year);
                cardData = {
                  card: {
                    number: '4242424242424242',
                    exp_month: '02',
                    exp_year: '21',
                    cvc: '999',
                    name: 'Billy Joe'
                  }
                };
                _context.next = 15;
                return _this2.stripe.createToken(cardData);

              case 15:
                card = _context.sent;
                card.json().then(function (token) {
                  window.axios.post("/dashboard/subscriptions", {
                    card: _this2.cardForm,
                    card_token: token.id,
                    plan_id: _this2.selectedPlan.id
                  }).then(function (response) {
                    _this2.$refs['paymentModal'].hide();

                    _this2.$root.auth.subscription = response.data;
                  })["catch"](function () {
                    _this2.paymentLoading = false;
                  });
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getData: function getData() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var stripe;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return window.axios.get('/dashboard/stripe_publishable_key');

              case 2:
                stripe = _context2.sent;
                _this3.publishableKey = stripe.data;
                _this3.stripe = stripe_client__WEBPACK_IMPORTED_MODULE_4___default()(_this3.publishableKey);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  })
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".plan[data-v-574cefa1] {\n  box-shadow: 0 1px 2px rgba(92, 101, 112, 0.2);\n  transition: all 0.1s ease-in-out;\n}\n.plan .btn-checkmark[data-v-574cefa1] {\n  right: 0;\n  top: 0;\n}\n.plan .btn-checkmark svg[data-v-574cefa1] {\n  opacity: 0;\n  fill: #fff;\n  stroke: #fff;\n}\n.plan.active .btn-checkmark[data-v-574cefa1] {\n  background: #5a5adf;\n}\n.plan.active .btn-checkmark svg[data-v-574cefa1] {\n  opacity: 1;\n}\n.plan.selected[data-v-574cefa1]:not(.active) {\n  box-shadow: 0 0 0 0.1rem rgba(90, 90, 223, 0.6);\n}\n.plan-price[data-v-574cefa1] {\n  background: rgba(90, 90, 223, 0.035);\n}\n.booking-plus[data-plan=standard] svg[data-v-574cefa1], .booking-plus[data-plan=pro] svg[data-v-574cefa1] {\n  opacity: 0;\n}\n.payments[data-plan=standard] svg[data-v-574cefa1] {\n  opacity: 0;\n}\n.integrations[data-plan=standard] > div:nth-child(5) svg[data-v-574cefa1],\n.integrations[data-plan=standard] > div:nth-child(6) svg[data-v-574cefa1] {\n  opacity: 0;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/form-urlencoded/form-urlencoded.js":
/*!*********************************************************!*\
  !*** ./node_modules/form-urlencoded/form-urlencoded.js ***!
  \*********************************************************/
/***/ ((module) => {

// Filename: formurlencoded.js
// Timestamp: 2016.03.07-12:29:28 (last modified)
// Author(s): Bumblehead (www.bumblehead.com), JBlashill (james@blashill.com), Jumper423 (jump.e.r@yandex.ru)
//
// http://www.w3.org/TR/html5/forms.html#url-encoded-form-data
// input: {one:1,two:2} return: '[one]=1&[two]=2'

module.exports = function (data, opts) {
    "use strict";

    // ES5 compatible version of `/[^ !'()~\*]/gu`, https://mothereff.in/regexpu
    var encodechar = new RegExp([
        '(?:[\0-\x1F"-&\+-\}\x7F-\uD7FF\uE000-\uFFFF]|',
        '[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|',
        '(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])'
    ].join(''), 'g');

    opts = typeof opts === 'object' ? opts : {};

    function encode(value) {
        return String(value)
            .replace(encodechar, encodeURIComponent)
            .replace(/ /g, '+')
            .replace(/[!'()~\*]/g, function (ch) {
                return '%' + ch.charCodeAt().toString(16).slice(-2).toUpperCase();
            });
    }

    function keys(obj) {
        var itemsKeys = Object.keys(obj);

        return opts.sorted ? itemsKeys.sort() : itemsKeys;
    }

    function filterjoin(arr) {
        return arr.filter(function (e) {
            return e;
        }).join('&');
    }

    function objnest(name, obj) {
        return filterjoin(keys(obj).map(function (key) {
            return nest(name + '[' + key + ']', obj[key]);
        }));
    }

    function arrnest(name, arr) {
        return arr.length ? filterjoin(arr.map(function (elem, index) {
            if (opts.skipIndex) {
                return nest(name + '[]', elem);
            } else {
                return nest(name + '[' + index + ']', elem);
            }
        })) : encode(name + '[]');
    }

    function nest(name, value) {
        var type = typeof value,
            f = null;

        if (value === f) {
            f = opts.ignorenull ? f : encode(name) + '=' + f;
        } else if (/string|number|boolean/.test(type)) {
            f = encode(name) + '=' + encode(value);
        } else if (Array.isArray(value)) {
            f = arrnest(name, value);
        } else if (type === 'object') {
            f = objnest(name, value);
        }

        return f;
    }

    return data && filterjoin(keys(data).map(function (key) {
            return nest(key, data[key]);
        }));
};


/***/ }),

/***/ "./node_modules/stripe-client/index.js":
/*!*********************************************!*\
  !*** ./node_modules/stripe-client/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const STRIPE_URL = 'https://api.stripe.com/v1/';
const FORMURLENCODED = __webpack_require__(/*! form-urlencoded */ "./node_modules/form-urlencoded/form-urlencoded.js");

module.exports = function(key) {
  return {
    createToken: async function (details) {
      const keys = Object.keys(details);
      const index = _findType(details, keys);
      var token;
      if (index == 0) {
        let type = keys[index];
        var newDetails = _convertDetails(type, details[type]);
        token = await _createTokenHelper(newDetails, key);
      } else {
        token = await _createTokenHelper(details, key);
      }
      return _parseJSON(token);
    }
  }
}

// Stripe normally only allows for fetch format for the details provided.
// _findType allows the user to use the node format of the details by
// figuring out which format/type the details provided are.
function _findType(details, keys) {
  if (details.card != null) {
    return keys.indexOf("card");
  } else if (details.bank_account != null) {
    return keys.indexOf("bank_account");
  } else if (details.pii != null) {
    return keys.indexOf("pii");
  } else return false;
}

// _convertDetails converts and returns the data in the given details
// to the correct Stripe format for the given type.
function _convertDetails(type, details) {
  var convertedDetails = {}
  for (var data in details) {
    const string = type + '[' + data + ']';
    convertedDetails[string] = details[data];
  }
  return convertedDetails;
}

// Stripe gives a JSON object with the token object embedded as a JSON string.
// _parseJSON finds that string in and returns it as a JSON object, or an error
// if Stripe threw an error instead. If the JSON does not need to be parsed, returns the token.
async function _parseJSON(token) {
  if (token._bodyInit == null) {
    return token;
  } else {
    const body = await token.json();
    return body;
  }
}

function _createTokenHelper(details, key) {
  const formBody = FORMURLENCODED(details);
  return fetch(STRIPE_URL + 'tokens', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + key
    },
    body: formBody
  });
}


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_billing_scss_vue_type_style_index_0_id_574cefa1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_billing_scss_vue_type_style_index_0_id_574cefa1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_billing_scss_vue_type_style_index_0_id_574cefa1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

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

/***/ "./Resources/dashboard/components/billing/billing.vue":
/*!************************************************************!*\
  !*** ./Resources/dashboard/components/billing/billing.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _billing_vue_vue_type_template_id_574cefa1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./billing.vue?vue&type=template&id=574cefa1&scoped=true& */ "./Resources/dashboard/components/billing/billing.vue?vue&type=template&id=574cefa1&scoped=true&");
/* harmony import */ var _billing_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./billing.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/billing/billing.js?vue&type=script&lang=js&");
/* harmony import */ var _billing_scss_vue_type_style_index_0_id_574cefa1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss& */ "./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _billing_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _billing_vue_vue_type_template_id_574cefa1_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _billing_vue_vue_type_template_id_574cefa1_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "574cefa1",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/billing/billing.vue"
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

/***/ "./Resources/dashboard/components/billing/billing.js?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./Resources/dashboard/components/billing/billing.js?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_billing_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/eslint-loader/dist/cjs.js!./billing.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/billing/billing.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_billing_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss&":
/*!***********************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_billing_scss_vue_type_style_index_0_id_574cefa1_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/billing/billing.scss?vue&type=style&index=0&id=574cefa1&scoped=true&lang=scss&");


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

/***/ "./Resources/dashboard/components/billing/billing.vue?vue&type=template&id=574cefa1&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./Resources/dashboard/components/billing/billing.vue?vue&type=template&id=574cefa1&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_billing_vue_vue_type_template_id_574cefa1_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_billing_vue_vue_type_template_id_574cefa1_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_billing_vue_vue_type_template_id_574cefa1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./billing.vue?vue&type=template&id=574cefa1&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/billing/billing.vue?vue&type=template&id=574cefa1&scoped=true&");


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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/billing/billing.vue?vue&type=template&id=574cefa1&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/billing/billing.vue?vue&type=template&id=574cefa1&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
      staticClass:
        "py-4 d-flex flex-row w-100 align-items-center h-100 overflow-auto "
    },
    [
      _c("div", { staticClass: "w-100 h-100" }, [
        _c("h1", { staticClass: "font-heading mb-4 text-center" }, [
          _vm._v("Choose a Plan")
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "d-flex flex-row align-items-center justify-content-center"
          },
          [
            _c(
              "div",
              {
                staticClass:
                  "row pb-4 px-3 h-100 w-100 m-0 justify-content-center"
              },
              _vm._l(_vm.plans, function(plan) {
                return _c(
                  "div",
                  { key: plan.id, staticClass: "col-md-4 py-2" },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "border rounded bg-white plan p-3 position-relative",
                        class: {
                          active:
                            _vm.$root.auth.subscription &&
                            _vm.$root.auth.subscription.plan_id == plan.id,
                          selected: plan.id == (_vm.selectedPlan || {}).id
                        }
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "btn btn-checkmark p-1 badge-pill line-height-0 position-absolute mr-2 mt-2"
                          },
                          [
                            _c("checkmark-icon", {
                              attrs: {
                                width: "20",
                                height: "20",
                                transform: "scale(1.8)",
                                "stroke-width": "1"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "h5",
                          {
                            staticClass:
                              "mb-4 font-heading text-primary text-uppercase"
                          },
                          [_vm._v(_vm._s(plan.name))]
                        ),
                        _vm._v(" "),
                        _c(
                          "h4",
                          { staticClass: "mb-0 font-weight-normal d-inline" },
                          [
                            _c("strong", [
                              _vm._v("$" + _vm._s(parseInt(plan.price)))
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v("." + _vm._s(plan.price.split(".")[1]))
                        ]),
                        _vm._v(
                          " / " + _vm._s(plan.interval) + "\n\n\t\t\t\t\t\t"
                        ),
                        _c(
                          "div",
                          { staticClass: "text-secondary" },
                          [
                            plan.per_user ? [_vm._v("per user")] : _vm._e(),
                            _vm._v("\n\t\t\t\t\t\t\t \n\t\t\t\t\t\t")
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "mt-3" }, [
                          _vm.$root.auth.subscription &&
                          _vm.$root.auth.subscription.plan_id == plan.id
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-primary btn-lg btn-block",
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.$refs[
                                        "cancelSubscription"
                                      ].show()
                                    }
                                  }
                                },
                                [_vm._v("Cancel subscription")]
                              )
                            : _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-lg btn-block",
                                  attrs: {
                                    disabled: _vm.$root.auth.subscription,
                                    type: "button"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.selectPlan(plan)
                                    }
                                  }
                                },
                                [_vm._v("Subscribe")]
                              )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "my-3" }, [
                          _c("strong", [_vm._v("Bookings")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Booking System")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Booking URL")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Time Zone Manager")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Email Reminders")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Unlimited Service Types")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "booking-plus",
                              attrs: { "data-plan": plan.name.toLowerCase() }
                            },
                            [
                              _c("strong", { staticClass: "mt-3 d-block" }, [
                                _vm._v("Booking Plus")
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Multi-team booking system")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Organization Booking URL")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Linked Accounts")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Admin Bookings")
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "payments",
                              attrs: { "data-plan": plan.name.toLowerCase() }
                            },
                            [
                              _c("strong", { staticClass: "mt-3 d-block" }, [
                                _vm._v("Payments")
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Take Payments (via Stripe)")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Xero Accounting Integration")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Subscription Manager")
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "integrations",
                              attrs: { "data-plan": plan.name.toLowerCase() }
                            },
                            [
                              _c("strong", { staticClass: "mt-3 d-block" }, [
                                _vm._v("Integrations")
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Zoom")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Google Calendar")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Outlook Calendar")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Xero")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c("checkmark-icon", {
                                    staticClass: "fill-success ml-n1",
                                    attrs: { width: "30", height: "30" }
                                  }),
                                  _vm._v("Stripe")
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("strong", { staticClass: "mt-3 d-block" }, [
                            _vm._v("Communication")
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Unlimited Contacts")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Delayed Chat")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Live Chat")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Send Files")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Send Voice Memos")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("checkmark-icon", {
                                staticClass: "fill-success ml-n1",
                                attrs: { width: "30", height: "30" }
                              }),
                              _vm._v("Live Video Calls")
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _c("small", { staticClass: "text-secondary" }, [
                          _vm._v(
                            "+ Stripe processing fees of 2.9% + 30¢ per successful card charge."
                          )
                        ])
                      ]
                    )
                  ]
                )
              }),
              0
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "modal",
        { ref: "cancelSubscription", attrs: { "close-button": false } },
        [
          _c("div", { staticClass: "text-center" }, [
            _c("h5", { staticClass: "font-heading" }, [
              _vm._v("Cancel Subscription")
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "mb-0" }, [
              _vm._v("Are you sure to cancel your current subscription?")
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "d-flex mt-4" },
            [
              _c(
                "button",
                {
                  staticClass: "btn btn-light shadow-none",
                  attrs: { type: "button", disabled: _vm.loading },
                  on: {
                    click: function($event) {
                      return _vm.$refs["cancelSubscription"].hide()
                    }
                  }
                },
                [_vm._v("Cancel")]
              ),
              _vm._v(" "),
              _c(
                "vue-button",
                {
                  attrs: {
                    type: "button",
                    loading: _vm.loading,
                    button_class: "ml-auto btn btn-danger"
                  },
                  on: {
                    click: function($event) {
                      return _vm.unsubscribe()
                    }
                  }
                },
                [_vm._v("Cancel Subscription")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "modal",
        {
          ref: "paymentModal",
          attrs: { "close-button": false },
          on: {
            hidden: function($event) {
              _vm.selectedPlan = null
              _vm.paymentLoading = false
            }
          }
        },
        [
          _vm.selectedPlan
            ? _c(
                "div",
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "bg-orange-light rounded p-3 selected-plan-summary"
                    },
                    [
                      _c(
                        "h5",
                        {
                          staticClass:
                            "mb-1 font-heading text-primary text-uppercase"
                        },
                        [_vm._v(_vm._s(_vm.selectedPlan.name))]
                      ),
                      _vm._v(" "),
                      _c(
                        "h4",
                        { staticClass: "mb-0 font-weight-normal d-inline" },
                        [
                          _c("strong", [
                            _vm._v(
                              "$" + _vm._s(parseInt(_vm.selectedPlan.price))
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          "." + _vm._s(_vm.selectedPlan.price.split(".")[1])
                        )
                      ]),
                      _vm._v(
                        " / " + _vm._s(_vm.selectedPlan.interval) + "\n\t\t\t"
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "vue-form-validate",
                    {
                      staticClass: "mt-3",
                      on: {
                        submit: function($event) {
                          return _vm.subscribe()
                        }
                      }
                    },
                    [
                      _c(
                        "fieldset",
                        { attrs: { disabled: _vm.paymentLoading } },
                        [
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Card Number")
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "input-icon position-relative" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.cardForm.number,
                                      expression: "cardForm.number"
                                    },
                                    {
                                      name: "cardformat",
                                      rawName: "v-cardformat:formatCardNumber",
                                      arg: "formatCardNumber"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  class: {
                                    "is-invalid": _vm.cardForm.errors.number
                                  },
                                  attrs: {
                                    type: "tel",
                                    placeholder: "#### #### #### ####",
                                    "data-required": ""
                                  },
                                  domProps: { value: _vm.cardForm.number },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.cardForm,
                                        "number",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "invalid-tooltip" }, [
                                  _vm._v("Invalid card number")
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "row mb-3 form-row form-group" },
                            [
                              _c("div", { staticClass: "col" }, [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v("Expiration")
                                ]),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.cardForm.expiration,
                                      expression: "cardForm.expiration"
                                    },
                                    {
                                      name: "cardformat",
                                      rawName: "v-cardformat:formatCardExpiry",
                                      arg: "formatCardExpiry"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  class: {
                                    "is-invalid": _vm.cardForm.errors.expiration
                                  },
                                  attrs: {
                                    type: "text",
                                    placeholder: "MM/YY",
                                    "data-required": ""
                                  },
                                  domProps: { value: _vm.cardForm.expiration },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.cardForm,
                                        "expiration",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "invalid-tooltip" }, [
                                  _vm._v("Invalid card expiration")
                                ])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "col" }, [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v("CVC")
                                ]),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.cardForm.cvc,
                                      expression: "cardForm.cvc"
                                    },
                                    {
                                      name: "cardformat",
                                      rawName: "v-cardformat:formatCardCVC",
                                      arg: "formatCardCVC"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  class: {
                                    "is-invalid": _vm.cardForm.errors.cvc
                                  },
                                  attrs: {
                                    type: "text",
                                    placeholder: "***",
                                    "data-required": ""
                                  },
                                  domProps: { value: _vm.cardForm.cvc },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.cardForm,
                                        "cvc",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "invalid-tooltip" }, [
                                  _vm._v("Invalid card CVC")
                                ])
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Name on card")
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.cardForm.name,
                                  expression: "cardForm.name"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text", "data-required": "" },
                              domProps: { value: _vm.cardForm.name },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.cardForm,
                                    "name",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "d-flex align-items-center mt-3" },
                        [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-light shadow-none",
                              attrs: {
                                disabled: _vm.paymentLoading,
                                type: "button",
                                "data-dismiss": "modal"
                              }
                            },
                            [_vm._v("Cancel")]
                          ),
                          _vm._v(" "),
                          _c(
                            "vue-button",
                            {
                              attrs: {
                                type: "submit",
                                loading: _vm.paymentLoading,
                                button_class:
                                  "ml-auto btn btn-primary shadow-none"
                              }
                            },
                            [_vm._v("Subscribe")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ],
                1
              )
            : _vm._e()
        ]
      )
    ],
    1
  )
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