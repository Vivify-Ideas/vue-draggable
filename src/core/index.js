import { attachListeners } from './listeners';
import { setInitialAtributes } from './helpers';
import { VueDraggableOptions } from './options';
import { VueDraggableState } from './state';

export const VueDraggable = {
  ...VueDraggableOptions,
  ...VueDraggableState,
  registerListeners(el) {
    attachListeners.bind(this)(el);
  },
  initiate(el) {
    setInitialAtributes.bind(this)(el);
  }
};
