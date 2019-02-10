import {
  removeOldDropzoneAreaElements, clearDropeffects,
  clearSelections, stopDragAndDrop, dispatchReorderEvents
} from './../../helpers';

const reorderDomElements = (droptarget, items, nextItemElement) => {
  for (let i = 0; i < items.length; i++) {
    if (nextItemElement) {
      droptarget.insertBefore(
        items[i], nextItemElement);
      continue;
    }
    droptarget.appendChild(items[i]);
  }
};

export const dragendHandler = function (e) {
  if (typeof this.defaultOptions.onDragend === 'function') {
    try {
      this.defaultOptions.onDragend(
        {
          nativeEvent: e,
          stop: stopDragAndDrop,
          ...this.selections
        }
      );
    } catch (error) {
      removeOldDropzoneAreaElements();
      return;
    }
  }

  // if we have a valid drop target reference
  // (which implies that we have some selected items)
  if (this.selections.droptarget) {
    if (this.defaultOptions.reactivityEnabled) {
      dispatchReorderEvents.bind(this)(e);
    } else {
      // make dom manipulation only if reactivity is disabled
      reorderDomElements(
        this.selections.droptarget,
        this.selections.items,
        this.nextItemElement
      );
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
    clearDropeffects(this.items, this.selections, this.targets);

    // if we have a valid drop target reference
    if (this.selections.droptarget) {
      // reset the selections array
      clearSelections.bind(this)();

      // reset the target's dragover class
      this.selections.droptarget.className =
              this.selections.droptarget.className.replace(/ dragover/g, '');

      // reset the target reference
      this.selections.droptarget = null;
    }
  }

  // dropzone area elements
  removeOldDropzoneAreaElements();
};
