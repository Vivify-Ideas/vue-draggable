export const dragenterHandler = function (e) {
  this.related = e.target;

  if (typeof this.defaultOptions.onDragenter === 'function') {
    try {
      this.defaultOptions.onDragenter(
        {
          nativeEvent: e,
          stop: () => {
            throw new Error(`Stop method is available only for callbacks
                    'onDragstart' and 'onDragend'. For more info look at
                    https://github.com/Vivify-Ideas/vue-draggable/blob/master/README.md
                  `);
          },
          ...this.selections
        }
      );
    } catch (error) {
      e.preventDefault();
      return;
    }
  }
};
