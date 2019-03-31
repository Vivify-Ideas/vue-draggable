import { VueDraggable } from './core';
import { VueDraggableGroup } from './components/vue-draggable-group.component';

export const VueDraggableDirective = {
  bind(el, options) {
    // override default options
    Object.assign(VueDraggable.defaultOptions, options.value);
    VueDraggable.registerListeners(el);
    VueDraggable.initiate(el);
  },
  componentUpdated(el) {
    setTimeout(() => {
      VueDraggable.initiate(el);
    });
  }
};

VueDraggable.install = function (Vue) {
  Vue.directive('drag-and-drop', VueDraggableDirective);
  Vue.component('vue-draggable-group', VueDraggableGroup);
};

export default VueDraggable;
