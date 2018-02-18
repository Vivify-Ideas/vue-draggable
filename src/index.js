import { VueDraggable } from './vue-draggable';

VueDraggable.install = function (Vue) {
  Vue.directive('drag-and-drop', {
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
  });
};

export default VueDraggable;
