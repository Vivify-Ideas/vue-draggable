import Vue from 'vue/dist/vue.common';
import VueDraggable from './../src';

Vue.use(VueDraggable);

(new Vue({
  data() {
    return {
      groups: [
        {
          id: 1,
          name: 'Group 1',
          items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
          ]
        },
        {
          id: 2,
          name: 'Group 2',
          items: [
            { id: 4, name: 'Item 4' },
            { id: 5, name: 'Item 5' },
            { id: 6, name: 'Item 6' }
          ]
        },
        {
          id: 3,
          name: 'Group 3',
          items: [
            { id: 7, name: 'Item 7' },
            { id: 8, name: 'Item 8' },
            { id: 9, name: 'Item 9' }
          ]
        }
      ],
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
    };
  },
  template: `
    <div v-drag-and-drop:options="options">
      <ul
        v-for="group in groups"
        :key="group.id"
        :data-id="group.id"
        @added="added($event, group)"
        @removed="removed($event, group)"
        @reordered="reordered($event, group)"
      >
        <li
          v-for="item in group.items"
          :key="item.id"
          :data-id="item.id"
        >
          <label v-text="item.name"></label>
        </li>
      </ul>
      {{ groups }}
    </div>
  `,
  methods: {
    added(event, group) {
      const newItems = this.groups
        .map(group => group.items)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter(item => event.detail.ids.map(Number).indexOf(item.id) >= 0);

      group.items.splice(event.detail.index, 0, ...newItems);
    },
    removed(event, group) {
      group.items = group.items.filter(
        item => event.detail.ids.map(Number).indexOf(item.id) < 0
      );
    },
    reordered(event, group) {
      const reorderedItems = group.items.filter(
        item => event.detail.ids.map(Number).indexOf(item.id) >= 0
      );
      const newItems = group.items.filter(
        item => event.detail.ids.map(Number).indexOf(item.id) < 0
      );

      newItems.splice(event.detail.index, 0, ...reorderedItems);
      group.items = newItems;
    }
  }
})).$mount('#app');
