(self["webpackChunk"] = self["webpackChunk"] || []).push([["dashboard-team-members"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/toggle-switch/toggle-switch.js?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/toggle-switch/toggle-switch.js?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    value: {
      type: Boolean,
      "default": false
    },
    activeClass: {
      type: String,
      "default": ''
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      width: 100,
      state: false,
      pressed: 0,
      position: 0
    };
  },
  mounted: function mounted() {
    this.toggle(this.value);
  },
  computed: {
    style: function style() {
      return {
        transform: "translateX(".concat(this.pos_percentage, ")")
      };
    },
    pos_percentage: function pos_percentage() {
      return "".concat(this.position / this.width * 100, "%");
    },
    state_class: function state_class() {
      if (this.state) {
        return this.activeClass + ' active';
      }
    }
  },
  watch: {
    value: function value(_value) {
      this.toggle(_value);
    },
    position: function position() {
      this.state = this.position >= 50;
    }
  },
  methods: {
    onClick: function onClick() {
      this.toggle(!this.state);
      this.emit();
    },
    toggle: function toggle(state) {
      this.state = state;
      this.position = !state ? 0 : 100;
    },
    dragging: function dragging(e) {
      var pos = e.clientX - this.$el.offsetLeft;
      var percent = pos / this.width * 100;
      this.position = percent <= 0 ? 0 : percent >= 100 ? 100 : percent;
    },
    resolvePosition: function resolvePosition() {
      this.position = this.state ? 100 : 0;
    },
    emit: function emit() {
      this.$emit('input', this.state);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/vue-checkbox/vue-checkbox.js?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/vue-checkbox/vue-checkbox.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _icons_checkmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons/checkmark */ "./Resources/icons/checkmark.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    CheckmarkIcon: _icons_checkmark__WEBPACK_IMPORTED_MODULE_0__.default
  },
  data: function data() {
    return {
      state: false
    };
  },
  watch: {
    value: function value(_value) {
      this.state = _value ? 1 : 0;
    },
    state: function state(value) {
      this.$emit('input', value);
    }
  },
  created: function created() {
    this.state = this.value;
  },
  props: {
    value: {},
    disabled: {
      type: Boolean,
      "default": false
    },
    label: {
      type: String
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/team/members/index/index.js?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/team/members/index/index.js?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/modal/modal.vue */ "./Resources/components/modal/modal.vue");
/* harmony import */ var _components_vue_form_validate_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/vue-form-validate.vue */ "./Resources/components/vue-form-validate.vue");
/* harmony import */ var _components_vue_checkbox_vue_checkbox_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/vue-checkbox/vue-checkbox.vue */ "./Resources/components/vue-checkbox/vue-checkbox.vue");
/* harmony import */ var _components_vue_button_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../components/vue-button.vue */ "./Resources/components/vue-button.vue");
/* harmony import */ var _components_toggle_switch_toggle_switch_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/toggle-switch/toggle-switch.vue */ "./Resources/components/toggle-switch/toggle-switch.vue");
/* harmony import */ var _icons_more_h__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../icons/more-h */ "./Resources/icons/more-h.vue");
/* harmony import */ var _icons_plus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../icons/plus */ "./Resources/icons/plus.vue");
/* harmony import */ var _icons_trash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../icons/trash */ "./Resources/icons/trash.vue");
/* harmony import */ var _icons_pencil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../icons/pencil */ "./Resources/icons/pencil.vue");
/* harmony import */ var _icons_clock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../icons/clock */ "./Resources/icons/clock.vue");
/* harmony import */ var _icons_checkmark_circle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../icons/checkmark-circle */ "./Resources/icons/checkmark-circle.vue");
/* harmony import */ var _icons_close__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../icons/close */ "./Resources/icons/close.vue");
/* harmony import */ var _icons_package__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../icons/package */ "./Resources/icons/package.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global APP_NAME */














/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Modal: _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    VueFormValidate: _components_vue_form_validate_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    VueCheckbox: _components_vue_checkbox_vue_checkbox_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    VueButton: _components_vue_button_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    ToggleSwitch: _components_toggle_switch_toggle_switch_vue__WEBPACK_IMPORTED_MODULE_4__.default,
    MoreIcon: _icons_more_h__WEBPACK_IMPORTED_MODULE_5__.default,
    PlusIcon: _icons_plus__WEBPACK_IMPORTED_MODULE_6__.default,
    TrashIcon: _icons_trash__WEBPACK_IMPORTED_MODULE_7__.default,
    PencilIcon: _icons_pencil__WEBPACK_IMPORTED_MODULE_8__.default,
    ClockIcon: _icons_clock__WEBPACK_IMPORTED_MODULE_9__.default,
    CheckmarkCircleIcon: _icons_checkmark_circle__WEBPACK_IMPORTED_MODULE_10__.default,
    CloseIcon: _icons_close__WEBPACK_IMPORTED_MODULE_11__.default,
    PackageIcon: _icons_package__WEBPACK_IMPORTED_MODULE_12__.default
  },
  data: function data() {
    return {
      infoTab: '',
      selectedMember: null,
      manageMember: false,
      manageFields: false,
      addMember: false,
      newMember: {
        custom_fields: {},
        assigned_services: [],
        sendToEmail: 1
      },
      activeTab: 'custom_fields',
      selectedFile: null,
      addField: false,
      newField: '',
      resendLoading: false,
      clonedMember: null
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_13__.mapState)({
    ready: function ready(state) {
      return state.members.ready;
    },
    services: function services(state) {
      return state.services.index;
    },
    members: function members(state) {
      return state.members.index;
    }
  })), {}, {
    defaultEmailMessage: function defaultEmailMessage() {
      return "".concat(this.$root.auth.full_name, " has invited you as a member in ").concat(APP_NAME);
    }
  }),
  watch: {
    ready: function ready(value) {
      this.$root.contentloading = !value;
    }
  },
  created: function created() {
    this.$root.contentloading = !this.ready;
    this.getServices();
    this.getMembers(); // this.$root.socket.on('member_invite_token', invite_token => {
    // 	if (invite_token) this.getMemberFromInviteToken(invite_token);
    // });
  },
  mounted: function mounted() {
    var _this = this;

    if (this.$root.intros.members_index.enabled) {
      setTimeout(function () {
        if (!document.querySelector('.introjs-overlay')) {
          _this.$root.intros.members_index.intro.start();
        }
      }, 500);
    }
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_13__.mapActions)({
    getServices: 'services/index',
    getMembers: 'members/index',
    storeMember: 'members/store',
    updateMember: 'members/update',
    deleteMember: 'members/delete',
    getMemberFromInviteToken: 'members/get_member_from_invite_token'
  })), {}, {
    update: function update() {
      this.updateMember(this.clonedMember);
      this.$refs['editModal'].hide();
    },
    goToMember: function goToMember(member_id) {
      this.$router.push("/dashboard/team/members/".concat(member_id));
    },
    resendEmail: function resendEmail(member) {
      var _this2 = this;

      this.resendLoading = true;
      window.axios.post("/members/".concat(member.id, "/resend")).then(function () {
        _this2.resendLoading = false;

        _this2.$refs['resendModal'].hide();

        _this2.$toasted.show('Invitation email has been sent successfully.');
      });
    },
    editMember: function editMember(member) {
      var clonedMember = JSON.parse(JSON.stringify(member));
      clonedMember.assigned_services = clonedMember.assigned_services.map(function (x) {
        return x.parent_service_id;
      });
      this.clonedMember = clonedMember;
      this.$refs['editModal'].show();
    },
    toggleMemberAssignedService: function toggleMemberAssignedService(service) {
      var index = this.clonedMember.assigned_services.findIndex(function (x) {
        return x == service.id;
      });

      if (index > -1) {
        this.clonedMember.assigned_services.splice(index, 1);
      } else {
        this.clonedMember.assigned_services.push(service.id);
      }
    },
    toggleAssignedService: function toggleAssignedService(service) {
      var index = this.newMember.assigned_services.findIndex(function (x) {
        return x == service.id;
      });

      if (index > -1) {
        this.newMember.assigned_services.splice(index, 1);
      } else {
        this.newMember.assigned_services.push(service.id);
      }
    },
    resetNewMember: function resetNewMember() {
      this.newMember = {
        custom_fields: {},
        assigned_services: []
      };
    },
    store: function store() {
      var _this3 = this;

      if (this.newMember.email) {
        this.storeMember(this.newMember).then(function () {
          _this3.newMember = {
            custom_fields: {},
            assigned_services: [],
            sendToEmail: 1
          };
        });
        this.$refs['addModal'].hide();
      }
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark-circle.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark-circle.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'user'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/clock.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/clock.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'clock'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more-h.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more-h.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'more-h'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pencil.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pencil.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'pencil'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/trash.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/trash.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'trash'
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toggle[data-v-4523532c] {\n  cursor: pointer;\n  width: 40px;\n  height: 20px;\n  background: #dee2e6;\n  border-radius: 200px;\n  transition: background 0.6s;\n}\n.toggle[disabled][data-v-4523532c] {\n  opacity: 0.5;\n  pointer-events: none !important;\n}\n.toggle .draggable[data-v-4523532c] {\n  pointer-events: none;\n  width: 20px;\n  height: 20px;\n  background: white;\n  border-radius: 100%;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);\n  transform: translateX(0%);\n  transition: transform 0.05s ease-in-out;\n}\n.toggle.active[data-v-4523532c] {\n  background: #5a5adf;\n  transition: background 0.6s;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".checkbox label[data-v-2d3fd1e4] {\n  cursor: pointer;\n  line-height: 20px;\n}\n.checkbox label[data-v-2d3fd1e4]:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.checkbox .cr[data-v-2d3fd1e4] {\n  position: relative;\n  display: inline-block;\n  border: 1px solid #ddd;\n  border-radius: 0.25em;\n  width: 1.2em;\n  height: 1.2em;\n  float: left;\n  margin-right: 0.5em;\n  transition: all 0.1s ease-in-out;\n}\n.checkbox .cr svg[data-v-2d3fd1e4] {\n  position: absolute;\n  font-size: 0.7em;\n  line-height: 0;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  transition: all 0.1s ease-in-out;\n}\n.checkbox label input[type=checkbox][data-v-2d3fd1e4] {\n  display: none;\n}\n.checkbox label input[type=checkbox] + .cr > svg[data-v-2d3fd1e4] {\n  opacity: 0;\n}\n.checkbox label input[type=checkbox]:checked + .cr > svg[data-v-2d3fd1e4] {\n  opacity: 1;\n}\n.checkbox label input[type=checkbox]:checked + .cr[data-v-2d3fd1e4] {\n  border-color: #5a5adf;\n  background-color: #5a5adf;\n}\n.checkbox label input[type=checkbox]:disabled + .cr[data-v-2d3fd1e4] {\n  opacity: 0.5;\n}\n.checkbox.disabled[data-v-2d3fd1e4] {\n  pointer-events: none !important;\n}\n.checkbox.disabled span[data-v-2d3fd1e4] {\n  opacity: 0.3;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".info[data-v-25b2df63] {\n  transition: all 0.1s ease-in-out;\n  width: 350px;\n  margin-right: -350px;\n}\n.info.open[data-v-25b2df63] {\n  margin-right: 0;\n}\n.contact.active[data-v-25b2df63] {\n  box-shadow: 0 0 0 0.1rem #5a5adf;\n}\n.w-35[data-v-25b2df63] {\n  width: 35% !important;\n}\n.w-15[data-v-25b2df63] {\n  width: 15% !important;\n}\n.badge-icon svg[data-v-25b2df63] {\n  transform: scale(1.3);\n  margin-right: 2px;\n}\n.badge-icon.text-primary svg[data-v-25b2df63] {\n  fill: #5a5adf;\n}\n.badge-icon.text-warning svg[data-v-25b2df63] {\n  fill: #ffc107;\n}\n.btn-close[data-v-25b2df63] {\n  top: 10px;\n  right: 10px;\n}\n.user-profile-image[data-v-25b2df63] {\n  width: 55px;\n  height: 55px;\n}\n.user-profile-image span[data-v-25b2df63] {\n  font-size: 20px;\n}\n.btn-add[data-v-25b2df63] {\n  border: dashed 1px #adb5bd;\n  transform: none !important;\n  padding-top: 55px;\n  padding-bottom: 55px;\n}\n.member-buttons[data-v-25b2df63] {\n  top: 10px;\n  right: 10px;\n}\n.online-status[data-v-25b2df63] {\n  width: 13px;\n  height: 13px;\n  right: 3px;\n  border-width: 2px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_toggle_switch_scss_vue_type_style_index_0_id_4523532c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_toggle_switch_scss_vue_type_style_index_0_id_4523532c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_toggle_switch_scss_vue_type_style_index_0_id_4523532c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_checkbox_scss_vue_type_style_index_0_id_2d3fd1e4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_checkbox_scss_vue_type_style_index_0_id_2d3fd1e4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_checkbox_scss_vue_type_style_index_0_id_2d3fd1e4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_25b2df63_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_25b2df63_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_25b2df63_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./Resources/components/toggle-switch/toggle-switch.vue":
/*!**************************************************************!*\
  !*** ./Resources/components/toggle-switch/toggle-switch.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _toggle_switch_vue_vue_type_template_id_4523532c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toggle-switch.vue?vue&type=template&id=4523532c&scoped=true& */ "./Resources/components/toggle-switch/toggle-switch.vue?vue&type=template&id=4523532c&scoped=true&");
/* harmony import */ var _toggle_switch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toggle-switch.js?vue&type=script&lang=js& */ "./Resources/components/toggle-switch/toggle-switch.js?vue&type=script&lang=js&");
/* harmony import */ var _toggle_switch_scss_vue_type_style_index_0_id_4523532c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss& */ "./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _toggle_switch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _toggle_switch_vue_vue_type_template_id_4523532c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _toggle_switch_vue_vue_type_template_id_4523532c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4523532c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/toggle-switch/toggle-switch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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

/***/ "./Resources/components/vue-checkbox/vue-checkbox.vue":
/*!************************************************************!*\
  !*** ./Resources/components/vue-checkbox/vue-checkbox.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _vue_checkbox_vue_vue_type_template_id_2d3fd1e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true& */ "./Resources/components/vue-checkbox/vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true&");
/* harmony import */ var _vue_checkbox_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vue-checkbox.js?vue&type=script&lang=js& */ "./Resources/components/vue-checkbox/vue-checkbox.js?vue&type=script&lang=js&");
/* harmony import */ var _vue_checkbox_scss_vue_type_style_index_0_id_2d3fd1e4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss& */ "./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _vue_checkbox_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _vue_checkbox_vue_vue_type_template_id_2d3fd1e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _vue_checkbox_vue_vue_type_template_id_2d3fd1e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2d3fd1e4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/vue-checkbox/vue-checkbox.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/team/members/index/index.vue":
/*!*********************************************************************!*\
  !*** ./Resources/dashboard/components/team/members/index/index.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_25b2df63_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=25b2df63&scoped=true& */ "./Resources/dashboard/components/team/members/index/index.vue?vue&type=template&id=25b2df63&scoped=true&");
/* harmony import */ var _index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/team/members/index/index.js?vue&type=script&lang=js&");
/* harmony import */ var _index_scss_vue_type_style_index_0_id_25b2df63_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true& */ "./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _index_vue_vue_type_template_id_25b2df63_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_25b2df63_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "25b2df63",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/team/members/index/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/checkmark-circle.vue":
/*!**********************************************!*\
  !*** ./Resources/icons/checkmark-circle.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _checkmark_circle_vue_vue_type_template_id_26147b75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkmark-circle.vue?vue&type=template&id=26147b75& */ "./Resources/icons/checkmark-circle.vue?vue&type=template&id=26147b75&");
/* harmony import */ var _checkmark_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkmark-circle.vue?vue&type=script&lang=js& */ "./Resources/icons/checkmark-circle.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _checkmark_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _checkmark_circle_vue_vue_type_template_id_26147b75___WEBPACK_IMPORTED_MODULE_0__.render,
  _checkmark_circle_vue_vue_type_template_id_26147b75___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/checkmark-circle.vue"
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

/***/ "./Resources/icons/clock.vue":
/*!***********************************!*\
  !*** ./Resources/icons/clock.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _clock_vue_vue_type_template_id_577c089e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clock.vue?vue&type=template&id=577c089e& */ "./Resources/icons/clock.vue?vue&type=template&id=577c089e&");
/* harmony import */ var _clock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clock.vue?vue&type=script&lang=js& */ "./Resources/icons/clock.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _clock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _clock_vue_vue_type_template_id_577c089e___WEBPACK_IMPORTED_MODULE_0__.render,
  _clock_vue_vue_type_template_id_577c089e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/clock.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/more-h.vue":
/*!************************************!*\
  !*** ./Resources/icons/more-h.vue ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _more_h_vue_vue_type_template_id_365d57dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./more-h.vue?vue&type=template&id=365d57dd& */ "./Resources/icons/more-h.vue?vue&type=template&id=365d57dd&");
/* harmony import */ var _more_h_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./more-h.vue?vue&type=script&lang=js& */ "./Resources/icons/more-h.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _more_h_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _more_h_vue_vue_type_template_id_365d57dd___WEBPACK_IMPORTED_MODULE_0__.render,
  _more_h_vue_vue_type_template_id_365d57dd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/more-h.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/pencil.vue":
/*!************************************!*\
  !*** ./Resources/icons/pencil.vue ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _pencil_vue_vue_type_template_id_b451630c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pencil.vue?vue&type=template&id=b451630c& */ "./Resources/icons/pencil.vue?vue&type=template&id=b451630c&");
/* harmony import */ var _pencil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pencil.vue?vue&type=script&lang=js& */ "./Resources/icons/pencil.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _pencil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _pencil_vue_vue_type_template_id_b451630c___WEBPACK_IMPORTED_MODULE_0__.render,
  _pencil_vue_vue_type_template_id_b451630c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/pencil.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/trash.vue":
/*!***********************************!*\
  !*** ./Resources/icons/trash.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _trash_vue_vue_type_template_id_52a06ddb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trash.vue?vue&type=template&id=52a06ddb& */ "./Resources/icons/trash.vue?vue&type=template&id=52a06ddb&");
/* harmony import */ var _trash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trash.vue?vue&type=script&lang=js& */ "./Resources/icons/trash.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _trash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _trash_vue_vue_type_template_id_52a06ddb___WEBPACK_IMPORTED_MODULE_0__.render,
  _trash_vue_vue_type_template_id_52a06ddb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/trash.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/components/toggle-switch/toggle-switch.js?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./Resources/components/toggle-switch/toggle-switch.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_toggle_switch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/eslint-loader/dist/cjs.js!./toggle-switch.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/toggle-switch/toggle-switch.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_toggle_switch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/components/vue-checkbox/vue-checkbox.js?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./Resources/components/vue-checkbox/vue-checkbox.js?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_vue_checkbox_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/eslint-loader/dist/cjs.js!./vue-checkbox.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/vue-checkbox/vue-checkbox.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_vue_checkbox_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/dashboard/components/team/members/index/index.js?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./Resources/dashboard/components/team/members/index/index.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/eslint-loader/dist/cjs.js!./index.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/team/members/index/index.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/checkmark-circle.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/checkmark-circle.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./checkmark-circle.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark-circle.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/clock.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./Resources/icons/clock.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./clock.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/clock.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/more-h.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./Resources/icons/more-h.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_more_h_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./more-h.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more-h.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_more_h_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/pencil.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./Resources/icons/pencil.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pencil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./pencil.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pencil.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pencil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/trash.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./Resources/icons/trash.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_trash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./trash.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/trash.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_trash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss&":
/*!*************************************************************************************************************************!*\
  !*** ./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss& ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_toggle_switch_scss_vue_type_style_index_0_id_4523532c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/toggle-switch/toggle-switch.scss?vue&type=style&index=0&id=4523532c&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss&":
/*!***********************************************************************************************************************!*\
  !*** ./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_checkbox_scss_vue_type_style_index_0_id_2d3fd1e4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-checkbox/vue-checkbox.scss?vue&type=style&index=0&id=2d3fd1e4&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true&":
/*!********************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_25b2df63_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/team/members/index/index.scss?vue&type=style&index=0&id=25b2df63&lang=scss&scoped=true&");


/***/ }),

/***/ "./Resources/components/toggle-switch/toggle-switch.vue?vue&type=template&id=4523532c&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./Resources/components/toggle-switch/toggle-switch.vue?vue&type=template&id=4523532c&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_toggle_switch_vue_vue_type_template_id_4523532c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_toggle_switch_vue_vue_type_template_id_4523532c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_toggle_switch_vue_vue_type_template_id_4523532c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./toggle-switch.vue?vue&type=template&id=4523532c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/toggle-switch/toggle-switch.vue?vue&type=template&id=4523532c&scoped=true&");


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

/***/ "./Resources/components/vue-checkbox/vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./Resources/components/vue-checkbox/vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_checkbox_vue_vue_type_template_id_2d3fd1e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_checkbox_vue_vue_type_template_id_2d3fd1e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_checkbox_vue_vue_type_template_id_2d3fd1e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-checkbox/vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true&");


/***/ }),

/***/ "./Resources/dashboard/components/team/members/index/index.vue?vue&type=template&id=25b2df63&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/team/members/index/index.vue?vue&type=template&id=25b2df63&scoped=true& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_25b2df63_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_25b2df63_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_25b2df63_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=25b2df63&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/team/members/index/index.vue?vue&type=template&id=25b2df63&scoped=true&");


/***/ }),

/***/ "./Resources/icons/checkmark-circle.vue?vue&type=template&id=26147b75&":
/*!*****************************************************************************!*\
  !*** ./Resources/icons/checkmark-circle.vue?vue&type=template&id=26147b75& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_circle_vue_vue_type_template_id_26147b75___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_circle_vue_vue_type_template_id_26147b75___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_checkmark_circle_vue_vue_type_template_id_26147b75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./checkmark-circle.vue?vue&type=template&id=26147b75& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark-circle.vue?vue&type=template&id=26147b75&");


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

/***/ "./Resources/icons/clock.vue?vue&type=template&id=577c089e&":
/*!******************************************************************!*\
  !*** ./Resources/icons/clock.vue?vue&type=template&id=577c089e& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_clock_vue_vue_type_template_id_577c089e___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_clock_vue_vue_type_template_id_577c089e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_clock_vue_vue_type_template_id_577c089e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./clock.vue?vue&type=template&id=577c089e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/clock.vue?vue&type=template&id=577c089e&");


/***/ }),

/***/ "./Resources/icons/more-h.vue?vue&type=template&id=365d57dd&":
/*!*******************************************************************!*\
  !*** ./Resources/icons/more-h.vue?vue&type=template&id=365d57dd& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_more_h_vue_vue_type_template_id_365d57dd___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_more_h_vue_vue_type_template_id_365d57dd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_more_h_vue_vue_type_template_id_365d57dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./more-h.vue?vue&type=template&id=365d57dd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more-h.vue?vue&type=template&id=365d57dd&");


/***/ }),

/***/ "./Resources/icons/pencil.vue?vue&type=template&id=b451630c&":
/*!*******************************************************************!*\
  !*** ./Resources/icons/pencil.vue?vue&type=template&id=b451630c& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pencil_vue_vue_type_template_id_b451630c___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pencil_vue_vue_type_template_id_b451630c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pencil_vue_vue_type_template_id_b451630c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./pencil.vue?vue&type=template&id=b451630c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pencil.vue?vue&type=template&id=b451630c&");


/***/ }),

/***/ "./Resources/icons/trash.vue?vue&type=template&id=52a06ddb&":
/*!******************************************************************!*\
  !*** ./Resources/icons/trash.vue?vue&type=template&id=52a06ddb& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_trash_vue_vue_type_template_id_52a06ddb___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_trash_vue_vue_type_template_id_52a06ddb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_trash_vue_vue_type_template_id_52a06ddb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./trash.vue?vue&type=template&id=52a06ddb& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/trash.vue?vue&type=template&id=52a06ddb&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/toggle-switch/toggle-switch.vue?vue&type=template&id=4523532c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/toggle-switch/toggle-switch.vue?vue&type=template&id=4523532c&scoped=true& ***!
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
  return _c(
    "div",
    {
      staticClass: "toggle",
      class: _vm.state_class,
      attrs: { disabled: _vm.disabled },
      on: {
        click: function($event) {
          if ($event.target !== $event.currentTarget) {
            return null
          }
          return _vm.onClick($event)
        }
      }
    },
    [_c("div", { staticClass: "draggable", style: _vm.style })]
  )
}
var staticRenderFns = []
render._withStripped = true



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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-checkbox/vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-checkbox/vue-checkbox.vue?vue&type=template&id=2d3fd1e4&scoped=true& ***!
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
    { staticClass: "checkbox", class: { disabled: _vm.disabled } },
    [
      _c("label", { staticClass: "d-flex align-items-center mb-0" }, [
        _c("div", [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.state,
                expression: "state"
              }
            ],
            attrs: { type: "checkbox", disabled: _vm.disabled },
            domProps: {
              checked: Array.isArray(_vm.state)
                ? _vm._i(_vm.state, null) > -1
                : _vm.state
            },
            on: {
              change: function($event) {
                var $$a = _vm.state,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.state = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.state = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.state = $$c
                }
              }
            }
          }),
          _vm._v(" "),
          _c(
            "span",
            { staticClass: "cr" },
            [_c("checkmark-icon", { attrs: { fill: "white" } })],
            1
          )
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "font-size-base text-body text-exllipsis" }, [
          _vm._v(_vm._s(_vm.label))
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/team/members/index/index.vue?vue&type=template&id=25b2df63&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/team/members/index/index.vue?vue&type=template&id=25b2df63&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.ready
    ? _c(
        "div",
        { staticClass: "h-100" },
        [
          _c("div", { staticClass: "d-flex h-100" }, [
            _c("div", { staticClass: "h-100 flex-grow-1" }, [
              _c("div", { staticClass: "d-flex flex-column h-100" }, [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "mt-2 overflow-auto h-100 flex-grow-1" },
                  [
                    _vm.members.length == 0
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "text-secondary text-center p-4 position-absolute-center"
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "h6 mb-0 font-weight-normal" },
                              [
                                _c("div", { staticClass: "mb-2" }, [
                                  _vm._v("You don't have any members yet.")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-primary",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        return _vm.$refs["addModal"].show()
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\tAdd Member\n\t\t\t\t\t\t\t"
                                    )
                                  ]
                                )
                              ]
                            )
                          ]
                        )
                      : _c(
                          "div",
                          {
                            staticClass:
                              "overflow-auto h-100 container pb-3 pt-4"
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "row pt-2 px-2" },
                              [
                                _vm._l(_vm.members, function(member, index) {
                                  return _c(
                                    "router-link",
                                    {
                                      key: member.id,
                                      staticClass:
                                        "col-md-4 member px-2 mb-5 cursor-pointer",
                                      attrs: {
                                        tag: "div",
                                        to:
                                          "/dashboard/team/members/" + member.id
                                      }
                                    },
                                    [
                                      _c("div", { staticClass: "px-1" }, [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "bg-white rounded p-3 shadow-sm text-centxer position-relative",
                                            attrs: {
                                              "data-intro":
                                                index == 0
                                                  ? _vm.$root.intros
                                                      .members_index.steps[0]
                                                  : null,
                                              "data-step": index == 0 ? 1 : null
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "member-buttons position-absolute d-flex align-items-center"
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "badge badge-icon d-inline-flex align-items-center mr-2",
                                                    class: [
                                                      member.is_pending
                                                        ? "bg-warning-light text-warning"
                                                        : "bg-primary-light text-primary"
                                                    ]
                                                  },
                                                  [
                                                    member.is_pending
                                                      ? _c("clock-icon", {
                                                          attrs: {
                                                            height: "12",
                                                            width: "12"
                                                          }
                                                        })
                                                      : _c(
                                                          "checkmark-circle-icon",
                                                          {
                                                            attrs: {
                                                              height: "12",
                                                              width: "12"
                                                            }
                                                          }
                                                        ),
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t " +
                                                        _vm._s(
                                                          member.is_pending
                                                            ? "Pending"
                                                            : "Accepted"
                                                        ) +
                                                        "\n\t\t\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "dropdown",
                                                    on: {
                                                      click: function($event) {
                                                        $event.preventDefault()
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "button",
                                                      {
                                                        staticClass:
                                                          "btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none",
                                                        attrs: {
                                                          type: "button",
                                                          "data-toggle":
                                                            "dropdown",
                                                          "data-offset":
                                                            "-132, 0",
                                                          "data-intro":
                                                            index == 0
                                                              ? _vm.$root.intros
                                                                  .members_index
                                                                  .steps[1]
                                                              : null,
                                                          "data-step":
                                                            index == 0
                                                              ? 2
                                                              : null
                                                        }
                                                      },
                                                      [
                                                        _c("more-icon", {
                                                          staticClass:
                                                            "fill-gray-500",
                                                          attrs: {
                                                            width: "20",
                                                            height: "20",
                                                            transform:
                                                              "scale(1.3)"
                                                          }
                                                        })
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "dropdown-menu"
                                                      },
                                                      [
                                                        member.is_pending
                                                          ? _c(
                                                              "span",
                                                              {
                                                                staticClass:
                                                                  "dropdown-item d-flex align-items-center px-2 cursor-pointer",
                                                                on: {
                                                                  click: function(
                                                                    $event
                                                                  ) {
                                                                    _vm.selectedMember = member
                                                                    _vm.$refs[
                                                                      "resendModal"
                                                                    ].show()
                                                                  }
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tResend invitation\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                )
                                                              ]
                                                            )
                                                          : _vm._e(),
                                                        _vm._v(" "),
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "dropdown-item d-flex align-items-center px-2 cursor-pointer",
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.editMember(
                                                                  member
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "dropdown-item d-flex align-items-center px-2 cursor-pointer",
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                _vm.selectedMember = member
                                                                _vm.$refs[
                                                                  "deleteModal"
                                                                ].show()
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                            )
                                                          ]
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "mt-n3" },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "user-profile-image user-profile-image-sm d-inline-block mb-2 mt-n4",
                                                    style: {
                                                      backgroundImage:
                                                        "url(" +
                                                        member.member_user
                                                          .profile_image +
                                                        ")"
                                                    }
                                                  },
                                                  [
                                                    !member.member_user
                                                      .profile_image
                                                      ? _c("span", [
                                                          _vm._v(
                                                            _vm._s(
                                                              member.member_user
                                                                .initials
                                                            )
                                                          )
                                                        ])
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    _vm.$root.isOnline(
                                                      member.member_user_id
                                                    )
                                                      ? _c(
                                                          "i",
                                                          {
                                                            staticClass:
                                                              "online-status bg-success"
                                                          },
                                                          [_vm._v(" ")]
                                                        )
                                                      : _vm._e()
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "h5",
                                              {
                                                staticClass: "font-heading mb-0"
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    member.member_user.full_name
                                                  )
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "small",
                                              { staticClass: "text-gray" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    member.member_user.email
                                                  )
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "d-flex align-items-center justify-content-cexnter mt-3"
                                              },
                                              [
                                                _c("package-icon", {
                                                  attrs: {
                                                    width: "17",
                                                    height: "17",
                                                    fill: "#888"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  { staticClass: "ml-2" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        member.assigned_services
                                                          .length
                                                      ) + " assigned services"
                                                    )
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          ]
                                        )
                                      ])
                                    ]
                                  )
                                }),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-4 member px-2" },
                                  [
                                    _c("div", { staticClass: "px-1 h-100" }, [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "position-relative h-100"
                                        },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "h-100 position-relative"
                                            },
                                            [
                                              _c(
                                                "button",
                                                {
                                                  staticClass:
                                                    "btn btn-light btn-add btn-lg shadow-none d-flex line-height-0 align-items-center justify-content-center w-100 text-muted",
                                                  attrs: {
                                                    "data-intro":
                                                      _vm.$root.intros
                                                        .members_index.steps[2],
                                                    "data-step": "3",
                                                    type: "button"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.$refs[
                                                        "addModal"
                                                      ].show()
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("plus-icon", {
                                                    staticClass: "fill-gray"
                                                  }),
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\tAdd Member\n\t\t\t\t\t\t\t\t\t\t\t"
                                                  )
                                                ],
                                                1
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              ],
                              2
                            )
                          ]
                        )
                  ]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "modal",
            { ref: "editModal", attrs: { "close-button": false } },
            [
              _c("h5", { staticClass: "font-heading mb-3" }, [
                _vm._v("Edit Member")
              ]),
              _vm._v(" "),
              _vm.clonedMember
                ? _c("vue-form-validate", { on: { submit: _vm.update } }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Email")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.clonedMember.email,
                            expression: "clonedMember.email"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          disabled: !_vm.clonedMember.is_pending,
                          type: "email",
                          "data-required": ""
                        },
                        domProps: { value: _vm.clonedMember.email },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.clonedMember,
                              "email",
                              $event.target.value
                            )
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-row form-group" }, [
                      _c("div", { staticClass: "col" }, [
                        _c("label", { staticClass: "form-label" }, [
                          _vm._v("First Name (Optional)")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.clonedMember.first_name,
                              expression: "clonedMember.first_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            disabled: !_vm.clonedMember.is_pending,
                            type: "text"
                          },
                          domProps: { value: _vm.clonedMember.first_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.clonedMember,
                                "first_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col" }, [
                        _c("label", { staticClass: "form-label" }, [
                          _vm._v("Last Name (Optional)")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.clonedMember.last_name,
                              expression: "clonedMember.last_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            disabled: !_vm.clonedMember.is_pending,
                            type: "text"
                          },
                          domProps: { value: _vm.clonedMember.last_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.clonedMember,
                                "last_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "form-group" },
                      [
                        _c(
                          "strong",
                          { staticClass: "d-block mb-2 font-weight-bold" },
                          [_vm._v("Assign Services")]
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.services, function(service) {
                          return [
                            _c(
                              "div",
                              {
                                key: service.id,
                                staticClass:
                                  "d-flex align-items-center mb-2 rounded p-3 bg-light",
                                attrs: { "xv-if": "service.is_available" }
                              },
                              [
                                _c("div", [
                                  _c(
                                    "h6",
                                    { staticClass: "font-heading mb-0" },
                                    [_vm._v(_vm._s(service.name))]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "small",
                                    { staticClass: "text-gray d-block" },
                                    [
                                      _vm._v(
                                        _vm._s(service.duration) + " minutes"
                                      )
                                    ]
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "ml-auto" },
                                  [
                                    _c("toggle-switch", {
                                      attrs: {
                                        "active-class": "bg-primary",
                                        value: _vm.clonedMember.assigned_services.find(
                                          function(x) {
                                            return x == service.id
                                          }
                                        )
                                          ? true
                                          : false
                                      },
                                      on: {
                                        input: function($event) {
                                          return _vm.toggleMemberAssignedService(
                                            service
                                          )
                                        }
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            )
                          ]
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-light shadow-none",
                          attrs: { type: "button", "data-dismiss": "modal" }
                        },
                        [_vm._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "ml-auto btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v("\n\t\t\t\t\tSave\n\t\t\t\t")]
                      )
                    ])
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "modal",
            { ref: "addModal", attrs: { "close-button": false } },
            [
              _c("h5", { staticClass: "font-heading mb-3" }, [
                _vm._v("Add Member")
              ]),
              _vm._v(" "),
              _c("vue-form-validate", { on: { submit: _vm.store } }, [
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { staticClass: "form-label" }, [_vm._v("Email")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.newMember.email,
                        expression: "newMember.email"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { type: "email", "data-required": "" },
                    domProps: { value: _vm.newMember.email },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.newMember, "email", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-row form-group" }, [
                  _c("div", { staticClass: "col" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("First Name (Optional)")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.newMember.first_name,
                          expression: "newMember.first_name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text" },
                      domProps: { value: _vm.newMember.first_name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.newMember,
                            "first_name",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Last Name (Optional)")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.newMember.last_name,
                          expression: "newMember.last_name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text" },
                      domProps: { value: _vm.newMember.last_name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.newMember,
                            "last_name",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c(
                      "strong",
                      { staticClass: "d-block mb-2 font-weight-bold" },
                      [_vm._v("Assign Services")]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.services, function(service) {
                      return [
                        service.is_available
                          ? _c(
                              "div",
                              {
                                key: service.id,
                                staticClass:
                                  "d-flex align-items-center mb-2 rounded p-3 bg-light"
                              },
                              [
                                _c("div", [
                                  _c(
                                    "h6",
                                    { staticClass: "font-heading mb-0" },
                                    [_vm._v(_vm._s(service.name))]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "small",
                                    { staticClass: "text-gray d-block" },
                                    [
                                      _vm._v(
                                        _vm._s(service.duration) + " minutes"
                                      )
                                    ]
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "ml-auto" },
                                  [
                                    _c("toggle-switch", {
                                      attrs: {
                                        "active-class": "bg-primary",
                                        value: _vm.newMember.assigned_services.find(
                                          function(x) {
                                            return x == service.id
                                          }
                                        )
                                          ? true
                                          : false
                                      },
                                      on: {
                                        input: function($event) {
                                          return _vm.toggleAssignedService(
                                            service
                                          )
                                        }
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            )
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("strong", { staticClass: "d-block mb-2" }, [
                    _vm._v("Invitation Message (Optional)")
                  ]),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.newMember.invite_message,
                        expression: "newMember.invite_message"
                      }
                    ],
                    staticClass: "form-control resize-none",
                    attrs: { rows: "3", placeholder: _vm.defaultEmailMessage },
                    domProps: { value: _vm.newMember.invite_message },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.newMember,
                          "invite_message",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c("vue-checkbox", {
                      attrs: { label: "Send invitation link to email" },
                      model: {
                        value: _vm.newMember.sendToEmail,
                        callback: function($$v) {
                          _vm.$set(_vm.newMember, "sendToEmail", $$v)
                        },
                        expression: "newMember.sendToEmail"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-light shadow-none",
                      attrs: { type: "button", "data-dismiss": "modal" }
                    },
                    [_vm._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "ml-auto btn btn-primary",
                      attrs: { type: "submit" }
                    },
                    [_vm._v("\n\t\t\t\t\tAdd\n\t\t\t\t")]
                  )
                ])
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "modal",
            { ref: "resendModal", attrs: { "close-button": false } },
            [
              _vm.selectedMember
                ? [
                    _c("h5", { staticClass: "font-heading text-center" }, [
                      _vm._v("Resend Invitation")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-center mt-3" }, [
                      _vm._v(
                        "\n\t\t\t\tAre you sure to resend the invitation email to member\n\t\t\t\t"
                      ),
                      _c("strong", [
                        _vm._v(
                          _vm._s(
                            _vm.selectedMember.full_name.trim() ||
                              _vm.selectedMember.email
                          )
                        )
                      ]),
                      _vm._v("\n\t\t\t\t?\n\t\t\t\t"),
                      _c("br")
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "d-flex justify-content-end" },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-light shadow-none",
                            attrs: { type: "button", "data-dismiss": "modal" }
                          },
                          [_vm._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]
                        ),
                        _vm._v(" "),
                        _c(
                          "vue-button",
                          {
                            attrs: {
                              button_class: "btn btn-primary ml-auto",
                              loading: _vm.resendLoading,
                              type: "button"
                            },
                            on: {
                              click: function($event) {
                                return _vm.resendEmail(_vm.selectedMember)
                              }
                            }
                          },
                          [_vm._v("Resend Invitation")]
                        )
                      ],
                      1
                    )
                  ]
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "modal",
            { ref: "deleteModal", attrs: { "close-button": false } },
            [
              _vm.selectedMember
                ? [
                    _c("h5", { staticClass: "font-heading text-center" }, [
                      _vm._v("Delete Member")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-center mt-3" }, [
                      _vm._v(
                        "\n\t\t\t\tAre you sure to delete member\n\t\t\t\t"
                      ),
                      _c("strong", [
                        _vm._v(
                          _vm._s(
                            _vm.selectedMember.full_name.trim() ||
                              _vm.selectedMember.email
                          )
                        )
                      ]),
                      _vm._v("\n\t\t\t\t?\n\t\t\t\t"),
                      _c("br"),
                      _vm._v(" "),
                      _c("span", { staticClass: "text-danger" }, [
                        _vm._v("This action cannot be undone")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex justify-content-end" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-light shadow-none text-body",
                          attrs: { type: "button", "data-dismiss": "modal" }
                        },
                        [_vm._v("\n\t\t\t\t\tCancel\n\t\t\t\t")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-danger ml-auto",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm.deleteMember(_vm.selectedMember)
                              _vm.$refs["deleteModal"].hide()
                              _vm.selectedMember = null
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\tDelete\n\t\t\t\t")]
                      )
                    ])
                  ]
                : _vm._e()
            ],
            2
          )
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "border-bottom bg-white px-3 py-4" }, [
      _c("h5", { staticClass: "font-heading mb-0" }, [_vm._v("Members")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark-circle.vue?vue&type=template&id=26147b75&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/checkmark-circle.vue?vue&type=template&id=26147b75& ***!
  \********************************************************************************************************************************************************************************************************************/
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
            "M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z"
        }
      })
    ]
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/clock.vue?vue&type=template&id=577c089e&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/clock.vue?vue&type=template&id=577c089e& ***!
  \*********************************************************************************************************************************************************************************************************/
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
            "M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.7906191,14.0931333 C16.0153254,14.2536378 16.0673712,14.5659128 15.9068667,14.7906191 C15.7463622,15.0153254 15.4340872,15.0673712 15.2093809,14.9068667 L11.7093809,12.4068667 C11.6156592,12.3399227 11.5479226,12.2426753 11.5176181,12.1315587 L10.0176181,6.6315587 C9.94496022,6.36514653 10.1020291,6.09027595 10.3684413,6.01761809 C10.6348535,5.94496022 10.909724,6.10202912 10.9823819,6.3684413 L12.4355266,11.6966387 L15.7906191,14.0931333 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more-h.vue?vue&type=template&id=365d57dd&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more-h.vue?vue&type=template&id=365d57dd& ***!
  \**********************************************************************************************************************************************************************************************************/
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
    { attrs: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" } },
    [
      _c("path", {
        attrs: {
          d:
            "M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pencil.vue?vue&type=template&id=b451630c&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pencil.vue?vue&type=template&id=b451630c& ***!
  \**********************************************************************************************************************************************************************************************************/
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
            "M15.5,6.20710678 L4,17.7071068 L4,20 L6.29289322,20 L17.7928932,8.5 L15.5,6.20710678 Z M16.2071068,5.5 L18.5,7.79289322 L19.7928932,6.5 L17.5,4.20710678 L16.2071068,5.5 L16.2071068,5.5 Z M3,20.5 L3,17.5 C3,17.3673918 3.05267842,17.2402148 3.14644661,17.1464466 L17.1464466,3.14644661 C17.3417088,2.95118446 17.6582912,2.95118446 17.8535534,3.14644661 L20.8535534,6.14644661 C21.0488155,6.34170876 21.0488155,6.65829124 20.8535534,6.85355339 L6.85355339,20.8535534 C6.7597852,20.9473216 6.63260824,21 6.5,21 L3.5,21 C3.22385763,21 3,20.7761424 3,20.5 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/trash.vue?vue&type=template&id=52a06ddb&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/trash.vue?vue&type=template&id=52a06ddb& ***!
  \*********************************************************************************************************************************************************************************************************/
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
            "M19,6 L19,18.5 C19,19.8807119 17.8807119,21 16.5,21 L7.5,21 C6.11928813,21 5,19.8807119 5,18.5 L5,6 L4.5,6 C4.22385763,6 4,5.77614237 4,5.5 C4,5.22385763 4.22385763,5 4.5,5 L9,5 L9,4.5 C9,3.67157288 9.67157288,3 10.5,3 L13.5,3 C14.3284271,3 15,3.67157288 15,4.5 L15,5 L19.5,5 C19.7761424,5 20,5.22385763 20,5.5 C20,5.77614237 19.7761424,6 19.5,6 L19,6 Z M6,6 L6,18.5 C6,19.3284271 6.67157288,20 7.5,20 L16.5,20 C17.3284271,20 18,19.3284271 18,18.5 L18,6 L6,6 Z M14,5 L14,4.5 C14,4.22385763 13.7761424,4 13.5,4 L10.5,4 C10.2238576,4 10,4.22385763 10,4.5 L10,5 L14,5 Z M14,9.5 C14,9.22385763 14.2238576,9 14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,16.5 C15,16.7761424 14.7761424,17 14.5,17 C14.2238576,17 14,16.7761424 14,16.5 L14,9.5 Z M9,9.5 C9,9.22385763 9.22385763,9 9.5,9 C9.77614237,9 10,9.22385763 10,9.5 L10,16.5 C10,16.7761424 9.77614237,17 9.5,17 C9.22385763,17 9,16.7761424 9,16.5 L9,9.5 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);