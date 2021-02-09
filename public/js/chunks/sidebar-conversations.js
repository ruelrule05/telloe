(self["webpackChunk"] = self["webpackChunk"] || []).push([["sidebar-conversations"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/index/index.js?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/index/index.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/modal/modal.vue */ "./Resources/components/modal/modal.vue");
/* harmony import */ var _components_vue_form_validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/vue-form-validate */ "./Resources/components/vue-form-validate.vue");
/* harmony import */ var _components_toggle_switch_toggle_switch_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/toggle-switch/toggle-switch.vue */ "./Resources/components/toggle-switch/toggle-switch.vue");
/* harmony import */ var _icons_archive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../icons/archive */ "./Resources/icons/archive.vue");
/* harmony import */ var _icons_more_h__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../icons/more-h */ "./Resources/icons/more-h.vue");
/* harmony import */ var _icons_plus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../icons/plus */ "./Resources/icons/plus.vue");
/* harmony import */ var _icons_download__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../icons/download */ "./Resources/icons/download.vue");
/* harmony import */ var _icons_search__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../icons/search */ "./Resources/icons/search.vue");
/* harmony import */ var _icons_close__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../icons/close */ "./Resources/icons/close.vue");
/* harmony import */ var _icons_colored_video__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../icons/colored-video */ "./Resources/icons/colored-video.vue");
/* harmony import */ var _icons_user_circle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../icons/user-circle */ "./Resources/icons/user-circle.vue");
/* harmony import */ var _icons_password__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../icons/password */ "./Resources/icons/password.vue");
/* harmony import */ var _icons_headphone__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../icons/headphone */ "./Resources/icons/headphone.vue");
/* harmony import */ var _icons_lock__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../icons/lock */ "./Resources/icons/lock.vue");
/* harmony import */ var _icons_list_bullet__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../icons/list-bullet */ "./Resources/icons/list-bullet.vue");
/* harmony import */ var _icons_more__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../icons/more */ "./Resources/icons/more.vue");
/* harmony import */ var _icons_volume_max__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../icons/volume-max */ "./Resources/icons/volume-max.vue");
/* harmony import */ var _icons_volume_min__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../icons/volume-min */ "./Resources/icons/volume-min.vue");
/* harmony import */ var _icons_bell_slash__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../icons/bell-slash */ "./Resources/icons/bell-slash.vue");
/* harmony import */ var _icons_edit_square__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../icons/edit-square */ "./Resources/icons/edit-square.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global APP_NAME */





















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Modal: _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    VueFormValidate: _components_vue_form_validate__WEBPACK_IMPORTED_MODULE_2__.default,
    ToggleSwitch: _components_toggle_switch_toggle_switch_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    ArchiveIcon: _icons_archive__WEBPACK_IMPORTED_MODULE_4__.default,
    MoreHIcon: _icons_more_h__WEBPACK_IMPORTED_MODULE_5__.default,
    PlusIcon: _icons_plus__WEBPACK_IMPORTED_MODULE_6__.default,
    DownloadIcon: _icons_download__WEBPACK_IMPORTED_MODULE_7__.default,
    SearchIcon: _icons_search__WEBPACK_IMPORTED_MODULE_8__.default,
    CloseIcon: _icons_close__WEBPACK_IMPORTED_MODULE_9__.default,
    VideoIcon: _icons_colored_video__WEBPACK_IMPORTED_MODULE_10__.default,
    UserCircleIcon: _icons_user_circle__WEBPACK_IMPORTED_MODULE_11__.default,
    PasswordIcon: _icons_password__WEBPACK_IMPORTED_MODULE_12__.default,
    HeadphoneIcon: _icons_headphone__WEBPACK_IMPORTED_MODULE_13__.default,
    LockIcon: _icons_lock__WEBPACK_IMPORTED_MODULE_14__.default,
    ListBulletIcon: _icons_list_bullet__WEBPACK_IMPORTED_MODULE_15__.default,
    MoreIcon: _icons_more__WEBPACK_IMPORTED_MODULE_16__.default,
    VolumeMaxIcon: _icons_volume_max__WEBPACK_IMPORTED_MODULE_17__.default,
    VolumeMinIcon: _icons_volume_min__WEBPACK_IMPORTED_MODULE_18__.default,
    BellSlashIcon: _icons_bell_slash__WEBPACK_IMPORTED_MODULE_19__.default,
    EditSquareIcon: _icons_edit_square__WEBPACK_IMPORTED_MODULE_20__.default
  },
  data: function data() {
    return {
      conversationTab: 'active',
      newConversation: {
        members: []
      },
      userSearch: '',
      newContact: {
        custom_fields: {},
        blacklisted_services: []
      },
      search: ''
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_21__.mapState)({
    conversations: function conversations(state) {
      return state.conversations.index;
    },
    ready: function ready(state) {
      return state.conversations.ready;
    },
    contacts: function contacts(state) {
      return state.contacts.index;
    },
    members: function members(state) {
      return state.members.index;
    },
    contactsReady: function contactsReady(state) {
      return state.contacts.ready;
    },
    services: function services(state) {
      return state.services.index;
    }
  })), {}, {
    orderedConversations: function orderedConversations() {
      var conversations = Object.assign([], this.conversations);
      conversations.sort(function (a, b) {
        //console.log(a.last_message.timestamp);
        var a_timestamp = a.last_message.timestamp || 0;
        var b_timestamp = b.last_message.timestamp || 0;
        return a_timestamp > b_timestamp ? -1 : 1;
      });
      var search = this.search.trim().toLowerCase();
      return conversations.filter(function (conversation) {
        if (!search.length) {
          return true;
        } else {
          var keywords = conversation.name || '';
          keywords += " ".concat(conversation.user.full_name, " ").concat(conversation.user.email);
          conversation.members.forEach(function (member) {
            keywords += " ".concat(member.user.full_name, " ").concat(member.user.email);
          });
          return keywords.toLowerCase().includes(search);
        }
      });
    },
    filteredUsers: function filteredUsers() {
      var filteredUsers = [];
      var trimmedQuery = this.userSearch.trim().toLowerCase();
      this.users.forEach(function (user) {
        if (user.user.full_name.toLowerCase().includes(trimmedQuery) || user.user.email.toLowerCase().includes(trimmedQuery)) filteredUsers.push(user);
      });
      return filteredUsers;
    },
    defaultEmailMessage: function defaultEmailMessage() {
      return "".concat(this.$root.auth.full_name, " has invited you in ").concat(APP_NAME);
    },
    users: function users() {
      var users = [];
      this.contacts.forEach(function (contact) {
        if (!contact.is_pending) {
          var exists = users.find(function (x) {
            return x.user.id == contact.contact_user_id;
          });

          if (!exists) {
            users.push({
              type: 'contact',
              user: contact.contact_user
            });
          }
        }
      });
      this.members.forEach(function (member) {
        if (!member.is_pending) {
          var exists = users.find(function (x) {
            return x.user.id == member.member_user_id;
          });

          if (!exists) {
            users.push({
              type: 'member',
              user: member.member_user
            });
          }
        }
      });
      return users;
    }
  }),
  watch: {},
  created: function created() {
    var _this = this;

    this.$root.contentloading = !this.ready;
    this.getConversations().then(function () {
      if (!_this.$route.params.id && _this.conversations.length > 0 && _this.$route.name == 'conversations') {
        _this.setConversation(_this.orderedConversations[0]);
      }
    });
    this.getContacts({
      nopaginate: true
    });
    this.getMembers();
    this.$root.appChannel.listenForWhisper('newConversation', function (data) {
      if (data.member_ids.find(function (x) {
        return x == _this.$root.auth.id;
      })) {
        var conversation = _this.conversations.find(function (x) {
          return x.id == data.conversation_id;
        });

        if (!conversation) _this.getConversation(data.conversation_id);
      }
    });
  },
  mounted: function mounted() {},
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_21__.mapActions)({
    getConversations: 'conversations/index',
    storeConversation: 'conversations/store',
    updateConversation: 'conversations/update',
    showConversation: 'conversations/show',
    getContacts: 'contacts/index',
    storeContact: 'contacts/store',
    getServices: 'services/index',
    getMembers: 'members/index'
  })), {}, {
    resetNewContact: function resetNewContact() {
      this.newContact = {
        custom_fields: {},
        blacklisted_services: []
      };
    },
    createContact: function createContact() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var contact;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.newContact.email) {
                  _context.next = 6;
                  break;
                }

                _this2.$refs['addContactModal'].hide();

                _context.next = 4;
                return _this2.storeContact(_this2.newContact);

              case 4:
                contact = _context.sent;

                if (contact) {
                  _this2.setConversation(contact.conversation);

                  _this2.$refs['newConversationModal'].hide();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    resetNewConversationForm: function resetNewConversationForm() {
      this.newConversation.members = [];
      this.userSearch = '';
    },
    getConversation: function getConversation(conversation_id) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var conversation;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3.showConversation({
                  id: conversation_id
                });

              case 2:
                conversation = _this3.conversations.find(function (x) {
                  return x.id == conversation_id;
                });
                if (conversation) _this3.setConversation(conversation);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    addNewConversationMember: function addNewConversationMember(member) {
      if (!member.is_pending && !this.newConversation.members.find(function (x) {
        return x.user.id == member.user.id;
      })) this.newConversation.members.push(member);
    },
    createConversation: function createConversation() {
      var _this4 = this;

      if (this.newConversation.members.length > 0) {
        var member_ids = [];
        this.newConversation.members.forEach(function (m) {
          member_ids.push(m.user.id);
        });
        this.storeConversation({
          members: member_ids
        }).then(function (conversation) {
          if (conversation.id != _this4.$route.params.id) _this4.setConversation(conversation);

          _this4.$root.appChannel.whisper('newConversation', {
            member_ids: member_ids,
            conversation_id: conversation.id
          });
        });
        this.$refs['newConversationModal'].hide();
      }
    },
    searchMembers: function searchMembers(e) {
      var newConversation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var chatTarget = newConversation ? this.newConversation : this;

      if (!chatTarget['searchingMembers']) {
        chatTarget['searchingMembers'] = true;
        setTimeout(function () {
          window.axios.get("/dashboard/contacts?search=".concat(e.target.value.trim())).then(function (response) {
            chatTarget['groupMembersResults'] = response.data;
          });
          chatTarget['searchingMembers'] = false;
        }, 500);
      }
    },
    setConversation: function setConversation(conversation) {
      if (conversation.id != this.$route.params.id) this.$router.replace("/dashboard/conversations/".concat(conversation.id));
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.js?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _conversations_index_index_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conversations/index/index.vue */ "./Resources/dashboard/components/conversations/index/index.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Index: _conversations_index_index_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  created: function created() {
    if (this.$route.query.tab) {
      this.$root.detailsTab = this.$route.query.tab;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/archive.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/archive.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
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
  name: 'archive'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bell-slash.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bell-slash.vue?vue&type=script&lang=js& ***!
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
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'bell-slash'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-video.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-video.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'colored-icon'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/edit-square.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/edit-square.vue?vue&type=script&lang=js& ***!
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
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'edit-square'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/search.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/search.vue?vue&type=script&lang=js& ***!
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
  name: 'search'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-max.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-max.vue?vue&type=script&lang=js& ***!
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
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'volume-max'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-min.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-min.vue?vue&type=script&lang=js& ***!
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
  name: 'volume-mid'
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".conversation-list[data-v-486ade60] {\n  width: 350px;\n}\n.conversations-header[data-v-486ade60] {\n  padding-top: 12px;\n}\n.str-limit[data-v-486ade60] {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.conversation-oncall[data-v-486ade60] {\n  transition: all 0.1s ease-in-out;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 20;\n}\n.conversation-preview[data-v-486ade60] {\n  transition: all 0.1s ease-in-out;\n}\n.conversation-preview .last-message-time[data-v-486ade60] {\n  transition: all 0.1s ease-in-out;\n}\n.conversation-preview .conversation-dropdown[data-v-486ade60] {\n  transition: all 0.1s ease-in-out;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n}\n.conversation-preview.active[data-v-486ade60] {\n  background-color: rgba(233, 236, 239, 0.5) !important;\n}\n.conversation-preview[data-v-486ade60]:hover {\n  background-color: #f8f9fa;\n}\n.conversation-preview:hover .conversation-dropdown[data-v-486ade60] {\n  opacity: 1 !important;\n}\n.conversation-preview:hover .last-message-time[data-v-486ade60] {\n  opacity: 0;\n}\n.conversation-message-preview[data-v-486ade60] {\n  font-size: 13px;\n}\n.member-result[data-v-486ade60] {\n  transition: all 0.1s ease-in-out;\n}\n.member-result.active[data-v-486ade60] {\n  background-color: #5a5adf !important;\n}\n.member-result.active *[data-v-486ade60] {\n  color: white !important;\n}\n.member-result[data-v-486ade60]:hover {\n  background-color: #e9ecef;\n}\n.member-result.disabled[data-v-486ade60] {\n  pointer-events: none;\n}\n.members-search-container[data-v-486ade60] {\n  min-height: 230px;\n  max-height: 230px;\n}\n.user-profile-image-md[data-v-486ade60] {\n  width: 35px;\n  height: 35px;\n}\n.user-profile-image-md > span[data-v-486ade60] {\n  font-size: 13px;\n}\n.user-profile-image-sm[data-v-486ade60] {\n  width: 22px;\n  height: 22px;\n}\n.conversation-members .user-profile-image-xs[data-v-486ade60] {\n  width: 22px;\n  height: 22px;\n}\n.conversation-members .user-profile-image-xs > span[data-v-486ade60] {\n  font-size: 8px;\n}\n.conversation-members .conversation-members-container:nth-child(2):nth-last-child(2) ~ .conversation-members-container .user-profile-image-xs[data-v-486ade60] {\n  margin-top: -3px;\n}\n.conversation-members .conversation-members-more[data-v-486ade60] {\n  background-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 12px !important;\n  letter-spacing: -0.7px;\n  color: #000;\n  z-index: 10;\n}\n.conversation-members .conversation-members-more span[data-v-486ade60] {\n  margin-left: -1px;\n}\n.new-conversation-member .btn[data-v-486ade60] {\n  top: -2px;\n  right: -2px;\n}\n.badge-new-message[data-v-486ade60] {\n  top: 45%;\n  right: 8px;\n  transform: translateY(-50%);\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background-color: #5a5adf;\n}", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_486ade60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_486ade60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_486ade60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

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

/***/ "./Resources/dashboard/components/conversations/index/index.vue":
/*!**********************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/index/index.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_486ade60_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=486ade60&scoped=true& */ "./Resources/dashboard/components/conversations/index/index.vue?vue&type=template&id=486ade60&scoped=true&");
/* harmony import */ var _index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/conversations/index/index.js?vue&type=script&lang=js&");
/* harmony import */ var _index_scss_vue_type_style_index_0_id_486ade60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true& */ "./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _index_vue_vue_type_template_id_486ade60_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_486ade60_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "486ade60",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/conversations/index/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue":
/*!****************************************************************************************!*\
  !*** ./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _sidebar_conversations_vue_vue_type_template_id_6e1b3ee9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar-conversations.vue?vue&type=template&id=6e1b3ee9& */ "./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue?vue&type=template&id=6e1b3ee9&");
/* harmony import */ var _sidebar_conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar-conversations.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.js?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _sidebar_conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _sidebar_conversations_vue_vue_type_template_id_6e1b3ee9___WEBPACK_IMPORTED_MODULE_0__.render,
  _sidebar_conversations_vue_vue_type_template_id_6e1b3ee9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/archive.vue":
/*!*************************************!*\
  !*** ./Resources/icons/archive.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _archive_vue_vue_type_template_id_7fd2afa5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./archive.vue?vue&type=template&id=7fd2afa5& */ "./Resources/icons/archive.vue?vue&type=template&id=7fd2afa5&");
/* harmony import */ var _archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./archive.vue?vue&type=script&lang=js& */ "./Resources/icons/archive.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _archive_vue_vue_type_template_id_7fd2afa5___WEBPACK_IMPORTED_MODULE_0__.render,
  _archive_vue_vue_type_template_id_7fd2afa5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/archive.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/bell-slash.vue":
/*!****************************************!*\
  !*** ./Resources/icons/bell-slash.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _bell_slash_vue_vue_type_template_id_bc396fc0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bell-slash.vue?vue&type=template&id=bc396fc0& */ "./Resources/icons/bell-slash.vue?vue&type=template&id=bc396fc0&");
/* harmony import */ var _bell_slash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bell-slash.vue?vue&type=script&lang=js& */ "./Resources/icons/bell-slash.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _bell_slash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _bell_slash_vue_vue_type_template_id_bc396fc0___WEBPACK_IMPORTED_MODULE_0__.render,
  _bell_slash_vue_vue_type_template_id_bc396fc0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/bell-slash.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/colored-video.vue":
/*!*******************************************!*\
  !*** ./Resources/icons/colored-video.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _colored_video_vue_vue_type_template_id_c553bc5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colored-video.vue?vue&type=template&id=c553bc5a& */ "./Resources/icons/colored-video.vue?vue&type=template&id=c553bc5a&");
/* harmony import */ var _colored_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colored-video.vue?vue&type=script&lang=js& */ "./Resources/icons/colored-video.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _colored_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _colored_video_vue_vue_type_template_id_c553bc5a___WEBPACK_IMPORTED_MODULE_0__.render,
  _colored_video_vue_vue_type_template_id_c553bc5a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/colored-video.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/edit-square.vue":
/*!*****************************************!*\
  !*** ./Resources/icons/edit-square.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _edit_square_vue_vue_type_template_id_d21aceba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-square.vue?vue&type=template&id=d21aceba& */ "./Resources/icons/edit-square.vue?vue&type=template&id=d21aceba&");
/* harmony import */ var _edit_square_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-square.vue?vue&type=script&lang=js& */ "./Resources/icons/edit-square.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _edit_square_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _edit_square_vue_vue_type_template_id_d21aceba___WEBPACK_IMPORTED_MODULE_0__.render,
  _edit_square_vue_vue_type_template_id_d21aceba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/edit-square.vue"
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

/***/ "./Resources/icons/search.vue":
/*!************************************!*\
  !*** ./Resources/icons/search.vue ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _search_vue_vue_type_template_id_4b4c6195___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.vue?vue&type=template&id=4b4c6195& */ "./Resources/icons/search.vue?vue&type=template&id=4b4c6195&");
/* harmony import */ var _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.vue?vue&type=script&lang=js& */ "./Resources/icons/search.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _search_vue_vue_type_template_id_4b4c6195___WEBPACK_IMPORTED_MODULE_0__.render,
  _search_vue_vue_type_template_id_4b4c6195___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/search.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/volume-max.vue":
/*!****************************************!*\
  !*** ./Resources/icons/volume-max.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _volume_max_vue_vue_type_template_id_d0ee7dc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./volume-max.vue?vue&type=template&id=d0ee7dc4& */ "./Resources/icons/volume-max.vue?vue&type=template&id=d0ee7dc4&");
/* harmony import */ var _volume_max_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./volume-max.vue?vue&type=script&lang=js& */ "./Resources/icons/volume-max.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _volume_max_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _volume_max_vue_vue_type_template_id_d0ee7dc4___WEBPACK_IMPORTED_MODULE_0__.render,
  _volume_max_vue_vue_type_template_id_d0ee7dc4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/volume-max.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/volume-min.vue":
/*!****************************************!*\
  !*** ./Resources/icons/volume-min.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _volume_min_vue_vue_type_template_id_b6bac9e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./volume-min.vue?vue&type=template&id=b6bac9e8& */ "./Resources/icons/volume-min.vue?vue&type=template&id=b6bac9e8&");
/* harmony import */ var _volume_min_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./volume-min.vue?vue&type=script&lang=js& */ "./Resources/icons/volume-min.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _volume_min_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _volume_min_vue_vue_type_template_id_b6bac9e8___WEBPACK_IMPORTED_MODULE_0__.render,
  _volume_min_vue_vue_type_template_id_b6bac9e8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/volume-min.vue"
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

/***/ "./Resources/dashboard/components/conversations/index/index.js?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/index/index.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/eslint-loader/dist/cjs.js!./index.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/index/index.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_index_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.js?vue&type=script&lang=js&":
/*!****************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_sidebar_conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/eslint-loader/dist/cjs.js!./sidebar-conversations.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_sidebar_conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/archive.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./Resources/icons/archive.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./archive.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/archive.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/bell-slash.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/bell-slash.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_bell_slash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./bell-slash.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bell-slash.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_bell_slash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/colored-video.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./Resources/icons/colored-video.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./colored-video.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-video.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/edit-square.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./Resources/icons/edit-square.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_square_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit-square.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/edit-square.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_square_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/search.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./Resources/icons/search.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./search.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/search.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/volume-max.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/volume-max.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_max_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./volume-max.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-max.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_max_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/volume-min.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/volume-min.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_min_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./volume-min.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-min.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_min_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_index_scss_vue_type_style_index_0_id_486ade60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/index/index.scss?vue&type=style&index=0&id=486ade60&lang=scss&scoped=true&");


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

/***/ "./Resources/dashboard/components/conversations/index/index.vue?vue&type=template&id=486ade60&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/index/index.vue?vue&type=template&id=486ade60&scoped=true& ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_486ade60_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_486ade60_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_486ade60_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=486ade60&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/index/index.vue?vue&type=template&id=486ade60&scoped=true&");


/***/ }),

/***/ "./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue?vue&type=template&id=6e1b3ee9&":
/*!***********************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue?vue&type=template&id=6e1b3ee9& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_conversations_vue_vue_type_template_id_6e1b3ee9___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_conversations_vue_vue_type_template_id_6e1b3ee9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_conversations_vue_vue_type_template_id_6e1b3ee9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./sidebar-conversations.vue?vue&type=template&id=6e1b3ee9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue?vue&type=template&id=6e1b3ee9&");


/***/ }),

/***/ "./Resources/icons/archive.vue?vue&type=template&id=7fd2afa5&":
/*!********************************************************************!*\
  !*** ./Resources/icons/archive.vue?vue&type=template&id=7fd2afa5& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_archive_vue_vue_type_template_id_7fd2afa5___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_archive_vue_vue_type_template_id_7fd2afa5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_archive_vue_vue_type_template_id_7fd2afa5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./archive.vue?vue&type=template&id=7fd2afa5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/archive.vue?vue&type=template&id=7fd2afa5&");


/***/ }),

/***/ "./Resources/icons/bell-slash.vue?vue&type=template&id=bc396fc0&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/bell-slash.vue?vue&type=template&id=bc396fc0& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bell_slash_vue_vue_type_template_id_bc396fc0___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bell_slash_vue_vue_type_template_id_bc396fc0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bell_slash_vue_vue_type_template_id_bc396fc0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./bell-slash.vue?vue&type=template&id=bc396fc0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bell-slash.vue?vue&type=template&id=bc396fc0&");


/***/ }),

/***/ "./Resources/icons/colored-video.vue?vue&type=template&id=c553bc5a&":
/*!**************************************************************************!*\
  !*** ./Resources/icons/colored-video.vue?vue&type=template&id=c553bc5a& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_video_vue_vue_type_template_id_c553bc5a___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_video_vue_vue_type_template_id_c553bc5a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_video_vue_vue_type_template_id_c553bc5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./colored-video.vue?vue&type=template&id=c553bc5a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-video.vue?vue&type=template&id=c553bc5a&");


/***/ }),

/***/ "./Resources/icons/edit-square.vue?vue&type=template&id=d21aceba&":
/*!************************************************************************!*\
  !*** ./Resources/icons/edit-square.vue?vue&type=template&id=d21aceba& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_square_vue_vue_type_template_id_d21aceba___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_square_vue_vue_type_template_id_d21aceba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_square_vue_vue_type_template_id_d21aceba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit-square.vue?vue&type=template&id=d21aceba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/edit-square.vue?vue&type=template&id=d21aceba&");


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

/***/ "./Resources/icons/search.vue?vue&type=template&id=4b4c6195&":
/*!*******************************************************************!*\
  !*** ./Resources/icons/search.vue?vue&type=template&id=4b4c6195& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_4b4c6195___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_4b4c6195___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_4b4c6195___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./search.vue?vue&type=template&id=4b4c6195& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/search.vue?vue&type=template&id=4b4c6195&");


/***/ }),

/***/ "./Resources/icons/volume-max.vue?vue&type=template&id=d0ee7dc4&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/volume-max.vue?vue&type=template&id=d0ee7dc4& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_max_vue_vue_type_template_id_d0ee7dc4___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_max_vue_vue_type_template_id_d0ee7dc4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_max_vue_vue_type_template_id_d0ee7dc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./volume-max.vue?vue&type=template&id=d0ee7dc4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-max.vue?vue&type=template&id=d0ee7dc4&");


/***/ }),

/***/ "./Resources/icons/volume-min.vue?vue&type=template&id=b6bac9e8&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/volume-min.vue?vue&type=template&id=b6bac9e8& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_min_vue_vue_type_template_id_b6bac9e8___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_min_vue_vue_type_template_id_b6bac9e8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_min_vue_vue_type_template_id_b6bac9e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./volume-min.vue?vue&type=template&id=b6bac9e8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-min.vue?vue&type=template&id=b6bac9e8&");


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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/index/index.vue?vue&type=template&id=486ade60&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/index/index.vue?vue&type=template&id=486ade60&scoped=true& ***!
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
  return _c(
    "div",
    { staticClass: "bg-white text-left border-right" },
    [
      _c(
        "div",
        {
          staticClass:
            "conversation-list d-flex flex-column h-100 position-relative"
        },
        [
          _c("div", { staticClass: "conversations-header" }, [
            _c("div", { staticClass: "d-flex px-3 align-items-center mb-2" }, [
              _c("h5", { staticClass: "mb-0 font-heading" }, [
                _vm._v("Messages")
              ]),
              _vm._v(" "),
              _vm.$root.auth.role.role == "client"
                ? _c("div", { staticClass: "ml-auto" }, [
                    _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-light badge-pill line-height-0 p-1",
                        attrs: {
                          "data-intro": _vm.$root.intros.conversations.steps[0],
                          "data-step": "1",
                          type: "button"
                        },
                        on: {
                          click: function($event) {
                            return _vm.$refs["newConversationModal"].show()
                          }
                        }
                      },
                      [_c("edit-square-icon")],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-light badge-pill line-height-0 p-1 ml-1",
                        attrs: {
                          "data-intro": _vm.$root.intros.conversations.steps[1],
                          "data-step": "2",
                          type: "button"
                        },
                        on: {
                          click: function($event) {
                            _vm.$root.muted = !_vm.$root.muted
                          }
                        }
                      },
                      [
                        !_vm.$root.muted
                          ? _c("volume-max-icon")
                          : _c("volume-min-icon", {
                              staticClass: "fill-gray-500"
                            })
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "d-flex align-items-center btn-tab mt-3 px-3" },
              [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.search,
                      expression: "search"
                    }
                  ],
                  staticClass: "form-control border shadow-none",
                  attrs: { type: "text", placeholder: "Search conversations" },
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
              ]
            )
          ]),
          _vm._v(" "),
          _vm.ready
            ? _c(
                "div",
                { staticClass: "overflow-auto p-3 position-relative h-100" },
                [
                  _vm.conversations.length == 0
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "position-absolute-center w-100 text-center text-muted"
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\tYou don't have any conversations yet.\n\t\t\t"
                          )
                        ]
                      )
                    : _vm.orderedConversations.length > 0
                    ? [
                        _vm._l(_vm.orderedConversations, function(
                          conversation
                        ) {
                          return [
                            _c(
                              "div",
                              {
                                key: conversation.id,
                                staticClass:
                                  "conversation-preview mb-1 position-relative rounded-lg",
                                class: {
                                  active:
                                    conversation.id == _vm.$route.params.id
                                }
                              },
                              [
                                _vm.$root.callConversation &&
                                _vm.$root.callConversation.id == conversation.id
                                  ? _c(
                                      "div",
                                      {
                                        staticClass:
                                          "conversation-oncall position-absolute pr-3"
                                      },
                                      [
                                        _c("video-icon", {
                                          attrs: { width: "24", height: "24" }
                                        })
                                      ],
                                      1
                                    )
                                  : _c(
                                      "div",
                                      {
                                        staticClass:
                                          "position-absolute conversation-dropdown dropdown opacity-0 pr-2"
                                      },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-sm btn-light p-1 line-height-0",
                                            attrs: {
                                              type: "button",
                                              "data-toggle": "dropdown",
                                              "data-offset": "-130,0"
                                            }
                                          },
                                          [
                                            _c("more-icon", {
                                              staticClass: "fill-gray-500",
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
                                            !conversation.archive
                                              ? _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "dropdown-item cursor-pointer",
                                                    on: {
                                                      click: function($event) {
                                                        conversation.archive = true
                                                        _vm.updateConversation(
                                                          conversation
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\tMove to archives\n\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              : _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "dropdown-item cursor-pointer",
                                                    on: {
                                                      click: function($event) {
                                                        conversation.archive = false
                                                        _vm.updateConversation(
                                                          conversation
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\tMove to active\n\t\t\t\t\t\t\t\t"
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
                                  {
                                    staticClass: "p-2 cursor-pointer",
                                    on: {
                                      click: function($event) {
                                        return _vm.setConversation(conversation)
                                      }
                                    }
                                  },
                                  [
                                    conversation.last_message.user_id !=
                                      _vm.$root.auth.id &&
                                    !conversation.last_message.is_read
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "position-absolute badge-new-message"
                                          },
                                          [_vm._v(" ")]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "media align-items-center conversation-members"
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "user-profile-image position-relative",
                                            class: {
                                              "bg-light border border-gray-200 overflow-hidden":
                                                conversation.members.length > 1
                                            },
                                            style: {
                                              backgroundImage:
                                                "url(" +
                                                conversation.member
                                                  .profile_image +
                                                ")"
                                            }
                                          },
                                          [
                                            conversation.members.length <= 1 &&
                                            !conversation.member.profile_image
                                              ? _c("span", [
                                                  _vm._v(
                                                    _vm._s(
                                                      conversation.member
                                                        .initials
                                                    )
                                                  )
                                                ])
                                              : conversation.members.length > 1
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "position-absolute-center w-100 d-flex flex-wrap justify-content-center"
                                                  },
                                                  [
                                                    _vm._l(
                                                      conversation.members,
                                                      function(member, index) {
                                                        return [
                                                          index < 4
                                                            ? _c(
                                                                "div",
                                                                {
                                                                  key:
                                                                    member.id,
                                                                  staticClass:
                                                                    "w-50 position-relative conversation-members-container"
                                                                },
                                                                [
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "line-height-0 user-profile-image user-profile-image-xs overflow-hidden",
                                                                      style: {
                                                                        backgroundImage:
                                                                          "url(" +
                                                                          member
                                                                            .user
                                                                            .profile_image +
                                                                          ")"
                                                                      }
                                                                    },
                                                                    [
                                                                      !member
                                                                        .user
                                                                        .profile_image
                                                                        ? _c(
                                                                            "span",
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  member
                                                                                    .user
                                                                                    .initials
                                                                                )
                                                                              )
                                                                            ]
                                                                          )
                                                                        : _vm._e(),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      index ==
                                                                        3 &&
                                                                      conversation
                                                                        .members
                                                                        .length >
                                                                        4
                                                                        ? _c(
                                                                            "span",
                                                                            {
                                                                              staticClass:
                                                                                "line-height-0 conversation-members-more w-100 h-100"
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "span",
                                                                                {
                                                                                  staticClass:
                                                                                    "position-absolute-center"
                                                                                },
                                                                                [
                                                                                  _vm._v(
                                                                                    "+" +
                                                                                      _vm._s(
                                                                                        conversation
                                                                                          .members
                                                                                          .length -
                                                                                          4
                                                                                      )
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ]
                                                                          )
                                                                        : _vm._e()
                                                                    ]
                                                                  )
                                                                ]
                                                              )
                                                            : _vm._e()
                                                        ]
                                                      }
                                                    )
                                                  ],
                                                  2
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.$root.isOnline(
                                              conversation.member.id
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
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "media-body pl-3 overflow-hidden"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "h6 mb-0 font-heading",
                                                class: {
                                                  "font-weight-normal":
                                                    conversation.last_message
                                                      .is_read
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    conversation.member
                                                      .full_name ||
                                                      conversation.name
                                                  )
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "d-flex align-items-center text-nowrap conversation-message-preview"
                                              },
                                              [
                                                _c("div", {
                                                  staticClass:
                                                    "flex-grow-1 text-ellipsis",
                                                  class: [
                                                    conversation.last_message
                                                      .is_read ||
                                                    conversation.last_message
                                                      .user_id ==
                                                      _vm.$root.auth.id
                                                      ? "text-muted"
                                                      : "text-black font-weight-bold"
                                                  ],
                                                  domProps: {
                                                    innerHTML: _vm._s(
                                                      (conversation.last_message
                                                        .prefix || "") +
                                                        conversation
                                                          .last_message.message
                                                    )
                                                  }
                                                }),
                                                _vm._v(" "),
                                                !_vm.$root.callConversation ||
                                                _vm.$root.callConversation.id !=
                                                  conversation.id
                                                  ? _c(
                                                      "span",
                                                      {
                                                        staticClass:
                                                          "ml-auto text-muted last-message-time pl-2"
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            conversation
                                                              .last_message
                                                              .created_diff
                                                          )
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e()
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ]
                        })
                      ]
                    : _c(
                        "div",
                        { staticClass: "position-absolute-center text-muted" },
                        [_vm._v("No conversations found.")]
                      )
                ],
                2
              )
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c(
        "modal",
        {
          ref: "newConversationModal",
          attrs: { "close-button": false, scrollable: false },
          on: { hidden: _vm.resetNewConversationForm },
          scopedSlots: _vm._u([
            {
              key: "footer",
              fn: function() {
                return [
                  _c(
                    "div",
                    { staticClass: "d-flex justify-content-between w-100" },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-light shadow-none",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              return _vm.$refs["newConversationModal"].hide()
                            }
                          }
                        },
                        [_vm._v("Cancel")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: {
                            type: "button",
                            disabled: _vm.newConversation.members.length == 0
                          },
                          on: {
                            click: function($event) {
                              return _vm.createConversation()
                            }
                          }
                        },
                        [_vm._v("Create")]
                      )
                    ]
                  )
                ]
              },
              proxy: true
            }
          ])
        },
        [
          _c(
            "div",
            { staticClass: "d-flex modal-title align-items-center mb-3" },
            [
              _c("h5", { staticClass: "font-heading mb-0" }, [
                _vm._v("New Conversation")
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "addNewConversationMembersForm",
              staticClass: "h-100 overflow-hidden d-flex flex-column",
              attrs: { default: _vm.contacts }
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userSearch,
                    expression: "userSearch"
                  }
                ],
                staticClass: "form-control shadow-none border",
                attrs: {
                  type: "text",
                  placeholder: "Search contacts or members..."
                },
                domProps: { value: _vm.userSearch },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.userSearch = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _vm.newConversation.members.length > 0
                ? _c(
                    "div",
                    { staticClass: "mt-1" },
                    _vm._l(_vm.newConversation.members, function(
                      member,
                      index
                    ) {
                      return _c(
                        "div",
                        {
                          key: member.id,
                          staticClass:
                            "user-profile-image d-inline-block new-conversation-member mr-1",
                          style: {
                            backgroundImage:
                              "url(" + member.user.profile_image + ")"
                          }
                        },
                        [
                          !member.user.profile_image
                            ? _c("span", [_vm._v(_vm._s(member.user.initials))])
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-sm btn-gray-200 badge-pill p-0 line-height-0 position-absolute",
                              on: {
                                click: function($event) {
                                  return _vm.newConversation.members.splice(
                                    index,
                                    1
                                  )
                                }
                              }
                            },
                            [
                              _c("close-icon", {
                                staticClass: "cursor-pointer",
                                attrs: { height: "16", width: "16" }
                              })
                            ],
                            1
                          )
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "overflow-y-only mt-2 members-search-container position-relative"
                },
                [
                  !_vm.contactsReady
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "text-center position-absolute-center w-100"
                        },
                        [
                          _c("div", {
                            staticClass:
                              "spinner-border spinner-border-sm text-primary"
                          })
                        ]
                      )
                    : _vm.filteredUsers.length == 0
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "text-center text-muted position-absolute-center w-100"
                        },
                        [_vm._v("\n\t\t\t\t\tNo results found.\n\t\t\t\t")]
                      )
                    : _vm.filteredUsers.length > 0
                    ? _c(
                        "div",
                        _vm._l(_vm.filteredUsers, function(result) {
                          return _c(
                            "div",
                            {
                              key: result.user.id,
                              staticClass:
                                "media member-result align-items-center rounded mb-2 p-2 cursor-pointer",
                              class: {
                                active: _vm.newConversation.members.find(
                                  function(x) {
                                    return x.user.id == result.user.id
                                  }
                                ),
                                disabled: result.is_pending
                              },
                              on: {
                                click: function($event) {
                                  return _vm.addNewConversationMember(result)
                                }
                              }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "user-profile-image user-profile-image-md align-self-center",
                                  style: {
                                    backgroundImage:
                                      "url(" + result.user.profile_image + ")"
                                  }
                                },
                                [
                                  !result.user.profile_image
                                    ? _c("span", [
                                        _vm._v(_vm._s(result.user.initials))
                                      ])
                                    : _vm._e()
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "media-body pl-2" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "font-weight-bold font-heading mb-0 h6"
                                  },
                                  [_vm._v(_vm._s(result.user.full_name))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "small text-muted text-nowrap"
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t" +
                                        _vm._s(result.user.email) +
                                        "\n\t\t\t\t\t\t\t\t"
                                    ),
                                    result.is_pending
                                      ? _c(
                                          "span",
                                          { staticClass: "text-warning" },
                                          [_vm._v("Pending")]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ])
                            ]
                          )
                        }),
                        0
                      )
                    : _vm._e()
                ]
              )
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue?vue&type=template&id=6e1b3ee9&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/sidebar-conversations/sidebar-conversations.vue?vue&type=template&id=6e1b3ee9& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "d-flex h-100" }, [_c("index")], 1)
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/archive.vue?vue&type=template&id=7fd2afa5&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/archive.vue?vue&type=template&id=7fd2afa5& ***!
  \***********************************************************************************************************************************************************************************************************/
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
            "M3,4.5 L3,6.5 C3,6.77614237 3.22385763,7 3.5,7 L20.5,7 C20.7761424,7 21,6.77614237 21,6.5 L21,4.5 C21,4.22385763 20.7761424,4 20.5,4 L3.5,4 C3.22385763,4 3,4.22385763 3,4.5 Z M21,7.91464715 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,7.91464715 C2.41740381,7.70872894 2,7.15310941 2,6.5 L2,4.5 C2,3.67157288 2.67157288,3 3.5,3 L20.5,3 C21.3284271,3 22,3.67157288 22,4.5 L22,6.5 C22,7.15310941 21.5825962,7.70872894 21,7.91464715 L21,7.91464715 Z M20,8 L4,8 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,8 Z M8,11.5 C8,10.6715729 8.67157288,10 9.5,10 L14.5,10 C15.3284271,10 16,10.6715729 16,11.5 C16,12.3284271 15.3284271,13 14.5,13 L9.5,13 C8.67157288,13 8,12.3284271 8,11.5 Z M9,11.5 C9,11.7761424 9.22385763,12 9.5,12 L14.5,12 C14.7761424,12 15,11.7761424 15,11.5 C15,11.2238576 14.7761424,11 14.5,11 L9.5,11 C9.22385763,11 9,11.2238576 9,11.5 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bell-slash.vue?vue&type=template&id=bc396fc0&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bell-slash.vue?vue&type=template&id=bc396fc0& ***!
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
            "M14.8292095,19 C14.4116155,20.1832024 13.2866108,21 12,21 C10.7105968,21 9.58711809,20.1801692 9.17072899,19 L8.5,19 C8.22385763,19 8,18.7761424 8,18.5 C8,18.2238576 8.22385763,18 8.5,18 L16.422476,18 C16.6323536,18 16.8398952,17.9559567 17.0316837,17.8707173 C17.78871,17.5342612 18.1296495,16.6478186 17.7931934,15.8907923 L17.0430942,14.2030692 L17,14 L17,11 C17,10.5422771 16.9386215,10.093202 16.8188406,9.66107585 C16.7450781,9.3949674 16.9010053,9.11944757 17.1671138,9.04568509 C17.4332223,8.97192261 17.7087421,9.12784983 17.7825046,9.39395828 C17.9263416,9.9128703 18,10.4517911 18,11 L18,13.8938928 L18.7070049,15.4846538 C19.2677651,16.7463643 18.6995327,18.2237687 17.4378222,18.7845289 C17.1181747,18.9265944 16.7722719,19 16.422476,19 L14.8292095,19 L14.8292095,19 Z M13.7328929,19 L10.267086,19 C10.6157944,19.6033146 11.26791,20 12,20 C12.730784,20 13.3835919,19.6045386 13.7328929,19 L13.7328929,19 Z M10,5.34141142 L10,5 C10,3.8954305 10.8954305,3 12,3 C13.1045695,3 14,3.8954305 14,5 L14,5.34152584 C14.2469554,5.42881861 14.4880765,5.53238203 14.7220467,5.6516798 C14.9680556,5.77711591 15.0657992,6.07823161 14.9403631,6.32424054 C14.814927,6.57024947 14.5138113,6.66799305 14.2678024,6.54255694 C13.5716136,6.18758117 12.7997838,6 12,6 C9.23857625,6 7,8.23857625 7,11 L7,14 L6.95690577,14.2030692 L6.28557404,15.7135656 C6.173422,15.9659077 5.87794112,16.0795542 5.62559903,15.9674022 C5.37325694,15.8552501 5.25961045,15.5597693 5.37176249,15.3074272 L6,13.8938928 L6,11 C6,8.38756235 7.66961525,6.16508423 10,5.34141142 L10,5.34141142 Z M13,5.08303578 L13,5 C13,4.44771525 12.5522847,4 12,4 C11.4477153,4 11,4.44771525 11,5 L11,5.08295844 C11.3252085,5.0283988 11.6592878,5 12,5 C12.3380973,5 12.6723092,5.02803647 13,5.08303578 L13,5.08303578 Z M20.1464466,3.14644661 C20.3417088,2.95118446 20.6582912,2.95118446 20.8535534,3.14644661 C21.0488155,3.34170876 21.0488155,3.65829124 20.8535534,3.85355339 L3.85355339,20.8535534 C3.65829124,21.0488155 3.34170876,21.0488155 3.14644661,20.8535534 C2.95118446,20.6582912 2.95118446,20.3417088 3.14644661,20.1464466 L20.1464466,3.14644661 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-video.vue?vue&type=template&id=c553bc5a&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-video.vue?vue&type=template&id=c553bc5a& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
        width: "48",
        height: "48",
        version: "1.0",
        viewBox: "0 0 48 48"
      }
    },
    [
      _c("path", {
        attrs: {
          fill: "#5D21D2",
          d:
            "M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"
        }
      }),
      _vm._v(" "),
      _c("path", { attrs: { fill: "#3f1594", d: "M44 35L34 29 34 19 44 13z" } })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/edit-square.vue?vue&type=template&id=d21aceba&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/edit-square.vue?vue&type=template&id=d21aceba& ***!
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
            "M20,11.5 C20,11.2238576 20.2238576,11 20.5,11 C20.7761424,11 21,11.2238576 21,11.5 L21,18.5000057 C21,19.8807175 19.8807119,21.0000057 18.5,21.0000057 L5.48612181,21.0000057 C4.10540994,21.0000057 2.98612181,19.8807175 2.98612181,18.5000057 L2.98612181,5.5 C2.98612181,4.11928813 4.10540994,3 5.48612181,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L5.48612181,4 C4.65769469,4 3.98612181,4.67157288 3.98612181,5.5 L3.98612181,18.5000057 C3.98612181,19.3284328 4.65769469,20.0000057 5.48612181,20.0000057 L18.5,20.0000057 C19.3284271,20.0000057 20,19.3284328 20,18.5000057 L20,11.5 Z M18.8535534,3.14644661 L20.8535534,5.14644661 C21.0488155,5.34170876 21.0488155,5.65829124 20.8535534,5.85355339 L12.8535534,13.8535534 C12.7597852,13.9473216 12.6326082,14 12.5,14 L10.5,14 C10.2238576,14 10,13.7761424 10,13.5 L10,11.5 C10,11.3673918 10.0526784,11.2402148 10.1464466,11.1464466 L18.1464466,3.14644661 C18.3417088,2.95118446 18.6582912,2.95118446 18.8535534,3.14644661 Z M18.5,4.20710678 L11,11.7071068 L11,13 L12.2928932,13 L19.7928932,5.5 L18.5,4.20710678 Z"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/search.vue?vue&type=template&id=4b4c6195&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/search.vue?vue&type=template&id=4b4c6195& ***!
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
            "M16.9994165,16.2923098 L20.8535534,20.1464466 C21.0488155,20.3417088 21.0488155,20.6582912 20.8535534,20.8535534 C20.6582912,21.0488155 20.3417088,21.0488155 20.1464466,20.8535534 L16.2923098,16.9994165 C14.8819612,18.2444908 13.0292099,19 11,19 C6.581722,19 3,15.418278 3,11 C3,6.581722 6.581722,3 11,3 C15.418278,3 19,6.581722 19,11 C19,13.0292099 18.2444908,14.8819612 16.9994165,16.2923098 Z M11,18 C14.8659932,18 18,14.8659932 18,11 C18,7.13400675 14.8659932,4 11,4 C7.13400675,4 4,7.13400675 4,11 C4,14.8659932 7.13400675,18 11,18 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-max.vue?vue&type=template&id=d0ee7dc4&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-max.vue?vue&type=template&id=d0ee7dc4& ***!
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
          fill: "currentColor",
          "fill-rule": "nonzero",
          d:
            "M12 6L10.809017 6 10.2888544 7.04032522C9.38191227 8.85420946 7.52798422 10 5.5 10L5 10C3.8954305 10 3 10.8954305 3 12 3 13.1045695 3.8954305 14 5 14L5.5 14C7.52798422 14 9.38191227 15.1457905 10.2888544 16.9596748L10.809017 18 12 18 12 6zM13 5.5L13 18.5C13 18.7761424 12.7761424 19 12.5 19L10.5 19C10.310614 19 10.1374824 18.8929988 10.0527864 18.7236068L9.39442719 17.4068884C8.65687709 15.9317882 7.14921216 15 5.5 15L5 15C3.34314575 15 2 13.6568542 2 12 2 10.3431458 3.34314575 9 5 9L5.5 9C7.14921216 9 8.65687709 8.06821183 9.39442719 6.59311163L10.0527864 5.2763932C10.1374824 5.10700119 10.310614 5 10.5 5L12.5 5C12.7761424 5 13 5.22385763 13 5.5zM14.1429857 9.8500583C13.9496539 9.65288477 13.9527682 9.3363176 14.1499417 9.14298574 14.3471152 8.94965387 14.6636824 8.95276816 14.8570143 9.1499417 16.409204 10.7329748 16.409204 13.2670252 14.8570143 14.8500583 14.6636824 15.0472318 14.3471152 15.0503461 14.1499417 14.8570143 13.9527682 14.6636824 13.9496539 14.3471152 14.1429857 14.1499417 15.3138802 12.9557806 15.3138802 11.0442194 14.1429857 9.8500583z"
        }
      }),
      _vm._v(" "),
      _c("path", {
        attrs: {
          fill: "currentColor",
          "fill-rule": "nonzero",
          d:
            "M16.1652488,7.87140492 C15.9601275,7.68652692 15.9437171,7.37037004 16.1285951,7.16524877 C16.3134731,6.9601275 16.62963,6.94371708 16.8347512,7.12859508 C19.5251539,9.55348383 19.7403954,13.7002468 17.3155067,16.3906495 C17.1636751,16.5591059 17.0032077,16.7195733 16.8347512,16.8714049 C16.62963,17.0562829 16.3134731,17.0398725 16.1285951,16.8347512 C15.9437171,16.62963 15.9601275,16.3134731 16.1652488,16.1285951 C16.3080183,15.9999153 16.4440171,15.8639166 16.5726968,15.721147 C18.6278296,13.4409869 18.4454089,9.92653766 16.1652488,7.87140492 Z"
        }
      }),
      _vm._v(" "),
      _c("path", {
        attrs: {
          fill: "currentColor",
          "fill-rule": "nonzero",
          d:
            "M18.1757046,5.88056863 C17.9655223,5.70146521 17.940328,5.38588683 18.1194314,5.17570458 C18.2985348,4.96552233 18.6141132,4.94032796 18.8242954,5.11943137 C22.6243285,8.35756831 23.0798354,14.0631325 19.8416985,17.8631656 C19.5301348,18.2287932 19.1899231,18.5690049 18.8242954,18.8805686 C18.6141132,19.059672 18.2985348,19.0344777 18.1194314,18.8242954 C17.940328,18.6141132 17.9655223,18.2985348 18.1757046,18.1194314 C18.500886,17.8423332 18.8034631,17.5397562 19.0805612,17.2145747 C21.9604913,13.8349061 21.5553732,8.76049874 18.1757046,5.88056863 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-min.vue?vue&type=template&id=b6bac9e8&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-min.vue?vue&type=template&id=b6bac9e8& ***!
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
          fill: "currentColor",
          d:
            "M18,11.2928932 L20.1464466,9.14644661 C20.3417088,8.95118446 20.6582912,8.95118446 20.8535534,9.14644661 C21.0488155,9.34170876 21.0488155,9.65829124 20.8535534,9.85355339 L18.7071068,12 L20.8535534,14.1464466 C21.0488155,14.3417088 21.0488155,14.6582912 20.8535534,14.8535534 C20.6582912,15.0488155 20.3417088,15.0488155 20.1464466,14.8535534 L18,12.7071068 L15.8535534,14.8535534 C15.6582912,15.0488155 15.3417088,15.0488155 15.1464466,14.8535534 C14.9511845,14.6582912 14.9511845,14.3417088 15.1464466,14.1464466 L17.2928932,12 L15.1464466,9.85355339 C14.9511845,9.65829124 14.9511845,9.34170876 15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 L18,11.2928932 Z M13,5.5 L13,18.5 C13,18.7761424 12.7761424,19 12.5,19 L10.5,19 C10.310614,19 10.1374824,18.8929988 10.0527864,18.7236068 L9.39442719,17.4068884 C8.65687709,15.9317882 7.14921216,15 5.5,15 L5,15 C3.34314575,15 2,13.6568542 2,12 C2,10.3431458 3.34314575,9 5,9 L5.5,9 C7.14921216,9 8.65687709,8.06821183 9.39442719,6.59311163 L10.0527864,5.2763932 C10.1374824,5.10700119 10.310614,5 10.5,5 L12.5,5 C12.7761424,5 13,5.22385763 13,5.5 Z M12,6 L10.809017,6 L10.2888544,7.04032522 C9.38191227,8.85420946 7.52798422,10 5.5,10 L5,10 C3.8954305,10 3,10.8954305 3,12 C3,13.1045695 3.8954305,14 5,14 L5.5,14 C7.52798422,14 9.38191227,15.1457905 10.2888544,16.9596748 L10.809017,18 L12,18 L12,6 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);