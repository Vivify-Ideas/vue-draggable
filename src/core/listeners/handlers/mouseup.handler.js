import {
  addSelection, removeSelection, hasModifier, clearSelections
} from './../../helpers';

const isItemInSelectionArea = (item, element, lastItem) => {
  return item.parentNode === element.parentNode &&
    (
      (element.offsetTop > lastItem.offsetTop &&
      item.offsetTop <= element.offsetTop &&
      item.offsetTop >= lastItem.offsetTop
      ) ||
      (item.offsetTop >= element.offsetTop &&
            item.offsetTop <= lastItem.offsetTop
      )
    );
};

export const mouseupHandler = function (e) {
  let elem = e.target.closest(this.defaultOptions.draggableSelector);

  // if the element is a draggable item
  if (elem && elem.getAttribute('draggable')) {
    // if shift key is pressed select multiple items
    if (hasModifier(e)) {
      if (this.selections.items.length && e.shiftKey) {
        // last selected item
        const lastItem = this.selections.items.slice(-1).pop();

        if (this.items && this.items.length > 0) {
          for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            const shouldSelectItem = isItemInSelectionArea(item, elem, lastItem);

            shouldSelectItem && addSelection.bind(this)(item);
          } // if the item's grabbed state is currently true
        }

      } else if (elem.getAttribute('aria-grabbed') === 'true') {
        // unselect this item
        removeSelection.bind(this)(elem);

        // if that was the only selected item
        // then reset the owner container reference
        if (!this.selections.items.length) {
          this.selections.owner = null;
        }
      } else {
        // else [if the item's grabbed state is false]
        // add this additional selection
        addSelection.bind(this)(elem);
      }
    } else {
      // if no modifier, clear all selections and add current item.
      clearSelections.bind(this)();
      addSelection.bind(this)(elem);
    }
  }
};
