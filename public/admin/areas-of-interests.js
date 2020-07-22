(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin/areas-of-interests"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/areas-of-interests.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/areas-of-interests.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      areasOfInterests: [],
      selectedArea: {
        id: '',
        area: '',
        sample_images: []
      },
      selectedSample: null,
      manageAreaLoading: false
    };
  },
  computed: {},
  mounted: function mounted() {},
  created: function created() {
    this.$root.heading = 'Areas Of Interests';
    this.resetArea();
    this.getData();
  },
  methods: {
    deleteArea: function deleteArea() {
      var _this = this;

      axios["delete"]("/areas-of-interests/".concat(this.selectedArea.id)).then(function (response) {
        $('#deleteAreaModal').modal('hide');

        var index = _this.areasOfInterests.findIndex(function (x) {
          return x.id == _this.selectedArea.id;
        });

        if (index > -1) {
          _this.areasOfInterests.splice(index, 1);
        }
      });
    },
    setSelectedArea: function setSelectedArea(area) {
      this.selectedArea = JSON.parse(JSON.stringify(area));
    },
    resetArea: function resetArea() {
      this.selectedArea.id = '';
      this.selectedArea.area = '';
      this.selectedArea.sample_images = [];
      this.manageAreaLoading = false;
    },
    browseImage: function browseImage() {
      this.$refs['inputProfileImage'].click();
    },
    updateImage: function updateImage(e) {
      var _this2 = this;

      var input = $(e.currentTarget);
      var file = input[0].files[0];

      if (file) {
        if (file.type.match('image/jpeg') || file.type.match('image/png')) {
          var photosize = file.size / 1000000;

          if (photosize > 5) {
            alert('Error: Image file too big. Please select image file less than 5MB.');
          } else {
            var img = document.createElement('img');
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (oFREvent) {
              var canvas = document.createElement('canvas');
              img.src = oFREvent.target.result;
              img.addEventListener('load', function () {
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                var width = img.width;
                var height = img.height;
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                var dataurl = canvas.toDataURL('image/jpeg');

                _this2.selectedArea.sample_images.push(dataurl);
              });
            };
          }
        } else {
          alert('Error: Invalid image file!');
          input.val('');
        }
      }
    },
    submit: function () {
      var _submit = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.manageAreaLoading = true;

                if (!this.selectedArea.id) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return this.update();

              case 4:
                _context.next = 8;
                break;

              case 6:
                _context.next = 8;
                return this.store();

              case 8:
                this.manageAreaLoading = false;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function submit() {
        return _submit.apply(this, arguments);
      }

      return submit;
    }(),
    store: function () {
      var _store = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.post('/areas-of-interests', this.selectedArea).then(function (response) {
                  $('#manageAreaModal').modal('hide');

                  _this3.areasOfInterests.unshift(response.data);
                })["catch"](function () {
                  _this3.manageAreaLoading = false;
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function store() {
        return _store.apply(this, arguments);
      }

      return store;
    }(),
    update: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _this4 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios.put("/areas-of-interests/".concat(this.selectedArea.id), this.selectedArea).then(function (response) {
                  $('#manageAreaModal').modal('hide');

                  var index = _this4.areasOfInterests.findIndex(function (x) {
                    return x.id == response.data.id;
                  });

                  if (index > -1) {
                    _this4.areasOfInterests[index] = response.data;
                  }
                })["catch"](function () {
                  _this4.manageAreaLoading = false;
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }(),
    getData: function getData() {
      var _this5 = this;

      axios.get('/areas-of-interests').then(function (response) {
        _this5.areasOfInterests = response.data;
        _this5.$root.contentloading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/areas-of-interests.vue?vue&type=template&id=0061e005&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/areas-of-interests.vue?vue&type=template&id=0061e005& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "p-3" }, [
    _vm.areasOfInterests.length > 0
      ? _c("div", [
          _c(
            "button",
            {
              staticClass: "btn btn-primary btn-sm mb-2",
              attrs: {
                "data-toggle": "modal",
                "data-target": "#manageAreaModal",
                "data-backdrop": "static",
                "data-keyboard": "false"
              },
              on: {
                click: function($event) {
                  return _vm.resetArea()
                }
              }
            },
            [_vm._v("Add")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "table-responsive rounded shadow-sm bg-white" },
            [
              _c("table", { staticClass: "table mb-0" }, [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.areasOfInterests, function(area) {
                    return _c("tr", [
                      _c("td", { staticClass: "align-middle" }, [
                        _vm._v(_vm._s(area.area))
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        { staticClass: "align-middle" },
                        _vm._l(area.sample_images, function(sample) {
                          return _c("div", {
                            staticClass:
                              "sample-image sample-image-sm align-middle rounded",
                            style: { backgroundImage: "url(" + sample + ")" },
                            attrs: {
                              "data-toggle": "modal",
                              "data-target": "#sampleViewModal"
                            },
                            on: {
                              click: function($event) {
                                _vm.selectedSample = sample
                              }
                            }
                          })
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _c(
                        "td",
                        {
                          staticClass: "align-middle",
                          staticStyle: { width: "100px" }
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-sm btn-light btn-circle-icon",
                              attrs: {
                                "data-toggle": "modal",
                                "data-target": "#manageAreaModal"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.setSelectedArea(area)
                                }
                              }
                            },
                            [
                              _c("icon", {
                                attrs: {
                                  name: "pencil",
                                  transform: "scale(1.5)",
                                  width: "12",
                                  height: "12"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-sm btn-light btn-circle-icon",
                              attrs: {
                                "data-toggle": "modal",
                                "data-target": "#deleteAreaModal"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.setSelectedArea(area)
                                }
                              }
                            },
                            [
                              _c("icon", {
                                attrs: {
                                  name: "trash",
                                  transform: "scale(1.5)",
                                  width: "12",
                                  height: "12"
                                }
                              })
                            ],
                            1
                          )
                        ]
                      )
                    ])
                  }),
                  0
                )
              ])
            ]
          )
        ])
      : _c("div", { staticClass: "text-center position-absolute-center" }, [
          _c("h5", { staticClass: "font-weight-lighter text-muted mb-3" }, [
            _vm._v("There are no areas of interests added")
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary",
              attrs: {
                "data-toggle": "modal",
                "data-target": "#manageAreaModal",
                "data-backdrop": "static",
                "data-keyboard": "false"
              },
              on: {
                click: function($event) {
                  return _vm.resetArea()
                }
              }
            },
            [_vm._v("Add Area of Interest")]
          )
        ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: { tabindex: "-1", role: "dialog", id: "deleteAreaModal" }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c(
              "vue-form-validate",
              {
                staticClass: "modal-content",
                on: {
                  submit: function($event) {
                    return _vm.deleteArea()
                  }
                }
              },
              [
                _c("div", { staticClass: "modal-header" }, [
                  _c("h5", { staticClass: "modal-title" }, [
                    _vm._v("Delete Area of Interest")
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        type: "button",
                        disabled: _vm.manageAreaLoading,
                        "data-dismiss": "modal",
                        "aria-label": "Close"
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("×")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body pt-0" }, [
                  _vm._v(
                    "\n\t\t\t\t\tAre you sure to delete this item?\n\t\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "modal-footer" },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-secondary",
                        attrs: {
                          type: "button",
                          "data-dismiss": "modal",
                          disabled: _vm.manageAreaLoading
                        }
                      },
                      [_vm._v("Close")]
                    ),
                    _vm._v(" "),
                    _c(
                      "vue-button",
                      {
                        attrs: {
                          type: "submit",
                          loading: _vm.manageAreaLoading,
                          button_class: "btn btn-danger"
                        }
                      },
                      [_vm._v("Delete")]
                    )
                  ],
                  1
                )
              ]
            )
          ],
          1
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: { tabindex: "-1", role: "dialog", id: "manageAreaModal" }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c(
              "vue-form-validate",
              {
                staticClass: "modal-content",
                on: {
                  submit: function($event) {
                    return _vm.submit()
                  }
                }
              },
              [
                _c("div", { staticClass: "modal-header" }, [
                  _c("h5", { staticClass: "modal-title" }, [
                    _vm._v(
                      _vm._s(_vm.selectedArea.id ? "Edit" : "Add") +
                        " Area of Interest"
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        type: "button",
                        disabled: _vm.manageAreaLoading,
                        "data-dismiss": "modal",
                        "aria-label": "Close"
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("×")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body pt-0" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c(
                      "label",
                      { staticClass: "form-label", attrs: { for: "" } },
                      [_vm._v("Area")]
                    ),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectedArea.area,
                          expression: "selectedArea.area"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        "data-required": "",
                        placeholder: "Area"
                      },
                      domProps: { value: _vm.selectedArea.area },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.selectedArea,
                            "area",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c(
                      "label",
                      { staticClass: "form-label", attrs: { for: "" } },
                      [_vm._v("Sample Images")]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "font-sizex-0" },
                      [
                        _vm._l(_vm.selectedArea.sample_images, function(
                          sample,
                          index
                        ) {
                          return _c(
                            "div",
                            {
                              staticClass:
                                "sample-image rounded position-relative hover-opacity-1",
                              style: { backgroundImage: "url(" + sample + ")" }
                            },
                            [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-sm btn-white btn-circle-icon position-absolute-center opacity-0 fade",
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.selectedArea.sample_images.splice(
                                        index,
                                        1
                                      )
                                    }
                                  }
                                },
                                [
                                  _c("icon", {
                                    attrs: {
                                      name: "close",
                                      transform: "scale(1.5)",
                                      width: "12",
                                      height: "12"
                                    }
                                  })
                                ],
                                1
                              )
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "sample-image sample-image-new rounded position-relative",
                            on: { click: _vm.browseImage }
                          },
                          [
                            _c("icon", {
                              staticClass: "position-absolute-center",
                              attrs: { name: "plus" }
                            })
                          ],
                          1
                        )
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("input", {
                      ref: "inputProfileImage",
                      attrs: { type: "file", accept: "image/*", hidden: "" },
                      on: { change: _vm.updateImage }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "modal-footer" },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-secondary",
                        attrs: {
                          type: "button",
                          "data-dismiss": "modal",
                          disabled: _vm.manageAreaLoading
                        }
                      },
                      [_vm._v("Close")]
                    ),
                    _vm._v(" "),
                    _c(
                      "vue-button",
                      {
                        attrs: {
                          type: "submit",
                          loading: _vm.manageAreaLoading,
                          button_class: "btn btn-primary"
                        }
                      },
                      [_vm._v(_vm._s(_vm.selectedArea.id ? "Update" : "Add"))]
                    )
                  ],
                  1
                )
              ]
            )
          ],
          1
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: { tabindex: "-1", role: "dialog", id: "sampleViewModal" }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content bg-black" }, [
              _vm._m(1),
              _vm._v(" "),
              _vm.selectedSample
                ? _c(
                    "div",
                    { staticClass: "modal-body p-0 rounded overflow-hidden" },
                    [
                      _c("img", {
                        staticClass: "w-100",
                        attrs: { src: _vm.selectedSample }
                      })
                    ]
                  )
                : _vm._e()
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "border-0" }, [_vm._v("Area")]),
        _vm._v(" "),
        _c("th", { staticClass: "border-0" }, [_vm._v("Sample Images")]),
        _vm._v(" "),
        _c("th", { staticClass: "border-0" }, [_vm._v("Actions")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header p-0" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/areas-of-interests.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/admin/areas-of-interests.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _areas_of_interests_vue_vue_type_template_id_0061e005___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./areas-of-interests.vue?vue&type=template&id=0061e005& */ "./resources/js/components/admin/areas-of-interests.vue?vue&type=template&id=0061e005&");
/* harmony import */ var _areas_of_interests_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./areas-of-interests.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/areas-of-interests.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _areas_of_interests_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _areas_of_interests_vue_vue_type_template_id_0061e005___WEBPACK_IMPORTED_MODULE_0__["render"],
  _areas_of_interests_vue_vue_type_template_id_0061e005___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/areas-of-interests.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/areas-of-interests.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/admin/areas-of-interests.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_areas_of_interests_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./areas-of-interests.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/areas-of-interests.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_areas_of_interests_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/areas-of-interests.vue?vue&type=template&id=0061e005&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin/areas-of-interests.vue?vue&type=template&id=0061e005& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_areas_of_interests_vue_vue_type_template_id_0061e005___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./areas-of-interests.vue?vue&type=template&id=0061e005& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/areas-of-interests.vue?vue&type=template&id=0061e005&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_areas_of_interests_vue_vue_type_template_id_0061e005___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_areas_of_interests_vue_vue_type_template_id_0061e005___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);