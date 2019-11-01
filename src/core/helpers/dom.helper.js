export const getDroptargets = (el, dropzoneSelector) =>
  el.querySelectorAll(dropzoneSelector);

export const getDraggables = (el, draggableSelector) =>
  el.querySelectorAll(draggableSelector);

export const setInitialAtributes = function (el) {
  this.targets = getDroptargets(el, this.defaultOptions.dropzoneSelector);
  this.items = getDraggables(el, this.defaultOptions.draggableSelector);

  for (let i = 0; i < this.targets.length; i++) {
    this.targets[i].setAttribute('aria-dropeffect', 'none');
  }

  for (let i = 0; i < this.items.length; i++) {
    this.items[i].setAttribute('draggable', 'true');
    this.items[i].setAttribute('aria-grabbed', 'false');
    this.items[i].setAttribute('tabindex', '0');
  }
};

export const removeOldDropzoneAreaElements = () => {
  let oldItemDropzoneElements = document.querySelectorAll('.item-dropzone-area');

  for (let i = 0; i < oldItemDropzoneElements.length; i++) {
    oldItemDropzoneElements[i].remove();
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
  for (let len = targets.length, i = 0; i < len; i++) {
    if (targets[i] !== selections.owner &&
          targets[i].getAttribute('aria-dropeffect') === 'none') {
      targets[i].setAttribute('aria-dropeffect', 'move');
      targets[i].setAttribute('tabindex', '0');
    }
  }

  // remove aria-grabbed and tabindex from all items inside those containers
  for (let len = items.length, i = 0; i < len; i++) {
    if (items[i].parentNode !== selections.owner &&
        items[i].getAttribute('aria-grabbed')) {
      items[i].removeAttribute('aria-grabbed');
      items[i].removeAttribute('tabindex');
    }
  }
};

export const clearDropeffects = (items, selections, targets) => {
  // if we dont't have any selected items just skip
  if (!selections.items.length) {
    return;
  }
  // reset aria-dropeffect and remove tabindex from all targets
  for (let i = 0; i < targets.length; i++) {
    if (targets[i].getAttribute('aria-dropeffect') !== 'none') {
      targets[i].setAttribute('aria-dropeffect', 'none');
      targets[i].removeAttribute('tabindex');
    }
  }

  // restore aria-grabbed and tabindex to all selectable items
  // without changing the grabbed value of any existing selected items
  for (let i = 0; i < items.length; i++) {
    if (!items[i].getAttribute('aria-grabbed')) {
      items[i].setAttribute('aria-grabbed', 'false');
      items[i].setAttribute('tabindex', '0');
    } else if (items[i].getAttribute('aria-grabbed') === 'true') {
      items[i].setAttribute('tabindex', '0');
    }
  }
};

export const hasModifier = (e) => {
  return (e.ctrlKey || e.metaKey || e.shiftKey);
};
