const createCustomEvent = (name, data) => {
  return new CustomEvent(name, {
    detail: data
  });
};

export const dispatchCustomEvent = (name, data, element) => {
  const customEvent = createCustomEvent(name, data);

  element.dispatchEvent(customEvent);
};
