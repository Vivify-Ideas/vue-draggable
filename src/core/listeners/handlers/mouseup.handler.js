import {
  addSelection, removeSelection, hasModifier
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
  // and the multipler selection modifier is pressed
  if (elem && elem.getAttribute('draggable') && hasModifier(e)) {
    // if shift key is pressed select multiple items
    if (this.selections.items.length && e.shiftKey) {
      // last selected item
      const lastItem = this.selections.items.slice(-1).pop();

      this.items.forEach(item => {
        const shouldSelectItem = isItemInSelectionArea(item, elem, lastItem);

        shouldSelectItem && addSelection.bind(this)(item);
      }); // if the item's grabbed state is currently true
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
  }
};
