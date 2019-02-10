const VueDraggableOptions = {
  defaultOptions: {
    dropzoneSelector: 'ul',
    draggableSelector: 'li',
    handlerSelector: null,
    reactivityEnabled: true,
    multipleDropzonesItemsDraggingEnabled: false,
    showDropzoneAreas: true,
    onDrop: () => {},
    onDragstart: () => {},
    onDragend: () => {}
  }
};

export { VueDraggableOptions };
