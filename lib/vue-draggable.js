(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueDraggable", [], factory);
	else if(typeof exports === 'object')
		exports["VueDraggable"] = factory();
	else
		root["VueDraggable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/vue-draggable-group.component.js":
/*!*********************************************************!*\
  !*** ./src/components/vue-draggable-group.component.js ***!
  \*********************************************************/
/*! exports provided: VueDraggableGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggableGroup", function() { return VueDraggableGroup; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CUSTOM_EVENTS = ['added', 'removed', 'reordered'];
var VueDraggableGroup = {
  name: 'VueDraggableGroup',
  props: {
    groups: {
      required: true,
      type: Array
    },
    value: {
      required: true,
      type: Array
    },
    itemsKey: {
      type: String,
      default: 'items'
    }
  },
  render: function render() {
    return this.$scopedSlots.default({});
  },
  methods: {
    added: function added(event) {
      var _this = this,
          _this$value;

      var newItems = this.groups.map(function (group) {
        return group[_this.itemsKey];
      }).reduce(function (prev, curr) {
        return [].concat(_toConsumableArray(prev), _toConsumableArray(curr));
      }, []).filter(function (item) {
        return event.detail.ids.map(Number).indexOf(item.id) >= 0;
      });

      (_this$value = this.value).splice.apply(_this$value, [event.detail.index, 0].concat(_toConsumableArray(newItems)));

      this.$emit('change', this.groups);
    },
    removed: function removed(event) {
      var newArray = this.value.filter(function (item) {
        return event.detail.ids.map(Number).indexOf(item.id) < 0;
      });
      this.$emit('input', newArray);
    },
    reordered: function reordered(event, group) {
      var reorderedItems = this.value.filter(function (item) {
        return event.detail.ids.map(Number).indexOf(item.id) >= 0;
      });
      var notReorderedItems = this.value.filter(function (item) {
        return event.detail.ids.map(Number).indexOf(item.id) < 0;
      });
      notReorderedItems.splice.apply(notReorderedItems, [event.detail.index, 0].concat(_toConsumableArray(reorderedItems)));
      this.$emit('input', notReorderedItems);
      this.$emit('change', this.groups);
    },
    addListeners: function addListeners() {
      var _this2 = this;

      CUSTOM_EVENTS.forEach(function (event) {
        return _this2.$el.addEventListener(event, _this2[event]);
      });
    },
    removeListeners: function removeListeners() {
      var _this3 = this;

      CUSTOM_EVENTS.forEach(function (event) {
        return _this3.$el.removeEventListener(event, _this3[event]);
      });
    }
  },
  mounted: function mounted() {
    this.addListeners();
  },
  beforeDestroy: function beforeDestroy() {
    this.removeListeners();
  }
};

/***/ }),

/***/ "./src/core/helpers/dom.helper.js":
/*!****************************************!*\
  !*** ./src/core/helpers/dom.helper.js ***!
  \****************************************/
/*! exports provided: getDroptargets, getDraggables, setInitialAtributes, removeOldDropzoneAreaElements, getContainer, addDropeffects, clearDropeffects, hasModifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDroptargets", function() { return getDroptargets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDraggables", function() { return getDraggables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInitialAtributes", function() { return setInitialAtributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeOldDropzoneAreaElements", function() { return removeOldDropzoneAreaElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContainer", function() { return getContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDropeffects", function() { return addDropeffects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearDropeffects", function() { return clearDropeffects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasModifier", function() { return hasModifier; });
var getDroptargets = function getDroptargets(el, dropzoneSelector) {
  return el.querySelectorAll(dropzoneSelector);
};
var getDraggables = function getDraggables(el, draggableSelector) {
  return el.querySelectorAll(draggableSelector);
};
var setInitialAtributes = function setInitialAtributes(el) {
  this.targets = getDroptargets(el, this.defaultOptions.dropzoneSelector);
  this.items = getDraggables(el, this.defaultOptions.draggableSelector);

  for (var i = 0; i < this.targets.length; i++) {
    this.targets[i].setAttribute('aria-dropeffect', 'none');
  }

  for (var _i = 0; _i < this.items.length; _i++) {
    this.items[_i].setAttribute('draggable', 'true');

    this.items[_i].setAttribute('aria-grabbed', 'false');

    this.items[_i].setAttribute('tabindex', '0');
  }
};
var removeOldDropzoneAreaElements = function removeOldDropzoneAreaElements() {
  var oldItemDropzoneElements = document.querySelectorAll('.item-dropzone-area');

  for (var i = 0; i < oldItemDropzoneElements.length; i++) {
    oldItemDropzoneElements[i].remove();
  }
};
var getContainer = function getContainer(element) {
  var containerElement = element;

  do {
    if (containerElement && containerElement.nodeType === 1 && containerElement.getAttribute('aria-dropeffect')) {
      return containerElement;
    }
  } while (containerElement = containerElement ? containerElement.parentNode : null);

  return null;
};
var addDropeffects = function addDropeffects(items, selections, targets) {
  // apply aria-dropeffect and tabindex to all targets apart from the owner
  for (var len = targets.length, i = 0; i < len; i++) {
    if (targets[i] !== selections.owner && targets[i].getAttribute('aria-dropeffect') === 'none') {
      targets[i].setAttribute('aria-dropeffect', 'move');
      targets[i].setAttribute('tabindex', '0');
    }
  } // remove aria-grabbed and tabindex from all items inside those containers


  for (var _len = items.length, _i2 = 0; _i2 < _len; _i2++) {
    if (items[_i2].parentNode !== selections.owner && items[_i2].getAttribute('aria-grabbed')) {
      items[_i2].removeAttribute('aria-grabbed');

      items[_i2].removeAttribute('tabindex');
    }
  }
};
var clearDropeffects = function clearDropeffects(items, selections, targets) {
  // if we dont't have any selected items just skip
  if (!selections.items.length) {
    return;
  } // reset aria-dropeffect and remove tabindex from all targets


  for (var i = 0; i < targets.length; i++) {
    if (targets[i].getAttribute('aria-dropeffect') !== 'none') {
      targets[i].setAttribute('aria-dropeffect', 'none');
      targets[i].removeAttribute('tabindex');
    }
  } // restore aria-grabbed and tabindex to all selectable items
  // without changing the grabbed value of any existing selected items


  for (var _i3 = 0; _i3 < items.length; _i3++) {
    if (!items[_i3].getAttribute('aria-grabbed')) {
      items[_i3].setAttribute('aria-grabbed', 'false');

      items[_i3].setAttribute('tabindex', '0');
    } else if (items[_i3].getAttribute('aria-grabbed') === 'true') {
      items[_i3].setAttribute('tabindex', '0');
    }
  }
};
var hasModifier = function hasModifier(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey;
};

/***/ }),

/***/ "./src/core/helpers/events.helper.js":
/*!*******************************************!*\
  !*** ./src/core/helpers/events.helper.js ***!
  \*******************************************/
/*! exports provided: dispatchCustomEvent, dispatchReorderEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatchCustomEvent", function() { return dispatchCustomEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatchReorderEvents", function() { return dispatchReorderEvents; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createCustomEvent = function createCustomEvent(name, data) {
  return new CustomEvent(name, {
    detail: data
  });
};

var dispatchCustomEvent = function dispatchCustomEvent(name, data, element) {
  var customEvent = createCustomEvent(name, data);
  element.dispatchEvent(customEvent);
};
var dispatchReorderEvents = function dispatchReorderEvents(e) {
  var oldItems = this.selections.droptarget.querySelectorAll(this.defaultOptions.draggableSelector);
  var index = this.nextItemElement ? Array.prototype.indexOf.call(oldItems, this.nextItemElement) : oldItems.length;

  var eventData = _objectSpread({
    ids: this.selections.items.map(function (item) {
      return item.dataset.id;
    }),
    index: index,
    nativeEvent: e
  }, this.selections);

  if (this.selections.droptarget === this.selections.owner) {
    dispatchCustomEvent('reordered', eventData, this.selections.droptarget);
    return;
  }

  dispatchCustomEvent('added', eventData, this.selections.droptarget);
  dispatchCustomEvent('removed', eventData, this.selections.owner);
};

/***/ }),

/***/ "./src/core/helpers/index.js":
/*!***********************************!*\
  !*** ./src/core/helpers/index.js ***!
  \***********************************/
/*! exports provided: getDroptargets, getDraggables, setInitialAtributes, removeOldDropzoneAreaElements, getContainer, addDropeffects, clearDropeffects, hasModifier, addSelection, removeSelection, clearSelections, stopDragAndDrop, dispatchCustomEvent, dispatchReorderEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.helper */ "./src/core/helpers/dom.helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDroptargets", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["getDroptargets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDraggables", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["getDraggables"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInitialAtributes", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["setInitialAtributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeOldDropzoneAreaElements", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["removeOldDropzoneAreaElements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getContainer", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["getContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addDropeffects", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearDropeffects", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasModifier", function() { return _dom_helper__WEBPACK_IMPORTED_MODULE_0__["hasModifier"]; });

/* harmony import */ var _state_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.helper */ "./src/core/helpers/state.helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addSelection", function() { return _state_helper__WEBPACK_IMPORTED_MODULE_1__["addSelection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeSelection", function() { return _state_helper__WEBPACK_IMPORTED_MODULE_1__["removeSelection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearSelections", function() { return _state_helper__WEBPACK_IMPORTED_MODULE_1__["clearSelections"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stopDragAndDrop", function() { return _state_helper__WEBPACK_IMPORTED_MODULE_1__["stopDragAndDrop"]; });

/* harmony import */ var _events_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events.helper */ "./src/core/helpers/events.helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatchCustomEvent", function() { return _events_helper__WEBPACK_IMPORTED_MODULE_2__["dispatchCustomEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatchReorderEvents", function() { return _events_helper__WEBPACK_IMPORTED_MODULE_2__["dispatchReorderEvents"]; });





/***/ }),

/***/ "./src/core/helpers/state.helper.js":
/*!******************************************!*\
  !*** ./src/core/helpers/state.helper.js ***!
  \******************************************/
/*! exports provided: addSelection, removeSelection, clearSelections, stopDragAndDrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSelection", function() { return addSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSelection", function() { return removeSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSelections", function() { return clearSelections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopDragAndDrop", function() { return stopDragAndDrop; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var addSelection = function addSelection(item) {
  // if the owner reference is still null, set it to this item's parent
  // so that further selection is only allowed within the same container
  if (!this.selections.owner) {
    this.selections.owner = item.parentNode;
  } // or if that's already happened then compare it with this item's parent
  // and if they're not the same container, return to prevent selection


  if (!this.defaultOptions.multipleDropzonesItemsDraggingEnabled && this.selections.owner !== item.parentNode) {
    return;
  } // set this item's grabbed state


  item.setAttribute('aria-grabbed', 'true'); // add it to the items array

  this.selections.items = this.selections.items.indexOf(item) >= 0 ? this.selections.items : [].concat(_toConsumableArray(this.selections.items), [item]);
};
var removeSelection = function removeSelection(item) {
  // reset this item's grabbed state
  item.setAttribute('aria-grabbed', 'false'); // then find and remove this item from the existing items array

  for (var i = 0; i < this.selections.items.length; i++) {
    if (this.selections.items[i] === item) {
      this.selections.items.splice(i, 1);
      break;
    }
  }
};
var clearSelections = function clearSelections() {
  // if we have any selected items
  if (this.selections.items.length) {
    // reset the owner reference
    this.selections.owner = null; // reset the grabbed state on every selected item

    for (var i = 0; i < this.selections.items.length; i++) {
      this.selections.items[i].setAttribute('aria-grabbed', 'false');
    } // then reset the items array


    this.selections.items = [];
  }
};
var stopDragAndDrop = function stopDragAndDrop() {
  // throw exception and catch this to stop further d&d
  throw new Error('Requested D&D stop...');
};

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: VueDraggable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggable", function() { return VueDraggable; });
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listeners */ "./src/core/listeners/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/core/helpers/index.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options */ "./src/core/options.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./src/core/state.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var VueDraggable =
/*#__PURE__*/
function () {
  function VueDraggable(el, componentInstance, options) {
    _classCallCheck(this, VueDraggable);

    Object.assign(this, Object(_state__WEBPACK_IMPORTED_MODULE_3__["getState"])(), {
      defaultOptions: Object(_options__WEBPACK_IMPORTED_MODULE_2__["getOptions"])(componentInstance, options)
    }, {
      el: el
    });
    this.registerListeners(el);
    this.initiate(el);
  }

  _createClass(VueDraggable, [{
    key: "registerListeners",
    value: function registerListeners(el) {
      _listeners__WEBPACK_IMPORTED_MODULE_0__["attachListeners"].bind(this)(el);
    }
  }, {
    key: "initiate",
    value: function initiate(el) {
      _helpers__WEBPACK_IMPORTED_MODULE_1__["setInitialAtributes"].bind(this)(el);
    }
  }]);

  return VueDraggable;
}();
;

/***/ }),

/***/ "./src/core/listeners/handlers/dragend.handler.js":
/*!********************************************************!*\
  !*** ./src/core/listeners/handlers/dragend.handler.js ***!
  \********************************************************/
/*! exports provided: dragendHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragendHandler", function() { return dragendHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reorderDomElements = function reorderDomElements(droptarget, items, nextItemElement) {
  for (var i = 0; i < items.length; i++) {
    if (nextItemElement) {
      droptarget.insertBefore(items[i], nextItemElement);
      continue;
    }

    droptarget.appendChild(items[i]);
  }
};

var dragendHandler = function dragendHandler(e) {
  if (typeof this.defaultOptions.onDragend === 'function') {
    try {
      this.defaultOptions.onDragend(_objectSpread({
        nativeEvent: e,
        stop: _helpers__WEBPACK_IMPORTED_MODULE_0__["stopDragAndDrop"]
      }, this.selections));
    } catch (error) {
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeOldDropzoneAreaElements"])();
      return;
    }
  } // if we have a valid drop target reference
  // (which implies that we have some selected items)


  if (this.selections.droptarget) {
    if (this.defaultOptions.reactivityEnabled) {
      _helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchReorderEvents"].bind(this)(e);
    } else {
      // make dom manipulation only if reactivity is disabled
      reorderDomElements(this.selections.droptarget, this.selections.items, this.nextItemElement);
    }

    if (typeof this.defaultOptions.onDrop === 'function') {
      this.defaultOptions.onDrop(_objectSpread({
        nativeEvent: e,
        stop: function stop() {
          throw new Error("Stop method is available only for callbacks\n                    'onDragstart' and 'onDragend'. For more info look at\n                    https://github.com/Vivify-Ideas/vue-draggable/blob/master/README.md\n                  ");
        }
      }, this.selections));
    } // prevent default to allow the action


    e.preventDefault();
  } // if we have any selected items


  if (this.selections.items.length) {
    // clear dropeffect from the target containers
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets); // if we have a valid drop target reference

    if (this.selections.droptarget) {
      // reset the selections array
      _helpers__WEBPACK_IMPORTED_MODULE_0__["clearSelections"].bind(this)(); // reset the target's dragover class

      this.selections.droptarget.className = this.selections.droptarget.className.replace(/ dragover/g, ''); // reset the target reference

      this.selections.droptarget = null;
    }
  } // dropzone area elements


  Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeOldDropzoneAreaElements"])();
};

/***/ }),

/***/ "./src/core/listeners/handlers/dragenter.handler.js":
/*!**********************************************************!*\
  !*** ./src/core/listeners/handlers/dragenter.handler.js ***!
  \**********************************************************/
/*! exports provided: dragenterHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragenterHandler", function() { return dragenterHandler; });
var dragenterHandler = function dragenterHandler(e) {
  this.related = e.target;
};

/***/ }),

/***/ "./src/core/listeners/handlers/dragleave.handler.js":
/*!**********************************************************!*\
  !*** ./src/core/listeners/handlers/dragleave.handler.js ***!
  \**********************************************************/
/*! exports provided: dragleaveHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragleaveHandler", function() { return dragleaveHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");

var dragleaveHandler = function dragleaveHandler() {
  // get a drop target reference from the relatedTarget
  var droptarget = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getContainer"])(this.related); // if the drop target is different from the last stored reference
  // (or we have one of those references but not the other one)

  if (droptarget !== this.selections.droptarget) {
    // if we have a saved reference, clear its existing dragover class
    if (this.selections.droptarget) {
      this.selections.droptarget.className = this.selections.droptarget.className.replace(/ dragover/g, '');
    } // apply the dragover class to the new drop target reference


    if (droptarget) {
      droptarget.className += ' dragover';
    } // then save that reference for next time


    this.selections.droptarget = droptarget;
  }
};

/***/ }),

/***/ "./src/core/listeners/handlers/dragover.handler.js":
/*!*********************************************************!*\
  !*** ./src/core/listeners/handlers/dragover.handler.js ***!
  \*********************************************************/
/*! exports provided: dragoverHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragoverHandler", function() { return dragoverHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");

var state = {
  previousTarget: null,
  dragoverCalls: 0
};

var displayDropzones = function displayDropzones(e) {
  if (state.dragoverCalls % 100 !== 0 && (e.target === state.previousTarget || !e.target || e.target.className === 'item-dropzone-area')) return;
  state.dragoverCalls++;
  state.previousTarget = e.target;
  this.nextItemElement = e.target.closest(this.defaultOptions.draggableSelector);
  this.selections.droptarget = e.target.closest(this.defaultOptions.dropzoneSelector);
  var itemDropzoneElement = document.createElement('div');
  itemDropzoneElement.className = 'item-dropzone-area';
  Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeOldDropzoneAreaElements"])();

  if (this.selections.droptarget && this.nextItemElement) {
    this.selections.droptarget.insertBefore(itemDropzoneElement, state.previousTarget.closest(this.defaultOptions.draggableSelector));
  }

  if (this.selections.droptarget && !this.nextItemElement) {
    this.selections.droptarget.appendChild(itemDropzoneElement);
  }
};

var dragoverHandler = function dragoverHandler(e) {
  // if we have any selected items,
  // allow them to be dragged
  if (this.selections.items.length) {
    e.preventDefault();
  }

  if (!this.defaultOptions.showDropzoneAreas) {
    return;
  }

  displayDropzones.bind(this)(e);
};

/***/ }),

/***/ "./src/core/listeners/handlers/dragstart.handler.js":
/*!**********************************************************!*\
  !*** ./src/core/listeners/handlers/dragstart.handler.js ***!
  \**********************************************************/
/*! exports provided: dragstartHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragstartHandler", function() { return dragstartHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var dragstartHandler = function dragstartHandler(e) {
  var elem = e.target.closest(this.defaultOptions.draggableSelector); // if the element's parent is not the owner, then block this event

  if (!this.defaultOptions.multipleDropzonesItemsDraggingEnabled && elem && this.selections.owner !== elem.parentNode) {
    e.preventDefault();
    return;
  }

  if (typeof this.defaultOptions.onDragstart === 'function') {
    try {
      this.defaultOptions.onDragstart(_objectSpread({
        nativeEvent: e,
        stop: _helpers__WEBPACK_IMPORTED_MODULE_0__["stopDragAndDrop"]
      }, this.selections));
    } catch (error) {
      e.preventDefault();
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeOldDropzoneAreaElements"])();
      return;
    }
  } // [else] if the multiple selection modifier is pressed
  // and the item's grabbed state is currently false


  if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e) && elem.getAttribute('aria-grabbed') === 'false') {
    // add this additional selection
    _helpers__WEBPACK_IMPORTED_MODULE_0__["addSelection"].bind(this)(elem);
  } // we don't need the transfer data, but we have to define something
  // otherwise the drop action won't work at all in firefox
  // most browsers support the proper mime-type syntax, eg. "text/plain"
  // but we have to use this incorrect syntax for the benefit of IE10+


  e.dataTransfer.setData('text', ''); // apply dropeffect to the target containers

  Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"])(this.items, this.selections, this.targets);
};

/***/ }),

/***/ "./src/core/listeners/handlers/index.js":
/*!**********************************************!*\
  !*** ./src/core/listeners/handlers/index.js ***!
  \**********************************************/
/*! exports provided: mousedownHandler, mouseupHandler, dragoverHandler, dragstartHandler, dragenterHandler, dragleaveHandler, dragendHandler, keydownHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mousedown_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mousedown.handler */ "./src/core/listeners/handlers/mousedown.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mousedownHandler", function() { return _mousedown_handler__WEBPACK_IMPORTED_MODULE_0__["mousedownHandler"]; });

/* harmony import */ var _mouseup_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mouseup.handler */ "./src/core/listeners/handlers/mouseup.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseupHandler", function() { return _mouseup_handler__WEBPACK_IMPORTED_MODULE_1__["mouseupHandler"]; });

/* harmony import */ var _dragover_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragover.handler */ "./src/core/listeners/handlers/dragover.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragoverHandler", function() { return _dragover_handler__WEBPACK_IMPORTED_MODULE_2__["dragoverHandler"]; });

/* harmony import */ var _dragstart_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dragstart.handler */ "./src/core/listeners/handlers/dragstart.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragstartHandler", function() { return _dragstart_handler__WEBPACK_IMPORTED_MODULE_3__["dragstartHandler"]; });

/* harmony import */ var _dragenter_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dragenter.handler */ "./src/core/listeners/handlers/dragenter.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragenterHandler", function() { return _dragenter_handler__WEBPACK_IMPORTED_MODULE_4__["dragenterHandler"]; });

/* harmony import */ var _dragleave_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dragleave.handler */ "./src/core/listeners/handlers/dragleave.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragleaveHandler", function() { return _dragleave_handler__WEBPACK_IMPORTED_MODULE_5__["dragleaveHandler"]; });

/* harmony import */ var _dragend_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dragend.handler */ "./src/core/listeners/handlers/dragend.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragendHandler", function() { return _dragend_handler__WEBPACK_IMPORTED_MODULE_6__["dragendHandler"]; });

/* harmony import */ var _keydown_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./keydown.handler */ "./src/core/listeners/handlers/keydown.handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keydownHandler", function() { return _keydown_handler__WEBPACK_IMPORTED_MODULE_7__["keydownHandler"]; });










/***/ }),

/***/ "./src/core/listeners/handlers/keydown.handler.js":
/*!********************************************************!*\
  !*** ./src/core/listeners/handlers/keydown.handler.js ***!
  \********************************************************/
/*! exports provided: keydownHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keydownHandler", function() { return keydownHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");

var keydownHandler = function keydownHandler(e) {
  // if the element is a grabbable item
  if (e.target.getAttribute('aria-grabbed')) {
    // Space is the selection or unselection keystroke
    if (e.keyCode === 32) {
      // if the multiple selection modifier is pressed
      if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e)) {
        // if the item's grabbed state is currently true
        if (e.target.getAttribute('aria-grabbed') === 'true') {
          // if this is the only selected item, clear dropeffect
          // from the target containers, which we must do first
          // in case subsequent unselection sets owner to null
          if (this.selections.items.length === 1) {
            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets);
          } // unselect this item


          _helpers__WEBPACK_IMPORTED_MODULE_0__["removeSelection"].bind(this)(e.target); // if we have any selections
          // apply dropeffect to the target containers,
          // in case earlier selections were made by mouse

          if (this.selections.items.length) {
            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"])(this.items, this.selections, this.targets);
          } // if that was the only selected item
          // then reset the owner container reference


          if (!this.selections.items.length) {
            this.selections.owner = null;
          }
        } else {
          // else [if its grabbed state is currently false]
          // add this additional selection
          _helpers__WEBPACK_IMPORTED_MODULE_0__["addSelection"].bind(this)(e.target); // apply dropeffect to the target containers

          Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"])(this.items, this.selections, this.targets);
        }
      } else if (e.target.getAttribute('aria-grabbed') === 'false') {
        // else [if the multiple selection modifier is not pressed]
        // and the item's grabbed state is currently false
        // clear dropeffect from the target containers
        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets); // clear all existing selections

        _helpers__WEBPACK_IMPORTED_MODULE_0__["clearSelections"].bind(this)(); // add this new selection

        _helpers__WEBPACK_IMPORTED_MODULE_0__["addSelection"].bind(this)(e.target); // apply dropeffect to the target containers

        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"])(this.items, this.selections, this.targets);
      } else {
        // else [if modifier is not pressed and grabbed is already true]
        // apply dropeffect to the target containers
        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"])(this.items, this.selections, this.targets);
      } // then prevent default to avoid any conflict with native actions


      e.preventDefault();
    } // Modifier + M is the end-of-selection keystroke


    if (e.keyCode === 77 && Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e)) {
      // if we have any selected items
      if (this.selections.items.length) {
        // apply dropeffect to the target containers
        // in case earlier selections were made by mouse
        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addDropeffects"])(this.items, this.selections, this.targets); // if the owner container is the last one, focus the first one

        if (this.selections.owner === this.targets[this.targets.length - 1]) {
          this.targets[0].focus();
        } else {
          // else [if it's not the last one], find and focus the next one
          for (var i = 0; i < this.targets.length; i++) {
            if (this.selections.owner === this.targets[i]) {
              this.targets[i + 1].focus();
              break;
            }
          }
        }
      } // then prevent default to avoid any conflict with native actions


      e.preventDefault();
    }
  } // Escape is the abort keystroke (for any target element)


  if (e.keyCode === 27) {
    // if we have any selected items
    if (this.selections.items.length) {
      // clear dropeffect from the target containers
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets); // then set focus back on the last item that was selected, which is
      // necessary because we've removed tabindex from the current focus

      this.selections.items[this.selections.items.length - 1].focus(); // clear all existing selections

      _helpers__WEBPACK_IMPORTED_MODULE_0__["clearSelections"].bind(this)(); // but don't prevent default so that native actions can still occur
    }
  } // if the element is a drop target container


  if (e.target.getAttribute('aria-dropeffect')) {
    // Enter or Modifier + M is the drop keystroke
    if (e.keyCode === 13 || e.keyCode === 77 && Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e)) {
      // append the selected items to the end of the target container
      if (this.defaultOptions.reactivityEnabled) {
        this.selections.droptarget = e.target;
        _helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchReorderEvents"].bind(this)(e);
      } else {
        for (var _i = 0; _i < this.selections.items.length; _i++) {
          e.target.appendChild(this.selections.items[_i]);
        }
      } // clear dropeffect from the target containers


      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets); // then set focus back on the last item that was selected, which is
      // necessary because we've removed tabindex from the current focus

      this.selections.items[this.selections.items.length - 1].focus(); // reset the selections array

      _helpers__WEBPACK_IMPORTED_MODULE_0__["clearSelections"].bind(this)(); // prevent default to to avoid any conflict with native actions

      e.preventDefault();
    }
  }
};

/***/ }),

/***/ "./src/core/listeners/handlers/mousedown.handler.js":
/*!**********************************************************!*\
  !*** ./src/core/listeners/handlers/mousedown.handler.js ***!
  \**********************************************************/
/*! exports provided: mousedownHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mousedownHandler", function() { return mousedownHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");

var mousedownHandler = function mousedownHandler(e) {
  if (this.defaultOptions.handlerSelector) {
    var handler = e.target.closest(this.defaultOptions.handlerSelector);

    if (!handler) {
      return;
    }
  }

  var elem = e.target.closest(this.defaultOptions.draggableSelector); // if the element is a draggable item

  if (elem && elem.getAttribute('draggable')) {
    // clear dropeffect from the target containers
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets); // if the multiple selection modifier is not pressed
    // and the item's grabbed state is currently false

    if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e) && elem.getAttribute('aria-grabbed') === 'false') {
      // clear all existing selections
      _helpers__WEBPACK_IMPORTED_MODULE_0__["clearSelections"].bind(this)(); // then add this new selection

      _helpers__WEBPACK_IMPORTED_MODULE_0__["addSelection"].bind(this)(elem);
    }
  } else if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e)) {
    // else [if the element is anything else]
    // and the selection modifier is not pressed
    // clear dropeffect from the target containers
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets); // clear all existing selections

    _helpers__WEBPACK_IMPORTED_MODULE_0__["clearSelections"].bind(this)();
  } else {
    // else [if the element is anything else and the modifier is pressed]
    // clear dropeffect from the target containers
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["clearDropeffects"])(this.items, this.selections, this.targets);
  }
};

/***/ }),

/***/ "./src/core/listeners/handlers/mouseup.handler.js":
/*!********************************************************!*\
  !*** ./src/core/listeners/handlers/mouseup.handler.js ***!
  \********************************************************/
/*! exports provided: mouseupHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseupHandler", function() { return mouseupHandler; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers */ "./src/core/helpers/index.js");


var isItemInSelectionArea = function isItemInSelectionArea(item, element, lastItem) {
  return item.parentNode === element.parentNode && (element.offsetTop > lastItem.offsetTop && item.offsetTop <= element.offsetTop && item.offsetTop >= lastItem.offsetTop || item.offsetTop >= element.offsetTop && item.offsetTop <= lastItem.offsetTop);
};

var mouseupHandler = function mouseupHandler(e) {
  var _this = this;

  var elem = e.target.closest(this.defaultOptions.draggableSelector); // if the element is a draggable item
  // and the multipler selection modifier is pressed

  if (elem && elem.getAttribute('draggable') && Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["hasModifier"])(e)) {
    // if shift key is pressed select multiple items
    if (this.selections.items.length && e.shiftKey) {
      // last selected item
      var lastItem = this.selections.items.slice(-1).pop();
      this.items.forEach(function (item) {
        var shouldSelectItem = isItemInSelectionArea(item, elem, lastItem);
        shouldSelectItem && _helpers__WEBPACK_IMPORTED_MODULE_0__["addSelection"].bind(_this)(item);
      }); // if the item's grabbed state is currently true
    } else if (elem.getAttribute('aria-grabbed') === 'true') {
      // unselect this item
      _helpers__WEBPACK_IMPORTED_MODULE_0__["removeSelection"].bind(this)(elem); // if that was the only selected item
      // then reset the owner container reference

      if (!this.selections.items.length) {
        this.selections.owner = null;
      }
    } else {
      // else [if the item's grabbed state is false]
      // add this additional selection
      _helpers__WEBPACK_IMPORTED_MODULE_0__["addSelection"].bind(this)(elem);
    }
  }
};

/***/ }),

/***/ "./src/core/listeners/index.js":
/*!*************************************!*\
  !*** ./src/core/listeners/index.js ***!
  \*************************************/
/*! exports provided: attachListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachListeners", function() { return attachListeners; });
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers */ "./src/core/listeners/handlers/index.js");

var attachListeners = function attachListeners(el) {
  // mousedown event to clear previous selections
  el.addEventListener('mousedown', _handlers__WEBPACK_IMPORTED_MODULE_0__["mousedownHandler"].bind(this), false); // mouseup event to implement multiple selection

  el.addEventListener('mouseup', _handlers__WEBPACK_IMPORTED_MODULE_0__["mouseupHandler"].bind(this), false); // dragstart event to initiate mouse dragging

  el.addEventListener('dragstart', _handlers__WEBPACK_IMPORTED_MODULE_0__["dragstartHandler"].bind(this), false); // keydown event to implement selection and abort

  el.addEventListener('keydown', _handlers__WEBPACK_IMPORTED_MODULE_0__["keydownHandler"].bind(this), false); // dragenter event to set related variable

  el.addEventListener('dragenter', _handlers__WEBPACK_IMPORTED_MODULE_0__["dragenterHandler"].bind(this), false); // dragleave event to maintain target highlighting using that variable

  el.addEventListener('dragleave', _handlers__WEBPACK_IMPORTED_MODULE_0__["dragleaveHandler"].bind(this), false); // dragover event to allow the drag by preventing its default

  el.addEventListener('dragover', _handlers__WEBPACK_IMPORTED_MODULE_0__["dragoverHandler"].bind(this), false); // dragend event to implement items being validly dropped into targets,
  // or invalidly dropped elsewhere, and to clean-up the interface either way

  el.addEventListener('dragend', _handlers__WEBPACK_IMPORTED_MODULE_0__["dragendHandler"].bind(this), false);
};

/***/ }),

/***/ "./src/core/options.js":
/*!*****************************!*\
  !*** ./src/core/options.js ***!
  \*****************************/
/*! exports provided: getOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOptions", function() { return getOptions; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getOptions = function getOptions(componentInstance, options) {
  return _objectSpread({
    dropzoneSelector: 'ul',
    draggableSelector: 'li',
    handlerSelector: null,
    reactivityEnabled: true,
    multipleDropzonesItemsDraggingEnabled: false,
    showDropzoneAreas: true
  }, options, {
    onDragstart: (options.onDragstart || function () {}).bind(componentInstance),
    onDragend: (options.onDragend || function () {}).bind(componentInstance),
    onDrop: (options.onDrop || function () {}).bind(componentInstance)
  });
};

/***/ }),

/***/ "./src/core/state.js":
/*!***************************!*\
  !*** ./src/core/state.js ***!
  \***************************/
/*! exports provided: getState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getState", function() { return getState; });
var getState = function getState() {
  return {
    targets: null,
    items: null,
    nextItemElement: null,
    // related variable is needed to maintain a reference to the
    // dragleave's relatedTarget, since it doesn't have e.relatedTarget
    related: null,
    selections: {
      items: [],
      owner: null,
      droptarget: null
    }
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: VueDraggableDirective, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggableDirective", function() { return VueDraggableDirective; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/core/index.js");
/* harmony import */ var _components_vue_draggable_group_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/vue-draggable-group.component */ "./src/components/vue-draggable-group.component.js");


var instances = [];
var VueDraggableDirective = {
  bind: function bind(el, options, vnode) {
    var instance = new _core__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"](el, vnode.context, options.value);
    instances.push(instance);
  },
  componentUpdated: function componentUpdated(el) {
    setTimeout(function () {
      instances.forEach(function (instance) {
        if (instance.el !== el) return;
        instance.initiate(el);
      });
    });
  },
  unbind: function unbind(el) {
    instances = instances.filter(function (instance) {
      return instance.el !== el;
    });
  }
};

_core__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"].install = function (Vue) {
  Vue.directive('drag-and-drop', VueDraggableDirective);
  Vue.component('vue-draggable-group', _components_vue_draggable_group_component__WEBPACK_IMPORTED_MODULE_1__["VueDraggableGroup"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_core__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"]);

/***/ })

/******/ });
});
//# sourceMappingURL=vue-draggable.js.map