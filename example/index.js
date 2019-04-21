import Vue from 'vue/dist/vue.common';
import VueDraggable from './../src';

Vue.use(VueDraggable);

Vue.component('VueDraggable', {
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
        onDrop(event) {
          console.log({
            event,
            el: this.$el
          });
        }
        // onDragstart(event) {
        //   event.stop();
        // },
        // onDragend(event) {
        //   event.stop();
        // }
      }
    };
  },
  methods: {
    onGroupsChange(groups) {
      console.log({groups});
    }
  },
  template: `
  <div v-drag-and-drop:options="options">
    <vue-draggable-group
      v-for="group in groups"
      v-model="group.items"
      :groups="groups"
      :key="group.id"
      :data-id="group.id"
      @change="onGroupsChange"
    >
      <ul>
        <li
          v-for="item in group.items"
          :key="item.id"
          :data-id="item.id"
        >
          <label v-text="item.name"></label>
        </li>
      </ul>
    </vue-draggable-group>

    <div class="vue-draggable-json">
      <code v-for="group in groups">{{ group }}</code>
    </div>
  </div>
  `
});

(new Vue({
  data() {
    return {
      showFirst: false,
      showSecond: false
    };
  },
  template: `
    <div>
      <vue-draggable id="first" v-if="showFirst"/>
      <vue-draggable id="second" v-if="showSecond"/>
      <button @click="() => { showFirst =! showFirst }" >Toggle First</button>
      <button @click="() => { showSecond =! showSecond }" >Toggle Second</button>
    </div>
  `
})).$mount('#app');
