import {
  clearDropeffects, addDropeffects,
  addSelection, removeSelection,
  clearSelections, hasModifier,
  dispatchReorderEvents
} from './../../helpers';

const isItemAroundSelectionArea = (item, lastItem) => {
  return item.parentNode === lastItem.parentNode;
};

export const keydownHandler = function (e) {
  // if the element is a grabbable item
  if (e.target.getAttribute('aria-grabbed')) {
    // Space is the selection or unselection keystroke
    if (e.keyCode === 32) {
      // if the multiple selection modifier is pressed
      if (hasModifier(e)) {
        // if the item's grabbed state is currently true
        if (e.target.getAttribute('aria-grabbed') === 'true') {
          // if this is the only selected item, clear dropeffect
          // from the target containers, which we must do first
          // in case subsequent unselection sets owner to null
          if (this.selections.items.length === 1) {
            clearDropeffects(this.items, this.selections, this.targets);
          }

          // unselect this item
          removeSelection.bind(this)(e.target);

          // if we have any selections
          // apply dropeffect to the target containers,
          // in case earlier selections were made by mouse
          if (this.selections.items.length) {
            addDropeffects(this.items, this.selections, this.targets);
          }

          // if that was the only selected item
          // then reset the owner container reference
          if (!this.selections.items.length) {
            this.selections.owner = null;
          }
        } else {
          // else [if its grabbed state is currently false]
          // add this additional selection
          addSelection.bind(this)(e.target);

          // apply dropeffect to the target containers
          addDropeffects(this.items, this.selections, this.targets);
        }
      } else if (e.target.getAttribute('aria-grabbed') === 'false') {
        // else [if the multiple selection modifier is not pressed]
        // and the item's grabbed state is currently false
        // clear dropeffect from the target containers
        clearDropeffects(this.items, this.selections, this.targets);

        // clear all existing selections
        clearSelections.bind(this)();

        // add this new selection
        addSelection.bind(this)(e.target);

        // apply dropeffect to the target containers
        addDropeffects(this.items, this.selections, this.targets);
      } else {
        // else [if modifier is not pressed and grabbed is already true]
        // apply dropeffect to the target containers
        addDropeffects(this.items, this.selections, this.targets);
      }

      // then prevent default to avoid any conflict with native actions
      e.preventDefault();
    }

    // (CMD or Ctrl) + A - select all the items around the selected one
    if (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) {
      const lastItem = this.selections.items.slice(-1).pop();

      if (this.items && this.items.length > 0) {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];

          const shouldSelectItem = isItemAroundSelectionArea(item, lastItem);

          shouldSelectItem && addSelection.bind(this)(item);
        }
      }
      e.preventDefault(); // prevent entire page selection.
    }

    // Modifier + M is the end-of-selection keystroke
    if (e.keyCode === 77 && hasModifier(e)) {
      // if we have any selected items
      if (this.selections.items.length) {
        // apply dropeffect to the target containers
        // in case earlier selections were made by mouse
        addDropeffects(this.items, this.selections, this.targets);

        // if the owner container is the last one, focus the first one
        if (this.selections.owner === this.targets[this.targets.length - 1]) {
          this.targets[0].focus();
        } else {
          // else [if it's not the last one], find and focus the next one
          for (let i = 0; i < this.targets.length; i++) {
            if (this.selections.owner === this.targets[i]) {
              this.targets[i + 1].focus();
              break;
            }
          }
        }
      }

      // then prevent default to avoid any conflict with native actions
      e.preventDefault();
    }
  }

  // Escape is the abort keystroke (for any target element)
  if (e.keyCode === 27) {
    // if we have any selected items
    if (this.selections.items.length) {
      // clear dropeffect from the target containers
      clearDropeffects(this.items, this.selections, this.targets);

      // then set focus back on the last item that was selected, which is
      // necessary because we've removed tabindex from the current focus
      this.selections.items[this.selections.items.length - 1].focus();

      // clear all existing selections
      clearSelections.bind(this)();

      // but don't prevent default so that native actions can still occur
    }
  }

  // if the element is a drop target container
  if (e.target.getAttribute('aria-dropeffect')) {
    // Enter or Modifier + M is the drop keystroke
    if (e.keyCode === 13 || (e.keyCode === 77 && hasModifier(e))) {
      // append the selected items to the end of the target container
      if (this.defaultOptions.reactivityEnabled) {
        this.selections.droptarget = e.target;
        dispatchReorderEvents.bind(this)(e);
      } else {
        for (let i = 0; i < this.selections.items.length; i++) {
          e.target.appendChild(this.selections.items[i]);
        }
      }

      // clear dropeffect from the target containers
      clearDropeffects(this.items, this.selections, this.targets);

      // then set focus back on the last item that was selected, which is
      // necessary because we've removed tabindex from the current focus
      this.selections.items[this.selections.items.length - 1].focus();

      // reset the selections array
      clearSelections.bind(this)();

      // prevent default to to avoid any conflict with native actions
      e.preventDefault();
    }
  }
};
