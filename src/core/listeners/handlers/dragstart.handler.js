import {
  removeOldDropzoneAreaElements, addDropeffects, addSelection,
  stopDragAndDrop, hasModifier
} from './../../helpers';

export const dragstartHandler = function (e) {
  let elem = e.target.closest(this.defaultOptions.draggableSelector);

  // if the element's parent is not the owner, then block this event
  if (!this.defaultOptions.multipleDropzonesItemsDraggingEnabled &&
          elem && this.selections.owner !== elem.parentNode) {
    e.preventDefault();
    return;
  }

  if (typeof this.defaultOptions.onDragstart === 'function') {
    try {
      this.defaultOptions.onDragstart(
        {
          nativeEvent: e,
          stop: stopDragAndDrop,
          ...this.selections
        }
      );
    } catch (error) {
      e.preventDefault();
      removeOldDropzoneAreaElements();
      return;
    }
  }

  // [else] if the multiple selection modifier is pressed
  // and the item's grabbed state is currently false
  if (hasModifier(e) &&
        elem.getAttribute('aria-grabbed') === 'false') {
    // add this additional selection
    addSelection.bind(this)(elem);
  }

  // we don't need the transfer data, but we have to define something
  // otherwise the drop action won't work at all in firefox
  // most browsers support the proper mime-type syntax, eg. "text/plain"
  // but we have to use this incorrect syntax for the benefit of IE10+
  e.dataTransfer.setData('text', '');

  // apply dropeffect to the target containers
  addDropeffects(this.items, this.selections, this.targets);
};
