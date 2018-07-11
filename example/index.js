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
      <li><label>Item 1</label></li>
      <li><label>Item 2</label></li>
      <li><label>Item 3</label></li>
    </ul>
    <ul>
      <li><label>Item 4</label></li>
      <li><label>Item 5</label></li>
      <li><label>Item 6</label></li>
    </ul>
    <ul>
      <li><label>Item 7</label></li>
      <li><label>Item 8</label></li>
      <li><label>Item 9</label></li>
    </ul>
    </div>
  `
})).$mount('#app');
