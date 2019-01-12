import {
  removeOldDropzoneAreaElements, clearDropeffects, clearSelections,
  stopDragAndDrop
} from './../../helpers';

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
