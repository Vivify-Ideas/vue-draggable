export const getOptions = (componentInstance, options) => ({
  dropzoneSelector: 'ul',
  draggableSelector: 'li',
  handlerSelector: null,
  reactivityEnabled: true,
  multipleDropzonesItemsDraggingEnabled: false,
  showDropzoneAreas: true,
  ...options,
  onDragstart: (options.onDragstart || (() => {})).bind(componentInstance),
  onDragend: (options.onDragend || (() => {})).bind(componentInstance),
  onDrop: (options.onDrop || (() => {})).bind(componentInstance)
});
