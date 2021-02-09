(self["webpackChunk"] = self["webpackChunk"] || []).push([["dashboard-bookings-packages-show"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/timerangepicker/timerangepicker.js?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/timerangepicker/timerangepicker.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    start: {
      type: String,
      "default": null
    },
    end: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      time_start: null,
      time_end: null
    };
  },
  watch: {
    start: function start(value) {
      var _this = this;

      if (value) this.time_start = this.hours.find(function (x) {
        return x.time == _this.start;
      });
    },
    end: function end(value) {
      var _this2 = this;

      if (value) this.time_end = this.hours.find(function (x) {
        return x.time == _this2.end;
      });
    }
  },
  computed: {
    hours: function hours() {
      var now = dayjs__WEBPACK_IMPORTED_MODULE_0___default()();
      now = now.hour(0).minute(0);
      var hours = [];

      for (var i = 0; i < 24; i++) {
        hours.push({
          time: now.format('HH:mm'),
          label: now.format('h:mmA')
        });
        hours.push({
          time: now.add(30, 'minute').format('HH:mm'),
          label: now.add(30, 'minute').format('h:mmA')
        });
        now = now.add(60, 'minute');
      }

      return hours;
    },
    startHours: function startHours() {
      var _this3 = this;

      var startHours = [];
      this.hours.forEach(function (hour) {
        if (!_this3.time_end || hour.time < _this3.time_end.time) {
          startHours.push(hour);
        }
      });
      return startHours;
    },
    endHours: function endHours() {
      var _this4 = this;

      var endHours = [];
      this.hours.forEach(function (hour) {
        if (!_this4.time_start || hour.time > _this4.time_start.time) {
          endHours.push(hour);
        }
      });
      return endHours;
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    $(this.$refs['start']).on('show.bs.dropdown', function () {
      setTimeout(function () {
        if (_this5.time_start) {
          _this5.$refs['dropdown-start'].querySelector("#start-".concat(_this5.time_start.time.replace(':', ''))).scrollIntoView({
            block: 'nearest'
          });
        }
      }, 50);
    });
    $(this.$refs['end']).on('show.bs.dropdown', function () {
      setTimeout(function () {
        if (_this5.time_end) {
          _this5.$refs['dropdown-end'].querySelector("#end-".concat(_this5.time_end.time.replace(':', ''))).scrollIntoView({
            block: 'nearest'
          });
        }
      }, 50);
    });
  },
  created: function created() {
    var _this6 = this;

    var hours = this.hours;
    if (this.start) this.time_start = hours.find(function (x) {
      return x.time == _this6.start;
    });
    if (this.end) this.time_end = hours.find(function (x) {
      return x.time == _this6.end;
    });
  },
  methods: {
    formatDate: function formatDate(date) {
      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('MMMM D, YYYY');
    },
    update: function update() {
      if (!this.time_start) {
        $(this.$refs['dropdown-start']).dropdown('show');
      } else if (!this.time_end) {
        $(this.$refs['dropdown-end']).dropdown('show');
      }

      this.$emit('update', {
        start: this.time_start,
        end: this.time_end
      });
    }
  }
});

/***/ }),

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/vue-select/vue-select.js?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/vue-select/vue-select.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_vue_checkbox_vue_checkbox_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue-checkbox/vue-checkbox.vue */ "./Resources/components/vue-checkbox/vue-checkbox.vue");
/* harmony import */ var _icons_chevron_down__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../icons/chevron-down */ "./Resources/icons/chevron-down.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    VueCheckbox: _components_vue_checkbox_vue_checkbox_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    ChevronDownIcon: _icons_chevron_down__WEBPACK_IMPORTED_MODULE_1__.default
  },
  props: {
    drop: {
      type: String,
      "default": 'dropdown'
    },
    placeholder: {
      type: String,
      "default": ''
    },
    options: {
      type: Array,
      "default": []
    },
    value: {
      type: [Number, String, Array, Object]
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    searchable: {
      type: Boolean,
      "default": false
    },
    required: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    button_class: {
      type: String,
      "default": ''
    },
    dropdown_class: {
      type: String,
      "default": ''
    },
    label: {
      type: String,
      "default": ''
    },
    caret: {
      type: Boolean,
      "default": true
    },
    container_class: {
      type: String,
      "default": ''
    },
    suggestion: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      selected_value: {},
      search: '',
      show_no_results: true,
      show: false,
      focused: false
    };
  },
  computed: {
    select_placeholder: function select_placeholder() {
      var _this = this;

      var placeholder = this.placeholder;

      if (this.selected_value) {
        if (this.multiple) {
          var multiple_texts = [];
          this.selected_value.forEach(function (selected) {
            var value = _this.options.find(function (x) {
              return x.value == selected || x.value.id && selected.id && x.value.id == selected.id;
            });

            if (value) multiple_texts.push(value.text);
          });
          if (multiple_texts.length > 0) placeholder = multiple_texts.join(', ');
        } else {
          placeholder = (this.options.find(function (x) {
            return x.value == _this.selected_value;
          }) || {}).text || this.placeholder;
        }
      }

      return placeholder;
    },
    filtered_options: function filtered_options() {
      var _this2 = this;

      return this.options.filter(function (option) {
        var show = true;

        if (!_this2.multiple && _this2.searchable && typeof _this2.search != 'undefined' && _this2.search.trim().length > 0) {
          var pos = option.text.toLowerCase().indexOf(_this2.search.trim().toLowerCase());
          if (pos < 0) show = false;
        }

        return show;
      });
    },
    toggle_button_class: function toggle_button_class() {
      var classes = this.searchable ? 'cursor-text ' : 'cursor-pointer ';
      classes += this.button_class;
      return classes;
    }
  },
  watch: {
    value: function value(_value) {
      this.selected_value = _value;
      if (!_value) this.search = '';
    },
    search: function search(value) {
      var _this3 = this;

      if (this.suggestion) {
        this.selected_value = value;
        this.$emit('input', this.selected_value);
      }

      this.$nextTick(function () {
        $(_this3.$refs['dropdown-toggle']).dropdown('update');
      });
    }
  },
  created: function created() {
    this.selected_value = this.value;
  },
  mounted: function mounted() {
    var _this4 = this;

    $(this.$refs['dropdown']).on('show.bs.dropdown', function () {
      if (_this4.$refs['input-searchable']) _this4.$refs['input-searchable'].removeAttribute('readonly');
      _this4.show_no_results = true;
      if (!_this4.suggestion) _this4.search = '';

      if (_this4.searchable) {
        setTimeout(function () {
          _this4.$refs['input-searchable'].focus();
        });
      }
      /* if (!this.multiple && this.selected_value) {
                   setTimeout(() => {
                       const pos = document.getElementById('item-' + this.selected_value).offsetTop;
                       this.$refs['scrollable-menu'].scrollTop = pos - 36;
                   });
               } else if (this.multiple) {
                   this.$refs['scrollable-menu'].scrollTop = 0;
               }*/

    });
    $(this.$refs['dropdown']).on('hide.bs.dropdown', function () {
      if (_this4.suggestion) {
        _this4.search = _this4.selected_value;
      } else {
        _this4.search = _this4.selected_value ? _this4.select_placeholder : '';
      }

      if (_this4.$refs['input-searchable'] && !_this4.suggestion) _this4.$refs['input-searchable'].setAttribute('readonly', true);
    });
    $(this.$refs['dropdown']).on('hidden.bs.dropdown', function () {
      _this4.show_no_results = false;
    });
  },
  methods: {
    inputBlurred: function inputBlurred() {
      var _this5 = this;

      if (this.suggestion) {
        setTimeout(function () {
          _this5.focused = false;
        }, 100);
      }
    },
    inputFocused: function inputFocused(e) {
      var _this6 = this;

      if (e.relatedTarget && e.relatedTarget.type == 'submit') {
        this.$refs['dropdown-toggle'].click();
      }

      if (this.suggestion) {
        setTimeout(function () {
          _this6.focused = true;
        }, 100);
      }
    },
    updateValue: function updateValue(option) {
      if (this.multiple) {
        this.selected_value = this.selected_value || [];
        var valueIndex = this.selected_value.findIndex(function (x) {
          return x == option.value || x.id && option.value.id && x.id == option.value.id;
        });
        if (valueIndex == -1) this.selected_value.push(option.value);else this.selected_value.splice(valueIndex, 1);
        this.search = this.placeholder;
      } else {
        this.selected_value = option.value;
        if (!this.suggestion) this.search = option.text;
      }

      this.$emit('change', this.selected_value);
      this.$emit('input', this.selected_value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/packages/show/show.js?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/packages/show/show.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/modal/modal.vue */ "./Resources/components/modal/modal.vue");
/* harmony import */ var _components_toggle_switch_toggle_switch_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/toggle-switch/toggle-switch.vue */ "./Resources/components/toggle-switch/toggle-switch.vue");
/* harmony import */ var _components_timerangepicker_timerangepicker_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/timerangepicker/timerangepicker.vue */ "./Resources/components/timerangepicker/timerangepicker.vue");
/* harmony import */ var _components_vue_form_validate_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/vue-form-validate.vue */ "./Resources/components/vue-form-validate.vue");
/* harmony import */ var _components_vue_checkbox_vue_checkbox_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/vue-checkbox/vue-checkbox.vue */ "./Resources/components/vue-checkbox/vue-checkbox.vue");
/* harmony import */ var _icons_pencil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../icons/pencil */ "./Resources/icons/pencil.vue");
/* harmony import */ var _icons_chevron_down__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../icons/chevron-down */ "./Resources/icons/chevron-down.vue");
/* harmony import */ var _icons_plus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../icons/plus */ "./Resources/icons/plus.vue");
/* harmony import */ var _icons_cog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../icons/cog */ "./Resources/icons/cog.vue");
/* harmony import */ var _icons_trash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../icons/trash */ "./Resources/icons/trash.vue");
/* harmony import */ var _icons_clock__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../icons/clock */ "./Resources/icons/clock.vue");
/* harmony import */ var _icons_arrow_left__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../icons/arrow-left */ "./Resources/icons/arrow-left.vue");
/* harmony import */ var _icons_more__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../icons/more */ "./Resources/icons/more.vue");
/* harmony import */ var _icons_dollar_sign__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../icons/dollar-sign */ "./Resources/icons/dollar-sign.vue");
/* harmony import */ var _icons_window_plus__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../icons/window-plus */ "./Resources/icons/window-plus.vue");
/* harmony import */ var _icons_calendar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../icons/calendar */ "./Resources/icons/calendar.vue");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var vue_paginate__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! vue-paginate */ "./node_modules/vue-paginate/dist/vue-paginate.js");
/* harmony import */ var vue_paginate__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(vue_paginate__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _js_directives_tooltip_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../js/directives/tooltip.js */ "./Resources/js/directives/tooltip.js");
/* harmony import */ var _components_vue_select_vue_select_vue__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/vue-select/vue-select.vue */ "./Resources/components/vue-select/vue-select.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





















vue__WEBPACK_IMPORTED_MODULE_18__.default.use((vue_paginate__WEBPACK_IMPORTED_MODULE_17___default()));
 //const convertTime = require('convert-time');


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Modal: _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    VueFormValidate: _components_vue_form_validate_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    VueCheckbox: _components_vue_checkbox_vue_checkbox_vue__WEBPACK_IMPORTED_MODULE_4__.default,
    PencilIcon: _icons_pencil__WEBPACK_IMPORTED_MODULE_5__.default,
    ChevronDownIcon: _icons_chevron_down__WEBPACK_IMPORTED_MODULE_6__.default,
    PlusIcon: _icons_plus__WEBPACK_IMPORTED_MODULE_7__.default,
    CogIcon: _icons_cog__WEBPACK_IMPORTED_MODULE_8__.default,
    TrashIcon: _icons_trash__WEBPACK_IMPORTED_MODULE_9__.default,
    ClockIcon: _icons_clock__WEBPACK_IMPORTED_MODULE_10__.default,
    ToggleSwitch: _components_toggle_switch_toggle_switch_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    Timerangepicker: _components_timerangepicker_timerangepicker_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    ArrowLeftIcon: _icons_arrow_left__WEBPACK_IMPORTED_MODULE_11__.default,
    MoreIcon: _icons_more__WEBPACK_IMPORTED_MODULE_12__.default,
    DollarSignIcon: _icons_dollar_sign__WEBPACK_IMPORTED_MODULE_13__.default,
    WindowPlusIcon: _icons_window_plus__WEBPACK_IMPORTED_MODULE_14__.default,
    CalendarIcon: _icons_calendar__WEBPACK_IMPORTED_MODULE_15__.default,
    VueSelect: _components_vue_select_vue_select_vue__WEBPACK_IMPORTED_MODULE_20__.default
  },
  directives: {
    tooltip: _js_directives_tooltip_js__WEBPACK_IMPORTED_MODULE_19__.default
  },
  data: function data() {
    return {
      packageItem: null,
      clonedPackage: null,
      selectedService: null,
      activeServicePosition: 0
    };
  },
  watch: {
    'selectedService.id': function selectedServiceId() {
      var _this = this;

      this.$nextTick(function () {
        var activeService = document.querySelector('.service-container.active');

        if (activeService) {
          _this.activeServicePosition = activeService.offsetTop + 1;
        }
      });
    },
    selectedCoachId: function selectedCoachId() {
      var _this2 = this;

      this.$nextTick(function () {
        var activeUser = document.querySelector('.user-container.active');

        if (activeUser) {
          _this2.activeServicePosition = activeUser.offsetTop + 1;
        }
      });
    },
    packageItem: function packageItem() {
      var _this3 = this;

      if (this.$root.intros.packages_show.enabled) {
        setTimeout(function () {
          if (!document.querySelector('.introjs-overlay')) {
            _this3.$root.intros.packages_show.intro.start();
          }
        }, 500);
      }
    }
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_21__.mapState)({
    services: function services(state) {
      return state.services.index;
    }
  })), {}, {
    servicesList: function servicesList() {
      var services = [];
      this.services.forEach(function (service) {
        if (service.is_available) {
          var serviceCopy = Object.assign({}, service);
          serviceCopy.bookings = 1;
          services.push({
            text: serviceCopy.name,
            value: serviceCopy
          });
        }
      });
      return services;
    }
  }),
  created: function created() {
    var _this4 = this;

    this.getPackage(this.$route.params.id).then(function (packageItem) {
      _this4.$root.contentloading = false;
      _this4.packageItem = packageItem;
      _this4.clonedPackage = Object.assign({}, packageItem);

      if (_this4.packageItem.services.length > 0) {
        _this4.selectedService = _this4.packageItem.services[0];
      }
    });
    this.getServices();
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_21__.mapActions)({
    getPackage: 'packages/show',
    deletePackage: 'packages/delete',
    getServices: 'services/index',
    updatePackage: 'packages/update'
  })), {}, {
    update: function update() {
      var _this5 = this;

      this.updatePackage(this.clonedPackage).then(function (packageItemData) {
        Object.keys(packageItemData).map(function (key) {
          _this5.packageItem[key] = packageItemData[key];
        });
      });
      this.$refs['editModal'].hide();
    },
    submit: function submit() {
      this.newPackage.expiration_date = dayjs__WEBPACK_IMPORTED_MODULE_16___default()(this.newPackage.expiration_date).format('YYYY-MM-DD');
      this.storePackage(this.newPackage);
      this.$refs['addModal'].hide();
    },
    formatDate: function formatDate(date) {
      return dayjs__WEBPACK_IMPORTED_MODULE_16___default()(date).format('MMMM D, YYYY');
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-left.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-left.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
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
  name: 'arrow-left'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/calendar.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/calendar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
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
  name: 'calendar'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/dollar-sign.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/dollar-sign.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
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
  name: 'dollar-sign'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'more'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/window-plus.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/window-plus.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
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
  name: 'window-plus'
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".btn-white[data-v-fb0e51e8] {\n  border-top-right-radius: -0.5rem !important;\n  border-bottom-right-radius: -0.5rem !important;\n}\n.label[data-v-fb0e51e8] {\n  border-top-left-radius: -0.5rem !important;\n  border-bottom-left-radius: -0.5rem !important;\n}\n.dropdown-menu[data-v-fb0e51e8] {\n  max-height: 250px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".dropdown .dropdown-item.active[data-v-51912a2e] {\n  font-weight: 600;\n}\n.dropdown .select_hidden_value[data-v-51912a2e] {\n  position: absolute;\n  z-index: -1;\n}\n.dropdown .dropdown-caret[data-v-51912a2e] {\n  fill: #adb5bd;\n  transition: all 0.1s ease-in-out;\n}\n.dropdown .dropdown-toggle:hover .dropdown-caret[data-v-51912a2e] {\n  fill: #5a5adf;\n}\n.dropdown.show .dropdown-toggle[data-v-51912a2e]:focus-within {\n  box-shadow: 0 0 0 0.05rem #5a5adf;\n  border-color: #5a5adf !important;\n}\n.dropdown.show .dropdown-toggle:focus-within .dropdown-caret[data-v-51912a2e] {\n  fill: #5a5adf;\n}\n.dropdown .placeholder-body[data-v-51912a2e]:not(:focus)::-moz-placeholder {\n  color: #000;\n}\n.dropdown .placeholder-body[data-v-51912a2e]:not(:focus):-ms-input-placeholder {\n  color: #000;\n}\n.dropdown .placeholder-body[data-v-51912a2e]:not(:focus)::placeholder {\n  color: #000;\n}\n.input-searchable[data-v-51912a2e] {\n  font-size: 16px;\n}\n.input-searchable[data-v-51912a2e]:not(:focus) {\n  cursor: pointer;\n}\n.visibility-hidden[data-v-51912a2e] {\n  visibility: hidden;\n}\n.scrollable-menu[data-v-51912a2e] {\n  max-height: 300px;\n  overflow-y: auto;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".multiline-ellipsis[data-v-afe4393a] {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.service-add[data-v-afe4393a] {\n  background-color: #f0f2f5;\n  transition: all 0.1s ease-in-out;\n  border: dashed 1px #adb5bd;\n}\n.badge-day[data-v-afe4393a] {\n  width: 25px;\n  height: 25px;\n}\n.service-day .chevron-down[data-v-afe4393a] {\n  fill: #adb5bd;\n  transition: all 0.1s ease-in-out;\n}\n.service-day .service-day-heading[aria-expanded=true] svg[data-v-afe4393a] {\n  transform: rotate(-180deg);\n  fill: black;\n}\n.service-day .service-day-heading:hover svg[data-v-afe4393a] {\n  fill: black;\n}\n.info[data-v-afe4393a] {\n  flex: 0 0 350px;\n}\n.service-description[data-v-afe4393a] {\n  font-size: 16px;\n}\n.user-profile-image-sm[data-v-afe4393a] {\n  width: 30px;\n  height: 30px;\n}\n.user-profile-image-sm span[data-v-afe4393a] {\n  font-size: 11px;\n}\n.service-more[data-v-afe4393a] {\n  top: 10px;\n  right: 5px;\n}\n.btn-add[data-v-afe4393a] {\n  border: dashed 1px #adb5bd;\n  transform: none !important;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip {\n  position: absolute;\n  width: auto;\n  white-space: nowrap;\n  font-weight: normal !important;\n  font-size: 13px;\n  pointer-events: none;\n  transition: opacity 0.25s;\n  opacity: 0;\n  z-index: 999;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip .tooltip-inner {\n  background: black;\n  color: white;\n  border-radius: 16px;\n  padding: 4px 10px;\n  overflow: hidden;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip .tooltip-arrow {\n  width: 0;\n  height: 0;\n  border-style: solid;\n  position: absolute;\n  border-color: black;\n  z-index: 1;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=top] {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=top] .tooltip-arrow {\n  border-width: 5px 5px 0 5px;\n  border-left-color: transparent !important;\n  border-right-color: transparent !important;\n  border-bottom-color: transparent !important;\n  bottom: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  margin-top: 0;\n  margin-bottom: 0;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=bottom] {\n  margin-top: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=bottom] .tooltip-arrow {\n  border-width: 0 5px 5px 5px;\n  border-left-color: transparent !important;\n  border-right-color: transparent !important;\n  border-top-color: transparent !important;\n  top: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  margin-top: 0;\n  margin-bottom: 0;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=right] {\n  margin-left: calc(100% + 7px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=right] .tooltip-arrow {\n  border-width: 5px 5px 5px 0;\n  border-left-color: transparent !important;\n  border-top-color: transparent !important;\n  border-bottom-color: transparent !important;\n  left: -4px;\n  top: 50%;\n  transform: translateY(-50%);\n  margin-left: 0;\n  margin-right: 0;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=left] {\n  right: calc(100% + 7px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[x-placement^=left] .tooltip-arrow {\n  border-width: 5px 0 5px 5px;\n  border-top-color: transparent !important;\n  border-right-color: transparent !important;\n  border-bottom-color: transparent !important;\n  right: -4px;\n  top: 50%;\n  transform: translateY(-50%);\n  margin-left: 0;\n  margin-right: 0;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip.popover .popover-inner {\n  background: #f9f9f9;\n  color: black;\n  padding: 24px;\n  border-radius: 5px;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip.popover .popover-arrow {\n  border-color: #f9f9f9;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[aria-hidden=true] {\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.15s, visibility 0.15s;\n}\n[data-v-afe4393a][data-tooltip-wrapper] .tooltip[aria-hidden=false] {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.15s;\n}\n[data-v-afe4393a][data-tooltip-wrapper]:hover .tooltip {\n  opacity: 1 !important;\n}\n.services-container[data-v-afe4393a] {\n  z-index: 2;\n}\n.service-dropdown[data-v-afe4393a] {\n  opacity: 0;\n  transition: all 0.1s ease-in-out;\n}\n.service-container:hover .service-dropdown[data-v-afe4393a] {\n  opacity: 1;\n}\n.active-package[data-v-afe4393a] {\n  transition: all 0.1s ease-in-out;\n  border-top-left-radius: 0.5rem;\n  border-bottom-left-radius: 0.5rem;\n  top: 72px;\n  left: 0;\n  height: 64px;\n  background-color: white;\n  box-shadow: 0 1px 2px rgba(92, 101, 112, 0.2);\n  z-index: 1;\n}\n.active-package[data-v-afe4393a]:after {\n  content: \"\";\n  height: 100%;\n  width: 5px;\n  background-color: white;\n  top: 0;\n  right: -5px;\n  position: absolute;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_timerangepicker_scss_vue_type_style_index_0_id_fb0e51e8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_timerangepicker_scss_vue_type_style_index_0_id_fb0e51e8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_timerangepicker_scss_vue_type_style_index_0_id_fb0e51e8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_select_scss_vue_type_style_index_0_id_51912a2e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_select_scss_vue_type_style_index_0_id_51912a2e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_select_scss_vue_type_style_index_0_id_51912a2e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_afe4393a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_afe4393a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_afe4393a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./Resources/components/timerangepicker/timerangepicker.vue":
/*!******************************************************************!*\
  !*** ./Resources/components/timerangepicker/timerangepicker.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _timerangepicker_vue_vue_type_template_id_fb0e51e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true& */ "./Resources/components/timerangepicker/timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true&");
/* harmony import */ var _timerangepicker_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timerangepicker.js?vue&type=script&lang=js& */ "./Resources/components/timerangepicker/timerangepicker.js?vue&type=script&lang=js&");
/* harmony import */ var _timerangepicker_scss_vue_type_style_index_0_id_fb0e51e8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss& */ "./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _timerangepicker_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _timerangepicker_vue_vue_type_template_id_fb0e51e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _timerangepicker_vue_vue_type_template_id_fb0e51e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "fb0e51e8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/timerangepicker/timerangepicker.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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

/***/ "./Resources/components/vue-select/vue-select.vue":
/*!********************************************************!*\
  !*** ./Resources/components/vue-select/vue-select.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _vue_select_vue_vue_type_template_id_51912a2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue-select.vue?vue&type=template&id=51912a2e&scoped=true& */ "./Resources/components/vue-select/vue-select.vue?vue&type=template&id=51912a2e&scoped=true&");
/* harmony import */ var _vue_select_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vue-select.js?vue&type=script&lang=js& */ "./Resources/components/vue-select/vue-select.js?vue&type=script&lang=js&");
/* harmony import */ var _vue_select_scss_vue_type_style_index_0_id_51912a2e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss& */ "./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _vue_select_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _vue_select_vue_vue_type_template_id_51912a2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _vue_select_vue_vue_type_template_id_51912a2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "51912a2e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/vue-select/vue-select.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/packages/show/show.vue":
/*!***************************************************************!*\
  !*** ./Resources/dashboard/components/packages/show/show.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _show_vue_vue_type_template_id_afe4393a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show.vue?vue&type=template&id=afe4393a&scoped=true& */ "./Resources/dashboard/components/packages/show/show.vue?vue&type=template&id=afe4393a&scoped=true&");
/* harmony import */ var _show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/packages/show/show.js?vue&type=script&lang=js&");
/* harmony import */ var _show_scss_vue_type_style_index_0_id_afe4393a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true& */ "./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _show_vue_vue_type_template_id_afe4393a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _show_vue_vue_type_template_id_afe4393a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "afe4393a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/packages/show/show.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/arrow-left.vue":
/*!****************************************!*\
  !*** ./Resources/icons/arrow-left.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _arrow_left_vue_vue_type_template_id_cbc7a990___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrow-left.vue?vue&type=template&id=cbc7a990& */ "./Resources/icons/arrow-left.vue?vue&type=template&id=cbc7a990&");
/* harmony import */ var _arrow_left_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow-left.vue?vue&type=script&lang=js& */ "./Resources/icons/arrow-left.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _arrow_left_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _arrow_left_vue_vue_type_template_id_cbc7a990___WEBPACK_IMPORTED_MODULE_0__.render,
  _arrow_left_vue_vue_type_template_id_cbc7a990___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/arrow-left.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/calendar.vue":
/*!**************************************!*\
  !*** ./Resources/icons/calendar.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _calendar_vue_vue_type_template_id_67038a2a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar.vue?vue&type=template&id=67038a2a& */ "./Resources/icons/calendar.vue?vue&type=template&id=67038a2a&");
/* harmony import */ var _calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar.vue?vue&type=script&lang=js& */ "./Resources/icons/calendar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _calendar_vue_vue_type_template_id_67038a2a___WEBPACK_IMPORTED_MODULE_0__.render,
  _calendar_vue_vue_type_template_id_67038a2a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/calendar.vue"
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

/***/ "./Resources/icons/dollar-sign.vue":
/*!*****************************************!*\
  !*** ./Resources/icons/dollar-sign.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _dollar_sign_vue_vue_type_template_id_2cc12791___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dollar-sign.vue?vue&type=template&id=2cc12791& */ "./Resources/icons/dollar-sign.vue?vue&type=template&id=2cc12791&");
/* harmony import */ var _dollar_sign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dollar-sign.vue?vue&type=script&lang=js& */ "./Resources/icons/dollar-sign.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _dollar_sign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _dollar_sign_vue_vue_type_template_id_2cc12791___WEBPACK_IMPORTED_MODULE_0__.render,
  _dollar_sign_vue_vue_type_template_id_2cc12791___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/dollar-sign.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/more.vue":
/*!**********************************!*\
  !*** ./Resources/icons/more.vue ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _more_vue_vue_type_template_id_03c9ea02___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./more.vue?vue&type=template&id=03c9ea02& */ "./Resources/icons/more.vue?vue&type=template&id=03c9ea02&");
/* harmony import */ var _more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./more.vue?vue&type=script&lang=js& */ "./Resources/icons/more.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _more_vue_vue_type_template_id_03c9ea02___WEBPACK_IMPORTED_MODULE_0__.render,
  _more_vue_vue_type_template_id_03c9ea02___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/more.vue"
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

/***/ "./Resources/icons/window-plus.vue":
/*!*****************************************!*\
  !*** ./Resources/icons/window-plus.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _window_plus_vue_vue_type_template_id_d50aaf8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./window-plus.vue?vue&type=template&id=d50aaf8c& */ "./Resources/icons/window-plus.vue?vue&type=template&id=d50aaf8c&");
/* harmony import */ var _window_plus_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window-plus.vue?vue&type=script&lang=js& */ "./Resources/icons/window-plus.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _window_plus_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _window_plus_vue_vue_type_template_id_d50aaf8c___WEBPACK_IMPORTED_MODULE_0__.render,
  _window_plus_vue_vue_type_template_id_d50aaf8c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/window-plus.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/components/timerangepicker/timerangepicker.js?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./Resources/components/timerangepicker/timerangepicker.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_timerangepicker_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/eslint-loader/dist/cjs.js!./timerangepicker.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/timerangepicker/timerangepicker.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_timerangepicker_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/components/vue-select/vue-select.js?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./Resources/components/vue-select/vue-select.js?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_vue_select_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/eslint-loader/dist/cjs.js!./vue-select.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/components/vue-select/vue-select.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_vue_select_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/dashboard/components/packages/show/show.js?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./Resources/dashboard/components/packages/show/show.js?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/eslint-loader/dist/cjs.js!./show.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/packages/show/show.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/arrow-left.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/arrow-left.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_left_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./arrow-left.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-left.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_left_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/calendar.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./Resources/icons/calendar.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./calendar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/calendar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/dollar-sign.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./Resources/icons/dollar-sign.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dollar_sign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./dollar-sign.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/dollar-sign.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dollar_sign_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/more.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./Resources/icons/more.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./more.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/window-plus.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./Resources/icons/window-plus.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_window_plus_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./window-plus.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/window-plus.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_window_plus_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss&":
/*!*****************************************************************************************************************************!*\
  !*** ./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss& ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_timerangepicker_scss_vue_type_style_index_0_id_fb0e51e8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/timerangepicker/timerangepicker.scss?vue&type=style&index=0&id=fb0e51e8&scoped=true&lang=scss&");


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

/***/ "./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss&":
/*!*******************************************************************************************************************!*\
  !*** ./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss& ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_vue_select_scss_vue_type_style_index_0_id_51912a2e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/components/vue-select/vue-select.scss?vue&type=style&index=0&id=51912a2e&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_afe4393a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/packages/show/show.scss?vue&type=style&index=0&id=afe4393a&lang=scss&scoped=true&");


/***/ }),

/***/ "./Resources/components/timerangepicker/timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./Resources/components/timerangepicker/timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true& ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_timerangepicker_vue_vue_type_template_id_fb0e51e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_timerangepicker_vue_vue_type_template_id_fb0e51e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_timerangepicker_vue_vue_type_template_id_fb0e51e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/timerangepicker/timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true&");


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

/***/ "./Resources/components/vue-select/vue-select.vue?vue&type=template&id=51912a2e&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./Resources/components/vue-select/vue-select.vue?vue&type=template&id=51912a2e&scoped=true& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_select_vue_vue_type_template_id_51912a2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_select_vue_vue_type_template_id_51912a2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_select_vue_vue_type_template_id_51912a2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vue-select.vue?vue&type=template&id=51912a2e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-select/vue-select.vue?vue&type=template&id=51912a2e&scoped=true&");


/***/ }),

/***/ "./Resources/dashboard/components/packages/show/show.vue?vue&type=template&id=afe4393a&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./Resources/dashboard/components/packages/show/show.vue?vue&type=template&id=afe4393a&scoped=true& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_afe4393a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_afe4393a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_afe4393a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./show.vue?vue&type=template&id=afe4393a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/packages/show/show.vue?vue&type=template&id=afe4393a&scoped=true&");


/***/ }),

/***/ "./Resources/icons/arrow-left.vue?vue&type=template&id=cbc7a990&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/arrow-left.vue?vue&type=template&id=cbc7a990& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_left_vue_vue_type_template_id_cbc7a990___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_left_vue_vue_type_template_id_cbc7a990___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_left_vue_vue_type_template_id_cbc7a990___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./arrow-left.vue?vue&type=template&id=cbc7a990& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-left.vue?vue&type=template&id=cbc7a990&");


/***/ }),

/***/ "./Resources/icons/calendar.vue?vue&type=template&id=67038a2a&":
/*!*********************************************************************!*\
  !*** ./Resources/icons/calendar.vue?vue&type=template&id=67038a2a& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_template_id_67038a2a___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_template_id_67038a2a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_template_id_67038a2a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./calendar.vue?vue&type=template&id=67038a2a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/calendar.vue?vue&type=template&id=67038a2a&");


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

/***/ "./Resources/icons/dollar-sign.vue?vue&type=template&id=2cc12791&":
/*!************************************************************************!*\
  !*** ./Resources/icons/dollar-sign.vue?vue&type=template&id=2cc12791& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dollar_sign_vue_vue_type_template_id_2cc12791___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dollar_sign_vue_vue_type_template_id_2cc12791___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dollar_sign_vue_vue_type_template_id_2cc12791___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./dollar-sign.vue?vue&type=template&id=2cc12791& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/dollar-sign.vue?vue&type=template&id=2cc12791&");


/***/ }),

/***/ "./Resources/icons/more.vue?vue&type=template&id=03c9ea02&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/more.vue?vue&type=template&id=03c9ea02& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_more_vue_vue_type_template_id_03c9ea02___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_more_vue_vue_type_template_id_03c9ea02___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_more_vue_vue_type_template_id_03c9ea02___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./more.vue?vue&type=template&id=03c9ea02& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more.vue?vue&type=template&id=03c9ea02&");


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

/***/ "./Resources/icons/window-plus.vue?vue&type=template&id=d50aaf8c&":
/*!************************************************************************!*\
  !*** ./Resources/icons/window-plus.vue?vue&type=template&id=d50aaf8c& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_window_plus_vue_vue_type_template_id_d50aaf8c___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_window_plus_vue_vue_type_template_id_d50aaf8c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_window_plus_vue_vue_type_template_id_d50aaf8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./window-plus.vue?vue&type=template&id=d50aaf8c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/window-plus.vue?vue&type=template&id=d50aaf8c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/timerangepicker/timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/timerangepicker/timerangepicker.vue?vue&type=template&id=fb0e51e8&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "d-flex align-items-stretch" }, [
      _c(
        "div",
        { staticClass: "rounded border w-50 mr-1 flex-grow-1 bg-white" },
        [
          _c(
            "div",
            {
              ref: "start",
              staticClass:
                "position-relative dropdown d-flex align-items-stretch"
            },
            [
              _c("div", { staticClass: "text-gray p-2 label" }, [
                _vm._v("From")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "w-100 position-static" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-white shadow-none border-0 h-100 btn-block",
                    class: { "text-gray": !_vm.time_start },
                    attrs: {
                      "data-toggle": "dropdown",
                      "data-offset": "-50,0",
                      type: "button"
                    }
                  },
                  [
                    _vm._v(
                      _vm._s(_vm.time_start ? _vm.time_start.label : "Set time")
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "dropdown-start",
                    staticClass:
                      "dropdown-menu w-100 px-1 overflow-auto bg-light"
                  },
                  [
                    _vm.startHours.length == 0
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "text-gray text-center small font-weight-light line-height-sm"
                          },
                          [_vm._v("There are no hours available")]
                        )
                      : _c(
                          "div",
                          { staticClass: "d-flex flex-wrap" },
                          _vm._l(_vm.startHours, function(hour, hourIndex) {
                            return _c(
                              "div",
                              { key: hourIndex, staticClass: "w-50 p-1" },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-white btn-sm btn-block p-1 border",
                                    class: { active: _vm.time_start == hour },
                                    attrs: {
                                      id: "start-" + hour.time.replace(":", ""),
                                      type: "button"
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.time_start = hour
                                        _vm.update()
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t" +
                                        _vm._s(hour.label) +
                                        "\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                )
                              ]
                            )
                          }),
                          0
                        )
                  ]
                )
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "rounded border w-50 mr-1 flex-grow-1 bg-white" },
        [
          _c(
            "div",
            {
              ref: "end",
              staticClass:
                "position-relative dropdown d-flex align-items-stretch"
            },
            [
              _c("div", { staticClass: "text-gray p-2 label" }, [_vm._v("To")]),
              _vm._v(" "),
              _c("div", { staticClass: "w-100 position-static" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-white shadow-none border-0 h-100 btn-block",
                    class: { "text-gray": !_vm.time_end },
                    attrs: {
                      "data-toggle": "dropdown",
                      "data-display": "static",
                      type: "button"
                    }
                  },
                  [
                    _vm._v(
                      _vm._s(_vm.time_end ? _vm.time_end.label : "Set time")
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "dropdown-end",
                    staticClass:
                      "dropdown-menu w-100 px-1 overflow-auto bg-light"
                  },
                  [
                    _vm.endHours.length == 0
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "text-gray text-center small font-weight-light line-height-sm"
                          },
                          [_vm._v("There are no hours available")]
                        )
                      : _c(
                          "div",
                          { staticClass: "d-flex flex-wrap" },
                          _vm._l(_vm.endHours, function(hour, endHourIndex) {
                            return _c(
                              "div",
                              { key: endHourIndex, staticClass: "w-50 p-1" },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-white btn-sm btn-block p-1 border",
                                    class: { active: _vm.time_end == hour },
                                    attrs: {
                                      id: "end-" + hour.time.replace(":", ""),
                                      type: "button"
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.time_end = hour
                                        _vm.update()
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t" +
                                        _vm._s(hour.label) +
                                        "\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                )
                              ]
                            )
                          }),
                          0
                        )
                  ]
                )
              ])
            ]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-select/vue-select.vue?vue&type=template&id=51912a2e&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/vue-select/vue-select.vue?vue&type=template&id=51912a2e&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { class: _vm.container_class }, [
    _c(
      "div",
      {
        ref: "dropdown",
        staticClass: "dropdown",
        class: _vm.drop,
        attrs: { disabled: _vm.disabled }
      },
      [
        _c(
          "button",
          {
            ref: "dropdown-toggle",
            staticClass:
              "btn dropdown-toggle text-left d-inline-flex align-items-center",
            class: _vm.toggle_button_class,
            attrs: {
              type: "button",
              disabled: _vm.disabled,
              "data-toggle": "dropdown"
            }
          },
          [
            _vm.label
              ? _c("span", { staticClass: "text-secondary mr-2" }, [
                  _vm._v(_vm._s(_vm.label))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.searchable
              ? [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.search,
                        expression: "search"
                      }
                    ],
                    ref: "input-searchable",
                    staticClass:
                      "p-0 shadow-none border-0 outline-0 input-searchable w-100 bg-transparent line-height-1 font-smoothing-auto",
                    attrs: {
                      type: "text",
                      spellcheck: "false",
                      placeholder: _vm.select_placeholder,
                      "data-required": _vm.required
                    },
                    domProps: { value: _vm.search },
                    on: {
                      focus: _vm.inputFocused,
                      blur: _vm.inputBlurred,
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.search = $event.target.value
                      }
                    }
                  })
                ]
              : [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.selected_value,
                        expression: "selected_value"
                      }
                    ],
                    staticClass: "select_hidden_value d-none",
                    attrs: {
                      type: "text",
                      "data-required": _vm.required,
                      "data-parent": ".dropdown-toggle"
                    },
                    domProps: { value: _vm.selected_value },
                    on: {
                      focus: _vm.inputFocused,
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.selected_value = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "text-ellipsis",
                      class: {
                        "text-muted":
                          !_vm.selected_value || _vm.selected_value.length == 0
                      }
                    },
                    [_vm._v(_vm._s(_vm.select_placeholder))]
                  )
                ],
            _vm._v(" "),
            _vm.caret
              ? _c(
                  "div",
                  { staticClass: "ml-auto line-height-0" },
                  [
                    _c("chevron-down-icon", {
                      staticClass: "ml-2 dropdown-caret",
                      attrs: { width: "8", height: "8", transform: "scale(3)" }
                    })
                  ],
                  1
                )
              : _vm._e()
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "dropdown-menu",
            staticClass: "bg-white dropdown-menu",
            class: [_vm.dropdown_class],
            attrs: {
              hidden: _vm.filtered_options.length == 0 && _vm.suggestion
            }
          },
          [
            _c(
              "div",
              { ref: "scrollable-menu", staticClass: "scrollable-menu" },
              [
                _vm.filtered_options.length == 0
                  ? _c(
                      "span",
                      {
                        staticClass:
                          "dropdown-item disabled pl-3 font-weight-light"
                      },
                      [
                        _vm.show_no_results
                          ? _c("span", { staticClass: "text-muted" }, [
                              _vm._v("No results found")
                            ])
                          : _vm._e()
                      ]
                    )
                  : _vm._l(_vm.filtered_options, function(option, index) {
                      return _c(
                        "span",
                        {
                          key: index,
                          staticClass: "dropdown-item cursor-pointer",
                          class: {
                            active:
                              !_vm.multiple &&
                              option.value == _vm.selected_value
                          },
                          attrs: { id: "item-" + option.value },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.updateValue(option)
                            }
                          }
                        },
                        [
                          _vm.multiple
                            ? _c("vue-checkbox", {
                                attrs: {
                                  value: (_vm.selected_value || []).find(
                                    function(x) {
                                      return (
                                        x == option.value ||
                                        (x.id &&
                                          option.value.id &&
                                          x.id == option.value.id)
                                      )
                                    }
                                  ),
                                  label: option.text
                                }
                              })
                            : _c("span", [_vm._v(_vm._s(option.text))])
                        ],
                        1
                      )
                    })
              ],
              2
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/packages/show/show.vue?vue&type=template&id=afe4393a&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/packages/show/show.vue?vue&type=template&id=afe4393a&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.packageItem
    ? _c(
        "div",
        { staticClass: "h-100" },
        [
          _c("div", { staticClass: "d-flex h-100 overflow-hidden" }, [
            _c("div", { staticClass: "p-4 flex-grow-1 overflow-auto" }, [
              _c("div", { staticClass: "d-flex" }, [
                _c("div", [
                  _c(
                    "button",
                    {
                      staticClass: "btn p-1 btn-white badge-pill shadow-sm",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.$router.push("/dashboard/packages")
                        }
                      }
                    },
                    [
                      _c("arrow-left-icon", {
                        attrs: { width: "30", height: "30" }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown ml-auto" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn p-2 btn-white badge-pill shadow-sm",
                      attrs: {
                        "data-toggle": "dropdown",
                        "data-offset": "-130, 10",
                        "data-intro": _vm.$root.intros.packages_show.steps[2],
                        "data-step": "3"
                      }
                    },
                    [
                      _c("more-icon", {
                        attrs: {
                          width: "20",
                          height: "20",
                          transform: "scale(0.75)"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "dropdown-menu" }, [
                    _c(
                      "span",
                      {
                        staticClass: "dropdown-item cursor-pointer",
                        on: {
                          click: function($event) {
                            _vm.clonedPackage = Object.assign(
                              {},
                              _vm.packageItem
                            )
                            _vm.$refs["editModal"].show()
                          }
                        }
                      },
                      [_vm._v("\n\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t")]
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "dropdown-item cursor-pointer",
                        on: {
                          click: function($event) {
                            return _vm.$refs["deleteModal"].show()
                          }
                        }
                      },
                      [_vm._v("\n\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t")]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "mt-4" }, [
                _c("h1", { staticClass: "font-heading h3" }, [
                  _vm._v(_vm._s(_vm.packageItem.name))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "service-description mb-3" }, [
                  _vm._v(_vm._s(_vm.packageItem.description))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c(
                    "div",
                    { staticClass: "d-flex align-items-center " },
                    [
                      _c("dollar-sign-icon", {
                        attrs: {
                          width: "8",
                          height: "8",
                          transform: "scale(2.4)"
                        }
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "ml-1" }, [
                        _vm._v(
                          _vm._s(parseFloat(_vm.packageItem.price).toFixed(2))
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex align-items-center ml-4" },
                    [
                      _c("calendar-icon", {
                        attrs: {
                          width: "8",
                          height: "8",
                          transform: "scale(2)"
                        }
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "ml-2" }, [
                        _vm._v(
                          _vm._s(
                            _vm.formatDate(_vm.packageItem.expiration_date)
                          )
                        )
                      ])
                    ],
                    1
                  )
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "mt-4 d-flex" }, [
                _c("div", { staticClass: "position-relative" }, [
                  _c(
                    "div",
                    { staticClass: "position-relative services-container" },
                    _vm._l(_vm.packageItem.services, function(service, index) {
                      return _c(
                        "div",
                        {
                          key: service.id,
                          staticClass:
                            "pl-2 py-2 cursor-pointer position-relative service-container",
                          class: {
                            active: _vm.selectedService.id == service.id
                          },
                          on: {
                            click: function($event) {
                              _vm.selectedService = service
                            }
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "d-flex align-items-center py-1 pl-1",
                              attrs: {
                                "data-intro":
                                  index == 0
                                    ? _vm.$root.intros.packages_show.steps[0]
                                    : null,
                                "data-step": index == 0 ? 1 : null
                              }
                            },
                            [
                              _c("div", [
                                _c("h6", { staticClass: "mb-1" }, [
                                  _vm._v(_vm._s(service.name))
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "d-flex align-items-center" },
                                  [
                                    _c("clock-icon", {
                                      attrs: {
                                        width: "11",
                                        height: "11",
                                        transform: "scale(1.5)",
                                        fill: "#6c757d"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "small",
                                      { staticClass: "text-muted ml-1" },
                                      [
                                        _vm._v(
                                          _vm._s(service.duration) + " min"
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "dropdown mr-1 pl-1 ml-auto service-dropdown"
                                },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-white line-height-0 p-1 badge-pill shadow-none",
                                      attrs: {
                                        "data-toggle": "dropdown",
                                        "data-offset": "-140, 0"
                                      }
                                    },
                                    [
                                      _c("more-icon", {
                                        staticClass: "fill-gray",
                                        attrs: {
                                          width: "20",
                                          height: "20",
                                          transform: "scale(0.75)"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "dropdown-menu" },
                                    [
                                      _c(
                                        "router-link",
                                        {
                                          staticClass:
                                            "dropdown-item cursor-pointer",
                                          attrs: {
                                            tag: "span",
                                            to:
                                              "/dashboard/bookings/services/" +
                                              service.id
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\t\t\t\tView Service\n\t\t\t\t\t\t\t\t\t\t\t"
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "dropdown-item cursor-pointer",
                                          on: {
                                            click: function($event) {
                                              return _vm.removeAssignedService(
                                                service,
                                                index
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\t\t\t\tRemove\n\t\t\t\t\t\t\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "active-package position-absolute w-100",
                    style: { top: _vm.activeServicePosition + "px" }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "p-3 flex-1 bg-white shadow-sm position-relative rounded"
                  },
                  _vm._l(
                    new Array(parseInt(_vm.selectedService.bookings)),
                    function(block, index) {
                      return _c(
                        "div",
                        { key: index, staticClass: "px-1 mb-2 d-inline-block" },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "bg-primary rounded text-white py-3 px-4 cursor-pointerx"
                            },
                            [
                              _c("h6", { staticClass: "font-heading mb-0" }, [
                                _vm._v(
                                  _vm._s(_vm.selectedService.duration) + " min"
                                )
                              ])
                            ]
                          )
                        ]
                      )
                    }
                  ),
                  0
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "modal",
            {
              ref: "editModal",
              attrs: { "close-button": false, size: "modal-lg" }
            },
            [
              _c("h5", { staticClass: "font-heading mb-3" }, [
                _vm._v("Edit Package")
              ]),
              _vm._v(" "),
              _vm.clonedPackage
                ? _c("vue-form-validate", { on: { submit: _vm.update } }, [
                    _c("div", { staticClass: "row mx-0 mb-2" }, [
                      _c("div", { staticClass: "col-md-6 pl-0" }, [
                        _c("fieldset", [
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Package name")
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.clonedPackage.name,
                                  expression: "clonedPackage.name"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text", "data-required": "" },
                              domProps: { value: _vm.clonedPackage.name },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.clonedPackage,
                                    "name",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Description")
                            ]),
                            _vm._v(" "),
                            _c("textarea", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.clonedPackage.description,
                                  expression: "clonedPackage.description"
                                }
                              ],
                              staticClass: "form-control resize-none",
                              attrs: { "data-required": "", rows: "3" },
                              domProps: {
                                value: _vm.clonedPackage.description
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.clonedPackage,
                                    "description",
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
                              _c("label", { staticClass: "form-label" }, [
                                _vm._v("Expires on")
                              ]),
                              _vm._v(" "),
                              _c("v-date-picker", {
                                attrs: {
                                  "min-date": new Date(),
                                  popover: {
                                    placement: "bottom",
                                    visibility: "click"
                                  }
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "default",
                                      fn: function(ref) {
                                        var inputValue = ref.inputValue
                                        var inputEvents = ref.inputEvents
                                        return [
                                          _c(
                                            "div",
                                            _vm._g(
                                              {
                                                staticClass: "form-control",
                                                attrs: { type: "button" }
                                              },
                                              inputEvents
                                            ),
                                            [
                                              inputValue
                                                ? _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.formatDate(
                                                          inputValue
                                                        )
                                                      )
                                                    )
                                                  ])
                                                : _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-muted font-weight-normal"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Set expiration date"
                                                      )
                                                    ]
                                                  )
                                            ]
                                          )
                                        ]
                                      }
                                    }
                                  ],
                                  null,
                                  false,
                                  1133394587
                                ),
                                model: {
                                  value: _vm.clonedPackage.expiration_date,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.clonedPackage,
                                      "expiration_date",
                                      $$v
                                    )
                                  },
                                  expression: "clonedPackage.expiration_date"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Package Total")
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.clonedPackage.price,
                                  expression: "clonedPackage.price"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "number",
                                step: "0.01",
                                placeholder: "Package Price"
                              },
                              domProps: { value: _vm.clonedPackage.price },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.clonedPackage,
                                    "price",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "col-md-6 border-left pr-0 border-gray-200"
                        },
                        [
                          _c("h6", { staticClass: "font-heading" }, [
                            _vm._v("Services")
                          ]),
                          _vm._v(" "),
                          _c("vue-select", {
                            attrs: {
                              options: _vm.servicesList,
                              multiple: "",
                              "data-required": "",
                              placeholder: "Select service"
                            },
                            model: {
                              value: _vm.clonedPackage.services,
                              callback: function($$v) {
                                _vm.$set(_vm.clonedPackage, "services", $$v)
                              },
                              expression: "clonedPackage.services"
                            }
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.clonedPackage.services, function(
                            service,
                            index
                          ) {
                            return _c(
                              "div",
                              {
                                key: service.id,
                                staticClass:
                                  "rounded bg-light px-3 py-2 mt-2 d-flex align-items-center"
                              },
                              [
                                _c("h6", { staticClass: "mb-1" }, [
                                  _vm._v(_vm._s(service.name))
                                ]),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value:
                                        _vm.clonedPackage.services[index]
                                          .bookings,
                                      expression:
                                        "clonedPackage.services[index].bookings"
                                    }
                                  ],
                                  staticClass: "form-control w-25 ml-auto",
                                  attrs: {
                                    type: "number",
                                    "data-required": "",
                                    placeholder: "Bookings",
                                    min: "1",
                                    value: "1"
                                  },
                                  domProps: {
                                    value:
                                      _vm.clonedPackage.services[index].bookings
                                  },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.clonedPackage.services[index],
                                        "bookings",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]
                            )
                          })
                        ],
                        2
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "form-group" },
                      [
                        _c("vue-checkbox", {
                          attrs: { label: "Available in widget" },
                          model: {
                            value: _vm.clonedPackage.in_widget,
                            callback: function($$v) {
                              _vm.$set(_vm.clonedPackage, "in_widget", $$v)
                            },
                            expression: "clonedPackage.in_widget"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex align-items-center" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-light shadow-none",
                          attrs: { type: "button", "data-dismiss": "modal" }
                        },
                        [_vm._v("\n\t\t\t\t\t\tCancel\n\t\t\t\t\t")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "ml-auto btn btn-primary",
                          attrs: { type: "submit" }
                        },
                        [_vm._v("Update")]
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
            { ref: "deleteModal", attrs: { "close-button": false } },
            [
              _vm.packageItem
                ? [
                    _c("h5", { staticClass: "font-heading text-center" }, [
                      _vm._v("Delete Service")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-center mt-3" }, [
                      _vm._v(
                        "\n\t\t\t\t\tAre you sure to delete the package\n\t\t\t\t\t"
                      ),
                      _c("strong", [_vm._v(_vm._s(_vm.packageItem.name))]),
                      _vm._v("\n\t\t\t\t\t?\n\t\t\t\t\t"),
                      _c("br"),
                      _vm._v(" "),
                      _c("span", { staticClass: "text-danger" }, [
                        _vm._v("This action cannot be undone")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-light shadow-none",
                          attrs: { type: "button", "data-dismiss": "modal" }
                        },
                        [_vm._v("\n\t\t\t\t\t\tCancel\n\t\t\t\t\t")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-danger ml-auto",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm
                                .deletePackage(_vm.packageItem)
                                .then(function() {
                                  return _vm.$router.push(
                                    "/dashboard/bookings/packages"
                                  )
                                })
                              _vm.$refs["deleteModal"].hide()
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\t\tDelete\n\t\t\t\t\t")]
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
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-left.vue?vue&type=template&id=cbc7a990&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-left.vue?vue&type=template&id=cbc7a990& ***!
  \**************************************************************************************************************************************************************************************************************/
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
            "M8.70710678,12 L18.5,12 C18.7761424,12 19,12.2238576 19,12.5 C19,12.7761424 18.7761424,13 18.5,13 L8.70710678,13 L11.8535534,16.1464466 C12.0488155,16.3417088 12.0488155,16.6582912 11.8535534,16.8535534 C11.6582912,17.0488155 11.3417088,17.0488155 11.1464466,16.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 L11.1464466,8.14644661 C11.3417088,7.95118446 11.6582912,7.95118446 11.8535534,8.14644661 C12.0488155,8.34170876 12.0488155,8.65829124 11.8535534,8.85355339 L8.70710678,12 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/calendar.vue?vue&type=template&id=67038a2a&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/calendar.vue?vue&type=template&id=67038a2a& ***!
  \************************************************************************************************************************************************************************************************************/
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
            "M16,4 L8,4 L8,4.5 C8,4.77614237 7.77614237,5 7.5,5 C7.22385763,5 7,4.77614237 7,4.5 L7,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,8 L20,8 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L17,4 L17,4.5 C17,4.77614237 16.7761424,5 16.5,5 C16.2238576,5 16,4.77614237 16,4.5 L16,4 Z M17,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5073514 C21,19.8880632 19.8807119,21.0073514 18.5,21.0073514 L5.5,21.0073514 C4.11928813,21.0073514 3,19.8880632 3,18.5073514 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L7,3 L7,2.5 C7,2.22385763 7.22385763,2 7.5,2 C7.77614237,2 8,2.22385763 8,2.5 L8,3 L16,3 L16,2.5 C16,2.22385763 16.2238576,2 16.5,2 C16.7761424,2 17,2.22385763 17,2.5 L17,3 Z M20,9 L4,9 L4,18.5073514 C4,19.3357785 4.67157288,20.0073514 5.5,20.0073514 L18.5,20.0073514 C19.3284271,20.0073514 20,19.3357785 20,18.5073514 L20,9 L20,9 Z"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/dollar-sign.vue?vue&type=template&id=2cc12791&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/dollar-sign.vue?vue&type=template&id=2cc12791& ***!
  \***************************************************************************************************************************************************************************************************************/
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
            "M14,6 L15.5,6 C16.8807119,6 18,7.11928813 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 C17.2238576,9 17,8.77614237 17,8.5 C17,7.67157288 16.3284271,7 15.5,7 L8.5,7 C7.67157288,7 7,7.67157288 7,8.5 L7,9.67357072 C7,10.4493755 7.59157764,11.0971725 8.36419638,11.1674105 L15.7263394,11.8366963 C17.0140373,11.9537597 18,13.0334213 18,14.3264293 L18,15.5 C18,16.8807119 16.8807119,18 15.5,18 L14,18 L14,19.5 C14,19.7761424 13.7761424,20 13.5,20 C13.2238576,20 13,19.7761424 13,19.5 L13,18 L11,18 L11,19.5 C11,19.7761424 10.7761424,20 10.5,20 C10.2238576,20 10,19.7761424 10,19.5 L10,18 L8.5,18 C7.11928813,18 6,16.8807119 6,15.5 C6,15.2238576 6.22385763,15 6.5,15 C6.77614237,15 7,15.2238576 7,15.5 C7,16.3284271 7.67157288,17 8.5,17 L15.5,17 C16.3284271,17 17,16.3284271 17,15.5 L17,14.3264293 C17,13.5506245 16.4084224,12.9028275 15.6358036,12.8325895 L8.27366063,12.1633037 C6.98596274,12.0462403 6,10.9665787 6,9.67357072 L6,8.5 C6,7.11928813 7.11928813,6 8.5,6 L10,6 L10,4.5 C10,4.22385763 10.2238576,4 10.5,4 C10.7761424,4 11,4.22385763 11,4.5 L11,6 L13,6 L13,4.5 C13,4.22385763 13.2238576,4 13.5,4 C13.7761424,4 14,4.22385763 14,4.5 L14,6 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more.vue?vue&type=template&id=03c9ea02&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/more.vue?vue&type=template&id=03c9ea02& ***!
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
        width: "3",
        height: "11",
        viewBox: "0 0 3 11"
      }
    },
    [
      _c("g", [
        _c("path", {
          attrs: {
            "fill-rule": "evenodd",
            d:
              "M1.34444874 0h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444874 0 .74202145-.60242728 1.34444873-1.34444873 1.34444873h-.0888935C.60242728 2.68889747 0 2.0864702 0 1.34444874 0 .60242728.60242728 0 1.34444874 0z"
          }
        }),
        _vm._v(" "),
        _c("path", {
          attrs: {
            "fill-rule": "evenodd",
            d:
              "M1.34444874 4.25333331h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444874 0 .74202145-.60242728 1.34444873-1.34444873 1.34444873h-.0888935C.60242728 6.94223078 0 6.3398035 0 5.59778205 0 4.85576059.60242728 4.2533333 1.34444874 4.2533333z"
          }
        }),
        _vm._v(" "),
        _c("path", {
          attrs: {
            "fill-rule": "evenodd",
            d:
              "M1.34444874 8.31112253h.0888935c.74202145 0 1.34444873.60242728 1.34444873 1.34444873 0 .74202146-.60242728 1.34444874-1.34444873 1.34444874h-.0888935C.60242728 11.00002 0 10.39759272 0 9.65557126c0-.74202145.60242728-1.34444873 1.34444874-1.34444873z"
          }
        })
      ])
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/window-plus.vue?vue&type=template&id=d50aaf8c&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/window-plus.vue?vue&type=template&id=d50aaf8c& ***!
  \***************************************************************************************************************************************************************************************************************/
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
            "M13.5,21.008331 L5.5,21.008331 C4.11928813,21.008331 3,19.8890429 3,18.508331 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L18.5071085,3 C19.8878203,3 21.0071085,4.11928813 21.0071085,5.5 L21.0071085,13.5 C21.0071085,13.7761424 20.7832508,14 20.5071085,14 C20.2309661,14 20.0071085,13.7761424 20.0071085,13.5 L20.0071085,8 L4,8 L4,18.508331 C4,19.3367581 4.67157288,20.008331 5.5,20.008331 L13.5,20.008331 C13.7761424,20.008331 14,20.2321886 14,20.508331 C14,20.7844734 13.7761424,21.008331 13.5,21.008331 Z M20.0071085,7 L20.0071085,5.5 C20.0071085,4.67157288 19.3355356,4 18.5071085,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,7 L20.0071085,7 Z M5,5 L6,5 L6,6 L5,6 L5,5 Z M7,5 L8,5 L8,6 L7,6 L7,5 Z M9,5 L10,5 L10,6 L9,6 L9,5 Z M19,18 L20.5,18 C20.7761424,18 21,18.2238576 21,18.5 C21,18.7761424 20.7761424,19 20.5,19 L19,19 L19,20.5 C19,20.7761424 18.7761424,21 18.5,21 C18.2238576,21 18,20.7761424 18,20.5 L18,19 L16.5,19 C16.2238576,19 16,18.7761424 16,18.5 C16,18.2238576 16.2238576,18 16.5,18 L18,18 L18,16.5 C18,16.2238576 18.2238576,16 18.5,16 C18.7761424,16 19,16.2238576 19,16.5 L19,18 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-paginate/dist/vue-paginate.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-paginate/dist/vue-paginate.js ***!
  \********************************************************/
/***/ (function(module) {

/**
 * vue-paginate v3.6.0
 * (c) 2018 Taha Shashtari
 * @license MIT
 */
(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, function () { 'use strict';

  var warn = function () {}
  var formatComponentName

  var hasConsole = typeof console !== 'undefined'

  warn = function (msg, vm, type) {
    if ( type === void 0 ) type = 'error';

    if (hasConsole) {
      console[type]("[vue-paginate]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
        ))
    }
  }

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
    ? vm.$options.name || vm.$options._componentTag
    : vm.name
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
      )
  }

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages."
    }
    return ("\n(found in " + str + ")")
  }

  var Paginate = {
    name: 'paginate',
    props: {
      name: {
        type: String,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      per: {
        type: Number,
        default: 3,
        validator: function validator (value) {
          return value > 0
        }
      },
      tag: {
        type: String,
        default: 'ul'
      },
      container: {
        type: Object,
        default: null
      }
    },
    data: function data () {
      return {
        initialListSize: this.list.length
      }
    },
    computed: {
      parent: function parent () {
        return this.container ? this.container : this.$parent
      },
      currentPage: {
        get: function get () {
          if (this.parent.paginate[this.name]) {
            return this.parent.paginate[this.name].page
          }
        },
        set: function set (page) {
          this.parent.paginate[this.name].page = page
        }
      },
      pageItemsCount: function pageItemsCount () {
        var numOfItems = this.list.length
        var first = this.currentPage * this.per + 1
        var last = Math.min((this.currentPage * this.per) + this.per, numOfItems)
        return (first + "-" + last + " of " + numOfItems)
      },

      lastPage: function lastPage () {
        return Math.ceil(this.list.length / this.per)
      }
    },
    mounted: function mounted () {
      if (this.per <= 0) {
        warn(("<paginate name=\"" + (this.name) + "\"> 'per' prop can't be 0 or less."), this.parent)
      }
      if (!this.parent.paginate[this.name]) {
        warn(("'" + (this.name) + "' is not registered in 'paginate' array."), this.parent)
        return
      }
      this.paginateList()
    },
    watch: {
      currentPage: function currentPage () {
        this.paginateList()
      },
      list: function list () {
        if (this.currentPage >= this.lastPage) {
          this.currentPage = this.lastPage - 1
        }
        this.paginateList()
      },
      per: function per () {
        this.currentPage = 0
        this.paginateList()
      }
    },
    methods: {
      paginateList: function paginateList () {
        var index = this.currentPage * this.per
        var paginatedList = this.list.slice(index, index + this.per)
        this.parent.paginate[this.name].list = paginatedList
      },
      goToPage: function goToPage (page) {
        var lastPage = Math.ceil(this.list.length / this.per)
        if (page > lastPage) {
          warn(("You cannot go to page " + page + ". The last page is " + lastPage + "."), this.parent)
          return
        }
        this.currentPage = page - 1
      }
    },
    render: function render (h) {
      return h(this.tag, {}, this.$slots.default)
    }
  }

  var LEFT_ARROW = '«'
  var RIGHT_ARROW = '»'
  var ELLIPSES = '…'

  var LimitedLinksGenerator = function LimitedLinksGenerator (listOfPages, currentPage, limit) {
    this.listOfPages = listOfPages
    this.lastPage = listOfPages.length - 1
    this.currentPage = currentPage === this.lastPage
      ? this.lastPage - 1
      : currentPage
    this.limit = limit
  };

  LimitedLinksGenerator.prototype.generate = function generate () {
    var firstHalf = this._buildFirstHalf()
    var secondHalf = this._buildSecondHalf()
    return firstHalf.concat( secondHalf)
  };

  LimitedLinksGenerator.prototype._buildFirstHalf = function _buildFirstHalf () {
    var firstHalf = this._allPagesButLast()
      .slice(
        this._currentChunkIndex(),
        this._currentChunkIndex() + this.limit
      )
    // Add backward ellipses with first page if needed
    if (this.currentPage >= this.limit) {
      firstHalf.unshift(ELLIPSES)
      firstHalf.unshift(0)
    }
    // Add ellipses if needed
    if (this.lastPage - this.limit > this._currentChunkIndex()) {
      firstHalf.push(ELLIPSES)
    }
    return firstHalf
  };

  LimitedLinksGenerator.prototype._buildSecondHalf = function _buildSecondHalf () {
    var secondHalf = [this.lastPage]
    return secondHalf
  };

  LimitedLinksGenerator.prototype._currentChunkIndex = function _currentChunkIndex () {
    var currentChunk = Math.floor(this.currentPage / this.limit)
    return currentChunk * this.limit 
  };

  LimitedLinksGenerator.prototype._allPagesButLast = function _allPagesButLast () {
      var this$1 = this;

    return this.listOfPages.filter(function (n) { return n !== this$1.lastPage; })
  };

  var PaginateLinks = {
    name: 'paginate-links',
    props: {
      for: {
        type: String,
        required: true
      },
      limit: {
        type: Number,
        default: 0
      },
      simple: {
        type: Object,
        default: null,
        validator: function validator (obj) {
          return obj.prev && obj.next
        }
      },
      stepLinks: {
        type: Object,
        default: function () {
          return {
            prev: LEFT_ARROW,
            next: RIGHT_ARROW
          }
        },
        validator: function validator$1 (obj) {
          return obj.prev && obj.next
        }
      },
      showStepLinks: {
        type: Boolean
      },
      hideSinglePage: {
        type: Boolean
      },
      classes: {
        type: Object,
        default: null
      },
      async: {
        type: Boolean,
        default: false
      },
      container: {
        type: Object,
        default: null
      }
    },
    data: function data () {
      return {
        listOfPages: [],
        numberOfPages: 0,
        target: null
      }
    },
    computed: {
      parent: function parent () {
        return this.container ? this.container.el : this.$parent
      },
      state: function state () {
        return this.container ? this.container.state : this.$parent.paginate[this.for]
      },
      currentPage: {
        get: function get () {
          if (this.state) {
            return this.state.page
          }
        },
        set: function set (page) {
          this.state.page = page
        }
      }
    },
    mounted: function mounted () {
      var this$1 = this;

      if (this.simple && this.limit) {
        warn(("<paginate-links for=\"" + (this.for) + "\"> 'simple' and 'limit' props can't be used at the same time. In this case, 'simple' will take precedence, and 'limit' will be ignored."), this.parent, 'warn')
      }
      if (this.simple && !this.simple.next) {
        warn(("<paginate-links for=\"" + (this.for) + "\"> 'simple' prop doesn't contain 'next' value."), this.parent)
      }
      if (this.simple && !this.simple.prev) {
        warn(("<paginate-links for=\"" + (this.for) + "\"> 'simple' prop doesn't contain 'prev' value."), this.parent)
      }
      if (this.stepLinks && !this.stepLinks.next) {
        warn(("<paginate-links for=\"" + (this.for) + "\"> 'step-links' prop doesn't contain 'next' value."), this.parent)
      }
      if (this.stepLinks && !this.stepLinks.prev) {
        warn(("<paginate-links for=\"" + (this.for) + "\"> 'step-links' prop doesn't contain 'prev' value."), this.parent)
      }
      this.$nextTick(function () {
        this$1.updateListOfPages()
      })
    },
    watch: {
      'state': {
        handler: function handler () {
          this.updateListOfPages()
        },
        deep: true
      },
      currentPage: function currentPage (toPage, fromPage) {
        this.$emit('change', toPage + 1, fromPage + 1)
      }
    },
    methods: {
      updateListOfPages: function updateListOfPages () {
        this.target = getTargetPaginateComponent(this.parent.$children, this.for)
        if (!this.target) {
          if (this.async) { return }
          warn(("<paginate-links for=\"" + (this.for) + "\"> can't be used without its companion <paginate name=\"" + (this.for) + "\">"), this.parent)
          warn("To fix that issue you may need to use :async=\"true\" on <paginate-links> component to allow for asyncronous rendering", this.parent, 'warn')
          return
        }
        this.numberOfPages = Math.ceil(this.target.list.length / this.target.per)
        this.listOfPages = getListOfPageNumbers(this.numberOfPages)
      }
    },
    render: function render (h) {
      var this$1 = this;

      if (!this.target && this.async) { return null }

      var links = this.simple
        ? getSimpleLinks(this, h)
        : this.limit > 1
        ? getLimitedLinks(this, h)
        : getFullLinks(this, h)

      if (this.hideSinglePage && this.numberOfPages <= 1) {
        return null
      }

      var el = h('ul', {
        class: ['paginate-links', this.for]
      }, links)

      if (this.classes) {
        this.$nextTick(function () {
          addAdditionalClasses(el.elm, this$1.classes)
        })
      }
      return el
    }
  }

  function getFullLinks (vm, h) {
    var allLinks = vm.showStepLinks
      ? [vm.stepLinks.prev ].concat( vm.listOfPages, [vm.stepLinks.next])
      : vm.listOfPages
    return allLinks.map(function (link) {
      var data = {
        on: {
          click: function (e) {
            e.preventDefault()
            vm.currentPage = getTargetPageForLink(
              link,
              vm.limit,
              vm.currentPage,
              vm.listOfPages,
              vm.stepLinks
            )
          }
        }
      }
      var liClasses = getClassesForLink(
        link,
        vm.currentPage,
        vm.listOfPages.length - 1,
        vm.stepLinks
      )
      var linkText = link === vm.stepLinks.next || link === vm.stepLinks.prev
        ? link
        : link + 1 // it means it's a number
      return h('li', { class: liClasses }, [h('a', data, linkText)])
    })
  }

  function getLimitedLinks (vm, h) {
    var limitedLinks = new LimitedLinksGenerator(
      vm.listOfPages,
      vm.currentPage,
      vm.limit,
      vm.stepLinks
    ).generate()

    limitedLinks = vm.showStepLinks
      ? [vm.stepLinks.prev ].concat( limitedLinks, [vm.stepLinks.next])
      : limitedLinks

    var limitedLinksMetadata = getLimitedLinksMetadata(limitedLinks)

    return limitedLinks.map(function (link, index) {
      var data = {
        on: {
          click: function (e) {
            e.preventDefault()
            vm.currentPage = getTargetPageForLink(
              link,
              vm.limit,
              vm.currentPage,
              vm.listOfPages,
              vm.stepLinks,
              limitedLinksMetadata[index]
            )
          }
        }
      }
      var liClasses = getClassesForLink(
        link,
        vm.currentPage,
        vm.listOfPages.length - 1,
        vm.stepLinks
      )
      // If the link is a number,
      // then incremented by 1 (since it's 0 based).
      // otherwise, do nothing (so, it's a symbol).
      var text = (link === parseInt(link, 10)) ? link + 1 : link
      return h('li', { class: liClasses }, [h('a', data, text)])
    })
  }

  function getSimpleLinks (vm, h) {
    var lastPage = vm.listOfPages.length - 1
    var prevData = {
      on: {
        click: function (e) {
          e.preventDefault()
          if (vm.currentPage > 0) { vm.currentPage -= 1 }
        }
      }
    }
    var nextData = {
      on: {
        click: function (e) {
          e.preventDefault()
          if (vm.currentPage < lastPage) { vm.currentPage += 1 }
        }
      }
    }
    var nextListData = { class: ['next', vm.currentPage >= lastPage ? 'disabled' : ''] }
    var prevListData = { class: ['prev', vm.currentPage <= 0 ? 'disabled' : ''] }
    var prevLink = h('li', prevListData, [h('a', prevData, vm.simple.prev)])
    var nextLink = h('li', nextListData, [h('a', nextData, vm.simple.next)])
    return [prevLink, nextLink]
  }

  function getTargetPaginateComponent (children, targetName) {
    return children
      .filter(function (child) { return (child.$vnode.componentOptions.tag === 'paginate'); })
      .find(function (child) { return child.name === targetName; })
  }

  function getListOfPageNumbers (numberOfPages) {
    // converts number of pages into an array
    // that contains each individual page number
    // For Example: 4 => [0, 1, 2, 3]
    return Array.apply(null, { length: numberOfPages })
      .map(function (val, index) { return index; })
  }

  function getClassesForLink(link, currentPage, lastPage, ref) {
    var prev = ref.prev;
    var next = ref.next;

    var liClass = []
    if (link === prev) {
      liClass.push('left-arrow')
    } else if (link === next) {
      liClass.push('right-arrow')
    } else if (link === ELLIPSES) {
      liClass.push('ellipses')
    } else {
      liClass.push('number')
    }

    if (link === currentPage) {
      liClass.push('active')
    }

    if (link === prev && currentPage <= 0) {
      liClass.push('disabled')
    } else if (link === next && currentPage >= lastPage) {
      liClass.push('disabled')
    }
    return liClass
  }

  function getTargetPageForLink (link, limit, currentPage, listOfPages, ref, metaData) {
    var prev = ref.prev;
    var next = ref.next;
    if ( metaData === void 0 ) metaData = null;

    var currentChunk = Math.floor(currentPage / limit)
    if (link === prev) {
      return (currentPage - 1) < 0 ? 0 : currentPage - 1
    } else if (link === next) {
      return (currentPage + 1 > listOfPages.length - 1)
        ? listOfPages.length - 1
        : currentPage + 1
    } else if (metaData && metaData === 'right-ellipses') {
      return (currentChunk + 1) * limit
    } else if (metaData && metaData === 'left-ellipses') {
      var chunkContent = listOfPages.slice(currentChunk * limit, currentChunk * limit + limit)
      var isLastPage = currentPage === listOfPages.length - 1
      if (isLastPage && chunkContent.length === 1) {
        currentChunk--
      }
      return (currentChunk - 1) * limit + limit - 1
    }
    // which is number
    return link
  }

  /**
   * Mainly used here to check whether the displayed
   * ellipses is for showing previous or next links
   */
  function getLimitedLinksMetadata (limitedLinks) {
    return limitedLinks.map(function (link, index) {
      if (link === ELLIPSES && limitedLinks[index - 1] === 0) {
        return 'left-ellipses'
      } else if (link === ELLIPSES && limitedLinks[index - 1] !== 0) {
        return 'right-ellipses'
      }
      return link
    })
  }

  function addAdditionalClasses (linksContainer, classes) {
    Object.keys(classes).forEach(function (selector) {
      if (selector === 'ul') {
        var selectorValue = classes['ul']
        if (Array.isArray(selectorValue)) {
          selectorValue.forEach(function (c) { return linksContainer.classList.add(c); })
        } else {
          linksContainer.classList.add(selectorValue)
        }
      }
      linksContainer.querySelectorAll(selector).forEach(function (node) {
        var selectorValue = classes[selector]
        if (Array.isArray(selectorValue)) {
          selectorValue.forEach(function (c) { return node.classList.add(c); })
        } else {
          node.classList.add(selectorValue)
        }
      })
    })
  }

  function paginateDataGenerator (listNames) {
    if ( listNames === void 0 ) listNames = [];

    return listNames.reduce(function (curr, listName) {
      curr[listName] = {
        list: [],
        page: 0
      }
      return curr
    }, {})
  }

  var vuePaginate = {}

  vuePaginate.install = function (Vue) {
    Vue.mixin({
      created: function created () {
        if (this.paginate !== 'undefined' && this.paginate instanceof Array) {
          this.paginate = paginateDataGenerator(this.paginate)
        }
      },
      methods: {
        paginated: function paginated (listName) {
          if (!this.paginate || !this.paginate[listName]) {
            warn(("'" + listName + "' is not registered in 'paginate' array."), this)
            return
          }
          return this.paginate[listName].list
        }
      }
    })
    Vue.component('paginate', Paginate)
    Vue.component('paginate-links', PaginateLinks)
  }

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vuePaginate)
  }

  return vuePaginate;

}));

/***/ })

}]);