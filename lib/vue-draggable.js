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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: VueDraggableDirective, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggableDirective", function() { return VueDraggableDirective; });
/* harmony import */ var _vue_draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue-draggable */ "./src/vue-draggable.js");

var VueDraggableDirective = {
  bind: function bind(el, options) {
    // override default options
    Object.assign(_vue_draggable__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"].defaultOptions, options.value);
    _vue_draggable__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"].registerListeners(el);
    _vue_draggable__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"].initiate(el);
  },
  componentUpdated: function componentUpdated(el) {
    setTimeout(function () {
      _vue_draggable__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"].initiate(el);
    });
  }
};

_vue_draggable__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"].install = function (Vue) {
  Vue.directive('drag-and-drop', VueDraggableDirective);
};

/* harmony default export */ __webpack_exports__["default"] = (_vue_draggable__WEBPACK_IMPORTED_MODULE_0__["VueDraggable"]);

/***/ }),

/***/ "./src/vue-draggable-methods.js":
/*!**************************************!*\
  !*** ./src/vue-draggable-methods.js ***!
  \**************************************/
/*! exports provided: VueDraggableMethods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggableMethods", function() { return VueDraggableMethods; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var VueDraggableMethods = {
  stopDragAndDrop: function stopDragAndDrop() {
    // throw exception and catch this to stop further d&d
    throw new Error('Requested D&D stop...');
  },
  isOldBrowser: function isOldBrowser() {
    return !document.querySelectorAll || !('draggable' in document.createElement('span')) || window.opera;
  },
  addSelection: function addSelection(item) {
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

    this.selections.items = [].concat(_toConsumableArray(this.selections.items), [item]);
  },
  removeSelection: function removeSelection(item) {
    // reset this item's grabbed state
    item.setAttribute('aria-grabbed', 'false'); // then find and remove this item from the existing items array

    for (var i = 0; i < this.selections.items.length; i++) {
      if (this.selections.items[i] === item) {
        this.selections.items.splice(i, 1);
        break;
      }
    }
  },
  clearSelections: function clearSelections() {
    // if we have any selected items
    if (this.selections.items.length) {
      // reset the owner reference
      this.selections.owner = null; // reset the grabbed state on every selected item

      for (var i = 0; i < this.selections.items.length; i++) {
        this.selections.items[i].setAttribute('aria-grabbed', 'false');
      } // then reset the items array


      this.selections.items = [];
    }
  },
  hasModifier: function hasModifier(e) {
    return e.ctrlKey || e.metaKey || e.shiftKey;
  },
  addDropeffects: function addDropeffects() {
    // apply aria-dropeffect and tabindex to all targets apart from the owner
    for (var len = this.targets.length, i = 0; i < len; i++) {
      if (this.targets[i] !== this.selections.owner && this.targets[i].getAttribute('aria-dropeffect') === 'none') {
        this.targets[i].setAttribute('aria-dropeffect', 'move');
        this.targets[i].setAttribute('tabindex', '0');
      }
    } // remove aria-grabbed and tabindex from all items inside those containers


    for (var _len = this.items.length, _i = 0; _i < _len; _i++) {
      if (this.items[_i].parentNode !== this.selections.owner && this.items[_i].getAttribute('aria-grabbed')) {
        this.items[_i].removeAttribute('aria-grabbed');

        this.items[_i].removeAttribute('tabindex');
      }
    }
  },
  clearDropeffects: function clearDropeffects() {
    // if we have any selected items
    if (this.selections.items.length) {
      // reset aria-dropeffect and remove tabindex from all targets
      for (var i = 0; i < this.targets.length; i++) {
        if (this.targets[i].getAttribute('aria-dropeffect') !== 'none') {
          this.targets[i].setAttribute('aria-dropeffect', 'none');
          this.targets[i].removeAttribute('tabindex');
        }
      } // restore aria-grabbed and tabindex to all selectable items
      // without changing the grabbed value of any existing selected items


      for (var _i2 = 0; _i2 < this.items.length; _i2++) {
        if (!this.items[_i2].getAttribute('aria-grabbed')) {
          this.items[_i2].setAttribute('aria-grabbed', 'false');

          this.items[_i2].setAttribute('tabindex', '0');
        } else if (this.items[_i2].getAttribute('aria-grabbed') === 'true') {
          this.items[_i2].setAttribute('tabindex', '0');
        }
      }
    }
  },
  getContainer: function getContainer(element) {
    var containerElement = element;

    do {
      if (containerElement && containerElement.nodeType === 1 && containerElement.getAttribute('aria-dropeffect')) {
        return containerElement;
      }
    } while (containerElement = containerElement ? containerElement.parentNode : null);

    return null;
  },
  removeOldDropzoneAreaElements: function removeOldDropzoneAreaElements() {
    var oldItemDropzoneElements = document.querySelectorAll('.item-dropzone-area');

    for (var i = 0; i < oldItemDropzoneElements.length; i++) {
      oldItemDropzoneElements[i].remove();
    }
  },
  registerListeners: function registerListeners(el) {
    var _this = this;

    if (this.defaultOptions.excludeOlderBrowsers && this.isOldBrowser()) {
      return;
    }

    el.addEventListener('mousedown', function (e) {
      var elem = e.target.closest(_this.defaultOptions.draggableSelector); // if the element is a draggable item

      if (elem && elem.getAttribute('draggable')) {
        // clear dropeffect from the target containers
        _this.clearDropeffects(); // if the multiple selection modifier is not pressed
        // and the item's grabbed state is currently false


        if (!_this.hasModifier(e) && elem.getAttribute('aria-grabbed') === 'false') {
          // clear all existing selections
          _this.clearSelections(); // then add this new selection


          _this.addSelection(elem);
        }
      } else if (!_this.hasModifier(e)) {
        // else [if the element is anything else]
        // and the selection modifier is not pressed
        // clear dropeffect from the target containers
        _this.clearDropeffects(); // clear all existing selections


        _this.clearSelections();
      } else {
        // else [if the element is anything else and the modifier is pressed]
        // clear dropeffect from the target containers
        _this.clearDropeffects();
      }
    }, false); // mouseup event to implement multiple selection

    el.addEventListener('mouseup', function (e) {
      var elem = e.target.closest(_this.defaultOptions.draggableSelector); // if the element is a draggable item
      // and the multipler selection modifier is pressed

      if (elem && elem.getAttribute('draggable') && _this.hasModifier(e)) {
        // if Shift key is pressed
        if (_this.selections.items.length && e.shiftKey) {
          // get top distance of last item selected
          var offsetLast = _this.selections.items.slice(-1).pop().offsetTop;

          _this.items.forEach(function (item) {
            // if item container is same
            if (item.parentNode === elem.parentNode) {
              // if item location is after last item selected
              if (elem.offsetTop > offsetLast) {
                // if item is in the range
                if (item.offsetTop <= elem.offsetTop && item.offsetTop >= offsetLast) {
                  _this.addSelection(item);
                } // if item location is before last item selected and item is in the range

              } else if (item.offsetTop >= elem.offsetTop && item.offsetTop <= offsetLast) {
                _this.addSelection(item);
              }
            }
          }); // if the item's grabbed state is currently true

        } else if (elem.getAttribute('aria-grabbed') === 'true') {
          // unselect this item
          _this.removeSelection(elem); // if that was the only selected item
          // then reset the owner container reference


          if (!_this.selections.items.length) {
            _this.selections.owner = null;
          }
        } else {
          // else [if the item's grabbed state is false]
          // add this additional selection
          _this.addSelection(elem);
        }
      }
    }, false); // dragstart event to initiate mouse dragging

    el.addEventListener('dragstart', function (e) {
      var elem = e.target.closest(_this.defaultOptions.draggableSelector); // if the element's parent is not the owner, then block this event

      if (!_this.defaultOptions.multipleDropzonesItemsDraggingEnabled && elem && _this.selections.owner !== elem.parentNode) {
        e.preventDefault();
        return;
      }

      if (typeof _this.defaultOptions.onDragstart === 'function') {
        try {
          _this.defaultOptions.onDragstart(_objectSpread({
            nativeEvent: e,
            stop: _this.stopDragAndDrop
          }, _this.selections));
        } catch (error) {
          e.preventDefault();

          _this.removeOldDropzoneAreaElements();

          return;
        }
      } // [else] if the multiple selection modifier is pressed
      // and the item's grabbed state is currently false


      if (_this.hasModifier(e) && elem.getAttribute('aria-grabbed') === 'false') {
        // add this additional selection
        _this.addSelection(elem);
      } // we don't need the transfer data, but we have to define something
      // otherwise the drop action won't work at all in firefox
      // most browsers support the proper mime-type syntax, eg. "text/plain"
      // but we have to use this incorrect syntax for the benefit of IE10+


      e.dataTransfer.setData('text', ''); // apply dropeffect to the target containers

      _this.addDropeffects();
    }, false); // keydown event to implement selection and abort

    el.addEventListener('keydown', function (e) {
      // if the element is a grabbable item
      if (e.target.getAttribute('aria-grabbed')) {
        // Space is the selection or unselection keystroke
        if (e.keyCode === 32) {
          // if the multiple selection modifier is pressed
          if (_this.hasModifier(e)) {
            // if the item's grabbed state is currently true
            if (e.target.getAttribute('aria-grabbed') === 'true') {
              // if this is the only selected item, clear dropeffect
              // from the target containers, which we must do first
              // in case subsequent unselection sets owner to null
              if (_this.selections.items.length === 1) {
                _this.clearDropeffects();
              } // unselect this item


              _this.removeSelection(e.target); // if we have any selections
              // apply dropeffect to the target containers,
              // in case earlier selections were made by mouse


              if (_this.selections.items.length) {
                _this.addDropeffects();
              } // if that was the only selected item
              // then reset the owner container reference


              if (!_this.selections.items.length) {
                _this.selections.owner = null;
              }
            } else {
              // else [if its grabbed state is currently false]
              // add this additional selection
              _this.addSelection(e.target); // apply dropeffect to the target containers


              _this.addDropeffects();
            }
          } else if (e.target.getAttribute('aria-grabbed') === 'false') {
            // else [if the multiple selection modifier is not pressed]
            // and the item's grabbed state is currently false
            // clear dropeffect from the target containers
            _this.clearDropeffects(); // clear all existing selections


            _this.clearSelections(); // add this new selection


            _this.addSelection(e.target); // apply dropeffect to the target containers


            _this.addDropeffects();
          } else {
            // else [if modifier is not pressed and grabbed is already true]
            // apply dropeffect to the target containers
            _this.addDropeffects();
          } // then prevent default to avoid any conflict with native actions


          e.preventDefault();
        } // Modifier + M is the end-of-selection keystroke


        if (e.keyCode === 77 && _this.hasModifier(e)) {
          // if we have any selected items
          if (_this.selections.items.length) {
            // apply dropeffect to the target containers
            // in case earlier selections were made by mouse
            _this.addDropeffects(); // if the owner container is the last one, focus the first one


            if (_this.selections.owner === _this.targets[_this.targets.length - 1]) {
              _this.targets[0].focus();
            } else {
              // else [if it's not the last one], find and focus the next one
              for (var i = 0; i < _this.targets.length; i++) {
                if (_this.selections.owner === _this.targets[i]) {
                  _this.targets[i + 1].focus();

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
        if (_this.selections.items.length) {
          // clear dropeffect from the target containers
          _this.clearDropeffects(); // then set focus back on the last item that was selected, which is
          // necessary because we've removed tabindex from the current focus


          _this.selections.items[_this.selections.items.length - 1].focus(); // clear all existing selections


          _this.clearSelections(); // but don't prevent default so that native actions can still occur

        }
      }
    }, false); // dragenter event to set that variable

    el.addEventListener('dragenter', function (e) {
      _this.related = e.target;
    }, false); // dragleave event to maintain target highlighting using that variable

    el.addEventListener('dragleave', function () {
      // get a drop target reference from the relatedTarget
      var droptarget = _this.getContainer(_this.related); // if the drop target is different from the last stored reference
      // (or we have one of those references but not the other one)


      if (droptarget !== _this.selections.droptarget) {
        // if we have a saved reference, clear its existing dragover class
        if (_this.selections.droptarget) {
          _this.selections.droptarget.className = _this.selections.droptarget.className.replace(/ dragover/g, '');
        } // apply the dragover class to the new drop target reference


        if (droptarget) {
          droptarget.className += ' dragover';
        } // then save that reference for next time


        _this.selections.droptarget = droptarget;
      }
    }, false); // dragover event to allow the drag by preventing its default

    el.addEventListener('dragover', function (e) {
      // if we have any selected items, allow them to be dragged
      if (_this.selections.items.length) {
        e.preventDefault();
      }
    }, false); // dragend event to implement items being validly dropped into targets,
    // or invalidly dropped elsewhere, and to clean-up the interface either way

    el.addEventListener('dragend', function (e) {
      if (typeof _this.defaultOptions.onDragend === 'function') {
        try {
          _this.defaultOptions.onDragend(_objectSpread({
            nativeEvent: e,
            stop: _this.stopDragAndDrop
          }, _this.selections));
        } catch (error) {
          _this.removeOldDropzoneAreaElements();

          return;
        }
      } // if we have a valid drop target reference
      // (which implies that we have some selected items)


      if (_this.selections.droptarget) {
        // append the selected items to the end of the target container
        for (var i = 0; i < _this.selections.items.length; i++) {
          if (_this.nextItemElement) {
            _this.selections.droptarget.insertBefore(_this.selections.items[i], _this.nextItemElement);

            continue;
          }

          _this.selections.droptarget.appendChild(_this.selections.items[i]);
        }

        if (typeof _this.defaultOptions.onDrop === 'function') {
          _this.defaultOptions.onDrop(_objectSpread({
            nativeEvent: e,
            stop: function stop() {
              throw new Error("Stop method is available only for callbacks\n                'onDragstart' and 'onDragend'. For more info look at\n                https://github.com/Vivify-Ideas/vue-draggable/blob/master/README.md\n              ");
            }
          }, _this.selections));
        } // prevent default to allow the action


        e.preventDefault();
      } // if we have any selected items


      if (_this.selections.items.length) {
        // clear dropeffect from the target containers
        _this.clearDropeffects(); // if we have a valid drop target reference


        if (_this.selections.droptarget) {
          // reset the selections array
          _this.clearSelections(); // reset the target's dragover class


          _this.selections.droptarget.className = _this.selections.droptarget.className.replace(/ dragover/g, ''); // reset the target reference

          _this.selections.droptarget = null;
        }
      } // dropzone area elements


      _this.removeOldDropzoneAreaElements();
    }, false); // keydown event to implement items being dropped into targets

    el.addEventListener('keydown', function (e) {
      // if the element is a drop target container
      if (e.target.getAttribute('aria-dropeffect')) {
        // Enter or Modifier + M is the drop keystroke
        if (e.keyCode === 13 || e.keyCode === 77 && _this.hasModifier(e)) {
          // append the selected items to the end of the target container
          for (var i = 0; i < _this.selections.items.length; i++) {
            e.target.appendChild(_this.selections.items[i]);
          } // clear dropeffect from the target containers


          _this.clearDropeffects(); // then set focus back on the last item that was selected, which is
          // necessary because we've removed tabindex from the current focus


          _this.selections.items[_this.selections.items.length - 1].focus(); // reset the selections array


          _this.clearSelections(); // prevent default to to avoid any conflict with native actions


          e.preventDefault();
        }
      }
    }, false);

    if (!this.defaultOptions.showDropzoneAreas) {
      return;
    }

    var previousTarget = null;
    var dragoverCalls = 0;
    document.addEventListener('dragover', function (e) {
      if (dragoverCalls % 10 !== 0 && e.target === previousTarget || !e.target || e.target.className === 'item-dropzone-area') return;
      dragoverCalls++;
      previousTarget = e.target;
      _this.nextItemElement = e.target.closest(_this.defaultOptions.draggableSelector);
      _this.selections.droptarget = e.target.closest(_this.defaultOptions.dropzoneSelector);
      var itemDropzoneElement = document.createElement('div');
      itemDropzoneElement.className = 'item-dropzone-area';

      _this.removeOldDropzoneAreaElements();

      if (_this.selections.droptarget && _this.nextItemElement) {
        _this.selections.droptarget.insertBefore(itemDropzoneElement, previousTarget.closest(_this.defaultOptions.draggableSelector));
      }

      if (_this.selections.droptarget && !_this.nextItemElement) {
        _this.selections.droptarget.appendChild(itemDropzoneElement);
      }
    });
  },
  initiate: function initiate(el) {
    if (this.defaultOptions.excludeOlderBrowsers && this.isOldBrowser()) {
      return;
    }

    this.targets = el.querySelectorAll(this.defaultOptions.dropzoneSelector);
    this.items = el.querySelectorAll(this.defaultOptions.draggableSelector);

    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i].setAttribute('aria-dropeffect', 'none');
    }

    for (var _i3 = 0; _i3 < this.items.length; _i3++) {
      this.items[_i3].setAttribute('draggable', 'true');

      this.items[_i3].setAttribute('aria-grabbed', 'false');

      this.items[_i3].setAttribute('tabindex', '0');
    }
  }
};


/***/ }),

/***/ "./src/vue-draggable-options.js":
/*!**************************************!*\
  !*** ./src/vue-draggable-options.js ***!
  \**************************************/
/*! exports provided: VueDraggableOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggableOptions", function() { return VueDraggableOptions; });
var VueDraggableOptions = {
  defaultOptions: {
    dropzoneSelector: 'ul',
    draggableSelector: 'li',
    excludeOlderBrowsers: true,
    multipleDropzonesItemsDraggingEnabled: true,
    showDropzoneAreas: true,
    onDrop: function onDrop() {},
    onDragstart: function onDragstart() {},
    onDragend: function onDragend() {}
  },
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


/***/ }),

/***/ "./src/vue-draggable.js":
/*!******************************!*\
  !*** ./src/vue-draggable.js ***!
  \******************************/
/*! exports provided: VueDraggable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueDraggable", function() { return VueDraggable; });
/* harmony import */ var _vue_draggable_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue-draggable-options */ "./src/vue-draggable-options.js");
/* harmony import */ var _vue_draggable_methods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vue-draggable-methods */ "./src/vue-draggable-methods.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var VueDraggable = _objectSpread({}, _vue_draggable_options__WEBPACK_IMPORTED_MODULE_0__["VueDraggableOptions"], _vue_draggable_methods__WEBPACK_IMPORTED_MODULE_1__["VueDraggableMethods"]);



/***/ })

/******/ });
});
//# sourceMappingURL=vue-draggable.js.map