const VueDraggableOptions = {
  defaultOptions: {
    dropzoneSelector: 'ul',
    draggableSelector: 'li',
    multipleDropzonesItemsDraggingEnabled: true,
    showDropzoneAreas: true,
    onDrop: () => {},
    onDragstart: () => {},
    onDragend: () => {}
  },
  targets: null,
  items: null,
  nextItemElement: null,
  // related variable is needed to maintain a reference to the
  // dragleave's relatedTarget, since it doesn't have e.relatedTarget
  related: null,
  selections: {
    items: [],
    owner: null,
    droptarget: null
  }
};

export { VueDraggableOptions };
