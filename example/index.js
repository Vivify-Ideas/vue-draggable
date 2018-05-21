import Vue from 'vue/dist/vue.common';
import VueDraggable from './../src';

Vue.use(VueDraggable);

(new Vue({
  data: {
    options: {
      // dropzoneSelector: 'ul',
      // draggableSelector: 'li',
      // excludeOlderBrowsers: true,
      // multipleDropzonesItemsDraggingEnabled: true,
      // onDrop(event) {},
      // onDragstart(event) {
      //   event.stop();
      // },
      // onDragend(event) {
      //   event.stop();
      // }
    }
  },
  template: `
    <div v-drag-and-drop:options="options">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <ul>
      <li>Item 4</li>
      <li>Item 5</li>
      <li>Item 6</li>
    </ul>
    <ul>
      <li>Item 7</li>
      <li>Item 8</li>
      <li>Item 9</li>
    </ul>
    </div>
  `
})).$mount('#app');
