export interface VueDraggableEvent {
  nativeEvent: typeof Event,
  items: Array<HTMLElement>,
  owner: HTMLElement,
  droptarget: HTMLElement,
  stop?: () => void // Stop D&D (available only for callbacks `onDragstart` and `onDragend`)
}

export interface VueDraggableOptions {
  dropzoneSelector: string,
  draggableSelector: string,
  handlerSelector: string,
  multipleDropzonesItemsDraggingEnabled: boolean,
  showDropzoneAreas: boolean,
  onDrop: (event: VueDraggableEvent) => void,
  onDragstart: (event: VueDraggableEvent) => void,
  onDragend: (event: VueDraggableEvent) => void
}