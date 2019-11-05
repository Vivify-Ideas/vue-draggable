/*
* IE polyfills
* closest: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
* remove: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
*/
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
  Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null) {
          this.parentNode.removeChild(this);
        }
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// Custom Events
// IE Polyfills: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
(function () {

  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    var evt = document.createEvent('CustomEvent');

    params = params || { bubbles: false, cancelable: false, detail: null };

    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;

  return CustomEvent;
})();
