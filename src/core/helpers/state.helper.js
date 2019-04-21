export const addSelection = function (item) {
  // if the owner reference is still null, set it to this item's parent
  // so that further selection is only allowed within the same container
  if (!this.selections.owner) {
    this.selections.owner = item.parentNode;
  }

  // or if that's already happened then compare it with this item's parent
  // and if they're not the same container, return to prevent selection
  if (!this.defaultOptions.multipleDropzonesItemsDraggingEnabled &&
        this.selections.owner !== item.parentNode) {
    return;
  }

  // set this item's grabbed state
  item.setAttribute('aria-grabbed', 'true');

  // add it to the items array
  this.selections.items =
    this.selections.items.indexOf(item) >= 0 ?
      this.selections.items :
      [ ...this.selections.items, item ];
};

export const removeSelection = function (item) {
  // reset this item's grabbed state
  item.setAttribute('aria-grabbed', 'false');

  // then find and remove this item from the existing items array
  for (let i = 0; i < this.selections.items.length; i++) {
    if (this.selections.items[i] === item) {
      this.selections.items.splice(i, 1);
      break;
    }
  }
};

export const clearSelections = function () {
  // if we have any selected items
  if (this.selections.items.length) {
    // reset the owner reference
    this.selections.owner = null;

    // reset the grabbed state on every selected item
    for (let i = 0; i < this.selections.items.length; i++) {
      this.selections.items[i].setAttribute('aria-grabbed', 'false');
    }

    // then reset the items array
    this.selections.items = [];
  }
};

export const stopDragAndDrop = function () {
  // throw exception and catch this to stop further d&d
  throw new Error('Requested D&D stop...');
};
