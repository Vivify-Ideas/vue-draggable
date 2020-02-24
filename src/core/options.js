export const getOptions = (componentInstance, options) => ({
  dropzoneSelector: 'ul',
  draggableSelector: 'li',
  handlerSelector: null,
  reactivityEnabled: true,
  reorderEnabled: true,
  clearAfterDrop: true,
  multipleDropzonesItemsDraggingEnabled: false,
  showDropzoneAreas: true,
  ...options,
  onDragstart: (options.onDragstart || (() => {})).bind(componentInstance),
  onDragenter: (options.onDragenter || (() => {})).bind(componentInstance),
  onDragover: (options.onDragover || (() => {})).bind(componentInstance),
  onDragend: (options.onDragend || (() => {})).bind(componentInstance),
  onDrop: (options.onDrop || (() => {})).bind(componentInstance)
});
