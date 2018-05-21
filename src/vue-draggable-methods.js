const VueDraggableMethods = {
  stopDragAndDrop() {
    // throw exception and catch this to stop further d&d
    throw new Error('Requested D&D stop...');
  },
  isOldBrowser() {
    return !document.querySelectorAll ||
    !('draggable' in document.createElement('span')) ||
    window.opera;
  },
  addSelection(item) {
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
    this.selections.items = [ ...this.selections.items, item ];
  },
  removeSelection(item) {
    // reset this item's grabbed state
    item.setAttribute('aria-grabbed', 'false');

    // then find and remove this item from the existing items array
    for (let i = 0; i < this.selections.items.length; i++) {
      if (this.selections.items[i] === item) {
        this.selections.items.splice(i, 1);
        break;
      }
    }
  },
  clearSelections() {
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
  },
  hasModifier(e) {
    return (e.ctrlKey || e.metaKey || e.shiftKey);
  },
  addDropeffects() {
    // apply aria-dropeffect and tabindex to all targets apart from the owner
    for (let len = this.targets.length, i = 0; i < len; i++) {
      if (this.targets[i] !== this.selections.owner &&
        this.targets[i].getAttribute('aria-dropeffect') === 'none') {
        this.targets[i].setAttribute('aria-dropeffect', 'move');
        this.targets[i].setAttribute('tabindex', '0');
      }
    }

    // remove aria-grabbed and tabindex from all items inside those containers
    for (let len = this.items.length, i = 0; i < len; i++) {
      if (this.items[i].parentNode !== this.selections.owner &&
        this.items[i].getAttribute('aria-grabbed')) {
        this.items[i].removeAttribute('aria-grabbed');
        this.items[i].removeAttribute('tabindex');
      }
    }
  },
  clearDropeffects() {
    // if we have any selected items
    if (this.selections.items.length) {
      // reset aria-dropeffect and remove tabindex from all targets
      for (let i = 0; i < this.targets.length; i++) {
        if (this.targets[i].getAttribute('aria-dropeffect') !== 'none') {
          this.targets[i].setAttribute('aria-dropeffect', 'none');
          this.targets[i].removeAttribute('tabindex');
        }
      }

      // restore aria-grabbed and tabindex to all selectable items
      // without changing the grabbed value of any existing selected items
      for (let i = 0; i < this.items.length; i++) {
        if (!this.items[i].getAttribute('aria-grabbed')) {
          this.items[i].setAttribute('aria-grabbed', 'false');
          this.items[i].setAttribute('tabindex', '0');
        } else if (this.items[i].getAttribute('aria-grabbed') === 'true') {
          this.items[i].setAttribute('tabindex', '0');
        }
      }
    }
  },
  getContainer(element) {
    let containerElement = element;

    do {
      if (containerElement &&
        containerElement.nodeType === 1 &&
        containerElement.getAttribute('aria-dropeffect')
      ) {
        return containerElement;
      }
    } while ((containerElement =
      containerElement ? containerElement.parentNode : null)
    );

    return null;
  },
  removeOldDropzoneAreaElements() {
    let oldItemDropzoneElements = document.querySelectorAll('.item-dropzone-area');

    for (let i = 0; i < oldItemDropzoneElements.length; i++) {
      oldItemDropzoneElements[i].remove();
    }
  },
  registerListeners(el) {
    if (this.defaultOptions.excludeOlderBrowsers && this.isOldBrowser()) {
      return;
    }

    el.addEventListener('mousedown', (e) => {
      let elem = e.target.closest(this.defaultOptions.draggableSelector);

      // if the element is a draggable item
      if (elem && elem.getAttribute('draggable')) {
        // clear dropeffect from the target containers
        this.clearDropeffects();
        // if the multiple selection modifier is not pressed
        // and the item's grabbed state is currently false
        if (!this.hasModifier(e) &&
        elem.getAttribute('aria-grabbed') === 'false') {
          // clear all existing selections
          this.clearSelections();

          // then add this new selection
          this.addSelection(elem);
        }
      } else if (!this.hasModifier(e)) {
        // else [if the element is anything else]
        // and the selection modifier is not pressed
        // clear dropeffect from the target containers
        this.clearDropeffects();

        // clear all existing selections
        this.clearSelections();
      } else {
        // else [if the element is anything else and the modifier is pressed]
        // clear dropeffect from the target containers
        this.clearDropeffects();
      }

    }, false);

    // mouseup event to implement multiple selection
    el.addEventListener('mouseup', (e) => {
      let elem = e.target.closest(this.defaultOptions.draggableSelector);

      // if the element is a draggable item
      // and the multipler selection modifier is pressed
      if (elem && elem.getAttribute('draggable') && this.hasModifier(e)) {
        // if the item's grabbed state is currently true
        if (elem.getAttribute('aria-grabbed') === 'true') {
          // unselect this item
          this.removeSelection(elem);

          // if that was the only selected item
          // then reset the owner container reference
          if (!this.selections.items.length) {
            this.selections.owner = null;
          }
        } else {
          // else [if the item's grabbed state is false]
          // add this additional selection
          this.addSelection(elem);
        }
      }

    }, false);

    // dragstart event to initiate mouse dragging
    el.addEventListener('dragstart', (e) => {
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
              stop: this.stopDragAndDrop,
              ...this.selections
            }
          );
        } catch (error) {
          e.preventDefault();
          this.removeOldDropzoneAreaElements();
          return;
        }
      }

      // [else] if the multiple selection modifier is pressed
      // and the item's grabbed state is currently false
      if (this.hasModifier(e) &&
      elem.getAttribute('aria-grabbed') === 'false') {
        // add this additional selection
        this.addSelection(elem);
      }

      // we don't need the transfer data, but we have to define something
      // otherwise the drop action won't work at all in firefox
      // most browsers support the proper mime-type syntax, eg. "text/plain"
      // but we have to use this incorrect syntax for the benefit of IE10+
      e.dataTransfer.setData('text', '');

      // apply dropeffect to the target containers
      this.addDropeffects();

    }, false);

    // keydown event to implement selection and abort
    el.addEventListener('keydown', (e) => {
      // if the element is a grabbable item
      if (e.target.getAttribute('aria-grabbed')) {
        // Space is the selection or unselection keystroke
        if (e.keyCode === 32) {
          // if the multiple selection modifier is pressed
          if (this.hasModifier(e)) {
            // if the item's grabbed state is currently true
            if (e.target.getAttribute('aria-grabbed') === 'true') {
              // if this is the only selected item, clear dropeffect
              // from the target containers, which we must do first
              // in case subsequent unselection sets owner to null
              if (this.selections.items.length === 1) {
                this.clearDropeffects();
              }

              // unselect this item
              this.removeSelection(e.target);

              // if we have any selections
              // apply dropeffect to the target containers,
              // in case earlier selections were made by mouse
              if (this.selections.items.length) {
                this.addDropeffects();
              }

              // if that was the only selected item
              // then reset the owner container reference
              if (!this.selections.items.length) {
                this.selections.owner = null;
              }
            } else {
              // else [if its grabbed state is currently false]
              // add this additional selection
              this.addSelection(e.target);

              // apply dropeffect to the target containers
              this.addDropeffects();
            }
          } else if (e.target.getAttribute('aria-grabbed') === 'false') {
            // else [if the multiple selection modifier is not pressed]
            // and the item's grabbed state is currently false
            // clear dropeffect from the target containers
            this.clearDropeffects();

            // clear all existing selections
            this.clearSelections();

            // add this new selection
            this.addSelection(e.target);

            // apply dropeffect to the target containers
            this.addDropeffects();
          } else {
            // else [if modifier is not pressed and grabbed is already true]
            // apply dropeffect to the target containers
            this.addDropeffects();
          }

          // then prevent default to avoid any conflict with native actions
          e.preventDefault();
        }

        // Modifier + M is the end-of-selection keystroke
        if (e.keyCode === 77 && this.hasModifier(e)) {
          // if we have any selected items
          if (this.selections.items.length) {
            // apply dropeffect to the target containers
            // in case earlier selections were made by mouse
            this.addDropeffects();

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
          this.clearDropeffects();

          // then set focus back on the last item that was selected, which is
          // necessary because we've removed tabindex from the current focus
          this.selections.items[this.selections.items.length - 1].focus();

          // clear all existing selections
          this.clearSelections();

          // but don't prevent default so that native actions can still occur
        }
      }

    }, false);

    // dragenter event to set that variable
    el.addEventListener('dragenter', (e) => {
      this.related = e.target;
    }, false);

    // dragleave event to maintain target highlighting using that variable
    el.addEventListener('dragleave', () => {
      // get a drop target reference from the relatedTarget
      let droptarget = this.getContainer(this.related);

      // if the target is the owner then it's not a valid drop target
      if (droptarget === this.selections.owner) {
        droptarget = null;
      }

      // if the drop target is different from the last stored reference
      // (or we have one of those references but not the other one)
      if (droptarget !== this.selections.droptarget) {
        // if we have a saved reference, clear its existing dragover class
        if (this.selections.droptarget) {
          this.selections.droptarget.className =
          this.selections.droptarget.className.replace(/ dragover/g, '');
        }

        // apply the dragover class to the new drop target reference
        if (droptarget) {
          droptarget.className += ' dragover';
        }

        // then save that reference for next time
        this.selections.droptarget = droptarget;
      }
    }, false);

    // dragover event to allow the drag by preventing its default
    el.addEventListener('dragover', (e) => {
      // if we have any selected items, allow them to be dragged
      if (this.selections.items.length) {
        e.preventDefault();
      }
    }, false);

    // dragend event to implement items being validly dropped into targets,
    // or invalidly dropped elsewhere, and to clean-up the interface either way
    el.addEventListener('dragend', (e) => {
      if (typeof this.defaultOptions.onDragend === 'function') {
        try {
          this.defaultOptions.onDragend(
            {
              nativeEvent: e,
              stop: this.stopDragAndDrop,
              ...this.selections
            }
          );
        } catch (error) {
          this.removeOldDropzoneAreaElements();
          return;
        }
      }

      // if we have a valid drop target reference
      // (which implies that we have some selected items)
      if (this.selections.droptarget) {
        // append the selected items to the end of the target container
        for (let i = 0; i < this.selections.items.length; i++) {
          if (this.nextItemElement) {
            this.selections.droptarget.insertBefore(
              this.selections.items[i], this.nextItemElement);
            continue;
          }
          this.selections.droptarget.appendChild(this.selections.items[i]);
        }

        if (typeof this.defaultOptions.onDrop === 'function') {
          this.defaultOptions.onDrop({
            nativeEvent: e,
            stop: () => {
              throw new Error(`Stop method is available only for callbacks
                'onDragstart' and 'onDragend'. For more info look at
                https://github.com/Vivify-Ideas/vue-draggable/blob/master/README.md
              `);
            },
            ...this.selections
          });
        }

        // prevent default to allow the action
        e.preventDefault();
      }

      // if we have any selected items
      if (this.selections.items.length) {
        // clear dropeffect from the target containers
        this.clearDropeffects();

        // if we have a valid drop target reference
        if (this.selections.droptarget) {
          // reset the selections array
          this.clearSelections();

          // reset the target's dragover class
          this.selections.droptarget.className =
          this.selections.droptarget.className.replace(/ dragover/g, '');

          // reset the target reference
          this.selections.droptarget = null;
        }
      }

      // dropzone area elements
      this.removeOldDropzoneAreaElements();

    }, false);

    // keydown event to implement items being dropped into targets
    el.addEventListener('keydown', (e) => {
      // if the element is a drop target container
      if (e.target.getAttribute('aria-dropeffect')) {
        // Enter or Modifier + M is the drop keystroke
        if (e.keyCode === 13 || (e.keyCode === 77 && this.hasModifier(e))) {
          // append the selected items to the end of the target container
          for (let i = 0; i < this.selections.items.length; i++) {
            e.target.appendChild(this.selections.items[i]);
          }

          // clear dropeffect from the target containers
          this.clearDropeffects();

          // then set focus back on the last item that was selected, which is
          // necessary because we've removed tabindex from the current focus
          this.selections.items[this.selections.items.length - 1].focus();

          // reset the selections array
          this.clearSelections();

          // prevent default to to avoid any conflict with native actions
          e.preventDefault();
        }
      }

    }, false);

    if (!this.defaultOptions.showDropzoneAreas) {
      return;
    }
    let previousTarget = null;
    let dragoverCalls = 0;

    el.addEventListener('dragover', (e) => {
      if (dragoverCalls % 10 !== 0 && e.target === previousTarget ||
        !e.target || e.target.className === 'item-dropzone-area') return;

      dragoverCalls++;
      previousTarget = e.target;

      this.nextItemElement = e.target.closest(this.defaultOptions.draggableSelector);
      this.selections.droptarget = e.target.closest(this.defaultOptions.dropzoneSelector);

      if (this.selections.droptarget === this.selections.owner) return;

      let itemDropzoneElement = document.createElement('div');

      itemDropzoneElement.className = 'item-dropzone-area';
      this.removeOldDropzoneAreaElements();

      if (this.selections.droptarget && this.nextItemElement) {
        this.selections.droptarget.insertBefore(itemDropzoneElement, previousTarget);
      }

      if (this.selections.droptarget && !this.nextItemElement) {
        this.selections.droptarget.appendChild(itemDropzoneElement);
      }
    });
  },
  initiate(el) {
    if (this.defaultOptions.excludeOlderBrowsers && this.isOldBrowser()) {
      return;
    }

    this.targets = el.querySelectorAll(this.defaultOptions.dropzoneSelector);
    this.items = el.querySelectorAll(this.defaultOptions.draggableSelector);

    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i].setAttribute('aria-dropeffect', 'none');
    }

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].setAttribute('draggable', 'true');
      this.items[i].setAttribute('aria-grabbed', 'false');
      this.items[i].setAttribute('tabindex', '0');
    }
  }
};

export { VueDraggableMethods };
