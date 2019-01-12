import { removeOldDropzoneAreaElements } from './../../helpers';

const state = {
  previousTarget: null,
  dragoverCalls: 0
};

const displayDropzones = function (e) {
  if (state.dragoverCalls % 100 !== 0 &&
        (
          e.target === state.previousTarget ||
          !e.target ||
          e.target.className === 'item-dropzone-area'
        )
  ) return;

  state.dragoverCalls++;
  state.previousTarget = e.target;

  this.nextItemElement = e.target.closest(this.defaultOptions.draggableSelector);
  this.selections.droptarget = e.target.closest(this.defaultOptions.dropzoneSelector);

  let itemDropzoneElement = document.createElement('div');

  itemDropzoneElement.className = 'item-dropzone-area';
  removeOldDropzoneAreaElements();

  if (this.selections.droptarget && this.nextItemElement) {
    this.selections.droptarget.insertBefore(
      itemDropzoneElement,
      state.previousTarget.closest(this.defaultOptions.draggableSelector)
    );
  }

  if (this.selections.droptarget && !this.nextItemElement) {
    this.selections.droptarget.appendChild(itemDropzoneElement);
  }
};

export const dragoverHandler = function (e) {
  // if we have any selected items,
  // allow them to be dragged
  if (this.selections.items.length) {
    e.preventDefault();
  }
  if (!this.defaultOptions.showDropzoneAreas) {
    return;
  }
  displayDropzones.bind(this)(e);
};
