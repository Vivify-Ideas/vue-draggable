import { attachListeners } from './listeners';
import { setInitialAtributes } from './helpers';
import { getOptions } from './options';
import { getState } from './state';

export class VueDraggable {
  constructor(el, componentInstance, options) {
    Object.assign(
      this,
      getState(),
      {
        defaultOptions: getOptions(componentInstance, options)
      },
      { el }
    );

    this.registerListeners(el);
    this.initiate(el);
  }

  registerListeners(el) {
    attachListeners.bind(this)(el);
  }

  initiate(el) {
    setInitialAtributes.bind(this)(el);
  }
};
