export const getDroptargets = function (el) {
  return el.querySelectorAll(this.defaultOptions.dropzoneSelector);
};

export const getDraggables = function (el) {
  return el.querySelectorAll(this.defaultOptions.draggableSelector);
};

export const setInitialAtributes = function (el) {
  this.targets = getDroptargets.bind(this)(el);
  this.items = getDraggables.bind(this)(el);

  for (let target of this.targets) {
    target.setAttribute('aria-dropeffect', 'none');
  }

  for (let item of this.items) {
    item.setAttribute('draggable', 'true');
    item.setAttribute('aria-grabbed', 'false');
    item.setAttribute('tabindex', '0');
  }
};

export const removeOldDropzoneAreaElements = () => {
  let oldItemDropzoneElements = document.querySelectorAll('.item-dropzone-area');

  for (let dropZoneElement of oldItemDropzoneElements) {
    dropZoneElement.remove();
  }
};

export const getContainer = (element) => {
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
};

export const addDropeffects = (items, selections, targets) => {
  // apply aria-dropeffect and tabindex to all targets apart from the owner
  for (let target of targets) {
    if (target !== selections.owner &&
      target.getAttribute('aria-dropeffect') === 'none') {
      target.setAttribute('aria-dropeffect', 'move');
      target.setAttribute('tabindex', '0');
    }
  }

  // remove aria-grabbed and tabindex from all items inside those containers
  for (let item of items) {
    if (item.parentNode !== selections.owner &&
      item.getAttribute('aria-grabbed')) {
      item.removeAttribute('aria-grabbed');
      item.removeAttribute('tabindex');
    }
  }
};

export const clearDropeffects = (items, selections, targets) => {
  // if we dont't have any selected items just skip
  if (!selections.items.length) {
    return;
  }
  // reset aria-dropeffect and remove tabindex from all targets
  for (let target of targets) {
    if (target.getAttribute('aria-dropeffect') !== 'none') {
      target.setAttribute('aria-dropeffect', 'none');
      target.removeAttribute('tabindex');
    }
  }

  // restore aria-grabbed and tabindex to all selectable items
  // without changing the grabbed value of any existing selected items
  for (let item of items) {
    if (!item.getAttribute('aria-grabbed')) {
      item.setAttribute('aria-grabbed', 'false');
      item.setAttribute('tabindex', '0');
    } else if (item.getAttribute('aria-grabbed') === 'true') {
      item.setAttribute('tabindex', '0');
    }
  }
};

export const hasModifier = (e) => {
  return (e.ctrlKey || e.metaKey || e.shiftKey);
};
