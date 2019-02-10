const createCustomEvent = (name, data) => {
  return new CustomEvent(name, {
    detail: data
  });
};

export const dispatchCustomEvent = (name, data, element) => {
  const customEvent = createCustomEvent(name, data);

  element.dispatchEvent(customEvent);
};

export const dispatchReorderEvents = function (e) {
  const oldItems = this.selections.droptarget.querySelectorAll(
    this.defaultOptions.draggableSelector
  );
  const index = this.nextItemElement ?
    Array.prototype.indexOf.call(
      oldItems,
      this.nextItemElement
    ) : oldItems.length;
  const eventData = {
    ids: this.selections.items
      .map(item => item.dataset.id),
    index,
    nativeEvent: e,
    ...this.selections
  };

  if (this.selections.droptarget === this.selections.owner) {
    dispatchCustomEvent('reordered', eventData, this.selections.droptarget);
    return;
  }
  dispatchCustomEvent('added', eventData, this.selections.droptarget);
  dispatchCustomEvent('removed', eventData, this.selections.owner);
};
