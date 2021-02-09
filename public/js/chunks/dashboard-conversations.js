(self["webpackChunk"] = self["webpackChunk"] || []).push([["dashboard-conversations"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/conversations.js?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/conversations.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _index_index_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index/index.vue */ "./Resources/dashboard/components/conversations/index/index.vue");
/* harmony import */ var _show_show_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show/show.vue */ "./Resources/dashboard/components/conversations/show/show.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Index: _index_index_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    Show: _show_show_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  created: function created() {
    if (this.$route.query.tab) {
      this.$root.detailsTab = this.$route.query.tab;
    }
  },
  methods: {
    showReady: function showReady() {
      var _this = this;

      if (this.$root.intros.conversations.enabled) {
        setTimeout(function () {
          if (!document.querySelector('.introjs-overlay')) {
            _this.$root.intros.conversations.intro.start();
          }
        }, 500);
      }
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/show/show.js?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/show/show.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var filesize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! filesize */ "./node_modules/filesize/lib/filesize.min.js");
/* harmony import */ var filesize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(filesize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_vue_form_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/vue-form-validate */ "./Resources/components/vue-form-validate.vue");
/* harmony import */ var _components_emojipicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/emojipicker */ "./Resources/components/emojipicker.vue");
/* harmony import */ var _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/modal/modal.vue */ "./Resources/components/modal/modal.vue");
/* harmony import */ var _message_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./message-type */ "./Resources/dashboard/components/conversations/show/message-type.vue");
/* harmony import */ var _icons_cast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../icons/cast */ "./Resources/icons/cast.vue");
/* harmony import */ var _icons_colored_info_circle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../icons/colored-info-circle */ "./Resources/icons/colored-info-circle.vue");
/* harmony import */ var _icons_video_camera__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../icons/video-camera */ "./Resources/icons/video-camera.vue");
/* harmony import */ var _icons_microphone__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../icons/microphone */ "./Resources/icons/microphone.vue");
/* harmony import */ var _icons_add_note__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../icons/add-note */ "./Resources/icons/add-note.vue");
/* harmony import */ var _icons_bookmark__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../icons/bookmark */ "./Resources/icons/bookmark.vue");
/* harmony import */ var _icons_plus__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../icons/plus */ "./Resources/icons/plus.vue");
/* harmony import */ var _icons_history__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../icons/history */ "./Resources/icons/history.vue");
/* harmony import */ var _icons_close__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../icons/close */ "./Resources/icons/close.vue");
/* harmony import */ var _icons_expand_wide__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../icons/expand-wide */ "./Resources/icons/expand-wide.vue");
/* harmony import */ var _icons_colored_phone__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../icons/colored-phone */ "./Resources/icons/colored-phone.vue");
/* harmony import */ var _icons_trash__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../icons/trash */ "./Resources/icons/trash.vue");
/* harmony import */ var _icons_eye__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../icons/eye */ "./Resources/icons/eye.vue");
/* harmony import */ var _icons_document__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../icons/document */ "./Resources/icons/document.vue");
/* harmony import */ var _icons_file_archive__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../icons/file-archive */ "./Resources/icons/file-archive.vue");
/* harmony import */ var _icons_file_pdf__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../icons/file-pdf */ "./Resources/icons/file-pdf.vue");
/* harmony import */ var _icons_file_audio__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../icons/file-audio */ "./Resources/icons/file-audio.vue");
/* harmony import */ var _icons_volume_mid__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../icons/volume-mid */ "./Resources/icons/volume-mid.vue");
/* harmony import */ var _icons_play__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../icons/play */ "./Resources/icons/play.vue");
/* harmony import */ var _icons_call_menu__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../icons/call-menu */ "./Resources/icons/call-menu.vue");
/* harmony import */ var _icons_videocam__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../icons/videocam */ "./Resources/icons/videocam.vue");
/* harmony import */ var _icons_microphone_alt__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../icons/microphone-alt */ "./Resources/icons/microphone-alt.vue");
/* harmony import */ var _icons_document_alt__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../../icons/document-alt */ "./Resources/icons/document-alt.vue");
/* harmony import */ var _icons_screen_record__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../../icons/screen-record */ "./Resources/icons/screen-record.vue");
/* harmony import */ var _icons_download__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../../icons/download */ "./Resources/icons/download.vue");
/* harmony import */ var vue_chat_scroll__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! vue-chat-scroll */ "./node_modules/vue-chat-scroll/dist/vue-chat-scroll.js");
/* harmony import */ var vue_chat_scroll__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(vue_chat_scroll__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _js_directives_tooltip__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../../js/directives/tooltip */ "./Resources/js/directives/tooltip.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 //const mime = require('mime');

var loadImage = __webpack_require__(/*! blueimp-load-image */ "./node_modules/blueimp-load-image/js/index.js"); //import Compressor from 'compressorjs';
































vue__WEBPACK_IMPORTED_MODULE_33__.default.use((vue_chat_scroll__WEBPACK_IMPORTED_MODULE_32___default()));
 //import toggleFullscreen from 'toggle-fullscreen';

var emojiRegex = __webpack_require__(/*! emoji-regex */ "./node_modules/emoji-regex/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    VueFormValidate: _components_vue_form_validate__WEBPACK_IMPORTED_MODULE_3__.default,
    Emojipicker: _components_emojipicker__WEBPACK_IMPORTED_MODULE_4__.default,
    Modal: _components_modal_modal_vue__WEBPACK_IMPORTED_MODULE_5__.default,
    MessageType: _message_type__WEBPACK_IMPORTED_MODULE_6__.default,
    CastIcon: _icons_cast__WEBPACK_IMPORTED_MODULE_7__.default,
    InfoCircleIcon: _icons_colored_info_circle__WEBPACK_IMPORTED_MODULE_8__.default,
    VideoCameraIcon: _icons_video_camera__WEBPACK_IMPORTED_MODULE_9__.default,
    MicrophoneIcon: _icons_microphone__WEBPACK_IMPORTED_MODULE_10__.default,
    AddNoteIcon: _icons_add_note__WEBPACK_IMPORTED_MODULE_11__.default,
    BookmarkIcon: _icons_bookmark__WEBPACK_IMPORTED_MODULE_12__.default,
    PlusIcon: _icons_plus__WEBPACK_IMPORTED_MODULE_13__.default,
    HistoryIcon: _icons_history__WEBPACK_IMPORTED_MODULE_14__.default,
    CloseIcon: _icons_close__WEBPACK_IMPORTED_MODULE_15__.default,
    ExpandWideIcon: _icons_expand_wide__WEBPACK_IMPORTED_MODULE_16__.default,
    ColoredPhoneIcon: _icons_colored_phone__WEBPACK_IMPORTED_MODULE_17__.default,
    TrashIcon: _icons_trash__WEBPACK_IMPORTED_MODULE_18__.default,
    EyeIcon: _icons_eye__WEBPACK_IMPORTED_MODULE_19__.default,
    DocumentIcon: _icons_document__WEBPACK_IMPORTED_MODULE_20__.default,
    FileArchiveIcon: _icons_file_archive__WEBPACK_IMPORTED_MODULE_21__.default,
    FilePdfIcon: _icons_file_pdf__WEBPACK_IMPORTED_MODULE_22__.default,
    FileAudioIcon: _icons_file_audio__WEBPACK_IMPORTED_MODULE_23__.default,
    VolumeMidIcon: _icons_volume_mid__WEBPACK_IMPORTED_MODULE_24__.default,
    PlayIcon: _icons_play__WEBPACK_IMPORTED_MODULE_25__.default,
    CallMenuIcon: _icons_call_menu__WEBPACK_IMPORTED_MODULE_26__.default,
    VideocamIcon: _icons_videocam__WEBPACK_IMPORTED_MODULE_27__.default,
    MicrophoneAltIcon: _icons_microphone_alt__WEBPACK_IMPORTED_MODULE_28__.default,
    DocumentAltIcon: _icons_document_alt__WEBPACK_IMPORTED_MODULE_29__.default,
    ScreenRecordIcon: _icons_screen_record__WEBPACK_IMPORTED_MODULE_30__.default,
    DownloadIcon: _icons_download__WEBPACK_IMPORTED_MODULE_31__.default,
    info: function info() {
      return __webpack_require__.e(/*! import() | dashboard-conversations-show-info */ "dashboard-conversations-show-info").then(__webpack_require__.bind(__webpack_require__, /*! ./info/info.vue */ "./Resources/dashboard/components/conversations/show/info/info.vue"));
    },
    gallery: function gallery() {
      return __webpack_require__.e(/*! import() | gallery */ "gallery").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../components/gallery/gallery.vue */ "./Resources/components/gallery/gallery.vue"));
    },
    //'video-recorder-modal': () => import(/* webpackChunkName: "modals-videorecorder" */ '../../../../modals/video-recorder'),
    'audio-recorder-modal': function audioRecorderModal() {
      return __webpack_require__.e(/*! import() | modals-audiorecorder */ "modals-audiorecorder").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../modals/audio-recorder */ "./Resources/modals/audio-recorder.vue"));
    }
  },
  directives: {
    Tooltip: _js_directives_tooltip__WEBPACK_IMPORTED_MODULE_34__.default
  },
  data: function data() {
    return {
      ready: false,
      dragOver: false,
      textMessage: '',
      moreActions: false,
      emojipicker: false,
      selectedFile: null,
      recorder: '',
      hasScreenRecording: false,
      pastedFile: null,
      selectedMessage: null,
      isTyping: false,
      typingTimeout: null,
      pendingFiles: [],
      messagePaginateLoading: false,
      isScreenRecordDownloading: false,
      channel: null,
      typingUsers: {},
      duration: 0
    };
  },
  watch: {
    ready: function ready(value) {
      var _this = this;

      if (value) {
        this.$root.contentloading = false;
        this.$root.getFiles(this.conversation);
      }

      setTimeout(function () {
        _this.$nextTick(function () {
          _this.$emit('ready');
        });
      }, 50);
    },
    'conversation.id': function conversationId() {
      this.ready = false;
      if (this.$refs['messageInput']) this.$refs['messageInput'].focus();
    },
    'conversation.ready': function conversationReady(value) {
      if (value) {
        this.ready = true;

        if (this.channel) {
          this.channel.whisper('readLastMessage', {
            conversation_id: this.conversation.id,
            message_id: this.conversation.last_message.id
          });
        }
      }
    },
    'conversation.last_message': function conversationLast_message(value) {
      if (this.conversation && this.conversation.paginated_messages && value.id) {
        var message = this.conversation.paginated_messages.data.find(function (x) {
          return x.id == value.id;
        });

        if (!message) {
          this.conversation.paginated_messages.data.push(value);

          if (!['text', 'emoji'].find(function (x) {
            return x == value.type;
          })) {
            this.conversation.files.data.unshift(value);
          }
        }
      }
    },
    '$route.params.id': function $routeParamsId(value) {
      var _this2 = this;

      if (value) {
        this.showConversation({
          id: value
        }).then(function () {
          _this2.initChannel();
        });
        this.checkScreenRecorder();
      }
    },
    '$root.screenRecorder.status': function $rootScreenRecorderStatus(value) {
      if (value == 'paused') this.checkScreenRecorder();else this.hasScreenRecording = false;
    },
    '$root.screenRecorder.conversation_id': function $rootScreenRecorderConversation_id(value) {
      if (value == this.conversation.id) this.checkScreenRecorder(); //else this.hasScreenRecording = false;
    }
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_35__.mapGetters)({
    getConversation: 'conversations/show'
  })), (0,vuex__WEBPACK_IMPORTED_MODULE_35__.mapState)({
    contacts: function contacts(state) {
      return state.contacts.index;
    }
  })), {}, {
    conversation: function conversation() {
      return this.getConversation(this.$route.params.id);
    },
    grouped_messages: function grouped_messages() {
      var _this3 = this;

      /* eslint-disable */
      var grouped_messages = []; // sort messages by timestamp

      var messages = ((this.conversation.paginated_messages || {}).data || []).sort(function (a, b) {
        return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
      });

      var _loop = function _loop() {
        var message_group = {
          sender: Object.assign({}, messages[i].user) || (messages[i].metadata.is_chatbot ? {
            id: 'chatbot'
          } : ''),
          messages: [messages[i]]
        };
        var message = message_group.messages[message_group.messages.length - 1];

        if (messages[i].type == 'call_ended' || messages[i].type == 'call_failed') {
          message_group.type = messages[i].type;
        } else {
          var groupMessage = function groupMessage() {
            var next_message = messages[i + 1];

            if (next_message && next_message.user && next_message.user.id == message_group.sender.id && next_message.type != 'call_ended' && next_message.type != 'call_failed') {
              var _message = messages[i + 1];

              if (!message_group.messages.find(function (x) {
                return x.id == _message.id;
              })) {
                message_group.messages.push(_message);
              }

              i++;
              groupMessage();
            }
          };

          groupMessage();
        }

        if (message_group.sender.id == _this3.$root.auth.id || message_group.sender.id == 'chatbot') {
          message_group.sender.full_name = 'You';
          message_group.outgoing = true;
          message_group.is_read = message.is_read;
        }

        message_group.created_at = message.created_at;
        message_group.timestamp = message_group.messages[message_group.messages.length - 1].timestamp;
        grouped_messages.push(message_group);
      };

      for (var i = 0; i <= messages.length - 1; i++) {
        _loop();
      }

      return grouped_messages;
    }
  }),
  created: function created() {
    var _this4 = this;

    this.checkConversation().then(function () {
      _this4.initChannel();
    });
  },
  mounted: function mounted() {
    this.checkScreenRecorder();
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_35__.mapActions)({
    showConversation: 'conversations/show',
    updateConversation: 'conversations/update',
    storeMessage: 'messages/store',
    updateMessage: 'messages/update',
    deleteMessage: 'messages/delete'
  })), {}, {
    getMessageByID: function getMessageByID(messageID) {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var message;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return window.axios.get("/messages/".concat(messageID))["catch"](function () {});

              case 2:
                message = _context.sent;

                if (!message) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", message.data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    initChannel: function initChannel() {
      var _this5 = this;

      if (!this.$route.params.id) return;
      this.typingUsers = {};

      if (this.channel) {
        this.$echo.leaveChannel(this.channel.name);
      }

      this.channel = this.$echo["private"]("conversations.".concat(this.$route.params.id));
      this.conversation.channel = this.channel;
      this.channel.listenForWhisper('typing', function (e) {
        if (_this5.$root.auth.id != e.userId) {
          _this5.$set(_this5.typingUsers, e.userId, e);
        }
      });
      this.channel.listenForWhisper('readLastMessage', function (e) {
        if (_this5.conversation && _this5.conversation.id == e.conversation_id && _this5.conversation.paginated_messages) {
          var message = _this5.conversation.paginated_messages.data.find(function (x) {
            return x.id == e.message_id;
          });

          if (message) _this5.$set(message, 'is_read', true);
        }
      });
      this.channel.listenForWhisper('toggleVideo', function (e) {
        var video = document.querySelector("#wavesurfer-".concat(e.username));

        if (video) {
          if (e.isVideoStopped) {
            video.classList.remove('d-none');
          } else {
            video.classList.add('d-none');
          }
        }
      });
      this.channel.listenForWhisper('isMuted', function (e) {
        var microphoneMute = document.querySelector("#microphone-mute-".concat(e.username));

        if (microphoneMute) {
          if (e.isMuted) {
            microphoneMute.classList.remove('d-none');
          } else {
            microphoneMute.classList.add('d-none');
          }
        }
      });
      this.channel.listen('NewMessageEvent', function (message) {
        _this5.$root.newMessage(message.message);
      });
    },
    contact: function contact(member) {
      return this.contacts.find(function (x) {
        return x.contact_user_id == member.id;
      });
    },
    goToContact: function goToContact(member) {
      var contact = this.contacts.find(function (x) {
        return x.contact_user_id == member.id;
      });

      if (contact) {
        this.$router.push("/dashboard/contacts/".concat(contact.id));
      }
    },
    getText: function getText(e) {
      var clearText = e.clipboardData.getData('text/plain');
      document.execCommand('inserttext', false, clearText);
    },
    messageFormMounted: function messageFormMounted() {
      if (this.$refs['messageInput'] && this.$route.query.focus == 'message_input') {
        this.$refs['messageInput'].focus();
      }
    },
    messageTimezoneTime: function messageTimezoneTime(message) {
      return dayjs__WEBPACK_IMPORTED_MODULE_1___default()(parseFloat(message.timestamp)).format('hh:mmA on ddd');
    },
    getTimeZoneOffset: function getTimeZoneOffset(date, timeZone) {
      // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
      var options = {
        timeZone: timeZone,
        calendar: 'iso8601',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      var dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
      var parts = dateTimeFormat.formatToParts(date);
      var map = new Map(parts.map(function (x) {
        return [x.type, x.value];
      }));
      var year = map.get('year');
      var month = map.get('month');
      var day = map.get('day');
      var hour = map.get('hour');
      var minute = map.get('minute');
      var second = map.get('second');
      var ms = date.getMilliseconds().toString().padStart(3, '0');
      if (hour == '24') hour = '00';
      var iso = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms); // Lie to the Date object constructor that it's a UTC time.

      var lie = new Date(iso + 'Z'); // Return the difference in timestamps, as minutes
      // Positive values are West of GMT, opposite of ISO 8601
      // this matches the output of `Date.getTimeZoneOffset`

      return -(lie - date) / 60 / 1000;
    },
    getFiles: function getFiles() {
      var _this6 = this;

      if (this.conversation) {
        var page = 0;

        if (!this.conversation.files) {
          this.$set(this.conversation, 'files', {
            data: []
          });
          page = 1;
        }

        if ((this.conversation.files || {}).next_page_url) {
          var url = new URL(window.location.origin + this.conversation.files.next_page_url);
          var urlParams = new URLSearchParams(url.search);
          page = urlParams.get('page');
        }

        if (page) {
          this.$set(this.conversation, 'filesLoading', true);
          axios.get("/conversations/".concat(this.conversation.id, "/files?page=").concat(page)).then(function (response) {
            _this6.conversation.files.data = _this6.conversation.files.data.concat(response.data.data);
            _this6.conversation.files.next_page_url = response.data.next_page_url;
            _this6.conversation.filesLoading = false;
          });
        }
      }
    },
    messageScroll: function messageScroll(e) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var initialHeight, url, urlParams, page;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!_this7.messagePaginateLoading && _this7.conversation && (_this7.conversation.paginated_messages || {}).next_page_url)) {
                  _context2.next = 10;
                  break;
                }

                initialHeight = _this7.$refs['message-group-container'].scrollHeight;
                _this7.messagePaginateLoading = true;
                url = new URL(window.location.origin + _this7.conversation.paginated_messages.next_page_url);
                urlParams = new URLSearchParams(url.search);
                page = urlParams.get('page') || 1;
                _context2.next = 8;
                return _this7.showConversation({
                  id: _this7.$route.params.id,
                  page: page
                })["catch"](function (e) {});

              case 8:
                _this7.messagePaginateLoading = false;

                _this7.$nextTick(function () {
                  _this7.$refs['message-group-container'].scrollTop = _this7.$refs['message-group-container'].scrollHeight - initialHeight;
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    typing: function typing() {
      var _this8 = this;

      if (this.channel) {
        if (!this.isTyping) {
          this.isTyping = true;
          this.channel.whisper('typing', {
            userId: this.$root.auth.id,
            name: this.$root.auth.full_name,
            typing: true
          });
        } else {
          clearTimeout(this.typingTimeout);
        }

        this.typingTimeout = setTimeout(function () {
          _this8.isTyping = false;

          _this8.channel.whisper('typing', {
            userId: _this8.$root.auth.id,
            name: _this8.$root.auth.full_name,
            typing: false
          });
        }, 5000);
      }
    },
    messageInput: function messageInput(e) {
      var _this9 = this;

      var isEnter = false;
      this.textMessage = e.target.innerText;

      if ((e.keyCode ? e.keyCode : e.which) == 13) {
        e.preventDefault();
        isEnter = true;
        this.$refs['messageForm'].submit();
        this.$refs['messageInput'].innerHTML = '';
      }

      setTimeout(function () {
        if (!isEnter && _this9.textMessage.trim().length) {
          _this9.typing();
        }
      }, 50);
    },
    checkConversation: function checkConversation() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this10.$route.params.id) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return _this10.showConversation({
                  id: _this10.$route.params.id
                })["catch"](function (e) {
                  _this10.$router.push('/dashboard/bookings/calendar');
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    downloadScreenRecording: function downloadScreenRecording() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var video, link;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this11.conversation && _this11.$root.screenRecorder.conversation_id == _this11.conversation.id && _this11.$root.screenRecorder.data && !_this11.$root.screenRecorder.isDownloaded)) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 3;
                return _this11.$root.$refs['screenRecorder'].submit();

              case 3:
                video = _context4.sent;
                link = document.createElement('a');
                link.download = video.source.name;
                link.href = URL.createObjectURL(video.source);
                link.click();

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    sendScreenRecording: function sendScreenRecording() {
      var _this12 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var video;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this12.conversation && _this12.$root.screenRecorder.conversation_id == _this12.conversation.id && _this12.$root.screenRecorder.data && !_this12.$root.screenRecorder.isSent)) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return _this12.$root.$refs['screenRecorder'].submit();

              case 3:
                video = _context5.sent;
                _this12.hasScreenRecording = false;

                _this12.sendVideo(video);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    checkScreenRecorder: function checkScreenRecorder() {
      var _this13 = this;

      if (this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data) {
        this.hasScreenRecording = true;
        this.$nextTick(function () {
          if (_this13.$refs['screenRecorderData']) {
            var blob = new Blob(_this13.$root.screenRecorder.data);
            _this13.$refs['screenRecorderData'].src = null;
            _this13.$refs['screenRecorderData'].src = URL.createObjectURL(blob);

            _this13.$refs['screenRecorderData'].load();
          }
        });
      } else {
        this.hasScreenRecording = false;
      }
    },
    initScreenRecorder: function initScreenRecorder() {
      var _this14 = this;

      if (!this.$root.screenRecorder.conversation_id) {
        this.$root.screenRecorder.conversation_id = this.conversation.id;
        this.$nextTick(function () {
          _this14.$root.$refs.screenRecorder.initDevices();
        });
      }
    },
    markHistory: function markHistory(message) {
      message.is_history = !message.is_history;
      this.updateMessage(message);
    },
    updateMessageTags: function updateMessageTags(message) {
      var newTag = (message.newTag || '').trim();
      if (newTag && !message.tags.find(function (x) {
        return x == newTag;
      })) message.tags.push(newTag);
      message.newTag = '';
      this.updateMessage(message);
    },
    updateConversationName: function updateConversationName(e) {
      if (this.conversation) {
        var newName = e.target.textContent.trim();

        if (newName != this.conversation.name) {
          this.conversation.name = newName;
          this.updateConversation(this.conversation);
        }
      }
    },
    sendAudio: function sendAudio(audio) {
      if (this.conversation) {
        var message = {
          user: this.$root.auth,
          source: audio.source,
          type: 'audio',
          message: 'audio',
          created_diff: 'Just now',
          metadata: {
            duration: audio.duration
          }
        };
        this.sendMessage(message);
        this.recorder = '';
      }
    },
    sendVideo: function sendVideo(video) {
      if (this.conversation) {
        var message = {
          user: this.$root.auth,
          source: video.source,
          preview: video.preview,
          type: 'video',
          message: 'video',
          created_diff: 'Just now',
          metadata: {
            duration: video.duration
          }
        };
        this.sendMessage(message);
        this.recorder = '';
      }
    },
    openRecorder: function openRecorder(type) {
      this.recorder = type;
    },
    openFile: function openFile(file) {
      if (file.type == 'file') this.$root.downloadMedia(file);else this.selectedFile = file;
    },
    dropFile: function dropFile(e) {
      var _this15 = this;

      this.dragOver = false;
      this.typing();

      var _iterator = _createForOfIteratorHelper(e.dataTransfer.files),
          _step;

      try {
        var _loop2 = function _loop2() {
          var file = _step.value;
          var parts = file.type.split('/');
          file.extension = file.name.split('.').pop();

          if (_this15.$root.isImage(file.extension)) {
            file.dataType = 'image';
          } else if (parts[0] == 'video') {
            file.dataType = 'video';
          } else if (parts[0] == 'audio') {
            file.dataType = 'audio';
          } else if (parts[1] == 'pdf') {
            file.dataType = 'pdf';
          } else {
            file.dataType = 'document';
          }

          if (file.dataType == 'image') {
            loadImage(file, function (canvas) {
              var dataurl = canvas.toDataURL(file.type);

              _this15.pendingFiles.push({
                file: file,
                preview: dataurl
              });
            }, {
              maxWidth: 500,
              canvas: true,
              pixelRatio: window.devicePixelRatio,
              downsamplingRatio: 0.5,
              imageSmoothingEnabled: true
            });
          } else {
            _this15.pendingFiles.push({
              file: file
            });
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    fileToBase64: function fileToBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          return resolve(reader.result);
        };

        reader.onerror = function (error) {
          return reject(error);
        };
      });
    },
    sendMessage: function sendMessage(message) {
      var _this16 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var regex, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!_this16.conversation) {
                  _context6.next = 16;
                  break;
                }

                message.user_id = _this16.$root.auth.id;
                message.sending = true;
                message.prefix = 'You: ';
                message.tags = [];
                message.conversation_id = _this16.conversation.id;
                message.timestamp = dayjs__WEBPACK_IMPORTED_MODULE_1___default()().valueOf();

                if (message.type == 'text' && message.message.trim().length == 2) {
                  regex = emojiRegex();

                  if (regex.exec(message.message)) {
                    message.type = 'emoji';
                  }
                }

                _this16.isTyping = false;

                _this16.channel.whisper('typing', {
                  userId: _this16.$root.auth.id,
                  name: _this16.$root.auth.full_name,
                  typing: false
                });

                message.is_online = _this16.isOnline;
                _context6.next = 13;
                return _this16.storeMessage(message);

              case 13:
                response = _context6.sent;

                _this16.$root.appChannel.whisper('newMessage', {
                  id: response.id,
                  conversation_id: response.conversation_id,
                  timestamp: response.timestamp
                });

                if (!['text', 'emoji'].find(function (x) {
                  return x == response.type;
                })) {
                  _this16.conversation.files.data.unshift(response);
                }

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    addFile: function addFile(e) {
      var _this17 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var fileInput, file, message, fileExtension, messageData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                fileInput = e.target;

                if (!(_this17.conversation && fileInput.files.length > 0)) {
                  _context7.next = 17;
                  break;
                }

                file = fileInput.files[0];
                message = {
                  user: _this17.$root.auth,
                  type: 'file',
                  message: 'file',
                  source: file,
                  created_diff: 'Just now'
                };
                fileExtension = fileInput.value.split('.').pop();

                if (!_this17.$root.isImage(fileExtension)) {
                  _context7.next = 12;
                  break;
                }

                message.type = 'image';
                message.message = 'image';
                message.source = file;
                loadImage(file, function (canvas) {
                  var dataurl = canvas.toDataURL(fileInput.files[0].type);
                  message.preview = dataurl;

                  _this17.sendMessage(message);
                }, {
                  maxWidth: 200,
                  canvas: true
                });
                _context7.next = 17;
                break;

              case 12:
                _context7.next = 14;
                return _this17.fileToBase64(fileInput.files[0]);

              case 14:
                messageData = {
                  filename: fileInput.value.split(/(\\|\/)/g).pop(),
                  extension: fileExtension,
                  size: filesize__WEBPACK_IMPORTED_MODULE_2___default()(fileInput.files[0].size, {
                    round: 0
                  })
                };
                message.metadata = messageData;

                _this17.sendMessage(message);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    selectEmoji: function selectEmoji(emoji) {
      this.$refs['messageInput'].innerHTML += emoji + ' ';
      this.placeCaretAtEnd(this.$refs['messageInput']);
    },
    placeCaretAtEnd: function placeCaretAtEnd(el) {
      el.focus();

      if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != 'undefined') {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
    },
    sendPastedFile: function sendPastedFile() {
      if (this.pastedFile) {
        this.addFile({
          target: {
            files: [this.pastedFile.file],
            value: this.pastedFile.file.name
          }
        });
      }

      this.pastedFile = null;
    },
    inputPaste: function inputPaste(e) {
      if (e.clipboardData.files.length > 0) {
        e.preventDefault();
        var event = {
          dataTransfer: {
            files: e.clipboardData.files
          }
        };
        this.dropFile(event);
      } else {
        var clearText = e.clipboardData.getData('text/plain');
        document.execCommand('inserttext', false, clearText);
      }
    },
    sendText: function sendText() {
      var _this18 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var textMessage, message;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                textMessage = _this18.textMessage.trim();
                _this18.textMessage = '';

                if (!(textMessage.length > 0)) {
                  _context8.next = 6;
                  break;
                }

                message = {
                  user: _this18.$root.auth,
                  message: textMessage,
                  type: 'text',
                  created_diff: 'Just now'
                };
                _context8.next = 6;
                return _this18.sendMessage(message);

              case 6:
                _this18.pendingFiles.forEach(function (file) {
                  _this18.addFile({
                    target: {
                      files: [file.file],
                      value: file.file.name
                    }
                  });
                });

                _this18.pendingFiles = [];

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _icons_emoticon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons/emoticon */ "./Resources/icons/emoticon.vue");
/* harmony import */ var vue_emoji_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-emoji-picker */ "./node_modules/vue-emoji-picker/dist-module/main.js");
/* harmony import */ var vue_emoji_picker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_emoji_picker__WEBPACK_IMPORTED_MODULE_1__);
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    EmojiPicker: (vue_emoji_picker__WEBPACK_IMPORTED_MODULE_1___default()),
    EmoticonIcon: _icons_emoticon__WEBPACK_IMPORTED_MODULE_0__.default
  },
  data: function data() {
    return {};
  },
  methods: {
    insert: function insert(emoji) {
      this.$refs['emoji-invoker'].click();
      this.$emit('select', emoji);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wavesurfer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wavesurfer.js */ "./node_modules/wavesurfer.js/dist/wavesurfer.js");
/* harmony import */ var wavesurfer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wavesurfer_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons_play__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/play */ "./Resources/icons/play.vue");
/* harmony import */ var _icons_pause__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/pause */ "./Resources/icons/pause.vue");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    source: {
      File: File,
      Blob: Blob
    },
    duration: {
      String: String,
      Number: Number
    },
    theme: {}
  },
  components: {
    PlayIcon: _icons_play__WEBPACK_IMPORTED_MODULE_2__.default,
    PauseIcon: _icons_pause__WEBPACK_IMPORTED_MODULE_3__.default
  },
  data: function data() {
    return {
      wavesurfer: null,
      playerStatus: 'paused'
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.wavesurfer.stop();
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.wavesurfer = wavesurfer_js__WEBPACK_IMPORTED_MODULE_1___default().create({
                container: _this.$refs['waveplayer'],
                height: 25,
                barWidth: 3,
                barHeight: 1,
                barRadius: 3,
                interact: true,
                cursorWidth: 1,
                hideScrollbar: true
              });

              if (_this.theme == 'light') {
                _this.wavesurfer.setCursorColor('rgba(255,255,255,0.4)');

                _this.wavesurfer.setProgressColor('#fff');

                _this.wavesurfer.setWaveColor('rgba(255,255,255,0.4)');
              } else {
                _this.wavesurfer.setCursorColor('#b5bce5');

                _this.wavesurfer.setProgressColor('#6e82ea');

                _this.wavesurfer.setWaveColor('#b5bce5');
              }

              if (typeof _this.source == 'string') {
                _this.wavesurfer.load(_this.source);
              } else if (_typeof(_this.source) == 'object') {
                _this.wavesurfer.load(window.URL.createObjectURL(_this.source));
              }

              _this.wavesurfer.on('finish', function () {
                _this.playerStatus = 'paused';

                _this.wavesurfer.seekTo(0);
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
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
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _icons_file_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../icons/file-empty */ "./Resources/icons/file-empty.vue");
/* harmony import */ var _icons_file_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../icons/file-image */ "./Resources/icons/file-image.vue");
/* harmony import */ var _icons_file_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../icons/file-video */ "./Resources/icons/file-video.vue");
/* harmony import */ var _icons_file_audio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../icons/file-audio */ "./Resources/icons/file-audio.vue");
/* harmony import */ var _icons_file_pdf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../icons/file-pdf */ "./Resources/icons/file-pdf.vue");
/* harmony import */ var _icons_file_archive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../icons/file-archive */ "./Resources/icons/file-archive.vue");
/* harmony import */ var _icons_document__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../icons/document */ "./Resources/icons/document.vue");
/* harmony import */ var _icons_arrow_circle_down__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../icons/arrow-circle-down */ "./Resources/icons/arrow-circle-down.vue");
/* harmony import */ var _icons_play__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../icons/play */ "./Resources/icons/play.vue");
/* harmony import */ var _components_waveplayer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/waveplayer */ "./Resources/components/waveplayer.vue");
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










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    message: {
      type: Object
    },
    outgoing: {
      type: Boolean,
      "default": false
    },
    click: {
      type: Boolean,
      "default": true
    },
    squareThumbnail: {
      type: Boolean,
      "default": false
    }
  },
  components: {
    FileEmptyIcon: _icons_file_empty__WEBPACK_IMPORTED_MODULE_0__.default,
    FileImageIcon: _icons_file_image__WEBPACK_IMPORTED_MODULE_1__.default,
    FileVideoIcon: _icons_file_video__WEBPACK_IMPORTED_MODULE_2__.default,
    FileAudioIcon: _icons_file_audio__WEBPACK_IMPORTED_MODULE_3__.default,
    FilePdfIcon: _icons_file_pdf__WEBPACK_IMPORTED_MODULE_4__.default,
    FileArchiveIcon: _icons_file_archive__WEBPACK_IMPORTED_MODULE_5__.default,
    DocumentIcon: _icons_document__WEBPACK_IMPORTED_MODULE_6__.default,
    ArrowCircleDownIcon: _icons_arrow_circle_down__WEBPACK_IMPORTED_MODULE_7__.default,
    PlayIcon: _icons_play__WEBPACK_IMPORTED_MODULE_8__.default,
    Waveplayer: _components_waveplayer__WEBPACK_IMPORTED_MODULE_9__.default
  },
  methods: {
    fileIcon: function fileIcon(extension) {
      var iconComponent = 'document-icon';
      var videoExtensions = ['mp4', 'webm'];
      var audioExtensions = ['mp3', 'wav'];

      if (this.$root.isImage(extension)) {
        iconComponent = 'file-image-icon';
      } else if (videoExtensions.indexOf(extension) > -1) {
        iconComponent = 'file-video-icon';
      } else if (audioExtensions.indexOf(extension) > -1) {
        iconComponent = 'file-audio-icon';
      } else {
        switch (extension) {
          case 'pdf':
            iconComponent = 'file-pdf-icon';
            break;

          case 'zip':
            iconComponent = 'file-archive-icon';
            break;

          case 'rar':
            iconComponent = 'file-archive-icon';
            break;

          case 'docx':
            iconComponent = 'document-icon';
            break;

          case 'doc':
            iconComponent = 'document-icon';
            break;

          case 'txt':
            iconComponent = 'document-icon';
            break;

          case 'xls':
            break;

          case 'xlsx':
            break;
        }
      }

      return iconComponent;
    },
    urlify: function urlify(text) {
      var urlRegex = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
      return text.replaceAll(urlRegex, function (url) {
        return '<a target="_blank" href="' + url + '">' + url + '</a>';
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/add-note.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/add-note.vue?vue&type=script&lang=js& ***!
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
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'add-note'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-circle-down.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-circle-down.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  name: 'arrow-circle-down'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bookmark.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bookmark.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'bookmark'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/cast.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/cast.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'cast'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-info-circle.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-info-circle.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
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
  name: 'info-circle'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-phone.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-phone.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'colored-phone'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/document-alt.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/document-alt.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'document-alt'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/emoticon.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/emoticon.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'emoticon'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/expand-wide.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/expand-wide.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'expand-wide'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/eye.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/eye.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************/
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
  name: 'eye'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-audio.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-audio.vue?vue&type=script&lang=js& ***!
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
  name: 'file-audio'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-empty.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-empty.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'file-empty'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-image.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-image.vue?vue&type=script&lang=js& ***!
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
  name: 'file-image'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-video.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-video.vue?vue&type=script&lang=js& ***!
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
  name: 'file-video'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/history.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/history.vue?vue&type=script&lang=js& ***!
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
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'history'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pause.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pause.vue?vue&type=script&lang=js& ***!
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
  name: 'pause'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/play.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/play.vue?vue&type=script&lang=js& ***!
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
  name: 'play'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/screen-record.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/screen-record.vue?vue&type=script&lang=js& ***!
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
  name: 'screen-record'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/video-camera.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/video-camera.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
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
  name: 'video-camera'
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-mid.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-mid.vue?vue&type=script&lang=js& ***!
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
  name: 'volume-mid'
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

/***/ "./node_modules/blueimp-load-image/js/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global module, require */

module.exports = __webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js")

__webpack_require__(/*! ./load-image-scale */ "./node_modules/blueimp-load-image/js/load-image-scale.js")
__webpack_require__(/*! ./load-image-meta */ "./node_modules/blueimp-load-image/js/load-image-meta.js")
__webpack_require__(/*! ./load-image-fetch */ "./node_modules/blueimp-load-image/js/load-image-fetch.js")
__webpack_require__(/*! ./load-image-exif */ "./node_modules/blueimp-load-image/js/load-image-exif.js")
__webpack_require__(/*! ./load-image-exif-map */ "./node_modules/blueimp-load-image/js/load-image-exif-map.js")
__webpack_require__(/*! ./load-image-iptc */ "./node_modules/blueimp-load-image/js/load-image-iptc.js")
__webpack_require__(/*! ./load-image-iptc-map */ "./node_modules/blueimp-load-image/js/load-image-iptc-map.js")
__webpack_require__(/*! ./load-image-orientation */ "./node_modules/blueimp-load-image/js/load-image-orientation.js")


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-exif-map.js":
/*!*******************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-exif-map.js ***!
  \*******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Exif Map
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Exif tags mapping based on
 * https://github.com/jseidelin/exif-js
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js"), __webpack_require__(/*! ./load-image-exif */ "./node_modules/blueimp-load-image/js/load-image-exif.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  var ExifMapProto = loadImage.ExifMap.prototype

  ExifMapProto.tags = {
    // =================
    // TIFF tags (IFD0):
    // =================
    0x0100: 'ImageWidth',
    0x0101: 'ImageHeight',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    0x0112: 'Orientation',
    0x0115: 'SamplesPerPixel',
    0x011c: 'PlanarConfiguration',
    0x0212: 'YCbCrSubSampling',
    0x0213: 'YCbCrPositioning',
    0x011a: 'XResolution',
    0x011b: 'YResolution',
    0x0128: 'ResolutionUnit',
    0x0111: 'StripOffsets',
    0x0116: 'RowsPerStrip',
    0x0117: 'StripByteCounts',
    0x0201: 'JPEGInterchangeFormat',
    0x0202: 'JPEGInterchangeFormatLength',
    0x012d: 'TransferFunction',
    0x013e: 'WhitePoint',
    0x013f: 'PrimaryChromaticities',
    0x0211: 'YCbCrCoefficients',
    0x0214: 'ReferenceBlackWhite',
    0x0132: 'DateTime',
    0x010e: 'ImageDescription',
    0x010f: 'Make',
    0x0110: 'Model',
    0x0131: 'Software',
    0x013b: 'Artist',
    0x8298: 'Copyright',
    0x8769: {
      // ExifIFDPointer
      0x9000: 'ExifVersion', // EXIF version
      0xa000: 'FlashpixVersion', // Flashpix format version
      0xa001: 'ColorSpace', // Color space information tag
      0xa002: 'PixelXDimension', // Valid width of meaningful image
      0xa003: 'PixelYDimension', // Valid height of meaningful image
      0xa500: 'Gamma',
      0x9101: 'ComponentsConfiguration', // Information about channels
      0x9102: 'CompressedBitsPerPixel', // Compressed bits per pixel
      0x927c: 'MakerNote', // Any desired information written by the manufacturer
      0x9286: 'UserComment', // Comments by user
      0xa004: 'RelatedSoundFile', // Name of related sound file
      0x9003: 'DateTimeOriginal', // Date and time when the original image was generated
      0x9004: 'DateTimeDigitized', // Date and time when the image was stored digitally
      0x9010: 'OffsetTime', // Time zone when the image file was last changed
      0x9011: 'OffsetTimeOriginal', // Time zone when the image was stored digitally
      0x9012: 'OffsetTimeDigitized', // Time zone when the image was stored digitally
      0x9290: 'SubSecTime', // Fractions of seconds for DateTime
      0x9291: 'SubSecTimeOriginal', // Fractions of seconds for DateTimeOriginal
      0x9292: 'SubSecTimeDigitized', // Fractions of seconds for DateTimeDigitized
      0x829a: 'ExposureTime', // Exposure time (in seconds)
      0x829d: 'FNumber',
      0x8822: 'ExposureProgram', // Exposure program
      0x8824: 'SpectralSensitivity', // Spectral sensitivity
      0x8827: 'PhotographicSensitivity', // EXIF 2.3, ISOSpeedRatings in EXIF 2.2
      0x8828: 'OECF', // Optoelectric conversion factor
      0x8830: 'SensitivityType',
      0x8831: 'StandardOutputSensitivity',
      0x8832: 'RecommendedExposureIndex',
      0x8833: 'ISOSpeed',
      0x8834: 'ISOSpeedLatitudeyyy',
      0x8835: 'ISOSpeedLatitudezzz',
      0x9201: 'ShutterSpeedValue', // Shutter speed
      0x9202: 'ApertureValue', // Lens aperture
      0x9203: 'BrightnessValue', // Value of brightness
      0x9204: 'ExposureBias', // Exposure bias
      0x9205: 'MaxApertureValue', // Smallest F number of lens
      0x9206: 'SubjectDistance', // Distance to subject in meters
      0x9207: 'MeteringMode', // Metering mode
      0x9208: 'LightSource', // Kind of light source
      0x9209: 'Flash', // Flash status
      0x9214: 'SubjectArea', // Location and area of main subject
      0x920a: 'FocalLength', // Focal length of the lens in mm
      0xa20b: 'FlashEnergy', // Strobe energy in BCPS
      0xa20c: 'SpatialFrequencyResponse',
      0xa20e: 'FocalPlaneXResolution', // Number of pixels in width direction per FPRUnit
      0xa20f: 'FocalPlaneYResolution', // Number of pixels in height direction per FPRUnit
      0xa210: 'FocalPlaneResolutionUnit', // Unit for measuring the focal plane resolution
      0xa214: 'SubjectLocation', // Location of subject in image
      0xa215: 'ExposureIndex', // Exposure index selected on camera
      0xa217: 'SensingMethod', // Image sensor type
      0xa300: 'FileSource', // Image source (3 == DSC)
      0xa301: 'SceneType', // Scene type (1 == directly photographed)
      0xa302: 'CFAPattern', // Color filter array geometric pattern
      0xa401: 'CustomRendered', // Special processing
      0xa402: 'ExposureMode', // Exposure mode
      0xa403: 'WhiteBalance', // 1 = auto white balance, 2 = manual
      0xa404: 'DigitalZoomRatio', // Digital zoom ratio
      0xa405: 'FocalLengthIn35mmFilm',
      0xa406: 'SceneCaptureType', // Type of scene
      0xa407: 'GainControl', // Degree of overall image gain adjustment
      0xa408: 'Contrast', // Direction of contrast processing applied by camera
      0xa409: 'Saturation', // Direction of saturation processing applied by camera
      0xa40a: 'Sharpness', // Direction of sharpness processing applied by camera
      0xa40b: 'DeviceSettingDescription',
      0xa40c: 'SubjectDistanceRange', // Distance to subject
      0xa420: 'ImageUniqueID', // Identifier assigned uniquely to each image
      0xa430: 'CameraOwnerName',
      0xa431: 'BodySerialNumber',
      0xa432: 'LensSpecification',
      0xa433: 'LensMake',
      0xa434: 'LensModel',
      0xa435: 'LensSerialNumber'
    },
    0x8825: {
      // GPSInfoIFDPointer
      0x0000: 'GPSVersionID',
      0x0001: 'GPSLatitudeRef',
      0x0002: 'GPSLatitude',
      0x0003: 'GPSLongitudeRef',
      0x0004: 'GPSLongitude',
      0x0005: 'GPSAltitudeRef',
      0x0006: 'GPSAltitude',
      0x0007: 'GPSTimeStamp',
      0x0008: 'GPSSatellites',
      0x0009: 'GPSStatus',
      0x000a: 'GPSMeasureMode',
      0x000b: 'GPSDOP',
      0x000c: 'GPSSpeedRef',
      0x000d: 'GPSSpeed',
      0x000e: 'GPSTrackRef',
      0x000f: 'GPSTrack',
      0x0010: 'GPSImgDirectionRef',
      0x0011: 'GPSImgDirection',
      0x0012: 'GPSMapDatum',
      0x0013: 'GPSDestLatitudeRef',
      0x0014: 'GPSDestLatitude',
      0x0015: 'GPSDestLongitudeRef',
      0x0016: 'GPSDestLongitude',
      0x0017: 'GPSDestBearingRef',
      0x0018: 'GPSDestBearing',
      0x0019: 'GPSDestDistanceRef',
      0x001a: 'GPSDestDistance',
      0x001b: 'GPSProcessingMethod',
      0x001c: 'GPSAreaInformation',
      0x001d: 'GPSDateStamp',
      0x001e: 'GPSDifferential',
      0x001f: 'GPSHPositioningError'
    },
    0xa005: {
      // InteroperabilityIFDPointer
      0x0001: 'InteroperabilityIndex'
    }
  }

  // IFD1 directory can contain any IFD0 tags:
  ExifMapProto.tags.ifd1 = ExifMapProto.tags

  ExifMapProto.stringValues = {
    ExposureProgram: {
      0: 'Undefined',
      1: 'Manual',
      2: 'Normal program',
      3: 'Aperture priority',
      4: 'Shutter priority',
      5: 'Creative program',
      6: 'Action program',
      7: 'Portrait mode',
      8: 'Landscape mode'
    },
    MeteringMode: {
      0: 'Unknown',
      1: 'Average',
      2: 'CenterWeightedAverage',
      3: 'Spot',
      4: 'MultiSpot',
      5: 'Pattern',
      6: 'Partial',
      255: 'Other'
    },
    LightSource: {
      0: 'Unknown',
      1: 'Daylight',
      2: 'Fluorescent',
      3: 'Tungsten (incandescent light)',
      4: 'Flash',
      9: 'Fine weather',
      10: 'Cloudy weather',
      11: 'Shade',
      12: 'Daylight fluorescent (D 5700 - 7100K)',
      13: 'Day white fluorescent (N 4600 - 5400K)',
      14: 'Cool white fluorescent (W 3900 - 4500K)',
      15: 'White fluorescent (WW 3200 - 3700K)',
      17: 'Standard light A',
      18: 'Standard light B',
      19: 'Standard light C',
      20: 'D55',
      21: 'D65',
      22: 'D75',
      23: 'D50',
      24: 'ISO studio tungsten',
      255: 'Other'
    },
    Flash: {
      0x0000: 'Flash did not fire',
      0x0001: 'Flash fired',
      0x0005: 'Strobe return light not detected',
      0x0007: 'Strobe return light detected',
      0x0009: 'Flash fired, compulsory flash mode',
      0x000d: 'Flash fired, compulsory flash mode, return light not detected',
      0x000f: 'Flash fired, compulsory flash mode, return light detected',
      0x0010: 'Flash did not fire, compulsory flash mode',
      0x0018: 'Flash did not fire, auto mode',
      0x0019: 'Flash fired, auto mode',
      0x001d: 'Flash fired, auto mode, return light not detected',
      0x001f: 'Flash fired, auto mode, return light detected',
      0x0020: 'No flash function',
      0x0041: 'Flash fired, red-eye reduction mode',
      0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
      0x0047: 'Flash fired, red-eye reduction mode, return light detected',
      0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
      0x004d: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
      0x004f: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
      0x0059: 'Flash fired, auto mode, red-eye reduction mode',
      0x005d: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
      0x005f: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
    },
    SensingMethod: {
      1: 'Undefined',
      2: 'One-chip color area sensor',
      3: 'Two-chip color area sensor',
      4: 'Three-chip color area sensor',
      5: 'Color sequential area sensor',
      7: 'Trilinear sensor',
      8: 'Color sequential linear sensor'
    },
    SceneCaptureType: {
      0: 'Standard',
      1: 'Landscape',
      2: 'Portrait',
      3: 'Night scene'
    },
    SceneType: {
      1: 'Directly photographed'
    },
    CustomRendered: {
      0: 'Normal process',
      1: 'Custom process'
    },
    WhiteBalance: {
      0: 'Auto white balance',
      1: 'Manual white balance'
    },
    GainControl: {
      0: 'None',
      1: 'Low gain up',
      2: 'High gain up',
      3: 'Low gain down',
      4: 'High gain down'
    },
    Contrast: {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard'
    },
    Saturation: {
      0: 'Normal',
      1: 'Low saturation',
      2: 'High saturation'
    },
    Sharpness: {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard'
    },
    SubjectDistanceRange: {
      0: 'Unknown',
      1: 'Macro',
      2: 'Close view',
      3: 'Distant view'
    },
    FileSource: {
      3: 'DSC'
    },
    ComponentsConfiguration: {
      0: '',
      1: 'Y',
      2: 'Cb',
      3: 'Cr',
      4: 'R',
      5: 'G',
      6: 'B'
    },
    Orientation: {
      1: 'Original',
      2: 'Horizontal flip',
      3: 'Rotate 180° CCW',
      4: 'Vertical flip',
      5: 'Vertical flip + Rotate 90° CW',
      6: 'Rotate 90° CW',
      7: 'Horizontal flip + Rotate 90° CW',
      8: 'Rotate 90° CCW'
    }
  }

  ExifMapProto.getText = function (name) {
    var value = this.get(name)
    switch (name) {
      case 'LightSource':
      case 'Flash':
      case 'MeteringMode':
      case 'ExposureProgram':
      case 'SensingMethod':
      case 'SceneCaptureType':
      case 'SceneType':
      case 'CustomRendered':
      case 'WhiteBalance':
      case 'GainControl':
      case 'Contrast':
      case 'Saturation':
      case 'Sharpness':
      case 'SubjectDistanceRange':
      case 'FileSource':
      case 'Orientation':
        return this.stringValues[name][value]
      case 'ExifVersion':
      case 'FlashpixVersion':
        if (!value) return
        return String.fromCharCode(value[0], value[1], value[2], value[3])
      case 'ComponentsConfiguration':
        if (!value) return
        return (
          this.stringValues[name][value[0]] +
          this.stringValues[name][value[1]] +
          this.stringValues[name][value[2]] +
          this.stringValues[name][value[3]]
        )
      case 'GPSVersionID':
        if (!value) return
        return value[0] + '.' + value[1] + '.' + value[2] + '.' + value[3]
    }
    return String(value)
  }

  ExifMapProto.getAll = function () {
    var map = {}
    var prop
    var obj
    var name
    for (prop in this) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        obj = this[prop]
        if (obj && obj.getAll) {
          map[this.ifds[prop].name] = obj.getAll()
        } else {
          name = this.tags[prop]
          if (name) map[name] = this.getText(name)
        }
      }
    }
    return map
  }

  ExifMapProto.getName = function (tagCode) {
    var name = this.tags[tagCode]
    if (typeof name === 'object') return this.ifds[tagCode].name
    return name
  }

  // Extend the map of tag names to tag codes:
  ;(function () {
    var tags = ExifMapProto.tags
    var prop
    var ifd
    var subTags
    // Map the tag names to tags:
    for (prop in tags) {
      if (Object.prototype.hasOwnProperty.call(tags, prop)) {
        ifd = ExifMapProto.ifds[prop]
        if (ifd) {
          subTags = tags[prop]
          for (prop in subTags) {
            if (Object.prototype.hasOwnProperty.call(subTags, prop)) {
              ifd.map[subTags[prop]] = Number(prop)
            }
          }
        } else {
          ExifMapProto.map[tags[prop]] = Number(prop)
        }
      }
    }
  })()
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-exif.js":
/*!***************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-exif.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Exif Parser
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require, DataView */

/* eslint-disable no-console */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js"), __webpack_require__(/*! ./load-image-meta */ "./node_modules/blueimp-load-image/js/load-image-meta.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  /**
   * Exif tag map
   *
   * @name ExifMap
   * @class
   * @param {number|string} tagCode IFD tag code
   */
  function ExifMap(tagCode) {
    if (tagCode) {
      Object.defineProperty(this, 'map', {
        value: this.ifds[tagCode].map
      })
      Object.defineProperty(this, 'tags', {
        value: (this.tags && this.tags[tagCode]) || {}
      })
    }
  }

  ExifMap.prototype.map = {
    Orientation: 0x0112,
    Thumbnail: 'ifd1',
    Blob: 0x0201, // Alias for JPEGInterchangeFormat
    Exif: 0x8769,
    GPSInfo: 0x8825,
    Interoperability: 0xa005
  }

  ExifMap.prototype.ifds = {
    ifd1: { name: 'Thumbnail', map: ExifMap.prototype.map },
    0x8769: { name: 'Exif', map: {} },
    0x8825: { name: 'GPSInfo', map: {} },
    0xa005: { name: 'Interoperability', map: {} }
  }

  /**
   * Retrieves exif tag value
   *
   * @param {number|string} id Exif tag code or name
   * @returns {object} Exif tag value
   */
  ExifMap.prototype.get = function (id) {
    return this[id] || this[this.map[id]]
  }

  /**
   * Returns the Exif Thumbnail data as Blob.
   *
   * @param {DataView} dataView Data view interface
   * @param {number} offset Thumbnail data offset
   * @param {number} length Thumbnail data length
   * @returns {undefined|Blob} Returns the Thumbnail Blob or undefined
   */
  function getExifThumbnail(dataView, offset, length) {
    if (!length) return
    if (offset + length > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid thumbnail data.')
      return
    }
    return new Blob(
      [loadImage.bufferSlice.call(dataView.buffer, offset, offset + length)],
      {
        type: 'image/jpeg'
      }
    )
  }

  var ExifTagTypes = {
    // byte, 8-bit unsigned int:
    1: {
      getValue: function (dataView, dataOffset) {
        return dataView.getUint8(dataOffset)
      },
      size: 1
    },
    // ascii, 8-bit byte:
    2: {
      getValue: function (dataView, dataOffset) {
        return String.fromCharCode(dataView.getUint8(dataOffset))
      },
      size: 1,
      ascii: true
    },
    // short, 16 bit int:
    3: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getUint16(dataOffset, littleEndian)
      },
      size: 2
    },
    // long, 32 bit int:
    4: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getUint32(dataOffset, littleEndian)
      },
      size: 4
    },
    // rational = two long values, first is numerator, second is denominator:
    5: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return (
          dataView.getUint32(dataOffset, littleEndian) /
          dataView.getUint32(dataOffset + 4, littleEndian)
        )
      },
      size: 8
    },
    // slong, 32 bit signed int:
    9: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getInt32(dataOffset, littleEndian)
      },
      size: 4
    },
    // srational, two slongs, first is numerator, second is denominator:
    10: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return (
          dataView.getInt32(dataOffset, littleEndian) /
          dataView.getInt32(dataOffset + 4, littleEndian)
        )
      },
      size: 8
    }
  }
  // undefined, 8-bit byte, value depending on field:
  ExifTagTypes[7] = ExifTagTypes[1]

  /**
   * Returns Exif tag value.
   *
   * @param {DataView} dataView Data view interface
   * @param {number} tiffOffset TIFF offset
   * @param {number} offset Tag offset
   * @param {number} type Tag type
   * @param {number} length Tag length
   * @param {boolean} littleEndian Little endian encoding
   * @returns {object} Tag value
   */
  function getExifValue(
    dataView,
    tiffOffset,
    offset,
    type,
    length,
    littleEndian
  ) {
    var tagType = ExifTagTypes[type]
    var tagSize
    var dataOffset
    var values
    var i
    var str
    var c
    if (!tagType) {
      console.log('Invalid Exif data: Invalid tag type.')
      return
    }
    tagSize = tagType.size * length
    // Determine if the value is contained in the dataOffset bytes,
    // or if the value at the dataOffset is a pointer to the actual data:
    dataOffset =
      tagSize > 4
        ? tiffOffset + dataView.getUint32(offset + 8, littleEndian)
        : offset + 8
    if (dataOffset + tagSize > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid data offset.')
      return
    }
    if (length === 1) {
      return tagType.getValue(dataView, dataOffset, littleEndian)
    }
    values = []
    for (i = 0; i < length; i += 1) {
      values[i] = tagType.getValue(
        dataView,
        dataOffset + i * tagType.size,
        littleEndian
      )
    }
    if (tagType.ascii) {
      str = ''
      // Concatenate the chars:
      for (i = 0; i < values.length; i += 1) {
        c = values[i]
        // Ignore the terminating NULL byte(s):
        if (c === '\u0000') {
          break
        }
        str += c
      }
      return str
    }
    return values
  }

  /**
   * Determines if the given tag should be included.
   *
   * @param {object} includeTags Map of tags to include
   * @param {object} excludeTags Map of tags to exclude
   * @param {number|string} tagCode Tag code to check
   * @returns {boolean} True if the tag should be included
   */
  function shouldIncludeTag(includeTags, excludeTags, tagCode) {
    return (
      (!includeTags || includeTags[tagCode]) &&
      (!excludeTags || excludeTags[tagCode] !== true)
    )
  }

  /**
   * Parses Exif tags.
   *
   * @param {DataView} dataView Data view interface
   * @param {number} tiffOffset TIFF offset
   * @param {number} dirOffset Directory offset
   * @param {boolean} littleEndian Little endian encoding
   * @param {ExifMap} tags Map to store parsed exif tags
   * @param {ExifMap} tagOffsets Map to store parsed exif tag offsets
   * @param {object} includeTags Map of tags to include
   * @param {object} excludeTags Map of tags to exclude
   * @returns {number} Next directory offset
   */
  function parseExifTags(
    dataView,
    tiffOffset,
    dirOffset,
    littleEndian,
    tags,
    tagOffsets,
    includeTags,
    excludeTags
  ) {
    var tagsNumber, dirEndOffset, i, tagOffset, tagNumber, tagValue
    if (dirOffset + 6 > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid directory offset.')
      return
    }
    tagsNumber = dataView.getUint16(dirOffset, littleEndian)
    dirEndOffset = dirOffset + 2 + 12 * tagsNumber
    if (dirEndOffset + 4 > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid directory size.')
      return
    }
    for (i = 0; i < tagsNumber; i += 1) {
      tagOffset = dirOffset + 2 + 12 * i
      tagNumber = dataView.getUint16(tagOffset, littleEndian)
      if (!shouldIncludeTag(includeTags, excludeTags, tagNumber)) continue
      tagValue = getExifValue(
        dataView,
        tiffOffset,
        tagOffset,
        dataView.getUint16(tagOffset + 2, littleEndian), // tag type
        dataView.getUint32(tagOffset + 4, littleEndian), // tag length
        littleEndian
      )
      tags[tagNumber] = tagValue
      if (tagOffsets) {
        tagOffsets[tagNumber] = tagOffset
      }
    }
    // Return the offset to the next directory:
    return dataView.getUint32(dirEndOffset, littleEndian)
  }

  /**
   * Parses tags in a given IFD (Image File Directory).
   *
   * @param {object} data Data object to store exif tags and offsets
   * @param {number|string} tagCode IFD tag code
   * @param {DataView} dataView Data view interface
   * @param {number} tiffOffset TIFF offset
   * @param {boolean} littleEndian Little endian encoding
   * @param {object} includeTags Map of tags to include
   * @param {object} excludeTags Map of tags to exclude
   */
  function parseExifIFD(
    data,
    tagCode,
    dataView,
    tiffOffset,
    littleEndian,
    includeTags,
    excludeTags
  ) {
    var dirOffset = data.exif[tagCode]
    if (dirOffset) {
      data.exif[tagCode] = new ExifMap(tagCode)
      if (data.exifOffsets) {
        data.exifOffsets[tagCode] = new ExifMap(tagCode)
      }
      parseExifTags(
        dataView,
        tiffOffset,
        tiffOffset + dirOffset,
        littleEndian,
        data.exif[tagCode],
        data.exifOffsets && data.exifOffsets[tagCode],
        includeTags && includeTags[tagCode],
        excludeTags && excludeTags[tagCode]
      )
    }
  }

  loadImage.parseExifData = function (dataView, offset, length, data, options) {
    if (options.disableExif) {
      return
    }
    var includeTags = options.includeExifTags
    var excludeTags = options.excludeExifTags || {
      0x8769: {
        // ExifIFDPointer
        0x927c: true // MakerNote
      }
    }
    var tiffOffset = offset + 10
    var littleEndian
    var dirOffset
    var thumbnailIFD
    // Check for the ASCII code for "Exif" (0x45786966):
    if (dataView.getUint32(offset + 4) !== 0x45786966) {
      // No Exif data, might be XMP data instead
      return
    }
    if (tiffOffset + 8 > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid segment size.')
      return
    }
    // Check for the two null bytes:
    if (dataView.getUint16(offset + 8) !== 0x0000) {
      console.log('Invalid Exif data: Missing byte alignment offset.')
      return
    }
    // Check the byte alignment:
    switch (dataView.getUint16(tiffOffset)) {
      case 0x4949:
        littleEndian = true
        break
      case 0x4d4d:
        littleEndian = false
        break
      default:
        console.log('Invalid Exif data: Invalid byte alignment marker.')
        return
    }
    // Check for the TIFF tag marker (0x002A):
    if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002a) {
      console.log('Invalid Exif data: Missing TIFF marker.')
      return
    }
    // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
    dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian)
    // Create the exif object to store the tags:
    data.exif = new ExifMap()
    if (!options.disableExifOffsets) {
      data.exifOffsets = new ExifMap()
      data.exifTiffOffset = tiffOffset
      data.exifLittleEndian = littleEndian
    }
    // Parse the tags of the main image directory (IFD0) and retrieve the
    // offset to the next directory (IFD1), usually the thumbnail directory:
    dirOffset = parseExifTags(
      dataView,
      tiffOffset,
      tiffOffset + dirOffset,
      littleEndian,
      data.exif,
      data.exifOffsets,
      includeTags,
      excludeTags
    )
    if (dirOffset && shouldIncludeTag(includeTags, excludeTags, 'ifd1')) {
      data.exif.ifd1 = dirOffset
      if (data.exifOffsets) {
        data.exifOffsets.ifd1 = tiffOffset + dirOffset
      }
    }
    Object.keys(data.exif.ifds).forEach(function (tagCode) {
      parseExifIFD(
        data,
        tagCode,
        dataView,
        tiffOffset,
        littleEndian,
        includeTags,
        excludeTags
      )
    })
    thumbnailIFD = data.exif.ifd1
    // Check for JPEG Thumbnail offset and data length:
    if (thumbnailIFD && thumbnailIFD[0x0201]) {
      thumbnailIFD[0x0201] = getExifThumbnail(
        dataView,
        tiffOffset + thumbnailIFD[0x0201],
        thumbnailIFD[0x0202] // Thumbnail data length
      )
    }
  }

  // Registers the Exif parser for the APP1 JPEG metadata segment:
  loadImage.metaDataParsers.jpeg[0xffe1].push(loadImage.parseExifData)

  loadImage.exifWriters = {
    // Orientation writer:
    0x0112: function (buffer, data, value) {
      var orientationOffset = data.exifOffsets[0x0112]
      if (!orientationOffset) return buffer
      var view = new DataView(buffer, orientationOffset + 8, 2)
      view.setUint16(0, value, data.exifLittleEndian)
      return buffer
    }
  }

  loadImage.writeExifData = function (buffer, data, id, value) {
    return loadImage.exifWriters[data.exif.map[id]](buffer, data, value)
  }

  loadImage.ExifMap = ExifMap

  // Adds the following properties to the parseMetaData callback data:
  // - exif: The parsed Exif tags
  // - exifOffsets: The parsed Exif tag offsets
  // - exifTiffOffset: TIFF header offset (used for offset pointers)
  // - exifLittleEndian: little endian order if true, big endian if false

  // Adds the following options to the parseMetaData method:
  // - disableExif: Disables Exif parsing when true.
  // - disableExifOffsets: Disables storing Exif tag offsets when true.
  // - includeExifTags: A map of Exif tags to include for parsing.
  // - excludeExifTags: A map of Exif tags to exclude from parsing.
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-fetch.js":
/*!****************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-fetch.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Fetch
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2017, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require, Promise */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  var global = loadImage.global

  if (
    global.fetch &&
    global.Request &&
    global.Response &&
    global.Response.prototype.blob
  ) {
    loadImage.fetchBlob = function (url, callback, options) {
      /**
       * Fetch response handler.
       *
       * @param {Response} response Fetch response
       * @returns {Blob} Fetched Blob.
       */
      function responseHandler(response) {
        return response.blob()
      }
      if (global.Promise && typeof callback !== 'function') {
        return fetch(new Request(url, callback)).then(responseHandler)
      }
      fetch(new Request(url, options))
        .then(responseHandler)
        .then(callback)
        [
          // Avoid parsing error in IE<9, where catch is a reserved word.
          // eslint-disable-next-line dot-notation
          'catch'
        ](function (err) {
          callback(null, err)
        })
    }
  } else if (
    global.XMLHttpRequest &&
    // https://xhr.spec.whatwg.org/#the-responsetype-attribute
    new XMLHttpRequest().responseType === ''
  ) {
    loadImage.fetchBlob = function (url, callback, options) {
      /**
       * Promise executor
       *
       * @param {Function} resolve Resolution function
       * @param {Function} reject Rejection function
       */
      function executor(resolve, reject) {
        options = options || {} // eslint-disable-line no-param-reassign
        var req = new XMLHttpRequest()
        req.open(options.method || 'GET', url)
        if (options.headers) {
          Object.keys(options.headers).forEach(function (key) {
            req.setRequestHeader(key, options.headers[key])
          })
        }
        req.withCredentials = options.credentials === 'include'
        req.responseType = 'blob'
        req.onload = function () {
          resolve(req.response)
        }
        req.onerror = req.onabort = req.ontimeout = function (err) {
          if (resolve === reject) {
            // Not using Promises
            reject(null, err)
          } else {
            reject(err)
          }
        }
        req.send(options.body)
      }
      if (global.Promise && typeof callback !== 'function') {
        options = callback // eslint-disable-line no-param-reassign
        return new Promise(executor)
      }
      return executor(callback, callback)
    }
  }
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-iptc-map.js":
/*!*******************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-iptc-map.js ***!
  \*******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image IPTC Map
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * Copyright 2018, Dave Bevan
 *
 * IPTC tags mapping based on
 * https://iptc.org/standards/photo-metadata
 * https://exiftool.org/TagNames/IPTC.html
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js"), __webpack_require__(/*! ./load-image-iptc */ "./node_modules/blueimp-load-image/js/load-image-iptc.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  var IptcMapProto = loadImage.IptcMap.prototype

  IptcMapProto.tags = {
    0: 'ApplicationRecordVersion',
    3: 'ObjectTypeReference',
    4: 'ObjectAttributeReference',
    5: 'ObjectName',
    7: 'EditStatus',
    8: 'EditorialUpdate',
    10: 'Urgency',
    12: 'SubjectReference',
    15: 'Category',
    20: 'SupplementalCategories',
    22: 'FixtureIdentifier',
    25: 'Keywords',
    26: 'ContentLocationCode',
    27: 'ContentLocationName',
    30: 'ReleaseDate',
    35: 'ReleaseTime',
    37: 'ExpirationDate',
    38: 'ExpirationTime',
    40: 'SpecialInstructions',
    42: 'ActionAdvised',
    45: 'ReferenceService',
    47: 'ReferenceDate',
    50: 'ReferenceNumber',
    55: 'DateCreated',
    60: 'TimeCreated',
    62: 'DigitalCreationDate',
    63: 'DigitalCreationTime',
    65: 'OriginatingProgram',
    70: 'ProgramVersion',
    75: 'ObjectCycle',
    80: 'Byline',
    85: 'BylineTitle',
    90: 'City',
    92: 'Sublocation',
    95: 'State',
    100: 'CountryCode',
    101: 'Country',
    103: 'OriginalTransmissionReference',
    105: 'Headline',
    110: 'Credit',
    115: 'Source',
    116: 'CopyrightNotice',
    118: 'Contact',
    120: 'Caption',
    121: 'LocalCaption',
    122: 'Writer',
    125: 'RasterizedCaption',
    130: 'ImageType',
    131: 'ImageOrientation',
    135: 'LanguageIdentifier',
    150: 'AudioType',
    151: 'AudioSamplingRate',
    152: 'AudioSamplingResolution',
    153: 'AudioDuration',
    154: 'AudioOutcue',
    184: 'JobID',
    185: 'MasterDocumentID',
    186: 'ShortDocumentID',
    187: 'UniqueDocumentID',
    188: 'OwnerID',
    200: 'ObjectPreviewFileFormat',
    201: 'ObjectPreviewFileVersion',
    202: 'ObjectPreviewData',
    221: 'Prefs',
    225: 'ClassifyState',
    228: 'SimilarityIndex',
    230: 'DocumentNotes',
    231: 'DocumentHistory',
    232: 'ExifCameraInfo',
    255: 'CatalogSets'
  }

  IptcMapProto.stringValues = {
    10: {
      0: '0 (reserved)',
      1: '1 (most urgent)',
      2: '2',
      3: '3',
      4: '4',
      5: '5 (normal urgency)',
      6: '6',
      7: '7',
      8: '8 (least urgent)',
      9: '9 (user-defined priority)'
    },
    75: {
      a: 'Morning',
      b: 'Both Morning and Evening',
      p: 'Evening'
    },
    131: {
      L: 'Landscape',
      P: 'Portrait',
      S: 'Square'
    }
  }

  IptcMapProto.getText = function (id) {
    var value = this.get(id)
    var tagCode = this.map[id]
    var stringValue = this.stringValues[tagCode]
    if (stringValue) return stringValue[value]
    return String(value)
  }

  IptcMapProto.getAll = function () {
    var map = {}
    var prop
    var name
    for (prop in this) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        name = this.tags[prop]
        if (name) map[name] = this.getText(name)
      }
    }
    return map
  }

  IptcMapProto.getName = function (tagCode) {
    return this.tags[tagCode]
  }

  // Extend the map of tag names to tag codes:
  ;(function () {
    var tags = IptcMapProto.tags
    var map = IptcMapProto.map || {}
    var prop
    // Map the tag names to tags:
    for (prop in tags) {
      if (Object.prototype.hasOwnProperty.call(tags, prop)) {
        map[tags[prop]] = Number(prop)
      }
    }
  })()
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-iptc.js":
/*!***************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-iptc.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image IPTC Parser
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * Copyright 2018, Dave Bevan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require, DataView */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js"), __webpack_require__(/*! ./load-image-meta */ "./node_modules/blueimp-load-image/js/load-image-meta.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  /**
   * IPTC tag map
   *
   * @name IptcMap
   * @class
   */
  function IptcMap() {}

  IptcMap.prototype.map = {
    ObjectName: 5
  }

  IptcMap.prototype.types = {
    0: 'Uint16', // ApplicationRecordVersion
    200: 'Uint16', // ObjectPreviewFileFormat
    201: 'Uint16', // ObjectPreviewFileVersion
    202: 'binary' // ObjectPreviewData
  }

  /**
   * Retrieves IPTC tag value
   *
   * @param {number|string} id IPTC tag code or name
   * @returns {object} IPTC tag value
   */
  IptcMap.prototype.get = function (id) {
    return this[id] || this[this.map[id]]
  }

  /**
   * Retrieves string for the given DataView and range
   *
   * @param {DataView} dataView Data view interface
   * @param {number} offset Offset start
   * @param {number} length Offset length
   * @returns {string} String value
   */
  function getStringValue(dataView, offset, length) {
    var outstr = ''
    var end = offset + length
    for (var n = offset; n < end; n += 1) {
      outstr += String.fromCharCode(dataView.getUint8(n))
    }
    return outstr
  }

  /**
   * Retrieves tag value for the given DataView and range
   *
   * @param {number} tagCode tag code
   * @param {IptcMap} map IPTC tag map
   * @param {DataView} dataView Data view interface
   * @param {number} offset Range start
   * @param {number} length Range length
   * @returns {object} Tag value
   */
  function getTagValue(tagCode, map, dataView, offset, length) {
    if (map.types[tagCode] === 'binary') {
      return new Blob([dataView.buffer.slice(offset, offset + length)])
    }
    if (map.types[tagCode] === 'Uint16') {
      return dataView.getUint16(offset)
    }
    return getStringValue(dataView, offset, length)
  }

  /**
   * Combines IPTC value with existing ones.
   *
   * @param {object} value Existing IPTC field value
   * @param {object} newValue New IPTC field value
   * @returns {object} Resulting IPTC field value
   */
  function combineTagValues(value, newValue) {
    if (value === undefined) return newValue
    if (value instanceof Array) {
      value.push(newValue)
      return value
    }
    return [value, newValue]
  }

  /**
   * Parses IPTC tags.
   *
   * @param {DataView} dataView Data view interface
   * @param {number} segmentOffset Segment offset
   * @param {number} segmentLength Segment length
   * @param {object} data Data export object
   * @param {object} includeTags Map of tags to include
   * @param {object} excludeTags Map of tags to exclude
   */
  function parseIptcTags(
    dataView,
    segmentOffset,
    segmentLength,
    data,
    includeTags,
    excludeTags
  ) {
    var value, tagSize, tagCode
    var segmentEnd = segmentOffset + segmentLength
    var offset = segmentOffset
    while (offset < segmentEnd) {
      if (
        dataView.getUint8(offset) === 0x1c && // tag marker
        dataView.getUint8(offset + 1) === 0x02 // record number, only handles v2
      ) {
        tagCode = dataView.getUint8(offset + 2)
        if (
          (!includeTags || includeTags[tagCode]) &&
          (!excludeTags || !excludeTags[tagCode])
        ) {
          tagSize = dataView.getInt16(offset + 3)
          value = getTagValue(tagCode, data.iptc, dataView, offset + 5, tagSize)
          data.iptc[tagCode] = combineTagValues(data.iptc[tagCode], value)
          if (data.iptcOffsets) {
            data.iptcOffsets[tagCode] = offset
          }
        }
      }
      offset += 1
    }
  }

  /**
   * Tests if field segment starts at offset.
   *
   * @param {DataView} dataView Data view interface
   * @param {number} offset Segment offset
   * @returns {boolean} True if '8BIM<EOT><EOT>' exists at offset
   */
  function isSegmentStart(dataView, offset) {
    return (
      dataView.getUint32(offset) === 0x3842494d && // Photoshop segment start
      dataView.getUint16(offset + 4) === 0x0404 // IPTC segment start
    )
  }

  /**
   * Returns header length.
   *
   * @param {DataView} dataView Data view interface
   * @param {number} offset Segment offset
   * @returns {number} Header length
   */
  function getHeaderLength(dataView, offset) {
    var length = dataView.getUint8(offset + 7)
    if (length % 2 !== 0) length += 1
    // Check for pre photoshop 6 format
    if (length === 0) {
      // Always 4
      length = 4
    }
    return length
  }

  loadImage.parseIptcData = function (dataView, offset, length, data, options) {
    if (options.disableIptc) {
      return
    }
    var markerLength = offset + length
    while (offset + 8 < markerLength) {
      if (isSegmentStart(dataView, offset)) {
        var headerLength = getHeaderLength(dataView, offset)
        var segmentOffset = offset + 8 + headerLength
        if (segmentOffset > markerLength) {
          // eslint-disable-next-line no-console
          console.log('Invalid IPTC data: Invalid segment offset.')
          break
        }
        var segmentLength = dataView.getUint16(offset + 6 + headerLength)
        if (offset + segmentLength > markerLength) {
          // eslint-disable-next-line no-console
          console.log('Invalid IPTC data: Invalid segment size.')
          break
        }
        // Create the iptc object to store the tags:
        data.iptc = new IptcMap()
        if (!options.disableIptcOffsets) {
          data.iptcOffsets = new IptcMap()
        }
        parseIptcTags(
          dataView,
          segmentOffset,
          segmentLength,
          data,
          options.includeIptcTags,
          options.excludeIptcTags || { 202: true } // ObjectPreviewData
        )
        return
      }
      // eslint-disable-next-line no-param-reassign
      offset += 1
    }
  }

  // Registers this IPTC parser for the APP13 JPEG metadata segment:
  loadImage.metaDataParsers.jpeg[0xffed].push(loadImage.parseIptcData)

  loadImage.IptcMap = IptcMap

  // Adds the following properties to the parseMetaData callback data:
  // - iptc: The iptc tags, parsed by the parseIptcData method

  // Adds the following options to the parseMetaData method:
  // - disableIptc: Disables IPTC parsing when true.
  // - disableIptcOffsets: Disables storing IPTC tag offsets when true.
  // - includeIptcTags: A map of IPTC tags to include for parsing.
  // - excludeIptcTags: A map of IPTC tags to exclude from parsing.
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-meta.js":
/*!***************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-meta.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Meta
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Image metadata handling implementation
 * based on the help and contribution of
 * Achim Stöhr.
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require, Promise, DataView, Uint8Array, ArrayBuffer */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  var global = loadImage.global
  var originalTransform = loadImage.transform

  var blobSlice =
    global.Blob &&
    (Blob.prototype.slice ||
      Blob.prototype.webkitSlice ||
      Blob.prototype.mozSlice)

  var bufferSlice =
    (global.ArrayBuffer && ArrayBuffer.prototype.slice) ||
    function (begin, end) {
      // Polyfill for IE10, which does not support ArrayBuffer.slice
      // eslint-disable-next-line no-param-reassign
      end = end || this.byteLength - begin
      var arr1 = new Uint8Array(this, begin, end)
      var arr2 = new Uint8Array(end)
      arr2.set(arr1)
      return arr2.buffer
    }

  var metaDataParsers = {
    jpeg: {
      0xffe1: [], // APP1 marker
      0xffed: [] // APP13 marker
    }
  }

  /**
   * Parses image metadata and calls the callback with an object argument
   * with the following property:
   * - imageHead: The complete image head as ArrayBuffer
   * The options argument accepts an object and supports the following
   * properties:
   * - maxMetaDataSize: Defines the maximum number of bytes to parse.
   * - disableImageHead: Disables creating the imageHead property.
   *
   * @param {Blob} file Blob object
   * @param {Function} [callback] Callback function
   * @param {object} [options] Parsing options
   * @param {object} [data] Result data object
   * @returns {Promise<object>|undefined} Returns Promise if no callback given.
   */
  function parseMetaData(file, callback, options, data) {
    var that = this
    /**
     * Promise executor
     *
     * @param {Function} resolve Resolution function
     * @param {Function} reject Rejection function
     * @returns {undefined} Undefined
     */
    function executor(resolve, reject) {
      if (
        !(
          global.DataView &&
          blobSlice &&
          file &&
          file.size >= 12 &&
          file.type === 'image/jpeg'
        )
      ) {
        // Nothing to parse
        return resolve(data)
      }
      // 256 KiB should contain all EXIF/ICC/IPTC segments:
      var maxMetaDataSize = options.maxMetaDataSize || 262144
      if (
        !loadImage.readFile(
          blobSlice.call(file, 0, maxMetaDataSize),
          function (buffer) {
            // Note on endianness:
            // Since the marker and length bytes in JPEG files are always
            // stored in big endian order, we can leave the endian parameter
            // of the DataView methods undefined, defaulting to big endian.
            var dataView = new DataView(buffer)
            // Check for the JPEG marker (0xffd8):
            if (dataView.getUint16(0) !== 0xffd8) {
              return reject(
                new Error('Invalid JPEG file: Missing JPEG marker.')
              )
            }
            var offset = 2
            var maxOffset = dataView.byteLength - 4
            var headLength = offset
            var markerBytes
            var markerLength
            var parsers
            var i
            while (offset < maxOffset) {
              markerBytes = dataView.getUint16(offset)
              // Search for APPn (0xffeN) and COM (0xfffe) markers,
              // which contain application-specific metadata like
              // Exif, ICC and IPTC data and text comments:
              if (
                (markerBytes >= 0xffe0 && markerBytes <= 0xffef) ||
                markerBytes === 0xfffe
              ) {
                // The marker bytes (2) are always followed by
                // the length bytes (2), indicating the length of the
                // marker segment, which includes the length bytes,
                // but not the marker bytes, so we add 2:
                markerLength = dataView.getUint16(offset + 2) + 2
                if (offset + markerLength > dataView.byteLength) {
                  // eslint-disable-next-line no-console
                  console.log('Invalid JPEG metadata: Invalid segment size.')
                  break
                }
                parsers = metaDataParsers.jpeg[markerBytes]
                if (parsers && !options.disableMetaDataParsers) {
                  for (i = 0; i < parsers.length; i += 1) {
                    parsers[i].call(
                      that,
                      dataView,
                      offset,
                      markerLength,
                      data,
                      options
                    )
                  }
                }
                offset += markerLength
                headLength = offset
              } else {
                // Not an APPn or COM marker, probably safe to
                // assume that this is the end of the metadata
                break
              }
            }
            // Meta length must be longer than JPEG marker (2)
            // plus APPn marker (2), followed by length bytes (2):
            if (!options.disableImageHead && headLength > 6) {
              data.imageHead = bufferSlice.call(buffer, 0, headLength)
            }
            resolve(data)
          },
          reject,
          'readAsArrayBuffer'
        )
      ) {
        // No support for the FileReader interface, nothing to parse
        resolve(data)
      }
    }
    options = options || {} // eslint-disable-line no-param-reassign
    if (global.Promise && typeof callback !== 'function') {
      options = callback || {} // eslint-disable-line no-param-reassign
      data = options // eslint-disable-line no-param-reassign
      return new Promise(executor)
    }
    data = data || {} // eslint-disable-line no-param-reassign
    return executor(callback, callback)
  }

  /**
   * Replaces the head of a JPEG Blob
   *
   * @param {Blob} blob Blob object
   * @param {ArrayBuffer} oldHead Old JPEG head
   * @param {ArrayBuffer} newHead New JPEG head
   * @returns {Blob} Combined Blob
   */
  function replaceJPEGHead(blob, oldHead, newHead) {
    if (!blob || !oldHead || !newHead) return null
    return new Blob([newHead, blobSlice.call(blob, oldHead.byteLength)], {
      type: 'image/jpeg'
    })
  }

  /**
   * Replaces the image head of a JPEG blob with the given one.
   * Returns a Promise or calls the callback with the new Blob.
   *
   * @param {Blob} blob Blob object
   * @param {ArrayBuffer} head New JPEG head
   * @param {Function} [callback] Callback function
   * @returns {Promise<Blob|null>|undefined} Combined Blob
   */
  function replaceHead(blob, head, callback) {
    var options = { maxMetaDataSize: 256, disableMetaDataParsers: true }
    if (!callback && global.Promise) {
      return parseMetaData(blob, options).then(function (data) {
        return replaceJPEGHead(blob, data.imageHead, head)
      })
    }
    parseMetaData(
      blob,
      function (data) {
        callback(replaceJPEGHead(blob, data.imageHead, head))
      },
      options
    )
  }

  loadImage.transform = function (img, options, callback, file, data) {
    if (loadImage.requiresMetaData(options)) {
      data = data || {} // eslint-disable-line no-param-reassign
      parseMetaData(
        file,
        function (result) {
          if (result !== data) {
            // eslint-disable-next-line no-console
            if (global.console) console.log(result)
            result = data // eslint-disable-line no-param-reassign
          }
          originalTransform.call(
            loadImage,
            img,
            options,
            callback,
            file,
            result
          )
        },
        options,
        data
      )
    } else {
      originalTransform.apply(loadImage, arguments)
    }
  }

  loadImage.blobSlice = blobSlice
  loadImage.bufferSlice = bufferSlice
  loadImage.replaceHead = replaceHead
  loadImage.parseMetaData = parseMetaData
  loadImage.metaDataParsers = metaDataParsers
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-orientation.js":
/*!**********************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-orientation.js ***!
  \**********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Orientation
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/*
Exif orientation values to correctly display the letter F:

    1             2
  ██████        ██████
  ██                ██
  ████            ████
  ██                ██
  ██                ██

    3             4
      ██        ██
      ██        ██
    ████        ████
      ██        ██
  ██████        ██████

    5             6
██████████    ██
██  ██        ██  ██
██            ██████████

    7             8
        ██    ██████████
    ██  ██        ██  ██
██████████            ██

*/

/* global define, module, require */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js"), __webpack_require__(/*! ./load-image-scale */ "./node_modules/blueimp-load-image/js/load-image-scale.js"), __webpack_require__(/*! ./load-image-meta */ "./node_modules/blueimp-load-image/js/load-image-meta.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  var originalTransform = loadImage.transform
  var originalRequiresCanvas = loadImage.requiresCanvas
  var originalRequiresMetaData = loadImage.requiresMetaData
  var originalTransformCoordinates = loadImage.transformCoordinates
  var originalGetTransformedOptions = loadImage.getTransformedOptions

  ;(function ($) {
    // Guard for non-browser environments (e.g. server-side rendering):
    if (!$.global.document) return
    // black+white 3x2 JPEG, with the following meta information set:
    // - EXIF Orientation: 6 (Rotated 90° CCW)
    // Image data layout (B=black, F=white):
    // BFF
    // BBB
    var testImageURL =
      'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
      'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
      'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
      'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAIAAwMBEQACEQEDEQH/x' +
      'ABRAAEAAAAAAAAAAAAAAAAAAAAKEAEBAQADAQEAAAAAAAAAAAAGBQQDCAkCBwEBAAAAAAA' +
      'AAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AG8T9NfSMEVMhQ' +
      'voP3fFiRZ+MTHDifa/95OFSZU5OzRzxkyejv8ciEfhSceSXGjS8eSdLnZc2HDm4M3BxcXw' +
      'H/9k='
    var img = document.createElement('img')
    img.onload = function () {
      // Check if the browser supports automatic image orientation:
      $.orientation = img.width === 2 && img.height === 3
      if ($.orientation) {
        var canvas = $.createCanvas(1, 1, true)
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 1, 1, 1, 1, 0, 0, 1, 1)
        // Check if the source image coordinates (sX, sY, sWidth, sHeight) are
        // correctly applied to the auto-orientated image, which should result
        // in a white opaque pixel (e.g. in Safari).
        // Browsers that show a transparent pixel (e.g. Chromium) fail to crop
        // auto-oriented images correctly and require a workaround, e.g.
        // drawing the complete source image to an intermediate canvas first.
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=1074354
        $.orientationCropBug =
          ctx.getImageData(0, 0, 1, 1).data.toString() !== '255,255,255,255'
      }
    }
    img.src = testImageURL
  })(loadImage)

  /**
   * Determines if the orientation requires a canvas element.
   *
   * @param {object} [options] Options object
   * @param {boolean} [withMetaData] Is metadata required for orientation
   * @returns {boolean} Returns true if orientation requires canvas/meta
   */
  function requiresCanvasOrientation(options, withMetaData) {
    var orientation = options && options.orientation
    return (
      // Exif orientation for browsers without automatic image orientation:
      (orientation === true && !loadImage.orientation) ||
      // Orientation reset for browsers with automatic image orientation:
      (orientation === 1 && loadImage.orientation) ||
      // Orientation to defined value, requires meta for orientation reset only:
      ((!withMetaData || loadImage.orientation) &&
        orientation > 1 &&
        orientation < 9)
    )
  }

  /**
   * Determines if the image requires an orientation change.
   *
   * @param {number} [orientation] Defined orientation value
   * @param {number} [autoOrientation] Auto-orientation based on Exif data
   * @returns {boolean} Returns true if an orientation change is required
   */
  function requiresOrientationChange(orientation, autoOrientation) {
    return (
      orientation !== autoOrientation &&
      ((orientation === 1 && autoOrientation > 1 && autoOrientation < 9) ||
        (orientation > 1 && orientation < 9))
    )
  }

  /**
   * Determines orientation combinations that require a rotation by 180°.
   *
   * The following is a list of combinations that return true:
   *
   * 2 (flip) => 5 (rot90,flip), 7 (rot90,flip), 6 (rot90), 8 (rot90)
   * 4 (flip) => 5 (rot90,flip), 7 (rot90,flip), 6 (rot90), 8 (rot90)
   *
   * 5 (rot90,flip) => 2 (flip), 4 (flip), 6 (rot90), 8 (rot90)
   * 7 (rot90,flip) => 2 (flip), 4 (flip), 6 (rot90), 8 (rot90)
   *
   * 6 (rot90) => 2 (flip), 4 (flip), 5 (rot90,flip), 7 (rot90,flip)
   * 8 (rot90) => 2 (flip), 4 (flip), 5 (rot90,flip), 7 (rot90,flip)
   *
   * @param {number} [orientation] Defined orientation value
   * @param {number} [autoOrientation] Auto-orientation based on Exif data
   * @returns {boolean} Returns true if rotation by 180° is required
   */
  function requiresRot180(orientation, autoOrientation) {
    if (autoOrientation > 1 && autoOrientation < 9) {
      switch (orientation) {
        case 2:
        case 4:
          return autoOrientation > 4
        case 5:
        case 7:
          return autoOrientation % 2 === 0
        case 6:
        case 8:
          return (
            autoOrientation === 2 ||
            autoOrientation === 4 ||
            autoOrientation === 5 ||
            autoOrientation === 7
          )
      }
    }
    return false
  }

  // Determines if the target image should be a canvas element:
  loadImage.requiresCanvas = function (options) {
    return (
      requiresCanvasOrientation(options) ||
      originalRequiresCanvas.call(loadImage, options)
    )
  }

  // Determines if metadata should be loaded automatically:
  loadImage.requiresMetaData = function (options) {
    return (
      requiresCanvasOrientation(options, true) ||
      originalRequiresMetaData.call(loadImage, options)
    )
  }

  loadImage.transform = function (img, options, callback, file, data) {
    originalTransform.call(
      loadImage,
      img,
      options,
      function (img, data) {
        if (data) {
          var autoOrientation =
            loadImage.orientation && data.exif && data.exif.get('Orientation')
          if (autoOrientation > 4 && autoOrientation < 9) {
            // Automatic image orientation switched image dimensions
            var originalWidth = data.originalWidth
            var originalHeight = data.originalHeight
            data.originalWidth = originalHeight
            data.originalHeight = originalWidth
          }
        }
        callback(img, data)
      },
      file,
      data
    )
  }

  // Transforms coordinate and dimension options
  // based on the given orientation option:
  loadImage.getTransformedOptions = function (img, opts, data) {
    var options = originalGetTransformedOptions.call(loadImage, img, opts)
    var exifOrientation = data.exif && data.exif.get('Orientation')
    var orientation = options.orientation
    var autoOrientation = loadImage.orientation && exifOrientation
    if (orientation === true) orientation = exifOrientation
    if (!requiresOrientationChange(orientation, autoOrientation)) {
      return options
    }
    var top = options.top
    var right = options.right
    var bottom = options.bottom
    var left = options.left
    var newOptions = {}
    for (var i in options) {
      if (Object.prototype.hasOwnProperty.call(options, i)) {
        newOptions[i] = options[i]
      }
    }
    newOptions.orientation = orientation
    if (
      (orientation > 4 && !(autoOrientation > 4)) ||
      (orientation < 5 && autoOrientation > 4)
    ) {
      // Image dimensions and target dimensions are switched
      newOptions.maxWidth = options.maxHeight
      newOptions.maxHeight = options.maxWidth
      newOptions.minWidth = options.minHeight
      newOptions.minHeight = options.minWidth
      newOptions.sourceWidth = options.sourceHeight
      newOptions.sourceHeight = options.sourceWidth
    }
    if (autoOrientation > 1) {
      // Browsers which correctly apply source image coordinates to
      // auto-oriented images
      switch (autoOrientation) {
        case 2:
          // Horizontal flip
          right = options.left
          left = options.right
          break
        case 3:
          // 180° Rotate CCW
          top = options.bottom
          right = options.left
          bottom = options.top
          left = options.right
          break
        case 4:
          // Vertical flip
          top = options.bottom
          bottom = options.top
          break
        case 5:
          // Horizontal flip + 90° Rotate CCW
          top = options.left
          right = options.bottom
          bottom = options.right
          left = options.top
          break
        case 6:
          // 90° Rotate CCW
          top = options.left
          right = options.top
          bottom = options.right
          left = options.bottom
          break
        case 7:
          // Vertical flip + 90° Rotate CCW
          top = options.right
          right = options.top
          bottom = options.left
          left = options.bottom
          break
        case 8:
          // 90° Rotate CW
          top = options.right
          right = options.bottom
          bottom = options.left
          left = options.top
          break
      }
      // Some orientation combinations require additional rotation by 180°:
      if (requiresRot180(orientation, autoOrientation)) {
        var tmpTop = top
        var tmpRight = right
        top = bottom
        right = left
        bottom = tmpTop
        left = tmpRight
      }
    }
    newOptions.top = top
    newOptions.right = right
    newOptions.bottom = bottom
    newOptions.left = left
    // Account for defined browser orientation:
    switch (orientation) {
      case 2:
        // Horizontal flip
        newOptions.right = left
        newOptions.left = right
        break
      case 3:
        // 180° Rotate CCW
        newOptions.top = bottom
        newOptions.right = left
        newOptions.bottom = top
        newOptions.left = right
        break
      case 4:
        // Vertical flip
        newOptions.top = bottom
        newOptions.bottom = top
        break
      case 5:
        // Vertical flip + 90° Rotate CW
        newOptions.top = left
        newOptions.right = bottom
        newOptions.bottom = right
        newOptions.left = top
        break
      case 6:
        // 90° Rotate CW
        newOptions.top = right
        newOptions.right = bottom
        newOptions.bottom = left
        newOptions.left = top
        break
      case 7:
        // Horizontal flip + 90° Rotate CW
        newOptions.top = right
        newOptions.right = top
        newOptions.bottom = left
        newOptions.left = bottom
        break
      case 8:
        // 90° Rotate CCW
        newOptions.top = left
        newOptions.right = top
        newOptions.bottom = right
        newOptions.left = bottom
        break
    }
    return newOptions
  }

  // Transform image orientation based on the given EXIF orientation option:
  loadImage.transformCoordinates = function (canvas, options, data) {
    originalTransformCoordinates.call(loadImage, canvas, options, data)
    var orientation = options.orientation
    var autoOrientation =
      loadImage.orientation && data.exif && data.exif.get('Orientation')
    if (!requiresOrientationChange(orientation, autoOrientation)) {
      return
    }
    var ctx = canvas.getContext('2d')
    var width = canvas.width
    var height = canvas.height
    var sourceWidth = width
    var sourceHeight = height
    if (
      (orientation > 4 && !(autoOrientation > 4)) ||
      (orientation < 5 && autoOrientation > 4)
    ) {
      // Image dimensions and target dimensions are switched
      canvas.width = height
      canvas.height = width
    }
    if (orientation > 4) {
      // Destination and source dimensions are switched
      sourceWidth = height
      sourceHeight = width
    }
    // Reset automatic browser orientation:
    switch (autoOrientation) {
      case 2:
        // Horizontal flip
        ctx.translate(sourceWidth, 0)
        ctx.scale(-1, 1)
        break
      case 3:
        // 180° Rotate CCW
        ctx.translate(sourceWidth, sourceHeight)
        ctx.rotate(Math.PI)
        break
      case 4:
        // Vertical flip
        ctx.translate(0, sourceHeight)
        ctx.scale(1, -1)
        break
      case 5:
        // Horizontal flip + 90° Rotate CCW
        ctx.rotate(-0.5 * Math.PI)
        ctx.scale(-1, 1)
        break
      case 6:
        // 90° Rotate CCW
        ctx.rotate(-0.5 * Math.PI)
        ctx.translate(-sourceWidth, 0)
        break
      case 7:
        // Vertical flip + 90° Rotate CCW
        ctx.rotate(-0.5 * Math.PI)
        ctx.translate(-sourceWidth, sourceHeight)
        ctx.scale(1, -1)
        break
      case 8:
        // 90° Rotate CW
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(0, -sourceHeight)
        break
    }
    // Some orientation combinations require additional rotation by 180°:
    if (requiresRot180(orientation, autoOrientation)) {
      ctx.translate(sourceWidth, sourceHeight)
      ctx.rotate(Math.PI)
    }
    switch (orientation) {
      case 2:
        // Horizontal flip
        ctx.translate(width, 0)
        ctx.scale(-1, 1)
        break
      case 3:
        // 180° Rotate CCW
        ctx.translate(width, height)
        ctx.rotate(Math.PI)
        break
      case 4:
        // Vertical flip
        ctx.translate(0, height)
        ctx.scale(1, -1)
        break
      case 5:
        // Vertical flip + 90° Rotate CW
        ctx.rotate(0.5 * Math.PI)
        ctx.scale(1, -1)
        break
      case 6:
        // 90° Rotate CW
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(0, -height)
        break
      case 7:
        // Horizontal flip + 90° Rotate CW
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(width, -height)
        ctx.scale(-1, 1)
        break
      case 8:
        // 90° Rotate CCW
        ctx.rotate(-0.5 * Math.PI)
        ctx.translate(-width, 0)
        break
    }
  }
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image-scale.js":
/*!****************************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image-scale.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Scaling
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./load-image */ "./node_modules/blueimp-load-image/js/load-image.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function (loadImage) {
  'use strict'

  var originalTransform = loadImage.transform

  loadImage.createCanvas = function (width, height, offscreen) {
    if (offscreen && loadImage.global.OffscreenCanvas) {
      return new OffscreenCanvas(width, height)
    }
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }

  loadImage.transform = function (img, options, callback, file, data) {
    originalTransform.call(
      loadImage,
      loadImage.scale(img, options, data),
      options,
      callback,
      file,
      data
    )
  }

  // Transform image coordinates, allows to override e.g.
  // the canvas orientation based on the orientation option,
  // gets canvas, options and data passed as arguments:
  loadImage.transformCoordinates = function () {}

  // Returns transformed options, allows to override e.g.
  // maxWidth, maxHeight and crop options based on the aspectRatio.
  // gets img, options, data passed as arguments:
  loadImage.getTransformedOptions = function (img, options) {
    var aspectRatio = options.aspectRatio
    var newOptions
    var i
    var width
    var height
    if (!aspectRatio) {
      return options
    }
    newOptions = {}
    for (i in options) {
      if (Object.prototype.hasOwnProperty.call(options, i)) {
        newOptions[i] = options[i]
      }
    }
    newOptions.crop = true
    width = img.naturalWidth || img.width
    height = img.naturalHeight || img.height
    if (width / height > aspectRatio) {
      newOptions.maxWidth = height * aspectRatio
      newOptions.maxHeight = height
    } else {
      newOptions.maxWidth = width
      newOptions.maxHeight = width / aspectRatio
    }
    return newOptions
  }

  // Canvas render method, allows to implement a different rendering algorithm:
  loadImage.drawImage = function (
    img,
    canvas,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destWidth,
    destHeight,
    options
  ) {
    var ctx = canvas.getContext('2d')
    if (options.imageSmoothingEnabled === false) {
      ctx.msImageSmoothingEnabled = false
      ctx.imageSmoothingEnabled = false
    } else if (options.imageSmoothingQuality) {
      ctx.imageSmoothingQuality = options.imageSmoothingQuality
    }
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      destWidth,
      destHeight
    )
    return ctx
  }

  // Determines if the target image should be a canvas element:
  loadImage.requiresCanvas = function (options) {
    return options.canvas || options.crop || !!options.aspectRatio
  }

  // Scales and/or crops the given image (img or canvas HTML element)
  // using the given options:
  loadImage.scale = function (img, options, data) {
    // eslint-disable-next-line no-param-reassign
    options = options || {}
    // eslint-disable-next-line no-param-reassign
    data = data || {}
    var useCanvas =
      img.getContext ||
      (loadImage.requiresCanvas(options) &&
        !!loadImage.global.HTMLCanvasElement)
    var width = img.naturalWidth || img.width
    var height = img.naturalHeight || img.height
    var destWidth = width
    var destHeight = height
    var maxWidth
    var maxHeight
    var minWidth
    var minHeight
    var sourceWidth
    var sourceHeight
    var sourceX
    var sourceY
    var pixelRatio
    var downsamplingRatio
    var tmp
    var canvas
    /**
     * Scales up image dimensions
     */
    function scaleUp() {
      var scale = Math.max(
        (minWidth || destWidth) / destWidth,
        (minHeight || destHeight) / destHeight
      )
      if (scale > 1) {
        destWidth *= scale
        destHeight *= scale
      }
    }
    /**
     * Scales down image dimensions
     */
    function scaleDown() {
      var scale = Math.min(
        (maxWidth || destWidth) / destWidth,
        (maxHeight || destHeight) / destHeight
      )
      if (scale < 1) {
        destWidth *= scale
        destHeight *= scale
      }
    }
    if (useCanvas) {
      // eslint-disable-next-line no-param-reassign
      options = loadImage.getTransformedOptions(img, options, data)
      sourceX = options.left || 0
      sourceY = options.top || 0
      if (options.sourceWidth) {
        sourceWidth = options.sourceWidth
        if (options.right !== undefined && options.left === undefined) {
          sourceX = width - sourceWidth - options.right
        }
      } else {
        sourceWidth = width - sourceX - (options.right || 0)
      }
      if (options.sourceHeight) {
        sourceHeight = options.sourceHeight
        if (options.bottom !== undefined && options.top === undefined) {
          sourceY = height - sourceHeight - options.bottom
        }
      } else {
        sourceHeight = height - sourceY - (options.bottom || 0)
      }
      destWidth = sourceWidth
      destHeight = sourceHeight
    }
    maxWidth = options.maxWidth
    maxHeight = options.maxHeight
    minWidth = options.minWidth
    minHeight = options.minHeight
    if (useCanvas && maxWidth && maxHeight && options.crop) {
      destWidth = maxWidth
      destHeight = maxHeight
      tmp = sourceWidth / sourceHeight - maxWidth / maxHeight
      if (tmp < 0) {
        sourceHeight = (maxHeight * sourceWidth) / maxWidth
        if (options.top === undefined && options.bottom === undefined) {
          sourceY = (height - sourceHeight) / 2
        }
      } else if (tmp > 0) {
        sourceWidth = (maxWidth * sourceHeight) / maxHeight
        if (options.left === undefined && options.right === undefined) {
          sourceX = (width - sourceWidth) / 2
        }
      }
    } else {
      if (options.contain || options.cover) {
        minWidth = maxWidth = maxWidth || minWidth
        minHeight = maxHeight = maxHeight || minHeight
      }
      if (options.cover) {
        scaleDown()
        scaleUp()
      } else {
        scaleUp()
        scaleDown()
      }
    }
    if (useCanvas) {
      pixelRatio = options.pixelRatio
      if (
        pixelRatio > 1 &&
        // Check if the image has not yet had the device pixel ratio applied:
        !(
          img.style.width &&
          Math.floor(parseFloat(img.style.width, 10)) ===
            Math.floor(width / pixelRatio)
        )
      ) {
        destWidth *= pixelRatio
        destHeight *= pixelRatio
      }
      // Check if workaround for Chromium orientation crop bug is required:
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1074354
      if (
        loadImage.orientationCropBug &&
        !img.getContext &&
        (sourceX || sourceY || sourceWidth !== width || sourceHeight !== height)
      ) {
        // Write the complete source image to an intermediate canvas first:
        tmp = img
        // eslint-disable-next-line no-param-reassign
        img = loadImage.createCanvas(width, height, true)
        loadImage.drawImage(
          tmp,
          img,
          0,
          0,
          width,
          height,
          width,
          height,
          options
        )
      }
      downsamplingRatio = options.downsamplingRatio
      if (
        downsamplingRatio > 0 &&
        downsamplingRatio < 1 &&
        destWidth < sourceWidth &&
        destHeight < sourceHeight
      ) {
        while (sourceWidth * downsamplingRatio > destWidth) {
          canvas = loadImage.createCanvas(
            sourceWidth * downsamplingRatio,
            sourceHeight * downsamplingRatio,
            true
          )
          loadImage.drawImage(
            img,
            canvas,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            canvas.width,
            canvas.height,
            options
          )
          sourceX = 0
          sourceY = 0
          sourceWidth = canvas.width
          sourceHeight = canvas.height
          // eslint-disable-next-line no-param-reassign
          img = canvas
        }
      }
      canvas = loadImage.createCanvas(destWidth, destHeight)
      loadImage.transformCoordinates(canvas, options, data)
      if (pixelRatio > 1) {
        canvas.style.width = canvas.width / pixelRatio + 'px'
      }
      loadImage
        .drawImage(
          img,
          canvas,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          destWidth,
          destHeight,
          options
        )
        .setTransform(1, 0, 0, 1, 0, 0) // reset to the identity matrix
      return canvas
    }
    img.width = destWidth
    img.height = destHeight
    return img
  }
})


/***/ }),

/***/ "./node_modules/blueimp-load-image/js/load-image.js":
/*!**********************************************************!*\
  !*** ./node_modules/blueimp-load-image/js/load-image.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, Promise */

;(function ($) {
  'use strict'

  var urlAPI = $.URL || $.webkitURL

  /**
   * Creates an object URL for a given File object.
   *
   * @param {Blob} blob Blob object
   * @returns {string|boolean} Returns object URL if API exists, else false.
   */
  function createObjectURL(blob) {
    return urlAPI ? urlAPI.createObjectURL(blob) : false
  }

  /**
   * Revokes a given object URL.
   *
   * @param {string} url Blob object URL
   * @returns {undefined|boolean} Returns undefined if API exists, else false.
   */
  function revokeObjectURL(url) {
    return urlAPI ? urlAPI.revokeObjectURL(url) : false
  }

  /**
   * Helper function to revoke an object URL
   *
   * @param {string} url Blob Object URL
   * @param {object} [options] Options object
   */
  function revokeHelper(url, options) {
    if (url && url.slice(0, 5) === 'blob:' && !(options && options.noRevoke)) {
      revokeObjectURL(url)
    }
  }

  /**
   * Loads a given File object via FileReader interface.
   *
   * @param {Blob} file Blob object
   * @param {Function} onload Load event callback
   * @param {Function} [onerror] Error/Abort event callback
   * @param {string} [method=readAsDataURL] FileReader method
   * @returns {FileReader|boolean} Returns FileReader if API exists, else false.
   */
  function readFile(file, onload, onerror, method) {
    if (!$.FileReader) return false
    var reader = new FileReader()
    reader.onload = function () {
      onload.call(reader, this.result)
    }
    if (onerror) {
      reader.onabort = reader.onerror = function () {
        onerror.call(reader, this.error)
      }
    }
    var readerMethod = reader[method || 'readAsDataURL']
    if (readerMethod) {
      readerMethod.call(reader, file)
      return reader
    }
  }

  /**
   * Cross-frame instanceof check.
   *
   * @param {string} type Instance type
   * @param {object} obj Object instance
   * @returns {boolean} Returns true if the object is of the given instance.
   */
  function isInstanceOf(type, obj) {
    // Cross-frame instanceof check
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }

  /**
   * @typedef { HTMLImageElement|HTMLCanvasElement } Result
   */

  /**
   * Loads an image for a given File object.
   *
   * @param {Blob|string} file Blob object or image URL
   * @param {Function|object} [callback] Image load event callback or options
   * @param {object} [options] Options object
   * @returns {HTMLImageElement|FileReader|Promise<Result>} Object
   */
  function loadImage(file, callback, options) {
    /**
     * Promise executor
     *
     * @param {Function} resolve Resolution function
     * @param {Function} reject Rejection function
     * @returns {HTMLImageElement|FileReader} Object
     */
    function executor(resolve, reject) {
      var img = document.createElement('img')
      var url
      /**
       * Callback for the fetchBlob call.
       *
       * @param {HTMLImageElement|HTMLCanvasElement} img Error object
       * @param {object} data Data object
       * @returns {undefined} Undefined
       */
      function resolveWrapper(img, data) {
        if (resolve === reject) {
          // Not using Promises
          if (resolve) resolve(img, data)
          return
        } else if (img instanceof Error) {
          reject(img)
          return
        }
        data = data || {} // eslint-disable-line no-param-reassign
        data.image = img
        resolve(data)
      }
      /**
       * Callback for the fetchBlob call.
       *
       * @param {Blob} blob Blob object
       * @param {Error} err Error object
       */
      function fetchBlobCallback(blob, err) {
        if (err && $.console) console.log(err) // eslint-disable-line no-console
        if (blob && isInstanceOf('Blob', blob)) {
          file = blob // eslint-disable-line no-param-reassign
          url = createObjectURL(file)
        } else {
          url = file
          if (options && options.crossOrigin) {
            img.crossOrigin = options.crossOrigin
          }
        }
        img.src = url
      }
      img.onerror = function (event) {
        revokeHelper(url, options)
        if (reject) reject.call(img, event)
      }
      img.onload = function () {
        revokeHelper(url, options)
        var data = {
          originalWidth: img.naturalWidth || img.width,
          originalHeight: img.naturalHeight || img.height
        }
        try {
          loadImage.transform(img, options, resolveWrapper, file, data)
        } catch (error) {
          if (reject) reject(error)
        }
      }
      if (typeof file === 'string') {
        if (loadImage.requiresMetaData(options)) {
          loadImage.fetchBlob(file, fetchBlobCallback, options)
        } else {
          fetchBlobCallback()
        }
        return img
      } else if (isInstanceOf('Blob', file) || isInstanceOf('File', file)) {
        url = createObjectURL(file)
        if (url) {
          img.src = url
          return img
        }
        return readFile(
          file,
          function (url) {
            img.src = url
          },
          reject
        )
      }
    }
    if ($.Promise && typeof callback !== 'function') {
      options = callback // eslint-disable-line no-param-reassign
      return new Promise(executor)
    }
    return executor(callback, callback)
  }

  // Determines if metadata should be loaded automatically.
  // Requires the load image meta extension to load metadata.
  loadImage.requiresMetaData = function (options) {
    return options && options.meta
  }

  // If the callback given to this function returns a blob, it is used as image
  // source instead of the original url and overrides the file argument used in
  // the onload and onerror event callbacks:
  loadImage.fetchBlob = function (url, callback) {
    callback()
  }

  loadImage.transform = function (img, options, callback, file, data) {
    callback(img, data)
  }

  loadImage.global = $
  loadImage.readFile = readFile
  loadImage.isInstanceOf = isInstanceOf
  loadImage.createObjectURL = createObjectURL
  loadImage.revokeObjectURL = revokeObjectURL

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return loadImage
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})((typeof window !== 'undefined' && window) || this)


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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".message-sender[data-v-4df493ec] {\n  margin-bottom: 6px;\n}\n.message-input[data-v-4df493ec] {\n  border-radius: 10px;\n  font-size: 14px;\n  max-height: 120px;\n  word-break: break-all;\n}\n.message-input[data-placeholder][data-v-4df493ec]:empty:before {\n  content: attr(data-placeholder);\n  color: #888;\n}\n.message-form-inputs svg[data-v-4df493ec] {\n  transition: all 0.1s ease-in-out;\n  opacity: 0.4;\n}\n.message-form-inputs svg[data-v-4df493ec]:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.conversation-messages[data-v-4df493ec] {\n  width: 0;\n}\n.btn-circle-actions .btn svg[data-v-4df493ec] {\n  transition: all 0.1s ease-in-out;\n  fill: #5a5adf !important;\n}\n.btn-circle-actions .btn:not(.active) svg[data-v-4df493ec] {\n  opacity: 0.5;\n}\n.btn-circle-actions .btn:hover svg[data-v-4df493ec] {\n  opacity: 1;\n}\n.user-profile-image[data-v-4df493ec] {\n  width: 40px;\n  height: 40px;\n}\n.user-profile-image span[data-v-4df493ec] {\n  font-size: 17px;\n}\n.message-group[data-v-4df493ec] {\n  margin-bottom: 1.5rem;\n  /* Outgoing message */\n  /* Incoming message */\n}\n.message-group .user-profile-image[data-v-4df493ec] {\n  width: 28px;\n  height: 28px;\n  margin-bottom: 4px;\n}\n.message-group .user-profile-image span[data-v-4df493ec] {\n  font-size: 12px;\n}\n.message-group .message-content[data-v-4df493ec] {\n  padding: 6px 10px;\n  margin-bottom: 2px;\n  font-size: 14px;\n  display: inline-block;\n  text-align: left;\n  border-radius: 2px;\n  max-width: 80%;\n}\n.message-group .message-content[data-v-4df493ec]  a:not(.message-preview) {\n  text-decoration: underline;\n}\n.message-group .message-content[data-v-4df493ec]:after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: solid 2px #ff5d47;\n  transition: all 0.1s ease-in-out;\n  opacity: 0;\n  z-index: 0;\n  pointer-events: none;\n}\n.message-group .message-content.highlight-message[data-v-4df493ec]:after {\n  opacity: 1;\n}\n.message-group .message-item:hover .message-actions .action-button[data-v-4df493ec] {\n  opacity: 1;\n}\n.message-group .message-item:hover .message-metalabel[data-v-4df493ec] {\n  opacity: 0;\n}\n.message-group .message-item .message-actions .action-button.show[data-v-4df493ec] {\n  opacity: 1;\n}\n.message-group .message-actions[data-v-4df493ec] {\n  top: 50%;\n  z-index: 10;\n  transform: translateY(-50%);\n}\n.message-group .message-actions .action-button[data-v-4df493ec] {\n  color: #adb5bd;\n  opacity: 0;\n  transition: all 0.1s ease-in-out;\n}\n.message-group .message-actions .action-button .action-label[data-v-4df493ec] {\n  margin-right: -3px;\n  font-size: 12px;\n}\n.message-group .message-actions .action-button svg[data-v-4df493ec] {\n  fill: #818ca1;\n}\n.message-group .message-actions .action-button svg.active[data-v-4df493ec] {\n  fill: #5a5adf !important;\n}\n.message-group .message-actions .action-button[data-v-4df493ec]:hover, .message-group .message-actions .action-button[aria-expanded=true][data-v-4df493ec] {\n  transform: scale(1.1);\n  color: #000;\n  opacity: 1;\n}\n.message-group .message-actions .action-button:hover svg[data-v-4df493ec], .message-group .message-actions .action-button[aria-expanded=true] svg[data-v-4df493ec] {\n  fill: #000;\n}\n.message-group .message-actions .action-content.show ~ .action-content .action-button[data-v-4df493ec] {\n  opacity: 1;\n}\n.message-group .message-actions .action-content.show ~ .message-metalabel[data-v-4df493ec] {\n  opacity: 0 !important;\n}\n.message-group .message-metalabel[data-v-4df493ec] {\n  top: 50%;\n  z-index: 5;\n  transform: translateY(-50%);\n  pointer-events: none;\n  transition: all 0.1s ease-in-out;\n}\n.message-group .message-metalabel svg[data-v-4df493ec] {\n  fill: #5a5adf;\n}\n.message-group .outgoing-message[data-v-4df493ec] {\n  padding-left: 45px;\n}\n.message-group .outgoing-message .message-content[data-v-4df493ec] {\n  background-color: #5a5adf;\n  color: white;\n  border-top-left-radius: 15px;\n  border-bottom-left-radius: 15px;\n  text-align: right;\n}\n.message-group .outgoing-message .message-content[data-v-4df493ec]  a:not(.message-preview) {\n  color: white;\n}\n.message-group .outgoing-message .message-item:only-child .message-content[data-v-4df493ec],\n.message-group .outgoing-message .message-item:first-child .message-content[data-v-4df493ec] {\n  border-top-right-radius: 15px;\n}\n.message-group .outgoing-message .message-item:only-child .message-content[data-v-4df493ec],\n.message-group .outgoing-message .message-item:last-child:not(:only-child) .message-content[data-v-4df493ec] {\n  border-bottom-right-radius: 15px;\n}\n.message-group .outgoing-message .message-actions[data-v-4df493ec] {\n  right: 100%;\n  left: auto;\n}\n.message-group .outgoing-message .message-metalabel[data-v-4df493ec] {\n  right: 10px;\n}\n.message-group .message-body[data-v-4df493ec]:not(.outgoing-message) {\n  padding-right: 45px;\n}\n.message-group .message-body:not(.outgoing-message) .message-content[data-v-4df493ec] {\n  background-color: #f2f4f9;\n  border-top-right-radius: 15px;\n  border-bottom-right-radius: 15px;\n}\n.message-group .message-body:not(.outgoing-message) .message-content[data-v-4df493ec]  a:not(.message-preview) {\n  color: #000;\n}\n.message-group .message-body:not(.outgoing-message) .message-item:only-child .message-content[data-v-4df493ec],\n.message-group .message-body:not(.outgoing-message) .message-item:first-child .message-content[data-v-4df493ec] {\n  border-top-left-radius: 15px;\n}\n.message-group .message-body:not(.outgoing-message) .message-item:only-child .message-content[data-v-4df493ec],\n.message-group .message-body:not(.outgoing-message) .message-item:last-child:not(:only-child) .message-content[data-v-4df493ec] {\n  border-bottom-left-radius: 15px;\n}\n.message-group .message-body:not(.outgoing-message) .message-actions[data-v-4df493ec] {\n  left: 100%;\n}\n.message-group small[data-v-4df493ec] {\n  padding: 0 33px;\n}\n.font-size-base[data-v-4df493ec] {\n  font-size: 0.9rem !important;\n}\n.filedrop[data-v-4df493ec] {\n  z-index: 100;\n  border: dashed 2px #5a5adf;\n  pointer-events: none;\n}\n.messages-loader[data-v-4df493ec] {\n  z-index: 100;\n}\n.screen-recorder-data[data-v-4df493ec] {\n  z-index: 101;\n}\n.conversation-details[data-v-4df493ec] {\n  width: 350px;\n  margin-right: -350px;\n  transition: all 0.1s ease-in-out;\n}\n.conversation-details.open[data-v-4df493ec] {\n  margin-right: 0;\n}\n.info-header[data-v-4df493ec] {\n  margin-top: 1px;\n  margin-bottom: 2px;\n}\n.pasted-file[data-v-4df493ec] {\n  z-index: 100;\n}\n.pasted-file .pasted-preview[data-v-4df493ec] {\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.typing-indicator[data-v-4df493ec] {\n  display: flex;\n}\n.typing-indicator span[data-v-4df493ec] {\n  height: 5px;\n  width: 5px;\n  margin: 0 1px;\n  background-color: #9e9ea1;\n  display: block;\n  border-radius: 50%;\n  opacity: 0.4;\n}\n.typing-indicator span[data-v-4df493ec]:nth-of-type(1) {\n  -webkit-animation: 1s blink-data-v-4df493ec infinite 0.3333s;\n  animation: 1s blink-data-v-4df493ec infinite 0.3333s;\n}\n.typing-indicator span[data-v-4df493ec]:nth-of-type(2) {\n  -webkit-animation: 1s blink-data-v-4df493ec infinite 0.6666s;\n  animation: 1s blink-data-v-4df493ec infinite 0.6666s;\n}\n.typing-indicator span[data-v-4df493ec]:nth-of-type(3) {\n  -webkit-animation: 1s blink-data-v-4df493ec infinite 0.9999s;\n  animation: 1s blink-data-v-4df493ec infinite 0.9999s;\n}\n@-webkit-keyframes blink-data-v-4df493ec {\n50% {\n    opacity: 1;\n}\n}\n@keyframes blink-data-v-4df493ec {\n50% {\n    opacity: 1;\n}\n}\n.pending-file-preview[data-v-4df493ec] {\n  width: 80px;\n  height: 80px;\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.pending-file-preview .file-thumbnail[data-v-4df493ec] {\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.pending-file-preview .remove-file[data-v-4df493ec] {\n  top: 5px;\n  right: 5px;\n  opacity: 0;\n}\n.pending-file-preview:hover .remove-file[data-v-4df493ec] {\n  opacity: 1;\n}\n.pending-file-preview .pending-filename[data-v-4df493ec] {\n  bottom: 2px;\n  left: 0;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip {\n  position: absolute;\n  width: auto;\n  white-space: nowrap;\n  font-weight: normal !important;\n  font-size: 13px;\n  pointer-events: none;\n  transition: opacity 0.25s;\n  opacity: 0;\n  z-index: 999;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip .tooltip-inner {\n  background: black;\n  color: white;\n  border-radius: 16px;\n  padding: 4px 10px;\n  overflow: hidden;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip .tooltip-arrow {\n  width: 0;\n  height: 0;\n  border-style: solid;\n  position: absolute;\n  border-color: black;\n  z-index: 1;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=top] {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=top] .tooltip-arrow {\n  border-width: 5px 5px 0 5px;\n  border-left-color: transparent !important;\n  border-right-color: transparent !important;\n  border-bottom-color: transparent !important;\n  bottom: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  margin-top: 0;\n  margin-bottom: 0;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=bottom] {\n  margin-top: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=bottom] .tooltip-arrow {\n  border-width: 0 5px 5px 5px;\n  border-left-color: transparent !important;\n  border-right-color: transparent !important;\n  border-top-color: transparent !important;\n  top: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  margin-top: 0;\n  margin-bottom: 0;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=right] {\n  margin-left: calc(100% + 7px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=right] .tooltip-arrow {\n  border-width: 5px 5px 5px 0;\n  border-left-color: transparent !important;\n  border-top-color: transparent !important;\n  border-bottom-color: transparent !important;\n  left: -4px;\n  top: 50%;\n  transform: translateY(-50%);\n  margin-left: 0;\n  margin-right: 0;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=left] {\n  right: calc(100% + 7px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[x-placement^=left] .tooltip-arrow {\n  border-width: 5px 0 5px 5px;\n  border-top-color: transparent !important;\n  border-right-color: transparent !important;\n  border-bottom-color: transparent !important;\n  right: -4px;\n  top: 50%;\n  transform: translateY(-50%);\n  margin-left: 0;\n  margin-right: 0;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip.popover .popover-inner {\n  background: #f9f9f9;\n  color: black;\n  padding: 24px;\n  border-radius: 5px;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip.popover .popover-arrow {\n  border-color: #f9f9f9;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[aria-hidden=true] {\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.15s, visibility 0.15s;\n}\n[data-v-4df493ec][data-tooltip-wrapper] .tooltip[aria-hidden=false] {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.15s;\n}\n[data-v-4df493ec][data-tooltip-wrapper]:hover .tooltip {\n  opacity: 1 !important;\n}\n.hover-underline[data-v-4df493ec]:hover {\n  text-decoration: underline;\n}\n.typing-users[data-v-4df493ec] {\n  bottom: 0;\n  left: 0;\n}\n.hrule[data-v-4df493ec]:before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 80%;\n  height: 1px;\n  background-color: #e9ecef;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".emoji-invoker svg[data-v-02d35b33] {\n  transition: all 0.1s ease-in-out;\n  opacity: 0.4;\n}\n.emoji-invoker svg[data-v-02d35b33]:hover {\n  transform: scale(1.1);\n  opacity: 1;\n}\n.emoji-picker[data-v-02d35b33] {\n  bottom: 80px;\n  right: 20px;\n  position: absolute;\n  z-index: 1;\n  border: solid 1px rgba(129, 140, 161, 0.3);\n  width: 350px;\n  height: 400px;\n  overflow-y: scroll;\n  padding: 1rem;\n  box-sizing: border-box;\n  border-radius: 0.5rem;\n  background: #fff;\n  box-shadow: 0 0.5rem 1rem rgba(92, 101, 112, 0.15);\n  text-align: left;\n}\n.emoji-picker__search[data-v-02d35b33] {\n  display: flex;\n}\n.emoji-picker__search > input[data-v-02d35b33] {\n  flex: 1;\n  border-radius: 10rem;\n  border: 1px solid #ccc;\n  padding: 0.5rem 1rem;\n  outline: none;\n}\n.emoji-picker h5[data-v-02d35b33] {\n  margin-bottom: 0;\n  color: #b1b1b1;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  cursor: default;\n}\n.emoji-picker .emojis[data-v-02d35b33] {\n  margin-bottom: 20px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  font-size: 24px;\n}\n.emoji-picker .emojis[data-v-02d35b33]:after {\n  content: \"\";\n  flex: auto;\n}\n.emoji-picker .emojis span[data-v-02d35b33] {\n  padding: 0.2rem 0.1rem;\n  cursor: pointer;\n  border-radius: 5px;\n}\n.emoji-picker .emojis span[data-v-02d35b33]:hover {\n  background: #ececec;\n  cursor: pointer;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss& ***!
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
___CSS_LOADER_EXPORT___.push([module.id, ".waveplayer-container[data-v-7ff3498b] {\n  width: 220px;\n  max-width: 100%;\n}\n.audio-control[data-v-7ff3498b] {\n  width: 25px;\n  height: 25px;\n  outline: 0 !important;\n  border: none;\n  border-radius: 50% !important;\n}\n.audio-control svg[data-v-7ff3498b] {\n  position: absolute;\n  top: 52%;\n  left: 51%;\n  transform: translate(-50%, -50%);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".message-preview-container[data-v-41d24c66]  .message-preview {\n  background: white !important;\n  text-decoration: none;\n  width: 350px;\n  min-width: 100%;\n  max-width: 100%;\n}\n.message-preview-container[data-v-41d24c66]  .message-preview .preview-image {\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 180px;\n}\n.message-preview-container[data-v-41d24c66]  .message-preview p {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.message-preview-container[data-v-41d24c66]  .message-preview:hover h6 {\n  text-decoration: underline;\n}\n.message-sending[data-v-41d24c66] {\n  background-color: rgba(255, 255, 255, 0.65);\n}\n.message-text[data-v-41d24c66] {\n  white-space: pre-wrap;\n  word-break: break-word;\n}\np[data-v-41d24c66] {\n  line-height: 1.3;\n}\nimg[data-v-41d24c66] {\n  max-width: 100%;\n  width: 350px;\n  height: auto;\n}\n.image-square[data-v-41d24c66] {\n  width: 100px;\n  height: 100px;\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.preview-video-play[data-v-41d24c66] {\n  line-height: 0;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0.75);\n  padding: 10px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/emoji-regex/index.js":
/*!*******************************************!*\
  !*** ./node_modules/emoji-regex/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFE])|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])?|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};


/***/ }),

/***/ "./node_modules/filesize/lib/filesize.min.js":
/*!***************************************************!*\
  !*** ./node_modules/filesize/lib/filesize.min.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*
 2020 Jason Mulligan <jason.mulligan@avoidwork.com>
 @version 6.1.0
*/
!function(e){var x=/^(b|B)$/,M={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},w={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function t(e){var i,t,o,n,b,r,a,l,s,d,u,c,f,p,B,y=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},g=[],v=0,m=void 0,h=void 0;if(isNaN(e))throw new TypeError("Invalid number");return t=!0===y.bits,u=!0===y.unix,i=y.base||2,d=void 0!==y.round?y.round:u?1:2,r=void 0!==y.locale?y.locale:"",a=y.localeOptions||{},c=void 0!==y.separator?y.separator:"",f=void 0!==y.spacer?y.spacer:u?"":" ",B=y.symbols||{},p=2===i&&y.standard||"jedec",s=y.output||"string",n=!0===y.fullform,b=y.fullforms instanceof Array?y.fullforms:[],m=void 0!==y.exponent?y.exponent:-1,o=2<i?1e3:1024,(l=(h=Number(e))<0)&&(h=-h),(-1===m||isNaN(m))&&(m=Math.floor(Math.log(h)/Math.log(o)))<0&&(m=0),8<m&&(m=8),"exponent"===s?m:(0===h?(g[0]=0,g[1]=u?"":M[p][t?"bits":"bytes"][m]):(v=h/(2===i?Math.pow(2,10*m):Math.pow(1e3,m)),t&&o<=(v*=8)&&m<8&&(v/=o,m++),g[0]=Number(v.toFixed(0<m?d:0)),g[0]===o&&m<8&&void 0===y.exponent&&(g[0]=1,m++),g[1]=10===i&&1===m?t?"kb":"kB":M[p][t?"bits":"bytes"][m],u&&(g[1]="jedec"===p?g[1].charAt(0):0<m?g[1].replace(/B$/,""):g[1],x.test(g[1])&&(g[0]=Math.floor(g[0]),g[1]=""))),l&&(g[0]=-g[0]),g[1]=B[g[1]]||g[1],!0===r?g[0]=g[0].toLocaleString():0<r.length?g[0]=g[0].toLocaleString(r,a):0<c.length&&(g[0]=g[0].toString().replace(".",c)),"array"===s?g:(n&&(g[1]=b[m]?b[m]:w[p][m]+(t?"bit":"byte")+(1===g[0]?"":"s")),"object"===s?{value:g[0],symbol:g[1],exponent:m}:g.join(f)))}t.partial=function(i){return function(e){return t(e,i)}}, true?module.exports=t:0}("undefined"!=typeof window?window:__webpack_require__.g);
//# sourceMappingURL=filesize.min.js.map

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_4df493ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_4df493ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_4df493ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_style_index_0_id_02d35b33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_style_index_0_id_02d35b33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_style_index_0_id_02d35b33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_style_index_0_id_7ff3498b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_style_index_0_id_7ff3498b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_style_index_0_id_7ff3498b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_style_index_0_id_41d24c66_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_style_index_0_id_41d24c66_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_style_index_0_id_41d24c66_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/vue-chat-scroll/dist/vue-chat-scroll.js":
/*!**************************************************************!*\
  !*** ./node_modules/vue-chat-scroll/dist/vue-chat-scroll.js ***!
  \**************************************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /**
  * @name VueJS vChatScroll (vue-chat-scroll)
  * @description Monitors an element and scrolls to the bottom if a new child is added
  * @author Theodore Messinezis <theo@theomessin.com>
  * @file v-chat-scroll  directive definition
  */
  var scrollToBottom = function scrollToBottom(el, smooth) {
    if (typeof el.scroll === "function") {
      el.scroll({
        top: el.scrollHeight,
        behavior: smooth ? 'smooth' : 'instant'
      });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  var vChatScroll = {
    bind: function bind(el, binding) {
      var scrolled = false;
      el.addEventListener('scroll', function (e) {
        scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;

        if (scrolled && el.scrollTop === 0) {
          el.dispatchEvent(new Event("v-chat-scroll-top-reached"));
        }
      });
      new MutationObserver(function (e) {
        var config = binding.value || {};
        if (config.enabled === false) return;
        var pause = config.always === false && scrolled;
        var addedNodes = e[e.length - 1].addedNodes.length;
        var removedNodes = e[e.length - 1].removedNodes.length;

        if (config.scrollonremoved) {
          if (pause || addedNodes != 1 && removedNodes != 1) return;
        } else {
          if (pause || addedNodes != 1) return;
        }

        var smooth = config.smooth;
        var loadingRemoved = !addedNodes && removedNodes === 1;

        if (loadingRemoved && config.scrollonremoved && 'smoothonremoved' in config) {
          smooth = config.smoothonremoved;
        }

        scrollToBottom(el, smooth);
      }).observe(el, {
        childList: true,
        subtree: true
      });
    },
    inserted: function inserted(el, binding) {
      var config = binding.value || {};
      scrollToBottom(el, config.notSmoothOnInit ? false : config.smooth);
    }
  };

  /**
  * @name VueJS vChatScroll (vue-chat-scroll)
  * @description Monitors an element and scrolls to the bottom if a new child is added
  * @author Theodore Messinezis <theo@theomessin.com>
  * @file vue-chat-scroll plugin definition
  */
  var VueChatScroll = {
    install: function install(Vue, options) {
      Vue.directive('chat-scroll', vChatScroll);
    }
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueChatScroll);
  }

  return VueChatScroll;

})));


/***/ }),

/***/ "./node_modules/vue-emoji-picker/dist-module/main.js":
/*!***********************************************************!*\
  !*** ./node_modules/vue-emoji-picker/dist-module/main.js ***!
  \***********************************************************/
/***/ (function(module) {

!function(e,o){ true?module.exports=o():0}(this,function(){return function(e){function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}var t={};return o.m=e,o.c=t,o.i=function(e){return e},o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="/dist-module/",o(o.s=3)}([function(e,o,t){var a=t(4)(t(1),t(5),null,null,null);e.exports=a.exports},function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=t(2),n=function(e){return e&&e.__esModule?e:{default:e}}(a);o.default={props:{search:{type:String,required:!1,default:""},emojiTable:{type:Object,required:!1,default:function(){return n.default}}},data:function(){return{display:{x:0,y:0,visible:!1}}},computed:{emojis:function(){if(this.search){var e={};for(var o in this.emojiTable){e[o]={};for(var t in this.emojiTable[o])new RegExp(".*"+this.search+".*").test(t)&&(e[o][t]=this.emojiTable[o][t]);0===Object.keys(e[o]).length&&delete e[o]}return e}return this.emojiTable}},methods:{insert:function(e){this.$emit("emoji",e)},toggle:function(e){this.display.visible=!this.display.visible,this.display.x=e.clientX,this.display.y=e.clientY},hide:function(){this.display.visible=!1},escape:function(e){!0===this.display.visible&&27===e.keyCode&&(this.display.visible=!1)}},directives:{"click-outside":{bind:function(e,o,t){if("function"==typeof o.value){var a=o.modifiers.bubble,n=function(t){(a||!e.contains(t.target)&&e!==t.target)&&o.value(t)};e.__vueClickOutside__=n,document.addEventListener("click",n)}},unbind:function(e,o){document.removeEventListener("click",e.__vueClickOutside__),e.__vueClickOutside__=null}}},mounted:function(){document.addEventListener("keyup",this.escape)},destroyed:function(){document.removeEventListener("keyup",this.escape)}}},function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={"Frequently used":{thumbs_up:"👍","-1":"👎",sob:"😭",confused:"😕",neutral_face:"😐",blush:"😊",heart_eyes:"😍"},People:{smile:"😄",smiley:"😃",grinning:"😀",blush:"😊",wink:"😉",heart_eyes:"😍",kissing_heart:"😘",kissing_closed_eyes:"😚",kissing:"😗",kissing_smiling_eyes:"😙",stuck_out_tongue_winking_eye:"😜",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue:"😛",flushed:"😳",grin:"😁",pensive:"😔",relieved:"😌",unamused:"😒",disappointed:"😞",persevere:"😣",cry:"😢",joy:"😂",sob:"😭",sleepy:"😪",disappointed_relieved:"😥",cold_sweat:"😰",sweat_smile:"😅",sweat:"😓",weary:"😩",tired_face:"😫",fearful:"😨",scream:"😱",angry:"😠",rage:"😡",triumph:"😤",confounded:"😖",laughing:"😆",yum:"😋",mask:"😷",sunglasses:"😎",sleeping:"😴",dizzy_face:"😵",astonished:"😲",worried:"😟",frowning:"😦",anguished:"😧",imp:"👿",open_mouth:"😮",grimacing:"😬",neutral_face:"😐",confused:"😕",hushed:"😯",smirk:"😏",expressionless:"😑",man_with_gua_pi_mao:"👲",man_with_turban:"👳",cop:"👮",construction_worker:"👷",guardsman:"💂",baby:"👶",boy:"👦",girl:"👧",man:"👨",woman:"👩",older_man:"👴",older_woman:"👵",person_with_blond_hair:"👱",angel:"👼",princess:"👸",smiley_cat:"😺",smile_cat:"😸",heart_eyes_cat:"😻",kissing_cat:"😽",smirk_cat:"😼",scream_cat:"🙀",crying_cat_face:"😿",joy_cat:"😹",pouting_cat:"😾",japanese_ogre:"👹",japanese_goblin:"👺",see_no_evil:"🙈",hear_no_evil:"🙉",speak_no_evil:"🙊",skull:"💀",alien:"👽",hankey:"💩",fire:"🔥",sparkles:"✨",star2:"🌟",dizzy:"💫",boom:"💥",anger:"💢",sweat_drops:"💦",droplet:"💧",zzz:"💤",dash:"💨",ear:"👂",eyes:"👀",nose:"👃",tongue:"👅",lips:"👄",thumbs_up:"👍","-1":"👎",ok_hand:"👌",facepunch:"👊",fist:"✊",wave:"👋",hand:"✋",open_hands:"👐",point_up_2:"👆",point_down:"👇",point_right:"👉",point_left:"👈",raised_hands:"🙌",pray:"🙏",clap:"👏",muscle:"💪",walking:"🚶",runner:"🏃",dancer:"💃",couple:"👫",family:"👪",couplekiss:"💏",couple_with_heart:"💑",dancers:"👯",ok_woman:"🙆",no_good:"🙅",information_desk_person:"💁",raising_hand:"🙋",massage:"💆",haircut:"💇",nail_care:"💅",bride_with_veil:"👰",person_with_pouting_face:"🙎",person_frowning:"🙍",bow:"🙇",tophat:"🎩",crown:"👑",womans_hat:"👒",athletic_shoe:"👟",mans_shoe:"👞",sandal:"👡",high_heel:"👠",boot:"👢",shirt:"👕",necktie:"👔",womans_clothes:"👚",dress:"👗",running_shirt_with_sash:"🎽",jeans:"👖",kimono:"👘",bikini:"👙",briefcase:"💼",handbag:"👜",pouch:"👝",purse:"👛",eyeglasses:"👓",ribbon:"🎀",closed_umbrella:"🌂",lipstick:"💄",yellow_heart:"💛",blue_heart:"💙",purple_heart:"💜",green_heart:"💚",broken_heart:"💔",heartpulse:"💗",heartbeat:"💓",two_hearts:"💕",sparkling_heart:"💖",revolving_hearts:"💞",cupid:"💘",love_letter:"💌",kiss:"💋",ring:"💍",gem:"💎",bust_in_silhouette:"👤",speech_balloon:"💬",footprints:"👣"},Nature:{dog:"🐶",wolf:"🐺",cat:"🐱",mouse:"🐭",hamster:"🐹",rabbit:"🐰",frog:"🐸",tiger:"🐯",koala:"🐨",bear:"🐻",pig:"🐷",pig_nose:"🐽",cow:"🐮",boar:"🐗",monkey_face:"🐵",monkey:"🐒",horse:"🐴",sheep:"🐑",elephant:"🐘",panda_face:"🐼",penguin:"🐧",bird:"🐦",baby_chick:"🐤",hatched_chick:"🐥",hatching_chick:"🐣",chicken:"🐔",snake:"🐍",turtle:"🐢",bug:"🐛",bee:"🐝",ant:"🐜",beetle:"🐞",snail:"🐌",octopus:"🐙",shell:"🐚",tropical_fish:"🐠",fish:"🐟",dolphin:"🐬",whale:"🐳",racehorse:"🐎",dragon_face:"🐲",blowfish:"🐡",camel:"🐫",poodle:"🐩",feet:"🐾",bouquet:"💐",cherry_blossom:"🌸",tulip:"🌷",four_leaf_clover:"🍀",rose:"🌹",sunflower:"🌻",hibiscus:"🌺",maple_leaf:"🍁",leaves:"🍃",fallen_leaf:"🍂",herb:"🌿",ear_of_rice:"🌾",mushroom:"🍄",cactus:"🌵",palm_tree:"🌴",chestnut:"🌰",seedling:"🌱",blossom:"🌼",new_moon:"🌑",first_quarter_moon:"🌓",moon:"🌔",full_moon:"🌕",first_quarter_moon_with_face:"🌛",crescent_moon:"🌙",earth_asia:"🌏",volcano:"🌋",milky_way:"🌌",stars:"🌠",partly_sunny:"⛅",snowman:"⛄",cyclone:"🌀",foggy:"🌁",rainbow:"🌈",ocean:"🌊"},Objects:{bamboo:"🎍",gift_heart:"💝",dolls:"🎎",school_satchel:"🎒",mortar_board:"🎓",flags:"🎏",fireworks:"🎆",sparkler:"🎇",wind_chime:"🎐",rice_scene:"🎑",jack_o_lantern:"🎃",ghost:"👻",santa:"🎅",christmas_tree:"🎄",gift:"🎁",tanabata_tree:"🎋",tada:"🎉",confetti_ball:"🎊",balloon:"🎈",crossed_flags:"🎌",crystal_ball:"🔮",movie_camera:"🎥",camera:"📷",video_camera:"📹",vhs:"📼",cd:"💿",dvd:"📀",minidisc:"💽",floppy_disk:"💾",computer:"💻",iphone:"📱",telephone_receiver:"📞",pager:"📟",fax:"📠",satellite:"📡",tv:"📺",radio:"📻",loud_sound:"🔊",bell:"🔔",loudspeaker:"📢",mega:"📣",hourglass_flowing_sand:"⏳",hourglass:"⌛",alarm_clock:"⏰",watch:"⌚",unlock:"🔓",lock:"🔒",lock_with_ink_pen:"🔏",closed_lock_with_key:"🔐",key:"🔑",mag_right:"🔎",bulb:"💡",flashlight:"🔦",electric_plug:"🔌",battery:"🔋",mag:"🔍",bath:"🛀",toilet:"🚽",wrench:"🔧",nut_and_bolt:"🔩",hammer:"🔨",door:"🚪",smoking:"🚬",bomb:"💣",gun:"🔫",hocho:"🔪",pill:"💊",syringe:"💉",moneybag:"💰",yen:"💴",dollar:"💵",credit_card:"💳",money_with_wings:"💸",calling:"📲","e-mail":"📧",inbox_tray:"📥",outbox_tray:"📤",envelope_with_arrow:"📩",incoming_envelope:"📨",mailbox:"📫",mailbox_closed:"📪",postbox:"📮",package:"📦",memo:"📝",page_facing_up:"📄",page_with_curl:"📃",bookmark_tabs:"📑",bar_chart:"📊",chart_with_upwards_trend:"📈",chart_with_downwards_trend:"📉",scroll:"📜",clipboard:"📋",date:"📅",calendar:"📆",card_index:"📇",file_folder:"📁",open_file_folder:"📂",pushpin:"📌",paperclip:"📎",straight_ruler:"📏",triangular_ruler:"📐",closed_book:"📕",green_book:"📗",blue_book:"📘",orange_book:"📙",notebook:"📓",notebook_with_decorative_cover:"📔",ledger:"📒",books:"📚",book:"📖",bookmark:"🔖",name_badge:"📛",newspaper:"📰",art:"🎨",clapper:"🎬",microphone:"🎤",headphones:"🎧",musical_score:"🎼",musical_note:"🎵",notes:"🎶",musical_keyboard:"🎹",violin:"🎻",trumpet:"🎺",saxophone:"🎷",guitar:"🎸",space_invader:"👾",video_game:"🎮",black_joker:"🃏",flower_playing_cards:"🎴",mahjong:"🀄",game_die:"🎲",dart:"🎯",football:"🏈",basketball:"🏀",soccer:"⚽",baseball:"⚾",tennis:"🎾","8ball":"🎱",bowling:"🎳",golf:"⛳",checkered_flag:"🏁",trophy:"🏆",ski:"🎿",snowboarder:"🏂",swimmer:"🏊",surfer:"🏄",fishing_pole_and_fish:"🎣",tea:"🍵",sake:"🍶",beer:"🍺",beers:"🍻",cocktail:"🍸",tropical_drink:"🍹",wine_glass:"🍷",fork_and_knife:"🍴",pizza:"🍕",hamburger:"🍔",fries:"🍟",poultry_leg:"🍗",meat_on_bone:"🍖",spaghetti:"🍝",curry:"🍛",fried_shrimp:"🍤",bento:"🍱",sushi:"🍣",fish_cake:"🍥",rice_ball:"🍙",rice_cracker:"🍘",rice:"🍚",ramen:"🍜",stew:"🍲",oden:"🍢",dango:"🍡",egg:"🍳",bread:"🍞",doughnut:"🍩",custard:"🍮",icecream:"🍦",ice_cream:"🍨",shaved_ice:"🍧",birthday:"🎂",cake:"🍰",cookie:"🍪",chocolate_bar:"🍫",candy:"🍬",lollipop:"🍭",honey_pot:"🍯",apple:"🍎",green_apple:"🍏",tangerine:"🍊",cherries:"🍒",grapes:"🍇",watermelon:"🍉",strawberry:"🍓",peach:"🍑",melon:"🍈",banana:"🍌",pineapple:"🍍",sweet_potato:"🍠",eggplant:"🍆",tomato:"🍅",corn:"🌽"},Places:{house:"🏠",house_with_garden:"🏡",school:"🏫",office:"🏢",post_office:"🏣",hospital:"🏥",bank:"🏦",convenience_store:"🏪",love_hotel:"🏩",hotel:"🏨",wedding:"💒",church:"⛪",department_store:"🏬",city_sunrise:"🌇",city_sunset:"🌆",japanese_castle:"🏯",european_castle:"🏰",tent:"⛺",factory:"🏭",tokyo_tower:"🗼",japan:"🗾",mount_fuji:"🗻",sunrise_over_mountains:"🌄",sunrise:"🌅",night_with_stars:"🌃",statue_of_liberty:"🗽",bridge_at_night:"🌉",carousel_horse:"🎠",ferris_wheel:"🎡",fountain:"⛲",roller_coaster:"🎢",ship:"🚢",boat:"⛵",speedboat:"🚤",rocket:"🚀",seat:"💺",station:"🚉",bullettrain_side:"🚄",bullettrain_front:"🚅",metro:"🚇",railway_car:"🚃",bus:"🚌",blue_car:"🚙",car:"🚗",taxi:"🚕",truck:"🚚",rotating_light:"🚨",police_car:"🚓",fire_engine:"🚒",ambulance:"🚑",bike:"🚲",barber:"💈",busstop:"🚏",ticket:"🎫",traffic_light:"🚥",construction:"🚧",beginner:"🔰",fuelpump:"⛽",izakaya_lantern:"🏮",slot_machine:"🎰",moyai:"🗿",circus_tent:"🎪",performing_arts:"🎭",round_pushpin:"📍",triangular_flag_on_post:"🚩"},Symbols:{keycap_ten:"🔟",1234:"🔢",symbols:"🔣",capital_abcd:"🔠",abcd:"🔡",abc:"🔤",arrow_up_small:"🔼",arrow_down_small:"🔽",rewind:"⏪",fast_forward:"⏩",arrow_double_up:"⏫",arrow_double_down:"⏬",ok:"🆗",new:"🆕",up:"🆙",cool:"🆒",free:"🆓",ng:"🆖",signal_strength:"📶",cinema:"🎦",koko:"🈁",u6307:"🈯",u7a7a:"🈳",u6e80:"🈵",u5408:"🈴",u7981:"🈲",ideograph_advantage:"🉐",u5272:"🈹",u55b6:"🈺",u6709:"🈶",u7121:"🈚",restroom:"🚻",mens:"🚹",womens:"🚺",baby_symbol:"🚼",wc:"🚾",no_smoking:"🚭",u7533:"🈸",accept:"🉑",cl:"🆑",sos:"🆘",id:"🆔",no_entry_sign:"🚫",underage:"🔞",no_entry:"⛔",negative_squared_cross_mark:"❎",white_check_mark:"✅",heart_decoration:"💟",vs:"🆚",vibration_mode:"📳",mobile_phone_off:"📴",ab:"🆎",diamond_shape_with_a_dot_inside:"💠",ophiuchus:"⛎",six_pointed_star:"🔯",atm:"🏧",chart:"💹",heavy_dollar_sign:"💲",currency_exchange:"💱",x:"❌",exclamation:"❗",question:"❓",grey_exclamation:"❕",grey_question:"❔",o:"⭕",top:"🔝",end:"🔚",back:"🔙",on:"🔛",soon:"🔜",arrows_clockwise:"🔃",clock12:"🕛",clock1:"🕐",clock2:"🕑",clock3:"🕒",clock4:"🕓",clock5:"🕔",clock6:"🕕",clock7:"🕖",clock8:"🕗",clock9:"🕘",clock10:"🕙",clock11:"🕚",heavy_plus_sign:"➕",heavy_minus_sign:"➖",heavy_division_sign:"➗",white_flower:"💮",100:"💯",radio_button:"🔘",link:"🔗",curly_loop:"➰",trident:"🔱",small_red_triangle:"🔺",black_square_button:"🔲",white_square_button:"🔳",red_circle:"🔴",large_blue_circle:"🔵",small_red_triangle_down:"🔻",white_large_square:"⬜",black_large_square:"⬛",large_orange_diamond:"🔶",large_blue_diamond:"🔷",small_orange_diamond:"🔸",small_blue_diamond:"🔹"}}},function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.EmojiPickerPlugin=o.EmojiPicker=void 0;var a=t(0),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i={install:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.component("emoji-picker",n.default)}};"undefined"!=typeof window&&(window.EmojiPicker=i),o.EmojiPicker=n.default,o.EmojiPickerPlugin=i,o.default=n.default},function(e,o){e.exports=function(e,o,t,a,n){var i,r=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(i=e,r=e.default);var l="function"==typeof r?r.options:r;o&&(l.render=o.render,l.staticRenderFns=o.staticRenderFns),a&&(l._scopeId=a);var _;if(n?(_=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n)},l._ssrRegister=_):t&&(_=t),_){var c=l.functional,u=c?l.render:l.beforeCreate;c?l.render=function(e,o){return _.call(o),u(e,o)}:l.beforeCreate=u?[].concat(u,_):[_]}return{esModule:i,exports:r,options:l}}},function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",[e._t("emoji-invoker",null,{events:{click:function(o){return e.toggle(o)}}}),e._v(" "),e.display.visible?t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hide,expression:"hide"}]},[e._t("emoji-picker",null,{emojis:e.emojis,insert:e.insert,display:e.display})],2):e._e()],2)},staticRenderFns:[]}}])});
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./Resources/components/emojipicker.vue":
/*!**********************************************!*\
  !*** ./Resources/components/emojipicker.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _emojipicker_vue_vue_type_template_id_02d35b33_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emojipicker.vue?vue&type=template&id=02d35b33&scoped=true& */ "./Resources/components/emojipicker.vue?vue&type=template&id=02d35b33&scoped=true&");
/* harmony import */ var _emojipicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emojipicker.vue?vue&type=script&lang=js& */ "./Resources/components/emojipicker.vue?vue&type=script&lang=js&");
/* harmony import */ var _emojipicker_vue_vue_type_style_index_0_id_02d35b33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss& */ "./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _emojipicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _emojipicker_vue_vue_type_template_id_02d35b33_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _emojipicker_vue_vue_type_template_id_02d35b33_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "02d35b33",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/emojipicker.vue"
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

/***/ "./Resources/components/waveplayer.vue":
/*!*********************************************!*\
  !*** ./Resources/components/waveplayer.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _waveplayer_vue_vue_type_template_id_7ff3498b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true& */ "./Resources/components/waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true&");
/* harmony import */ var _waveplayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./waveplayer.vue?vue&type=script&lang=js& */ "./Resources/components/waveplayer.vue?vue&type=script&lang=js&");
/* harmony import */ var _waveplayer_vue_vue_type_style_index_0_id_7ff3498b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss& */ "./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _waveplayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _waveplayer_vue_vue_type_template_id_7ff3498b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _waveplayer_vue_vue_type_template_id_7ff3498b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7ff3498b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/components/waveplayer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/conversations/conversations.vue":
/*!************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/conversations.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _conversations_vue_vue_type_template_id_7e355cea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversations.vue?vue&type=template&id=7e355cea& */ "./Resources/dashboard/components/conversations/conversations.vue?vue&type=template&id=7e355cea&");
/* harmony import */ var _conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversations.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/conversations/conversations.js?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _conversations_vue_vue_type_template_id_7e355cea___WEBPACK_IMPORTED_MODULE_0__.render,
  _conversations_vue_vue_type_template_id_7e355cea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/conversations/conversations.vue"
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

/***/ "./Resources/dashboard/components/conversations/show/message-type.vue":
/*!****************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/message-type.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _message_type_vue_vue_type_template_id_41d24c66_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message-type.vue?vue&type=template&id=41d24c66&scoped=true& */ "./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=template&id=41d24c66&scoped=true&");
/* harmony import */ var _message_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message-type.vue?vue&type=script&lang=js& */ "./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=script&lang=js&");
/* harmony import */ var _message_type_vue_vue_type_style_index_0_id_41d24c66_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss& */ "./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _message_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _message_type_vue_vue_type_template_id_41d24c66_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _message_type_vue_vue_type_template_id_41d24c66_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "41d24c66",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/conversations/show/message-type.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/dashboard/components/conversations/show/show.vue":
/*!********************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/show.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _show_vue_vue_type_template_id_4df493ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show.vue?vue&type=template&id=4df493ec&scoped=true& */ "./Resources/dashboard/components/conversations/show/show.vue?vue&type=template&id=4df493ec&scoped=true&");
/* harmony import */ var _show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show.js?vue&type=script&lang=js& */ "./Resources/dashboard/components/conversations/show/show.js?vue&type=script&lang=js&");
/* harmony import */ var _show_scss_vue_type_style_index_0_id_4df493ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true& */ "./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _show_vue_vue_type_template_id_4df493ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _show_vue_vue_type_template_id_4df493ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4df493ec",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/dashboard/components/conversations/show/show.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/add-note.vue":
/*!**************************************!*\
  !*** ./Resources/icons/add-note.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _add_note_vue_vue_type_template_id_5fc2b56a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-note.vue?vue&type=template&id=5fc2b56a& */ "./Resources/icons/add-note.vue?vue&type=template&id=5fc2b56a&");
/* harmony import */ var _add_note_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-note.vue?vue&type=script&lang=js& */ "./Resources/icons/add-note.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _add_note_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _add_note_vue_vue_type_template_id_5fc2b56a___WEBPACK_IMPORTED_MODULE_0__.render,
  _add_note_vue_vue_type_template_id_5fc2b56a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/add-note.vue"
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

/***/ "./Resources/icons/arrow-circle-down.vue":
/*!***********************************************!*\
  !*** ./Resources/icons/arrow-circle-down.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _arrow_circle_down_vue_vue_type_template_id_20b3945e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrow-circle-down.vue?vue&type=template&id=20b3945e& */ "./Resources/icons/arrow-circle-down.vue?vue&type=template&id=20b3945e&");
/* harmony import */ var _arrow_circle_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow-circle-down.vue?vue&type=script&lang=js& */ "./Resources/icons/arrow-circle-down.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _arrow_circle_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _arrow_circle_down_vue_vue_type_template_id_20b3945e___WEBPACK_IMPORTED_MODULE_0__.render,
  _arrow_circle_down_vue_vue_type_template_id_20b3945e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/arrow-circle-down.vue"
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

/***/ "./Resources/icons/bookmark.vue":
/*!**************************************!*\
  !*** ./Resources/icons/bookmark.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _bookmark_vue_vue_type_template_id_55d128e3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookmark.vue?vue&type=template&id=55d128e3& */ "./Resources/icons/bookmark.vue?vue&type=template&id=55d128e3&");
/* harmony import */ var _bookmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookmark.vue?vue&type=script&lang=js& */ "./Resources/icons/bookmark.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _bookmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _bookmark_vue_vue_type_template_id_55d128e3___WEBPACK_IMPORTED_MODULE_0__.render,
  _bookmark_vue_vue_type_template_id_55d128e3___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/bookmark.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/cast.vue":
/*!**********************************!*\
  !*** ./Resources/icons/cast.vue ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _cast_vue_vue_type_template_id_12ef24ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cast.vue?vue&type=template&id=12ef24ec& */ "./Resources/icons/cast.vue?vue&type=template&id=12ef24ec&");
/* harmony import */ var _cast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cast.vue?vue&type=script&lang=js& */ "./Resources/icons/cast.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _cast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _cast_vue_vue_type_template_id_12ef24ec___WEBPACK_IMPORTED_MODULE_0__.render,
  _cast_vue_vue_type_template_id_12ef24ec___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/cast.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/colored-info-circle.vue":
/*!*************************************************!*\
  !*** ./Resources/icons/colored-info-circle.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _colored_info_circle_vue_vue_type_template_id_56ad53b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colored-info-circle.vue?vue&type=template&id=56ad53b2& */ "./Resources/icons/colored-info-circle.vue?vue&type=template&id=56ad53b2&");
/* harmony import */ var _colored_info_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colored-info-circle.vue?vue&type=script&lang=js& */ "./Resources/icons/colored-info-circle.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _colored_info_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _colored_info_circle_vue_vue_type_template_id_56ad53b2___WEBPACK_IMPORTED_MODULE_0__.render,
  _colored_info_circle_vue_vue_type_template_id_56ad53b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/colored-info-circle.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/colored-phone.vue":
/*!*******************************************!*\
  !*** ./Resources/icons/colored-phone.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _colored_phone_vue_vue_type_template_id_108d9946___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colored-phone.vue?vue&type=template&id=108d9946& */ "./Resources/icons/colored-phone.vue?vue&type=template&id=108d9946&");
/* harmony import */ var _colored_phone_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colored-phone.vue?vue&type=script&lang=js& */ "./Resources/icons/colored-phone.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _colored_phone_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _colored_phone_vue_vue_type_template_id_108d9946___WEBPACK_IMPORTED_MODULE_0__.render,
  _colored_phone_vue_vue_type_template_id_108d9946___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/colored-phone.vue"
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

/***/ "./Resources/icons/document-alt.vue":
/*!******************************************!*\
  !*** ./Resources/icons/document-alt.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _document_alt_vue_vue_type_template_id_a2103ab8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document-alt.vue?vue&type=template&id=a2103ab8& */ "./Resources/icons/document-alt.vue?vue&type=template&id=a2103ab8&");
/* harmony import */ var _document_alt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./document-alt.vue?vue&type=script&lang=js& */ "./Resources/icons/document-alt.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _document_alt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _document_alt_vue_vue_type_template_id_a2103ab8___WEBPACK_IMPORTED_MODULE_0__.render,
  _document_alt_vue_vue_type_template_id_a2103ab8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/document-alt.vue"
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

/***/ "./Resources/icons/emoticon.vue":
/*!**************************************!*\
  !*** ./Resources/icons/emoticon.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _emoticon_vue_vue_type_template_id_3ed81a33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emoticon.vue?vue&type=template&id=3ed81a33& */ "./Resources/icons/emoticon.vue?vue&type=template&id=3ed81a33&");
/* harmony import */ var _emoticon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emoticon.vue?vue&type=script&lang=js& */ "./Resources/icons/emoticon.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _emoticon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _emoticon_vue_vue_type_template_id_3ed81a33___WEBPACK_IMPORTED_MODULE_0__.render,
  _emoticon_vue_vue_type_template_id_3ed81a33___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/emoticon.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/expand-wide.vue":
/*!*****************************************!*\
  !*** ./Resources/icons/expand-wide.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _expand_wide_vue_vue_type_template_id_ab5a3cee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expand-wide.vue?vue&type=template&id=ab5a3cee& */ "./Resources/icons/expand-wide.vue?vue&type=template&id=ab5a3cee&");
/* harmony import */ var _expand_wide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expand-wide.vue?vue&type=script&lang=js& */ "./Resources/icons/expand-wide.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _expand_wide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _expand_wide_vue_vue_type_template_id_ab5a3cee___WEBPACK_IMPORTED_MODULE_0__.render,
  _expand_wide_vue_vue_type_template_id_ab5a3cee___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/expand-wide.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/eye.vue":
/*!*********************************!*\
  !*** ./Resources/icons/eye.vue ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _eye_vue_vue_type_template_id_887931d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eye.vue?vue&type=template&id=887931d8& */ "./Resources/icons/eye.vue?vue&type=template&id=887931d8&");
/* harmony import */ var _eye_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eye.vue?vue&type=script&lang=js& */ "./Resources/icons/eye.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _eye_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _eye_vue_vue_type_template_id_887931d8___WEBPACK_IMPORTED_MODULE_0__.render,
  _eye_vue_vue_type_template_id_887931d8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/eye.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/file-audio.vue":
/*!****************************************!*\
  !*** ./Resources/icons/file-audio.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _file_audio_vue_vue_type_template_id_cd75699c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-audio.vue?vue&type=template&id=cd75699c& */ "./Resources/icons/file-audio.vue?vue&type=template&id=cd75699c&");
/* harmony import */ var _file_audio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-audio.vue?vue&type=script&lang=js& */ "./Resources/icons/file-audio.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _file_audio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _file_audio_vue_vue_type_template_id_cd75699c___WEBPACK_IMPORTED_MODULE_0__.render,
  _file_audio_vue_vue_type_template_id_cd75699c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/file-audio.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/file-empty.vue":
/*!****************************************!*\
  !*** ./Resources/icons/file-empty.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _file_empty_vue_vue_type_template_id_396aa129___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-empty.vue?vue&type=template&id=396aa129& */ "./Resources/icons/file-empty.vue?vue&type=template&id=396aa129&");
/* harmony import */ var _file_empty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-empty.vue?vue&type=script&lang=js& */ "./Resources/icons/file-empty.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _file_empty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _file_empty_vue_vue_type_template_id_396aa129___WEBPACK_IMPORTED_MODULE_0__.render,
  _file_empty_vue_vue_type_template_id_396aa129___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/file-empty.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/file-image.vue":
/*!****************************************!*\
  !*** ./Resources/icons/file-image.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _file_image_vue_vue_type_template_id_59b60e37___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-image.vue?vue&type=template&id=59b60e37& */ "./Resources/icons/file-image.vue?vue&type=template&id=59b60e37&");
/* harmony import */ var _file_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-image.vue?vue&type=script&lang=js& */ "./Resources/icons/file-image.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _file_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _file_image_vue_vue_type_template_id_59b60e37___WEBPACK_IMPORTED_MODULE_0__.render,
  _file_image_vue_vue_type_template_id_59b60e37___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/file-image.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/file-video.vue":
/*!****************************************!*\
  !*** ./Resources/icons/file-video.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _file_video_vue_vue_type_template_id_44fe2d52___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-video.vue?vue&type=template&id=44fe2d52& */ "./Resources/icons/file-video.vue?vue&type=template&id=44fe2d52&");
/* harmony import */ var _file_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-video.vue?vue&type=script&lang=js& */ "./Resources/icons/file-video.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _file_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _file_video_vue_vue_type_template_id_44fe2d52___WEBPACK_IMPORTED_MODULE_0__.render,
  _file_video_vue_vue_type_template_id_44fe2d52___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/file-video.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/history.vue":
/*!*************************************!*\
  !*** ./Resources/icons/history.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _history_vue_vue_type_template_id_55ff7a77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history.vue?vue&type=template&id=55ff7a77& */ "./Resources/icons/history.vue?vue&type=template&id=55ff7a77&");
/* harmony import */ var _history_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./history.vue?vue&type=script&lang=js& */ "./Resources/icons/history.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _history_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _history_vue_vue_type_template_id_55ff7a77___WEBPACK_IMPORTED_MODULE_0__.render,
  _history_vue_vue_type_template_id_55ff7a77___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/history.vue"
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

/***/ "./Resources/icons/pause.vue":
/*!***********************************!*\
  !*** ./Resources/icons/pause.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _pause_vue_vue_type_template_id_3d6d1199___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pause.vue?vue&type=template&id=3d6d1199& */ "./Resources/icons/pause.vue?vue&type=template&id=3d6d1199&");
/* harmony import */ var _pause_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pause.vue?vue&type=script&lang=js& */ "./Resources/icons/pause.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _pause_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _pause_vue_vue_type_template_id_3d6d1199___WEBPACK_IMPORTED_MODULE_0__.render,
  _pause_vue_vue_type_template_id_3d6d1199___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/pause.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/play.vue":
/*!**********************************!*\
  !*** ./Resources/icons/play.vue ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _play_vue_vue_type_template_id_fe5b9b3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./play.vue?vue&type=template&id=fe5b9b3e& */ "./Resources/icons/play.vue?vue&type=template&id=fe5b9b3e&");
/* harmony import */ var _play_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./play.vue?vue&type=script&lang=js& */ "./Resources/icons/play.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _play_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _play_vue_vue_type_template_id_fe5b9b3e___WEBPACK_IMPORTED_MODULE_0__.render,
  _play_vue_vue_type_template_id_fe5b9b3e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/play.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/icons/screen-record.vue":
/*!*******************************************!*\
  !*** ./Resources/icons/screen-record.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _screen_record_vue_vue_type_template_id_747ee775___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen-record.vue?vue&type=template&id=747ee775& */ "./Resources/icons/screen-record.vue?vue&type=template&id=747ee775&");
/* harmony import */ var _screen_record_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen-record.vue?vue&type=script&lang=js& */ "./Resources/icons/screen-record.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _screen_record_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _screen_record_vue_vue_type_template_id_747ee775___WEBPACK_IMPORTED_MODULE_0__.render,
  _screen_record_vue_vue_type_template_id_747ee775___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/screen-record.vue"
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

/***/ "./Resources/icons/video-camera.vue":
/*!******************************************!*\
  !*** ./Resources/icons/video-camera.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _video_camera_vue_vue_type_template_id_3bf7f164___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video-camera.vue?vue&type=template&id=3bf7f164& */ "./Resources/icons/video-camera.vue?vue&type=template&id=3bf7f164&");
/* harmony import */ var _video_camera_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video-camera.vue?vue&type=script&lang=js& */ "./Resources/icons/video-camera.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _video_camera_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _video_camera_vue_vue_type_template_id_3bf7f164___WEBPACK_IMPORTED_MODULE_0__.render,
  _video_camera_vue_vue_type_template_id_3bf7f164___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/video-camera.vue"
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

/***/ "./Resources/icons/volume-mid.vue":
/*!****************************************!*\
  !*** ./Resources/icons/volume-mid.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _volume_mid_vue_vue_type_template_id_b7d49ffc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./volume-mid.vue?vue&type=template&id=b7d49ffc& */ "./Resources/icons/volume-mid.vue?vue&type=template&id=b7d49ffc&");
/* harmony import */ var _volume_mid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./volume-mid.vue?vue&type=script&lang=js& */ "./Resources/icons/volume-mid.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _volume_mid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _volume_mid_vue_vue_type_template_id_b7d49ffc___WEBPACK_IMPORTED_MODULE_0__.render,
  _volume_mid_vue_vue_type_template_id_b7d49ffc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/icons/volume-mid.vue"
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

/***/ "./Resources/dashboard/components/conversations/conversations.js?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/conversations.js?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/eslint-loader/dist/cjs.js!./conversations.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/conversations.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_conversations_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/dashboard/components/conversations/show/show.js?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/show.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/eslint-loader/dist/cjs.js!./show.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/eslint-loader/dist/cjs.js!./Resources/dashboard/components/conversations/show/show.js?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_eslint_loader_dist_cjs_js_show_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/components/emojipicker.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./Resources/components/emojipicker.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./emojipicker.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/components/waveplayer.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./Resources/components/waveplayer.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./waveplayer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./message-type.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/add-note.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./Resources/icons/add-note.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_add_note_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./add-note.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/add-note.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_add_note_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/arrow-circle-down.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./Resources/icons/arrow-circle-down.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_circle_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./arrow-circle-down.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-circle-down.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_circle_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/bookmark.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./Resources/icons/bookmark.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_bookmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./bookmark.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bookmark.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_bookmark_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/cast.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./Resources/icons/cast.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./cast.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/cast.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cast_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/colored-info-circle.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./Resources/icons/colored-info-circle.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_info_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./colored-info-circle.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-info-circle.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_info_circle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/colored-phone.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./Resources/icons/colored-phone.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_phone_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./colored-phone.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-phone.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_phone_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/document-alt.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./Resources/icons/document-alt.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_document_alt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./document-alt.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/document-alt.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_document_alt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/emoticon.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./Resources/icons/emoticon.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_emoticon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./emoticon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/emoticon.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_emoticon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/expand-wide.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./Resources/icons/expand-wide.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_expand_wide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./expand-wide.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/expand-wide.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_expand_wide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/eye.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ./Resources/icons/eye.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_eye_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./eye.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/eye.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_eye_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/file-audio.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/file-audio.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_audio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-audio.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-audio.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_audio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/file-empty.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/file-empty.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_empty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-empty.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-empty.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_empty_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/file-image.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/file-image.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-image.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-image.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/file-video.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/file-video.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-video.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-video.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_video_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/history.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./Resources/icons/history.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_history_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./history.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/history.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_history_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/pause.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./Resources/icons/pause.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pause_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./pause.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pause.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pause_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/play.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./Resources/icons/play.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_play_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./play.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/play.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_play_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./Resources/icons/screen-record.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./Resources/icons/screen-record.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_record_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./screen-record.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/screen-record.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_record_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/video-camera.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./Resources/icons/video-camera.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_video_camera_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./video-camera.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/video-camera.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_video_camera_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/icons/volume-mid.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/volume-mid.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_mid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./volume-mid.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-mid.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_mid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_show_scss_vue_type_style_index_0_id_4df493ec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./Resources/dashboard/components/conversations/show/show.scss?vue&type=style&index=0&id=4df493ec&lang=scss&scoped=true&");


/***/ }),

/***/ "./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss&":
/*!********************************************************************************************************!*\
  !*** ./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_style_index_0_id_02d35b33_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=style&index=0&id=02d35b33&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss&":
/*!*******************************************************************************************************!*\
  !*** ./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_style_index_0_id_7ff3498b_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=style&index=0&id=7ff3498b&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss&":
/*!**************************************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss& ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_16_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_style_index_0_id_41d24c66_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=style&index=0&id=41d24c66&scoped=true&lang=scss&");


/***/ }),

/***/ "./Resources/components/emojipicker.vue?vue&type=template&id=02d35b33&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./Resources/components/emojipicker.vue?vue&type=template&id=02d35b33&scoped=true& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_template_id_02d35b33_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_template_id_02d35b33_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_emojipicker_vue_vue_type_template_id_02d35b33_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./emojipicker.vue?vue&type=template&id=02d35b33&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=template&id=02d35b33&scoped=true&");


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

/***/ "./Resources/components/waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./Resources/components/waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_template_id_7ff3498b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_template_id_7ff3498b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_waveplayer_vue_vue_type_template_id_7ff3498b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true&");


/***/ }),

/***/ "./Resources/dashboard/components/conversations/conversations.vue?vue&type=template&id=7e355cea&":
/*!*******************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/conversations.vue?vue&type=template&id=7e355cea& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_conversations_vue_vue_type_template_id_7e355cea___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_conversations_vue_vue_type_template_id_7e355cea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_conversations_vue_vue_type_template_id_7e355cea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./conversations.vue?vue&type=template&id=7e355cea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/conversations.vue?vue&type=template&id=7e355cea&");


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

/***/ "./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=template&id=41d24c66&scoped=true&":
/*!***********************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=template&id=41d24c66&scoped=true& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_template_id_41d24c66_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_template_id_41d24c66_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_message_type_vue_vue_type_template_id_41d24c66_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./message-type.vue?vue&type=template&id=41d24c66&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=template&id=41d24c66&scoped=true&");


/***/ }),

/***/ "./Resources/dashboard/components/conversations/show/show.vue?vue&type=template&id=4df493ec&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./Resources/dashboard/components/conversations/show/show.vue?vue&type=template&id=4df493ec&scoped=true& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_4df493ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_4df493ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_4df493ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./show.vue?vue&type=template&id=4df493ec&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/show.vue?vue&type=template&id=4df493ec&scoped=true&");


/***/ }),

/***/ "./Resources/icons/add-note.vue?vue&type=template&id=5fc2b56a&":
/*!*********************************************************************!*\
  !*** ./Resources/icons/add-note.vue?vue&type=template&id=5fc2b56a& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_note_vue_vue_type_template_id_5fc2b56a___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_note_vue_vue_type_template_id_5fc2b56a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_note_vue_vue_type_template_id_5fc2b56a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./add-note.vue?vue&type=template&id=5fc2b56a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/add-note.vue?vue&type=template&id=5fc2b56a&");


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

/***/ "./Resources/icons/arrow-circle-down.vue?vue&type=template&id=20b3945e&":
/*!******************************************************************************!*\
  !*** ./Resources/icons/arrow-circle-down.vue?vue&type=template&id=20b3945e& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_circle_down_vue_vue_type_template_id_20b3945e___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_circle_down_vue_vue_type_template_id_20b3945e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_arrow_circle_down_vue_vue_type_template_id_20b3945e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./arrow-circle-down.vue?vue&type=template&id=20b3945e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-circle-down.vue?vue&type=template&id=20b3945e&");


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

/***/ "./Resources/icons/bookmark.vue?vue&type=template&id=55d128e3&":
/*!*********************************************************************!*\
  !*** ./Resources/icons/bookmark.vue?vue&type=template&id=55d128e3& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bookmark_vue_vue_type_template_id_55d128e3___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bookmark_vue_vue_type_template_id_55d128e3___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_bookmark_vue_vue_type_template_id_55d128e3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./bookmark.vue?vue&type=template&id=55d128e3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bookmark.vue?vue&type=template&id=55d128e3&");


/***/ }),

/***/ "./Resources/icons/cast.vue?vue&type=template&id=12ef24ec&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/cast.vue?vue&type=template&id=12ef24ec& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cast_vue_vue_type_template_id_12ef24ec___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cast_vue_vue_type_template_id_12ef24ec___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cast_vue_vue_type_template_id_12ef24ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./cast.vue?vue&type=template&id=12ef24ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/cast.vue?vue&type=template&id=12ef24ec&");


/***/ }),

/***/ "./Resources/icons/colored-info-circle.vue?vue&type=template&id=56ad53b2&":
/*!********************************************************************************!*\
  !*** ./Resources/icons/colored-info-circle.vue?vue&type=template&id=56ad53b2& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_info_circle_vue_vue_type_template_id_56ad53b2___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_info_circle_vue_vue_type_template_id_56ad53b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_info_circle_vue_vue_type_template_id_56ad53b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./colored-info-circle.vue?vue&type=template&id=56ad53b2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-info-circle.vue?vue&type=template&id=56ad53b2&");


/***/ }),

/***/ "./Resources/icons/colored-phone.vue?vue&type=template&id=108d9946&":
/*!**************************************************************************!*\
  !*** ./Resources/icons/colored-phone.vue?vue&type=template&id=108d9946& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_phone_vue_vue_type_template_id_108d9946___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_phone_vue_vue_type_template_id_108d9946___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_colored_phone_vue_vue_type_template_id_108d9946___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./colored-phone.vue?vue&type=template&id=108d9946& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-phone.vue?vue&type=template&id=108d9946&");


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

/***/ "./Resources/icons/document-alt.vue?vue&type=template&id=a2103ab8&":
/*!*************************************************************************!*\
  !*** ./Resources/icons/document-alt.vue?vue&type=template&id=a2103ab8& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_document_alt_vue_vue_type_template_id_a2103ab8___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_document_alt_vue_vue_type_template_id_a2103ab8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_document_alt_vue_vue_type_template_id_a2103ab8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./document-alt.vue?vue&type=template&id=a2103ab8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/document-alt.vue?vue&type=template&id=a2103ab8&");


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

/***/ "./Resources/icons/emoticon.vue?vue&type=template&id=3ed81a33&":
/*!*********************************************************************!*\
  !*** ./Resources/icons/emoticon.vue?vue&type=template&id=3ed81a33& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_emoticon_vue_vue_type_template_id_3ed81a33___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_emoticon_vue_vue_type_template_id_3ed81a33___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_emoticon_vue_vue_type_template_id_3ed81a33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./emoticon.vue?vue&type=template&id=3ed81a33& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/emoticon.vue?vue&type=template&id=3ed81a33&");


/***/ }),

/***/ "./Resources/icons/expand-wide.vue?vue&type=template&id=ab5a3cee&":
/*!************************************************************************!*\
  !*** ./Resources/icons/expand-wide.vue?vue&type=template&id=ab5a3cee& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_expand_wide_vue_vue_type_template_id_ab5a3cee___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_expand_wide_vue_vue_type_template_id_ab5a3cee___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_expand_wide_vue_vue_type_template_id_ab5a3cee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./expand-wide.vue?vue&type=template&id=ab5a3cee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/expand-wide.vue?vue&type=template&id=ab5a3cee&");


/***/ }),

/***/ "./Resources/icons/eye.vue?vue&type=template&id=887931d8&":
/*!****************************************************************!*\
  !*** ./Resources/icons/eye.vue?vue&type=template&id=887931d8& ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_eye_vue_vue_type_template_id_887931d8___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_eye_vue_vue_type_template_id_887931d8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_eye_vue_vue_type_template_id_887931d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./eye.vue?vue&type=template&id=887931d8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/eye.vue?vue&type=template&id=887931d8&");


/***/ }),

/***/ "./Resources/icons/file-audio.vue?vue&type=template&id=cd75699c&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/file-audio.vue?vue&type=template&id=cd75699c& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_audio_vue_vue_type_template_id_cd75699c___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_audio_vue_vue_type_template_id_cd75699c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_audio_vue_vue_type_template_id_cd75699c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-audio.vue?vue&type=template&id=cd75699c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-audio.vue?vue&type=template&id=cd75699c&");


/***/ }),

/***/ "./Resources/icons/file-empty.vue?vue&type=template&id=396aa129&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/file-empty.vue?vue&type=template&id=396aa129& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_empty_vue_vue_type_template_id_396aa129___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_empty_vue_vue_type_template_id_396aa129___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_empty_vue_vue_type_template_id_396aa129___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-empty.vue?vue&type=template&id=396aa129& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-empty.vue?vue&type=template&id=396aa129&");


/***/ }),

/***/ "./Resources/icons/file-image.vue?vue&type=template&id=59b60e37&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/file-image.vue?vue&type=template&id=59b60e37& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_image_vue_vue_type_template_id_59b60e37___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_image_vue_vue_type_template_id_59b60e37___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_image_vue_vue_type_template_id_59b60e37___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-image.vue?vue&type=template&id=59b60e37& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-image.vue?vue&type=template&id=59b60e37&");


/***/ }),

/***/ "./Resources/icons/file-video.vue?vue&type=template&id=44fe2d52&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/file-video.vue?vue&type=template&id=44fe2d52& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_video_vue_vue_type_template_id_44fe2d52___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_video_vue_vue_type_template_id_44fe2d52___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_file_video_vue_vue_type_template_id_44fe2d52___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./file-video.vue?vue&type=template&id=44fe2d52& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-video.vue?vue&type=template&id=44fe2d52&");


/***/ }),

/***/ "./Resources/icons/history.vue?vue&type=template&id=55ff7a77&":
/*!********************************************************************!*\
  !*** ./Resources/icons/history.vue?vue&type=template&id=55ff7a77& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_history_vue_vue_type_template_id_55ff7a77___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_history_vue_vue_type_template_id_55ff7a77___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_history_vue_vue_type_template_id_55ff7a77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./history.vue?vue&type=template&id=55ff7a77& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/history.vue?vue&type=template&id=55ff7a77&");


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

/***/ "./Resources/icons/pause.vue?vue&type=template&id=3d6d1199&":
/*!******************************************************************!*\
  !*** ./Resources/icons/pause.vue?vue&type=template&id=3d6d1199& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pause_vue_vue_type_template_id_3d6d1199___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pause_vue_vue_type_template_id_3d6d1199___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pause_vue_vue_type_template_id_3d6d1199___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./pause.vue?vue&type=template&id=3d6d1199& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pause.vue?vue&type=template&id=3d6d1199&");


/***/ }),

/***/ "./Resources/icons/play.vue?vue&type=template&id=fe5b9b3e&":
/*!*****************************************************************!*\
  !*** ./Resources/icons/play.vue?vue&type=template&id=fe5b9b3e& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_play_vue_vue_type_template_id_fe5b9b3e___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_play_vue_vue_type_template_id_fe5b9b3e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_play_vue_vue_type_template_id_fe5b9b3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./play.vue?vue&type=template&id=fe5b9b3e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/play.vue?vue&type=template&id=fe5b9b3e&");


/***/ }),

/***/ "./Resources/icons/screen-record.vue?vue&type=template&id=747ee775&":
/*!**************************************************************************!*\
  !*** ./Resources/icons/screen-record.vue?vue&type=template&id=747ee775& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_record_vue_vue_type_template_id_747ee775___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_record_vue_vue_type_template_id_747ee775___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_record_vue_vue_type_template_id_747ee775___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./screen-record.vue?vue&type=template&id=747ee775& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/screen-record.vue?vue&type=template&id=747ee775&");


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

/***/ "./Resources/icons/video-camera.vue?vue&type=template&id=3bf7f164&":
/*!*************************************************************************!*\
  !*** ./Resources/icons/video-camera.vue?vue&type=template&id=3bf7f164& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_video_camera_vue_vue_type_template_id_3bf7f164___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_video_camera_vue_vue_type_template_id_3bf7f164___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_video_camera_vue_vue_type_template_id_3bf7f164___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./video-camera.vue?vue&type=template&id=3bf7f164& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/video-camera.vue?vue&type=template&id=3bf7f164&");


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

/***/ "./Resources/icons/volume-mid.vue?vue&type=template&id=b7d49ffc&":
/*!***********************************************************************!*\
  !*** ./Resources/icons/volume-mid.vue?vue&type=template&id=b7d49ffc& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_mid_vue_vue_type_template_id_b7d49ffc___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_mid_vue_vue_type_template_id_b7d49ffc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_volume_mid_vue_vue_type_template_id_b7d49ffc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./volume-mid.vue?vue&type=template&id=b7d49ffc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-mid.vue?vue&type=template&id=b7d49ffc&");


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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=template&id=02d35b33&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/emojipicker.vue?vue&type=template&id=02d35b33&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    {},
    [
      _c("emoji-picker", {
        on: { emoji: _vm.insert },
        scopedSlots: _vm._u([
          {
            key: "emoji-invoker",
            fn: function(ref) {
              var clickEvent = ref.events.click
              return _c(
                "div",
                {
                  ref: "emoji-invoker",
                  staticClass: "emoji-invoker",
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return clickEvent($event)
                    }
                  }
                },
                [_c("emoticon-icon", { attrs: { height: "20", width: "20" } })],
                1
              )
            }
          },
          {
            key: "emoji-picker",
            fn: function(ref) {
              var emojis = ref.emojis
              var insert = ref.insert
              return _c("div", { staticClass: "emoji-picker" }, [
                _c("div", [
                  _c(
                    "div",
                    _vm._l(emojis, function(emojiGroup, category) {
                      return _c("div", { key: category }, [
                        _c("h5", [_vm._v(_vm._s(category))]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "emojis" },
                          _vm._l(emojiGroup, function(emoji, emojiName) {
                            return _c(
                              "span",
                              {
                                key: emojiName,
                                attrs: { title: emojiName },
                                on: {
                                  click: function($event) {
                                    return insert(emoji)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(emoji))]
                            )
                          }),
                          0
                        )
                      ])
                    }),
                    0
                  )
                ])
              ])
            }
          }
        ])
      })
    ],
    1
  )
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/components/waveplayer.vue?vue&type=template&id=7ff3498b&scoped=true& ***!
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
      staticClass:
        "d-flex align-items-center justify-content-between waveplayer-container"
    },
    [
      _c(
        "button",
        {
          staticClass:
            "audio-control shadow-sm position-relative p-0 mr-2 border btn-white",
          on: { click: _vm.togglePlayer }
        },
        [
          _vm.playerStatus == "paused"
            ? _c("play-icon", {
                attrs: { width: "15", height: "15", fill: "#999" }
              })
            : _vm.playerStatus == "playing"
            ? _c("pause-icon", {
                attrs: { width: "15", height: "15", fill: "#999" }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { ref: "waveplayer", staticClass: "waveplayer flex-grow-1" }),
      _vm._v(" "),
      _c("span", { staticClass: "text-nowrap pl-2" }, [
        _vm._v(_vm._s(_vm.duration))
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/conversations.vue?vue&type=template&id=7e355cea&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/conversations.vue?vue&type=template&id=7e355cea& ***!
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
    { staticClass: "d-flex h-100" },
    [
      _c("index"),
      _vm._v(" "),
      _c("show", {
        on: {
          ready: function($event) {
            return _vm.showReady()
          }
        }
      })
    ],
    1
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=template&id=41d24c66&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/message-type.vue?vue&type=template&id=41d24c66&scoped=true& ***!
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
  return _c("div", { staticClass: "position-relative" }, [
    _vm.message.type == "emoji"
      ? _c("div", { staticClass: "mb-0 display-3 line-height-1" }, [
          _vm._v(_vm._s(_vm.message.message))
        ])
      : _vm.message.type == "image"
      ? _c("div", { staticClass: "mb-0" }, [
          _vm.message.sending
            ? _c(
                "div",
                {
                  staticClass:
                    "position-absolute-center message-sending w-100 h-100"
                },
                [_vm._m(0)]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.squareThumbnail
            ? _c("div", {
                staticClass: "image-square rounded",
                style: { backgroundImage: "url(" + _vm.message.preview + ")" },
                on: {
                  click: function($event) {
                    if (_vm.click) {
                      _vm.$parent.openFile(_vm.message)
                    }
                  }
                }
              })
            : _c("img", {
                staticClass: "rounded cursor-pointer",
                attrs: { draggable: "false", src: _vm.message.preview },
                on: {
                  click: function($event) {
                    if (_vm.click) {
                      _vm.$parent.openFile(_vm.message)
                    }
                  }
                }
              })
        ])
      : _vm.message.type == "video"
      ? _c("div", { staticClass: "mb-0" }, [
          _vm.message.sending
            ? _c(
                "div",
                {
                  staticClass:
                    "position-absolute-center message-sending w-100 h-100"
                },
                [_vm._m(1)]
              )
            : _c(
                "div",
                {
                  staticClass:
                    "position-absolute-center preview-video-play pointer-events-none"
                },
                [_c("play-icon", { attrs: { height: "20", width: "20" } })],
                1
              ),
          _vm._v(" "),
          _vm.squareThumbnail
            ? _c("div", {
                staticClass: "image-square rounded",
                style: { backgroundImage: "url(" + _vm.message.preview + ")" },
                on: {
                  click: function($event) {
                    if (_vm.click) {
                      _vm.$parent.openFile(_vm.message)
                    }
                  }
                }
              })
            : _c("img", {
                staticClass: "rounded cursor-pointer",
                attrs: { draggable: "false", src: _vm.message.preview },
                on: {
                  click: function($event) {
                    if (_vm.click) {
                      _vm.$parent.openFile(_vm.message)
                    }
                  }
                }
              })
        ])
      : _vm.message.type == "audio"
      ? _c(
          "div",
          [
            _c("waveplayer", {
              attrs: {
                source: _vm.message.source,
                duration: _vm.message.metadata.duration
              }
            })
          ],
          1
        )
      : _vm.message.type == "file"
      ? _c("div", { staticClass: "mb-0" }, [
          _vm.$root.isImage(_vm.message.metadata.extension)
            ? _c("img", {
                staticClass: "w-100 rounded cursor-pointer",
                attrs: { draggable: "false", src: _vm.message.preview }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: " cursor-pointer",
              on: {
                click: function($event) {
                  if (_vm.click) {
                    _vm.$root.downloadMedia(_vm.message)
                  }
                }
              }
            },
            [
              _c(
                "span",
                { staticClass: "d-block text-center" },
                [
                  _c(_vm.fileIcon(_vm.message.metadata.extension), {
                    tag: "component",
                    attrs: {
                      height: "46",
                      transform: "scale(1.7)",
                      fill: _vm.outgoing ? "white" : ""
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "d-flex align-items-center" },
                [
                  _c("arrow-circle-down-icon", {
                    attrs: {
                      height: "15",
                      width: "15",
                      fill: _vm.outgoing ? "white" : ""
                    }
                  }),
                  _vm._v(" \n\t\t\t\t"),
                  _c(
                    "small",
                    {
                      staticClass: "text-ellipsis",
                      class: [_vm.outgoing ? "text-white" : "text-muted"]
                    },
                    [_vm._v(_vm._s(_vm.message.metadata.filename))]
                  )
                ],
                1
              )
            ]
          )
        ])
      : _c("div", { staticClass: "mb-0" }, [
          _c("p", {
            staticClass: "mb-0 text-left message-text",
            domProps: { innerHTML: _vm._s(_vm.urlify(_vm.message.message)) }
          }),
          _vm._v(" "),
          _vm.message.link_preview
            ? _c("div", {
                staticClass: "message-preview-container",
                domProps: { innerHTML: _vm._s(_vm.message.link_preview) }
              })
            : _vm._e()
        ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "position-absolute-center" }, [
      _c("div", {
        staticClass: "spinner-border spinner-border-sm text-primary"
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "position-absolute-center" }, [
      _c("div", {
        staticClass: "spinner-border spinner-border-sm text-primary"
      })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/show.vue?vue&type=template&id=4df493ec&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/dashboard/components/conversations/show/show.vue?vue&type=template&id=4df493ec&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.conversation
    ? _c(
        "div",
        {
          staticClass:
            "flex-grow-1 bg-white d-flex flex-column h-100 overflow-hidden"
        },
        [
          _c(
            "div",
            {
              staticClass:
                "px-4 py-4 bg-white border-bottom position-relative d-flex align-items-center"
            },
            [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c(
                  "div",
                  {
                    staticClass: "user-profile-image",
                    style: {
                      backgroundImage:
                        "url(" + _vm.conversation.member.profile_image + ")"
                    }
                  },
                  [
                    !_vm.conversation.member.profile_image
                      ? _c("span", [
                          _vm._v(_vm._s(_vm.conversation.member.initials))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.$root.isOnline(_vm.conversation.member.id)
                      ? _c("i", { staticClass: "online-status bg-success" }, [
                          _vm._v(" ")
                        ])
                      : _vm._e()
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "ml-2" }, [
                  _c(
                    "h5",
                    {
                      staticClass: "font-heading mb-0",
                      class: {
                        "hover-underline cursor-pointer": _vm.contact(
                          _vm.conversation.member
                        )
                      },
                      on: {
                        click: function($event) {
                          return _vm.goToContact(_vm.conversation.member)
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.conversation.member.full_name ||
                            _vm.conversation.name
                        )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.conversation.member.is_pending
                    ? _c("small", { staticClass: "d-block text-warning" }, [
                        _vm._v("Pending account")
                      ])
                    : _vm.conversation.member.id &&
                      _vm.conversation.member.last_online
                    ? _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("small", { staticClass: "text-secondary" }, [
                          _vm._v(
                            _vm._s(
                              _vm.$root.isOnline(_vm.conversation.member.id)
                                ? "Online"
                                : "Last online " +
                                    _vm.conversation.member.last_online_format
                            )
                          )
                        ])
                      ])
                    : _c(
                        "small",
                        { staticClass: "d-block text-secondary" },
                        [
                          (_vm.conversation.member.role || {}).role != "support"
                            ? [
                                _vm._v(
                                  _vm._s(_vm.conversation.members.length) +
                                    " members"
                                )
                              ]
                            : [_vm._v(_vm._s(_vm.conversation.member.email))]
                        ],
                        2
                      )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "ml-auto btn-circle-actions" },
                [
                  !_vm.conversation.member.is_pending &&
                  (_vm.conversation.member.role || {}).role != "support"
                    ? [
                        _c(
                          "button",
                          {
                            directives: [
                              {
                                name: "tooltip",
                                rawName: "v-tooltip.bottom",
                                value: "Video call",
                                expression: "'Video call'",
                                modifiers: { bottom: true }
                              }
                            ],
                            staticClass: "btn border-0 py-0 px-1",
                            class: {
                              "active disabled": _vm.$root.callConversation
                                ? true
                                : false
                            },
                            attrs: {
                              "data-intro":
                                _vm.$root.intros.conversations.steps[2],
                              "data-step": "3"
                            },
                            on: {
                              click: function($event) {
                                _vm.$root.callConversation = _vm.conversation
                                _vm.$root.$refs["videoCall"].outgoingCall(
                                  _vm.conversation
                                )
                              }
                            }
                          },
                          [
                            _c("videocam-icon", {
                              attrs: { width: "26", height: "26" }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            directives: [
                              {
                                name: "tooltip",
                                rawName: "v-tooltip.bottom",
                                value: "Audio call",
                                expression: "'Audio call'",
                                modifiers: { bottom: true }
                              }
                            ],
                            staticClass: "btn border-0 py-0 px-1 mx-2",
                            class: {
                              "active disabled": _vm.$root.callConversation
                                ? true
                                : false
                            },
                            attrs: {
                              "data-intro":
                                _vm.$root.intros.conversations.steps[3],
                              "data-step": "4"
                            },
                            on: {
                              click: function($event) {
                                _vm.$root.callConversation = _vm.conversation
                                _vm.$root.$refs["videoCall"].outgoingCall(
                                  _vm.conversation,
                                  false
                                )
                              }
                            }
                          },
                          [
                            _c("call-menu-icon", {
                              attrs: { width: "20", height: "20" }
                            })
                          ],
                          1
                        )
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      directives: [
                        {
                          name: "tooltip",
                          rawName: "v-tooltip.bottom",
                          value: "Details",
                          expression: "'Details'",
                          modifiers: { bottom: true }
                        }
                      ],
                      staticClass: "btn shadow-none border-0 py-0 px-1",
                      class: { active: _vm.$root.detailsTab == "profile" },
                      attrs: {
                        "data-intro": _vm.$root.intros.conversations.steps[4],
                        "data-step": "5"
                      },
                      on: {
                        click: function($event) {
                          _vm.$root.detailsTab = _vm.$root.detailsTab
                            ? ""
                            : "profile"
                        }
                      }
                    },
                    [
                      _c("info-circle-icon", {
                        attrs: { width: "28", height: "28" }
                      })
                    ],
                    1
                  )
                ],
                2
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "d-flex flex-grow-1 h-100 overflow-hidden" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "conversation-messages flex-grow-1 border-right text-nowrap overflow-hidden position-relative h-100",
                  on: {
                    dragover: function($event) {
                      $event.preventDefault()
                      _vm.dragOver = true
                    },
                    dragleave: function($event) {
                      $event.preventDefault()
                      _vm.dragOver = false
                    },
                    drop: function($event) {
                      $event.preventDefault()
                      return _vm.dropFile($event)
                    }
                  }
                },
                [
                  _vm.dragOver
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "filedrop position-absolute w-100 h-100 bg-light"
                        },
                        [
                          _c(
                            "span",
                            {
                              staticClass:
                                "h3 position-absolute-center text-secondary"
                            },
                            [_vm._v("Drop Files Here")]
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex flex-column h-100" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "overflow-hidden flex-grow-1 bg-white position-relative"
                      },
                      [
                        _vm.hasScreenRecording
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "position-absolute w-100 h-100 bg-white screen-recorder-data"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "position-absolute-center w-75 text-center h-100 py-5 d-flex flex-column"
                                  },
                                  [
                                    _c(
                                      "h6",
                                      { staticClass: "font-heading h5" },
                                      [_vm._v("Screen recording")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "flex-grow-1 position-relative bg-dark rounded overflow-hidden"
                                      },
                                      [
                                        _c("video", {
                                          ref: "screenRecorderData",
                                          staticClass:
                                            "w-100 h-100 bg-black position-absolute-center d-block outline-0",
                                          attrs: { src: "", controls: "" }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "mt-2" }, [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-light border",
                                          attrs: { type: "button" },
                                          on: {
                                            click: function($event) {
                                              return _vm.downloadScreenRecording()
                                            }
                                          }
                                        },
                                        [_vm._v("Download")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn  btn-light border",
                                          attrs: { type: "button" },
                                          on: { click: _vm.sendScreenRecording }
                                        },
                                        [_vm._v("Send")]
                                      )
                                    ])
                                  ]
                                ),
                                _vm._v(" "),
                                _vm.isScreenRecordDownloading
                                  ? _c(
                                      "div",
                                      {
                                        staticClass:
                                          "position-absolute-center w-100 h-100 bg-white"
                                      },
                                      [_vm._m(0)]
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.pastedFile
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "position-absolute w-100 h-100 bg-white pasted-file"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "position-absolute-center w-75 h-100 d-flex flex-column p-5"
                                  },
                                  [
                                    !_vm.pastedFile.preview
                                      ? _c("div", {
                                          staticClass:
                                            "position-relative border"
                                        })
                                      : _c("div", {
                                          staticClass:
                                            "pasted-preview flex-grow-1",
                                          style: {
                                            "background-image":
                                              "url(" +
                                              _vm.pastedFile.preview +
                                              ")"
                                          }
                                        }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "text-center mt-3" },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass: "btn btn-light border",
                                            attrs: { type: "button" },
                                            on: {
                                              click: function($event) {
                                                _vm.pastedFile = null
                                              }
                                            }
                                          },
                                          [_vm._v("Cancel")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "button",
                                          {
                                            staticClass: "btn btn-light border",
                                            attrs: { type: "button" },
                                            on: {
                                              click: function($event) {
                                                return _vm.sendPastedFile()
                                              }
                                            }
                                          },
                                          [_vm._v("Send")]
                                        )
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        !_vm.ready || !_vm.conversation.ready
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "bg-white messages-loader position-absolute-center w-100 h-100"
                              },
                              [_vm._m(1)]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "chat-scroll",
                                rawName: "v-chat-scroll",
                                value: { always: true, smooth: false },
                                expression: "{ always: true, smooth: false }"
                              }
                            ],
                            ref: "message-group-container",
                            staticClass: "p-3 h-100 overflow-y-auto",
                            class: { "opacity-0": !_vm.ready },
                            on: {
                              "v-chat-scroll-top-reached": _vm.messageScroll
                            }
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "text-center mb-3",
                                class: {
                                  "opacity-0": !_vm.messagePaginateLoading
                                }
                              },
                              [
                                _c("div", {
                                  staticClass:
                                    "spinner-border spinner-border-sm text-primary",
                                  attrs: { role: "status" }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.grouped_messages, function(
                              grouped_message,
                              index
                            ) {
                              return _c(
                                "div",
                                {
                                  key: index,
                                  staticClass: "w-100 message-group"
                                },
                                [
                                  grouped_message.type == "call_ended"
                                    ? _c(
                                        "div",
                                        {
                                          staticClass: "text-center text-gray"
                                        },
                                        _vm._l(
                                          grouped_message.messages,
                                          function(message) {
                                            return _c(
                                              "div",
                                              {
                                                key: message.id,
                                                staticClass:
                                                  "position-relative hrule"
                                              },
                                              [
                                                _c(
                                                  "small",
                                                  {
                                                    staticClass:
                                                      "bg-white position-relative px-2 font-weight-light"
                                                  },
                                                  [
                                                    _vm._v(
                                                      " " +
                                                        _vm._s(
                                                          message.message
                                                        ) +
                                                        " "
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      )
                                    : grouped_message.type == "call_failed"
                                    ? _c(
                                        "div",
                                        {
                                          staticClass: "text-center text-gray"
                                        },
                                        _vm._l(
                                          grouped_message.messages,
                                          function(message) {
                                            return _c(
                                              "div",
                                              {
                                                key: message.id,
                                                staticClass:
                                                  "position-relative hrule"
                                              },
                                              [
                                                _c(
                                                  "small",
                                                  {
                                                    staticClass:
                                                      "bg-white position-relative px-2 font-weight-light"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(
                                                          message.user_id ==
                                                            _vm.$root.auth.id
                                                            ? "Call failed"
                                                            : "You missed a call"
                                                        ) +
                                                        "\n\t\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      )
                                    : [
                                        _c(
                                          "small",
                                          {
                                            staticClass:
                                              "font-heading font-weight-bold font-size-base line-height-1 message-sender d-block",
                                            class: {
                                              "text-right":
                                                grouped_message.outgoing
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                grouped_message.sender.full_name
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex align-items-end message-body",
                                            class: {
                                              "outgoing-message text-right flex-row-reverse":
                                                grouped_message.outgoing
                                            }
                                          },
                                          [
                                            _c("div", [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "user-profile-image",
                                                  style: {
                                                    backgroundImage:
                                                      "url(" +
                                                      grouped_message.sender
                                                        .profile_image +
                                                      ")"
                                                  }
                                                },
                                                [
                                                  !grouped_message.sender
                                                    .profile_image
                                                    ? _c("span", [
                                                        _vm._v(
                                                          _vm._s(
                                                            grouped_message
                                                              .sender.initials
                                                          )
                                                        )
                                                      ])
                                                    : _vm._e()
                                                ]
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "px-1 flex-1" },
                                              _vm._l(
                                                grouped_message.messages,
                                                function(message) {
                                                  return _c(
                                                    "div",
                                                    {
                                                      key: message.id,
                                                      staticClass:
                                                        "message-item",
                                                      attrs: {
                                                        id:
                                                          "message-" +
                                                          message.id
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "text-wrap position-relative message-content",
                                                          class: {
                                                            "p-0 bg-transparent": [
                                                              "emoji",
                                                              "image",
                                                              "video"
                                                            ].find(function(x) {
                                                              return (
                                                                x ==
                                                                message.type
                                                              )
                                                            })
                                                          }
                                                        },
                                                        [
                                                          !message.sending
                                                            ? _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "message-actions position-absolute px-2 d-flex align-items-center dropup"
                                                                },
                                                                [
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "action-content position-relative line-height-1"
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          directives: [
                                                                            {
                                                                              name:
                                                                                "tooltip",
                                                                              rawName:
                                                                                "v-tooltip.top",
                                                                              value:
                                                                                "Tags",
                                                                              expression:
                                                                                "'Tags'",
                                                                              modifiers: {
                                                                                top: true
                                                                              }
                                                                            }
                                                                          ],
                                                                          staticClass:
                                                                            "action-button d-flex align-items-center",
                                                                          attrs: {
                                                                            "data-toggle":
                                                                              "dropdown"
                                                                          }
                                                                        },
                                                                        [
                                                                          message
                                                                            .tags
                                                                            .length >
                                                                          0
                                                                            ? _c(
                                                                                "span",
                                                                                {
                                                                                  staticClass:
                                                                                    "action-label"
                                                                                },
                                                                                [
                                                                                  _vm._v(
                                                                                    _vm._s(
                                                                                      message
                                                                                        .tags
                                                                                        .length
                                                                                    )
                                                                                  )
                                                                                ]
                                                                              )
                                                                            : _vm._e(),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "bookmark-icon",
                                                                            {
                                                                              staticClass:
                                                                                "cursor-pointer",
                                                                              attrs: {
                                                                                height:
                                                                                  "20",
                                                                                width:
                                                                                  "20"
                                                                              }
                                                                            }
                                                                          )
                                                                        ],
                                                                        1
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "dropdown-menu dropdown-menu-x-center p-1 bg-light",
                                                                          on: {
                                                                            click: function(
                                                                              $event
                                                                            ) {
                                                                              $event.stopPropagation()
                                                                            }
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "vue-form-validate",
                                                                            {
                                                                              staticClass:
                                                                                "input-group border rounded overflow-hidden",
                                                                              on: {
                                                                                submit: function(
                                                                                  $event
                                                                                ) {
                                                                                  return _vm.updateMessageTags(
                                                                                    message
                                                                                  )
                                                                                }
                                                                              }
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "input",
                                                                                {
                                                                                  directives: [
                                                                                    {
                                                                                      name:
                                                                                        "model",
                                                                                      rawName:
                                                                                        "v-model",
                                                                                      value:
                                                                                        message.newTag,
                                                                                      expression:
                                                                                        "message.newTag"
                                                                                    }
                                                                                  ],
                                                                                  staticClass:
                                                                                    "form-control form-control-sm border-0 shadow-none",
                                                                                  attrs: {
                                                                                    type:
                                                                                      "text",
                                                                                    placeholder:
                                                                                      "Add tag",
                                                                                    "data-required":
                                                                                      ""
                                                                                  },
                                                                                  domProps: {
                                                                                    value:
                                                                                      message.newTag
                                                                                  },
                                                                                  on: {
                                                                                    input: function(
                                                                                      $event
                                                                                    ) {
                                                                                      if (
                                                                                        $event
                                                                                          .target
                                                                                          .composing
                                                                                      ) {
                                                                                        return
                                                                                      }
                                                                                      _vm.$set(
                                                                                        message,
                                                                                        "newTag",
                                                                                        $event
                                                                                          .target
                                                                                          .value
                                                                                      )
                                                                                    }
                                                                                  }
                                                                                }
                                                                              ),
                                                                              _vm._v(
                                                                                " "
                                                                              ),
                                                                              _c(
                                                                                "div",
                                                                                {
                                                                                  staticClass:
                                                                                    "input-group-append border-left"
                                                                                },
                                                                                [
                                                                                  _c(
                                                                                    "button",
                                                                                    {
                                                                                      staticClass:
                                                                                        "btn btn-light border-0 p-1 btn-sm line-height-1",
                                                                                      attrs: {
                                                                                        type:
                                                                                          "submit"
                                                                                      }
                                                                                    },
                                                                                    [
                                                                                      _c(
                                                                                        "plus-icon",
                                                                                        {
                                                                                          staticClass:
                                                                                            "no-action",
                                                                                          attrs: {
                                                                                            width:
                                                                                              "20",
                                                                                            height:
                                                                                              "20"
                                                                                          }
                                                                                        }
                                                                                      )
                                                                                    ],
                                                                                    1
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ]
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          message
                                                                            .tags
                                                                            .length >
                                                                          0
                                                                            ? _c(
                                                                                "div",
                                                                                {
                                                                                  staticClass:
                                                                                    "text-left"
                                                                                },
                                                                                _vm._l(
                                                                                  message.tags,
                                                                                  function(
                                                                                    tag,
                                                                                    index
                                                                                  ) {
                                                                                    return _c(
                                                                                      "div",
                                                                                      {
                                                                                        key:
                                                                                          tag.id,
                                                                                        staticClass:
                                                                                          "d-inline-block badge badge-warning py-1 px-2 mr-1 mt-1"
                                                                                      },
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                                            _vm._s(
                                                                                              tag
                                                                                            ) +
                                                                                            " \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                                        ),
                                                                                        _c(
                                                                                          "close-icon",
                                                                                          {
                                                                                            staticClass:
                                                                                              "cursor-pointer no-action",
                                                                                            attrs: {
                                                                                              height:
                                                                                                "8",
                                                                                              width:
                                                                                                "8",
                                                                                              transform:
                                                                                                "scale(2.5)"
                                                                                            },
                                                                                            nativeOn: {
                                                                                              click: function(
                                                                                                $event
                                                                                              ) {
                                                                                                message.tags.splice(
                                                                                                  index,
                                                                                                  1
                                                                                                )
                                                                                                _vm.updateMessageTags(
                                                                                                  message
                                                                                                )
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        )
                                                                                      ],
                                                                                      1
                                                                                    )
                                                                                  }
                                                                                ),
                                                                                0
                                                                              )
                                                                            : _vm._e()
                                                                        ],
                                                                        1
                                                                      )
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  grouped_message.outgoing
                                                                    ? _c(
                                                                        "div",
                                                                        {
                                                                          directives: [
                                                                            {
                                                                              name:
                                                                                "tooltip",
                                                                              rawName:
                                                                                "v-tooltip.top",
                                                                              value:
                                                                                "Delete",
                                                                              expression:
                                                                                "'Delete'",
                                                                              modifiers: {
                                                                                top: true
                                                                              }
                                                                            }
                                                                          ],
                                                                          staticClass:
                                                                            "action-content cursor-pointer line-height-1"
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "div",
                                                                            {
                                                                              staticClass:
                                                                                "action-button"
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "trash-icon",
                                                                                {
                                                                                  attrs: {
                                                                                    height:
                                                                                      "20",
                                                                                    width:
                                                                                      "20"
                                                                                  },
                                                                                  nativeOn: {
                                                                                    click: function(
                                                                                      $event
                                                                                    ) {
                                                                                      _vm.selectedMessage = message
                                                                                      _vm.$refs[
                                                                                        "deleteMessageModal"
                                                                                      ].show()
                                                                                    }
                                                                                  }
                                                                                }
                                                                              )
                                                                            ],
                                                                            1
                                                                          )
                                                                        ]
                                                                      )
                                                                    : _vm._e(),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "message-metalabel text-nowrap text-secondary small position-absolute"
                                                                    },
                                                                    [
                                                                      message.is_history
                                                                        ? _c(
                                                                            "div",
                                                                            [
                                                                              _c(
                                                                                "history-icon",
                                                                                {
                                                                                  staticClass:
                                                                                    "no-action",
                                                                                  attrs: {
                                                                                    height:
                                                                                      "16",
                                                                                    width:
                                                                                      "16"
                                                                                  }
                                                                                }
                                                                              )
                                                                            ],
                                                                            1
                                                                          )
                                                                        : _vm._e(),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "div",
                                                                        [
                                                                          _vm._v(
                                                                            _vm._s(
                                                                              message.tags.join(
                                                                                ", "
                                                                              )
                                                                            )
                                                                          )
                                                                        ]
                                                                      )
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  [
                                                                    "image",
                                                                    "video",
                                                                    "audio",
                                                                    "file"
                                                                  ].find(
                                                                    function(
                                                                      x
                                                                    ) {
                                                                      return (
                                                                        x ==
                                                                        message.type
                                                                      )
                                                                    }
                                                                  )
                                                                    ? _c(
                                                                        "div",
                                                                        {
                                                                          directives: [
                                                                            {
                                                                              name:
                                                                                "tooltip",
                                                                              rawName:
                                                                                "v-tooltip.top",
                                                                              value:
                                                                                "Download",
                                                                              expression:
                                                                                "'Download'",
                                                                              modifiers: {
                                                                                top: true
                                                                              }
                                                                            }
                                                                          ],
                                                                          staticClass:
                                                                            "action-content cursor-pointer line-height-1"
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "div",
                                                                            {
                                                                              staticClass:
                                                                                "action-button"
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "download-icon",
                                                                                {
                                                                                  attrs: {
                                                                                    height:
                                                                                      "20",
                                                                                    width:
                                                                                      "20"
                                                                                  },
                                                                                  nativeOn: {
                                                                                    click: function(
                                                                                      $event
                                                                                    ) {
                                                                                      return _vm.$root.downloadMedia(
                                                                                        message
                                                                                      )
                                                                                    }
                                                                                  }
                                                                                }
                                                                              )
                                                                            ],
                                                                            1
                                                                          )
                                                                        ]
                                                                      )
                                                                    : _vm._e()
                                                                ]
                                                              )
                                                            : _vm._e(),
                                                          _vm._v(" "),
                                                          _c("message-type", {
                                                            attrs: {
                                                              message: message,
                                                              outgoing:
                                                                grouped_message.outgoing
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  )
                                                }
                                              ),
                                              0
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        index == _vm.grouped_messages.length - 1
                                          ? _c(
                                              "small",
                                              {
                                                staticClass:
                                                  "text-secondary d-flex align-items-center",
                                                class: {
                                                  "justify-content-end":
                                                    grouped_message.outgoing
                                                }
                                              },
                                              [
                                                grouped_message.outgoing &&
                                                grouped_message.is_read
                                                  ? [
                                                      _vm._v(
                                                        "\n\t\t\t\t\t\t\t\t\t\t\tSeen \n\t\t\t\t\t\t\t\t\t\t\t"
                                                      ),
                                                      _c("eye-icon", {
                                                        staticClass:
                                                          "fill-primary",
                                                        attrs: {
                                                          width: "14",
                                                          height: "14"
                                                        }
                                                      }),
                                                      _vm._v(
                                                        "\n\t\t\t\t\t\t\t\t\t\t\t •\n\t\t\t\t\t\t\t\t\t\t"
                                                      )
                                                    ]
                                                  : _vm._e(),
                                                _vm._v(
                                                  "\n\t\t\t\t\t\t\t\t\t\t" +
                                                    _vm._s(
                                                      _vm.messageTimezoneTime(
                                                        grouped_message
                                                      )
                                                    ) +
                                                    "\n\t\t\t\t\t\t\t\t\t"
                                                )
                                              ],
                                              2
                                            )
                                          : _vm._e()
                                      ]
                                ],
                                2
                              )
                            }),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "typing-users position-absolute pl-2"
                              },
                              [
                                _vm._l(_vm.typingUsers, function(typingUser) {
                                  return [
                                    typingUser.typing
                                      ? _c(
                                          "div",
                                          {
                                            key: typingUser.userId,
                                            staticClass:
                                              "d-flex align-items-center text-secondary mb-2"
                                          },
                                          [
                                            _vm._m(2, true),
                                            _vm._v(" "),
                                            _c("small", [
                                              _vm._v(
                                                _vm._s(typingUser.name) +
                                                  " is typing"
                                              )
                                            ])
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                })
                              ],
                              2
                            )
                          ],
                          2
                        )
                      ]
                    ),
                    _vm._v(" "),
                    !_vm.conversation.member.is_pending
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "border-top shadow-sm p-2 bg-white message-form"
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "d-flex mb-1" },
                              _vm._l(_vm.pendingFiles, function(file, index) {
                                return _c(
                                  "div",
                                  {
                                    key: index,
                                    staticClass:
                                      "bg-light rounded overflow-hidden pending-file-preview mr-1 position-relative"
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "position-absolute btn badge-pill line-height-0 p-0 btn-white btn-sm remove-file",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function($event) {
                                            return _vm.pendingFiles.splice(
                                              index,
                                              1
                                            )
                                          }
                                        }
                                      },
                                      [_c("close-icon")],
                                      1
                                    ),
                                    _vm._v(" "),
                                    file.file.dataType == "image" ||
                                    file.file.dataType == "video"
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "file-thumbnail",
                                            style: {
                                              backgroundImage:
                                                "url(" + file.preview + ")"
                                            }
                                          },
                                          [
                                            file.file.dataType == "video"
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "position-absolute-center preview-video-play"
                                                  },
                                                  [
                                                    _c("play-icon", {
                                                      attrs: {
                                                        height: "15",
                                                        width: "15"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      : file.file.dataType == "audio"
                                      ? _c(
                                          "div",
                                          [
                                            _c("volume-mid-icon", {
                                              staticClass:
                                                "position-absolute-center",
                                              attrs: {
                                                height: "30",
                                                width: "30"
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      : _c(
                                          "div",
                                          { staticClass: "p-1" },
                                          [
                                            _c(
                                              _vm.$root.fileIcon(
                                                file.extension
                                              ),
                                              {
                                                tag: "component",
                                                staticClass:
                                                  "position-absolute-center",
                                                attrs: {
                                                  height: "30",
                                                  width: "30"
                                                }
                                              }
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "small",
                                              {
                                                staticClass:
                                                  "text-secondary text-center text-ellipsis pending-filename position-absolute w-100"
                                              },
                                              [_vm._v(_vm._s(file.file.name))]
                                            )
                                          ],
                                          1
                                        )
                                  ]
                                )
                              }),
                              0
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center message-form-inputs"
                              },
                              [
                                _c(
                                  "vue-form-validate",
                                  {
                                    ref: "messageForm",
                                    staticClass: "flex-1",
                                    on: {
                                      submit: _vm.sendText,
                                      mounted: _vm.messageFormMounted
                                    }
                                  },
                                  [
                                    _c("div", {
                                      ref: "messageInput",
                                      staticClass:
                                        "form-control border-0 shadow-none message-input bg-gray-200 text-wrap h-auto overflow-auto",
                                      attrs: {
                                        contenteditable: "",
                                        "data-placeholder": "Write a message..",
                                        spellcheck: "false"
                                      },
                                      on: {
                                        keypress: _vm.messageInput,
                                        paste: function($event) {
                                          $event.preventDefault()
                                          return _vm.inputPaste($event)
                                        }
                                      }
                                    })
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "px-1 text-nowrap overflow-hidden",
                                    class: { expand: _vm.moreActions }
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "line-height-sm ml-2 btn px-0",
                                        class: {
                                          "emojipicker-open": _vm.emojipicker
                                        },
                                        attrs: {
                                          "data-intro":
                                            _vm.$root.intros.conversations
                                              .steps[5],
                                          "data-step": "6",
                                          "data-position": "top",
                                          type: "button"
                                        },
                                        on: {
                                          blur: function($event) {
                                            _vm.emojipicker = false
                                          }
                                        }
                                      },
                                      [
                                        _c("emojipicker", {
                                          on: { select: _vm.selectEmoji }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "line-height-sm ml-2 btn px-0",
                                        attrs: {
                                          "data-intro":
                                            _vm.$root.intros.conversations
                                              .steps[6],
                                          "data-step": "7",
                                          "data-position": "top",
                                          type: "button"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.openRecorder("audio")
                                          }
                                        }
                                      },
                                      [
                                        _c("microphone-alt-icon", {
                                          attrs: { width: "20", height: "20" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "line-height-sm ml-2 btn px-0",
                                        attrs: {
                                          "data-intro":
                                            _vm.$root.intros.conversations
                                              .steps[7],
                                          "data-step": "8",
                                          "data-position": "top",
                                          type: "button"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.$refs[
                                              "fileMedia"
                                            ].click()
                                          }
                                        }
                                      },
                                      [
                                        _c("document-alt-icon", {
                                          attrs: { width: "20", height: "20" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("input", {
                                      ref: "fileMedia",
                                      attrs: { type: "file", hidden: "" },
                                      on: { change: _vm.addFile }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "line-height-sm ml-2 btn px-0 position-relative",
                                        attrs: {
                                          "data-intro":
                                            _vm.$root.intros.conversations
                                              .steps[8],
                                          "data-step": "9",
                                          "data-position": "top",
                                          disabled:
                                            _vm.$root.screenRecorder
                                              .conversation_id
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.initScreenRecorder()
                                          }
                                        }
                                      },
                                      [
                                        _c("screen-record-icon", {
                                          attrs: { width: "20", height: "20" }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                )
                              ],
                              1
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "conversation-details h-100 position-relative bg-white overflow-hidden",
                  class: { open: _vm.$root.detailsTab }
                },
                [
                  _c(
                    "div",
                    { staticClass: "text-left h-100 overflow-hidden" },
                    [_c("info", { attrs: { conversation: _vm.conversation } })],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c("gallery", {
                attrs: {
                  conversation: _vm.conversation,
                  file: _vm.selectedFile
                },
                on: {
                  close: function($event) {
                    _vm.selectedFile = null
                  }
                }
              }),
              _vm._v(" "),
              _vm.recorder == "audio"
                ? _c("audio-recorder-modal", {
                    on: {
                      submit: _vm.sendAudio,
                      close: function($event) {
                        _vm.recorder = ""
                      }
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "modal",
            {
              ref: "deleteMessageModal",
              on: {
                hidden: function($event) {
                  _vm.selectedMessage = null
                }
              }
            },
            [
              _vm.selectedMessage
                ? [
                    _c("h5", { staticClass: "font-heading text-center" }, [
                      _vm._v("Delete Message")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-center mt-3" }, [
                      _vm._v(
                        "\n\t\t\t\t\tAre you sure to delete this message?\n\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex justify-content-end" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-light shadow-none",
                          attrs: { type: "button", "data-dismiss": "modal" }
                        },
                        [_vm._v("Cancel")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-danger ml-auto",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm.deleteMessage(_vm.selectedMessage)
                              _vm.$refs["deleteMessageModal"].hide()
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "position-absolute-center w-75 text-center" },
      [
        _c("div", { staticClass: "spinner-border text-primary" }),
        _vm._v(" "),
        _c("h5", { staticClass: "font-heading mb-0 mt-3" }, [
          _vm._v("Converting your video...")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "position-absolute-center" }, [
      _c("div", {
        staticClass: "spinner-border spinner-border-sm text-primary"
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "typing-indicator mr-1" }, [
      _c("span"),
      _vm._v(" "),
      _c("span"),
      _vm._v(" "),
      _c("span")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/add-note.vue?vue&type=template&id=5fc2b56a&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/add-note.vue?vue&type=template&id=5fc2b56a& ***!
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
            "M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"
        }
      })
    ]
  )
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-circle-down.vue?vue&type=template&id=20b3945e&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/arrow-circle-down.vue?vue&type=template&id=20b3945e& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
            "M13,16.2928932 L16.1464466,13.1464466 C16.3417088,12.9511845 16.6582912,12.9511845 16.8535534,13.1464466 C17.0488155,13.3417088 17.0488155,13.6582912 16.8535534,13.8535534 L12.8535534,17.8535534 C12.6582912,18.0488155 12.3417088,18.0488155 12.1464466,17.8535534 L8.14644661,13.8535534 C7.95118446,13.6582912 7.95118446,13.3417088 8.14644661,13.1464466 C8.34170876,12.9511845 8.65829124,12.9511845 8.85355339,13.1464466 L12,16.2928932 L12,7.5 C12,7.22385763 12.2238576,7 12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,16.2928932 L13,16.2928932 Z M22,12.5 C22,17.7467051 17.7467051,22 12.5,22 C7.25329488,22 3,17.7467051 3,12.5 C3,7.25329488 7.25329488,3 12.5,3 C17.7467051,3 22,7.25329488 22,12.5 Z M21,12.5 C21,7.80557963 17.1944204,4 12.5,4 C7.80557963,4 4,7.80557963 4,12.5 C4,17.1944204 7.80557963,21 12.5,21 C17.1944204,21 21,17.1944204 21,12.5 Z"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bookmark.vue?vue&type=template&id=55d128e3&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/bookmark.vue?vue&type=template&id=55d128e3& ***!
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
            "M17,6.5 C17,5.67157288 16.3284271,5 15.5,5 L8.5,5 C7.67157288,5 7,5.67157288 7,6.5 L7,18.6649395 L11.760062,16.0613318 C11.9095691,15.9795561 12.0904309,15.9795561 12.239938,16.0613318 L17,18.6649395 L17,6.5 Z M6.73993801,19.9469992 C6.40673701,20.1292499 6,19.8881181 6,19.508331 L6,6.5 C6,5.11928813 7.11928813,4 8.5,4 L15.5,4 C16.8807119,4 18,5.11928813 18,6.5 L18,19.508331 C18,19.8881181 17.593263,20.1292499 17.260062,19.9469992 L12,17.0699069 L6.73993801,19.9469992 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/cast.vue?vue&type=template&id=12ef24ec&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/cast.vue?vue&type=template&id=12ef24ec& ***!
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
            "M5.5,18 C5.77614237,18 6,18.2238576 6,18.5 C6,18.7761424 5.77614237,19 5.5,19 L4.5,19 C3.11928813,19 2,17.8807119 2,16.5 L2,5.5 C2,4.11928813 3.11928813,3 4.5,3 L19.5,3 C20.8807119,3 22,4.11928813 22,5.5 L22,16.5 C22,17.8807119 20.8807119,19 19.5,19 L18.5,19 C18.2238576,19 18,18.7761424 18,18.5 C18,18.2238576 18.2238576,18 18.5,18 L19.5,18 C20.3284271,18 21,17.3284271 21,16.5 L21,5.5 C21,4.67157288 20.3284271,4 19.5,4 L4.5,4 C3.67157288,4 3,4.67157288 3,5.5 L3,16.5 C3,17.3284271 3.67157288,18 4.5,18 L5.5,18 Z M16.8747929,20.1690464 C17.1598424,20.4918545 16.9306487,21 16.5,21 L7.5,21 C7.06935126,21 6.8401576,20.4918545 7.12520712,20.1690464 L11.6252071,15.0729608 C11.824238,14.8475657 12.175762,14.8475657 12.3747929,15.0729608 L16.8747929,20.1690464 Z M12,16.1593073 L8.60855044,20 L15.3914496,20 L12,16.1593073 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-info-circle.vue?vue&type=template&id=56ad53b2&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-info-circle.vue?vue&type=template&id=56ad53b2& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
        viewBox: "0 0 48 48"
      }
    },
    [
      _c("path", {
        attrs: {
          fill: "#5D21D2",
          d:
            "M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        }
      }),
      _vm._v(" "),
      _c("path", {
        attrs: {
          fill: "#fff",
          d:
            "M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-phone.vue?vue&type=template&id=108d9946&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/colored-phone.vue?vue&type=template&id=108d9946& ***!
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
        viewBox: "0 0 48 48"
      }
    },
    [
      _c("path", {
        attrs: {
          fill: "#5D21D2",
          d:
            "M7,9v3.6C7.1,25.8,24.1,40.9,35.4,41l3.7,0c1,0,1.9-0.8,1.9-1.9l0-7.1c0-1-0.9-1.9-1.9-1.9L31,30l-4.1,4.3c-2.6,0-13.1-10.5-13.2-13.2L18,17V8.9c0-1-1-1.9-2-1.9H8.9C7.8,7,7,8,7,9"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/document-alt.vue?vue&type=template&id=a2103ab8&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/document-alt.vue?vue&type=template&id=a2103ab8& ***!
  \****************************************************************************************************************************************************************************************************************/
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
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: "21",
        height: "21",
        viewBox: "0 0 21 21"
      }
    },
    [
      _c("defs", [
        _c("rect", {
          attrs: { id: "document", width: "21", height: "21", x: "0", y: "0" }
        }),
        _vm._v(" "),
        _c(
          "mask",
          {
            attrs: {
              id: "mask-2",
              maskContentUnits: "userSpaceOnUse",
              maskUnits: "userSpaceOnUse"
            }
          },
          [
            _c("rect", {
              attrs: {
                width: "21",
                height: "21",
                x: "0",
                y: "0",
                fill: "black"
              }
            }),
            _vm._v(" "),
            _c("use", { attrs: { fill: "white", "xlink:href": "#document" } })
          ]
        )
      ]),
      _vm._v(" "),
      _c("g", [
        _c("use", { attrs: { fill: "none", "xlink:href": "#document" } }),
        _vm._v(" "),
        _c("g", [
          _c("path", {
            attrs: {
              "fill-rule": "evenodd",
              d:
                "M15.0488379 4.43034375H9.22831054c-.45314063 0-.82043555.36729492-.82043555.82043555 0 .45314062.36729492.82043554.82043555.82043554h5.82052734c.45314063 0 .82043555-.36729492.82043555-.82043554 0-.45314063-.36733594-.82043555-.82043555-.82043555z"
            }
          }),
          _vm._v(" "),
          _c("path", {
            attrs: {
              "fill-rule": "evenodd",
              d:
                "M15.0488379 7.71204492H9.22831054c-.45314063 0-.82043555.36729492-.82043555.82043555 0 .45314062.36729492.82043555.82043555.82043555h5.82052734c.45309961 0 .82043555-.36729493.82043555-.82043555 0-.45314063-.36729492-.82043555-.82043555-.82043555z"
            }
          }),
          _vm._v(" "),
          _c("path", {
            attrs: {
              "fill-rule": "evenodd",
              d:
                "M11.73063281 10.9937871H9.22831055c-.45314063 0-.82043555.36729493-.82043555.82043556 0 .45314062.36729492.82043554.82043555.82043554h2.50232226c.45314063 0 .82043555-.36729492.82043555-.82043554 0-.45314063-.36729492-.82043555-.82043555-.82043555z"
            }
          }),
          _vm._v(" "),
          _c("path", {
            attrs: {
              "fill-rule": "evenodd",
              d:
                "M19.1965866 10.33741379c0 .45314121-.36729812.82043552-.82043838.82043552-.45314025 0-.82043457-.36729431-.8203926-.82039451V3.2817421c0-.9047637-.73610688-1.64087105-1.64087296-1.64087105H8.36685944c-.90476227 0-1.64086914.73610735-1.64086914 1.64087105v11.1572752c0 .43833446.17074585.8504591.4807434 1.16037464.30987168.30987167.72187424.48049736 1.16012574.48049736h.00037002l7.54798126-.00184632c.9045601-.00020599 1.64046097-.73631286 1.64046097-1.64087104 0-.45314026.36729431-.82043553.82043457-.82043553.45314026 0 .82043457.36729527.82043457.82043553 0 1.67044258-1.25491333 3.05365371-2.87150192 3.25618934v.02493668c0 1.8095684-1.47221375 3.281744-3.2817421 3.281744H5.08511734c-1.8095665 0-3.2817421-1.47221565-3.2817421-3.281744V6.56044912c0-1.8095684 1.47221375-3.2817421 3.2817421-3.2817421C5.08679962 1.47053338 6.55831528 0 8.36685944 0h7.54798126c1.80952835 0 3.2817459 1.4721737 3.2817459 3.2817421v7.05567169zm-10.828907 7.38326454h-.00082016c-.876503 0-1.70038605-.34116936-2.32025528-.96091461-.6199913-.61982727-.96144486-1.44407845-.96144486-2.32078743V4.91949606c-.90476608 0-1.64087295.73610735-1.64087295 1.64087105v11.15784883c0 .90476418.73610687 1.64087105 1.64087295 1.64087105h7.95813751c.90447617 0 1.64037705-.73561478 1.64086914-1.63996696l-6.31648635.0015583z"
            }
          })
        ])
      ])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/emoticon.vue?vue&type=template&id=3ed81a33&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/emoticon.vue?vue&type=template&id=3ed81a33& ***!
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
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: "22",
        height: "22",
        viewBox: "0 0 22 22"
      }
    },
    [
      _c("defs", [
        _c("rect", {
          attrs: { id: "emoticon", width: "22", height: "22", x: "0", y: "0" }
        }),
        _vm._v(" "),
        _c(
          "mask",
          {
            attrs: {
              id: "mask-2",
              maskContentUnits: "userSpaceOnUse",
              maskUnits: "userSpaceOnUse"
            }
          },
          [
            _c("rect", {
              attrs: {
                width: "22",
                height: "22",
                x: "0",
                y: "0",
                fill: "black"
              }
            }),
            _vm._v(" "),
            _c("use", { attrs: { fill: "white", "xlink:href": "#emoticon" } })
          ]
        )
      ]),
      _vm._v(" "),
      _c("g", [
        _c("g", [
          _c("use", { attrs: { fill: "none", "xlink:href": "#emoticon" } }),
          _vm._v(" "),
          _c("g", [
            _c("path", {
              attrs: {
                "fill-rule": "evenodd",
                d:
                  "M16.98150826 19.23448753c.24586677.40592575.11614418.9343567-.28982544 1.18026543C14.97963715 21.45184708 13.01149654 22 11 22c-2.93820286 0-5.7005353-1.14421463-7.77820301-3.22179604C1.14421487 16.70053482 0 13.93820286 0 11c0-2.93820286 1.14421487-5.7005353 3.22179699-7.77820301C5.2994647 1.14421487 8.06179714 0 11 0c2.93820286 0 5.70053482 1.14421487 7.77820396 3.22179699C20.85578537 5.2994647 22 8.06179714 22 11c0 2.17125416-.64448738 4.28286743-1.8636837 6.1065464-.26374245.39453888-.79745674.50062943-1.19203949.23680115-.39458084-.2637844-.50058556-.79745674-.23680115-1.19203949C19.73705101 14.61126518 20.28125 12.82999611 20.28125 11c0-5.11770725-4.1635437-9.28125-9.28125-9.28125-5.11770725 0-9.28125 4.16354275-9.28125 9.28125 0 5.1177063 4.16354275 9.28125 9.28125 9.28125 1.6974802 0 3.35770702-.46217155 4.80124187-1.336586.40588284-.24591064.93435574-.11614418 1.18026639.28982353zm-2.9707737-6.38919448c.15692138-.20702363.40476608-.3413868.68457794-.3413868.47463322 0 .859375.38474178.859375.859375 0 .24453545-.10260963.46466446-.26657772.6211567-.1554184.17238998-1.6800356 1.7850933-4.28810978 1.7850933-2.60807419 0-4.13269138-1.61270332-4.2881093-1.7850933-.16396904-.15649224-.2665782-.37662125-.2665782-.6211567 0-.47463322.38474226-.859375.859375-.859375.27981234 0 .52765608.13436317.68457794.3413868 0 0 1.11796093 1.2054882 3.01073456 1.2054882s3.01073456-1.2054882 3.01073456-1.2054882z"
              }
            })
          ])
        ]),
        _vm._v(" "),
        _c("ellipse", { attrs: { cx: "8", cy: "9", rx: "1", ry: "1" } }),
        _vm._v(" "),
        _c("ellipse", { attrs: { cx: "14", cy: "9", rx: "1", ry: "1" } })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/expand-wide.vue?vue&type=template&id=ab5a3cee&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/expand-wide.vue?vue&type=template&id=ab5a3cee& ***!
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
            "M3,8.5 C3,8.77614237 2.77614237,9 2.5,9 C2.22385763,9 2,8.77614237 2,8.5 L2,6.5 C2,5.11928813 3.11928813,4 4.5,4 L6.5,4 C6.77614237,4 7,4.22385763 7,4.5 C7,4.77614237 6.77614237,5 6.5,5 L4.5,5 C3.67157288,5 3,5.67157288 3,6.5 L3,8.5 Z M17.5,5 C17.2238576,5 17,4.77614237 17,4.5 C17,4.22385763 17.2238576,4 17.5,4 L19.5,4 C20.8807119,4 22,5.11928813 22,6.5 L22,8.5 C22,8.77614237 21.7761424,9 21.5,9 C21.2238576,9 21,8.77614237 21,8.5 L21,6.5 C21,5.67157288 20.3284271,5 19.5,5 L17.5,5 Z M21,15.5 C21,15.2238576 21.2238576,15 21.5,15 C21.7761424,15 22,15.2238576 22,15.5 L22,17.5 C22,18.8807119 20.8807119,20 19.5,20 L17.5,20 C17.2238576,20 17,19.7761424 17,19.5 C17,19.2238576 17.2238576,19 17.5,19 L19.5,19 C20.3284271,19 21,18.3284271 21,17.5 L21,15.5 Z M6.5,19 C6.77614237,19 7,19.2238576 7,19.5 C7,19.7761424 6.77614237,20 6.5,20 L4.5,20 C3.11928813,20 2,18.8807119 2,17.5 L2,15.5 C2,15.2238576 2.22385763,15 2.5,15 C2.77614237,15 3,15.2238576 3,15.5 L3,17.5 C3,18.3284271 3.67157288,19 4.5,19 L6.5,19 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/eye.vue?vue&type=template&id=887931d8&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/eye.vue?vue&type=template&id=887931d8& ***!
  \*******************************************************************************************************************************************************************************************************/
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
            "M2.03381935,11.8192361 C4.16808919,6.31506648 10.3602678,3.58322297 15.8644374,5.71749281 C18.6654288,6.80359152 20.8800819,9.01824467 21.9661807,11.8192361 C22.0112731,11.9355272 22.0112731,12.0644728 21.9661807,12.1807639 C19.8319108,17.6849335 13.6397322,20.416777 8.1355626,18.2825072 C5.3345712,17.1964085 3.11991805,14.9817553 2.03381935,12.1807639 C1.98872688,12.0644728 1.98872688,11.9355272 2.03381935,11.8192361 Z M8.49709046,17.3501459 C13.4256883,19.2612348 18.9628618,16.8680219 20.9616531,12.0000475 C19.9532865,9.54665483 17.9813179,7.6108696 15.5029095,6.64985412 C10.5743117,4.73876518 5.0371382,7.13197809 3.03834692,11.9999525 C4.04671349,14.4533452 6.01868212,16.3891304 8.49709046,17.3501459 Z M12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-audio.vue?vue&type=template&id=cd75699c&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-audio.vue?vue&type=template&id=cd75699c& ***!
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
            "M20,6.52797748 L20,19.5 C20,20.8807119 18.8807119,22 17.5,22 L6.5,22 C5.11928813,22 4,20.8807119 4,19.5 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L15.4720225,2 C15.6047688,1.99158053 15.7429463,2.03583949 15.8535534,2.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 L20,6.52797748 Z M15,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L17.5,21 C18.3284271,21 19,20.3284271 19,19.5 L19,7 L15.5,7 C15.2238576,7 15,6.77614237 15,6.5 L15,3 Z M16,3.70710678 L16,6 L18.2928932,6 L16,3.70710678 Z M7.5,16 C7.22385763,16 7,15.7761424 7,15.5 L7,12.5 C7,12.2238576 7.22385763,12 7.5,12 L8.84861218,12 L10.2226499,11.0839749 C10.3047837,11.029219 10.4012875,11 10.5,11 L11.5,11 C11.7761424,11 12,11.2238576 12,11.5 L12,16.5 C12,16.7761424 11.7761424,17 11.5,17 L10.5,17 C10.4012875,17 10.3047837,16.970781 10.2226499,16.9160251 L8.84861218,16 L7.5,16 Z M8,13 L8,15 L9,15 C9.09871249,15 9.19521634,15.029219 9.2773501,15.0839749 L10.6513878,16 L11,16 L11,12 L10.6513878,12 L9.2773501,12.9160251 C9.19521634,12.970781 9.09871249,13 9,13 L8,13 Z M13.8535534,16.8535534 C13.6582912,17.0488155 13.3417088,17.0488155 13.1464466,16.8535534 C12.9511845,16.6582912 12.9511845,16.3417088 13.1464466,16.1464466 C13.7177498,15.5751434 14,14.8695179 14,14 C14,13.1304821 13.7177498,12.4248566 13.1464466,11.8535534 C12.9511845,11.6582912 12.9511845,11.3417088 13.1464466,11.1464466 C13.3417088,10.9511845 13.6582912,10.9511845 13.8535534,11.1464466 C14.6155836,11.9084768 15,12.8695179 15,14 C15,15.1304821 14.6155836,16.0915232 13.8535534,16.8535534 Z M14.1464466,9.85355339 C13.9511845,9.65829124 13.9511845,9.34170876 14.1464466,9.14644661 C14.3417088,8.95118446 14.6582912,8.95118446 14.8535534,9.14644661 C16.2776225,10.5705157 17,12.1958651 17,14 C17,15.8041349 16.2776225,17.4294843 14.8535534,18.8535534 C14.6582912,19.0488155 14.3417088,19.0488155 14.1464466,18.8535534 C13.9511845,18.6582912 13.9511845,18.3417088 14.1464466,18.1464466 C15.3890442,16.903849 16,15.5291985 16,14 C16,12.4708015 15.3890442,11.096151 14.1464466,9.85355339 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-empty.vue?vue&type=template&id=396aa129&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-empty.vue?vue&type=template&id=396aa129& ***!
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
            "M20,6.52797748 L20,19.5 C20,20.8807119 18.8807119,22 17.5,22 L6.5,22 C5.11928813,22 4,20.8807119 4,19.5 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L15.4720225,2 C15.6047688,1.99158053 15.7429463,2.03583949 15.8535534,2.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 Z M15,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L17.5,21 C18.3284271,21 19,20.3284271 19,19.5 L19,7 L15.5,7 C15.2238576,7 15,6.77614237 15,6.5 L15,3 Z M16,3.70710678 L16,6 L18.2928932,6 L16,3.70710678 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-image.vue?vue&type=template&id=59b60e37&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-image.vue?vue&type=template&id=59b60e37& ***!
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
            "M20,6.52897986 L20,19.5010024 C20,20.8817143 18.8807119,22.0010024 17.5,22.0010024 L6.5,22.0010024 C5.11928813,22.0010024 4,20.8817143 4,19.5010024 L4,4.50100238 C4,3.1202905 5.11928813,2.00100238 6.5,2.00100238 L15.4720225,2.00100238 C15.6047688,1.99258291 15.7429463,2.03684187 15.8535534,2.14744899 L19.8535534,6.14744899 C19.9641605,6.25805611 20.0084195,6.39623363 20,6.52897986 Z M15,3.00100238 L6.5,3.00100238 C5.67157288,3.00100238 5,3.67257525 5,4.50100238 L5,19.5010024 C5,20.3294295 5.67157288,21.0010024 6.5,21.0010024 L17.5,21.0010024 C18.3284271,21.0010024 19,20.3294295 19,19.5010024 L19,7.00100238 L15.5,7.00100238 C15.2238576,7.00100238 15,6.77714475 15,6.50100238 L15,3.00100238 Z M16,3.70810916 L16,6.00100238 L18.2928932,6.00100238 L16,3.70810916 Z M17,16.4899413 C17.0001548,16.4973236 17.0001458,16.5047195 16.9999712,16.5121237 C16.993442,17.8872581 15.8766684,19 14.5,19 L9.5,19 C8.11928813,19 7,17.8807119 7,16.5 L7,11.5 C7,10.1192881 8.11928813,9 9.5,9 L14.5,9 C15.8807119,9 17,10.1192881 17,11.5 L17,16.4899413 L17,16.4899413 Z M16,15.690983 L16,11.5 C16,10.6715729 15.3284271,10 14.5,10 L9.5,10 C8.67157288,10 8,10.6715729 8,11.5 L8,14.2928932 L9.14644661,13.1464466 C9.34170876,12.9511845 9.65829124,12.9511845 9.85355339,13.1464466 L12.5987265,15.8916197 L14.2763932,15.0527864 C14.4171569,14.9824045 14.5828431,14.9824045 14.7236068,15.0527864 L16,15.690983 L16,15.690983 Z M15.9710881,16.794561 L14.5,16.059017 L12.7236068,16.9472136 C12.5311125,17.0434608 12.2986267,17.0057335 12.1464466,16.8535534 L9.5,14.2071068 L8,15.7071068 L8,16.5 C8,17.3284271 8.67157288,18 9.5,18 L14.5,18 C15.2276077,18 15.8342163,17.4819411 15.9710881,16.794561 L15.9710881,16.794561 Z M13,12 L13,13 L14,13 L14,12 L13,12 Z M13,11 L14,11 C14.5522847,11 15,11.4477153 15,12 L15,13 C15,13.5522847 14.5522847,14 14,14 L13,14 C12.4477153,14 12,13.5522847 12,13 L12,12 C12,11.4477153 12.4477153,11 13,11 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-video.vue?vue&type=template&id=44fe2d52&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/file-video.vue?vue&type=template&id=44fe2d52& ***!
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
            "M20,6.52897986 L20,19.5010024 C20,20.8817143 18.8807119,22.0010024 17.5,22.0010024 L6.5,22.0010024 C5.11928813,22.0010024 4,20.8817143 4,19.5010024 L4,4.50100238 C4,3.1202905 5.11928813,2.00100238 6.5,2.00100238 L15.4720225,2.00100238 C15.6047688,1.99258291 15.7429463,2.03684187 15.8535534,2.14744899 L19.8535534,6.14744899 C19.9641605,6.25805611 20.0084195,6.39623363 20,6.52897986 Z M15,3.00100238 L6.5,3.00100238 C5.67157288,3.00100238 5,3.67257525 5,4.50100238 L5,19.5010024 C5,20.3294295 5.67157288,21.0010024 6.5,21.0010024 L17.5,21.0010024 C18.3284271,21.0010024 19,20.3294295 19,19.5010024 L19,7.00100238 L15.5,7.00100238 C15.2238576,7.00100238 15,6.77714475 15,6.50100238 L15,3.00100238 Z M16,3.70810916 L16,6.00100238 L18.2928932,6.00100238 L16,3.70810916 Z M8,11.5 L8,14.5 C8,14.7761424 8.22385763,15 8.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 L12,11.5 C12,11.2238576 11.7761424,11 11.5,11 L8.5,11 C8.22385763,11 8,11.2238576 8,11.5 Z M12.9874925,11.3054008 L14.1464466,10.1464466 C14.2402148,10.0526784 14.3673918,10 14.5,10 L16.5,10 C16.7761424,10 17,10.2238576 17,10.5 L17,15.5 C17,15.7761424 16.7761424,16 16.5,16 L14.5,16 C14.3673918,16 14.2402148,15.9473216 14.1464466,15.8535534 L12.9874925,14.6945992 C12.8920849,15.4310925 12.2624802,16 11.5,16 L8.5,16 C7.67157288,16 7,15.3284271 7,14.5 L7,11.5 C7,10.6715729 7.67157288,10 8.5,10 L11.5,10 C12.2624802,10 12.8920849,10.5689075 12.9874925,11.3054008 L12.9874925,11.3054008 Z M13,12.7071068 L13,13.2928932 L14.7071068,15 L16,15 L16,11 L14.7071068,11 L13,12.7071068 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/history.vue?vue&type=template&id=55ff7a77&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/history.vue?vue&type=template&id=55ff7a77& ***!
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
            "M3,12.2928932 L3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C9.83094568,21 7.7795552,20.2294045 6.16280756,18.8505586 C5.45850266,18.2498909 4.84967664,17.5439447 4.359624,16.7587075 C4.21342347,16.5244426 4.2848137,16.2160145 4.51907855,16.069814 C4.75334339,15.9236134 5.06177151,15.9950037 5.20797204,16.2292685 C5.64372413,16.9274972 6.1852566,17.5554151 6.81171475,18.089691 C8.24914371,19.3156047 10.071062,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 L4,12.2928932 L5.14644661,11.1464466 C5.34170876,10.9511845 5.65829124,10.9511845 5.85355339,11.1464466 C6.04881554,11.3417088 6.04881554,11.6582912 5.85355339,11.8535534 L3.85355339,13.8535534 C3.65829124,14.0488155 3.34170876,14.0488155 3.14644661,13.8535534 L1.14644661,11.8535534 C0.951184464,11.6582912 0.951184464,11.3417088 1.14644661,11.1464466 C1.34170876,10.9511845 1.65829124,10.9511845 1.85355339,11.1464466 L3,12.2928932 Z M15.6969596,13.0404275 C15.9507745,13.1492053 16.0683503,13.4431448 15.9595725,13.6969596 C15.8507947,13.9507745 15.5568552,14.0683503 15.3030404,13.9595725 L11.8030404,12.4595725 C11.6717691,12.4033134 11.5708217,12.2936038 11.5256584,12.1581139 L10.0256584,7.65811388 C9.93833446,7.39614222 10.0799145,7.11298224 10.3418861,7.02565835 C10.6038578,6.93833446 10.8870178,7.07991446 10.9743416,7.34188612 L12.4033381,11.6288754 L15.6969596,13.0404275 Z"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pause.vue?vue&type=template&id=3d6d1199&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/pause.vue?vue&type=template&id=3d6d1199& ***!
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
            "M7.5,4 C6.67157288,4 6,4.67157288 6,5.5 L6,18.5 C6,19.3284271 6.67157288,20 7.5,20 L8.5,20 C9.32842712,20 10,19.3284271 10,18.5 L10,5.5 C10,4.67157288 9.32842712,4 8.5,4 L7.5,4 Z M7.5,3 L8.5,3 C9.88071187,3 11,4.11928813 11,5.5 L11,18.5 C11,19.8807119 9.88071187,21 8.5,21 L7.5,21 C6.11928813,21 5,19.8807119 5,18.5 L5,5.5 C5,4.11928813 6.11928813,3 7.5,3 Z M15.5,3 L16.5,3 C17.8807119,3 19,4.11928813 19,5.5 L19,18.5 C19,19.8807119 17.8807119,21 16.5,21 L15.5,21 C14.1192881,21 13,19.8807119 13,18.5 L13,5.5 C13,4.11928813 14.1192881,3 15.5,3 Z M15.5,4 C14.6715729,4 14,4.67157288 14,5.5 L14,18.5 C14,19.3284271 14.6715729,20 15.5,20 L16.5,20 C17.3284271,20 18,19.3284271 18,18.5 L18,5.5 C18,4.67157288 17.3284271,4 16.5,4 L15.5,4 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/play.vue?vue&type=template&id=fe5b9b3e&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/play.vue?vue&type=template&id=fe5b9b3e& ***!
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
            "M6,4.67012593 L6,19.3298741 C6,19.6888592 6.29101491,19.9798741 6.65,19.9798741 C6.78014165,19.9798741 6.90728686,19.940808 7.01497592,19.8677333 L17.6705631,12.6371563 C18.0224548,12.3983727 18.114147,11.9195356 17.8753633,11.5676439 C17.8206658,11.4870371 17.7511699,11.4175411 17.6705631,11.3628437 L7.01497592,4.13226667 C6.71792446,3.93069604 6.31371138,4.00809854 6.11214075,4.30515 C6.03906603,4.41283906 6,4.53998428 6,4.67012593 Z M5,4.67012593 C5,4.33976636 5.09916761,4.01701312 5.28466497,3.74364859 C5.79634428,2.98959487 6.82242363,2.79311159 7.57647734,3.3047909 L18.2320645,10.5353679 C18.4173555,10.6611011 18.5771059,10.8208515 18.7028391,11.0061425 C19.2517314,11.8150365 19.0409585,12.9157398 18.2320645,13.4646321 L7.57647734,20.6952091 C7.3031128,20.8807065 6.98035956,20.9798741 6.65,20.9798741 C5.73873016,20.9798741 5,20.2411439 5,19.3298741 L5,4.67012593 Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/screen-record.vue?vue&type=template&id=747ee775&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/screen-record.vue?vue&type=template&id=747ee775& ***!
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
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: "23",
        height: "23",
        viewBox: "0 0 23 23"
      }
    },
    [
      _c("defs", [
        _c("rect", {
          attrs: { id: "rect-1", width: "23", height: "23", x: "0", y: "0" }
        }),
        _vm._v(" "),
        _c(
          "mask",
          {
            attrs: {
              id: "mask-2",
              maskContentUnits: "userSpaceOnUse",
              maskUnits: "userSpaceOnUse"
            }
          },
          [
            _c("rect", {
              attrs: {
                width: "23",
                height: "23",
                x: "0",
                y: "0",
                fill: "black"
              }
            }),
            _vm._v(" "),
            _c("use", { attrs: { fill: "white", "xlink:href": "#rect-1" } })
          ]
        )
      ]),
      _vm._v(" "),
      _c("g", [
        _c("use", { attrs: { fill: "none", "xlink:href": "#rect-1" } }),
        _vm._v(" "),
        _c("g", [
          _c("path", {
            attrs: {
              "fill-rule": "evenodd",
              d:
                "M22.1015625 10.60430273c.49620703 0 .8984375-.40223046.8984375-.8984375v-4.4921875c0-1.98159375-1.61215625-3.59375-3.59375-3.59375H3.59375C1.61215625 1.61992773 0 3.23208398 0 5.21367773v8.984375c0 1.98159375 1.61215625 3.59375 3.59375 3.59375h7.0078125v1.79139454H7.45703125c-.49620703 0-.8984375.40223046-.8984375.8984375 0 .49620703.40223047.8984375.8984375.8984375h8.0859375c.49620703 0 .8984375-.40223047.8984375-.8984375 0-.49620704-.40223047-.8984375-.8984375-.8984375H12.3984375v-1.79139454H19.40625c1.98159375 0 3.59375-1.61215625 3.59375-3.59375 0-.49620703-.40223047-.8984375-.8984375-.8984375s-.8984375.40223047-.8984375.8984375c0 .99079688-.80607812 1.796875-1.796875 1.796875H3.59375c-.99079688 0-1.796875-.80607812-1.796875-1.796875v-8.984375c0-.99079687.80607812-1.796875 1.796875-1.796875h15.8125c.99079688 0 1.796875.80607813 1.796875 1.796875v4.4921875c0 .49620704.40223047.8984375.8984375.8984375z"
            }
          }),
          _vm._v(" "),
          _c("ellipse", {
            attrs: { cx: "11.55", cy: "10.1", rx: "2.3", ry: "2.3" }
          })
        ])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/video-camera.vue?vue&type=template&id=3bf7f164&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/video-camera.vue?vue&type=template&id=3bf7f164& ***!
  \****************************************************************************************************************************************************************************************************************/
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
            "M14.9991251,14.5667917 C14.9637218,15.9166288 13.8583784,17 12.5,17 L5.5,17 C4.11928813,17 3,15.8807119 3,14.5 L3,9.5 C3,8.11928813 4.11928813,7 5.5,7 L10.690983,7 L10.190983,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 C10.689386,5 10.8625176,5.10700119 10.9472136,5.2763932 L11.809017,7 L12.5,7 C13.8583784,7 14.9637218,8.08337121 14.9991251,9.4332083 L17.2275759,7.57616596 C18.2034127,6.76296857 19.6537116,6.89481392 20.4669089,7.87065078 C20.8113627,8.28399529 21,8.80502094 21,9.3430749 L21,14.6569251 C21,15.92718 19.9702549,16.9569251 18.7,16.9569251 C18.161946,16.9569251 17.6409204,16.7682878 17.2275759,16.423834 L14.9991251,14.5667917 Z M15,13.2658125 L17.8677603,15.6556128 C18.1013898,15.850304 18.3958825,15.9569251 18.7,15.9569251 C19.4179702,15.9569251 20,15.3748953 20,14.6569251 L20,9.3430749 C20,9.03895745 19.8933789,8.74446468 19.6986877,8.51083518 C19.2390544,7.95927522 18.4193202,7.88475393 17.8677603,8.34438724 L15,10.7341875 L15,13.2658125 L15,13.2658125 Z M14,14.5 L14,9.5 C14,8.67157288 13.3284271,8 12.5,8 L11.510832,8 C11.5038593,8.00014629 11.4968943,8.00014579 11.4899413,8 L5.5,8 C4.67157288,8 4,8.67157288 4,9.5 L4,14.5 C4,15.3284271 4.67157288,16 5.5,16 L12.5,16 C13.3284271,16 14,15.3284271 14,14.5 Z M5.5,10 C5.22385763,10 5,9.77614237 5,9.5 C5,9.22385763 5.22385763,9 5.5,9 L8.5,9 C8.77614237,9 9,9.22385763 9,9.5 C9,9.77614237 8.77614237,10 8.5,10 L5.5,10 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L9.5,14 C9.77614237,14 10,14.2238576 10,14.5 C10,14.7761424 9.77614237,15 9.5,15 L8.5,15 Z M11.5,15 C11.2238576,15 11,14.7761424 11,14.5 C11,14.2238576 11.2238576,14 11.5,14 L12.5,14 C12.7761424,14 13,14.2238576 13,14.5 C13,14.7761424 12.7761424,15 12.5,15 L11.5,15 Z"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-mid.vue?vue&type=template&id=b7d49ffc&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/icons/volume-mid.vue?vue&type=template&id=b7d49ffc& ***!
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
            "M13,5.5 L13,18.5 C13,18.7761424 12.7761424,19 12.5,19 L10.5,19 C10.310614,19 10.1374824,18.8929988 10.0527864,18.7236068 L9.39442719,17.4068884 C8.65687709,15.9317882 7.14921216,15 5.5,15 L5,15 C3.34314575,15 2,13.6568542 2,12 C2,10.3431458 3.34314575,9 5,9 L5.5,9 C7.14921216,9 8.65687709,8.06821183 9.39442719,6.59311163 L10.0527864,5.2763932 C10.1374824,5.10700119 10.310614,5 10.5,5 L12.5,5 C12.7761424,5 13,5.22385763 13,5.5 Z M12,6 L10.809017,6 L10.2888544,7.04032522 C9.38191227,8.85420946 7.52798422,10 5.5,10 L5,10 C3.8954305,10 3,10.8954305 3,12 C3,13.1045695 3.8954305,14 5,14 L5.5,14 C7.52798422,14 9.38191227,15.1457905 10.2888544,16.9596748 L10.809017,18 L12,18 L12,6 Z M14.1429857,9.8500583 C13.9496539,9.65288477 13.9527682,9.3363176 14.1499417,9.14298574 C14.3471152,8.94965387 14.6636824,8.95276816 14.8570143,9.1499417 C16.409204,10.7329748 16.409204,13.2670252 14.8570143,14.8500583 C14.6636824,15.0472318 14.3471152,15.0503461 14.1499417,14.8570143 C13.9527682,14.6636824 13.9496539,14.3471152 14.1429857,14.1499417 C15.3138802,12.9557806 15.3138802,11.0442194 14.1429857,9.8500583 Z M16.1652488,7.87140492 C15.9601275,7.68652692 15.9437171,7.37037004 16.1285951,7.16524877 C16.3134731,6.9601275 16.62963,6.94371708 16.8347512,7.12859508 C19.5251539,9.55348383 19.7403954,13.7002468 17.3155067,16.3906495 C17.1636751,16.5591059 17.0032077,16.7195733 16.8347512,16.8714049 C16.62963,17.0562829 16.3134731,17.0398725 16.1285951,16.8347512 C15.9437171,16.62963 15.9601275,16.3134731 16.1652488,16.1285951 C16.3080183,15.9999153 16.4440171,15.8639166 16.5726968,15.721147 C18.6278296,13.4409869 18.4454089,9.92653766 16.1652488,7.87140492 Z"
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