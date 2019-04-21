import { VueDraggable } from './core';
import { VueDraggableGroup } from './components/vue-draggable-group.component';

export const VueDraggableDirective = () => {
  const instances = [];

  return {

    bind(el, options, vnode) {
      const instance = new VueDraggable(el, vnode.context, options.value);

      instances.push(instance);
    },
    componentUpdated(el) {
      setTimeout(() => {
        instances.forEach(instance => {
          if (instance.el !== el) return;
          instance.initiate(el);
        });
      });
    }
  };
};

VueDraggable.install = function (Vue) {
  Vue.directive('drag-and-drop', (new VueDraggableDirective()));
  Vue.component('vue-draggable-group', VueDraggableGroup);
};

export default VueDraggable;
