import {
  mousedownHandler,
  mouseupHandler,
  dragstartHandler,
  dragleaveHandler,
  dragenterHandler,
  dragoverHandler,
  dragendHandler,
  keydownHandler
} from './handlers';

export const attachListeners = function (el) {
  // mousedown event to clear previous selections
  el.addEventListener('mousedown', mousedownHandler.bind(this), false);

  // mouseup event to implement multiple selection
  el.addEventListener('mouseup', mouseupHandler.bind(this), false);

  // dragstart event to initiate mouse dragging
  el.addEventListener('dragstart', dragstartHandler.bind(this), false);

  // keydown event to implement selection and abort
  el.addEventListener('keydown', keydownHandler.bind(this), false);

  // dragenter event to set related variable
  el.addEventListener('dragenter', dragenterHandler.bind(this), false);

  // dragleave event to maintain target highlighting using that variable
  el.addEventListener('dragleave', dragleaveHandler.bind(this), false);

  // dragover event to allow the drag by preventing its default
  el.addEventListener('dragover', dragoverHandler.bind(this), false);

  // dragend event to implement items being validly dropped into targets,
  // or invalidly dropped elsewhere, and to clean-up the interface either way
  el.addEventListener('dragend', dragendHandler.bind(this), false);
};
