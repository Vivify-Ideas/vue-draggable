import { VueDraggable } from './core';
import { VueDraggableGroup } from './components/vue-draggable-group.component';

let instances = [];

export const VueDraggableDirective = {
  bind(el, options, vnode) {
    const instance = new VueDraggable(el, vnode.context, options.value);

    instances.push(instance);
  },
  componentUpdated(el) {
    setTimeout(() => {
      instances.forEach(instance => {
        if (instance.el !== el) return;
        instance.update(el);
      });
    });
  },
  unbind(el) {
    instances = instances.filter(
      (instance) => instance.el !== el);
  }
};

VueDraggable.install = function (Vue) {
  Vue.directive('drag-and-drop', VueDraggableDirective);
  Vue.component('vue-draggable-group', VueDraggableGroup);
};

export default VueDraggable;
