const CUSTOM_EVENTS = [
  'added',
  'removed',
  'reordered'
];

export const VueDraggableGroup = {
  name: 'VueDraggableGroup',
  props: {
    groups: {
      required: true,
      type: Array
    },
    value: {
      required: true,
      type: Array
    },
    itemsKey: {
      type: String,
      default: 'items'
    }
  },
  render() {
    return this.$scopedSlots.default({});
  },
  methods: {
    added(event) {
      const newItems = this.groups
        .map(group => group[this.itemsKey])
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter(item => event.detail.ids.map(Number).indexOf(item.id) >= 0);

      this.value.splice(event.detail.index, 0, ...newItems);
      this.$emit('change', this.groups);
    },
    removed(event) {
      const newArray = this.value.filter(
        item => event.detail.ids.map(Number).indexOf(item.id) < 0
      );

      this.$emit('input', newArray);
    },
    reordered(event, group) {
      const reorderedItems = this.value.filter(
        item => event.detail.ids.map(Number).indexOf(item.id) >= 0
      );
      const notReorderedItems = this.value.filter(
        item => event.detail.ids.map(Number).indexOf(item.id) < 0
      );

      notReorderedItems.splice(event.detail.index, 0, ...reorderedItems);

      this.$emit('input', notReorderedItems);
      this.$emit('change', this.groups);
    },
    addListeners() {
      CUSTOM_EVENTS.forEach((event) =>
        this.$el.addEventListener(event, this[event]));
    },
    removeListeners() {
      CUSTOM_EVENTS.forEach((event) =>
        this.$el.removeEventListener(event, this[event]));
    }
  },
  mounted() {
    this.addListeners();
  },
  beforeDestroy() {
    this.removeListeners();
  }
};
