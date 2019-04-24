import {
  clearDropeffects, addSelection,
  clearSelections, hasModifier
} from './../../helpers';

export const mousedownHandler = function (e) {
  if (this.defaultOptions.handlerSelector) {
    const handler = e.target.closest(this.defaultOptions.handlerSelector);

    if (!handler) {
      return;
    }
  }

  let elem = e.target.closest(this.defaultOptions.draggableSelector);

  // if the element is a draggable item
  if (elem && elem.getAttribute('draggable')) {
    // clear dropeffect from the target containers
    clearDropeffects(this.items, this.selections, this.targets);
    // if the multiple selection modifier is not pressed
    // and the item's grabbed state is currently false
    if (!hasModifier(e) &&
          elem.getAttribute('aria-grabbed') === 'false') {
      // clear all existing selections
      clearSelections.bind(this)();

      // then add this new selection
      addSelection.bind(this)(elem);
    }
  } else if (!hasModifier(e)) {
    // else [if the element is anything else]
    // and the selection modifier is not pressed
    // clear dropeffect from the target containers
    clearDropeffects(this.items, this.selections, this.targets);

    // clear all existing selections
    clearSelections.bind(this)();
  } else {
    // else [if the element is anything else and the modifier is pressed]
    // clear dropeffect from the target containers
    clearDropeffects(this.items, this.selections, this.targets);
  }
};
