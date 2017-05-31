let VueDraggable = {
  defaultOptions: {
    dropzoneSelector: 'ul',
    draggableSelector: 'li',
    excludeOlderBrowsers: true,
    multipleDropzonesItemsDraggingEnabled: true,
    onDrop: null,
    onDragstart: null,
    onDragend: null
  },
  targets: null,
  items: null,
  //related variable is needed to maintain a reference to the
  //dragleave's relatedTarget, since it doesn't have e.relatedTarget
  related: null,
  selections: {
    items: [],
    owner: null,
    droptarget: null
  },
  isOldBrowser: function () {
    return !document.querySelectorAll || !('draggable' in document.createElement('span')) || window.opera;
  },
  addSelection: function (item) {
    //if the owner reference is still null, set it to this item's parent
    //so that further selection is only allowed within the same container
    if (!this.selections.owner) {
      this.selections.owner = item.parentNode;
    }

    //or if that's already happened then compare it with this item's parent
    //and if they're not the same container, return to prevent selection
    if (!this.defaultOptions.multipleDropzonesItemsDraggingEnabled && this.selections.owner != item.parentNode) {
      return;
    }

    //set this item's grabbed state
    item.setAttribute('aria-grabbed', 'true');

    //add it to the items array
    this.selections.items.push(item);
  },
  removeSelection: function (item) {
    //reset this item's grabbed state
    item.setAttribute('aria-grabbed', 'false');

    //then find and remove this item from the existing items array
    for (let i = 0; i < this.selections.items.length; i++) {
      if (this.selections.items[i] == item) {
        this.selections.items.splice(i, 1);
        break;
      }
    }
  },
  clearSelections: function () {
    //if we have any selected items
    if (this.selections.items.length) {
      //reset the owner reference
      this.selections.owner = null;

      //reset the grabbed state on every selected item
      for (let i = 0; i < this.selections.items.length; i++) {
        this.selections.items[i].setAttribute('aria-grabbed', 'false');
      }

      //then reset the items array
      this.selections.items = [];
    }
  },
  hasModifier: function (e) {
    return e.ctrlKey || e.metaKey || e.shiftKey;
  },
  addDropeffects: function () {
    //apply aria-dropeffect and tabindex to all targets apart from the owner
    for (let len = this.targets.length, i = 0; i < len; i++) {
      if (this.targets[i] != this.selections.owner && this.targets[i].getAttribute('aria-dropeffect') == 'none') {
        this.targets[i].setAttribute('aria-dropeffect', 'move');
        this.targets[i].setAttribute('tabindex', '0');
      }
    }

    //remove aria-grabbed and tabindex from all items inside those containers
    for (let len = this.items.length, i = 0; i < len; i++) {
      if (this.items[i].parentNode != this.selections.owner && this.items[i].getAttribute('aria-grabbed')) {
        this.items[i].removeAttribute('aria-grabbed');
        this.items[i].removeAttribute('tabindex');
      }
    }
  },
  clearDropeffects: function () {
    //if we have any selected items
    if (this.selections.items.length) {
      //reset aria-dropeffect and remove tabindex from all targets
      for (let i = 0; i < this.targets.length; i++) {
        if (this.targets[i].getAttribute('aria-dropeffect') != 'none') {
          this.targets[i].setAttribute('aria-dropeffect', 'none');
          this.targets[i].removeAttribute('tabindex');
        }
      }

      //restore aria-grabbed and tabindex to all selectable items
      //without changing the grabbed value of any existing selected items
      for (let i = 0; i < this.items.length; i++) {
        if (!this.items[i].getAttribute('aria-grabbed')) {
          this.items[i].setAttribute('aria-grabbed', 'false');
          this.items[i].setAttribute('tabindex', '0');
        } else if (this.items[i].getAttribute('aria-grabbed') == 'true') {
          this.items[i].setAttribute('tabindex', '0');
        }
      }
    }
  },
  getContainer: function (element) {
    do {
      if (element && element.nodeType == 1 && element.getAttribute('aria-dropeffect')) {
        return element;
      }
    } while (element = element ? element.parentNode : null);

    return null;
  },
  registerListeners: function (el) {
    if (this.defaultOptions.excludeOlderBrowsers && this.isOldBrowser()) {
      return;
    }

    el.addEventListener('mousedown', e => {
      let elem = e.target.closest(this.defaultOptions.draggableSelector);
      //if the element is a draggable item
      if (elem && elem.getAttribute('draggable')) {
        //clear dropeffect from the target containers
        this.clearDropeffects();
        //if the multiple selection modifier is not pressed
        //and the item's grabbed state is currently false
        if (!this.hasModifier(e) && elem.getAttribute('aria-grabbed') == 'false') {
          //clear all existing selections
          this.clearSelections();

          //then add this new selection
          this.addSelection(elem);
        }
      }

      //else [if the element is anything else]
      //and the selection modifier is not pressed
      else if (!this.hasModifier(e)) {
          //clear dropeffect from the target containers
          this.clearDropeffects();

          //clear all existing selections
          this.clearSelections();
        }

        //else [if the element is anything else and the modifier is pressed]
        else {
            //clear dropeffect from the target containers
            this.clearDropeffects();
          }
    }, false);

    //mouseup event to implement multiple selection
    el.addEventListener('mouseup', e => {
      let elem = e.target.closest(this.defaultOptions.draggableSelector);
      //if the element is a draggable item
      //and the multipler selection modifier is pressed
      if (elem && elem.getAttribute('draggable') && this.hasModifier(e)) {
        //if the item's grabbed state is currently true
        if (elem.getAttribute('aria-grabbed') == 'true') {
          //unselect this item
          this.removeSelection(elem);

          //if that was the only selected item
          //then reset the owner container reference
          if (!this.selections.items.length) {
            this.selections.owner = null;
          }
        }

        //else [if the item's grabbed state is false]
        else {
            //add this additional selection
            this.addSelection(elem);
          }
      }
    }, false);

    //dragstart event to initiate mouse dragging
    el.addEventListener('dragstart', e => {
      let elem = e.target.closest(this.defaultOptions.draggableSelector);
      //if the element's parent is not the owner, then block this event
      if (!this.defaultOptions.multipleDropzonesItemsDraggingEnabled && elem && selections.owner != elem.parentNode) {
        e.preventDefault();
        return;
      }

      if (typeof this.defaultOptions.onDragstart === 'function') {
        this.defaultOptions.onDragstart(Object.assign({ nativeEvent: e }, this.selections));
      }

      //[else] if the multiple selection modifier is pressed
      //and the item's grabbed state is currently false
      if (this.hasModifier(e) && elem.getAttribute('aria-grabbed') == 'false') {
        //add this additional selection
        this.addSelection(elem);
      }

      //we don't need the transfer data, but we have to define something
      //otherwise the drop action won't work at all in firefox
      //most browsers support the proper mime-type syntax, eg. "text/plain"
      //but we have to use this incorrect syntax for the benefit of IE10+
      e.dataTransfer.setData('text', '');

      //apply dropeffect to the target containers
      this.addDropeffects();
    }, false);

    //keydown event to implement selection and abort
    el.addEventListener('keydown', e => {
      //if the element is a grabbable item
      if (e.target.getAttribute('aria-grabbed')) {
        //Space is the selection or unselection keystroke
        if (e.keyCode == 32) {
          //if the multiple selection modifier is pressed
          if (this.hasModifier(e)) {
            //if the item's grabbed state is currently true
            if (e.target.getAttribute('aria-grabbed') == 'true') {
              //if this is the only selected item, clear dropeffect
              //from the target containers, which we must do first
              //in case subsequent unselection sets owner to null
              if (this.selections.items.length == 1) {
                this.clearDropeffects();
              }

              //unselect this item
              this.removeSelection(e.target);

              //if we have any selections
              //apply dropeffect to the target containers,
              //in case earlier selections were made by mouse
              if (this.selections.items.length) {
                this.addDropeffects();
              }

              //if that was the only selected item
              //then reset the owner container reference
              if (!this.selections.items.length) {
                this.selections.owner = null;
              }
            }

            //else [if its grabbed state is currently false]
            else {
                //add this additional selection
                this.addSelection(e.target);

                //apply dropeffect to the target containers
                this.addDropeffects();
              }
          }

          //else [if the multiple selection modifier is not pressed]
          //and the item's grabbed state is currently false
          else if (e.target.getAttribute('aria-grabbed') == 'false') {
              //clear dropeffect from the target containers
              this.clearDropeffects();

              //clear all existing selections
              this.clearSelections();

              //add this new selection
              this.addSelection(e.target);

              //apply dropeffect to the target containers
              this.addDropeffects();
            }

            //else [if modifier is not pressed and grabbed is already true]
            else {
                //apply dropeffect to the target containers
                this.addDropeffects();
              }

          //then prevent default to avoid any conflict with native actions
          e.preventDefault();
        }

        //Modifier + M is the end-of-selection keystroke
        if (e.keyCode == 77 && this.hasModifier(e)) {
          //if we have any selected items
          if (this.selections.items.length) {
            //apply dropeffect to the target containers
            //in case earlier selections were made by mouse
            this.addDropeffects();

            //if the owner container is the last one, focus the first one
            if (this.selections.owner == this.targets[this.targets.length - 1]) {
              this.targets[0].focus();
            }

            //else [if it's not the last one], find and focus the next one
            else {
                for (let i = 0; i < this.targets.length; i++) {
                  if (this.selections.owner == this.targets[i]) {
                    this.targets[i + 1].focus();
                    break;
                  }
                }
              }
          }

          //then prevent default to avoid any conflict with native actions
          e.preventDefault();
        }
      }

      //Escape is the abort keystroke (for any target element)
      if (e.keyCode == 27) {
        //if we have any selected items
        if (this.selections.items.length) {
          //clear dropeffect from the target containers
          this.clearDropeffects();

          //then set focus back on the last item that was selected, which is
          //necessary because we've removed tabindex from the current focus
          this.selections.items[this.selections.items.length - 1].focus();

          //clear all existing selections
          this.clearSelections();

          //but don't prevent default so that native actions can still occur
        }
      }
    }, false);

    //dragenter event to set that variable
    el.addEventListener('dragenter', e => {
      this.related = e.target;
    }, false);

    //dragleave event to maintain target highlighting using that variable
    el.addEventListener('dragleave', e => {
      //get a drop target reference from the relatedTarget
      let droptarget = this.getContainer(this.related);

      //if the target is the owner then it's not a valid drop target
      if (droptarget == this.selections.owner) {
        droptarget = null;
      }

      //if the drop target is different from the last stored reference
      //(or we have one of those references but not the other one)
      if (droptarget != this.selections.droptarget) {
        //if we have a saved reference, clear its existing dragover class
        if (this.selections.droptarget) {
          this.selections.droptarget.className = this.selections.droptarget.className.replace(/ dragover/g, '');
        }

        //apply the dragover class to the new drop target reference
        if (droptarget) {
          droptarget.className += ' dragover';
        }

        //then save that reference for next time
        this.selections.droptarget = droptarget;
      }
    }, false);

    //dragover event to allow the drag by preventing its default
    el.addEventListener('dragover', e => {
      //if we have any selected items, allow them to be dragged
      if (this.selections.items.length) {
        e.preventDefault();
      }
    }, false);

    //dragend event to implement items being validly dropped into targets,
    //or invalidly dropped elsewhere, and to clean-up the interface either way
    el.addEventListener('dragend', e => {
      if (typeof this.defaultOptions.onDragend === 'function') {
        this.defaultOptions.onDragend(Object.assign({ nativeEvent: e }, this.selections));
      }
      //if we have a valid drop target reference
      //(which implies that we have some selected items)
      if (this.selections.droptarget) {
        //append the selected items to the end of the target container
        for (let i = 0; i < this.selections.items.length; i++) {
          this.selections.droptarget.appendChild(this.selections.items[i]);
        }

        if (typeof this.defaultOptions.onDrop === 'function') {
          this.defaultOptions.onDrop(Object.assign({ nativeEvent: e }, this.selections));
        }

        //prevent default to allow the action
        e.preventDefault();
      }

      //if we have any selected items
      if (this.selections.items.length) {
        //clear dropeffect from the target containers
        this.clearDropeffects();

        //if we have a valid drop target reference
        if (this.selections.droptarget) {
          //reset the selections array
          this.clearSelections();

          //reset the target's dragover class
          this.selections.droptarget.className = this.selections.droptarget.className.replace(/ dragover/g, '');

          //reset the target reference
          this.selections.droptarget = null;
        }
      }
    }, false);

    //keydown event to implement items being dropped into targets
    el.addEventListener('keydown', e => {
      //if the element is a drop target container
      if (e.target.getAttribute('aria-dropeffect')) {
        //Enter or Modifier + M is the drop keystroke
        if (e.keyCode == 13 || e.keyCode == 77 && this.hasModifier(e)) {
          //append the selected items to the end of the target container
          for (let i = 0; i < this.selections.items.length; i++) {
            e.target.appendChild(this.selections.items[i]);
          }

          //clear dropeffect from the target containers
          this.clearDropeffects();

          //then set focus back on the last item that was selected, which is
          //necessary because we've removed tabindex from the current focus
          this.selections.items[this.selections.items.length - 1].focus();

          //reset the selections array
          this.clearSelections();

          //prevent default to to avoid any conflict with native actions
          e.preventDefault();
        }
      }
    }, false);
  },
  initiate: function (el) {
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

export { VueDraggable };